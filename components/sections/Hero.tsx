"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Terminal, ShieldCheck, Zap } from "lucide-react";
import RevealText from "../ui/RevealText";
import GlitchText from "../ui/GlitchText";
import Countdown from "../ui/Countdown";
import MagneticButton from "../ui/MagneticButton";
import ParticleField from "../effects/ParticleField";
import CyberCore from "../3d/CyberCore";
import { useLenis } from "@/lib/useLenis";

export default function Hero() {
  const { scrollTo } = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-6 sm:px-8 overflow-hidden text-center"
    >
      {/* Interactive Constellation Particle Field */}
      <ParticleField particleCount={60} />

      {/* Ambient background light orbs with Parallax */}
      <motion.div
        style={{ y: backgroundY, scale: orbScale }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[400px] bg-gradient-to-tr from-accent/15 via-cyber-violet/10 to-transparent rounded-full blur-[110px] pointer-events-none -z-10"
      />
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-2/3 right-10 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[90px] pointer-events-none -z-10"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-6 shadow-sm cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-xs font-mono tracking-widest uppercase text-ink-muted">
            REGISTRATIONS OPEN // <span className="text-accent font-semibold">OCTOBER 24-26, 2026</span>
          </span>
        </motion.div>

        {/* Big Kinetic Hero Headline with Glitch Trigger */}
        <div className="space-y-1 sm:space-y-2 mb-4">
          <div className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-ink uppercase">
            <GlitchText text="SYNAPSE 2026" />
          </div>
          <RevealText
            text="THE INTER-COLLEGIATE CYBER HEIST"
            tag="h2"
            delay={0.4}
            stagger={0.03}
            inViewTrigger={false}
            className="font-display font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-lime to-cyber-blue"
          />
        </div>

        {/* 3D Holographic Quantum Core */}
        <CyberCore className="my-1 sm:my-2 max-w-md mx-auto" />

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-base sm:text-lg text-ink-muted leading-relaxed mb-8"
        >
          48 hours of high-stakes exploitation, quantum ciphers, binary pwn, and on-ground physical puzzle trails. Crack the grid, capture the flags, and claim the ₹5,00,000 vault.
        </motion.p>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <Countdown targetDate="2026-10-24T09:00:00Z" />
        </motion.div>

        {/* Dual Magnetic CTAs with whileTap Haptics */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center"
        >
          <MagneticButton strength={0.3} radius={70} className="w-full sm:w-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("#register")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent text-bg font-display font-extrabold text-sm sm:text-base uppercase tracking-wider hover:bg-accent-lime shadow-[0_0_35px_rgba(57,255,136,0.35)] hover:shadow-[0_0_45px_rgba(57,255,136,0.5)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </MagneticButton>

          <MagneticButton strength={0.3} radius={70} className="w-full sm:w-auto">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("#tracks")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-ink border border-white/15 hover:border-accent/50 font-display font-bold text-sm sm:text-base uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Tracks</span>
              <Zap className="w-4 h-4 text-accent" />
            </motion.button>
          </MagneticButton>
        </motion.div>

        {/* Quick Highlights bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-ink-dim"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>OPEN TO ALL COLLEGES</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent" />
            <span>TEAMS OF 1-4 OPERATIVES</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>₹5,00,000 PRIZE POOL</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Hint (Hugo Stawiarski homage with animated sliding line) */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-14 sm:mt-20 inline-flex flex-col items-center gap-2 text-ink-dim hover:text-accent transition-colors cursor-pointer group"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">SCROLL TO EXPLORE</span>
        <div className="w-[1px] h-9 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-full h-1/2 bg-accent"
          />
        </div>
      </motion.button>
    </section>
  );
}
