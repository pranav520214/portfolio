"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FLAGSHIP_PROJECTS } from "@/data/portfolioContent";
import { FlagshipProjectCard } from "./FlagshipProjectCard";
import { Layers } from "lucide-react";

const ExplodedViewVisualizer = dynamic(
  () => import("@/components/hardware/ExplodedViewVisualizer").then((mod) => mod.ExplodedViewVisualizer),
  { ssr: false }
);

export function ProjectsSection() {
  return (
    <section id="work" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D8D6CD] pb-4 mb-12">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>PRIMARY CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1">
            Selected Work
          </h2>
        </div>
        <div className="font-mono text-xs text-[#666666]">
          [ 03 FLAGSHIPS + 01 AEROSPACE RESEARCH MODEL ]
        </div>
      </div>

      {/* Flagship Projects Stack */}
      <div className="space-y-12">
        {FLAGSHIP_PROJECTS.map((project, idx) => (
          <FlagshipProjectCard
            key={project.slug}
            project={project}
            defaultExpanded={idx === 0}
          />
        ))}
      </div>

      {/* Subsystem Hardware & Core Architecture Visualizer */}
      <div className="mt-16 pt-8 border-t border-[#D8D6CD]">
        <ExplodedViewVisualizer />
      </div>
    </section>
  );
}
