"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, Cpu, Users2 } from "lucide-react";
import AccordionItem from "../ui/AccordionItem";
import RevealText from "../ui/RevealText";

interface Rule {
  id: string;
  badge: string;
  title: string;
  content: React.ReactNode;
}

const rules: Rule[] = [
  {
    id: "team-composition",
    badge: "ELIGIBILITY",
    title: "Team Composition & Eligibility",
    content: (
      <div className="space-y-3">
        <p>
          Teams may consist of <strong>1 to 4 enrolled university or college students</strong>. Cross-college teams are fully permitted and encouraged. All team members must present valid institutional student IDs or enrollment verification at check-in.
        </p>
        <ul className="list-disc list-inside space-y-1 text-ink-muted/90 pl-1">
          <li>One operative designated as Team Captain for official communication.</li>
          <li>Each participant can only be registered with a single squad.</li>
          <li>Undergraduate, postgraduate, and diploma students are all eligible.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "scoring-decay",
    badge: "MECHANICS",
    title: "Scoring Matrix & Dynamic Point Depreciation",
    content: (
      <div className="space-y-3">
        <p>
          SYNAPSE 2026 operates on a <strong>dynamic scoring curve</strong>. All challenges start at 500 points. As more teams submit verified flags, the challenge value depreciates toward a floor of 100 points, rewarding teams who solve esoteric or difficult puzzles.
        </p>
        <ul className="list-disc list-inside space-y-1 text-ink-muted/90 pl-1">
          <li><strong>First Blood:</strong> First team to solve any challenge receives an untouchable +20% bonus bounty.</li>
          <li><strong>Tie-Breaking:</strong> In case of identical points, rank is determined by timestamp of the earlier final solve.</li>
          <li>Flags must follow the standard syntax: <code className="text-accent font-mono">FLAG&#123;secret_string&#125;</code>.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "fair-play",
    badge: "ETHICS",
    title: "Prohibited Actions & Zero-Tolerance Protocols",
    content: (
      <div className="space-y-3">
        <p className="text-red-400 font-semibold">
          Any breach of competition infrastructure ethics results in immediate disqualification and campus blacklisting:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-ink-muted/90 pl-1">
          <li><strong>No Denial of Service (DoS/DDoS):</strong> Flooding platform servers or challenge containers is strictly forbidden. Brute-forcing flags via automated wordlists will trigger automated IP null-routing.</li>
          <li><strong>No Flag Sharing / Collusion:</strong> Sharing flags, solution scripts, or partial keys across different teams is banned.</li>
          <li><strong>Target Isolation:</strong> Attack only explicitly designated challenge ports and target IPs. Attacking organizers or non-challenge university network assets is illegal.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "tools-equipment",
    badge: "TOOLING",
    title: "Permitted Toolsets & Hardware Policy",
    content: (
      <div className="space-y-3">
        <p>
          Operatives are free to utilize any industry-standard open-source or commercial offensive tooling installed on their personal workstations:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs text-accent">
          <span className="p-2 rounded bg-white/5 border border-white/10">Burp Suite / Caido</span>
          <span className="p-2 rounded bg-white/5 border border-white/10">Ghidra / IDA Pro</span>
          <span className="p-2 rounded bg-white/5 border border-white/10">Pwntools / GDB</span>
          <span className="p-2 rounded bg-white/5 border border-white/10">Wireshark / Nmap</span>
        </div>
        <p className="text-xs text-ink-dim pt-1">
          For Track 06 (Hardware Trail), USB-to-UART bridges, multimeters, and basic SDR dongles are allowed. Campus soldering stations and logic analyzers will be provided on-site.
        </p>
      </div>
    ),
  },
];

export default function Rules() {
  const [openId, setOpenId] = useState<string | null>("team-composition");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="rules" className="py-24 sm:py-32 px-6 sm:px-8 max-w-5xl mx-auto relative">
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          // 04. RULES OF ENGAGEMENT
        </span>
      </div>

      <div className="mb-14">
        <RevealText
          text="CODE OF CONDUCT & ENGAGEMENT"
          tag="h2"
          delay={0.1}
          stagger={0.04}
          className="font-display font-bold text-3xl sm:text-5xl text-ink tracking-tight"
        />
        <p className="text-base sm:text-lg text-ink-muted mt-3">
          Fair-play guidelines engineered to ensure pure meritocracy, deep technical challenge, and zero ambiguity.
        </p>
      </div>

      {/* Accordion List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="divide-y divide-white/10 border-y border-white/10"
      >
        {rules.map((rule) => (
          <AccordionItem
            key={rule.id}
            id={rule.id}
            badge={rule.badge}
            question={rule.title}
            answer={rule.content}
            isOpen={openId === rule.id}
            onToggle={() => toggleAccordion(rule.id)}
          />
        ))}
      </motion.div>
    </section>
  );
}
