// Journal.tsx: short run diary posts (from data/runs.ts → journal).
import { journal } from "@/data/runs";

const fmtDate = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return `${day} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][m - 1]} ${y}`;
};

export default function Journal() {
  const posts = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((p) => (
        <article key={p.date + p.title} className="group relative overflow-hidden rounded-2xl border border-line bg-white/60 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.3)]">
          {/* a little elevation squiggle in the corner */}
          <svg aria-hidden viewBox="0 0 120 40" className="absolute right-5 top-5 w-24 text-foreground/25 transition group-hover:text-accent">
            <path d="M0 34 L22 30 L34 14 L48 24 L66 6 L80 20 L98 12 L120 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{fmtDate(p.date)} · {p.distanceKm} km</p>
          <h3 className="mt-3 max-w-[80%] font-serif text-2xl leading-snug">{p.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{p.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {p.tags.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">#{t}</span>)}
            <span className="ml-auto text-sm text-accent">Read post (coming soon) →</span>
          </div>
        </article>
      ))}
    </div>
  );
}
