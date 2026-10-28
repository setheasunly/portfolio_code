"use client";
// JourneyHorizontal.tsx (desktop/tablet): the main feature of /running.
// The section is several screens tall but "sticks" while you scroll through it.
// Scrolling moves a runner along the elevation ribbon from left to right:
//   - the ribbon draws itself behind the runner
//   - the view pans sideways to follow the runner
//   - reaching a race lights up its peak label and shows its card
// Hover (or focus with the keyboard) any peak to see that race's card.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { JourneyRun } from "@/data/runs";
import { buildJourney, H } from "@/components/running/geometry";
import Ribbon, { RibbonDefs } from "@/components/running/Ribbon";
import RunCard from "@/components/running/RunCard";

const fmt = (n: number) => n.toLocaleString("en-AU", { maximumFractionDigits: 1 });

export default function JourneyHorizontal({ runs }: { runs: JourneyRun[] }) {
  const J = useMemo(() => buildJourney(runs), [runs]);
  const section = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  // Motion values (they update without re-rendering React — smooth and cheap)
  const runnerX = useMotionValue(J.startX);   // runner position, in drawing units
  const runnerY = useMotionValue(J.at(J.startX).y);
  const drawn = useMotionValue(0);            // 0..1 how much of the line is drawn
  const pan = useMotionValue(0);              // sideways pan of the whole drawing (px)
  const clipW = useTransform(runnerX, (x) => x + 2); // reveal the ribbon up to the runner
  const stride = useTransform(runnerX, (x) => (Math.floor(x / 22) % 2 === 0 ? 1 : 0)); // running legs
  const strideB = useTransform(stride, (v) => 1 - v);

  const [active, setActive] = useState(-1);   // the last race the runner has reached
  const [hover, setHover] = useState<number | null>(null);
  const size = useRef({ vw: 1280, scale: 1 }); // screen width + drawing scale

  // Work out everything from the scroll progress (0 at the top of the section, 1 at the end)
  const update = (p: number) => {
    const x = J.startX + p * (J.endX - J.startX);
    const { y, frac } = J.at(x);
    runnerX.set(x); runnerY.set(y); drawn.set(frac);
    const { vw, scale } = size.current;
    const full = J.width * scale;
    // keep the runner around 45% across the screen, without panning past either end
    pan.set(Math.min(0, Math.max(vw - full, vw * 0.45 - x * scale)));
    let a = -1;
    J.nodes.forEach((n, i) => { if (x >= n.x - 4) a = i; });
    setActive((prev) => (prev === a ? prev : a));
  };
  useMotionValueEvent(scrollYProgress, "change", update);
  useEffect(() => {
    const measure = () => {
      const h = svgRef.current?.getBoundingClientRect().height ?? H;
      size.current = { vw: window.innerWidth, scale: h / H };
      update(scrollYProgress.get());
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [J]);

  const shown = hover ?? active;
  const reached = J.nodes.slice(0, active + 1);
  const totalKm = reached.reduce((s, n) => s + n.run.distanceKm, 0);
  const totalUp = reached.reduce((s, n) => s + n.run.elevationM, 0);

  return (
    <section ref={section} aria-label="My running journey" className="relative hidden md:block" style={{ height: `${120 + runs.length * 80}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* running totals, top right */}
        <div className="absolute right-8 top-24 z-10 text-right lg:right-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted">So far</p>
          <p className="mt-1 font-serif text-3xl tabular-nums">{fmt(totalKm)} <span className="text-base text-muted">km</span></p>
          <p className="text-sm tabular-nums text-muted">↑ {fmt(totalUp)} m · {reached.length}/{runs.length} races</p>
        </div>

        {/* the card for the current (or hovered) race, top left */}
        <div className="absolute left-8 top-24 z-10 w-[min(420px,42vw)] lg:left-12">
          <AnimatePresence mode="wait">
            {shown >= 0 ? (
              <motion.div key={shown} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <RunCard run={J.nodes[shown].run} />
              </motion.div>
            ) : (
              <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-2">
                <p className="text-[11px] uppercase tracking-[0.3em] text-accent">Start line</p>
                <p className="mt-2 max-w-xs font-serif text-2xl leading-snug">Every race I&apos;ve run, joined as one line.</p>
                <p className="mt-2 text-sm text-muted">Keep scrolling to run it ↓</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* the drawing, panned sideways as you scroll */}
        <motion.div className="absolute bottom-[4vh] left-0" style={{ x: pan }}>
          <svg ref={svgRef} viewBox={`0 0 ${J.width} ${H}`} style={{ height: "min(64vh, 600px)", width: "auto", aspectRatio: `${J.width} / ${H}` }} className="overflow-visible">
            <defs>
              <RibbonDefs />
              <clipPath id="jh-clip"><motion.rect x={-50} y={-200} height={H + 400} width={clipW} /></clipPath>
            </defs>

            {/* faint "pencil" guide of the whole route, so you can see where you're heading */}
            <path d={J.d} fill="none" stroke="#1c1c1c" strokeWidth={1} strokeDasharray="2 7" opacity={0.25} />

            {/* the folded ribbon, revealed up to the runner */}
            <g clipPath="url(#jh-clip)"><Ribbon pts={J.pts} /></g>
            {/* the top edge drawing itself (pathLength = how much is drawn) */}
            <motion.path d={J.d} fill="none" stroke="#1c1c1c" strokeWidth={2.4} style={{ pathLength: drawn }} />

            {/* start block, like the black panel at the start of the reference */}
            <g>
              <text x={40} y={J.pts[0].y - 18} fontFamily="var(--font-inter), sans-serif" fontSize={13} letterSpacing={3} fill="#1c1c1c">START</text>
              <text x={J.pts[1].x - 8} y={J.pts[0].y + 19} textAnchor="end" fontFamily="var(--font-inter), sans-serif" fontSize={11} letterSpacing={2} fill="#fffdf8">MY RUNNING JOURNEY →</text>
            </g>

            {/* each race: peak label, year, name, hover target */}
            {J.nodes.map((n, i) => {
              const on = i <= active;
              const current = i === shown;
              return (
                <g key={n.run.date + n.run.name} role="button" tabIndex={0} aria-label={`${n.run.name}, ${n.run.date.slice(0, 4)}`}
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}
                  className="cursor-pointer outline-none" data-cursor="link">
                  <circle cx={n.x} cy={n.y} r={46} fill="transparent" />
                  {/* thin drop line to the year row */}
                  <path d={`M${n.x} ${n.y + 40} V${H - 70}`} stroke="#1c1c1c" strokeWidth={0.8} strokeDasharray="1 5" opacity={on ? 0.35 : 0.12} />
                  {/* the big label above the peak */}
                  <g style={{ opacity: on || current ? 1 : 0.18, transform: `translateY(${on ? 0 : 12}px)`, transition: "opacity .6s, transform .6s" }}>
                    <text x={n.x} y={n.y - 36} textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontWeight={600} fontSize={46} letterSpacing={-1.5}
                      fill={current ? "var(--accent)" : "#1c1c1c"} style={{ transition: "fill .4s" }}>
                      {fmt(n.run.distanceKm)}<tspan fontSize={24} fontWeight={500} dx={4}>km</tspan>
                    </text>
                    <text x={n.x} y={n.y - 92} textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize={13} letterSpacing={1} fill="#6b6b6b">↑ {fmt(n.run.elevationM)} m</text>
                  </g>
                  {/* the node itself */}
                  <circle cx={n.x} cy={n.y} r={current ? 7 : 5} fill={current ? "var(--accent)" : on ? "#1c1c1c" : "#fafaf7"} stroke="#1c1c1c" strokeWidth={1.5} style={{ transition: "all .3s" }} />
                  {/* year + race name along the bottom, like the reference */}
                  <text x={n.x} y={H - 40} textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontWeight={600} fontSize={20} fill="#1c1c1c" opacity={on ? 1 : 0.35}>{n.run.date.slice(0, 4)}</text>
                  <text x={n.x} y={H - 18} textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize={11} letterSpacing={0.6} fill="#6b6b6b" opacity={on ? 1 : 0.35}>
                    {n.run.name.replace(/^EXAMPLE — /, "")}{n.run.example ? " · EXAMPLE" : ""}
                  </text>
                </g>
              );
            })}

            {/* the runner: a terracotta dot with a tiny figure jogging on top */}
            <motion.g style={{ x: runnerX, y: runnerY }} className="pointer-events-none">
              <circle r={16} fill="var(--accent)" opacity={0.18}>
                <animate attributeName="r" values="10;20;10" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <circle r={8} fill="var(--accent)" stroke="#fffdf8" strokeWidth={3} />
              <g transform="translate(-10 -58) scale(0.55)" fill="none" stroke="#1c1c1c" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="0" r="9" />
                <motion.path d="M22 11 L13 46 M17 24 L38 33 M17 24 L0 33 M13 46 L32 60 L27 84 M13 46 L-4 66 L-18 63" style={{ opacity: stride }} />
                <motion.path d="M22 11 L13 46 M17 24 L33 15 M17 24 L4 38 M13 46 L20 66 L8 82 M13 46 L32 56 L40 72" style={{ opacity: strideB }} />
              </g>
            </motion.g>
          </svg>
        </motion.div>

        {/* scroll progress along the bottom */}
        <div className="absolute inset-x-8 bottom-3 h-px bg-line lg:inset-x-12">
          <motion.div className="h-px origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}
