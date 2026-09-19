"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConstellationIntroProps {
  onComplete: () => void;
}

interface LanguageStar {
  id: string;
  lang: string;
  script: string;
  translit: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  birthTime: number; // seconds
  isAnchor?: boolean;
  isCenter?: boolean;
  accentColor: string;
  pulseColor: string;
  group: "indic-core" | "indic-north" | "indic-south" | "indic-east" | "indic-west" | "global-east" | "global-west" | "global-euro";
}

// 34 Languages: All 22 Scheduled Indian Languages + Major World Languages
const LANGUAGES: LanguageStar[] = [
  // ==========================================
  // CENTRAL ANCHOR: HINDI / SANSKRIT NAMASTE
  // ==========================================
  {
    id: "hindi-namaste",
    lang: "Hindi / Official",
    script: "नमस्ते",
    translit: "NAMASTE",
    x: 50,
    y: 50,
    size: 4.2,
    birthTime: 0.15,
    isAnchor: true,
    isCenter: true,
    accentColor: "#FFFFFF",
    pulseColor: "#FF9933",
    group: "indic-core",
  },
  {
    id: "sanskrit",
    lang: "Sanskrit",
    script: "नमो नमः",
    translit: "NAMO NAMAH",
    x: 50,
    y: 41,
    size: 2.8,
    birthTime: 0.45,
    accentColor: "#FFD166",
    pulseColor: "#FFD166",
    group: "indic-core",
  },

  // ==========================================
  // INDIC LANGUAGES: NORTH & NORTH-WEST
  // ==========================================
  {
    id: "punjabi",
    lang: "Punjabi",
    script: "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ",
    translit: "SAT SRI AKAL",
    x: 40,
    y: 36,
    size: 2.6,
    birthTime: 0.65,
    accentColor: "#FFAA33",
    pulseColor: "#FFAA33",
    group: "indic-north",
  },
  {
    id: "kashmiri",
    lang: "Kashmiri",
    script: "سلام",
    translit: "SALAAM",
    x: 45,
    y: 28,
    size: 2.4,
    birthTime: 0.75,
    accentColor: "#93C5FD",
    pulseColor: "#93C5FD",
    group: "indic-north",
  },
  {
    id: "dogri",
    lang: "Dogri",
    script: "नमस्ते",
    translit: "NAMASTE",
    x: 52,
    y: 29,
    size: 2.2,
    birthTime: 0.85,
    accentColor: "#FFB066",
    pulseColor: "#FFB066",
    group: "indic-north",
  },
  {
    id: "nepali",
    lang: "Nepali",
    script: "नमस्ते",
    translit: "NAMASTE",
    x: 58,
    y: 31,
    size: 2.4,
    birthTime: 0.95,
    accentColor: "#F87171",
    pulseColor: "#F87171",
    group: "indic-north",
  },
  {
    id: "maithili",
    lang: "Maithili",
    script: "प्रणाम",
    translit: "PRANAM",
    x: 57,
    y: 39,
    size: 2.4,
    birthTime: 1.05,
    accentColor: "#FBBF24",
    pulseColor: "#FBBF24",
    group: "indic-north",
  },
  {
    id: "urdu",
    lang: "Urdu",
    script: "آداب",
    translit: "AADAAB",
    x: 38,
    y: 44,
    size: 2.6,
    birthTime: 0.8,
    accentColor: "#34D399",
    pulseColor: "#34D399",
    group: "indic-west",
  },
  {
    id: "sindhi",
    lang: "Sindhi",
    script: "نمستي",
    translit: "NAMASTE",
    x: 33,
    y: 49,
    size: 2.2,
    birthTime: 0.9,
    accentColor: "#F472B6",
    pulseColor: "#F472B6",
    group: "indic-west",
  },

  // ==========================================
  // INDIC LANGUAGES: WEST & CENTRAL
  // ==========================================
  {
    id: "gujarati",
    lang: "Gujarati",
    script: "નમસ્તે",
    translit: "NAMASTE",
    x: 37,
    y: 55,
    size: 2.6,
    birthTime: 0.95,
    accentColor: "#FB923C",
    pulseColor: "#FB923C",
    group: "indic-west",
  },
  {
    id: "marathi",
    lang: "Marathi",
    script: "नमस्कार",
    translit: "NAMASKAR",
    x: 43,
    y: 59,
    size: 2.8,
    birthTime: 1.05,
    accentColor: "#FF8C38",
    pulseColor: "#FF8C38",
    group: "indic-west",
  },
  {
    id: "konkani",
    lang: "Konkani",
    script: "नमस्कार",
    translit: "NAMASKAR",
    x: 40,
    y: 66,
    size: 2.2,
    birthTime: 1.15,
    accentColor: "#FCD34D",
    pulseColor: "#FCD34D",
    group: "indic-south",
  },

  // ==========================================
  // INDIC LANGUAGES: SOUTH (DRAVIDIAN)
  // ==========================================
  {
    id: "kannada",
    lang: "Kannada",
    script: "ನಮಸ್ಕಾರ",
    translit: "NAMASKARA",
    x: 45,
    y: 69,
    size: 2.6,
    birthTime: 1.25,
    accentColor: "#67E8F9",
    pulseColor: "#67E8F9",
    group: "indic-south",
  },
  {
    id: "telugu",
    lang: "Telugu",
    script: "నమస్కారం",
    translit: "NAMASKARAM",
    x: 52,
    y: 68,
    size: 2.8,
    birthTime: 1.35,
    accentColor: "#4ADE80",
    pulseColor: "#4ADE80",
    group: "indic-south",
  },
  {
    id: "tamil",
    lang: "Tamil",
    script: "வணக்கம்",
    translit: "VANAKKAM",
    x: 57,
    y: 66,
    size: 3.0,
    birthTime: 1.4,
    accentColor: "#FACC15",
    pulseColor: "#FACC15",
    group: "indic-south",
  },
  {
    id: "malayalam",
    lang: "Malayalam",
    script: "നമസ്കാരം",
    translit: "NAMASKARAM",
    x: 48,
    y: 76,
    size: 2.6,
    birthTime: 1.5,
    accentColor: "#2DD4BF",
    pulseColor: "#2DD4BF",
    group: "indic-south",
  },

  // ==========================================
  // INDIC LANGUAGES: EAST & NORTH-EAST
  // ==========================================
  {
    id: "bengali",
    lang: "Bengali",
    script: "নমস্কার",
    translit: "NOMOSHKAR",
    x: 63,
    y: 47,
    size: 3.0,
    birthTime: 1.0,
    accentColor: "#F59E0B",
    pulseColor: "#F59E0B",
    group: "indic-east",
  },
  {
    id: "assamese",
    lang: "Assamese",
    script: "নমস্কাৰ",
    translit: "NOMOSKAR",
    x: 71,
    y: 43,
    size: 2.6,
    birthTime: 1.1,
    accentColor: "#FBBF24",
    pulseColor: "#FBBF24",
    group: "indic-east",
  },
  {
    id: "odia",
    lang: "Odia",
    script: "ନମସ୍କାର",
    translit: "NAMASKARA",
    x: 64,
    y: 56,
    size: 2.6,
    birthTime: 1.2,
    accentColor: "#FB923C",
    pulseColor: "#FB923C",
    group: "indic-east",
  },
  {
    id: "santali",
    lang: "Santali",
    script: "ᱡᱚᱦᱟᱨ",
    translit: "JOHAR",
    x: 62,
    y: 63,
    size: 2.2,
    birthTime: 1.3,
    accentColor: "#E879F9",
    pulseColor: "#E879F9",
    group: "indic-east",
  },
  {
    id: "bodo",
    lang: "Bodo",
    script: "खुलुमबाय",
    translit: "KHULUMBAI",
    x: 68,
    y: 36,
    size: 2.2,
    birthTime: 1.35,
    accentColor: "#FDE047",
    pulseColor: "#FDE047",
    group: "indic-east",
  },
  {
    id: "manipuri",
    lang: "Manipuri",
    script: "ꯈꯨꯔꯨꯝꯖꯔꯤ",
    translit: "KHURUMJARI",
    x: 74,
    y: 50,
    size: 2.4,
    birthTime: 1.45,
    accentColor: "#F472B6",
    pulseColor: "#F472B6",
    group: "indic-east",
  },

  // ==========================================
  // MAJOR GLOBAL LANGUAGES (OUTER CONSTELLATION)
  // ==========================================
  {
    id: "english",
    lang: "English",
    script: "HELLO",
    translit: "GLOBAL // AI",
    x: 20,
    y: 22,
    size: 3.4,
    birthTime: 1.6,
    isAnchor: true,
    accentColor: "#BAE6FD",
    pulseColor: "#38BDF8",
    group: "global-west",
  },
  {
    id: "russian",
    lang: "Russian",
    script: "ЗДРАВСТВУЙТЕ",
    translit: "ZDRAVSTVUYTE",
    x: 28,
    y: 16,
    size: 2.6,
    birthTime: 1.7,
    accentColor: "#E0E7FF",
    pulseColor: "#818CF8",
    group: "global-west",
  },
  {
    id: "arabic",
    lang: "Arabic",
    script: "مَرْحَبًا",
    translit: "MARHABAN",
    x: 22,
    y: 36,
    size: 3.2,
    birthTime: 1.75,
    isAnchor: true,
    accentColor: "#6EE7B7",
    pulseColor: "#10B981",
    group: "global-west",
  },
  {
    id: "turkish",
    lang: "Turkish",
    script: "MERHABA",
    translit: "MERHABA",
    x: 18,
    y: 50,
    size: 2.4,
    birthTime: 1.85,
    accentColor: "#FDA4AF",
    pulseColor: "#F43F5E",
    group: "global-west",
  },
  {
    id: "mandarin",
    lang: "Mandarin Chinese",
    script: "你好",
    translit: "NI HAO",
    x: 82,
    y: 20,
    size: 3.4,
    birthTime: 1.65,
    isAnchor: true,
    accentColor: "#FCA5A5",
    pulseColor: "#EF4444",
    group: "global-east",
  },
  {
    id: "japanese",
    lang: "Japanese",
    script: "こんにちは",
    translit: "KONNICHIWA",
    x: 88,
    y: 33,
    size: 2.8,
    birthTime: 1.75,
    accentColor: "#FED7AA",
    pulseColor: "#F97316",
    group: "global-east",
  },
  {
    id: "korean",
    lang: "Korean",
    script: "안녕하세요",
    translit: "ANNYEONGHASEYO",
    x: 85,
    y: 58,
    size: 2.8,
    birthTime: 1.85,
    accentColor: "#A7F3D0",
    pulseColor: "#34D399",
    group: "global-east",
  },
  {
    id: "french",
    lang: "French",
    script: "BONJOUR",
    translit: "BIENVENUE",
    x: 78,
    y: 74,
    size: 3.2,
    birthTime: 1.8,
    isAnchor: true,
    accentColor: "#93C5FD",
    pulseColor: "#3B82F6",
    group: "global-euro",
  },
  {
    id: "german",
    lang: "German",
    script: "HALLO",
    translit: "WILLKOMMEN",
    x: 68,
    y: 82,
    size: 2.6,
    birthTime: 1.9,
    accentColor: "#FDE047",
    pulseColor: "#EAB308",
    group: "global-euro",
  },
  {
    id: "spanish",
    lang: "Spanish",
    script: "HOLA",
    translit: "BIENVENIDO",
    x: 24,
    y: 72,
    size: 3.0,
    birthTime: 1.8,
    isAnchor: true,
    accentColor: "#FDE68A",
    pulseColor: "#F59E0B",
    group: "global-west",
  },
  {
    id: "portuguese",
    lang: "Portuguese",
    script: "OLÁ",
    translit: "BEM-VINDO",
    x: 30,
    y: 82,
    size: 2.6,
    birthTime: 1.9,
    accentColor: "#A7F3D0",
    pulseColor: "#10B981",
    group: "global-west",
  },
  {
    id: "indonesian",
    lang: "Indonesian",
    script: "HALO",
    translit: "SELAMAT DATANG",
    x: 38,
    y: 84,
    size: 2.4,
    birthTime: 1.95,
    accentColor: "#FED7AA",
    pulseColor: "#F97316",
    group: "global-west",
  },
];

