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

interface CircularSlotProps {
  digit: string;
  label: string;
  fraction: number; // 0 to 1
}

function CircularDigitSlot({ digit, label, fraction }: CircularSlotProps) {
  const radius = 31;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.max(0, Math.min(1, fraction)));

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center group cursor-default"
    >
      <div className="relative w-[68px] sm:w-[82px] h-[68px] sm:h-[82px] flex items-center justify-center">
        {/* SVG Circular Progress Ring */}
        <svg className="w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 76 76">
          {/* Background track circle */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="3.5"
          />
          {/* Active Progress stroke with neon drop shadow */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="transparent"
            stroke="#39ff88"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out drop-shadow-[0_0_10px_rgba(57,255,136,0.65)]"
          />
        </svg>

        {/* Center Digit Slot */}
        <div className="absolute inset-2.5 rounded-full bg-black/40 border border-white/5 flex items-center justify-center backdrop-blur-md shadow-inner group-hover:border-accent/40 transition-colors">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={digit}
              initial={{ y: -16, opacity: 0, filter: "blur(3px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: 16, opacity: 0, filter: "blur(3px)" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xl sm:text-2xl font-black text-ink tracking-tight group-hover:text-accent transition-colors"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-ink-muted group-hover:text-accent transition-colors mt-2">
        {label}
      </span>
    </motion.div>
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
      <div className="flex items-center gap-3 sm:gap-4 py-4 opacity-50">
        <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse" />
        <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse" />
        <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse" />
        <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse" />
      </div>
    );
  }

  const format2Digits = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex items-center gap-2 sm:gap-4 select-none" aria-label="Event countdown">
      <CircularDigitSlot
        digit={format2Digits(timeLeft.days)}
        label="Days"
        fraction={timeLeft.days / 30}
      />
      <span className="text-lg sm:text-xl font-mono text-accent/40 mb-6 font-bold">:</span>
      <CircularDigitSlot
        digit={format2Digits(timeLeft.hours)}
        label="Hours"
        fraction={timeLeft.hours / 24}
      />
      <span className="text-lg sm:text-xl font-mono text-accent/40 mb-6 font-bold">:</span>
      <CircularDigitSlot
        digit={format2Digits(timeLeft.minutes)}
        label="Mins"
        fraction={timeLeft.minutes / 60}
      />
      <span className="text-lg sm:text-xl font-mono text-accent/40 mb-6 font-bold">:</span>
      <CircularDigitSlot
        digit={format2Digits(timeLeft.seconds)}
        label="Secs"
        fraction={timeLeft.seconds / 60}
      />
    </div>
  );
}
