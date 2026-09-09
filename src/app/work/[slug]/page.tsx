import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { FLAGSHIP_PROJECTS } from "@/data/portfolioContent";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { ExperimentCard } from "@/components/projects/ExperimentCard";
import { WhatBrokeCard } from "@/components/projects/WhatBrokeCard";
import { ArrowLeft, ArrowRight, ExternalLink, Code, FileText, CheckCircle2 } from "lucide-react";

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
    <main className="min-h-screen bg-[#F5F4EF] text-[#111111] pt-12 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#D8D6CD] pb-4">
          <Link
            href="/#work"
            className="flex items-center gap-1.5 font-mono text-xs text-[#555555] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO WORK</span>
          </Link>
          <div className="font-mono text-xs text-[#888888]">
            FLAGSHIP {project.number} // CASE STUDY
          </div>
        </div>

        {/* Header Title & Core Question */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="bg-[#111111] text-[#F5F4EF] px-2.5 py-1 rounded font-bold">
              {project.status}
            </span>
            <span className="text-[#D94431] font-bold uppercase tracking-wider">
              {project.domain}
            </span>
            <span className="text-[#888888]">• {project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111]">
            {project.title}
          </h1>

          <p className="text-lg text-[#555555] font-medium">
            {project.subtitle}
          </p>

          <div className="p-5 bg-[#FFFFFF] border-l-4 border-l-[#D94431] border border-[#D8D6CD] rounded-r-xl mt-6">
            <div className="font-mono text-xs font-bold text-[#D94431] uppercase tracking-wider mb-1">
              01 // THE QUESTION THAT STARTED THE WORK
            </div>
            <p className="text-lg font-semibold text-[#111111]">
              &ldquo;{project.question}&rdquo;
            </p>
          </div>
        </header>

        {/* Section 02 & 03: Constraint & First Approach */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-[#FFFFFF] border border-[#D8D6CD] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
              02 // THE PHYSICAL & COMPUTATIONAL CONSTRAINT
            </div>
            <p className="text-sm text-[#444444] leading-relaxed">
              {project.constraint}
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#D8D6CD] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
              03 // FIRST APPROACH & WHY IT FAILED
            </div>
            <p className="text-sm text-[#444444] leading-relaxed">
              {project.firstApproach}
            </p>
          </div>
        </section>

        {/* Section 04: System Architecture */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
            04 // SYSTEM DATAFLOW ARCHITECTURE
          </div>
          <ArchitectureDiagram nodes={project.architectureNodes} slug={project.slug} />
        </section>

        {/* Section 05: Build & Implementation */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
            05 // ACTUAL IMPLEMENTATION & RUNTIME
          </div>
          <div className="bg-[#FFFFFF] border border-[#D8D6CD] p-6 sm:p-8 rounded-xl space-y-4">
            <p className="text-sm text-[#444444] leading-relaxed">
              {project.build.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="font-mono text-xs text-[#888888] mr-2">CORE TECHNOLOGIES:</span>
              {project.build.coreTech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs bg-[#EAE8DF] text-[#111111] px-2.5 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.build.codeSnippet && (
              <div className="mt-4 pt-4 border-t border-[#EAE8DF]">
                <div className="font-mono text-xs text-[#888888] mb-2 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-[#D94431]" />
                  <span>CORE IMPLEMENTATION: {project.build.codeSnippet.filename}</span>
                </div>
                <pre className="p-4 bg-[#0E0E0E] text-[#F5ECE2] font-mono text-xs rounded-lg overflow-x-auto leading-relaxed">
                  <code>{project.build.codeSnippet.code}</code>
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* Section 06 & 07: Experiment & Result */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
            06 // EXPERIMENT & BENCHMARKING
          </div>
          {project.experiments.map((exp) => (
            <ExperimentCard key={exp.id} experiment={exp} />
          ))}

          <div className="bg-[#FFFFFF] border border-[#D8D6CD] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
              07 // MEASURED RESULTS & OBSERVATIONS
            </div>
            <p className="text-sm text-[#444444] leading-relaxed">
              {project.result}
            </p>
          </div>
        </section>

        {/* Section 08 & 09: What Broke & Iteration */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
            08 // WHAT BROKE: VISIBLE FAILURE DIAGNOSIS
          </div>
          {project.whatBroke.map((fail) => (
            <WhatBrokeCard key={fail.id} failure={fail} />
          ))}

          <div className="bg-[#FFFFFF] border border-[#D8D6CD] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
              09 // ITERATION & ARCHITECTURAL CHANGES
            </div>
            <p className="text-sm text-[#444444] leading-relaxed">
              {project.iteration}
            </p>
          </div>
        </section>

        {/* Section 10 & 11: Limitations & Next Question */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="bg-[#FFFFFF] border border-[#D8D6CD] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#D94431] uppercase tracking-wider">
              10 // CURRENT LIMITATION
            </div>
            <p className="text-sm text-[#444444] leading-relaxed">
              {project.currentLimitation}
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#D8D6CD] p-6 rounded-xl space-y-2">
            <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
              11 // WHERE THE INVESTIGATION GOES NEXT
            </div>
            <p className="text-sm text-[#444444] leading-relaxed">
              {project.nextQuestion}
            </p>
          </div>
        </section>

        {/* Reflection */}
        <div className="p-6 bg-[#FFFFFF] border-l-4 border-l-[#111111] border border-[#D8D6CD] rounded-r-xl space-y-2">
          <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
            WHAT I LEARNED //
          </div>
          <p className="italic text-sm sm:text-base text-[#222222] leading-relaxed">
            &ldquo;{project.reflection}&rdquo;
          </p>
        </div>

        {/* Section 12: Evidence & Documents */}
        <section className="space-y-4 pt-4">
          <div className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider">
            12 // PRIMARY SOURCE EVIDENCE & DOCUMENTATION
          </div>
          <div className="space-y-2">
            {project.evidence.map((ev, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-[#FFFFFF] border border-[#D8D6CD] rounded-xl font-mono text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="bg-[#111111] text-[#F5F4EF] text-[10px] px-2 py-0.5 rounded font-bold">
                    {ev.type}
                  </span>
                  <span className="font-bold text-[#111111]">{ev.label}</span>
                  <span className="text-[#666666] hidden sm:inline">— {ev.detail}</span>
                </div>
                {ev.link && (
                  <a
                    href={ev.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D94431] hover:underline flex items-center gap-1"
                  >
                    <span>VIEW</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="border-t border-[#D8D6CD] pt-8 flex items-center justify-between font-mono text-xs">
          <Link
            href="/#work"
            className="text-[#555555] hover:text-[#111111] flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO OVERVIEW</span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="text-[#D94431] hover:underline flex items-center gap-1 font-bold"
          >
            <span>NEXT CASE STUDY: {nextProject.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
