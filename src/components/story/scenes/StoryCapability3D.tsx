"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sounds } from "../../audio/SoundSystem";

interface StoryCapability3DProps {
  progress: number;
  activeDomain: string | null;
  onSelectDomain: (id: string | null) => void;
}

const DOMAIN_MODULES = [
  { id: "ai", title: "AI & STREAMING ASR", color: "#FFC84A", angle: 0, tag: "C++ / CUDA" },
  { id: "embedded", title: "EMBEDDED SILICON", color: "#FF6A2A", angle: (Math.PI * 2 * 1) / 5, tag: "FreeRTOS" },
  { id: "avionics", title: "AVIONICS & AERO", color: "#43D8FF", angle: (Math.PI * 2 * 2) / 5, tag: "500Hz PID" },
  { id: "physics", title: "STIFF NUMERICS", color: "#8D72FF", angle: (Math.PI * 2 * 3) / 5, tag: "RADAU IIA" },
  { id: "systems", title: "SYSTEMS & TOOLING", color: "#10B981", angle: (Math.PI * 2 * 4) / 5, tag: "DMA / BLE" },
];

export function StoryCapability3D({ progress, activeDomain, onSelectDomain }: StoryCapability3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const irisRef = useRef<THREE.Group>(null);

  // Active range: [0.52, 0.72]
  const [opacity, irisDilation] = useMemo(() => {
    let op = 0;
    let dilation = 0;

    if (progress >= 0.52 && progress < 0.58) {
      op = (progress - 0.52) / 0.06;
    } else if (progress >= 0.58 && progress <= 0.66) {
      op = 1.0;
    } else if (progress > 0.66 && progress <= 0.72) {
      const pExit = (progress - 0.66) / 0.06;
      op = 1.0 - pExit * 0.4;
      dilation = pExit; // Machine expands open to let camera inside
    }

    return [op, dilation];
  }, [progress]);

  // Heavy mechanical connecting bus conduits
  const [conduitGeo, conduitMat] = useMemo(() => {
    const lines: number[] = [];
    DOMAIN_MODULES.forEach((d) => {
      const sx = Math.cos(d.angle) * 4.6;
      const sy = Math.sin(d.angle) * 4.6;
      // Stator perimeter anchor to satellite
      const px = Math.cos(d.angle) * 2.8;
      const py = Math.sin(d.angle) * 2.8;
      lines.push(px, py, 0, sx, sy, 0);
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#43D8FF"),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Counter-rotating concentric mechanical plates
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.35;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.55;
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.4;
      ring3Ref.current.rotation.y = t * 0.25;
    }

    if (irisRef.current) {
      const s = 1.0 + irisDilation * 3.5;
      irisRef.current.scale.set(s, s, 1.0);
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 0, -56]}>
      {/* Internal Core Machine Lighting */}
      <pointLight position={[0, 0, 0]} color="#FF6A2A" intensity={2.5} distance={18} />
      <pointLight position={[0, 0, 4]} color="#38BDF8" intensity={1.5} distance={15} />

      {/* ========================================================================= */}
      {/* CENTRAL MACHINE: MULTIPLE CONCENTRIC MECHANICAL RINGS */}
      {/* ========================================================================= */}

      {/* Ring 1: Outer Stator Gear Ring (Radius 2.8) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.8, 0.16, 16, 48]} />
        <meshStandardMaterial
          color="#1E293B"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={opacity * (1.0 - irisDilation * 0.6)}
        />
      </mesh>

      {/* Ring 2: Middle Rotor Plate (Radius 2.1) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.1, 0.12, 16, 36]} />
        <meshStandardMaterial
          color="#D97706"
          metalness={0.85}
          roughness={0.25}
          emissive="#78350F"
          emissiveIntensity={0.5}
          transparent
          opacity={opacity * (1.0 - irisDilation * 0.6)}
        />
      </mesh>

      {/* Ring 3: Inner Gimbal Ring (Radius 1.4) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.4, 0.09, 16, 32]} />
        <meshStandardMaterial
          color="#38BDF8"
          metalness={0.95}
          roughness={0.1}
          emissive="#0284C7"
          emissiveIntensity={0.8}
          transparent
          opacity={opacity * (1.0 - irisDilation * 0.6)}
        />
      </mesh>

      {/* Central Glowing Plasma Core Sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color="#FF9933"
          transparent
          opacity={opacity * (1.0 - irisDilation * 0.8)}
        />
      </mesh>

      {/* Expanding Iris Aperture Petals */}
      <group ref={irisRef}>
        <mesh>
          <ringGeometry args={[2.85, 3.15, 36]} />
          <meshBasicMaterial
            color="#FFC84A"
            transparent
            opacity={opacity * 0.8}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* High-voltage Power Conduits to Satellites */}
      <lineSegments geometry={conduitGeo} material={conduitMat} />

      {/* ========================================================================= */}
      {/* 5 ENGINEERED SATELLITE PODS (Physical geometric modules, not bubbles!) */}
      {/* ========================================================================= */}
      {DOMAIN_MODULES.map((domain) => {
        const sx = Math.cos(domain.angle) * (4.6 + irisDilation * 2.2);
        const sy = Math.sin(domain.angle) * (4.6 + irisDilation * 2.2);
        const isSelected = activeDomain === domain.id;

        return (
          <group
            key={domain.id}
            position={[sx, sy, 0]}
            onClick={(e) => {
              e.stopPropagation();
              sounds.playClick();
              onSelectDomain(isSelected ? null : domain.id);
            }}
          >
            {/* Hexagonal Satellite Chassis */}
            <mesh rotation={[0, 0, domain.angle]}>
              <cylinderGeometry args={[0.75, 0.75, 0.35, 6]} />
              <meshStandardMaterial
                color="#0F172A"
                metalness={0.85}
                roughness={0.25}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Glowing Core Emitter */}
            <mesh position={[0, 0, 0.19]}>
              <cylinderGeometry args={[0.5, 0.5, 0.08, 6]} />
              <meshStandardMaterial
                color={domain.color}
                emissive={domain.color}
                emissiveIntensity={isSelected ? 1.4 : 0.6}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Accent Ring */}
            <mesh position={[0, 0, 0.24]}>
              <ringGeometry args={[0.55, 0.65, 6]} />
              <meshBasicMaterial
                color="#FFFFFF"
                transparent
                opacity={opacity * 0.75}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
