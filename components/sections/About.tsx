"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Trophy, Users, Clock, ArrowUpRight } from "lucide-react";
import RevealText from "../ui/RevealText";

interface StatProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  subtext: string;
  icon: React.ReactNode;
}

function StatCounter({ label, value, prefix = "", suffix = "", subtext, icon }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-accent/40 transition-colors group overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          {label}
        </span>
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-ink-muted group-hover:text-accent group-hover:border-accent/30 transition-all">
          {icon}
        </div>
      </div>

      <div className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-2 group-hover:text-accent transition-colors">
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </div>

      <p className="text-xs font-mono text-ink-dim uppercase tracking-wider">
        {subtext}
      </p>

      {/* Hover glow */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section id="about" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto relative">
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          // 01. INTEL BRIEFING
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 sm:mb-24">
        {/* Left Column: Big Headline */}
        <div className="lg:col-span-6">
          <RevealText
            text="WHERE CODE COLLIDES WITH AN ALTERNATE REALITY HUNT"
            tag="h2"
            delay={0.1}
            stagger={0.04}
            className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.05]"
          />
        </div>

        {/* Right Column: Narrative Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 space-y-6 text-base sm:text-lg text-ink-muted leading-relaxed"
        >
          <p>
            <strong className="text-ink font-semibold">SYNAPSE 2026</strong> is not a standard sit-at-your-desk hackathon. Engineered as a hybrid Capture The Flag and physical treasure hunt, it challenges participants to solve digital zero-days while deciphering cryptographic breadcrumbs scattered across real-world checkpoints.
          </p>
          <p>
            From reverse-engineering compiled firmware to exploiting vulnerable smart contracts, parsing sat-comm radio logs, and interrogating adversarial neural nets — every solve advances your team through the encrypted campus grid.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-accent">
            <span className="px-3 py-1 rounded-full border border-accent/30 bg-accent/10">
              HYBRID CTF + ARG TRAIL
            </span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-ink-muted">
              JEOPARDY + ATTACK-DEFENSE
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4 Animated Stat Callouts */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCounter
          label="Prize Pool"
          value={500000}
          prefix="₹"
          suffix="+"
          subtext="Cash Rewards & Sponsor Bounties"
          icon={<Trophy className="w-4 h-4" />}
        />
        <StatCounter
          label="Competition Time"
          value={48}
          suffix=" Hours"
          subtext="Non-stop Continuous Infiltration"
          icon={<Clock className="w-4 h-4" />}
        />
        <StatCounter
          label="Participants"
          value={1200}
          suffix="+"
          subtext="Over 300 Selected Teams"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCounter
          label="Combat Tracks"
          value={6}
          subtext="Deep-dive Specializations"
          icon={<Shield className="w-4 h-4" />}
        />
      </motion.div>
    </section>
  );
}
