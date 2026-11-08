'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Sejarah from '@/components/landing/Sejarah';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';
import LoginModal from '@/components/landing/LoginModal';
import AIChat from '@/components/AIChat';

const sectionReveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' as const },
};

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-900 selection:text-white pb-24">
      {/* Navbar with Login Trigger */}
      <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Sejarah & Galeri 9 Foto */}
        <motion.div {...sectionReveal}>
          <Sejarah />
        </motion.div>

        {/* Filosofi Logo */}
        <motion.div {...sectionReveal}>
          <Features />
        </motion.div>

        {/* Testimoni Kata Mereka */}
        <motion.div {...sectionReveal}>
          <Testimonials />
        </motion.div>
      </main>

      {/* Footer with Google Maps */}
      <motion.div {...sectionReveal}>
        <Footer />
      </motion.div>

      {/* Pop-up Modal Login Admin */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* AI Chatbot A'lawna Intelligent */}
      <AIChat />
    </div>
  );
}
