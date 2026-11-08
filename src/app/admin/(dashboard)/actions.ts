'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { assertAdminSession } from '@/lib/admin-auth';
import { extractDriveFileId, slugifyText } from '@/lib/drive';
import { createClient, createServiceClient } from '@/lib/supabase/server';

export interface ActionState {
  error: string | null;
  success: string | null;
}

function parseSortOrder(raw: FormDataEntryValue | null): number {
  const parsed = Number.parseInt(String(raw ?? '0'), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function generateUniqueSlug(
  table: 'folders' | 'videos',
  title: string
): Promise<string> {
  const service = createServiceClient();
  const base = slugifyText(title, table === 'folders' ? 'folder' : 'video');

  const { data, error } = await service
    .from(table)
    .select('slug')
    .like('slug', `${base}%`);

  if (error) {
    throw new Error('Gagal memeriksa keunikan slug.');
  }

  const existing = new Set((data ?? []).map((item) => item.slug as string));
  if (!existing.has(base)) {
    return base;
  }

  let suffix = 2;
  while (existing.has(`${base}-${suffix}`)) {
    suffix += 1;
  }

  return `${base}-${suffix}`;
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

export async function createFolderAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await assertAdminSession();
    const name = String(formData.get('name') ?? '').trim();
    const sortOrder = parseSortOrder(formData.get('sort_order'));

    if (!name) {
      return { error: 'Nama folder wajib diisi.', success: null };
    }

    const slug = await generateUniqueSlug('folders', name);
    const service = createServiceClient();

    const { error } = await service.from('folders').insert({
      name,
      slug,
      sort_order: sortOrder,
    });

    if (error) {
      return { error: 'Gagal menyimpan folder baru.', success: null };
    }

    revalidatePath('/admin');
    revalidatePath('/admin/folder');
    revalidatePath('/admin/video');
    revalidatePath('/admin/video/baru');
    return { error: null, success: 'Folder berhasil ditambahkan.' };
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan folder.',
      success: null,
    };
  }
}

export async function updateFolderAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await assertAdminSession();
    const id = String(formData.get('id') ?? '').trim();
    const name = String(formData.get('name') ?? '').trim();
    const sortOrder = parseSortOrder(formData.get('sort_order'));

    if (!id) {
      return { error: 'ID folder tidak ditemukan.', success: null };
    }
    if (!name) {
      return { error: 'Nama folder wajib diisi.', success: null };
    }

    const service = createServiceClient();
    const { error } = await service
      .from('folders')
      .update({
        name,
        sort_order: sortOrder,
      })
      .eq('id', id);

    if (error) {
      return { error: 'Gagal memperbarui folder.', success: null };
    }

    revalidatePath('/admin');
    revalidatePath('/admin/folder');
    revalidatePath('/admin/video');
    revalidatePath('/admin/qr');
    return { error: null, success: 'Folder berhasil diperbarui.' };
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : 'Terjadi kesalahan saat memperbarui folder.',
      success: null,
    };
  }
}

export async function deleteFolderAction(
  folderId: string
): Promise<ActionState> {
  try {
    await assertAdminSession();
    if (!folderId) {
      return { error: 'ID folder tidak valid.', success: null };
    }

    const service = createServiceClient();
    const { error } = await service.from('folders').delete().eq('id', folderId);

    if (error) {
      return { error: 'Gagal menghapus folder.', success: null };
    }

    revalidatePath('/admin');
    revalidatePath('/admin/folder');
    revalidatePath('/admin/video');
    revalidatePath('/admin/qr');
    return { error: null, success: 'Folder berhasil dihapus.' };
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus folder.',
      success: null,
    };
  }
}

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
