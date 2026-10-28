"use client";
// RunnerArt.tsx: the Running section drawing. As you scroll, the two runners
// jog along the path toward the finish flag — and their legs only move while you scroll.
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useCanAnimate } from "@/components/motion/useMotionPrefs";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// Two body poses; showing them alternately makes the runner look like it's running.
const POSE_A = "M22 11 L13 46 M17 24 L38 33 M17 24 L0 33 M13 46 L32 60 L27 84 M13 46 L-4 66 L-18 63";
const POSE_B = "M22 11 L13 46 M17 24 L33 15 M17 24 L4 38 M13 46 L20 66 L8 82 M13 46 L32 56 L40 72";

function Runner({ progress, start, end, phase, scale = 1, accent = false }: { progress: MotionValue<number>; start: number; end: number; phase: number; scale?: number; accent?: boolean }) {
  const x = useTransform(progress, [0, 1], [start, end]);
  // a small up-down bounce with each stride
  const y = useTransform(progress, (p) => -Math.abs(Math.sin((p * 40 + phase) * Math.PI)) * 4);
  // switch pose roughly every 1/40th of the scroll
  const a = useTransform(progress, (p) => (Math.floor(p * 40 + phase) % 2 === 0 ? 1 : 0));
  const b = useTransform(a, (v) => 1 - v);
  return (
    <motion.g style={{ x, y }}>
      <g transform={`translate(0 ${96 + (1 - scale) * 80}) scale(${scale})`}>
        <circle cx="24" cy="0" r="10" {...stroke} />
        <motion.path d={POSE_A} {...stroke} style={{ opacity: a }} />
        <motion.path d={POSE_B} {...stroke} style={{ opacity: b }} />
        {accent && <path d="M28 -7 Q36 -5 38 3" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" />}
      </g>
    </motion.g>
  );
}

export default function RunnerArt({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const can = useCanAnimate();
  // 0 when the drawing appears at the bottom of the screen, 1 when it leaves at the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useTransform(scrollYProgress, (v) => (can ? v : 0.5));
  const sunY = useTransform(progress, [0, 1], [20, -20]);

  return (
    <div ref={ref} className={className}>
      <svg viewBox="0 0 400 220" className="h-auto w-full overflow-visible" aria-hidden="true">
        <motion.circle cx="320" cy="60" r="34" fill="var(--accent)" opacity="0.18" style={{ y: sunY }} />
        <path d="M0 190 Q100 170 200 185 T400 178" {...stroke} opacity="0.5" />
        <path d="M20 205 L60 205 M110 208 L170 208 M240 204 L300 204" {...stroke} opacity="0.3" strokeDasharray="2 6" />
        {/* finish flag */}
        <g transform="translate(320 110)">
          <path d="M0 0 L0 76" {...stroke} />
          <path d="M0 2 L34 8 L0 22" fill="var(--accent)" opacity="0.5" />
          <path d="M0 2 L34 8 L0 22" {...stroke} />
        </g>
        <Runner progress={progress} start={-10} end={250} phase={0} />
        <Runner progress={progress} start={40} end={275} phase={1} scale={0.92} accent />
      </svg>
    </div>
  );
}
