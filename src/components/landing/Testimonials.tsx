'use client';

import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
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

  return (
    <section id="kontak" className="relative bg-slate-50 py-16 sm:py-24 border-t border-slate-200/60 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header (Bersih tanpa sub-judul & deskripsi panjang) */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Kata Mereka
          </h2>
        </div>

        {/* 12 Testimonials Grid (Hanya Nama dan Teks, Tanpa Role) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-sky-300 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
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
                <p className="text-sm leading-relaxed text-slate-600 italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info (Hanya Nama) */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-sky-600">
                  {item.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
