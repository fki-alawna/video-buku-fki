'use client';

import { RotateCw, Radio } from 'lucide-react';

interface CalendarKeepAliveBannerProps {
  lastPingTime: string | null;
  isPending: boolean;
  onManualPing: () => void;
}

export default function CalendarKeepAliveBanner({
  lastPingTime,
  isPending,
  onManualPing,
}: CalendarKeepAliveBannerProps) {
  return (
    <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-900 to-indigo-950 p-5 sm:p-6 text-white shadow-[8px_8px_20px_rgba(0,0,0,0.06)] relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Kalender Terintegrasi (Masehi & Hijriah)
          </h2>
          <p className="text-xs sm:text-sm text-blue-200">
            Ping otomatis berjalan terjadwal via Vercel Cron untuk menjaga database Supabase tetap aktif tanpa jeda pause.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onManualPing}
            disabled={isPending}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-white text-blue-900 px-4 py-2.5 text-sm font-bold shadow-md hover:bg-blue-50 active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
          >
            <RotateCw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
            <span>{isPending ? 'Memproses...' : 'Ping Sekarang'}</span>
          </button>
        </div>
      </div>

      {/* Info Ping Terakhir */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-blue-200">
        <div className="flex items-center gap-2">
          <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
          <span>
            Ping Terakhir:{' '}
            <strong className="text-white">
              {lastPingTime
                ? new Date(lastPingTime).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : 'Belum tercatat'}
            </strong>
          </span>
        </div>
        <span className="text-white/30">•</span>
        <span>Interval Maksimal: <strong>6 Hari</strong></span>
        <span className="text-white/30">•</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
          <span>Titik Kuning: Ada Catatan Agenda</span>
        </span>
        <span className="text-white/30">•</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-400" />
          <span>Badge Biru: Jadwal Ping Server</span>
        </span>
      </div>
    </section>
  );
}
