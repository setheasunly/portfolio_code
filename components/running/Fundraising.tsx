"use client";
// Fundraising.tsx: the cause you're running for, with a progress bar shaped like a running track.
// The terracotta lane fills up to "raised / goal" when it scrolls into view.
import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";
import { fundraiser as f } from "@/data/runs";

// Running-track ("stadium") shape: two straights joined by half circles.
const L = 118, R = 282, T = 34, B = 194, RAD = (B - T) / 2;
const TRACK = `M${L} ${T} H${R} A${RAD} ${RAD} 0 0 1 ${R} ${B} H${L} A${RAD} ${RAD} 0 0 1 ${L} ${T} Z`;
const STRAIGHT = R - L, ARC = Math.PI * RAD, PERIM = 2 * STRAIGHT + 2 * ARC;
// where you are on the track after a fraction (0..1) of a lap
function lapPoint(frac: number): [number, number] {
  let d = frac * PERIM;
  const cy = (T + B) / 2;
  if (d <= STRAIGHT) return [L + d, T];
  d -= STRAIGHT;
  if (d <= ARC) { const a = -Math.PI / 2 + d / RAD; return [R + Math.cos(a) * RAD, cy + Math.sin(a) * RAD]; }
  d -= ARC;
  if (d <= STRAIGHT) return [R - d, B];
  d -= STRAIGHT;
  const a = Math.PI / 2 + d / RAD; return [L + Math.cos(a) * RAD, cy + Math.sin(a) * RAD];
}

export default function Fundraising() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const target = Math.min(1, f.raised / f.goal);
  const p = useMotionValue(0);
  const dotX = useTransform(p, (v) => lapPoint(v)[0]);
  const dotY = useTransform(p, (v) => lapPoint(v)[1]);
  const amount = useTransform(p, (v) => Math.round((v / (target || 1)) * f.raised).toLocaleString("en-AU"));
  useEffect(() => { if (inView) animate(p, target, { duration: 1.8, ease: [0.22, 1, 0.36, 1] }); }, [inView, p, target]);

  return (
    <div ref={ref} className="grid items-center gap-10 rounded-[28px] border border-line bg-white/50 p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Running for a cause</p>
        <h2 className="mt-3 font-serif text-4xl">{f.cause}</h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted">{f.blurb}</p>
        <p className="mt-6 font-serif text-3xl tabular-nums">
          {f.currency} $<motion.span>{amount}</motion.span>
          <span className="ml-2 font-sans text-sm text-muted">raised of ${f.goal.toLocaleString("en-AU")}</span>
        </p>
        <a href={f.donateUrl} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm text-white transition hover:-translate-y-0.5 hover:shadow-lg">
          Donate (placeholder) <span aria-hidden>→</span>
        </a>
      </div>
      {/* the track-shaped progress bar */}
      <svg viewBox="0 0 400 228" className="w-full" role="img" aria-label={`${Math.round(target * 100)}% of the goal raised`}>
        <path d={TRACK} fill="#efe9df" stroke="#d8cfc2" strokeWidth={34} />
        {[-11, 0, 11].map((o) => (
          <path key={o} d={`M${L} ${T - o} H${R} A${RAD + o} ${RAD + o} 0 0 1 ${R} ${B + o} H${L} A${RAD + o} ${RAD + o} 0 0 1 ${L} ${T - o} Z`} fill="none" stroke="#fffdf8" strokeWidth={1} opacity={0.9} />
        ))}
        <path d={TRACK} fill="none" stroke="#1c1c1c" strokeWidth={1} opacity={0.15} />
        <motion.path d={TRACK} fill="none" stroke="var(--accent)" strokeWidth={8} strokeLinecap="round" style={{ pathLength: p }} />
        {/* start / finish line */}
        <path d={`M${L} ${T - 18} V${T + 18}`} stroke="#1c1c1c" strokeWidth={3} />
        <text x={L} y={T + 38} textAnchor="middle" fontSize={9} letterSpacing={2} fill="#6b6b6b" fontFamily="var(--font-inter), sans-serif">START / GOAL</text>
        <motion.circle r={9} fill="#fffdf8" stroke="var(--accent)" strokeWidth={4} style={{ x: dotX, y: dotY }} />
        <text x={200} y={104} textAnchor="middle" fontSize={34} fontFamily="var(--font-fraunces), serif" fill="#1c1c1c">{Math.round(target * 100)}%</text>
        <text x={200} y={126} textAnchor="middle" fontSize={10} letterSpacing={2.4} fill="#6b6b6b" fontFamily="var(--font-inter), sans-serif">OF ONE LAP TO GOAL</text>
      </svg>
    </div>
  );
}
