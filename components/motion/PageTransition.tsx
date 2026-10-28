"use client";
// PageTransition.tsx: fades and slides each page in when you navigate (Home ↔ Photography ↔ Album).
// When the camera-lens or album-zoom transition is already covering the screen, we skip this fade
// so the new page is visible straight away through the opening lens.
import { useState } from "react";
import { motion } from "motion/react";
import { useLens } from "@/components/lens/LensProvider";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { lensEntry } = useLens();
  const [skip] = useState(lensEntry); // remember how this page was entered
  return (
    <motion.div initial={skip ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
