"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MILESTONES, MilestoneItem } from "@/data/portfolioContent";
import { Award, Calendar, FileCheck, X, ArrowUpRight } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

export function MilestonesSection() {
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);

  const recognitionItems = MILESTONES.filter((m) => m.category === "recognition");
  const programItems = MILESTONES.filter((m) => m.category === "program");

  return (
    <section id="milestones" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D8D6CD] pb-4 mb-10">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <Award className="w-3.5 h-3.5" />
            <span>MILESTONES & RECORDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1">
            Milestones
          </h2>
        </div>
        <div className="font-mono text-xs text-[#666666]">
          [ DOCUMENTARY RECORD OF EVALUATIONS & PROGRAMS ]
        </div>
      </div>

      {/* Part 1: Selected Recognition (Prominent Editorial Cards) */}
      <div className="space-y-4 mb-12">
        <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
          SELECTED RECOGNITION //
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recognitionItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.proofImage) {
                  sounds.playClick();
                  setSelectedMilestone(item);
                }
              }}
              className="cursor-pointer bg-[#FFFFFF] border-2 border-[#111111] rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#888888] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D94431]" />
                    <span>{item.date}</span>
                  </span>
                  <span className="text-[#D94431] font-bold text-[10px] uppercase bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EAE8DF]">
                    {item.proofId}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#111111] leading-snug">
                  {item.title}
                </h3>

                <div className="font-mono text-xs text-[#555555]">
                  {item.organizer}
                </div>

                <div className="p-2.5 bg-[#FAF9F5] border border-[#EAE8DF] rounded-lg font-mono text-xs font-semibold text-[#111111]">
                  {item.outcome}
                </div>

                <p className="text-xs text-[#555555] leading-relaxed">
                  {item.highlight}
                </p>
              </div>

              {item.proofImage && (
                <div className="pt-4 mt-4 border-t border-[#EAE8DF] flex items-center justify-between font-mono text-xs text-[#666666] hover:text-[#D94431]">
                  <span className="flex items-center gap-1">
                    <FileCheck className="w-3 h-3 text-[#D94431]" />
                    <span>DOCUMENTARY RECORD</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Participation & Programs (Compact Editorial List) */}
      <div className="space-y-4">
        <div className="font-mono text-xs font-bold text-[#666666] uppercase tracking-wider">
          PARTICIPATION & INNOVATION PROGRAMS //
        </div>

        <div className="bg-[#FFFFFF] border border-[#D8D6CD] rounded-2xl overflow-hidden divide-y divide-[#EAE8DF]">
          {programItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.proofImage) {
                  sounds.playClick();
                  setSelectedMilestone(item);
                }
              }}
              className="cursor-pointer p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF9F5] transition-colors"
            >
              <div className="space-y-0.5 sm:max-w-xl">
                <div className="flex items-center gap-3 font-mono text-xs text-[#888888]">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.organizer}</span>
                </div>
                <div className="font-bold text-sm text-[#111111]">
                  {item.title}
                </div>
                <div className="text-xs text-[#666666]">
                  {item.highlight}
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="bg-[#EAE8DF] text-[#111111] px-2 py-0.5 rounded text-[11px] font-medium">
                  {item.outcome}
                </span>
                {item.proofImage && (
                  <span className="text-[#D94431] flex items-center gap-0.5 hover:underline">
                    <span>RECORD</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Proof Inspection Modal */}
      {selectedMilestone && selectedMilestone.proofImage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] border border-[#111111] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4 text-[#111111]">
            <div className="flex items-center justify-between border-b border-[#D8D6CD] pb-3">
              <div>
                <div className="font-mono text-xs font-bold text-[#D94431]">
                  RECORD // {selectedMilestone.proofId || "DOC"}
                </div>
                <div className="text-base font-bold text-[#111111]">
                  {selectedMilestone.title}
                </div>
                <div className="font-mono text-xs text-[#666666]">
                  {selectedMilestone.organizer}
                </div>
              </div>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="p-1 text-[#666666] hover:text-[#111111]"
                aria-label="Close document"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full bg-black rounded-lg overflow-hidden border border-[#D8D6CD]">
              <Image
                src={selectedMilestone.proofImage}
                alt={selectedMilestone.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedMilestone(null)}
                className="font-mono text-xs bg-[#111111] text-[#F5F4EF] hover:bg-[#D94431] px-4 py-2 rounded transition-colors"
              >
                [ CLOSE DOCUMENT ]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
