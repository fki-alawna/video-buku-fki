'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="alamat" className="relative border-t border-slate-200 bg-white py-16 text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.15 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Quote Section */}
          <div className="mx-auto max-w-3xl text-center space-y-2">
            <p className="text-lg sm:text-2xl font-semibold italic text-slate-900 leading-relaxed">
              &ldquo;Menjadi pribadi yang unggul bukan dengan kesombongan, tetapi dengan ilmu, adab, dan keimanan.&rdquo;
            </p>
            <p className="text-xs sm:text-sm tracking-widest uppercase text-blue-900 font-bold pt-1">
              Keluarga A&apos;lawna
            </p>
          </div>

          {/* Lokasi & Google Maps Embed Section */}
          <div id="kontak" className="scroll-mt-28 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-xs">
            <div className="flex items-start sm:items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-900 shrink-0 mt-0.5 sm:mt-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                  Pondok Pesantren Putri Tahfizhil Qur&apos;an (P3TQ) Lirboyo, Kota Kediri, Jawa Timur
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  5XJQ+4WP, Jl. KH. Abdul Karim, Lirboyo, Mojoroto, Kec. Mojoroto, Kabupaten Kediri, Jawa Timur 64116
                </p>
              </div>
            </div>

          {/* Kontak Resmi MHMTQ & P3TQ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
            <a
              href="https://wa.me/6281319861992"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200/90 p-3.5 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-slate-500">
                  Kontak Resmi MHMTQ
                </span>
                <span className="block text-sm font-bold text-blue-900 group-hover:underline">
                  +6281319861992
                </span>
              </div>
            </a>

            <a
              href="https://wa.me/6285795751986"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200/90 p-3.5 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-slate-500">
                  Kontak Resmi P3TQ
                </span>
                <span className="block text-sm font-bold text-blue-900 group-hover:underline">
                  +6285795751986
                </span>
              </div>
            </a>
          </div>

          {/* Clickable Aerial Photo of P3TQ Lirboyo */}
          <a
            href="https://maps.app.goo.gl/TN4MNA2EPomm16r56"
            target="_blank"
            rel="noopener noreferrer"
            title="Buka Lokasi di Google Maps"
            className="block w-full overflow-hidden rounded-2xl group relative shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Image
              src="/foto-lokasi.jpg"
              alt="Lokasi P3TQ Lirboyo"
              width={1200}
              height={450}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105 block"
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-100 text-center">
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            © 2026 FKI A&apos;lawna / MHMTQ Group. All rights reserved.
          </p>
        </div>
      </div>
      </motion.div>
    </footer>
  );
}
