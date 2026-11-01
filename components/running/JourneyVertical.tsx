"use client";
// JourneyVertical.tsx (phones): the same journey, but the ribbon runs DOWN the screen.
// The line draws itself as you scroll; each race sits beside its point on the line.
// Further right on the line = more climbing.
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import type { JourneyRun } from "@/data/runs";
import RunCard from "@/components/running/RunCard";

const ROW = 520;   // first guess at each race row height (px); measured for real in the browser
const W = 84;      // width of the line drawing (px)

export default function JourneyVertical({ runs }: { runs: JourneyRun[] }) {
  const sorted = useMemo(() => [...runs].sort((a, b) => a.date.localeCompare(b.date)), [runs]);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });

  // where each race row starts (px from the top). The server uses a guess; the browser measures.
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const [tops, setTops] = useState(() => sorted.map((_, i) => i * ROW));
  const [height, setHeight] = useState(sorted.length * ROW);
  useEffect(() => {
    const measure = () => {
      setTops(rows.current.map((el, i) => el?.offsetTop ?? i * ROW));
      setHeight(ref.current?.offsetHeight ?? sorted.length * ROW);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [sorted]);

  const maxElev = Math.max(...sorted.map((r) => r.elevationM), 1);
  const nodes = sorted.map((r, i) => ({ x: 14 + (r.elevationM / maxElev) * 50, y: tops[i] + 28 }));
  const pts = [{ x: 14, y: 0 }, ...nodes.flatMap((n, i) => {
    if (i === 0) return [n];
    const p = nodes[i - 1];
    return [{ x: Math.max(8, Math.min(p.x, n.x) - 8), y: p.y + (n.y - p.y) * 0.45 }, n];
  }), { x: nodes[nodes.length - 1].x - 6, y: height }];
  const total = height;
  const d = "M" + pts.map((p) => `${p.x} ${p.y}`).join(" L");
  // folded faces: each piece gets a side face, dark when it moves left, light when it moves right
  const faces = pts.slice(1).map((b, i) => {
    const a = pts[i];
    const fill = b.x < a.x - 1 ? "var(--rb-shadow)" : b.x > a.x + 1 ? "var(--rb-lit)" : "var(--rb-flat)";
    return { d: `M${a.x} ${a.y} L${b.x} ${b.y} L${b.x + 12} ${b.y} L${a.x + 12} ${a.y} Z`, fill };
  });

  return (
    <section aria-label="My running journey" className="relative px-5 md:hidden">
      <div ref={ref} className="relative pb-10">
        <svg width={W} height={total} viewBox={`0 0 ${W} ${total}`} className="absolute left-0 top-0 overflow-visible" aria-hidden>
          <path d={d} fill="none" stroke="var(--ink)" strokeWidth={1} strokeDasharray="2 6" opacity={0.25} />
          {faces.map((f, i) => <path key={i} d={f.d} fill={f.fill} stroke={f.fill} strokeWidth={0.5} opacity={0.95} />)}
          <motion.path d={d} fill="none" stroke="var(--ink)" strokeWidth={2.2} style={{ pathLength: scrollYProgress }} />
          {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={6} fill={i === 0 ? "var(--accent)" : "var(--ink)"} stroke="var(--background)" strokeWidth={2} />)}
        </svg>
        {/* the race rows, in normal page flow (so long text never overlaps) */}
        {sorted.map((r, i) => (
          <motion.div key={r.date + r.name} ref={(el) => { rows.current[i] = el; }} className="relative pb-14" style={{ paddingLeft: W + 10 }}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <p className="font-sans text-4xl font-semibold tracking-tight">{r.distanceKm}<span className="ml-1 text-lg font-medium">km</span></p>
            <p className="mb-3 text-xs text-muted">↑ {r.elevationM.toLocaleString("en-AU")} m · {r.date.slice(0, 4)}</p>
            <RunCard run={r} compact />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
