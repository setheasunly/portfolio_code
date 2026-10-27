// Illustrations.tsx: hand-drawn style line-art SVGs used across the site.
// SVGs are drawings made of code (lines, circles, paths), so they stay sharp at any size.
// "currentColor" means the drawing uses the text colour of its parent.
// Animated parts use two <g> groups: the outer one positions, the inner one floats.

type P = { className?: string };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// Big hero scene: a desk with a laptop showing code, a camera, a bicycle and a runner on a path.
export function HeroScene({ className }: P) {
  return (
    <svg viewBox="0 0 520 420" className={className} aria-hidden="true">
      {/* warm sun / accent circle */}
      <circle cx="390" cy="95" r="58" fill="var(--accent)" opacity="0.18" />
      <circle cx="390" cy="95" r="58" {...stroke} opacity="0.35" strokeDasharray="2 6" />
      {/* distant hills */}
      <path d="M10 300 Q120 230 230 280 T470 260 L510 270" {...stroke} opacity="0.35" />
      <path d="M40 320 Q170 270 300 305 T510 300" {...stroke} opacity="0.25" />
      {/* winding path */}
      <path d="M260 410 C 300 360, 420 350, 500 330" {...stroke} opacity="0.5" />
      {/* runner (on the path) */}
      <g transform="translate(400 250)"><g className="float-slow">
        <circle cx="20" cy="0" r="9" {...stroke} />
        <path d="M18 10 L10 40 M14 22 L32 30 M14 22 L0 30 M10 40 L26 52 L22 70 M10 40 L-4 58 L-16 56" {...stroke} />
      </g></g>
      {/* bicycle */}
      <g transform="translate(250 300)">
        <circle cx="0" cy="40" r="28" {...stroke} />
        <circle cx="100" cy="40" r="28" {...stroke} />
        <circle cx="0" cy="40" r="3" fill="currentColor" />
        <circle cx="100" cy="40" r="3" fill="currentColor" />
        <path d="M0 40 L35 0 L80 0 L100 40 M35 0 L48 40 L80 0 M48 40 L0 40 M30 -8 L42 -8 M80 0 L76 -14 L88 -16" {...stroke} />
      </g>
      {/* desk */}
      <path d="M20 250 L230 250 M40 250 L40 330 M210 250 L210 330" {...stroke} />
      {/* laptop */}
      <g transform="translate(55 150)">
        <rect x="10" y="0" width="120" height="80" rx="6" {...stroke} />
        <path d="M0 100 L140 100 L130 82 L10 82 Z" {...stroke} />
        {/* code lines */}
        <path d="M24 18 L50 18 M24 30 L70 30 M34 42 L90 42 M34 54 L66 54 M24 66 L44 66" {...stroke} opacity="0.7" />
        <path d="M96 18 L112 18" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="0" y="0" width="0" height="0" />
      </g>
      {/* coffee mug with steam */}
      <g transform="translate(200 222)">
        <path d="M0 0 L0 24 Q0 28 4 28 L16 28 Q20 28 20 24 L20 0 Z M20 6 Q28 6 28 13 Q28 20 20 20" {...stroke} />
        <path d="M6 -6 Q2 -12 6 -18 M14 -6 Q10 -12 14 -18" {...stroke} opacity="0.5" />
      </g>
      {/* camera floating above */}
      <g transform="translate(150 70)"><g className="float">
        <rect x="0" y="10" width="64" height="44" rx="8" {...stroke} />
        <path d="M18 10 L24 0 L40 0 L46 10" {...stroke} />
        <circle cx="32" cy="32" r="13" {...stroke} />
        <circle cx="32" cy="32" r="5" fill="var(--accent)" opacity="0.7" />
        <circle cx="54" cy="20" r="2" fill="currentColor" />
      </g></g>
      {/* little sparkles */}
      <path d="M90 60 L90 72 M84 66 L96 66 M300 160 L300 170 M295 165 L305 165" {...stroke} opacity="0.5" />
    </svg>
  );
}

