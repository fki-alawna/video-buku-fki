'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, useAnimate } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [scope, animate] = useAnimate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Efek suara opsional: mainkan jika intro-sound.mp3 tersedia di public/
    try {
      const audio = new Audio('/intro-sound.mp3');
      audio.volume = 0.6;
      audio.play().catch(() => {
        // Abaikan jika browser memblokir autoplay tanpa interaksi pengguna
      });
    } catch {
      // Abaikan jika audio tidak tersedia
    }

    async function runSequence() {
      // Fase 1 (Efek Lukis): Tampilkan logo A'lawna di tengah layar (clipPath inset)
      await animate(
        '#splash-logo',
        { clipPath: 'inset(0 0% 0 0)', opacity: [0.1, 1] },
        { duration: 1.5, ease: 'easeInOut' }
      );

      // Jeda singkat sebelum morphing
      await new Promise((r) => setTimeout(r, 200));

      // Fase 2 (Morphing ke Bulan): Fade-out logo & munculkan bulan bercahaya
      animate('#splash-logo', { opacity: 0, scale: 0.9 }, { duration: 0.35 });
      await animate(
        '#splash-moon',
        { opacity: [0, 1], scale: [0.85, 1.05, 1] },
        { duration: 1.0, ease: 'easeOut' }
      );

      // Jeda singkat menikmati bulan
      await new Promise((r) => setTimeout(r, 200));

      // Fase 3 (Zoom Out ke Panggung): Bulan mengecil ke tengah panggung dan splash memudar
      animate(
        '#splash-moon',
        { scale: 0.1, opacity: 0, y: 40 },
        { duration: 1.1, ease: [0.4, 0, 0.2, 1] }
      );

      await animate(
        scope.current,
        { opacity: 0 },
        { duration: 1.0, ease: 'easeInOut' }
      );

      setShowSplash(false);
      onComplete();
    }

    runSequence();
  }, [animate, onComplete, scope]);

  if (!showSplash) return null;

  return (
    <AnimatePresence>
      <div
        ref={scope}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-none"
      >
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-0 bg-radial from-amber-100/40 via-transparent to-transparent pointer-events-none" />

        {/* Fase 1: Logo A'lawna dengan Efek Lukis */}
        <div
          id="splash-logo"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
          className="relative flex flex-col items-center justify-center pointer-events-none"
        >
          <Image
            src="/logo-alawna.png"
            alt="Logo A'lawna"
            width={160}
            height={160}
            priority
            className="h-32 w-32 sm:h-40 sm:w-40 object-contain drop-shadow-md"
          />
          <span className="mt-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-900">
            A&apos;lawna
          </span>
        </div>

        {/* Fase 2 & 3: Lingkaran Bulan Purnama Bercahaya */}
        <div
          id="splash-moon"
          style={{ opacity: 0 }}
          className="absolute h-36 w-36 sm:h-44 sm:w-44 rounded-full flex items-center justify-center pointer-events-none"
        >
          {/* Efek Pendaran Cahaya Emas / Oranye di Sekeliling Bulan */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-amber-500/40 via-orange-400/30 to-amber-200/50 blur-xl animate-pulse" />

          {/* Tekstur dan Bodi Bulan */}
          <div className="relative h-full w-full rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-500/80 shadow-[0_0_50px_rgba(245,158,11,0.6)] border border-amber-300/60 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.95),rgba(217,119,6,0.25)_60%,rgba(180,83,9,0.55)_100%)]" />
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
