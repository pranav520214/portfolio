"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { AboutSection } from "@/components/about/AboutSection";
import { EngineeringPhilosophy } from "@/components/editorial/EngineeringPhilosophy";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import { QuestionsSection } from "@/components/editorial/QuestionsSection";
import { EngineeringNotebookSection } from "@/components/notebook/EngineeringNotebookSection";
import { PrivantrixSection } from "@/components/privantrix/PrivantrixSection";
import { MilestonesSection } from "@/components/achievements/MilestonesSection";
import { VisionSection } from "@/components/vision/VisionSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { TerminalModal } from "@/components/terminal/TerminalModal";
import { FeaturePortalModal } from "@/components/portal/FeaturePortalModal";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track active section for clean navbar highlighting
  useEffect(() => {
    const sections = [
      "hero",
      "work",
      "about",
      "philosophy",
      "capabilities",
      "research",
      "notebook",
      "privantrix",
      "milestones",
      "vision",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard shortcut for CLI Terminal HUD [` or ~]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Smooth natural scroll navigation with fixed header offset compensation
  const handleNavigate = (sectionId: string) => {
    let targetId = sectionId;
    if (targetId === "projects" || targetId === "archive") targetId = "work";
    if (targetId === "approach") targetId = "philosophy";
    if (targetId === "skills" || targetId === "stack") targetId = "capabilities";
    if (targetId === "questions") targetId = "research";
    if (targetId === "notes") targetId = "notebook";
    if (targetId === "achievements" || targetId === "timeline") targetId = "milestones";
    if (targetId === "email") targetId = "contact";

    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 68;
      const y = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({
        top: Math.max(0, y),
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#070708] text-[#f2f2ed] selection:bg-[#ff5a36]/30 selection:text-[#f2f2ed] overflow-x-hidden font-sans">
      {/* 00: Minimalist Sticky Header */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* 01: Hero Section */}
      <HeroSection
        onNavigate={handleNavigate}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenPortal={() => setPortalOpen(true)}
      />

      {/* 02: Selected Flagship Work (5 projects, alternating showcase) */}
      <ProjectsSection
        onOpenPortal={() => setPortalOpen(true)}
      />

      {/* 03: About & Engineering Background */}
      <AboutSection />

      {/* 03b: Dark Spring Kinetic Editorial Philosophy (BUILD. TEST. FAIL. MEASURE. REBUILD.) */}
      <EngineeringPhilosophy />

      {/* 04: Domain Competencies & Technical Capabilities */}
      <CapabilitiesSection />

      {/* 05: Editorial Research Questions */}
      <QuestionsSection />

      {/* 05b: Physical Engineering Notebook Pages */}
      <EngineeringNotebookSection />

      {/* 06: Privantrix Aerospace (Delta Wing & ISRO Appraisal) */}
      <PrivantrixSection />

      {/* 07: Milestones & Chronological Verified Timeline */}
      <MilestonesSection />

      {/* 08: Long-Term Engineering Vision */}
      <VisionSection />

      {/* 09: Contact & Direct Inquiries */}
      <ContactSection />

      {/* Interactive CLI Terminal HUD Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* High-Impact Particle Portal Micro-Interaction (1.4s Sharp Burst) */}
      <FeaturePortalModal
        isOpen={portalOpen}
        onComplete={() => setPortalOpen(false)}
      />
    </main>
  );
}
