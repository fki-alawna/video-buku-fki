import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DriveVideoPlayer from '@/components/DriveVideoPlayer';
import { createServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface VideoPageProps {
  params: Promise<{ slug: string }>;
}

async function getActiveVideoBySlug(slug: string) {
  const service = createServiceClient();

  const { data: video, error } = await service
    .from('videos')
    .select('id, folder_id, title, drive_file_id, slug, is_active')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error) {
    throw new Error('Gagal memuat data video.');
  }

  if (!video) {
    return null;
  }

  let folderName: string | null = null;
  if (video.folder_id) {
    const { data: folder } = await service
      .from('folders')
      .select('name')
      .eq('id', video.folder_id as string)
      .maybeSingle();
    folderName = (folder?.name as string | undefined) ?? null;
  }

  return {
    id: video.id as string,
    title: video.title as string,
    drive_file_id: video.drive_file_id as string,
    slug: video.slug as string,
    folderName,
  };
}

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const video = await getActiveVideoBySlug(slug);
    if (!video) {
      return { title: 'Video Tidak Ditemukan' };
    }
    return {
      title: `${video.title} - Portal Video QR`,
    };
  } catch {
    return { title: 'Pemutar Video - Portal Video QR' };
  }
}

export default async function PublicVideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = await getActiveVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  return (
    <div className="h-dvh w-full bg-black text-white flex flex-col overflow-hidden">
      <header className="px-4 py-2 sm:px-6 sm:py-3 flex-shrink-0 bg-neutral-950/90 border-b border-neutral-900 landscape:hidden lg:landscape:block">
        {video.folderName ? (
          <p className="text-xs font-medium text-neutral-400 truncate">
            {video.folderName}
          </p>
        ) : null}
        <h1 className="text-sm sm:text-base font-semibold text-white truncate">
          {video.title}
        </h1>
      </header>

      <main className="flex-1 w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
        <DriveVideoPlayer
          fileId={video.drive_file_id}
          title={video.title}
        />
      </main>
    </div>
  );
}
