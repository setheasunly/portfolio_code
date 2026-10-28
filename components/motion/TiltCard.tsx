"use client";
// TiltCard.tsx: tilts its content in 3D toward the mouse, like holding a card in your hand.
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCanAnimate, useFinePointer } from "@/components/motion/useMotionPrefs";

export default function TiltCard({ children, className = "", max = 10 }: { children: React.ReactNode; className?: string; max?: number }) {
  const fine = useFinePointer();
  const can = useCanAnimate();
  const on = fine && can;
  const px = useMotionValue(0.5); // mouse position inside the card, 0..1
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });

  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (!on) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() { px.set(0.5); py.set(0.5); }

  return (
    <motion.div onPointerMove={move} onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 800 }} className={className}>
      {children}
    </motion.div>
  );
}
