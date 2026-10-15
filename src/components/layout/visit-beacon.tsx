"use client";

import { useEffect } from "react";

export function VisitBeacon() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (navigator.webdriver) return;
    try {
      if (sessionStorage.getItem("visited")) return;
      sessionStorage.setItem("visited", "1");
    } catch {
      return;
    }
    if (!navigator.sendBeacon?.("/api/visit")) {
      fetch("/api/visit", { method: "POST", keepalive: true }).catch(() => {});
    }
  }, []);
  return null;
}
