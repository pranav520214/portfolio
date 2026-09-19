"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function CircuitAssembly({ progress }: { progress: MotionValue<number> }) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const { invalidate } = useThree();
  useEffect(() => progress.on("change", () => invalidate()), [progress, invalidate]);
  useFrame((_, delta) => {
    if (!root.current) return;
    const p = THREE.MathUtils.clamp(progress.get(), 0, 1);
    const spread = 1.3 - Math.sin(p * Math.PI) * 1.05;
    const alpha = 1 - Math.exp(-Math.min(delta, .05) * 9);
    let moving = false;
    layers.current.forEach((layer, i) => {
      if (!layer) return;
      const target = (i - 1) * spread;
      layer.position.y = THREE.MathUtils.lerp(layer.position.y, target, alpha);
      if (Math.abs(layer.position.y - target) > .001) moving = true;
    });
    const turn = -.5 + p * .8;
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, turn, alpha);
    if (Math.abs(root.current.rotation.y - turn) > .001) moving = true;
    if (moving) invalidate();
  });
  return <group ref={root} rotation={[.25, -.5, -.14]}>
    {[0, 1, 2].map((layer) => <group key={layer} ref={el => { layers.current[layer] = el; }} position={[0, (layer - 1) * 1.3, 0]}>
      <mesh><boxGeometry args={[3.8, .13, 2.5]} /><meshStandardMaterial color={layer === 1 ? "#bb4a28" : "#777e4e"} roughness={.7} metalness={.2} /></mesh>
      <mesh position={[0, .18, 0]}><boxGeometry args={[1.05, .25, .95]} /><meshStandardMaterial color={layer === 1 ? "#24291e" : "#bab491"} roughness={.55} metalness={.25} /></mesh>
      {Array.from({ length: 10 }, (_, i) => <group key={i} position={[-1.53 + i * .34, .11, 0]}>
        <mesh position={[0, 0, .85]}><boxGeometry args={[.035, .018, .65]} /><meshStandardMaterial color="#dfc991" metalness={.45} roughness={.45} /></mesh>
        <mesh position={[0, 0, -.85]}><boxGeometry args={[.035, .018, .65]} /><meshStandardMaterial color="#dfc991" metalness={.45} roughness={.45} /></mesh>
      </group>)}
      {[-1.6, 1.6].flatMap(x => [-.95, .95].map(z => <mesh key={`${x}:${z}`} position={[x, .18, z]}><cylinderGeometry args={[.09, .09, .25, 8]} /><meshStandardMaterial color="#c8c3a2" metalness={.5} roughness={.4} /></mesh>))}
    </group>)}
  </group>;
}

function ContextMonitor({ onLost }: { onLost: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onLost(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onLost]);
  return null;
}

export function AssemblyScene({ progress, onContextLost }: { progress: MotionValue<number>; onContextLost: () => void }) {
  const [dpr, setDpr] = useState(1);
  useEffect(() => { setDpr(window.matchMedia("(max-width: 760px)").matches ? 1 : Math.min(window.devicePixelRatio, 1.5)); }, []);
  return <Canvas frameloop="demand" dpr={dpr} camera={{ position: [5, 5, 7], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
    <ambientLight intensity={1.6} /><directionalLight position={[4, 7, 5]} intensity={3} color="#fff0d0" /><directionalLight position={[-4, 3, -3]} intensity={1.8} color="#e2e7bd" />
    <CircuitAssembly progress={progress} /><ContextMonitor onLost={onContextLost} />
  </Canvas>;
}
