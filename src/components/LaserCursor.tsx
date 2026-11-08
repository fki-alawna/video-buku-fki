'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function LaserCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Kursor utama (fast, snappy response)
  const springConfig = { damping: 25, stiffness: 450, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Ekor cahaya bergradasi (trailing springs dengan jeda progressively looser)
  const trail1X = useSpring(mouseX, { damping: 22, stiffness: 320, mass: 0.2 });
  const trail1Y = useSpring(mouseY, { damping: 22, stiffness: 320, mass: 0.2 });

  const trail2X = useSpring(mouseX, { damping: 20, stiffness: 220, mass: 0.3 });
  const trail2Y = useSpring(mouseY, { damping: 20, stiffness: 220, mass: 0.3 });

  const trail3X = useSpring(mouseX, { damping: 18, stiffness: 140, mass: 0.4 });
  const trail3Y = useSpring(mouseY, { damping: 18, stiffness: 140, mass: 0.4 });

  const trail4X = useSpring(mouseX, { damping: 16, stiffness: 90, mass: 0.5 });
  const trail4Y = useSpring(mouseY, { damping: 16, stiffness: 90, mass: 0.5 });

  useEffect(() => {
    // Sembunyikan jika perangkat menggunakan touch screen tanpa mouse
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [role="link"]');
      setIsHovered(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Trail 4: Ekor paling belakang (besar, memudar) */}
      <motion.div
        style={{
          x: trail4X,
          y: trail4Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`absolute rounded-full transition-colors duration-300 ${
          isHovered
            ? 'w-7 h-7 bg-amber-400/15 blur-[4px]'
            : 'w-7 h-7 bg-cyan-400/15 blur-[4px]'
        }`}
      />

      {/* Trail 3: Ekor tengah */}
      <motion.div
        style={{
          x: trail3X,
          y: trail3Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`absolute rounded-full transition-colors duration-300 ${
          isHovered
            ? 'w-5 h-5 bg-amber-400/25 blur-[2.5px]'
            : 'w-5 h-5 bg-sky-400/25 blur-[2.5px]'
        }`}
      />

      {/* Trail 2: Ekor dekat */}
      <motion.div
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`absolute rounded-full transition-colors duration-300 ${
          isHovered
            ? 'w-3.5 h-3.5 bg-amber-300/40 blur-[1px]'
            : 'w-3.5 h-3.5 bg-cyan-300/40 blur-[1px]'
        }`}
      />

      {/* Trail 1: Ekor terdekat */}
      <motion.div
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`absolute rounded-full transition-colors duration-300 ${
          isHovered
            ? 'w-2.5 h-2.5 bg-amber-300/70'
            : 'w-2.5 h-2.5 bg-cyan-200/70'
        }`}
      />

      {/* Kursor Utama (Kepala Laser Bercahaya) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
        className={`absolute rounded-full transition-colors duration-200 mix-blend-screen ${
          isHovered
            ? 'w-2.5 h-2.5 bg-amber-200 shadow-[0_0_12px_4px_rgba(251,191,36,0.9),0_0_24px_8px_rgba(245,158,11,0.6)]'
            : 'w-2 h-2 bg-white shadow-[0_0_10px_3px_rgba(56,189,248,0.95),0_0_20px_6px_rgba(14,165,233,0.7)]'
        }`}
      />
    </div>
  );
}
