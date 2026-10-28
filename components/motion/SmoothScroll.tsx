"use client";
// SmoothScroll.tsx: turns on Lenis "inertial" smooth scrolling for the whole site.
// It glides the page instead of jumping line by line. Skipped for reduce-motion users.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

let lenis: Lenis | null = null; // one shared instance

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // autoRaf: Lenis runs its own animation loop. anchors: smooth-scroll "#section" links.
    lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -80 } });
    return () => { lenis?.destroy(); lenis = null; };
  }, []);

  // When you move to a new page, start at the top (or at the #section in the link).
  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    lenis.resize();
    if (target) lenis.scrollTo(target, { offset: -80, immediate: true });
    else lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
