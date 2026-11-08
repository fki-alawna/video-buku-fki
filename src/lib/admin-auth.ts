import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAllowedAdminEmail } from '@/lib/auth-config';

export async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/admin/login');
  }

  if (!isAllowedAdminEmail(user.email)) {
    redirect('/admin/login?error=forbidden');
  }

  return user;
}

export async function assertAdminSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !isAllowedAdminEmail(user.email)) {
    throw new Error('Akses ditolak. Silakan login kembali sebagai admin.');
  }

  return user;
}
