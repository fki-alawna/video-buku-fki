import { slugifyText } from '@/lib/drive';
import { createServiceClient } from '@/lib/supabase/server';

export function parseSortOrder(raw: FormDataEntryValue | null): number {
  const parsed = Number.parseInt(String(raw ?? '0'), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function generateUniqueSlug(
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
    throw new Error(`Gagal memeriksa keunikan slug ${table}.`);
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
