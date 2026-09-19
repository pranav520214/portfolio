"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Activity, Radio, Zap, Sliders, Layers, ChevronRight, CheckCircle2 } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

interface SubsystemNode {
  id: string;
  name: string;
  role: string;
  layer: "sensor" | "compute" | "receiver" | "actuation";
  pins: string;
  clockRate: string;
  specs: string[];
  description: string;
  signalsOut: string[];
}

const NODES: Record<string, SubsystemNode> = {
  mpu6500: {
    id: "mpu6500",
    name: "MPU6500 6-DOF IMU",
    role: "Inertial Dynamics Acquisition",
    layer: "sensor",
    pins: "GPIO 21 (SDA) • GPIO 22 (SCL)",
    clockRate: "400 kHz Fast-Mode I2C",
    specs: ["500Hz Gyro/Accel Sampling", "16-bit ADC per axis", "DLPF Configured at 42Hz", "Zero-bias calibrated in NVS"],
    description: "Captures 3-axis angular rates (\u00b12000\u00b0/s) and linear acceleration (\u00b116g). Firmware reads raw registers via non-blocking DMA I2C transactions every 2.0ms.",
    signalsOut: ["esp32_core0"],
  },
  esp32_core0: {
    id: "esp32_core0",
    name: "ESP32 Core 0 (Flight PID)",
    role: "Deterministic Control Loop",
    layer: "compute",
    pins: "XTAL 240MHz • FreeRTOS Task",
    clockRate: "500 Hz Fixed Frequency (2000\u03bcs)",
    specs: ["Madgwick Quaternions (0.4ms)", "Cascaded P-I-D Control", "Microsecond Jitter < 8\u03bcs", "Hard Real-Time Priority 24"],
    description: "Executes the closed-loop attitude estimation and PID surface correction. Calculates target deflection angles for aileron, elevator, and rudder surfaces.",
    signalsOut: ["pwm_timer"],
  },
  esp32_core1: {
    id: "esp32_core1",
    name: "ESP32 Core 1 (Telemetry & AP)",
    role: "Asynchronous Telemetry & Web Server",
    layer: "compute",
    pins: "WiFi Radio • HTTP Port 80",
    clockRate: "50 Hz Telemetry Broadcast",
    specs: ["Self-hosted GroundStation.html", "WebSocket JSON State Stream", "NVS Flash Parameter Store", "Zero Core-0 Interference"],
    description: "Runs the standalone 802.11b/g/n Access Point and WebSockets server, streaming real-time attitude pitch/roll/yaw coordinates to connected mobile devices without cloud dependence.",
    signalsOut: [],
  },
  ibus_rx: {
    id: "ibus_rx",
    name: "FlySky iBUS Receiver Header",
    role: "Pilot Control Frame Capture",
    layer: "receiver",
    pins: "GPIO 16 (UART2 RX)",
    clockRate: "115,200 Baud Serial",
    specs: ["14 Channels over 1-wire UART", "7.0ms Packet Frame Rate", "Failsafe Flag Decoding", "Hardware Ring Buffer"],
    description: "Decodes 14-channel serial pulses from the FlySky transmitter. Triggers an interrupt upon frame arrival, transferring throttle and manual trim values to the PID loop.",
    signalsOut: ["esp32_core0"],
  },
  pwm_timer: {
    id: "pwm_timer",
    name: "LEDC Multi-Channel PWM Generator",
    role: "Actuation & Motor Modulation",
    layer: "actuation",
    pins: "GPIO 12, 13, 14, 15, 27",
    clockRate: "50Hz - 400Hz Hardware Timers",
    specs: ["16-bit Timer Resolution", "Sub-microsecond pulse accuracy", "5 Channels: 2 Ail, Ele, Rud, ESC", "Direct DMA hardware drive"],
    description: "Generates high-precision servo control pulses (1000\u03bcs to 2000\u03bcs) driving the physical control surfaces to counter aerodynamic disturbances in real time.",
    signalsOut: [],
  },
};

