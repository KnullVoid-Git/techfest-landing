"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AccordionItem from "../ui/AccordionItem";
import RevealText from "../ui/RevealText";

interface FAQ {
  id: string;
  badge: string;
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQ[] = [
  {
    id: "beginner-friendly",
    badge: "EXPERIENCE",
    question: "Is SYNAPSE suitable for beginners attending their very first CTF?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Absolutely.</strong> While the higher-tier challenges push seasoned reverse engineers, each track contains accessible &quot;Warmup&quot; and &quot;Sanity Check&quot; challenges designed specifically for beginners.
        </p>
        <p>
          We also host a 2-hour pre-event workshop covering CTF essentials (inspecting web headers, introductory Ghidra usage, and cipher decoders) to get everyone operational.
        </p>
      </div>
    ),
  },
  {
    id: "format-venue",
    badge: "LOGISTICS",
    question: "Is the event purely remote or on-campus?",
    answer: (
      <div className="space-y-2">
        <p>
          SYNAPSE 2026 is a <strong>hybrid competition</strong>. The pure Jeopardy tracks (Web, Crypto, Pwn, OSINT) can be solved remotely from anywhere in the world.
        </p>
        <p>
          However, teams competing in Track 06 (Hardware Trail & Physical Scavenger Hunt) must have at least one team member present on campus to retrieve physical dead-drops, connect logic sniffers, and decrypt physical beacons.
        </p>
      </div>
    ),
  },
  {
    id: "registration-fee",
    badge: "COST",
    question: "Is there any registration fee to participate?",
    answer: (
      <p>
        <strong>Zero fee. Participation is 100% free</strong> for all verified college and university students, funded through our academic partners and industry cybersecurity sponsors.
      </p>
    ),
  },
  {
    id: "hardware-requirements",
    badge: "HARDWARE",
    question: "What hardware and software setup do we need?",
    answer: (
      <div className="space-y-2">
        <p>
          A modern laptop running Linux, macOS, or Windows with WSL2 is recommended. Ensure you have Docker installed if you plan on spinning up local challenge test-harnesses.
        </p>
        <p>
          For on-campus operatives, high-speed Wi-Fi and power strips are provided in the main computing labs.
        </p>
      </div>
    ),
  },
  {
    id: "cross-college-teams",
    badge: "TEAMS",
    question: "Can students from different colleges form a joint squad?",
    answer: (
      <p>
        Yes. Cross-institutional teams are fully welcomed. Team members can belong to different colleges, departments, or graduating years. Squads can be 1 to 4 members.
      </p>
    ),
  },
  {
    id: "discord-platform",
    badge: "ACCESS",
    question: "When will challenge platform credentials and Discord invites be sent?",
    answer: (
      <p>
        Immediately upon submitting the registration form below, your Team Captain will receive a confirmation code. Dedicated Discord invites and CTFd credentials will be dispatched 48 hours prior to opening ceremonies.
      </p>
    ),
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("beginner-friendly");

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-6 sm:px-8 max-w-5xl mx-auto relative">
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          // 06. OPERATIVE INTELLIGENCE
        </span>
      </div>

      <div className="mb-14">
        <RevealText
          text="FREQUENTLY ASKED QUESTIONS"
          tag="h2"
          delay={0.1}
          stagger={0.04}
          className="font-display font-bold text-3xl sm:text-5xl text-ink tracking-tight"
        />
        <p className="text-base sm:text-lg text-ink-muted mt-3">
          Everything you need to know about credentials, logistics, scoring, and campus entry.
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
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            id={faq.id}
            badge={faq.badge}
            question={faq.question}
            answer={faq.answer}
            isOpen={openId === faq.id}
            onToggle={() => toggleAccordion(faq.id)}
          />
        ))}
      </motion.div>
    </section>
  );
}
