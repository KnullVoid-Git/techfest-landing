"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  id: string;
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  badge?: string;
}

export default function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle,
  badge,
}: AccordionItemProps) {
  return (
    <div className={`border-b transition-colors duration-300 ${isOpen ? "border-accent/30 bg-white/[0.015] rounded-xl px-4" : "border-white/10"}`}>
      <motion.button
        type="button"
        id={`accordion-btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${id}`}
        onClick={onToggle}
        whileTap={{ scale: 0.99 }}
        className="w-full py-5 sm:py-6 flex items-center justify-between text-left group transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-lg"
      >
        <div className="flex items-center gap-3 sm:gap-4 pr-4">
          {badge && (
            <span className="font-mono text-[11px] font-semibold tracking-wider text-accent border border-accent/30 bg-accent/10 px-2.5 py-0.5 rounded-full uppercase shrink-0">
              {badge}
            </span>
          )}
          <span className={`text-base sm:text-xl font-medium transition-colors font-display ${isOpen ? "text-accent" : "text-ink group-hover:text-accent"}`}>
            {question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
          className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
            isOpen
              ? "border-accent bg-accent/15 text-accent shadow-[0_0_12px_rgba(57,255,136,0.3)]"
              : "border-white/10 text-ink-muted group-hover:border-accent/40 group-hover:text-accent"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${id}`}
            role="region"
            aria-labelledby={`accordion-btn-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.25, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.15 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-1 text-ink-muted text-sm sm:text-base leading-relaxed pr-8">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
