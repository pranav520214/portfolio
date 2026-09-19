"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sounds } from "../../audio/SoundSystem";

interface StoryProject3DProps {
  progress: number;
  selectedSlug: string | null;
  onSelectProject: (slug: string | null) => void;
}

interface ProjectInstrumentDef {
  slug: string;
  title: string;
  category: string;
  color: string;
  accentColor: string;
  badge: string;
  drawDisplay: (ctx: CanvasRenderingContext2D, time: number) => void;
  layers: { name: string; zOffset: number; color: string; desc: string }[];
}

export function StoryProject3D({ progress, selectedSlug, onSelectProject }: StoryProject3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [orbitAngle, setOrbitAngle] = useState(0);

  // 1. Definition of the 5 Engineered Flagship Instruments
  const INSTRUMENTS: ProjectInstrumentDef[] = useMemo(() => [
    {
      slug: "localflow",
      title: "LocalFlow",
      category: "STREAMING ASR",
      color: "#FFC84A",
      accentColor: "#FFE599",
      badge: "118ms • 3.2GB VRAM",
      drawDisplay: (ctx, t) => {
        // Audio FFT Waveform & Attention Matrix
        ctx.fillStyle = "#0A101D";
        ctx.fillRect(0, 0, 512, 512);

        // Circular spectrum ring
        ctx.strokeStyle = "#FFC84A";
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let i = 0; i < 32; i++) {
          const a = (i / 32) * Math.PI * 2;
          const barH = 140 + Math.sin(i * 0.8 + t * 4.0) * 35;
          const x = 256 + Math.cos(a) * barH;
          const y = 256 + Math.sin(a) * barH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 32px monospace";
        ctx.textAlign = "center";
        ctx.fillText("LOCALFLOW // ASR", 256, 240);
        ctx.fillStyle = "#FFC84A";
        ctx.font = "20px monospace";
        ctx.fillText("ZERO CLOUD • 4GB VRAM", 256, 280);
      },
      layers: [
        { name: "Audio Ring Buffer", zOffset: 1.4, color: "#FFE599", desc: "Non-blocking ring queue" },
        { name: "Streaming VAD Engine", zOffset: 0.7, color: "#FFD166", desc: "Voice activity detection" },
        { name: "NeMo-Speech.cpp Core", zOffset: 0.0, color: "#FFC84A", desc: "C++ inference runtime" },
        { name: "VRAM Memory Pool", zOffset: -0.7, color: "#F59E0B", desc: "Pinned GPU memory buffer" },
        { name: "Local IPC Protocol", zOffset: -1.4, color: "#D97706", desc: "Named pipes zero-lag dispatch" },
      ],
    },
    {
      slug: "autostabi",
      title: "AUTOSTABI",
      category: "AVIONICS",
      color: "#FF6A2A",
      accentColor: "#FF9E79",
      badge: "500Hz REALTIME PID",
      drawDisplay: (ctx, t) => {
        // Artificial Attitude Horizon & Aircraft Delta Wireframe
        ctx.fillStyle = "#0A101D";
        ctx.fillRect(0, 0, 512, 512);

        // Pitch & Roll lines
        const roll = Math.sin(t * 1.5) * 0.25;
        const pitch = Math.cos(t * 1.2) * 20;
        ctx.save();
        ctx.translate(256, 256 + pitch);
        ctx.rotate(roll);

        ctx.strokeStyle = "#FF6A2A";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(80, 0);
        ctx.lineTo(432, 0);
        ctx.stroke();

        // Ladder marks
        for (let y = -80; y <= 80; y += 40) {
          if (y === 0) continue;
          ctx.beginPath();
          ctx.moveTo(180, y);
          ctx.lineTo(332, y);
          ctx.stroke();
        }
        ctx.restore();

        // Fixed delta aircraft symbol
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(256, 220);
        ctx.lineTo(210, 275);
        ctx.lineTo(256, 260);
        ctx.lineTo(302, 275);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = "#FF6A2A";
        ctx.font = "bold 26px monospace";
        ctx.textAlign = "center";
        ctx.fillText("500Hz ATTITUDE ESTIMATION", 256, 380);
      },
      layers: [
        { name: "MPU6500 IMU Header", zOffset: 1.4, color: "#FF9E79", desc: "400kHz Fast-Mode I2C" },
        { name: "DMA Frame Ingestion", zOffset: 0.7, color: "#FF7E47", desc: "Non-blocking ring buffer" },
        { name: "ESP32 Core 0 (Madgwick)", zOffset: 0.0, color: "#FF6A2A", desc: "2000µs deterministic loop" },
        { name: "LEDC PWM Surface Timers", zOffset: -0.7, color: "#EA580C", desc: "Sub-microsecond pulse accuracy" },
        { name: "Aerodynamic Elevon Mix", zOffset: -1.4, color: "#C2410C", desc: "Physical surface deflection" },
      ],
    },
    {
      slug: "wand-mouse",
      title: "Wand Mouse",
      category: "6-DOF BLE HID",
      color: "#43D8FF",
      accentColor: "#BAE6FD",
      badge: "OPTICAL CLICK • 0ms",
      drawDisplay: (ctx, t) => {
        // 3D Quaternion axes & optical beam
        ctx.fillStyle = "#0A101D";
        ctx.fillRect(0, 0, 512, 512);

        ctx.strokeStyle = "#43D8FF";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(256, 256, 160, 0, Math.PI * 2);
        ctx.stroke();

        // Rotating coordinate vectors
        const a = t * 2.0;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(256, 256);
        ctx.lineTo(256 + Math.cos(a) * 120, 256 + Math.sin(a) * 120);
        ctx.moveTo(256, 256);
        ctx.lineTo(256 + Math.cos(a + 2.1) * 100, 256 + Math.sin(a + 2.1) * 100);
        ctx.moveTo(256, 256);
        ctx.lineTo(256 + Math.cos(a + 4.2) * 100, 256 + Math.sin(a + 4.2) * 100);
        ctx.stroke();

        ctx.fillStyle = "#43D8FF";
        ctx.font = "bold 28px monospace";
        ctx.textAlign = "center";
        ctx.fillText("6-DOF BLE IMU", 256, 120);
      },
      layers: [
        { name: "Optical Beam Trigger", zOffset: 1.4, color: "#BAE6FD", desc: "Zero-travel photointerrupter" },
        { name: "ICM-20948 Fusion", zOffset: 0.7, color: "#7DD3FC", desc: "On-chip DMP gyro integration" },
        { name: "ESP32-C3 Firmware", zOffset: 0.0, color: "#43D8FF", desc: "RISC-V real-time kernel" },
        { name: "BLE HID Descriptor", zOffset: -0.7, color: "#0284C7", desc: "Driverless mouse report" },
        { name: "Carbon Fiber Housing", zOffset: -1.4, color: "#0369A1", desc: "Ergonomic handheld wand" },
      ],
    },
    {
      slug: "privaveda",
      title: "PRIVAVEDA",
      category: "STIFF PHYSICS",
      color: "#8D72FF",
      accentColor: "#DDD6FE",
      badge: "RADAU IIA SOLVER",
      drawDisplay: (ctx, t) => {
        // Stiff ODE Phase-space Attractor
        ctx.fillStyle = "#0A101D";
        ctx.fillRect(0, 0, 512, 512);

        ctx.strokeStyle = "#8D72FF";
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < 180; i++) {
          const theta = (i / 180) * Math.PI * 8 + t;
          const r = 30 + i * 0.9;
          const x = 256 + Math.cos(theta) * r;
          const y = 256 + Math.sin(theta * 1.3) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 28px monospace";
        ctx.textAlign = "center";
        ctx.fillText("IMPLICIT RADAU IIA", 256, 380);
      },
      layers: [
        { name: "State Vector Ingest", zOffset: 1.4, color: "#DDD6FE", desc: "High-dimensional phase states" },
        { name: "Jacobian Matrix Cache", zOffset: 0.7, color: "#A78BFA", desc: "Sparse analytical derivatives" },
        { name: "Implicit Radau Solver", zOffset: 0.0, color: "#8D72FF", desc: "5th-order A-stable integration" },
        { name: "Adaptive Step Control", zOffset: -0.7, color: "#6D28D9", desc: "Local error truncation" },
        { name: "Telemetry Broadcast", zOffset: -1.4, color: "#4C1D95", desc: "Real-time state trajectory" },
      ],
    },
    {
      slug: "fpv-controller",
      title: "FPV Controller",
      category: "AERO SIMULATOR",
      color: "#10B981",
      accentColor: "#A7F3D0",
      badge: "PPM INPUT CAPTURE ISR",
      drawDisplay: (ctx, t) => {
        // Dual Gimbal Sticks & PWM Waveform
        ctx.fillStyle = "#0A101D";
        ctx.fillRect(0, 0, 512, 512);

        // Left gimbal
        ctx.strokeStyle = "#10B981";
        ctx.lineWidth = 4;
        ctx.strokeRect(100, 150, 120, 120);
        ctx.fillStyle = "#10B981";
        ctx.beginPath();
        ctx.arc(160 + Math.sin(t * 2.0) * 35, 210 + Math.cos(t * 1.8) * 35, 14, 0, Math.PI * 2);
        ctx.fill();

        // Right gimbal
        ctx.strokeRect(292, 150, 120, 120);
        ctx.beginPath();
        ctx.arc(352 + Math.cos(t * 1.5) * 35, 210 + Math.sin(t * 2.2) * 35, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 26px monospace";
        ctx.textAlign = "center";
        ctx.fillText("MICROSECOND PULSE ISR", 256, 360);
      },
      layers: [
        { name: "Gimbal Potentiometers", zOffset: 1.4, color: "#A7F3D0", desc: "Quad analog stick axes" },
        { name: "Timer Input Capture ISR", zOffset: 0.7, color: "#34D399", desc: "Hardware edge timestamping" },
        { name: "Ring Buffer Pipeline", zOffset: 0.0, color: "#10B981", desc: "Jitter filter & deadband" },
        { name: "USB HID + BLE Joystick", zOffset: -0.7, color: "#059669", desc: "Cross-platform aero sim feed" },
        { name: "FS-i6X Host Enclosure", zOffset: -1.4, color: "#047857", desc: "Physical ergonomics & wiring" },
      ],
    },
  ], []);

  // 2. Canvases & Textures for Instrument Displays
  const canvases = useMemo(() => {
    return INSTRUMENTS.map(() => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 512;
      return c;
    });
  }, [INSTRUMENTS]);

  const textures = useMemo(() => {
    return canvases.map((c) => {
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    });
  }, [canvases]);

  // Update dynamic instrument display animations
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    INSTRUMENTS.forEach((inst, i) => {
      const ctx = canvases[i].getContext("2d");
      if (ctx) {
        inst.drawDisplay(ctx, t);
        textures[i].needsUpdate = true;
      }
    });

    if (!selectedSlug) {
      setOrbitAngle((prev) => (prev + delta * 0.22) % (Math.PI * 2));
    }
  });

  // Environmental dust motes for huge spatial scale
  const [dustGeo, dustMat] = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 32.0;
      positions[idx + 1] = (Math.random() - 0.5) * 18.0;
      positions[idx + 2] = -40 + (Math.random() - 0.5) * 25.0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color("#475569"),
      size: 0.12,
      transparent: true,
      opacity: 0.45,
    });
    return [geo, mat];
  }, []);

  // Global progress visibility & convergence into Capability Core
  const [opacity, convergence] = useMemo(() => {
    let op = 0;
    let conv = 0;

    if (progress >= 0.35 && progress < 0.39) {
      op = (progress - 0.35) / 0.04;
    } else if (progress >= 0.39 && progress <= 0.52) {
      op = 1.0;
    } else if (progress > 0.52 && progress <= 0.58) {
      const pExit = (progress - 0.52) / 0.06;
      op = 1.0 - pExit;
      conv = pExit; // Fly inward to construct Capability Core
    }

    return [op, conv];
  }, [progress]);

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 0, -40]}>
      {/* Environmental Lighting for True PBR Depth */}
      <pointLight position={[0, 6, 4]} color="#FFE599" intensity={1.8} distance={25} />
      <pointLight position={[0, -6, 2]} color="#38BDF8" intensity={1.2} distance={20} />

      {/* Floating Spatial Dust Motes */}
      <points geometry={dustGeo} material={dustMat} />

      {/* Distant Architectural Guide Truss */}
      <mesh rotation={[Math.PI * 0.45, 0, 0]}>
        <torusGeometry args={[7.2, 0.08, 16, 64]} />
        <meshBasicMaterial
          color="#334155"
          transparent
          opacity={0.4 * opacity * (1 - convergence)}
        />
      </mesh>

      {/* 5 Flagship Engineered Instruments */}
      {INSTRUMENTS.map((inst, idx) => {
        const isSelected = selectedSlug === inst.slug;
        const angle = orbitAngle + (idx / INSTRUMENTS.length) * Math.PI * 2;

        // Wide orbital placement (Radius X: 6.8, Y: 2.8, Z: 2.2)
        const orbitX = Math.cos(angle) * 6.8;
        const orbitY = Math.sin(angle) * 2.8;
        const orbitZ = Math.sin(angle) * 2.0;

        // Target convergence coordinates for Chapter 6 transition
        const targetX = THREE.MathUtils.lerp(orbitX, 0, convergence);
        const targetY = THREE.MathUtils.lerp(orbitY, 0, convergence);
        const targetZ = THREE.MathUtils.lerp(orbitZ, -14, convergence);

        // When selected: brings instrument close to camera (Z = 5.2, Y = 0)
        // Scaled to occupy 55% - 70% of the viewport!
        const posX = isSelected ? 0 : targetX;
        const posY = isSelected ? 0 : targetY;
        const posZ = isSelected ? 5.2 : targetZ;

        return (
          <group
            key={inst.slug}
            position={[posX, posY, posZ]}
            onClick={(e) => {
              e.stopPropagation();
              sounds.playClick();
              onSelectProject(isSelected ? null : inst.slug);
            }}
          >
            {/* If Selected: 3D Physical Spatial Layer Separation */}
            {isSelected ? (
              <group>
                {/* 5 Separated Physical Functional Layers */}
                {inst.layers.map((layer) => (
                  <group key={layer.name} position={[0, 0, layer.zOffset]}>
                    {/* Layer Base Plate */}
                    <mesh>
                      <cylinderGeometry args={[1.85, 1.85, 0.12, 32]} />
                      <meshStandardMaterial
                        color={layer.color}
                        metalness={0.85}
                        roughness={0.25}
                        transparent
                        opacity={0.94}
                      />
                    </mesh>
                    {/* Metallic Outer Ring */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                      <ringGeometry args={[1.88, 1.96, 32]} />
                      <meshBasicMaterial
                        color="#FFFFFF"
                        transparent
                        opacity={0.8}
                        side={THREE.DoubleSide}
                      />
                    </mesh>
                  </group>
                ))}

                {/* Display Screen Quad mounted on front layer */}
                <mesh position={[0, 0, 1.5]}>
                  <planeGeometry args={[2.2, 2.2]} />
                  <meshBasicMaterial map={textures[idx]} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
              </group>
            ) : (
              /* Normal Orbiting Engineered Instrument (Radius 1.85 — 25-35% Viewport!) */
              <group rotation={[0, isSelected ? 0 : angle, 0]}>
                {/* Heavy Machined Titanium Bevel Chassis */}
                <mesh>
                  <cylinderGeometry args={[1.85, 1.85, 0.36, 48]} />
                  <meshStandardMaterial
                    color="#151D2A"
                    metalness={0.92}
                    roughness={0.18}
                    transparent
                    opacity={opacity * 0.98}
                  />
                </mesh>

                {/* Accent Machined Metal Rim */}
                <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[1.72, 1.88, 48]} />
                  <meshStandardMaterial
                    color={inst.color}
                    metalness={0.85}
                    roughness={0.2}
                    emissive={inst.color}
                    emissiveIntensity={0.6}
                  />
                </mesh>

                {/* Recessed Dynamic Instrument Display Surface */}
                <mesh position={[0, 0.20, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[2.4, 2.4]} />
                  <meshBasicMaterial
                    map={textures[idx]}
                    transparent
                    opacity={opacity * 0.95}
                    side={THREE.DoubleSide}
                    toneMapped={false}
                  />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}
