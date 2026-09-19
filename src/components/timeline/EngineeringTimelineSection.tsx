"use client";

import React, { useState } from "react";
import { GitCommit, Calendar, ArrowUpRight, Cpu, Layers } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { TIMELINE_ENTRIES } from "@/data/portfolioContent";

export function EngineeringTimelineSection() {
  const [filter, setFilter] = useState<"ALL" | "SYSTEMS" | "RESEARCH" | "MILESTONES">("ALL");

  const filteredEntries = TIMELINE_ENTRIES.filter((item) => {
    if (filter === "SYSTEMS") return item.type === "system" || item.type === "firmware";
    if (filter === "RESEARCH") return item.type === "research";
    if (filter === "MILESTONES") return item.type === "milestone";
    return true;
  });

  return (
    <section id="timeline" className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[rgba(255,255,255,0.08)] pb-5 mb-10">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <GitCommit className="w-3.5 h-3.5" />
            <span>CHRONOLOGICAL BUILD HISTORY & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9] mt-1">
            Engineering Timeline
          </h2>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 font-mono text-xs bg-[#121620] p-1 rounded-xl border border-[rgba(255,255,255,0.08)]">
          {(["ALL", "SYSTEMS", "RESEARCH", "MILESTONES"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sounds.playClick();
                setFilter(cat);
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === cat
                  ? "bg-[#D94431] text-white font-bold"
                  : "text-[#94A3B8] hover:text-[#F1F5F9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l border-[rgba(255,255,255,0.1)] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
        {filteredEntries.map((item, index) => (
          <div key={index} className="relative group">
            {/* Timeline Node Icon Indicator */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#121620] border-2 border-[#D94431] group-hover:bg-[#FF4D36] group-hover:scale-125 transition-all shadow-[0_0_8px_#D94431]" />

            <div className="bg-[#121620] border border-[rgba(255,255,255,0.08)] hover:border-[#D94431]/60 rounded-2xl p-6 sm:p-7 shadow-lg transition-all duration-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#D94431] font-bold">{item.period}</span>
                  <span className="text-[#64748B]">•</span>
                  <span className="bg-[#161B26] text-[#F59E0B] px-2 py-0.5 rounded border border-[rgba(255,255,255,0.08)] font-bold text-[10px] uppercase">
                    {item.tag}
                  </span>
                </div>
                <span className="text-[#94A3B8] text-[11px]">{item.domain}</span>
              </div>

              <h3 className="text-xl font-bold text-[#F1F5F9] group-hover:text-[#FF4D36] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
                {item.description}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[rgba(255,255,255,0.05)]">
                <div className="font-mono text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-800/30 px-3 py-1 rounded-lg">
                  <strong>Outcome:</strong> {item.outcome}
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-1 font-mono text-xs text-[#F59E0B] hover:text-[#FF4D36] font-bold shrink-0 self-start sm:self-auto"
                  >
                    <span>INSPECT ARTIFACT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
