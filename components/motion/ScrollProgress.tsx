"use client";
// ScrollProgress.tsx: a thin accent line at the very top that fills as you scroll down.
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll(); // 0 at the top of the page, 1 at the bottom
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div aria-hidden style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-accent" />
  );
}
