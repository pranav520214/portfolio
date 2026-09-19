"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Laptop, Activity, Radio, Layers, Wrench, ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface DomainNode {
  id: string;
  name: string;
  category: string;
  color: string;
  bgGlow: string;
  borderColor: string;
  icon: React.ReactNode;
  technologies: { name: string; tag: string }[];
  projects: { name: string; role: string; link: string }[];
  statement: string;
  physicalConstraint: string;
  metrics: string[];
}

const DOMAIN_NODES: DomainNode[] = [
  {
    id: "ai",
    name: "AI & STREAMING ASR",
    category: "LOCAL INTELLIGENCE",
    color: "#ffc84a", // Soft Gold
    bgGlow: "rgba(255, 200, 74, 0.18)",
    borderColor: "rgba(255, 200, 74, 0.4)",
    icon: <Terminal className="w-5 h-5 text-[#ffc84a]" />,
    technologies: [
      { name: "NeMo-Speech.cpp", tag: "C++ ASR" },
      { name: "llama.cpp", tag: "GGUF LLM" },
      { name: "CUDA C++", tag: "GPU VRAM" },
      { name: "Whisper streaming", tag: "Audio" },
      { name: "VRAM Isolation", tag: "Hardware" },
      { name: "Quantized GGUF", tag: "Weights" },
    ],
    projects: [
      { name: "LocalFlow — Zero-Lag Voice Assistant", role: "Streaming ASR Engine", link: "/work/localflow" },
      { name: "GestureControl — CPU Hand Tracking", role: "Real-time Edge Vision", link: "/work/wand-mouse" },
    ],
    statement: "Deterministic local machine intelligence under strict 4GB VRAM limits with zero cloud dependencies or telemetry leakage.",
    physicalConstraint: "VRAM \u2264 4096MB • Audio-to-text inference latency \u2264 120ms • Zero network egress",
    metrics: ["118ms End-to-End Latency", "3.2GB Peak VRAM Footprint", "100% On-Device Determinism"],
  },
  {
    id: "embedded",
    name: "EMBEDDED SYSTEMS",
    category: "SILICON & FIRMWARE",
    color: "#ff6a2a", // Energy Orange
    bgGlow: "rgba(255, 106, 42, 0.18)",
    borderColor: "rgba(255, 106, 42, 0.4)",
    icon: <Cpu className="w-5 h-5 text-[#ff6a2a]" />,
    technologies: [
      { name: "ESP32 FreeRTOS", tag: "Dual-Core" },
      { name: "Timer Capture ISR", tag: "Microseconds" },
      { name: "I2C 400kHz Fast-Mode", tag: "Bus" },
      { name: "Hardware Ring Buffers", tag: "Memory" },
      { name: "BLE HID Stack", tag: "Wireless" },
      { name: "Non-blocking DMA", tag: "Peripherals" },
    ],
    projects: [
      { name: "AUTOSTABI Flight Avionics", role: "500Hz Firmware Core", link: "/work/autostabi" },
      { name: "ESP32 BLE Wand Mouse", role: "6-DOF HID Controller", link: "/work/wand-mouse" },
      { name: "FS-i6X USB/BLE FPV Controller", role: "PPM Capture ISR", link: "/work/fpv-controller" },
    ],
    statement: "Microsecond interrupt service routines, DMA ring buffers, and deterministic bare-metal task scheduling without OS jitter.",
    physicalConstraint: "Interrupt jitter < 8\u03bcs • Zero heap allocation during flight loop • Watchdog monitored",
    metrics: ["500Hz Deterministic Loop", "Zero-actuation optical click", "Fail-safe UART ring buffers"],
  },
  {
    id: "avionics",
    name: "AVIONICS & AERODYNAMICS",
    category: "FLIGHT CONTROL",
    color: "#43d8ff", // Electric Cyan
    bgGlow: "rgba(67, 216, 255, 0.18)",
    borderColor: "rgba(67, 216, 255, 0.4)",
    icon: <Radio className="w-5 h-5 text-[#43d8ff]" />,
    technologies: [
      { name: "MPU6500 6-DOF IMU", tag: "Sensors" },
      { name: "Madgwick Filter", tag: "Quaternions" },
      { name: "Cascade PID Loop", tag: "Control" },
      { name: "14-CH iBUS Decoder", tag: "Radio" },
      { name: "5-Channel PWM LEDC", tag: "Actuation" },
      { name: "RK4 Ascent Integration", tag: "Dynamics" },
    ],
    projects: [
      { name: "AUTOSTABI Fixed-Wing Stabilizer", role: "Closed-loop pitch/roll/yaw", link: "/work/autostabi" },
      { name: "Privantrix Aerospace Trajectory Simulator", role: "Ascent assist research", link: "/notes/electromagnetic-launch-physics" },
    ],
    statement: "500Hz attitude estimation and real-time fixed-wing surface stabilization countering active aerodynamic turbulence.",
    physicalConstraint: "Sensor-to-servo correction latency < 2.0ms • Non-divergent quaternion integration",
    metrics: ["\u00b10.4\u00b0 Attitude Accuracy", "Mach 5.8 trajectory integration", "50-400Hz hardware PWM"],
  },
  {
    id: "simulation",
    name: "SCIENTIFIC SIMULATION",
    category: "NUMERICAL PHYSICS",
    color: "#8d72ff", // Restrained Violet
    bgGlow: "rgba(141, 114, 255, 0.18)",
    borderColor: "rgba(141, 114, 255, 0.4)",
    icon: <Activity className="w-5 h-5 text-[#8d72ff]" />,
    technologies: [
      { name: "SciPy Radau ODE", tag: "Stiff Solvers" },
      { name: "Bayesian Parameter MCMC", tag: "Stats" },
      { name: "NumPy Vectorized Ops", tag: "Compute" },
      { name: "Pint Dimensionality", tag: "Units" },
      { name: "Symbolic Jac Computations", tag: "Jacobian" },
      { name: "Stiff Convergence Checks", tag: "Solvers" },
    ],
    projects: [
      { name: "PRIVAVEDA Pharmacological Kinetic Engine", role: "Stiff ODE Engine", link: "/work/privaveda" },
      { name: "Beyond Tin & Lasers Launch Dynamics", role: "Electromagnetic Rail Physics", link: "/notes/electromagnetic-launch-physics" },
    ],
    statement: "Solving stiff non-linear ordinary differential equations with adaptive step-size convergence and validated conservation laws.",
    physicalConstraint: "Stiffness ratio > 10^6 • Adaptive step control • Residual error tolerance < 10^-9",
    metrics: ["100% Conservation of Mass", "Radau IIA 5th-order convergence", "Bayesian confidence bounds"],
  },
  {
    id: "systems",
    name: "HIGH-THROUGHPUT RUNTIMES",
    category: "SYSTEMS & IPC",
    color: "#10b981", // Emerald Green
    bgGlow: "rgba(16, 185, 129, 0.18)",
    borderColor: "rgba(16, 185, 129, 0.4)",
    icon: <Laptop className="w-5 h-5 text-[#10b981]" />,
    technologies: [
      { name: "Electron Process Isolation", tag: "IPC" },
      { name: "Native C++ Node Addons", tag: "Bindings" },
      { name: "Windows Audio Core API", tag: "Audio" },
      { name: "Shared Memory Buffers", tag: "Zero-copy" },
      { name: "WebSocket Localhost Loop", tag: "Protocol" },
      { name: "Sub-frame Timecode Sync", tag: "Timing" },
    ],
    projects: [
      { name: "LocalFlow Desktop Shell", role: "Local loopback IPC", link: "/work/localflow" },
      { name: "Terminal Lyric Sync Player", role: "Sub-frame Audio Timing", link: "/notes/asr-stream-ownership" },
    ],
    statement: "Zero-latency audio streaming and non-blocking multi-process IPC pipelines for mission-critical native desktop applications.",
    physicalConstraint: "Zero garbage-collection pauses in audio path • IPC round-trip latency < 1.0ms",
    metrics: ["Zero-copy memory sharing", "Sub-millisecond IPC transfer", "60 FPS rendering sync"],
  },
];

