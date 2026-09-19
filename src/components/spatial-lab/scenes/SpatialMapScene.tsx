"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MAP_NODES, MapNodeDef } from "../types";
import { sounds } from "@/components/audio/SoundSystem";

interface SpatialMapSceneProps {
  active: boolean;
  onSelectEngineering: () => void;
  isTraveling: boolean;
}

export function SpatialMapScene({
  active,
  onSelectEngineering,
  isTraveling,
}: SpatialMapSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pulsesRef = useRef<THREE.Points>(null);

  // 1. Spline routes between major destinations
  const [routeGeo, routeMat] = useMemo(() => {
    const lines: number[] = [];
    const nodeMap = new Map(MAP_NODES.map((n) => [n.id, n.pos]));

    const edges = [
      ["identity", "engineering"],
      ["engineering", "research"],
      ["engineering", "privantrix"],
      ["privantrix", "vision"],
      ["vision", "contact"],
    ];

    edges.forEach(([fromId, toId]) => {
      const pA = nodeMap.get(fromId);
      const pB = nodeMap.get(toId);
      if (pA && pB) {
        lines.push(pA[0], pA[1], pA[2], pB[0], pB[1], pB[2]);
      }
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#38BDF8"),
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  // 2. Traveling photon pulses along routes
  const PULSE_COUNT = 60;
  const [pulseGeo, pulseMat] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(PULSE_COUNT * 3);
    const colors = new Float32Array(PULSE_COUNT * 3);

    for (let i = 0; i < PULSE_COUNT; i++) {
      const idx = i * 3;
      positions[idx] = -4.5 + (i / PULSE_COUNT) * 4.5;
      positions[idx + 1] = 2.5 - (i / PULSE_COUNT) * 2.5;
      positions[idx + 2] = 0;

      colors[idx] = 1.0;
      colors[idx + 1] = 0.8;
      colors[idx + 2] = 0.3;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.24,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Pulse animation along the active route
    if (pulsesRef.current) {
      const attr = pulsesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PULSE_COUNT; i++) {
        const offset = (i / PULSE_COUNT + t * 0.4) % 1.0;
        // Travel from Identity (-4.5, 2.5, 0) to Engineering (0, 0, 0)
        const curX = -4.5 + offset * 4.5;
        const curY = 2.5 - offset * 2.5;
        const curZ = Math.sin(offset * Math.PI) * 0.5;
        attr.setXYZ(i, curX, curY, curZ);
      }
      attr.needsUpdate = true;
    }

    // Gentle global map sway
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.04;
    groupRef.current.rotation.x = Math.cos(t * 0.12) * 0.02;
  });

  if (!active && !isTraveling) return null;

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      {/* Route Lines */}
      <lineSegments geometry={routeGeo} material={routeMat} />

      {/* Traveling Energy Pulses */}
      <points ref={pulsesRef} geometry={pulseGeo} material={pulseMat} />

      {/* 6 Destination Nodes */}
      {MAP_NODES.map((node) => {
        const isEng = node.id === "engineering";

        return (
          <group
            key={node.id}
            position={node.pos}
            onClick={(e) => {
              e.stopPropagation();
              if (isEng) {
                sounds.playTargetLock();
                onSelectEngineering();
              } else {
                sounds.playClick();
              }
            }}
          >
            {/* Outer Ring */}
            <mesh>
              <ringGeometry args={[isEng ? 0.75 : 0.45, isEng ? 0.88 : 0.55, 32]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isEng ? 0.95 : 0.7}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Inner Core */}
            <mesh>
              <sphereGeometry args={[isEng ? 0.42 : 0.28, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isEng ? 1.2 : 0.6}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Pulsing Beacon Ring for Engineering */}
            {isEng && (
              <mesh>
                <ringGeometry args={[1.0, 1.12, 32]} />
                <meshBasicMaterial
                  color="#FF6A2A"
                  transparent
                  opacity={0.85}
                  side={THREE.DoubleSide}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
