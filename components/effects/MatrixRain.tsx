"use client";

import React, { useEffect, useRef } from "react";

interface MatrixRainProps {
  className?: string;
  opacity?: number;
  fontSize?: number;
}

const GLYPHS = "010101ABCDEF0123456789λΩΔΨΞΣ0x7F//<>!{}*+~#%";

export default function MatrixRain({
  className = "",
  opacity = 0.07,
  fontSize = 13,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -50)
    );

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * -50)
      );
    };

    window.addEventListener("resize", onResize);

    let lastFrame = 0;
    const fpsInterval = 1000 / 28; // ~28 fps for classic retro feel

    const render = (time: number) => {
      animId = requestAnimationFrame(render);

      const elapsed = time - lastFrame;
      if (elapsed < fpsInterval) return;
      lastFrame = time - (elapsed % fpsInterval);

      // Semi-transparent fade background to create trailing effect
      ctx.fillStyle = "rgba(8, 8, 12, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading char is brighter
        if (Math.random() > 0.88) {
          ctx.fillStyle = "#ffffff";
        } else {
          ctx.fillStyle = "#39ff88";
        }

        ctx.fillText(char, x, y);

        // Reset drop to top with randomized delay once it falls off screen
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [fontSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
