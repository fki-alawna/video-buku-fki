import Link from 'next/link';
import Image from 'next/image';
import { Plus, QrCode } from 'lucide-react';

export default function AdminHeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 text-white p-6 sm:p-8 lg:p-10 shadow-lg">
      {/* Decorative Blurred Glow Elements */}
      <div
        className="absolute -right-8 -bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-32 -top-10 h-48 w-48 rounded-full bg-amber-400/15 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Teks Sambutan Kiri */}
        <div className="max-w-xl space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Selamat Datang, Admin A&apos;lawna!
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Kelola video Google Drive, atur pengelompokan folder, dan cetak QR Code santriwati dengan mudah dan terorganisir.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/admin/video/baru"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-950 hover:bg-amber-400 hover:text-blue-950 font-bold px-5 py-2.5 text-sm shadow-md hover:scale-[1.02] active:scale-95 hover:shadow-md transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Video Baru</span>
            </Link>
            <Link
              href="/admin/qr"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 text-sm backdrop-blur-xs hover:scale-[1.02] active:scale-95 hover:shadow-md transition-all duration-300"
            >
              <QrCode className="h-4 w-4" />
              <span>Buka Cetak QR</span>
            </Link>
          </div>
        </div>

        {/* Ilustrasi Logo Kanan */}
        <div className="hidden sm:flex items-center justify-center shrink-0">
          <div className="relative flex h-32 w-32 lg:h-40 lg:w-40 items-center justify-center">
            <Image
              src="/logo-alawna.png"
              alt="Emblem A'lawna"
              width={160}
              height={160}
              className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(251,191,36,0.4)]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
