"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SectionWipe({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-[1px] overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Background faint guide line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Laser sweep animation triggered on view */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-1/3 h-full bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_15px_rgba(57,255,136,0.9)]"
      />
    </div>
  );
}
