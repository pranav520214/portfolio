"use client";

import React, { useState } from "react";
import { HOW_I_BUILD_STEPS } from "@/data/portfolioContent";
import { Wrench, ChevronRight } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

export function HowIBuildSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="approach" className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[rgba(255,255,255,0.08)] pb-5 mb-12">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>5-STAGE ENGINEERING METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9] mt-1">
            Engineering Pipeline
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94A3B8] bg-[#121620] border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full">
          IDEA → ARCHITECT → BUILD → BREAK → ITERATE
        </div>
      </div>

      {/* 5-Step Pipeline Steps Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8 font-mono text-xs">
        {HOW_I_BUILD_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.step}
              onClick={() => {
                sounds.playClick();
                setActiveStepIndex(idx);
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive
                  ? "bg-[#161B26] text-[#F1F5F9] border-[#D94431] shadow-lg shadow-[#D94431]/10"
                  : "bg-[#121620] text-[#94A3B8] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] hover:text-[#F1F5F9]"
              }`}
            >
              <div className="text-[10px] text-[#64748B] mb-1 font-bold">
                STAGE {step.step}
              </div>
              <div className="font-bold text-sm sm:text-base text-[#F1F5F9]">
                {step.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="bg-[#121620] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="bg-[#D94431] text-white px-2.5 py-0.5 rounded font-bold">
                STAGE {HOW_I_BUILD_STEPS[activeStepIndex].step}
              </span>
              <span className="text-[#F1F5F9] font-bold uppercase tracking-wider">
                {HOW_I_BUILD_STEPS[activeStepIndex].name}
              </span>
              <span className="text-[#F59E0B] font-mono text-[11px] bg-[#0D0F14] px-2.5 py-0.5 rounded border border-[rgba(255,255,255,0.06)]">
                {HOW_I_BUILD_STEPS[activeStepIndex].supportingLabel}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#F1F5F9]">
              {HOW_I_BUILD_STEPS[activeStepIndex].headline}
            </h3>

            <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
              {HOW_I_BUILD_STEPS[activeStepIndex].description}
            </p>
          </div>

          <div className="bg-[#0D0F14] border border-[rgba(255,255,255,0.06)] p-5 rounded-xl font-mono text-xs text-[#F1F5F9] md:max-w-xs w-full space-y-2">
            <div className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider">
              REAL PROJECT APPLICATION //
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {HOW_I_BUILD_STEPS[activeStepIndex].example}
            </p>
          </div>
        </div>

        {/* Step Progression Navigation */}
        <div className="mt-8 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs font-mono">
          <span className="text-[#64748B]">
            Click any step above to inspect the pipeline stage
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveStepIndex((prev) => (prev + 1) % HOW_I_BUILD_STEPS.length);
            }}
            className="flex items-center gap-1 text-[#D94431] hover:text-[#FF4D36] font-bold transition-colors"
          >
            <span>NEXT STAGE</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
