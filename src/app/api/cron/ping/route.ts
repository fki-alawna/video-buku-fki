import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      const url = new URL(request.url);
      const isManual = url.searchParams.get('manual') === 'true';
      if (!isManual) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const service = createServiceClient();
    const url = new URL(request.url);
    const force = url.searchParams.get('force') === 'true';

    // 1. Ambil status ping terakhir
    const { data: statusRow, error: statusError } = await service
      .from('system_status')
      .select('id, last_ping')
      .eq('id', 1)
      .maybeSingle();

    if (statusError && statusError.code !== 'PGRST116') {
      // Jika tabel belum ada, jalankan query folder langsung agar database tetap aktif
      const { count } = await service
        .from('folders')
        .select('*', { count: 'exact', head: true });

      return NextResponse.json({
        ok: true,
        message: 'Ping Supabase berhasil dijalankan (tabel system_status belum tersedia).',
        folders_count: count ?? 0,
        pinged_at: new Date().toISOString(),
      });
    }

    const lastPingTime = statusRow?.last_ping ? new Date(statusRow.last_ping).getTime() : 0;
    const nowTime = Date.now();
    const diffDays = (nowTime - lastPingTime) / (1000 * 60 * 60 * 24);

    // Jalankan keep-alive jika selisih >= 6 hari atau force
    const shouldPing = force || diffDays >= 6 || !statusRow;

    if (shouldPing) {
      // Query ringan untuk mencegah pause database
      const { count } = await service
        .from('folders')
        .select('*', { count: 'exact', head: true });

      const newPingTime = new Date().toISOString();

      await service.from('system_status').upsert({
        id: 1,
        last_ping: newPingTime,
      });

      return NextResponse.json({
        ok: true,
        pinged: true,
        message: 'Database berhasil diping (Keep-Alive aktif).',
        folders_count: count ?? 0,
        last_ping: newPingTime,
        diff_days: Math.round(diffDays * 10) / 10,
      });
    }

    return NextResponse.json({
      ok: true,
      pinged: false,
      message: 'Database masih dalam interval aman (< 6 hari).',
      last_ping: statusRow.last_ping,
      diff_days: Math.round(diffDays * 10) / 10,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Gagal mengeksekusi cron ping.',
      },
      { status: 500 }
    );
  }
}
