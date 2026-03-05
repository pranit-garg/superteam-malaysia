"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TROPICAL_EASE } from "@/lib/animations";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback((i: number) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    hoverTimerRef.current = setTimeout(() => {
      setOpenIndex(i);
    }, 200);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    leaveTimerRef.current = setTimeout(() => {
      setOpenIndex(null);
    }, 300);
  }, []);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={i}
            animate={{
              boxShadow: isOpen
                ? "0 8px 32px rgba(10,177,114,0.12), 0 2px 8px rgba(10,177,114,0.08)"
                : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.3, ease: TROPICAL_EASE }}
            className="rounded-xl overflow-hidden"
            style={{
              background: isOpen
                ? "linear-gradient(135deg, rgba(10,177,114,0.15), rgba(10,177,114,0.05)) padding-box, linear-gradient(135deg, #0AB172, rgba(10,177,114,0.3)) border-box"
                : undefined,
              border: isOpen ? "1px solid transparent" : undefined,
            }}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Inner wrapper for non-open items (keeps the original border style) */}
            <div
              className={
                isOpen
                  ? ""
                  : "border border-card-border rounded-xl bg-card/50"
              }
            >
              <button
                id={`accordion-trigger-${i}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${i}`}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-card/60 transition-colors rounded-xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <span className="font-[family-name:var(--font-display)] font-medium text-text pr-4">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: TROPICAL_EASE }}
                  className="text-primary text-xl flex-shrink-0"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`accordion-panel-${i}`}
                    role="region"
                    aria-labelledby={`accordion-trigger-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.35, ease: TROPICAL_EASE },
                      opacity: { duration: 0.25, ease: TROPICAL_EASE },
                    }}
                  >
                    <div className="px-5 pb-5 text-text-muted text-sm leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
