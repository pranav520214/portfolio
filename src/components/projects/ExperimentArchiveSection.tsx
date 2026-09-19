"use client";

import React from "react";
import { ARCHIVE_PROJECTS } from "@/data/portfolioContent";
import { Archive, ExternalLink, ShieldCheck } from "lucide-react";

export function ExperimentArchiveSection() {
  return (
    <section id="archive" className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[rgba(255,255,255,0.08)] pb-5 mb-12">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <Archive className="w-3.5 h-3.5" />
            <span>SECONDARY SYSTEMS & EXPERIMENT REPOSITORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9] mt-1">
            Experiment Archive
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94A3B8] bg-[#121620] border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full">
          04 VERIFIED SECONDARY PROGRAMS
        </div>
      </div>

      {/* Instrument Dossier Table */}
      <div className="bg-[#121620] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-[rgba(255,255,255,0.05)]">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-[#0D0F14] font-mono text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider border-b border-[rgba(255,255,255,0.08)]">
            <div className="col-span-1">YEAR</div>
            <div className="col-span-3">PROJECT IDENTIFIER</div>
            <div className="col-span-4">ENGINEERING QUESTION & SUMMARY</div>
            <div className="col-span-2">TECHNICAL DOMAIN</div>
            <div className="col-span-1">STATUS</div>
            <div className="col-span-1 text-right">INSPECT</div>
          </div>

          {/* Rows */}
          {ARCHIVE_PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 items-center hover:bg-[#161B26] transition-colors text-xs"
            >
              {/* Year */}
              <div className="font-mono text-xs text-[#D94431] font-bold md:col-span-1">
                {proj.year}
              </div>

              {/* Title */}
              <div className="md:col-span-3 font-bold text-[#F1F5F9] text-sm">
                {proj.title}
              </div>

              {/* Question / Purpose */}
              <div className="md:col-span-4 space-y-1.5">
                <div className="font-semibold text-[#F1F5F9] font-sans">
                  &ldquo;{proj.question}&rdquo;
                </div>
                <div className="text-[11px] text-[#94A3B8] leading-relaxed font-sans">
                  {proj.summary}
                </div>
              </div>

              {/* Domain */}
              <div className="md:col-span-2 font-mono text-[11px] text-[#94A3B8]">
                <span className="bg-[#0D0F14] px-2 py-0.5 rounded border border-white/5">
                  {proj.domain}
                </span>
              </div>

              {/* Status */}
              <div className="md:col-span-1 font-mono">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  proj.status === "ACTIVE"
                    ? "bg-emerald-950/40 text-emerald-400 border border-emerald-800/40"
                    : proj.status === "PROTOTYPE"
                    ? "bg-amber-950/40 text-[#F59E0B] border border-amber-800/40"
                    : "bg-slate-900 text-[#94A3B8] border border-slate-700"
                }`}>
                  {proj.status}
                </span>
              </div>

              {/* Open Action */}
              <div className="md:col-span-1 md:text-right font-mono text-xs">
                {proj.githubUrl ? (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#F59E0B] hover:text-[#FF4D36] font-bold"
                  >
                    <span>CODE ↗</span>
                  </a>
                ) : (
                  <span className="text-[#64748B] text-[10px]">INTERNAL</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
