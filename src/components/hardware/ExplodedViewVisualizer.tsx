"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { Cpu, Plane, Sliders, ShieldCheck, Zap } from "lucide-react";
import { sounds } from "../audio/SoundSystem";

// 3D Exploded Flight Controller Subsystems
function AvionicsExplodedScene({ explodeAmount }: { explodeAmount: number }) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.15;
  });

  // Separation distance calculated from slider [0 to 1]
  const d = explodeAmount * 2.2;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base FR4 Fiberglass PCB Layer */}
      <group position={[0, -d * 0.8, 0]}>
        <RoundedBox args={[4.0, 0.15, 3.2]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#0f392b" roughness={0.4} metalness={0.2} />
        </RoundedBox>
        {/* PCB Copper Traces */}
        <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 3.0]} />
          <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.3} />
        </mesh>
        <Text position={[0, -0.4, 0]} fontSize={0.2} color="#ffe600">
          FR4 DUAL-LAYER PCB // BUS 250HZ
        </Text>
      </group>

      {/* Main ESP32 Dual-Core Microcontroller */}
      <group position={[0, 0, 0]}>
        <RoundedBox args={[1.6, 0.25, 2.2]} radius={0.05} smoothness={4}>
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </RoundedBox>
        {/* Metal RF Shield Can */}
        <mesh position={[0, 0.18, 0.3]}>
          <boxGeometry args={[1.3, 0.1, 1.3]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
        <Text position={[0, 0.5, 0]} fontSize={0.22} color="#ffe600">
          ESP32 240MHz (KALMAN + PID)
        </Text>
      </group>

      {/* MPU6500 6-DOF IMU Sensor Module */}
      <group position={[-1.2, d * 0.9, -0.6]}>
        <RoundedBox args={[0.7, 0.15, 0.7]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#0284c7" metalness={0.5} roughness={0.2} />
        </RoundedBox>
        <Text position={[0, 0.35, 0]} fontSize={0.18} color="#38bdf8">
          MPU6500 (GYRO + ACCEL 500Hz)
        </Text>
      </group>

      {/* FS-i6 iBUS Digital RC Receiver Header */}
      <group position={[1.2, d * 0.9, -0.6]}>
        <RoundedBox args={[0.9, 0.2, 0.8]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#dc2626" metalness={0.3} roughness={0.4} />
        </RoundedBox>
        <Text position={[0, 0.35, 0]} fontSize={0.18} color="#f87171">
          FS-i6 iBUS RECEIVER (14-CH)
        </Text>
      </group>

      {/* Servo PWM Header Output Array (Aileron/Elevator/Rudder/Throttle) */}
      <group position={[0, d * 1.6, 1.0]}>
        <RoundedBox args={[2.8, 0.35, 0.5]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        {/* Gold Header Pins */}
        {[-1.0, -0.5, 0, 0.5, 1.0].map((x, i) => (
          <mesh key={i} position={[x, 0.3, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#eab308" metalness={1} roughness={0.1} />
          </mesh>
        ))}
        <Text position={[0, 0.7, 0]} fontSize={0.2} color="#4ade80">
          PWM SERVO MIXER (4x ACTUATORS)
        </Text>
      </group>

      {/* Signal trace line between IMU and ESP32 */}
      {explodeAmount > 0.1 && (
        <Line
          points={[
            [-1.2, d * 0.9, -0.6],
            [-0.8, 0.15, -0.4],
            [0, 0.15, 0],
          ]}
          color="#ffe600"
          lineWidth={2}
          dashed
        />
      )}
    </group>
  );
}

// 3D AI Computational Core Exploded Scene
function AICoreExplodedScene({ explodeAmount }: { explodeAmount: number }) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.2;
  });

  const d = explodeAmount * 2.0;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base Layer: Tree-sitter AST & Ingestion Engine */}
      <group position={[0, -d * 0.9, 0]}>
        <RoundedBox args={[3.2, 0.2, 3.2]} radius={0.1}>
          <meshStandardMaterial color="#1e1b4b" wireframe />
        </RoundedBox>
        <Text position={[0, -0.4, 0]} fontSize={0.2} color="#818cf8">
          01 // REPOSITORY AST & REPO SYMBOLS
        </Text>
      </group>

      {/* Central Core: Quantized Local SLM (Ollama/Llama.cpp) */}
      <group position={[0, 0, 0]}>
        <RoundedBox args={[2.0, 1.2, 2.0]} radius={0.2}>
          <meshStandardMaterial color="#ffe600" roughness={0.2} metalness={0.7} />
        </RoundedBox>
        <Text position={[0, 0, 1.2]} fontSize={0.22} color="#080302">
          QUANTIZED LOCAL SLM
        </Text>
      </group>

      {/* Top Layer: CWE Security Schema & Multi-Tool Verification Gate */}
      <group position={[0, d * 1.1, 0]}>
        <RoundedBox args={[2.8, 0.25, 2.8]} radius={0.1}>
          <meshStandardMaterial color="#10b981" wireframe />
        </RoundedBox>
        <Text position={[0, 0.45, 0]} fontSize={0.2} color="#34d399">
          03 // MULTI-TOOL VERIFICATION GATE
        </Text>
      </group>

      {/* Sandbox Execution Ring */}
      <group position={[0, d * 1.8, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.0, 32]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>
        <Text position={[0, 0.3, 0]} fontSize={0.18} color="#38bdf8">
          CONTAINERIZED TEST SANDBOX
        </Text>
      </group>
    </group>
  );
}

