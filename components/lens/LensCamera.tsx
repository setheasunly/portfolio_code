"use client";
// LensCamera.tsx: the detailed front-view camera drawn for the "enter through the lens" transition.
// The drawing is centred on the lens (point 0,0) so zooming in always heads straight into the glass.
//
// It is controlled by "motion values" passed in from LensProvider:
//   open  — 0 = aperture closed, 1 = fully open (the iris blades swing out of the way)
//   focus — degrees the focus ring has turned
//   flare — 0..1, a light flare sliding across the glass
// The opening in the iris is a real hole: you see the next page through it.
import { motion, useTransform, type MotionValue } from "motion/react";

const INK = "#e4ddcf";
const ACCENT = "var(--accent)";
const BODY = "#2b2926";
const line = { fill: "none", stroke: INK, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const GLASS_R = 80; // radius of the glass / iris
const BLADES = 9;   // number of aperture blades

// Corner points of the iris opening for a given "open" amount (0..1).
function irisPoints(open: number) {
  const r = open * GLASS_R * 1.2;
  const twist = 0.35 + (1 - open) * 1.1; // blades rotate as they open
  return Array.from({ length: BLADES }, (_, i) => {
    const a = (i / BLADES) * Math.PI * 2 + twist;
    return [Math.cos(a) * r, Math.sin(a) * r] as const;
  });
}
const poly = (pts: readonly (readonly [number, number])[]) => "M" + pts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join("L") + "Z";
const circle = (r: number) => `M${r} 0A${r} ${r} 0 1 0 ${-r} 0A${r} ${r} 0 1 0 ${r} 0Z`;

export default function LensCamera({ open, focus, flare }: { open: MotionValue<number>; focus: MotionValue<number>; flare: MotionValue<number> }) {
  // Off-white "wall" covering the whole screen, with the iris shape cut out of it.
  const cover = useTransform(open, (o) => `M-6000 -6000H6000V6000H-6000Z ${poly(irisPoints(o))}`);
  // Just the iris opening — used as a "hole" in the mask below.
  const hole = useTransform(open, (o) => poly(irisPoints(o)));
  // Dark glass + blades: the glass circle minus the iris opening.
  const glass = useTransform(open, (o) => `${circle(GLASS_R)} ${poly(irisPoints(o))}`);
  // Blade edges: a line from each corner of the opening, continuing outward like a pinwheel.
  const edges = useTransform(open, (o) => {
    const pts = irisPoints(o);
    return pts.map((p, i) => {
      const q = pts[(i + 1) % BLADES];
      const dx = q[0] - p[0], dy = q[1] - p[1];
      const len = Math.hypot(dx, dy) || 1;
      // if the opening is tiny, use the blade angle instead
      const ux = len > 0.5 ? dx / len : Math.cos((i / BLADES) * Math.PI * 2 + 2);
      const uy = len > 0.5 ? dy / len : Math.sin((i / BLADES) * Math.PI * 2 + 2);
      return `M${(p[0] - ux * 2).toFixed(2)} ${(p[1] - uy * 2).toFixed(2)}L${(p[0] - ux * 200).toFixed(2)} ${(p[1] - uy * 200).toFixed(2)}`;
    }).join("");
  });
  const focusRotate = useTransform(focus, (f) => `rotate(${f}deg)`);
  const flareX = useTransform(flare, [0, 1], [-150, 150]);
  const flareY = useTransform(flare, [0, 1], [90, -90]);
  const flareOpacity = useTransform(flare, [0, 0.2, 0.7, 1], [0, 0.9, 0.7, 0]);
  const ghostX = useTransform(flareX, (v) => -v * 0.6); // a second, smaller "ghost" flare
  const ghostY = useTransform(flareY, (v) => -v * 0.6);

  // 90 little grip ridges around the focus ring
  const knurl = Array.from({ length: 90 }, (_, i) => {
    const a = (i / 90) * Math.PI * 2;
    return `M${Math.cos(a) * 119} ${Math.sin(a) * 119}L${Math.cos(a) * 133} ${Math.sin(a) * 133}`;
  }).join("");
  // tick marks on the distance scale
  const ticks = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    const r2 = i % 3 === 0 ? 106 : 109;
    return `M${Math.cos(a) * 112} ${Math.sin(a) * 112}L${Math.cos(a) * r2} ${Math.sin(a) * r2}`;
  }).join("");

  return (
    <svg viewBox="-320 -240 640 480" className="h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="lc-glass" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#4a3f38" />
          <stop offset="0.55" stopColor="#262120" />
          <stop offset="1" stopColor="#141212" />
        </radialGradient>
        <pattern id="lc-leather" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.7" fill={INK} opacity="0.13" />
          <circle cx="4.5" cy="4.5" r="0.7" fill={INK} opacity="0.09" />
        </pattern>
        <radialGradient id="lc-flare" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.4" stopColor="#ffe9d6" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffe9d6" stopOpacity="0" />
        </radialGradient>
        <clipPath id="lc-glass-clip"><circle r={GLASS_R} /></clipPath>
        {/* Mask: everything is visible except the iris opening, so the new page shows through it */}
        <mask id="lc-hole" maskUnits="userSpaceOnUse" x="-6000" y="-6000" width="12000" height="12000">
          <rect x="-6000" y="-6000" width="12000" height="12000" fill="#fff" />
          <motion.path d={hole} fill="#000" />
        </mask>
      </defs>
      <g mask="url(#lc-hole)">

      {/* 1. The off-white screen with the iris-shaped hole */}
      <motion.path d={cover} fill="var(--background)" fillRule="evenodd" />

      {/* 2. Camera body */}
      <g>
        {/* top plate: viewfinder hump, hot shoe, dials */}
        <path d="M-78 -150 L-56 -198 Q-52 -204 -46 -204 L46 -204 Q52 -204 56 -198 L78 -150 Z" {...line} fill={BODY} />
        <rect x="-30" y="-216" width="60" height="12" rx="3" {...line} fill={BODY} />
        <path d="M-22 -210 L22 -210" {...line} opacity="0.4" />
        <rect x="-250" y="-172" width="74" height="22" rx="5" {...line} fill={BODY} />
        <path d="M-244 -166 L-182 -166 M-244 -160 L-182 -160" {...line} opacity="0.35" />
        <rect x="140" y="-176" width="70" height="26" rx="6" {...line} fill={BODY} />
        <path d="M146 -170 L204 -170" {...line} opacity="0.35" />
        {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${148 + i * 9} -158 L${148 + i * 9} -152`} {...line} opacity="0.5" />)}
        <ellipse cx="240" cy="-158" rx="14" ry="8" fill={ACCENT} opacity="0.85" />
        <ellipse cx="240" cy="-158" rx="14" ry="8" {...line} />
        {/* main body */}
        <rect x="-290" y="-150" width="580" height="320" rx="28" {...line} fill={BODY} />
        {/* leather texture band */}
        <rect x="-282" y="-104" width="564" height="228" rx="6" fill="url(#lc-leather)" />
        <path d="M-290 -104 L290 -104 M-290 124 L290 124" {...line} opacity="0.55" />
        {/* viewfinder + rangefinder windows with reflections */}
        <rect x="-256" y="-140" width="78" height="30" rx="6" {...line} fill="#36332f" />
        <path d="M-248 -118 L-232 -134" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <rect x="186" y="-140" width="44" height="30" rx="5" {...line} fill="#36332f" />
        <circle cx="208" cy="-125" r="8" {...line} opacity="0.5" />
        {/* brand */}
        <text x="-10" y="-120" textAnchor="middle" fontFamily="var(--font-serif), serif" fontSize="15" letterSpacing="7" fill={INK} opacity="0.75">SUNLY</text>
        <circle cx="50" cy="-125" r="3" fill={ACCENT} />
        {/* strap lugs, self-timer, grip */}
        <rect x="-298" y="-128" width="10" height="26" rx="3" {...line} fill={BODY} />
        <rect x="288" y="-128" width="10" height="26" rx="3" {...line} fill={BODY} />
        <circle cx="-215" cy="-60" r="13" {...line} fill={BODY} />
        <path d="M-215 -60 L-205 -68" {...line} />
        <path d="M232 -80 Q262 -70 262 0 Q262 70 232 80" {...line} fill={BODY} />
        {[244, 252].map((x) => <path key={x} d={`M${x} -50 L${x} 50`} {...line} opacity="0.35" />)}
        <path d="M-260 150 L-200 150 M200 150 L260 150" {...line} opacity="0.3" />
      </g>

      {/* 3. Lens barrel */}
      <circle r="150" {...line} fill={BODY} />
      <circle r="142" {...line} fill="#2f2c29" />
      {/* focus ring (turns) */}
      <motion.g style={{ transform: focusRotate }}>
        <circle r="135" {...line} fill="#26241f" />
        <path d={knurl} stroke={INK} strokeWidth="1.1" opacity="0.45" />
        <circle r="117" {...line} fill="#33302c" />
        <path d={ticks} stroke={INK} strokeWidth="1" opacity="0.6" />
        <path id="lc-scale" d="M-98 0 A98 98 0 0 1 98 0" fill="none" />
        <text fontFamily="var(--font-inter), sans-serif" fontSize="8.5" letterSpacing="1.5" fill={INK} opacity="0.7">
          <textPath href="#lc-scale" startOffset="50%" textAnchor="middle">∞ · 10 · 5 · 3 · 2 · 1 m</textPath>
        </text>
      </motion.g>
      {/* index mark */}
      <path d="M0 -146 L-5 -156 L5 -156 Z" fill={ACCENT} />
      {/* front ring with engraving */}
      <circle r="100" {...line} fill="#2b2926" />
      <circle r="94" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.4" />
      <path id="lc-name" d="M-87 0 A87 87 0 0 1 87 0" fill="none" />
      <text fontFamily="var(--font-inter), sans-serif" fontSize="7.5" letterSpacing="2.4" fill={INK} opacity="0.75">
        <textPath href="#lc-name" startOffset="50%" textAnchor="middle">SUNLY · 50mm 1:1.4 · MEMORIES</textPath>
      </text>
      <path id="lc-name2" d="M-90 0 A90 90 0 0 0 90 0" fill="none" />
      <text fontFamily="var(--font-inter), sans-serif" fontSize="7" letterSpacing="2.4" fill={ACCENT}>
        <textPath href="#lc-name2" startOffset="50%" textAnchor="middle">● DIGITAL · FILM ●</textPath>
      </text>

      {/* 4. Glass + aperture blades (with the see-through opening) */}
      <motion.path d={glass} fill="url(#lc-glass)" fillRule="evenodd" />
      <g clipPath="url(#lc-glass-clip)">
        <motion.path d={edges} stroke="#fff" strokeWidth="1.1" opacity="0.32" />
        {/* lens element edges and coating reflections */}
        <circle r="64" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.14" />
        <circle r="44" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.1" />
        <path d="M-58 -30 A66 66 0 0 1 -18 -62" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.55" />
        <path d="M-46 -12 A50 50 0 0 1 -30 -38" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.35" />
        <path d="M30 58 A66 66 0 0 0 62 22" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M44 -50 A70 70 0 0 1 58 -30" stroke="#9fb3c8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.45" />
        <circle cx="-30" cy="-40" r="5" fill="#fff" opacity="0.85" />
      </g>
      <circle r={GLASS_R} fill="none" stroke={INK} strokeWidth="3" />
      <circle r={GLASS_R + 4} fill="none" stroke={INK} strokeWidth="0.8" opacity="0.5" />

      </g>

      {/* 5. Light flare sliding across the glass */}
      <motion.g style={{ x: flareX, y: flareY, opacity: flareOpacity }}>
        <circle r="34" fill="url(#lc-flare)" />
        <ellipse rx="120" ry="2" fill="#fff" opacity="0.6" />
      </motion.g>
      <motion.g style={{ x: ghostX, y: ghostY, opacity: flareOpacity }}>
        <circle r="10" fill={ACCENT} opacity="0.35" />
        <circle cx="-30" cy="18" r="5" fill="#fff" opacity="0.5" />
        <circle cx="26" cy="-15" r="16" fill="none" stroke={ACCENT} strokeWidth="1.5" opacity="0.4" />
      </motion.g>
    </svg>
  );
}
