// theme.ts: tiny helpers for the light / dark switch.
// The chosen theme lives on <html data-theme="light|dark"> and in localStorage ("theme").
// If the visitor never chose, we follow their system setting (prefers-color-scheme).
export type Theme = "light" | "dark";
export const THEME_KEY = "theme";
const COLORS: Record<Theme, string> = { dark: "#1d1c1a", light: "#f3eee5" };

// Runs inline in <head> before the first paint, so there's no flash of the wrong theme.
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_KEY}");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");var d=document.documentElement;d.setAttribute("data-theme",t);d.style.colorScheme=t;}catch(e){}})();`;

export function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function storedTheme(): Theme | null {
  try {
    const s = localStorage.getItem(THEME_KEY);
    return s === "light" || s === "dark" ? s : null;
  } catch {
    return null;
  }
}

// Keep the phone's browser bar the same colour as the page.
export function syncThemeColor(theme: Theme) {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.content = COLORS[theme];
  });
}

export function applyTheme(theme: Theme, { animate = true, persist = true } = {}) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate && !reduce) {
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 650);
  }
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  syncThemeColor(theme);
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* private mode: the choice just isn't remembered */
    }
  }
}

// For useSyncExternalStore: re-render when data-theme changes, and follow the system
// setting live as long as the visitor hasn't picked a theme themselves.
export function subscribeTheme(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const onSystem = () => {
    if (!storedTheme()) applyTheme(mq.matches ? "light" : "dark", { persist: false });
  };
  mq.addEventListener("change", onSystem);
  return () => {
    obs.disconnect();
    mq.removeEventListener("change", onSystem);
  };
}
