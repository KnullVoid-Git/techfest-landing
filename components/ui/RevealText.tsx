"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "words" | "chars";
  highlight?: string[];
  highlightClass?: string;
  inViewTrigger?: boolean;
}

export default function RevealText({
  text,
  tag: Tag = "h1",
  className = "",
  delay = 0.1,
  stagger = 0.04,
  mode = "words",
  highlight = [],
  highlightClass = "text-accent text-glow",
  inViewTrigger = true,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldAnimate = inViewTrigger ? isInView : true;

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Tag className={className} aria-label={text} ref={ref as unknown as React.Ref<any>}>
      <motion.span
        className="inline-block"
        variants={containerVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
      >
        {mode === "words" ? (
          words.map((word, wordIndex) => {
            const isHighlighted = highlight.some(
              (h) => word.toLowerCase().includes(h.toLowerCase())
            );
            return (
              <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em] align-top">
                <motion.span
                  variants={itemVariants}
                  className={`inline-block ${
                    isHighlighted ? highlightClass : ""
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            );
          })
        ) : (
          text.split("").map((char, charIndex) => (
            <span key={charIndex} className="inline-block overflow-hidden align-top">
              <motion.span variants={itemVariants} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))
        )}
      </motion.span>
    </Tag>
  );
}
