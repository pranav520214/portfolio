"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/SoundSystem";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [phase, setPhase] = useState<"IDEAS" | "SYSTEMS" | "EXPERIMENTS" | "PRANAV">("IDEAS");

  useEffect(() => {
    sounds.playBoot();

    const t1 = setTimeout(() => {
      setPhase("SYSTEMS");
      sounds.playClick();
    }, 450);

    const t2 = setTimeout(() => {
      setPhase("EXPERIMENTS");
      sounds.playClick();
    }, 950);

    const t3 = setTimeout(() => {
      setPhase("PRANAV");
      sounds.playTargetLock();
    }, 1450);

    const t4 = setTimeout(() => {
      onComplete();
    }, 2100);

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
        exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
        className="fixed inset-0 z-[99999] bg-[#0E0E0E] text-[#F5F4EF] flex flex-col items-center justify-center select-none overflow-hidden"
      >
        {/* Subtle engineering grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-100 border border-neutral-800 hover:border-neutral-600 px-3 py-1.5 rounded transition-all duration-150 bg-black/40 backdrop-blur"
        >
          [ SKIP INTRO ↗ ]
        </button>

        {/* Center content */}
        <div className="relative z-10 text-center space-y-4 max-w-sm px-6">
          <div className="font-mono text-[11px] tracking-[0.25em] text-neutral-500 uppercase font-semibold">
            INITIALIZING //
          </div>

          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="text-3xl sm:text-4xl font-black tracking-tight font-mono text-[#F5F4EF]"
              >
                {phase}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimal progress line */}
          <div className="w-36 h-[2px] bg-neutral-800 mx-auto rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.9, ease: "easeInOut" }}
              className="h-full bg-[#F59E0B]"
            />
          </div>
        </div>

        {/* Bottom subtle note */}
        <div className="absolute bottom-8 font-mono text-[10px] text-neutral-600 tracking-wider">
          RESEARCH NOTEBOOK • 2026
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
