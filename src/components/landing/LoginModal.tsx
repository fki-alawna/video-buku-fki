'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import GoogleLoginButton from '@/components/GoogleLoginButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
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
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Card: Responsive flex-col-reverse on mobile (Photo on top), 50:50 on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-md md:max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden flex flex-col-reverse md:flex-row z-10 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup dialog login"
              className="absolute top-4 right-4 md:top-5 md:right-5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 shadow-sm backdrop-blur-sm transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Bagian Form & Google OAuth (Bawah di Mobile, Kiri di Desktop) */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
              {/* Logo & Branding A'lawna (Left-aligned & Enlarged) */}
              <div className="flex flex-col items-start justify-start mb-5 sm:mb-6">
                <Image
                  src="/logo-alawna.png"
                  alt="Logo A'lawna"
                  width={112}
                  height={112}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain object-left -ml-5 sm:-ml-6 mb-3 sm:mb-4"
                  priority
                />
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  A&apos;lawna
                </span>
              </div>

              {/* Judul Besar */}
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900"
              >
                Portal Admin A&apos;lawna
              </h2>

              {/* Tombol Utama Login dengan Google */}
              <div className="mt-6 sm:mt-8">
                <GoogleLoginButton />
              </div>
            </div>

            {/* Bagian Foto Portrait HD (Atas di Mobile, Kanan di Desktop) */}
            <div className="relative w-full md:w-1/2 h-48 sm:h-56 md:h-auto min-h-[190px] md:min-h-[420px] aspect-video md:aspect-auto bg-slate-100 overflow-hidden">
              <Image
                src="/foto-login.jpg"
                alt="Foto Login A'lawna"
                fill
                priority
                unoptimized={true}
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
