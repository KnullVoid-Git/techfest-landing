"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, CheckCircle2, ShieldCheck, User, Mail, School, Users, Copy, Sparkles, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";
import MagneticButton from "../ui/MagneticButton";
import RevealText from "../ui/RevealText";

interface FormState {
  fullName: string;
  email: string;
  college: string;
  teamName: string;
  primaryTrack: string;
  teamSize: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  college?: string;
  teamName?: string;
  primaryTrack?: string;
  teamSize?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    college: "",
    teamName: "",
    primaryTrack: "Web Exploitation",
    teamSize: "4",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [operativeId, setOperativeId] = useState("");
  const [copied, setCopied] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.length < 2) {
      errs.fullName = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = "Valid college or personal email required.";
    }

    if (!formData.college.trim() || formData.college.length < 3) {
      errs.college = "College / University name required.";
    }

    if (!formData.teamName.trim() || formData.teamName.length < 3) {
      errs.teamName = "Team handle must be at least 3 characters.";
    }

    if (!formData.primaryTrack) {
      errs.primaryTrack = "Please select a primary track.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // =========================================================================
    // TODO: BACKEND INTEGRATION HOOK
    // Replace this simulated local delay with your actual API endpoint or server action:
    // e.g.:
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    // const result = await response.json();
    // =========================================================================

    setTimeout(() => {
      const generatedId = `SYN26-${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setOperativeId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#39ff88", "#c6ff3d", "#3d7bff", "#f4eeff"],
      });

      console.log("[REGISTER SUBMITTED // CLIENT CAPTURE]:", {
        ...formData,
        operativeId: generatedId,
        timestamp: new Date().toISOString(),
      });
    }, 1200);
  };

  const copyId = () => {
    navigator.clipboard.writeText(operativeId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      college: "",
      teamName: "",
      primaryTrack: "Web Exploitation",
      teamSize: "4",
    });
    setErrors({});
  };

  return (
    <section id="register" className="py-24 sm:py-32 px-6 sm:px-8 max-w-4xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Section Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
          // 07. ENLIST THE SYNDICATE
        </span>
      </div>

      <div className="mb-12">
        <RevealText
          text="CLAIM YOUR TEAM CLEARANCE"
          tag="h2"
          delay={0.1}
          stagger={0.04}
          className="font-display font-bold text-3xl sm:text-5xl text-ink tracking-tight"
        />
        <p className="text-base sm:text-lg text-ink-muted mt-3">
          Lock in your team spot before capacity is capped at 300 squads. 100% free registration.
        </p>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* Registration Form */
            <motion.form
              key="register-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2 group">
                  <label className="text-xs font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5 group-focus-within:text-accent transition-colors">
                    <User className="w-3.5 h-3.5 text-accent" />
                    Team Leader Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Vance"
                    className={`w-full bg-black/40 border rounded-xl px-4 py-3.5 text-sm text-ink placeholder-ink-dim/50 focus:outline-none transition-all duration-300 ${
                      errors.fullName ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-accent focus:shadow-[0_0_20px_rgba(57,255,136,0.18)]"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] font-mono text-red-400">{errors.fullName}</span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                  <label className="text-xs font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5 group-focus-within:text-accent transition-colors">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@university.edu"
                    className={`w-full bg-black/40 border rounded-xl px-4 py-3.5 text-sm text-ink placeholder-ink-dim/50 focus:outline-none transition-all duration-300 ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-accent focus:shadow-[0_0_20px_rgba(57,255,136,0.18)]"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] font-mono text-red-400">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* College Name */}
                <div className="space-y-2 group">
                  <label className="text-xs font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5 group-focus-within:text-accent transition-colors">
                    <School className="w-3.5 h-3.5 text-accent" />
                    College / University *
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="e.g. Institute of Technology"
                    className={`w-full bg-black/40 border rounded-xl px-4 py-3.5 text-sm text-ink placeholder-ink-dim/50 focus:outline-none transition-all duration-300 ${
                      errors.college ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-accent focus:shadow-[0_0_20px_rgba(57,255,136,0.18)]"
                    }`}
                  />
                  {errors.college && (
                    <span className="text-[11px] font-mono text-red-400">{errors.college}</span>
                  )}
                </div>

                {/* Team Codename */}
                <div className="space-y-2 group">
                  <label className="text-xs font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5 group-focus-within:text-accent transition-colors">
                    <Terminal className="w-3.5 h-3.5 text-accent" />
                    Team Handle / Codename *
                  </label>
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="e.g. NullPointerSquad"
                    className={`w-full bg-black/40 border rounded-xl px-4 py-3.5 text-sm text-ink placeholder-ink-dim/50 focus:outline-none transition-all duration-300 ${
                      errors.teamName ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-accent focus:shadow-[0_0_20px_rgba(57,255,136,0.18)]"
                    }`}
                  />
                  {errors.teamName && (
                    <span className="text-[11px] font-mono text-red-400">{errors.teamName}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Primary Track Interest */}
                <div className="space-y-2 group">
                  <label className="text-xs font-mono uppercase tracking-wider text-ink-muted group-focus-within:text-accent transition-colors">
                    Primary Track Interest
                  </label>
                  <select
                    value={formData.primaryTrack}
                    onChange={(e) => setFormData({ ...formData, primaryTrack: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-ink focus:outline-none focus:border-accent focus:shadow-[0_0_20px_rgba(57,255,136,0.18)] transition-all duration-300 cursor-pointer"
                  >
                    <option value="Web Exploitation">Track 01: Web Exploitation</option>
                    <option value="Cryptography & Ciphers">Track 02: Cryptography & Ciphers</option>
                    <option value="Binary Exploitation & Pwn">Track 03: Binary Exploitation & Pwn</option>
                    <option value="OSINT & Digital Forensics">Track 04: OSINT & Digital Forensics</option>
                    <option value="AI Red-Teaming">Track 05: AI Red-Teaming</option>
                    <option value="Hardware Trail & ARG">Track 06: Hardware Trail & ARG</option>
                  </select>
                </div>

                {/* Team Size */}
                <div className="space-y-2 group">
                  <label className="text-xs font-mono uppercase tracking-wider text-ink-muted flex items-center gap-1.5 group-focus-within:text-accent transition-colors">
                    <Users className="w-3.5 h-3.5 text-accent" />
                    Squad Size (Members)
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-ink focus:outline-none focus:border-accent focus:shadow-[0_0_20px_rgba(57,255,136,0.18)] transition-all duration-300 cursor-pointer"
                  >
                    <option value="1">1 Operative (Solo Infiltrator)</option>
                    <option value="2">2 Operatives (Duo)</option>
                    <option value="3">3 Operatives (Trio)</option>
                    <option value="4">4 Operatives (Full Squad)</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-ink-dim order-2 sm:order-1 text-center sm:text-left">
                  // NO FEES // TICKETS DISPATCHED VIA EMAIL
                </span>

                <MagneticButton className="w-full sm:w-auto order-1 sm:order-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent text-bg font-display font-black text-sm uppercase tracking-wider hover:bg-accent-lime shadow-[0_0_25px_rgba(57,255,136,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>ENCRYPTING CREDENTIALS...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Registration</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </motion.form>
          ) : (
            /* Success State: Digital Operative Pass */
            <motion.div
              key="success-pass"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-accent text-sm font-mono tracking-wider uppercase">
                <CheckCircle2 className="w-5 h-5" />
                <span>REGISTRATION CONFIRMED // CLEARANCE LEVEL 1</span>
              </div>

              <div className="bg-black/60 border border-accent/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(57,255,136,0.15)] font-mono">
                {/* Boarding Pass Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] text-ink-dim uppercase tracking-widest block">
                      SYNAPSE CTF 2026 // ADMISSION PASS
                    </span>
                    <h3 className="font-display font-bold text-2xl text-ink">
                      {formData.teamName}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold">
                      VERIFIED OPERATIVE
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-ink-dim block text-[10px] uppercase">LEADER</span>
                    <span className="text-ink font-semibold">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-ink-dim block text-[10px] uppercase">MEMBERS</span>
                    <span className="text-ink font-semibold">{formData.teamSize} Operatives</span>
                  </div>
                  <div>
                    <span className="text-ink-dim block text-[10px] uppercase">TRACK</span>
                    <span className="text-accent font-semibold truncate block">{formData.primaryTrack}</span>
                  </div>
                  <div>
                    <span className="text-ink-dim block text-[10px] uppercase">CHECK-IN</span>
                    <span className="text-ink font-semibold">OCT 24, 09:00</span>
                  </div>
                </div>

                {/* Operative Key Box */}
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-ink-dim block uppercase">
                      ASSIGNED OPERATIVE ACCESS KEY
                    </span>
                    <span className="font-bold text-base sm:text-lg text-accent tracking-widest">
                      {operativeId}
                    </span>
                  </div>

                  <button
                    onClick={copyId}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-ink hover:text-accent transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "COPIED" : "COPY KEY"}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <span className="text-xs text-ink-muted text-center sm:text-left">
                  Check your inbox at <strong className="text-ink">{formData.email}</strong> for discord clearance.
                </span>

                <button
                  onClick={resetForm}
                  className="text-xs font-mono text-ink-dim hover:text-accent flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Register another squad</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
