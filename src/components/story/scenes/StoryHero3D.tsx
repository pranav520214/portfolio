"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StoryHero3DProps {
  progress: number;
}

export function StoryHero3D({ progress }: StoryHero3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load authentic portrait texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "/hero/hero-portrait.png",
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        setTexture(tex);
      },
      undefined,
      (err) => {
        console.warn("Portrait texture load error:", err);
      }
    );
  }, []);

  // Blueprint coordinate frame & telemetry crosshairs (Scaled large: 4.8w x 6.2h)
  const [gridGeo, gridMat] = useMemo(() => {
    const lines: number[] = [];
    const w = 4.8;
    const h = 6.4;
    const z = 0.05;

    // Outer rectangle
    lines.push(-w / 2, -h / 2, z, w / 2, -h / 2, z);
    lines.push(w / 2, -h / 2, z, w / 2, h / 2, z);
    lines.push(w / 2, h / 2, z, -w / 2, h / 2, z);
    lines.push(-w / 2, h / 2, z, -w / 2, -h / 2, z);

    // Corner brackets
    const cLen = 0.6;
    lines.push(-w / 2, h / 2 + 0.3, z, -w / 2 + cLen, h / 2 + 0.3, z);
    lines.push(-w / 2 - 0.3, h / 2, z, -w / 2 - 0.3, h / 2 - cLen, z);

    lines.push(w / 2, h / 2 + 0.3, z, w / 2 - cLen, h / 2 + 0.3, z);
    lines.push(w / 2 + 0.3, h / 2, z, w / 2 + 0.3, h / 2 - cLen, z);

    // Crosshair ticks
    lines.push(-0.5, 0, z, 0.5, 0, z);
    lines.push(0, -0.5, z, 0, 0.5, z);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#FF6A2A"),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  // Floating telemetry particles
  const [auraGeo, auraMat] = useMemo(() => {
    const count = 240;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = 2.4 + Math.random() * 2.0;
      positions[idx] = Math.cos(angle) * r;
      positions[idx + 1] = Math.sin(angle) * r * 1.3;
      positions[idx + 2] = (Math.random() - 0.5) * 1.2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color("#FFC84A"),
      size: 0.09,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Active range: [0.14, 0.32]
    // Starts appearing inside portal aperture window before crossing!
    let opacity = 0;
    let fragmentZ = 0;

    if (progress >= 0.12 && progress < 0.18) {
      // Visible through the portal aperture!
      opacity = 0.4 + ((progress - 0.12) / 0.06) * 0.6;
    } else if (progress >= 0.18 && progress <= 0.26) {
      opacity = 1.0;
    } else if (progress > 0.26 && progress <= 0.32) {
      const pFrag = (progress - 0.26) / 0.06;
      opacity = 1.0 - pFrag;
      fragmentZ = pFrag * 4.5; // Geometry fragments forward toward camera
    }

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity * 0.96;
    }
    gridMat.opacity = opacity * 0.85;
    auraMat.opacity = opacity * 0.7;

    groupRef.current.position.z = -10 + fragmentZ;
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Warm volumetric lighting on portrait */}
      <pointLight position={[2, 3, 3]} color="#FF9933" intensity={1.5} distance={15} />
      <pointLight position={[-3, -2, 2]} color="#43D8FF" intensity={0.9} distance={12} />

      {/* Authentic Portrait Quad (Cinematic Scale: 4.4 x 5.8) */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[4.4, 5.8]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Blueprint lines & crosshairs */}
      <lineSegments geometry={gridGeo} material={gridMat} />

      {/* Floating telemetry particles */}
      <points geometry={auraGeo} material={auraMat} />
    </group>
  );
}
