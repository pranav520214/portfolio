"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/SoundSystem";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<string>("SYSTEM INITIALIZING");

  useEffect(() => {
    sounds.playBoot();

    const t1 = setTimeout(() => {
      setPhase("LOCAL NODE ONLINE");
      sounds.playClick();
    }, 400);

    const t2 = setTimeout(() => {
      setPhase("RESEARCH ARCHIVE MOUNTED");
      sounds.playClick();
    }, 850);

    const t3 = setTimeout(() => {
      setPhase("CORE ACTIVE // PRANAV KUMAR MISHRA");
      sounds.playTargetLock();
    }, 1300);

    const t4 = setTimeout(() => {
      onComplete();
    }, 1900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sounds.playClick();
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
        className="fixed inset-0 z-[99999] bg-[#07080A] text-[#F1F5F9] flex flex-col items-center justify-center select-none overflow-hidden"
      >
        {/* Fine Engineering Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] hover:text-[#F1F5F9] border border-[rgba(255,255,255,0.1)] hover:border-[#D94431] px-3.5 py-1.5 rounded-lg transition-all bg-[#0D0F14]/60 backdrop-blur"
        >
          [ SKIP STARTUP ↗ ]
        </button>

        {/* Center telemetry sequence */}
        <div className="relative z-10 text-center space-y-5 max-w-md px-6">
          <div className="font-mono text-[10px] tracking-[0.3em] text-[#D94431] uppercase font-bold flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D94431] animate-pulse" />
            <span>DIAGNOSTIC BOOT SEQUENCE</span>
          </div>

          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="text-xl sm:text-2xl font-bold tracking-tight font-mono text-[#F1F5F9]"
              >
                {phase}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimal progress line */}
          <div className="w-48 h-[2px] bg-[#161B26] mx-auto rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-[#D94431]"
            />
          </div>

          <div className="font-mono text-[10px] text-[#64748B] tracking-wider pt-2">
            LOCAL ENGINE • 500Hz REALTIME AVIONICS • SCIENTIFIC SIMULATION
          </div>
        </div>

        {/* Bottom subtle provenance note */}
        <div className="absolute bottom-6 font-mono text-[10px] text-[#475569] tracking-wider">
          PRANAV KUMAR MISHRA // COMMAND CONSOLE v2026.1
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
