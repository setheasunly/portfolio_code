"use client";
// AlbumGrid.tsx: the Digital / Film / All tabs on the Photography page.
// "use client" because clicking a tab changes what's shown without reloading.
import { useState } from "react";
import AlbumCard from "@/components/AlbumCard";
import type { AlbumSummary } from "@/lib/photo-types";

const tabs = [
  { id: "all", label: "All" },
  { id: "digital", label: "Digital" },
  { id: "film", label: "Film" },
] as const;

export default function AlbumGrid({ albums }: { albums: AlbumSummary[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const shown = tab === "all" ? albums : albums.filter((a) => a.type === tab);

  return (
    <>
      <div role="tablist" className="inline-flex rounded-full border border-line bg-white/50 p-1">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2 text-sm transition ${tab === t.id ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => <AlbumCard key={a.slug} album={a} />)}
      </div>
      {shown.length === 0 && <p className="mt-12 text-muted">No albums here yet.</p>}
    </>
  );
}
