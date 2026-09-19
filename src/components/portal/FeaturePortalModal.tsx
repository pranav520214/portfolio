"use client";

import React, { useEffect, useRef } from "react";
import { sounds } from "../audio/SoundSystem";

interface FeaturePortalModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export function FeaturePortalModal({ isOpen, onComplete }: FeaturePortalModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    sounds.playPortalWarp();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const startTime = performance.now();
    const duration = 1400; // 1.4 seconds sharp

    // Generate 400 energetic radial streak particles
    const particles = Array.from({ length: 400 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      const radius = 30 + Math.random() * 180;
      const length = 10 + Math.random() * 30;
      const isOrange = Math.random() > 0.35;
      return { angle, speed, radius, length, isOrange };
    });

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Dark background with fast alpha fade
      ctx.fillStyle = `rgba(7, 7, 8, ${0.2 + progress * 0.4})`;
      ctx.fillRect(0, 0, w, h);

      // Expansion factor
      const ringScale = progress < 0.7 
        ? progress / 0.7 
        : 1.0 + (progress - 0.7) * 2.5;

      ctx.save();
      ctx.translate(cx, cy);

      // Draw particle streaks
      particles.forEach((p) => {
        p.angle += p.speed * 0.03;
        const currentR = p.radius * ringScale;
        const x1 = Math.cos(p.angle) * currentR;
        const y1 = Math.sin(p.angle) * currentR;
        const x2 = Math.cos(p.angle + 0.15) * (currentR + p.length);
        const y2 = Math.sin(p.angle + 0.15) * (currentR + p.length);

        ctx.strokeStyle = p.isOrange ? "#ff5a36" : "#35d9ff";
        ctx.lineWidth = 2;
        ctx.shadowColor = p.isOrange ? "#ff5a36" : "#35d9ff";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Central energetic aperture
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#ff5a36";
      ctx.strokeStyle = "rgba(255, 90, 54, 0.8)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 70 * ringScale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      if (progress < 1.0) {
        animId = requestAnimationFrame(render);
      } else {
        onComplete();
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070708]/90 backdrop-blur-md select-none transition-opacity duration-300">
      <canvas
        ref={canvasRef}
        width={typeof window !== "undefined" ? window.innerWidth : 1200}
        height={typeof window !== "undefined" ? window.innerHeight : 800}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center pointer-events-none text-center">
        <span className="font-mono text-xs text-[#ff5a36] uppercase tracking-[0.3em] font-bold animate-pulse">
          OPENING ENGINEERING SECTOR
        </span>
        <span className="font-mono text-[10px] text-[#a5acb8] tracking-widest mt-1">
          1.2s RAPID APERTURE DILATION
        </span>
      </div>
    </div>
  );
}
