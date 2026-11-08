'use client';

import { useState, useTransition } from 'react';
import moment from 'moment-hijri';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Radio,
  StickyNote,
  Plus,
  Trash2,
  X,
  RotateCw,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import {
  addCalendarNote,
  deleteCalendarNote,
  triggerManualPing,
  type CalendarNote,
} from '@/app/admin/(dashboard)/kalender/actions';

// Pastikan angka Masehi menggunakan digit standar Barat
moment.locale('en');

const HIJRI_MONTHS = [
  'Muharram',
  'Safar',
  "Rabi'ul Awwal",
  "Rabi'ul Akhir",
  'Jumadil Ula',
  'Jumadil Akhir',
  'Rajab',
  "Sya'ban",
  'Ramadhan',
  'Syawal',
  "Dzulqa'dah",
  'Dzulhijjah',
];

const MASEHI_MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const DAY_NAMES = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

interface CalendarViewProps {
  initialNotes: CalendarNote[];
  lastPingTime: string | null;
}

export default function CalendarView({
  initialNotes,
  lastPingTime,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [notes, setNotes] = useState<CalendarNote[]>(initialNotes);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Hari pertama bulan ini (0 = Minggu, 1 = Senin, dst)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Konversi ke Senin = 0, Minggu = 6
  const startOffset = (firstDayOfMonth + 6) % 7;

  // Jumlah hari dalam bulan ini
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Jumlah hari bulan sebelumnya
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const todayStr = new Date().toISOString().split('T')[0];

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }

  function goToToday() {
    setCurrentDate(new Date());
  }

  // Helper Hijri
  function getHijriInfo(dateStr: string) {
    const m = moment(dateStr);
    const iDate = m.iDate();
    const iMonthIndex = m.iMonth();
    const iMonthName = HIJRI_MONTHS[iMonthIndex] || `Bulan ${iMonthIndex + 1}`;
    const iYear = m.iYear();
    return {
      day: iDate,
      month: iMonthName,
      year: iYear,
      fullText: `${iDate} ${iMonthName} ${iYear} H`,
    };
  }

  // Hitung jadwal ping keep-alive (setiap 6 hari)
  function isPingDay(dateStr: string): boolean {
    if (!lastPingTime) return false;
    const lastPingMidnight = new Date(lastPingTime);
    lastPingMidnight.setHours(0, 0, 0, 0);

    const checkDate = new Date(dateStr);
    checkDate.setHours(0, 0, 0, 0);

    const diffMs = checkDate.getTime() - lastPingMidnight.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    // Setiap kelipatan 6 hari (termasuk 0 = hari ping terakhir)
    return diffDays % 6 === 0;
  }

  function isLastPingDay(dateStr: string): boolean {
    if (!lastPingTime) return false;
    const lastPingStr = new Date(lastPingTime).toISOString().split('T')[0];
    return dateStr === lastPingStr;
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !noteInput.trim()) return;

    startTransition(async () => {
      const res = await addCalendarNote(selectedDate, noteInput);
      if (res.success) {
        // Optimistic append
        const newNote: CalendarNote = {
          id: `temp-${Date.now()}`,
          date: selectedDate,
          note: noteInput.trim(),
          created_at: new Date().toISOString(),
        };
        setNotes((prev) => [newNote, ...prev]);
        setNoteInput('');
        setStatusMessage('Catatan berhasil ditambahkan.');
        setTimeout(() => setStatusMessage(null), 3000);
      } else if (res.error) {
        setStatusMessage(res.error);
      }
    });
  }

  async function handleDeleteNote(id: string) {
    startTransition(async () => {
      const res = await deleteCalendarNote(id);
      if (res.success) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        setStatusMessage('Catatan berhasil dihapus.');
        setTimeout(() => setStatusMessage(null), 3000);
      } else if (res.error) {
        setStatusMessage(res.error);
      }
    });
  }

  async function handleManualPing() {
    startTransition(async () => {
      const res = await triggerManualPing();
      if (res.success) {
        setStatusMessage(res.success);
        setTimeout(() => setStatusMessage(null), 4000);
      } else if (res.error) {
        setStatusMessage(res.error);
      }
    });
  }

  // Filter catatan untuk tanggal yang dipilih di modal
  const selectedDateNotes = selectedDate
    ? notes.filter((n) => n.date === selectedDate)
    : [];

  // Hitung informasi Hijriah untuk bulan aktif
  const midMonthStr = `${year}-${String(month + 1).padStart(2, '0')}-15`;
  const midMonthHijri = getHijriInfo(midMonthStr);

  return (
    <div className="space-y-6">
      {/* ─── BANNER SYSTEM KEEP-ALIVE STATUS ─── */}
      <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-900 to-indigo-950 p-5 sm:p-6 text-white shadow-[8px_8px_20px_rgba(0,0,0,0.06)] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200 border border-white/15">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Sistem Keep-Alive Supabase Otomatis</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Kalender Terintegrasi (Masehi & Hijriah)
            </h2>
            <p className="text-xs sm:text-sm text-blue-200">
              Ping otomatis berjalan terjadwal via Vercel Cron untuk menjaga database Supabase tetap aktif tanpa jeda pause.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleManualPing}
              disabled={isPending}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-white text-blue-900 px-4 py-2.5 text-sm font-bold shadow-md hover:bg-blue-50 active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
            >
              <RotateCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
              <span>{isPending ? 'Memproses...' : 'Ping Sekarang'}</span>
            </button>
          </div>
        </div>

        {/* Info Ping Terakhir */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span>
              Ping Terakhir:{' '}
              <strong className="text-white">
                {lastPingTime
                  ? new Date(lastPingTime).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                  : 'Belum tercatat'}
              </strong>
            </span>
          </div>
          <span className="text-white/30">•</span>
          <span>Interval Maksimal: <strong>6 Hari</strong></span>
          <span className="text-white/30">•</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400"></span>
            <span>Titik Kuning: Ada Catatan Agenda</span>
          </span>
          <span className="text-white/30">•</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400"></span>
            <span>Badge Biru: Jadwal Ping Server</span>
          </span>
        </div>
      </section>

      {/* Pesan status interaksi */}
      {statusMessage && (
        <div
          role="status"
          className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 font-medium flex items-center justify-between"
        >
          <span>{statusMessage}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-blue-500 hover:text-blue-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ─── KONTROL BULAN & KALENDER GRID ─── */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[8px_8px_20px_rgba(0,0,0,0.04),-8px_-8px_20px_rgba(255,255,255,0.9)]">
        {/* Header Navigasi Kalender */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-900" />
              <h3 className="text-xl font-bold text-slate-900">
                {MASEHI_MONTHS[month]} {year}
              </h3>
            </div>
            <p className="text-sm font-semibold text-blue-900/80 mt-0.5">
              {midMonthHijri.month} {midMonthHijri.year} H
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToToday}
              className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Hari Ini
            </button>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={prevMonth}
                title="Bulan sebelumnya"
                aria-label="Bulan sebelumnya"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-blue-900 hover:shadow-xs transition-all cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                title="Bulan berikutnya"
                aria-label="Bulan berikutnya"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-blue-900 hover:shadow-xs transition-all cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Header Nama Hari (Senin - Minggu) */}
        <div className="grid grid-cols-7 gap-2 mt-4 text-center">
          {DAY_NAMES.map((name, i) => (
            <div
              key={name}
              className={`py-2 text-xs font-bold uppercase tracking-wider ${
                i >= 5 ? 'text-red-500' : 'text-slate-500'
              }`}
            >
              <span className="hidden sm:inline">{name}</span>
              <span className="sm:hidden">{name.slice(0, 3)}</span>
            </div>
          ))}
        </div>

        {/* Grid Kotak Tanggal */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mt-2">
          {/* Hari dari bulan sebelumnya */}
          {Array.from({ length: startOffset }).map((_, idx) => {
            const dayNum = daysInPrevMonth - startOffset + idx + 1;
            return (
              <div
                key={`prev-${idx}`}
                className="min-h-[85px] sm:min-h-[105px] rounded-2xl border border-slate-100 bg-slate-50/40 p-2 text-slate-400 select-none opacity-50"
              >
                <span className="text-xs font-semibold">{dayNum}</span>
              </div>
            );
          })}

          {/* Hari bulan ini */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(
              dayNum
            ).padStart(2, '0')}`;
            const isToday = dateStr === todayStr;
            const hijri = getHijriInfo(dateStr);
            const pingDay = isPingDay(dateStr);
            const lastPing = isLastPingDay(dateStr);
            const dateNotes = notes.filter((n) => n.date === dateStr);
            const hasNotes = dateNotes.length > 0;

            return (
              <div
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`group min-h-[85px] sm:min-h-[105px] rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between transition-all duration-200 cursor-pointer border ${
                  isToday
                    ? 'border-blue-900 bg-blue-50/50 shadow-sm'
                    : 'border-slate-200/70 bg-white hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Atas: Angka Masehi & Badge Hari Ini */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center justify-center text-xs sm:text-sm font-bold ${
                      isToday
                        ? 'h-6 w-6 rounded-full bg-blue-900 text-white'
                        : 'text-slate-800'
                    }`}
                  >
                    {dayNum}
                  </span>

                  {/* Dot Catatan */}
                  {hasNotes && (
                    <span
                      title={`${dateNotes.length} catatan agenda`}
                      className="flex h-5 items-center gap-1 rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-900 border border-amber-300"
                    >
                      <StickyNote className="h-3 w-3 text-amber-700" />
                      <span>{dateNotes.length}</span>
                    </span>
                  )}
                </div>

                {/* Tengah & Bawah: Tanggal Hijriah & Indikator Ping */}
                <div className="space-y-1 mt-1">
                  {/* Teks Tanggal Hijriah */}
                  <span className="block text-[10px] sm:text-[11px] font-medium text-slate-500 group-hover:text-blue-900 transition-colors truncate">
                    {hijri.day} {hijri.month.split(' ')[0]}
                  </span>

                  {/* Badge Ping Server */}
                  {lastPing ? (
                    <span
                      title="Ping Supabase terakhir kali dilakukan pada tanggal ini"
                      className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 border border-emerald-200 truncate max-w-full"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="truncate">Ping Sukses</span>
                    </span>
                  ) : pingDay ? (
                    <span
                      title="Jadwal Ping Keep-Alive Supabase (6 hari)"
                      className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-800 border border-blue-200 truncate max-w-full"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span className="truncate">Jadwal Ping</span>
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── MODAL DETAIL TANGGAL & CATATAN AGENDA (Framer Motion) ─── */}
      <AnimatePresence>
        {selectedDate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDate(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl z-10 space-y-5 border border-slate-200"
            >
              {/* Header Modal */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Agenda Panitia & Catatan
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {new Date(selectedDate).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h3>
                  <p className="text-xs font-semibold text-blue-900/80 mt-0.5">
                    {getHijriInfo(selectedDate).fullText}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  title="Tutup dialog"
                  aria-label="Tutup dialog"
                  className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status Ping pada tanggal ini */}
              {isPingDay(selectedDate) && (
                <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-3 text-xs text-blue-900 flex items-center gap-2.5">
                  <Radio className="h-4 w-4 text-blue-700 shrink-0" />
                  <span>
                    Tanggal ini masuk dalam siklus <strong>Jadwal Ping Keep-Alive Supabase</strong> (interval 6 hari).
                  </span>
                </div>
              )}

              {/* Form Tambah Catatan */}
              <form onSubmit={handleAddNote} className="space-y-3">
                <label
                  htmlFor="agenda-note-input"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Tambah Catatan / Pengingat Baru
                </label>
                <div className="flex gap-2">
                  <input
                    id="agenda-note-input"
                    type="text"
                    required
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Contoh: Rapat gladi bersih MHMTQ jam 19.30..."
                    className="flex-1 min-h-[44px] rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20"
                  />
                  <button
                    type="submit"
                    disabled={isPending || !noteInput.trim()}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 active:scale-95 transition-all disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Simpan</span>
                  </button>
                </div>
              </form>

              {/* Daftar Catatan untuk Tanggal Ini */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Daftar Catatan ({selectedDateNotes.length})
                </h4>

                {selectedDateNotes.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
                    <p className="text-xs text-slate-500">
                      Belum ada catatan atau pengingat untuk tanggal ini.
                    </p>
                  </div>
                ) : (
                  <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                    {selectedDateNotes.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-3.5 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 break-words">
                            {item.note}
                          </p>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(item.created_at).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteNote(item.id)}
                          disabled={isPending}
                          title="Hapus catatan"
                          aria-label="Hapus catatan"
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Modal */}
              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
