"use client";
// RunEntrance.tsx: if you arrived via the "On your marks … GO!" start, show the page as is.
// On a direct visit or refresh, play a short wipe from the left instead (pure CSS, off for reduced motion).
import { useState } from "react";
import { useLens } from "@/components/lens/LensProvider";

export default function RunEntrance({ children }: { children: React.ReactNode }) {
  const { lensEntry } = useLens();
  const [viaStart] = useState(lensEntry); // how we arrived, remembered at first render
  return <div className={viaStart ? "" : "run-intro"}>{children}</div>;
}
