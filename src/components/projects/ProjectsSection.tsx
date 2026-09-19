"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Cpu, Orbit, Sparkles, Activity, Layers } from "lucide-react";
import { FLAGSHIP_PROJECTS, FlagshipProject } from "@/data/portfolioContent";
import { sounds } from "../audio/SoundSystem";

// =============================================================================
// INTERACTIVE VISUAL PANELS FOR EACH FLAGSHIP
// =============================================================================

function LocalFlowVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = "#0d0e11";
      ctx.fillRect(0, 0, w, h);

      // Background subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Audio waveform bars
      const numBars = 32;
      const barWidth = 6;
      const spacing = (w - 80) / numBars;
      const startX = 40;

      for (let i = 0; i < numBars; i++) {
        const freq = Math.sin(t * 2 + i * 0.3) * 0.5 + 0.5;
        const barHeight = 20 + freq * (h * 0.45);
        const x = startX + i * spacing;
        const y = h / 2 - barHeight / 2;

        const isMid = i > 10 && i < 22;
        ctx.fillStyle = isMid ? "#ff5a36" : "#35d9ff";
        ctx.shadowColor = isMid ? "#ff5a36" : "#35d9ff";
        ctx.shadowBlur = 10;
        ctx.fillRect(x, y, barWidth, barHeight);
      }
      ctx.shadowBlur = 0;

      // Telemetry annotation
      ctx.font = "11px monospace";
      ctx.fillStyle = "#a5acb8";
      ctx.fillText("16kHz PCM // CUDA STREAMING ASR // Q8_0 CPU TRANSFORM", 40, h - 25);
      ctx.fillStyle = "#ff5a36";
      ctx.fillText("<380ms LATENCY", w - 150, h - 25);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#0d0e11] border border-white/10">
      <canvas ref={canvasRef} width={540} height={360} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#111318]/80 border border-white/10 font-mono text-[10px] text-[#ff5a36] font-bold">
        ENGINE: NeMo-Speech.cpp + llama.cpp
      </div>
    </div>
  );
}

function AutostabiVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "#0d0e11";
      ctx.fillRect(0, 0, w, h);

      // Artificial horizon roll angle
      const roll = Math.sin(t * 1.5) * 0.18;
      const pitch = Math.cos(t * 1.1) * 20;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(roll);

      // Horizon line
      ctx.strokeStyle = "#35d9ff";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#35d9ff";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(-160, pitch);
      ctx.lineTo(160, pitch);
      ctx.stroke();

      // Pitch ladder
      for (let p = -2; p <= 2; p++) {
        if (p === 0) continue;
        const y = pitch + p * 25;
        const len = p % 2 === 0 ? 30 : 18;
        ctx.beginPath();
        ctx.moveTo(-len, y);
        ctx.lineTo(len, y);
        ctx.stroke();
      }
      ctx.restore();

      // Center crosshair
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#ff5a36";
      ctx.lineWidth = 2;
      ctx.strokeRect(cx - 10, cy - 10, 20, 20);
      ctx.beginPath();
      ctx.moveTo(cx - 24, cy);
      ctx.lineTo(cx - 12, cy);
      ctx.moveTo(cx + 12, cy);
      ctx.lineTo(cx + 24, cy);
      ctx.stroke();

      // Telemetry readout
      ctx.font = "11px monospace";
      ctx.fillStyle = "#a5acb8";
      ctx.fillText("500Hz KALMAN ATTITUDE FILTER // MPU6500 IMU 400kHz I2C", 40, h - 25);
      ctx.fillStyle = "#b7ff45";
      ctx.fillText("ROLL: " + (roll * 57.3).toFixed(1) + "°", w - 130, 40);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#0d0e11] border border-white/10">
      <canvas ref={canvasRef} width={540} height={360} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#111318]/80 border border-white/10 font-mono text-[10px] text-[#35d9ff] font-bold">
        AVIONICS: 500Hz FreeRTOS Stabilization
      </div>
    </div>
  );
}

function WandMouseVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.035;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "#0d0e11";
      ctx.fillRect(0, 0, w, h);

      // Rotating 3D wireframe coordinate axes
      const angle = t * 1.2;
      const r = 70;

      const x3d = Math.cos(angle) * r;
      const y3d = Math.sin(angle * 0.7) * 35;
      const z3d = Math.sin(angle) * r;

      ctx.save();
      ctx.translate(cx, cy);

      // Draw 3 axes
      ctx.lineWidth = 2;
      // X Axis (Cyan)
      ctx.strokeStyle = "#35d9ff";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x3d, -y3d);
      ctx.stroke();

      // Y Axis (Orange)
      ctx.strokeStyle = "#ff5a36";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-z3d, y3d);
      ctx.stroke();

      // Z Axis (Lime)
      ctx.strokeStyle = "#b7ff45";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(y3d, -r * 0.8);
      ctx.stroke();

      // Optical Touch indicator
      const touchPulse = Math.sin(t * 3) * 6 + 12;
      ctx.fillStyle = "rgba(255, 90, 54, 0.4)";
      ctx.beginPath();
      ctx.arc(x3d, -y3d, touchPulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Telemetry
      ctx.font = "11px monospace";
      ctx.fillStyle = "#a5acb8";
      ctx.fillText("6-DOF IMU INTEGRATION // ADAPTIVE DEADBAND // BLE HID", 40, h - 25);
      ctx.fillStyle = "#35d9ff";
      ctx.fillText("DRIVERLESS HID", w - 140, 40);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#0d0e11] border border-white/10">
      <canvas ref={canvasRef} width={540} height={360} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#111318]/80 border border-white/10 font-mono text-[10px] text-[#b7ff45] font-bold">
        INTERFACE: 6-DOF BLE Air Controller
      </div>
    </div>
  );
}

function PrivavedaVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#0d0e11";
      ctx.fillRect(0, 0, w, h);

      // Phase space trajectory plot
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Coupled stiff ODE trajectory lines
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ff5a36";
      ctx.beginPath();
      for (let i = 0; i < 180; i++) {
        const x = 50 + (i / 180) * (w - 100);
        const y = h / 2 + Math.exp(-i * 0.02) * Math.sin(i * 0.15 + t) * (h * 0.35);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second coupled harmonic
      ctx.strokeStyle = "#35d9ff";
      ctx.beginPath();
      for (let i = 0; i < 180; i++) {
        const x = 50 + (i / 180) * (w - 100);
        const y = h / 2 - Math.exp(-i * 0.015) * Math.cos(i * 0.18 + t * 0.8) * (h * 0.28);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Telemetry
      ctx.font = "11px monospace";
      ctx.fillStyle = "#a5acb8";
      ctx.fillText("STIFF ODE INTEGRATION // RADAU IIA / BDF // BAYESIAN UNCERTAINTY", 40, h - 25);
      ctx.fillStyle = "#ff5a36";
      ctx.fillText("CONVERGENCE: 1e-8", w - 160, 40);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#0d0e11] border border-white/10">
      <canvas ref={canvasRef} width={540} height={360} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#111318]/80 border border-white/10 font-mono text-[10px] text-[#ff5a36] font-bold">
        SIMULATION: Mechanistic Pharmacokinetics ODE
      </div>
    </div>
  );
}

function FpvControllerVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#0d0e11";
      ctx.fillRect(0, 0, w, h);

      // Oscilloscope grid
      ctx.strokeStyle = "rgba(53, 217, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 35) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 8-channel microsecond PPM pulse train
      ctx.strokeStyle = "#35d9ff";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#35d9ff";
      ctx.shadowBlur = 8;
      ctx.beginPath();

      let currX = 30;
      const baseline = h / 2 + 20;
      const highY = h / 2 - 40;

      ctx.moveTo(currX, baseline);

      for (let ch = 0; ch < 8; ch++) {
        // Low pulse (300us)
        currX += 15;
        ctx.lineTo(currX, baseline);
        // Rising edge
        ctx.lineTo(currX, highY);
        // Variable pulse width 1000 - 2000us
        const pulseLen = 25 + Math.sin(t * 2 + ch) * 15;
        currX += pulseLen;
        ctx.lineTo(currX, highY);
        // Falling edge
        ctx.lineTo(currX, baseline);
      }

      // Sync frame
      currX += 80;
      ctx.lineTo(currX, baseline);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Telemetry
      ctx.font = "11px monospace";
      ctx.fillStyle = "#a5acb8";
      ctx.fillText("GPIO HARDWARE INTERRUPTS // 1000-2000µs PULSE DECODING // ZERO LAG", 40, h - 25);
      ctx.fillStyle = "#b7ff45";
      ctx.fillText("FRAME SYNC: 20ms", w - 150, 40);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-[#0d0e11] border border-white/10">
      <canvas ref={canvasRef} width={540} height={360} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#111318]/80 border border-white/10 font-mono text-[10px] text-[#35d9ff] font-bold">
        SIGNAL: Microsecond PPM Hardware Interrupts
      </div>
    </div>
  );
}

