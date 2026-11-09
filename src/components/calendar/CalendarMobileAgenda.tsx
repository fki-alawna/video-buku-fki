import { Plus, StickyNote, Radio } from 'lucide-react';
import { DAY_NAMES, getHijriInfo } from '@/lib/calendar-utils';
import type { CalendarNote } from '@/app/admin/(dashboard)/kalender/actions';

interface CalendarMobileAgendaProps {
  year: number;
  month: number;
  daysInMonth: number;
  todayStr: string;
  notes: CalendarNote[];
  isPingDay: (dateStr: string) => boolean;
  isLastPingDay: (dateStr: string) => boolean;
  onSelectDate: (dateStr: string) => void;
}

export default function CalendarMobileAgenda({
  year,
  month,
  daysInMonth,
  todayStr,
  notes,
  isPingDay,
  isLastPingDay,
  onSelectDate,
}: CalendarMobileAgendaProps) {
  const daysArray = Array.from({ length: daysInMonth }).map((_, idx) => {
    const dayNum = idx + 1;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      dayNum
    ).padStart(2, '0')}`;
    const dateObj = new Date(year, month, dayNum);
    const dayName = DAY_NAMES[(dateObj.getDay() + 6) % 7];
    const isToday = dateStr === todayStr;
    const hijri = getHijriInfo(dateStr);
    const pingDay = isPingDay(dateStr);
    const lastPing = isLastPingDay(dateStr);
    const dateNotes = notes.filter((n) => n.date === dateStr);

    return {
      dateStr,
      dayNum,
      dayName,
      isToday,
      hijri,
      pingDay,
      lastPing,
      dateNotes,
    };
  });

  return (
    <div className="space-y-3 mt-4">
      {daysArray.map((day) => {
        const hasHighlight = day.dateNotes.length > 0 || day.isToday || day.pingDay || day.lastPing;

        return (
          <div
            key={day.dateStr}
            suppressHydrationWarning
            className={`rounded-2xl p-3.5 transition-all border ${
              day.isToday
                ? 'border-blue-900 bg-blue-50/60 shadow-xs'
                : hasHighlight
                ? 'border-amber-200 bg-amber-50/30'
                : 'border-slate-200/80 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center text-xs font-bold ${
                      day.isToday
                        ? 'h-6 w-6 rounded-full bg-blue-900 text-white'
                        : 'text-slate-900 font-extrabold'
                    }`}
                  >
                    {day.dayNum}
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {day.dayName}
                  </span>
                  {day.isToday && (
                    <span className="rounded-md bg-blue-900 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      Hari Ini
                    </span>
                  )}
                </div>

                <p className="text-xs font-medium text-slate-500">
                  {day.hijri.day} {day.hijri.month} {day.hijri.year} H
                </p>

                {/* Ping Status Pills */}
                {day.lastPing ? (
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200 mt-1">
                    <Radio className="h-3 w-3 text-emerald-600 animate-pulse" />
                    <span>Ping Supabase Sukses</span>
                  </div>
                ) : day.pingDay ? (
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-800 border border-blue-200 mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <span>Jadwal Ping Keep-Alive</span>
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => onSelectDate(day.dateStr)}
                className="inline-flex min-h-[36px] items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-900 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Catatan</span>
              </button>
            </div>

            {/* Daftar Catatan Hari Ini */}
            {day.dateNotes.length > 0 && (
              <ul className="mt-3 space-y-1.5 pt-2.5 border-t border-slate-100">
                {day.dateNotes.map((note) => (
                  <li
                    key={note.id}
                    onClick={() => onSelectDate(day.dateStr)}
                    className="flex items-start gap-2 rounded-xl bg-white/90 border border-amber-200/80 p-2 text-xs text-slate-800 cursor-pointer hover:border-amber-400 transition-colors"
                  >
                    <StickyNote className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{note.note}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
