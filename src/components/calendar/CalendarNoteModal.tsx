'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Clock, Radio, Loader2 } from 'lucide-react';
import type { CalendarNote } from '@/app/admin/(dashboard)/kalender/actions';
import { getHijriInfo } from '@/lib/calendar-utils';

interface CalendarNoteModalProps {
  selectedDate: string | null;
  notes: CalendarNote[];
  noteInput: string;
  isPending: boolean;
  isPingDay: boolean;
  onClose: () => void;
  onNoteInputChange: (val: string) => void;
  onAddNote: (e: React.FormEvent) => void;
  onDeleteNote: (id: string) => void;
}

export default function CalendarNoteModal({
  selectedDate,
  notes,
  noteInput,
  isPending,
  isPingDay,
  onClose,
  onNoteInputChange,
  onAddNote,
  onDeleteNote,
}: CalendarNoteModalProps) {
  if (!selectedDate) return null;

  const dateNotes = notes.filter((n) => n.date === selectedDate);
  const hijri = getHijriInfo(selectedDate);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
          className="relative w-[90vw] max-w-md max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl z-10 space-y-4 sm:space-y-5 border border-slate-200"
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
                {hijri.fullText}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              title="Tutup dialog"
              aria-label="Tutup dialog"
              className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Status Ping pada tanggal ini */}
          {isPingDay && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-3 text-xs text-blue-900 flex items-center gap-2.5">
              <Radio className="h-4 w-4 text-blue-700 shrink-0" />
              <span>
                Tanggal ini masuk dalam siklus <strong>Jadwal Ping Keep-Alive Supabase</strong> (interval 6 hari).
              </span>
            </div>
          )}

          {/* Form Tambah Catatan */}
          <form onSubmit={onAddNote} className="space-y-3">
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
                onChange={(e) => onNoteInputChange(e.target.value)}
                placeholder="Contoh: Rapat gladi bersih MHMTQ jam 19.30..."
                className="flex-1 min-h-[44px] rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20"
              />
              <button
                type="submit"
                disabled={isPending || !noteInput.trim()}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Simpan</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Daftar Catatan untuk Tanggal Ini */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Daftar Catatan ({dateNotes.length})
            </h4>

            {dateNotes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
                <p className="text-xs text-slate-500">
                  Belum ada catatan atau pengingat untuk tanggal ini.
                </p>
              </div>
            ) : (
              <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
                {dateNotes.map((item) => (
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
                      onClick={() => onDeleteNote(item.id)}
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
              onClick={onClose}
              className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
