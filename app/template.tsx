// template.tsx: like layout.tsx, but re-created on every page change —
// that's what lets each new page play its fade-in transition.
import PageTransition from "@/components/motion/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
