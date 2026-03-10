"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeLeft, fadeRight } from "@/lib/animations";
import { FAQ_ITEMS } from "@/data/faq";
import { SOCIAL_LINKS } from "@/lib/constants";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";

interface FAQSectionProps {
  items?: { question: string; answer: string }[];
}

export default function FAQSection({ items }: FAQSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="faq" bg="warm">
      <div ref={ref} className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left 40%: Sticky heading */}
        <motion.div
          className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start"
          variants={fadeLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-3">
            FAQ
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mb-4">
            Got <span className="text-primary">Questions?</span>
          </h2>
          <p className="text-text-muted mb-8 leading-relaxed">
            Everything you need to know about Superteam Malaysia.
            Can&apos;t find what you&apos;re looking for? Reach out directly.
          </p>
          <Button href={SOCIAL_LINKS.telegram} variant="ghost">
            Ask on Telegram
          </Button>
        </motion.div>

        {/* Right 60%: Accordion */}
        <motion.div
          className="lg:w-[60%]"
          variants={fadeRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.15}
        >
          <Accordion items={items ?? FAQ_ITEMS} />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
