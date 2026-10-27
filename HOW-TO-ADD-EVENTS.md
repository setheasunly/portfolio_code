# How to add a running event

All events live in one file: **`data/events.ts`**.

## 1. Open `data/events.ts`

You'll see a list that looks like this:

```ts
export const events: RunEvent[] = [
  {
    date: "2026-11-14",
    time: "6:30 AM",
    title: "Saturday Sunrise 5K",
    location: "Centennial Park, Sydney",
    description: "An easy social 5K for all paces, followed by coffee together.",
    joinUrl: "https://example.com/join",
  },
  // ...more events
];
```

## 2. Copy a block and change it

Copy one `{ ... },` block (including the comma at the end), paste it inside the `[ ]`,
and edit the values:

| Field         | Needed? | What it is                                                   |
|---------------|---------|--------------------------------------------------------------|
| `date`        | yes     | `YYYY-MM-DD`, e.g. `"2026-12-06"`                            |
| `time`        | no      | Start time as text, e.g. `"7:00 AM"`                         |
| `title`       | yes     | Event name                                                   |
| `location`    | yes     | Where to meet                                                |
| `description` | yes     | One or two sentences                                         |
| `joinUrl`     | no      | Sign-up link (Strava club, Google Form, Eventbrite…). Shows a **Join** button. |

Keep the quotes `" "` around text and the commas at the end of each line.
The order in the file doesn't matter — the site sorts events by date.

## 3. Past events take care of themselves

Once an event's date has passed, it moves from **Upcoming events** to **Past events**
automatically, using the visitor's own date. You don't need to delete old events
(but you can, if the Past list gets long).

## 4. Check it and publish

```bash
npm run dev      # preview at http://localhost:3000/#running
git add .
git commit -m "Add December charity run"
git push
```

If something is typed wrong (a missing quote or comma), `npm run dev` will show an error
pointing at the line — fix it and save again.

## Removing the examples

The three events marked **EXAMPLE** are placeholders — replace or delete them.
