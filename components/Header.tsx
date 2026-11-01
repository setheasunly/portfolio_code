"use client";
// Header.tsx: a floating liquid-glass pill with your name and the navigation.
// - Links start with "/" (e.g. "/#about") so they work from any page.
// - It hides when you scroll down and comes back when you scroll up.
// - On phones the links open in a glass panel under the pill.
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import LensLink from "@/components/lens/LensLink";
import RunLink from "@/components/running/RunLink";
import { SITE_NAME } from "@/data/site";
import ThemeToggle from "@/components/theme/ThemeToggle";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/photography", label: "Photography" },
  { href: "/running", label: "Running" },
  { href: "/#contact", label: "Contact" },
];
const ease = [0.22, 1, 0.36, 1] as const;

// Photography plays the "through the lens" transition, Running plays "On your marks … GO!"
function NavLink({ href, className, current, children }: { href: string; className: string; current: boolean; children: React.ReactNode }) {
  const cls = className + (current ? " is-current text-foreground" : "");
  if (href === "/photography") return <LensLink href={href} className={cls}>{children}</LensLink>;
  if (href === "/running") return <RunLink href={href} className={cls}>{children}</RunLink>;
  return <Link href={href} className={cls}>{children}</Link>;
}

export default function Header() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (open) return;
    if (y > prev + 4 && y > 160) setHidden(true); // scrolling down
    else if (y < prev - 4 || y < 160) setHidden(false); // scrolling up / near the top
  });

  // Close the phone menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) => href.startsWith("/") && !href.includes("#") && pathname.startsWith(href);

  return (
    <motion.header
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ duration: reduce ? 0 : 0.4, ease }}
      className="pointer-events-none sticky top-0 z-40 h-[76px] px-3 pt-3 md:px-6"
    >
      <nav className="glass pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-5 pr-2 md:pl-7 md:pr-3">
        <Link href="/" className="font-serif text-lg italic tracking-tight">
          {SITE_NAME}<span className="text-accent">.</span>
        </Link>

        {/* Desktop links: a hairline draws in underneath on hover */}
        <div className="flex items-center gap-2 md:gap-6">
          <ul className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} current={isCurrent(l.href)} className="link-line transition-colors hover:text-foreground">{l.label}</NavLink>
              </li>
            ))}
          </ul>

          {/* Light / dark switch (stays in the header on phones too) */}
          <ThemeToggle />

          {/* Phone: menu button */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="btn-glass flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="scrim"
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="pointer-events-auto fixed inset-0 -z-10 bg-shade/50 backdrop-blur-[2px] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
            />
            <motion.div
              key="panel"
              id="mobile-nav"
              className="glass-strong pointer-events-auto mx-auto mt-2 max-w-6xl rounded-[28px] px-7 py-7 md:hidden"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: reduce ? 0 : 0.35, ease }}
            >
              <ul className="flex flex-col gap-3" onClick={() => setOpen(false)}>
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.04 + i * 0.05, ease }}
                  >
                    <NavLink href={l.href} current={isCurrent(l.href)} className="group flex items-baseline justify-between font-serif text-3xl">
                      {l.label}
                      <span className="link-arrow font-sans text-base text-muted">→</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
