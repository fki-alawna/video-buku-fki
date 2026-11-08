'use client';

import { useEffect } from 'react';
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Morphing Poster Container */}
          <motion.div
            layoutId="poster-filosofi"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 max-w-xl lg:max-w-2xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (X) */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup filosofi logo"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white border border-white/20 transition-colors cursor-pointer shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Poster Image */}
            <img
              src="/poster-filosofi.jpg"
              alt="Poster Filosofi Logo A'lawna"
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
