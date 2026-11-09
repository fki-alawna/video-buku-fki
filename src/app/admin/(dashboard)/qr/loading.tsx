export default function QrLoading() {
  return (
    <div
      role="status"
      aria-label="Memuat daftar QR code..."
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

      {/* Grid of QR Code Cards (6 cards) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 text-center shadow-xs space-y-4"
          >
            <div className="space-y-1.5 w-full flex flex-col items-center">
              <div className="h-3.5 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded-md" />
            </div>

            {/* QR Box */}
            <div className="h-48 w-48 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-4">
              <div className="h-full w-full bg-slate-200 dark:bg-slate-700 rounded-lg" />
            </div>

            {/* Buttons */}
            <div className="w-full flex items-center justify-center gap-2 pt-1">
              <div className="h-9 w-28 bg-slate-100 dark:bg-slate-800 rounded-xl" />
              <div className="h-9 w-24 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
