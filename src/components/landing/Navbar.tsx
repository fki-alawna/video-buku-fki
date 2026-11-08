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
    { label: 'Alamat', href: '#alamat' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md shadow-xs transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand / Logo (Polos tanpa kotak background/border) */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo-alawna.png"
            alt="Logo A'lawna"
            width={40}
            height={40}
            className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
            A&apos;lawna
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors"
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
            className="inline-flex items-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </button>

          {/* Hamburger Button (Mobile) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
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
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
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
