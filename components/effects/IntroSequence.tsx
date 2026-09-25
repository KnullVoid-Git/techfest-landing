"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, Cpu } from "lucide-react";

const BOOT_LOGS = [
  "INITIALIZING SYNAPSE_SECURE_KERNEL v4.2...",
  "VERIFYING CRYPTOGRAPHIC OPERATIVE SIGNATURE...",
  "BYPASSING LOCAL PROXY & INFILTRATING CAMPUS GRID...",
  "VAULT ACCESS GRANTED: [0x500000_INR_CONFIRMED]",
  "ESTABLISHING HIGH-BANDWIDTH MESH UPLINK...",
  "SYNAPSE 2026 // SYSTEM ONLINE",
];

export default function IntroSequence() {
  const [visible, setVisible] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if intro has already run this session
    const seen = sessionStorage.getItem("synapse_intro_dismissed");
    if (seen) return;

    setVisible(true);

    // Lock body scrolling during boot
    document.body.style.overflow = "hidden";

    // Progress ticker
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);

    // Line ticker
    const logInterval = setInterval(() => {
      setCurrentLineIndex((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          return prev + 1;
        }
        clearInterval(logInterval);
        return prev;
      });
    }, 280);

    // Auto dismiss after ~2.4 seconds
    const dismissTimeout = setTimeout(() => {
      handleDismiss();
    }, 2400);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearTimeout(dismissTimeout);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("synapse_intro_dismissed", "true");
    document.body.style.overflow = "";
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#060609] flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden cursor-pointer"
          onClick={handleDismiss}
        >
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#39ff8808_1px,transparent_1px),linear-gradient(to_bottom,#39ff8808_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* CRT Horizontal Scanline Bar */}
          <motion.div
            animate={{ y: ["-100%", "1000%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent/[0.04] to-transparent pointer-events-none"
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs font-mono text-accent">
              <Terminal className="w-4 h-4 animate-pulse" />
              <span className="font-bold tracking-widest uppercase">BOOTLOADER // SYNAPSE-STAGE-0</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="px-3.5 py-1.5 rounded-full border border-white/10 hover:border-accent/50 bg-white/[0.03] text-[11px] font-mono uppercase tracking-widest text-ink-muted hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <span>SKIP [ESC]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            </button>
          </div>

          {/* Center Diagnostic Terminal Box */}
          <div className="relative z-10 max-w-xl mx-auto w-full space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                <Cpu className="w-5 h-5 animate-spin" style={{ animationDuration: "8s" }} />
              </div>
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-ink tracking-tight">
                  SYNAPSE <span className="text-accent">2026</span>
                </h1>
                <p className="text-[11px] font-mono text-ink-dim tracking-wider uppercase">
                  INTER-COLLEGIATE CYBER HEIST PROTOCOL
                </p>
              </div>
            </div>

            {/* Terminal Lines Stream */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs sm:text-sm space-y-2 min-h-[140px] shadow-2xl backdrop-blur-md">
              {BOOT_LOGS.slice(0, currentLineIndex + 1).map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-start gap-2 text-ink-dim leading-snug"
                >
                  <span className="text-accent select-none font-bold">&gt;</span>
                  <span className={i === currentLineIndex ? "text-accent font-semibold" : "text-ink-muted"}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Decryption Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-ink-dim">
                <span>GRID DECRYPTION STATUS</span>
                <span className="text-accent font-bold">{Math.min(100, progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-accent-lime rounded-full shadow-[0_0_12px_rgba(57,255,136,0.8)]"
                  style={{ width: `${Math.min(100, progress)}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar: Telemetry Hint */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-ink-dim">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-accent" />
              <span>SECURE PROTOCOL ACTIVE // 256-BIT QUANTUM CIPHER</span>
            </div>
            <span>CLICK ANYWHERE OR PRESS ESC TO ENTER</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
