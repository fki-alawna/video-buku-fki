import Link from 'next/link';
import Image from 'next/image';
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
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 sm:py-12 text-slate-900">
      <div className="relative w-full max-w-2xl lg:max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Kolom Kiri: Form & Tombol Login (50%) */}
        <div className="w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div>
            {/* Logo A'lawna di Pojok Kiri Atas */}
            <div className="flex items-center gap-2.5 mb-6">
              <Image
                src="/logo-alawna.png"
                alt="Logo A'lawna"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
                priority
              />
              <span className="text-xl font-black tracking-tight text-slate-900">
                A&apos;lawna
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Portal Admin A&apos;lawna
            </h1>

            {errorBanner && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-900"
              >
                {errorBanner}
              </div>
            )}
          </div>

          <div className="my-8">
            <GoogleLoginButton />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Foto Portrait HD (50%) */}
        <div className="relative hidden md:block w-full h-full min-h-[380px] aspect-[3/4] bg-slate-100 overflow-hidden">
          <Image
            src="/foto-login.jpg"
            alt="Foto Login A'lawna"
            fill
            priority
            unoptimized={true}
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </main>
  );
}
