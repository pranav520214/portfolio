"use client";

import React, { useState } from "react";
import { ChapterDef } from "./StoryTypes";
import { FLAGSHIP_PROJECTS } from "@/data/portfolioContent";
import { Github, ExternalLink, X, ArrowRight, CheckCircle2, Copy, Terminal, Sparkles } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface StoryOverlayProps {
  currentChapter: ChapterDef;
  progress: number;
  selectedProjectSlug: string | null;
  onSelectProject: (slug: string | null) => void;
  selectedDomainId: string | null;
  onSelectDomain: (id: string | null) => void;
  selectedSubsystemNode: string | null;
  onSelectSubsystemNode: (id: string | null) => void;
  onJumpToProgress: (p: number) => void;
  onOpenTerminal: () => void;
}

export function StoryOverlay({
  currentChapter,
  progress,
  selectedProjectSlug,
  onSelectProject,
  selectedDomainId,
  onSelectDomain,
  selectedSubsystemNode,
  onSelectSubsystemNode,
  onJumpToProgress,
  onOpenTerminal,
}: StoryOverlayProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mpranav126@outlook.com");
    setCopiedEmail(true);
    sounds.playTargetLock();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const selectedProject = FLAGSHIP_PROJECTS.find((p) => p.slug === selectedProjectSlug) || null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none select-none flex flex-col justify-between p-6 sm:p-12">
      {/* ========================================================================= */}
      {/* CHAPTER 01: CONSTELLATION OVERLAY (Minimal & Breathing) */}
      {/* ========================================================================= */}
      {currentChapter.id === "constellation" && (
        <div className="flex-1 flex flex-col items-center justify-end pb-20 text-center pointer-events-auto">
          <p className="text-xs font-mono tracking-[0.35em] text-[#94A3B8] uppercase mb-3 animate-pulse">
            SCROLL OR SWIPE TO MOVE THE CAMERA
          </p>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-[#FF6A2A] rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 02: THE PORTAL OVERLAY */}
      {/* ========================================================================= */}
      {currentChapter.id === "portal" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF6A2A]/40 bg-[#FF6A2A]/10 text-[#FF6A2A] text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            ELECTROMAGNETIC PORTAL APERTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-mono tracking-tight text-[#F1F5F9] max-w-xl">
            CROSSING THE THRESHOLD
          </h2>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 03: HERO REVEAL OVERLAY */}
      {/* ========================================================================= */}
      {currentChapter.id === "hero" && (
        <div className="flex-1 flex flex-col justify-end max-w-2xl pb-20 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#FF6A2A]/40 bg-[#070C15]/85 text-[#FF6A2A] text-xs font-mono tracking-wider mb-3">
            <span>[SYS.ID 01]</span>
            <span>AUTONOMOUS SYSTEMS & EMBEDDED ENGINEER</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#F1F5F9] leading-none mb-3">
            PRANAV KUMAR<br />
            <span className="text-[#FF6A2A]">MISHRA</span>
          </h1>
          <p className="text-sm sm:text-base text-[#CBD5E1] font-mono leading-relaxed mb-6">
            I architect deterministic avionics, local streaming AI, and aerodynamic systems from first principles.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                sounds.playClick();
                onJumpToProgress(0.44); // Jump to Project Universe
              }}
              className="px-5 py-2.5 rounded bg-[#FF6A2A] text-white font-mono text-xs tracking-wider font-semibold hover:bg-[#EA580C] transition-all flex items-center gap-2 shadow-lg shadow-[#FF6A2A]/20"
            >
              EXPLORE SYSTEMS <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenTerminal();
              }}
              className="px-5 py-2.5 rounded border border-[#334155] bg-[#070C15]/80 text-[#94A3B8] hover:text-[#FFC84A] hover:border-[#FFC84A]/50 font-mono text-xs tracking-wider transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-[#FFC84A]" /> CLI COMMANDS [~]
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 04: PHILOSOPHY OVERLAY (Minimal text, visual 3D words dominate!) */}
      {/* ========================================================================= */}
      {currentChapter.id === "philosophy" && (
        <div className="flex-1 flex flex-col justify-start pt-12 max-w-xl pointer-events-none">
          <span className="text-xs font-mono text-[#FF6A2A] tracking-[0.3em] uppercase">
            CHAPTER 04 // CORE AXIOM
          </span>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Camera travels through the 5 engineering imperatives in space.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 05: PROJECT UNIVERSE OVERLAY */}
      {/* ========================================================================= */}
      {currentChapter.id === "projects" && (
        <div className="flex-1 flex flex-col justify-between pointer-events-auto">
          {/* Header */}
          <div className="max-w-xl">
            <span className="text-xs font-mono text-[#FF6A2A] tracking-widest uppercase">
              CHAPTER 05 // SYSTEM ORBITS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-[#F1F5F9] mt-1">
              THE PROJECT UNIVERSE
            </h2>
            <p className="text-xs font-mono text-[#94A3B8] mt-1">
              Click any engineered instrument to separate its physical hardware layers.
            </p>
          </div>

          {/* Expanded Project Dossier Panel (when an instrument is selected) */}
          {selectedProject && (
            <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[#070C15]/95 backdrop-blur-xl border-l border-[#334155] p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto pointer-events-auto z-50">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                  <span className="text-xs font-mono text-[#FF6A2A] uppercase tracking-wider">
                    {selectedProject.domain}
                  </span>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onSelectProject(null);
                    }}
                    className="p-1 rounded hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-[#F1F5F9] mt-4 mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-[#94A3B8] leading-relaxed mb-6">
                  {selectedProject.subtitle}
                </p>

                {/* Core Question & Physical Constraint */}
                <div className="space-y-3 mb-6">
                  <div className="p-3 rounded bg-[#0E1626] border border-[#1E293B]">
                    <div className="text-[10px] font-mono text-[#FF6A2A] uppercase font-semibold">CORE QUESTION</div>
                    <div className="text-xs font-mono text-[#CBD5E1] mt-1">{selectedProject.question}</div>
                  </div>
                  <div className="p-3 rounded bg-[#0E1626] border border-[#1E293B]">
                    <div className="text-[10px] font-mono text-[#43D8FF] uppercase font-semibold">PHYSICAL CONSTRAINT</div>
                    <div className="text-xs font-mono text-[#CBD5E1] mt-1">{selectedProject.constraint}</div>
                  </div>
                </div>

                {/* Technical Architecture Nodes */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-mono text-[#CBD5E1] uppercase tracking-wider font-semibold">
                    PHYSICAL SIGNAL PIPELINE
                  </div>
                  {selectedProject.architectureNodes.map((node) => (
                    <div key={node.id} className="flex items-start gap-2 text-xs font-mono text-[#94A3B8]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[#F1F5F9] font-medium">{node.label}</span>
                        <span className="text-[#64748B] ml-1.5">• {node.sublabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1E293B] flex flex-col gap-2.5">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded bg-[#1E293B] hover:bg-[#334155] text-[#F1F5F9] font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4" /> VIEW VERIFIED GITHUB
                  </a>
                )}
                <button
                  onClick={() => {
                    sounds.playClick();
                    onSelectProject(null);
                  }}
                  className="w-full py-2 rounded border border-[#334155] text-[#94A3B8] hover:text-[#F1F5F9] font-mono text-xs transition-colors"
                >
                  REASSEMBLE INTO ORBIT
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 06: CAPABILITY MACHINE OVERLAY */}
      {/* ========================================================================= */}
      {currentChapter.id === "capabilities" && (
        <div className="flex-1 flex flex-col justify-start pt-12 max-w-xl pointer-events-auto">
          <span className="text-xs font-mono text-[#43D8FF] tracking-widest uppercase">
            CHAPTER 06 // CONCENTRIC CORE MACHINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-[#F1F5F9] mt-1">
            CAPABILITY MACHINE
          </h2>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Three counter-rotating concentric mechanical rings with 5 radial satellite pods.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 07: SUBSYSTEM SIGNAL FLOW OVERLAY */}
      {/* ========================================================================= */}
      {currentChapter.id === "subsystem" && (
        <div className="flex-1 flex flex-col justify-start pt-12 max-w-xl pointer-events-auto">
          <span className="text-xs font-mono text-[#10B981] tracking-widest uppercase">
            CHAPTER 07 // DETERMINISTIC EXECUTION
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-[#F1F5F9] mt-1">
            500Hz FLIGHT HARDWARE
          </h2>
          <p className="text-xs font-mono text-[#94A3B8] mt-1">
            Camera inside the circuit board. Sequential 500Hz signals flow from IMU → ESP32 → PWM → Aero Servos.
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 08: PRIVANTRIX AEROSPACE OVERLAY */}
      {/* ========================================================================= */}
      {currentChapter.id === "privantrix" && (
        <div className="flex-1 flex flex-col justify-end pb-20 max-w-xl pointer-events-auto">
          <span className="text-xs font-mono text-[#FF6A2A] tracking-widest uppercase">
            CHAPTER 08 // AEROSPACE RESEARCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-mono text-[#F1F5F9] mt-1 mb-2">
            PRIVANTRIX AEROSPACE
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] leading-relaxed mb-4">
            Mach 5.8 hypersonic ascent trajectories modeled with computational fluid dynamics. Technical appraisal commended by ISRO scientist.
          </p>
          <div className="p-3 rounded bg-[#0E1626]/85 border border-[#334155] text-xs font-mono text-[#CBD5E1]">
            <span className="text-[#FFC84A] font-semibold">DOCUMENTARY RECORD:</span> National Children&apos;s Science Congress (NCSC) state-level selection.
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 09: FUTURE VISION OVERLAY */}
      {/* ========================================================================= */}
      {currentChapter.id === "vision" && (
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-xl mx-auto pointer-events-none">
          <span className="text-xs font-mono text-[#38BDF8] tracking-widest uppercase mb-2">
            CHAPTER 09 // RESEARCH TOPOLOGY
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-mono text-[#F1F5F9]">
            FUTURE SYSTEMS GRAPH
          </h2>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER 10: OPEN CHANNEL / CONTACT OVERLAY */}
      {/* ========================================================================= */}
      {currentChapter.id === "contact" && (
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-lg mx-auto pointer-events-auto">
          <div className="w-3 h-3 rounded-full bg-[#10B981] animate-ping mb-3" />
          <span className="text-xs font-mono text-[#10B981] tracking-[0.25em] uppercase mb-1">
            SIGNAL BEACON LOCKED
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-mono text-[#F1F5F9] mb-3">
            OPEN CHANNEL
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#94A3B8] mb-6">
            Available for ambitious engineering roles, autonomous robotics projects, and first-principles aerospace research.
          </p>

          {/* Email dispatch */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#0E1626] border border-[#334155] mb-6 w-full max-w-md justify-between">
            <span className="text-xs font-mono text-[#FFC84A] px-2 font-semibold">
              mpranav126@outlook.com
            </span>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded bg-[#1E293B] hover:bg-[#334155] text-xs font-mono text-[#F1F5F9] flex items-center gap-1.5 transition-colors"
            >
              {copiedEmail ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> COPIED
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> COPY
                </>
              )}
            </button>
          </div>

          {/* External verified links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/pranav520214"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-[#334155] bg-[#070C15] text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#F1F5F9]/50 font-mono text-xs flex items-center gap-2 transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GITHUB
            </a>
            <a
              href="https://linkedin.com/in/pranav-kumar-mishra"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded border border-[#334155] bg-[#070C15] text-[#94A3B8] hover:text-[#43D8FF] hover:border-[#43D8FF]/50 font-mono text-xs flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> LINKEDIN
            </a>
            <button
              onClick={() => {
                sounds.playClick();
                onOpenTerminal();
              }}
              className="px-4 py-2 rounded border border-[#334155] bg-[#070C15] text-[#94A3B8] hover:text-[#FFC84A] hover:border-[#FFC84A]/50 font-mono text-xs flex items-center gap-2 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-[#FFC84A]" /> CLI [~]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
