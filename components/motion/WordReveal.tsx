"use client";
// WordReveal.tsx: a heading whose words slide up one after another when it scrolls into view.
// Usage: <WordReveal as="h2" text="Through my lens" className="..." />
import { motion } from "motion/react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  accentLast?: boolean; // make the last word italic + accent colour (used for your surname)
  delay?: number;
};

export default function WordReveal({ text, as = "h2", className = "", accentLast = false, delay = 0 }: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}
      initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}>
      {words.map((w, i) => (
        // the outer span hides the word until it slides up into place (side padding keeps italic letters like the "y" from being clipped)
        <span key={i} aria-hidden className="-mx-[0.12em] -mb-[0.15em] inline-block overflow-hidden px-[0.12em] pb-[0.15em] align-bottom">
          <motion.span
            className={`inline-block ${accentLast && i === words.length - 1 ? "italic text-accent" : ""}`}
            variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: "0%", opacity: 1 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            {w}
          </motion.span>
          {i < words.length - 1 && "\u00a0"}
        </span>
      ))}
    </Tag>
  );
}
