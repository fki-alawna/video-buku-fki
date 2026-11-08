import { requireAdminUser } from '@/lib/admin-auth';
import { createServiceClient } from '@/lib/supabase/server';
import CalendarView from '@/components/CalendarView';
import type { CalendarNote } from '@/app/admin/(dashboard)/kalender/actions';

export const dynamic = 'force-dynamic';

export default async function AdminKalenderPage() {
  await requireAdminUser();

  const service = createServiceClient();

  let initialNotes: CalendarNote[] = [];
  let lastPingTime: string | null = null;

  try {
    const { data: notesData, error: notesError } = await service
      .from('calendar_notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!notesError && notesData) {
      initialNotes = notesData as CalendarNote[];
    }
  } catch (err) {
    console.error('Error fetching calendar_notes:', err);
  }

  try {
    const { data: statusData, error: statusError } = await service
      .from('system_status')
      .select('last_ping')
      .eq('id', 1)
      .maybeSingle();

    if (!statusError && statusData?.last_ping) {
      lastPingTime = statusData.last_ping;
    }
  } catch (err) {
    console.error('Error fetching system_status:', err);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Kalender & Pengingat Panitia
          </h1>
          <p className="text-sm text-slate-600">
            Sistem penanggalan terintegrasi Masehi & Hijriah dengan pemantauan Keep-Alive Supabase.
          </p>
        </div>
      </div>

      <CalendarView
        initialNotes={initialNotes}
        lastPingTime={lastPingTime}
      />
    </div>
  );
}
