"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Medal, Zap, Sparkles, Shield, Cpu } from "lucide-react";
import RevealText from "../ui/RevealText";
import PrizePodium from "../3d/PrizePodium";

interface PrizeTier {
  place: string;
  rank: string;
  amount: string;
  usdEquivalent: string;
  perks: string[];
  highlightColor: string;
  borderColor: string;
  glowColor: string;
  icon: React.ReactNode;
  featured?: boolean;
}

const tiers: PrizeTier[] = [
  {
    place: "2ND PLACE",
    rank: "RUNNER-UP VAULT",
    amount: "₹1,50,000",
    usdEquivalent: "~$1,800 USD",
    perks: [
      "Custom Silver Damascus Steel Cyber Badges",
      "Sponsor Fast-Track Interview Guarantees",
      "₹50,000 Cloud Infrastructure Credits",
      "Premium Hardware Dev Kits (Flipper Zero / SDR)",
    ],
    highlightColor: "text-slate-300",
    borderColor: "border-slate-400/30",
    glowColor: "rgba(203, 213, 225, 0.15)",
    icon: <Medal className="w-7 h-7 text-slate-300" />,
  },
  {
    place: "1ST PLACE",
    rank: "GRAND CHAMPION",
    amount: "₹2,50,000",
    usdEquivalent: "~$3,000 USD",
    perks: [
      "The Synapse Rotating Master Trophy",
      "Direct Final-Round Interviews at Top Cyber Firms",
      "₹1,00,000 AWS & Cloud Security Credits",
      "Hardware Hacking Lab Kit (Proxmark3 + Hak5 Elite)",
      "Exclusive Keynote Presentation at DefCon Chapter",
    ],
    highlightColor: "text-accent",
    borderColor: "border-accent/60",
    glowColor: "rgba(57, 255, 136, 0.25)",
    icon: <Trophy className="w-8 h-8 text-accent" />,
    featured: true,
  },
  {
    place: "3RD PLACE",
    rank: "SECOND RUNNER-UP",
    amount: "₹75,000",
    usdEquivalent: "~$900 USD",
    perks: [
      "Bronze Laser-Etched Plaques",
      "Priority Consideration with Partner VCs & Accelerators",
      "₹25,000 Cloud Security Credits",
      "1-Year Subscriptions to PentesterLab & HTB VIP+",
    ],
    highlightColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.15)",
    icon: <Award className="w-7 h-7 text-amber-400" />,
  },
];

const specialBounties = [
  {
    title: "Fastest First Blood Bounty",
    prize: "₹10,000",
    description: "Awarded to the operative squad with the fastest initial solve on opening morning.",
    icon: Zap,
  },
  {
    title: "Best All-Undergrad / Fresher Squad",
    prize: "₹10,000",
    description: "Highest placed squad consisting entirely of 1st and 2nd year undergraduates.",
    icon: Shield,
  },
  {
    title: "Most Novel Exploit Chain",
    prize: "₹15,000",
    description: "Special jury prize for the most creative zero-dependency exploit and writeup.",
    icon: Cpu,
  },
];

const sponsors = [
  { name: "BinaryShield Systems", tier: "Title Security Partner" },
  { name: "Aether Cloud Defense", tier: "Infrastructure Sponsor" },
  { name: "ZeroDay Foundry", tier: "CTF Platform Sponsor" },
  { name: "QuantumCipher Labs", tier: "Track Sponsor" },
  { name: "Silicon Syndicate", tier: "Hardware Partner" },
];

