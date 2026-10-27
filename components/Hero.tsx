// Hero.tsx: the big first section — your name, intro, and an illustrated scene.
import { HeroScene } from "@/components/Illustrations";

export default function Hero() {
  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden">
      {/* Soft blurred colour "blobs" in the background for a dreamy, cinematic feel */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 rounded-full bg-stone-300/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[85vh] max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="fade-in text-xs uppercase tracking-[0.3em] text-muted">Hello, I&apos;m</p>
          <h1 className="fade-in mt-4 font-serif text-6xl leading-[1.05] tracking-tight sm:text-7xl">
            Sethea <em className="text-accent">Sunly</em> {/* your name; the surname is in the accent colour */}
          </h1>
          <p className="fade-in-delay mt-6 max-w-md text-lg leading-relaxed text-muted">
            [Placeholder] ICT student, developer and runner — building things with code,
            and chasing finish lines on foot and on two wheels.
          </p>
          <div className="fade-in-delay mt-10 flex flex-wrap gap-4">
            <a href="#about" className="rounded-full bg-foreground px-6 py-3 text-sm text-background transition hover:-translate-y-0.5 hover:shadow-lg">
              About me
            </a>
            <a href="#contact" className="rounded-full border border-foreground/20 px-6 py-3 text-sm transition hover:-translate-y-0.5 hover:border-foreground">
              Get in touch
            </a>
          </div>
        </div>
        {/* The illustration; text-foreground/80 sets the line colour */}
        <HeroScene className="fade-in-delay w-full max-w-lg justify-self-center text-foreground/80" />
      </div>
    </section>
  );
}
