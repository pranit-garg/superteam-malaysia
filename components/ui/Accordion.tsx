"use client";

import { useState } from "react";
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-card-border rounded-xl overflow-hidden bg-card/50"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-card transition-colors"
          >
            <span className="font-[family-name:var(--font-display)] font-medium text-text pr-4">
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === i ? 45 : 0 }}
              transition={{ duration: 0.2, ease: TROPICAL_EASE }}
              className="text-primary text-xl flex-shrink-0"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: TROPICAL_EASE }}
              >
                <div className="px-5 pb-5 text-text-muted text-sm leading-relaxed">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
