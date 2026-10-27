// app/photography/[slug]/page.tsx: one album page, e.g. /photography/example-city-walks.
// [slug] in the folder name means "this part of the URL can be any album name".
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import PhotoBrand from "@/components/PhotoBrand";
import { getAlbum, getAlbums } from "@/lib/albums";
import { formatMonth } from "@/lib/photo-types";

// Tells Next.js which album pages to build ahead of time (one per folder).
export async function generateStaticParams() {
  return (await getAlbums()).map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await getAlbum((await params).slug);
  return { title: album ? `${album.title} — Photography` : "Album not found" };
}

// The page frame shows instantly; the album itself streams in inside <Suspense>.
export default function AlbumPage({ params }: Props) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Link href="/photography" className="text-sm text-muted transition hover:text-accent">← All albums</Link>
          <PhotoBrand />
        </div>
        <Suspense fallback={<p className="mt-8 text-muted">Loading album…</p>}>
          <AlbumContent params={params} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

// Looks up the album from the URL and shows its details + gallery.
async function AlbumContent({ params }: Props) {
  const album = await getAlbum((await params).slug);
  if (!album) notFound();
  const isFilm = album.type === "film";

  return (
    <>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{isFilm ? "Film" : "Digital"} · {formatMonth(album.date)}</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{album.title}</h1>
          {album.description && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{album.description}</p>}
        </div>
        <dl className="space-y-3 self-end text-sm md:text-right">
          {album.camera && (<div><dt className="text-muted">Camera</dt><dd>{album.camera}</dd></div>)}
          {album.film && (<div><dt className="text-muted">Film</dt><dd>{album.film}</dd></div>)}
          <div><dt className="text-muted">Photos</dt><dd>{album.photos.length}</dd></div>
        </dl>
      </div>
      <div className="mt-14">
        <Gallery photos={album.photos} film={isFilm} />
      </div>
    </>
  );
}
