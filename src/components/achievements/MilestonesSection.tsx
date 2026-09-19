"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MILESTONES, MilestoneItem } from "@/data/portfolioContent";
import { Award, Calendar, FileCheck } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { AccessibleModal } from "../ui/AccessibleModal";

export function MilestonesSection() {
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);

  return (
    <section id="milestones" className="w-full py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6 mb-16">
          <div>
            <div className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4 text-[#ff5a36]" />
              <span>TIMELINE &amp; VERIFIED RECORDS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#f2f2ed] mt-2">
              Milestones &amp; Evidence
            </h2>
          </div>
          <p className="text-sm font-sans text-[#a5acb8] max-w-sm">
            Chronological documentation of awards, competitive hackathon outcomes, and verified institutional recognitions.
          </p>
        </div>

        {/* Clean Dark Vertical Timeline */}
        <div className="relative border-l border-white/15 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {MILESTONES.map((item) => (
            <div
              key={item.id}
              className="relative group"
            >
              {/* Timeline Pin Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#070708] border-2 border-[#ff5a36] group-hover:scale-125 transition-transform shadow-[0_0_10px_#ff5a36]" />

              {/* Minimal Dark Card */}
              <div className="bg-[#111318] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl hover:border-[#ff5a36]/40 transition-all duration-300 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/05 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#a5acb8]">
                    <Calendar className="w-3.5 h-3.5 text-[#ff5a36]" />
                    <span className="font-bold text-[#f2f2ed]">{item.date}</span>
                    <span>&bull;</span>
                    <span className="text-[#a5acb8]">{item.organizer}</span>
                  </div>

                  <span className="font-mono text-[10px] text-[#ff5a36] bg-[#ff5a36]/10 px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    {item.proofId || "VERIFIED"}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#f2f2ed] group-hover:text-[#ff5a36] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm font-semibold text-[#35d9ff] font-mono">
                  {item.outcome}
                </p>

                <p className="text-sm text-[#a5acb8] font-sans leading-relaxed">
                  {item.highlight}
                </p>

                {item.proofImage && (
                  <div className="pt-3 border-t border-white/05">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setSelectedMilestone(item);
                      }}
                      className="inline-flex items-center gap-2 font-mono text-xs text-[#ff5a36] hover:text-[#ff6f4e] font-bold cursor-pointer"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>VIEW VERIFIED DOCUMENTARY PROOF &rarr;</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proof Modal */}
      <AccessibleModal
        isOpen={!!selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        title={selectedMilestone?.proofTitle || selectedMilestone?.title || "Verification Proof"}
      >
        {selectedMilestone && (
          <div className="space-y-4 font-sans text-[#f2f2ed]">
            <div className="flex items-center justify-between text-xs font-mono text-[#a5acb8] border-b border-white/10 pb-2">
              <span>{selectedMilestone.date}</span>
              <span className="text-[#ff5a36] font-bold">{selectedMilestone.organizer}</span>
            </div>

            <p className="text-sm text-[#a5acb8]">{selectedMilestone.outcome}</p>

            {selectedMilestone.proofImage && (
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#070708]">
                <Image
                  src={selectedMilestone.proofImage}
                  alt={selectedMilestone.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}
          </div>
        )}
      </AccessibleModal>
    </section>
  );
}

