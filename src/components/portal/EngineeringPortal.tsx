"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/SoundSystem";
import { ArrowLeft, Sparkles, Orbit } from "lucide-react";
import { ProjectUniverse } from "../project-universe/ProjectUniverse";

// Dynamic import of PortalRing with ssr: false
const PortalRing = dynamic(
  () => import("./PortalRing").then((mod) => mod.PortalRing),
  { ssr: false }
);

interface EngineeringPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EngineeringPortal({ isOpen, onClose }: EngineeringPortalProps) {
  const [phase, setPhase] = useState<"assembling" | "passing" | "universe">("assembling");
  const [progress, setProgress] = useState(0);

  // Progressive Formation & Camera Pass Choreography (2.3s formation sequence)
  useEffect(() => {
    if (!isOpen) {
      setPhase("assembling");
      setProgress(0);
      return;
    }

    sounds.playTargetLock();

    // 0.00s to 2.30s: Staged Houdini-grade vortex assembly
    const start = performance.now();
    const duration = 2300;
    let surgePlayed = false;

    const step = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1.0);
      setProgress(p);

      // Trigger rising energy cue at full ring surge (1.45s = ~0.63 progress)
      if (p > 0.63 && !surgePlayed) {
        surgePlayed = true;
        sounds.playBoot();
      }

      if (p < 1.0) {
        requestAnimationFrame(step);
      } else {
        // At 2.30s: Threshold stabilized, initiate smooth camera pass through vortex
        setPhase("passing");
        sounds.playKey();
      }
    };
    const req = requestAnimationFrame(step);

    return () => cancelAnimationFrame(req);
  }, [isOpen]);

  const handlePortalEntered = useCallback(() => {
    setPhase("universe");
  }, []);

  const handleExitUniverse = useCallback(() => {
    sounds.playClick();
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  // Real-time telemetry label based on formation progress
  const getTelemetryStatus = () => {
    if (phase === "passing") return "TRANSIT ACTIVE — CROSSING VORTEX THRESHOLD";
    if (progress < 0.20) return "INITIATING ELECTROMAGNETIC IGNITION POINT...";
    if (progress < 0.45) return "DEVELOPING TANGENTIAL ARC FILAMENTS...";
    if (progress < 0.70) return "SYNCHRONIZING COUNTER-ROTATING STREAMS...";
    if (progress < 0.88) return "VORTEX COHERENCE 80% — FILLING ARC GAPS...";
    if (progress < 1.00) return "FULL CIRCUMFERENCE SURGE — APERTURE DEPTH ACTIVATING...";
    return "GATEWAY OPEN — PROJECT SPACE VISIBLE";
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99990] select-none overflow-hidden">
        {/* If inside Project Universe, display it */}
        {phase === "universe" ? (
          <motion.div
            key="universe-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <ProjectUniverse onExit={handleExitUniverse} />
          </motion.div>
        ) : (
          /* Portal Opening & Camera Pass Sequence */
          <motion.div
            key="portal-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#04060a] flex items-center justify-center"
          >
            {/* Ambient Background Energy Void with subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,106,42,0.12)_0%,rgba(10,14,22,0.85)_50%,rgba(4,6,10,1)_90%)] pointer-events-none" />

            {/* Top Command Bar */}
            <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#ff6a2a] bg-[#101620]/90 border border-[#ff6a2a]/30 px-3.5 py-1.5 rounded-xl backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff6a2a] animate-ping" />
                  <span>VFX ELECTROMAGNETIC PORTAL</span>
                </span>
                <span className="font-mono text-xs text-[#94a3b8] bg-[#101620]/80 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-md hidden sm:inline-block">
                  HOUDINI PARTICLE VORTEX // 3,200 STREAKS
                </span>
              </div>

              {/* Abort / Cancel Button */}
              <button
                onClick={onClose}
                className="font-mono text-xs text-[#94a3b8] hover:text-[#f5f3ee] bg-[#101620]/80 border border-white/10 hover:border-red-500/40 px-4 py-2 rounded-xl backdrop-blur-md transition-all cursor-pointer shadow-lg"
              >
                [ CANCEL PORTAL ✕ ]
              </button>
            </div>

            {/* Three.js R3F Canvas for the Plasma Ring & Particles */}
            <div className="w-full h-full relative z-10">
              <Canvas
                camera={{ position: [0, 0, 5.5], fov: 48 }}
                gl={{ antialias: true, alpha: true }}
                className="w-full h-full"
              >
                <ambientLight intensity={0.15} />
                <PortalRing
                  progress={progress}
                  isPassingThrough={phase === "passing"}
                  onEntered={handlePortalEntered}
                />
              </Canvas>
            </div>

            {/* Lower Status Indicator HUD */}
            <div className="absolute bottom-8 z-20 font-mono text-[11px] text-[#ffb632] tracking-[0.25em] uppercase flex items-center gap-2.5 bg-[#090d14]/80 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-md shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-[#ff7a1a] animate-pulse" />
              <span>{getTelemetryStatus()}</span>
              <span className="text-[#94a3b8] font-normal text-[10px] ml-2">
                [{Math.round(progress * 100)}%]
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
