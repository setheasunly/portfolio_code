"use client";
// HeroArt.tsx: the hero illustration, split into layers that move at different speeds.
// - Scrolling down: far things (sun, hills) move slowly, near things (bike, camera) faster.
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
        {/* middle: desk, laptop, mug */}
        <Layer depth={0.8} {...L}>
          <path d="M20 250 L230 250 M40 250 L40 330 M210 250 L210 330" {...stroke} />
          <g transform="translate(55 150)">
            <rect x="10" y="0" width="120" height="80" rx="6" {...stroke} />
            <path d="M0 100 L140 100 L130 82 L10 82 Z" {...stroke} />
            <path d="M24 18 L50 18 M24 30 L70 30 M34 42 L90 42 M34 54 L66 54 M24 66 L44 66" {...stroke} opacity="0.7" />
            <path d="M96 18 L112 18" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <g transform="translate(200 222)">
            <path d="M0 0 L0 24 Q0 28 4 28 L16 28 Q20 28 20 24 L20 0 Z M20 6 Q28 6 28 13 Q28 20 20 20" {...stroke} />
            <path d="M6 -6 Q2 -12 6 -18 M14 -6 Q10 -12 14 -18" {...stroke} opacity="0.5" />
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
