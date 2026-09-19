"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { STORY_CHAPTERS, ChapterDef } from "./StoryTypes";
import { StoryCameraRig } from "./StoryCameraRig";
import { StoryHUD } from "./StoryHUD";
import { StoryOverlay } from "./StoryOverlay";

// 3D Chapter Scene Modules
import { StoryConstellation3D } from "./scenes/StoryConstellation3D";
import { StoryPortal3D } from "./scenes/StoryPortal3D";
import { StoryHero3D } from "./scenes/StoryHero3D";
import { StoryPhilosophy3D } from "./scenes/StoryPhilosophy3D";
import { StoryProject3D } from "./scenes/StoryProject3D";
import { StoryCapability3D } from "./scenes/StoryCapability3D";
import { StorySubsystem3D } from "./scenes/StorySubsystem3D";
import { StoryPrivantrix3D } from "./scenes/StoryPrivantrix3D";
import { StoryVision3D } from "./scenes/StoryVision3D";
import { StoryContact3D } from "./scenes/StoryContact3D";

interface StoryEngineProps {
  onOpenTerminal: () => void;
}

export function StoryEngine({ onOpenTerminal }: StoryEngineProps) {
  const [progress, setProgress] = useState(0); // Smoothed progress [0, 1]
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  // Pointer position for subtle camera parallax
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  // Selected entities across scenes
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [selectedSubsystemNode, setSelectedSubsystemNode] = useState<string | null>(null);

  // 1. Scroll listener to compute normalized scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        targetProgress.current = Math.max(0, Math.min(1, scrollY / maxScroll));
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, []);

  // 2. Critically damped animation loop for smooth progress interpolation
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const diff = targetProgress.current - currentProgress.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgress.current += diff * 0.085;
        setProgress(currentProgress.current);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 3. Determine current active chapter from progress
  const currentChapter: ChapterDef = STORY_CHAPTERS.find(
    (ch) => progress >= ch.range[0] && progress < ch.range[1]
  ) || STORY_CHAPTERS[STORY_CHAPTERS.length - 1];

  // 4. Smooth jump handler
  const handleJumpToProgress = useCallback((p: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = p * maxScroll;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative w-full bg-[#05080E] text-[#F1F5F9]">
      {/* ========================================================================= */}
      {/* FIXED 3D WEBGL WORLD (Full Viewport Canvas) */}
      {/* ========================================================================= */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <Canvas
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          camera={{
            position: [0, 0, 14],
            fov: 48,
            near: 0.1,
            far: 300,
          }}
          className="pointer-events-auto"
        >
          <color attach="background" args={["#05080E"]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 15, 20]} intensity={0.8} />
          <pointLight position={[0, 0, 0]} color="#FF6A2A" intensity={1.2} distance={30} />

          {/* Camera Director */}
          <StoryCameraRig
            progress={progress}
            pointerX={pointer.x}
            pointerY={pointer.y}
          />

          {/* Continuous Metamorphic Chapter Scenes */}
          <StoryConstellation3D progress={progress} />
          <StoryPortal3D progress={progress} />
          <StoryHero3D progress={progress} />
          <StoryPhilosophy3D progress={progress} />
          <StoryProject3D
            progress={progress}
            selectedSlug={selectedProjectSlug}
            onSelectProject={setSelectedProjectSlug}
          />
          <StoryCapability3D
            progress={progress}
            activeDomain={selectedDomainId}
            onSelectDomain={setSelectedDomainId}
          />
          <StorySubsystem3D
            progress={progress}
            activeNode={selectedSubsystemNode}
            onSelectNode={setSelectedSubsystemNode}
          />
          <StoryPrivantrix3D progress={progress} />
          <StoryVision3D progress={progress} />
          <StoryContact3D progress={progress} />
        </Canvas>
      </div>

      {/* ========================================================================= */}
      {/* TALL VIRTUAL SCROLL TRACK (Drives Cinematic Camera Progress) */}
      {/* 1100vh ensures measured, deliberate, cinematic pacing through all 10 chapters */}
      {/* ========================================================================= */}
      <div className="relative z-10 h-[1100vh] w-full pointer-events-none" />

      {/* ========================================================================= */}
      {/* CRISP DOM EDITORIAL OVERLAY (Headlines, Dossiers, Actions) */}
      {/* ========================================================================= */}
      <StoryOverlay
        currentChapter={currentChapter}
        progress={progress}
        selectedProjectSlug={selectedProjectSlug}
        onSelectProject={setSelectedProjectSlug}
        selectedDomainId={selectedDomainId}
        onSelectDomain={setSelectedDomainId}
        selectedSubsystemNode={selectedSubsystemNode}
        onSelectSubsystemNode={setSelectedSubsystemNode}
        onJumpToProgress={handleJumpToProgress}
        onOpenTerminal={onOpenTerminal}
      />

      {/* ========================================================================= */}
      {/* CINEMATIC NAVIGATION & SCRUBBER HUD */}
      {/* ========================================================================= */}
      <StoryHUD
        progress={progress}
        currentChapter={currentChapter}
        onJumpToProgress={handleJumpToProgress}
        onOpenTerminal={onOpenTerminal}
      />
    </div>
  );
}
