// videos.ts: the YouTube video(s) shown on the homepage.
//
// How to use your own video:
//   1. Open your video on YouTube and look at the link, e.g.
//        https://www.youtube.com/watch?v=ZVyBjUdQYt8
//   2. The "youtubeId" is the part after "v=" → ZVyBjUdQYt8
//      (for short links like https://youtu.be/ZVyBjUdQYt8 it's the part after the "/").
//   3. Paste it below, and change the title, blurb and tags to your own words.
//
// The site never stores the video itself: it stays on YouTube and we just show YouTube's player.

export type Video = {
  youtubeId: string;   // the part after "v=" in the YouTube link
  title: string;       // shown on the poster and used as the player's accessible name
  blurb: string;       // one or two sentences about the flight
  tags?: string[];     // optional little labels, e.g. the place or the drone
};

// ⚠️ EXAMPLE / PLACEHOLDER — not your video yet!
// Sample used: "Cinematic FPV Mountain Dive" by Connor Worth (@WorthyPOV), a public YouTube
// video that allows embedding: https://www.youtube.com/watch?v=ZVyBjUdQYt8
// Swap in your own youtubeId when your FPV video is up.
export const featuredFpvVideo: Video = {
  youtubeId: "ZVyBjUdQYt8",
  title: "[Example] Cinematic FPV mountain dive",
  blurb:
    "[Placeholder] A few minutes in the goggles — diving off ridgelines and chasing the light. Swap this for the story behind your own flight.",
  tags: ["FPV", "Freestyle", "Mountains", "Example video"],
};
