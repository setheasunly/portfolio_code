"use client";
// ThemeToggle.tsx: the small glass switch in the header (sun = light, moon = dark).
// The knob slides across and the icons swap with a little spin; colours fade smoothly.
// With "reduce motion" turned on, everything changes instantly instead.
import { useEffect, useSyncExternalStore } from "react";
import { applyTheme, getTheme, subscribeTheme, syncThemeColor, type Theme } from "@/components/theme/theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  // On the server we don't know the theme, so we render "dark" and correct it right after hydrating.
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getTheme, () => "dark");
  const light = theme === "light";

  useEffect(() => syncThemeColor(getTheme()), []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
      onClick={() => applyTheme(light ? "dark" : "light")}
      className={`btn-glass group relative inline-flex h-9 w-[62px] shrink-0 items-center rounded-full p-1 ${className}`}
    >
      {/* the faint icons on the track */}
      <span aria-hidden className="absolute inset-0 flex items-center justify-between px-[9px] text-muted">
        <SunIcon className="h-3.5 w-3.5" />
        <MoonIcon className="h-3.5 w-3.5" />
      </span>
      {/* the knob: a little liquid drop that slides to the active side */}
      <span
        aria-hidden
        className={`btn-liquid relative z-10 flex h-7 w-7 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${light ? "translate-x-0" : "translate-x-[26px]"}`}
      >
        <SunIcon className={`absolute h-4 w-4 transition-all duration-500 motion-reduce:transition-none ${light ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
        <MoonIcon className={`absolute h-4 w-4 transition-all duration-500 motion-reduce:transition-none ${light ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
      </span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}
