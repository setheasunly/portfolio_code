# How to add your runs (`/running`)

Everything on the Running page comes from **one file: `data/runs.ts`**. You never need to touch the components.

## Add a race you've finished

Open `data/runs.ts` and add an entry to the `journey` list (order doesn't matter — the page sorts by date):

```ts
{
  date: "2026-11",                 // "YYYY-MM" — decides where it sits on the line
  name: "Sydney Trail 30K",
  location: "Sydney, Australia",
  distanceKm: 30,                  // the BIG number shown above the peak
  elevationM: 1200,                // metres climbed = how TALL the peak is
  time: "3:41:10",                 // optional finish time
  story: "Two or three sentences about the day.",
  photo: "/running/sydney-30k.jpg", // optional — put the file in public/running/
},
```

- The line joins every race in date order, so the newest race automatically becomes the end of the path.
- The tallest peak is the race with the most climbing; the others are scaled against it.
- The "So far" totals (km, climb, races) are added up for you.
- Delete any entry marked `example: true` once you have your own races (the NZ trail marathon is your real first one — fill in its `[Placeholder]` details and `time`).

## Journal and photo wall

Also in `data/runs.ts`:

- `journal` — short posts (`date`, `title`, `km`, `excerpt`, `tags`).
- `communityWall` — captions for the polaroid photos (add `photo` paths from `public/running/` when you have them).

The homepage Running section shows a small preview of the same line, so it updates automatically too.
