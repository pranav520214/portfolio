"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FLAGSHIP_PROJECTS } from "@/data/portfolioContent";
import { Github, ExternalLink, X, ArrowLeft, ChevronRight, Cpu, Layers, Sparkles, Orbit, CheckCircle2 } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface ProjectUniverseProps {
  onExit: () => void;
}

// Physical styling per project medallion
const PROJECT_THEMES: Record<string, { color: string; bgGlow: string; rimColor: string; symbol: string; badge: string }> = {
  localflow: {
    color: "#ffc84a", // Soft Gold
    bgGlow: "rgba(255, 200, 74, 0.22)",
    rimColor: "linear-gradient(135deg, #ffc84a 0%, #3d2c0b 50%, #ffc84a 100%)",
    symbol: "AI // ASR",
    badge: "LOCAL INFERENCE",
  },
  autostabi: {
    color: "#ff6a2a", // Energy Orange
    bgGlow: "rgba(255, 106, 42, 0.22)",
    rimColor: "linear-gradient(135deg, #ff6a2a 0%, #381507 50%, #ff6a2a 100%)",
    symbol: "AVIONICS",
    badge: "500Hz REALTIME",
  },
  "wand-mouse": {
    color: "#43d8ff", // Electric Cyan
    bgGlow: "rgba(67, 216, 255, 0.22)",
    rimColor: "linear-gradient(135deg, #43d8ff 0%, #0a2638 50%, #43d8ff 100%)",
    symbol: "6-DOF IMU",
    badge: "BLE HID",
  },
  privaveda: {
    color: "#8d72ff", // Restrained Violet
    bgGlow: "rgba(141, 114, 255, 0.22)",
    rimColor: "linear-gradient(135deg, #8d72ff 0%, #1e153d 50%, #8d72ff 100%)",
    symbol: "STIFF ODE",
    badge: "RADAU SOLVER",
  },
  "fpv-controller": {
    color: "#10b981", // Emerald Green
    bgGlow: "rgba(16, 185, 129, 0.22)",
    rimColor: "linear-gradient(135deg, #10b981 0%, #082b1d 50%, #10b981 100%)",
    symbol: "PPM ISR",
    badge: "SUB-\u03bcS JITTER",
  },
};

