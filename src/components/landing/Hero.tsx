'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  const stats = [
    { number: '326+', label: 'Siswi' },
    { number: '24', label: 'Mustahiq/oh' },
    { number: '9', label: 'Tim' },
  ];

  return (
    <section id="beranda" className="relative bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Full-Width Hero Banner */}
      <div className="relative w-full overflow-hidden">
        <Image
          src="/foto-hero.jpg"
          alt="A'lawna Hero"
          width={1920}
          height={977}
          priority
          sizes="100vw"
          className="w-full max-w-full h-auto object-contain block"
        />
      </div>

      {/* Konten Teks di Bawah Banner dengan Animasi Scroll (Framer Motion) */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Background Soft Glow untuk Konten Teks */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 dark:bg-blue-900/20 blur-[140px]"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-3xl text-center space-y-6 sm:space-y-8"
        >
          {/* Judul Utama */}
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl uppercase">
              A&apos;LAWNA
            </h1>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-900 dark:text-blue-400">
              Luhur • Beradab • Bermanfaat
            </p>
          </div>

          {/* Deskripsi */}
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            A&apos;lawna adalah nama yang bermakna tinggi, luhur, dan unggul, namun keunggulan tersebut bukanlah tentang kesombongan, melainkan cita-cita mulia untuk memiliki akhlak, ilmu, dan keimanan yang luhur. Nama ini merupakan wujud doa dan harapan agar senantiasa tumbuh menjadi pribadi yang beradab, tetap rendah hati, serta membawa manfaat bagi sesama, dengan esensi utama menjadi pribadi unggul melalui ilmu, adab, dan keimanan.
          </p>

          {/* 2 Tombol Aksi (Tengah) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#mhmtq"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-blue-900 hover:bg-blue-800 px-8 py-3 text-base font-semibold text-white shadow-md hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              A&apos;lawna
            </a>
            <a
              href="#wisuda"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-blue-900 dark:border-blue-400 px-8 py-3 text-base font-semibold text-blue-900 dark:text-blue-400 shadow-md hover:shadow-md hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Wisuda
            </a>
          </div>

          {/* 3 Kotak Statistik Sejajar (Rata Tengah, Tanpa Ikon / Hanya Angka & Teks) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-slate-100 dark:border-slate-800 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900 p-3 sm:p-5 text-center shadow-xs hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <span className="text-2xl sm:text-3xl font-black text-blue-900 dark:text-blue-400">
                  {stat.number}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-200 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
