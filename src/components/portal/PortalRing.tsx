"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface PortalRingProps {
  progress: number; // 0 to 1 (formation) and beyond
  isPassingThrough: boolean;
  onEntered: () => void;
}

export function PortalRing({ progress, isPassingThrough, onEntered }: PortalRingProps) {
  const { camera } = useThree();
  const streaksRef = useRef<THREE.LineSegments>(null);
  const ejectingRef = useRef<THREE.LineSegments>(null);
  const filamentsRef = useRef<THREE.LineSegments>(null);
  const coreSparksRef = useRef<THREE.Points>(null);
  const embersRef = useRef<THREE.Points>(null);
  const apertureRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const enteredTriggered = useRef(false);

  // =========================================================================
  // LAYER A: DIRECTIONAL SPARK STREAKS (LineSegments, 3200 streaks = 6400 vertices)
  // Each streak is rendered as a directional vector: tail -> head (------>)
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
    const aStream = new Float32Array(STREAK_COUNT * 2);
    const aPhase = new Float32Array(STREAK_COUNT * 2);
    const aHotness = new Float32Array(STREAK_COUNT * 2);

    for (let i = 0; i < STREAK_COUNT; i++) {
      const idx = i * 2;
      // Distribute along circumference with slight irregularity
      const angle = (i / STREAK_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.22;
      // Turbulent band from radius 2.18 to 2.68
      const radius = 2.40 + (Math.random() - 0.5) * 0.44;
      // Volumetric Z dispersion: sparks pass in front of and behind ring plane
      const zOffset = (Math.random() - 0.5) * 0.45;
      // Shearing speed: inner particles orbit faster than outer particles
      const speed = 3.6 + (2.7 - radius) * 4.2 + Math.random() * 2.2;
      // Streak length: 0.12 to 0.40 radians along circumference
      const length = 0.12 + Math.random() * 0.28;

      // Stream assignment for staged assembly
      // 0: Initial spark & first arc [0, 0.45]
      // 1: Second arc opposite side [0.45, 0.70]
      // 2: Bridging streams [0.70, 1.00]
      // 3: Full-circumference energy fill [1.00+]
      let stream = 3;
      const normAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (normAngle < Math.PI * 0.65) {
        stream = 0;
      } else if (normAngle > Math.PI * 0.95 && normAngle < Math.PI * 1.65) {
        stream = 1;
      } else if (normAngle >= Math.PI * 0.65 && normAngle <= Math.PI * 0.95) {
        stream = 2;
      }

      const phase = Math.random() * Math.PI * 2;
      const hotness = 0.45 + Math.random() * 0.55;

      // Tail vertex (0)
      aAngle[idx] = angle;
      aRadius[idx] = radius;
      aZOffset[idx] = zOffset;
      aSpeed[idx] = speed;
      aLength[idx] = length;
      aHeadTail[idx] = 0.0;
      aStream[idx] = stream;
      aPhase[idx] = phase;
      aHotness[idx] = hotness;

      // Head vertex (1)
      aAngle[idx + 1] = angle;
      aRadius[idx + 1] = radius;
      aZOffset[idx + 1] = zOffset;
      aSpeed[idx + 1] = speed;
      aLength[idx + 1] = length;
      aHeadTail[idx + 1] = 1.0;
      aStream[idx + 1] = stream;
      aPhase[idx + 1] = phase;
      aHotness[idx + 1] = hotness;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aAngle", new THREE.BufferAttribute(aAngle, 1));
    geo.setAttribute("aRadius", new THREE.BufferAttribute(aRadius, 1));
    geo.setAttribute("aZOffset", new THREE.BufferAttribute(aZOffset, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aLength", new THREE.BufferAttribute(aLength, 1));
    geo.setAttribute("aHeadTail", new THREE.BufferAttribute(aHeadTail, 1));
    geo.setAttribute("aStream", new THREE.BufferAttribute(aStream, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    geo.setAttribute("aHotness", new THREE.BufferAttribute(aHotness, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        attribute float aAngle;
        attribute float aRadius;
        attribute float aZOffset;
        attribute float aSpeed;
        attribute float aLength;
        attribute float aHeadTail;
        attribute float aStream;
        attribute float aPhase;
        attribute float aHotness;

        uniform float uTime;
        uniform float uProgress;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Staged assembly logic based on uProgress:
          // 0.00-0.10: single spark
          // 0.10-0.45: first arc (Stream 0)
          // 0.45-0.70: second arc (Stream 1)
          // 0.70-1.00: bridging arcs (Stream 2)
          // 1.00-1.45: full ring closing (Stream 3)
          float activation = 0.0;
          if (aStream < 0.5) {
            activation = smoothstep(0.02, 0.35, uProgress);
          } else if (aStream < 1.5) {
            activation = smoothstep(0.35, 0.65, uProgress);
          } else if (aStream < 2.5) {
            activation = smoothstep(0.60, 0.88, uProgress);
          } else {
            activation = smoothstep(0.85, 1.00, uProgress);
          }

          // Tangential orbital travel
          float speedMod = aSpeed * (0.85 + 0.65 * clamp(uProgress, 0.0, 1.5));
          float theta = aAngle + speedMod * uTime;

          // Multi-frequency harmonic turbulence
          float turb = sin(theta * 4.0 - uTime * 3.5 + aPhase) * 0.075
                     + cos(theta * 9.0 + uTime * 4.8) * 0.045
                     + sin(theta * 15.0 - uTime * 8.0) * 0.025;
          float r = aRadius + turb;

          // Streak offset: Head is at theta, Tail is behind by aLength
          float vertexTheta = (aHeadTail > 0.5) ? theta : (theta - aLength);

          float x = cos(vertexTheta) * r;
          float y = sin(vertexTheta) * r;
          float z = aZOffset + sin(theta * 3.0 + uTime * 2.5) * 0.05;

          // Moving Hotspots (temperature waves around ring)
          float wave1 = sin(theta * 2.0 - uTime * 3.8);
          float wave2 = cos(theta * 5.0 + uTime * 2.4);
          float wave3 = sin(theta * 1.0 - uTime * 1.5);
          float heat = clamp(0.48 + 0.32 * wave1 + 0.20 * wave2 + 0.15 * wave3, 0.0, 1.0) * aHotness;

          // Physical Energy Color Temperature Ramp:
          // Outer/cooler: #e84a16 = vec3(0.91, 0.29, 0.09)
          // Main energy:  #ff7a1a = vec3(1.0, 0.48, 0.10)
          // Hot gold:     #ffb632 = vec3(1.0, 0.71, 0.20)
          // Core white:   #fff2c2 = vec3(1.0, 0.95, 0.76)
          vec3 cCool = vec3(0.91, 0.29, 0.09);
          vec3 cMain = vec3(1.00, 0.48, 0.10);
          vec3 cHot  = vec3(1.00, 0.71, 0.20);
          vec3 cCore = vec3(1.00, 0.95, 0.76);

          vec3 baseCol = mix(cCool, cMain, smoothstep(0.0, 0.4, heat));
          baseCol = mix(baseCol, cHot, smoothstep(0.4, 0.75, heat));
          baseCol = mix(baseCol, cCore, smoothstep(0.75, 1.0, heat));

          // Head is white-hot and bright, tail trails off into deep orange
          if (aHeadTail > 0.5) {
            vColor = mix(baseCol, cCore, 0.45);
            vAlpha = activation * (0.65 + 0.35 * heat);
          } else {
            vColor = mix(cCool, baseCol, 0.25);
            vAlpha = activation * 0.12 * heat;
          }

          // Occasional electric cyan accent sparks
          if (mod(aAngle * 17.0 + uTime * 7.0, 12.0) < 0.22 && uProgress > 0.6) {
            vColor = vec3(0.35, 0.88, 1.0);
            vAlpha = activation * 0.95;
          }

          // Extra energy surge above progress 1.0
          if (uProgress > 1.0) {
            vAlpha *= min(1.0 + (uProgress - 1.0) * 0.5, 1.5);
          }

          vec4 mvPos = modelViewMatrix * vec4(x, y, z, 1.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          if (vAlpha < 0.01) discard;
          gl_FragColor = vec4(vColor, vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return [geo, mat];
  }, []);

  // =========================================================================
  // LAYER C: SPARK SHEDDING / OUTWARD EJECTION (900 ejecting ballistic sparks)
  // Sparks break free tangentially, drift outward with drag & gravity decay
  // =========================================================================
  const EJECT_COUNT = 900;
  const [ejectGeo, ejectMaterial] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(EJECT_COUNT * 2 * 3);
    const aSpawnAngle = new Float32Array(EJECT_COUNT * 2);
    const aSpawnRadius = new Float32Array(EJECT_COUNT * 2);
    const aTanSpeed = new Float32Array(EJECT_COUNT * 2);
    const aRadSpeed = new Float32Array(EJECT_COUNT * 2);
    const aDuration = new Float32Array(EJECT_COUNT * 2);
    const aTimeOffset = new Float32Array(EJECT_COUNT * 2);
    const aHeadTail = new Float32Array(EJECT_COUNT * 2);
    const aZSpeed = new Float32Array(EJECT_COUNT * 2);

    for (let i = 0; i < EJECT_COUNT; i++) {
      const idx = i * 2;
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.40 + (Math.random() - 0.5) * 0.15;
      const tanSpeed = 4.5 + Math.random() * 4.5;
      const radSpeed = 0.8 + Math.random() * 2.8;
      const duration = 0.45 + Math.random() * 0.65;
      const timeOffset = Math.random() * 20.0;
      const zSpeed = (Math.random() - 0.5) * 1.2;

      // Tail
      aSpawnAngle[idx] = angle;
      aSpawnRadius[idx] = radius;
      aTanSpeed[idx] = tanSpeed;
      aRadSpeed[idx] = radSpeed;
      aDuration[idx] = duration;
      aTimeOffset[idx] = timeOffset;
      aHeadTail[idx] = 0.0;
      aZSpeed[idx] = zSpeed;

      // Head
      aSpawnAngle[idx + 1] = angle;
      aSpawnRadius[idx + 1] = radius;
      aTanSpeed[idx + 1] = tanSpeed;
      aRadSpeed[idx + 1] = radSpeed;
      aDuration[idx + 1] = duration;
      aTimeOffset[idx + 1] = timeOffset;
      aHeadTail[idx + 1] = 1.0;
      aZSpeed[idx + 1] = zSpeed;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSpawnAngle", new THREE.BufferAttribute(aSpawnAngle, 1));
    geo.setAttribute("aSpawnRadius", new THREE.BufferAttribute(aSpawnRadius, 1));
    geo.setAttribute("aTanSpeed", new THREE.BufferAttribute(aTanSpeed, 1));
    geo.setAttribute("aRadSpeed", new THREE.BufferAttribute(aRadSpeed, 1));
    geo.setAttribute("aDuration", new THREE.BufferAttribute(aDuration, 1));
    geo.setAttribute("aTimeOffset", new THREE.BufferAttribute(aTimeOffset, 1));
    geo.setAttribute("aHeadTail", new THREE.BufferAttribute(aHeadTail, 1));
    geo.setAttribute("aZSpeed", new THREE.BufferAttribute(aZSpeed, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        attribute float aSpawnAngle;
        attribute float aSpawnRadius;
        attribute float aTanSpeed;
        attribute float aRadSpeed;
        attribute float aDuration;
        attribute float aTimeOffset;
        attribute float aHeadTail;
        attribute float aZSpeed;

        uniform float uTime;
        uniform float uProgress;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Shedding intensifies as portal gathers energy (progress > 0.35)
          float activation = smoothstep(0.35, 0.90, uProgress);

          // Compute particle lifecycle
          float age = mod(uTime + aTimeOffset, aDuration);
          // Tail evaluates at slightly earlier age for streak stretch
          float tailLag = 0.045;
          float evalAge = (aHeadTail > 0.5) ? age : max(0.0, age - tailLag);
          float normAge = evalAge / aDuration; // 0.0 (birth) to 1.0 (death)

          // Initial position on ring circumference
          vec3 p0 = vec3(cos(aSpawnAngle) * aSpawnRadius, sin(aSpawnAngle) * aSpawnRadius, 0.0);

          // Tangential velocity vector: (-sin(theta), cos(theta))
          vec3 vTan = vec3(-sin(aSpawnAngle), cos(aSpawnAngle), 0.0) * aTanSpeed;
          // Radial velocity vector: (cos(theta), sin(theta))
          vec3 vRad = vec3(cos(aSpawnAngle), sin(aSpawnAngle), 0.0) * aRadSpeed;
          vec3 vZ = vec3(0.0, 0.0, aZSpeed);
          vec3 v0 = vTan + vRad + vZ;

          // Ballistic aerodynamic drag: displacement = v0 * (1 - exp(-k * t)) / k
          float dragK = 2.4;
          float dragFactor = (1.0 - exp(-dragK * evalAge)) / dragK;
          // Slight downward gravity drift: 0.5 * g * t^2
          vec3 gravity = vec3(0.0, -0.75, 0.0) * (0.5 * evalAge * evalAge);

          vec3 pos = p0 + v0 * dragFactor + gravity;

          // Temperature decay over lifetime:
          // Birth: white-hot -> Mid: gold -> Late: deep orange -> Death: fade
          vec3 cBirth = vec3(1.00, 0.96, 0.85); // warm white
          vec3 cMid   = vec3(1.00, 0.68, 0.15); // gold
          vec3 cLate  = vec3(0.88, 0.25, 0.05); // fiery red-orange

          if (normAge < 0.35) {
            vColor = mix(cBirth, cMid, normAge / 0.35);
          } else {
            vColor = mix(cMid, cLate, (normAge - 0.35) / 0.65);
          }

          // Alpha fadeout towards death
          float lifeFade = 1.0 - smoothstep(0.65, 1.0, normAge);
          // Tail is slightly dimmer than head
          float headTailFade = (aHeadTail > 0.5) ? 1.0 : 0.3;
          vAlpha = activation * lifeFade * headTailFade * 0.85;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          if (vAlpha < 0.01) discard;
          gl_FragColor = vec4(vColor, vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return [geo, mat];
  }, []);

  // =========================================================================
  // LAYER D: LONG ARC FILAMENTS (24 curved plasma streams spanning 40°-120°)
  // Multi-segment lines snaking through the vortex
  // =========================================================================
  const FILAMENT_COUNT = 24;
  const SEGMENTS_PER_FILAMENT = 32;
  const [filamentGeo, filamentMaterial] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const totalVerts = FILAMENT_COUNT * SEGMENTS_PER_FILAMENT * 2;
    const positions = new Float32Array(totalVerts * 3);
    const aFilamentId = new Float32Array(totalVerts);
    const aParam = new Float32Array(totalVerts); // 0 to 1 along filament
    const aSpeed = new Float32Array(totalVerts);
    const aBaseAngle = new Float32Array(totalVerts);
    const aArcLength = new Float32Array(totalVerts);
    const aBaseRadius = new Float32Array(totalVerts);

    let idx = 0;
    for (let f = 0; f < FILAMENT_COUNT; f++) {
      const baseAngle = (f / FILAMENT_COUNT) * Math.PI * 2;
      const arcLength = 0.7 + Math.random() * 1.4; // 40° to 80° arc
      const baseRadius = 2.36 + (Math.random() - 0.5) * 0.25;
      const speed = 2.2 + Math.random() * 2.8;

      for (let s = 0; s < SEGMENTS_PER_FILAMENT; s++) {
        const u1 = s / SEGMENTS_PER_FILAMENT;
        const u2 = (s + 1) / SEGMENTS_PER_FILAMENT;

        // Vertex 1 of segment
        aFilamentId[idx] = f;
        aParam[idx] = u1;
        aSpeed[idx] = speed;
        aBaseAngle[idx] = baseAngle;
        aArcLength[idx] = arcLength;
        aBaseRadius[idx] = baseRadius;
        idx++;

        // Vertex 2 of segment
        aFilamentId[idx] = f;
        aParam[idx] = u2;
        aSpeed[idx] = speed;
        aBaseAngle[idx] = baseAngle;
        aArcLength[idx] = arcLength;
        aBaseRadius[idx] = baseRadius;
        idx++;
      }
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aFilamentId", new THREE.BufferAttribute(aFilamentId, 1));
    geo.setAttribute("aParam", new THREE.BufferAttribute(aParam, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aBaseAngle", new THREE.BufferAttribute(aBaseAngle, 1));
    geo.setAttribute("aArcLength", new THREE.BufferAttribute(aArcLength, 1));
    geo.setAttribute("aBaseRadius", new THREE.BufferAttribute(aBaseRadius, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        attribute float aFilamentId;
        attribute float aParam;
        attribute float aSpeed;
        attribute float aBaseAngle;
        attribute float aArcLength;
        attribute float aBaseRadius;

        uniform float uTime;
        uniform float uProgress;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float act = smoothstep(0.20 + aFilamentId * 0.02, 0.90, uProgress);

          float angleStart = aBaseAngle + aSpeed * uTime;
          float theta = angleStart + aParam * aArcLength;

          float wave = sin(theta * 3.0 + uTime * 4.0 + aFilamentId) * 0.08
                     + cos(theta * 7.0 - uTime * 3.0) * 0.04;
          float r = aBaseRadius + wave;

          float x = cos(theta) * r;
          float y = sin(theta) * r;
          float z = sin(theta * 2.0 + aFilamentId) * 0.08;

          float heat = sin(theta * 2.0 - uTime * 3.0) * 0.4 + 0.6;
          vec3 cOrange = vec3(1.0, 0.45, 0.08);
          vec3 cGold   = vec3(1.0, 0.78, 0.22);
          vec3 cCore   = vec3(1.0, 0.96, 0.75);

          vColor = mix(cOrange, cGold, aParam);
          if (heat > 0.8) vColor = mix(vColor, cCore, 0.5);

          float taper = sin(aParam * 3.14159);
          vAlpha = act * taper * 0.75 * heat;

          vec4 mvPos = modelViewMatrix * vec4(x, y, z, 1.0);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          if (vAlpha < 0.01) discard;
          gl_FragColor = vec4(vColor, vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return [geo, mat];
  }, []);

  // =========================================================================
  // LAYER B & E: HOT CORE BEADS & VOLUMETRIC EMBERS (Points Shader)
  // =========================================================================
  const SPARK_POINTS_COUNT = 1400;
  const [sparkPointsGeo, sparkPointsMat] = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(SPARK_POINTS_COUNT * 3);
    const aAngle = new Float32Array(SPARK_POINTS_COUNT);
    const aRadius = new Float32Array(SPARK_POINTS_COUNT);
    const aSpeed = new Float32Array(SPARK_POINTS_COUNT);
    const aSize = new Float32Array(SPARK_POINTS_COUNT);
    const aType = new Float32Array(SPARK_POINTS_COUNT); // 0 = core spark, 1 = floating ember
    const aZOffset = new Float32Array(SPARK_POINTS_COUNT);

    for (let i = 0; i < SPARK_POINTS_COUNT; i++) {
      const isEmber = i > 1000;
      aAngle[i] = Math.random() * Math.PI * 2;
      aRadius[i] = isEmber ? 1.8 + Math.random() * 1.5 : 2.38 + (Math.random() - 0.5) * 0.3;
      aSpeed[i] = isEmber ? 0.8 + Math.random() * 1.2 : 4.0 + Math.random() * 5.0;
      aSize[i] = isEmber ? 20.0 + Math.random() * 25.0 : 35.0 + Math.random() * 45.0;
      aType[i] = isEmber ? 1.0 : 0.0;
      aZOffset[i] = isEmber ? (Math.random() - 0.5) * 2.2 : (Math.random() - 0.5) * 0.4;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aAngle", new THREE.BufferAttribute(aAngle, 1));
    geo.setAttribute("aRadius", new THREE.BufferAttribute(aRadius, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute("aType", new THREE.BufferAttribute(aType, 1));
    geo.setAttribute("aZOffset", new THREE.BufferAttribute(aZOffset, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        attribute float aAngle;
        attribute float aRadius;
        attribute float aSpeed;
        attribute float aSize;
        attribute float aType;
        attribute float aZOffset;

        uniform float uTime;
        uniform float uProgress;

        varying vec3 vColor;
        varying float vAlpha;
        varying float vType;

        void main() {
          vType = aType;
          float act = smoothstep(0.1, 0.9, uProgress);

          float theta = aAngle + aSpeed * uTime;
          float turb = sin(theta * 5.0 - uTime * 4.0) * 0.06;
          float r = aRadius + turb;

          float x = cos(theta) * r;
          float y = sin(theta) * r;
          float z = aZOffset + sin(theta * 2.0 + uTime) * 0.08;

          if (aType < 0.5) {
            vColor = vec3(1.0, 0.92, 0.72);
            vAlpha = act * (0.7 + 0.3 * sin(theta * 8.0 + uTime * 12.0));
          } else {
            vColor = vec3(1.0, 0.48, 0.12);
            vAlpha = act * (0.35 + 0.25 * sin(uTime * 3.0 + aAngle));
          }

          vec4 mvPos = modelViewMatrix * vec4(x, y, z, 1.0);
          gl_PointSize = (aSize * act) * (1.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vType;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float core = exp(-36.0 * dist * dist) * 1.6;
          float glow = exp(-8.0 * dist * dist) * 0.8;
          float intensity = core + glow;

          gl_FragColor = vec4(vColor * intensity, vAlpha * smoothstep(0.5, 0.1, dist));
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return [geo, mat];
  }, []);

  // =========================================================================
  // PORTAL APERTURE & EVENT HORIZON GATEWAY
  // =========================================================================
  const apertureMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPos;
        void main() {
          vUv = uv;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        varying vec2 vUv;
        varying vec3 vPos;

        void main() {
          vec2 centered = vUv - vec2(0.5);
          float dist = length(centered) * 2.0;
          if (dist > 1.0) discard;

          float angle = atan(centered.y, centered.x);
          float swirl = sin(angle * 6.0 - uTime * 2.5 + dist * 8.0);

          float rimDistortion = smoothstep(0.65, 0.98, dist);
          vec3 rimColor = vec3(1.0, 0.52, 0.12) * rimDistortion * (0.8 + 0.4 * swirl);

          float depthNoise = sin(centered.x * 24.0 + uTime * 0.2) * cos(centered.y * 24.0 - uTime * 0.3);
          float stars = step(0.97, depthNoise) * 0.6;
          vec3 cosmicVoid = vec3(0.02, 0.04, 0.08) + vec3(0.12, 0.35, 0.65) * stars;

          vec3 finalColor = mix(cosmicVoid, rimColor, rimDistortion);

          float openFactor = smoothstep(0.40, 1.00, uProgress);
          float alpha = openFactor * (0.85 * rimDistortion + 0.35 * (1.0 - rimDistortion));

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // =========================================================================
  // ANIMATION LOOP (useFrame)
  // =========================================================================
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (streakMaterial) {
      streakMaterial.uniforms.uTime.value = time;
      streakMaterial.uniforms.uProgress.value = progress;
    }
    if (ejectMaterial) {
      ejectMaterial.uniforms.uTime.value = time;
      ejectMaterial.uniforms.uProgress.value = progress;
    }
    if (filamentMaterial) {
      filamentMaterial.uniforms.uTime.value = time;
      filamentMaterial.uniforms.uProgress.value = progress;
    }
    if (sparkPointsMat) {
      sparkPointsMat.uniforms.uTime.value = time;
      sparkPointsMat.uniforms.uProgress.value = progress;
    }
    if (apertureMaterial) {
      apertureMaterial.uniforms.uTime.value = time;
      apertureMaterial.uniforms.uProgress.value = progress;
    }

    if (lightRef.current) {
      const flicker =
        Math.sin(time * 18.0) * 2.2 +
        Math.cos(time * 31.0) * 1.6 +
        Math.sin(time * 47.0) * 0.8;
      const baseIntensity = progress * 14.0;
      lightRef.current.intensity = Math.max(0, baseIntensity + flicker * progress);
    }

    if (isPassingThrough) {
      camera.position.z = THREE.MathUtils.damp(camera.position.z, -2.8, 3.4, delta);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 4.0, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 0, 4.0, delta);

      if (camera.position.z < 0.15 && !enteredTriggered.current) {
        enteredTriggered.current = true;
        onEntered();
      }
    } else {
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 5.5, 2.0, delta);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 3.0, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 0, 3.0, delta);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <lineSegments ref={streaksRef} geometry={streakGeo} material={streakMaterial} />
      <lineSegments ref={ejectingRef} geometry={ejectGeo} material={ejectMaterial} />
      <lineSegments ref={filamentsRef} geometry={filamentGeo} material={filamentMaterial} />
      <points ref={coreSparksRef} geometry={sparkPointsGeo} material={sparkPointsMat} />

      <mesh ref={apertureRef} position={[0, 0, -0.05]} material={apertureMaterial}>
        <circleGeometry args={[2.28, 64]} />
      </mesh>

      <mesh position={[0, 0, -0.15]}>
        <circleGeometry args={[2.24, 48]} />
        <meshBasicMaterial color="#04070c" transparent opacity={Math.min(progress * 0.92, 0.95)} />
      </mesh>

      <pointLight
        ref={lightRef}
        position={[0, 0, 0.6]}
        color="#ff7a1a"
        distance={14}
        decay={2}
      />
      <pointLight
        position={[0, 0, -0.8]}
        color="#ffb632"
        intensity={progress * 6.0}
        distance={10}
        decay={2}
      />
      <pointLight
        position={[0, 0, 0.2]}
        color="#43d8ff"
        intensity={progress > 0.6 ? 3.0 : 0.0}
        distance={8}
        decay={2}
      />
    </group>
  );
}
