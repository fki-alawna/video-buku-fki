'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, LogIn } from 'lucide-react';

interface NavbarProps {
  onOpenLogin: () => void;
}

export default function Navbar({ onOpenLogin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'MHMTQ', href: '#mhmtq' },
    { label: 'Wisuda', href: '#wisuda' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-slate-950/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-amber-500/10 p-1 border border-amber-500/30 transition-transform group-hover:scale-105">
            <Image
              src="/logo-alawna.png"
              alt="Logo A'lawna"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors">
            A&apos;lawna
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Login Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenLogin}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:from-amber-500 hover:to-amber-700 hover:shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </button>

          {/* Hamburger Button (Mobile) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-900 bg-slate-950/95 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md"
            >
              <LogIn className="h-4 w-4" />
              <span>Login Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
