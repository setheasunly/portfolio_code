"use client";
// RunLink.tsx: a link to /running that plays the "On your marks … GO!" start.
// Use it like a normal link. Ctrl/Cmd-click (new tab) or links already on /running act normally.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLens } from "@/components/lens/LensProvider";

export default function RunLink({ href = "/running", className, children }: { href?: string; className?: string; children: React.ReactNode }) {
  const { enterRunning } = useLens();
  const pathname = usePathname();
  return (
    <Link href={href} className={className}
      onClick={(e) => {
        if (pathname.startsWith("/running") || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        enterRunning(href);
      }}>
      {children}
    </Link>
  );
}
