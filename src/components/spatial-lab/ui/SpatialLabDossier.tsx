"use client";

import React from "react";
import { StreetProjectDef } from "../types";
import { Github, X, CheckCircle2, ArrowRight } from "lucide-react";
import { sounds } from "@/components/audio/SoundSystem";

interface SpatialLabDossierProps {
  project: StreetProjectDef | null;
  onClose: () => void;
}

export function SpatialLabDossier({ project, onClose }: SpatialLabDossierProps) {
  if (!project) return null;

  return (
    <aside aria-label="Project Architectural Dossier" className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#070C15]/95 backdrop-blur-xl border-l border-[#334155] p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto pointer-events-auto">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
          <span className="text-xs font-mono text-[#FF6A2A] uppercase tracking-wider font-semibold">
            {project.domain}
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1 rounded hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
            title="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Badge */}
        <div className="mt-4 mb-3">
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#0E1626] border border-[#334155] text-[#FFC84A] mb-2">
            {project.badge}
          </span>
          <h2 className="text-3xl font-black font-mono text-[#F1F5F9]">
            {project.title}
          </h2>
        </div>

        {/* Core Engineering Question */}
        <div className="space-y-3 mb-6">
          <div className="p-3.5 rounded bg-[#0E1626] border border-[#1E293B]">
            <div className="text-[10px] font-mono text-[#FF6A2A] uppercase font-semibold">
              CORE ENGINEERING QUESTION
            </div>
            <div className="text-xs font-mono text-[#CBD5E1] mt-1 leading-relaxed">
              {project.question}
            </div>
          </div>

          <div className="p-3.5 rounded bg-[#0E1626] border border-[#1E293B]">
            <div className="text-[10px] font-mono text-[#43D8FF] uppercase font-semibold">
              PHYSICAL CONSTRAINT
            </div>
            <div className="text-xs font-mono text-[#CBD5E1] mt-1 leading-relaxed">
              {project.constraint}
            </div>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="space-y-2.5 mb-6">
          <div className="text-xs font-mono text-[#CBD5E1] uppercase tracking-wider font-semibold">
            PHYSICAL ARCHITECTURE LAYERS
          </div>
          {project.implementation.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-[#94A3B8]">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-[#1E293B] flex flex-col gap-2.5">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded bg-[#FF6A2A] hover:bg-[#EA580C] text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#FF6A2A]/20"
          >
            <Github className="w-4 h-4" /> VIEW VERIFIED GITHUB
          </a>
        )}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="w-full py-2 rounded border border-[#334155] text-[#94A3B8] hover:text-[#F1F5F9] font-mono text-xs transition-colors"
        >
          REASSEMBLE CHASSIS & CONTINUE
        </button>
      </div>
    </aside>
  );
}
