"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, BookOpen, ExternalLink, Terminal } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { SOCIAL_LINKS } from "@/data/portfolioData";

interface HeroSectionProps {
  onNavigate: (id: string) => void;
  onOpenTerminal: () => void;
}

export function HeroSection({ onNavigate, onOpenTerminal }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] w-full flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto select-none"
    >
      {/* Top Editorial Annotation */}
      <div className="flex items-center justify-between border-b border-[#D8D6CD] pb-3 mb-8 text-xs font-mono text-[#666666]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D94431]" />
          <span>RESEARCH & ENGINEERING NOTEBOOK</span>
        </div>
        <div>
          <span>EST. 2026 // VOL. 01</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Clear Editorial Typography & Personal Thesis */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-[#111111] leading-[0.9]">
              PRANAV
            </h1>
            <p className="text-sm sm:text-base font-mono font-bold tracking-widest text-[#D94431] uppercase">
              CS + AI + ENGINEERING DESIGN
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xl sm:text-2xl font-semibold text-[#111111] leading-snug">
              I build intelligent systems where software meets the physical world.
            </p>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-xl">
              Most of my projects begin with a question, a constraint, or something I don&apos;t yet understand.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate("work");
              }}
              className="flex items-center gap-2 bg-[#111111] text-[#F5F4EF] hover:bg-[#D94431] px-5 py-3 rounded-md font-semibold transition-colors"
            >
              <span>VIEW SELECTED WORK</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onNavigate("notebook");
              }}
              className="flex items-center gap-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#F5F4EF] px-4 py-3 rounded-md transition-colors font-semibold"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>ENGINEERING NOTES</span>
            </button>

            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#555555] hover:text-[#111111] px-3 py-3 transition-colors font-semibold"
            >
              <span>GITHUB ↗</span>
            </a>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-1.5 text-[#666666] hover:text-[#111111] px-2 py-3 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI [~]</span>
            </button>
          </div>
        </div>

        {/* Right Column: Engineering Visual Workstation Stage */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#111111]/80 shadow-md bg-[#0C0C0C]">
            <Image
              src="/hero/hero-main.png"
              alt="Pranav Mishra - Physical Engineering and Computational Systems"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Subtle technical annotation overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/80 bg-black/50 backdrop-blur px-2.5 py-1 rounded border border-white/10">
              <span>WORKSTATION // 01</span>
              <span>AVIONICS • SLM • SENSORS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
