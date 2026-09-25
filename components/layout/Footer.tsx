"use client";

import React from "react";
import { Terminal, Shield, ArrowUp, Github, Disc as Discord, Twitter, Mail, MapPin } from "lucide-react";
import { triggerEasterEgg } from "../ui/EasterEgg";
import { useLenis } from "@/lib/useLenis";

export default function Footer() {
  const { scrollTo } = useLenis();

  return (
    <footer className="relative border-t border-white/10 bg-[#060609] pt-16 pb-12 overflow-hidden">
      {/* Background cyber accent glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* System Telemetry Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-14 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-ink">SYSTEM STATUS: <strong className="text-accent font-bold">ALL SYSTEMS NOMINAL</strong></span>
          </div>

          <div className="flex items-center gap-6 text-ink-muted">
            <span className="hidden sm:inline">LATENCY: <span className="text-ink">14ms</span></span>
            <span className="hidden md:inline">SECURITY PROTOCOL: <span className="text-accent">AES-GCM-256</span></span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>CAMPUS NODE 01</span>
            </span>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-accent" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-ink">
                SYNAPSE<span className="text-accent">'26</span>
              </span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed max-w-sm">
              The premier inter-collegiate 48-hour cyber heist, hardware challenge, and Capture The Flag championship. Built to push the boundaries of offensive security, reverse engineering, and cryptographic analysis.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="Discord"
              >
                <Discord className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:infiltrate@synapse2026.college"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>
                <button onClick={() => scrollTo("#about")} className="hover:text-ink transition-colors cursor-pointer">
                  About Event
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#tracks")} className="hover:text-ink transition-colors cursor-pointer">
                  Challenge Tracks
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#how-it-works")} className="hover:text-ink transition-colors cursor-pointer">
                  Execution Timeline
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#prizes")} className="hover:text-ink transition-colors cursor-pointer">
                  Prize Vault
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#rules")} className="hover:text-ink transition-colors cursor-pointer">
                  Rules of Engagement
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources & CTF */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
              Operative Hub
            </h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>
                <button onClick={() => scrollTo("#faq")} className="hover:text-ink transition-colors cursor-pointer">
                  Operative FAQ
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo("#register")} className="hover:text-ink transition-colors cursor-pointer">
                  Team Registration
                </button>
              </li>
              <li>
                <button
                  onClick={triggerEasterEgg}
                  className="text-accent hover:underline flex items-center gap-1 cursor-pointer font-mono text-xs"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Challenge #0 Portal</span>
                </button>
              </li>
              <li>
                <span className="text-ink-dim text-xs font-mono">Platform v2.4.0-PROD</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Venue & Coordinates */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
              Coordinates
            </h4>
            <div className="text-xs font-mono text-ink-muted space-y-1.5 leading-relaxed">
              <p className="text-ink font-semibold">Campus Computing Center</p>
              <p>Auditorium Block IV & Cyberspace</p>
              <p className="text-accent">28° 38' 14" N // 77° 13' 42" E</p>
              <p className="pt-2 text-ink-dim">Dates: Oct 24 – 26, 2026</p>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-dim">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            <span>© 2026 SYNAPSE CTF. Organized by Department of Computer Science & Engineering.</span>
            <span className="hidden md:inline">•</span>
            <span className="hover:text-accent cursor-pointer" onClick={triggerEasterEgg}>
              [GRAVITÉ: PRESS '~' TO OVERRIDE]
            </span>
          </div>

          <button
            onClick={() => scrollTo(0)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-accent/40 text-ink-muted hover:text-accent transition-all cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
