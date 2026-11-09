'use client';

import { useState, useTransition } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  X,
} from 'lucide-react';
import {
  addCalendarNote,
  deleteCalendarNote,
  triggerManualPing,
  type CalendarNote,
} from '@/app/admin/(dashboard)/kalender/actions';
import {
  MASEHI_MONTHS,
  getHijriInfo,
} from '@/lib/calendar-utils';
import CalendarKeepAliveBanner from '@/components/calendar/CalendarKeepAliveBanner';
import CalendarNoteModal from '@/components/calendar/CalendarNoteModal';
import CalendarDayGrid from '@/components/calendar/CalendarDayGrid';

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

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
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

  function isPingDay(dateStr: string): boolean {
    if (!lastPingTime) return false;
    const lastPingMidnight = new Date(lastPingTime);
    lastPingMidnight.setHours(0, 0, 0, 0);

    const checkDate = new Date(dateStr);
    checkDate.setHours(0, 0, 0, 0);

    const diffMs = checkDate.getTime() - lastPingMidnight.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
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

  const midMonthStr = `${year}-${String(month + 1).padStart(2, '0')}-15`;
  const midMonthHijri = getHijriInfo(midMonthStr);

  return (
    <div className="space-y-6">
      <CalendarKeepAliveBanner
        lastPingTime={lastPingTime}
        isPending={isPending}
        onManualPing={handleManualPing}
      />

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

      {/* Grid Kalender */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[8px_8px_20px_rgba(0,0,0,0.04),-8px_-8px_20px_rgba(255,255,255,0.9)]">
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
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-blue-900 transition-all cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                title="Bulan berikutnya"
                aria-label="Bulan berikutnya"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-blue-900 transition-all cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <CalendarDayGrid
          year={year}
          month={month}
          startOffset={startOffset}
          daysInPrevMonth={daysInPrevMonth}
          daysInMonth={daysInMonth}
          todayStr={todayStr}
          notes={notes}
          isPingDay={isPingDay}
          isLastPingDay={isLastPingDay}
          onSelectDate={setSelectedDate}
        />
      </section>

      <CalendarNoteModal
        selectedDate={selectedDate}
        notes={notes}
        noteInput={noteInput}
        isPending={isPending}
        isPingDay={selectedDate ? isPingDay(selectedDate) : false}
        onClose={() => setSelectedDate(null)}
        onNoteInputChange={setNoteInput}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
}
