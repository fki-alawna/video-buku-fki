import Link from 'next/link';
import { Video, Plus, Play, ArrowRight, ExternalLink } from 'lucide-react';

export interface LatestVideoItem {
  id: string;
  title: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  folders: { name: string } | { name: string }[] | null;
}

interface AdminLatestVideosProps {
  latestVideos: LatestVideoItem[];
}

export default function AdminLatestVideos({ latestVideos }: AdminLatestVideosProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Video Terbaru</h2>
          <p className="text-xs text-slate-500">
            Tayangan video yang baru ditambahkan ke dalam sistem.
          </p>
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
          <p className="text-sm font-semibold text-slate-700">
            Belum ada video yang ditambahkan
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Tambahkan video Google Drive pertama Anda sekarang.
          </p>
          <div className="mt-4">
            <Link
              href="/admin/video/baru"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-900 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800 hover:scale-[1.02] active:scale-95 hover:shadow-md transition-all duration-300"
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
                className="group rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
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
  );
}
