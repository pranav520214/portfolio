"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { TECH_STACK, TechItem, SOCIAL_LINKS } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";
import { Sparkles, ArrowUpRight, Share2, ExternalLink } from "lucide-react";

type SelectionType = {
  type: "tech";
  data: TechItem;
} | {
  type: "social";
  data: (typeof SOCIAL_LINKS)[keyof typeof SOCIAL_LINKS];
};

// 3D Technology Token
function TechToken({
  tech,
  position,
  isSelected,
  onSelect,
}: {
  tech: TechItem;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (t: TechItem) => void;
}) {
  const meshRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!isSelected) {
      meshRef.current.position.y = position[1] + Math.sin(t * 1.2 + position[0]) * 0.12;
      meshRef.current.rotation.y = Math.sin(t * 0.5 + position[2]) * 0.15;
    } else {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + 0.4, 0.1);
      meshRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        sounds.playTargetLock();
        onSelect(tech);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* 3D Extruded Token Plate */}
      <RoundedBox args={[1.6, 1.1, 0.25]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color={isSelected ? "#ffe600" : "#1e0b08"}
          emissive={isSelected ? "#ffe600" : "#45120c"}
          emissiveIntensity={isSelected ? 0.6 : 0.2}
          roughness={0.25}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Tech Name Label */}
      <Text
        position={[0, 0.1, 0.14]}
        fontSize={0.22}
        color={isSelected ? "#080302" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
      >
        {tech.name}
      </Text>

      {/* Category Subtitle */}
      <Text
        position={[0, -0.25, 0.14]}
        fontSize={0.12}
        color={isSelected ? "#3a2100" : "#ffe600"}
        anchorX="center"
        anchorY="middle"
      >
        {tech.category.toUpperCase()}
      </Text>
    </group>
  );
}

// 3D Social Satellite Token (Distinct embossed metal/acrylic with cream face)
function SocialSatelliteToken({
  social,
  position,
  isSelected,
  onSelect,
}: {
  social: (typeof SOCIAL_LINKS)[keyof typeof SOCIAL_LINKS];
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (s: (typeof SOCIAL_LINKS)[keyof typeof SOCIAL_LINKS]) => void;
}) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (!isSelected) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.14;
      groupRef.current.rotation.y = Math.sin(t * 0.7 + position[2]) * 0.2;
    } else {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1] + 0.45, 0.1);
      groupRef.current.rotation.y = t * 1.0;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        sounds.playTargetLock();
        onSelect(social);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* Embossed Base Plate (Dark side depth with warm rim lighting) */}
      <RoundedBox args={[1.7, 1.2, 0.28]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#160806"
          emissive="#ff4d36"
          emissiveIntensity={isSelected ? 0.6 : 0.25}
          roughness={0.2}
          metalness={0.9}
        />
      </RoundedBox>

      {/* Cream / Off-White Face Plate */}
      <RoundedBox args={[1.5, 1.0, 0.08]} radius={0.08} smoothness={4} position={[0, 0, 0.12]}>
        <meshStandardMaterial
          color={isSelected ? "#ffe600" : "#fff8f0"}
          roughness={0.15}
          metalness={0.4}
        />
      </RoundedBox>

      {/* Satellite Platform Label */}
      <Text
        position={[0, 0.1, 0.18]}
        fontSize={0.22}
        color="#0b0403"
        anchorX="center"
        anchorY="middle"
      >
        {social.name.toUpperCase()}
      </Text>

      <Text
        position={[0, -0.22, 0.18]}
        fontSize={0.12}
        color="#b83222"
        anchorX="center"
        anchorY="middle"
      >
        NETWORK //
      </Text>
    </group>
  );
}

