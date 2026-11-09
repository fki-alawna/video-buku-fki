'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import {
  deleteVideoAction,
  toggleVideoActiveAction,
} from '@/app/admin/(dashboard)/video-actions';
import type { ActionState } from '@/lib/action-types';
import type { Folder, VideoWithFolder } from '@/lib/types';

interface VideoListProps {
  videos: VideoWithFolder[];
  folders: Folder[];
}

export default function VideoList({ videos, folders }: VideoListProps) {
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ActionState | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredVideos = videos.filter((video) => {
    if (selectedFolder === 'all') return true;
    if (selectedFolder === 'none') return !video.folder_id;
    return video.folder_id === selectedFolder;
  });

  function handleDelete(videoId: string) {
    setFeedback(null);
    startTransition(async () => {
      const res = await deleteVideoAction(videoId);
      setFeedback(res);
      setConfirmDeleteId(null);
    });
  }

  function handleToggleActive(videoId: string, currentActive: boolean) {
    setFeedback(null);
    startTransition(async () => {
      const res = await toggleVideoActiveAction(videoId, !currentActive);
      setFeedback(res);
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <label
            htmlFor="filter-folder"
            className="block text-sm font-medium text-slate-800"
          >
            Filter Folder
          </label>
          <select
            id="filter-folder"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900"
          >
            <option value="all">Semua Folder ({videos.length})</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
            <option value="none">Tanpa Folder</option>
          </select>
        </div>

        <Link
          href="/admin/video/baru"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 active:bg-blue-950 shadow-sm"
        >
          Tambah Video
        </Link>
      </div>

      {feedback?.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {feedback.error}
        </p>
      ) : null}

      {feedback?.success ? (
        <p
          role="status"
          aria-live="polite"
          className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          {feedback.success}
        </p>
      ) : null}

      {videos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-700">
            Belum ada video tersimpan. Tambahkan video Google Drive pertama Anda untuk menghasilkan QR code.
          </p>
          <div className="mt-4">
            <Link
              href="/admin/video/baru"
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 shadow-sm"
            >
              Tambah Video Pertama
            </Link>
          </div>
        </div>
      ) : filteredVideos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-700">
            Tidak ada video pada folder yang dipilih.
          </p>
          <button
            type="button"
            onClick={() => setSelectedFolder('all')}
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Tampilkan Semua Video
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredVideos.map((video) => (
            <article
              key={video.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 space-y-1.5">
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

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                    <span>
                      Folder:{' '}
                      <strong className="font-medium text-slate-800">
                        {video.folders?.name ?? 'Tanpa Folder'}
                      </strong>
                    </span>
                    <span>
                      Slug:{' '}
                      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800 break-all">
                        /v/{video.slug}
                      </code>
                    </span>
                    <span>Urutan: {video.sort_order}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/video/${video.id}/edit`}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 shadow-sm"
                  >
                    Edit / Ganti Link Drive
                  </Link>

                  <Link
                    href={`/v/${video.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100"
                  >
                    Lihat Player
                  </Link>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleToggleActive(video.id, video.is_active)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 disabled:opacity-60"
                  >
                    {video.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => setConfirmDeleteId(video.id)}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-800 transition-colors hover:bg-red-100 disabled:opacity-60"
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
                      onClick={() => handleDelete(video.id)}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 disabled:opacity-60"
                    >
                      {isPending ? 'Menghapus...' : 'Ya, Hapus Video'}
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => setConfirmDeleteId(null)}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
