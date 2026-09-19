"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StoryVision3DProps {
  progress: number;
}

const VISION_NODES = [
  { id: "ai", title: "LOCAL STREAMING AI", pos: [-4.8, 13.0, -140], color: "#FFC84A" },
  { id: "avionics", title: "AUTONOMOUS FLIGHT", pos: [0.0, 16.5, -142], color: "#FF6A2A" },
  { id: "embedded", title: "SILICON & REAL-TIME", pos: [5.0, 13.5, -138], color: "#43D8FF" },
  { id: "physics", title: "STIFF DYNAMICS", pos: [-3.2, 7.5, -144], color: "#8D72FF" },
  { id: "aerospace", title: "ORBITAL COMPUTATION", pos: [3.8, 7.8, -143], color: "#10B981" },
];

export function StoryVision3D({ progress }: StoryVision3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Active range: [0.86, 0.96]
  // 0.86 - 0.90: Forms from branching Privantrix trajectories
  // 0.90 - 0.94: Full research constellation
  // 0.94 - 0.98: Contracts and fades into darkness, leaving single signal point
  const [opacity, contractMorph] = useMemo(() => {
    let op = 0;
    let morph = 0;

    if (progress >= 0.86 && progress < 0.90) {
      op = (progress - 0.86) / 0.04;
    } else if (progress >= 0.90 && progress <= 0.94) {
      op = 1.0;
    } else if (progress > 0.94 && progress <= 0.98) {
      const pExit = (progress - 0.94) / 0.04;
      op = 1.0 - pExit;
      morph = pExit; // Collapses toward single point at (0, 0, -170)
    }

    return [op, morph];
  }, [progress]);

  // Interconnected graph network lines
  const [lineGeo, lineMat] = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < VISION_NODES.length; i++) {
      for (let j = i + 1; j < VISION_NODES.length; j++) {
        const pA = VISION_NODES[i].pos;
        const pB = VISION_NODES[j].pos;
        lines.push(pA[0], pA[1], pA[2], pB[0], pB[1], pB[2]);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#38BDF8"),
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.08;
    lineMat.opacity = opacity * 0.5 * (1.0 - contractMorph);
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef}>
      {/* Network Lines */}
      <lineSegments geometry={lineGeo} material={lineMat} />

      {/* Research Nodes */}
      {VISION_NODES.map((node) => {
        // Contract toward (0, 0, -170) during transition to Contact
        const posX = THREE.MathUtils.lerp(node.pos[0], 0, contractMorph);
        const posY = THREE.MathUtils.lerp(node.pos[1], 0, contractMorph);
        const posZ = THREE.MathUtils.lerp(node.pos[2], -170, contractMorph);

        return (
          <group key={node.id} position={[posX, posY, posZ]}>
            <mesh>
              <sphereGeometry args={[0.45, 24, 24]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.8}
                transparent
                opacity={opacity}
              />
            </mesh>
            <mesh>
              <ringGeometry args={[0.55, 0.65, 24]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={opacity * 0.75}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