// Map slugs to visual components
const VISUAL_COMPONENTS: Record<string, React.ReactNode> = {
  localflow: <LocalFlowVisual />,
  autostabi: <AutostabiVisual />,
  "wand-mouse": <WandMouseVisual />,
  privaveda: <PrivavedaVisual />,
  "fpv-controller": <FpvControllerVisual />,
};

// =============================================================================
// MAIN SELECTED WORK SECTION
// =============================================================================

interface ProjectsSectionProps {
  onOpenPortal?: () => void;
}

export function ProjectsSection({ onOpenPortal }: ProjectsSectionProps) {
  return (
    <section id="work" className="w-full py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6 mb-16">
        <div>
          <div className="font-mono text-xs text-[#ff5a36] font-bold uppercase tracking-widest flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#ff5a36]" />
            <span>SELECTED FLAGSHIP WORK // 5 VERIFIED SYSTEMS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#f2f2ed] mt-2">
            Selected Work
          </h2>
        </div>
        <p className="text-sm font-sans text-[#a5acb8] max-w-md">
          Hardware and software systems built from first principles under strict latency, memory, and physical constraints.
        </p>
      </div>

      {/* Alternating Flagship Project Showcase */}
      <div className="space-y-24 sm:space-y-32">
        {FLAGSHIP_PROJECTS.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={project.slug}
              className="group p-6 sm:p-10 rounded-3xl bg-[#111318] border border-white/10 hover:border-[#ff5a36]/40 transition-all duration-500 shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              }}
            >
              {/* Subtle hover neon edge gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff5a36]/0 via-[#ff5a36]/05 to-[#35d9ff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual Column */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="transform transition-transform duration-500 group-hover:scale-[1.02]">
                    {VISUAL_COMPONENTS[project.slug] || <LocalFlowVisual />}
                  </div>
                </div>

                {/* Narrative Column */}
                <div className={`lg:col-span-6 space-y-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                    <span className="text-2xl font-black text-[#ff5a36] font-mono mr-2">
                      {project.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-[#070708] border border-white/10 text-[#a5acb8] font-bold">
                      {project.status}
                    </span>
                    <span className="text-[#6b7280]">•</span>
                    <span className="text-[#a5acb8]">{project.year}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black text-[#f2f2ed] tracking-tight group-hover:text-[#ff5a36] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-[#f2f2ed]/90 mt-1 font-sans">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Technical Description */}
                  <p className="text-sm sm:text-base text-[#a5acb8] leading-relaxed font-sans">
                    {project.build.description}
                  </p>

                  {/* Key Technologies Tags */}
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                    {project.build.coreTech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-[#0d0e11] border border-white/10 text-[#f2f2ed] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTAs: Case Study & Verified GitHub */}
                  <div className="flex flex-wrap items-center gap-4 pt-3 font-mono text-xs">
                    <Link
                      href={`/work/${project.slug}`}
                      onClick={() => sounds.playClick()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ff5a36] hover:bg-[#ff6f4e] text-white font-bold transition-all shadow-md shadow-[#ff5a36]/20 cursor-pointer"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#0d0e11] border border-white/10 text-[#f2f2ed] hover:border-white/30 hover:bg-[#161922] transition-colors font-bold cursor-pointer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE REPOSITORY</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#a5acb8]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

