'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const TARGET_TEXT = "Welcome to A'lawna";
const PREFIX = 'Welcome to ';

interface AdminWelcomeScreenProps {
  onComplete?: () => void;
}

export default function AdminWelcomeScreen({ onComplete }: AdminWelcomeScreenProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isWelcomeParam = searchParams.get('welcome') === 'true';

  const [isVisible, setIsVisible] = useState(isWelcomeParam);
  const [typedText, setTypedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isWelcomeParam) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 1;
      setTypedText(TARGET_TEXT.slice(0, currentIndex));

      if (currentIndex >= TARGET_TEXT.length) {
        clearInterval(interval);
        setIsDone(true);

        // Tunggu 1.5 detik setelah pengetikan selesai sebelum transisi fade-out
        setTimeout(() => {
          setIsVisible(false);
          router.replace('/admin');
          if (onComplete) {
            onComplete();
          }
        }, 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isWelcomeParam, onComplete, router]);

  if (!isWelcomeParam && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center overflow-hidden"
          role="status"
          aria-live="polite"
        >
          {/* Efek kilatan / pendaran cahaya (gradasi biru di belakang teks) */}
          <div
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none"
            aria-hidden="true"
          />

          {/* Teks Animasi Ketik (Typing Effect) */}
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 tracking-wider z-10 text-center px-4 select-none">
            {typedText.length <= PREFIX.length ? (
              <span>{typedText}</span>
            ) : (
              <>
                <span>{PREFIX}</span>
                <span className="text-blue-900">
                  {typedText.slice(PREFIX.length)}
                </span>
              </>
            )}
            {/* Kursor Ketik Berkedip */}
            <span
              className={`inline-block w-1 md:w-1.5 h-8 md:h-12 ml-1 bg-blue-900 align-middle ${
                isDone ? 'animate-pulse' : 'animate-ping'
              }`}
              aria-hidden="true"
            />
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
