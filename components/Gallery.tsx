"use client";
// Gallery.tsx: a masonry (Pinterest-style) photo grid with a lightbox.
// Click a photo to view it large; use ← → keys to move, Esc to close.
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/photo-types";

export default function Gallery({ photos, film = false }: { photos: Photo[]; film?: boolean }) {
  const [open, setOpen] = useState<number | null>(null); // index of the open photo, or null
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  // Keyboard controls while the lightbox is open
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden"; // stop page scrolling behind the lightbox
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, close, step]);

  return (
    <>
      {/* CSS columns create the masonry layout: 1 column on phones, 2 on tablets, 3 on desktop */}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <button key={p.src} onClick={() => setOpen(i)} className={`group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-lg ${film ? "film-frame" : ""}`}>
            <span className="relative block overflow-hidden rounded-md">
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="h-auto w-full transition duration-500 group-hover:scale-[1.03]" />
              {film && <span aria-hidden className="film-grain absolute inset-0" />}
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div role="dialog" aria-modal="true" onClick={close} className="fixed inset-0 z-[60] flex items-center justify-center bg-shade/90 p-4 backdrop-blur-md">
          <Image src={photos[open].src} alt={photos[open].alt} width={photos[open].width} height={photos[open].height} sizes="100vw"
            className="max-h-[85vh] w-auto max-w-full rounded-md object-contain" onClick={(e) => e.stopPropagation()} />
          <button aria-label="Close" onClick={close} className="absolute right-5 top-5 text-3xl text-white/80 hover:text-white">×</button>
          <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 -translate-y-1/2 px-3 text-4xl text-white/70 hover:text-white">‹</button>
          <button aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 px-3 text-4xl text-white/70 hover:text-white">›</button>
          <p className="absolute bottom-5 text-sm text-white/70">{open + 1} / {photos.length}</p>
        </div>
      )}
    </>
  );
}
