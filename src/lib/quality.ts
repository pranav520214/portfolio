/**
 * Adaptive Quality System
 * Detects device capability and returns a quality tier.
 * Components use this to scale down WebGL complexity, particle counts,
 * and animation fidelity on lower-end devices.
 */

"use client";

import { useState, useEffect } from "react";

export type QualityTier = "HIGH" | "MEDIUM" | "LOW" | "STATIC";

interface QualityConfig {
  tier: QualityTier;
  dprCap: number;
  constellationNodes: number;
  heroParticles: number;
  enableShaderEdges: boolean;
  enableProjectSway: boolean;
  enableBookPerspective: boolean;
  enableHandsAnimation: boolean;
}

const CONFIGS: Record<QualityTier, QualityConfig> = {
  HIGH: {
    tier: "HIGH",
    dprCap: 1.75,
    constellationNodes: 80,
    heroParticles: 150,
    enableShaderEdges: true,
    enableProjectSway: true,
    enableBookPerspective: true,
    enableHandsAnimation: true,
  },
  MEDIUM: {
    tier: "MEDIUM",
    dprCap: 1.5,
    constellationNodes: 50,
    heroParticles: 80,
    enableShaderEdges: true,
    enableProjectSway: true,
    enableBookPerspective: true,
    enableHandsAnimation: true,
  },
  LOW: {
    tier: "LOW",
    dprCap: 1.0,
    constellationNodes: 30,
    heroParticles: 0,
    enableShaderEdges: false,
    enableProjectSway: false,
    enableBookPerspective: true,
    enableHandsAnimation: false,
  },
  STATIC: {
    tier: "STATIC",
    dprCap: 1.0,
    constellationNodes: 0,
    heroParticles: 0,
    enableShaderEdges: false,
    enableProjectSway: false,
    enableBookPerspective: false,
    enableHandsAnimation: false,
  },
};

function detectTier(): QualityTier {
  if (typeof window === "undefined") return "MEDIUM";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return "STATIC";

  const dpr = window.devicePixelRatio || 1;
  const cores = navigator.hardwareConcurrency || 4;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile || cores < 4) return "LOW";
  if (dpr >= 1.5 && cores >= 8) return "HIGH";
  return "MEDIUM";
}

/**
 * React hook that returns the current quality configuration.
 * Evaluates once on mount; updates if reduced-motion preference changes.
 */
export function useQuality(): QualityConfig {
  const [config, setConfig] = useState<QualityConfig>(CONFIGS.MEDIUM);

  useEffect(() => {
    setConfig(CONFIGS[detectTier()]);

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setConfig(CONFIGS[detectTier()]);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return config;
}

/**
 * Non-hook version for use outside React components (e.g., in R3F useFrame).
 */
export function getQualityTier(): QualityTier {
  return detectTier();
}

export function getQualityConfig(): QualityConfig {
  return CONFIGS[detectTier()];
}
