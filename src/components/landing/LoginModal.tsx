'use client';

import { useEffect } from 'react';
import { X, Shield } from 'lucide-react';
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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-amber-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 text-white z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup dialog login"
          className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-2">
            <Shield className="h-6 w-6" />
          </div>
          <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-white">
            Portal Admin <span className="text-amber-400">A&apos;lawna</span>
          </h2>
          <p className="text-sm text-slate-400">
            Masuk dengan akun Google yang terdaftar sebagai admin (whitelist) untuk mengelola data video dan QR code.
          </p>
        </div>

        {/* Login Button Component */}
        <div className="pt-2">
          <GoogleLoginButton />
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Akses terbatas khusus administrator terdaftar.
        </p>
      </div>
    </div>
  );
}
