"use client";

import React, { useState, useEffect } from "react";
import { ChapterDef } from "./StoryTypes";
import { Volume2, VolumeX, Terminal, FastForward, Compass } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface StoryHUDProps {
  progress: number;
  currentChapter: ChapterDef;
  onJumpToProgress: (p: number) => void;
  onOpenTerminal: () => void;
}

export function StoryHUD({
  progress,
  currentChapter,
  onJumpToProgress,
  onOpenTerminal,
}: StoryHUDProps) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(sounds.getMuted());
  }, []);

  const handleToggleSound = () => {
    const nextMute = sounds.toggleMute();
    setIsMuted(nextMute);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none select-none p-4 sm:p-6 flex items-end justify-between">
      {/* Left: Minimal Chapter Indicator */}
      <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#94A3B8] bg-[#070C15]/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-[#FF6A2A] shadow-[0_0_8px_#FF6A2A]" />
        <span className="text-[#F1F5F9] font-semibold tracking-wider">
          CH {currentChapter.numberStr} // {currentChapter.title}
        </span>
        <span className="text-[#475569]">•</span>
        <span className="text-[#FF6A2A]">{Math.round(progress * 100)}%</span>
      </div>

      {/* Right: Minimal Cinematic Controls (Sound, Skip, CLI) */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* CLI Terminal Shortcut */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenTerminal();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#070C15]/75 backdrop-blur-md text-[#94A3B8] hover:text-[#FFC84A] hover:border-[#FFC84A]/50 transition-colors font-mono text-xs"
          title="CLI Terminal (~)"
        >
          <Terminal className="w-3.5 h-3.5 text-[#FFC84A]" />
          <span className="hidden sm:inline">CLI [~]</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#070C15]/75 backdrop-blur-md text-[#94A3B8] hover:text-[#43D8FF] hover:border-[#43D8FF]/50 transition-colors font-mono text-xs"
          title={isMuted ? "Unmute Procedural Audio" : "Mute Audio"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#EF4444]" />
              <span className="hidden sm:inline">MUTED</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="hidden sm:inline">LIVE</span>
            </>
          )}
        </button>

        {/* Skip to Systems / Jump Forward */}
        <button
          onClick={() => {
            sounds.playClick();
            // If near beginning, skip into Project Universe (0.44); if past, skip to Open Channel (0.98)
            onJumpToProgress(progress < 0.40 ? 0.44 : 0.98);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 bg-[#070C15]/75 backdrop-blur-md text-[#94A3B8] hover:text-[#F1F5F9] hover:border-white/30 transition-colors font-mono text-xs"
          title="Fast Forward Scene"
        >
          <FastForward className="w-3.5 h-3.5 text-[#FF6A2A]" />
          <span className="hidden sm:inline">SKIP</span>
        </button>
      </div>
    </div>
  );
}
