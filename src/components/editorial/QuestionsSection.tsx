"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { RESEARCH_QUESTIONS } from "@/data/portfolioContent";
import { sounds } from "../audio/SoundSystem";

export function QuestionsSection() {
  return (
    <section id="research" className="w-full py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6 mb-20">
        <div>
          <div className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-widest flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#ff5a36]" />
            <span>ACTIVE RESEARCH INQUIRIES // FIRST PRINCIPLES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#f2f2ed] mt-2">
            Questions I&apos;m Chasing
          </h2>
        </div>
        <p className="text-sm font-sans text-[#a5acb8] max-w-md">
          Engineering begins with honest, open questions about latency, physical dynamics, and memory limits.
        </p>
      </div>

      {/* Editorial Questions Sequence */}
      <div className="space-y-20 sm:space-y-24">
        {RESEARCH_QUESTIONS.map((q, idx) => {
          const numStr = (idx + 1).toString().padStart(2, "0");

          return (
            <div
              key={q.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 pb-16 border-b border-white/10 last:border-b-0"
            >
              {/* Index Column */}
              <div className="lg:col-span-2">
                <span className="font-mono text-3xl sm:text-4xl font-black text-[#ff5a36]">
                  {numStr}
                </span>
                <span className="block font-mono text-[11px] text-[#6b7280] uppercase tracking-wider mt-1">
                  {q.domain}
                </span>
              </div>

              {/* Question & Context Column */}
              <div className="lg:col-span-10 space-y-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#f2f2ed] leading-snug">
                  &ldquo;{q.question}&rdquo;
                </h3>

                <p className="text-base sm:text-lg text-[#a5acb8] font-sans leading-relaxed max-w-3xl">
                  {q.context}
                </p>

                {/* Related Project Direct Link */}
                <div className="pt-2">
                  <Link
                    href={`/work/${q.relatedSlug}`}
                    onClick={() => sounds.playClick()}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#35d9ff] hover:text-[#ff5a36] transition-colors group cursor-pointer"
                  >
                    <span>EXPLORE RELATED PROJECT &bull; {q.relatedTitle}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

