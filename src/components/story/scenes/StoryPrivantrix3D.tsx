"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StoryPrivantrix3DProps {
  progress: number;
}

export function StoryPrivantrix3D({ progress }: StoryPrivantrix3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const vehicleRef = useRef<THREE.Group>(null);

  // Active range: [0.78, 0.90]
  const [opacity, branchMorph] = useMemo(() => {
    let op = 0;
    let morph = 0;

    if (progress >= 0.78 && progress < 0.82) {
      op = (progress - 0.78) / 0.04;
    } else if (progress >= 0.82 && progress <= 0.86) {
      op = 1.0;
    } else if (progress > 0.86 && progress <= 0.90) {
      const pExit = (progress - 0.86) / 0.04;
      op = 1.0 - pExit * 0.3;
      morph = pExit;
    }

    return [op, morph];
  }, [progress]);

  // Giant spatial trajectory 3D curve (Scale: Sweeps across the entire viewport!)
  const [trajGeo, trajMat] = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const count = 60;
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      // Sweeping S-curve across space
      const x = -6.0 + Math.sin(t * Math.PI * 1.2) * 14.0;
      const y = -2.0 + Math.pow(t, 1.8) * 32.0; // Gravity-turn climb
      const z = -80.0 - t * 35.0;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 80, 0.16, 8, false);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF6A2A"),
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    return [tubeGeo, mat];
  }, []);

  // Large delta-wing hypersonic vehicle wireframe (Wingspan 3.6 units!)
  const [deltaGeo, deltaMat] = useMemo(() => {
    const lines: number[] = [];
    // Nose to left wingtip
    lines.push(0, 0, 2.4, -2.2, 0, -1.6);
    // Left wingtip to trailing edge center
    lines.push(-2.2, 0, -1.6, 0, 0, -0.8);
    // Trailing edge center to right wingtip
    lines.push(0, 0, -0.8, 2.2, 0, -1.6);
    // Right wingtip to nose
    lines.push(2.2, 0, -1.6, 0, 0, 2.4);
    // Vertical dorsal fin
    lines.push(0, 0, -0.8, 0, 1.2, -1.6);
    lines.push(0, 1.2, -1.6, 0, 0, 0.8);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#FFFFFF"),
      transparent: true,
      opacity: 0.95,
    });
    return [geo, mat];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (vehicleRef.current) {
      // Vehicle position sweeps smoothly along trajectory
      const flightP = (t * 0.18 + (progress - 0.78) * 3.5) % 1.0;
      const curX = -6.0 + Math.sin(flightP * Math.PI * 1.2) * 14.0;
      const curY = -2.0 + Math.pow(flightP, 1.8) * 32.0;
      const curZ = -80.0 - flightP * 35.0;

      vehicleRef.current.position.set(curX, curY, curZ);
      vehicleRef.current.rotation.x = -Math.PI * 0.32; // Pitched up for climb
      vehicleRef.current.rotation.y = Math.sin(flightP * Math.PI * 1.2) * 0.4;
      vehicleRef.current.rotation.z = Math.sin(t * 1.8) * 0.15; // Dynamic aerodynamic roll
    }

    trajMat.opacity = opacity * 0.9;
    deltaMat.opacity = opacity * 0.95;
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef}>
      {/* Sweeping ascent trajectory tube */}
      <mesh geometry={trajGeo} material={trajMat} />

      {/* Large Hypersonic Delta Vehicle */}
      <group ref={vehicleRef}>
        <lineSegments geometry={deltaGeo} material={deltaMat} />
        {/* Supersonic shockwave plasma cone */}
        <mesh position={[0, -0.2, -1.6]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.8, 3.2, 16]} />
          <meshBasicMaterial
            color="#FF6A2A"
            transparent
            opacity={0.7 * opacity}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}
