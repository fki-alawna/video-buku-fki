import Link from 'next/link';
import PrintQrButton from '@/components/PrintQrButton';
import { createServiceClient } from '@/lib/supabase/server';
import type { Folder, Video } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminQrPage() {
  const service = createServiceClient();

  const [foldersRes, videosRes] = await Promise.all([
    service
      .from('folders')
      .select('id, name, slug, sort_order, created_at')
      .order('sort_order', { ascending: true }),
    service
      .from('videos')
      .select(
        'id, folder_id, title, drive_file_id, slug, sort_order, is_active, created_at'
      )
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }),
  ]);

  if (foldersRes.error || videosRes.error) {
    throw new Error('Gagal memuat daftar QR video dari Supabase.');
  }

  const folderMap = new Map(
    ((foldersRes.data ?? []) as Folder[]).map((f) => [f.id, f.name])
  );
  const videos = (videosRes.data ?? []) as Video[];
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ).replace(/\/+$/, '');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:mb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            QR Code Video
          </h1>
          <p className="mt-1 text-sm text-slate-600 print:hidden">
            Cetak seluruh QR code untuk ditempel atau dibagikan kepada penonton.
          </p>
        </div>

        {videos.length > 0 ? <PrintQrButton /> : null}
      </div>

      {videos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center print:hidden">
          <p className="text-sm text-slate-700">
            Belum ada video untuk dibuatkan QR code.
          </p>
          <div className="mt-4">
            <Link
              href="/admin/video/baru"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Tambah Video
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-4">
          {videos.map((video) => {
            const folderName = video.folder_id
              ? folderMap.get(video.folder_id) ?? null
              : null;
            const publicUrl = `${siteUrl}/v/${video.slug}`;

            return (
              <article
                key={video.id}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center break-inside-avoid print:rounded-lg print:border-slate-300 print:p-3"
              >
                {folderName ? (
                  <p className="text-xs font-medium text-slate-600 break-words">
                    {folderName}
                  </p>
                ) : null}

                <h2 className="mt-1 text-base font-semibold text-slate-900 break-words">
                  {video.title}
                </h2>

                {!video.is_active ? (
                  <span className="mt-1.5 inline-flex rounded border border-slate-300 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 print:hidden">
                    Nonaktif
                  </span>
                ) : null}

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/qr/${video.slug}.png`}
                    alt={`QR code untuk ${video.title}`}
                    width={256}
                    height={256}
                    className="h-44 w-44 object-contain print:h-36 print:w-36"
                  />
                </div>

                <p className="mt-3 w-full font-mono text-xs text-slate-700 break-all">
                  {publicUrl}
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2 print:hidden">
                  <Link
                    href={`/v/${video.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100"
                  >
                    Buka Video
                  </Link>
                  <a
                    href={`/qr/${video.slug}.png`}
                    download={`${video.slug}.png`}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 hover:bg-slate-100"
                  >
                    Unduh PNG
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
