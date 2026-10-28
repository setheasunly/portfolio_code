"use client";
// HeroArt.tsx: the hero illustration, split into layers that move at different speeds.
// - Scrolling down: far things (sun, hills) move slowly, near things (bike, camera) faster. The middle layer is a suitcase and a roll of film.
// - Moving the mouse: the whole drawing tilts a little and each layer shifts by its "depth".
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useCanAnimate } from "@/components/motion/useMotionPrefs";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// One layer: moves by `depth` with scroll and mouse. Bigger depth = feels closer to you.
function Layer({ depth, scroll, mx, my, children, extraX }: { depth: number; scroll: MotionValue<number>; mx: MotionValue<number>; my: MotionValue<number>; children: React.ReactNode; extraX?: MotionValue<number> }) {
  const x = useTransform(() => mx.get() * depth * 14 + (extraX ? extraX.get() : 0));
  const y = useTransform(() => my.get() * depth * 10 - scroll.get() * depth * 120);
  return <motion.g style={{ x, y }}>{children}</motion.g>;
}

export default function HeroArt({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const can = useCanAnimate();
  // 0 when the hero is at the top of the screen, 1 when it has scrolled out
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scroll = useTransform(scrollYProgress, (v) => (can ? v : 0));

  // Mouse position across the whole window, from -1 (left/top) to 1 (right/bottom), smoothed
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 20 });
  const my = useSpring(rawY, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (!can) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return; // ignore touch
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [can, rawX, rawY]);

  const rotateY = useTransform(mx, [-1, 1], [-6, 6]);
  const rotateX = useTransform(my, [-1, 1], [5, -5]);
  // the runner also jogs forward along the path as you scroll
  const runnerX = useTransform(scroll, [0, 1], [0, 90]);
  const L = { scroll, mx, my };

  return (
    // outer div: fades the drawing in on load; inner div: tilts with the mouse
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
    <motion.div style={{ rotateX, rotateY, transformPerspective: 900 }}>
      <svg viewBox="0 0 520 420" className="h-auto w-full overflow-visible" aria-hidden="true">
        {/* far: sun */}
        <Layer depth={0.3} {...L}>
          <circle cx="390" cy="95" r="58" fill="var(--accent)" opacity="0.18" />
          <circle cx="390" cy="95" r="58" {...stroke} opacity="0.35" strokeDasharray="2 6" />
        </Layer>
        {/* far: hills */}
        <Layer depth={0.5} {...L}>
          <path d="M10 300 Q120 230 230 280 T470 260 L510 270" {...stroke} opacity="0.35" />
          <path d="M40 320 Q170 270 300 305 T510 300" {...stroke} opacity="0.25" />
          <path d="M260 410 C 300 360, 420 350, 500 330" {...stroke} opacity="0.5" />
        </Layer>
        {/* middle: travel suitcase with stickers, and a film canister unrolling a strip of film */}
        <Layer depth={0.8} {...L}>
          {/* ground line */}
          <path d="M20 330 L240 330" {...stroke} opacity="0.45" />
          {/* suitcase */}
          <g transform="translate(46 172)">
            <path d="M34 22 L34 6 Q34 0 40 0 L66 0 Q72 0 72 6 L72 22" {...stroke} />
            <rect x="0" y="22" width="106" height="128" rx="12" {...stroke} fill="var(--background)" />
            <path d="M26 22 L26 150 M80 22 L80 150" {...stroke} opacity="0.55" />
            <path d="M0 62 L106 62" {...stroke} opacity="0.35" />
            {/* stickers: a sun, a mountain, a stamp */}
            <circle cx="53" cy="96" r="11" fill="var(--accent)" opacity="0.22" />
            <circle cx="53" cy="96" r="11" {...stroke} opacity="0.7" />
            <path d="M8 132 L16 118 L22 126 L28 116 L36 132 Z" {...stroke} opacity="0.7" />
            <rect x="84" y="112" width="14" height="18" rx="1.5" {...stroke} strokeDasharray="2 2" opacity="0.7" />
            {/* wheels */}
            <circle cx="16" cy="155" r="4" {...stroke} />
            <circle cx="90" cy="155" r="4" {...stroke} />
          </g>
          {/* film canister + a strip of film lying on the ground (frames + sprocket holes) */}
          <g transform="translate(166 262)">
            {/* the strip of film curling up out of the canister: an outline band (dark stroke with a
                lighter stroke on top), dashed sprocket holes and one accent frame */}
            <path d="M30 14 C 58 8, 70 -34, 44 -46 C 24 -54, 12 -32, 26 -24" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="butt" />
            <path d="M30 14 C 58 8, 70 -34, 44 -46 C 24 -54, 12 -32, 26 -24" fill="none" stroke="var(--background)" strokeWidth="11" strokeLinecap="butt" />
            <path d="M30 14 C 58 8, 70 -34, 44 -46 C 24 -54, 12 -32, 26 -24" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 7" opacity="0.55" />
            <path d="M54 -6 C 58 -14, 60 -22, 58 -28" fill="none" stroke="var(--accent)" strokeWidth="5" opacity="0.5" />
            {/* the canister */}
            <rect x="0" y="6" width="34" height="58" rx="6" {...stroke} fill="var(--background)" />
            <path d="M5 6 L5 1 L29 1 L29 6 M11 1 L11 -6 L23 -6 L23 1" {...stroke} fill="var(--background)" />
            <path d="M0 18 L34 18 M0 52 L34 52" {...stroke} opacity="0.4" />
            <path d="M8 30 L26 30 M8 38 L20 38" {...stroke} opacity="0.55" />
          </g>
        </Layer>
        {/* near: runner (also moves forward) */}
        <Layer depth={1.1} {...L} extraX={runnerX}>
          <g transform="translate(400 250)"><g className="float-slow">
            <circle cx="20" cy="0" r="9" {...stroke} />
            <path d="M18 10 L10 40 M14 22 L32 30 M14 22 L0 30 M10 40 L26 52 L22 70 M10 40 L-4 58 L-16 56" {...stroke} />
          </g></g>
        </Layer>
        {/* near: bicycle */}
        <Layer depth={1.4} {...L}>
          <g transform="translate(250 300)">
            <circle cx="0" cy="40" r="28" {...stroke} />
            <circle cx="100" cy="40" r="28" {...stroke} />
            <circle cx="0" cy="40" r="3" fill="currentColor" />
            <circle cx="100" cy="40" r="3" fill="currentColor" />
            <path d="M0 40 L35 0 L80 0 L100 40 M35 0 L48 40 L80 0 M48 40 L0 40 M30 -8 L42 -8 M80 0 L76 -14 L88 -16" {...stroke} />
          </g>
        </Layer>
        {/* nearest: floating camera and sparkles */}
        <Layer depth={1.8} {...L}>
          <g transform="translate(150 70)"><g className="float">
            <rect x="0" y="10" width="64" height="44" rx="8" {...stroke} />
            <path d="M18 10 L24 0 L40 0 L46 10" {...stroke} />
            <circle cx="32" cy="32" r="13" {...stroke} />
            <circle cx="32" cy="32" r="5" fill="var(--accent)" opacity="0.7" />
            <circle cx="54" cy="20" r="2" fill="currentColor" />
          </g></g>
          <path d="M90 60 L90 72 M84 66 L96 66 M300 160 L300 170 M295 165 L305 165" {...stroke} opacity="0.5" />
        </Layer>
      </svg>
    </motion.div>
    </motion.div>
  );
}
