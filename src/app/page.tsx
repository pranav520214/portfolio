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

        {/* QUESTIONS I'M CHASING */}
        <QuestionsSection onSelectProject={(slug) => handleNavigate("work")} />

        {/* SELECTED WORK (3 FLAGSHIPS + ESCL-II + 3D EXPLODED VIEW) */}
        <ProjectsSection />

        {/* HOW I BUILD */}
        <HowIBuildSection />

        {/* ENGINEERING NOTEBOOK */}
        <EngineeringNotebookSection />

        {/* EXPERIMENT ARCHIVE */}
        <ExperimentArchiveSection />

        {/* EXTERNAL FEEDBACK */}
        <ExternalFeedbackSection />

        {/* MILESTONES */}
        <MilestonesSection />

        {/* ABOUT (HUMAN VOICE & SYSTEMS TOOLBOX) */}
        <AboutSection />

        {/* CONTACT & MINIMAL FOOTER */}
        <ContactSection />
      </div>
    </main>
  );
}
