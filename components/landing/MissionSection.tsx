"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowCard from "@/components/ui/GlowCard";
import BotanicalOverlay from "@/components/ui/BotanicalOverlay";

const PILLARS = [
  {
    icon: "🛠",
    title: "Builder Support",
    description:
      "Mentorship, code reviews, and technical help from experienced Solana devs based in the region.",
  },
  {
    icon: "🎪",
    title: "Events & Hackathons",
    description:
      "Meetups, workshops, and hackathons across KL, Penang, and JB. Show up and build with others.",
  },
  {
    icon: "💰",
    title: "Grants & Funding",
    description:
      "Solana Foundation grants, ecosystem funding, and project investment. We help you find and apply.",
  },
  {
    icon: "🎯",
    title: "Jobs & Bounties",
    description:
      "Bounties, freelance gigs, and full-time roles from Solana projects looking for talent.",
  },
  {
    icon: "📚",
    title: "Education",
    description:
      "Workshops covering Rust, Anchor, DeFi, NFTs, and more. Beginner intros to deep technical dives.",
  },
  {
    icon: "🌏",
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
      bgSlot={
        <>
          <Image
            src="/images/mission-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAADQAQCdASoKAAYABUB8JYgCdAD0qfo4AAD+JiJ9wa4wb+k+J7TcB2Tz+9tePxY0GHcAAA=="
          />
          <div className="absolute inset-0 bg-bg-alt/40 z-[1]" />
        </>
      }
    >
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
          Growing Solana
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
