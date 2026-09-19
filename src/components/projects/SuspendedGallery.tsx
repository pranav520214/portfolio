"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FLAGSHIP_PROJECTS } from "@/data/portfolioContent";
import { SPRING, EASE, DURATION, STAGGER } from "@/lib/motion";
import { ExternalLink, X, ChevronLeft, ChevronRight, Github } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { useQuality } from "@/lib/quality";
import Link from "next/link";

// ────────────────────────────────────────────
// Suspended Wire + Project Cards
// ────────────────────────────────────────────

interface SuspendedCardProps {
  project: (typeof FLAGSHIP_PROJECTS)[number];
  index: number;
  totalCards: number;
  isSelected: boolean;
  onSelect: () => void;
  enableSway: boolean;
}

function SuspendedCard({
  project,
  index,
  totalCards,
  isSelected,
  onSelect,
  enableSway,
}: SuspendedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Unique sway parameters per card
  const swayPeriod = 3.0 + index * 0.7;
  const swayPhase = index * 1.2;
  const swayAmplitude = enableSway ? 1.5 : 0;

  return (
    <motion.div
      ref={cardRef}
      layout
      className="relative flex flex-col items-center cursor-pointer group"
      style={{
        perspective: "800px",
        animation: enableSway
          ? `sway-${index} ${swayPeriod}s ease-in-out infinite`
          : undefined,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        sounds.playClick();
        onSelect();
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Clip attachment */}
      <div className="relative z-10 mb-[-2px]">
        <div className="w-8 h-5 bg-[#475569] rounded-t-sm border border-[#64748B] flex items-center justify-center">
          <div className="w-4 h-2 bg-[#334155] rounded-sm" />
        </div>
        {/* Thin wire segment going up to the main wire */}
        <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-[1.5px] h-3 bg-[#475569]" />
      </div>

      {/* Project Card */}
      <div
        className={`
          relative w-[260px] sm:w-[280px] bg-[#0D0F14] border rounded-xl
          overflow-hidden transition-all duration-300
          ${isHovered ? "border-[#D94431]/60 shadow-lg shadow-[#D94431]/10" : "border-[rgba(255,255,255,0.08)]"}
        `}
      >
        {/* Status indicator */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className="font-mono text-[10px] font-bold text-[#D94431] uppercase tracking-wider">
            {project.domain.split("•")[0]?.trim() || project.domain}
          </span>
          <span className="font-mono text-[10px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded font-bold">
            {project.status}
          </span>
        </div>

        {/* Title */}
        <div className="px-4 pb-3">
          <h3 className="text-base font-bold text-[#F1F5F9] leading-snug tracking-tight">
            {project.title.replace(/Ã¢â‚¬â€/g, "—").replace(/Ã¢â‚¬Â¢/g, "•")}
          </h3>
        </div>

        {/* Question preview */}
        <div className="px-4 pb-4">
          <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 font-sans">
            {project.question}
          </p>
        </div>

        {/* Tech tags */}
        <div className="px-4 pb-4 flex flex-wrap gap-1">
          {(project.build?.coreTech || []).slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.5 rounded tracking-wide"
            >
              {t}
            </span>
          ))}
          {(project.build?.coreTech || []).length > 3 && (
            <span className="font-mono text-[9px] text-[#64748B]">
              +{(project.build?.coreTech || []).length - 3}
            </span>
          )}
        </div>

        {/* Bottom action cue */}
        <div className="border-t border-[rgba(255,255,255,0.06)] px-4 py-2.5 flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#64748B] uppercase tracking-wider">
            CLICK TO INSPECT
          </span>
          <ExternalLink className="w-3 h-3 text-[#64748B] group-hover:text-[#D94431] transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────────
// Project Book (Opened State)
// ────────────────────────────────────────────

interface ProjectBookProps {
  project: (typeof FLAGSHIP_PROJECTS)[number];
  onClose: () => void;
}

function ProjectBook({ project, onClose }: ProjectBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);

  // Build pages from actual project data
  const pages = useMemo(() => {
    const p: { title: string; content: React.ReactNode }[] = [];

    // Page 1: Identity
    p.push({
      title: "SYSTEM IDENTITY",
      content: (
        <div className="space-y-4">
          <h3 className="text-2xl font-black text-[#F1F5F9] tracking-tight">
            {project.title.replace(/Ã¢â‚¬â€/g, "—").replace(/Ã¢â‚¬Â¢/g, "•")}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="font-mono text-[10px] bg-[#D94431] text-white px-2 py-0.5 rounded font-bold">
              {project.domain.replace(/Ã¢â‚¬Â¢/g, "•")}
            </span>
            <span className="font-mono text-[10px] bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded font-bold">
              {project.status}
            </span>
            <span className="font-mono text-[10px] bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-0.5 rounded font-bold">
              {project.year}
            </span>
          </div>
          <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
            {project.question}
          </p>
        </div>
      ),
    });

    // Page 2: Architecture (if nodes exist)
    if (project.architectureNodes && project.architectureNodes.length > 0) {
      p.push({
        title: "ARCHITECTURE",
        content: (
          <div className="space-y-3">
            {project.architectureNodes.map((node) => (
              <div
                key={node.id}
                className="bg-[#0D0F14] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 font-mono text-xs"
              >
                <div className="text-[#F59E0B] font-bold mb-1">{node.label}</div>
                <div className="text-[#94A3B8]">{node.sublabel}</div>
                <div className="text-[10px] text-[#64748B] mt-1 uppercase">{node.type}</div>
              </div>
            ))}
          </div>
        ),
      });
    }

    // Page 3: Experiments
    if (project.experiments && project.experiments.length > 0) {
      p.push({
        title: "EXPERIMENTS",
        content: (
          <div className="space-y-4">
            {project.experiments.map((exp, i) => (
              <div key={i} className="border-l-2 border-[#D94431] pl-4 space-y-1">
                <div className="font-mono text-xs font-bold text-[#F1F5F9]">{exp.title}</div>
                <div className="text-xs text-[#94A3B8] font-sans">{exp.setup}</div>
                <div className="text-xs text-[#10B981] font-mono">→ {exp.result || exp.measurement}</div>
              </div>
            ))}
          </div>
        ),
      });
    }

    // Page 4: Results & Limitations
    if (project.result || project.currentLimitation) {
      p.push({
        title: "RESULTS & LIMITATIONS",
        content: (
          <div className="space-y-4">
            {project.result && (
              <div>
                <div className="font-mono text-[10px] text-[#10B981] font-bold mb-2 uppercase tracking-wider">RESULT</div>
                <p className="text-sm text-[#F1F5F9] font-sans leading-relaxed">{project.result}</p>
              </div>
            )}
            {project.currentLimitation && (
              <div>
                <div className="font-mono text-[10px] text-[#F59E0B] font-bold mb-2 uppercase tracking-wider">CURRENT LIMITATION</div>
                <p className="text-sm text-[#94A3B8] font-sans leading-relaxed">
                  {project.currentLimitation.replace(/Ã¢â‚¬â€œ/g, "–").replace(/Ã¢â‚¬â€/g, "—")}
                </p>
              </div>
            )}
          </div>
        ),
      });
    }

    // Final page: Source
    if (project.githubUrl) {
      p.push({
        title: "SOURCE",
        content: (
          <div className="flex flex-col items-center justify-center h-full space-y-6 py-8">
            <div className="w-16 h-16 rounded-full bg-[#D94431]/10 flex items-center justify-center">
              <Github className="w-8 h-8 text-[#D94431]" />
            </div>
            <div className="text-center space-y-2">
              <div className="font-mono text-xs text-[#64748B] uppercase tracking-wider">
                SOURCE NODE AVAILABLE
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D94431] hover:bg-[#FF4D36] text-white font-mono text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
                VIEW SOURCE ON GITHUB
              </a>
            </div>
          </div>
        ),
      });
    }

    return p;
  }, [project]);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && currentPage < pages.length - 1) {
        sounds.playClick();
        setCurrentPage((p) => p + 1);
      }
      if (e.key === "ArrowLeft" && currentPage > 0) {
        sounds.playClick();
        setCurrentPage((p) => p - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, currentPage, pages.length]);

  // Focus trap
  useEffect(() => {
    bookRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        ref={bookRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`Project details: ${project.title}`}
        initial={{ scale: 0.85, rotateY: -30, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        exit={{ scale: 0.85, rotateY: 30, opacity: 0 }}
        transition={SPRING.heavy}
        className="relative bg-[#0D0F14] border border-[rgba(255,255,255,0.12)] rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl outline-none"
        style={{ perspective: "1200px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Book header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.08)]">
          <div className="font-mono text-xs">
            <span className="text-[#D94431] font-bold">FOLIO</span>
            <span className="text-[#64748B] mx-2">//</span>
            <span className="text-[#94A3B8]">
              PAGE {currentPage + 1} OF {pages.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#161B26] rounded-lg transition-colors"
            aria-label="Close project folio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Page content */}
        <div className="p-6 sm:p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 30, rotateY: 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -30, rotateY: -8 }}
              transition={{ duration: 0.3, ease: EASE.outExpo as any }}
            >
              <div className="font-mono text-[10px] text-[#D94431] font-bold uppercase tracking-[0.2em] mb-4">
                {pages[currentPage].title}
              </div>
              {pages[currentPage].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[rgba(255,255,255,0.08)]">
          <button
            onClick={() => {
              sounds.playClick();
              setCurrentPage((p) => Math.max(0, p - 1));
            }}
            disabled={currentPage === 0}
            className="flex items-center gap-1 font-mono text-xs text-[#94A3B8] hover:text-[#F1F5F9] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            PREV
          </button>

          {/* Page dots */}
          <div className="flex gap-1.5">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  sounds.playClick();
                  setCurrentPage(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentPage
                    ? "bg-[#D94431] scale-125"
                    : "bg-[#475569] hover:bg-[#64748B]"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setCurrentPage((p) => Math.min(pages.length - 1, p + 1));
            }}
            disabled={currentPage === pages.length - 1}
            className="flex items-center gap-1 font-mono text-xs text-[#94A3B8] hover:text-[#F1F5F9] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            NEXT
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Canonical page link */}
        <div className="px-6 pb-4">
          <Link
            href={`/work/${project.slug}`}
            className="font-mono text-[10px] text-[#64748B] hover:text-[#D94431] transition-colors underline"
          >
            [ VIEW FULL CASE STUDY → /work/{project.slug} ]
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ────────────────────────────────────────────
// Main Suspended Gallery Section
// ────────────────────────────────────────────

export function SuspendedGallery() {
  const quality = useQuality();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<
    (typeof FLAGSHIP_PROJECTS)[number] | null
  >(null);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.08)]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[rgba(255,255,255,0.08)] pb-5 mb-16">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D94431]" />
            <span>PRIMARY VERIFIED SYSTEMS // 05 FLAGSHIPS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9] mt-1">
            Selected Systems
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94A3B8] bg-[#121620] border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full">
          CLICK TO INSPECT • SUSPENDED INSTALLATION
        </div>
      </div>

      {/* Wire Line */}
      <div className="relative">
        {/* The suspension wire — SVG Bezier */}
        <svg
          className="absolute top-0 left-0 w-full h-4 pointer-events-none"
          viewBox="0 0 1000 16"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,2 Q 250,14 500,8 Q 750,2 1000,6"
            fill="none"
            stroke="#475569"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>

        {/* Cards hung from the wire */}
        <motion.div
          className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide pt-8 pb-4 px-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: STAGGER.card },
            },
          }}
        >
          {FLAGSHIP_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: {
                  opacity: selectedProject && selectedProject.slug !== project.slug ? 0.3 : 1,
                  y: 0,
                  transition: SPRING.standard,
                },
              }}
              className="flex-shrink-0"
            >
              <SuspendedCard
                project={project}
                index={idx}
                totalCards={FLAGSHIP_PROJECTS.length}
                isSelected={selectedProject?.slug === project.slug}
                onSelect={() => setSelectedProject(project)}
                enableSway={quality.enableProjectSway}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Book Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectBook
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Sway keyframes (injected as style) */}
      <style jsx>{`
        ${FLAGSHIP_PROJECTS.map(
          (_, i) => `
          @keyframes sway-${i} {
            0%, 100% { transform: rotate(${-1.5 + (i % 3) * 0.3}deg); }
            50% { transform: rotate(${1.5 - (i % 3) * 0.3}deg); }
          }
        `
        ).join("")}

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
