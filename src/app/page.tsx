import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Portal Video QR
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Kelola tautan video Google Drive dan cetak QR code untuk akses cepat penonton.
        </p>
        <div className="mt-8">
          <Link
            href="/admin/login"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-teal-700 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-800 active:bg-teal-900"
          >
            Login Admin
          </Link>
        </div>
      </section>
    </main>
  );
}
