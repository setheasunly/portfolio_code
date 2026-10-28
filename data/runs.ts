// data/runs.ts: everything on the /running page lives here.
//
//  journey      — the races you've finished, joined as ONE continuous elevation line.
//                 Add a new race by copying a block. The order in the file doesn't matter:
//                 the page sorts them by date. See HOW-TO-ADD-RUNS.md.
//  fundraiser   — the cause you're running for (progress bar + donate button).
//  journal      — short run diary posts.
//  communityWall — captions for the polaroid photo wall.
//
// Anything marked EXAMPLE or [Placeholder] is made up — replace it with your own details.

export type JourneyRun = {
  date: string;        // "YYYY-MM" (or "YYYY-MM-DD") — used for the order and the year label
  name: string;        // race name
  location: string;
  distanceKm: number;  // shown as the big number at each peak
  elevationM: number;  // total climb in metres — sets how HIGH the peak sits on the line
  time?: string;       // finish time, e.g. "5:42:10"
  story: string;       // a sentence or two about the day
  photo?: string;      // optional: "/running/your-photo.jpg" (put the file in public/running/)
  example?: boolean;   // true = made-up placeholder (shows an EXAMPLE tag)
};

export const journey: JourneyRun[] = [
  {
    date: "2024-03",
    name: "Trail Marathon — New Zealand",
    location: "New Zealand · [Placeholder: exact trail & town]",
    distanceKm: 42.2,
    elevationM: 1650, // [Placeholder] change to your real elevation gain
    // time: "4:59:00",  // [Placeholder] add your finish time
    story: "[Placeholder] My first trail marathon — where this whole line begins. What the hills, the weather and the finish felt like.",
  },
  {
    date: "2024-09",
    name: "EXAMPLE — City Half Marathon",
    location: "Example: Sydney, Australia",
    distanceKm: 21.1,
    elevationM: 210,
    time: "1:52:30",
    story: "Placeholder story. A flat, fast road race to work on pace after the mountains.",
    example: true,
  },
  {
    date: "2025-04",
    name: "EXAMPLE — Blue Mountains Ultra 50K",
    location: "Example: Katoomba, NSW",
    distanceKm: 50,
    elevationM: 2400,
    time: "7:18:04",
    story: "Placeholder story. The biggest climb on the line so far — stairs, cliffs and a sunrise start.",
    example: true,
  },
  {
    date: "2025-10",
    name: "EXAMPLE — Coastal Trail 25K",
    location: "Example: Royal National Park, NSW",
    distanceKm: 25,
    elevationM: 980,
    time: "3:05:41",
    story: "Placeholder story. Rolling coastal hills, ran with friends from the Saturday group.",
    example: true,
  },
  {
    date: "2026-05",
    name: "EXAMPLE — Harbour Charity 10K",
    location: "Example: Sydney Harbour",
    distanceKm: 10,
    elevationM: 120,
    time: "48:55",
    story: "Placeholder story. A short one for a good cause, with friends from the club.",
    example: true,
  },
];

// The cause you're raising money for. Change the numbers as donations come in.
export const fundraiser = {
  cause: "[Placeholder] Cause name",
  blurb: "[Placeholder] One or two sentences on why this cause matters to you and where the money goes.",
  goal: 5000,   // target amount
  raised: 1850, // amount raised so far
  currency: "AUD",
  donateUrl: "https://example.com/donate", // [Placeholder] your fundraising page link
};

export type JournalPost = { date: string; title: string; distanceKm: number; excerpt: string; tags: string[] };
export const journal: JournalPost[] = [
  {
    date: "2026-10-12",
    title: "EXAMPLE — Long run in the fog",
    distanceKm: 28,
    excerpt: "Placeholder post. Notes from a slow Sunday long run — pacing, gels, and the cafe at the end.",
    tags: ["long run", "training"],
  },
  {
    date: "2026-09-21",
    title: "EXAMPLE — Spring Trail Meetup recap",
    distanceKm: 12,
    excerpt: "Placeholder post. Thirty people turned up! A short recap and photos from our group trail run.",
    tags: ["community", "trail"],
  },
];

// Polaroid photo wall: add `photo: "/running/xyz.jpg"` to show a real picture.
export const communityWall: { caption: string; photo?: string }[] = [
  { caption: "Sunrise 5K crew" },
  { caption: "Finish line hugs" },
  { caption: "Trail day, muddy shoes" },
  { caption: "Coffee after the run" },
  { caption: "Charity run volunteers" },
  { caption: "First-timers club" },
];
