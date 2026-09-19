"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers, ArrowRight, ArrowUpRight, Cpu, Sparkles, Terminal, Activity } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface CapabilityCategory {
  id: string;
  number: string;
  name: string;
  tagline: string;
  accent: string;
  tools: string[];
  projects: { name: string; slug: string }[];
}

const CAPABILITIES_DATA: CapabilityCategory[] = [
  {
    id: "ai-ml",
    number: "01",
    name: "AI / ML & Local SLMs",
    tagline: "Sub-400ms streaming on-device speech recognition and quantized SLM inference on local GPU/CPU.",
    accent: "#ff5a36",
    tools: ["Streaming ASR", "llama.cpp", "CUDA", "NeMo-Speech.cpp", "Qwen3", "Prompt Engineering"],
    projects: [{ name: "LocalFlow", slug: "localflow" }],
  },
  {
    id: "embedded",
    number: "02",
    name: "Embedded & Firmware",
    tagline: "Deterministic real-time firmware, FreeRTOS task scheduling and microsecond peripheral communication.",
    accent: "#35d9ff",
    tools: ["FreeRTOS", "ESP32 Dual-Core", "I2C 400kHz", "SPI", "UART", "BLE HID", "Low-Power Modes"],
    projects: [
      { name: "AUTOSTABI", slug: "autostabi" },
      { name: "Wand Mouse", slug: "wand-mouse" },
      { name: "FS-i6X Controller", slug: "fpv-controller" },
    ],
  },
  {
    id: "avionics",
    number: "03",
    name: "Avionics & Flight Control",
    tagline: "500Hz attitude state estimation, Kalman sensor fusion and multi-channel aerodynamic actuation.",
    accent: "#ff5a36",
    tools: ["MPU6500 6-DOF IMU", "Kalman Attitude Filter", "500Hz Loop", "Servo PWM", "iBUS / PPM Decoding"],
    projects: [
      { name: "AUTOSTABI", slug: "autostabi" },
      { name: "FS-i6X Controller", slug: "fpv-controller" },
    ],
  },
  {
    id: "simulation",
    number: "04",
    name: "Scientific Simulation",
    tagline: "Stiff mechanistic differential equation solvers with implicit numerical integration and uncertainty quantification.",
    accent: "#b7ff45",
    tools: ["Radau IIA / BDF", "Stiff ODE Solvers", "SciPy", "NumPy", "Monte Carlo Uncertainty"],
    projects: [{ name: "PRIVAVEDA", slug: "privaveda" }],
  },
  {
    id: "systems",
    number: "05",
    name: "Systems & IPC Architecture",
    tagline: "Multi-runtime process isolation, local loopback IPC servers and microsecond hardware interrupts.",
    accent: "#35d9ff",
    tools: ["Loopback HTTP IPC", "Electron", "C++ Interop", "Windows API Hooking", "GPIO Interrupts"],
    projects: [
      { name: "LocalFlow", slug: "localflow" },
      { name: "Wand Mouse", slug: "wand-mouse" },
      { name: "FS-i6X Controller", slug: "fpv-controller" },
    ],
  },
];

export function CapabilitiesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ai-ml");

  return (
    <section id="capabilities" className="w-full py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6 mb-16">
        <div>
          <div className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#ff5a36]" />
            <span>DOMAIN COMPETENCIES &amp; TOOLCHAINS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#f2f2ed] mt-2">
            Technical Capabilities
          </h2>
        </div>
        <p className="text-sm font-sans text-[#a5acb8] max-w-md">
          Proven execution across full-stack engineering layers: from silicon registers and flight sensors to desktop runtimes.
        </p>
      </div>

      {/* Animated Horizontal Capability Rows */}
      <div className="space-y-4">
        {CAPABILITIES_DATA.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              onMouseEnter={() => {
                if (activeCategory !== cat.id) {
                  sounds.playHover();
                  setActiveCategory(cat.id);
                }
              }}
              className={`relative rounded-2xl p-6 sm:p-8 transition-all duration-300 border cursor-pointer ${
                isActive
                  ? "bg-[#111318] border-white/20 shadow-xl"
                  : "bg-[#0d0e11]/60 border-white/05 hover:bg-[#111318]/50 hover:border-white/10"
              }`}
              style={{
                boxShadow: isActive ? `0 10px 30px rgba(0,0,0,0.5)` : "none",
              }}
            >
              {/* Thin animated neon beam across active row top */}
              {isActive && (
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full animate-pulse pointer-events-none"
                  style={{
                    backgroundColor: cat.accent,
                    boxShadow: `0 0 10px ${cat.accent}`,
                  }}
                />
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Category Heading & Number */}
                <div className="lg:col-span-5 space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#6b7280] font-bold">
                      {cat.number}
                    </span>
                    <h3 className={`text-2xl sm:text-3xl font-black tracking-tight transition-colors ${
                      isActive ? "text-[#f2f2ed]" : "text-[#a5acb8]"
                    }`}>
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#a5acb8] font-sans leading-relaxed pt-1">
                    {cat.tagline}
                  </p>
                </div>

                {/* Related Tools / Tech Badges */}
                <div className="lg:col-span-4 flex flex-wrap gap-1.5">
                  {cat.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`text-xs font-mono px-2.5 py-1 rounded-md transition-colors ${
                        isActive
                          ? "bg-[#070708] border border-white/15 text-[#f2f2ed]"
                          : "bg-[#070708]/50 border border-white/05 text-[#6b7280]"
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Related Flagship Projects */}
                <div className="lg:col-span-3 flex flex-wrap lg:justify-end gap-2">
                  {cat.projects.map((proj) => (
                    <Link
                      key={proj.slug}
                      href={`/work/${proj.slug}`}
                      onClick={() => sounds.playClick()}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        isActive
                          ? "bg-[#ff5a36]/15 border border-[#ff5a36]/40 text-[#ff5a36] hover:bg-[#ff5a36] hover:text-white"
                          : "bg-[#111318] border border-white/10 text-[#a5acb8]"
                      }`}
                    >
                      <span>{proj.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

