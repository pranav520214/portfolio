"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { sounds } from "../audio/SoundSystem";

interface DomainSatelliteProps {
  label: string;
  sublabel: string;
  position: [number, number, number];
  color: string;
  active: boolean;
  onHover: (active: boolean) => void;
  onClick: () => void;
}

// 3D Domain Satellite Node
function DomainSatellite({
  label,
  sublabel,
  position,
  color,
  active,
  onHover,
  onClick,
}: DomainSatelliteProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
      const targetScale = active ? 1.3 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    }
  });

  return (
    <group position={position}>
      {/* Interactive Satellite Core Mesh */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <octahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color={active ? "#FF4D36" : color}
          emissive={active ? color : "#000000"}
          emissiveIntensity={active ? 1.2 : 0.2}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Halo ring */}
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.34, 0.38, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={active ? 0.9 : 0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating 3D Text Tag */}
      <Text
        position={[0, 0.44, 0]}
        fontSize={0.13}
        color={active ? "#F59E0B" : "#F1F5F9"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.09}
        color="#94A3B8"
        anchorX="center"
        anchorY="middle"
      >
        {sublabel}
      </Text>

      {/* Signal conduit link to [0,0,0] core */}
      <Line
        points={[
          [0, 0, 0],
          [-position[0], -position[1], -position[2]],
        ]}
        color={active ? "#FF4D36" : color}
        lineWidth={active ? 2.0 : 0.8}
        transparent
        opacity={active ? 0.9 : 0.25}
        dashed={!active}
        dashScale={2}
        dashSize={0.2}
        gapSize={0.15}
      />
    </group>
  );
}

// Stator Rings & Kinetic Frame
function StatorGimbals({ active }: { active: boolean }) {
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const tertiaryRingRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const speedMult = active ? 2.0 : 1.0;
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.08 * speedMult;
      outerRingRef.current.rotation.x += delta * 0.04 * speedMult;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 0.12 * speedMult;
      innerRingRef.current.rotation.z += delta * 0.06 * speedMult;
    }
    if (tertiaryRingRef.current) {
      tertiaryRingRef.current.rotation.x -= delta * 0.09 * speedMult;
    }
  });

  return (
    <group>
      {/* Outer Titanium Stator Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[2.8, 0.025, 16, 100]} />
          <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* Mid Ring */}
      <group ref={innerRingRef} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.2, 0.02, 16, 90]} />
          <meshStandardMaterial color="#D94431" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>

      {/* Tertiary Photonic Waveguide Ring */}
      <group ref={tertiaryRingRef} rotation={[-0.3, 0.5, 0.2]}>
        <mesh>
          <torusGeometry args={[1.65, 0.015, 12, 80]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// The Central Silicon & Photonic Reactor Core
function ReactorCore({ hovered }: { hovered: boolean }) {
  const coreGroup = useRef<THREE.Group>(null);
  const wafer1 = useRef<THREE.Mesh>(null);
  const wafer2 = useRef<THREE.Mesh>(null);
  const wafer3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (coreGroup.current) {
      coreGroup.current.rotation.y = t * 0.15;
    }
    if (wafer1.current) wafer1.current.position.y = Math.sin(t * 1.5) * 0.06 + 0.22;
    if (wafer2.current) wafer2.current.position.y = Math.cos(t * 1.2) * 0.04;
    if (wafer3.current) wafer3.current.position.y = -Math.sin(t * 1.5) * 0.06 - 0.22;
  });

  return (
    <group ref={coreGroup}>
      {/* Central Quantum / Silicon Die */}
      <mesh>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color="#0F172A"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Glowing Emissive Core Junction */}
      <mesh>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial
          color="#D94431"
          emissive="#D94431"
          emissiveIntensity={hovered ? 2.4 : 1.4}
          roughness={0.1}
          metalness={0.4}
        />
      </mesh>

      {/* Top Silicon Wafer Substrate */}
      <mesh ref={wafer1} position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.04, 8]} />
        <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Mid Micro-logic Wafer */}
      <mesh ref={wafer2} position={[0, 0, 0]} rotation={[0, Math.PI / 8, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.03, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Bottom Substrate Layer */}
      <mesh ref={wafer3} position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.04, 8]} />
        <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Gold Bond-Wire Grid Cage */}
      <mesh>
        <boxGeometry args={[1.25, 1.25, 1.25]} />
        <meshBasicMaterial color="#F59E0B" wireframe transparent opacity={hovered ? 0.45 : 0.2} />
      </mesh>
    </group>
  );
}

