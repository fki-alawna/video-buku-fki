'use server';

import { revalidatePath } from 'next/cache';
import { assertAdminSession } from '@/lib/admin-auth';
import { createServiceClient } from '@/lib/supabase/server';

export interface CalendarNote {
  id: string;
  date: string;
  note: string;
  created_at: string;
}

export interface CalendarActionState {
  error: string | null;
  success: string | null;
}

export async function addCalendarNote(
  date: string,
  note: string
): Promise<CalendarActionState> {
  try {
    await assertAdminSession();
    const cleanDate = date.trim();
    const cleanNote = note.trim();

    if (!cleanDate) {
      return { error: 'Tanggal wajib diisi.', success: null };
    }
    if (!cleanNote) {
      return { error: 'Catatan tidak boleh kosong.', success: null };
    }

    // Pastikan format tanggal sesuai tipe data DATE (YYYY-MM-DD)
    const dateMatch = cleanDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!dateMatch) {
      return {
        error: 'Format tanggal tidak valid. Gunakan format YYYY-MM-DD.',
        success: null,
      };
    }
    const normalizedDate = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;

    const service = createServiceClient();
    const { error } = await service.from('calendar_notes').insert({
      date: normalizedDate,
      note: cleanNote,
    });

    if (error) {
      console.error('Supabase insert calendar_notes error:', error);
      return { error: `Gagal menyimpan catatan: ${error.message}`, success: null };
    }

    revalidatePath('/admin');
    revalidatePath('/admin/kalender');
    return { error: null, success: 'Catatan agenda berhasil disimpan.' };
  } catch (err) {
    console.error('Error in addCalendarNote / saveCalendarNote:', err);
    return {
      error: err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan catatan.',
      success: null,
    };
  }
}

// Alias function for compatibility
export const saveCalendarNote = addCalendarNote;

export async function deleteCalendarNote(
  noteId: string
): Promise<CalendarActionState> {
  try {
    await assertAdminSession();
    if (!noteId) {
      return { error: 'ID catatan tidak valid.', success: null };
    }

    const service = createServiceClient();
    const { error } = await service
      .from('calendar_notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      console.error('Supabase delete calendar_notes error:', error);
      return { error: `Gagal menghapus catatan: ${error.message}`, success: null };
    }

    revalidatePath('/admin');
    revalidatePath('/admin/kalender');
    return { error: null, success: 'Catatan berhasil dihapus.' };
  } catch (err) {
    console.error('Error in deleteCalendarNote:', err);
    return {
      error: err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus catatan.',
      success: null,
    };
  }
}

// Alias for compatibility
export const removeCalendarNote = deleteCalendarNote;

export async function triggerManualPing(): Promise<CalendarActionState> {
  try {
    await assertAdminSession();
    const service = createServiceClient();

    // Query ringan keep-alive
    await service.from('folders').select('id', { count: 'exact', head: true });

    const newPingTime = new Date().toISOString();
    await service.from('system_status').upsert({
      id: 1,
      last_ping: newPingTime,
    });

    revalidatePath('/admin/kalender');
    return { error: null, success: 'Server Supabase berhasil diping (Keep-Alive diperbarui).' };
  } catch (err) {
    console.error('Error in triggerManualPing:', err);
    return {
      error: err instanceof Error ? err.message : 'Gagal melakukan ping ke database.',
      success: null,
    };
  }
}
