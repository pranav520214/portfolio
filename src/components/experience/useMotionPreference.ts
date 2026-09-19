"use client";
import { useEffect, useState } from "react";

export const MOTION_KEY = "pranav-reduced-motion";
export function useMotionPreference() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => {
      let saved = false;
      try { saved = localStorage.getItem(MOTION_KEY) === "true"; } catch { /* Storage is optional. */ }
      setReduced(saved || query.matches);
    };
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);
  const toggle = () => {
    const next = !reduced;
    try { localStorage.setItem(MOTION_KEY, String(next)); } catch { /* Keep an in-memory preference. */ }
    // Never override the operating system's accessibility preference.
    setReduced(next || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };
  return { reduced, toggle };
}
