'use client';

import { useActionState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import {
  updateFolderAction,
  type ActionState,
} from '@/app/admin/(dashboard)/actions';
import type { Folder } from '@/lib/types';

export interface FolderWithCount extends Folder {
  videoCount: number;
}

const INITIAL_STATE: ActionState = { error: null, success: null };

export default function FolderEditRow({
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
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 hover:scale-[1.02] active:scale-95 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              <span>Menyimpan...</span>
            </>
          ) : (
            'Simpan Perubahan'
          )}
        </button>
        <button
          type="button"
          onClick={onDone}
          disabled={isPending}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 hover:scale-[1.02] active:scale-95 hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
