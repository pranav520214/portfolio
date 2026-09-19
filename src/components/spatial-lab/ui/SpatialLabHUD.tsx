"use client";

import React, { useState, useEffect } from "react";
import { SpatialState } from "../types";
import { Volume2, VolumeX, ArrowLeft, Compass } from "lucide-react";
import { sounds } from "@/components/audio/SoundSystem";

interface SpatialLabHUDProps {
  state: SpatialState;
  onReturnToMap: () => void;
  streetProgress: number;
}

export function SpatialLabHUD({
  state,
  onReturnToMap,
  streetProgress,
}: SpatialLabHUDProps) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(sounds.getMuted());
  }, []);

  const handleToggleSound = () => {
    const nextMute = sounds.toggleMute();
    setIsMuted(nextMute);
  };

  const isInsideStreet =
    state === "ENTER_STREET" ||
    state === "ENGINEERING_STREET" ||
    state === "PROJECT_INSPECT";

  return (
    <div className="fixed inset-x-0 top-0 z-40 pointer-events-none select-none p-4 sm:p-6 flex items-start justify-between">
      {/* Top Left: Location Ticker & Back Button */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {isInsideStreet && (
          <button
            onClick={() => {
              sounds.playClick();
              onReturnToMap();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-[#070C15]/80 backdrop-blur-md text-[#94A3B8] hover:text-[#F1F5F9] hover:border-white/30 transition-colors font-mono text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FF6A2A]" />
            <span>RETURN TO MAP</span>
          </button>
        )}

        <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] bg-[#070C15]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <Compass className="w-3.5 h-3.5 text-[#FF6A2A] animate-spin" style={{ animationDuration: "12s" }} />
          <span className="text-[#F1F5F9] font-semibold tracking-wider">
            {isInsideStreet
              ? "ENGINEERING DISTRICT // AVENUE"
              : "MASTER SPATIAL MAP // SYSTEM OVERVIEW"}
          </span>
          {isInsideStreet && (
            <>
              <span className="text-[#475569]">•</span>
              <span className="text-[#FF6A2A] font-semibold">
                {Math.round(streetProgress * 100)}% DISTANCE
              </span>
            </>
          )}
        </div>
      </div>

      {/* Top Right: Sound & Mode Indicator */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={handleToggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-[#070C15]/80 backdrop-blur-md text-[#94A3B8] hover:text-[#43D8FF] hover:border-[#43D8FF]/50 transition-colors font-mono text-xs"
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
      </div>
    </div>
  );
}
