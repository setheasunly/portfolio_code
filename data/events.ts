// data/events.ts: your running events. Add a new event by copying one block below.
// Events whose date has passed move to the "Past events" list automatically.
// See HOW-TO-ADD-EVENTS.md for a step-by-step guide.

export type RunEvent = {
  date: string;         // "YYYY-MM-DD" — the day of the event
  time?: string;        // optional, e.g. "6:30 AM"
  title: string;
  location: string;
  description: string;
  joinUrl?: string;     // link for people to sign up (Strava club, form, Eventbrite...)
};

export const events: RunEvent[] = [
  {
    date: "2026-11-14",
    time: "6:30 AM",
    title: "EXAMPLE — Saturday Sunrise 5K",
    location: "Example: Centennial Park, Sydney",
    description: "Placeholder event. An easy social 5K for all paces, followed by coffee together.",
    joinUrl: "https://example.com/join-sunrise-5k",
  },
  {
    date: "2026-12-06",
    time: "7:00 AM",
    title: "EXAMPLE — Harbour Charity Run",
    location: "Example: Barangaroo Reserve, Sydney",
    description: "Placeholder event. A 10K group run raising money for a local charity.",
    joinUrl: "https://example.com/join-charity-run",
  },
  {
    date: "2026-09-20",
    title: "EXAMPLE — Spring Trail Meetup (past)",
    location: "Example: Royal National Park",
    description: "Placeholder past event — shows how finished events move to 'Past events'.",
  },
];
