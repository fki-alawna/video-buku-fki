import Link from 'next/link';
import { createServiceClient } from '@/lib/supabase/server';

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
        <h1 className="text-2xl font-bold text-slate-900">Dasbor Admin</h1>
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-600">Total Folder</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{folderCount}</p>
          <div className="mt-4">
            <Link
              href="/admin/folder"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-teal-800 hover:underline"
            >
              Kelola Folder
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-600">Total Video</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{videoCount}</p>
          <p className="mt-1 text-xs text-slate-600">
            {activeVideoCount} aktif di halaman publik
          </p>
          <div className="mt-2">
            <Link
              href="/admin/video"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-teal-800 hover:underline"
            >
              Kelola Video
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-600">Cetak QR Code</p>
          <p className="mt-2 text-base font-semibold text-slate-900">
            Siap dicetak untuk semua video
          </p>
          <div className="mt-4">
            <Link
              href="/admin/qr"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
            >
              Buka Halaman QR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
