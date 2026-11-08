'use client';

import Image from 'next/image';
import { TrendingUp, BookOpen, Target, Palette } from 'lucide-react';

export default function Features() {
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
    <section id="mhmtq" className="relative bg-white py-16 sm:py-24 border-t border-slate-200/60 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header (Logo Besar di Atas Judul Filosofi Logo) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <Image
              src="/logo-alawna.png"
              alt="Logo A'lawna"
              width={256}
              height={256}
              className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto drop-shadow-sm hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
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
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Icon Container with Light Blue Circle */}
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h3>
                  <p
                    className="mt-2.5 text-sm leading-relaxed text-slate-600"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
