import Link from 'next/link';
import { Folder, Video, QrCode, ArrowRight } from 'lucide-react';

interface AdminStatsGridProps {
  folderCount: number;
  videoCount: number;
  activeVideoCount: number;
}

export default function AdminStatsGrid({
  folderCount,
  videoCount,
  activeVideoCount,
}: AdminStatsGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Ringkasan Sistem</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Kartu Total Folder */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">Total Folder</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-900">
                <Folder className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-blue-900">{folderCount}</p>
            <p className="mt-1 text-xs text-slate-500">Kategori penyimpanan video</p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/admin/folder"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <span>Kelola Folder</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Kartu Total Video */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">Total Video</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-900">
                <Video className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-blue-900">{videoCount}</p>
            <p className="mt-1 text-xs text-emerald-600 font-medium">
              {activeVideoCount} video aktif dapat diputar publik
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/admin/video"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <span>Kelola Video</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Kartu Cetak QR Code */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">Cetak QR Code</span>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                <QrCode className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-blue-900">{videoCount}</p>
            <p className="mt-1 text-xs text-slate-500">Kode QR siap cetak &amp; tempel</p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/admin/qr"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              <span>Buka Halaman Cetak</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
