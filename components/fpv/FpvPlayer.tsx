"use client";
// FpvPlayer.tsx: the video box. It's a "lite embed":
// - At first it only shows a poster picture (YouTube's thumbnail) with a drone-camera style
//   overlay (the "OSD": REC dot, battery, altitude, speed) and a big play button.
// - Only when you click play do we load YouTube's real player. YouTube's player is heavy,
//   so waiting until someone actually wants to watch keeps the homepage fast.
// - On a computer with a mouse the box tilts very slightly toward the pointer, like looking
//   through goggles. That's switched off on phones, for "reduce motion", and once the video plays.
import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCanAnimate, useFinePointer } from "@/components/motion/useMotionPrefs";
import type { Video } from "@/data/videos";

export default function FpvPlayer({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  // Try the big thumbnail first; some videos don't have one, so fall back to the smaller one.
  const [poster, setPoster] = useState(`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`);

  const fine = useFinePointer();
  const can = useCanAnimate();
  const tiltOn = fine && can && !playing;
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), { stiffness: 150, damping: 20 });
  const rotateX = useSpring(useTransform(py, [0, 1], [3, -3]), { stiffness: 150, damping: 20 });
  // the poster drifts a touch the opposite way, so it feels like a window (parallax)
  const imgX = useSpring(useTransform(px, [0, 1], [10, -10]), { stiffness: 150, damping: 20 });
  const imgY = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 150, damping: 20 });

  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (!tiltOn) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() { px.set(0.5); py.set(0.5); }

  return (
    <motion.div
      onPointerMove={move}
      onPointerLeave={reset}
      style={tiltOn ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      className="relative aspect-video w-full overflow-hidden rounded-3xl bg-shade shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
    >
      {playing ? (
        // The real YouTube player. youtube-nocookie.com = YouTube's privacy-friendly address.
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${video.title}`}
          className="group absolute inset-0 block h-full w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-inset"
        >
          {/* Poster picture (slightly bigger than the box so the parallax never shows an edge) */}
          <motion.span style={tiltOn ? { x: imgX, y: imgY } : undefined} className="absolute -inset-4 block">
            <Image
              src={poster}
              alt=""
              fill
              // YouTube already serves a small, optimised JPEG, so we load it straight from YouTube
              // instead of re-processing it on our server (faster, and fewer things to break).
              unoptimized
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover opacity-85 saturate-[0.8] transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
              onError={() => setPoster(`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`)}
            />
          </motion.span>
          {/* soft dark edges = cinematic vignette */}
          <span aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55))]" />

          <Osd />

          {/* Big round play button in the middle */}
          <span aria-hidden className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/30 text-white backdrop-blur-sm transition duration-300 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent/80 group-focus-visible:scale-110 group-focus-visible:bg-accent/80 sm:h-24 sm:w-24">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 sm:h-9 sm:w-9" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
          </span>

          {/* Title along the bottom (on phones it shows under the video instead, see FpvVideo.tsx) */}
          <span className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/70 to-transparent px-5 pb-10 pt-16 text-center sm:block sm:pb-12">
            <span className="font-serif text-lg italic text-white sm:text-2xl">{video.title}</span>
          </span>
        </button>
      )}
    </motion.div>
  );
}

// Osd: the "on-screen display" an FPV pilot sees in their goggles. Purely decoration,
// so it's hidden from screen readers. The numbers are made up for the look.
function Osd() {
  const corner = "absolute h-6 w-6 border-white/70 sm:h-9 sm:w-9";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 font-mono text-[10px] uppercase tracking-wider text-white/85 sm:text-xs">
      {/* corner brackets */}
      <span className={`${corner} left-3 top-3 border-l-2 border-t-2 sm:left-5 sm:top-5`} />
      <span className={`${corner} right-3 top-3 border-r-2 border-t-2 sm:right-5 sm:top-5`} />
      <span className={`${corner} bottom-3 left-3 border-b-2 border-l-2 sm:bottom-5 sm:left-5`} />
      <span className={`${corner} bottom-3 right-3 border-b-2 border-r-2 sm:bottom-5 sm:right-5`} />

      {/* top row: REC and battery */}
      <span className="absolute left-6 top-5 flex items-center gap-1.5 sm:left-12 sm:top-8">
        <span className="rec-dot h-2 w-2 rounded-full bg-red-500" /> Rec 00:00
      </span>
      <span className="absolute right-6 top-5 flex items-center gap-1.5 sm:right-12 sm:top-8">
        16.4V
        <span className="flex h-2.5 w-6 items-center gap-px rounded-[2px] border border-white/80 p-px">
          <span className="h-full w-1/3 bg-white/85" /><span className="h-full w-1/3 bg-white/85" /><span className="h-full w-1/3" />
        </span>
      </span>

      {/* centre crosshair (sits behind the play button, peeks out around it) */}
      <span className="absolute left-1/2 top-1/2 hidden h-px w-40 -translate-x-1/2 bg-white/35 sm:block" />

      {/* left & right: altitude and speed (computer screens only, phones are too narrow) */}
      <span className="absolute left-12 top-1/2 hidden -translate-y-1/2 leading-relaxed sm:block">
        <span className="block text-white/55">Alt</span>112m
      </span>
      <span className="absolute right-12 top-1/2 hidden -translate-y-1/2 text-right leading-relaxed sm:block">
        <span className="block text-white/55">Spd</span>68km/h
      </span>

      {/* bottom corners */}
      <span className="absolute bottom-5 left-6 hidden sm:bottom-8 sm:left-12 sm:block">4K · 60fps</span>
      <span className="absolute bottom-5 right-6 hidden sm:bottom-8 sm:right-12 sm:block">Ch R8 · 5.8GHz</span>
    </span>
  );
}
