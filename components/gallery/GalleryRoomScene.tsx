// GalleryRoomScene.tsx: a line-art drawing of a gallery room in perspective —
// back wall with framed pictures, ceiling track lights casting soft cones, a wooden floor
// and a bench. Purely decorative (screen readers skip it).
const INK = "#1c1c1c";
const l = { fill: "none", stroke: INK, strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export default function GalleryRoomScene({ className }: { className?: string }) {
  // Back wall corners (the "vanishing" rectangle) and the outer picture edges
  const B = { l: 300, r: 900, t: 70, b: 300 };
  const boards = Array.from({ length: 13 }, (_, i) => {
    const x = i * 100;
    const bx = B.l + (x / 1200) * (B.r - B.l);
    return `M${x} 400 L${bx} ${B.b}`;
  }).join("");
  const spots = [400, 600, 800];
  return (
    <svg viewBox="0 0 1200 400" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="gr-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffeeda" stopOpacity="1" />
          <stop offset="1" stopColor="#fff3e4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gr-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ebe5dc" />
          <stop offset="1" stopColor="#e2dace" />
        </linearGradient>
        <radialGradient id="gr-pool" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* surfaces */}
      <path d={`M0 0 H1200 L${B.r} ${B.t} H${B.l} Z`} fill="#f6f4ef" />
      <path d={`M0 0 L${B.l} ${B.t} V${B.b} L0 400 Z`} fill="#efece5" />
      <path d={`M1200 0 L${B.r} ${B.t} V${B.b} L1200 400 Z`} fill="#efece5" />
      <rect x={B.l} y={B.t} width={B.r - B.l} height={B.b - B.t} fill="#f3f0ea" />
      <path d={`M0 400 L${B.l} ${B.b} H${B.r} L1200 400 Z`} fill="url(#gr-floor)" />
      <path d={boards} stroke={INK} strokeWidth="0.8" opacity="0.12" />
      {/* room edges */}
      <path d={`M0 0 L${B.l} ${B.t} M1200 0 L${B.r} ${B.t} M0 400 L${B.l} ${B.b} M1200 400 L${B.r} ${B.b}`} {...l} opacity="0.45" />
      <rect x={B.l} y={B.t} width={B.r - B.l} height={B.b - B.t} {...l} opacity="0.55" />
      <path d={`M${B.l} ${B.b - 8} H${B.r}`} {...l} opacity="0.25" />

      {/* ceiling track with spotlights and their light cones */}
      <path d={`M${B.l + 40} ${B.t + 10} H${B.r - 40}`} {...l} />
      {spots.map((x, i) => (
        <g key={x}>
          <path d={`M${x - 14} ${B.t + 26} L${x - (i === 1 ? 110 : 70)} ${B.b - 30} H${x + (i === 1 ? 110 : 70)} L${x + 14} ${B.t + 26} Z`} fill="url(#gr-cone)" opacity="0.9" />
          <path d={`M${x} ${B.t + 10} V${B.t + 16}`} {...l} />
          <path d={`M${x - 9} ${B.t + 16} H${x + 9} L${x + 6} ${B.t + 28} H${x - 6} Z`} {...l} fill="#f6f4ef" />
          <path d={`M${x - 5} ${B.t + 28} H${x + 5}`} stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}

      {/* framed works on the back wall */}
      {[
        { x: 352, y: 140, w: 96, h: 76 },
        { x: 520, y: 118, w: 160, h: 112, accent: true },
        { x: 752, y: 140, w: 96, h: 76 },
      ].map((f, i) => (
        <g key={i}>
          <rect x={f.x + 3} y={f.y + 4} width={f.w} height={f.h} fill={INK} opacity="0.06" />
          <rect x={f.x} y={f.y} width={f.w} height={f.h} {...l} fill="#fffdf8" />
          <rect x={f.x + 10} y={f.y + 10} width={f.w - 20} height={f.h - 20} fill={f.accent ? "#e9d8c6" : "#e6e3dc"} stroke={INK} strokeWidth="0.8" opacity="0.9" />
          <circle cx={f.x + f.w * 0.68} cy={f.y + f.h * 0.38} r={f.h * 0.09} fill="#fff" opacity="0.8" />
          <path d={`M${f.x + 10} ${f.y + f.h - 22} Q${f.x + f.w * 0.35} ${f.y + f.h * 0.45} ${f.x + f.w * 0.6} ${f.y + f.h - 26} T${f.x + f.w - 10} ${f.y + f.h - 30} V${f.y + f.h - 10} H${f.x + 10} Z`} fill={INK} opacity="0.12" />
          {/* museum label */}
          <rect x={f.x + f.w + 8} y={f.y + f.h - 16} width="16" height="10" fill="#fffdf8" stroke={INK} strokeWidth="0.6" opacity="0.8" />
        </g>
      ))}

      {/* frames on the side walls, in perspective */}
      <path d="M95 120 L190 140 V250 L95 262 Z" {...l} fill="#fffdf8" opacity="0.8" />
      <path d="M108 135 L178 150 V240 L108 249 Z" fill="#e6e3dc" stroke={INK} strokeWidth="0.7" opacity="0.7" />
      <path d="M1105 120 L1010 140 V250 L1105 262 Z" {...l} fill="#fffdf8" opacity="0.8" />
      <path d="M1092 135 L1022 150 V240 L1092 249 Z" fill="#e9d8c6" stroke={INK} strokeWidth="0.7" opacity="0.7" />

      {/* soft light pools on the floor */}
      <ellipse cx="600" cy="345" rx="230" ry="26" fill="url(#gr-pool)" opacity="0.7" />

      {/* gallery bench */}
      <path d="M500 330 H700 L716 344 H484 Z" {...l} fill="#f8f6f1" />
      <path d="M484 344 V352 H716 V344 M500 352 V376 M700 352 V376 M520 352 V368 M680 352 V368" {...l} />

      {/* gallery sign under the centre picture */}
      <rect x="528" y="252" width="144" height="20" fill="#fffdf8" stroke={INK} strokeWidth="0.8" />
      <text x="600" y="265.5" textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize="7.5" letterSpacing="2.6" fill={INK} opacity="0.75">THE GALLERY · PHOTOGRAPHY</text>

      {/* a visitor with a camera, looking at the art */}
      <g transform="translate(842 214)">
        <ellipse cx="0" cy="104" rx="26" ry="4" fill={INK} opacity="0.08" />
        <path d="M-6 6 Q-9 -6 0 -10 Q10 -10 9 2 Q8 10 1 12 Q-4 12 -6 6 Z" {...l} fill="#f8f6f1" />
        <path d="M-6 -2 Q-2 -12 8 -6" {...l} strokeWidth="3" />
        <path d="M-4 14 L-14 22 L-17 60 L13 60 L10 22 Z" {...l} fill="#f8f6f1" />
        <path d="M-9 60 L-10 100 M6 60 L8 100 M-14 100 H-6 M4 100 H12" {...l} />
        <path d="M-12 24 L-20 44 L-6 44 M8 24 L12 42 L-2 44" {...l} />
        <rect x="-10" y="38" width="13" height="9" rx="2" {...l} fill="var(--accent)" />
        <path d="M-4 14 L-3 38" stroke="var(--accent)" strokeWidth="1" opacity="0.8" />
      </g>
    </svg>
  );
}
