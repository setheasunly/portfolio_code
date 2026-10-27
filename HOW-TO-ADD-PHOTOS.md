# How to add a photo album

Your albums are just **folders of photos**. The website finds them automatically —
no code to edit.

## 1. Pick digital or film

Albums live in one of two folders:

```
public/albums/digital/   ← photos from digital cameras / phone
public/albums/film/      ← scans of film photos (get a white print border + grain)
```

## 2. Make a folder for the album

Create a new folder inside `digital` or `film`. The folder name becomes the web address,
so use lowercase letters and dashes, no spaces:

```
public/albums/film/tokyo-2026/
```

→ the album will appear at `yoursite.com/photography/tokyo-2026`

> Folder names must be unique across both `digital` and `film`.

## 3. Copy your photos in

Drop your `.jpg`, `.png`, `.webp` or `.avif` files into the folder.

- Photos are shown **in file-name order**, so naming them `01.jpg`, `02.jpg`, `03.jpg`…
  is the easiest way to control the order.
- Tip: resize big camera files to about **2000–2500 px** on the long side before adding
  them (e.g. export from Lightroom). It keeps the site fast. Next.js also optimises images
  automatically for each screen size.

## 4. Add an `album.json` file

In the same folder create a file called `album.json`:

```json
{
  "title": "Tokyo Nights",
  "date": "2026-10-01",
  "description": "A week of wandering Tokyo after dark.",
  "camera": "Leica M6",
  "film": "Kodak Portra 800",
  "cover": "03.jpg"
}
```

| Field         | Needed? | What it is                                              |
|---------------|---------|---------------------------------------------------------|
| `title`       | yes     | Album name shown on the card and page                   |
| `date`        | yes     | `YYYY-MM-DD` — albums are sorted newest first           |
| `description` | no      | A sentence or two about the album                       |
| `camera`      | no      | Camera used                                             |
| `film`        | no      | Film stock (for film albums)                            |
| `cover`       | no      | File name of the cover photo (defaults to the first one)|

A folder **without** `album.json` is ignored — handy for work-in-progress albums.

## 5. Check it and publish

```bash
npm run dev      # preview at http://localhost:3000/photography
git add .
git commit -m "Add Tokyo album"
git push         # if the site is on Vercel, it updates automatically
```

## Removing the examples

Delete `public/albums/digital/example-city-walks` and `public/albums/film/example-coastal-film`
once you have your own albums. (`scripts/make-placeholders.mjs` only exists to create those
examples — you can delete it too.)
