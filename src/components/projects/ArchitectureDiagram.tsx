"use client";

import React from "react";
import { ArchitectureNode } from "@/data/portfolioContent";

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  slug: string;
}

export function ArchitectureDiagram({ nodes, slug }: ArchitectureDiagramProps) {
  return (
    <div className="w-full bg-[#0E0E0E] text-[#F5F4EF] p-5 sm:p-6 rounded-xl border border-neutral-800 font-mono text-xs overflow-x-auto">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800 text-[11px] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D94431]" />
          <span>SYSTEM DATAFLOW ARCHITECTURE // {slug.toUpperCase()}</span>
        </div>
        <div className="text-[10px] text-neutral-500">
          CLOSED-LOOP PIPELINE
        </div>
      </div>

      {/* Responsive Horizontal / Vertical Node Flow */}
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
                    ? "bg-[#1C1615] border-[#D94431]/60 text-white"
                    : isInput
                    ? "bg-[#141414] border-neutral-700 text-neutral-200"
                    : isOutput
                    ? "bg-[#111A13] border-emerald-500/50 text-emerald-100"
                    : "bg-[#141414] border-neutral-800 text-neutral-300"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                  <span>0{index + 1} // {node.type.toUpperCase()}</span>
                  {isDecision && <span className="text-[#D94431] font-bold">GATE</span>}
                  {isOutput && <span className="text-emerald-400 font-bold">OUTPUT</span>}
                </div>
                <div className="font-bold text-xs sm:text-sm text-[#F5F4EF] leading-tight">
                  {node.label}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 leading-snug">
                  {node.sublabel}
                </div>
              </div>

              {/* Arrow Connector */}
              {!isLast && (
                <div className="hidden lg:flex items-center justify-center text-neutral-500 px-1 text-base font-sans select-none">
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
