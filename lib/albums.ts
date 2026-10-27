// lib/albums.ts: finds your photo albums by reading folders in public/albums/.
// This runs only when the site is built (on the server), never in the visitor's browser.
// Folder layout:  public/albums/<digital|film>/<album-slug>/  -> photos + album.json
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

import type { Album, AlbumSummary, AlbumType, Photo } from "@/lib/photo-types";

const ROOT = path.join(process.cwd(), "public", "albums");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

function readAlbum(type: AlbumType, slug: string): Album | null {
  const dir = path.join(ROOT, type, slug);
  const jsonPath = path.join(dir, "album.json");
  if (!fs.existsSync(jsonPath)) return null; // a folder without album.json is ignored

  const info = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  // Every image in the folder becomes a photo, sorted by file name (01.jpg, 02.jpg, ...)
  const files = fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f)).sort();
  const photos: Photo[] = files.map((file, i) => {
    const { width = 1200, height = 800 } = imageSize(fs.readFileSync(path.join(dir, file)));
    return { src: `/albums/${type}/${slug}/${file}`, width, height, alt: `${info.title} — photo ${i + 1}` };
  });
  if (photos.length === 0) return null;

  const cover = photos.find((p) => p.src.endsWith(`/${info.cover}`)) ?? photos[0];
  return { slug, type, title: info.title ?? slug, date: info.date ?? "", description: info.description, camera: info.camera, film: info.film, cover, photos };
}

// All albums, newest first.
// "use cache" tells Next.js to read the folders once while building and reuse the result.
export async function getAlbums(): Promise<Album[]> {
  "use cache";
  const albums: Album[] = [];
  for (const type of ["digital", "film"] as AlbumType[]) {
    const typeDir = path.join(ROOT, type);
    if (!fs.existsSync(typeDir)) continue;
    for (const slug of fs.readdirSync(typeDir)) {
      const album = readAlbum(type, slug);
      if (album) albums.push(album);
    }
  }
  return albums.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getAlbum(slug: string): Promise<Album | undefined> {
  return (await getAlbums()).find((a) => a.slug === slug);
}

// Strip the photo list off an album (keeps the Photography page light).
export function toSummary(album: Album): AlbumSummary {
  const { photos, ...rest } = album;
  return { ...rest, count: photos.length };
}
