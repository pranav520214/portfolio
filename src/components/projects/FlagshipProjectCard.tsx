"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FlagshipProject } from "@/data/portfolioContent";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ExperimentCard } from "./ExperimentCard";
import { WhatBrokeCard } from "./WhatBrokeCard";
import { ArrowRight, Code, FileText, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface FlagshipProjectCardProps {
  project: FlagshipProject;
  defaultExpanded?: boolean;
}

export function FlagshipProjectCard({ project, defaultExpanded = false }: FlagshipProjectCardProps) {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "SYSTEM" | "EXPERIMENTS" | "DETAILS">("OVERVIEW");
  const [showCode, setShowCode] = useState(false);

  return (
    <article className="bg-[#FFFFFF] border border-[#D8D6CD] rounded-2xl overflow-hidden shadow-sm hover:border-[#111111] transition-all duration-200">
      {/* Top Banner / Numbering */}
      <div className="bg-[#FAF9F5] border-b border-[#D8D6CD] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 font-mono">
          <span className="text-xs font-black bg-[#111111] text-[#F5F4EF] px-2.5 py-1 rounded">
            FLAGSHIP {project.number}
          </span>
          <span className="text-xs text-[#D94431] font-bold uppercase tracking-wider">
            {project.domain}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[#888888]">{project.year}</span>
          <span className="bg-[#EAE8DF] text-[#111111] px-2 py-0.5 rounded text-[10px] font-bold">
            {project.status}
          </span>
        </div>
      </div>

      {/* Main Header & Title */}
      <div className="p-6 sm:p-8 space-y-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-[#666666] mt-0.5">
            {project.subtitle}
          </p>
        </div>

        {/* The Core Question */}
        <div className="p-4 bg-[#F5F4EF] border-l-4 border-l-[#D94431] rounded-r-lg">
          <div className="font-mono text-[10px] uppercase font-bold text-[#D94431] tracking-wider mb-1">
            CORE RESEARCH QUESTION
          </div>
          <p className="text-base font-semibold text-[#111111]">
            &ldquo;{project.question}&rdquo;
          </p>
        </div>

        {/* Progressive Complexity Tabs */}
        <div className="pt-3 flex flex-wrap items-center gap-2 font-mono text-xs border-b border-[#EAE8DF] pb-3">
          {(["OVERVIEW", "SYSTEM", "EXPERIMENTS", "DETAILS"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === tab
                  ? "bg-[#111111] text-[#F5F4EF] font-bold"
                  : "text-[#666666] hover:text-[#111111] hover:bg-[#EAE8DF]"
              }`}
            >
              {tab}
            </button>
          ))}

          <Link
            href={`/work/${project.slug}`}
            className="ml-auto flex items-center gap-1 text-xs font-mono text-[#D94431] hover:underline font-semibold"
          >
            <span>FULL CASE STUDY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#444444]">
              <div className="space-y-1.5">
                <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
                  01 // THE CONSTRAINT
                </div>
                <p className="leading-relaxed">
                  {project.constraint}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
                  02 // INITIAL APPROACH & FAILURE
                </div>
                <p className="leading-relaxed">
                  {project.firstApproach}
                </p>
              </div>
            </div>

            {/* What Broke Callout */}
            {project.whatBroke.length > 0 && (
              <div className="pt-2">
                <WhatBrokeCard failure={project.whatBroke[0]} />
              </div>
            )}

            {/* Core Tech Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="font-mono text-xs text-[#888888] mr-2">TECH:</span>
              {project.build.coreTech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs bg-[#EAE8DF] text-[#222222] px-2.5 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: SYSTEM ARCHITECTURE */}
        {activeTab === "SYSTEM" && (
          <div className="space-y-6 pt-2">
            <ArchitectureDiagram nodes={project.architectureNodes} slug={project.slug} />

            <div className="text-sm text-[#444444] space-y-2">
              <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
                PIPELINE EXPLANATION
              </div>
              <p className="leading-relaxed">
                {project.build.description}
              </p>
            </div>

            {/* Code Snippet Toggle */}
            {project.build.codeSnippet && (
              <div className="border border-[#D8D6CD] rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="w-full bg-[#FAF9F5] px-4 py-2.5 flex items-center justify-between font-mono text-xs text-[#111111] hover:bg-[#EAE8DF] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-[#D94431]" />
                    <span>INSPECT CORE IMPLEMENTATION: {project.build.codeSnippet.filename}</span>
                  </span>
                  {showCode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showCode && (
                  <pre className="p-4 bg-[#0E0E0E] text-[#F5ECE2] font-mono text-xs overflow-x-auto leading-relaxed">
                    <code>{project.build.codeSnippet.code}</code>
                  </pre>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: EXPERIMENTS & LAB NOTEBOOK */}
        {activeTab === "EXPERIMENTS" && (
          <div className="space-y-6 pt-2">
            {project.experiments.map((exp) => (
              <ExperimentCard key={exp.id} experiment={exp} />
            ))}

            <div className="bg-[#FAF9F5] border border-[#D8D6CD] rounded-xl p-5 space-y-3 font-mono text-xs text-[#111111]">
              <div className="font-bold text-[#D94431] uppercase tracking-wider">
                EMPIRICAL SUMMARY & ITERATION
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed">
                <strong>Result:</strong> {project.result}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#444444] leading-relaxed">
                <strong>What Changed:</strong> {project.iteration}
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: DETAILS, LIMITATIONS & NEXT QUESTIONS */}
        {activeTab === "DETAILS" && (
          <div className="space-y-6 pt-2 text-sm text-[#444444]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 bg-[#FAF9F5] p-5 rounded-xl border border-[#D8D6CD]">
                <div className="font-mono text-xs font-bold text-[#D94431] uppercase tracking-wider">
                  CURRENT LIMITATION
                </div>
                <p className="leading-relaxed text-[#333333]">
                  {project.currentLimitation}
                </p>
              </div>

              <div className="space-y-2 bg-[#FAF9F5] p-5 rounded-xl border border-[#D8D6CD]">
                <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
                  NEXT INVESTIGATION
                </div>
                <p className="leading-relaxed text-[#333333]">
                  {project.nextQuestion}
                </p>
              </div>
            </div>

            {/* Personal Reflection */}
            <div className="p-5 border-l-4 border-l-[#111111] bg-[#FAF9F5] rounded-r-xl space-y-1">
              <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
                WHAT I LEARNED
              </div>
              <p className="italic text-[#222222] leading-relaxed">
                &ldquo;{project.reflection}&rdquo;
              </p>
            </div>

            {/* Primary Evidence List */}
            <div className="pt-2">
              <div className="font-mono text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">
                PRIMARY SOURCE EVIDENCE
              </div>
              <div className="space-y-2">
                {project.evidence.map((ev, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-[#FFFFFF] border border-[#D8D6CD] rounded-lg text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span className="bg-[#111111] text-[#F5F4EF] text-[10px] px-1.5 py-0.5 rounded font-bold">
                        {ev.type}
                      </span>
                      <span className="font-semibold text-[#111111]">{ev.label}</span>
                      <span className="text-[#666666] hidden sm:inline">— {ev.detail}</span>
                    </div>
                    {ev.link && (
                      <a
                        href={ev.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D94431] hover:underline"
                      >
                        VIEW ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
