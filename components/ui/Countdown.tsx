"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  targetDate?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function DigitSlot({ digit, label }: { digit: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[54px] sm:min-w-[70px] h-[58px] sm:h-[72px] flex items-center justify-center overflow-hidden shadow-inner backdrop-blur-md">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={digit}
            initial={{ y: -30, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 30, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-2xl sm:text-4xl font-bold text-accent tracking-tighter"
          >
            {digit}
          </motion.span>
        </AnimatePresence>
        {/* Subtle top glare line */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-ink-muted mt-2">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({
  targetDate = "2026-10-24T09:00:00Z",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div className="flex items-center gap-2 sm:gap-3 py-4 opacity-50">
        <div className="w-14 h-16 bg-white/5 rounded-xl animate-pulse" />
        <div className="w-14 h-16 bg-white/5 rounded-xl animate-pulse" />
        <div className="w-14 h-16 bg-white/5 rounded-xl animate-pulse" />
        <div className="w-14 h-16 bg-white/5 rounded-xl animate-pulse" />
      </div>
    );
  }

  const format2Digits = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 sm:gap-3.5 select-none" aria-label="Event countdown">
      <DigitSlot digit={format2Digits(timeLeft.days)} label="Days" />
      <span className="text-xl sm:text-2xl font-mono text-accent/50 mb-6 font-bold">:</span>
      <DigitSlot digit={format2Digits(timeLeft.hours)} label="Hours" />
      <span className="text-xl sm:text-2xl font-mono text-accent/50 mb-6 font-bold">:</span>
      <DigitSlot digit={format2Digits(timeLeft.minutes)} label="Mins" />
      <span className="text-xl sm:text-2xl font-mono text-accent/50 mb-6 font-bold">:</span>
      <DigitSlot digit={format2Digits(timeLeft.seconds)} label="Secs" />
    </div>
  );
}
