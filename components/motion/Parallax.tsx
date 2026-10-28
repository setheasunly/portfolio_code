"use client";
// Parallax.tsx: moves its content up/down at a different speed than the page while scrolling,
// and scales it in the first time it appears. speed > 0 drifts more; negative goes the other way.
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useCanAnimate } from "@/components/motion/useMotionPrefs";

export default function Parallax({ children, speed = 40, className = "", delay = 0 }: { children: React.ReactNode; speed?: number; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const can = useCanAnimate();
  // progress: 0 when the element enters at the bottom of the screen, 1 when it leaves at the top
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], can ? [speed, -speed] : [0, 0]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
