import { createServiceClient } from '@/lib/supabase/server';
import AdminHeroBanner from '@/components/admin/AdminHeroBanner';
import AdminTodayNotesCard, {
  type TodayNoteItem,
} from '@/components/admin/AdminTodayNotesCard';
import AdminStatsGrid from '@/components/admin/AdminStatsGrid';
import AdminLatestVideos, {
  type LatestVideoItem,
} from '@/components/admin/AdminLatestVideos';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const service = createServiceClient();

  const [folderCountRes, videoCountRes, activeVideoCountRes, latestVideosRes] =
    await Promise.all([
      service.from('folders').select('id', { count: 'exact', head: true }),
      service.from('videos').select('id', { count: 'exact', head: true }),
      service
        .from('videos')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true),
      service
        .from('videos')
        .select('id, title, slug, is_active, created_at, folders(name)')
        .order('created_at', { ascending: false })
        .limit(4),
    ]);

  const queryError =
    folderCountRes.error || videoCountRes.error || activeVideoCountRes.error;

  const folderCount = folderCountRes.count ?? 0;
  const videoCount = videoCountRes.count ?? 0;
  const activeVideoCount = activeVideoCountRes.count ?? 0;
  const latestVideos = (latestVideosRes.data ?? []) as unknown as LatestVideoItem[];

  const todayStr = new Date().toISOString().split('T')[0];
  let todayNotes: TodayNoteItem[] = [];
  try {
    const { data: notesData } = await service
      .from('calendar_notes')
      .select('id, date, note, created_at')
      .eq('date', todayStr)
      .order('created_at', { ascending: false });
    if (notesData) {
      todayNotes = notesData;
    }
  } catch {
    // Ignore if table not yet created
  }

  return (
    <div className="space-y-8">
      <AdminHeroBanner />

      {queryError ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          Gagal mengambil ringkasan data dari Supabase. Pastikan tabel `folders` dan `videos` sudah dibuat melalui migrasi SQL.
        </div>
      ) : null}

      <AdminTodayNotesCard todayNotes={todayNotes} />

      <AdminStatsGrid
        folderCount={folderCount}
        videoCount={videoCount}
        activeVideoCount={activeVideoCount}
      />

      <AdminLatestVideos latestVideos={latestVideos} />
    </div>
  );
}
