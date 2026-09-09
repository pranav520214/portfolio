"use client";

import React, { useEffect, useRef } from "react";

export function BlueprintGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Grid properties
    const gridSize = 48;
    let frame = 0;

    const render = () => {
      frame++;
      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Subtle parallax offset based on pointer
      const offsetX = ((mouseX - width / 2) / width) * 25;
      const offsetY = ((mouseY - height / 2) / height) * 25;

      // Draw primary blueprint grid lines
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = "rgba(255, 230, 0, 0.07)";

      const startX = (offsetX % gridSize) - gridSize;
      const startY = (offsetY % gridSize) - gridSize;

      ctx.beginPath();
      for (let x = startX; x < width + gridSize; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = startY; y < height + gridSize; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Major grid lines (every 4 cells)
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(255, 230, 0, 0.15)";
      ctx.beginPath();
      const majorSize = gridSize * 4;
      const majorStartX = (offsetX % majorSize) - majorSize;
      const majorStartY = (offsetY % majorSize) - majorSize;

      for (let x = majorStartX; x < width + majorSize; x += majorSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = majorStartY; y < height + majorSize; y += majorSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw intersection measurement crosshairs and tick marks
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 240, 50, 0.35)";
      for (let x = majorStartX; x < width + majorSize; x += majorSize) {
        for (let y = majorStartY; y < height + majorSize; y += majorSize) {
          // Crosshairs
          ctx.beginPath();
          ctx.moveTo(x - 6, y);
          ctx.lineTo(x + 6, y);
          ctx.moveTo(x, y - 6);
          ctx.lineTo(x, y + 6);
          ctx.stroke();

          // Small coordinate labels on select major nodes
          if ((Math.floor((x - majorStartX) / majorSize) + Math.floor((y - majorStartY) / majorSize)) % 3 === 0) {
            ctx.fillStyle = "rgba(255, 230, 0, 0.22)";
            ctx.font = "8px monospace";
            ctx.fillText(
              `[${Math.round(x + offsetX)},${Math.round(y + offsetY)}]`,
              x + 8,
              y - 4
            );
          }
        }
      }

      // Dynamic interactive targeting crosshair following mouse smoothly
      ctx.strokeStyle = "rgba(255, 230, 0, 0.3)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(mouseX, 0);
      ctx.lineTo(mouseX, height);
      ctx.moveTo(0, mouseY);
      ctx.lineTo(width, mouseY);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep blueprint gradient background matching the artwork */}
      <div className="absolute inset-0 bg-gradient-to-b from-blueprint-red via-[#B72C1C] to-blueprint-950 opacity-95" />
      {/* Vignette & texture shadow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,100,50,0.15)_0%,_rgba(10,3,2,0.75)_85%)]" />
      {/* Live Canvas Grid */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
