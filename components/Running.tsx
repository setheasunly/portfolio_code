// Running.tsx: homepage section about your running, with a preview of the journey page.
import Reveal from "@/components/Reveal";
import JourneyTeaser from "@/components/running/JourneyTeaser";
import { SignatureLine } from "@/components/Illustrations";
import RunnerArt from "@/components/motion/RunnerArt";
import WordReveal from "@/components/motion/WordReveal";
import RunLink from "@/components/running/RunLink";
import Magnetic from "@/components/motion/Magnetic";

export default function Running() {
  return (
    <section id="running" className="relative scroll-mt-20 overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-28 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Running</p>
          <WordReveal text="Miles, one line" className="mt-3 font-serif text-4xl" />
          <SignatureLine className="mt-3 w-28 text-accent" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>[Placeholder] How you got into running — your first race, your marathons and what keeps you going.</p>
            <p>[Placeholder] What the long runs give you — the views, the people you meet on the trail and the feeling at the finish.</p>
          </div>
          <div className="mt-8"><Magnetic>
            <RunLink href="/running" className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm transition-colors hover:border-foreground">
              Follow my running journey <span className="transition group-hover:translate-x-1">→</span>
            </RunLink>
          </Magnetic></div>
          {/* the runners jog toward the flag as you scroll */}
          <RunnerArt className="mt-10 w-full max-w-md text-foreground/75" />
        </Reveal>
        <Reveal delay={150}>
          <JourneyTeaser />
        </Reveal>
      </div>
    </section>
  );
}
