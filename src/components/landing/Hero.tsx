'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Award, GraduationCap } from 'lucide-react';

export default function Hero() {
  const stats = [
    { number: '326+', label: 'Siswi', icon: Users },
    { number: '24', label: 'Mustahiq/oh', icon: Award },
    { number: '6', label: 'Tim', icon: GraduationCap },
  ];

  return (
    <section id="beranda" className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-24 text-slate-900">
      {/* Background Soft Glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-sky-100/60 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Kolom Kiri: Teks & Informasi */}
          <div className="space-y-8 lg:col-span-7">
            {/* Judul Utama */}
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
                A&apos;lawna
              </h1>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-600">
                Luhur • Beradab • Bermanfaat
              </p>
            </div>

            {/* Deskripsi */}
            <p className="text-base sm:text-lg leading-relaxed text-slate-600">
              A&apos;lawna adalah nama yang bermakna tinggi, luhur, dan unggul, namun keunggulan tersebut bukanlah tentang kesombongan, melainkan cita-cita mulia untuk memiliki akhlak, ilmu, dan keimanan yang luhur. Nama ini merupakan wujud doa dan harapan agar senantiasa tumbuh menjadi pribadi yang beradab, tetap rendah hati, serta membawa manfaat bagi sesama, dengan esensi utama menjadi pribadi unggul melalui ilmu, adab, dan keimanan.
            </p>

            {/* 2 Tombol Aksi */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#mhmtq"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-sky-600 px-7 py-3 text-base font-semibold text-white shadow-md shadow-sky-600/20 hover:bg-sky-700 active:scale-95 transition-all cursor-pointer"
              >
                A&apos;lawna
              </a>
              <a
                href="#wisuda"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-sky-600 px-7 py-3 text-base font-semibold text-sky-700 hover:bg-sky-50 active:scale-95 transition-all cursor-pointer"
              >
                Wisuda
              </a>
            </div>

            {/* 3 Kotak Statistik Sejajar */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-100">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-5 text-center shadow-xs hover:border-sky-300 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-sky-600 mb-1" />
                    <span className="text-2xl sm:text-3xl font-black text-sky-600">
                      {stat.number}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kolom Kanan: Gambar Floating Card (SaaS Style) Bersih */}
          <div className="flex justify-center lg:col-span-5">
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md"
            >
              {/* White Card with Soft Shadow */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="/foto-hero.jpg"
                    alt="Dokumentasi Utama A'lawna"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
