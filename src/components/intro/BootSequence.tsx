"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../audio/SoundSystem";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Sound boot hum
    sounds.playBoot();

    const t1 = setTimeout(() => {
      setStep(1); // Coordinate markers appear
      sounds.playTargetLock();
    }, 400);

    const t2 = setTimeout(() => {
      setStep(2); // Blueprint lines draw & crosshair locks
    }, 1000);

    const t3 = setTimeout(() => {
      setStep(3); // SYSTEM ONLINE text flashes
      sounds.playTargetLock();
    }, 1700);

    const t4 = setTimeout(() => {
      setStep(4); // Grid expands outward & pushes through
    }, 2400);

    const t5 = setTimeout(() => {
      onComplete();
    }, 2900);

    // Progress percentage interval
    const pInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(pInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearInterval(pInterval);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sounds.playClick();
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[99999] bg-blueprint-950 flex flex-col items-center justify-center select-none overflow-hidden"
      >
        {/* Subtle background blueprint grid during boot */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a0d09_1px,transparent_1px),linear-gradient(to_bottom,#2a0d09_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 z-50 font-mono text-xs uppercase tracking-widest text-technical-cream/60 hover:text-comic-yellow border border-comic-yellow/30 hover:border-comic-yellow px-3 py-1.5 rounded transition-all duration-200 bg-blueprint-900/60 backdrop-blur"
        >
          [ SKIP INTRO ↗ ]
        </button>

        {/* Central HUD Graphics */}
        <div className="relative w-80 h-80 flex flex-col items-center justify-center">
          {/* Animated Central Target Reticle */}
          <motion.div
            animate={{
              rotate: step >= 2 ? 360 : 0,
              scale: step === 4 ? 3 : 1,
              opacity: step === 4 ? 0 : 1,
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.5 },
              opacity: { duration: 0.4 },
            }}
            className="absolute inset-0 border border-comic-yellow/30 rounded-full flex items-center justify-center"
          >
            <div className="w-64 h-64 border border-dashed border-blueprint-red/50 rounded-full" />
            <div className="absolute w-48 h-48 border border-comic-yellow/20 rounded-full" />
          </motion.div>

          {/* Coordinate Crosshairs */}
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full h-[1px] bg-comic-yellow/40" />
              <div className="h-full w-[1px] bg-comic-yellow/40 absolute" />
            </motion.div>
          )}

          {/* Central Status Text */}
          <div className="relative z-10 text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-[11px] text-comic-yellow tracking-[0.25em] uppercase font-bold"
            >
              INITIALIZING WORKSTATION //
            </motion.div>

            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl font-black tracking-tighter text-technical-white drop-shadow-[0_2px_15px_rgba(255,230,0,0.5)]"
              >
                PRANAV
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 bg-comic-yellow text-blueprint-950 px-2.5 py-0.5 rounded font-mono text-xs font-black tracking-widest uppercase shadow-comic"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                SYSTEM ONLINE
              </motion.div>
            )}

            {/* Diagnostic Progress */}
            <div className="w-48 mx-auto mt-4 pt-2 border-t border-comic-yellow/20">
              <div className="flex justify-between font-mono text-[10px] text-technical-cream/70 mb-1">
                <span>SYS_LOAD</span>
                <span>{Math.min(100, progress)}%</span>
              </div>
              <div className="w-full h-1 bg-blueprint-900 rounded-full overflow-hidden border border-comic-yellow/20">
                <motion.div
                  className="h-full bg-comic-yellow"
                  style={{ width: `${Math.min(100, progress)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Engineering Diagnostic Readouts */}
        <div className="absolute bottom-8 left-8 font-mono text-[10px] text-comic-yellow/50 space-y-1">
          <div>LOC: JALANDHAR // IN_31.32</div>
          <div>CORE: ESP32 + SLM + KALMAN</div>
          <div>MEM: 64KB HEAP_ALLOC OK</div>
        </div>

        <div className="absolute bottom-8 right-8 font-mono text-[10px] text-comic-yellow/50 text-right space-y-1">
          <div>ISRO SPO // ACKNOWLEDGED</div>
          <div>PENN STATE COLLAB // ACTIVE</div>
          <div>DEVENGERS // VERIFIED</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
