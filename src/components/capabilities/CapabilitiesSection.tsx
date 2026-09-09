"use client";

import React from "react";
import { CAPABILITIES } from "@/data/portfolioContent";
import { Cpu, Terminal, Laptop, Activity, CheckCircle2 } from "lucide-react";

export function CapabilitiesSection() {
  const getIcon = (category: string) => {
    switch (category) {
      case "LOCAL AI":
        return <Terminal className="w-4 h-4 text-[#F59E0B]" />;
      case "DESKTOP SYSTEMS":
        return <Laptop className="w-4 h-4 text-[#F59E0B]" />;
      case "EMBEDDED ENGINEERING":
        return <Cpu className="w-4 h-4 text-[#F59E0B]" />;
      case "SIMULATION":
        return <Activity className="w-4 h-4 text-[#F59E0B]" />;
      default:
        return <Cpu className="w-4 h-4 text-[#F59E0B]" />;
    }
  };

  return (
    <section id="capabilities" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#262E3B]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#262E3B] pb-4 mb-10">
        <div>
          <div className="font-mono text-xs text-[#F59E0B] font-semibold uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>AUTHENTIC TECHNICAL PROFICIENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9] mt-1">
            Capabilities
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94A3B8] bg-[#14171E] border border-[#262E3B] px-3 py-1 rounded-full">
          04 VERIFIED DOMAINS // NO ARBITRARY BARS
        </div>
      </div>

      {/* 4 Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAPABILITIES.map((cap) => (
          <div
            key={cap.category}
            className="bg-[#14171E] border border-[#262E3B] rounded-2xl p-6 shadow-sm space-y-5 flex flex-col justify-between hover:border-[#3D485C] transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#262E3B]">
                <div className="flex items-center gap-2">
                  {getIcon(cap.category)}
                  <span className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                    {cap.category}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#F59E0B] bg-[#1C212B] px-2 py-0.5 rounded border border-[#262E3B]">
                  {cap.label}
                </span>
              </div>

              <p className="text-sm text-[#94A3B8] font-sans leading-relaxed">
                {cap.description}
              </p>

              {/* Verified skills tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cap.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] bg-[#1C212B] text-[#F1F5F9] px-2 py-0.5 rounded border border-[#262E3B]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Implementation details */}
            <div className="space-y-2.5 pt-4 border-t border-[#262E3B] text-xs font-mono">
              <div className="text-[10px] uppercase text-[#64748B] font-bold tracking-wider">
                PROVEN ACROSS PROJECTS:
              </div>
              <div className="space-y-2">
                {cap.items.map((item) => (
                  <div key={item.name} className="p-2.5 rounded-lg bg-[#0D0F12] border border-[#262E3B] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F1F5F9]">{item.name}</span>
                      <span className="text-[10px] text-[#F59E0B]">{item.role}</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] font-sans leading-relaxed">
                      {item.application}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
