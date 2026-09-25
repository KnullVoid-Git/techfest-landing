"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-white/[0.04]">
      <motion.div
        className="h-full bg-gradient-to-r from-accent via-accent-lime to-cyber-blue origin-left shadow-[0_0_12px_rgba(57,255,136,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