export function ProjectUniverse({ onExit }: ProjectUniverseProps) {
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const animRef = useRef<number | null>(null);

  const projects = FLAGSHIP_PROJECTS.slice(0, 5);
  const selectedProject = projects.find((p) => p.slug === selectedSlug) || null;

  // 1. Orbital Physics Loop
  useEffect(() => {
    let lastTime = performance.now();
    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Orbit decelerates smoothly to a complete stop when a medallion is selected
      if (!isPaused && !selectedSlug) {
        setOrbitAngle((prev) => (prev + dt * 0.18) % (Math.PI * 2));
      }
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPaused, selectedSlug]);

  // Keyboard navigation: Escape closes modal or exits universe
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedSlug) {
          setSelectedSlug(null);
        } else {
          onExit();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedSlug, onExit]);

  return (
    <div className="fixed inset-0 z-[99999] bg-[#05080e] text-[#f5f3ee] select-none overflow-hidden flex flex-col items-center justify-center">
      {/* Deep Space Background Nebula & Floating Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,36,54,0.7)_0%,rgba(5,8,14,1)_85%)] pointer-events-none" />

      {/* Top HUD Controls */}
      <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-auto">
        <button
          onClick={() => {
            sounds.playClick();
            onExit();
          }}
          className="flex items-center gap-2 font-mono text-xs text-[#94a3b8] hover:text-[#f5f3ee] bg-[#101620]/90 border border-white/15 hover:border-[#ff6a2a] px-4 py-2.5 rounded-xl backdrop-blur-md transition-all cursor-pointer shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 text-[#ff6a2a]" />
          <span>EXIT PROJECT UNIVERSE</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#94a3b8] bg-[#101620]/80 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md hidden sm:inline-block">
            SPATIAL 3D ORBIT // 5 PHYSICAL MEDALLIONS
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              setIsPaused((prev) => !prev);
            }}
            className="font-mono text-xs text-[#94a3b8] hover:text-[#f5f3ee] bg-[#101620]/80 border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md transition-colors"
          >
            {isPaused ? "▶ RESUME ORBIT" : "⏸ PAUSE ORBIT"}
          </button>
        </div>
      </div>

      {/* Spatial 3D Orbital Canvas Area */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ perspective: "1400px" }}
      >
        {/* Orbital Elliptical Guide Wire */}
        <svg
          className={`absolute w-[940px] h-[520px] max-w-[95vw] pointer-events-none transition-opacity duration-500 ${
            selectedSlug ? "opacity-10" : "opacity-30"
          }`}
          viewBox="0 0 940 520"
        >
          <ellipse
            cx="470"
            cy="260"
            rx="430"
            ry="195"
            fill="none"
            stroke="#43d8ff"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
        </svg>

        {/* 5 Orbiting 3D Circular Medallions */}
        {projects.map((proj, idx) => {
          const theme = PROJECT_THEMES[proj.slug] || {
            color: "#ff6a2a",
            bgGlow: "rgba(255, 106, 42, 0.22)",
            rimColor: "linear-gradient(135deg, #ff6a2a 0%, #381507 50%, #ff6a2a 100%)",
            symbol: "CORE",
            badge: "HARDWARE",
          };

          const isSelected = selectedSlug === proj.slug;
          const isOtherSelected = selectedSlug !== null && !isSelected;
          const isHovered = hoveredSlug === proj.slug;

          const angle = orbitAngle + (idx / projects.length) * Math.PI * 2;
          const rx = 400; // Semi-major axis
          const ry = 160; // Semi-minor axis
          const orbitX = Math.cos(angle) * rx;
          const orbitY = Math.sin(angle) * ry;

          // Normalized depth
          const zNorm = (Math.sin(angle) + 1) / 2; // 0 (back) to 1 (front)
          const baseScale = 0.8 + zNorm * 0.4; // 0.8x to 1.2x

          return (
            <motion.div
              key={proj.slug}
              layout
              className="absolute pointer-events-auto cursor-pointer"
              animate={{
                left: isSelected ? "calc(50% - 240px)" : `calc(50% + ${orbitX}px)`,
                top: isSelected ? "50%" : `calc(50% + ${orbitY}px)`,
                scale: isSelected ? 1.25 : isHovered ? baseScale * 1.12 : baseScale,
                opacity: isOtherSelected ? 0.2 : isHovered ? 1 : 0.6 + zNorm * 0.4,
                zIndex: isSelected ? 50 : Math.floor(zNorm * 30),
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => {
                if (!selectedSlug) {
                  sounds.playTargetLock();
                  setHoveredSlug(proj.slug);
                }
              }}
              onMouseLeave={() => setHoveredSlug(null)}
              onClick={() => {
                sounds.playClick();
                setSelectedSlug(isSelected ? null : proj.slug);
              }}
            >
              {/* Physical 3D Engineering Medallion Disc */}
              <div
                className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full flex flex-col items-center justify-center p-6 text-center transition-shadow duration-300"
                style={{
                  background: "radial-gradient(circle at 35% 35%, #182232 0%, #0b1018 70%, #06090e 100%)",
                  boxShadow: isSelected || isHovered
                    ? `0 0 45px ${theme.bgGlow}, inset 0 0 25px ${theme.bgGlow}, 0 20px 40px rgba(0,0,0,0.8)`
                    : "0 15px 35px rgba(0,0,0,0.65), inset 0 2px 4px rgba(255,255,255,0.1)",
                  border: `3px solid ${isHovered || isSelected ? theme.color : "rgba(255,255,255,0.15)"}`,
                }}
              >
                {/* Outer Chamfered Metallic Bevel Ring */}
                <div
                  className="absolute -inset-1.5 rounded-full border pointer-events-none opacity-40 animate-spin-slow"
                  style={{
                    borderColor: theme.color,
                    borderStyle: "dashed",
                    borderWidth: "1.5px",
                  }}
                />

                {/* Recessed Center Core Disc */}
                <div className="absolute inset-3 rounded-full border border-white/5 pointer-events-none bg-radial from-transparent to-black/50" />

                {/* Top Category Badge */}
                <span
                  className="font-mono text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-full border mb-2 relative z-10"
                  style={{
                    borderColor: theme.color,
                    color: theme.color,
                    backgroundColor: "rgba(0,0,0,0.6)",
                  }}
                >
                  {theme.symbol}
                </span>

                {/* Project Title */}
                <h4 className="font-bold text-sm sm:text-base text-[#f5f3ee] tracking-tight leading-snug max-w-[180px] relative z-10">
                  {proj.title.replace(/—/g, " ").trim()}
                </h4>

                {/* Domain Sublabel */}
                <p className="font-mono text-[10px] text-[#94a3b8] mt-1 line-clamp-1 relative z-10">
                  {proj.domain.split("•")[0]?.trim()}
                </p>

                {/* Core Hardware/Software Tags */}
                <div className="flex flex-wrap justify-center gap-1 mt-2.5 relative z-10">
                  {(proj.build?.coreTech || []).slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[8px] bg-black/70 border border-white/10 text-[#cbd5e1] px-1.5 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Cue */}
                <div className="mt-2.5 flex items-center gap-1 text-[9px] font-mono font-bold relative z-10" style={{ color: theme.color }}>
                  <span>{isSelected ? "ACTIVE" : "INSPECT DISC"}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Selected Project Expanded Engineering Dossier (Unfolds on Right Side) */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="project-dossier"
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-4 sm:right-12 z-50 w-full max-w-xl max-h-[82vh] rounded-3xl bg-[#0e1420]/95 border border-white/15 p-6 sm:p-8 shadow-2xl backdrop-blur-xl overflow-y-auto space-y-5 pointer-events-auto"
            >
              {/* Dossier Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#ff6a2a] uppercase tracking-wider">
                      {selectedProject.number} // {selectedProject.domain}
                    </span>
                    <span className="font-mono text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-bold">
                      {selectedProject.status}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#f5f3ee] tracking-tight mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#94a3b8] mt-0.5">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setSelectedSlug(null);
                  }}
                  className="p-2 rounded-xl text-[#94a3b8] hover:text-[#f5f3ee] hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close project dossier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Purpose / Research Inquiry */}
              <div className="space-y-2 bg-[#090d16] p-4 rounded-2xl border border-white/5 font-mono text-xs">
                <div className="text-[10px] text-[#ffc84a] font-bold uppercase tracking-wider">
                  SYSTEM PURPOSE & RESEARCH INQUIRY //
                </div>
                <p className="text-sm text-[#f5f3ee] font-sans leading-relaxed">
                  "{selectedProject.question}"
                </p>
                <div className="text-[11px] text-[#94a3b8] pt-2 border-t border-white/5">
                  <span className="text-[#ff6a2a] font-bold">PHYSICAL CONSTRAINT: </span>
                  {selectedProject.constraint}
                </div>
              </div>

              {/* Engineering Approach */}
              <div className="space-y-1.5">
                <div className="font-mono text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider">
                  ENGINEERING APPROACH & DATAFLOW //
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  {selectedProject.build?.description}
                </p>
              </div>

              {/* Subsystem Architecture Nodes */}
              {selectedProject.architectureNodes && selectedProject.architectureNodes.length > 0 && (
                <div className="space-y-2">
                  <div className="font-mono text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider">
                    SUBSYSTEM NODES //
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    {selectedProject.architectureNodes.map((node) => (
                      <div
                        key={node.id}
                        className="p-2.5 rounded-xl bg-[#090d16] border border-white/5 space-y-0.5"
                      >
                        <span className="text-[8px] text-[#43d8ff] uppercase font-bold">
                          {node.type}
                        </span>
                        <div className="font-bold text-[#f5f3ee] text-[11px]">{node.label}</div>
                        <div className="text-[9px] text-[#94a3b8] line-clamp-1">{node.sublabel}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hardware & Software Verified Stack */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="font-mono text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider">
                  VERIFIED HARDWARE & SOFTWARE STACK //
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {(selectedProject.build?.coreTech || []).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-[#090d16] border border-white/10 text-[#f5f3ee] text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Verified Public GitHub & Bench Report */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
                <a
                  href={`/work/${selectedProject.slug}`}
                  className="font-mono text-xs text-[#94a3b8] hover:text-[#43d8ff] transition-colors underline"
                >
                  [ LAB BENCH REPORT \u2192 /work/{selectedProject.slug} ]
                </a>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff6a2a] hover:bg-[#ff824a] text-white font-mono text-xs font-bold transition-all shadow-lg shadow-[#ff6a2a]/20 cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>VIEW GITHUB REPOSITORY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Guidance */}
      <div className="absolute bottom-6 font-mono text-[10px] text-[#64748b] tracking-wider uppercase pointer-events-none">
        {selectedSlug
          ? "CLICK CLOSE OR ESC TO RETURN MEDALLION TO ORBIT"
          : "CLICK ANY 3D CIRCULAR MEDALLION TO SLOW ORBIT & EXPAND ENGINEERING DOSSIER"}
      </div>
    </div>
  );
}
