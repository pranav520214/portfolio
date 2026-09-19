"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STREET_PROJECTS, StreetProjectDef } from "../types";
import { sounds } from "@/components/audio/SoundSystem";

interface EngineeringStreetSceneProps {
  active: boolean;
  lightStreamProgress: number; // 0.0 to 1.0 (light surging down avenue)
  cameraZ: number;
  selectedProject: StreetProjectDef | null;
  onSelectProject: (proj: StreetProjectDef | null) => void;
  onExitStreet: () => void;
}

export function EngineeringStreetScene({
  active,
  lightStreamProgress,
  cameraZ,
  selectedProject,
  onSelectProject,
  onExitStreet,
}: EngineeringStreetSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightShaftsRef = useRef<THREE.Group>(null);
  const streetParticlesRef = useRef<THREE.Points>(null);

  // 1. Long Reflective Graphite Roadway (Z: 0 to -75, Y: -1.8)
  const [roadGeo, roadMat] = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 80);
    const mat = new THREE.MeshStandardMaterial({
      color: "#080D16",
      roughness: 0.15,
      metalness: 0.85,
    });
    return [geo, mat];
  }, []);

  // 2. Roadway Centerline & Guide Rails (LineSegments)
  const [railGeo, railMat] = useMemo(() => {
    const lines: number[] = [];
    // Left edge rail
    lines.push(-4.5, -1.75, 2, -4.5, -1.75, -75);
    // Right edge rail
    lines.push(4.5, -1.75, 2, 4.5, -1.75, -75);
    // Glowing dashed centerline
    for (let z = 0; z > -75; z -= 3.5) {
      lines.push(0, -1.75, z, 0, -1.75, z - 2.0);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#FF9933"),
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  // 3. Hero Volumetric Light Shafts (Stream from portal at Z = 0 down the avenue)
  const [shaftsGeo, shaftsMat] = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.8, 6.5, 75, 16, 1, true);
    geo.rotateX(Math.PI / 2);
    geo.translate(0, 1.5, -37.5);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#FF8811"),
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return [geo, mat];
  }, []);

  // 4. Streaming Light Particles down the avenue
  const LIGHT_PARTICLE_COUNT = 450;
  const [streamPartGeo, streamPartMat] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(LIGHT_PARTICLE_COUNT * 3);
    for (let i = 0; i < LIGHT_PARTICLE_COUNT; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 8.0;
      positions[idx + 1] = -1.2 + Math.random() * 4.5;
      positions[idx + 2] = -Math.random() * 75.0;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color("#FFC84A"),
      size: 0.18,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  // 5. Dynamic Canvas Textures for the 3 Projects
  const projectTextures = useMemo(() => {
    return STREET_PROJECTS.map((proj) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#0A101D";
        ctx.fillRect(0, 0, 512, 512);

        if (proj.slug === "localflow") {
          // Audio FFT Spectrum
          ctx.strokeStyle = "#FFC84A";
          ctx.lineWidth = 4;
          for (let i = 0; i < 24; i++) {
            const h = 40 + Math.sin(i * 0.6) * 120 + 80;
            ctx.strokeRect(60 + i * 16, 320 - h, 10, h);
          }
        } else if (proj.slug === "autostabi") {
          // Attitude Horizon & Aircraft Delta
          ctx.strokeStyle = "#FF6A2A";
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(80, 256);
          ctx.lineTo(432, 256);
          ctx.stroke();

          ctx.strokeStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.moveTo(256, 200);
          ctx.lineTo(200, 280);
          ctx.lineTo(256, 260);
          ctx.lineTo(312, 280);
          ctx.closePath();
          ctx.stroke();
        } else {
          // 6-DOF Quaternion Axes
          ctx.strokeStyle = "#43D8FF";
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(256, 256, 140, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(256, 256);
          ctx.lineTo(370, 256);
          ctx.moveTo(256, 256);
          ctx.lineTo(256, 140);
          ctx.stroke();
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 34px monospace";
        ctx.textAlign = "center";
        ctx.fillText(proj.title.toUpperCase(), 256, 420);

        ctx.fillStyle = proj.color;
        ctx.font = "20px monospace";
        ctx.fillText(proj.badge, 256, 460);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Animate streaming particles racing away from portal down the street
    if (streetParticlesRef.current) {
      const attr = streetParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < LIGHT_PARTICLE_COUNT; i++) {
        let z = attr.getZ(i);
        z -= (18.0 + (i % 5) * 4.0) * 0.016; // Velocity toward -Z
        if (z < -75) z = 0;
        attr.setZ(i, z);
      }
      attr.needsUpdate = true;
    }

    // Light stream expansion along the avenue
    shaftsMat.opacity = 0.32 * Math.min(1.0, lightStreamProgress * 1.5);
    railMat.opacity = 0.5 + Math.sin(t * 2.0) * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Portal Light Source Streaming into the Avenue */}
      <pointLight position={[0, 1.8, 1]} color="#FF9933" intensity={3.5} distance={35} />
      <directionalLight position={[0, 8, 5]} color="#FF8811" intensity={1.8} />

      {/* Reflective Graphite Roadway */}
      <mesh
        geometry={roadGeo}
        material={roadMat}
        position={[0, -1.8, -37.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />

      {/* Roadway Edge Rails & Centerline */}
      <lineSegments geometry={railGeo} material={railMat} />

      {/* Hero Volumetric Light Shafts */}
      <group ref={lightShaftsRef}>
        <mesh geometry={shaftsGeo} material={shaftsMat} />
      </group>

      {/* Streaming Light Particles */}
      <points ref={streetParticlesRef} geometry={streamPartGeo} material={streamPartMat} />

      {/* ========================================================================= */}
      {/* 3 PHYSICAL FLAGSHIP PROJECT INSTALLATIONS */}
      {/* ========================================================================= */}
      {STREET_PROJECTS.map((proj, idx) => {
        const isSelected = selectedProject?.slug === proj.slug;
        const [x, y, z] = proj.pos;

        // Sequential illumination: reaches project when lightStreamProgress exceeds its distance ratio
        const distRatio = Math.abs(z) / 75.0;
        const isIlluminated = lightStreamProgress >= distRatio * 0.7;

        return (
          <group
            key={proj.slug}
            position={[x, y, z]}
            onClick={(e) => {
              e.stopPropagation();
              sounds.playClick();
              onSelectProject(isSelected ? null : proj);
            }}
          >
            {/* If Selected: 3D Physical Spatial Layer Separation */}
            {isSelected ? (
              <group position={[x > 0 ? -1.8 : 1.8, 0, 0]}>
                {proj.layers.map((layer) => (
                  <group key={layer.name} position={[0, 0, layer.zOffset]}>
                    <mesh>
                      <cylinderGeometry args={[1.75, 1.75, 0.14, 32]} />
                      <meshStandardMaterial
                        color={layer.color}
                        metalness={0.85}
                        roughness={0.25}
                        transparent
                        opacity={0.95}
                      />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                      <ringGeometry args={[1.78, 1.86, 32]} />
                      <meshBasicMaterial
                        color="#FFFFFF"
                        transparent
                        opacity={0.8}
                        side={THREE.DoubleSide}
                      />
                    </mesh>
                  </group>
                ))}
                {/* Center Display Quad */}
                <mesh position={[0, 0, 1.4]}>
                  <planeGeometry args={[2.2, 2.2]} />
                  <meshBasicMaterial map={projectTextures[idx]} side={THREE.DoubleSide} toneMapped={false} />
                </mesh>
              </group>
            ) : (
              /* Normal Standing Installation */
              <group rotation={[0, x < 0 ? 0.35 : -0.35, 0]}>
                {/* Heavy Titanium Monolith Chassis */}
                <mesh>
                  <boxGeometry args={[3.2, 4.4, 0.45]} />
                  <meshStandardMaterial
                    color="#0F172A"
                    metalness={0.9}
                    roughness={0.2}
                  />
                </mesh>

                {/* Glowing Bezel Rim (Illuminates when light reaches it) */}
                <mesh position={[0, 0, 0.24]}>
                  <ringGeometry args={[1.5, 1.62, 4]} />
                  <meshBasicMaterial
                    color={proj.color}
                    transparent
                    opacity={isIlluminated ? 0.95 : 0.15}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                {/* Recessed Dynamic Display Surface */}
                <mesh position={[0, 0, 0.25]}>
                  <planeGeometry args={[2.8, 3.8]} />
                  <meshBasicMaterial
                    map={projectTextures[idx]}
                    transparent
                    opacity={isIlluminated ? 0.95 : 0.2}
                    toneMapped={false}
                  />
                </mesh>

                {/* Base Mounting Pedestal */}
                <mesh position={[0, -2.4, 0]}>
                  <cylinderGeometry args={[1.8, 2.1, 0.6, 24]} />
                  <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
                </mesh>
              </group>
            )}
          </group>
        );
      })}

      {/* ========================================================================= */}
      {/* STREET EXIT ARCHWAY (Z = -72 — Arches upward returning to Master Map) */}
      {/* ========================================================================= */}
      <group
        position={[0, 0, -72]}
        onClick={(e) => {
          e.stopPropagation();
          sounds.playTargetLock();
          onExitStreet();
        }}
      >
        <mesh position={[0, 3, 0]}>
          <torusGeometry args={[4.2, 0.18, 16, 48, Math.PI]} />
          <meshBasicMaterial
            color="#FF6A2A"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[0, 2.5, 0]}>
          <ringGeometry args={[3.8, 4.1, 32]} />
          <meshBasicMaterial
            color="#38BDF8"
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}
