'use client';

import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer id="kontak" className="relative border-t border-amber-500/20 bg-slate-950 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          {/* Quote Section */}
          <div className="mx-auto max-w-3xl space-y-2">
            <p className="text-base sm:text-xl font-medium italic text-amber-300/90 leading-relaxed">
              &ldquo;Menjadi pribadi yang unggul bukan dengan kesombongan, tetapi dengan ilmu, adab, dan keimanan.&rdquo;
            </p>
            <p className="text-xs sm:text-sm tracking-wider uppercase text-amber-500 font-semibold">
              Keluarga Santri & Alumni A&apos;lawna
            </p>
          </div>

          {/* Divider */}
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

          {/* Copyright & Info */}
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-slate-400">
              © 2026 FKI A&apos;lawna / MHMTQ Group. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Portal Manajemen Video Google Drive & Kode QR Terintegrasi.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6281319861992"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi kami via WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl shadow-emerald-600/40 hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
      >
        <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-6" />
        <span className="sr-only">Chat WhatsApp</span>
      </a>
    </>
  );
}
