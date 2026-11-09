'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Target, Palette } from 'lucide-react';
import FilosofiModal from './FilosofiModal';

export default function Features() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filosofiList = [
    {
      title: '3 Lekukan Menjulang',
      description: 'Semangat belajar yang tidak pernah padam dan cita-cita tinggi untuk menggapai kemuliaan dunia dan akhirat.',
      icon: TrendingUp,
    },
    {
      title: 'Lekukan Huruf Arab',
      description: 'Menanamkan kebijaksanaan, kedalaman ilmu Al-Qur&apos;an, serta adab luhur pesantren yang mengakar kuat.',
      icon: BookOpen,
    },
    {
      title: 'Titik Biru di Puncak',
      description: 'Keluhuran jiwa dan visi masa depan yang jelas, berorientasi pada kemaslahatan umat dan ridha Ilahi.',
      icon: Target,
    },
    {
      title: 'Deep Blue & Gold',
      description: 'Perpaduan ketenangan hati dan kedalaman spiritual dengan kemuliaan karakter serta kualitas santri unggul.',
      icon: Palette,
    },
  ];

  return (
    <section id="mhmtq" className="relative bg-white dark:bg-slate-950 py-16 sm:py-24 border-t border-slate-200/60 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.15 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header (Logo Besar di Atas Judul Filosofi Logo) */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="mb-4 sm:mb-6 flex justify-center">
              <motion.div
                layoutId="poster-filosofi"
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer group flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', damping: 20, stiffness: 350 }}
              >
                <Image
                  src="/logo-alawna.png"
                  alt="Logo A'lawna"
                  width={256}
                  height={256}
                  className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto drop-shadow-sm transition-transform duration-300"
                  priority
                />
              </motion.div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Filosofi Logo
            </h2>
          </div>

          {/* 4 Cards Grid (Light SaaS Style, Ikon + Judul + Deskripsi Saja) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filosofiList.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Icon Container with Dark Blue Circle */}
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 text-blue-900 dark:text-blue-400 group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                      <Icon className="h-7 w-7" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p
                      className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Interactive Morphing Modal for Logo Philosophy */}
      <FilosofiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
