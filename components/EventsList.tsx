"use client";
// EventsList.tsx: shows Upcoming events (soonest first) and a small Past list.
// It runs in the browser so "today" is always the visitor's real date,
// even if the site was built weeks ago.
import { useSyncExternalStore } from "react";
import type { RunEvent } from "@/data/events";

// Today's date as "YYYY-MM-DD" in the visitor's local time.
function todayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const subscribe = () => () => {};

function formatDay(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return {
    day: String(d),
    month: dt.toLocaleString("en-AU", { month: "short" }),
    weekday: dt.toLocaleString("en-AU", { weekday: "long" }),
    year: String(y),
  };
}

export default function EventsList({ events }: { events: RunEvent[] }) {
  // On the server (while building) today is unknown, so we treat everything as upcoming
  // for a split second; the browser then fills in the real date.
  const today = useSyncExternalStore(subscribe, todayString, () => "0000-00-00");
  const upcoming = events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = events.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.3em] text-muted">Upcoming events</h3>
      {upcoming.length === 0 && <p className="mt-6 text-muted">No upcoming events right now — check back soon.</p>}
      <ul className="mt-6 space-y-4">
        {upcoming.map((e) => {
          const f = formatDay(e.date);
          return (
            <li key={e.date + e.title} className="group flex gap-5 rounded-2xl border border-line bg-white/50 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.15)] sm:p-6">
              {/* Calendar-style date badge */}
              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-accent/10 text-center">
                <span className="font-serif text-2xl leading-none">{f.day}</span>
                <span className="mt-1 text-[11px] uppercase tracking-widest text-muted">{f.month}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-serif text-xl">{e.title}</h4>
                <p className="mt-1 text-sm text-muted">{f.weekday}, {f.day} {f.month} {f.year}{e.time ? ` · ${e.time}` : ""} · {e.location}</p>
                <p className="mt-3 text-sm leading-relaxed">{e.description}</p>
                {e.joinUrl && (
                  <a href={e.joinUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm text-background transition hover:-translate-y-0.5 hover:shadow-lg">
                    Join <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {past.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xs uppercase tracking-[0.3em] text-muted">Past events</h3>
          <ul className="mt-4 divide-y divide-line text-sm">
            {past.map((e) => (
              <li key={e.date + e.title} className="flex justify-between gap-4 py-3 text-muted">
                <span>{e.title}</span>
                <span className="shrink-0">{formatDay(e.date).day} {formatDay(e.date).month} {formatDay(e.date).year}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
