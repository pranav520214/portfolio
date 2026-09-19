"use client";

import React from "react";

export function EngineeringCoreFallback() {
  return (
    <div className="relative w-full h-full min-h-[480px] flex items-center justify-center bg-[#07080A] rounded-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Static Precision Schematic */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-md">
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Concentric rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#D94431]/40 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-[#F59E0B]/30" />
          <div className="absolute inset-8 rounded-full border border-white/10" />

          {/* Central Silicon Node */}
          <div className="relative w-16 h-16 rounded-xl bg-[#121620] border-2 border-[#D94431] shadow-[0_0_20px_rgba(217,68,49,0.35)] flex items-center justify-center">
            <div className="w-8 h-8 rounded-md bg-[#D94431]/20 border border-[#D94431] flex items-center justify-center font-mono text-[10px] font-bold text-[#F59E0B]">
              CORE
            </div>
          </div>
        </div>

        <div className="space-y-1 font-mono">
          <div className="text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
            THE ENGINEERING CORE // STATIC SCHEMATIC
          </div>
          <div className="text-[11px] text-[#94A3B8]">
            Local AI • Embedded Firmware • Flight Avionics • ODE Simulation
          </div>
          <div className="text-[10px] text-[#64748B] pt-1">
            GPU acceleration reduced or active display in static mode
          </div>
        </div>
      </div>
    </div>
  );
}
