import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface AdminDesktopSidebarProps {
  navItems: NavItem[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isActive: (href: string) => boolean;
  onOpenAdminChat: () => void;
}

export default function AdminDesktopSidebar({
  navItems,
  isCollapsed,
  onToggleCollapse,
  isActive,
  onOpenAdminChat,
}: AdminDesktopSidebarProps) {
  const { toggleTheme } = useTheme();

  return (
    <aside
      className={`hidden md:flex flex-col justify-between my-3 ml-3 md:my-4 md:ml-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-[8px_8px_24px_rgba(0,0,0,0.06),-8px_-8px_24px_rgba(255,255,255,0.9)] dark:shadow-none p-4 shrink-0 z-30 transition-all duration-300 ease-in-out relative print:hidden ${
        isCollapsed ? 'w-20' : 'w-64 lg:w-72'
      }`}
    >
      {/* Toggle Collapse Button */}
      <button
        type="button"
        onClick={onToggleCollapse}
        title={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
        aria-label={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
        className="absolute -right-3 top-8 z-40 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-slate-500 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 hover:scale-110 active:scale-95 transition-all cursor-pointer"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Top: Brand Header & Nav Links */}
      <div className="space-y-6">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex items-center gap-3 py-1 group cursor-pointer text-left w-full ${
            isCollapsed ? 'justify-center px-0' : 'px-2'
          }`}
          title="Ganti tema A'lawna"
        >
          <div className="flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <Image
              src="/logo-alawna.png"
              alt="Logo A'lawna"
              width={36}
              height={36}
              className="w-9 h-9 object-contain"
              priority
            />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden transition-opacity duration-200">
              <span className="block text-lg font-black tracking-tight text-blue-900 dark:text-blue-400 leading-tight">
                A&apos;lawna
              </span>
              <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Admin Panel
              </span>
            </div>
          )}
        </button>

        {/* Navigation Links */}
        <nav aria-label="Navigasi Utama Admin" className="space-y-1.5">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                title={item.label}
                aria-current={active ? 'page' : undefined}
                className={`group flex items-center rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  isCollapsed ? 'justify-center p-3' : 'gap-3.5 px-4 py-3'
                } ${
                  active
                    ? 'bg-blue-900 text-white shadow-md font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800 font-medium'
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-110 ${
                    active ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-blue-900 dark:group-hover:text-white'
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Modern AI Chatbot Card */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onOpenAdminChat}
          title="A'lawna Intelligence: Agen Panitia"
          className={`w-full rounded-2xl bg-blue-900 hover:bg-blue-800 text-white shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group ${
            isCollapsed ? 'p-3 flex justify-center' : 'p-3.5 text-left'
          }`}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white border border-white/15 group-hover:bg-white/20 transition-colors">
              <MessageCircle className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <span className="block text-sm font-bold text-white tracking-wide truncate">
                  A&apos;lawna Intelligence
                </span>
                <span className="block text-xs text-blue-200 truncate">
                  Agen Panitia AI
                </span>
              </div>
            )}
          </div>
        </button>
      </div>
    </aside>
  );
}
