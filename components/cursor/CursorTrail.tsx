"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  char: string;
  opacity: number;
  vy: number;
  vx: number;
  size: number;
  color: string;
}

const TRAIL_CHARS = ["0", "1", "x", "F", "7", "A", "λ", "Ω", "Δ", "B", "9", "4"];
const TRAIL_COLORS = ["#39ff88", "#c6ff3d", "#3d7bff", "#f4eeff"];

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run on desktop with fine mouse pointer
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 15) {
        lastX = e.clientX;
        lastY = e.clientY;

        const char = TRAIL_CHARS[Math.floor(Math.random() * TRAIL_CHARS.length)];
        const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];

        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          char,
          opacity: 0.65,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -0.6 - Math.random() * 0.5,
          size: Math.floor(Math.random() * 3) + 10,
          color,
        });

        // Cap array to prevent buildup
        if (particles.length > 35) {
          particles.shift();
        }
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const render = () => {
      animId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.024;

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillText(p.char, p.x, p.y);
      }
      ctx.globalAlpha = 1;
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[45] select-none"
      aria-hidden="true"
    />
  );
}
