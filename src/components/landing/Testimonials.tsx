'use client';

import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ning Syarifah',
      role: 'Alumni 2024',
      quote: 'Matur nuwun sanget kagem para asatidz lan pengasuh. Sinau teng mriki mboten namung ngaos, tapi ugi sinau tata krama lan adab ingkang luhur.',
    },
    {
      name: 'Ibu Hj. Masruroh',
      role: 'Wali Santriwati - Kediri',
      quote: 'Alhamdulillah sanget remen ningali putra kulo saget khotmil Quran kanthi tartil. Penataane adicara A&apos;lawna saestu nengsemaken lan khidmat.',
    },
    {
      name: 'Fatimatuz Zahra',
      role: 'Khotimat 30 Juz',
      quote: 'Perjalanan panjang ngaos lan setoran mboten keraos awit dipun bimbing kanthi sabar. A&apos;lawna dados kenangan ingkang mboten badhe kasupen.',
    },
    {
      name: 'Bpk. H. Subakir',
      role: 'Wali Santri - Jombang',
      quote: 'Bocah sakniki mboten gampang golek lingkungan ingkang sae. Wonten P3TQ Lirboyo, kulo ayem lan marem sanget ningali akhlake lare kulo.',
    },
    {
      name: 'Nabila Salsabila',
      role: 'Santriwati Mustahiqoh',
      quote: 'Program lan kurikulum ingkang terstruktur ndadosaken sedaya santri saged istiqomah nderekaken tahfidz dumugi paripurna.',
    },
    {
      name: 'Ustadzah Halimah',
      role: 'Pembimbing Tahfidz',
      quote: 'Mugi-mugi berkah Al-Qur&apos;an tansah nyarengi para santriwati sedaya, dados pribadi ingkang luhur lan migunani tumrap nusa lan bangsa.',
    },
    {
      name: 'dr. Hendra Pratama',
      role: 'Wali Santri - Surabaya',
      quote: 'Sistem informasi dan dokumentasi video lewat QR sangat memudahkan kami keluarga di luar kota untuk menyimak prosesi khidmat anak kami.',
    },
    {
      name: 'Siti Rohmah',
      role: 'Alumni Angkatan 2023',
      quote: 'Kangen suasana setoran subuh lan sholawatan bareng. Nilai adab lan disiplin ingkang dipun ajaraken saestu migunani wonten bebrayan.',
    },
    {
      name: 'Ibu Nurul Hidayati',
      role: 'Wali Santri - Tulungagung',
      quote: 'Matur suwun dumateng poro Masyayikh. Tangis haru mboten saged kapenggak nalika ningali lare kulo dipun wisuda kanthi khidmat.',
    },
    {
      name: 'Aisyah Putri',
      role: 'Khotimat Binnadhor',
      quote: 'Matur nuwun sedaya tim panitia A&apos;lawna. Kualitas dokumentasi lan acarane estu sae, ndadosaken tambah semangat anggenipun ngaos.',
    },
    {
      name: 'Bpk. Joko Susilo',
      role: 'Wali Santri - Malang',
      quote: 'Alhamdulillah, sanes namung apalan Qur&apos;an mawon, nanging adab dumateng tiyang sepuh sanget katingal sae sanget.',
    },
    {
      name: 'Wardatun Nisa',
      role: 'Santriwati A&apos;lawna',
      quote: 'Bangga dados bagian saking keluarga ageng A&apos;lawna. Mugi sedaya ilmu ingkang dipun paringaken dados barokah fiddini waddunya wal akhirah.',
    },
  ];

  return (
    <section id="kontak" className="relative bg-slate-50 py-16 sm:py-24 border-t border-slate-200/60 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-600">
            Apresiasi & Kesan Mendalam
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Kata Mereka
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Kesan, doa, dan pengalaman berharga dari santriwati, asatidz, dan wali santri keluarga besar A&apos;lawna.
          </p>
        </div>

        {/* 12 Testimonials Grid (3 columns desktop, 1 column mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md transition-shadow"
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

                {/* Testimonial Quote */}
                <p
                  className="text-sm leading-relaxed text-slate-600 italic"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${item.quote}&rdquo;` }}
                />
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-sky-600">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
