"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DURATION, TROPICAL_EASE } from "@/lib/animations";
import { TESTIMONIALS } from "@/data/testimonials";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function WallOfLove() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper>
      {/* Right-aligned heading */}
      <div className="text-right mb-16" ref={ref}>
        <motion.p
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: DURATION.medium, ease: TROPICAL_EASE }}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          Community
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: DURATION.medium, ease: TROPICAL_EASE, delay: 0.1 }}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
        >
          Wall of <span className="text-gold">Love</span>
        </motion.h2>
      </div>

      {/* CSS Masonry columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: DURATION.medium,
              ease: TROPICAL_EASE,
              delay: 0.2 + i * 0.12,
            }}
            className="break-inside-avoid bg-card border border-card-border rounded-2xl p-6 border-l-2 border-l-gold/40 hover:border-gold/20 transition-colors duration-500"
          >
            {/* Quote mark */}
            <motion.svg
              className="w-8 h-8 text-gold/30 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: DURATION.fast,
                ease: TROPICAL_EASE,
                delay: 0.4 + i * 0.12,
              }}
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </motion.svg>
            <p className="text-text text-sm leading-relaxed mb-4">
              &ldquo;{t.content}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                <span className="text-gold text-xs font-bold">
                  {t.author_name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{t.author_name}</p>
                <p className="text-xs text-text-muted">{t.author_title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
