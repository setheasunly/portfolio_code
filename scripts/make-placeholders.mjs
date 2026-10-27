// make-placeholders.mjs: creates soft neutral EXAMPLE photos for the two example albums.
// Run with: node scripts/make-placeholders.mjs   (you only need this for the examples)
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const sizes = [[1600, 1067], [1067, 1600], [1600, 1200], [1200, 1600], [1600, 900], [1400, 1400], [1067, 1600], [1600, 1067]];

async function makeAlbum(dir, label, palette, count) {
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < count; i++) {
    const [w, h] = sizes[i % sizes.length];
    const [a, b] = palette[i % palette.length];
    // A simple "landscape": gradient sky, a sun, two hills — plus an EXAMPLE label.
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <circle cx="${w * (0.25 + 0.5 * ((i * 37) % 10) / 10)}" cy="${h * 0.32}" r="${Math.min(w, h) * 0.09}" fill="#fff" opacity="0.55"/>
      <path d="M0 ${h * 0.72} Q ${w * 0.3} ${h * 0.55} ${w * 0.6} ${h * 0.7} T ${w} ${h * 0.66} V ${h} H 0 Z" fill="#000" opacity="0.12"/>
      <path d="M0 ${h * 0.84} Q ${w * 0.4} ${h * 0.74} ${w} ${h * 0.86} V ${h} H 0 Z" fill="#000" opacity="0.18"/>
      <text x="50%" y="${h * 0.93}" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(Math.min(w, h) * 0.035)}" letter-spacing="6" fill="#fff" opacity="0.8">EXAMPLE · ${label} ${String(i + 1).padStart(2, "0")}</text>
    </svg>`;
    await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(path.join(dir, `${String(i + 1).padStart(2, "0")}.jpg`));
  }
}

await makeAlbum("public/albums/digital/example-city-walks", "DIGITAL", [["#d9d6cf", "#9a958b"], ["#cfd4d6", "#8c9497"], ["#e3ddd2", "#a89c8a"]], 8);
await makeAlbum("public/albums/film/example-coastal-film", "FILM", [["#e8d6bf", "#b08a66"], ["#e2cfb8", "#8f7a62"], ["#efe3cf", "#c0a180"]], 6);
console.log("Placeholder photos created.");
