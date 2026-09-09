"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Floating 3D Robot Assistant Node
function FloatingRobot({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = 1.6 + Math.sin(t * 1.5) * 0.15;
    groupRef.current.position.x = 3.2 + (mouse.current[0] * 0.2);
    groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.2 + (mouse.current[0] * 0.3);
    groupRef.current.rotation.x = mouse.current[1] * 0.2;
  });

  return (
    <group ref={groupRef} position={[3.2, 1.6, 0.5]} scale={0.7}>
      {/* Robot Head */}
      <RoundedBox args={[1, 0.8, 0.8]} radius={0.2} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.8} />
      </RoundedBox>

      {/* Screen Face */}
      <RoundedBox args={[0.75, 0.55, 0.1]} radius={0.1} smoothness={4} position={[0, 0, 0.4]}>
        <meshStandardMaterial color="#0f172a" roughness={0.1} />
      </RoundedBox>

      {/* Happy Glowing Eyes */}
      <mesh position={[-0.2, 0.05, 0.46]}>
        <ringGeometry args={[0.04, 0.09, 16, 1, 0, Math.PI]} />
        <meshBasicMaterial color="#ffe600" />
      </mesh>
      <mesh position={[0.2, 0.05, 0.46]}>
        <ringGeometry args={[0.04, 0.09, 16, 1, 0, Math.PI]} />
        <meshBasicMaterial color="#ffe600" />
      </mesh>

      {/* Head Antenna */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3, 12]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffe600" emissive="#ffe600" emissiveIntensity={0.5} />
      </mesh>

      {/* Waving Hand Node */}
      <group position={[0.7, 0.1, 0]}>
        <mesh rotation={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.06, 0.06, 0.4, 8]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0.15, 0.25, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#ffe600" />
        </mesh>
      </group>
    </group>
  );
}

// Floating CAD Engineering Bracket
function CADBracket({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.3 + mouse.current[1] * 0.2;
    meshRef.current.rotation.y = t * 0.4 + mouse.current[0] * 0.3;
  });

  return (
    <group ref={meshRef} position={[3.8, -1.8, -0.2]} scale={0.65}>
      {/* Wireframe Bracket Base */}
      <mesh>
        <boxGeometry args={[1.6, 0.3, 1.2]} />
        <meshStandardMaterial color="#ea580c" wireframe />
      </mesh>
      <mesh position={[0, 0.6, -0.45]}>
        <boxGeometry args={[1.6, 1.0, 0.3]} />
        <meshStandardMaterial color="#ffe600" wireframe />
      </mesh>
      <mesh position={[0, 0.6, 0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 16]} />
        <meshStandardMaterial color="#38bdf8" wireframe />
      </mesh>
    </group>
  );
}

// 3D Extruded Comic Typography "PRANAV"
function Hero3DTitle({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current[0] * 0.12,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.current[1] * 0.08,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[-2.8, 1.8, 0]}>
      {/* Black Drop Shadow Lettering */}
      <Text
        font="/fonts/Inter-Bold.woff" // fallback
        fontSize={1.2}
        color="#080302"
        position={[0.08, -0.08, -0.1]}
        anchorX="center"
        anchorY="middle"
        characters="PRANAV"
      >
        PRANAV
      </Text>

      {/* Main Comic Yellow 3D Lettering */}
      <Text
        fontSize={1.2}
        color="#ffe600"
        position={[0, 0, 0]}
        anchorX="center"
        anchorY="middle"
        characters="PRANAV"
      >
        PRANAV
      </Text>
    </group>
  );
}

// Warm Ambient Amber Dust Particles
function ParticleField() {
  const count = 75;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points | null>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffe600"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Camera Orbit Rig with Lerp Damping
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  useFrame((state) => {
    const targetX = mouse.current[0] * 0.4;
    const targetY = mouse.current[1] * 0.3;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Hero3DScene() {
  const mouse = useRef<[number, number]>([0, 0]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    mouse.current = [x, y];
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="absolute inset-0 pointer-events-none z-10"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        className="pointer-events-auto"
      >
        <CameraRig mouse={mouse} />

        {/* Cinematic Warm Blueprint Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#fff8e7" />
        <pointLight position={[-4, 3, 2]} intensity={1.8} color="#ffe600" />
        <pointLight position={[3, -2, -1]} intensity={1.2} color="#ff4d36" />

        {/* 3D Elements */}
        <ParticleField />
        <FloatingRobot mouse={mouse} />
        <CADBracket mouse={mouse} />
      </Canvas>
    </div>
  );
}
