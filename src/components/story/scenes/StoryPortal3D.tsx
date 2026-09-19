"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StoryPortal3DProps {
  progress: number; // Global scroll progress [0.0, 1.0]
}

export function StoryPortal3D({ progress }: StoryPortal3DProps) {
  const streaksRef = useRef<THREE.LineSegments>(null);
  const ejectingRef = useRef<THREE.LineSegments>(null);
  const rearFilamentsRef = useRef<THREE.LineSegments>(null);
  const coreSparksRef = useRef<THREE.Points>(null);
  const apertureRef = useRef<THREE.Mesh>(null);

  // =========================================================================
  // 1. LAYER A: 3200 IRREGULAR DIRECTIONAL SPARK STREAKS (Front & Mid Volume)
  // Non-uniform radius, broken arcs, dark gaps, moving hotspots
  // =========================================================================
  const STREAK_COUNT = 3200;
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
      // Irregular angular distribution with natural dark gaps
      const baseAngle = (i / STREAK_COUNT) * Math.PI * 2;
      const angleJitter = (Math.random() - 0.5) * 0.35;
      const angle = baseAngle + angleJitter;

      // Variable radius: broken circumference with harmonic distortion (2.1 to 2.85)
      const harmonicR = 2.45 + Math.sin(baseAngle * 3.0) * 0.25 + Math.cos(baseAngle * 7.0) * 0.15;
      const radius = harmonicR + (Math.random() - 0.5) * 0.35;

      // Volumetric Z dispersion: front layer (+0.4 to +1.2) and mid layer (-0.2 to +0.4)
      const isFrontLayer = Math.random() < 0.45;
      const zOffset = isFrontLayer
        ? 0.3 + Math.random() * 0.9
        : -0.2 + (Math.random() - 0.5) * 0.5;

      // Inner particles orbit faster than outer particles (differential shearing)
      const speed = 3.8 + (3.0 - radius) * 4.5 + Math.random() * 2.2;
      // Irregular streak length (from short sparks to long filaments)
      const length = 0.08 + Math.random() * 0.45;

      // Hotspots vs dark gaps
      let hotness = 0.5 + Math.random() * 0.5;
      // Introduce broken arc dark gaps at two sectors
      const normAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if ((normAngle > 1.8 && normAngle < 2.3) || (normAngle > 4.5 && normAngle < 4.9)) {
        hotness *= 0.15; // Dark gap
      } else if ((normAngle > 0.5 && normAngle < 1.2) || (normAngle > 3.2 && normAngle < 3.8)) {
        hotness *= 1.6; // High-energy hotspot
      }

      const phase = Math.random() * Math.PI * 2;

      // Tail vertex (0)
      aAngle[idx] = angle;
      aRadius[idx] = radius;
      aZOffset[idx] = zOffset;
      aSpeed[idx] = speed;
      aLength[idx] = length;
      aHeadTail[idx] = 0.0;
      aHotness[idx] = hotness;
      aPhase[idx] = phase;

      // Head vertex (1)
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

          // Tangential circulation with curl turbulence
          float curAngle = aAngle + uTime * aSpeed + aPhase;
          float offset = aHeadTail * aLength;
          float finalAngle = curAngle + offset;

          // Turbulent radial flutter
          float flutter = sin(curAngle * 5.0 + uTime * 6.0) * 0.08;
          float r = aRadius + flutter;

          vec3 pos = vec3(
            cos(finalAngle) * r,
            sin(finalAngle) * r,
            aZOffset + sin(curAngle * 3.0 + uTime * 4.0) * 0.18
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
          // Temperature gradient: incandescent white head, deep gold/orange body, red tail
          vec3 headCol = vec3(1.0, 0.98, 0.92);
          vec3 midCol  = vec3(1.0, 0.65, 0.12);
          vec3 tailCol = vec3(0.92, 0.20, 0.04);

          vec3 col = mix(tailCol, midCol, smoothstep(0.0, 0.65, vHeadTail));
          col = mix(col, headCol, smoothstep(0.65, 1.0, vHeadTail));

          float alpha = mix(0.08, 1.0, vHeadTail) * vAlpha * vHotness * uIntensity;
          gl_FragColor = vec4(col * (1.2 + vHotness * 0.8), alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return [geo, mat];
  }, []);

  // =========================================================================
  // 2. LAYER B: 1100 BALLISTIC SHEDDING SPARKS (Flying outward & toward camera)
  // =========================================================================
  const EJECT_COUNT = 1100;
  const [ejectGeo, ejectMaterial] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(EJECT_COUNT * 2 * 3);
    const aEjectAngle = new Float32Array(EJECT_COUNT * 2);
    const aEjectSpeed = new Float32Array(EJECT_COUNT * 2);
    const aLifeOffset = new Float32Array(EJECT_COUNT * 2);
    const aHeadTail = new Float32Array(EJECT_COUNT * 2);

    for (let i = 0; i < EJECT_COUNT; i++) {
      const idx = i * 2;
      const angle = (i / EJECT_COUNT) * Math.PI * 2 + Math.random() * 0.2;
      const speed = 2.0 + Math.random() * 3.5;
      const lifeOffset = Math.random() * 10.0;

      aEjectAngle[idx] = angle;
      aEjectSpeed[idx] = speed;
      aLifeOffset[idx] = lifeOffset;
      aHeadTail[idx] = 0.0;

      aEjectAngle[idx + 1] = angle;
      aEjectSpeed[idx + 1] = speed;
      aLifeOffset[idx + 1] = lifeOffset;
      aHeadTail[idx + 1] = 1.0;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aEjectAngle", new THREE.BufferAttribute(aEjectAngle, 1));
    geo.setAttribute("aEjectSpeed", new THREE.BufferAttribute(aEjectSpeed, 1));
    geo.setAttribute("aLifeOffset", new THREE.BufferAttribute(aLifeOffset, 1));
    geo.setAttribute("aHeadTail", new THREE.BufferAttribute(aHeadTail, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uIntensity: { value: 1.0 },
      },
      vertexShader: `
        attribute float aEjectAngle;
        attribute float aEjectSpeed;
        attribute float aLifeOffset;
        attribute float aHeadTail;
        uniform float uTime;
        uniform float uProgress;
        varying float vLife;

        void main() {
          float lifeCycle = mod(uTime * 1.8 + aLifeOffset, 1.4);
          float normLife = lifeCycle / 1.4;
          vLife = normLife;

          float tangAngle = aEjectAngle + uTime * 2.2;
          vec2 tangDir = vec2(-sin(tangAngle), cos(tangAngle));
          vec2 radDir = vec2(cos(tangAngle), sin(tangAngle));
          vec2 dir = normalize(tangDir * 0.7 + radDir * 0.5);

          float baseR = 2.45;
          float dist = normLife * aEjectSpeed;
          float stretch = (1.0 - aHeadTail) * 0.18;

          vec2 p = vec2(cos(tangAngle), sin(tangAngle)) * baseR + dir * (dist - stretch);
          // Fly forward toward camera along Z as life increases
          float z = (sin(aLifeOffset) * 0.3) + normLife * 1.5;

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

  // =========================================================================
  // 3. LAYER C: REAR FILAMENTS (Z: -0.4 to -1.2 — Passes behind aperture)
  // =========================================================================
  const REAR_COUNT = 600;
  const [rearGeo, rearMat] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(REAR_COUNT * 2 * 3);
    for (let i = 0; i < REAR_COUNT; i++) {
      const idx = i * 2;
      const angle = (i / REAR_COUNT) * Math.PI * 2;
      const r = 2.3 + Math.random() * 0.4;
      const z = -0.4 - Math.random() * 0.8;
      const len = 0.15 + Math.random() * 0.3;

      positions[idx] = Math.cos(angle) * r;
      positions[idx + 1] = Math.sin(angle) * r;
      positions[idx + 2] = z;

      positions[idx + 3] = Math.cos(angle + len) * r;
      positions[idx + 4] = Math.sin(angle + len) * r;
      positions[idx + 5] = z + (Math.random() - 0.5) * 0.2;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#FF7A1A"),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    return [geo, mat];
  }, []);

  // =========================================================================
  // 4. LAYER D: APERTURE REFRACTION / HEAT SHIMMER RIM (Transparent Center)
  // Transparent opening showing next space with refractive boundary
  // =========================================================================
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

          // Inner aperture (dist < 0.85) is completely transparent!
          // Outer rim (0.85 to 1.0) has energetic electromagnetic heat shimmer
          if (dist < 0.82 || dist > 1.0) discard;

          float rim = smoothstep(0.82, 0.94, dist) * smoothstep(1.0, 0.94, dist);
          float shimmer = sin(atan(center.y, center.x) * 12.0 + uTime * 8.0) * 0.15;
          float alpha = (rim + shimmer) * uProgress * uIntensity * 0.65;

          vec3 color = mix(vec3(1.0, 0.55, 0.12), vec3(1.0, 0.95, 0.7), rim);
          gl_FragColor = vec4(color * 1.5, alpha);
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
    ejectMaterial.uniforms.uTime.value = t;
    apertureMat.uniforms.uTime.value = t;

    // Portal progress active between [0.07, 0.24]
    let pLocal = 0;
    let intensity = 1.0;

    if (progress < 0.07) {
      pLocal = 0;
      intensity = 0;
    } else if (progress >= 0.07 && progress <= 0.15) {
      pLocal = (progress - 0.07) / 0.08;
      intensity = pLocal;
    } else if (progress > 0.15 && progress <= 0.20) {
      pLocal = 1.0;
      intensity = 1.0; // Peak vortex during camera pass
    } else if (progress > 0.20 && progress <= 0.26) {
      pLocal = 1.0;
      intensity = Math.max(0, 1.0 - (progress - 0.20) / 0.06); // Fade behind camera
    } else {
      pLocal = 0;
      intensity = 0;
    }

    streakMaterial.uniforms.uProgress.value = pLocal;
    streakMaterial.uniforms.uIntensity.value = intensity;

    ejectMaterial.uniforms.uProgress.value = pLocal;
    ejectMaterial.uniforms.uIntensity.value = intensity;

    apertureMat.uniforms.uProgress.value = pLocal;
    apertureMat.uniforms.uIntensity.value = intensity;
    rearMat.opacity = 0.6 * intensity;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Front & Mid Directional Spark Streaks */}
      <lineSegments ref={streaksRef} geometry={streakGeo} material={streakMaterial} />

      {/* Ballistic Shedding Embers */}
      <lineSegments ref={ejectingRef} geometry={ejectGeo} material={ejectMaterial} />

      {/* Rear Filaments */}
      <lineSegments ref={rearFilamentsRef} geometry={rearGeo} material={rearMat} />

      {/* Refraction Heat Shimmer Aperture Rim (Transparent Interior) */}
      <mesh ref={apertureRef} position={[0, 0, 0]}>
        <planeGeometry args={[5.2, 5.2]} />
        <primitive object={apertureMat} attach="material" />
      </mesh>
    </group>
  );
}
