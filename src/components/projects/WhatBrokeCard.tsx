"use client";

import React from "react";
import { FailureAutopsy } from "@/data/portfolioContent";
import { AlertTriangle, Wrench, CheckCircle2 } from "lucide-react";

interface WhatBrokeCardProps {
  failure: FailureAutopsy;
}

export function WhatBrokeCard({ failure }: WhatBrokeCardProps) {
  return (
    <div className="bg-[#14171E] border-l-4 border-l-[#F59E0B] border border-[#262E3B] rounded-r-xl p-5 sm:p-6 font-mono text-xs space-y-4 shadow-sm text-[#F1F5F9]">
      <div className="flex items-center justify-between border-b border-[#262E3B] pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
          <span className="font-bold text-[#F59E0B] text-[11px] uppercase tracking-wider">
            WHAT BROKE // {failure.id}
          </span>
        </div>
        <span className="font-bold text-xs text-[#F1F5F9]">
          {failure.title}
        </span>
      </div>

      <div className="space-y-3 font-sans text-xs sm:text-sm">
        <div className="space-y-1">
          <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-1.5">
            <span>CAUSE OF FAILURE</span>
          </div>
          <p className="text-[#94A3B8] leading-relaxed">
            {failure.cause}
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-mono text-[10px] font-bold text-[#F1F5F9] uppercase tracking-wider flex items-center gap-1.5">
            <Wrench className="w-3 h-3 text-[#F59E0B]" />
            <span>ENGINEERING CHANGE IMPLEMENTED</span>
          </div>
          <p className="text-[#F1F5F9] font-mono text-xs bg-[#0D0F12] p-2.5 rounded-lg border border-[#262E3B]">
            {failure.change}
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>MEASURED RESULT AFTER FIX</span>
          </div>
          <p className="text-emerald-200 font-medium">
            {failure.result}
          </p>
        </div>
      </div>
    </div>
  );
}
