"use client";
// GalleryEntrance.tsx: wraps the gallery page content.
// If you arrived through the lens transition, the content just appears (the lens already did the show).
// If you typed the address or refreshed, it plays a short "iris opening" instead (pure CSS).
import { useState } from "react";
import { useLens } from "@/components/lens/LensProvider";

export default function GalleryEntrance({ children }: { children: React.ReactNode }) {
  const { lensEntry } = useLens();
  // Remember how we arrived at the moment the page first appears.
  const [viaLens] = useState(lensEntry);
  return <div className={viaLens ? "" : "iris-intro"}>{children}</div>;
}
