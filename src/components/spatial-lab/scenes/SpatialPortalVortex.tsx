"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpatialPortalVortexProps {
  progress: number; // 0.0 to 1.0 (ignition -> fully roaring)
  active: boolean;
}

export function SpatialPortalVortex({ progress, active }: SpatialPortalVortexProps) {
  const streaksRef = useRef<THREE.LineSegments>(null);
  const sheddingRef = useRef<THREE.LineSegments>(null);
  const apertureRef = useRef<THREE.Mesh>(null);

  // 1. Layer A: 2800 Directional Spark Streaks (Irregular Circumference)
  const STREAK_COUNT = 2800;
  const [streakGeo, streakMaterial] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(STREAK_COUNT * 2 * 3);
    const aAngle = new Float32Array(STREAK_COUNT * 2);
    const aRadius = new Float32Array(STREAK_COUNT * 2);
    const aZOffset = new Float32Array(STREAK_COUNT * 2);
    const aSpeed = new Float32Array(STREAK_COUNT * 2);
    const aLength = new Float32Array(STREAK_COUNT * 2);
    const aHeadTail = new Float32Array(STREAK_COUNT * 2);
    const aHotness = new Float32Array(STREAK_COUNT * 2);
    const aPhase = new Float32Array(STREAK_COUNT * 2);

    for (let i = 0; i < STREAK_COUNT; i++) {
      const idx = i * 2;
      const baseAngle = (i / STREAK_COUNT) * Math.PI * 2;
      const angleJitter = (Math.random() - 0.5) * 0.35;
      const angle = baseAngle + angleJitter;

      // Variable radius with harmonic distortion
      const harmonicR = 2.40 + Math.sin(baseAngle * 3.0) * 0.28 + Math.cos(baseAngle * 7.0) * 0.16;
      const radius = harmonicR + (Math.random() - 0.5) * 0.35;
      const zOffset = (Math.random() - 0.5) * 0.5;

      const speed = 3.6 + (3.0 - radius) * 4.2 + Math.random() * 2.2;
      const length = 0.08 + Math.random() * 0.42;

      // Hotspots vs broken arc gaps
      let hotness = 0.5 + Math.random() * 0.5;
      const normAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if ((normAngle > 1.7 && normAngle < 2.2) || (normAngle > 4.6 && normAngle < 5.0)) {
        hotness *= 0.12; // Dark gap
      } else if ((normAngle > 0.4 && normAngle < 1.1) || (normAngle > 3.1 && normAngle < 3.7)) {
        hotness *= 1.65; // Hotspot
      }

      const phase = Math.random() * Math.PI * 2;

      // Tail
      aAngle[idx] = angle;
      aRadius[idx] = radius;
      aZOffset[idx] = zOffset;
      aSpeed[idx] = speed;
      aLength[idx] = length;
      aHeadTail[idx] = 0.0;
      aHotness[idx] = hotness;
      aPhase[idx] = phase;

      // Head
      aAngle[idx + 1] = angle;
      aRadius[idx + 1] = radius;
      aZOffset[idx + 1] = zOffset;
      aSpeed[idx + 1] = speed;
      aLength[idx + 1] = length;
      aHeadTail[idx + 1] = 1.0;
      aHotness[idx + 1] = hotness;
      aPhase[idx + 1] = phase;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aAngle", new THREE.BufferAttribute(aAngle, 1));
    geo.setAttribute("aRadius", new THREE.BufferAttribute(aRadius, 1));
    geo.setAttribute("aZOffset", new THREE.BufferAttribute(aZOffset, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aLength", new THREE.BufferAttribute(aLength, 1));
    geo.setAttribute("aHeadTail", new THREE.BufferAttribute(aHeadTail, 1));
    geo.setAttribute("aHotness", new THREE.BufferAttribute(aHotness, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uIntensity: { value: 1.0 },
      },
      vertexShader: `
        attribute float aAngle;
        attribute float aRadius;
        attribute float aZOffset;
        attribute float aSpeed;
        attribute float aLength;
        attribute float aHeadTail;
        attribute float aHotness;
        attribute float aPhase;

        uniform float uTime;
        uniform float uProgress;
        varying float vHeadTail;
        varying float vHotness;
        varying float vAlpha;

        void main() {
          vHeadTail = aHeadTail;
          vHotness = aHotness;

          float curAngle = aAngle + uTime * aSpeed + aPhase;
          float offset = aHeadTail * aLength;
          float finalAngle = curAngle + offset;

          float flutter = sin(curAngle * 4.0 + uTime * 6.0) * 0.08;
          float r = aRadius + flutter;

          vec3 pos = vec3(
            cos(finalAngle) * r,
            sin(finalAngle) * r,
            aZOffset + sin(curAngle * 3.0 + uTime * 4.0) * 0.16
          );

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          vAlpha = smoothstep(0.0, 0.2, uProgress);
        }
      `,
      fragmentShader: `
        varying float vHeadTail;
        varying float vHotness;
        varying float vAlpha;
        uniform float uIntensity;

        void main() {
          vec3 headCol = vec3(1.0, 0.98, 0.92);
          vec3 midCol  = vec3(1.0, 0.65, 0.12);
          vec3 tailCol = vec3(0.92, 0.20, 0.04);

          vec3 col = mix(tailCol, midCol, smoothstep(0.0, 0.65, vHeadTail));
          col = mix(col, headCol, smoothstep(0.65, 1.0, vHeadTail));

          float alpha = mix(0.08, 1.0, vHeadTail) * vAlpha * vHotness * uIntensity;
          gl_FragColor = vec4(col * (1.3 + vHotness * 0.8), alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return [geo, mat];
  }, []);

  // 2. Layer B: 900 Ballistic Shedding Embers (Flying toward camera)
  const SHED_COUNT = 900;
  const [shedGeo, shedMaterial] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(SHED_COUNT * 2 * 3);
    const aShedAngle = new Float32Array(SHED_COUNT * 2);
    const aShedSpeed = new Float32Array(SHED_COUNT * 2);
    const aLifeOffset = new Float32Array(SHED_COUNT * 2);
    const aHeadTail = new Float32Array(SHED_COUNT * 2);

    for (let i = 0; i < SHED_COUNT; i++) {
      const idx = i * 2;
      const angle = (i / SHED_COUNT) * Math.PI * 2 + Math.random() * 0.2;
      const speed = 2.2 + Math.random() * 3.8;
      const lifeOffset = Math.random() * 10.0;

      aShedAngle[idx] = angle;
      aShedSpeed[idx] = speed;
      aLifeOffset[idx] = lifeOffset;
      aHeadTail[idx] = 0.0;

      aShedAngle[idx + 1] = angle;
      aShedSpeed[idx + 1] = speed;
      aLifeOffset[idx + 1] = lifeOffset;
      aHeadTail[idx + 1] = 1.0;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aShedAngle", new THREE.BufferAttribute(aShedAngle, 1));
    geo.setAttribute("aShedSpeed", new THREE.BufferAttribute(aShedSpeed, 1));
    geo.setAttribute("aLifeOffset", new THREE.BufferAttribute(aLifeOffset, 1));
    geo.setAttribute("aHeadTail", new THREE.BufferAttribute(aHeadTail, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uIntensity: { value: 1.0 },
      },
      vertexShader: `
        attribute float aShedAngle;
        attribute float aShedSpeed;
        attribute float aLifeOffset;
        attribute float aHeadTail;
        uniform float uTime;
        uniform float uProgress;
        varying float vLife;

        void main() {
          float lifeCycle = mod(uTime * 1.8 + aLifeOffset, 1.4);
          float normLife = lifeCycle / 1.4;
          vLife = normLife;

          float tangAngle = aShedAngle + uTime * 2.2;
          vec2 tangDir = vec2(-sin(tangAngle), cos(tangAngle));
          vec2 radDir = vec2(cos(tangAngle), sin(tangAngle));
          vec2 dir = normalize(tangDir * 0.7 + radDir * 0.5);

          float baseR = 2.40;
          float dist = normLife * aShedSpeed;
          float stretch = (1.0 - aHeadTail) * 0.18;

          vec2 p = vec2(cos(tangAngle), sin(tangAngle)) * baseR + dir * (dist - stretch);
          float z = (sin(aLifeOffset) * 0.3) + normLife * 1.6;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(p.x, p.y, z, 1.0);
        }
      `,
      fragmentShader: `
        varying float vLife;
        uniform float uIntensity;
        uniform float uProgress;

        void main() {
          float decay = 1.0 - vLife;
          vec3 col = mix(vec3(0.95, 0.25, 0.05), vec3(1.0, 0.92, 0.45), decay);
          float alpha = decay * smoothstep(0.0, 0.2, uProgress) * uIntensity;
          gl_FragColor = vec4(col * 1.8, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return [geo, mat];
  }, []);

  // 3. Layer C: Aperture Heat Shimmer Rim with Transparent Center
  const apertureMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uIntensity: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uProgress;
        uniform float uIntensity;

        void main() {
          vec2 center = vUv - vec2(0.5);
          float dist = length(center) * 2.0;

          // Inner aperture (dist < 0.82) is completely transparent!
          // Outer rim (0.82 to 1.0) has energetic heat shimmer
          if (dist < 0.82 || dist > 1.0) discard;

          float rim = smoothstep(0.82, 0.94, dist) * smoothstep(1.0, 0.94, dist);
          float shimmer = sin(atan(center.y, center.x) * 12.0 + uTime * 8.0) * 0.15;
          float alpha = (rim + shimmer) * uProgress * uIntensity * 0.75;

          vec3 color = mix(vec3(1.0, 0.55, 0.12), vec3(1.0, 0.95, 0.7), rim);
          gl_FragColor = vec4(color * 1.6, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    streakMaterial.uniforms.uTime.value = t;
    streakMaterial.uniforms.uProgress.value = progress;
    streakMaterial.uniforms.uIntensity.value = active ? 1.0 : 0.0;

    shedMaterial.uniforms.uTime.value = t;
    shedMaterial.uniforms.uProgress.value = progress;
    shedMaterial.uniforms.uIntensity.value = active ? 1.0 : 0.0;

    apertureMat.uniforms.uTime.value = t;
    apertureMat.uniforms.uProgress.value = progress;
    apertureMat.uniforms.uIntensity.value = active ? 1.0 : 0.0;
  });

  if (!active) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Directional Sparks */}
      <lineSegments ref={streaksRef} geometry={streakGeo} material={streakMaterial} />

      {/* Ballistic Shedding Sparks */}
      <lineSegments ref={sheddingRef} geometry={shedGeo} material={shedMaterial} />

      {/* Heat Shimmer Rim (Transparent Center Window) */}
      <mesh ref={apertureRef} position={[0, 0, 0]}>
        <planeGeometry args={[5.2, 5.2]} />
        <primitive object={apertureMat} attach="material" />
      </mesh>
    </group>
  );
}
