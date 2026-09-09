"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navbar/Navbar";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { BootSequence } from "@/components/intro/BootSequence";
import { TerminalModal } from "@/components/terminal/TerminalModal";
import { HeroSection } from "@/components/hero/HeroSection";
import { PersonalThesis } from "@/components/editorial/PersonalThesis";
import { QuestionsSection } from "@/components/editorial/QuestionsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { HowIBuildSection } from "@/components/editorial/HowIBuildSection";
import { EngineeringNotebookSection } from "@/components/notebook/EngineeringNotebookSection";
import { ExperimentArchiveSection } from "@/components/projects/ExperimentArchiveSection";
import { ExternalFeedbackSection } from "@/components/feedback/ExternalFeedbackSection";
import { MilestonesSection } from "@/components/achievements/MilestonesSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";

// Dynamically import 3D WebGL Exploded View with SSR disabled for optimal loading
const ExplodedViewVisualizer = dynamic(
  () => import("@/components/hardware/ExplodedViewVisualizer").then((mod) => mod.ExplodedViewVisualizer),
  { ssr: false }
);

export default function Home() {
  const [bootDone, setBootDone] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const hasBooted = sessionStorage.getItem("pranav_boot_completed");
    if (hasBooted === "true") {
      setBootDone(true);
    }

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

  return (
    <main className="relative min-h-screen bg-[#F5F4EF] text-[#111111] selection:bg-[#111111] selection:text-[#F5F4EF]">
      {/* Workstation Boot Intro */}
      {!bootDone && <BootSequence onComplete={handleBootComplete} />}

      {/* Engineering Blueprint Paper Grid */}
      <BlueprintGrid />

      {/* Top Editorial Navigation Bar */}
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

      <div className="relative z-10">
        {/* HERO */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* PERSONAL ENGINEERING THESIS */}
        <PersonalThesis />

        {/* SECTION 01 — QUESTIONS I'M CHASING */}
        <QuestionsSection onSelectProject={(slug) => handleNavigate("work")} />

        {/* SECTION 02 — SELECTED WORK (3 FLAGSHIPS + ESCL-II) */}
        <ProjectsSection />

        {/* LAB INSTRUMENTATION — 3D EXPLODED VIEW */}
        <ExplodedViewVisualizer />

        {/* SECTION 03 — HOW I BUILD */}
        <HowIBuildSection />

        {/* SECTION 04 — ENGINEERING NOTEBOOK */}
        <EngineeringNotebookSection />

        {/* SECTION 05 — EXPERIMENT ARCHIVE */}
        <ExperimentArchiveSection />

        {/* SECTION 06 — EXTERNAL FEEDBACK */}
        <ExternalFeedbackSection />

        {/* SECTION 07 — MILESTONES */}
        <MilestonesSection />

        {/* SECTION 08 — ABOUT (HUMAN VOICE & SYSTEMS TOOLBOX) */}
        <AboutSection />

        {/* SECTION 09 — CONTACT & MINIMAL FOOTER */}
        <ContactSection />
      </div>
    </main>
  );
}
