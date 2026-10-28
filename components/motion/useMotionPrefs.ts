"use client";
// useMotionPrefs.ts: two small helpers every animated component uses.
// - useCanAnimate(): false if the visitor asked their device for "reduce motion".
// - useFinePointer(): true only on devices with a real mouse (not phones/tablets).
//
// Both use useSyncExternalStore to read a browser setting safely: the server (and the very
// first render in the browser) get a fixed default, so the HTML always matches and there
// are no hydration errors. React then updates to the real value straight away.
import { useSyncExternalStore } from "react";

function mediaStore(query: string) {
  return {
    subscribe(cb: () => void) {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    get: () => window.matchMedia(query).matches,
  };
}

const reduce = mediaStore("(prefers-reduced-motion: reduce)");
const fine = mediaStore("(hover: hover) and (pointer: fine)");

export function useCanAnimate() {
  return !useSyncExternalStore(reduce.subscribe, reduce.get, () => false);
}

export function useFinePointer() {
  return useSyncExternalStore(fine.subscribe, fine.get, () => false);
}
