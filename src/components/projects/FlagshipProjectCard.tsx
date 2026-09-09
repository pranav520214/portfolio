"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FlagshipProject } from "@/data/portfolioContent";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ExperimentCard } from "./ExperimentCard";
import { WhatBrokeCard } from "./WhatBrokeCard";
import { ArrowRight, Code, ExternalLink, ChevronDown, ChevronUp, AlertCircle, Sparkles } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface FlagshipProjectCardProps {
  project: FlagshipProject;
  defaultExpanded?: boolean;
}

export function FlagshipProjectCard({ project, defaultExpanded = false }: FlagshipProjectCardProps) {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "SYSTEM" | "EXPERIMENTS" | "DETAILS">("OVERVIEW");
  const [showCode, setShowCode] = useState(false);
  const isFlagship = project.slug === "localflow";

  return (
    <article className={`rounded-2xl overflow-hidden transition-all duration-200 border ${
      isFlagship
        ? "bg-[#14171E] border-[#F59E0B]/50 shadow-lg shadow-[#F59E0B]/5"
        : "bg-[#14171E] border-[#262E3B] hover:border-[#3D485C]"
    }`}>
      {/* Top Banner / Numbering */}
      <div className="bg-[#1C212B] border-b border-[#262E3B] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 font-mono">
          <span className={`text-xs font-black px-2.5 py-1 rounded flex items-center gap-1.5 ${
            isFlagship
              ? "bg-[#F59E0B] text-[#0D0F12]"
              : "bg-[#0D0F12] text-[#F1F5F9] border border-[#262E3B]"
          }`}>
            {isFlagship && <Sparkles className="w-3 h-3" />}
            <span>FLAGSHIP {project.number}</span>
          </span>
          <span className="text-xs text-[#F59E0B] font-bold uppercase tracking-wider">
            {project.domain}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[#64748B]">{project.year}</span>
          <span className="bg-[#0D0F12] text-[#94A3B8] border border-[#262E3B] px-2.5 py-0.5 rounded text-[10px] font-bold uppercase">
            {project.status}
          </span>
        </div>
      </div>

      {/* Main Header & Title */}
      <div className="p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F5F9]">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-[#94A3B8] mt-1">
              {project.subtitle}
            </p>
          </div>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C212B] border border-[#262E3B] text-xs font-mono font-medium text-[#F1F5F9] hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors"
          >
            <span>GitHub ↗</span>
          </a>
        </div>

        {/* Disclaimer if present (AUTOSTABI / PRIVAVEDA) */}
        {project.disclaimer && (
          <div className="p-3.5 bg-amber-950/20 border border-amber-800/60 rounded-lg flex items-start gap-2.5 text-xs text-amber-300 font-mono">
            <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-[#F59E0B] uppercase">Stage Notice: </strong>
              {project.disclaimer}
            </div>
          </div>
        )}

        {/* The Core Question */}
        <div className="p-4 bg-[#0D0F12] border-l-4 border-l-[#F59E0B] rounded-r-lg">
          <div className="font-mono text-[10px] uppercase font-bold text-[#F59E0B] tracking-wider mb-1">
            CORE RESEARCH & ENGINEERING QUESTION
          </div>
          <p className="text-base font-semibold text-[#F1F5F9]">
            &ldquo;{project.question}&rdquo;
          </p>
        </div>

        {/* Progressive Complexity Tabs */}
        <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-xs border-b border-[#262E3B] pb-3">
          {(["OVERVIEW", "SYSTEM", "EXPERIMENTS", "DETAILS"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                activeTab === tab
                  ? "bg-[#1C212B] text-[#F59E0B] font-bold border border-[#262E3B]"
                  : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1C212B]"
              }`}
            >
              {tab}
            </button>
          ))}

          <Link
            href={`/work/${project.slug}`}
            className="ml-auto flex items-center gap-1 text-xs font-mono text-[#F59E0B] hover:underline font-semibold"
          >
            <span>CASE STUDY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#94A3B8]">
              <div className="space-y-1.5">
                <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                  01 // THE CONSTRAINT
                </div>
                <p className="leading-relaxed font-sans text-sm">
                  {project.constraint}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                  02 // INITIAL ATTEMPT & FINDING
                </div>
                <p className="leading-relaxed font-sans text-sm">
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
              <span className="font-mono text-xs text-[#64748B] mr-2">VERIFIED STACK:</span>
              {project.build.coreTech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs bg-[#1C212B] text-[#F1F5F9] border border-[#262E3B] px-2.5 py-1 rounded"
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

            <div className="text-sm text-[#94A3B8] space-y-2">
              <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                IMPLEMENTATION & ARCHITECTURE DETAILS
              </div>
              <p className="leading-relaxed font-sans text-sm">
                {project.build.description}
              </p>
            </div>

            {/* Code Snippet Toggle */}
            {project.build.codeSnippet && (
              <div className="border border-[#262E3B] rounded-xl overflow-hidden bg-[#0D0F12]">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="w-full bg-[#1C212B] px-4 py-2.5 flex items-center justify-between font-mono text-xs text-[#F1F5F9] hover:bg-[#262E3B] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>INSPECT CORE IMPLEMENTATION: {project.build.codeSnippet.filename}</span>
                  </span>
                  {showCode ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showCode && (
                  <pre className="p-4 bg-[#0D0F12] text-[#F1F5F9] font-mono text-xs overflow-x-auto leading-relaxed border-t border-[#262E3B]">
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

            <div className="bg-[#1C212B] border border-[#262E3B] rounded-xl p-5 space-y-3 font-mono text-xs text-[#F1F5F9]">
              <div className="font-bold text-[#F59E0B] uppercase tracking-wider">
                EMPIRICAL SUMMARY & ITERATION
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                <strong className="text-[#F1F5F9]">Result:</strong> {project.result}
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                <strong className="text-[#F1F5F9]">What Changed:</strong> {project.iteration}
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: DETAILS, LIMITATIONS & NEXT QUESTIONS */}
        {activeTab === "DETAILS" && (
          <div className="space-y-6 pt-2 text-sm text-[#94A3B8]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 bg-[#1C212B] p-5 rounded-xl border border-[#262E3B]">
                <div className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                  CURRENT LIMITATION
                </div>
                <p className="leading-relaxed font-sans text-sm text-[#94A3B8]">
                  {project.currentLimitation}
                </p>
              </div>

              <div className="space-y-2 bg-[#1C212B] p-5 rounded-xl border border-[#262E3B]">
                <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                  NEXT INVESTIGATION
                </div>
                <p className="leading-relaxed font-sans text-sm text-[#94A3B8]">
                  {project.nextQuestion}
                </p>
              </div>
            </div>

            {/* Personal Reflection */}
            <div className="p-5 border-l-4 border-l-[#F59E0B] bg-[#1C212B] rounded-r-xl space-y-1">
              <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                ENGINEERING TAKEAWAY
              </div>
              <p className="italic text-[#F1F5F9] leading-relaxed font-sans text-sm">
                &ldquo;{project.reflection}&rdquo;
              </p>
            </div>

            {/* Primary Evidence List */}
            <div className="pt-2">
              <div className="font-mono text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">
                EVIDENCE & ARTIFACTS
              </div>
              <div className="space-y-2">
                {project.evidence.map((ev, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-[#0D0F12] border border-[#262E3B] rounded-lg text-xs font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <span className="bg-[#1C212B] text-[#F59E0B] border border-[#262E3B] text-[10px] px-1.5 py-0.5 rounded font-bold">
                        {ev.type}
                      </span>
                      <span className="font-semibold text-[#F1F5F9]">{ev.label}</span>
                      <span className="text-[#94A3B8] hidden sm:inline">— {ev.detail}</span>
                    </div>
                    {ev.link && (
                      <a
                        href={ev.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F59E0B] hover:underline"
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
