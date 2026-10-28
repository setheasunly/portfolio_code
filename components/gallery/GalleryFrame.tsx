"use client";
// GalleryFrame.tsx: one album, hung on the wall like a framed artwork —
// a hanging wire, a spotlight above, a white mat, a frame (black for digital, warm oak for film)
// and a small museum label underneath. Clicking it zooms into the picture and opens the album.
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { useLens } from "@/components/lens/LensProvider";
import { formatMonth, type AlbumSummary } from "@/lib/photo-types";

export default function GalleryFrame({ album, index }: { album: AlbumSummary; index: number }) {
  const { zoomInto } = useLens();
  const picture = useRef<HTMLSpanElement>(null);
  const isFilm = album.type === "film";
  const href = `/photography/${album.slug}`;

  return (
    <motion.figure
      className="group relative flex w-full max-w-[300px] flex-col items-center pt-24"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}>
      {/* spotlight: the fixture and a soft cone of light that brightens on hover */}
      <span aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2">
        <svg width="34" height="26" viewBox="0 0 34 26" className="text-foreground">
          <path d="M17 0 V6 M8 6 H26 L22 20 H12 Z" fill="#f6f4ef" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M13 20 H21" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span aria-hidden className="spot-cone pointer-events-none absolute left-1/2 top-5 h-[78%] w-[150%] -translate-x-1/2 opacity-55 transition-opacity duration-700 group-hover:opacity-100" />

      {/* hanging wire + nail */}
      <svg aria-hidden className="absolute top-[58px] left-1/2 -translate-x-1/2 text-foreground/40" width="180" height="44" viewBox="0 0 180 44">
        <path d="M10 44 L90 6 L170 44" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="90" cy="5" r="2.5" fill="currentColor" />
      </svg>

      <Link href={href} data-cursor="photo" aria-label={`Open album ${album.title}`}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || !picture.current) return;
          e.preventDefault();
          zoomInto(picture.current, album.cover.src, href);
        }}
        className={`relative z-10 block w-full transition duration-500 group-hover:-translate-y-1.5 ${isFilm ? "frame-oak" : "frame-black"}`}>
        {/* the white mat around the picture */}
        <span className="block bg-[#fffdf8] p-[9%] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),inset_0_2px_6px_rgba(0,0,0,0.08)]">
          <span ref={picture} className="relative block aspect-[4/5] overflow-hidden">
            <Image src={album.cover.src} alt={album.title} fill sizes="340px"
              className={`object-cover transition duration-700 group-hover:scale-[1.04] ${isFilm ? "sepia-[.12]" : ""}`} />
            {isFilm && <span aria-hidden className="film-grain absolute inset-0" />}
            {/* glass reflection on the frame */}
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_38%)]" />
          </span>
        </span>
      </Link>

      {/* museum label */}
      <figcaption className="relative z-10 mt-7 w-[78%] self-end border border-line bg-[#fffdf8] px-4 py-3 text-left shadow-[0_6px_16px_-12px_rgba(0,0,0,0.35)]">
        <p className="font-serif text-[15px] leading-snug">{album.title}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
          {isFilm ? "Film" : "Digital"} · {formatMonth(album.date)}
        </p>
        {(album.camera || album.film) && (
          <p className="mt-1 text-[11px] italic text-muted">
            {[album.camera, album.film].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-2 text-[11px] text-accent">{album.count} photographs →</p>
      </figcaption>
    </motion.figure>
  );
}
