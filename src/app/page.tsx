"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { BootSequence } from "@/components/intro/BootSequence";
import { TerminalModal } from "@/components/terminal/TerminalModal";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { HowIBuildSection } from "@/components/editorial/HowIBuildSection";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
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
    <main className="relative min-h-screen bg-[#0D0F12] text-[#F1F5F9] selection:bg-[#F59E0B] selection:text-[#0D0F12]">
      {/* Optional Workstation Boot Diagnostic */}
      {!bootDone && <BootSequence onComplete={handleBootComplete} />}

      {/* Subtle Engineering Blueprint Grid */}
      <BlueprintGrid />

      {/* Top Navigation Bar */}
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
        {/* 1. HERO */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* 2. SELECTED WORK (5 VERIFIED PUBLIC PROJECTS) */}
        <ProjectsSection />

        {/* 3. ENGINEERING APPROACH (IDEA → ARCHITECT → BUILD → BREAK → ITERATE) */}
        <HowIBuildSection />

        {/* 4. CAPABILITIES (LOCAL AI, DESKTOP SYSTEMS, EMBEDDED, SIMULATION) */}
        <CapabilitiesSection />

        {/* 5. ABOUT (STUDENT ENGINEER PERSPECTIVE) */}
        <AboutSection />

        {/* 6. CONTACT & FOOTER */}
        <ContactSection />
      </div>
    </main>
  );
}
