"use client";

import React, { useState } from "react";
import { HOW_I_BUILD_STEPS } from "@/data/portfolioContent";
import { Wrench, ChevronRight } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

export function HowIBuildSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="methodology" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D8D6CD] pb-4 mb-10">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>ENGINEERING METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1">
            How I Build
          </h2>
        </div>
        <div className="font-mono text-xs text-[#666666]">
          [ 08 STAGES FROM QUESTION TO REPRODUCIBLE SYSTEM ]
        </div>
      </div>

      {/* Horizontal Pipeline Steps Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8 font-mono text-xs">
        {HOW_I_BUILD_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.step}
              onClick={() => {
                sounds.playClick();
                setActiveStepIndex(idx);
              }}
              className={`p-3 rounded-lg border text-left transition-all ${
                isActive
                  ? "bg-[#111111] text-[#F5F4EF] border-[#111111] shadow-sm"
                  : "bg-[#FFFFFF] text-[#555555] border-[#D8D6CD] hover:border-[#111111] hover:text-[#111111]"
              }`}
            >
              <div className="text-[10px] text-[#888888] mb-0.5">
                {step.step}
              </div>
              <div className="font-bold text-xs sm:text-sm">
                {step.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="bg-[#FFFFFF] border border-[#D8D6CD] rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="bg-[#D94431] text-white px-2 py-0.5 rounded font-bold">
                STAGE {HOW_I_BUILD_STEPS[activeStepIndex].step}
              </span>
              <span className="text-[#111111] font-bold uppercase tracking-wider">
                {HOW_I_BUILD_STEPS[activeStepIndex].name}
              </span>
              <span className="text-[#888888] font-mono text-[11px] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#D8D6CD]">
                {HOW_I_BUILD_STEPS[activeStepIndex].supportingLabel}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
              {HOW_I_BUILD_STEPS[activeStepIndex].headline}
            </h3>

            <p className="text-sm text-[#444444] leading-relaxed">
              {HOW_I_BUILD_STEPS[activeStepIndex].description}
            </p>
          </div>

          <div className="bg-[#FAF9F5] border border-[#D8D6CD] p-5 rounded-xl font-mono text-xs text-[#111111] md:max-w-xs w-full space-y-2">
            <div className="text-[10px] font-bold text-[#D94431] uppercase tracking-wider">
              IN PRACTICE
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#333333] leading-relaxed">
              {HOW_I_BUILD_STEPS[activeStepIndex].example}
            </p>
          </div>
        </div>

        {/* Next Step Shortcut */}
        <div className="mt-8 pt-4 border-t border-[#EAE8DF] flex items-center justify-between text-xs font-mono">
          <span className="text-[#888888]">
            Click any step above to inspect methodology details
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveStepIndex((prev) => (prev + 1) % HOW_I_BUILD_STEPS.length);
            }}
            className="flex items-center gap-1 text-[#D94431] hover:underline font-bold"
          >
            <span>NEXT STAGE</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
