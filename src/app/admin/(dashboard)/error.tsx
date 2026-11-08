'use client';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-300 bg-red-50 p-6 space-y-4"
    >
      <div>
        <h1 className="text-lg font-semibold text-red-900">
          Gagal memuat halaman admin
        </h1>
        <p className="mt-1 text-sm text-red-800">
          {error.message || 'Terjadi gangguan saat mengambil data dari Supabase.'}
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800"
      >
        Muat Ulang
      </button>
    </div>
  );
}
