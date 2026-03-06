"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, scaleXReveal } from "@/lib/animations";
import { SOCIAL_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import SeamlessVideo from "@/components/ui/SeamlessVideo";

export default function JoinCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 md:py-40 px-6 overflow-hidden bg-bg">
      {/* Background image */}
      <div className="absolute inset-0">
        <SeamlessVideo
          src="/videos/cta-bg.mp4"
          poster="/images/cta-bg.webp"
          className="absolute inset-0 w-full h-full"
          overlay="bg-gradient-to-b from-bg/50 via-bg/20 to-bg/60"
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Animated horizontal rule */}
        <motion.div
          className="w-24 h-px bg-primary mx-auto mb-8"
          variants={scaleXReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ originX: 0.5 }}
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-4"
        >
          Ready to build?
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-black mb-6"
        >
          Your next chapter
          <br />
          starts <span className="text-primary">here</span>.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Builders, designers, and creators in Malaysia&apos;s most
          active Solana community. Join the Telegram, start contributing, and grow with us.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href={SOCIAL_LINKS.telegram} size="lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Join Telegram
          </Button>
          <Button href={SOCIAL_LINKS.twitter} variant="ghost" size="lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow on X
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
