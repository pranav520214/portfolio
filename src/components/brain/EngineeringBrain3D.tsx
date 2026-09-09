"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Line, Float } from "@react-three/drei";
import * as THREE from "three";
import { BRAIN_NODES, BrainNode, FEATURED_PROJECTS } from "@/data/portfolioData";
import { sounds } from "../audio/SoundSystem";
import { Brain, ArrowUpRight, Sparkles } from "lucide-react";

// Individual 3D Interactive Node Sphere
function BrainNodeSphere({
  node,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: {
  node: BrainNode;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (node: BrainNode) => void;
  onHover: (node: BrainNode | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    if (node.category === "core") {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = t * 0.3;
    }
  });

  const isCore = node.category === "core";
  const size = isCore ? 0.7 : isSelected || isHovered ? 0.45 : 0.32;
  const color = isCore
    ? "#ffe600"
    : node.category === "ai"
    ? "#ffe600"
    : node.category === "systems"
    ? "#38bdf8"
    : node.category === "embedded"
    ? "#4ade80"
    : "#fb923c";

  return (
    <group position={[node.x, node.y, node.z]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          sounds.playTargetLock();
          onSelect(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected || isHovered ? 0.7 : 0.25}
          roughness={0.2}
          metalness={0.6}
          wireframe={isCore}
        />
      </mesh>

      {/* Floating Node Label */}
      <Text
        position={[0, size + 0.35, 0]}
        fontSize={isCore ? 0.28 : 0.2}
        color={isSelected || isHovered ? "#ffe600" : "#ffffff"}
        anchorX="center"
        anchorY="bottom"
      >
        {node.label}
      </Text>
    </group>
  );
}

// 3D Connection Lines between Nodes
function ConnectionLines({
  nodes,
  selectedNodeId,
}: {
  nodes: BrainNode[];
  selectedNodeId: string | null;
}) {
  const lines = React.useMemo(() => {
    const list: { start: [number, number, number]; end: [number, number, number]; active: boolean }[] = [];
    nodes.forEach((node) => {
      node.connectedTo.forEach((targetId) => {
        const target = nodes.find((n) => n.id === targetId);
        if (target) {
          const isActive =
            selectedNodeId === null ||
            node.id === selectedNodeId ||
            target.id === selectedNodeId;
          list.push({
            start: [node.x, node.y, node.z],
            end: [target.x, target.y, target.z],
            active: isActive,
          });
        }
      });
    });
    return list;
  }, [nodes, selectedNodeId]);

  return (
    <>
      {lines.map((l, i) => (
        <Line
          key={i}
          points={[l.start, l.end]}
          color={l.active ? "#ffe600" : "#481610"}
          lineWidth={l.active ? 1.5 : 0.75}
          transparent
          opacity={l.active ? 0.85 : 0.25}
        />
      ))}
    </>
  );
}

export function EngineeringBrain3D({ onSelectProject }: { onSelectProject: (id: string) => void }) {
  const [selectedNode, setSelectedNode] = useState<BrainNode>(BRAIN_NODES[0]);
  const [hoveredNode, setHoveredNode] = useState<BrainNode | null>(null);

  const activeNode = hoveredNode || selectedNode;
  const matchingProjects = FEATURED_PROJECTS.filter((p) =>
    activeNode.projectIds.includes(p.id)
  );

  return (
    <section id="brain" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-comic-yellow bg-blueprint-900/80 border border-comic-yellow/30 px-3 py-1 rounded mb-3">
            <Brain className="w-3.5 h-3.5" />
            <span>03 // INTERACTIVE ENGINEERING BRAIN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-technical-white tracking-tight">
            INTERDISCIPLINARY <span className="text-comic-yellow">NODE NETWORK</span>
          </h2>
          <p className="text-sm sm:text-base text-technical-cream/80 max-w-2xl mt-2">
            Explore the interconnected graph of models, hardware loops, aerospace dynamics, and security systems. 
            Click or drag to rotate in 3D space; select any node to reveal linked repository builds.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-comic-yellow/80 bg-blueprint-950 px-3 py-1.5 rounded border border-comic-yellow/30 self-start sm:self-auto">
          <span>DRAG ↺ TO ROTATE 3D</span>
        </div>
      </div>

      {/* Main 3D Canvas Stage + HUD Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D WebGL Canvas */}
        <div data-cursor="3d" className="lg:col-span-2 h-[450px] sm:h-[550px] bg-blueprint-950/90 border-2 border-comic-yellow/50 rounded-xl overflow-hidden shadow-comic relative">
          <Canvas
            camera={{ position: [0, 0, 9], fov: 50 }}
            dpr={[1, 1.5]}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 8, 5]} intensity={1.5} color="#fff8e7" />
            <pointLight position={[-5, -4, 2]} intensity={1.2} color="#ffe600" />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.4}
              dampingFactor={0.05}
            />

            <ConnectionLines nodes={BRAIN_NODES} selectedNodeId={activeNode.id} />

            {BRAIN_NODES.map((node) => (
              <BrainNodeSphere
                key={node.id}
                node={node}
                isSelected={selectedNode.id === node.id}
                isHovered={hoveredNode?.id === node.id}
                onSelect={(n) => setSelectedNode(n)}
                onHover={(n) => setHoveredNode(n)}
              />
            ))}
          </Canvas>

          {/* Canvas Bottom Overlay Controls */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-technical-cream/70 bg-blueprint-900/80 backdrop-blur px-3 py-1.5 rounded border border-comic-yellow/20 pointer-events-none">
            <span>NODE: {activeNode.label}</span>
            <span>CATEGORY: {activeNode.category.toUpperCase()}</span>
            <span>NODES: {BRAIN_NODES.length}</span>
          </div>
        </div>

        {/* Node Telemetry & Linked Projects HUD Panel */}
        <div className="bg-blueprint-900/90 border-2 border-comic-yellow/50 rounded-xl p-5 shadow-comic flex flex-col justify-between backdrop-blur">
          <div>
            <div className="flex items-center justify-between border-b border-comic-yellow/30 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-comic-yellow" />
                <span className="font-mono text-xs font-bold text-comic-yellow uppercase">
                  NODE TELEMETRY
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <h3 className="font-black text-xl text-technical-white mb-2">
              {activeNode.label}
            </h3>
            <p className="text-xs text-technical-cream/80 leading-relaxed mb-5">
              {activeNode.description}
            </p>

            {/* Linked Projects from Repository */}
            <div className="border-t border-comic-yellow/20 pt-4">
              <div className="font-mono text-[11px] text-comic-yellow uppercase font-bold tracking-wider mb-3">
                CONNECTED REPOSITORY BUILDS ({matchingProjects.length})
              </div>

              <div className="space-y-2.5">
                {matchingProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      sounds.playModuleOpen();
                      onSelectProject(proj.id);
                    }}
                    data-cursor="project"
                    className="group bg-blueprint-950 hover:bg-blueprint-850 border border-comic-yellow/30 hover:border-comic-yellow p-3 rounded-lg cursor-pointer transition-all duration-150"
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-xs text-technical-white group-hover:text-comic-yellow transition-colors">
                        {proj.title}
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-comic-yellow shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-technical-muted">
                      {proj.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-comic-yellow/20 font-mono text-[10px] text-technical-cream/50 flex justify-between">
            <span>GRAPH // TOPOLOGY VERIFIED</span>
            <span>PENN STATE · ISRO · ATL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
