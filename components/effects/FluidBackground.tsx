"use client";

import React, { useEffect, useRef } from "react";

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    let clock = 0;
    const render = () => {
      animId = requestAnimationFrame(render);
      clock += 0.006;

      ctx.clearRect(0, 0, width, height);

      // Orb 1: Neon Emerald
      const x1 = width * 0.45 + Math.cos(clock) * (width * 0.22);
      const y1 = height * 0.35 + Math.sin(clock * 1.2) * (height * 0.18);
      const rad1 = Math.min(width, height) * 0.48;

      const grad1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, rad1);
      grad1.addColorStop(0, "rgba(57, 255, 136, 0.05)");
      grad1.addColorStop(0.5, "rgba(57, 255, 136, 0.015)");
      grad1.addColorStop(1, "transparent");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Orb 2: Cyber Violet
      const x2 = width * 0.55 + Math.sin(clock * 0.8) * (width * 0.25);
      const y2 = height * 0.65 + Math.cos(clock * 0.9) * (height * 0.2);
      const rad2 = Math.min(width, height) * 0.52;

      const grad2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, rad2);
      grad2.addColorStop(0, "rgba(155, 92, 255, 0.04)");
      grad2.addColorStop(0.6, "rgba(61, 123, 255, 0.01)");
      grad2.addColorStop(1, "transparent");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-20 select-none"
      aria-hidden="true"
    />
  );
}
