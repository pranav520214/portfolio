"use client";

import React from "react";
import dynamic from "next/dynamic";
import { FLAGSHIP_PROJECTS } from "@/data/portfolioContent";
import { FlagshipProjectCard } from "./FlagshipProjectCard";
import { Layers, ShieldAlert, Cpu } from "lucide-react";

const ExplodedViewVisualizer = dynamic(
  () => import("@/components/hardware/ExplodedViewVisualizer").then((mod) => mod.ExplodedViewVisualizer),
  { ssr: false }
);

export function ProjectsSection() {
  return (
    <section id="work" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#262E3B]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#262E3B] pb-5 mb-12">
        <div>
          <div className="font-mono text-xs text-[#F59E0B] font-semibold uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" />
            <span>PRIMARY REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9] mt-1">
            Selected Work
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94A3B8] bg-[#14171E] border border-[#262E3B] px-3 py-1 rounded-full">
          05 VERIFIED PUBLIC PROJECTS
        </div>
      </div>

      {/* Projects Stack */}
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
      <div className="mt-16 pt-8 border-t border-[#262E3B]">
        <div className="mb-6">
          <div className="font-mono text-xs text-[#F59E0B] font-semibold uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>INTERACTIVE HARDWARE BREAKDOWN</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F1F5F9] mt-1">
            Avionics & Firmware Architecture
          </h3>
          <p className="text-sm text-[#94A3B8] mt-1">
            Exploded 3D layer inspection of the ESP32 microcontroller, MPU6500 IMU bus, and servo PWM interfaces.
          </p>
        </div>
        <ExplodedViewVisualizer />
      </div>
    </section>
  );
}