// Small icons for the About cards.
export function CodeIcon({ className }: P) {
  return (<svg viewBox="0 0 48 48" className={className} aria-hidden="true"><rect x="6" y="10" width="36" height="24" rx="3" {...stroke} /><path d="M4 38 L44 38 M19 18 L15 22 L19 26 M29 18 L33 22 L29 26 M25 17 L23 27" {...stroke} /></svg>);
}
export function RunIcon({ className }: P) {
  return (<svg viewBox="0 0 48 48" className={className} aria-hidden="true"><circle cx="28" cy="9" r="4" {...stroke} /><path d="M26 14 L21 27 L29 32 L27 42 M21 27 L14 36 L8 35 M23 19 L33 23 M23 19 L14 22" {...stroke} /></svg>);
}
export function BikeIcon({ className }: P) {
  return (<svg viewBox="0 0 48 48" className={className} aria-hidden="true"><circle cx="11" cy="31" r="8" {...stroke} /><circle cx="37" cy="31" r="8" {...stroke} /><path d="M11 31 L19 18 L32 18 L37 31 M19 18 L24 31 L32 18 M24 31 L11 31 M17 14 L22 14 M32 18 L30 12 L35 11" {...stroke} /></svg>);
}
export function CameraIcon({ className }: P) {
  return (<svg viewBox="0 0 48 48" className={className} aria-hidden="true"><rect x="6" y="14" width="36" height="24" rx="4" {...stroke} /><path d="M16 14 L19 9 L29 9 L32 14" {...stroke} /><circle cx="24" cy="26" r="7" {...stroke} /></svg>);
}
export function TravelIcon({ className }: P) {
  return (<svg viewBox="0 0 48 48" className={className} aria-hidden="true"><circle cx="24" cy="24" r="17" {...stroke} /><path d="M7 24 L41 24 M24 7 Q14 24 24 41 Q34 24 24 7" {...stroke} /></svg>);
}
export function SignatureLine({ className }: P) {
  // decorative squiggle used under section titles
  return (<svg viewBox="0 0 120 12" className={className} aria-hidden="true"><path d="M2 8 Q 15 0 30 6 T 60 6 T 90 6 T 118 4" {...stroke} /></svg>);
}

// Running scene: two runners side by side on a path, with a finish flag and a sun.
export function RunnerScene({ className }: P) {
  return (
    <svg viewBox="0 0 400 220" className={className} aria-hidden="true">
      <circle cx="320" cy="60" r="34" fill="var(--accent)" opacity="0.18" />
      <path d="M0 190 Q100 170 200 185 T400 178" {...stroke} opacity="0.5" />
      <path d="M20 205 L60 205 M110 208 L170 208 M240 204 L300 204" {...stroke} opacity="0.3" strokeDasharray="2 6" />
      {/* runner 1 */}
      <g transform="translate(110 70)"><g className="float-slow">
        <circle cx="24" cy="0" r="10" {...stroke} />
        <path d="M22 11 L13 46 M17 24 L38 33 M17 24 L0 33 M13 46 L32 60 L27 84 M13 46 L-4 66 L-18 63" {...stroke} />
      </g></g>
      {/* runner 2 */}
      <g transform="translate(180 76)"><g className="float">
        <circle cx="24" cy="0" r="9" {...stroke} />
        <path d="M22 10 L14 42 M18 22 L36 14 M18 22 L4 32 M14 42 L30 56 L22 78 M14 42 L2 62 L-10 60" {...stroke} />
        <path d="M28 -6 Q36 -4 38 4" stroke="var(--accent)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g></g>
      {/* finish flag */}
      <g transform="translate(320 110)">
        <path d="M0 0 L0 76" {...stroke} />
        <path d="M0 2 L34 8 L0 22" fill="var(--accent)" opacity="0.5" />
        <path d="M0 2 L34 8 L0 22" {...stroke} />
      </g>
      {/* motion lines */}
      <path d="M60 110 L90 110 M70 125 L95 125 M55 140 L85 140" {...stroke} opacity="0.4" />
    </svg>
  );
}
