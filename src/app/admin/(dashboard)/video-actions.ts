'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { assertAdminSession } from '@/lib/admin-auth';
import { extractDriveFileId } from '@/lib/drive';
import { createServiceClient } from '@/lib/supabase/server';
import { generateUniqueSlug, parseSortOrder } from '@/lib/slug-helpers';
import type { ActionState } from '@/lib/action-types';

export type { ActionState } from '@/lib/action-types';

export async function createVideoAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  let createdSlug = '';

  try {
    await assertAdminSession();

    const title = String(formData.get('title') ?? '').trim();
    const folderIdRaw = String(formData.get('folder_id') ?? '').trim();
    const driveInput = String(formData.get('drive_link') ?? '').trim();
    const sortOrder = parseSortOrder(formData.get('sort_order'));
    const isActive = formData.get('is_active') === 'on';

    if (!title) {
      return { error: 'Judul video wajib diisi.', success: null };
    }

    const driveFileId = extractDriveFileId(driveInput);
    if (!driveFileId) {
      return { error: 'Link Drive tidak valid', success: null };
    }

    const slug = await generateUniqueSlug('videos', title);
    const service = createServiceClient();

    const { error } = await service.from('videos').insert({
      title,
      folder_id: folderIdRaw || null,
      drive_file_id: driveFileId,
      slug,
      sort_order: sortOrder,
      is_active: isActive,
    });

    if (error) {
      if (error.code === '23505') {
        return {
          error: 'Slug video bentrok, silakan coba simpan ulang.',
          success: null,
        };
      }
      return { error: 'Gagal menyimpan video baru.', success: null };
    }

    createdSlug = slug;
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan video.',
      success: null,
    };
  }

  revalidatePath('/admin');
  revalidatePath('/admin/video');
  revalidatePath('/admin/qr');
  if (createdSlug) {
    revalidatePath(`/v/${createdSlug}`);
  }
  redirect('/admin/video');
}

export async function updateVideoAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  let existingSlug = '';

  try {
    await assertAdminSession();

    const id = String(formData.get('id') ?? '').trim();
    const title = String(formData.get('title') ?? '').trim();
    const folderIdRaw = String(formData.get('folder_id') ?? '').trim();
    const driveInput = String(formData.get('drive_link') ?? '').trim();
    const sortOrder = parseSortOrder(formData.get('sort_order'));
    const isActive = formData.get('is_active') === 'on';

    if (!id) {
      return { error: 'ID video tidak ditemukan.', success: null };
    }

    if (!title) {
      return { error: 'Judul video wajib diisi.', success: null };
    }

    const driveFileId = extractDriveFileId(driveInput);
    if (!driveFileId) {
      return { error: 'Link Drive tidak valid', success: null };
    }

    const service = createServiceClient();
    const { data: existing, error: fetchError } = await service
      .from('videos')
      .select('id, slug')
      .eq('id', id)
      .maybeSingle();

    if (fetchError || !existing) {
      return { error: 'Data video tidak ditemukan.', success: null };
    }

    const { error: updateError } = await service
      .from('videos')
      .update({
        title,
        folder_id: folderIdRaw || null,
        drive_file_id: driveFileId,
        sort_order: sortOrder,
        is_active: isActive,
      })
      .eq('id', id);

    if (updateError) {
      return { error: 'Gagal memperbarui data video.', success: null };
    }

    existingSlug = existing.slug as string;
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat memperbarui video.',
      success: null,
    };
  }

  revalidatePath('/admin');
  revalidatePath('/admin/video');
  revalidatePath('/admin/qr');
  if (existingSlug) {
    revalidatePath(`/v/${existingSlug}`);
  }
  redirect('/admin/video');
}

export async function deleteVideoAction(
  videoId: string
): Promise<ActionState> {
  try {
    await assertAdminSession();
    if (!videoId) {
      return { error: 'ID video tidak valid.', success: null };
    }

    const service = createServiceClient();
    const { data: existing } = await service
      .from('videos')
      .select('slug')
      .eq('id', videoId)
      .maybeSingle();

    const { error } = await service.from('videos').delete().eq('id', videoId);
    if (error) {
      return { error: 'Gagal menghapus video.', success: null };
    }

    revalidatePath('/admin');
    revalidatePath('/admin/video');
    revalidatePath('/admin/qr');
    if (existing?.slug) {
      revalidatePath(`/v/${existing.slug as string}`);
    }
    return { error: null, success: 'Video berhasil dihapus.' };
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus video.',
      success: null,
    };
  }
}

export async function toggleVideoActiveAction(
  videoId: string,
  nextActive: boolean
): Promise<ActionState> {
  try {
    await assertAdminSession();
    if (!videoId) {
      return { error: 'ID video tidak valid.', success: null };
    }

    const service = createServiceClient();
    const { data: existing } = await service
      .from('videos')
      .select('slug')
      .eq('id', videoId)
      .maybeSingle();

    const { error } = await service
      .from('videos')
      .update({ is_active: nextActive })
      .eq('id', videoId);

    if (error) {
      return { error: 'Gagal mengubah status video.', success: null };
    }

    revalidatePath('/admin');
    revalidatePath('/admin/video');
    revalidatePath('/admin/qr');
    if (existing?.slug) {
      revalidatePath(`/v/${existing.slug as string}`);
    }
    return {
      error: null,
      success: nextActive ? 'Video diaktifkan.' : 'Video dinonaktifkan.',
    };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan saat mengubah status video.',
      success: null,
    };
  }
}
