// layout.tsx: the outer "frame" wrapped around every page.
// It loads the Inter font, the global CSS, and sets the browser tab title.
import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_NAME } from "@/data/site";
import MotionProvider from "@/components/motion/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Cursor from "@/components/motion/Cursor";
import LensProvider from "@/components/lens/LensProvider";
import { themeInitScript } from "@/components/theme/theme";

// next/font downloads Inter at build time and serves it from your own site.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Fraunces: an elegant serif used for big headings.
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"] });
// JetBrains Mono: small uppercase labels and navigation.
const mono = JetBrains_Mono({ variable: "--font-mono-face", subsets: ["latin"] });

// Page title and description (used by Google and link previews).
export const metadata: Metadata = {
  title: `${SITE_NAME} — Portfolio`,
  description: `${SITE_NAME}: photography, running and travel — the photos and stories from my hobbies.`,
};

// Browser chrome colour on phones, matching the page (updated live by the theme switch).
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1d1c1a" },
    { media: "(prefers-color-scheme: light)", color: "#f3eee5" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script below sets data-theme before React loads.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Pick light/dark before the first paint (saved choice, else the system setting) */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} ${mono.variable} grain antialiased`}>
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
