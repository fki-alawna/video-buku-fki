'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X } from 'lucide-react';

interface TestimonialItem {
  name: string;
  text: string;
}

export default function Testimonials() {
  const [selected, setSelected] = useState<TestimonialItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials: TestimonialItem[] = [
    {
      name: 'Siti Aminah',
      text: "Nggak kerasa sudah 9 tahun di sini. Saking gak iso moco kitab, saiki iso wisuda. Thanks A'lawna!",
    },
    {
      name: 'Fatimatus Zahro',
      text: '9 tahun iki bukan waktu yang pendek. Ngaji, sekolah, mondok neng kene wes koyo omah dhewe. Kangen rek!',
    },
    {
      name: 'Nabila Salsabila',
      text: 'Bimbingan Mustahiq niku benar-benar tulus. Mboten namung ngajeni kitab, nanging ugi ngajeni adab. Barokalloh.',
    },
    {
      name: 'Aisyah Putri',
      text: 'Momen paling berharga pas muhafadzoh bareng bestie. Pas hafalan mumet, saling support. Love u gengs!',
    },
    {
      name: 'Wardatun Nisa',
      text: 'Alhamdulillah, resmi jadi alumni hari ini! Nggih mboten ngece, nanging rasane pengen nangis. Makasih doa restune semuanya.',
    },
    {
      name: 'Zahra Nabila',
      text: "Bapak-bapak Mustahiq sabar banget, koyo ngajeni anak dewe. Ilmu e berkah, akhlake barokah. A'lawna is the best!",
    },
    {
      name: 'Syifa Aulia',
      text: '9 tahun bareng terus. Dari kelas Ibtidaiyah sampai Aliyah. Susah seneng dilakoni bareng. Semoga silaturahmi gak putus yo!',
    },
    {
      name: 'Kirana Putri',
      text: 'Dedikasi ini untuk Ibu di rumah. Matur nuwun sampun nyekolahkan kulo neng panggenan sing tepat. A\'lawna forever!',
    },
    {
      name: 'Nayla Syakira',
      text: 'Praktik Ubudiyah dan Ujian Baca Kitab jadi momen paling deg-degan, tapi bapak e nggih sabar poll.',
    },
    {
      name: 'Salma Azzahra',
      text: 'Seneng banget iso sekelas karo wong-wong gokil neng kene. Pas ujian kitab kosongan, kompak banget belajare. Wehehe.',
    },
    {
      name: 'Fia Alawna',
      text: "Wajib Khidmah niku nggih capek, tapi dateng kepuasan batin. Belajar tulus ngabdi. A'lawna tempat molding karakter!",
    },
    {
      name: 'Muna Alifah',
      text: 'Matur nuwun sanget bimbinganipun para Masyayikh lan Bapak Mustahiq. Niki bukan akhir, tapi awal perjuangan. Semangat terus A\'lawna!',
    },
  ];

  // Duplikasi 2x untuk seamless infinite loop
  const marqueeItems = [...testimonials, ...testimonials];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelected(null);
    }

    if (selected) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);

  return (
    <section id="kontak" className="relative bg-slate-50 py-16 sm:py-24 border-t border-slate-200/60 text-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Kata Mereka
          </h2>
        </div>
      </div>

      {/* Auto-Scrolling Single-Row Marquee Container */}
      <div
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          animate={isPaused ? { x: undefined } : { x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 35,
              ease: 'linear',
            },
          }}
          className="flex gap-6 w-max pl-4"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              onClick={() => setSelected(item)}
              className="w-[320px] sm:w-[360px] shrink-0 flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-blue-400 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
            >
              <div>
                {/* 5 Stars Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-slate-300" />
                </div>

                {/* Testimonial Text */}
                <p className="text-sm leading-relaxed text-slate-600 italic line-clamp-3">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <h4 className="text-sm font-bold text-blue-900">
                  {item.name}
                </h4>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pop-up Zoom Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelected(null)}
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="relative w-full max-w-2xl rounded-3xl bg-white p-7 sm:p-10 shadow-2xl border border-slate-100 text-slate-900 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Tutup testimoni"
                className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Stars & Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <Quote className="h-7 w-7 text-blue-900/20" />
              </div>

              {/* Full Testimonial Text */}
              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 leading-relaxed italic mb-8">
                &ldquo;{selected.text}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-blue-900">
                    {selected.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Alumni Pondok Pesantren Putri Tahfizhil Qur&apos;an Lirboyo
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-sm">
                  {selected.name.charAt(0)}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
