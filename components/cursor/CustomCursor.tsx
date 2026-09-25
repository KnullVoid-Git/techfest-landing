"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<"link" | "card" | "text">("link");
  const [isClicked, setIsClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth cursor lagging ring
  const ringSpringConfig = { stiffness: 220, damping: 22, mass: 0.5 };
  const dotSpringConfig = { stiffness: 700, damping: 35, mass: 0.1 };

  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Check for touch / coarse pointer or reduced motion
    const touchCheck = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (touchCheck || reducedMotion) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Dynamic hover detection
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, select, textarea, [data-cursor]");
      if (interactive) {
        setIsHovered(true);
        const cursorAttr = interactive.getAttribute("data-cursor");
        if (cursorAttr === "card") {
          setHoverType("card");
        } else if (cursorAttr === "text") {
          setHoverType("text");
        } else {
          setHoverType("link");
        }
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleElementHover, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Outer Spring Ring / Morphing Blob */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered
            ? hoverType === "card"
              ? 80
              : 60
            : isClicked
            ? 28
            : 36,
          height: isHovered
            ? hoverType === "card"
              ? 80
              : 60
            : isClicked
            ? 28
            : 36,
          backgroundColor: isHovered
            ? hoverType === "card"
              ? "rgba(57, 255, 136, 0.12)"
              : "rgba(57, 255, 136, 0.22)"
            : "transparent",
          borderColor: isHovered ? "#39ff88" : "rgba(244, 238, 255, 0.4)",
          borderWidth: isHovered ? 1.5 : 1,
          boxShadow: isHovered
            ? "0 0 24px rgba(57, 255, 136, 0.45)"
            : "0 0 0px rgba(0,0,0,0)",
        }}
        transition={{
          duration: 0.22,
          ease: "easeOut",
        }}
      />

      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isHovered ? "#39ff88" : "#f4eeff",
        }}
        animate={{
          scale: isHovered ? 0.4 : isClicked ? 1.4 : 1,
          opacity: isHovered ? 0.8 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
