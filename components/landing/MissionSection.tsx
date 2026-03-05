"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, TROPICAL_EASE, DURATION } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";


const PILLARS = [
  {
    title: "Builder Support",
    description:
      "Mentorship, code reviews, and technical help from experienced Solana devs based in the region.",
  },
  {
    title: "Events & Hackathons",
    description:
      "Meetups, workshops, and hackathons across KL, Penang, and JB. Show up and build with others.",
  },
  {
    title: "Grants & Funding",
    description:
      "Solana Foundation grants, ecosystem funding, and project investment. We help you find and apply.",
  },
  {
    title: "Jobs & Bounties",
    description:
      "Bounties, freelance gigs, and full-time roles from Solana projects looking for talent.",
  },
  {
    title: "Education",
    description:
      "Workshops covering Rust, Anchor, DeFi, NFTs, and more. Beginner intros to deep technical dives.",
  },
  {
    title: "Ecosystem Access",
    description:
      "Connections to the global Superteam network, Solana Foundation, and ecosystem partners worldwide.",
  },
];

export default function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      id="mission"
      alt
    >
      <div ref={ref}>
        {/* Left-aligned heading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          Who We Are
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mb-4"
        >
          Creatives, Developers, Operators
          <br className="hidden md:block" />
          <span className="text-primary"> Building Solana</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-text-muted text-base md:text-lg leading-relaxed max-w-3xl mb-16"
        >
          We value the sovereignty that comes with founding a company, the skin in the game that comes with investing, and the joy that comes with getting sh*t done.
        </motion.p>

        {/* Numbered vertical list */}
        <div className="space-y-0">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: DURATION.medium,
                ease: TROPICAL_EASE,
                delay: 0.2 + i * 0.1,
              }}
              className="group relative flex items-start gap-6 md:gap-8 py-6 border-b border-card-border/50 last:border-b-0 cursor-default"
            >
              {/* Hover background highlight */}
              <div className="absolute inset-0 -mx-4 rounded-lg bg-primary/0 group-hover:bg-primary/[0.04] transition-colors duration-300 pointer-events-none" />

              {/* Left accent line that reveals on hover */}
              <div
                className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 origin-top scale-y-0 group-hover:scale-y-100"
                style={{
                  background: "linear-gradient(to bottom, #0AB172, transparent)",
                }}
              />

              {/* Number */}
              <span className="relative font-[family-name:var(--font-mono)] text-4xl md:text-5xl font-bold text-text-muted/20 group-hover:text-primary/50 leading-none shrink-0 w-16 md:w-20 transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Vertical divider */}
              <motion.div
                className="w-px self-stretch shrink-0"
                initial={{ scaleY: 0, backgroundColor: "rgba(14, 203, 129, 0.22)" }}
                animate={
                  isInView
                    ? { scaleY: 1, backgroundColor: "rgba(14, 203, 129, 0.22)" }
                    : {}
                }
                transition={{
                  duration: DURATION.slow,
                  ease: TROPICAL_EASE,
                  delay: 0.3 + i * 0.1,
                }}
                style={{ originY: 0 }}
              />

              {/* Content */}
              <div className="relative min-w-0">
                <h3 className="font-[family-name:var(--font-display)] font-bold text-lg md:text-xl mb-1 group-hover:text-primary/90 transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
