import Link from 'next/link';
import type { VideoWithFolder } from '@/lib/types';

interface VideoListItemProps {
  video: VideoWithFolder;
  isPending: boolean;
  confirmDeleteId: string | null;
  onToggleActive: (videoId: string, currentActive: boolean) => void;
  onConfirmDelete: (videoId: string) => void;
  onCancelDelete: () => void;
  onDelete: (videoId: string) => void;
}

export default function VideoListItem({
  video,
  isPending,
  confirmDeleteId,
  onToggleActive,
  onConfirmDelete,
  onCancelDelete,
  onDelete,
}: VideoListItemProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900 break-words">
              {video.title}
            </h2>
            <span
              className={
                video.is_active
                  ? 'inline-flex items-center rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-900'
                  : 'inline-flex items-center rounded-md border border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700'
              }
            >
              {video.is_active ? 'Aktif' : 'Nonaktif'}
            </span>
          </div>

          {/* Info Folder & Urutan di baris 1, Slug di baris baru agar tidak terpotong di HP */}
          <div className="space-y-1 text-xs sm:text-sm text-slate-600">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>
                Folder:{' '}
                <strong className="font-semibold text-slate-800">
                  {video.folders?.name ?? 'Tanpa Folder'}
                </strong>
              </span>
              <span>
                Urutan:{' '}
                <strong className="font-semibold text-slate-800">
                  {video.sort_order}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span>Slug:</span>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800 break-all">
                /v/{video.slug}
              </code>
            </div>
          </div>
        </div>

        {/* Deretan Tombol: Di HP menjadi Grid 2x2 atau tersusun rapi, di Desktop sejajar horizontal */}
        <div className="grid grid-cols-2 md:flex md:flex-row gap-2 w-full md:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <Link
            href={`/admin/video/${video.id}/edit`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-3 py-2 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-blue-800 shadow-sm text-center"
          >
            Edit Video
          </Link>

          <Link
            href={`/v/${video.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 text-center"
          >
            Lihat Player
          </Link>

          <button
            type="button"
            disabled={isPending}
            onClick={() => onToggleActive(video.id, video.is_active)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 disabled:opacity-60 text-center cursor-pointer"
          >
            {video.is_active ? 'Nonaktifkan' : 'Aktifkan'}
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={() => onConfirmDelete(video.id)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-xs sm:text-sm font-medium text-red-800 transition-colors hover:bg-red-100 disabled:opacity-60 text-center cursor-pointer"
          >
            Hapus
          </button>
        </div>
      </div>

      {confirmDeleteId === video.id ? (
        <div
          role="alertdialog"
          aria-label={`Konfirmasi hapus video ${video.title}`}
          className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3.5"
        >
          <p className="text-sm text-red-900">
            Hapus video <strong>{video.title}</strong>? QR code dengan slug{' '}
            <span className="font-mono">/v/{video.slug}</span> tidak akan bisa dibuka lagi.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() => onDelete(video.id)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 disabled:opacity-60 cursor-pointer"
            >
              {isPending ? 'Menghapus...' : 'Ya, Hapus Video'}
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={onCancelDelete}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}
