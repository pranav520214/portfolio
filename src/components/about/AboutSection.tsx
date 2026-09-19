"use client";

import React from "react";
import { User, MapPin, Compass, CheckCircle2, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioContent";

export function AboutSection() {
  return (
    <section id="about" className="w-full py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-white/10 pb-6 mb-16">
        <div>
          <div className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-widest flex items-center gap-2">
            <User className="w-4 h-4 text-[#ff5a36]" />
            <span>BACKGROUND &amp; RESEARCH PERSPECTIVE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#f2f2ed] mt-2">
            About Me
          </h2>
        </div>
        <div className="font-mono text-xs text-[#a5acb8] bg-[#111318] border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#ff5a36]" />
          <span>{PERSONAL_INFO.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Student Engineer Narrative */}
        <div className="lg:col-span-8 space-y-6 text-[#a5acb8] text-base sm:text-lg leading-relaxed font-sans">
          <p className="text-2xl sm:text-3xl font-bold text-[#f2f2ed] leading-snug">
            I am a student engineer building at the intersection of artificial intelligence, software, and physical systems.
          </p>

          <p>
            My engineering work is driven by learning through concrete implementation rather than passive consumption.
            I explore questions by designing, coding, testing, and debugging working prototypes across low-latency local speech models,
            desktop IPC architectures, embedded microcontroller firmware, and mechanistic differential equation simulations.
          </p>

          <p>
            I am especially drawn to resource-constrained systems—whether that means running quantized streaming speech
            recognition on consumer laptops with modest 4GB VRAM GPUs (<span className="text-[#f2f2ed] font-semibold">LocalFlow</span>), 
            stabilizing fixed-wing airframes on low-cost ESP32 microcontrollers at 500Hz (<span className="text-[#f2f2ed] font-semibold">AUTOSTABI</span>), 
            translating 6-DOF IMU motion and optical touch into a driverless Bluetooth LE air mouse (<span className="text-[#f2f2ed] font-semibold">Wand Mouse</span>), 
            or executing stiff ordinary differential equation solvers strictly offline with quantified parameter uncertainty (<span className="text-[#f2f2ed] font-semibold">PRIVAVEDA</span>).
          </p>

          <p>
            I maintain honest documentation of what works, what breaks under stress, and what boundaries remain unproven. All projects featured on this
            site are active public repositories available for open technical inspection on my GitHub profile.
          </p>
        </div>

        {/* Right Column: Working Principles Card */}
        <div className="lg:col-span-4 bg-[#111318] border border-white/10 rounded-2xl p-7 shadow-xl space-y-6 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#ff5a36] font-bold uppercase tracking-wider pb-4 border-b border-white/10">
            <Compass className="w-4 h-4" />
            <span>OPERATING PRINCIPLES</span>
          </div>

          <ul className="space-y-5 text-[#a5acb8]">
            <li className="space-y-1.5">
              <span className="font-bold text-[#f2f2ed] block text-xs">01 // First-Principles Framing</span>
              <span className="text-xs font-sans leading-relaxed block">
                Begin with fundamental hardware constraints, memory budgets, and physical rate equations rather than API wrappers.
              </span>
            </li>
            <li className="space-y-1.5">
              <span className="font-bold text-[#f2f2ed] block text-xs">02 // Visible Failure Autopsies</span>
              <span className="text-xs font-sans leading-relaxed block">
                Document sensor noise, buffer bleed, and solver divergence. Systems break where assumptions are untested.
              </span>
            </li>
            <li className="space-y-1.5">
              <span className="font-bold text-[#f2f2ed] block text-xs">03 // Verifiable Open Implementations</span>
              <span className="text-xs font-sans leading-relaxed block">
                Publish real codebases with setup instructions, benchmark telemetry logs, and reproducible tests on GitHub.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

