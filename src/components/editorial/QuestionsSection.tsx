"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RESEARCH_QUESTIONS } from "@/data/portfolioContent";

interface QuestionsSectionProps {
  onSelectProject?: (slug: string) => void;
}

export function QuestionsSection({ onSelectProject }: QuestionsSectionProps) {
  return (
    <section id="questions" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D8D6CD] pb-4 mb-10">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider">
            INVESTIGATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1">
            Questions I&apos;m Chasing
          </h2>
        </div>
        <div className="font-mono text-xs text-[#666666]">
          [ 06 ACTIVE RESEARCH INQUIRIES ]
        </div>
      </div>

      {/* Grid of Research Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESEARCH_QUESTIONS.map((item, index) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between p-6 bg-[#FFFFFF] border border-[#D8D6CD] rounded-xl hover:border-[#111111] hover:shadow-md transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#888888]">
                <span>{item.id}</span>
                <span className="text-[11px] text-[#D94431] font-semibold uppercase">{item.domain}</span>
              </div>

              <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#D94431] transition-colors leading-snug">
                &ldquo;{item.question}&rdquo;
              </h3>

              <p className="text-xs text-[#555555] leading-relaxed pt-1">
                {item.context}
              </p>
            </div>

            {/* Related Project Link */}
            <div className="pt-6 mt-4 border-t border-[#EAE8DF] flex items-center justify-between font-mono text-xs text-[#666666] group-hover:text-[#111111]">
              <span className="truncate pr-2">{item.relatedTitle}</span>
              {item.relatedSlug.startsWith("http") ? (
                <a
                  href={item.relatedSlug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#D94431] shrink-0"
                >
                  <span>EXPLORE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link
                  href={`/work/${item.relatedSlug}`}
                  className="flex items-center gap-1 hover:text-[#D94431] shrink-0"
                >
                  <span>INVESTIGATE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
