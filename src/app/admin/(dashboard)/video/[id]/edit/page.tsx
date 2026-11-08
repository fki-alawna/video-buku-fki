import Link from 'next/link';
import { notFound } from 'next/navigation';
import VideoForm from '@/components/VideoForm';
import { createServiceClient } from '@/lib/supabase/server';
import type { Folder, Video } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface EditVideoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVideoPage({ params }: EditVideoPageProps) {
  const { id } = await params;
  const service = createServiceClient();

  const [videoRes, foldersRes] = await Promise.all([
    service
      .from('videos')
      .select(
        'id, folder_id, title, drive_file_id, slug, sort_order, is_active, created_at'
      )
      .eq('id', id)
      .maybeSingle(),
    service
      .from('folders')
      .select('id, name, slug, sort_order, created_at')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }),
  ]);

  if (videoRes.error || foldersRes.error) {
    throw new Error('Gagal memuat data video dari Supabase.');
  }

  if (!videoRes.data) {
    notFound();
  }

  const video = videoRes.data as Video;
  const folders = (foldersRes.data ?? []) as Folder[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Edit Video / Ganti Link Drive
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Perbarui detail atau ganti tautan Google Drive tanpa mengubah slug QR.
          </p>
        </div>

        <Link
          href="/admin/video"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
        >
          Kembali ke Daftar Video
        </Link>
      </div>

      <VideoForm mode="edit" folders={folders} initialVideo={video} />
    </div>
  );
}
