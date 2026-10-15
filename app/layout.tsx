// layout.tsx: the outer "frame" wrapped around every page.
// It loads the Inter font, the global CSS, and sets the browser tab title.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// next/font downloads Inter at build time and serves it from your own site.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Page title and description (used by Google and link previews).
export const metadata: Metadata = {
  title: "Your Name — Portfolio", // PLACEHOLDER
  description: "Personal portfolio of Your Name.", // PLACEHOLDER
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
