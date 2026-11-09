import { useFormStatus } from 'react-dom';
import { Search, Radio, LogOut, Menu, X } from 'lucide-react';
import { logoutAction } from '@/app/admin/(dashboard)/actions';

interface AdminTopHeaderProps {
  userEmail: string;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

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

export default function AdminTopHeader({
  userEmail,
  mobileMenuOpen,
  onToggleMobileMenu,
}: AdminTopHeaderProps) {
  return (
    <header className="h-18 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0 z-20 print:hidden">
      {/* Mobile Menu Toggle & Brand */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <span className="font-bold text-base text-blue-900">A&apos;lawna</span>
      </div>

      {/* Search Bar Visual */}
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
          <div className="h-4 w-px bg-slate-300 mx-0.5" />
          <form action={logoutAction} className="flex items-center">
            <LogoutSubmitButton />
          </form>
        </div>
      </div>
    </header>
  );
}
