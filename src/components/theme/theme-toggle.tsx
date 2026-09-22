"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

// The theme lives on <html class="dark">, outside React. These three functions let React
// read it and be told when it changes (useSyncExternalStore = "watch something external").
function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function serverTheme(): Theme {
  return "dark"; // what the server renders; ThemeScript corrects it before paint
}
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function applyTheme(theme: Theme) {
  const dark = theme === "dark";
  document.documentElement.classList.toggle("dark", dark);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#121212" : "#ffffff");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private browsing can refuse storage; the theme still switches for this visit.
  }
}

// Sun / moon button. Flips the `dark` class on <html>, remembers the choice in localStorage,
// and keeps the browser-chrome colour in step.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
  const Icon = theme === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex size-9 items-center justify-center rounded-md text-fg-secondary transition-colors duration-150 hover:text-fg ${className}`}
    >
      <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
