import Link from 'next/link';

export default function VideoNotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
        <div className="w-full rounded-2xl border border-white/15 bg-neutral-900 p-8">
          <h1 className="text-2xl font-bold text-neutral-50">
            Video tidak ditemukan
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300">
            Tautan atau QR code yang Anda buka tidak tersedia, atau video sedang dinonaktifkan oleh admin.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-neutral-800 px-5 py-2.5 text-sm font-medium text-neutral-100 transition-colors hover:bg-neutral-700"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
