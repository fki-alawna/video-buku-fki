'use client';

import { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Sejarah from '@/components/landing/Sejarah';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';
import LoginModal from '@/components/landing/LoginModal';
import AIChat from '@/components/AIChat';
import LaserCursor from '@/components/LaserCursor';

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="landing-cursor-scope min-h-screen bg-white text-slate-900 selection:bg-blue-900 selection:text-white md:cursor-none">
      {/* Custom Laser Cursor */}
      <LaserCursor />

      {/* Navbar with Login Trigger */}
      <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Sejarah & Galeri 9 Foto */}
        <Sejarah />

        {/* Filosofi Logo */}
        <Features />

        {/* Testimoni Kata Mereka */}
        <Testimonials />
      </main>

      {/* Footer with Google Maps */}
      <Footer />

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
