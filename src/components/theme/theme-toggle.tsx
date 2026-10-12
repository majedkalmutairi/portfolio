"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function serverTheme(): Theme {
  return "dark";
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
  } catch {}
}

function switchTheme(theme: Theme) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !document.startViewTransition) {
    applyTheme(theme);
    return;
  }
  document.startViewTransition(() => applyTheme(theme));
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
  const Icon = theme === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={() => switchTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex size-9 items-center justify-center rounded-md text-fg-secondary transition-colors duration-150 hover:text-fg ${className}`}
    >
      <Icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
