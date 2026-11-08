'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FilosofiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilosofiModal({ isOpen, onClose }: FilosofiModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container: Deep Blue, Gold Accents, Framer Motion Entry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0a1930] border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(10,25,48,0.9)] text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup filosofi logo"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header: Judul & Sub-judul */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Filosofi Logo A&apos;lawna{' '}
                <span className="font-serif text-amber-300">(أعلون)</span>
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                Logo A&apos;lawna adalah simbol dari keluhuran, harapan, dan keunggulan yang diraih melalui kelembutan akhlak dan kemurnian niat.
              </p>
            </div>

            {/* Main Content Layout: 3 Columns on Desktop (Kiri - Logo Tengah - Kanan) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center mb-8">
              {/* Kolom Kiri: 1. Filosofi Bentuk */}
              <div className="space-y-5 order-2 md:order-1 text-left">
                <div className="inline-block border-b border-amber-500/40 pb-1">
                  <h3 className="text-base sm:text-lg font-bold text-amber-300">
                    1. Filosofi Bentuk
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1.5 hover:border-amber-400/30 transition-colors">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      3 Lekukan Menjulang
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-4">
                      Melambangkan cita-cita tinggi, semangat yang tak pernah padam, dan pertumbuhan yang terus bergerak maju (growth).
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1.5 hover:border-amber-400/30 transition-colors">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      Lekukan Arab di Bagian Bawah
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-4">
                      Melambangkan kebijaksanaan, kedalaman ilmu, serta adab yang mengalir tenang.
                    </p>
                  </div>
                </div>
              </div>

              {/* Kolom Tengah: Logo Morphing Besar */}
              <div className="flex flex-col items-center justify-center order-1 md:order-2 py-4">
                <motion.div
                  layoutId="logo-alawna"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center drop-shadow-[0_0_35px_rgba(251,191,36,0.35)]"
                >
                  <Image
                    src="/logo-alawna.png"
                    alt="Logo A'lawna Besar"
                    width={280}
                    height={280}
                    className="w-full h-full object-contain filter drop-shadow-lg"
                    priority
                  />
                </motion.div>
                <span className="mt-3 text-xs font-semibold text-amber-200/80 tracking-wider uppercase">
                  Luhur • Beradab • Bermanfaat
                </span>
              </div>

              {/* Kolom Kanan: 2. Arti Warna & Titik */}
              <div className="space-y-5 order-3 text-left">
                <div className="inline-block border-b border-amber-500/40 pb-1">
                  <h3 className="text-base sm:text-lg font-bold text-amber-300">
                    2. Arti Warna &amp; Titik
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1.5 hover:border-amber-400/30 transition-colors">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-sky-400 ring-2 ring-sky-300/40" />
                      Titik Biru di Puncak
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-4">
                      Melambangkan kefokusan, visi masa depan, dan pencapaian target tertinggi.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1.5 hover:border-amber-400/30 transition-colors">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm bg-blue-600 ring-2 ring-blue-500/40" />
                      Deep Blue (Biru)
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-4">
                      Melambangkan keteduhan, ketenangan, kepercayaan, dan ketulusan.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1.5 hover:border-amber-400/30 transition-colors">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm bg-amber-400 ring-2 ring-amber-300/40" />
                      Gold (Emas)
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-4">
                      Melambangkan kemuliaan, kejayaan, kewibawaan, dan kualitas premium.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bawah: Esensi Utama (Quote Ornamen Emas) */}
            <div className="border-t border-amber-500/30 pt-6 text-center">
              <p className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1.5">
                Esensi Utama
              </p>
              <blockquote className="text-base sm:text-lg md:text-xl font-medium italic text-white leading-relaxed max-w-2xl mx-auto">
                &ldquo;Menjadi pribadi yang unggul bukan dengan kesombongan, tetapi dengan ilmu, adab, dan keimanan.&rdquo;
              </blockquote>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
