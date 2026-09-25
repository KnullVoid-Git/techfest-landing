"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Orbit, Menu, X, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import { triggerEasterEgg } from "../ui/EasterEgg";
import { soundManager } from "@/lib/sounds";
import { useLenis } from "@/lib/useLenis";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const { scrollTo } = useLenis();

  useEffect(() => {
    setIsMuted(soundManager.isMuted());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  // Handle Easter egg logo multi-click
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);

    if (newCount >= 5) {
      setLogoClicks(0);
      triggerEasterEgg();
    } else {
      // Reset count after 2.5s of inactivity
      setTimeout(() => {
        setLogoClicks((prev) => (prev > 0 ? prev - 1 : 0));
      }, 2500);
    }
  };

  const navLinks = [
    { label: "About", href: "#about", num: "01" },
    { label: "Tracks", href: "#tracks", num: "02" },
    { label: "Timeline", href: "#how-it-works", num: "03" },
    { label: "Rules", href: "#rules", num: "04" },
    { label: "Prizes", href: "#prizes", num: "05" },
    { label: "FAQ", href: "#faq", num: "06" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg/85 backdrop-blur-md border-b border-white/10 py-4 shadow-lg shadow-black/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo with Easter Egg Click Tracker */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-2 group text-left focus:outline-none cursor-pointer"
              title="Click 5x to trigger Challenge #0"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/20 transition-all">
                <Terminal className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-tight text-ink group-hover:text-accent transition-colors flex items-center gap-1.5">
                  SYNAPSE<span className="text-accent">'26</span>
                </span>
              </div>
            </button>
            {logoClicks > 0 && (
              <span className="font-mono text-[10px] text-accent/80 animate-pulse border border-accent/30 px-1.5 py-0.5 rounded bg-accent/5">
                [{logoClicks}/5]
              </span>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-accent transition-colors flex items-center gap-1.5 group cursor-pointer relative py-1"
              >
                <span className="text-[10px] text-accent/60 group-hover:text-accent">
                  {link.num}
                </span>
                <span>{link.label}</span>
                {/* Micro sliding underline on hover */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            {/* Audio Feedback Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleSound}
              className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full transition-all cursor-pointer border ${
                !isMuted
                  ? "border-accent/50 bg-accent/15 text-accent shadow-[0_0_12px_rgba(57,255,136,0.3)]"
                  : "border-white/10 hover:border-accent/40 text-ink-muted hover:text-accent bg-white/[0.02]"
              }`}
              title={!isMuted ? "Audio feedback active (Click to mute)" : "Muted (Click to unmute cyber audio)"}
            >
              {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-accent" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="text-[11px] uppercase tracking-wider">{!isMuted ? "Sound: ON" : "Mute"}</span>
            </motion.button>

            {/* Secret Gravité Mode Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerEasterEgg}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-accent border border-white/10 hover:border-accent/40 px-2.5 py-1 rounded-full transition-all cursor-pointer bg-white/[0.02]"
              title="Activate Gravité / Challenge #0"
            >
              <Orbit className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: "12s" }} />
              <span className="text-[11px] uppercase tracking-wider">Gravité</span>
            </motion.button>
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <MagneticButton className="hidden sm:inline-block">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick("#register")}
                className="px-5 py-2.5 rounded-full bg-accent text-bg font-display font-bold text-xs uppercase tracking-wider hover:bg-accent-lime shadow-[0_0_20px_rgba(57,255,136,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Register</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.button>
            </MagneticButton>

            {/* Mobile Hamburger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-white/10 text-ink hover:text-accent hover:border-accent transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl lg:hidden flex flex-col justify-center px-8 pt-20 pb-10 space-y-6"
          >
            <div className="space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left py-3 border-b border-white/10 flex items-center justify-between text-2xl font-display font-bold text-ink hover:text-accent transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-sm text-accent">{link.num}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerEasterEgg();
                }}
                className="w-full py-3 rounded-xl border border-accent/40 bg-accent/10 text-accent font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Orbit className="w-4 h-4" />
                <span>Initialize Gravité / Challenge #0</span>
              </button>

              <button
                onClick={() => handleNavClick("#register")}
                className="w-full py-3.5 rounded-xl bg-accent text-bg font-display font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(57,255,136,0.3)] flex items-center justify-center gap-2"
              >
                <span>Register Team</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
