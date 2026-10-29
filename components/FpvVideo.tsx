// FpvVideo.tsx: homepage section for FPV drone flying — a heading, a short blurb and the video.
// The video details (which YouTube video, title, blurb, tags) come from data/videos.ts.
// The clickable player itself lives in components/fpv/FpvPlayer.tsx.
import Reveal from "@/components/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import { SignatureLine } from "@/components/Illustrations";
import FpvQuad from "@/components/fpv/FpvQuad";
import FpvPlayer from "@/components/fpv/FpvPlayer";
import { featuredFpvVideo as video } from "@/data/videos";

export default function FpvVideo() {
  return (
    <section id="fpv" className="relative scroll-mt-20 overflow-hidden border-t border-line">
      {/* soft accent glow in the background, like the other sections */}
      <div aria-hidden className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-start gap-5">
            <FpvQuad className="hidden h-14 w-14 text-accent sm:block" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">FPV · From the sky</p>
              <WordReveal text="Flying through the goggles" className="mt-3 font-serif text-4xl" />
              <SignatureLine className="mt-3 w-28 text-accent" />
            </div>
          </div>
          <p className="max-w-sm text-muted">{video.blurb}</p>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <FpvPlayer video={video} />
          {/* on phones the title sits here, under the video, so it doesn't cover the play button */}
          <p className="mt-4 font-serif text-lg italic sm:hidden">{video.title}</p>
        </Reveal>

        {video.tags && video.tags.length > 0 && (
          <Reveal className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {video.tags.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">{t}</li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
