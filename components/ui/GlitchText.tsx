"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
}

const GLITCH_CHARS = "01!@#$%^&*<>[]{}/*~_=+";

export default function GlitchText({
  text,
  className = "",
  scrambleOnHover = true,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return text[index];
            }
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }

      iterations += 1 / 2;
    }, 30);
  };

  return (
    <motion.span
      onMouseEnter={scrambleOnHover ? triggerGlitch : undefined}
      className={`inline-block relative cursor-default select-none ${
        isGlitching ? "text-accent transition-colors" : ""
      } ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
    >
      {displayText}
      {isGlitching && (
        <>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 -translate-x-[2px] translate-y-[1px] text-cyber-blue opacity-70 pointer-events-none mix-blend-screen"
          >
            {displayText}
          </span>
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 translate-x-[2px] -translate-y-[1px] text-[#ff0055] opacity-70 pointer-events-none mix-blend-screen"
          >
            {displayText}
          </span>
        </>
      )}
    </motion.span>
  );
}
