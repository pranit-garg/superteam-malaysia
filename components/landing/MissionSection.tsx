"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowCard from "@/components/ui/GlowCard";
import BotanicalOverlay from "@/components/ui/BotanicalOverlay";

const PILLARS = [
  {
    icon: "🛠",
    title: "Builder Support",
    description:
      "Mentorship, code reviews, and technical guidance from experienced Solana developers in the region.",
  },
  {
    icon: "🎪",
    title: "Events & Hackathons",
    description:
      "Regular meetups, workshops, and hackathons across KL, Penang, and JB. Learn by building together.",
  },
  {
    icon: "💰",
    title: "Grants & Funding",
    description:
      "Direct access to Solana Foundation grants, ecosystem funding, and project investment opportunities.",
  },
  {
    icon: "🎯",
    title: "Jobs & Bounties",
    description:
      "Curated opportunities from top Solana projects. Bounties, freelance gigs, and full-time roles.",
  },
  {
    icon: "📚",
    title: "Education",
    description:
      "Workshops on Rust, Anchor, DeFi, NFTs, and more. From beginner-friendly intros to advanced deep dives.",
  },
  {
    icon: "🌏",
    title: "Ecosystem Access",
    description:
      "Connections to the global Superteam network, Solana Labs, and ecosystem partners worldwide.",
  },
];

export default function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="mission" alt>
      <BotanicalOverlay variant="leaf-corner" className="top-0 right-0 opacity-30" />

      <div className="text-center mb-16">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          What We Do
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
        >
          Building the Solana Ecosystem
          <br className="hidden md:block" />
          <span className="text-primary"> in Malaysia</span>
        </motion.h2>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {PILLARS.map((pillar, i) => (
          <motion.div key={pillar.title} variants={fadeUp} custom={i * 0.05}>
            <GlowCard className="h-full">
              <span className="text-2xl mb-3 block">{pillar.icon}</span>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg mb-2">
                {pillar.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {pillar.description}
              </p>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
