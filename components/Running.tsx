// Running.tsx: homepage section about your running, plus your events list.
import Reveal from "@/components/Reveal";
import EventsList from "@/components/EventsList";
import { RunnerScene, SignatureLine } from "@/components/Illustrations";
import { events } from "@/data/events";

export default function Running() {
  return (
    <section id="running" className="relative scroll-mt-20 overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-28 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Running</p>
          <h2 className="mt-3 font-serif text-4xl">Miles, together</h2>
          <SignatureLine className="mt-3 w-28 text-accent" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>[Placeholder] How you got into running — your first race, your marathons and what keeps you going.</p>
            <p>[Placeholder] Why you organise runs: to bring people together, all paces welcome.</p>
          </div>
          <RunnerScene className="mt-10 w-full max-w-md text-foreground/75" />
        </Reveal>
        <Reveal delay={150}>
          <EventsList events={events} />
        </Reveal>
      </div>
    </section>
  );
}
