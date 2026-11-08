'use client';

import { Star, TrendingUp, BookOpen, ShieldCheck } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: 'Kualitas Emas',
      description: 'Pengalaman menonton video edukasi dan dokumentasi berkualitas premium dan jernih.',
      icon: Star,
    },
    {
      title: 'Tumbuh Berkelanjutan',
      description: 'Kurikulum dan materi tersusun rapi untuk mendukung proses belajar yang konsisten.',
      icon: TrendingUp,
    },
    {
      title: 'Ilmu & Adab',
      description: 'Pembentukan akhlak mulia dan penanaman nilai budi pekerti yang luhur dan rendah hati.',
      icon: BookOpen,
    },
    {
      title: 'Akses Terpercaya',
      description: 'Sistem akses video cepat via kode QR, aman, dan nyaman tanpa gangguan unduhan.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="mhmtq" className="relative bg-slate-950 py-16 sm:py-24 border-t border-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400">
            Nilai Luhur A&apos;lawna
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Keunggulan & <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Karakter Utama</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Menggabungkan keilmuan, adab santri, dan kemudahan akses teknologi untuk kemaslahatan bersama.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-amber-500/20 bg-slate-900/60 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div>
                  {/* Icon Container */}
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-amber-400/80">
                  <span>Pilar 0{idx + 1}</span>
                  <div className="h-px flex-1 bg-amber-500/20" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
