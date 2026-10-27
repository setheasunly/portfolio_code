// Footer.tsx: the small line at the very bottom of the page.
import { SITE_NAME } from "@/data/site";
export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted">
        © 2026 {SITE_NAME}. Built with Next.js.
      </div>
    </footer>
  );
}
