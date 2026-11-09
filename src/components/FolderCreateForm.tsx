'use client';

import { useActionState, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  createFolderAction,
  type ActionState,
} from '@/app/admin/(dashboard)/actions';

const INITIAL_STATE: ActionState = { error: null, success: null };

export default function FolderCreateForm() {
  const [createState, createAction, isCreating] = useActionState(
    createFolderAction,
    INITIAL_STATE
  );
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (createState.success) {
      setNameInput('');
    }
  }, [createState.success]);

  return (
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
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 active:bg-blue-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isCreating ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              <span>Menyimpan...</span>
            </>
          ) : (
            'Tambah Folder'
          )}
        </button>
      </form>
    </section>
  );
}
