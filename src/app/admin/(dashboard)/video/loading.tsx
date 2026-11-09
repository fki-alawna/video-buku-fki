export default function VideoLoading() {
  return (
    <div
      role="status"
      aria-label="Memuat daftar video..."
      className="space-y-6 animate-pulse"
    >
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-8 w-44 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-4 w-72 sm:w-96 bg-slate-200/80 dark:bg-slate-800/80 rounded-md" />
        </div>
        <div className="h-11 w-36 bg-blue-900/40 dark:bg-blue-900/60 rounded-xl shrink-0" />
      </div>

      {/* Filter / Search Bar Skeleton */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="h-11 flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        <div className="h-11 w-full sm:w-48 bg-slate-100 dark:bg-slate-800 rounded-xl" />
      </div>

      {/* Video List Skeleton Items */}
      <div className="space-y-3.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start sm:items-center gap-3.5 min-w-0">
              <div className="h-16 w-24 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-2 min-w-0">
                <div className="h-5 w-48 sm:w-72 bg-slate-200 dark:bg-slate-700 rounded-md" />
                <div className="flex items-center gap-2">
                  <div className="h-4 w-20 bg-slate-100 dark:bg-slate-800 rounded-md" />
                  <div className="h-4 w-16 bg-slate-100 dark:bg-slate-800 rounded-md" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <div className="h-6 w-16 bg-emerald-100/60 dark:bg-emerald-950/40 rounded-full" />
              <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
              <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