function PodiumCard({ tier, idx }: { tier: PrizeTier; idx: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = -((y - rect.height / 2) / (rect.height / 2)) * 9;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 9;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -8 : 0}px)`,
          transition: "transform 0.18s ease-out",
        }}
        className={`relative h-full rounded-3xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden cursor-default ${
          tier.featured
            ? "bg-white/[0.04] border-2 border-accent shadow-[0_0_50px_rgba(57,255,136,0.18)] lg:-translate-y-4"
            : `bg-white/[0.02] border ${tier.borderColor} hover:border-white/30`
        }`}
      >
      {tier.featured && (
        <div className="absolute top-0 right-0 bg-accent text-bg text-[10px] font-mono font-black uppercase px-4 py-1.5 rounded-bl-xl tracking-widest flex items-center gap-1 shadow-md">
          <Sparkles className="w-3 h-3" />
          TOP VAULT
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-ink-dim font-semibold">
            {tier.place}
          </span>
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            {tier.icon}
          </div>
        </div>

        <h3 className="font-display font-semibold text-lg text-ink-muted uppercase tracking-wider mb-2">
          {tier.rank}
        </h3>

        <div className="font-display font-black text-4xl sm:text-5xl text-ink tracking-tight mb-1">
          <span className={tier.highlightColor}>{tier.amount}</span>
        </div>
        <span className="font-mono text-xs text-ink-dim block mb-8">
          {tier.usdEquivalent}
        </span>

        <div className="space-y-3 pt-6 border-t border-white/10">
          <span className="text-[11px] font-mono uppercase text-ink-dim tracking-wider block">
            INCLUDED PERKS & BOUNTIES:
          </span>
          {tier.perks.map((perk, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-ink-muted leading-relaxed">
              <span className="text-accent font-bold mt-0.5">•</span>
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-ink-dim">
        <span>PODIUM TIER #{idx + 1}</span>
        <span className="text-accent">VERIFIED VAULT</span>
      </div>
      </div>
    </motion.div>
  );
}

export default function Prizes() {
  return (
    <section id="prizes" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto relative">
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          // 05. THE PRIZE VAULT
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <RevealText
            text="₹5,00,000 IN CASH & BOUNTIES"
            tag="h2"
            delay={0.1}
            stagger={0.04}
            className="font-display font-bold text-3xl sm:text-5xl text-ink tracking-tight"
          />
          <p className="text-base sm:text-lg text-ink-muted mt-3 max-w-xl">
            Hard cash disbursed directly to winning teams, alongside elite hardware pentesting toolkits, cloud credits, and direct interview pipelines.
          </p>
        </div>

        <div className="font-mono text-xs text-accent border border-accent/30 bg-accent/10 px-4 py-2 rounded-xl shrink-0 self-start md:self-end">
          NO VOUCHERS // 100% DIRECT CASH DISBURSEMENT
        </div>
      </div>

      {/* 3D Tiered Trophy Stage */}
      <PrizePodium className="mb-4 sm:mb-8" />

      {/* Podium Cards Grid (2nd, 1st, 3rd) with 3D Tilt */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
        {tiers.map((tier, idx) => (
          <PodiumCard key={tier.place} tier={tier} idx={idx} />
        ))}
      </div>

      {/* Special Category Bounties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {specialBounties.map((bounty, bIdx) => {
          const Icon = bounty.icon;
          return (
            <motion.div
              key={bounty.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: bIdx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-accent/40 transition-colors flex flex-col justify-between cursor-default"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-xl text-accent">
                    {bounty.prize}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-ink mb-1">
                  {bounty.title}
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {bounty.description}
                </p>
              </div>
              <span className="text-[10px] font-mono text-ink-dim mt-4 uppercase tracking-wider">
                CATEGORY BOUNTY
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Sponsors & Partners Infinite Marquee */}
      <div className="p-8 rounded-2xl bg-white/[0.015] border border-white/10 overflow-hidden relative">
        <span className="font-mono text-xs uppercase tracking-widest text-ink-dim block text-center mb-6">
          BACKED BY INDUSTRY SECURITY LEADERS
        </span>

        {/* Gradient edge masks for smooth marquee fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#08080c] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#08080c] to-transparent z-10" />

        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex items-center gap-6 shrink-0"
          >
            {[...sponsors, ...sponsors].map((sp, idx) => (
              <div
                key={`${sp.name}-${idx}`}
                className="w-56 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors text-center shrink-0"
              >
                <span className="font-display font-bold text-sm text-ink block truncate">{sp.name}</span>
                <span className="text-[10px] font-mono text-accent/80 uppercase tracking-wider">{sp.tier}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
