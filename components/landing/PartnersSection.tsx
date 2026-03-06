"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PARTNERS } from "@/data/partners";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      id="partners"
      bg="deep"
      bgSlot={
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, rgba(18,26,15,0.5) 0%, transparent 70%)" }}
        />
      }
    >
      <div ref={ref}>
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
          className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold text-center text-text-muted mb-12"
        >
          Trusted by the best in Solana
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-[900px] mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PARTNERS.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              custom={i * 0.05}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-card-border bg-card/50 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(10,177,114,0.12)] transition-all duration-300 group"
              whileHover={{ y: -2 }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={28}
                height={28}
                className="w-7 h-7 rounded-sm object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <span className="font-[family-name:var(--font-display)] font-bold text-text-muted text-sm group-hover:text-text transition-colors duration-300">
                {partner.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
