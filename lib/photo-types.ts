// lib/photo-types.ts: the "shape" of album data, plus a date helper.
// Kept separate from albums.ts so browser-side components can use it
// (albums.ts reads files from disk, which only works on the server).

export type AlbumType = "digital" | "film";

export type Photo = { src: string; width: number; height: number; alt: string };

export type Album = {
  slug: string;         // folder name, used in the URL: /photography/<slug>
  type: AlbumType;      // "digital" or "film" (which folder it lives in)
  title: string;
  date: string;         // "YYYY-MM-DD"
  description?: string;
  camera?: string;
  film?: string;        // film stock, e.g. "Kodak Portra 400"
  cover: Photo;
  photos: Photo[];
};

// Album data without the full photo list (keeps pages light).
export type AlbumSummary = Omit<Album, "photos"> & { count: number };

// Turns "2026-09-12" into "September 2026"
export function formatMonth(date: string) {
  if (!date) return "";
  const [y, m] = date.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[(m || 1) - 1]} ${y}`;
}
