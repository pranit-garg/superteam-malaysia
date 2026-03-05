"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/lib/animations";
import { FAQ_ITEMS } from "@/data/faq";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";
import BotanicalOverlay from "@/components/ui/BotanicalOverlay";

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="faq" alt>
      <BotanicalOverlay variant="vine-right" className="opacity-20" />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
          >
            Got <span className="text-primary">Questions?</span>
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
        >
          <Accordion items={FAQ_ITEMS} />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
