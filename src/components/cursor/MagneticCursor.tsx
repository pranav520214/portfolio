"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "project" | "3d" | "link">("default");
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // Smooth springs for cursor follow
  const cursorX = useSpring(rawMouseX, { stiffness: 450, damping: 30 });
  const cursorY = useSpring(rawMouseY, { stiffness: 450, damping: 30 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        const type = interactive.getAttribute("data-cursor");
        if (type === "project") {
          setCursorVariant("project");
          setCursorText("OPEN →");
        } else if (type === "3d") {
          setCursorVariant("3d");
          setCursorText("DRAG ↺");
        } else if (type === "code") {
          setCursorVariant("link");
          setCursorText("CODE ↗");
        } else if (type === "contact") {
          setCursorVariant("link");
          setCursorText("CONNECT →");
        } else if (type === "zoom") {
          setCursorVariant("hover");
          setCursorText("PROOF 🔍");
        } else {
          setCursorVariant("hover");
          setCursorText("");
        }
      } else if (target.closest("button, a, input, textarea, [role='button']")) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  if (!enabled) return null;

  const isExpanded = cursorVariant !== "default";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Real-time coordinates HUD tag */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        {/* Central Reticle / Dot */}
        <div
          className={`transition-all duration-200 ease-out flex items-center justify-center rounded-full border border-comic-yellow/80 backdrop-blur-[2px] ${
            isExpanded
              ? "w-16 h-16 bg-blueprint-900/85 shadow-comic-yellow text-comic-yellow scale-100"
              : "w-4 h-4 bg-blueprint-red/80 shadow-[0_0_10px_#ffe600] scale-100"
          }`}
        >
          {cursorText && (
            <span className="font-mono text-[9px] font-black tracking-wider text-comic-yellow uppercase text-center px-1 select-none">
              {cursorText}
            </span>
          )}
          {!isExpanded && (
            <div className="w-1.5 h-1.5 bg-comic-yellow rounded-full" />
          )}
        </div>

        {/* Engineering Crosshair Ticks */}
        {!isExpanded && (
          <>
            <div className="absolute top-1/2 -left-3 w-2 h-[1px] bg-comic-yellow/70 -translate-y-1/2" />
            <div className="absolute top-1/2 -right-3 w-2 h-[1px] bg-comic-yellow/70 -translate-y-1/2" />
            <div className="absolute -top-3 left-1/2 w-[1px] h-2 bg-comic-yellow/70 -translate-x-1/2" />
            <div className="absolute -bottom-3 left-1/2 w-[1px] h-2 bg-comic-yellow/70 -translate-x-1/2" />
          </>
        )}

        {/* Dynamic Coordinate Tag */}
        <div className="absolute top-5 left-5 font-mono text-[9px] text-comic-yellow/60 tracking-tight bg-blueprint-950/80 px-1.5 py-0.5 rounded border border-comic-yellow/20 pointer-events-none select-none whitespace-nowrap">
          X:{coords.x} Y:{coords.y}
        </div>
      </motion.div>
    </div>
  );
}
