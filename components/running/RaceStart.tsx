"use client";
// RaceStart.tsx: the "On your marks … Get set … GO!" overlay shown when you click a Running link.
// LensProvider controls it with motion values:
//   lanes — 0..1, the running-track lane lines drawing in
//   go    — 0..1, the journey line shooting across the screen after "GO!"
//   wipe  — 0..100, how much of the overlay has been wiped away (reveals the page)
import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react";

const WORDS = ["", "On your marks", "Get set", "GO!"];

// the journey line's corner points (top edge)
const LINE: [number, number][] = [[180, 626], [420, 626], [560, 506], [700, 576], [880, 366], [1020, 456], [1200, 286], [1500, 326]];
const SEG = LINE.slice(1).map((p, i) => Math.hypot(p[0] - LINE[i][0], p[1] - LINE[i][1]));
const TOTAL = SEG.reduce((a, b) => a + b, 0);
// the point a fraction (0..1) of the way along the line
function pointAt(f: number): [number, number] {
  let d = f * TOTAL;
  for (let i = 0; i < SEG.length; i++) {
    if (d <= SEG[i]) { const t = d / SEG[i]; return [LINE[i][0] + (LINE[i + 1][0] - LINE[i][0]) * t, LINE[i][1] + (LINE[i + 1][1] - LINE[i][1]) * t]; }
    d -= SEG[i];
  }
  return LINE[LINE.length - 1];
}
const toD = (dy: number) => "M" + LINE.map(([x, y]) => `${x} ${y + dy}`).join(" L");

export default function RaceStart({ step, lanes, go, wipe, opacity }: { step: number; lanes: MotionValue<number>; go: MotionValue<number>; wipe: MotionValue<number>; opacity: MotionValue<number> }) {
  const clipPath = useTransform(wipe, (w) => `inset(0 0 0 ${w}%)`);
  // the dot rides on the tip of the line
  const runnerX = useTransform(go, (g) => pointAt(g)[0]);
  const runnerY = useTransform(go, (g) => pointAt(g)[1]);
  const runnerOpacity = useTransform(go, [0, 0.02, 0.9, 1], [0, 1, 1, 0]);
  return (
    <motion.div aria-hidden className="fixed inset-0 z-[80] overflow-hidden bg-background" style={{ opacity, clipPath }}>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {/* lane lines in perspective, like looking down a running track */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.path key={i} d={`M0 ${600 + i * 52} L1440 ${560 + i * 64}`} fill="none" stroke="var(--ink)" strokeWidth={1.2} opacity={0.18 + i * 0.04} style={{ pathLength: lanes }} />
        ))}
        {/* the start line */}
        <motion.path d="M180 580 L150 920" stroke="var(--ink)" strokeWidth={10} style={{ pathLength: lanes }} />
        <motion.path d="M200 578 L172 920" stroke="var(--accent)" strokeWidth={3} style={{ pathLength: lanes }} />
        {/* lane numbers */}
        {[1, 2, 3, 4, 5].map((n, i) => (
          <motion.text key={n} x={110 - i * 6} y={636 + i * 58} fontSize={22} fontFamily="var(--font-inter), sans-serif" fill="var(--ink)" style={{ opacity: lanes }}>{n}</motion.text>
        ))}
        {/* the journey line: a folded ribbon that bolts away after GO */}
        <motion.path d={toD(10)} fill="none" stroke="var(--race-band)" strokeWidth={20} strokeLinejoin="miter" opacity={0.92} style={{ pathLength: go }} />
        <motion.path d={toD(0)} fill="none" stroke="var(--ink)" strokeWidth={2} style={{ pathLength: go }} />
        <motion.circle r={11} cy={0} fill="var(--accent)" stroke="var(--background)" strokeWidth={3} style={{ x: runnerX, y: runnerY, opacity: runnerOpacity }} />
      </svg>
      {/* the big words */}
      <div className="absolute inset-x-0 top-[26%] flex justify-center px-6">
        <AnimatePresence mode="wait">
          {step > 0 && (
            <motion.p key={step}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={`text-center font-serif tracking-tight ${step === 3 ? "text-[22vw] leading-none text-accent sm:text-[180px]" : "text-5xl sm:text-7xl"}`}>
              {WORDS[step]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <p className="absolute inset-x-0 top-[18%] text-center text-xs uppercase tracking-[0.4em] text-muted">Running · the journey so far</p>
    </motion.div>
  );
}
