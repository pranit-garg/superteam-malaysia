"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { maskReveal, fadeUp } from "@/lib/animations";
import { SOCIAL_LINKS } from "@/lib/constants";
import BotanicalOverlay from "@/components/ui/BotanicalOverlay";
import Button from "@/components/ui/Button";
import SeamlessVideo from "@/components/ui/SeamlessVideo";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video layer - static, no parallax */}
      <div className="absolute inset-0 z-0">
        <SeamlessVideo
          src="/videos/hero-bg.mp4"
          poster="/images/hero-bg.webp"
          className="absolute inset-0 w-full h-full"
          eager
          overlay="bg-gradient-to-b from-bg/70 via-bg/35 to-bg/60"
        />
      </div>

      {/* Botanical overlays */}
      <BotanicalOverlay variant="vine-left" />
      <BotanicalOverlay variant="vine-right" />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity }}
      >
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
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
        >
          The home for Solana builders in Malaysia. Ship projects, earn bounties, grow together.
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

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-text-muted/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
