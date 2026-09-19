"use client";

import React from "react";
import { Compass, ArrowRight, Cpu, Orbit, Activity, ShieldCheck } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface VisionArea {
  id: string;
  category: string;
  title: string;
  thesis: string;
  trajectory: string;
  accent: string;
}

const VISION_AREAS: VisionArea[] = [
  {
    id: "local-intelligence",
    category: "LOCAL INTELLIGENCE",
    title: "Deterministic On-Device Edge SLMs",
    thesis: "Can sub-1B parameter language models execute deterministically on low-power consumer silicon with sub-100ms response latencies and zero telemetry?",
    trajectory: "Expanding LocalFlow into multimodal real-time audio and visual command runtimes that operate entirely offline.",
    accent: "#ff5a36",
  },
  {
    id: "autonomous-systems",
    category: "AUTONOMOUS SYSTEMS",
    title: "Microsecond Hardware Autopilots",
    thesis: "Can fixed-wing and hybrid VTOL airframes maintain high-speed attitude stability in turbulent shear winds using low-cost MEMS IMUs alone?",
    trajectory: "Evolving AUTOSTABI from bench-tested prototypes into fault-tolerant autonomous mission flight computers.",
    accent: "#35d9ff",
  },
  {
    id: "embedded-computing",
    category: "EMBEDDED COMPUTING",
    title: "Ultra-Low-Inertia Spatial Interfaces",
    thesis: "Can spatial micro-gestures replace traditional mice and keyboards through zero-latency IMU integration and optical touch fusion?",
    trajectory: "Refining the Wand Mouse hardware architecture to achieve sub-millimeter pointer tracking with microampere sleep current.",
    accent: "#b7ff45",
  },
  {
    id: "aerospace",
    category: "AEROSPACE",
    title: "Ground-Assisted Kinetic Launch Modeling",
    thesis: "Can electromagnetic ground tracks provide 300–600 m/s velocity assist to dramatically lower first-stage gross takeoff weight?",
    trajectory: "Extending numerical staging physics, aerothermal boundary simulations, and pulsed-power discharge dynamics.",
    accent: "#ff5a36",
  },
  {
    id: "advanced-compute",
    category: "ADVANCED COMPUTE",
    title: "Stiff Mechanistic Differential Solvers",
    thesis: "Can coupled nonlinear ordinary differential equations maintain stiff numerical stability on local hardware without cloud solvers?",
    trajectory: "Developing mathematical and biological simulation engines (PRIVAVEDA) with Bayesian parameter uncertainty calibration.",
    accent: "#35d9ff",
  },
];

export function VisionSection() {
  return (
    <section id="vision" className="w-full py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6 mb-16">
        <div>
          <div className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-widest flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#ff5a36]" />
            <span>LONG-TERM INQUIRIES & HORIZONS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#f2f2ed] mt-2">
            Engineering Vision
          </h2>
        </div>
        <p className="text-sm font-sans text-[#a5acb8] max-w-md">
          Focus areas where hardware constraints, local intelligence, and mathematical physics converge.
        </p>
      </div>

      {/* Large Opening Statement */}
      <div className="mb-20 max-w-4xl space-y-4">
        <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f2f2ed] leading-tight">
          Computation belongs at the physical edge.
        </h3>
        <p className="text-base sm:text-lg text-[#a5acb8] font-sans leading-relaxed">
          The future of engineering is not larger data centers or more API abstractions.
          It is deterministic, low-latency, and energy-constrained intelligence embedded directly in physical machines,
          airframes, and local developer workstations.
        </p>
      </div>

      {/* Clean Editorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {VISION_AREAS.map((area, idx) => (
          <div
            key={area.id}
            className="group bg-[#111318] border border-white/10 hover:border-[#ff5a36]/40 rounded-2xl p-7 sm:p-8 transition-all duration-300 shadow-xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/05 pb-3">
                <span className="font-mono text-[11px] font-bold text-[#ff5a36] tracking-wider uppercase">
                  {area.category}
                </span>
                <span className="font-mono text-xs text-[#6b7280]">
                  0{idx + 1}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-[#f2f2ed] group-hover:text-[#ff5a36] transition-colors leading-snug">
                {area.title}
              </h4>

              <p className="text-xs sm:text-sm text-[#a5acb8] font-sans leading-relaxed">
                {area.thesis}
              </p>
            </div>

            <div className="pt-4 border-t border-white/05 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#6b7280] block">
                RESEARCH TRAJECTORY
              </span>
              <p className="text-xs text-[#f2f2ed]/80 font-sans leading-relaxed">
                {area.trajectory}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
