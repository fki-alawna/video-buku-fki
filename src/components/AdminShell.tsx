'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Folder,
  Video,
  Calendar,
  QrCode,
} from 'lucide-react';
import AIChatAdminModal from '@/components/AIChatAdminModal';
import AdminDesktopSidebar, {
  type NavItem,
} from '@/components/admin/AdminDesktopSidebar';
import AdminTopHeader from '@/components/admin/AdminTopHeader';

interface AdminShellProps {
  userEmail: string;
  children: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/admin', label: 'Dasbor', icon: LayoutDashboard },
  { href: '/admin/folder', label: 'Folder', icon: Folder },
  { href: '/admin/video', label: 'Video', icon: Video },
  { href: '/admin/kalender', label: 'Kalender', icon: Calendar },
  { href: '/admin/qr', label: 'QR Code', icon: QrCode },
];

export default function AdminShell({ userEmail, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAdminChatOpen, setIsAdminChatOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsAdminChatOpen(true);
    window.addEventListener('open-alawna-chat', handleOpen);
    return () => window.removeEventListener('open-alawna-chat', handleOpen);
  }, []);

  function isActive(href: string) {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="flex h-screen w-full bg-slate-100 text-slate-900 overflow-hidden font-sans print:h-auto print:overflow-visible print:bg-white">
      {/* Sidebar Desktop */}
      <AdminDesktopSidebar
        navItems={NAV_ITEMS}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isActive={isActive}
        onOpenAdminChat={() => setIsAdminChatOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-slate-50">
        <AdminTopHeader
          userEmail={userEmail}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Mobile Navigation Drawer */}
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
                      ? 'bg-blue-900 text-white font-bold'
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

        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 print:overflow-visible print:p-0"
        >
          {children}
        </main>
      </div>

      {/* Command Center Modal Agen Panitia */}
      <AIChatAdminModal
        isOpen={isAdminChatOpen}
        onClose={() => setIsAdminChatOpen(false)}
      />
    </div>
  );
}
