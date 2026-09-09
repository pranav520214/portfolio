"use client";

import React from "react";
import { ExperimentCardData } from "@/data/portfolioContent";

interface ExperimentCardProps {
  experiment: ExperimentCardData;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  const isPass = experiment.status === "PASS" || experiment.status === "VALIDATED";

  return (
    <div className="bg-[#14171E] border border-[#262E3B] rounded-xl p-5 sm:p-6 font-mono text-xs space-y-4 shadow-sm text-[#F1F5F9]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#262E3B] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#F1F5F9] bg-[#1C212B] border border-[#262E3B] px-2 py-0.5 rounded text-[11px]">
            {experiment.id}
          </span>
          <span className="font-semibold text-sm text-[#F1F5F9]">
            {experiment.title}
          </span>
        </div>
        <div>
          <span
            className={`font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase border ${
              isPass
                ? "bg-emerald-950/40 text-emerald-400 border-emerald-800"
                : "bg-amber-950/40 text-[#F59E0B] border-amber-800"
            }`}
          >
            STATUS: {experiment.status}
          </span>
        </div>
      </div>

      {/* Grid of Lab Notebook Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
            HYPOTHESIS
          </div>
          <div className="text-[#94A3B8] leading-relaxed font-sans">
            {experiment.hypothesis}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
            EXPERIMENTAL SETUP
          </div>
          <div className="text-[#94A3B8] leading-relaxed font-sans">
            {experiment.setup}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
            CONTROL VARIABLE
          </div>
          <div className="text-[#94A3B8] leading-relaxed font-sans">
            {experiment.variable}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
            MEASUREMENT
          </div>
          <div className="text-[#94A3B8] leading-relaxed font-sans">
            {experiment.measurement}
          </div>
        </div>
      </div>

      {/* Result Callout */}
      <div className="p-3 bg-[#0D0F12] border border-[#262E3B] rounded-lg">
        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
          MEASURED OUTCOME
        </div>
        <div className="text-xs font-semibold text-[#F1F5F9]">
          {experiment.result}
        </div>
        {experiment.notes && (
          <div className="text-[11px] text-[#94A3B8] mt-1 font-sans">
            {experiment.notes}
          </div>
        )}
      </div>
    </div>
  );
}
