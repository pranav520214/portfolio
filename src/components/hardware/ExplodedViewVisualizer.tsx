"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { Cpu, Plane, Sliders, Zap } from "lucide-react";
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
        <Text position={[0, -0.4, 0]} fontSize={0.2} color="#F59E0B">
          FR4 DUAL-LAYER PCB // I2C BUS 500HZ
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
        <Text position={[0, 0.5, 0]} fontSize={0.22} color="#F59E0B">
          ESP32 240MHz (FREERTOS + PID)
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
        <Text position={[0, 0.45, 0]} fontSize={0.18} color="#94A3B8">
          5-CHANNEL PWM SERVO OUTPUTS
        </Text>
      </group>

      {/* Dynamic Trace Signal Lines when exploded */}
      {explodeAmount > 0.2 && (
        <Line
          points={[
            [-1.2, d * 0.9, -0.6],
            [-0.8, 0.15, -0.4],
            [0, 0.15, 0],
          ]}
          color="#F59E0B"
          lineWidth={2}
          dashed
        />
      )}
    </group>
  );
}

// 3D AI Computational Core Exploded Scene (LocalFlow Dual-Engine)
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
      {/* Base Layer: Audio Capture & Ring Buffer */}
      <group position={[0, -d * 0.9, 0]}>
        <RoundedBox args={[3.2, 0.2, 3.2]} radius={0.1}>
          <meshStandardMaterial color="#1e1b4b" wireframe />
        </RoundedBox>
        <Text position={[0, -0.4, 0]} fontSize={0.2} color="#818cf8">
          01 // 16kHz PCM AUDIO RING BUFFER
        </Text>
      </group>

      {/* Central Core: Streaming NeMo-Speech.cpp (GPU) */}
      <group position={[0, 0, 0]}>
        <RoundedBox args={[2.0, 1.2, 2.0]} radius={0.2}>
          <meshStandardMaterial color="#F59E0B" roughness={0.2} metalness={0.7} />
        </RoundedBox>
        <Text position={[0, 0, 1.2]} fontSize={0.22} color="#0D0F12">
          STREAMING ASR (CUDA)
        </Text>
      </group>

      {/* Top Layer: Local LLM Core (CPU) */}
      <group position={[0, d * 1.1, 0]}>
        <RoundedBox args={[2.8, 0.25, 2.8]} radius={0.1}>
          <meshStandardMaterial color="#10b981" wireframe />
        </RoundedBox>
        <Text position={[0, 0.45, 0]} fontSize={0.2} color="#34d399">
          03 // LLAMA.CPP TEXT ENGINE (CPU)
        </Text>
      </group>

      {/* Loopback IPC Ring */}
      <group position={[0, d * 1.8, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.0, 32]} />
          <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
        </mesh>
        <Text position={[0, 0.3, 0]} fontSize={0.18} color="#38bdf8">
          LOOPBACK IPC (127.0.0.1)
        </Text>
      </group>
    </group>
  );
}

export function ExplodedViewVisualizer() {
  const [modelType, setModelType] = useState<"avionics" | "ai_core">("avionics");
  const [explodeValue, setExplodeValue] = useState<number>(0.65);

  return (
    <div className="relative z-20">
      {/* Top Selector Toggle */}
      <div className="mb-4 flex items-center justify-between">
        <div className="font-mono text-xs text-[#94A3B8] uppercase">
          MODEL: {modelType === "avionics" ? "AUTOSTABI AVIONICS" : "LOCALFLOW DUAL-ENGINE"}
        </div>

        <div className="flex items-center gap-1 bg-[#14171E] p-1 rounded-lg border border-[#262E3B] font-mono text-xs">
          <button
            onClick={() => {
              sounds.playClick();
              setModelType("avionics");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              modelType === "avionics"
                ? "bg-[#1C212B] text-[#F59E0B] font-bold border border-[#262E3B]"
                : "text-[#94A3B8] hover:text-[#F1F5F9]"
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
                ? "bg-[#1C212B] text-[#F59E0B] font-bold border border-[#262E3B]"
                : "text-[#94A3B8] hover:text-[#F1F5F9]"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>LOCAL AI ENGINE</span>
          </button>
        </div>
      </div>

      {/* 3D Stage & Control Bar Container */}
      <div className="bg-[#0D0F12] border border-[#262E3B] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Interactive 3D Canvas */}
        <div data-cursor="3d" className="relative w-full h-[440px] sm:h-[500px]">
          <Canvas
            camera={{ position: [0, 2, 7], fov: 48 }}
            dpr={[1, 1.5]}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[6, 8, 5]} intensity={1.8} color="#fff8e7" />
            <pointLight position={[-6, -4, 3]} intensity={1.2} color="#F59E0B" />
            <pointLight position={[5, -2, -2]} intensity={1.0} color="#38bdf8" />

            <OrbitControls enableZoom={false} enablePan={false} dampingFactor={0.05} />

            {modelType === "avionics" ? (
              <AvionicsExplodedScene explodeAmount={explodeValue} />
            ) : (
              <AICoreExplodedScene explodeAmount={explodeValue} />
            )}
          </Canvas>

          {/* Canvas Floating Overlay Badges */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-[#F59E0B] bg-[#14171E]/90 px-3 py-1.5 rounded-lg border border-[#262E3B] pointer-events-none backdrop-blur">
            SYS: {modelType === "avionics" ? "AUTOSTABI_ESP32" : "LOCALFLOW_DUAL_RUNTIME"}
          </div>

          <div className="absolute top-4 right-4 font-mono text-[10px] text-[#94A3B8] bg-[#14171E]/90 px-3 py-1.5 rounded-lg border border-[#262E3B] pointer-events-none backdrop-blur">
            SEPARATION: {Math.round(explodeValue * 100)}%
          </div>
        </div>

        {/* Bottom Control Bar with Separation Slider */}
        <div className="bg-[#14171E] border-t border-[#262E3B] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <span className="font-mono text-xs text-[#F59E0B] font-bold uppercase shrink-0 flex items-center gap-1.5">
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
              className="w-full accent-[#F59E0B] cursor-pointer"
            />
          </div>

          <div className="font-mono text-xs text-[#94A3B8] flex items-center gap-3">
            <span>DRAG TO ROTATE 3D VIEW</span>
            <span className="text-[#F59E0B]">◆</span>
            <span className="text-emerald-400">HARDWARE VALIDATED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
