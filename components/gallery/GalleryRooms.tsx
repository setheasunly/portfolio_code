"use client";
// GalleryRooms.tsx: the gallery itself. Albums hang in two "rooms" — Room I (Digital) and
// Room II (Film). The switcher at the top works like the old tabs: All rooms / Digital / Film.
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import GalleryFrame from "@/components/gallery/GalleryFrame";
import type { AlbumSummary, AlbumType } from "@/lib/photo-types";

const ROOMS: { id: AlbumType; numeral: string; name: string; note: string }[] = [
  { id: "digital", numeral: "Room I", name: "Digital", note: "Colour, light and the everyday — shot on digital." },
  { id: "film", numeral: "Room II", name: "Film", note: "Grain, warmth and patience — shot on 35mm film." },
];
const tabs = [{ id: "all", label: "All rooms" }, ...ROOMS.map((r) => ({ id: r.id, label: `${r.numeral} · ${r.name}` }))] as const;

export default function GalleryRooms({ albums }: { albums: AlbumSummary[] }) {
  const [tab, setTab] = useState<"all" | AlbumType>("all");
  const rooms = ROOMS.filter((r) => tab === "all" || r.id === tab);

  return (
    <>
      {/* Room switcher (styled like gallery signage) */}
      <div className="flex justify-center">
      <div role="tablist" aria-label="Choose a room" className="relative inline-flex flex-wrap gap-1 glass-chip rounded-full p-1">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`relative rounded-full px-4 py-2 text-sm transition-colors sm:px-5 ${tab === t.id ? "text-background" : "text-muted hover:text-foreground"}`}>
            {tab === t.id && <motion.span layoutId="room-pill" className="absolute inset-0 rounded-full bg-foreground" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className={`mt-14 grid gap-x-10 gap-y-20 ${tab === "all" ? "lg:grid-cols-2" : ""}`}>
          {rooms.map((room) => {
            const list = albums.filter((a) => a.type === room.id);
            return (
              <section key={room.id} aria-label={`${room.numeral}: ${room.name}`} className="flex flex-col">
                {/* room sign */}
                <div className="flex flex-wrap items-end justify-between gap-4 px-1">
                  <div>
                    <p className="eyebrow !text-accent">{room.numeral}</p>
                    <h2 className="mt-2 font-serif text-4xl">{room.name}</h2>
                  </div>
                  <p className="max-w-xs text-sm text-muted">{room.note} <span className="whitespace-nowrap">({list.length} {list.length === 1 ? "album" : "albums"})</span></p>
                </div>
                {/* the wall: soft plaster colour, a lighting track along the top, floor at the bottom */}
                <div className="gallery-wall relative mt-6 flex-1 overflow-hidden rounded-[28px] border border-line">
                  <div aria-hidden className="absolute inset-x-10 top-5 h-px bg-foreground/25" />
                  <div className="relative flex flex-wrap justify-center gap-x-16 gap-y-10 px-6 pb-20 pt-2 sm:px-12">
                    {list.map((a, i) => <GalleryFrame key={a.slug} album={a} index={i} />)}
                    {list.length === 0 && <p className="py-24 text-muted">This room is being hung — new albums soon.</p>}
                  </div>
                  {/* skirting board + wooden floor in perspective */}
                  <div aria-hidden className="gallery-floor absolute inset-x-0 bottom-0 h-14" />
                </div>
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
