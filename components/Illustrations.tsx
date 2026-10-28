// Illustrations.tsx: hand-drawn style line-art SVGs used across the site.
// SVGs are drawings made of code (lines, circles, paths), so they stay sharp at any size.
// "currentColor" means the drawing uses the text colour of its parent.

type P = { className?: string };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// (The big hero and running drawings now live in components/motion/HeroArt.tsx and RunnerArt.tsx,
// because they animate.)

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
