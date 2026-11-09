'use client';

import Link from 'next/link';
import { useActionState, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  createVideoAction,
  updateVideoAction,
} from '@/app/admin/(dashboard)/video-actions';
import type { ActionState } from '@/lib/action-types';
import { extractDriveFileId } from '@/lib/drive';
import type { Folder, Video } from '@/lib/types';

interface VideoFormProps {
  mode: 'create' | 'edit';
  folders: Folder[];
  initialVideo?: Video;
}

const INITIAL_STATE: ActionState = { error: null, success: null };

export default function VideoForm({
  mode,
  folders,
  initialVideo,
}: VideoFormProps) {
  const actionFn = mode === 'create' ? createVideoAction : updateVideoAction;
  const [state, formAction, isPending] = useActionState(actionFn, INITIAL_STATE);

  const defaultFolderId =
    initialVideo?.folder_id ??
    folders.find((f) => f.slug === 'umum')?.id ??
    folders[0]?.id ??
    '';

  const [driveInput, setDriveInput] = useState(
    initialVideo?.drive_file_id ?? ''
  );
  const [replacePrompted, setReplacePrompted] = useState(false);
  const driveInputRef = useRef<HTMLInputElement>(null);

  const parsedId = driveInput.trim() ? extractDriveFileId(driveInput) : null;
  const showFormatWarning = driveInput.trim().length > 0 && !parsedId;

  function handleFocusReplaceDrive() {
    setReplacePrompted(true);
    setDriveInput('');
    requestAnimationFrame(() => {
      driveInputRef.current?.focus();
    });
  }

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      {mode === 'edit' && initialVideo ? (
        <input type="hidden" name="id" value={initialVideo.id} />
      ) : null}

      <div>
        <label
          htmlFor="video-title"
          className="block text-sm font-medium text-slate-800"
        >
          Judul Video <span className="text-red-700">*</span>
        </label>
        <input
          id="video-title"
          name="title"
          type="text"
          required
          defaultValue={initialVideo?.title ?? ''}
          placeholder="Contoh: Sambutan Ketua Panitia"
          className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-500"
        />
      </div>

      {mode === 'edit' && initialVideo ? (
        <div>
          <span className="block text-sm font-medium text-slate-800">
            Slug Publik (Tetap)
          </span>
          <p
            aria-readonly="true"
            className="mt-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 font-mono text-sm text-slate-800 break-all"
          >
            /v/{initialVideo.slug}
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Slug dibuat saat video pertama kali disimpan dan tidak berubah meskipun judul atau link Drive diganti, sehingga QR code lama tetap valid.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="video-folder"
            className="block text-sm font-medium text-slate-800"
          >
            Folder
          </label>
          <select
            id="video-folder"
            name="folder_id"
            defaultValue={defaultFolderId}
            className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900"
          >
            <option value="">Tanpa Folder</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="video-sort"
            className="block text-sm font-medium text-slate-800"
          >
            Urutan
          </label>
          <input
            id="video-sort"
            name="sort_order"
            type="number"
            defaultValue={initialVideo?.sort_order ?? 0}
            className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900"
          />
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label
            htmlFor="video-drive-link"
            className="block text-sm font-medium text-slate-800"
          >
            Link atau ID File Google Drive <span className="text-red-700">*</span>
          </label>

          {mode === 'edit' ? (
            <button
              type="button"
              onClick={handleFocusReplaceDrive}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-blue-900 bg-blue-50 px-3.5 py-1.5 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-100"
            >
              Ganti Link Drive
            </button>
          ) : null}
        </div>

        <input
          ref={driveInputRef}
          id="video-drive-link"
          name="drive_link"
          type="text"
          required
          value={driveInput}
          onChange={(e) => setDriveInput(e.target.value)}
          aria-invalid={showFormatWarning || Boolean(state.error)}
          aria-describedby="drive-link-help"
          placeholder="Tempel tautan berbagi Google Drive atau ID file"
          className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-500"
        />

        <p id="drive-link-help" className="mt-1.5 text-xs text-slate-600">
          {replacePrompted
            ? 'Tempel link Google Drive baru pada kolom di atas, lalu klik Simpan Perubahan.'
            : 'Sistem mengekstrak ID file secara otomatis dari tautan Google Drive dan hanya menyimpan ID file tersebut.'}
        </p>

        {parsedId ? (
          <p className="mt-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
            ID file terdeteksi: <span className="font-mono">{parsedId}</span>
          </p>
        ) : null}

        {showFormatWarning ? (
          <p
            role="alert"
            className="mt-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900"
          >
            Format link Drive belum dikenali. Gunakan tautan file Google Drive yang valid.
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <input
          id="video-active"
          name="is_active"
          type="checkbox"
          defaultChecked={initialVideo ? initialVideo.is_active : true}
          className="h-5 w-5 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
        />
        <label
          htmlFor="video-active"
          className="text-sm font-medium text-slate-800"
        >
          Aktif (dapat diputar melalui halaman publik dan QR code)
        </label>
      </div>

      {state.error ? (
        <div
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
        >
          {state.error}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 active:bg-blue-950 hover:scale-[1.02] active:scale-95 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              <span>Menyimpan...</span>
            </>
          ) : mode === 'create' ? (
            'Simpan Video'
          ) : (
            'Simpan Perubahan'
          )}
        </button>

        <Link
          href="/admin/video"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 hover:scale-[1.02] active:scale-95 hover:shadow-md transition-all duration-300"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
