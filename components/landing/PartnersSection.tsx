"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { PARTNERS } from "@/data/partners";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="partners" alt>
      <div className="text-center mb-16">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          Ecosystem
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
        >
          Partners & <span className="text-primary">Collaborators</span>
        </motion.h2>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
      >
        {PARTNERS.map((partner, i) => (
          <motion.div
            key={partner.name}
            variants={fadeUp}
            custom={i * 0.05}
            className="group bg-card border border-card-border rounded-2xl p-8 flex items-center justify-center hover:border-primary/30 hover:shadow-[0_0_30px_rgba(20,241,149,0.08)] transition-all duration-500 cursor-pointer"
          >
            <span className="font-[family-name:var(--font-display)] font-bold text-text-muted group-hover:text-primary transition-colors duration-300 text-center">
              {partner.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
