// Footer.tsx: the quiet line at the very bottom of the page.
import Link from "next/link";
import { SITE_NAME } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 font-mono text-[10px] uppercase tracking-[0.22em] text-muted md:flex-row md:items-center md:justify-between">
        <p className="font-serif text-lg normal-case italic tracking-tight text-foreground">
          {SITE_NAME}<span className="text-accent">.</span>
        </p>
        <nav aria-label="Footer" className="flex gap-6">
          <Link href="/photography" className="link-line transition-colors hover:text-foreground">Photography</Link>
          <Link href="/running" className="link-line transition-colors hover:text-foreground">Running</Link>
          <Link href="/#contact" className="link-line transition-colors hover:text-foreground">Contact</Link>
        </nav>
        <p className="text-muted/70">© 2026 {SITE_NAME}</p>
      </div>
    </footer>
  );
}
