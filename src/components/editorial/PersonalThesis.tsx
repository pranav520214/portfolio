"use client";

import React from "react";

export function PersonalThesis() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Section Label */}
        <div className="lg:col-span-3">
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider">
            THESIS // 00
          </div>
          <div className="font-mono text-[11px] text-[#666666] mt-1">
            CORE PHILOSOPHY
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-9 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] leading-tight max-w-2xl">
            I learn by building things I don&apos;t yet know how to build.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#444444] leading-relaxed max-w-3xl">
            <p>
              Most of my projects do not begin with a polished roadmap. They begin with an ambitious question, a physical limitation, or a system I want to understand from the ground up.
            </p>
            <p>
              I work through primary sources—research papers, sensor datasheets, compiler internals, and physical prototypes. Progress is usually made through broken implementations, unexpected noise spikes, and iterative measurement.
            </p>
            <p className="font-medium text-[#111111]">
              I am most interested in what happens below the interface: inference constraints, control loops, data movement, verification, and physical behavior.
            </p>
          </div>

          {/* Minimal Process Bar: BUILD -> TEST -> MEASURE -> DOCUMENT */}
          <div className="pt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-[#111111]">
            <span className="bg-[#EAE8DF] px-2.5 py-1 rounded">BUILD</span>
            <span className="text-[#D94431]">→</span>
            <span className="bg-[#EAE8DF] px-2.5 py-1 rounded">TEST</span>
            <span className="text-[#D94431]">→</span>
            <span className="bg-[#EAE8DF] px-2.5 py-1 rounded">MEASURE</span>
            <span className="text-[#D94431]">→</span>
            <span className="bg-[#EAE8DF] px-2.5 py-1 rounded">DOCUMENT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
