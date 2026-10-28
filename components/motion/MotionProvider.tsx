"use client";
// MotionProvider.tsx: site-wide animation settings.
// reducedMotion="user" means: if the visitor's device asks for less motion, skip movement.
import { MotionConfig } from "motion/react";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