export function SubsystemArchitectureMap() {
  const [isExploded, setIsExploded] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("esp32_core0");
  const selectedNode = NODES[selectedNodeId] || NODES.esp32_core0;

  return (
    <div className="w-full my-8 select-none">
      <div className="rounded-3xl bg-[#090D15] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#ff6a2a]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#43d8ff]/10 blur-3xl pointer-events-none" />

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="font-mono text-xs font-bold text-[#ff6a2a] uppercase tracking-wider">
                AUTOSTABI AVIONICS // 500Hz PHYSICAL SCHEMATIC
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#f5f3ee] tracking-tight mt-1">
              Layered Subsystem & Signal Flow Map
            </h4>
          </div>

          {/* View Mode Toggle: Compact vs Exploded Stack */}
          <div className="flex items-center gap-2 bg-[#101622] border border-white/10 p-1.5 rounded-2xl">
            <button
              onClick={() => {
                sounds.playClick();
                setIsExploded(false);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                !isExploded
                  ? "bg-[#ff6a2a] text-white shadow-lg"
                  : "text-[#94a3b8] hover:text-[#f5f3ee]"
              }`}
            >
              COMPACT SCHEMATIC
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setIsExploded(true);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                isExploded
                  ? "bg-[#ff6a2a] text-white shadow-lg"
                  : "text-[#94a3b8] hover:text-[#f5f3ee]"
              }`}
            >
              EXPLODED STACK (2.5D)
            </button>
          </div>
        </div>

        {/* Main Interactive Diagram Layout: Left = Schematic Layers, Right = Selected Node Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Layered Architecture Panels */}
          <div className="lg:col-span-7 space-y-4">
            {/* Layer 1: Sensor Acquisition Layer */}
            <motion.div
              layout
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: isExploded ? "20px" : "4px" }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedNodeId === "mpu6500"
                  ? "bg-[#141b28] border-[#43d8ff] shadow-[0_0_25px_rgba(67,216,255,0.2)]"
                  : "bg-[#0d121c] border-white/10 hover:border-white/20"
              }`}
              onClick={() => {
                sounds.playTargetLock();
                setSelectedNodeId("mpu6500");
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#43d8ff]/10 text-[#43d8ff]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#43d8ff] font-bold uppercase tracking-wider">
                      LAYER 01 // SENSING & INERTIAL DYNAMICS
                    </span>
                    <h5 className="text-base font-bold text-[#f5f3ee]">MPU6500 6-DOF IMU</h5>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#94a3b8] bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                  I2C 400kHz
                </span>
              </div>

              {/* Animated I2C bus signal trace */}
              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-[#94a3b8]">
                <span>PINS: GPIO 21 (SDA) / 22 (SCL)</span>
                <span className="text-[#43d8ff] flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#43d8ff] animate-ping" />
                  500Hz REAL-TIME STREAM
                </span>
              </div>
            </motion.div>

            {/* Signal Conduit Visualizer between Layer 1 and 2 */}
            {isExploded && (
              <div className="h-6 flex items-center justify-center -my-3">
                <div className="w-0.5 h-full bg-gradient-to-b from-[#43d8ff] to-[#ffc84a] animate-pulse" />
              </div>
            )}

            {/* Layer 2: Real-time Processing Layer (Dual Core ESP32) */}
            <motion.div
              layout
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: isExploded ? "20px" : "4px" }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                selectedNodeId.startsWith("esp32")
                  ? "bg-[#141b28] border-[#ffc84a] shadow-[0_0_25px_rgba(255,200,74,0.2)]"
                  : "bg-[#0d121c] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#ffc84a]/10 text-[#ffc84a]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#ffc84a] font-bold uppercase tracking-wider">
                      LAYER 02 // DUAL-CORE COMPUTE & SCHEDULER
                    </span>
                    <h5 className="text-base font-bold text-[#f5f3ee]">ESP32 Xtensa LX6 @ 240MHz</h5>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#94a3b8] bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                  FreeRTOS SMP
                </span>
              </div>

              {/* Two sub-cores selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() => {
                    sounds.playTargetLock();
                    setSelectedNodeId("esp32_core0");
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedNodeId === "esp32_core0"
                      ? "bg-[#ffc84a]/15 border-[#ffc84a] text-[#f5f3ee]"
                      : "bg-black/30 border-white/5 text-[#94a3b8] hover:border-white/20"
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold text-[#ffc84a]">CORE 0 (HIGH PRIORITY)</div>
                  <div className="font-bold text-xs mt-0.5">500Hz PID & Quaternions</div>
                </button>

                <button
                  onClick={() => {
                    sounds.playTargetLock();
                    setSelectedNodeId("esp32_core1");
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedNodeId === "esp32_core1"
                      ? "bg-[#ffc84a]/15 border-[#ffc84a] text-[#f5f3ee]"
                      : "bg-black/30 border-white/5 text-[#94a3b8] hover:border-white/20"
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold text-[#ffc84a]">CORE 1 (ASYNC TASKS)</div>
                  <div className="font-bold text-xs mt-0.5">WiFi AP & GroundStation</div>
                </button>
              </div>
            </motion.div>

            {/* Signal Conduit Visualizer between Layer 2 and 3 */}
            {isExploded && (
              <div className="h-6 flex items-center justify-center -my-3">
                <div className="w-0.5 h-full bg-gradient-to-b from-[#ffc84a] to-[#ff6a2a] animate-pulse" />
              </div>
            )}

            {/* Layer 3: Receiver Signal Interface */}
            <motion.div
              layout
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: isExploded ? "20px" : "4px" }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedNodeId === "ibus_rx"
                  ? "bg-[#141b28] border-[#ff6a2a] shadow-[0_0_25px_rgba(255,106,42,0.2)]"
                  : "bg-[#0d121c] border-white/10 hover:border-white/20"
              }`}
              onClick={() => {
                sounds.playTargetLock();
                setSelectedNodeId("ibus_rx");
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#ff6a2a]/10 text-[#ff6a2a]">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#ff6a2a] font-bold uppercase tracking-wider">
                      LAYER 03 // RF PILOT TRANSMITTER INTERFACE
                    </span>
                    <h5 className="text-base font-bold text-[#f5f3ee]">FlySky iBUS / PPM Digital RX</h5>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#94a3b8] bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                  115,200 Baud UART
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-[#94a3b8]">
                <span>UART2 RX: GPIO 16 (14 CHANNELS)</span>
                <span className="text-[#ff6a2a] font-bold">FAILSAFE PROTECTED</span>
              </div>
            </motion.div>

            {/* Signal Conduit Visualizer between Layer 3 and 4 */}
            {isExploded && (
              <div className="h-6 flex items-center justify-center -my-3">
                <div className="w-0.5 h-full bg-gradient-to-b from-[#ff6a2a] to-[#10b981] animate-pulse" />
              </div>
            )}

            {/* Layer 4: Actuation PWM Drive Rails */}
            <motion.div
              layout
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                selectedNodeId === "pwm_timer"
                  ? "bg-[#141b28] border-[#10b981] shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                  : "bg-[#0d121c] border-white/10 hover:border-white/20"
              }`}
              onClick={() => {
                sounds.playTargetLock();
                setSelectedNodeId("pwm_timer");
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#10b981]/10 text-[#10b981]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#10b981] font-bold uppercase tracking-wider">
                      LAYER 04 // 5-CHANNEL PWM ACTUATION
                    </span>
                    <h5 className="text-base font-bold text-[#f5f3ee]">LEDC Hardware Pulse Generators</h5>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#94a3b8] bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                  1000 - 2000 \u03bcs
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-[#94a3b8]">
                <span>DRIVES: 2x AIL, 1x ELE, 1x RUD, 1x ESC</span>
                <span className="text-[#10b981] font-bold">16-BIT HARDWARE TIMERS</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Deep Telemetry Inspector for Selected Node */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-[#0f141f] border border-white/15 p-6 space-y-6 shadow-xl"
              >
                {/* Header */}
                <div className="border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] font-bold text-[#ff6a2a] uppercase tracking-wider">
                    TELEMETRY INSPECTION //
                  </span>
                  <h4 className="text-xl font-bold text-[#f5f3ee] mt-1">
                    {selectedNode.name}
                  </h4>
                  <p className="font-mono text-xs text-[#94a3b8] mt-0.5">
                    {selectedNode.role}
                  </p>
                </div>

                {/* Hardware Connection Specs */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[9px] text-[#64748b] font-bold uppercase">PIN MAPPING</span>
                    <div className="text-[#f5f3ee] font-bold mt-1 text-[11px]">{selectedNode.pins}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[9px] text-[#64748b] font-bold uppercase">BUS CLOCK RATE</span>
                    <div className="text-[#43d8ff] font-bold mt-1 text-[11px]">{selectedNode.clockRate}</div>
                  </div>
                </div>

                {/* Functional Description */}
                <div>
                  <span className="font-mono text-[10px] text-[#64748b] font-bold uppercase tracking-wider">
                    OPERATIONAL DESCRIPTION //
                  </span>
                  <p className="font-sans text-xs text-[#94a3b8] leading-relaxed mt-1.5">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Bullet Specifications */}
                <div>
                  <span className="font-mono text-[10px] text-[#64748b] font-bold uppercase tracking-wider">
                    VERIFIED BENCH METRICS //
                  </span>
                  <div className="space-y-2 mt-2 font-mono text-xs">
                    {selectedNode.specs.map((spec) => (
                      <div key={spec} className="flex items-start gap-2 text-[#f5f3ee]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer cue */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#64748b]">
                  <span>SELECT ANY LAYER TO INSPECT PINS</span>
                  <span className="text-[#ff6a2a] font-bold">500Hz ACTIVE</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
