'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { logoutAction } from '@/app/admin/(dashboard)/actions';

interface AdminShellProps {
  userEmail: string;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: '/admin', label: 'Dasbor' },
  { href: '/admin/folder', label: 'Folder' },
  { href: '/admin/video', label: 'Video' },
  { href: '/admin/qr', label: 'QR' },
];

function LogoutSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-60 cursor-pointer"
    >
      {pending ? 'Keluar...' : 'Logout'}
    </button>
  );
}

export default function AdminShell({ userEmail, children }: AdminShellProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 print:bg-white">
      <header className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/admin"
            className="inline-flex min-h-[44px] items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 hover:text-blue-900 transition-colors"
          >
            <Image
              src="/logo-alawna.png"
              alt="Logo A'lawna"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span>A&apos;lawna Admin</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-700 break-all">
              {userEmail}
            </span>
            <form action={logoutAction}>
              <LogoutSubmitButton />
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-8 lg:py-8 print:block print:max-w-none print:p-0">
        <aside className="lg:w-52 lg:shrink-0 print:hidden">
          <nav
            aria-label="Navigasi Admin"
            className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:flex-col"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={
                    active
                      ? 'inline-flex min-h-[44px] items-center rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors shadow-xs'
                      : 'inline-flex min-h-[44px] items-center rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900'
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main id="main-content" className="min-w-0 flex-1 print:w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
