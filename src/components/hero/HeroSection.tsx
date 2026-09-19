"use client";

import React from "react";
import { ArrowRight, Terminal, Cpu, ArrowUpRight } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioContent";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onNavigate: (id: string) => void;
  onOpenTerminal: () => void;
  onOpenPortal?: () => void;
}

export function HeroSection({ onNavigate, onOpenTerminal, onOpenPortal }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] w-full flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 max-w-7xl mx-auto select-none overflow-hidden"
    >
      {/* Background Subtle Ambient Glow & Fine Technical Grid */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#ff5a36]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#35d9ff]/08 blur-[120px] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-3 mb-10 text-xs font-mono text-[#a5acb8] gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#ff5a36] shadow-[0_0_8px_#ff5a36]" />
          <span className="text-[#f2f2ed] font-semibold tracking-wider">PORTFOLIO // 2026</span>
          <span className="text-[#6b7280]">/</span>
          <span className="text-[#a5acb8]">RESEARCH ENGINEER & FOUNDER</span>
          <span className="text-[#6b7280] hidden sm:inline">/</span>
          <span className="hidden sm:inline text-[#a5acb8]">PUNJAB, INDIA</span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/20 border border-emerald-800/30 px-2.5 py-0.5 rounded-full font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>5 VERIFIED HARDWARE & SOFTWARE SYSTEMS</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        {/* Left Column: Authoritative Engineering Identity */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111318] border border-white/10 text-xs font-mono text-[#a5acb8]">
              <Cpu className="w-3.5 h-3.5 text-[#ff5a36]" />
              <span>AI &bull; EMBEDDED SYSTEMS &bull; AVIONICS &bull; SIMULATION</span>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#f2f2ed] leading-[0.95]"
            >
              {PERSONAL_INFO.name.toUpperCase()}
            </motion.h1>
          </div>

          <div className="space-y-3 pt-1">
            <p className="text-xl sm:text-2xl font-bold text-[#f2f2ed] leading-snug tracking-tight font-sans">
              BUILDING INTELLIGENT SYSTEMS ACROSS SOFTWARE, SILICON AND THE PHYSICAL WORLD.
            </p>
            <p className="text-sm sm:text-base text-[#a5acb8] leading-relaxed max-w-xl font-sans">
              Engineering low-latency streaming speech models (<span className="text-[#f2f2ed] font-semibold">LocalFlow</span>), 
              high-frequency embedded flight stabilization (<span className="text-[#f2f2ed] font-semibold">AUTOSTABI</span>), 
              6-DOF IMU optical touch interfaces (<span className="text-[#f2f2ed] font-semibold">Wand Mouse</span>), 
              and stiff mechanistic differential equation simulation engines (<span className="text-[#f2f2ed] font-semibold">PRIVAVEDA</span>).
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs">
            {/* PRIMARY CTA: VIEW WORK */}
            <button
              onClick={() => {
                sounds.playClick();
                onNavigate("work");
              }}
              className="relative group flex items-center gap-3 bg-[#ff5a36] hover:bg-[#ff6f4e] text-white px-7 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(255,90,54,0.30)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>VIEW WORK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* SECONDARY CTA: GITHUB */}
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-2 bg-[#111318] border border-white/10 text-[#f2f2ed] hover:border-white/30 hover:bg-[#161922] px-6 py-4 rounded-xl transition-all font-semibold cursor-pointer text-sm"
            >
              <span>GITHUB</span>
              <ArrowUpRight className="w-4 h-4 text-[#a5acb8]" />
            </a>

            {/* CLI Terminal Shortcut */}
            <button
              onClick={() => {
                sounds.playKey();
                onOpenTerminal();
              }}
              className="flex items-center gap-2 bg-[#0d0e11] border border-white/10 text-[#a5acb8] hover:text-[#f2f2ed] hover:border-white/20 px-4 py-4 rounded-xl transition-colors cursor-pointer"
              title="Open CLI Terminal [~]"
            >
              <Terminal className="w-4 h-4 text-[#35d9ff]" />
              <span>CLI [~]</span>
            </button>
          </div>

          {/* Verified Channels Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#6b7280]">
            <span className="text-[10px] uppercase tracking-wider text-[#6b7280] font-bold">
              VERIFIED CHANNELS //
            </span>
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a5acb8] hover:text-[#ff5a36] transition-colors"
            >
              GitHub ↗
            </a>
            <span>&bull;</span>
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a5acb8] hover:text-[#ff5a36] transition-colors"
            >
              LinkedIn ↗
            </a>
            <span>&bull;</span>
            <a
              href={SOCIAL_LINKS.x.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a5acb8] hover:text-[#ff5a36] transition-colors"
            >
              X ↗
            </a>
            <span>&bull;</span>
            <a
              href="mailto:mpranav126@outlook.com"
              className="text-[#a5acb8] hover:text-[#ff5a36] transition-colors font-bold"
            >
              mpranav126@outlook.com ↗
            </a>
          </div>
        </div>

        {/* Right Column: LARGE REAL PORTRAIT (MAJOR ELEMENT OF HERO) */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Subtle Ambient Radial Glow Behind Portrait */}
          <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#ff5a36]/20 via-[#35d9ff]/10 to-transparent blur-3xl opacity-50 pointer-events-none" />

          {/* Large Engineering Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-72 h-84 sm:w-88 sm:h-[440px] lg:w-[410px] lg:h-[490px] rounded-2xl overflow-hidden border border-white/15 bg-[#0d0e11] shadow-2xl group"
            style={{
              boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 30px rgba(255,90,54,0.12)",
            }}
          >
            {/* The Authentic Illustrated Portrait */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/hero-portrait.png"
              alt="Pranav Kumar Mishra — Research Engineer"
              className="w-full h-full object-cover object-top scale-102 group-hover:scale-105 transition-transform duration-700"
            />

            {/* Subtle soft edge lighting & vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />

            {/* Precision Corner Brackets */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#ff5a36]" />
            <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#ff5a36]" />
            <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#35d9ff]" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#35d9ff]" />

            {/* Bottom Identifier Badge */}
            <div className="absolute bottom-4 inset-x-4 bg-[#111318]/90 border border-white/10 backdrop-blur-md rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] text-[#ff5a36] font-bold uppercase tracking-widest block">
                  RESEARCH ENGINEER &amp; FOUNDER
                </span>
                <span className="font-sans text-xs font-bold text-[#f2f2ed]">
                  PRANAV KUMAR MISHRA
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[9px] text-emerald-400 font-bold">ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
