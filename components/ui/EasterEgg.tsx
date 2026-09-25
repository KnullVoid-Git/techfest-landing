"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ShieldAlert, CheckCircle2, Copy, Sparkles, Orbit } from "lucide-react";
import confetti from "canvas-confetti";

export const triggerEasterEgg = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("trigger-challenge-zero"));
  }
};

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [inputFlag, setInputFlag] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [gravityActive, setGravityActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const SECRET_CIPHER = "RkxBR3tkMF95MHVfYjNsMTN2M18xbl9ncjR2MXR5fQ==";
  const CORRECT_FLAG = "FLAG{d0_y0u_b3l13v3_1n_gr4v1ty}";

  const launchEasterEgg = useCallback(() => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      setIsOpen(true);
    }, 650);
  }, []);

  useEffect(() => {
    const handleCustomTrigger = () => {
      launchEasterEgg();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Tilde / backtick or Alt+G trigger
      if (e.key === "`" || e.key === "~" || (e.altKey && e.key.toLowerCase() === "g")) {
        e.preventDefault();
        launchEasterEgg();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("trigger-challenge-zero", handleCustomTrigger);
    window.addEventListener("keydown", handleKeyDown);

    // Also inject a fun console clue
    console.log(
      "%c[SYNAPSE CTF 2026] %cLooking for secrets? Try pressing '~' or clicking the logo 5 times. Flag #0 is hidden in plain sight: " + SECRET_CIPHER,
      "color: #39ff88; font-weight: bold; font-size: 14px;",
      "color: #a99cc4; font-size: 12px;"
    );

    return () => {
      window.removeEventListener("trigger-challenge-zero", handleCustomTrigger);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [launchEasterEgg]);

  const handleVerifyFlag = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputFlag.trim() === CORRECT_FLAG) {
      setStatus("success");
      try {
        localStorage.setItem("ctf_challenge_0_solved", "true");
      } catch {}
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#39ff88", "#c6ff3d", "#3d7bff"],
      });
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const toggleGravity = () => {
    const nextState = !gravityActive;
    setGravityActive(nextState);
    if (nextState) {
      document.body.classList.add("gravity-mode");
    } else {
      document.body.classList.remove("gravity-mode");
    }
  };

  const copyCipher = () => {
    navigator.clipboard.writeText(SECRET_CIPHER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Fullscreen Glitch / CRT Distortion Flash */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] pointer-events-none bg-accent/20 mix-blend-screen backdrop-invert flex flex-col justify-between"
          >
            <div className="w-full h-1 bg-accent animate-scanline" />
            <div className="w-full text-center font-mono text-xs text-accent tracking-widest uppercase bg-bg/80 py-1">
              [WARNING: ANOMALY DETECTED // GRAVITÉ PULSE ENGAGED]
            </div>
            <div className="w-full h-1 bg-accent animate-scanline" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Challenge #0 Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9500] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-bg/90 backdrop-blur-xl"
            />

            {/* Terminal Window */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#0b0c13] border border-accent/40 rounded-2xl shadow-[0_0_50px_rgba(57,255,136,0.2)] overflow-hidden z-10 font-mono"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/10 select-none">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"
                      title="Close"
                    />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-accent/80" />
                  </div>
                  <span className="text-xs text-ink-muted flex items-center gap-1.5 ml-2 font-semibold">
                    <Terminal className="w-3.5 h-3.5 text-accent" />
                    CHALLENGE_00_KERNEL_RECON.EXE
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleGravity}
                    className={`text-[11px] px-2.5 py-1 rounded border flex items-center gap-1 transition-all ${
                      gravityActive
                        ? "border-accent bg-accent/20 text-accent font-bold"
                        : "border-white/10 text-ink-muted hover:border-accent/40 hover:text-ink"
                    }`}
                  >
                    <Orbit className="w-3 h-3" />
                    {gravityActive ? "GRAVITÉ: ON" : "TOGGLE GRAVITÉ"}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-ink-muted hover:text-ink p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                <div className="flex items-center gap-2 text-accent text-xs tracking-wider uppercase">
                  <ShieldAlert className="w-4 h-4" />
                  <span>CLASSIFIED INFILTRATION // FIRST BLOOD TRIAL</span>
                </div>

                <div className="text-sm text-ink leading-relaxed space-y-2">
                  <p className="text-ink-muted">
                    Welcome, Operative. You have stumbled upon the subterranean layer of{" "}
                    <strong className="text-accent">SYNAPSE 2026</strong>. Before registration opens,
                    only the keenest eyes discover Challenge #0.
                  </p>
                  <p className="text-xs text-ink-dim font-mono">
                    [SYSTEM INTEL]: The cipher below guards the preliminary entry vector. Decode the payload to extract the flag format:
                  </p>
                </div>

                {/* Cipher Box */}
                <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3">
                  <div className="overflow-x-auto text-xs sm:text-sm text-accent tracking-widest font-mono">
                    {SECRET_CIPHER}
                  </div>
                  <button
                    onClick={copyCipher}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-ink-muted hover:text-accent transition-colors shrink-0 flex items-center gap-1 text-xs"
                    title="Copy cipher to clipboard"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="text-xs text-ink-dim flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>HINT: Standard RFC 4648 Base64 encoding. Flag format matches FLAG&#123;...&#125;</span>
                </div>

                {/* Flag Input Form */}
                <form onSubmit={handleVerifyFlag} className="pt-2 space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={inputFlag}
                      onChange={(e) => setInputFlag(e.target.value)}
                      placeholder="FLAG{...}"
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-sm text-accent placeholder-ink-dim/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent font-mono"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 px-4 bg-accent text-bg font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-accent-lime transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Submit Flag
                    </button>
                  </div>

                  {/* Status Messages */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-xs text-accent bg-accent/10 border border-accent/30 px-3 py-2.5 rounded-lg"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        EXCELLENT WORK! Flag accepted. You are granted +100 Recon Points and the
                        &quot;Early Vanguard&quot; digital badge. Keep this credential handy at check-in!
                      </span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>ACCESS DENIED: Invalid flag hash. Review your Base64 decode string.</span>
                    </motion.div>
                  )}
                </form>

                <div className="pt-2 flex items-center justify-between text-[11px] text-ink-dim border-t border-white/10">
                  <span>TIP: Press [ESC] or click outside to dismiss</span>
                  <span>TRIGGER: Click logo 5x or press `~`</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
