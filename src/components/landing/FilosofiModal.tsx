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

          {/* Modal Container: Deep Blue, Gold Accents, Framer Motion Entry (Poster Layout) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl lg:max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0a1930] border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(10,25,48,0.9)] text-white z-10"
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

            {/* Main Content Layout: 3 Columns on Desktop (Kiri - Logo Tengah - Kanan) Tanpa Kotak Card */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 lg:gap-10 items-center mb-8 relative">
              {/* Kolom Kiri: 1. Filosofi Bentuk (Rata Kanan di Desktop) */}
              <div className="space-y-6 md:space-y-8 order-2 md:order-1 text-left md:text-right">
                {/* Heading 1 */}
                <div className="relative">
                  <h3 className="text-base sm:text-lg font-bold text-amber-400">
                    1. Filosofi Bentuk
                  </h3>
                  {/* Pointer line lurus pendek ke arah area kosong di atas logo */}
                  <div className="hidden md:flex items-center absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-7 lg:w-8 h-[1.5px] bg-amber-400/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.8)] shrink-0" />
                  </div>
                </div>

                {/* Sub-item: 3 Lekukan Menjulang */}
                <div className="relative">
                  <h4 className="text-sm sm:text-base font-bold text-amber-400">
                    • 3 Lekukan Menjulang:
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Melambangkan cita-cita tinggi, semangat yang tak pernah padam, dan pertumbuhan yang terus bergerak maju (growth).
                  </p>
                  {/* Pointer Line horizontal mengarah ke lekukan logo bagian atas */}
                  <div className="hidden md:flex items-center absolute left-[calc(100%+12px)] top-2.5 pointer-events-none">
                    <div className="w-20 md:w-24 lg:w-28 h-[1.5px] bg-amber-400/80" />
                    <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,1)] ring-2 ring-amber-400/40 shrink-0" />
                  </div>
                </div>

                {/* Sub-item: Lekukan Arab di Bagian Bawah */}
                <div className="relative">
                  <h4 className="text-sm sm:text-base font-bold text-amber-400">
                    • Lekukan Arab di Bagian Bawah:
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Melambangkan kebijaksanaan, kedalaman ilmu, serta adab yang mengalir tenang.
                  </p>
                  {/* Pointer Line bentuk L mengarah ke atas menuju lengkungan bawah logo */}
                  <div className="hidden md:block absolute left-[calc(100%+12px)] -top-[54px] pointer-events-none">
                    <div className="relative w-[72px] lg:w-[76px] h-[64px] border-r-[1.5px] border-b-[1.5px] border-amber-400/80 rounded-br-sm">
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,1)] ring-2 ring-amber-400/40" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Tengah: Logo Morphing Besar & Menyala */}
              <div className="flex flex-col items-center justify-center order-1 md:order-2 py-2 md:py-4">
                <motion.div
                  layoutId="logo-alawna"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center drop-shadow-[0_0_40px_rgba(251,191,36,0.4)]"
                >
                  <Image
                    src="/logo-alawna.png"
                    alt="Logo A'lawna Besar"
                    width={320}
                    height={320}
                    className="w-full h-full object-contain filter drop-shadow-xl"
                    priority
                    unoptimized={true}
                  />
                </motion.div>
                <span className="mt-3 text-xs font-semibold text-amber-200/80 tracking-wider uppercase">
                  Luhur • Beradab • Bermanfaat
                </span>
              </div>

              {/* Kolom Kanan: 2. Arti Warna & Titik (Rata Kiri) */}
              <div className="space-y-6 md:space-y-8 order-3 text-left">
                {/* Sub-item: Titik Biru di Puncak */}
                <div className="relative">
                  <h4 className="text-sm sm:text-base font-bold text-amber-400">
                    • Titik Biru di Puncak:
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Melambangkan kefokusan, visi masa depan, dan pencapaian target tertinggi.
                  </p>
                  {/* Pointer Line horizontal mengarah ke bola biru di puncak logo */}
                  <div className="hidden md:flex items-center absolute right-[calc(100%+12px)] top-[14px] pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,1)] ring-4 ring-sky-400/30 shrink-0" />
                    <div className="w-20 md:w-24 lg:w-[110px] h-[1.5px] bg-sky-400/80" />
                  </div>
                </div>

                {/* Section 2: Arti Warna */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-amber-400 mb-3">
                    2. Arti Warna
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-amber-400 flex items-center gap-2">
                        <span className="inline-block h-3.5 w-3.5 rounded-xs bg-blue-600 border border-blue-400 shadow-sm shrink-0" />
                        <span>• Deep Blue (Biru):</span>
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-slate-200 leading-relaxed pl-5">
                        Melambangkan keteduhan, ketenangan, kepercayaan, dan ketulusan.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-amber-400 flex items-center gap-2">
                        <span className="inline-block h-3.5 w-3.5 rounded-xs bg-amber-400 border border-amber-200 shadow-sm shrink-0" />
                        <span>• Gold (Emas):</span>
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-slate-200 leading-relaxed pl-5">
                        Melambangkan kemuliaan, kejayaan, kewibawaan, dan kualitas premium.
                      </p>
                    </div>
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
