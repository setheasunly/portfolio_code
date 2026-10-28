// app/photography/page.tsx: the /photography page — all albums with Digital/Film tabs.
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AlbumGrid from "@/components/AlbumGrid";
import { getAlbums, toSummary } from "@/lib/albums";
import PhotoBrand from "@/components/PhotoBrand";
import WordReveal from "@/components/motion/WordReveal";
import { SITE_NAME } from "@/data/site";
import { CameraIcon, SignatureLine } from "@/components/Illustrations";

export const metadata: Metadata = { title: `Photography — ${SITE_NAME}` };

export default async function PhotographyPage() {
  const albums = (await getAlbums()).map(toSummary); // read from public/albums at build time
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Photography</p>
              <WordReveal as="h1" text="Albums" className="mt-3 font-serif text-5xl sm:text-6xl" />
              <SignatureLine className="mt-3 w-28 text-accent" />
              <PhotoBrand className="mt-4" />
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                [Placeholder] Moments I&apos;ve collected on digital and film — streets, coastlines, races and travels.
              </p>
            </div>
            <CameraIcon className="hidden h-28 w-28 shrink-0 text-foreground/70 sm:block" />
          </div>
          <div className="mt-14">
            <AlbumGrid albums={albums} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
