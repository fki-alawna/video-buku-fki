import { createServiceClient } from '@/lib/supabase/server';

export const ADMIN_TOOLS = [
  {
    type: 'function',
    function: {
      name: 'get_system_report',
      description: 'Mengambil laporan jumlah total folder dan total video yang ada di sistem.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_dashboard_stats',
      description: 'Mengambil ringkasan statistik folder, video, dan status sistem saat ini.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_calendar_note',
      description: 'Membuat catatan agenda di kalender untuk tanggal tertentu.',
      parameters: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: 'Format tanggal YYYY-MM-DD (contoh: 2026-11-15)',
          },
          note: {
            type: 'string',
            description: 'Isi teks catatan agenda atau pengingat kegiatan',
          },
        },
        required: ['date', 'note'],
      },
    },
  },
];

export async function executeAdminTool(
  functionName: string,
  functionArgs: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const service = createServiceClient();

  if (functionName === 'get_system_report' || functionName === 'get_dashboard_stats') {
    const [foldersRes, videosRes, activeVideosRes] = await Promise.all([
      service.from('folders').select('id', { count: 'exact', head: true }),
      service.from('videos').select('id', { count: 'exact', head: true }),
      service
        .from('videos')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true),
    ]);

    const totalFolders = foldersRes.count ?? 0;
    const totalVideos = videosRes.count ?? 0;
    const activeVideos = activeVideosRes.count ?? 0;

    return {
      total_folders: totalFolders,
      total_videos: totalVideos,
      active_videos: activeVideos,
      total_qr_codes: activeVideos,
      status: 'ok',
    };
  }

  if (functionName === 'create_calendar_note') {
    const rawDate = String(functionArgs.date || '').trim();
    const rawNote = String(functionArgs.note || '').trim();

    if (!rawDate || !rawNote) {
      return {
        success: false,
        error: 'Tanggal dan isi catatan wajib disertakan.',
      };
    }

    const { data: noteData, error: noteError } = await service
      .from('calendar_notes')
      .insert({
        date: rawDate,
        note: rawNote,
      })
      .select('id, date, note')
      .single();

    if (noteError) {
      return {
        success: false,
        error: noteError.message,
      };
    }

    return {
      success: true,
      message: 'Catatan agenda berhasil disimpan ke database.',
      id: noteData?.id,
      date: rawDate,
      note: rawNote,
    };
  }

  return {
    success: false,
    error: `Fungsi '${functionName}' tidak dikenali.`,
  };
}