// Ambient Data Telemetry Particle Field
function TelemetryField({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color("#D94431"),
      new THREE.Color("#F59E0B"),
      new THREE.Color("#38BDF8"),
      new THREE.Color("#475569"),
    ];

    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

// Damped Cinematic Camera Rig
function CameraRig({ isHovered }: { isHovered: boolean }) {
  const { camera } = useThree();
  const targetCamZ = useRef(9.0);

  useEffect(() => {
    // Cinematic entrance dolly: from z=9 to z=5.6 over 1.6s
    const t = setTimeout(() => {
      targetCamZ.current = 5.6;
    }, 80);
    return () => clearTimeout(t);
  }, []);

  useFrame((state, delta) => {
    // Smooth cinematic dolly in
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ.current, 2.5, delta);

    // Damped pointer parallax (smooth yaw & pitch)
    const px = state.pointer.x * 0.75;
    const py = state.pointer.y * 0.5;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, px, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, py + 0.2, 3, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface EngineeringCoreSceneProps {
  onSelectDomain?: (slug: string) => void;
}

export function EngineeringCoreScene({ onSelectDomain }: EngineeringCoreSceneProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredCore, setHoveredCore] = useState(false);

  const satelliteNodes = [
    {
      id: "localflow",
      label: "LOCAL AI // ASR",
      sublabel: "NeMo & llama.cpp (CUDA)",
      position: [-2.4, 1.3, 0.4] as [number, number, number],
      color: "#F59E0B",
    },
    {
      id: "autostabi",
      label: "AVIONICS // 500Hz",
      sublabel: "ESP32 & MPU6500 IMU",
      position: [2.3, 1.1, -0.3] as [number, number, number],
      color: "#D94431",
    },
    {
      id: "wand-mouse",
      label: "BLE HID // OPTICAL",
      sublabel: "6-DOF Air Wand Sensor",
      position: [-1.9, -1.3, -0.5] as [number, number, number],
      color: "#38BDF8",
    },
    {
      id: "privaveda",
      label: "ODE SIMULATION",
      sublabel: "SciPy Radau & Bayesian",
      position: [2.0, -1.2, 0.6] as [number, number, number],
      color: "#10B981",
    },
    {
      id: "fpv-controller",
      label: "HARDWARE TIMING",
      sublabel: "Microsecond PPM Interrupts",
      position: [0.0, 2.2, -0.6] as [number, number, number],
      color: "#E05338",
    },
  ];

  const handleSatelliteClick = (slug: string) => {
    sounds.playModuleOpen();
    if (onSelectDomain) {
      onSelectDomain(slug);
    } else {
      const el = document.getElementById(slug) || document.getElementById("work");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      data-cursor="3d"
      className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] select-none rounded-2xl overflow-hidden bg-[#07080A] border border-[rgba(255,255,255,0.08)] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    >
      {/* HUD Telemetry Top Bar Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-[11px] font-mono pointer-events-none">
        <div className="flex items-center gap-2 bg-[#0D0F14]/90 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#D94431] animate-pulse" />
          <span className="text-[#F1F5F9] font-bold">THE ENGINEERING CORE</span>
          <span className="text-[#64748B]">{"//"}</span>
          <span className="text-[#F59E0B]">REALTIME 3D</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 bg-[#0D0F14]/90 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md text-[#94A3B8]">
          <span>NODE: {activeNode ? activeNode.toUpperCase() : "IDLE // QUENCHED"}</span>
          <span>•</span>
          <span className="text-[#10B981]">500Hz TELEMETRY</span>
        </div>
      </div>

      {/* R3F Canvas with Adaptive Quality & Safe Props */}
      <Canvas
        camera={{ position: [0, 1.2, 9.0], fov: 45 }}
        dpr={[1, 1.5]}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Lights & Atmosphere */}
        <ambientLight intensity={0.65} />
        <directionalLight position={[6, 8, 6]} intensity={1.8} color="#FFF8F0" />
        <pointLight position={[-5, -4, 4]} intensity={1.6} color="#D94431" />
        <pointLight position={[5, -3, -3]} intensity={1.2} color="#38BDF8" />
        <pointLight position={[0, 4, -2]} intensity={1.0} color="#F59E0B" />

        <CameraRig isHovered={hoveredCore || activeNode !== null} />

        {/* Float Wrap for Ambient Drift */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <group
            onPointerOver={() => setHoveredCore(true)}
            onPointerOut={() => setHoveredCore(false)}
          >
            <ReactorCore hovered={hoveredCore || activeNode !== null} />
            <StatorGimbals active={hoveredCore || activeNode !== null} />

            {/* 5 Domain Satellites */}
            {satelliteNodes.map((node) => (
              <DomainSatellite
                key={node.id}
                label={node.label}
                sublabel={node.sublabel}
                position={node.position}
                color={node.color}
                active={activeNode === node.id}
                onHover={(active) => {
                  if (active) sounds.playTargetLock();
                  setActiveNode(active ? node.id : null);
                }}
                onClick={() => handleSatelliteClick(node.id)}
              />
            ))}

            {/* Ambient telemetry points */}
            <TelemetryField count={180} />
          </group>
        </Float>
      </Canvas>

      {/* Bottom Micro-Interaction Cue */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[10px] font-mono text-[#64748B] pointer-events-none">
        <div className="bg-[#0D0F14]/90 px-2.5 py-1 rounded border border-white/5 backdrop-blur">
          POINTER PARALLAX ACTIVE • CLICK SATELLITES TO ENGAGE
        </div>
        <div className="hidden sm:block bg-[#0D0F14]/90 px-2.5 py-1 rounded border border-white/5 backdrop-blur text-[#F59E0B]">
          SYS // HARDWARE × SILICON × CODE
        </div>
      </div>
    </div>
  );
}
