"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StorySubsystem3DProps {
  progress: number;
  activeNode: string | null;
  onSelectNode: (id: string | null) => void;
}

const CIRCUIT_CHIPS = [
  { id: "sensor", name: "MPU6500 IMU", x: -4.5, y: 1.5, z: -74, color: "#43D8FF", w: 2.2, h: 1.4, tag: "400kHz I2C" },
  { id: "ibus", name: "iBUS UART RX", x: -4.5, y: -1.5, z: -74, color: "#10B981", w: 2.2, h: 1.4, tag: "115200 BAUD" },
  { id: "esp32", name: "ESP32 CORE 0", x: 0.0, y: 0.0, z: -74, color: "#FF6A2A", w: 3.2, h: 2.2, tag: "500Hz PID LOOP" },
  { id: "pwm", name: "LEDC PWM TIMER", x: 4.5, y: 0.0, z: -74, color: "#FFC84A", w: 2.4, h: 1.6, tag: "SUB-µs JITTER" },
  { id: "servos", name: "AERO SURFACES", x: 7.8, y: 0.0, z: -74, color: "#EF4444", w: 2.2, h: 1.4, tag: "ELEVON DEFLECT" },
];

export function StorySubsystem3D({ progress, activeNode, onSelectNode }: StorySubsystem3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const signalPulsesRef = useRef<THREE.Points>(null);

  // Active range: [0.66, 0.84]
  const [opacity, trajectoryMorph] = useMemo(() => {
    let op = 0;
    let morph = 0;

    if (progress >= 0.66 && progress < 0.70) {
      op = (progress - 0.66) / 0.04;
    } else if (progress >= 0.70 && progress <= 0.78) {
      op = 1.0;
    } else if (progress > 0.78 && progress <= 0.84) {
      const pExit = (progress - 0.78) / 0.06;
      op = 1.0 - pExit * 0.4;
      morph = pExit; // Signal lines accelerate upward into Privantrix trajectory
    }

    return [op, morph];
  }, [progress]);

  // Circuit board heavy copper traces (LineSegments)
  const [traceGeo, traceMat] = useMemo(() => {
    const lines: number[] = [];

    // Sensor -> ESP32
    lines.push(-4.5, 1.5, -74, -2.4, 1.5, -74);
    lines.push(-2.4, 1.5, -74, -1.6, 0.6, -74);
    lines.push(-1.6, 0.6, -74, 0.0, 0.0, -74);

    // iBUS -> ESP32
    lines.push(-4.5, -1.5, -74, -2.4, -1.5, -74);
    lines.push(-2.4, -1.5, -74, -1.6, -0.6, -74);
    lines.push(-1.6, -0.6, -74, 0.0, 0.0, -74);

    // ESP32 -> PWM
    lines.push(0.0, 0.0, -74, 2.4, 0.0, -74);
    lines.push(2.4, 0.0, -74, 4.5, 0.0, -74);

    // PWM -> Servos
    lines.push(4.5, 0.0, -74, 6.2, 0.0, -74);
    lines.push(6.2, 0.0, -74, 7.8, 0.0, -74);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#38BDF8"),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  // Sequential traveling photon pulses along traces
  const PULSE_COUNT = 80;
  const [pulseGeo, pulseMat] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(PULSE_COUNT * 3);
    const colors = new Float32Array(PULSE_COUNT * 3);

    for (let i = 0; i < PULSE_COUNT; i++) {
      const idx = i * 3;
      positions[idx] = -4.5 + (i / PULSE_COUNT) * 12.3;
      positions[idx + 1] = 0;
      positions[idx + 2] = -74;

      colors[idx] = 1.0;
      colors[idx + 1] = 0.85;
      colors[idx + 2] = 0.2;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.32,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (signalPulsesRef.current) {
      const attr = signalPulsesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PULSE_COUNT; i++) {
        const offset = (i / PULSE_COUNT + t * 0.5) % 1.0;
        const curX = -4.5 + offset * 12.3;
        // As trajectory morph starts, bend upward into sky
        const curY = offset * trajectoryMorph * 12.0;
        const curZ = -74 - offset * trajectoryMorph * 20.0;

        attr.setXYZ(i, curX, curY, curZ);
      }
      attr.needsUpdate = true;
    }

    traceMat.opacity = opacity * 0.8;
    pulseMat.opacity = opacity * 0.95;
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef}>
      {/* Substrate illumination */}
      <pointLight position={[0, 2, -70]} color="#38BDF8" intensity={1.8} distance={20} />
      <pointLight position={[0, -2, -70]} color="#FF6A2A" intensity={1.5} distance={18} />

      {/* Heavy circuit substrate plane (Scale: 18w x 8h) */}
      <mesh position={[1.5, 0, -74.15]}>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial
          color="#060A12"
          roughness={0.7}
          metalness={0.3}
          transparent
          opacity={0.92 * opacity * (1.0 - trajectoryMorph * 0.7)}
        />
      </mesh>

      {/* Copper bus traces */}
      <lineSegments geometry={traceGeo} material={traceMat} />

      {/* Sequential 500Hz signal photon pulses */}
      <points ref={signalPulsesRef} geometry={pulseGeo} material={pulseMat} />

      {/* Physical Chip Packages with 3D Pin Headers */}
      {CIRCUIT_CHIPS.map((chip) => {
        const isSelected = activeNode === chip.id;
        return (
          <group
            key={chip.id}
            position={[chip.x, chip.y, chip.z]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(isSelected ? null : chip.id);
            }}
          >
            {/* Chip Package */}
            <mesh>
              <boxGeometry args={[chip.w, chip.h, 0.28]} />
              <meshStandardMaterial
                color="#0B111E"
                roughness={0.3}
                metalness={0.8}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Glowing Silicon Die Border */}
            <mesh position={[0, 0, 0.15]}>
              <planeGeometry args={[chip.w * 0.85, chip.h * 0.85]} />
              <meshBasicMaterial
                color={chip.color}
                transparent
                opacity={opacity * 0.85}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
