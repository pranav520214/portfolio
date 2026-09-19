"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Orbit, ArrowUpRight, ShieldCheck, FileCheck, Rocket } from "lucide-react";
import { sounds } from "../audio/SoundSystem";
import { EASE } from "@/lib/motion";

export function PrivantrixSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="privantrix"
      className="w-full py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6 mb-16">
        <div>
          <div className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-widest flex items-center gap-2">
            <Orbit className="w-4 h-4 text-[#ff5a36]" />
            <span>AEROSPACE RESEARCH &amp; STAGING DYNAMICS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#f2f2ed] mt-2">
            Privantrix Aerospace
          </h2>
        </div>
        <p className="text-sm font-sans text-[#a5acb8] max-w-md">
          Exploratory research initiative modeling non-traditional ground-assisted velocity and hypersonic vehicle staging.
        </p>
      </div>

      {/* Main Module: Logo, Trajectory Simulation & Formal ISRO Appraisal */}
      <div className="rounded-3xl bg-[#111318] border border-white/10 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#ff5a36]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#35d9ff]/08 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Animated Delta-Wing Chevron Logo & Trajectory Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Rotating Orbital Guides */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-[#ff5a36]/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-5 rounded-full border border-dotted border-[#35d9ff]/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Animated Aerospace Delta Wing Logo */}
              <svg viewBox="0 0 200 200" className="w-48 h-48 relative z-10" fill="none">
                <motion.path
                  d="M 100,25 L 160,150 L 100,125 L 40,150 Z"
                  stroke="#f2f2ed"
                  strokeWidth="2.5"
                  fill="url(#privChevronGrad)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.6, ease: EASE.outExpo as any }}
                />
                <motion.line
                  x1="100"
                  y1="125"
                  x2="100"
                  y2="175"
                  stroke="#ff5a36"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1.0 }}
                />
                <defs>
                  <linearGradient id="privChevronGrad" x1="100" y1="25" x2="100" y2="150" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#ff5a36" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#35d9ff" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Trajectory Specifications */}
            <div className="w-full bg-[#0d0e11] border border-white/10 rounded-2xl p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[#f2f2ed] font-bold">
                <span className="flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-[#ff5a36]" />
                  <span>TRAJECTORY MODELING</span>
                </span>
                <span className="text-[#35d9ff]">RK4 / RK5 DORMAND-PRINCE</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[11px] text-center">
                <div>
                  <span className="text-[#6b7280] block text-[10px]">MAX VELOCITY</span>
                  <span className="text-[#f2f2ed] font-bold">Mach 5.8</span>
                </div>
                <div>
                  <span className="text-[#6b7280] block text-[10px]">PEAK G-LOAD</span>
                  <span className="text-[#f2f2ed] font-bold">&lt; 14.2g</span>
                </div>
                <div>
                  <span className="text-[#6b7280] block text-[10px]">STAGING APOGEE</span>
                  <span className="text-[#f2f2ed] font-bold">120 km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Statement & Documented ISRO Technical Appraisal */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>FLIGHT MECHANICS &amp; PROPULSION CONCEPT STUDY</span>
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-[#f2f2ed] tracking-tight">
                Privantrix Aerospace Systems
              </h3>
              <p className="font-mono text-xs text-[#a5acb8]">
                COUPLED THERMAL AND STRUCTURAL LAUNCH VEHICLE STAGING SIMULATION
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#a5acb8] leading-relaxed font-sans">
              Founded as an exploratory space technology research initiative to model non-traditional ground-assisted
              electromagnetic velocity assist (300–600 m/s) and numerical launch vehicle upper-stage staging boundaries.
              The research investigated aerodynamic friction minimization through tropospheric atmospheric layers and
              transient pulse-power capacitor discharge characteristics.
            </p>

            {/* Official ISRO Feedback Record */}
            <div className="p-6 rounded-2xl bg-[#0d0e11] border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#f2f2ed] font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>FORMAL TECHNICAL APPRAISAL // ISRO HQ</span>
                </div>
                <span className="text-[10px] text-[#ff5a36] bg-[#ff5a36]/10 px-2.5 py-0.5 rounded border border-[#ff5a36]/20 font-bold">
                  DOCUMENTED
                </span>
              </div>
              <p className="text-xs text-[#a5acb8] font-sans leading-relaxed">
                The aerospace concept study received formal review correspondence from the{" "}
                <span className="text-[#f2f2ed] font-semibold">ISRO Science Programme Office (ISRO HQ)</span>,
                commending the ambitious scope of the launch dynamics modeling and offering technical guidance regarding
                higher-order thermodynamic flow simulations.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#35d9ff]">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Archived in verified documentary records</span>
              </div>
            </div>

            {/* Technical Scope Badges */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <span className="bg-[#0d0e11] text-[#a5acb8] px-3 py-1.5 rounded-xl border border-white/10">
                Hypersonic Aerodynamic Heating
              </span>
              <span className="bg-[#0d0e11] text-[#a5acb8] px-3 py-1.5 rounded-xl border border-white/10">
                Staging Boundary Optimization
              </span>
              <span className="bg-[#0d0e11] text-[#a5acb8] px-3 py-1.5 rounded-xl border border-white/10">
                Kinetic Acceleration (300-600 m/s)
              </span>
              <span className="bg-[#0d0e11] text-[#a5acb8] px-3 py-1.5 rounded-xl border border-white/10">
                Python / SciPy Numerical ODEs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

