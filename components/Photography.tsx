// Photography.tsx: homepage teaser — a few featured photos and a link to all albums.
import Link from "next/link";
import LensLink from "@/components/lens/LensLink";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import WordReveal from "@/components/motion/WordReveal";
import Parallax from "@/components/motion/Parallax";
import Magnetic from "@/components/motion/Magnetic";
import { getAlbums } from "@/lib/albums";
import { CameraIcon, SignatureLine } from "@/components/Illustrations";

export default async function Photography() {
  const albums = await getAlbums();
  // Featured: the cover of each album plus a couple more photos, up to 4 in total.
  const featured = albums
    .flatMap((a) => [a.cover, ...a.photos.filter((p) => p !== a.cover).slice(0, 1)].map((p) => ({ ...p, album: a })))
    .slice(0, 4);

  return (
    <section id="photography" className="relative scroll-mt-20 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-start gap-5">
            <CameraIcon className="hidden h-14 w-14 text-accent sm:block" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Photography</p>
              <WordReveal text="Through my lens" className="mt-3 font-serif text-4xl" />
              <SignatureLine className="mt-3 w-28 text-accent" />
            </div>
          </div>
          <p className="max-w-sm text-muted">[Placeholder] My main hobby — I shoot both digital and film, and add new albums regularly.</p>
        </Reveal>

        {/* Featured photos: a simple 2×2 on phones, 4 across on desktop.
            Parallax: each photo scales in, then drifts at its own speed as you scroll. */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Parallax key={p.src} delay={i * 0.1} speed={[30, 60, 20, 50][i % 4]} className={i % 2 === 1 ? "lg:mt-10" : ""}>
              <Link href={`/photography/${p.album.slug}`} className={`group relative block overflow-hidden rounded-xl ${p.album.type === "film" ? "film-frame" : ""}`}>
                <span className="relative block aspect-[3/4] overflow-hidden rounded-lg">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  {p.album.type === "film" && <span aria-hidden className="film-grain absolute inset-0" />}
                </span>
              </Link>
            </Parallax>
          ))}
        </div>

        <Reveal className="mt-12">
          <Magnetic>
            <LensLink href="/photography" className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm transition-colors hover:border-foreground">
              View all albums <span className="transition group-hover:translate-x-1">→</span>
            </LensLink>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
