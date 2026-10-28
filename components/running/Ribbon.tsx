// Ribbon.tsx: draws the folded-paper elevation ribbon (like a museum wall installation).
// Each straight piece of the line gets a "face" below it: falling pieces are dark, rising pieces
// catch the light — that's what makes it look like a folded strip of paper with depth.
import { RIBBON, type Pt } from "@/components/running/geometry";

// colour of a face depending on its slope (positive = going down the screen)
function faceColour(a: Pt, b: Pt) {
  const slope = (b.y - a.y) / (b.x - a.x || 1);
  if (slope > 0.05) return "#2b2927";     // falling: in shadow
  if (slope < -0.05) return "#e4e0d9";    // rising: lit
  return "#6f6b66";                       // flat: in between
}

export default function Ribbon({ pts, depth = RIBBON }: { pts: Pt[]; depth?: number }) {
  const faces = pts.slice(1).map((b, i) => {
    const a = pts[i];
    return { d: `M${a.x} ${a.y} L${b.x} ${b.y} L${b.x} ${b.y + depth} L${a.x} ${a.y + depth} Z`, fill: faceColour(a, b) };
  });
  const top = "M" + pts.map((p) => `${p.x} ${p.y}`).join(" L");
  const bottom = "M" + pts.map((p) => `${p.x} ${p.y + depth}`).join(" L");
  return (
    <g>
      {/* soft shadow on the "wall" behind the ribbon */}
      <path d={"M" + pts.map((p) => `${p.x + 14} ${p.y + depth + 30}`).join(" L")} fill="none" stroke="#1c1c1c" strokeWidth={16} opacity={0.07} filter="url(#rb-blur)" />
      {faces.map((f, i) => <path key={i} d={f.d} fill={f.fill} stroke={f.fill} strokeWidth={0.6} />)}
      <path d={bottom} fill="none" stroke="#1c1c1c" strokeWidth={1} opacity={0.5} />
      <path d={top} fill="none" stroke="#1c1c1c" strokeWidth={2.2} strokeLinejoin="miter" />
    </g>
  );
}

// shared <defs> for the blur used by the shadow
export function RibbonDefs() {
  return (
    <filter id="rb-blur" x="-5%" y="-50%" width="110%" height="200%">
      <feGaussianBlur stdDeviation="10" />
    </filter>
  );
}
