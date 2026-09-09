"use client";

import React from "react";
import { ArchitectureNode } from "@/data/portfolioContent";

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  slug: string;
}

export function ArchitectureDiagram({ nodes, slug }: ArchitectureDiagramProps) {
  return (
    <div className="w-full bg-[#0D0F12] text-[#F1F5F9] p-5 sm:p-6 rounded-xl border border-[#262E3B] font-mono text-xs overflow-x-auto">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#262E3B] text-[11px] text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span>DATAFLOW ARCHITECTURE // {slug.toUpperCase()}</span>
        </div>
        <div className="text-[10px] text-[#64748B]">
          PIPELINE NODES
        </div>
      </div>

      {/* Responsive Horizontal Node Flow */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 min-w-[700px] lg:min-w-0 py-2">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;
          const isDecision = node.type === "decision";
          const isInput = node.type === "input";
          const isOutput = node.type === "output";

          return (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <div
                className={`flex-1 p-3.5 rounded-lg border transition-all ${
                  isDecision
                    ? "bg-[#1C1A14] border-[#F59E0B]/60 text-[#F1F5F9]"
                    : isInput
                    ? "bg-[#14171E] border-[#262E3B] text-[#F1F5F9]"
                    : isOutput
                    ? "bg-[#111A13] border-emerald-500/50 text-emerald-100"
                    : "bg-[#14171E] border-[#262E3B] text-[#94A3B8]"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-[#64748B] mb-1">
                  <span>0{index + 1} // {node.type.toUpperCase()}</span>
                  {isDecision && <span className="text-[#F59E0B] font-bold">GATE</span>}
                  {isOutput && <span className="text-emerald-400 font-bold">OUTPUT</span>}
                </div>
                <div className="font-bold text-xs sm:text-sm text-[#F1F5F9] leading-tight">
                  {node.label}
                </div>
                <div className="text-[10px] text-[#94A3B8] mt-1 leading-snug">
                  {node.sublabel}
                </div>
              </div>

              {/* Arrow Connector */}
              {!isLast && (
                <div className="hidden lg:flex items-center justify-center text-[#64748B] px-1 text-base font-sans select-none">
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