export function CapabilityCore() {
  const [activeNode, setActiveNode] = useState<DomainNode>(DOMAIN_NODES[0]);

  return (
    <div className="w-full my-8 select-none">
      <div className="rounded-3xl bg-[#090D15] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Dynamic ambient radial lighting keyed to active domain */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-25 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: activeNode.color }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: activeNode.color }}
        />

        <div className="relative z-10 space-y-8">
          {/* Header instructions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: activeNode.color }}
                />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#94a3b8]">
                  ACTIVE DOMAIN // {activeNode.category}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#f5f3ee] tracking-tight mt-1">
                Interactive Capability Core
              </h3>
            </div>

            <div className="font-mono text-xs text-[#94a3b8] bg-[#101622] border border-white/10 px-3.5 py-1.5 rounded-xl hidden sm:block">
              5 VERIFIED DOMAIN CORES • CLICK TO EXPAND
            </div>
          </div>

          {/* 5 Domain Node Selectors (Horizontal Core Hub) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {DOMAIN_NODES.map((node) => {
              const isActive = activeNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    sounds.playTargetLock();
                    setActiveNode(node);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                    isActive
                      ? "bg-[#141b28] shadow-xl scale-[1.02]"
                      : "bg-[#0d121c] border-white/10 hover:border-white/20 hover:bg-[#111724]"
                  }`}
                  style={{
                    borderColor: isActive ? node.color : "rgba(255,255,255,0.1)",
                    boxShadow: isActive ? `0 0 30px ${node.bgGlow}` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        backgroundColor: isActive ? node.bgGlow : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {node.icon}
                    </div>
                    {isActive && (
                      <span
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: node.color }}
                      />
                    )}
                  </div>

                  <div>
                    <span className="font-mono text-[9px] text-[#64748b] font-bold uppercase tracking-wider block">
                      {node.category}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-[#f5f3ee] mt-0.5 leading-snug">
                      {node.name}
                    </h5>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Domain Inspection Chamber (Unfolds on selection) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-[#0c111a] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl"
              style={{
                borderLeftWidth: "4px",
                borderLeftColor: activeNode.color,
              }}
            >
              {/* Mission Statement & Hard Physical Constraint */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-2">
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{
                      borderColor: activeNode.color,
                      color: activeNode.color,
                      backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                  >
                    OPERATING PRINCIPLE //
                  </span>
                  <p className="text-base sm:text-lg text-[#f5f3ee] font-sans font-medium leading-relaxed">
                    "{activeNode.statement}"
                  </p>
                  <p className="text-xs font-mono text-[#94a3b8] pt-1">
                    <span className="text-[#ff6a2a] font-bold">HARD CONSTRAINT: </span>
                    {activeNode.physicalConstraint}
                  </p>
                </div>

                {/* Key Verified Metrics */}
                <div className="lg:col-span-4 bg-black/40 rounded-2xl border border-white/5 p-4 space-y-2.5 font-mono text-xs">
                  <div className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider">
                    VERIFIED BENCHMARKS //
                  </div>
                  {activeNode.metrics.map((m) => (
                    <div key={m} className="flex items-center gap-2 text-[#f5f3ee]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                      <span className="text-[11px]">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Toolchains & Project Evidence */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-white/10">
                {/* Active Toolchain Chips */}
                <div className="lg:col-span-6 space-y-3">
                  <span className="font-mono text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-[#ffc84a]" />
                    <span>VERIFIED TOOLCHAIN & COMPUTE RUNTIMES</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeNode.technologies.map((t) => (
                      <div
                        key={t.name}
                        className="px-3 py-1.5 rounded-xl bg-[#121824] border border-white/10 text-xs font-mono flex items-center gap-2 text-[#f5f3ee]"
                      >
                        <span className="font-bold">{t.name}</span>
                        <span className="text-[9px] text-[#64748b] uppercase bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                          {t.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Project Implementations */}
                <div className="lg:col-span-6 space-y-3">
                  <span className="font-mono text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>PROVEN CODEBASE IMPLEMENTATIONS</span>
                  </span>
                  <div className="space-y-2">
                    {activeNode.projects.map((p) => (
                      <a
                        key={p.name}
                        href={p.link}
                        className="p-3 rounded-xl bg-[#121824] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-[#f5f3ee] group-hover:text-[#43d8ff] transition-colors">
                            {p.name}
                          </div>
                          <div className="font-mono text-[10px] text-[#94a3b8]">
                            {p.role}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#43d8ff] group-hover:translate-x-1 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
