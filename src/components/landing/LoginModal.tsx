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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
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

          {/* Modal Card: Split-Screen Layout with Rounded-3XL and Shadow-2XL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row z-10 text-slate-900"
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

            {/* Bagian Kiri: Form & Google OAuth */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                {/* Logo A'lawna di Pojok Kiri Atas */}
                <div className="flex items-center gap-2.5 mb-6">
                  <Image
                    src="/logo-alawna.png"
                    alt="Logo A'lawna"
                    width={36}
                    height={36}
                    className="w-9 h-9 object-contain"
                    priority
                  />
                  <span className="text-lg font-bold tracking-tight text-slate-900">
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

                {/* Sub-judul / Deskripsi Abu-abu */}
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Masuk dengan akun Google yang terdaftar sebagai admin (whitelist) untuk mengelola data video dan QR code.
                </p>
              </div>

              {/* Tombol Utama Login dengan Google */}
              <div className="my-8">
                <GoogleLoginButton />
              </div>

              {/* Footer Note */}
              <p className="text-xs text-slate-400">
                Akses terbatas khusus administrator terdaftar.
              </p>
            </div>

            {/* Bagian Kanan: Foto Laki-laki Mengaji (Full Height & Rounded-r-3xl) */}
            <div className="relative hidden md:block md:w-1/2 min-h-[380px] bg-slate-100 overflow-hidden rounded-r-3xl">
              <Image
                src="/foto-login.jpg"
                alt="Foto Login A'lawna"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 384px"
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
