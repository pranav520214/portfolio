"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Download, ExternalLink } from "lucide-react";
import { Achievement } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";

interface ProofModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function ProofModal({ achievement, onClose }: ProofModalProps) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99995] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-blueprint-950 border-2 sm:border-4 border-comic-yellow rounded-2xl shadow-comic-lg overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-blueprint-900 border-b-2 border-comic-yellow px-5 py-3.5 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-comic-yellow" />
              <span className="font-mono text-xs font-bold text-comic-yellow uppercase tracking-widest">
                VERIFIED PROOF // {achievement.proofId}
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="text-technical-cream/70 hover:text-comic-yellow p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
            <div>
              <span className="font-mono text-xs text-comic-yellow font-bold uppercase">
                {achievement.code} · {achievement.date}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-technical-white mt-1">
                {achievement.title}
              </h3>
              <p className="font-mono text-xs text-emerald-400 mt-1">
                ORGANIZER: {achievement.organizer}
              </p>
              <p className="text-xs sm:text-sm text-technical-cream/80 mt-2">
                {achievement.outcome}
              </p>
            </div>

            {/* High-Resolution Document Preview */}
            <div className="relative w-full min-h-[340px] sm:min-h-[460px] bg-blueprint-900 rounded-xl overflow-hidden border border-comic-yellow/30 shadow-inner flex items-center justify-center">
              <Image
                src={achievement.proofImage}
                alt={achievement.proofTitle}
                fill
                className="object-contain"
              />
            </div>

            <div className="pt-2 flex items-center justify-between font-mono text-xs text-technical-cream/60">
              <span>DOCUMENT SOURCE: VERIFIED ARCHIVE</span>
              <a
                href={achievement.proofImage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-comic-yellow hover:underline flex items-center gap-1"
              >
                <span>OPEN FULL RES</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
