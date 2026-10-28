// Running.tsx: homepage section about your running, plus your events list.
import Reveal from "@/components/Reveal";
import EventsList from "@/components/EventsList";
import { SignatureLine } from "@/components/Illustrations";
import RunnerArt from "@/components/motion/RunnerArt";
import WordReveal from "@/components/motion/WordReveal";
import { events } from "@/data/events";

export default function Running() {
  return (
    <section id="running" className="relative scroll-mt-20 overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-28 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Running</p>
          <WordReveal text="Miles, together" className="mt-3 font-serif text-4xl" />
          <SignatureLine className="mt-3 w-28 text-accent" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>[Placeholder] How you got into running — your first race, your marathons and what keeps you going.</p>
            <p>[Placeholder] Why you organise runs: to bring people together, all paces welcome.</p>
          </div>
          {/* the runners jog toward the flag as you scroll */}
          <RunnerArt className="mt-10 w-full max-w-md text-foreground/75" />
        </Reveal>
        <Reveal delay={150}>
          <EventsList events={events} />
        </Reveal>
      </div>
    </section>
  );
}
