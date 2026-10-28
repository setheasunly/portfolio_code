// geometry.ts: turns the list of races into points for the elevation line.
// Pure maths (no browser needed), so the server and browser draw exactly the same thing.
import type { JourneyRun } from "@/data/runs";

export type Pt = { x: number; y: number };
export type Node = Pt & { run: JourneyRun; index: number };

export const H = 700;          // drawing height (SVG units)
const BASE = 560;              // y of "zero elevation" (lower = bigger y)
const RISE = 330;              // height used by the highest climb
const LEAD = 300;              // flat "start" section before the first race
const GAP = 460;               // horizontal space between races
const TAIL = 260;              // line continues a little after the last race
export const RIBBON = 26;      // thickness of the folded paper ribbon

export function buildJourney(runs: JourneyRun[], gap = GAP) {
  const sorted = [...runs].sort((a, b) => a.date.localeCompare(b.date));
  const maxElev = Math.max(...sorted.map((r) => r.elevationM), 1);
  const yFor = (elev: number) => BASE - 30 - (elev / maxElev) * RISE;

  const nodes: Node[] = sorted.map((run, index) => ({ run, index, x: LEAD + 120 + index * gap, y: yFor(run.elevationM) }));
  const pts: Pt[] = [{ x: 0, y: BASE - 10 }, { x: LEAD, y: BASE - 10 }];
  nodes.forEach((n, i) => {
    const prev = pts[pts.length - 1];
    // a little "terrain" between races: a dip, then a small rise, so it reads like a trail profile
    if (i > 0) {
      const lower = Math.max(prev.y, n.y);
      pts.push({ x: prev.x + (n.x - prev.x) * 0.38, y: Math.min(BASE, lower + 34 + (i % 2) * 18) });
      pts.push({ x: prev.x + (n.x - prev.x) * 0.7, y: lower - (lower - n.y) * 0.45 + 10 });
    }
    pts.push({ x: n.x, y: n.y });
  });
  const last = pts[pts.length - 1];
  pts.push({ x: last.x + TAIL * 0.5, y: last.y + 28 });
  pts.push({ x: last.x + TAIL, y: last.y + 10 });
  const width = last.x + TAIL;

  // running length along the line at each point (for pathLength)
  const lens = [0];
  for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
  const total = lens[lens.length - 1];

  // where the line is at a given x: its height y and how far along (0..1) it is
  const at = (x: number) => {
    for (let i = 1; i < pts.length; i++) {
      if (x <= pts[i].x) {
        const a = pts[i - 1], b = pts[i];
        const t = (x - a.x) / (b.x - a.x || 1);
        return { y: a.y + (b.y - a.y) * t, frac: (lens[i - 1] + (lens[i] - lens[i - 1]) * Math.max(0, t)) / total };
      }
    }
    return { y: last.y, frac: 1 };
  };

  const d = "M" + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" L");
  return { nodes, pts, d, width, at, startX: 40, endX: last.x + 60 };
}
