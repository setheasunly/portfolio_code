// RunCard.tsx: the info card for one race (location, distance, climb, time, story, photo).
import type { JourneyRun } from "@/data/runs";

export default function RunCard({ run, compact = false }: { run: JourneyRun; compact?: boolean }) {
  const year = run.date.slice(0, 4);
  return (
    <div className={`flex gap-4 rounded-2xl border border-line bg-[#fffdf8]/95 p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] backdrop-blur ${compact ? "flex-col" : ""}`}>
      {/* photo — a placeholder until you add `photo` in data/runs.ts */}
      <div className={`relative shrink-0 overflow-hidden rounded-lg bg-[repeating-linear-gradient(135deg,#efebe4_0_8px,#e7e2da_8px_16px)] ${compact ? "h-36 w-full" : "h-28 w-28"}`}>
        {run.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={run.photo} alt={run.name} className="h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-muted">Photo</span>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
          {year}{run.example && <span className="ml-2 rounded-sm bg-foreground/80 px-1.5 py-px text-[9px] tracking-[0.15em] text-background">EXAMPLE</span>}
        </p>
        <h3 className="mt-1 font-serif text-lg leading-snug">{run.name.replace(/^EXAMPLE — /, "")}</h3>
        <p className="mt-0.5 text-xs text-muted">{run.location}</p>
        <dl className="mt-3 grid grid-cols-3 gap-3 text-xs">
          <div><dt className="text-muted">Distance</dt><dd className="font-medium">{run.distanceKm} km</dd></div>
          <div><dt className="text-muted">Climb</dt><dd className="font-medium">{run.elevationM.toLocaleString("en-AU")} m</dd></div>
          <div><dt className="text-muted">Time</dt><dd className="font-medium">{run.time ?? "—"}</dd></div>
        </dl>
        <p className="mt-3 text-sm leading-relaxed text-muted">{run.story}</p>
      </div>
    </div>
  );
}
