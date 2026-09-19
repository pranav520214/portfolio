"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StoryPhilosophy3DProps {
  progress: number;
}

// 5 Cinematic Words Staggered in Depth along Z
const WORD_SLABS = [
  { text: "BUILD.", x: -2.8, y: 1.2, z: -14, color: "#FFC84A", scale: 4.5 },
  { text: "TEST.", x: 2.6, y: -0.6, z: -18, color: "#FF9933", scale: 4.5 },
  { text: "FAIL.", x: -2.2, y: -0.8, z: -22, color: "#EF4444", scale: 4.8, fractured: true },
  { text: "MEASURE.", x: 2.4, y: 1.0, z: -26, color: "#43D8FF", scale: 5.2, measurement: true },
  { text: "REBUILD.", x: 0.0, y: 0.0, z: -30, color: "#10B981", scale: 6.0, terminal: true },
];

export function StoryPhilosophy3D({ progress }: StoryPhilosophy3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const terminalGatewayRef = useRef<THREE.Mesh>(null);

  // Generate crisp high-resolution canvas textures for each giant word
  const wordTextures = useMemo(() => {
    return WORD_SLABS.map((w) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 320;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, 1024, 320);
        ctx.font = "900 130px monospace, sans-serif";
        ctx.fillStyle = w.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = w.color;
        ctx.shadowBlur = 24;
        ctx.fillText(w.text, 512, 160);

        // Technical caliper ticks for MEASURE
        if (w.measurement) {
          ctx.strokeStyle = "#43D8FF";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(120, 260);
          ctx.lineTo(904, 260);
          for (let i = 120; i <= 904; i += 40) {
            ctx.moveTo(i, 260);
            ctx.lineTo(i, i % 120 === 0 ? 230 : 245);
          }
          ctx.stroke();
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    });
  }, []);

  // Threading energy conduit connecting all words in 3D
  const [conduitGeo, conduitMat] = useMemo(() => {
    const points: THREE.Vector3[] = WORD_SLABS.map(
      (w) => new THREE.Vector3(w.x, w.y, w.z)
    );
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.06, 8, false);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF6A2A"),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    return [tubeGeo, mat];
  }, []);

  // Fractured particles around FAIL
  const [fractureGeo, fractureMat] = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      positions[idx] = -2.2 + (Math.random() - 0.5) * 3.5;
      positions[idx + 1] = -0.8 + (Math.random() - 0.5) * 2.0;
      positions[idx + 2] = -22 + (Math.random() - 0.5) * 2.0;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color("#EF4444"),
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Active range: [0.24, 0.40]
    let alpha = 0;
    let gatewayExpansion = 1.0;

    if (progress >= 0.24 && progress < 0.28) {
      alpha = (progress - 0.24) / 0.04;
    } else if (progress >= 0.28 && progress <= 0.36) {
      alpha = 1.0;
    } else if (progress > 0.36 && progress <= 0.40) {
      const pExit = (progress - 0.36) / 0.04;
      alpha = 1.0 - pExit * 0.7;
      gatewayExpansion = 1.0 + pExit * 8.0; // Terminal REBUILD ring expands into project orbit plane!
    }

    conduitMat.opacity = alpha * 0.85;
    fractureMat.opacity = alpha * 0.8;

    if (terminalGatewayRef.current) {
      terminalGatewayRef.current.scale.set(gatewayExpansion, gatewayExpansion, gatewayExpansion);
      terminalGatewayRef.current.rotation.z = t * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Threading energy tube */}
      <mesh geometry={conduitGeo} material={conduitMat} />

      {/* Fractured particles around FAIL */}
      <points geometry={fractureGeo} material={fractureMat} />

      {/* Giant 3D Typographic Monoliths */}
      {WORD_SLABS.map((w, idx) => {
        return (
          <group key={w.text} position={[w.x, w.y, w.z]}>
            {/* Massive word billboard (Scale 4.5 to 6.0 units wide!) */}
            <mesh>
              <planeGeometry args={[w.scale, w.scale * 0.32]} />
              <meshBasicMaterial
                map={wordTextures[idx]}
                transparent
                opacity={0.95}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>

            {/* Backing blueprint frame */}
            <mesh position={[0, 0, -0.05]}>
              <planeGeometry args={[w.scale * 1.05, w.scale * 0.36]} />
              <meshBasicMaterial
                color="#070C15"
                transparent
                opacity={0.7}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}

      {/* Terminal Gateway Node (Expands into Project Universe orbital plane) */}
      <mesh ref={terminalGatewayRef} position={[0, 0, -30]}>
        <ringGeometry args={[1.2, 1.45, 48]} />
        <meshBasicMaterial
          color="#10B981"
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
