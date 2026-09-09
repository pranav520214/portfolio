"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EXTERNAL_FEEDBACK, ExternalFeedbackItem } from "@/data/portfolioContent";
import { MessageSquare, ArrowUpRight, X, FileText } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

export function ExternalFeedbackSection() {
  const [activeProof, setActiveProof] = useState<ExternalFeedbackItem | null>(null);

  return (
    <section id="feedback" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D8D6CD] pb-4 mb-8">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>SECTION 06 // PEER CRITIQUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1">
            External Feedback
          </h2>
        </div>
        <div className="font-mono text-xs text-[#666666]">
          [ CRITIQUE AS AN ENGINE FOR REFINEMENT ]
        </div>
      </div>

      {/* Core Principle Quote */}
      <div className="mb-10 max-w-2xl">
        <p className="text-lg sm:text-xl font-semibold text-[#111111] leading-snug">
          &ldquo;I send unfinished work to people who know more than I do.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-[#555555] mt-1.5 leading-relaxed">
          Unchecked intuition leads to blind spots. External review from active researchers and engineers provides the rigorous critique required to challenge assumptions and restructure system architectures.
        </p>
      </div>

      {/* Feedback Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXTERNAL_FEEDBACK.map((fb) => (
          <div
            key={fb.id}
            className="bg-[#FFFFFF] border border-[#D8D6CD] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Header Info */}
              <div className="border-b border-[#EAE8DF] pb-3 space-y-1">
                <div className="font-mono text-[10px] text-[#D94431] font-bold uppercase tracking-wider">
                  {fb.source}
                </div>
                <div className="font-bold text-base text-[#111111]">
                  {fb.reviewer}
                </div>
                <div className="text-xs text-[#666666] font-mono">
                  {fb.role} • <span className="text-[#111111]">{fb.project}</span>
                </div>
              </div>

              {/* Feedback Received */}
              <div className="space-y-1.5">
                <div className="font-mono text-[10px] font-bold text-[#888888] uppercase tracking-wider">
                  CRITIQUE / ADVICE RECEIVED
                </div>
                <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                  {fb.feedbackSummary}
                </p>
              </div>

              {/* What Changed */}
              <div className="space-y-1.5 bg-[#FAF9F5] p-3.5 rounded-lg border border-[#EAE8DF]">
                <div className="font-mono text-[10px] font-bold text-[#111111] uppercase tracking-wider">
                  WHAT I CHANGED AS A RESULT
                </div>
                <p className="text-xs text-[#222222] font-mono leading-relaxed">
                  {fb.whatPranavChanged}
                </p>
              </div>
            </div>

            {/* Proof Inspection Button */}
            {fb.proofImage && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveProof(fb);
                  }}
                  className="w-full flex items-center justify-between font-mono text-xs text-[#111111] hover:text-[#D94431] border border-[#D8D6CD] hover:border-[#111111] px-3 py-2 rounded-lg transition-colors bg-[#FAF9F5]"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#D94431]" />
                    <span>INSPECT PRIMARY RECORD</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Primary Record Modal */}
      {activeProof && activeProof.proofImage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF9F5] border border-[#111111] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4 text-[#111111]">
            <div className="flex items-center justify-between border-b border-[#D8D6CD] pb-3">
              <div>
                <div className="font-mono text-xs font-bold text-[#D94431]">
                  PRIMARY DOCUMENT RECORD // {activeProof.reviewer}
                </div>
                <div className="text-sm font-bold text-[#111111]">
                  {activeProof.project}
                </div>
              </div>
              <button
                onClick={() => setActiveProof(null)}
                className="p-1 text-[#666666] hover:text-[#111111]"
                aria-label="Close document"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full bg-black rounded-lg overflow-hidden border border-[#D8D6CD]">
              <Image
                src={activeProof.proofImage}
                alt={`Primary feedback record from ${activeProof.reviewer}`}
                fill
                className="object-contain"
              />
            </div>

            <div className="text-xs font-mono text-[#666666] bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D6CD]">
              <strong>Note:</strong> Primary correspondence preserved for research provenance and technical documentation.
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveProof(null)}
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
