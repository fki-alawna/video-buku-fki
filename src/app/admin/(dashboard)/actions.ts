'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { assertAdminSession } from '@/lib/admin-auth';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { generateUniqueSlug, parseSortOrder } from '@/lib/slug-helpers';
import type { ActionState } from '@/lib/action-types';

export type { ActionState } from '@/lib/action-types';

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

    if (!name) {
      return { error: 'Nama folder wajib diisi.', success: null };
    }

    const service = createServiceClient();
    let sortOrder = 0;
    if (formData.has('sort_order') && formData.get('sort_order') !== '') {
      sortOrder = parseSortOrder(formData.get('sort_order'));
    } else {
      const { data: maxFolder } = await service
        .from('folders')
        .select('sort_order')
        .order('sort_order', { ascending: false })
        .limit(1)
        .maybeSingle();
      sortOrder = (maxFolder?.sort_order ?? -1) + 1;
    }

    const slug = await generateUniqueSlug('folders', name);

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

    if (!id) {
      return { error: 'ID folder tidak ditemukan.', success: null };
    }
    if (!name) {
      return { error: 'Nama folder wajib diisi.', success: null };
    }

    const service = createServiceClient();
    const updatePayload: { name: string; sort_order?: number } = { name };
    if (formData.has('sort_order') && formData.get('sort_order') !== '') {
      updatePayload.sort_order = parseSortOrder(formData.get('sort_order'));
    }

    const { error } = await service
      .from('folders')
      .update(updatePayload)
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

export async function updateFolderOrder(
  orderedIds: string[]
): Promise<ActionState> {
  try {
    await assertAdminSession();
    if (!orderedIds || orderedIds.length === 0) {
      return { error: 'Daftar ID tidak valid.', success: null };
    }

    const service = createServiceClient();
    for (let i = 0; i < orderedIds.length; i++) {
      const { error } = await service
        .from('folders')
        .update({ sort_order: i })
        .eq('id', orderedIds[i]);
      if (error) {
        throw new Error('Gagal memperbarui urutan folder.');
      }
    }

    revalidatePath('/admin');
    revalidatePath('/admin/folder');
    return { error: null, success: 'Urutan folder berhasil diperbarui.' };
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : 'Terjadi kesalahan saat memperbarui urutan.',
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
