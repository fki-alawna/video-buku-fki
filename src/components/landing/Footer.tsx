'use client';

import { MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <>
      <footer id="alamat" className="relative border-t border-slate-200 bg-white py-16 text-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Quote Section */}
          <div className="mx-auto max-w-3xl text-center space-y-2">
            <p className="text-lg sm:text-2xl font-semibold italic text-slate-900 leading-relaxed">
              &ldquo;Menjadi pribadi yang unggul bukan dengan kesombongan, tetapi dengan ilmu, adab, dan keimanan.&rdquo;
            </p>
            <p className="text-xs sm:text-sm tracking-widest uppercase text-sky-600 font-bold pt-1">
              Keluarga A&apos;lawna
            </p>
          </div>

          {/* Lokasi & Google Maps Embed Section */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Lokasi Kami
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Pondok Pesantren Putri Tahfizhil Qur&apos;an (P3TQ) Lirboyo, Kota Kediri, Jawa Timur
                  </p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Pondok+Pesantren+Putri+Tahfizhil+Quran+Lirboyo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-sky-600 transition-colors shadow-2xs self-start sm:self-auto"
              >
                Buka di Google Maps
              </a>
            </div>

            {/* Google Maps Iframe */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-inner">
              <iframe
                title="Peta Lokasi Pondok Pesantren Putri Tahfizhil Quran Lirboyo"
                src="https://maps.google.com/maps?q=Pondok+Pesantren+Putri+Tahfizhil+Quran+Lirboyo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>

          {/* Copyright & Info */}
          <div className="pt-6 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              © 2026 FKI A&apos;lawna / MHMTQ Group. All rights reserved.
            </p>
            <p className="text-xs text-slate-400">
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
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
      >
        <MessageCircle className="h-7 w-7 transition-transform group-hover:rotate-6" />
        <span className="sr-only">Chat WhatsApp</span>
      </a>
    </>
  );
}
