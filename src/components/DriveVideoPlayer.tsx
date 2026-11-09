'use client';

import { useState } from 'react';

// Menampilkan video Google Drive via endpoint /preview.
// Tombol download TIDAK dijamin hilang dari sisi kode -
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
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    setIsPlaying(true);
    const wrapper = document.getElementById('video-wrapper');
    if (wrapper) {
      try {
        if (wrapper.requestFullscreen) {
          await wrapper.requestFullscreen();
        } else if ((wrapper as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
          await (wrapper as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
        }
      } catch {
        // Abaikan penolakan fullscreen oleh browser
      }
    }
  };

  return (
    <div
      id="video-wrapper"
      onContextMenu={(e) => e.preventDefault()}
      className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden"
    >
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        title={title}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer"
        draggable={false}
        className="w-full h-full border-0"
      />

      {/* Div transparan penutup tombol pop-out Drive di pojok kanan atas */}
      <div
        className="absolute top-0 right-0 z-10 h-16 w-16"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        aria-hidden="true"
      />

      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 text-white hover:bg-black/80 transition-all cursor-pointer"
        >
          <span className="text-2xl font-bold">▶ Tonton Video</span>
        </button>
      )}
    </div>
  );
}