export function TechConstellation3D() {
  const [selection, setSelection] = useState<SelectionType>({
    type: "tech",
    data: TECH_STACK[0],
  });

  // Calculate technology token orbital positions
  const techPositions = React.useMemo(() => {
    const total = TECH_STACK.length;
    return TECH_STACK.map((_, i) => {
      const angle = (i / total) * Math.PI * 2;
      const radius = 4.2 + (i % 3) * 0.8;
      const y = Math.sin(i * 1.5) * 1.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return [x, y, z] as [number, number, number];
    });
  }, []);

  // Social Satellite positions (Network cluster on outer perimeter)
  const socialList = [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.x,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.github,
  ];

  const socialPositions: [number, number, number][] = [
    [5.8, 1.6, 2.2],
    [6.4, 0.1, 0.2],
    [5.9, -1.5, -1.8],
    [4.8, -2.4, 1.6],
  ];

  return (
    <section id="toolbox" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-comic-yellow bg-blueprint-900/80 border border-comic-yellow/30 px-3 py-1 rounded mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>06 // 3D TECHNOLOGY & NETWORK CONSTELLATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-technical-white tracking-tight">
            THE <span className="text-comic-yellow">TOOLBOX</span> &amp; NETWORK
          </h2>
          <p className="text-sm sm:text-base text-technical-cream/80 max-w-2xl mt-2 leading-relaxed">
            A spatial constellation of 3D engineering tokens and outer network satellites. 
            Click any token in the 3D space or select below to inspect architecture roles and live channels.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-comic-yellow bg-blueprint-950 px-3 py-1.5 rounded border border-comic-yellow/30 self-start md:self-auto">
          <span>DRAG ↺ TO ORBIT CONSTELLATION</span>
        </div>
      </div>

      {/* Main 3D Canvas & Telemetry HUD Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3D WebGL Canvas Stage */}
        <div data-cursor="3d" className="lg:col-span-2 h-[480px] sm:h-[560px] bg-blueprint-950/90 border-2 border-comic-yellow/50 rounded-2xl overflow-hidden shadow-comic-lg relative">
          <Canvas
            camera={{ position: [0, 1, 10.5], fov: 48 }}
            dpr={[1, 1.5]}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[6, 8, 5]} intensity={1.8} color="#fff8e7" />
            <pointLight position={[-6, -4, 3]} intensity={1.5} color="#ffe600" />
            <pointLight position={[5, -2, -2]} intensity={1.2} color="#ff4d36" />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.25}
              dampingFactor={0.05}
            />

            {/* Central PRANAV Core Anchor */}
            <mesh position={[0, 0, 0]}>
              <octahedronGeometry args={[0.9, 1]} />
              <meshStandardMaterial color="#ffe600" wireframe />
            </mesh>
            <Text position={[0, 1.2, 0]} fontSize={0.25} color="#ffe600">
              PRANAV // CORE
            </Text>

            {/* Technology Tokens */}
            {TECH_STACK.map((tech, idx) => (
              <TechToken
                key={tech.name}
                tech={tech}
                position={techPositions[idx]}
                isSelected={selection.type === "tech" && selection.data.name === tech.name}
                onSelect={(t) => setSelection({ type: "tech", data: t })}
              />
            ))}

            {/* Social Network Satellites (Outer Perimeter) */}
            <group position={[0, 0, 0]}>
              {socialList.map((soc, idx) => (
                <SocialSatelliteToken
                  key={soc.id}
                  social={soc}
                  position={socialPositions[idx]}
                  isSelected={selection.type === "social" && selection.data.id === soc.id}
                  onSelect={(s) => setSelection({ type: "social", data: s })}
                />
              ))}
            </group>
          </Canvas>

          {/* Canvas Bottom Overlay Readout */}
          <div className="absolute bottom-3 left-3 font-mono text-[10px] text-comic-yellow/80 bg-blueprint-900/80 px-2.5 py-1 rounded border border-comic-yellow/25 pointer-events-none backdrop-blur">
            SELECTED // {selection.type === "tech" ? selection.data.name.toUpperCase() : `NETWORK // ${selection.data.name.toUpperCase()}`}
          </div>
        </div>

        {/* Selected Item Telemetry HUD Panel */}
        <div className="bg-blueprint-900/90 border-2 border-comic-yellow/50 rounded-2xl p-6 shadow-comic flex flex-col justify-between backdrop-blur">
          <div>
            <div className="flex items-center justify-between border-b border-comic-yellow/30 pb-3 mb-4">
              <span className="font-mono text-xs text-comic-yellow font-bold uppercase tracking-wider">
                {selection.type === "tech" ? "HOW I USE IT //" : "SOCIAL NODE //"}
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                {selection.type === "tech" ? selection.data.level.toUpperCase() : "ONLINE VERIFIED"}
              </span>
            </div>

            {/* Content Display for Tech vs Social */}
            {selection.type === "tech" ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selection.data.color }}
                  />
                  <h3 className="font-black text-2xl text-technical-white">
                    {selection.data.name}
                  </h3>
                </div>

                <div className="font-mono text-xs text-comic-yellow mb-3">
                  DOMAIN: {selection.data.category}
                </div>

                <div className="bg-blueprint-950 border border-comic-yellow/25 p-4 rounded-xl mb-5">
                  <p className="text-xs sm:text-sm text-technical-cream/90 leading-relaxed">
                    {selection.data.usageDescription}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selection.data.color }}
                  />
                  <h3 className="font-black text-2xl text-technical-white">
                    {selection.data.name}
                  </h3>
                </div>

                <div className="font-mono text-xs text-comic-yellow mb-1">
                  ROLE: {selection.data.tagline}
                </div>
                <div className="font-mono text-[11px] text-technical-muted mb-3">
                  {selection.data.handle}
                </div>

                <div className="bg-blueprint-950 border border-comic-yellow/25 p-4 rounded-xl mb-4">
                  <p className="text-xs sm:text-sm text-technical-cream/90 leading-relaxed">
                    {selection.data.description}
                  </p>
                </div>

                {/* Direct Action Button to Open Profile */}
                <a
                  href={selection.data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={selection.data.ariaLabel}
                  onClick={() => sounds.playClick()}
                  data-cursor="contact"
                  className="w-full bg-comic-yellow hover:bg-comic-bright text-blueprint-950 font-black py-2.5 px-4 rounded-lg shadow-comic transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs mb-4"
                >
                  <span>OPEN PROFILE ↗</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </>
            )}

            {/* Quick Picker: Network Satellites vs Technologies */}
            <div className="border-t border-comic-yellow/20 pt-4">
              <div className="font-mono text-[11px] text-comic-yellow font-bold uppercase mb-2 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                <span>NETWORK SATELLITES</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {socialList.map((soc) => (
                  <button
                    key={soc.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelection({ type: "social", data: soc });
                    }}
                    className={`font-mono text-xs px-2.5 py-1 rounded transition-colors ${
                      selection.type === "social" && selection.data.id === soc.id
                        ? "bg-comic-yellow text-blueprint-950 font-bold shadow-comic"
                        : "bg-blueprint-950 text-technical-cream/80 hover:text-comic-yellow border border-comic-yellow/20"
                    }`}
                  >
                    {soc.name}
                  </button>
                ))}
              </div>

              <div className="font-mono text-[11px] text-technical-muted uppercase mb-1.5">
                TECH TOKENS ({TECH_STACK.length})
              </div>
              <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto pr-1">
                {TECH_STACK.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      sounds.playClick();
                      setSelection({ type: "tech", data: item });
                    }}
                    className={`font-mono text-[10px] px-2 py-0.5 rounded transition-colors ${
                      selection.type === "tech" && selection.data.name === item.name
                        ? "bg-comic-yellow text-blueprint-950 font-bold"
                        : "bg-blueprint-950/80 text-technical-cream/70 hover:text-comic-yellow hover:bg-blueprint-850"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-comic-yellow/20 font-mono text-[10px] text-technical-muted flex justify-between">
            <span>CONSTELLATION: {TECH_STACK.length} TOKENS + 4 SATELLITES</span>
            <span className="text-comic-yellow">ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
