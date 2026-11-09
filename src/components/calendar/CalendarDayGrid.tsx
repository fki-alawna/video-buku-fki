import { StickyNote } from 'lucide-react';
import { DAY_NAMES, getHijriInfo } from '@/lib/calendar-utils';
import type { CalendarNote } from '@/app/admin/(dashboard)/kalender/actions';

interface CalendarDayGridProps {
  year: number;
  month: number;
  startOffset: number;
  daysInPrevMonth: number;
  daysInMonth: number;
  todayStr: string;
  notes: CalendarNote[];
  isPingDay: (dateStr: string) => boolean;
  isLastPingDay: (dateStr: string) => boolean;
  onSelectDate: (dateStr: string) => void;
}

export default function CalendarDayGrid({
  year,
  month,
  startOffset,
  daysInPrevMonth,
  daysInMonth,
  todayStr,
  notes,
  isPingDay,
  isLastPingDay,
  onSelectDate,
}: CalendarDayGridProps) {
  return (
    <>
      {/* Header Nama Hari */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-4 text-center">
        {DAY_NAMES.map((name, i) => (
          <div
            key={name}
            className={`py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
              i >= 5 ? 'text-red-500' : 'text-slate-500'
            }`}
          >
            <span className="hidden sm:inline">{name}</span>
            <span className="sm:hidden">{name.slice(0, 3)}</span>
          </div>
        ))}
      </div>

      {/* Grid Tanggal */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-2">
        {Array.from({ length: startOffset }).map((_, idx) => {
          const dayNum = daysInPrevMonth - startOffset + idx + 1;
          return (
            <div
              key={`prev-${idx}`}
              className="min-h-[52px] sm:min-h-[85px] md:min-h-[105px] rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50/40 p-1 sm:p-2 text-slate-400 select-none opacity-50"
            >
              <span className="text-[10px] sm:text-xs font-semibold">{dayNum}</span>
            </div>
          );
        })}

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
              onClick={() => onSelectDate(dateStr)}
              suppressHydrationWarning
              className={`group min-h-[52px] sm:min-h-[85px] md:min-h-[105px] rounded-xl sm:rounded-2xl p-1 sm:p-2 md:p-2.5 flex flex-col justify-between transition-all duration-200 cursor-pointer border ${
                isToday
                  ? 'border-blue-900 bg-blue-50/50 shadow-sm'
                  : 'border-slate-200/70 bg-white hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold ${
                    isToday
                      ? 'h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-900 text-white'
                      : 'text-slate-800'
                  }`}
                >
                  {dayNum}
                </span>

                {hasNotes && (
                  <span
                    title={`${dateNotes.length} catatan agenda`}
                    className="flex h-4 sm:h-5 items-center gap-0.5 sm:gap-1 rounded-full bg-amber-100 px-1 sm:px-1.5 text-[9px] sm:text-[10px] font-bold text-amber-900 border border-amber-300"
                  >
                    <StickyNote className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-700" />
                    <span>{dateNotes.length}</span>
                  </span>
                )}
              </div>

              <div className="space-y-0.5 sm:space-y-1 mt-0.5 sm:mt-1">
                {/* Teks Hijriah: Disembunyikan di HP (hidden md:block) agar tidak terpotong */}
                <span className="hidden md:block text-[10px] md:text-[11px] font-medium text-slate-500 group-hover:text-blue-900 transition-colors truncate">
                  {hijri.day} {hijri.month.split(' ')[0]}
                </span>

                {lastPing ? (
                  <span
                    title="Ping Supabase terakhir"
                    className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1 sm:px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 border border-emerald-200 truncate max-w-full"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="hidden md:inline truncate">Ping Sukses</span>
                  </span>
                ) : pingDay ? (
                  <span
                    title="Jadwal Ping Keep-Alive Supabase"
                    className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-1 sm:px-1.5 py-0.5 text-[9px] font-bold text-blue-800 border border-blue-200 truncate max-w-full"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span className="hidden md:inline truncate">Jadwal Ping</span>
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
