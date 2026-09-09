"use client";

import React from "react";
import { ARCHIVE_PROJECTS } from "@/data/portfolioContent";
import { Archive, ExternalLink } from "lucide-react";

export function ExperimentArchiveSection() {
  return (
    <section id="archive" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D8D6CD] pb-4 mb-8">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <Archive className="w-3.5 h-3.5" />
            <span>SECTION 05 // COMPACT REPOSITORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1">
            Experiment Archive
          </h2>
        </div>
        <div className="font-mono text-xs text-[#666666]">
          [ SECONDARY PROTOTYPES & PROOFS OF CONCEPT ]
        </div>
      </div>

      {/* Editorial Table */}
      <div className="bg-[#FFFFFF] border border-[#D8D6CD] rounded-2xl overflow-hidden shadow-sm">
        <div className="divide-y divide-[#EAE8DF]">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#FAF9F5] font-mono text-[11px] font-bold text-[#888888] uppercase tracking-wider">
            <div className="col-span-1">YEAR</div>
            <div className="col-span-3">PROJECT</div>
            <div className="col-span-5">CORE QUESTION & SUMMARY</div>
            <div className="col-span-2">DOMAIN</div>
            <div className="col-span-1 text-right">STATUS</div>
          </div>

          {/* Rows */}
          {ARCHIVE_PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 items-center hover:bg-[#FAF9F5] transition-colors text-xs"
            >
              {/* Year */}
              <div className="font-mono text-xs text-[#888888] md:col-span-1">
                {proj.year}
              </div>

              {/* Title & Link */}
              <div className="md:col-span-3 font-semibold text-[#111111] text-sm flex items-center gap-2">
                <span>{proj.title}</span>
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#666666] hover:text-[#D94431]"
                    title="View Source on GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Question & Summary */}
              <div className="md:col-span-5 space-y-1">
                <div className="font-medium text-[#111111]">
                  &ldquo;{proj.question}&rdquo;
                </div>
                <div className="text-[11px] text-[#666666] leading-relaxed">
                  {proj.summary}
                </div>
              </div>

              {/* Domain */}
              <div className="md:col-span-2 font-mono text-[11px] text-[#555555]">
                {proj.domain}
              </div>

              {/* Status */}
              <div className="md:col-span-1 md:text-right font-mono">
                <span className="bg-[#EAE8DF] text-[#111111] px-2 py-0.5 rounded text-[10px] font-bold">
                  {proj.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
