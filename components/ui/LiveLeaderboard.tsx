"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, ChevronUp, ChevronDown, Radio, Zap, Shield, X } from "lucide-react";

interface TeamScore {
  rank: number;
  name: string;
  college: string;
  points: number;
  solves: number;
  recentSolve?: string;
  isHot?: boolean;
}

const INITIAL_TEAMS: TeamScore[] = [
  { rank: 1, name: "0xNullPointers", college: "IIT-B", points: 4850, solves: 14, isHot: true },
  { rank: 2, name: "KernelPanic_404", college: "BITS-P", points: 4620, solves: 13 },
  { rank: 3, name: "BinaryPhantoms", college: "IIIT-H", points: 4310, solves: 12 },
  { rank: 4, name: "CipherSyndicate", college: "NIT-T", points: 3980, solves: 11 },
  { rank: 5, name: "RedTeamDelta", college: "DTU", points: 3740, solves: 10 },
];

const SOLVE_EVENTS = [
  { team: "0xNullPointers", track: "Binary Pwn #03", pts: 250 },
  { team: "KernelPanic_404", track: "Quantum Cipher #02", pts: 300 },
  { team: "BinaryPhantoms", track: "Hardware UART #01", pts: 200 },
  { team: "CipherSyndicate", track: "AI Jailbreak #04", pts: 350 },
];

export default function LiveLeaderboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [teams, setTeams] = useState<TeamScore[]>(INITIAL_TEAMS);
  const [latestEvent, setLatestEvent] = useState<string>("0xNullPointers solved Binary Pwn #03 (+250 pts)");
  const [flashKey, setFlashKey] = useState(0);

  // Simulated live solve ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const event = SOLVE_EVENTS[Math.floor(Math.random() * SOLVE_EVENTS.length)];
      setLatestEvent(`${event.team} solved ${event.track} (+${event.pts} pts)`);
      setFlashKey((k) => k + 1);

      setTeams((prev) => {
        return prev.map((t) => {
          if (t.name === event.team) {
            return {
              ...t,
              points: t.points + event.pts,
              solves: t.solves + 1,
              isHot: true,
            };
          }
          return { ...t, isHot: false };
        }).sort((a, b) => b.points - a.points).map((t, idx) => ({ ...t, rank: idx + 1 }));
      });
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Minimized Ticker Pill */
          <motion.button
            key="minimized-pill"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0b0b12]/90 hover:bg-[#12121e] border border-white/10 hover:border-accent/50 shadow-2xl backdrop-blur-xl group cursor-pointer transition-all duration-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-ink-dim uppercase tracking-wider hidden sm:inline">LIVE CTF RADAR:</span>
              <span className="text-ink font-semibold flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-accent" />
                #1 {teams[0].name} ({teams[0].points.toLocaleString()} pts)
              </span>
            </div>

            <ChevronUp className="w-4 h-4 text-ink-muted group-hover:text-accent transition-colors" />
          </motion.button>
        ) : (
          /* Expanded Scoreboard Card */
          <motion.div
            key="expanded-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[320px] sm:w-[360px] rounded-2xl bg-[#0b0b12]/95 border border-white/15 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden relative"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-accent animate-pulse" />
                <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                  LIVE GRID RADAR
                </span>
                <span className="text-[10px] font-mono text-accent bg-accent/10 border border-accent/30 px-1.5 py-0.5 rounded">
                  STAGE 1
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-md hover:bg-white/10 text-ink-muted hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Collapse leaderboard"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Live Solve Alert Banner */}
            <motion.div
              key={flashKey}
              initial={{ backgroundColor: "rgba(57, 255, 136, 0.2)" }}
              animate={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
              transition={{ duration: 1.2 }}
              className="px-3 py-2 rounded-lg border border-white/10 mb-3 flex items-center gap-2 text-[11px] font-mono"
            >
              <Zap className="w-3 h-3 text-accent shrink-0 animate-bounce" />
              <span className="text-ink-muted truncate">
                <strong className="text-accent font-semibold">{latestEvent.split(" ")[0]}</strong>{" "}
                {latestEvent.substring(latestEvent.indexOf(" ") + 1)}
              </span>
            </motion.div>

            {/* Teams Ranking List */}
            <div className="space-y-1.5 mb-4">
              {teams.map((t) => (
                <div
                  key={t.name}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono transition-colors ${
                    t.rank === 1
                      ? "bg-accent/10 border border-accent/30 text-accent font-bold"
                      : "bg-white/[0.02] border border-white/5 text-ink-muted"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <span
                      className={`w-4 text-center font-bold ${
                        t.rank === 1 ? "text-accent" : t.rank === 2 ? "text-amber-400" : "text-ink-dim"
                      }`}
                    >
                      0{t.rank}
                    </span>
                    <span className="font-semibold text-ink truncate max-w-[120px]">
                      {t.name}
                    </span>
                    <span className="text-[10px] text-ink-dim border border-white/10 px-1 py-0.2 rounded">
                      {t.college}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-ink font-bold">
                      {t.points.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-ink-dim">
                      ({t.solves}🚩)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Status bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-ink-dim pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-accent" />
                VERIFIED CRYPTO LEDGER
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-accent transition-colors cursor-pointer"
              >
                COLLAPSE [▲]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
