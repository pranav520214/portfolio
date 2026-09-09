"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { Project } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";

interface ProjectModuleCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectModuleCard({ project, onOpen }: ProjectModuleCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  // 3D Perspective Tilt on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;
    setRotX(rX);
    setRotY(rY);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        sounds.playModuleOpen();
        onOpen(project);
      }}
      data-cursor="project"
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative bg-blueprint-900/90 hover:bg-blueprint-850 border-2 border-comic-yellow/50 hover:border-comic-yellow rounded-xl p-5 sm:p-6 shadow-comic hover:shadow-comic-lg cursor-pointer flex flex-col justify-between overflow-hidden transition-colors"
    >
      {/* Background Blueprint Grid Motif */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,230,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,230,0,0.04)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Card Header: Module Code & Status */}
      <div className="relative z-10">
        <div className="flex items-center justify-between border-b border-comic-yellow/20 pb-3 mb-4">
          <span className="font-mono text-xs font-bold text-comic-yellow uppercase tracking-widest">
            ID // {project.id.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
            {project.statusType.toUpperCase()}
          </span>
        </div>

        {/* Disciplines Chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.disciplines.map((d, i) => (
            <span
              key={i}
              className="font-mono text-[10px] text-technical-cream/80 bg-blueprint-950 px-2 py-0.5 rounded border border-comic-yellow/15"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Project Title & Subtitle */}
        <h3 className="font-black text-lg sm:text-xl text-technical-white group-hover:text-comic-yellow transition-colors tracking-tight mb-1">
          {project.title}
        </h3>
        <p className="text-xs text-technical-cream/80 line-clamp-2 mb-4 leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* Card Footer: Tech Stack & Interactive CTA */}
      <div className="relative z-10 pt-4 border-t border-comic-yellow/20">
        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="font-mono text-[10px] text-technical-muted bg-blueprint-950/80 px-1.5 py-0.5 rounded border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="font-mono text-[10px] text-comic-yellow/70 px-1">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between font-mono text-xs text-comic-yellow font-bold group-hover:translate-x-1 transition-transform">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>OPEN MODULE</span>
          </span>
          <ArrowRight className="w-4 h-4 text-comic-yellow" />
        </div>
      </div>
    </div>
  );
}
