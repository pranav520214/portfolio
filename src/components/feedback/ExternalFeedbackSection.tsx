"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EXTERNAL_FEEDBACK, ExternalFeedbackItem } from "@/data/portfolioContent";
import { MessageSquare, ArrowUpRight, X, FileText, CheckCircle2 } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { AccessibleModal } from "../ui/AccessibleModal";

export function ExternalFeedbackSection() {
  const [activeProof, setActiveProof] = useState<ExternalFeedbackItem | null>(null);

  return (
    <section id="feedback" className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[rgba(255,255,255,0.08)] pb-5 mb-10">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>EXTERNAL APPRAISALS & RESEARCH CRITIQUE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9] mt-1">
            External Review & Critique
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94A3B8] bg-[#121620] border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full">
          CRITIQUE AS AN ENGINE FOR REFINEMENT
        </div>
      </div>

      {/* Core Principle Quote */}
      <div className="mb-12 max-w-2xl space-y-2">
        <p className="text-xl sm:text-2xl font-bold text-[#F1F5F9] leading-snug">
          &ldquo;I send unfinished work to people who know more than I do.&rdquo;
        </p>
        <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
          Unchecked intuition breeds blind spots. External review from aerospace researchers and university engineering faculty provides rigorous technical critique to challenge assumptions and restructure system models.
        </p>
      </div>

      {/* Feedback Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {EXTERNAL_FEEDBACK.map((fb) => (
          <div
            key={fb.id}
            className="bg-[#121620] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 hover:border-[#D94431]/60 transition-all duration-200"
          >
            <div className="space-y-5">
              {/* Header Info */}
              <div className="border-b border-[rgba(255,255,255,0.06)] pb-4 space-y-1">
                <div className="font-mono text-[11px] text-[#D94431] font-bold uppercase tracking-wider">
                  {fb.source}
                </div>
                <div className="font-bold text-xl text-[#F1F5F9]">
                  {fb.reviewer}
                </div>
                <div className="text-xs text-[#94A3B8] font-mono">
                  {fb.role} • <span className="text-[#F59E0B] font-semibold">{fb.project}</span>
                </div>
              </div>

              {/* Feedback Received */}
              <div className="space-y-1.5">
                <div className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                  TECHNICAL CRITIQUE / EVALUATION //
                </div>
                <p className="text-sm text-[#F1F5F9] leading-relaxed font-sans bg-[#0D0F14] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
                  {fb.feedbackSummary}
                </p>
              </div>

              {/* What Changed */}
              <div className="space-y-1.5 bg-[#161B26] p-4 rounded-xl border border-[rgba(255,255,255,0.06)]">
                <div className="font-mono text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                  WHAT I REFACTORED IN RESPONSE //
                </div>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-sans">
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
                  className="w-full flex items-center justify-between font-mono text-xs text-[#F1F5F9] hover:text-[#D94431] bg-[#0D0F14] hover:bg-[#161B26] border border-[rgba(255,255,255,0.08)] hover:border-[#D94431]/60 px-4 py-3 rounded-xl transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#D94431]" />
                    <span>INSPECT PRIMARY CORRESPONDENCE RECORD</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <AccessibleModal
        isOpen={!!(activeProof && activeProof.proofImage)}
        onClose={() => setActiveProof(null)}
        title={activeProof ? `DOCUMENT RECORD // ${activeProof.reviewer}` : ""}
      >
        {activeProof && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="text-base font-bold text-[#F1F5F9] mt-0.5 border-b border-[rgba(255,255,255,0.08)] pb-4">
              {activeProof.project}
            </div>

            <div className="relative aspect-[4/3] w-full bg-[#07080A] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
              <Image
                src={activeProof.proofImage || ""}
                alt={`Primary feedback record from ${activeProof.reviewer}`}
                fill
                className="object-contain"
              />
            </div>

            <div className="text-xs font-mono text-[#94A3B8] bg-[#0D0F14] p-4 rounded-xl border border-[rgba(255,255,255,0.06)] leading-relaxed">
              <strong className="text-[#F1F5F9]">Document Provenance:</strong> Formal technical correspondence preserved for scientific audit and prototype traceability. No institutional endorsement or affiliation is claimed or implied.
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveProof(null)}
                className="font-mono text-xs bg-[#D94431] text-white hover:bg-[#FF4D36] px-5 py-2.5 rounded-xl transition-colors font-bold"
              >
                [ CLOSE DOCUMENT ]
              </button>
            </div>
          </div>
        )}
      </AccessibleModal>
    </section>
  );
}