export function ExplodedViewVisualizer() {
  const [modelType, setModelType] = useState<"avionics" | "ai_core">("avionics");
  const [explodeValue, setExplodeValue] = useState<number>(0.65);

  return (
    <section id="hardware" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-comic-yellow bg-blueprint-900/80 border border-comic-yellow/30 px-3 py-1 rounded mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>05 // 3D EXPLODED-VIEW SUBSYSTEM INSPECTOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-technical-white tracking-tight">
            EXPLODED-VIEW <span className="text-comic-yellow">ENGINEERING</span>
          </h2>
          <p className="text-sm sm:text-base text-technical-cream/80 max-w-2xl mt-2">
            Inspect real hardware and computational architectures decomposed into individual components. 
            Adjust the slider below to disassemble the assembly along spatial coordinate axes.
          </p>
        </div>

        {/* Model Selector Toggle */}
        <div className="flex items-center gap-2 bg-blueprint-950 p-1.5 rounded-lg border border-comic-yellow/30 font-mono text-xs self-start md:self-auto">
          <button
            onClick={() => {
              sounds.playClick();
              setModelType("avionics");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              modelType === "avionics"
                ? "bg-comic-yellow text-blueprint-950 font-bold"
                : "text-technical-cream hover:text-comic-yellow"
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>FLIGHT AVIONICS</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setModelType("ai_core");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              modelType === "ai_core"
                ? "bg-comic-yellow text-blueprint-950 font-bold"
                : "text-technical-cream hover:text-comic-yellow"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>AI COMPUTE CORE</span>
          </button>
        </div>
      </div>

      {/* 3D Stage & Control Bar Container */}
      <div className="bg-blueprint-950/90 border-2 border-comic-yellow/50 rounded-2xl overflow-hidden shadow-comic-lg flex flex-col">
        {/* Interactive 3D Canvas */}
        <div data-cursor="3d" className="relative w-full h-[480px] sm:h-[540px]">
          <Canvas
            camera={{ position: [0, 2, 7], fov: 48 }}
            dpr={[1, 1.5]}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[6, 8, 5]} intensity={1.8} color="#fff8e7" />
            <pointLight position={[-6, -4, 3]} intensity={1.2} color="#ffe600" />
            <pointLight position={[5, -2, -2]} intensity={1.0} color="#ff4d36" />

            <OrbitControls enableZoom={false} enablePan={false} dampingFactor={0.05} />

            {modelType === "avionics" ? (
              <AvionicsExplodedScene explodeAmount={explodeValue} />
            ) : (
              <AICoreExplodedScene explodeAmount={explodeValue} />
            )}
          </Canvas>

          {/* Canvas Floating Overlay Badges */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-comic-yellow bg-blueprint-900/80 px-2.5 py-1 rounded border border-comic-yellow/30 pointer-events-none backdrop-blur">
            SYS: {modelType === "avionics" ? "ESP32_AVIONICS_v2" : "RUDRA_CORE_SLM"}
          </div>

          <div className="absolute top-4 right-4 font-mono text-[10px] text-technical-cream/70 bg-blueprint-900/80 px-2.5 py-1 rounded border border-comic-yellow/30 pointer-events-none backdrop-blur">
            SEPARATION: {Math.round(explodeValue * 100)}%
          </div>
        </div>

        {/* Bottom Control Bar with Separation Slider */}
        <div className="bg-blueprint-900/90 border-t-2 border-comic-yellow/30 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <span className="font-mono text-xs text-comic-yellow font-bold uppercase shrink-0 flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              <span>EXPLODE AXIS:</span>
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeValue}
              onChange={(e) => {
                setExplodeValue(parseFloat(e.target.value));
              }}
              className="w-full accent-comic-yellow cursor-pointer"
            />
          </div>

          <div className="font-mono text-xs text-technical-cream/80 flex items-center gap-3">
            <span>DRAG SCENE TO ORBIT</span>
            <span className="text-comic-yellow">◆</span>
            <span className="text-emerald-400">HARDWARE VALIDATED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
