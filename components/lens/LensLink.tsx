"use client";
// LensLink.tsx: a link to the Photography gallery that plays the "through the lens" transition.
// Use it like a normal link: <LensLink href="/photography">Photography</LensLink>
// If you're already inside /photography, or you Ctrl/Cmd-click to open a new tab, it acts normally.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLens } from "@/components/lens/LensProvider";

export default function LensLink({ href = "/photography", className, children }: { href?: string; className?: string; children: React.ReactNode }) {
  const { enterGallery } = useLens();
  const pathname = usePathname();
  return (
    <Link href={href} className={className}
      onClick={(e) => {
        if (pathname.startsWith("/photography") || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        enterGallery(href);
      }}>
      {children}
    </Link>
  );
}
