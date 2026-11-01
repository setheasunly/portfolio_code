// Hero.tsx: the big first section — your name, intro, and an illustrated scene.
import HeroArt from "@/components/motion/HeroArt";
import WordReveal from "@/components/motion/WordReveal";
import Magnetic from "@/components/motion/Magnetic";

export default function Hero() {
  return (
    <section id="home" className="relative -mt-[76px] scroll-mt-20 overflow-hidden pt-[76px]">
      {/* Soft blurred colour "blobs" in the background for a dreamy, cinematic feel */}
      <div aria-hidden className="light-leak pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 rounded-full bg-[#7d93ad]/[0.07] blur-3xl" />

      <div className="relative mx-auto grid min-h-[85vh] max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="fade-in eyebrow">Hello, I&apos;m</p>
          {/* Your name, revealed word by word; the surname is italic in the accent colour */}
          <WordReveal as="h1" text="Sethea Sunly" accentLast delay={0.15}
            className="mt-4 font-serif text-6xl leading-[1.05] tracking-tight sm:text-7xl" />
          <p className="fade-in-delay mt-6 max-w-md text-lg leading-relaxed text-muted">
            [Placeholder] Photographer, runner and traveller — sharing the photos and
            stories from my hobbies, on foot, on two wheels and behind the lens.
          </p>
          <div className="fade-in-delay mt-10 flex flex-wrap gap-4">
            {/* Magnetic: the buttons lean toward your mouse */}
            <Magnetic>
              <a href="#about" className="btn-liquid inline-block px-6 py-3 text-sm font-medium">
                About me
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="inline-block btn-glass px-6 py-3 text-sm">
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
