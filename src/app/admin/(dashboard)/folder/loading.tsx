export default function FolderLoading() {
  return (
    <div
      role="status"
      aria-label="Memuat daftar folder..."
      className="space-y-6 animate-pulse"
    >
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-4 w-72 bg-slate-200/80 dark:bg-slate-800/80 rounded-md" />
      </div>

      {/* Action / Add Folder Card Skeleton */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="h-10 w-full sm:w-80 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        <div className="h-10 w-36 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      </div>

      {/* Folder Items Skeleton Grid/List */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4.5 sm:p-5 shadow-xs flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="h-11 w-11 shrink-0 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700" />
              <div className="space-y-2">
                <div className="h-5 w-40 sm:w-56 bg-slate-200 dark:bg-slate-700 rounded-md" />
                <div className="h-3.5 w-28 bg-slate-200/70 dark:bg-slate-700/70 rounded-md" />
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="h-7 w-20 bg-slate-100 dark:bg-slate-800 rounded-full" />
              <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
              <div className="h-9 w-9 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
