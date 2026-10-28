"use client";
// Magnetic.tsx: wrap a button in this and it gently "pulls" toward the mouse when nearby.
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCanAnimate, useFinePointer } from "@/components/motion/useMotionPrefs";

export default function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const can = useCanAnimate();
  const on = fine && can;
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });

  function move(e: React.PointerEvent) {
    if (!on || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // distance from the button's centre, scaled down by "strength"
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() { x.set(0); y.set(0); }

  return (
    <motion.span ref={ref} onPointerMove={move} onPointerLeave={reset} style={{ x, y }} className="inline-block">
      {children}
    </motion.span>
  );
}
