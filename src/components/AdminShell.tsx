'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import {
  LayoutDashboard,
  Folder,
  Video,
  QrCode,
  Search,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Radio,
} from 'lucide-react';
import { logoutAction } from '@/app/admin/(dashboard)/actions';

interface AdminShellProps {
  userEmail: string;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: '/admin', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/admin/folder', label: 'Folder', icon: Folder },
  { href: '/admin/video', label: 'Video', icon: Video },
  { href: '/admin/qr', label: 'QR Code', icon: QrCode },
];

function LogoutSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      title="Keluar dari Admin"
      aria-label="Logout"
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60 cursor-pointer"
    >
      <LogOut className="h-4 w-4" />
    </button>
  );
}

export default function AdminShell({ userEmail, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans print:h-auto print:overflow-visible print:bg-white">
      {/* ─── SIDEBAR DESKTOP (SkillSet inspired modern floating / white card) ─── */}
      <aside className="hidden md:flex md:w-64 lg:w-72 md:flex-col md:justify-between bg-white border-r border-slate-200/80 p-5 shrink-0 z-30 print:hidden">
        {/* Top: Brand Header & Nav Links */}
        <div className="space-y-8">
          {/* Logo Brand */}
          <Link
            href="/admin"
            className="flex items-center gap-3 px-2 py-1 group"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50/80 border border-blue-100 group-hover:scale-105 transition-transform">
              <Image
                src="/logo-alawna.png"
                alt="Logo A'lawna"
                width={30}
                height={30}
                className="w-7 h-7 object-contain"
                priority
              />
            </div>
            <div>
              <span className="block text-lg font-black tracking-tight text-blue-900">
                A&apos;lawna
              </span>
              <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Admin Panel
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav aria-label="Navigasi Utama Admin" className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`group flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-blue-100/80 text-blue-900 shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 font-medium'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform group-hover:scale-110 ${
                      active ? 'text-blue-900' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Modern Info Card (SkillSet style banner) */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50/40 border border-blue-100/70 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                A&apos;lawna MHMTQ
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sistem manajemen video &amp; cetak barcode QR Pesantren Putri Tahfizhil Qur&apos;an.
            </p>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <span>Buka Landing Page</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA (Flex-1 with Header & Scrollable Body) ─── */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-slate-50">
        {/* Top Header Bar */}
        <header className="h-18 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0 z-20 print:hidden">
          {/* Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <span className="font-bold text-base text-blue-900">A&apos;lawna</span>
          </div>

          {/* Search Bar Visual (SkillSet inspired) */}
          <div className="hidden sm:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari video, folder, atau QR..."
                aria-label="Pencarian cepat dasbor"
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-100/80 border border-slate-200/60 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:bg-white transition-all"
                readOnly
              />
            </div>
          </div>

          {/* Right Controls: Live Badge, User Profile Pill & Logout */}
          <div className="flex items-center gap-3">
            {/* Live Indicator Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80">
              <Radio className="h-3 w-3 text-emerald-600 animate-pulse" />
              <span>Sistem Aktif</span>
            </div>

            {/* Profile & Logout Pill */}
            <div className="flex items-center gap-2.5 bg-slate-100/80 border border-slate-200/70 rounded-2xl pl-3 pr-1.5 py-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-xs uppercase shadow-2xs">
                  {userEmail ? userEmail.charAt(0) : 'A'}
                </div>
                <span className="text-xs font-semibold text-slate-700 max-w-[130px] sm:max-w-[200px] truncate">
                  {userEmail}
                </span>
              </div>
              <div className="h-4 w-px bg-slate-300 mx-0.5"></div>
              <form action={logoutAction} className="flex items-center">
                <LogoutSubmitButton />
              </form>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1.5 shadow-lg z-20">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-blue-100 text-blue-900 font-bold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Main Scrollable Body */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 print:overflow-visible print:p-0"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
