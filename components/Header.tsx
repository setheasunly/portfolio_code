"use client";
// Header.tsx: the top bar with your name and navigation links.
// - Links start with "/" (e.g. "/#about") so they work from any page.
// - It turns frosted once you scroll, hides when you scroll down, and comes back when you scroll up.
import { useState } from "react";
import Link from "next/link";
import LensLink from "@/components/lens/LensLink";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { SITE_NAME } from "@/data/site";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/photography", label: "Photography" },
  { href: "/#running", label: "Running" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Runs whenever the scroll position changes (not on every render).
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (y > prev + 4 && y > 160) setHidden(true);   // scrolling down
    else if (y < prev - 4 || y < 160) setHidden(false); // scrolling up / near the top
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled ? "border-line/70 bg-background/75 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.25)] backdrop-blur-md" : "border-transparent bg-transparent"
      }`}>
      <nav className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-4 sm:flex-row sm:justify-between sm:py-5">
        {/* The name shrinks a little once you scroll (scale = transform, so it stays smooth) */}
        <motion.div animate={{ scale: scrolled ? 0.92 : 1 }} transition={{ duration: 0.4 }} className="origin-left">
          <Link href="/" className="font-serif text-lg italic tracking-tight">
            {/* Your name comes from data/site.ts */}
            {SITE_NAME}<span className="text-accent">.</span>
          </Link>
        </motion.div>
        {/* On phones the links wrap neatly under the name */}
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-muted sm:gap-x-5 sm:text-sm">
          {links.map((link) => (
            <li key={link.href}>
              {/* the after: line grows underneath on hover */}
              {(() => {
                const cls = "relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full";
                // The Photography link plays the "through the lens" transition
                return link.href === "/photography"
                  ? <LensLink href={link.href} className={cls}>{link.label}</LensLink>
                  : <Link href={link.href} className={cls}>{link.label}</Link>;
              })()}
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
