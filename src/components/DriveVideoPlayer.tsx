'use client';

// Menampilkan video Google Drive via endpoint /preview.
// Tombol download TIDAK dijamin hilang dari sisi kode —
// wajib dimatikan dari setelan sharing Drive oleh pemilik
// akun (fkialawna@gmail.com) dengan mode Viewer.

interface DriveVideoPlayerProps {
  fileId: string;
  title: string;
}

export default function DriveVideoPlayer({
  fileId,
  title,
}: DriveVideoPlayerProps) {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/15 bg-black"
    >
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        title={title}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer"
        draggable={false}
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
