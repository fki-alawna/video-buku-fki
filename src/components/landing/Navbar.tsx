'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface NavbarProps {
  onOpenLogin: () => void;
}

export default function Navbar({ onOpenLogin }: NavbarProps) {
  const { toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: "A'lawna", href: '#mhmtq' },
    { label: 'Wisuda', href: '#wisuda' },
    { label: 'Kontak', href: '#kontak' },
    { label: 'Alamat', href: '#alamat' },
  ];

  return (
    <>
      {/* Invisible Hover Trigger Area at the Top of Screen */}
      <div
        onMouseEnter={() => setHidden(false)}
        className="fixed top-0 left-0 w-full h-5 z-50 pointer-events-auto"
        aria-hidden="true"
      />

      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden && !mobileMenuOpen ? 'hidden' : 'visible'}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={() => setHidden(false)}
        className="fixed top-0 left-0 w-full z-50 bg-white/60 dark:bg-slate-950/80 backdrop-blur-md border-b border-white/20 dark:border-slate-800 shadow-sm transition-colors duration-300"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand / Logo (Polos tanpa kotak background/border) */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
          title="Ganti tema A'lawna"
        >
          <Image
            src="/logo-alawna.png"
            alt="Logo A'lawna"
            width={40}
            height={40}
            className="w-10 h-10 object-contain transition-transform group-hover:scale-105 translate-y-0.5 sm:translate-y-1"
            priority
          />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors leading-none">
            A&apos;lawna
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
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
            className="inline-flex items-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </button>

          {/* Hamburger Button (Mobile) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-900 hover:text-blue-900 dark:hover:text-blue-400 transition-colors"
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
    </motion.header>
    </>
  );
}
