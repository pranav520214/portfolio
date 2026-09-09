"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download, Terminal, CheckSquare, Sparkles, Send } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";
import { MobileSocialBar } from "../social/HeroSocialDock";

// Dynamically import 3D WebGL Scene with SSR disabled for optimal loading performance
const Hero3DScene = dynamic(
  () => import("./Hero3DScene").then((mod) => mod.Hero3DScene),
  { ssr: false }
);

interface HeroSectionProps {
  onNavigate: (id: string) => void;
  onOpenTerminal: () => void;
}

export function HeroSection({ onNavigate, onOpenTerminal }: HeroSectionProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for parallax depth layers
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Transform depths for multiple visual planes
  const layerBgX = useTransform(springX, [-1, 1], [-12, 12]);
  const layerBgY = useTransform(springY, [-1, 1], [-8, 8]);

  const layerMidX = useTransform(springX, [-1, 1], [-20, 20]);
  const layerMidY = useTransform(springY, [-1, 1], [-15, 15]);

  const layerFgX = useTransform(springX, [-1, 1], [15, -15]);
  const layerFgY = useTransform(springY, [-1, 1], [10, -10]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-16 pb-12 overflow-hidden select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <Hero3DScene />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
        
        {/* Top Floating Engineering Badges */}
        <div className="w-full flex justify-between items-center mb-4 text-[11px] font-mono text-comic-yellow/75 tracking-wider">
          <motion.div
            style={{ x: layerBgX, y: layerBgY }}
            className="flex items-center gap-2 bg-blueprint-900/80 border border-comic-yellow/30 px-3 py-1 rounded backdrop-blur"
          >
            <span className="w-2 h-2 rounded-full bg-comic-yellow animate-ping" />
            <span>LOC: JALANDHAR // RESEARCH LAB</span>
          </motion.div>

          <motion.div
            style={{ x: layerBgX, y: layerBgY }}
            className="hidden sm:flex items-center gap-2 bg-blueprint-900/80 border border-comic-yellow/30 px-3 py-1 rounded backdrop-blur"
          >
            <span>BUILD // 2026 // ISEF + ISRO AERO</span>
          </motion.div>
        </div>

        {/* Hero Visual Poster Stage with 3D Parallax */}
        <div className="relative w-full max-w-5xl aspect-[16/9] min-h-[440px] sm:min-h-[520px] rounded-2xl overflow-hidden border-2 sm:border-4 border-comic-yellow/70 shadow-comic-lg bg-blueprint-900">
          
          {/* Base Layer: High-Res Master Artwork */}
          <motion.div
            style={{ x: layerBgX, y: layerBgY }}
            className="absolute inset-[-4%] w-[108%] h-[108%]"
          >
            <Image
              src="/hero/hero-main.png"
              alt="Pranav Mishra - CS + AI + Engineering Design"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>

          {/* Ambient Lighting & Glare Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blueprint-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Interactive Depth Overlays: Interactive Annotations */}
          <motion.div
            style={{ x: layerMidX, y: layerMidY }}
            className="absolute top-6 left-6 sm:top-10 sm:left-10 z-30 pointer-events-auto"
          >
            <div
              data-cursor="3d"
              className="group cursor-pointer inline-block"
              onClick={() => sounds.playClick()}
            >
              <h1 className="font-black text-4xl sm:text-7xl lg:text-8xl tracking-tighter text-comic-yellow drop-shadow-[4px_4px_0px_#000000] group-hover:scale-105 transition-transform duration-200">
                PRANAV
              </h1>
              <p className="font-bold text-sm sm:text-xl lg:text-2xl tracking-wide text-technical-white drop-shadow-[2px_2px_0px_#000000] -mt-1 sm:-mt-2">
                CS + AI + ENGINEERING DESIGN
              </p>
            </div>
          </motion.div>

          {/* Capability Checklist Badge (Bottom Left Overlay) */}
          <motion.div
            style={{ x: layerFgX, y: layerFgY }}
            className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 z-30 hidden sm:block bg-blueprint-950/90 border border-comic-yellow/50 rounded-lg p-3 backdrop-blur shadow-comic"
          >
            <div className="font-mono text-[10px] text-comic-yellow font-bold uppercase tracking-wider mb-1.5 border-b border-comic-yellow/20 pb-1">
              DISCIPLINARY CORES
            </div>
            <ul className="space-y-1 font-mono text-[11px] text-technical-white">
              {PERSONAL_INFO.capabilities.slice(0, 5).map((cap, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-comic-yellow shrink-0" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Value Motto Badge (Bottom Right Overlay) */}
          <motion.div
            style={{ x: layerMidX, y: layerMidY }}
            className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-30 bg-blueprint-950/90 border border-comic-yellow/50 rounded-lg p-3 sm:p-4 backdrop-blur shadow-comic text-right max-w-[240px] sm:max-w-xs"
          >
            <div className="font-mono text-[10px] text-comic-yellow uppercase tracking-widest font-bold mb-1">
              PHILOSOPHY //
            </div>
            <p className="font-sans font-bold text-xs sm:text-sm text-technical-white leading-snug">
              &quot;Ideas. Code. Design. Build. Repeat.&quot;
            </p>
            <p className="font-mono text-[10px] text-technical-cream/70 mt-1">
              Human ideas + AI = bigger possibilities.
            </p>
          </motion.div>
        </div>

        {/* Hero Actions Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 z-30"
        >
          {/* Primary CTA: View Projects */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("projects");
            }}
            data-cursor="project"
            className="flex items-center gap-2 bg-comic-yellow hover:bg-comic-bright text-blueprint-950 font-black px-6 py-3 rounded-lg shadow-comic hover:shadow-comic-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm tracking-wide uppercase"
          >
            <span>EXPLORE BUILDS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary CTA: Download CV */}
          <a
            href="/Pranav_Kumar_Mishra_Technical_CV_Updated_2026.docx"
            download
            onClick={() => sounds.playClick()}
            className="flex items-center gap-2 bg-blueprint-900/90 hover:bg-blueprint-850 text-technical-white border-2 border-comic-yellow/60 hover:border-comic-yellow px-5 py-3 rounded-lg shadow-sm transition-all text-sm font-bold tracking-wide uppercase"
          >
            <Download className="w-4 h-4 text-comic-yellow" />
            <span>DOWNLOAD CV</span>
          </a>

          {/* Tertiary: Inspect Toolbox */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("toolbox");
            }}
            data-cursor="3d"
            className="flex items-center gap-2 bg-blueprint-900/90 hover:bg-blueprint-850 text-technical-cream/90 border border-comic-yellow/30 hover:border-comic-yellow px-4 py-3 rounded-lg transition-colors text-sm font-mono"
          >
            <Sparkles className="w-4 h-4 text-comic-yellow" />
            <span>3D TOOLBOX</span>
          </button>

          {/* Open Terminal HUD */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-2 bg-blueprint-950/80 hover:bg-blueprint-900 text-comic-yellow border border-comic-yellow/40 px-4 py-3 rounded-lg transition-colors text-sm font-mono"
          >
            <Terminal className="w-4 h-4" />
            <span>TERMINAL [~]</span>
          </button>

          {/* Contact Jump */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("contact");
            }}
            data-cursor="contact"
            className="flex items-center gap-1.5 text-technical-cream/80 hover:text-comic-yellow font-mono text-xs px-3 py-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>CONTACT ↗</span>
          </button>
        </motion.div>

        {/* Mobile Contextual Social Bar */}
        <MobileSocialBar />

        {/* Ambient Telemetry Readout */}
        <div className="mt-6 flex items-center justify-center gap-6 font-mono text-[11px] text-technical-cream/60">
          <span>AI RESEARCH</span>
          <span className="text-comic-yellow">◆</span>
          <span>EMBEDDED AVIONICS</span>
          <span className="text-comic-yellow">◆</span>
          <span>AEROSPACE SYSTEMS</span>
          <span className="text-comic-yellow">◆</span>
          <span>SOFTWARE ASSURANCE</span>
        </div>
      </div>
    </section>
  );
}
