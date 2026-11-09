import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { MASEHI_MONTHS } from '@/lib/calendar-utils';

interface CalendarHeaderControlsProps {
  year: number;
  month: number;
  hijriText: string;
  onGoToToday: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeaderControls({
  year,
  month,
  hijriText,
  onGoToToday,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 sm:pb-5 border-b border-slate-100">
      <div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-900" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {MASEHI_MONTHS[month]} {year}
          </h3>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-blue-900/80 mt-0.5">
          {hijriText}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onGoToToday}
          className="inline-flex min-h-[38px] sm:min-h-[40px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          Hari Ini
        </button>
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={onPrevMonth}
            title="Bulan sebelumnya"
            aria-label="Bulan sebelumnya"
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-blue-900 transition-all cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            title="Bulan berikutnya"
            aria-label="Bulan berikutnya"
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-blue-900 transition-all cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
