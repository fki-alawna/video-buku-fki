import { MessageCircle, X } from 'lucide-react';

interface AdminChatHeaderProps {
  onClose: () => void;
}

export default function AdminChatHeader({ onClose }: AdminChatHeaderProps) {
  return (
    <header className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 shadow-2xs">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-900 text-white shadow-md">
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black tracking-tight text-blue-900">
              A&apos;lawna Intelligence - Agen Panitia
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Function Calling Aktif
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Pusat kendali dan asisten cerdas operasional sistem A&apos;lawna
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        title="Tutup (Esc)"
        aria-label="Tutup Command Center"
        className="rounded-2xl p-2.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>
    </header>
  );
}
