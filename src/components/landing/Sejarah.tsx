'use client';

import Image from 'next/image';

export default function Sejarah() {
  const galeriItems = [
    {
      src: '/galeri/foto-2.jpg',
      title: 'Dokumentasi 01',
      subtitle: 'Khidmat Khotmil Qur&apos;an',
    },
    {
      src: '/galeri/foto-3.jpg',
      title: 'Dokumentasi 02',
      subtitle: 'Prosesi Wisuda Santriwati',
    },
    {
      src: '/galeri/foto-4.jpg',
      title: 'Dokumentasi 03',
      subtitle: 'Majelis Khatam Al-Qur&apos;an',
    },
    {
      src: '/galeri/foto-5.jpg',
      title: 'Dokumentasi 04',
      subtitle: 'Doa Bersama Masyayikh',
    },
    {
      src: '/galeri/foto-6.jpg',
      title: 'Dokumentasi 05',
      subtitle: 'Keluarga Besar MHMTQ',
    },
    {
      src: '/galeri/foto-7.jpg',
      title: 'Dokumentasi 06',
      subtitle: 'Pentas Seni & Kreasi Santri',
    },
    {
      src: '/galeri/foto-8.jpg',
      title: 'Dokumentasi 07',
      subtitle: 'Pemberian Ijazah & Syahadah',
    },
    {
      src: '/galeri/foto-9.jpg',
      title: 'Dokumentasi 08',
      subtitle: 'Momen Syukur & Keharuan',
    },
    {
      src: '/galeri/foto-10.jpg',
      title: 'Dokumentasi 09',
      subtitle: 'Kebersamaan Santri A&apos;lawna',
    },
  ];

  return (
    <section id="wisuda" className="relative bg-slate-50 py-16 sm:py-24 border-t border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-600">
            Arsip & Kenangan Indah
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Sejarah A&apos;lawna
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Rangkaian kilas balik perjalanan, prosesi suci khotmil Qur&apos;an, dan ikatan kekeluargaan santriwati MHMTQ Lirboyo.
          </p>
        </div>

        {/* Grid 3x3 Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {galeriItems.map((item, idx) => (
            <div
              key={item.src}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 rounded-lg bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
                  Foto {idx + 1}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p
                  className="mt-1 text-sm text-slate-500"
                  dangerouslySetInnerHTML={{ __html: item.subtitle }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
