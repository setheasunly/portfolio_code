// layout.tsx: the outer "frame" wrapped around every page.
// It loads the Inter font, the global CSS, and sets the browser tab title.
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE_NAME } from "@/data/site";
import MotionProvider from "@/components/motion/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Cursor from "@/components/motion/Cursor";
import LensProvider from "@/components/lens/LensProvider";

// next/font downloads Inter at build time and serves it from your own site.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Fraunces: an elegant serif used for big headings.
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });

// Page title and description (used by Google and link previews).
export const metadata: Metadata = {
  title: `${SITE_NAME} — Portfolio`,
  description: `Personal portfolio of ${SITE_NAME}.`,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${fraunces.variable} grain antialiased`}>
        {/* Site-wide motion: smooth scrolling, the top progress bar and the mouse follower */}
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Cursor />
          {/* LensProvider plays the "enter through the camera lens" transition */}
          <LensProvider>{children}</LensProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
