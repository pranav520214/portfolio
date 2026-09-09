"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Github, ExternalLink, ShieldCheck, Cpu, GitFork, Terminal } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99990] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-blueprint-950 border-2 sm:border-4 border-comic-yellow rounded-2xl shadow-comic-lg overflow-hidden flex flex-col my-auto max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="bg-blueprint-900 border-b-2 border-comic-yellow px-5 py-4 flex items-center justify-between select-none">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-comic-yellow bg-blueprint-950 px-2.5 py-1 rounded border border-comic-yellow/40 uppercase">
                MODULE: {project.id.toUpperCase()}
              </span>
              <span className="hidden sm:inline font-mono text-xs text-technical-cream/70">
                // CLASSIFIED TECHNICAL PRESENTATION
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="text-technical-cream/70 hover:text-comic-yellow p-1.5 rounded-lg bg-blueprint-950 hover:bg-blueprint-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-technical-white font-sans selection:bg-comic-yellow selection:text-blueprint-950">
            {/* Title & Status */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                  {project.status}
                </span>
                <span className="font-mono text-xs text-comic-yellow bg-blueprint-900 px-2 py-0.5 rounded border border-comic-yellow/30">
                  {project.year}
                </span>
                {project.disciplines.map((d, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] text-technical-cream/80 bg-blueprint-900/60 px-2 py-0.5 rounded border border-white/10"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-comic-yellow mt-2">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-technical-cream/80 mt-1 font-medium">
                {project.subtitle}
              </p>
            </div>

            {/* External Validation Callout if present */}
            {project.externalValidation && (
              <div className="bg-amber-950/40 border-l-4 border-comic-yellow p-4 rounded-r-lg flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-comic-yellow shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-xs font-bold text-comic-yellow uppercase">
                    EXTERNAL TECHNICAL COMMENDATION & CRITIQUE
                  </div>
                  <p className="text-xs sm:text-sm text-technical-cream/90 mt-1">
                    {project.externalValidation}
                  </p>
                </div>
              </div>
            )}

            {/* 01 Problem & 02 Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blueprint-900/60 border border-comic-yellow/30 rounded-xl p-5 shadow-comic">
                <div className="font-mono text-xs font-bold text-comic-yellow mb-2 uppercase flex items-center gap-2">
                  <span>01 // THE CORE PROBLEM</span>
                </div>
                <p className="text-xs sm:text-sm text-technical-cream/90 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="bg-blueprint-900/60 border border-comic-yellow/30 rounded-xl p-5 shadow-comic">
                <div className="font-mono text-xs font-bold text-comic-yellow mb-2 uppercase flex items-center gap-2">
                  <span>02 // THE ENGINEERING SOLUTION</span>
                </div>
                <p className="text-xs sm:text-sm text-technical-cream/90 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* 03 System Architecture (Animated Data Flow Diagram) */}
            <div className="bg-blueprint-900/80 border-2 border-comic-yellow/40 rounded-xl p-6 shadow-comic">
              <div className="flex items-center justify-between border-b border-comic-yellow/20 pb-3 mb-4">
                <div className="font-mono text-xs font-bold text-comic-yellow uppercase flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>03 // SYSTEM ARCHITECTURE & SIGNAL PIPELINE</span>
                </div>
                <span className="font-mono text-[10px] text-technical-muted">
                  STEP-BY-STEP DATA FLOW
                </span>
              </div>

              {/* Step Sequence Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
                {project.architecture.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="relative bg-blueprint-950 border border-comic-yellow/30 p-3 rounded-lg flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] text-comic-yellow font-bold">
                        STEP 0{idx + 1}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${
                          step.type === "input"
                            ? "bg-blue-950 text-blue-300 border border-blue-500/30"
                            : step.type === "process"
                            ? "bg-amber-950 text-amber-300 border border-amber-500/30"
                            : step.type === "validation"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                            : "bg-purple-950 text-purple-300 border border-purple-500/30"
                        }`}
                      >
                        {step.type}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-technical-white mb-1">
                      {step.name}
                    </div>
                    <div className="text-[11px] text-technical-cream/75 leading-tight">
                      {step.desc}
                    </div>
                  </div>
                ))}
              </div>

              {project.architecture.notes && (
                <div className="mt-4 font-mono text-xs text-comic-yellow/80 bg-blueprint-950 p-3 rounded border border-comic-yellow/20">
                  NOTE // {project.architecture.notes}
                </div>
              )}
            </div>

            {/* 04 Results & Concrete Validation */}
            <div>
              <div className="font-mono text-xs font-bold text-comic-yellow uppercase mb-3 flex items-center gap-2">
                <span>04 // CONCRETE RESULTS & METRICS</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.results.map((res, idx) => (
                  <li
                    key={idx}
                    className="bg-blueprint-900/60 border border-comic-yellow/20 p-3.5 rounded-lg flex items-start gap-2.5 text-xs text-technical-cream/90"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-comic-yellow shrink-0 mt-1.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 05 Tech Stack Tags */}
            <div>
              <div className="font-mono text-xs font-bold text-comic-yellow uppercase mb-3 flex items-center gap-2">
                <span>05 // TECH STACK & COMPONENTS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs text-technical-white bg-blueprint-900 border border-comic-yellow/40 px-3 py-1 rounded shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar / External Links */}
            <div className="pt-6 border-t-2 border-comic-yellow/30 flex flex-wrap items-center justify-between gap-4">
              <div className="font-mono text-xs text-technical-cream/60">
                REPOSITORY REPRODUCIBILITY STATUS: <strong className="text-comic-yellow">VERIFIED</strong>
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-comic-yellow hover:bg-comic-bright text-blueprint-950 font-bold px-4 py-2 rounded-lg shadow-comic text-xs uppercase tracking-wider transition-transform active:scale-95"
                  >
                    <Github className="w-4 h-4" />
                    <span>VIEW ON GITHUB</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    sounds.playClick();
                    onClose();
                  }}
                  className="bg-blueprint-900 hover:bg-blueprint-850 text-technical-cream px-4 py-2 rounded-lg border border-comic-yellow/40 text-xs font-mono"
                >
                  CLOSE MODULE
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
