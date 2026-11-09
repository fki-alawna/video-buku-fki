export default function AdminLoading() {
  return (
    <div
      role="status"
      aria-label="Memuat data dasbor..."
      className="space-y-8 animate-pulse"
    >
      {/* Skeleton Hero Banner */}
      <div className="h-44 sm:h-52 w-full rounded-3xl bg-slate-200/80 p-6 flex flex-col justify-center space-y-4">
        <div className="h-7 w-64 bg-slate-300 rounded-xl" />
        <div className="h-4 w-96 max-w-full bg-slate-300/70 rounded-lg" />
        <div className="flex gap-3 pt-2">
          <div className="h-10 w-36 bg-slate-300 rounded-xl" />
          <div className="h-10 w-32 bg-slate-300 rounded-xl" />
        </div>
      </div>

      {/* Skeleton 3 Kotak Statistik */}
      <div className="space-y-4">
        <div className="h-6 w-40 bg-slate-200 rounded-lg" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between h-40"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-slate-200 rounded-md" />
                  <div className="h-10 w-10 bg-slate-200 rounded-xl" />
                </div>
                <div className="h-8 w-16 bg-slate-200 rounded-lg" />
              </div>
              <div className="h-4 w-28 bg-slate-200/80 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton Tabel / Card Daftar Terkini */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="h-6 w-36 bg-slate-200 rounded-lg" />
          <div className="h-4 w-20 bg-slate-200 rounded-md" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-14 w-full bg-slate-100 rounded-xl flex items-center justify-between px-4"
            >
              <div className="space-y-1.5">
                <div className="h-4 w-48 bg-slate-200 rounded-md" />
                <div className="h-3 w-32 bg-slate-200/70 rounded-md" />
              </div>
              <div className="h-8 w-20 bg-slate-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
