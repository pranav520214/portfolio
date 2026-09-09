"use client";

import React, { useState } from "react";
import { ACHIEVEMENTS, Achievement } from "@/data/portfolioData";
import { ProofModal } from "./ProofModal";
import { ShieldCheck, Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

export function AchievementsTimeline() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-comic-yellow bg-blueprint-900/80 border border-comic-yellow/30 px-3 py-1 rounded mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>07 // EXTERNAL VALIDATION & RECOGNITION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-technical-white tracking-tight">
          MISSION RECORD <span className="text-comic-yellow">& EVIDENCE LOG</span>
        </h2>
        <p className="mt-2 text-sm sm:text-base text-technical-cream/80 max-w-2xl">
          Verified milestones, national competition ranks, and institutional feedback from ISRO, IIT Delhi, 
          and researchers. Click any log entry to view the full-resolution primary certificate proof.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-comic-yellow/30 ml-3 sm:ml-6 space-y-6 sm:space-y-8">
        {ACHIEVEMENTS.map((ach) => (
          <div
            key={ach.id}
            onClick={() => {
              sounds.playTargetLock();
              setSelectedAchievement(ach);
            }}
            data-cursor="zoom"
            className="relative pl-6 sm:pl-10 group cursor-pointer"
          >
            {/* Timeline Marker Node */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blueprint-950 border-2 border-comic-yellow group-hover:scale-125 group-hover:bg-comic-yellow transition-all duration-200" />

            {/* Achievement Card */}
            <div className="bg-blueprint-900/80 hover:bg-blueprint-850 border-2 border-comic-yellow/40 hover:border-comic-yellow p-5 sm:p-6 rounded-xl shadow-comic transition-all duration-200 backdrop-blur">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-comic-yellow/20 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-comic-yellow bg-blueprint-950 px-2.5 py-0.5 rounded border border-comic-yellow/30">
                    {ach.code}
                  </span>
                  <span className="font-mono text-xs text-technical-cream/70 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-comic-yellow" />
                    <span>{ach.date}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED PROOF</span>
                  </span>
                  <span className="font-mono text-xs text-comic-yellow group-hover:underline flex items-center gap-1">
                    <span>VIEW [ {ach.proofId} ]</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-technical-white group-hover:text-comic-yellow transition-colors tracking-tight">
                {ach.title}
              </h3>

              <div className="font-mono text-xs text-comic-yellow/90 mt-1">
                ORGANIZER: {ach.organizer}
              </div>

              <p className="text-xs sm:text-sm text-technical-cream/90 mt-2 font-medium">
                {ach.outcome}
              </p>

              <p className="text-xs text-technical-cream/70 mt-1 leading-relaxed">
                {ach.highlight}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Proof Document Viewer Modal */}
      <ProofModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
}
