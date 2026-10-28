"use client";
// Cursor.tsx: a soft circle that follows the mouse and grows over links and photos.
// Only shown on computers with a mouse — never on phones/tablets or for reduce-motion users.
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCanAnimate, useFinePointer } from "@/components/motion/useMotionPrefs";

export default function Cursor() {
  const fine = useFinePointer();
  const can = useCanAnimate();
  const enabled = fine && can;
  return enabled ? <Follower /> : null;
}

function Follower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Springs make the circle lag slightly behind the real cursor, which feels soft.
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [mode, setMode] = useState<"default" | "link" | "photo" | "hidden">("hidden");

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor='photo'], .film-frame, img")) setMode("photo");
      else if (el.closest("a, button, [role='tab']")) setMode("link");
      else setMode("default");
    };
    const leave = () => setMode("hidden");
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
  }, [x, y]);

  const size = { default: 1, link: 2.4, photo: 3.6, hidden: 0 }[mode];
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[70]">
      <motion.div
        animate={{ scale: size, opacity: mode === "hidden" ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`-ml-4 -mt-4 h-8 w-8 rounded-full border ${mode === "default" ? "border-foreground/30" : "border-accent/50 bg-accent/10"} backdrop-blur-[1px]`}
      />
    </motion.div>
  );
}
