"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionDividerProps {
  label?: string;
  className?: string;
}

export default function SectionDivider({
  label,
  className = "",
}: SectionDividerProps) {
  return (
    <div className={`relative max-w-7xl mx-auto px-6 sm:px-8 py-8 ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Left gradient line */}
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-accent/30" />

        {/* Center Node / Coordinate Badge */}
        {label ? (
          <div className="px-4 py-1 mx-4 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-ink-dim uppercase tracking-widest flex items-center gap-2 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span>{label}</span>
          </div>
        ) : (
          <div className="w-2 h-2 mx-4 rotate-45 border border-accent/60 bg-accent/20" />
        )}

        {/* Right gradient line */}
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/10 to-accent/30" />

        {/* Animated scanning pulse line */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
          className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-accent/60 to-transparent pointer-events-none blur-[1px]"
        />
      </div>
    </div>
  );
}
