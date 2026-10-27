// Header.tsx: the top bar with your name and navigation links.
// Links start with "/" (e.g. "/#about") so they work from any page, not just the homepage.
import Link from "next/link";
import { SITE_NAME } from "@/data/site";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/photography", label: "Photography" },
  { href: "/#running", label: "Running" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    // "sticky top-0" keeps the header visible while scrolling; backdrop-blur frosts what's behind it
    <header className="sticky top-0 z-40 border-b border-line/70 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-4 sm:flex-row sm:justify-between sm:py-5">
        <Link href="/" className="font-serif text-lg italic tracking-tight">
          {/* Your name comes from data/site.ts */}
          {SITE_NAME}<span className="text-accent">.</span>
        </Link>
        {/* On phones the links wrap neatly under the name */}
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-muted sm:gap-x-5 sm:text-sm">
          {links.map((link) => (
            <li key={link.href}>
              {/* the after: line grows underneath on hover */}
              <Link href={link.href} className="relative transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
