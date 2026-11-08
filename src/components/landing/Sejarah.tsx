'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galeriImages = [
  '/galeri/foto-2.jpg',
  '/galeri/foto-3.jpg',
  '/galeri/foto-4.jpg',
  '/galeri/foto-5.jpg',
  '/galeri/foto-6.jpg',
  '/galeri/foto-7.jpg',
  '/galeri/foto-8.jpg',
  '/galeri/foto-9.jpg',
  '/galeri/foto-10.jpg',
];

export default function Sejarah() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <section id="wisuda" className="relative bg-slate-50 py-16 sm:py-24 border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-600">
            Arsip & Kenangan Indah
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Sejarah A&apos;lawna
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Rangkaian kilas balik perjalanan, prosesi suci khotmil Qur&apos;an, dan ikatan kekeluargaan santriwati MHMTQ Lirboyo.
          </p>
        </div>

        {/* Grid 3x3 Photos (Full-Bleed, Tanpa Teks) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {galeriImages.map((src, idx) => (
            <div
              key={src}
              onClick={() => setSelectedImage(src)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={src}
                alt={`Dokumentasi Sejarah A'lawna ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Zoom Fitur) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
          >
            {/* Tombol Tutup (X) */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-md cursor-pointer border border-white/20"
              aria-label="Tutup zoom foto"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Foto Diperbesar */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative flex items-center justify-center max-w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Dokumentasi Sejarah A'lawna Diperbesar"
                width={1600}
                height={1200}
                priority
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl cursor-default"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
