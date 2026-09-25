"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, KeyRound, Cpu, Search, BrainCircuit, Radio, ArrowUpRight, Sparkles } from "lucide-react";
import RevealText from "../ui/RevealText";

interface Track {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  skills: string[];
  sampleChallenge: string;
  difficulty: "Beginner Friendly" | "Intermediate" | "Advanced" | "Hardcore";
  icon: React.ComponentType<{ className?: string }>;
}

const tracks: Track[] = [
  {
    id: "web",
    num: "01",
    title: "Web Exploitation",
    category: "APPLICATION DEFENSE",
    description:
      "Break modern web architectures: bypass zero-trust OAuth flows, weaponize prototype pollutions, probe blind SSRF endpoints, and exploit desync HTTP request smuggling.",
    skills: ["OAuth 2.0", "SSRF", "Prototype Pollution", "GraphQL", "JWT Tampering"],
    sampleChallenge: "Exfiltrate the admin session token behind a fortified GraphQL gateway.",
    difficulty: "Beginner Friendly",
    icon: Globe,
  },
  {
    id: "crypto",
    num: "02",
    title: "Cryptography & Ciphers",
    category: "MATHEMATICAL PRIMITIVES",
    description:
      "Deconstruct cryptographic algorithms: break faulty RSA implementations, forge signature proofs with elliptic curve anomalies, and decode historical polyalphabetic ciphers.",
    skills: ["RSA Factorization", "ECDSA Nonce Reuse", "Lattice Cryptanalysis", "zk-SNARKs"],
    sampleChallenge: "Recover the private key from a flawed ECDSA repeated nonce signature.",
    difficulty: "Intermediate",
    icon: KeyRound,
  },
  {
    id: "pwn",
    num: "03",
    title: "Binary Exploitation & Pwn",
    category: "SYSTEM INTERNALS",
    description:
      "Dive into raw memory: craft precise ROP chains, hijack execution through format string vulnerabilities, and bypass modern mitigations (ASLR, DEP, Stack Canaries).",
    skills: ["ROP Gadgets", "Heap Grooming", "GDB/Pwntools", "ASLR/PIE Bypass"],
    sampleChallenge: "Achieve arbitrary code execution on a stripped 64-bit ELF binary.",
    difficulty: "Hardcore",
    icon: Cpu,
  },
  {
    id: "osint",
    num: "04",
    title: "OSINT & Digital Forensics",
    category: "INVESTIGATIVE INTEL",
    description:
      "Track ghost personas across the open web: correlate EXIF metadata, scrape dark web forums, analyze memory dumps, and pinpoint drone coordinates using geolocation forensics.",
    skills: ["Geolocation Forensics", "Metadata Analysis", "PCAP Carving", "Memory Dumps"],
    sampleChallenge: "Geolocate a rogue transmitter from a corrupted 3-second audio spectrogram.",
    difficulty: "Beginner Friendly",
    icon: Search,
  },
  {
    id: "ai",
    num: "05",
    title: "AI Red-Teaming & Jailbreaks",
    category: "EMERGING ATTACK SURFACES",
    description:
      "Infiltrate LLM and AI systems: engineer adversarial prompts to bypass safety guardrails, poison RAG vector databases, and force neural nets to leak system prompts.",
    skills: ["Prompt Injection", "Adversarial Examples", "Vector DB Poisoning", "Model Inversion"],
    sampleChallenge: "Compel an air-gapped LLM security agent to execute unauthorized tool calls.",
    difficulty: "Intermediate",
    icon: BrainCircuit,
  },
  {
    id: "hardware",
    num: "06",
    title: "Physical Trail & Hardware Trail",
    category: "ARG & HARDWARE HACKING",
    description:
      "Cross from cyberspace into physical reality: sniff 2.4GHz radio packets, interface with ESP32 logic pins, and hunt physical encrypted QR dead-drops concealed across campus.",
    skills: ["ESP32 / Arduino", "UART/SPI Sniffing", "SDR Radio", "Dead-drop Geocaching"],
    sampleChallenge: "Dump microcontroller EEPROM over UART to decrypt an on-campus lockbox.",
    difficulty: "Advanced",
    icon: Radio,
  },
];

function TrackCard({ track }: { track: Track }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = track.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="card"
      className="relative p-7 sm:p-9 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between overflow-hidden group min-h-[380px]"
    >
      {/* Dynamic Cursor-following Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(57, 255, 136, 0.12), transparent 70%)`
            : "none",
        }}
      />

      {/* Top Bar: Number & Category */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-2xl sm:text-3xl text-accent tracking-tighter">
              {track.num}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink-dim border border-white/10 px-2.5 py-1 rounded-full">
              {track.category}
            </span>
          </div>

          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-ink-muted group-hover:text-accent group-hover:border-accent/30 transition-all">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl sm:text-2xl text-ink group-hover:text-accent transition-colors mb-3">
          {track.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          {track.description}
        </p>
      </div>

      {/* Bottom info: Sample challenge & Skills */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="bg-black/40 rounded-xl p-3 border border-white/5">
          <span className="text-[10px] font-mono text-accent flex items-center gap-1 mb-1 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Sample Objective:
          </span>
          <p className="text-xs text-ink font-mono line-clamp-2">
            &quot;{track.sampleChallenge}&quot;
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {track.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-ink-muted"
            >
              #{skill}
            </span>
          ))}
          <span className="text-[11px] font-mono text-accent/80 ml-auto">
            {track.difficulty}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Tracks() {
  return (
    <section id="tracks" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto relative">
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          // 02. COMBAT DOMAINS
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <RevealText
            text="CHOOSE YOUR INFILTRATION VECTOR"
            tag="h2"
            delay={0.1}
            stagger={0.04}
            className="font-display font-bold text-3xl sm:text-5xl text-ink tracking-tight"
          />
          <p className="text-base text-ink-muted mt-3 max-w-xl">
            Six specialized challenge tracks. Whether you excel in raw binary disassembly, mathematical ciphers, or on-foot radio triangulation — every track contributes points to the overall team leaderboard.
          </p>
        </div>

        <div className="font-mono text-xs text-ink-dim shrink-0">
          [SCORING: DYNAMIC JEOPARDY MATRIX]
        </div>
      </div>

      {/* Grid of Numbered Track Cards */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </motion.div>
    </section>
  );
}
