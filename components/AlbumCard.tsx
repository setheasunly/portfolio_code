// AlbumCard.tsx: one album preview — cover photo, title, date and camera/film.
import Link from "next/link";
import Image from "next/image";
import { formatMonth, type AlbumSummary } from "@/lib/photo-types";

export default function AlbumCard({ album }: { album: AlbumSummary }) {
  const isFilm = album.type === "film";
  return (
    <Link href={`/photography/${album.slug}`} className="group block">
      {/* Film covers get a white "print" border and grain, like a real photo print */}
      <div className={`relative overflow-hidden rounded-xl ${isFilm ? "film-frame" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src={album.cover.src} alt={album.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
          {isFilm && <div aria-hidden className="film-grain absolute inset-0" />}
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-[11px] uppercase tracking-[0.2em] backdrop-blur">
          {isFilm ? "Film" : "Digital"}
        </span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl transition group-hover:text-accent">{album.title}</h3>
        <span className="shrink-0 text-xs text-muted">{album.count} photos</span>
      </div>
      <p className="mt-1 text-sm text-muted">
        {formatMonth(album.date)}
        {album.film ? ` · ${album.film}` : album.camera ? ` · ${album.camera}` : ""}
      </p>
    </Link>
  );
}
