'use client';

// Menampilkan video Google Drive via endpoint /preview.
// Kontrol video (play, pause, fullscreen) diserahkan ke pemutar bawaan
// Google Drive agar responsivitas sentuhan pada ponsel berjalan lancar.

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
      id="video-wrapper"
      className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden"
    >
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        title={title}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer"
        className="w-full h-full border-0"
      />
    </div>
  );
}
