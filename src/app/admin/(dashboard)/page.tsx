import Link from 'next/link';
import Image from 'next/image';
import { createServiceClient } from '@/lib/supabase/server';
import {
  Folder,
  Video,
  QrCode,
  Plus,
  Play,
  ArrowRight,
  ExternalLink,
  Calendar,
  StickyNote,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const service = createServiceClient();

  const [folderCountRes, videoCountRes, activeVideoCountRes, latestVideosRes] =
    await Promise.all([
      service.from('folders').select('id', { count: 'exact', head: true }),
      service.from('videos').select('id', { count: 'exact', head: true }),
      service
        .from('videos')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true),
      service
        .from('videos')
        .select('id, title, slug, is_active, created_at, folders(name)')
        .order('created_at', { ascending: false })
        .limit(4),
    ]);

  const queryError =
    folderCountRes.error || videoCountRes.error || activeVideoCountRes.error;

  const folderCount = folderCountRes.count ?? 0;
  const videoCount = videoCountRes.count ?? 0;
  const activeVideoCount = activeVideoCountRes.count ?? 0;
  const latestVideos = latestVideosRes.data ?? [];

  const todayStr = new Date().toISOString().split('T')[0];
  let todayNotes: { id: string; date: string; note: string; created_at: string }[] = [];
  try {
    const { data: notesData } = await service
      .from('calendar_notes')
      .select('id, date, note, created_at')
      .eq('date', todayStr)
      .order('created_at', { ascending: false });
    if (notesData) {
      todayNotes = notesData;
    }
  } catch {
    // Ignore if table not yet created
  }

  return (
    <div className="space-y-8">
      {/* ─── HERO BANNER SAMBUTAN (SkillSet inspired modern hero card) ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 text-white p-6 sm:p-8 lg:p-10 shadow-lg">
        {/* Decorative Blurred Glow Elements */}
        <div
          className="absolute -right-8 -bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-32 -top-10 h-48 w-48 rounded-full bg-amber-400/15 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Teks Sambutan Kiri */}
          <div className="max-w-xl space-y-3.5">
            <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-amber-300 border border-white/15">
              <span>Portal Dasbor Resmi A&apos;lawna</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Selamat Datang, Admin A&apos;lawna!
            </h1>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Kelola video Google Drive, atur pengelompokan folder, dan cetak QR Code santriwati dengan mudah dan terorganisir.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/admin/video/baru"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-blue-950 hover:bg-amber-400 hover:text-blue-950 font-bold px-5 py-2.5 text-sm transition-all shadow-md active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah Video Baru</span>
              </Link>
              <Link
                href="/admin/qr"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 text-sm transition-all backdrop-blur-xs active:scale-95"
              >
                <QrCode className="h-4 w-4" />
                <span>Buka Cetak QR</span>
              </Link>
            </div>
          </div>

          {/* Ilustrasi Logo Kanan */}
          <div className="hidden sm:flex items-center justify-center shrink-0">
            <div className="relative flex h-32 w-32 lg:h-40 lg:w-40 items-center justify-center">
              <Image
                src="/logo-alawna.png"
                alt="Emblem A'lawna"
                width={160}
                height={160}
                className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(251,191,36,0.4)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {queryError ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"
        >
          Gagal mengambil ringkasan data dari Supabase. Pastikan tabel `folders` dan `videos` sudah dibuat melalui migrasi SQL.
        </div>
      ) : null}

      {/* ─── CARD CATATAN HARI INI ─── */}
      {todayNotes.length > 0 ? (
        <div className="rounded-3xl border-2 border-amber-400 bg-amber-50/70 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-amber-200">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-amber-950">
                <StickyNote className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-amber-950">
                  Catatan & Agenda Hari Ini ({todayNotes.length})
                </h2>
                <p className="text-xs text-amber-800">
                  {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
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
      ) : (
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
      )}

      {/* ─── GRID STATISTIK MODERN (3 Kartu Bersih) ─── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Ringkasan Sistem</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Kartu Total Folder */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Total Folder</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-900">
                  <Folder className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-blue-900">{folderCount}</p>
              <p className="mt-1 text-xs text-slate-500">Kategori penyimpanan video</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/admin/folder"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 transition-colors"
              >
                <span>Kelola Folder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Kartu Total Video */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Total Video</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-900">
                  <Video className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-blue-900">{videoCount}</p>
              <p className="mt-1 text-xs text-emerald-600 font-medium">
                {activeVideoCount} video aktif dapat diputar publik
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/admin/video"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 transition-colors"
              >
                <span>Kelola Video</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Kartu Cetak QR Code */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-500">Cetak QR Code</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                  <QrCode className="h-6 w-6" />
                </div>
              </div>
              <p className="mt-3 text-3xl font-extrabold text-blue-900">{videoCount}</p>
              <p className="mt-1 text-xs text-slate-500">Kode QR siap cetak &amp; tempel</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/admin/qr"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 transition-colors"
              >
                <span>Buka Halaman Cetak</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── SECTION POPULER / VIDEO TERBARU (SkillSet Popular Grid Style) ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Video Terbaru</h2>
            <p className="text-xs text-slate-500">Tayangan video yang baru ditambahkan ke dalam sistem.</p>
          </div>
          <Link
            href="/admin/video"
            className="text-xs font-bold uppercase tracking-wider text-blue-900 hover:underline flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {latestVideos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <Video className="mx-auto h-8 w-8 text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">Belum ada video yang ditambahkan</p>
            <p className="text-xs text-slate-500 mt-1">Tambahkan video Google Drive pertama Anda sekarang.</p>
            <div className="mt-4">
              <Link
                href="/admin/video/baru"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Tambah Video</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestVideos.map((vid) => {
              const folderName =
                vid.folders && typeof vid.folders === 'object' && 'name' in vid.folders
                  ? (vid.folders as { name: string }).name
                  : 'Umum';

              return (
                <div
                  key={vid.id}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Card Cover / Thumbnail Placeholder */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 p-3.5 flex flex-col justify-between text-white group-hover:scale-[1.02] transition-transform">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-md">
                          {folderName}
                        </span>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            vid.is_active ? 'bg-emerald-400' : 'bg-slate-400'
                          }`}
                          title={vid.is_active ? 'Aktif' : 'Nonaktif'}
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-blue-950 transition-colors shadow-md">
                          <Play className="h-4 w-4 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="text-[11px] text-blue-200 font-mono truncate">
                        /v/{vid.slug}
                      </span>
                    </div>

                    {/* Metadata Card */}
                    <div className="mt-3 space-y-1">
                      <h3
                        className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-900 transition-colors"
                        title={vid.title}
                      >
                        {vid.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Status:{' '}
                        <span
                          className={
                            vid.is_active
                              ? 'text-emerald-700 font-medium'
                              : 'text-slate-500 font-medium'
                          }
                        >
                          {vid.is_active ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Links */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <Link
                      href={`/admin/video/${vid.id}/edit`}
                      className="text-slate-600 hover:text-blue-900 hover:underline"
                    >
                      Edit Video
                    </Link>
                    <Link
                      href={`/v/${vid.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 hover:underline flex items-center gap-1"
                    >
                      <span>Putar</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
