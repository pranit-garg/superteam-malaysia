"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeUp, DURATION } from "@/lib/animations";
import { PARTNERS } from "@/data/partners";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const mid = Math.ceil(PARTNERS.length / 2);
  const row1 = PARTNERS.slice(0, mid);
  const row2 = PARTNERS.slice(mid);

  const row1Double = [...row1, ...row1, ...row1, ...row1];
  const row2Double = [...row2, ...row2, ...row2, ...row2];

  return (
    <SectionWrapper id="partners" alt fullBleed>
      <div ref={ref} className="max-w-7xl mx-auto px-6 mb-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3 text-center"
        >
          Ecosystem
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold text-center text-text-muted"
        >
          Trusted by the best in Solana
        </motion.h2>
      </div>

      <motion.div
        className="space-y-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DURATION.slow, delay: 0.2 }}
      >
        {/* Row 1: scrolls left */}
        <div className="group relative">
          <div
            className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
            style={{ animation: "marquee 30s linear infinite" }}
          >
            {row1Double.map((partner, i) => (
              <a
                key={`r1-${i}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full px-5 py-2.5 border border-card-border bg-card/50 whitespace-nowrap hover:border-primary/30 transition-all duration-300 group/card"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-sm object-contain grayscale group-hover/card:grayscale-0 transition-all duration-300"
                />
                <span className="font-[family-name:var(--font-display)] font-bold text-text-muted text-sm group-hover/card:text-text transition-colors duration-300">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Row 2: scrolls right */}
        <div className="group relative">
          <div
            className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
            style={{ animation: "marquee-reverse 35s linear infinite" }}
          >
            {row2Double.map((partner, i) => (
              <a
                key={`r2-${i}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full px-5 py-2.5 border border-card-border bg-card/50 whitespace-nowrap hover:border-primary/30 transition-all duration-300 group/card"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-sm object-contain grayscale group-hover/card:grayscale-0 transition-all duration-300"
                />
                <span className="font-[family-name:var(--font-display)] font-bold text-text-muted text-sm group-hover/card:text-text transition-colors duration-300">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
