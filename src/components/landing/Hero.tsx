'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Users, Award, GraduationCap } from 'lucide-react';

export default function Hero() {
  const stats = [
    { number: '326+', label: 'Siswi', icon: Users },
    { number: '24', label: 'Mustahiq/oh', icon: Award },
    { number: '6', label: 'Tim', icon: GraduationCap },
  ];

  return (
    <section id="beranda" className="relative overflow-hidden bg-slate-950 py-12 sm:py-20 lg:py-28 text-white">
      {/* Background Glow / Radial Gradients */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[400px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Kolom Kiri: Teks & Informasi */}
          <div className="space-y-8 lg:col-span-7">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-amber-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>MHMTQ Group • Haflah Khotmil Qur&apos;an</span>
            </div>

            {/* Judul Utama */}
            <div className="space-y-3">
              <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  A&apos;lawna
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-400/90">
                Luhur • Beradab • Bermanfaat
              </p>
            </div>

            {/* Deskripsi */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-300">
              A&apos;lawna adalah nama yang bermakna tinggi, luhur, dan unggul, namun keunggulan tersebut bukanlah tentang kesombongan, melainkan cita-cita mulia untuk memiliki akhlak, ilmu, dan keimanan yang luhur. Nama ini merupakan wujud doa dan harapan agar senantiasa tumbuh menjadi pribadi yang beradab, tetap rendah hati, serta membawa manfaat bagi sesama, dengan esensi utama menjadi pribadi unggul melalui ilmu, adab, dan keimanan.
            </p>

            {/* 2 Tombol Aksi */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#mhmtq"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-7 py-3 text-base font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:from-amber-500 hover:to-amber-700 hover:shadow-amber-500/30 transition-all cursor-pointer active:scale-95"
              >
                A&apos;lawna
              </a>
              <a
                href="#wisuda"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-amber-400/80 px-7 py-3 text-base font-bold text-amber-300 hover:bg-amber-400/10 transition-all cursor-pointer active:scale-95"
              >
                Wisuda
              </a>
            </div>

            {/* 3 Kotak Statistik Sejajar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-800/80">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center rounded-2xl border border-amber-500/20 bg-slate-900/60 p-3 sm:p-4 text-center backdrop-blur-md hover:border-amber-500/40 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-amber-400 mb-1.5" />
                    <span className="text-xl sm:text-2xl font-extrabold text-white">
                      {stat.number}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-400">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kolom Kanan: Gambar Floating Card */}
          <div className="flex justify-center lg:col-span-5">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md"
            >
              {/* Outer Card with Gold Glow Frame */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-amber-400/40 bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 p-2.5 shadow-2xl shadow-amber-500/15">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-900">
                  <Image
                    src="/foto-hero.jpg"
                    alt="Foto Khidmat A'lawna"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                    className="object-cover object-center"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Floating Bottom Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-amber-500/30 bg-slate-950/90 p-3.5 backdrop-blur-md">
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      Dokumentasi Utama
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      Haflah & Wisuda Khotmil Qur&apos;an
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Badge */}
              <div className="absolute -top-4 -right-4 rounded-2xl border border-amber-500/40 bg-slate-900/90 px-4 py-2.5 shadow-xl backdrop-blur-md hidden sm:block">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300">
                    Edisi 2026
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
