// Hero.tsx: the big first section — your name, intro, and an illustrated scene.
import HeroArt from "@/components/motion/HeroArt";
import WordReveal from "@/components/motion/WordReveal";
import Magnetic from "@/components/motion/Magnetic";

export default function Hero() {
  return (
    <section id="home" className="relative scroll-mt-20 overflow-hidden">
      {/* Soft blurred colour "blobs" in the background for a dreamy, cinematic feel */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 rounded-full bg-stone-300/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[85vh] max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="fade-in text-xs uppercase tracking-[0.3em] text-muted">Hello, I&apos;m</p>
          {/* Your name, revealed word by word; the surname is italic in the accent colour */}
          <WordReveal as="h1" text="Sethea Sunly" accentLast delay={0.15}
            className="mt-4 font-serif text-6xl leading-[1.05] tracking-tight sm:text-7xl" />
          <p className="fade-in-delay mt-6 max-w-md text-lg leading-relaxed text-muted">
            [Placeholder] ICT student, developer and runner — building things with code,
            and chasing finish lines on foot and on two wheels.
          </p>
          <div className="fade-in-delay mt-10 flex flex-wrap gap-4">
            {/* Magnetic: the buttons lean toward your mouse */}
            <Magnetic>
              <a href="#about" className="inline-block rounded-full bg-foreground px-6 py-3 text-sm text-background transition-shadow hover:shadow-lg">
                About me
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="inline-block rounded-full border border-foreground/20 px-6 py-3 text-sm transition-colors hover:border-foreground">
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>
        {/* The illustration: layers move with scroll and tilt with the mouse. text-foreground/80 = line colour */}
        <HeroArt className="w-full max-w-lg justify-self-center text-foreground/80" />
      </div>
    </section>
  );
}
