'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import {
  createFolderAction,
  deleteFolderAction,
  updateFolderAction,
  updateFolderOrder,
  type ActionState,
} from '@/app/admin/(dashboard)/actions';
import type { Folder } from '@/lib/types';

interface FolderWithCount extends Folder {
  videoCount: number;
}

interface FolderManagerProps {
  folders: FolderWithCount[];
}

const INITIAL_STATE: ActionState = { error: null, success: null };

function FolderEditRow({
  folder,
  onDone,
}: {
  folder: FolderWithCount;
  onDone: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    updateFolderAction,
    INITIAL_STATE
  );

  useEffect(() => {
    if (state.success) {
      onDone();
    }
  }, [state.success, onDone]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onDone();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDone]);

  return (
    <form
      action={formAction}
      className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 space-y-4"
    >
      <input type="hidden" name="id" value={folder.id} />

      <div>
        <label
          htmlFor={`edit-folder-name-${folder.id}`}
          className="block text-sm font-medium text-slate-800"
        >
          Nama Folder
        </label>
        <input
          id={`edit-folder-name-${folder.id}`}
          name="name"
          type="text"
          required
          defaultValue={folder.name}
          className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900"
        />
      </div>

      <p className="text-xs text-slate-600">
        Slug tetap: <span className="font-mono text-slate-800">{folder.slug}</span>
      </p>

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:opacity-60"
        >
          {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
        <button
          type="button"
          onClick={onDone}
          disabled={isPending}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

export default function FolderManager({ folders }: FolderManagerProps) {
  const [createState, createAction, isCreating] = useActionState(
    createFolderAction,
    INITIAL_STATE
  );
  const [nameInput, setNameInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<ActionState | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();
  const [, startReorderTransition] = useTransition();

  const [folderList, setFolderList] = useState<FolderWithCount[]>(folders);

  useEffect(() => {
    setFolderList(folders);
  }, [folders]);

  useEffect(() => {
    if (createState.success) {
      setNameInput('');
    }
  }, [createState.success]);

  function handleReorder(newOrder: FolderWithCount[]) {
    setFolderList(newOrder);
    startReorderTransition(async () => {
      const res = await updateFolderOrder(newOrder.map((f) => f.id));
      if (res.error) {
        setActionFeedback(res);
      }
    });
  }

  function handleDelete(folderId: string) {
    setActionFeedback(null);
    startDeleteTransition(async () => {
      const result = await deleteFolderAction(folderId);
      setActionFeedback(result);
      setConfirmDeleteId(null);
    });
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Tambah Folder</h2>

        <form action={createAction} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="folder-name"
              className="block text-sm font-medium text-slate-800"
            >
              Nama Folder
            </label>
            <input
              id="folder-name"
              name="name"
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Contoh: Dokumentasi Kegiatan"
              className="mt-1.5 block min-h-[44px] w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-500"
            />
          </div>

          {createState.error ? (
            <p
              role="alert"
              className="rounded-xl border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm text-red-800"
            >
              {createState.error}
            </p>
          ) : null}

          {createState.success ? (
            <p
              role="status"
              aria-live="polite"
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-900"
            >
              {createState.success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isCreating}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 active:bg-blue-950 disabled:opacity-60"
          >
            {isCreating ? 'Menyimpan...' : 'Tambah Folder'}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Daftar Folder ({folderList.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tarik dan lepas item untuk mengatur urutan tampilan.
            </p>
          </div>
        </div>

        {actionFeedback?.error ? (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-300 bg-red-50 px-3.5 py-2.5 text-sm text-red-800"
          >
            {actionFeedback.error}
          </p>
        ) : null}

        {actionFeedback?.success ? (
          <p
            role="status"
            aria-live="polite"
            className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2.5 text-sm text-emerald-900"
          >
            {actionFeedback.success}
          </p>
        ) : null}

        {folderList.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-700">
              Belum ada folder. Tambahkan folder pertama menggunakan formulir di atas.
            </p>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={folderList}
            onReorder={handleReorder}
            className="mt-4 space-y-3"
          >
            {folderList.map((folder, index) => (
              <Reorder.Item
                key={folder.id}
                value={folder}
                className="select-none"
              >
                {editingId === folder.id ? (
                  <FolderEditRow
                    folder={folder}
                    onDone={() => setEditingId(null)}
                  />
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-shadow hover:shadow-xs">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <div
                          className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-200/50 transition-colors"
                          title="Tarik untuk mengatur urutan"
                        >
                          <GripVertical className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <h3 className="text-base font-semibold text-slate-900 break-words">
                            {folder.name}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                            <span>
                              Slug:{' '}
                              <span className="font-mono text-slate-800">
                                {folder.slug}
                              </span>
                            </span>
                            <span>Posisi: #{index + 1}</span>
                            <span>{folder.videoCount} video</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex flex-wrap gap-2 shrink-0 ml-8 sm:ml-0"
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmDeleteId(null);
                            setEditingId(folder.id);
                          }}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setConfirmDeleteId(folder.id);
                          }}
                          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-800 transition-colors hover:bg-red-100 cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>

                    {confirmDeleteId === folder.id ? (
                      <div
                        role="alertdialog"
                        aria-label={`Konfirmasi hapus folder ${folder.name}`}
                        className="mt-3 rounded-xl border border-red-300 bg-red-50 p-3.5"
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <p className="text-sm text-red-900">
                          Hapus folder <strong>{folder.name}</strong>?
                          {folder.videoCount > 0
                            ? ` Seluruh ${folder.videoCount} video di dalamnya juga akan ikut terhapus.`
                            : ''}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() => handleDelete(folder.id)}
                            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 disabled:opacity-60 cursor-pointer"
                          >
                            {isDeleting ? 'Menghapus...' : 'Ya, Hapus Folder'}
                          </button>
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() => setConfirmDeleteId(null)}
                            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 cursor-pointer"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </section>
    </div>
  );
}
