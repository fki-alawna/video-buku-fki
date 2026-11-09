'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { X, ListFilter, Grid } from 'lucide-react';
import {
  addCalendarNote,
  deleteCalendarNote,
  triggerManualPing,
  type CalendarNote,
} from '@/app/admin/(dashboard)/kalender/actions';
import {
  getHijriInfo,
  checkIsPingDay,
  checkIsLastPingDay,
} from '@/lib/calendar-utils';
import CalendarKeepAliveBanner from '@/components/calendar/CalendarKeepAliveBanner';
import CalendarHeaderControls from '@/components/calendar/CalendarHeaderControls';
import CalendarNoteModal from '@/components/calendar/CalendarNoteModal';
import CalendarDayGrid from '@/components/calendar/CalendarDayGrid';
import CalendarMobileAgenda from '@/components/calendar/CalendarMobileAgenda';

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
  const [mobileTab, setMobileTab] = useState<'grid' | 'agenda'>('grid');
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const todayStr = mounted ? new Date().toISOString().split('T')[0] : '';

  const isPingDay = (d: string) => checkIsPingDay(d, lastPingTime);
  const isLastPingDay = (d: string) => checkIsLastPingDay(d, lastPingTime);

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !noteInput.trim()) return;

    startTransition(async () => {
      const res = await addCalendarNote(selectedDate, noteInput);
      if (res.success && res.data) {
        setNotes((prev) => [res.data!, ...prev]);
        setNoteInput('');
        setStatusMessage('Catatan berhasil ditambahkan.');
        setTimeout(() => setStatusMessage(null), 3000);
        router.refresh();
      } else if (res.success) {
        setNoteInput('');
        setStatusMessage('Catatan berhasil ditambahkan.');
        setTimeout(() => setStatusMessage(null), 3000);
        router.refresh();
      } else if (res.error) {
        setStatusMessage(res.error);
      }
    });
  }

  const router = useRouter();

  async function handleDeleteNote(id: string) {
    const res = await deleteCalendarNote(id);
    if (res.success) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setStatusMessage('Catatan berhasil dihapus.');
      setTimeout(() => setStatusMessage(null), 3000);
      router.refresh();
    } else if (res.error) {
      setStatusMessage(res.error);
    }
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
  const hijriText = `${midMonthHijri.month} ${midMonthHijri.year} H`;

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

      {/* Grid Kalender Container */}
      <section
        suppressHydrationWarning
        className="rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-[8px_8px_20px_rgba(0,0,0,0.04),-8px_-8px_20px_rgba(255,255,255,0.9)]"
      >
        <CalendarHeaderControls
          year={year}
          month={month}
          hijriText={hijriText}
          onGoToToday={() => setCurrentDate(new Date())}
          onPrevMonth={() => setCurrentDate(new Date(year, month - 1, 1))}
          onNextMonth={() => setCurrentDate(new Date(year, month + 1, 1))}
        />

        {/* Tab Switcher Khusus Mobile (HP) */}
        <div className="flex md:hidden items-center justify-center p-1 bg-slate-100/80 rounded-xl my-3">
          <button
            type="button"
            onClick={() => setMobileTab('grid')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              mobileTab === 'grid'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Grid className="h-3.5 w-3.5" />
            <span>Kalender Grid</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('agenda')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              mobileTab === 'agenda'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ListFilter className="h-3.5 w-3.5" />
            <span>Agenda / List</span>
          </button>
        </div>

        {/* Desktop: Selalu Grid */}
        <div className="hidden md:block">
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
        </div>

        {/* Mobile: Grid Ramping atau List Agenda */}
        <div className="block md:hidden">
          {mobileTab === 'grid' ? (
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
          ) : (
            <CalendarMobileAgenda
              year={year}
              month={month}
              daysInMonth={daysInMonth}
              todayStr={todayStr}
              notes={notes}
              isPingDay={isPingDay}
              isLastPingDay={isLastPingDay}
              onSelectDate={setSelectedDate}
            />
          )}
        </div>
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
