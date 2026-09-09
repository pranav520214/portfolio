"use client";

import React, { useState } from "react";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { ProjectModuleCard } from "./ProjectModuleCard";
import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";
import { Cpu, Filter, Layers } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface ProjectsSectionProps {
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}

export function ProjectsSection({ selectedProjectId, onClearSelectedProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [modalProject, setModalProject] = useState<Project | null>(() => {
    if (selectedProjectId) {
      return FEATURED_PROJECTS.find((p) => p.id === selectedProjectId) || null;
    }
    return null;
  });

  // Keep synced if parent selects project
  React.useEffect(() => {
    if (selectedProjectId) {
      const found = FEATURED_PROJECTS.find((p) => p.id === selectedProjectId);
      if (found) setModalProject(found);
    }
  }, [selectedProjectId]);

  const categories = [
    { id: "all", label: `ALL BUILDS (${FEATURED_PROJECTS.length})` },
    { id: "ai", label: "AI & SPEECH" },
    { id: "embedded", label: "EMBEDDED & AVIONICS" },
    { id: "aerospace", label: "AEROSPACE & CAD" },
    { id: "systems", label: "SYSTEMS & SOFTWARE" },
  ];

  const filteredProjects = FEATURED_PROJECTS.filter((proj) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ai")
      return proj.disciplines.some((d) => d.toLowerCase().includes("ai") || d.toLowerCase().includes("speech"));
    if (activeFilter === "embedded")
      return proj.disciplines.some((d) => d.toLowerCase().includes("embedded") || d.toLowerCase().includes("avionics") || d.toLowerCase().includes("iot"));
    if (activeFilter === "aerospace")
      return proj.disciplines.some((d) => d.toLowerCase().includes("aerospace") || d.toLowerCase().includes("cad") || d.toLowerCase().includes("physics"));
    if (activeFilter === "systems")
      return proj.disciplines.some((d) => d.toLowerCase().includes("systems") || d.toLowerCase().includes("software") || d.toLowerCase().includes("desktop"));
    return true;
  });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-comic-yellow bg-blueprint-900/80 border border-comic-yellow/30 px-3 py-1 rounded mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>04 // CLASSIFIED RESEARCH & ENGINEERING BUILDS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-technical-white tracking-tight">
            ENGINEERING <span className="text-comic-yellow">MODULES</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-technical-cream/80 max-w-2xl">
            Real systems engineered from first principles: from compact multilingual streaming speech models 
            and verification-first agents to Kalman flight avionics and electromagnetic space-launch assist.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 bg-blueprint-950 p-1.5 rounded-lg border border-comic-yellow/30 self-start md:self-auto font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sounds.playClick();
                setActiveFilter(cat.id);
              }}
              className={`px-3 py-1.5 rounded transition-all ${
                activeFilter === cat.id
                  ? "bg-comic-yellow text-blueprint-950 font-bold shadow-comic"
                  : "text-technical-cream/70 hover:text-comic-yellow hover:bg-blueprint-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectModuleCard
            key={project.id}
            project={project}
            onOpen={(p) => setModalProject(p)}
          />
        ))}
      </div>

      {/* Project Case Study Deep Dive Modal */}
      <ProjectCaseStudyModal
        project={modalProject}
        onClose={() => {
          setModalProject(null);
          if (onClearSelectedProject) onClearSelectedProject();
        }}
      />
    </section>
  );
}
