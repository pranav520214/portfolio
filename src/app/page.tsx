"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar/Navbar";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { MagneticCursor } from "@/components/cursor/MagneticCursor";
import { BootSequence } from "@/components/intro/BootSequence";
import { TerminalModal } from "@/components/terminal/TerminalModal";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { AchievementsTimeline } from "@/components/achievements/AchievementsTimeline";
import { ContactSection } from "@/components/contact/ContactSection";
import { HeroSocialDock } from "@/components/social/HeroSocialDock";

// Dynamically import 3D WebGL sections for maximum client performance
const EngineeringBrain3D = dynamic(
  () => import("@/components/brain/EngineeringBrain3D").then((mod) => mod.EngineeringBrain3D),
  { ssr: false }
);

const ExplodedViewVisualizer = dynamic(
  () => import("@/components/hardware/ExplodedViewVisualizer").then((mod) => mod.ExplodedViewVisualizer),
  { ssr: false }
);

const TechConstellation3D = dynamic(
  () => import("@/components/toolbox/TechConstellation3D").then((mod) => mod.TechConstellation3D),
  { ssr: false }
);

export default function Home() {
  const [bootDone, setBootDone] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    // Check if boot sequence was already completed in this browser session
    const hasBooted = sessionStorage.getItem("pranav_boot_completed");
    if (hasBooted === "true") {
      setBootDone(true);
    }

    // Keyboard shortcut `~` (or Backquote) to toggle terminal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBootComplete = () => {
    setBootDone(true);
    sessionStorage.setItem("pranav_boot_completed", "true");
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectProjectFromBrain = (projectId: string) => {
    setSelectedProjectId(projectId);
    handleNavigate("projects");
  };

  return (
    <main className="relative min-h-screen bg-blueprint-950 text-technical-white selection:bg-comic-yellow selection:text-blueprint-950">
      {/* Cinematic Workstation Boot Intro */}
      {!bootDone && <BootSequence onComplete={handleBootComplete} />}

      {/* Desktop Engineering Magnetic Cursor */}
      <MagneticCursor />

      {/* Dynamic Procedural Blueprint Canvas */}
      <BlueprintGrid />

      {/* Top HUD Telemetry Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Interactive CLI Terminal HUD */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Desktop Floating Hero Social Dock */}
      <HeroSocialDock />

      {/* 01 // Hero Landing Experience */}
      <HeroSection
        onNavigate={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* 02 // Profile & Multidisciplinary Pillars */}
      <AboutSection />

      {/* 03 // 3D Interactive Engineering Brain */}
      <EngineeringBrain3D onSelectProject={handleSelectProjectFromBrain} />

      {/* 04 // Classified Engineering Project Modules */}
      <ProjectsSection
        selectedProjectId={selectedProjectId}
        onClearSelectedProject={() => setSelectedProjectId(null)}
      />

      {/* 05 // 3D Exploded-View Subsystems Inspector */}
      <ExplodedViewVisualizer />

      {/* 06 // 3D Technology Logo Constellation ("THE TOOLBOX") */}
      <TechConstellation3D />

      {/* 07 // Mission Record & Verified Proof Certificates */}
      <AchievementsTimeline />

      {/* 08 // Command Center Finale */}
      <ContactSection />
    </main>
  );
}
