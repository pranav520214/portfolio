"use client";

import React from "react";
import { User, MapPin, Compass, CheckCircle2 } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export function AboutSection() {
  return (
    <section id="about" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#262E3B]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#262E3B] pb-4 mb-10">
        <div>
          <div className="font-mono text-xs text-[#F59E0B] font-semibold uppercase tracking-wider flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & PERSPECTIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9] mt-1">
            About Me
          </h2>
        </div>
        <div className="font-mono text-xs text-[#94A3B8] flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-[#F59E0B]" />
          <span>{PERSONAL_INFO.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Student Engineer Narrative */}
        <div className="lg:col-span-8 space-y-6 text-[#94A3B8] text-sm sm:text-base leading-relaxed font-sans">
          <p className="text-xl sm:text-2xl font-semibold text-[#F1F5F9] leading-snug">
            I am a student engineer building at the intersection of artificial intelligence, software, and physical systems.
          </p>

          <p>
            My engineering work is driven by learning through concrete implementation rather than passive consumption.
            I explore questions by designing, coding, testing, and debugging working prototypes across low-latency local speech models,
            desktop IPC architectures, embedded microcontroller firmware, and mechanistic differential equation simulations.
          </p>

          <p>
            I am especially interested in resource-constrained environments—whether that means running quantized streaming speech
            recognition on consumer laptops with modest 4GB VRAM GPUs (LocalFlow), stabilizing fixed-wing airframes on low-cost ESP32 microcontrollers
            at 500Hz (AUTOSTABI), translating 6-DOF IMU motion and optical touch into a driverless Bluetooth LE air mouse, or executing stiff ordinary differential
            equation solvers strictly offline with quantified parameter uncertainty (PRIVAVEDA).
          </p>

          <p>
            I maintain honest documentation of what works, what fails, and what boundaries remain unproven. All five projects featured on this
            site are active, public repositories available for inspection on my GitHub profile.
          </p>
        </div>

        {/* Right Column: Working Principles Card */}
        <div className="lg:col-span-4 bg-[#14171E] border border-[#262E3B] rounded-2xl p-6 shadow-sm space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#F59E0B] font-bold uppercase tracking-wider pb-2 border-b border-[#262E3B]">
            <Compass className="w-4 h-4" />
            <span>ENGINEERING PRINCIPLES</span>
          </div>

          <ul className="space-y-4 text-[#94A3B8]">
            <li className="space-y-1">
              <span className="font-bold text-[#F1F5F9] block text-xs">01 // First-Principles Framing</span>
              <span className="text-xs font-sans leading-relaxed">
                Begin with fundamental hardware constraints, memory limits, and physical rate equations rather than API wrappers.
              </span>
            </li>
            <li className="space-y-1">
              <span className="font-bold text-[#F1F5F9] block text-xs">02 // Visible Failure Autopsies</span>
              <span className="text-xs font-sans leading-relaxed">
                Document sensor noise, buffer bleeds, and solver divergence. Systems break where assumptions are untested.
              </span>
            </li>
            <li className="space-y-1">
              <span className="font-bold text-[#F1F5F9] block text-xs">03 // Verifiable Open Implementations</span>
              <span className="text-xs font-sans leading-relaxed">
                Build real codebases with setup instructions, benchmark logs, and reproducible tests published on GitHub.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
