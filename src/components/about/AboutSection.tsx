"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Brain, Rocket, Code2, ShieldAlert, Award, Compass, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";

export function AboutSection() {
  const pillars = [
    {
      icon: Brain,
      title: "AI & Speech Research",
      tagline: "Compact SLMs & Multilingual Streaming ASR",
      description:
        "Developing lightweight streaming automatic speech recognition architectures tailored for resource-constrained devices, short-window continuous capture, and ISEF-targeted evaluation.",
      color: "border-comic-yellow",
      accent: "text-comic-yellow"
    },
    {
      icon: ShieldAlert,
      title: "Software Assurance",
      tagline: "Verification-First Code Repair Agents",
      description:
        "Project lead on Rudra Sentinel in collaboration with Penn State researcher Vidyut Sriram: combining AST analysis, CWE-guided retrieval, and containerized sandboxes for verified patch generation.",
      color: "border-blue-400",
      accent: "text-blue-400"
    },
    {
      icon: Cpu,
      title: "Embedded Avionics",
      tagline: "Kalman Filter Sensor Fusion & Control Loops",
      description:
        "Leading school ATL fixed-wing flight control: custom ESP32 + MPU6500 avionics boards executing 250Hz Kalman attitude estimation, iBUS telemetry, and auto-level stabilization.",
      color: "border-emerald-400",
      accent: "text-emerald-400"
    },
    {
      icon: Rocket,
      title: "Aerospace Engineering",
      tagline: "Electromagnetic Space Launch Architectures",
      description:
        "Conceived ESCL-II: evacuated linear electromagnetic launch assist system paired with upper stage rockets; evaluated and critiqued with encouraging feedback from the ISRO Science Programme Office.",
      color: "border-amber-400",
      accent: "text-amber-400"
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="mb-14 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-comic-yellow bg-blueprint-900/80 border border-comic-yellow/30 px-3 py-1 rounded mb-3">
          <span>02 // PROFILE & MULTIDISCIPLINARY ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-technical-white tracking-tight">
          ONE PERSON. <span className="text-comic-yellow">MULTIPLE SYSTEMS.</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-technical-cream/80 max-w-3xl leading-relaxed">
          I am a Class XI student at Army Public School, Jalandhar Cantt, who learns by building. 
          My standard process is simple: turn a question into a working prototype, test it, log what breaks, 
          and seek external critique from researchers and domain scientists.
        </p>
      </div>

      {/* Narrative & Working Style Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Main Bio Card */}
        <div className="lg:col-span-2 bg-blueprint-900/85 border-2 border-comic-yellow/40 rounded-xl p-6 sm:p-8 shadow-comic backdrop-blur">
          <div className="flex items-center justify-between border-b border-comic-yellow/20 pb-4 mb-5">
            <span className="font-mono text-xs text-comic-yellow font-bold uppercase tracking-wider">
              ENGINEERING MANIFESTO
            </span>
            <span className="font-mono text-xs text-technical-cream/60">
              FIRST PRINCIPLES ONLY
            </span>
          </div>
          
          <div className="space-y-4 text-sm sm:text-base text-technical-cream leading-relaxed">
            <p>
              I build at the intersection of <strong className="text-comic-yellow">AI, low-level software, and physical engineering systems</strong>. 
              Rather than chasing superficial API wrappers, I focus on making ambitious compute ideas function reliably on 
              <strong> constrained consumer hardware and microcontrollers</strong>.
            </p>
            <p>
              Whether it is formulating acoustic feature representations for compact multilingual speech recognition, 
              tuning Kalman state estimation at 250Hz for fixed-wing airframes, or architecting verification gates that prevent 
              hallucinated code patches, I believe in <strong>honest prototypes, logged experiments, and reproducible evidence</strong>.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-comic-yellow/20 font-mono">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-comic-yellow">#56</div>
              <div className="text-[11px] text-technical-cream/70 uppercase">STEM-A-THON India</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-comic-yellow">AIR 47</div>
              <div className="text-[11px] text-technical-cream/70 uppercase">Space Olympiad Adv</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-comic-yellow">TOP 100</div>
              <div className="text-[11px] text-technical-cream/70 uppercase">Global Hackathon</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-comic-yellow">ISRO</div>
              <div className="text-[11px] text-technical-cream/70 uppercase">SPO Reviewed</div>
            </div>
          </div>
        </div>

        {/* Working Principles Card */}
        <div className="bg-blueprint-950/90 border-2 border-comic-yellow/30 rounded-xl p-6 sm:p-7 shadow-comic flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-comic-yellow font-bold uppercase tracking-wider mb-4 border-b border-comic-yellow/20 pb-2">
              BUILDING METHODOLOGY
            </div>
            <ul className="space-y-3 font-mono text-xs text-technical-cream/90">
              <li className="flex items-start gap-2">
                <span className="text-comic-yellow font-bold">01.</span>
                <span><strong>No Fake Claims:</strong> Value working code and bench test logs over inflated presentation hype.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-comic-yellow font-bold">02.</span>
                <span><strong>Cross-Disciplinary:</strong> Freely span software, electronics, and mechanical CAD when the problem demands it.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-comic-yellow font-bold">03.</span>
                <span><strong>External Critique:</strong> Proactively reach out to domain professors and industry researchers for brutal technical feedback.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-comic-yellow font-bold">04.</span>
                <span><strong>Resource Efficiency:</strong> Optimize for constrained hardware, local inference, and zero cloud lock-in.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-comic-yellow/20 flex items-center justify-between text-[11px] font-mono text-comic-yellow">
            <span>STATUS: CLASS XI NON-MED</span>
            <span>APS JALANDHAR</span>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Focus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className={`bg-blueprint-900/80 border ${pillar.color} rounded-xl p-5 shadow-comic backdrop-blur transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded bg-blueprint-950 border border-comic-yellow/20 ${pillar.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-technical-muted">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-bold text-base text-technical-white mb-1">
                  {pillar.title}
                </h3>
                <div className="font-mono text-[11px] text-comic-yellow mb-2">
                  {pillar.tagline}
                </div>
                <p className="text-xs text-technical-cream/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-comic-yellow/15 flex items-center justify-between font-mono text-[10px] text-technical-muted">
                <span>SYSTEM DISCIPLINE</span>
                <span className="text-comic-yellow">ACTIVE</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
