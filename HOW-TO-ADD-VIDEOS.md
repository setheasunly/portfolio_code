# How to add your own YouTube video

The FPV section on the homepage ("FPV · From the sky") shows one YouTube video.
The video stays on YouTube — your site only shows YouTube's player.

## Swap in your video

1. Upload your FPV video to YouTube (Public or Unlisted both work).
   In YouTube Studio, make sure **Allow embedding** is ticked (it is by default).
2. Copy its link, e.g. `https://www.youtube.com/watch?v=ZVyBjUdQYt8`.
   The **ID** is the part after `v=` → `ZVyBjUdQYt8`.
   (For a short link like `https://youtu.be/ZVyBjUdQYt8`, it's the part after the `/`.)
3. Open `data/videos.ts` and change `featuredFpvVideo`:

   ```ts
   export const featuredFpvVideo: Video = {
     youtubeId: "YOUR_ID_HERE",
     title: "Sunrise ridge dive — Blue Mountains",
     blurb: "One pack, first light, and a ridgeline I'd been eyeing for weeks.",
     tags: ["FPV", "Blue Mountains", "5-inch freestyle"],
   };
   ```

4. Remove the `⚠️ EXAMPLE` comment, save, and refresh the page.

## Good to know

- **Poster picture:** the site uses YouTube's own thumbnail for your video automatically.
  If you set a custom thumbnail on YouTube, that's what shows.
- **Fast page:** the heavy YouTube player only loads after someone clicks play.
- **Privacy:** the player uses `youtube-nocookie.com`, YouTube's privacy-friendly address.
- **Change the look:** the drone-goggles overlay (REC, battery, altitude, speed) is in
  `components/fpv/FpvPlayer.tsx` (the `Osd` part). The section heading is in `components/FpvVideo.tsx`.
