// FpvQuad.tsx: a small line-art FPV quadcopter drawing in the same style as the other icons.
// The four propellers spin gently (the CSS turns that off if the visitor prefers reduced motion).
type P = { className?: string };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export default function FpvQuad({ className }: P) {
  const motors = [[14, 14], [50, 14], [14, 50], [50, 50]] as const;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden {...stroke}>
      {/* X-shaped frame arms */}
      <path d="M18 18 L46 46 M46 18 L18 46" />
      {/* body with the camera poking out the front */}
      <rect x="25" y="25" width="14" height="14" rx="3" />
      <circle cx="32" cy="29" r="2.2" />
      <path d="M29 36 h6" />
      {/* motors + spinning prop blades */}
      {motors.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2" />
          <g className="prop-spin" style={{ animationDelay: `${i * -0.2}s` }}>
            <ellipse cx={x} cy={y} rx="10" ry="1.6" strokeWidth="1.1" opacity="0.7" />
          </g>
        </g>
      ))}
      {/* the little antenna at the back */}
      <path d="M32 39 v6 l-2 3" strokeWidth="1.2" />
    </svg>
  );
}
