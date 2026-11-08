import VideoList from '@/components/VideoList';
import { createServiceClient } from '@/lib/supabase/server';
import type { Folder, Video, VideoWithFolder } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminVideoPage() {
  const service = createServiceClient();

  const [foldersRes, videosRes] = await Promise.all([
    service
      .from('folders')
      .select('id, name, slug, sort_order, created_at')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }),
    service
      .from('videos')
      .select(
        'id, folder_id, title, drive_file_id, slug, sort_order, is_active, created_at'
      )
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }),
  ]);

  if (foldersRes.error || videosRes.error) {
    throw new Error('Gagal memuat daftar video dari Supabase.');
  }

  const folders = (foldersRes.data ?? []) as Folder[];
  const folderById = new Map(folders.map((folder) => [folder.id, folder]));

  const videos: VideoWithFolder[] = ((videosRes.data ?? []) as Video[]).map(
    (video) => {
      const matched = video.folder_id
        ? folderById.get(video.folder_id) ?? null
        : null;
      return {
        ...video,
        folders: matched
          ? { id: matched.id, name: matched.name, slug: matched.slug }
          : null,
      };
    }
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Kelola Video</h1>
        <p className="mt-1 text-sm text-slate-600">
          Tambah video Google Drive baru, ganti link Drive tanpa mengubah slug QR, atau atur status tampil.
        </p>
      </div>

      <VideoList videos={videos} folders={folders} />
    </div>
  );
}
