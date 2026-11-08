import Link from 'next/link';
import { createServiceClient } from '@/lib/supabase/server';
import { Folder, Video, QrCode } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const service = createServiceClient();

  const [folderCountRes, videoCountRes, activeVideoCountRes] =
    await Promise.all([
      service.from('folders').select('id', { count: 'exact', head: true }),
      service.from('videos').select('id', { count: 'exact', head: true }),
      service
        .from('videos')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true),
    ]);

  const queryError =
    folderCountRes.error || videoCountRes.error || activeVideoCountRes.error;

  const folderCount = folderCountRes.count ?? 0;
  const videoCount = videoCountRes.count ?? 0;
  const activeVideoCount = activeVideoCountRes.count ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Dasbor</h1>
        <p className="mt-1 text-sm text-slate-600">
          Ringkasan folder, video Google Drive, dan halaman cetak QR code.
        </p>
      </div>

      {queryError ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          Gagal mengambil ringkasan data dari Supabase. Pastikan tabel `folders` dan `videos` sudah dibuat melalui migrasi SQL.
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* Kartu Statistik Folder */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">Total Folder</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                <Folder className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-blue-900">{folderCount}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/admin/folder"
              className="inline-flex min-h-[40px] items-center text-sm font-semibold text-blue-900 hover:text-blue-800 hover:underline"
            >
              Kelola Folder →
            </Link>
          </div>
        </div>

        {/* Kartu Statistik Video */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">Total Video</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                <Video className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-blue-900">{videoCount}</p>
            <p className="mt-1 text-xs text-slate-500">
              {activeVideoCount} aktif di halaman publik
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/admin/video"
              className="inline-flex min-h-[40px] items-center text-sm font-semibold text-blue-900 hover:text-blue-800 hover:underline"
            >
              Kelola Video →
            </Link>
          </div>
        </div>

        {/* Kartu Cetak QR Code */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-600">Cetak QR Code</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                <QrCode className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-base font-semibold text-slate-800">
              Siap dicetak untuk semua video
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/admin/qr"
              className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800 hover:shadow-md transition-all cursor-pointer"
            >
              Buka Halaman QR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
