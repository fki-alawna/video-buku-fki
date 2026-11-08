import Link from 'next/link';
import { redirect } from 'next/navigation';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import { isAllowedAdminEmail } from '@/lib/auth-config';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && isAllowedAdminEmail(user.email)) {
        redirect('/admin');
      }
    } catch {
      // Abaikan jika session tidak tersedia saat halaman login dibuka.
    }
  }

  let errorBanner: string | null = null;
  if (error === 'forbidden') {
    errorBanner =
      'Akses ditolak. Akun Google yang digunakan tidak terdaftar sebagai admin.';
  } else if (error === 'auth_failed') {
    errorBanner = 'Login Google gagal atau dibatalkan. Silakan coba lagi.';
  } else if (error === 'config') {
    errorBanner =
      'Konfigurasi Supabase belum lengkap. Pastikan variabel lingkungan di .env.local sudah diisi.';
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 text-slate-900">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Login Admin</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Masuk menggunakan akun Google admin untuk mengelola folder, video, dan QR code.
        </p>

        {errorBanner ? (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
          >
            {errorBanner}
          </div>
        ) : null}

        <div className="mt-6">
          <GoogleLoginButton />
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 text-center">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center px-3 text-sm font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
          >
            Kembali ke halaman utama
          </Link>
        </div>
      </div>
    </main>
  );
}
