import FolderManager from '@/components/FolderManager';
import { createServiceClient } from '@/lib/supabase/server';
import type { Folder } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminFolderPage() {
  const service = createServiceClient();

  const [foldersRes, videosRes] = await Promise.all([
    service
      .from('folders')
      .select('id, name, slug, sort_order, created_at')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }),
    service.from('videos').select('id, folder_id'),
  ]);

  if (foldersRes.error || videosRes.error) {
    throw new Error('Gagal memuat daftar folder dari Supabase.');
  }

  const countByFolder = new Map<string, number>();
  for (const row of videosRes.data ?? []) {
    if (row.folder_id) {
      const id = row.folder_id as string;
      countByFolder.set(id, (countByFolder.get(id) ?? 0) + 1);
    }
  }

  const folders = ((foldersRes.data ?? []) as Folder[]).map((folder) => ({
    ...folder,
    videoCount: countByFolder.get(folder.id) ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kelola Folder</h1>
        <p className="mt-1 text-sm text-slate-600">
          Buat, ubah, atau hapus folder pengelompokan video.
        </p>
      </div>

      <FolderManager folders={folders} />
    </div>
  );
}
