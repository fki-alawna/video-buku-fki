export default function KalenderLoading() {
  return (
    <div
      role="status"
      aria-label="Memuat kalender agenda..."
      className="space-y-6 animate-pulse"
    >
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-4 w-96 max-w-full bg-slate-200/80 dark:bg-slate-800/80 rounded-md" />
      </div>

      {/* Keep-Alive Banner Skeleton */}
      <div className="h-14 w-full rounded-2xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-800" />

      {/* Calendar Card Skeleton */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xs space-y-6">
        {/* Navigation & Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1.5">
            <div className="h-7 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 w-36 bg-slate-200/70 dark:bg-slate-700/70 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-20 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>

        {/* 7 Days of the Week Header */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="h-7 bg-slate-100 dark:bg-slate-800/60 rounded-lg flex items-center justify-center"
            >
              <div className="h-3 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>

        {/* 35 Calendar Day Cells (5 weeks x 7 days) */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="h-20 sm:h-24 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-800/30 p-2 sm:p-2.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-3 w-8 bg-slate-200/60 dark:bg-slate-700/60 rounded" />
              </div>
              <div className="h-3 w-full bg-slate-200/40 dark:bg-slate-700/40 rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
