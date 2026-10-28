"use client";
// LensProvider.tsx: runs the two "cinematic" page transitions and shares them with the site.
//
//  enterGallery(href)  — the "enter through the lens" move into the Photography gallery:
//      1. a camera fades in, centred on screen
//      2. it glides toward you and the focus ring turns, a light flare sweeps the glass
//      3. the aperture blades open and we fly through the lens…
//      4. …and the Photography page (already loaded underneath) is revealed.
//  enterRunning(href) — "On your marks … Get set … GO!" then the journey line bolts across
//      and the Running page is wiped into view.
//  zoomInto(el, src, href) — clicking an album "frame" zooms the picture to fill the screen,
//      then opens the album.
//
// Visitors who prefer reduced motion get a simple, quick fade instead.
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import LensCamera from "@/components/lens/LensCamera";
import RaceStart from "@/components/running/RaceStart";

type LensApi = {
  enterGallery: (href: string) => void;
  enterRunning: (href: string) => void;
  zoomInto: (el: HTMLElement, src: string, href: string) => void;
  lensEntry: boolean; // true while a lens/zoom transition is covering the screen
};
const LensContext = createContext<LensApi>({ enterGallery: () => {}, enterRunning: () => {}, zoomInto: () => {}, lensEntry: false });
export const useLens = () => useContext(LensContext);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LensProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mode, setMode] = useState<"idle" | "lens" | "fade" | "zoom" | "race">("idle");
  const [lensEntry, setLensEntry] = useState(false);
  const [zoomImg, setZoomImg] = useState<{ src: string; rect: DOMRect } | null>(null);
  const busy = useRef(false);

  // --- wait until the new page is actually showing ---
  // We remember the current path; when it matches the one we pushed, the new page is on screen.
  const currentPath = useRef(pathname);
  const waiting = useRef<{ path: string; done: () => void } | null>(null);
  useEffect(() => {
    currentPath.current = pathname;
    if (waiting.current && pathname === waiting.current.path) { waiting.current.done(); waiting.current = null; }
  }, [pathname]);
  const routeReady = (path: string) =>
    Promise.race([
      new Promise<void>((done) => {
        if (currentPath.current === path) done(); // already there
        else waiting.current = { path, done };
      }),
      wait(2500), // safety net: never get stuck
    ]).then(() => wait(60)); // give the new page a moment to paint

  // --- the motion values that drive the overlay ---
  const overlay = useMotionValue(0);   // whole overlay opacity
  const scale = useMotionValue(0.7);   // camera zoom
  const open = useMotionValue(0);      // iris 0 closed → 1 open
  const focus = useMotionValue(0);     // focus ring rotation (deg)
  const flare = useMotionValue(0);     // flare position 0 → 1
  const blur = useMotionValue(0);      // blur while passing through the glass (px)
  const vignette = useMotionValue(0);  // dark edges
  const bloom = useMotionValue(0);     // soft white light as we emerge
  const lanes = useMotionValue(0);   // race start: lane lines drawing in
  const go = useMotionValue(0);      // race start: the journey line after GO
  const wipe = useMotionValue(0);    // race start: wipe away to reveal the page (%)
  const [raceStep, setRaceStep] = useState(0); // 1 = On your marks, 2 = Get set, 3 = GO!
  const zoomX = useMotionValue(0);   // album zoom: move picture to the centre
  const zoomY = useMotionValue(0);
  const filter = useTransform(blur, (b) => (b > 0.05 ? `blur(${b}px)` : "none"));

  const enterGallery = useCallback(async (href: string) => {
    if (busy.current) return;
    busy.current = true;
    router.prefetch(href);
    setLensEntry(true);

    if (prefersReduced()) {
      // Simple fade for reduced motion
      setMode("fade"); overlay.set(0);
      await animate(overlay, 1, { duration: 0.2 });
      router.push(href);
      await routeReady(href);
      await animate(overlay, 0, { duration: 0.3 });
    } else {
      scale.set(0.72); open.set(0); focus.set(-30); flare.set(0); blur.set(0); vignette.set(0); bloom.set(0); overlay.set(0);
      setMode("lens");
      await wait(16);
      // 1. camera appears and settles in the centre (~0.55s)
      animate(overlay, 1, { duration: 0.35, ease: "easeOut" });
      animate(focus, 28, { duration: 1.4, ease: [0.45, 0, 0.2, 1] }); // focus ring turns
      animate(flare, 1, { duration: 1.3, ease: "easeInOut", delay: 0.2 }); // flare sweeps the glass
      await animate(scale, 1, { duration: 0.55, ease: [0.22, 1, 0.36, 1] });
      router.push(href); // the gallery loads underneath while the camera is on screen
      // 2. glide toward the lens (~0.5s)
      animate(vignette, 0.8, { duration: 0.6 });
      await animate(scale, 2.5, { duration: 0.5, ease: [0.55, 0, 0.45, 1] });
      await routeReady(href);
      // 3. the iris blades open, then we rush through the glass (~0.75s)
      animate(open, 1, { duration: 0.6, ease: [0.5, 0, 0.3, 1] });
      animate(blur, [0, 0, 3.5, 0], { duration: 0.75, times: [0, 0.4, 0.75, 1] });
      animate(bloom, [0, 0, 0.35, 0], { duration: 0.8, times: [0, 0.45, 0.7, 1] });
      animate(vignette, 0, { duration: 0.5, delay: 0.3 });
      await animate(scale, [2.5, 3.1, 20], { duration: 0.75, times: [0, 0.5, 1], ease: ["easeOut", [0.7, 0, 0.9, 0.4]] });
      // 4. emerge into the gallery
      await animate(overlay, 0, { duration: 0.3 });
    }
    setMode("idle");
    busy.current = false;
    await wait(800);
    setLensEntry(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const enterRunning = useCallback(async (href: string) => {
    if (busy.current) return;
    busy.current = true;
    router.prefetch(href);
    setLensEntry(true);
    if (prefersReduced()) {
      setMode("fade"); overlay.set(0);
      await animate(overlay, 1, { duration: 0.2 });
      router.push(href);
      await routeReady(href);
      await animate(overlay, 0, { duration: 0.25 });
    } else {
      overlay.set(0); lanes.set(0); go.set(0); wipe.set(0); setRaceStep(0);
      setMode("race");
      await wait(16);
      animate(overlay, 1, { duration: 0.25 });
      animate(lanes, 1, { duration: 0.7, ease: [0.22, 1, 0.36, 1] });
      await wait(150); setRaceStep(1);          // "On your marks"
      await wait(500); setRaceStep(2);          // "Get set"
      router.push(href);                        // load the page underneath
      await wait(450); setRaceStep(3);          // "GO!"
      await animate(go, 1, { duration: 0.5, ease: [0.5, 0, 0.2, 1] }); // the line bolts away
      await routeReady(href);
      await animate(wipe, 100, { duration: 0.5, ease: [0.7, 0, 0.3, 1] }); // wipe to reveal the page
    }
    setMode("idle"); setRaceStep(0);
    busy.current = false;
    await wait(800);
    setLensEntry(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const zoomInto = useCallback(async (el: HTMLElement, src: string, href: string) => {
    if (busy.current) return;
    if (prefersReduced()) { router.push(href); return; }
    busy.current = true;
    setLensEntry(true);
    router.prefetch(href);
    const rect = el.getBoundingClientRect();
    // how much to scale + move the picture so it fills the screen
    const s = Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height);
    const dx = window.innerWidth / 2 - (rect.left + rect.width / 2);
    const dy = window.innerHeight / 2 - (rect.top + rect.height / 2);
    overlay.set(1); scale.set(1); blur.set(0);
    setZoomImg({ src, rect });
    setMode("zoom");
    await wait(16);
    zoomX.set(0); zoomY.set(0);
    animate(zoomX, dx, { duration: 0.7, ease: [0.7, 0, 0.2, 1] });
    animate(zoomY, dy, { duration: 0.7, ease: [0.7, 0, 0.2, 1] });
    setTimeout(() => router.push(href), 250);
    await animate(scale, s * 1.05, { duration: 0.7, ease: [0.7, 0, 0.2, 1] });
    await routeReady(href);
    await animate(overlay, 0, { duration: 0.4 });
    setMode("idle"); setZoomImg(null);
    busy.current = false;
    setLensEntry(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  return (
    <LensContext.Provider value={{ enterGallery, enterRunning, zoomInto, lensEntry }}>
      {children}

      {mode === "lens" && (
        <motion.div aria-hidden className="fixed inset-0 z-[80] overflow-hidden" style={{ opacity: overlay }}>
          {/* the camera, centred on its lens; scaling it zooms into the glass */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div className="w-[min(88vw,620px)]" style={{ scale, filter }}>
              <LensCamera open={open} focus={focus} flare={flare} />
            </motion.div>
          </div>
          {/* vignette: darker edges as we get close to the lens */}
          <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: vignette, background: "radial-gradient(ellipse at center, transparent 35%, rgba(28,22,18,0.55) 100%)" }} />
          {/* bloom: a burst of warm light as we pass through */}
          <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: bloom, background: "radial-gradient(circle at center, #fff 0%, #fff4ea 35%, rgba(255,244,234,0) 75%)" }} />
        </motion.div>
      )}

      {mode === "race" && <RaceStart step={raceStep} lanes={lanes} go={go} wipe={wipe} opacity={overlay} />}

      {mode === "fade" && (
        <motion.div aria-hidden className="fixed inset-0 z-[80] bg-background" style={{ opacity: overlay }} />
      )}

      {mode === "zoom" && zoomImg && (
        <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-[80]" style={{ opacity: overlay }}>
          <motion.img src={zoomImg.src} alt="" className="absolute object-cover shadow-2xl"
            style={{ left: zoomImg.rect.left, top: zoomImg.rect.top, width: zoomImg.rect.width, height: zoomImg.rect.height, x: zoomX, y: zoomY, scale }} />
        </motion.div>
      )}
    </LensContext.Provider>
  );
}
