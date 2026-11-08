'use client';

import { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Footer from '@/components/landing/Footer';
import LoginModal from '@/components/landing/LoginModal';

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <Navbar onOpenLogin={() => setIsLoginModalOpen(true)} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Features / Nilai Keunggulan */}
        <Features />
      </main>

      {/* Footer & WhatsApp Button */}
      <Footer />

      {/* Pop-up Modal Login Admin */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}
