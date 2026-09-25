"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserCheck, Radio, Flag, Snowflake, Trophy, CheckCircle2 } from "lucide-react";
import RevealText from "../ui/RevealText";

interface Step {
  num: string;
  title: string;
  timeframe: string;
  tagline: string;
  description: string;
  intel: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Assemble The Syndicate",
    timeframe: "PHASE 01 // PRE-EVENT",
    tagline: "Form your squad of 1–4 operatives and establish comms.",
    description:
      "Register your team handle, select your battle tracks, and receive your cryptographic operative credentials. Early registrants get access to Discord private channels and pre-event puzzle warmups.",
    intel: ["Team size: 1–4 students", "Open to all universities", "Discord verification link"],
    icon: UserCheck,
  },
  {
    num: "02",
    title: "The Opening Signal",
    timeframe: "DAY 1 // 09:00 UTC",
    tagline: "CTF portal decrypts; challenge servers spin up.",
    description:
      "The master prompt and flag submission engine go live. First blood bonuses are awarded to the fastest solves in each category. The on-campus physical trail map is unlocked simultaneously.",
    intel: ["First Blood: +20% bonus pts", "Live challenge unlocks", "Campus waypoint 01 active"],
    icon: Radio,
  },
  {
    num: "03",
    title: "The Infiltration Trail",
    timeframe: "HOURS 06 – 40 // CONTINUOUS",
    tagline: "Continuous exploitation, hardware hacking & clue hunting.",
    description:
      "Work through increasingly difficult tiers of web, binary, crypto, and OSINT puzzles. Physical trail clues lead to hardware dead-drops on campus with keycards and radio beacons.",
    intel: ["Dynamic point depreciation", "24/7 mentor desk", "Satellite radio triangulation"],
    icon: Flag,
  },
  {
    num: "04",
    title: "The Grid Freeze",
    timeframe: "FINAL 4 HOURS // T-4:00",
    tagline: "The scoreboard goes dark. Pure stealth mode.",
    description:
      "To maximize suspense, the public scoreboard is locked 4 hours before the finish line. Solves still register on the back-end, but no team knows who holds the top podium.",
    intel: ["Scoreboard hidden", "Final hardcore flags revealed", "Top 10 radar blackout"],
    icon: Snowflake,
  },
  {
    num: "05",
    title: "Code Audit & The Vault",
    timeframe: "FINALE // AWARDS GALA",
    tagline: "Exploit verification, live demo showdown & ₹5L prize distribution.",
    description:
      "Top teams submit writeups and perform a rapid 5-minute technical demo of their most creative solve in front of the industry jury. Winners are crowned and cash prizes disbursed.",
    intel: ["Writeup review", "Champion trophy awarded", "Sponsor interview fast-tracks"],
    icon: Trophy,
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsWrapperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stepElements = gsap.utils.toArray<HTMLElement>(".timeline-step-item");

      stepElements.forEach((el, index) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto relative"
    >
      {/* Section Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          // 03. EXECUTION TIMELINE
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-24">
        <div>
          <RevealText
            text="HOW THE HEIST UNFOLDS"
            tag="h2"
            delay={0.1}
            stagger={0.04}
            className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-ink tracking-tight"
          />
          <p className="text-base sm:text-lg text-ink-muted mt-3 max-w-xl">
            From initial registration to the final 4-hour scoreboard freeze and exploit defense — here is your mission roadmap over the 48-hour championship.
          </p>
        </div>

        {/* Phase Indicator Pill */}
        <div className="font-mono text-xs text-accent border border-accent/30 bg-accent/10 px-4 py-2 rounded-xl shrink-0 self-start lg:self-end">
          ACTIVE PHASE: [0{activeStep + 1} / 05] — {steps[activeStep].title.toUpperCase()}
        </div>
      </div>

      {/* Grid: Pinned Left Info + Scrollable Right Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Sticky Overview Box */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
          <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6">
            <span className="text-xs font-mono text-ink-dim uppercase tracking-wider">
              OPERATIVE PROGRESSION
            </span>

            <div className="space-y-3">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <div
                    key={step.num}
                    onClick={() => {
                      const el = document.getElementById(`step-card-${idx}`);
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "border-accent bg-accent/10 text-accent"
                        : isPassed
                        ? "border-white/10 text-ink hover:border-white/20"
                        : "border-white/5 text-ink-dim opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold">{step.num}</span>
                      <span className="text-xs font-display font-semibold truncate max-w-[170px]">
                        {step.title}
                      </span>
                    </div>

                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    ) : isActive ? (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-ink-dim space-y-1">
              <p className="text-accent font-semibold">// PROTOCOL: 0-DAY FAIR PLAY</p>
              <p>Platform telemetry monitors automated attacks & brute-forcing.</p>
            </div>
          </div>
        </div>

        {/* Right: Step Cards List */}
        <div ref={stepsWrapperRef} className="lg:col-span-8 space-y-8 sm:space-y-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={step.num}
                id={`step-card-${idx}`}
                className={`timeline-step-item p-7 sm:p-9 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                  isActive
                    ? "border-accent/60 bg-white/[0.04] shadow-[0_0_40px_rgba(57,255,136,0.1)]"
                    : "border-white/10 bg-white/[0.015] hover:border-white/20"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="font-mono text-xs text-accent font-bold tracking-widest uppercase">
                    {step.timeframe}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                      isActive
                        ? "border-accent bg-accent/20 text-accent"
                        : "border-white/10 bg-white/5 text-ink-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-2">
                  <span className="font-mono text-accent mr-3">{step.num}.</span>
                  {step.title}
                </h3>

                <p className="text-sm sm:text-base font-medium text-accent-lime/90 font-mono mb-4">
                  &gt; {step.tagline}
                </p>

                <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Tactical Intel Pills */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                  {step.intel.map((item) => (
                    <span
                      key={item}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-ink-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
