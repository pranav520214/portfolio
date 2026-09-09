"use client";

import React from "react";
import { SYSTEMS_TOOLBOX } from "@/data/portfolioContent";
import { User, MapPin, Wrench, Compass } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="w-full py-20 px-4 sm:px-6 max-w-6xl mx-auto border-t border-[#D8D6CD]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#D8D6CD] pb-4 mb-10">
        <div>
          <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            <span>SECTION 08 // PERSPECTIVE & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] mt-1">
            About
          </h2>
        </div>
        <div className="font-mono text-xs text-[#666666] flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-[#D94431]" />
          <span>Punjab, India</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Left Column: Human Story & Personal Voice */}
        <div className="lg:col-span-8 space-y-6 text-[#333333] text-sm sm:text-base leading-relaxed">
          <p className="text-xl sm:text-2xl font-semibold text-[#111111] leading-snug">
            I&apos;m Pranav, a Class XI student interested in computing systems that interact with the physical world.
          </p>

          <p>
            I began programming at an early age, initially curious about how code translates into tangible behavior. 
            Over time, that curiosity branched into three interconnected domains: machine learning under compute constraints, 
            embedded avionics running on microcontrollers, and aerospace trajectory physics.
          </p>

          <p>
            I enjoy building physical and software prototypes where resources are genuinely scarce. Constrained hardware—whether 
            it is a microcontroller with 320 KB of RAM or a laptop CPU attempting to run streaming neural audio inference—is where 
            engineering becomes interesting. It forces me to understand memory layouts, buffer ownership, sensor noise matrices, 
            and timing jitter at the microsecond level.
          </p>

          <p>
            I spend much of my free time reading technical papers, sensor datasheets, and compiler specifications beyond my regular 
            school curriculum. When a prototype reaches a point where it can be tested, I document what broke and actively share the work 
            with researchers and experienced builders to receive honest technical critique.
          </p>
        </div>

        {/* Right Column: Working Principles Card */}
        <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#D8D6CD] rounded-2xl p-6 shadow-sm space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#D94431] font-bold uppercase tracking-wider pb-2 border-b border-[#EAE8DF]">
            <Compass className="w-4 h-4" />
            <span>CORE PRACTICES</span>
          </div>

          <ul className="space-y-3 text-[#333333]">
            <li className="space-y-0.5">
              <span className="font-bold text-[#111111] block">First-Principles Questioning:</span>
              <span className="text-[#666666] font-sans">Start with the fundamental physics or mathematical constraint, not the high-level framework.</span>
            </li>
            <li className="space-y-0.5">
              <span className="font-bold text-[#111111] block">Visible Failure Documentation:</span>
              <span className="text-[#666666] font-sans">Log every anomaly, buffer overflow, and gyro drift curve. Failures expose true system boundaries.</span>
            </li>
            <li className="space-y-0.5">
              <span className="font-bold text-[#111111] block">Iterative Peer Critique:</span>
              <span className="text-[#666666] font-sans">Submit work to domain experts early to uncover structural flaws before investing in scaling.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Structured Systems Toolbox (Replacing old 3D logo cloud) */}
      <div className="pt-8 border-t border-[#D8D6CD]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-mono text-xs text-[#D94431] font-semibold uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>SYSTEMS & WORKING TOOLBOX</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mt-1">
              What I Can Actually Build With
            </h3>
          </div>
          <div className="font-mono text-xs text-[#888888]">
            [ NO ARBITRARY SKILL BARS ]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SYSTEMS_TOOLBOX.map((cat) => (
            <div
              key={cat.category}
              className="bg-[#FFFFFF] border border-[#D8D6CD] rounded-xl p-6 shadow-sm space-y-4"
            >
              <div>
                <div className="font-mono text-xs font-bold text-[#111111] tracking-wider uppercase">
                  {cat.category}
                </div>
                <div className="text-xs text-[#666666] mt-0.5">
                  {cat.description}
                </div>
              </div>

              <div className="divide-y divide-[#EAE8DF]">
                {cat.items.map((item) => (
                  <div key={item.name} className="py-2.5 space-y-0.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#111111]">{item.name}</span>
                      <span className="font-mono text-[11px] text-[#D94431]">{item.role}</span>
                    </div>
                    <p className="text-xs text-[#555555] leading-relaxed">
                      {item.application}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
