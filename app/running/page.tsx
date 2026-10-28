// app/running/page.tsx: the /running page (DRAFT).
//  1. Intro
//  2. The journey: every race as one continuous elevation ribbon (scroll to run it)
//  3. Fundraising, upcoming runs, run journal and the community photo wall
// All the content comes from data/runs.ts and data/events.ts.
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordReveal from "@/components/motion/WordReveal";
import Reveal from "@/components/Reveal";
import EventsList from "@/components/EventsList";
import { SignatureLine } from "@/components/Illustrations";
import JourneyHorizontal from "@/components/running/JourneyHorizontal";
import JourneyVertical from "@/components/running/JourneyVertical";
import RunEntrance from "@/components/running/RunEntrance";
import Fundraising from "@/components/running/Fundraising";
import Journal from "@/components/running/Journal";
import CommunityWall from "@/components/running/CommunityWall";
import { journey } from "@/data/runs";
import { events } from "@/data/events";
import { SITE_NAME } from "@/data/site";

export const metadata: Metadata = { title: `Running — ${SITE_NAME}` };

// a small reusable heading for the lower sections
function SectionHead({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">{label}</p>
      <WordReveal as="h2" text={title} className="mt-3 font-serif text-4xl sm:text-5xl" />
      {children && <p className="mt-4 max-w-xl leading-relaxed text-muted">{children}</p>}
    </div>
  );
}

export default function RunningPage() {
  return (
    <>
      <Header />
      {/* overflow-x-clip (not overflow-hidden) so the sticky journey still sticks */}
      <main className="relative overflow-x-clip">
        <RunEntrance>
          {/* 1. Intro */}
          <section className="relative mx-auto max-w-6xl px-6 pb-10 pt-36">
            <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Running · Draft</p>
            <WordReveal as="h1" text="One line, every finish" accentLast className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-7xl" />
            <SignatureLine className="mt-4 w-28 text-accent" />
            <div className="mt-8 grid gap-8 sm:grid-cols-[1.4fr_1fr]">
              <p className="max-w-xl text-lg leading-relaxed text-muted">
                It started with a trail marathon in New Zealand in 2024. Every race since joins on to the same line —
                so my running is one long path, climbing and falling with each event.
              </p>
              {/* how to read the line */}
              <div className="flex items-start gap-4 text-sm text-muted">
                <svg viewBox="0 0 80 40" className="w-20 shrink-0" aria-hidden>
                  <path d="M0 30 L20 30 L36 12 L50 22 L66 6 L80 14" fill="none" stroke="#1c1c1c" strokeWidth="2" />
                  <path d="M0 30 L20 30 L20 36 L0 36Z M36 12 L50 22 L50 28 L36 18Z" fill="#2b2927" />
                  <circle cx="66" cy="6" r="3" fill="var(--accent)" />
                </svg>
                <p><span className="text-foreground">Height</span> = metres climbed.<br /><span className="text-foreground">Big number</span> = race distance.<br />Scroll to run it ↓</p>
              </div>
            </div>
          </section>

          {/* 2. The journey (horizontal on desktop, vertical on phones) */}
          <JourneyHorizontal runs={journey} />
          <JourneyVertical runs={journey} />

          {/* 3. Lower sections */}
          <div className="mx-auto max-w-6xl space-y-32 px-6 py-32">
            <Reveal><Fundraising /></Reveal>

            <section id="upcoming" className="scroll-mt-24">
              <SectionHead label="Run with me" title="Upcoming runs">All paces welcome — come along to one of these.</SectionHead>
              <EventsList events={events} />
            </section>

            <section>
              <SectionHead label="Run journal" title="Notes from the road">Short posts after big (and small) runs.</SectionHead>
              <Journal />
            </section>

            <section>
              <SectionHead label="Team & community" title="The people who run with me" />
              <CommunityWall />
            </section>
          </div>
        </RunEntrance>
      </main>
      <Footer />
    </>
  );
}
