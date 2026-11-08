'use client';

export default function PublicVideoError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
        <div
          role="alert"
          className="w-full rounded-2xl border border-red-400/30 bg-neutral-900 p-8"
        >
          <h1 className="text-xl font-bold text-neutral-50">
            Gagal memuat video
          </h1>
          <p className="mt-2 text-sm text-neutral-300">
            Terjadi kendala saat mengambil informasi video. Coba muat ulang halaman.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            Muat Ulang
          </button>
        </div>
      </main>
    </div>
  );
}
