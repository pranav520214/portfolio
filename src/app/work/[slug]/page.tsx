import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FLAGSHIP_PROJECTS } from "@/data/portfolioContent";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { ExperimentCard } from "@/components/projects/ExperimentCard";
import { WhatBrokeCard } from "@/components/projects/WhatBrokeCard";
import { ArrowLeft, ArrowRight, ExternalLink, Code, AlertCircle } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return FLAGSHIP_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = FLAGSHIP_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study | Pranav Mishra`,
    description: project.subtitle,
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const projectIndex = FLAGSHIP_PROJECTS.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = FLAGSHIP_PROJECTS[projectIndex];
  const nextProject = FLAGSHIP_PROJECTS[(projectIndex + 1) % FLAGSHIP_PROJECTS.length];

  return (
    <main className="min-h-screen bg-[#0D0F12] text-[#F1F5F9] pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#262E3B] pb-4">
          <Link
            href="/#work"
            className="flex items-center gap-1.5 font-mono text-xs text-[#94A3B8] hover:text-[#F59E0B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO WORK</span>
          </Link>
          <div className="font-mono text-xs text-[#64748B]">
            PROJECT {project.number} // CASE STUDY
          </div>
        </div>

        {/* Header Title & Core Question */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="bg-[#F59E0B] text-[#0D0F12] px-2.5 py-1 rounded font-bold">
              {project.status}
            </span>
            <span className="text-[#F59E0B] font-bold uppercase tracking-wider">
              {project.domain}
            </span>
            <span className="text-[#64748B]">• {project.year}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#F1F5F9]">
              {project.title}
            </h1>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14171E] border border-[#262E3B] text-xs font-mono text-[#F1F5F9] hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors"
            >
              <span>GitHub ↗</span>
            </a>
          </div>

          <p className="text-lg text-[#94A3B8] font-medium">
            {project.subtitle}
          </p>

          {/* Disclaimer if present */}
          {project.disclaimer && (
            <div className="p-3.5 bg-amber-950/20 border border-amber-800/60 rounded-lg flex items-start gap-2.5 text-xs text-amber-300 font-mono">
              <AlertCircle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-[#F59E0B] uppercase">Notice: </strong>
                {project.disclaimer}
              </div>
            </div>
          )}

          <div className="p-5 bg-[#14171E] border-l-4 border-l-[#F59E0B] border border-[#262E3B] rounded-r-xl mt-6">
            <div className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-1">
              CORE RESEARCH & ENGINEERING QUESTION
            </div>
            <p className="text-lg font-semibold text-[#F1F5F9]">
              &ldquo;{project.question}&rdquo;
            </p>
          </div>
        </header>

        {/* Constraint & First Approach */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-[#14171E] border border-[#262E3B] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              THE CONSTRAINT
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
              {project.constraint}
            </p>
          </div>

          <div className="bg-[#14171E] border border-[#262E3B] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              FIRST APPROACH & WHY IT FAILED
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
              {project.firstApproach}
            </p>
          </div>
        </section>

        {/* System Architecture */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
            SYSTEM DATAFLOW ARCHITECTURE
          </div>
          <ArchitectureDiagram nodes={project.architectureNodes} slug={project.slug} />
        </section>

        {/* Build & Implementation */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
            BUILD & RUNTIME IMPLEMENTATION
          </div>
          <div className="bg-[#14171E] border border-[#262E3B] p-6 sm:p-8 rounded-xl space-y-4">
            <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
              {project.build.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="font-mono text-xs text-[#64748B] mr-2">VERIFIED TECHNOLOGIES:</span>
              {project.build.coreTech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs bg-[#1C212B] text-[#F1F5F9] border border-[#262E3B] px-2.5 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.build.codeSnippet && (
              <div className="mt-4 pt-4 border-t border-[#262E3B]">
                <div className="font-mono text-xs text-[#94A3B8] mb-2 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>CORE IMPLEMENTATION: {project.build.codeSnippet.filename}</span>
                </div>
                <pre className="p-4 bg-[#0D0F12] text-[#F1F5F9] font-mono text-xs rounded-lg overflow-x-auto leading-relaxed border border-[#262E3B]">
                  <code>{project.build.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* Experiment & Result */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
            MEASURED EXPERIMENTS
          </div>
          {project.experiments.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}

          <div className="bg-[#14171E] border border-[#262E3B] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              MEASURED RESULT
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
              {project.result}
            </p>
          </div>
        </section>

        {/* What Broke & Iteration */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
            FAILURE AUTOPSY
          </div>
          {project.whatBroke.map((fail) => (
            <WhatBrokeCard key={fail.id} failure={fail} />
          ))}

          <div className="bg-[#14171E] border border-[#262E3B] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              ITERATION & FIX
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
              {project.iteration}
            </p>
          </div>
        </section>

        {/* Limitations & Next Question */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-[#14171E] border border-[#262E3B] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
              CURRENT LIMITATION
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
              {project.currentLimitation}
            </p>
          </div>

          <div className="bg-[#14171E] border border-[#262E3B] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
              NEXT QUESTION
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
              {project.nextQuestion}
            </p>
          </div>
        </section>

        {/* Reflection */}
        <div className="p-6 bg-[#14171E] border-l-4 border-l-[#F59E0B] border border-[#262E3B] rounded-r-xl space-y-2">
          <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
            ENGINEERING LESSON
          </div>
          <p className="italic text-sm sm:text-base text-[#F1F5F9] leading-relaxed font-sans">
            &ldquo;{project.reflection}&rdquo;
          </p>
        </div>

        {/* Evidence & Documents */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
            EVIDENCE & ARTIFACTS
          </div>
          <div className="space-y-2">
            {project.evidence.map((ev, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-[#14171E] border border-[#262E3B] rounded-xl font-mono text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="bg-[#1C212B] text-[#F59E0B] border border-[#262E3B] text-[10px] px-2 py-0.5 rounded font-bold">
                    {ev.type}
                  </span>
                  <span className="font-bold text-[#F1F5F9]">{ev.label}</span>
                  <span className="text-[#94A3B8] hidden sm:inline">— {ev.detail}</span>
                </div>
                {ev.link && (
                  <a
                    href={ev.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F59E0B] hover:underline flex items-center gap-1"
                  >
                    <span>VIEW ↗</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="border-t border-[#262E3B] pt-8 flex items-center justify-between font-mono text-xs">
          <Link
            href="/#work"
            className="text-[#94A3B8] hover:text-[#F1F5F9] flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO SELECTED WORK</span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="text-[#F59E0B] hover:underline flex items-center gap-1 font-bold"
          >
            <span>NEXT CASE STUDY: {nextProject.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
