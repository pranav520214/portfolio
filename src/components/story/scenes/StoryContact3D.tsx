"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StoryContact3DProps {
  progress: number;
}

export function StoryContact3D({ progress }: StoryContact3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // Active range: [0.93, 1.00]
  const opacity = useMemo(() => {
    if (progress < 0.93) return 0;
    return Math.min(1.0, (progress - 0.93) / 0.04);
  }, [progress]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Expanding radio wave rings from single beacon
    const wave1 = (t * 0.6) % 1.0;
    const wave2 = (t * 0.6 + 0.33) % 1.0;
    const wave3 = (t * 0.6 + 0.66) % 1.0;

    if (ring1Ref.current) {
      ring1Ref.current.scale.set(1 + wave1 * 4, 1 + wave1 * 4, 1);
      const mat = ring1Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity * (1 - wave1) * 0.7;
    }
    if (ring2Ref.current) {
      ring2Ref.current.scale.set(1 + wave2 * 4, 1 + wave2 * 4, 1);
      const mat = ring2Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity * (1 - wave2) * 0.7;
    }
    if (ring3Ref.current) {
      ring3Ref.current.scale.set(1 + wave3 * 4, 1 + wave3 * 4, 1);
      const mat = ring3Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity * (1 - wave3) * 0.7;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 0, -175]}>
      {/* Central Signal Beacon */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color="#FF6A2A"
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Expanding Spherical Radio Wave Rings */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[0.4, 0.46, 32]} />
        <meshBasicMaterial
          color="#FFC84A"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={ring2Ref}>
        <ringGeometry args={[0.4, 0.46, 32]} />
        <meshBasicMaterial
          color="#FF9933"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={ring3Ref}>
        <ringGeometry args={[0.4, 0.46, 32]} />
        <meshBasicMaterial
          color="#FF6A2A"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