export function ConstellationIntro({ onComplete }: ConstellationIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  // Check reduced motion or repeat visits
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const hasSeen = sessionStorage.getItem("ag_intro_seen");
    if (hasSeen === "true") {
      setFadeOut(true);
      const t = setTimeout(() => onComplete(), 250);
      return () => clearTimeout(t);
    }
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    sessionStorage.setItem("ag_intro_seen", "true");
    setFadeOut(true);
    setTimeout(() => {
      onComplete();
    }, 250);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();
    window.addEventListener("resize", resize);

    // Precalculate connecting line edges between nodes
    const lines: { from: number; to: number; birthTime: number; pulseColor: string }[] = [];
    const centerIdx = 0; // Hindi Namaste is at index 0

    // Connect center Namaste radially to all regional Indic nodes
    for (let i = 1; i < LANGUAGES.length; i++) {
      const star = LANGUAGES[i];
      // All Indic languages connect directly to center Namaste hub
      if (star.group.startsWith("indic")) {
        lines.push({
          from: centerIdx,
          to: i,
          birthTime: star.birthTime - 0.15,
          pulseColor: star.pulseColor,
        });
      }
    }

    // Connect adjacent Indic nodes within their groups to form constellations
    for (let i = 1; i < LANGUAGES.length; i++) {
      for (let j = i + 1; j < LANGUAGES.length; j++) {
        if (LANGUAGES[i].group === LANGUAGES[j].group) {
          const dx = LANGUAGES[i].x - LANGUAGES[j].x;
          const dy = LANGUAGES[i].y - LANGUAGES[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 15) {
            lines.push({
              from: i,
              to: j,
              birthTime: Math.max(LANGUAGES[i].birthTime, LANGUAGES[j].birthTime) + 0.1,
              pulseColor: LANGUAGES[i].pulseColor,
            });
          }
        }
      }
    }

    // Connect Global hubs to nearest Indic nodes
    const globalBridges = [
      { globalId: "english", indicId: "punjabi" },
      { globalId: "russian", indicId: "kashmiri" },
      { globalId: "arabic", indicId: "urdu" },
      { globalId: "turkish", indicId: "sindhi" },
      { globalId: "mandarin", indicId: "assamese" },
      { globalId: "japanese", indicId: "manipuri" },
      { globalId: "korean", indicId: "bengali" },
      { globalId: "french", indicId: "tamil" },
      { globalId: "german", indicId: "telugu" },
      { globalId: "spanish", indicId: "gujarati" },
      { globalId: "portuguese", indicId: "konkani" },
      { globalId: "indonesian", indicId: "malayalam" },
    ];

    globalBridges.forEach(({ globalId, indicId }) => {
      const gIdx = LANGUAGES.findIndex((l) => l.id === globalId);
      const iIdx = LANGUAGES.findIndex((l) => l.id === indicId);
      if (gIdx !== -1 && iIdx !== -1) {
        lines.push({
          from: iIdx,
          to: gIdx,
          birthTime: LANGUAGES[gIdx].birthTime - 0.2,
          pulseColor: LANGUAGES[gIdx].pulseColor,
        });
      }
    });

    // Background faint stars
    const bgStars: { x: number; y: number; size: number; phase: number }[] = [];
    for (let i = 0; i < 60; i++) {
      bgStars.push({
        x: Math.abs(Math.sin(i * 12.9898) * 100),
        y: Math.abs(Math.cos(i * 78.233) * 100),
        size: 0.6 + Math.abs(Math.sin(i)) * 0.8,
        phase: i * 0.35,
      });
    }

    // ─────────────────────────────────────────────────────────────
    // ANIMATION RENDER LOOP (Canvas 2D)
    // ─────────────────────────────────────────────────────────────
    const render = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = (time - startTimeRef.current) / 1000;

      // Finish intro at 3.7s
      if (elapsed > 3.7 && !fadeOut) {
        setFadeOut(true);
        sessionStorage.setItem("ag_intro_seen", "true");
        setTimeout(() => onComplete(), 300);
        return;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep clean black space background
      ctx.fillStyle = "#020408";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw subtle background starlight field
      for (const bs of bgStars) {
        const twinkle = 0.2 + 0.35 * Math.sin(elapsed * 2.5 + bs.phase);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.beginPath();
        ctx.arc((bs.x / 100) * width, (bs.y / 100) * height, bs.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw thin silver connecting lines with traveling photon pulses
      for (const line of lines) {
        if (elapsed < line.birthTime) continue;
        const starA = LANGUAGES[line.from];
        const starB = LANGUAGES[line.to];
        const ax = (starA.x / 100) * width;
        const ay = (starA.y / 100) * height;
        const bx = (starB.x / 100) * width;
        const by = (starB.y / 100) * height;

        const age = elapsed - line.birthTime;
        const lineProg = Math.min(age / 0.35, 1.0);

        // Interpolated line endpoint during growth
        const curX = ax + (bx - ax) * lineProg;
        const curY = ay + (by - ay) * lineProg;

        // Base thin silver line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        // Traveling light pulse (photon)
        if (lineProg >= 1.0) {
          const pulseT = ((age * 1.6) % 1.0);
          const px = ax + (bx - ax) * pulseT;
          const py = ay + (by - ay) * pulseT;

          ctx.fillStyle = line.pulseColor;
          ctx.shadowColor = line.pulseColor;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(px, py, 1.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 3. Draw Stars & Greeting Nodes
      for (let i = 0; i < LANGUAGES.length; i++) {
        const star = LANGUAGES[i];
        if (elapsed < star.birthTime) continue;

        const age = elapsed - star.birthTime;
        const fadeIn = Math.min(age / 0.35, 1.0);
        const x = (star.x / 100) * width;
        const y = (star.y / 100) * height;

        // Draw star core
        ctx.fillStyle = star.accentColor;
        ctx.shadowColor = star.isCenter ? "#FF9933" : star.pulseColor;
        ctx.shadowBlur = star.isCenter ? 16 : star.isAnchor ? 8 : 3;

        ctx.beginPath();
        const curSize = (star.size * fadeIn) * (star.isCenter ? 1.0 + 0.15 * Math.sin(elapsed * 4.0) : 1.0);
        ctx.arc(x, y, curSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Center Namaste: subtle Indian tricolor concentric rings
        if (star.isCenter) {
          // Saffron ring
          ctx.strokeStyle = "rgba(255, 153, 51, 0.4)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, 14 + Math.sin(elapsed * 3.0) * 2, 0, Math.PI * 2);
          ctx.stroke();

          // Emerald green ring
          ctx.strokeStyle = "rgba(19, 136, 8, 0.35)";
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.arc(x, y, 22 + Math.cos(elapsed * 3.0) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Diffraction spike cross for anchors
        if (star.isAnchor) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * fadeIn})`;
          ctx.lineWidth = 0.8;
          const spikeLen = star.isCenter ? 14 : 7;
          ctx.beginPath();
          ctx.moveTo(x - spikeLen, y);
          ctx.lineTo(x + spikeLen, y);
          ctx.moveTo(x, y - spikeLen);
          ctx.lineTo(x, y + spikeLen);
          ctx.stroke();
        }

        // Render Native Script Greeting & Label
        if (age > 0.1) {
          const textFade = Math.min((age - 0.1) / 0.4, 1.0);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.92 * textFade})`;

          if (star.isCenter) {
            // Central Namaste
            ctx.font = "bold 26px 'Noto Sans Devanagari', 'Devanagari MT', system-ui, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(star.script, x, y - 18);

            ctx.font = "bold 10px ui-monospace, monospace";
            ctx.fillStyle = `rgba(255, 153, 51, ${0.95 * textFade})`;
            ctx.fillText("NAMASTE // CENTRAL ANCHOR", x, y + 26);
          } else if (star.isAnchor) {
            // Regional Major Hubs
            ctx.font = "bold 15px system-ui, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(star.script, x, y - 9);

            ctx.font = "9px ui-monospace, monospace";
            ctx.fillStyle = `rgba(148, 163, 184, ${0.85 * textFade})`;
            ctx.fillText(star.translit, x, y + 14);
          } else {
            // Surrounding Nodes: compact clean rendering
            ctx.font = "12px system-ui, sans-serif";
            ctx.textAlign = x > width * 0.5 ? "left" : "right";
            const xOffset = x > width * 0.5 ? 8 : -8;
            ctx.fillText(star.script, x + xOffset, y + 4);

            // Small language name tag
            ctx.font = "8px ui-monospace, monospace";
            ctx.fillStyle = `rgba(100, 116, 139, ${0.75 * textFade})`;
            ctx.fillText(star.lang, x + xOffset, y + 13);
          }
        }
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete, fadeOut]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-0 z-[99999] bg-[#020408] overflow-hidden select-none cursor-pointer"
        onClick={handleSkip}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Top Header HUD Telemetry */}
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] bg-[#0A0E17]/80 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>GLOBAL MULTI-LANGUAGE CONSTELLATION // 34 NATIVE NODES</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="pointer-events-auto font-mono text-xs text-[#94A3B8] hover:text-[#F1F5F9] bg-[#0A0E17]/80 hover:bg-[#121824] border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Skip introduction"
          >
            [ SKIP ✕ ]
          </button>
        </div>

        {/* Bottom Subtitle / Guidance */}
        <div className="absolute bottom-6 left-0 right-0 z-20 text-center font-mono text-[10px] text-[#64748B] tracking-wider uppercase pointer-events-none">
          CENTRAL INDIC ANCHOR // ALL 22 SCHEDULED LANGUAGES + GLOBAL CORRESPONDENCES
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
