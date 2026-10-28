// app/photography/page.tsx: the /photography page — an illustrated art gallery.
// Albums hang as framed artworks in two rooms (Digital and Film).
// Visitors usually arrive here through the camera-lens transition (see components/lens/).
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryRooms from "@/components/gallery/GalleryRooms";
import GalleryRoomScene from "@/components/gallery/GalleryRoomScene";
import GalleryEntrance from "@/components/gallery/GalleryEntrance";
import { getAlbums, toSummary } from "@/lib/albums";
import PhotoBrand from "@/components/PhotoBrand";
import WordReveal from "@/components/motion/WordReveal";
import { SITE_NAME } from "@/data/site";
import { SignatureLine } from "@/components/Illustrations";

export const metadata: Metadata = { title: `Photography — ${SITE_NAME}` };

export default async function PhotographyPage() {
  const albums = (await getAlbums()).map(toSummary); // read from public/albums at build time
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        <GalleryEntrance>
          {/* The entrance hall: a drawing of the gallery room with the title on the back wall */}
          <section className="relative">
            <GalleryRoomScene className="h-[340px] w-full sm:h-[440px] lg:h-[520px]" />
            {/* soft fade from the drawing into the page */}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
          </section>

          <div className="relative mx-auto max-w-6xl px-6 pb-28">
            <div className="-mt-6 flex flex-col items-center text-center">
              <WordReveal as="h1" text="Through my lens" accentLast className="font-serif text-5xl sm:text-6xl" />
              <SignatureLine className="mt-3 w-28 text-accent" />
              <PhotoBrand className="mt-4" />
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
                [Placeholder] Welcome in. Each frame is an album — wander the rooms, then step into any picture.
              </p>
            </div>
            <div className="mt-12">
              <GalleryRooms albums={albums} />
            </div>
          </div>
        </GalleryEntrance>
      </main>
      <Footer />
    </>
  );
}
