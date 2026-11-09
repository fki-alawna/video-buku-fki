'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, StickyNote, ArrowRight } from 'lucide-react';

export interface TodayNoteItem {
  id: string;
  date: string;
  note: string;
  created_at: string;
}

interface AdminTodayNotesCardProps {
  todayNotes: TodayNoteItem[];
}

export default function AdminTodayNotesCard({ todayNotes }: AdminTodayNotesCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (todayNotes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Tidak ada agenda panitia khusus untuk hari ini.
            </p>
            <p className="text-xs text-slate-500">
              Sistem aktif dan berjalan lancar.
            </p>
          </div>
        </div>
        <Link
          href="/admin/kalender"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:underline shrink-0"
        >
          <span>+ Buat Catatan di Kalender</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border-2 border-amber-400 bg-amber-50/70 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-amber-200">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-amber-950">
            <StickyNote className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-amber-950" suppressHydrationWarning>
              Catatan &amp; Agenda Hari Ini ({todayNotes.length})
            </h2>
            <p className="text-xs text-amber-800" suppressHydrationWarning>
              {mounted
                ? new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Hari ini'}
            </p>
          </div>
        </div>
        <Link
          href="/admin/kalender"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-950 hover:underline"
        >
          <span>Buka Kalender</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ul className="mt-3.5 space-y-2">
        {todayNotes.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-2.5 rounded-xl bg-white/80 p-3 text-sm text-slate-800 border border-amber-200/60"
          >
            <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
            <span className="font-medium">{item.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
