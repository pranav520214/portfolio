"use client";

import React from "react";
import { FailureAutopsy } from "@/data/portfolioContent";
import { AlertTriangle, Wrench, CheckCircle2 } from "lucide-react";

interface WhatBrokeCardProps {
  failure: FailureAutopsy;
}

export function WhatBrokeCard({ failure }: WhatBrokeCardProps) {
  return (
    <div className="bg-[#FFFFFF] border-l-4 border-l-[#D94431] border border-[#D8D6CD] rounded-r-xl p-5 sm:p-6 font-mono text-xs space-y-4 shadow-sm text-[#111111]">
      <div className="flex items-center justify-between border-b border-[#EAE8DF] pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#D94431]" />
          <span className="font-bold text-[#D94431] text-[11px] uppercase tracking-wider">
            WHAT BROKE // {failure.id}
          </span>
        </div>
        <span className="font-bold text-xs text-[#111111]">
          {failure.title}
        </span>
      </div>

      <div className="space-y-3 font-sans text-xs sm:text-sm">
        <div className="space-y-1">
          <div className="font-mono text-[10px] font-bold text-[#888888] uppercase tracking-wider flex items-center gap-1.5">
            <span>CAUSE OF FAILURE</span>
          </div>
          <p className="text-[#444444] leading-relaxed">
            {failure.cause}
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-mono text-[10px] font-bold text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
            <Wrench className="w-3 h-3 text-[#D94431]" />
            <span>ENGINEERING CHANGE IMPLEMENTED</span>
          </div>
          <p className="text-[#111111] font-mono text-xs bg-[#FAF9F5] p-2.5 rounded border border-[#EAE8DF]">
            {failure.change}
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-mono text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>MEASURED RESULT AFTER FIX</span>
          </div>
          <p className="text-emerald-950 font-medium">
            {failure.result}
          </p>
        </div>
      </div>
    </div>
  );
}
