"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Code2, ExternalLink, Terminal, Cpu } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioData";

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
      {/* Top Engineering Meta Header */}
      <div className="flex items-center justify-between border-b border-[#262E3B] pb-3 mb-8 text-xs font-mono text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
          <span className="text-[#F1F5F9] font-medium">STUDENT ENGINEER</span>
          <span className="text-[#64748B]">{"//"}</span>
          <span>PUNJAB, INDIA</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[#64748B]">
          <span>VERIFIED CODEBASES</span>
          <span>•</span>
          <span className="text-[#F59E0B]">ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Clear Identity & Positioning */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C212B] border border-[#262E3B] text-xs font-mono font-medium text-[#F59E0B]">
              <Cpu className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.role}</span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#F1F5F9] leading-[0.95]">
              {PERSONAL_INFO.name}
            </h1>
          </div>

          <div className="space-y-3 pt-1">
            <p className="text-xl sm:text-2xl font-semibold text-[#F1F5F9] leading-snug">
              {PERSONAL_INFO.headline}
            </p>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-xl">
              Student engineer focused on low-latency local speech and language models, embedded microcontroller firmware with real-time sensor fusion, and mechanistic simulation.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3 font-mono text-xs">
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate("work");
              }}
              className="flex items-center gap-2 bg-[#F59E0B] text-[#0D0F12] hover:bg-[#D97706] px-5 py-3 rounded-lg font-bold transition-colors shadow-sm"
            >
              <span>EXPLORE PROJECTS</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onNavigate("approach");
              }}
              className="flex items-center gap-2 bg-[#14171E] border border-[#262E3B] text-[#F1F5F9] hover:border-[#F59E0B] hover:bg-[#1C212B] px-4 py-3 rounded-lg transition-colors font-semibold"
            >
              <Code2 className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>ENGINEERING APPROACH</span>
            </button>

            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#F1F5F9] px-3 py-3 transition-colors font-semibold"
            >
              <span>GITHUB ↗</span>
            </a>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-1.5 text-[#64748B] hover:text-[#F1F5F9] px-2 py-3 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI [~]</span>
            </button>
          </div>

          {/* Subtle Social Links Dock */}
          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#64748B]">
            <span className="text-[11px] uppercase tracking-wider text-[#475569]">CHANNELS:</span>
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#F59E0B] transition-colors"
            >
              LinkedIn ↗
            </a>
            <span>•</span>
            <a
              href={SOCIAL_LINKS.x.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#F59E0B] transition-colors"
            >
              X ↗
            </a>
            <span>•</span>
            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#F59E0B] transition-colors"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        {/* Right Column: Workstation Visual Frame */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#262E3B] shadow-2xl bg-[#14171E] group">
            <Image
              src="/hero/hero-main.png"
              alt="Pranav Mishra - Hardware and Software Systems Engineering"
              fill
              priority
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle technical annotation overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-[#F1F5F9]/90 bg-[#14171E]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#262E3B]">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                <span>BENCH & FIRMWARE</span>
              </span>
              <span className="text-[#94A3B8]">AI × EMBEDDED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
