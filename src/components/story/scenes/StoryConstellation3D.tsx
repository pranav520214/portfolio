"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StoryConstellation3DProps {
  progress: number; // 0.0 to 1.0
}

// 34 Languages with authentic 3D volumetric coordinates
// Foreground: Z in [+1.5, +4.5] (surrounds viewer)
// Midground: Z in [-0.8, +0.8] (primary constellation plane)
// Background: Z in [-2.0, -7.0] (deep space field)
const SPATIAL_STARS = [
  // =========================================================================
  // CENTER ANCHOR (Depth: 0.0)
  // =========================================================================
  { id: "namaste", script: "नमस्ते", translit: "NAMASTE", pos: [0, 0, 0], color: "#FFFFFF", size: 9.0, tier: "center" },

  // =========================================================================
  // INNER LAYER: MAJOR INDIAN LANGUAGES (Radius ~2.0 - 3.2, Z: -0.8 to +0.8)
  // =========================================================================
  { id: "sanskrit", script: "नमो नमः", translit: "NAMO NAMAH", pos: [0, 2.2, 0.2], color: "#FFD166", size: 5.5, tier: "inner" },
  { id: "tamil", script: "வணக்கம்", translit: "VANAKKAM", pos: [0.4, -2.6, -0.3], color: "#FBBF24", size: 5.8, tier: "inner" },
  { id: "telugu", script: "నమస్కారం", translit: "NAMASKARAM", pos: [2.5, -1.5, 0.4], color: "#F59E0B", size: 5.6, tier: "inner" },
  { id: "bengali", script: "নমস্কার", translit: "NOMOSHKAR", pos: [2.8, 1.2, -0.4], color: "#38BDF8", size: 5.8, tier: "inner" },
  { id: "marathi", script: "नमस्कार", translit: "NAMASKAR", pos: [-2.4, -0.8, 0.3], color: "#F97316", size: 5.6, tier: "inner" },
  { id: "gujarati", script: "નમસ્તે", translit: "NAMASTE", pos: [-2.6, 0.9, -0.2], color: "#FB923C", size: 5.4, tier: "inner" },
  { id: "kannada", script: "ನಮಸ್ಕಾರ", translit: "NAMASKARA", pos: [-1.5, -2.2, 0.5], color: "#EAB308", size: 5.4, tier: "inner" },
  { id: "malayalam", script: "നമസ്കാരം", translit: "NAMASKARAM", pos: [-0.6, -3.2, -0.5], color: "#FCD34D", size: 5.2, tier: "inner" },
  { id: "punjabi", script: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ", translit: "SAT SRI AKAL", pos: [-1.8, 2.4, 0.3], color: "#FFAA33", size: 5.2, tier: "inner" },
  { id: "urdu", script: "آداب", translit: "AADAAB", pos: [-0.9, 1.5, -0.3], color: "#34D399", size: 5.0, tier: "inner" },

  // =========================================================================
  // FOREGROUND VOLUMETRIC STARS (Z: +1.5 to +4.5 — Passes very close to camera)
  // =========================================================================
  { id: "english", script: "HELLO", translit: "HELLO", pos: [-3.2, 2.0, 2.8], color: "#FFFFFF", size: 6.2, tier: "foreground" },
  { id: "mandarin", script: "你好", translit: "NI HAO", pos: [3.8, 2.5, 3.2], color: "#E0E7FF", size: 6.0, tier: "foreground" },
  { id: "spanish", script: "HOLA", translit: "HOLA", pos: [-3.8, -2.4, 2.5], color: "#E0E7FF", size: 5.8, tier: "foreground" },
  { id: "french", script: "BONJOUR", translit: "BONJOUR", pos: [-4.2, -1.0, 3.8], color: "#E0E7FF", size: 5.8, tier: "foreground" },
  { id: "arabic", script: "مرحباً", translit: "MARHABAN", pos: [-4.0, 2.8, 1.8], color: "#E0E7FF", size: 5.6, tier: "foreground" },
  { id: "japanese", script: "こんにちは", translit: "KONNICHIWA", pos: [4.4, -1.8, 2.2], color: "#E0E7FF", size: 5.8, tier: "foreground" },

  // =========================================================================
  // MIDGROUND & OUTER REGIONAL LANGUAGES (Radius 3.5 - 5.5, Z: -1.2 to +1.0)
  // =========================================================================
  { id: "odia", script: "ନମସ୍କାର", translit: "NAMASKARA", pos: [3.4, -0.8, -0.6], color: "#7DD3FC", size: 4.8, tier: "outer" },
  { id: "assamese", script: "নমস্কাৰ", translit: "NOMOSKAR", pos: [4.2, 1.0, -0.8], color: "#67E8F9", size: 4.6, tier: "outer" },
  { id: "kashmiri", script: "سلام", translit: "SALAAM", pos: [-1.2, 3.8, -0.9], color: "#93C5FD", size: 4.6, tier: "outer" },
  { id: "dogri", script: "नमस्ते", translit: "NAMASTE", pos: [0.8, 3.6, -0.8], color: "#FFB066", size: 4.5, tier: "outer" },
  { id: "maithili", script: "प्रणाम", translit: "PRANAAM", pos: [2.0, 2.0, -0.5], color: "#F472B6", size: 4.6, tier: "outer" },
  { id: "bhojpuri", script: "प्रणाम", translit: "PRANAAM", pos: [1.4, 1.2, -0.4], color: "#FB7185", size: 4.6, tier: "outer" },
  { id: "santali", script: "ᱡᱚᱦᱟᱨ", translit: "JOHAR", pos: [4.0, -0.2, -0.8], color: "#A78BFA", size: 4.4, tier: "outer" },
  { id: "nepali", script: "नमस्ते", translit: "NAMASTE", pos: [2.6, 3.2, -0.7], color: "#C084FC", size: 4.4, tier: "outer" },
  { id: "konkani", script: "नमस्कारू", translit: "NAMASKARU", pos: [-3.2, -2.8, -0.6], color: "#FDE047", size: 4.4, tier: "outer" },
  { id: "sindhi", script: "ادا", translit: "ADAAB", pos: [-4.2, 1.2, -0.8], color: "#818CF8", size: 4.2, tier: "outer" },
  { id: "manipuri", script: "ꯈꯨꯔꯨᱢꯖꯔꯤ", translit: "KHURUMJARI", pos: [5.0, 0.2, -0.9], color: "#2DD4BF", size: 4.4, tier: "outer" },
  { id: "bodo", script: "खुलुमबाय", translit: "KHULUMBAY", pos: [4.2, 2.4, -0.8], color: "#6EE7B7", size: 4.2, tier: "outer" },

  // =========================================================================
  // BACKGROUND DEEP SPACE STARS (Z: -2.5 to -6.5)
  // =========================================================================
  { id: "russian", script: "ЗДРАВСТВУЙТЕ", translit: "ZDRAVSTVUYTE", pos: [-2.0, 5.2, -3.5], color: "#CBD5E1", size: 4.0, tier: "background" },
  { id: "german", script: "HALLO", translit: "HALLO", pos: [-4.5, 4.2, -4.0], color: "#CBD5E1", size: 4.0, tier: "background" },
  { id: "swahili", script: "HABARI", translit: "HABARI", pos: [-0.5, -5.5, -4.5], color: "#CBD5E1", size: 4.0, tier: "background" },
  { id: "portuguese", script: "OLÁ", translit: "OLA", pos: [-5.8, -0.6, -3.8], color: "#CBD5E1", size: 4.0, tier: "background" },
  { id: "korean", script: "안녕하세요", translit: "ANNYEONG", pos: [5.4, -3.8, -4.2], color: "#CBD5E1", size: 4.0, tier: "background" },
  { id: "turkish", script: "MERHABA", translit: "MERHABA", pos: [3.2, -5.0, -5.0], color: "#CBD5E1", size: 4.0, tier: "background" },
];

export function StoryConstellation3D({ progress }: StoryConstellation3DProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // 1. Star points geometry
  const [pointGeo] = useMemo(() => {
    const count = SPATIAL_STARS.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    SPATIAL_STARS.forEach((node, i) => {
      const idx = i * 3;
      positions[idx] = node.pos[0];
      positions[idx + 1] = node.pos[1];
      positions[idx + 2] = node.pos[2];

      const c = new THREE.Color(node.color);
      colors[idx] = c.r;
      colors[idx + 1] = c.g;
      colors[idx + 2] = c.b;

      sizes[i] = node.size;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return [geo];
  }, []);

  // 2. Spatial connecting lines between hierarchical nodes
  const lineGeo = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < SPATIAL_STARS.length; i++) {
      const pA = SPATIAL_STARS[i].pos;
      // Connect to central Namaste if in inner tier
      if (SPATIAL_STARS[i].tier === "inner") {
        lines.push(pA[0], pA[1], pA[2], 0, 0, 0);
      }
      // Connect to neighbors within 3.2 units
      for (let j = i + 1; j < SPATIAL_STARS.length; j++) {
        const pB = SPATIAL_STARS[j].pos;
        const dist = Math.hypot(pA[0] - pB[0], pA[1] - pB[1], pA[2] - pB[2]);
        if (dist < 3.2 && SPATIAL_STARS[i].tier !== "background" && SPATIAL_STARS[j].tier !== "background") {
          lines.push(pA[0], pA[1], pA[2], pB[0], pB[1], pB[2]);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(lines, 3));
    return geo;
  }, []);

  // 3. Shader Material with tangential swirl collapse into Portal
  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorphProgress: { value: 0 },
        uGlobalAlpha: { value: 1.0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uMorphProgress;
        uniform float uGlobalAlpha;

        void main() {
          vColor = color;
          vec3 pos = position;

          // Tangential swirl acceleration during transition to portal [0.06, 0.16]
          if (uMorphProgress > 0.0) {
            float angle = atan(pos.y, pos.x);
            float r = length(pos.xy);
            // Differential rotation: inner stars accelerate faster
            float speed = 3.5 + (4.0 - min(r, 3.5)) * 4.5;
            float newAngle = angle + uMorphProgress * speed * 3.0;
            
            // Constrain radius toward portal vortex perimeter (r = 2.4)
            float targetR = 2.40 + (r - 2.40) * (1.0 - uMorphProgress);
            pos.x = cos(newAngle) * targetR;
            pos.y = sin(newAngle) * targetR;
            // Compress Z depth toward portal plane Z = 0
            pos.z = pos.z * (1.0 - uMorphProgress) + sin(newAngle * 3.0 + uTime * 4.0) * 0.25 * uMorphProgress;
            
            // Metamorphic heat: diamond white shifts to high-temperature plasma gold/orange
            vec3 plasmaColor = vec3(1.0, 0.58, 0.12);
            vColor = mix(vColor, plasmaColor, uMorphProgress * 0.95);
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (240.0 / -mvPosition.z) * (1.0 + sin(uTime * 3.0 + position.x) * 0.2);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = uGlobalAlpha;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;

          // Diamond optical core with wide luminous diffraction halo
          float core = smoothstep(0.15, 0.0, dist);
          float halo = smoothstep(0.5, 0.0, dist) * 0.75;
          float alpha = (core + halo) * vAlpha;

          gl_FragColor = vec4(vColor * 1.8, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color("#4370AA"),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    starMaterial.uniforms.uTime.value = t;

    // Metamorphic transition into Portal: active when progress is in [0.06, 0.18]
    let morphP = 0;
    if (progress > 0.05 && progress < 0.18) {
      morphP = (progress - 0.05) / (0.18 - 0.05);
    } else if (progress >= 0.18) {
      morphP = 1.0;
    }
    starMaterial.uniforms.uMorphProgress.value = Math.min(1.0, morphP);

    // Fade out smoothly as camera surges through portal aperture into hero space
    let alpha = 1.0;
    if (progress > 0.18) {
      alpha = Math.max(0, 1.0 - (progress - 0.18) / 0.05);
    }
    starMaterial.uniforms.uGlobalAlpha.value = alpha;
    lineMaterial.opacity = 0.35 * alpha * (1.0 - morphP * 0.9);
  });

  return (
    <group position={[0, 0, 0]}>
      <lineSegments ref={linesRef} geometry={lineGeo} material={lineMaterial} />
      <points ref={pointsRef} geometry={pointGeo} material={starMaterial} />
    </group>
  );
}
