export default function AdminLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-slate-200 bg-white p-8 text-center"
    >
      <p className="text-sm font-medium text-slate-700">
        Memuat data dasbor...
      </p>
    </div>
  );
}
