import Link from 'next/link';
import VideoForm from '@/components/VideoForm';
import { createServiceClient } from '@/lib/supabase/server';
import type { Folder } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function NewVideoPage() {
  const service = createServiceClient();
  const { data, error } = await service
    .from('folders')
    .select('id, name, slug, sort_order, created_at')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error('Gagal memuat daftar folder dari Supabase.');
  }

  const folders = (data ?? []) as Folder[];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tambah Video</h1>
          <p className="mt-1 text-sm text-slate-600">
            Tempel tautan berbagi Google Drive untuk menghasilkan halaman pemutar dan QR code.
          </p>
        </div>

        <Link
          href="/admin/video"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
        >
          Kembali ke Daftar Video
        </Link>
      </div>

      <VideoForm mode="create" folders={folders} />
    </div>
  );
}
