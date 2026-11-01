// JourneyTeaser.tsx: a small preview of the running journey for the homepage.
// It draws the same folded ribbon as /running (from data/runs.ts) and links there.
import Ribbon, { RibbonDefs } from "@/components/running/Ribbon";
import { buildJourney, H } from "@/components/running/geometry";
import RunLink from "@/components/running/RunLink";
import { journey } from "@/data/runs";

export default function JourneyTeaser() {
  const j = buildJourney(journey, 300);
  const km = journey.reduce((s, r) => s + r.distanceKm, 0);
  const climb = journey.reduce((s, r) => s + r.elevationM, 0);
  const first = j.nodes[0]?.run;
  return (
    <RunLink href="/running" className="group block glass rounded-3xl p-7 transition duration-300 hover:-translate-y-1">
      <p className="eyebrow">My running journey</p>
      <p className="mt-2 font-serif text-2xl leading-snug">Every race I&apos;ve run, joined as one line.</p>

      {/* mini elevation ribbon: the big numbers are race distances */}
      <svg viewBox={`0 140 ${j.width} ${H - 80}`} className="mt-6 h-auto w-full overflow-visible" aria-hidden>
        <RibbonDefs />
        <Ribbon pts={j.pts} />
        {j.nodes.map((n, i) => (
          <g key={n.run.date + n.run.name}>
            <circle cx={n.x} cy={n.y} r={9} fill={i === 0 ? "var(--accent)" : "var(--ink)"} />
            <text x={n.x} y={n.y - 34} textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontWeight={600} fontSize={52}
              fill={i === 0 ? "var(--accent)" : "var(--ink)"}>{n.run.distanceKm}</text>
            <text x={n.x} y={H - 10} textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize={30} fill="var(--muted)">{n.run.date.slice(0, 4)}</text>
          </g>
        ))}
      </svg>

      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5 text-sm">
        <div><dt className="text-muted">Races</dt><dd className="mt-1 font-serif text-2xl">{journey.length}</dd></div>
        <div><dt className="text-muted">Distance</dt><dd className="mt-1 font-serif text-2xl">{km.toLocaleString("en-AU", { maximumFractionDigits: 1 })} km</dd></div>
        <div><dt className="text-muted">Climbed</dt><dd className="mt-1 font-serif text-2xl">{climb.toLocaleString("en-AU")} m</dd></div>
      </dl>
      {first && <p className="mt-4 text-sm text-muted">Starting point: {first.name} ({first.date.slice(0, 4)}). Some later races are EXAMPLES.</p>}
      <p className="mt-6 inline-flex items-center gap-2 text-sm text-foreground">
        Run the whole journey <span className="text-accent transition group-hover:translate-x-1">→</span>
      </p>
    </RunLink>
  );
}
