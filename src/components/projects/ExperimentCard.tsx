"use client";

import React from "react";
import { ExperimentCardData } from "@/data/portfolioContent";

interface ExperimentCardProps {
  experiment: ExperimentCardData;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  const isPass = experiment.status === "PASS" || experiment.status === "VALIDATED";

  return (
    <div className="bg-[#FAF9F5] border border-[#D8D6CD] rounded-xl p-5 sm:p-6 font-mono text-xs space-y-4 shadow-sm text-[#111111]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8D6CD] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#111111] bg-[#EAE8DF] px-2 py-0.5 rounded text-[11px]">
            {experiment.id}
          </span>
          <span className="font-semibold text-sm text-[#111111]">
            {experiment.title}
          </span>
        </div>
        <div>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase border ${
              isPass
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-amber-50 text-amber-700 border-amber-300"
            }`}
          >
            STATUS: {experiment.status}
          </span>
        </div>
      </div>

      {/* Grid of Lab Notebook Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">
            HYPOTHESIS
          </div>
          <div className="text-[#333333] leading-relaxed">
            {experiment.hypothesis}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">
            EXPERIMENTAL SETUP
          </div>
          <div className="text-[#333333] leading-relaxed">
            {experiment.setup}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">
            CONTROL VARIABLE
          </div>
          <div className="text-[#333333] leading-relaxed">
            {experiment.variable}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">
            MEASUREMENT & METRIC
          </div>
          <div className="text-[#333333] leading-relaxed font-semibold">
            {experiment.measurement}
          </div>
        </div>
      </div>

      {/* Result Callout */}
      <div className="bg-[#FFFFFF] border border-[#D8D6CD] rounded-lg p-3.5 space-y-1">
        <div className="text-[10px] font-bold text-[#D94431] uppercase tracking-wider">
          EMPIRICAL RESULT
        </div>
        <div className="font-semibold text-[#111111] text-xs sm:text-sm">
          {experiment.result}
        </div>
        {experiment.notes && (
          <div className="text-[11px] text-[#666666] pt-1">
            Note: {experiment.notes}
          </div>
        )}
      </div>
    </div>
  );
}
