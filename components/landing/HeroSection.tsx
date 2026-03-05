"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { maskReveal, fadeUp, STAGGER, TROPICAL_EASE } from "@/lib/animations";
import { SOCIAL_LINKS } from "@/lib/constants";
import BotanicalOverlay from "@/components/ui/BotanicalOverlay";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient layer (replaced with image when AI images generated) */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-alt to-bg" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />
      </motion.div>

      {/* Botanical overlays */}
      <BotanicalOverlay variant="vine-left" />
      <BotanicalOverlay variant="vine-right" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Solana Ecosystem &middot; Malaysia
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            variants={maskReveal}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight"
          >
            Where Malaysia
            <br />
            <span className="text-primary">Builds Solana</span>
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Builders, creators, and founders growing Solana in Southeast Asia.
          500+ members, real projects shipped, no gatekeeping.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href={SOCIAL_LINKS.telegram} size="lg">
            Join Community
          </Button>
          <Button
            href={SOCIAL_LINKS.superteamGlobal + "/earn"}
            variant="ghost"
            size="lg"
          >
            Earn on Solana
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-text-muted/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
