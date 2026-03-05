"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { TESTIMONIALS } from "@/data/testimonials";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function WallOfLove() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper>
      <div className="text-center mb-16">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          Community
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
        >
          Wall of <span className="text-gold">Love</span>
        </motion.h2>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i * 0.05}
            className="bg-card border border-card-border rounded-2xl p-6 hover:border-gold/20 transition-colors duration-500"
          >
            <svg
              className="w-8 h-8 text-gold/30 mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
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
      </motion.div>
    </SectionWrapper>
  );
}
