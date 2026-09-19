"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamic import of 3D Spatial Lab Director with SSR disabled for WebGL Canvas
const SpatialLabDirector = dynamic(
  () => import("@/components/spatial-lab/SpatialLabDirector").then((m) => m.SpatialLabDirector),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-[#050811] flex flex-col items-center justify-center text-xs font-mono text-[#FF6A2A] select-none z-50">
        <div className="w-10 h-10 rounded-full border-2 border-[#FF6A2A] border-t-transparent animate-spin mb-4" />
        <span className="tracking-[0.25em] uppercase text-[#94A3B8]">
          CALIBRATING SPATIAL LAB &bull; SECTOR 02
        </span>
      </div>
    ),
  }
);

export default function EngineeringLabPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050811]">
      <SpatialLabDirector />
    </main>
  );
}
