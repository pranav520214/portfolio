"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SpatialState, StreetProjectDef } from "./types";
import { SpatialMapScene } from "./scenes/SpatialMapScene";
import { SpatialPortalVortex } from "./scenes/SpatialPortalVortex";
import { EngineeringStreetScene } from "./scenes/EngineeringStreetScene";
import { SpatialLabHUD } from "./ui/SpatialLabHUD";
import { SpatialLabDossier } from "./ui/SpatialLabDossier";
import { sounds } from "@/components/audio/SoundSystem";

// =============================================================================
// CAMERA RIG FOR SPATIAL LAB DIRECTOR
// =============================================================================
interface LabCameraRigProps {
  state: SpatialState;
  streetZ: number;
  pointer: { x: number; y: number };
}

function LabCameraRig({ state, streetZ, pointer }: LabCameraRigProps) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 2.5, 7.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, -4));

  useFrame((_, delta) => {
    let targetPos = new THREE.Vector3(0, 2.5, 7.5);
    let targetLookAt = new THREE.Vector3(0, 0, -4);

    if (state === "MAP") {
      targetPos.set(pointer.x * 0.4, 2.5 - pointer.y * 0.3, 7.5);
      targetLookAt.set(0, 0, -4);
    } else if (state === "TRAVEL_ENGINEERING") {
      targetPos.set(0, 0.8, 3.8);
      targetLookAt.set(0, 0, 0);
    } else if (state === "ENGINEERING_PORTAL") {
      // Approach aperture threshold
      targetPos.set(0, 0.4, 2.2);
      targetLookAt.set(0, 0, -10);
    } else if (state === "ENTER_STREET" || state === "ENGINEERING_STREET") {
      // Moving down the avenue
      targetPos.set(pointer.x * 0.3, 0.2 - pointer.y * 0.2, streetZ);
      targetLookAt.set(0, 0.2, streetZ - 12);
    } else if (state === "PROJECT_INSPECT") {
      // Focused on selected project installation
      targetPos.set(0, 0.4, streetZ + 4.2);
      targetLookAt.set(0, 0.4, streetZ);
    }

    const damp = Math.min(1.0, delta * 4.8);
    currentPos.current.lerp(targetPos, damp);
    currentLookAt.current.lerp(targetLookAt, damp);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// =============================================================================
// SPATIAL LAB DIRECTOR COMPONENT
// =============================================================================
export function SpatialLabDirector() {
  const [state, setState] = useState<SpatialState>("MAP");
  const [portalProgress, setPortalProgress] = useState(0);
  const [lightStreamProgress, setLightStreamProgress] = useState(0);

  // Virtual scroll progress along the avenue (0 to 1 -> maps to Z: 0 to -70)
  const [streetProgress, setStreetProgress] = useState(0);
  const [targetStreetProgress, setTargetStreetProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<StreetProjectDef | null>(null);

  // Pointer parallax coordinates
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  // Handle pointer tracking
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer({ x, y });
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  // Handle wheel scrolling down the street
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (state === "ENGINEERING_STREET") {
        setTargetStreetProgress((prev) =>
          Math.max(0, Math.min(1.0, prev + e.deltaY * 0.0008))
        );
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [state]);

  // Smooth critically-damped progress interpolation
  useEffect(() => {
    let animId: number;
    const loop = () => {
      if (state === "ENGINEERING_STREET") {
        setStreetProgress((prev) => {
          const diff = targetStreetProgress - prev;
          if (Math.abs(diff) > 0.0001) {
            return prev + diff * 0.08;
          }
          return prev;
        });
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [state, targetStreetProgress]);

  // Compute camera Z in the street
  const cameraZ = -(streetProgress * 68.0);

  // Trigger sequence when visitor clicks "ENGINEERING DISTRICT"
  const handleSelectEngineering = useCallback(() => {
    setState("TRAVEL_ENGINEERING");

    // 1. Camera swoops along route (0.6s)
    setTimeout(() => {
      setState("ENGINEERING_PORTAL");
      sounds.playTargetLock();

      // 2. Portal particle vortex builds up (1.6s)
      const start = performance.now();
      const duration = 1600;

      const portalStep = (now: number) => {
        const p = Math.min(1.0, (now - start) / duration);
        setPortalProgress(p);
        if (p < 1.0) {
          requestAnimationFrame(portalStep);
        } else {
          // 3. Camera surges through aperture into the street (0.5s)
          setState("ENTER_STREET");
          sounds.playBoot();

          // 4. Light stream event: warm light bursts down the avenue (1.4s)
          const streamStart = performance.now();
          const streamDuration = 1400;

          const streamStep = (now2: number) => {
            const p2 = Math.min(1.0, (now2 - streamStart) / streamDuration);
            setLightStreamProgress(p2);
            if (p2 < 1.0) {
              requestAnimationFrame(streamStep);
            } else {
              setState("ENGINEERING_STREET");
            }
          };
          requestAnimationFrame(streamStep);
        }
      };
      requestAnimationFrame(portalStep);
    }, 600);
  }, []);

  // Return from street back to Master Map
  const handleReturnToMap = useCallback(() => {
    sounds.playClick();
    setSelectedProject(null);
    setStreetProgress(0);
    setTargetStreetProgress(0);
    setPortalProgress(0);
    setLightStreamProgress(0);
    setState("MAP");
  }, []);

  // Select project for 3D inspection
  const handleSelectProject = useCallback((proj: StreetProjectDef | null) => {
    setSelectedProject(proj);
    setState(proj ? "PROJECT_INSPECT" : "ENGINEERING_STREET");
  }, []);

  const isMapActive = state === "MAP" || state === "TRAVEL_ENGINEERING";
  const isPortalActive =
    state === "ENGINEERING_PORTAL" ||
    state === "ENTER_STREET" ||
    (state === "ENGINEERING_STREET" && streetProgress < 0.15);
  const isStreetActive =
    state === "ENTER_STREET" ||
    state === "ENGINEERING_STREET" ||
    state === "PROJECT_INSPECT";

  return (
    <div className="relative w-full h-screen bg-[#050811] text-[#F1F5F9] overflow-hidden select-none">
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          camera={{ position: [0, 2.5, 7.5], fov: 50, near: 0.1, far: 300 }}
        >
          <color attach="background" args={["#050811"]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 15, 10]} intensity={0.7} />

          {/* Camera Rig */}
          <LabCameraRig
            state={state}
            streetZ={cameraZ}
            pointer={pointer}
          />

          {/* Master 3D Map Scene */}
          <SpatialMapScene
            active={isMapActive}
            onSelectEngineering={handleSelectEngineering}
            isTraveling={state === "TRAVEL_ENGINEERING"}
          />

          {/* Electromagnetic Portal Particle Vortex */}
          <SpatialPortalVortex
            active={isPortalActive}
            progress={portalProgress}
          />

          {/* Engineering Street Scene (Reflective Avenue, Light Stream, 3 Projects) */}
          <EngineeringStreetScene
            active={isStreetActive}
            lightStreamProgress={lightStreamProgress}
            cameraZ={cameraZ}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
            onExitStreet={handleReturnToMap}
          />
        </Canvas>
      </div>

      {/* Minimal HUD Navigation */}
      <SpatialLabHUD
        state={state}
        onReturnToMap={handleReturnToMap}
        streetProgress={streetProgress}
      />

      {/* High-Contrast Technical Dossier (When inspecting a project) */}
      <SpatialLabDossier
        project={selectedProject}
        onClose={() => handleSelectProject(null)}
      />

      {/* Street Scroll Guidance Overlay */}
      {state === "ENGINEERING_STREET" && !selectedProject && (
        <div className="absolute inset-x-0 bottom-8 z-30 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#94A3B8] uppercase mb-2 animate-pulse">
            SCROLL TO ADVANCE DOWN ENGINEERING AVENUE
          </span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-[#FF6A2A] rounded-full animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
}

export default SpatialLabDirector;
