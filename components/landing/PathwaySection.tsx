"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeUp, fadeLeft, maskReveal, scaleXReveal } from "@/lib/animations";
import type { PathwayContent } from "@/lib/types/page-content";
import SectionWrapper from "@/components/ui/SectionWrapper";

/* ─── Data ─── */
const STEPS = [
  {
    number: "01",
    label: "LEARN",
    title: "Start with Solana",
    description:
      "Free developer resources, workshops, and the community to learn alongside. No experience required.",
    links: [
      { label: "Developer Resources", href: "https://solana.com/developers" },
      { label: "Build on Solana", href: "https://build.superteam.fun" },
      { label: "Newsletters", href: "https://my.superteam.fun/superteam-my-newsletters" },
    ],
  },
  {
    number: "02",
    label: "EARN",
    title: "Get Paid to Build",
    description:
      "Bounties, freelance gigs, grants, and full-time roles. Real money for real work.",
    links: [
      { label: "Browse Bounties", href: "https://superteam.fun/earn" },
      { label: "Find Jobs", href: "https://jobs.solana.com/jobs" },
      { label: "Apply for Grants", href: "https://superteam.fun/earn/grants/" },
    ],
  },
  {
    number: "03",
    label: "BUILD",
    title: "Ship with the Community",
    description:
      "Join hackathons, get mentorship from experienced devs, and launch your project with ecosystem support.",
    links: [
      { label: "Events Calendar", href: "https://lu.ma/mysuperteam" },
      { label: "Brand Kit", href: "https://drive.google.com/drive/folders/1rmpMBbUTSCJnGoaHRi7dYtiOEAqiPVWv" },
    ],
  },
];

/* ─── Escalating intensity per step ─── */
const INTENSITY = [
  { border: "border-card-border", glowBg: 0.04, bottomLine: "via-primary/20", pulse: "2s" },
  { border: "border-primary/15", glowBg: 0.08, bottomLine: "via-primary/35", pulse: "1.4s" },
  { border: "border-primary/25", glowBg: 0.12, bottomLine: "via-primary/50", pulse: "0.8s" },
];

/* ─── Cinematic KL Backdrop ─── */
function CinematicBackdrop() {
  return (
    <>
      {/* KL skyline image */}
      <Image
        src="/images/pathway/kl-backdrop-v1.webp"
        alt=""
        fill
        className="object-cover object-[center_30%]"
        priority
        sizes="100vw"
      />
      {/* Dark overlay: heavier on left (where cards are), lighter on right (towers visible) */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right,
            rgba(13,26,18,0.92) 0%,
            rgba(13,26,18,0.88) 35%,
            rgba(13,26,18,0.7) 55%,
            rgba(13,26,18,0.5) 75%,
            rgba(13,26,18,0.6) 100%
          )`,
        }}
      />
      {/* Top/bottom fade to blend with adjacent sections */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            rgba(13,26,18,1) 0%,
            transparent 15%,
            transparent 85%,
            rgba(13,26,18,1) 100%
          )`,
        }}
      />
      {/* Mobile: stronger center overlay since cards go full-width */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: "rgba(13,26,18,0.75)",
        }}
      />
    </>
  );
}

/* ─── Pathway Card ─── */
function PathwayCard({
  step,
  index,
}: {
  step: { number: string; label: string; title: string; description: string; links: { label: string; href: string }[] };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const intensity = INTENSITY[index];

  return (
    <motion.div
      ref={ref}
      className={`relative bg-bg-deep/80 backdrop-blur-xl border ${intensity.border} rounded-2xl p-7 md:p-8 group cursor-default overflow-hidden`}
      variants={fadeLeft}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index * 0.12}
      whileHover={{
        y: -8,
        borderColor: "rgba(10,177,114,0.3)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={{
        boxShadow: `0 0 ${40 + index * 20}px rgba(10,177,114,${intensity.glowBg * 0.5})`,
      }}
    >
      {/* Ghost number */}
      <span
        className="absolute -top-4 -left-2 font-[family-name:var(--font-display)] text-[7rem] font-black text-primary/[0.03] leading-none select-none pointer-events-none group-hover:text-primary/[0.06] transition-colors duration-500"
      >
        {step.number}
      </span>

      {/* Step label pill */}
      <motion.div
        className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.15 + index * 0.12}
      >
        <span
          className="w-2 h-2 rounded-full bg-primary"
          style={{ animation: `node-ping ${intensity.pulse} ease-out infinite` }}
        />
        <span className="text-primary text-xs font-semibold tracking-widest">
          {step.label}
        </span>
      </motion.div>

      {/* Title */}
      <div className="overflow-hidden mb-3">
        <motion.h3
          className="font-[family-name:var(--font-display)] font-bold text-xl md:text-2xl"
          variants={maskReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2 + index * 0.12}
        >
          {step.title}
        </motion.h3>
      </div>

      {/* Description */}
      <motion.p
        className="text-text-muted text-sm leading-relaxed mb-5"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.3 + index * 0.12}
      >
        {step.description}
      </motion.p>

      {/* Links */}
      <ul className="space-y-2">
        {step.links.map((link, li) => (
          <motion.li
            key={link.label}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.4 + index * 0.12 + li * 0.06}
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors duration-300"
            >
              <span className="inline-block w-6 h-px bg-text-muted/30 group-hover/link:w-10 group-hover/link:bg-primary transition-all duration-300" />
              {link.label}
              <svg
                className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Bottom glow line */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${intensity.bottomLine} to-transparent`}
        variants={scaleXReveal}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.5 + index * 0.12}
        style={{ transformOrigin: "center" }}
      />
    </motion.div>
  );
}

/* ─── Main Section ─── */
export default function PathwaySection({ content }: { content?: PathwayContent | null }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      id="get-started"
      bg="deep"
      bgSlot={<CinematicBackdrop />}
    >
      {/* Two-column layout: cards on left, towers visible on right */}
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
        {/* Left column: header + cards (takes ~55% on desktop) */}
        <div className="md:w-[55%] flex flex-col gap-6">
          {/* Section Header */}
          <div ref={headerRef} className="mb-4 md:mb-8">
            <div className="overflow-hidden">
              <motion.p
                variants={maskReveal}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                custom={0}
                className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
              >
                {content?.eyebrow ?? "Your Path"}
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={maskReveal}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                custom={0.12}
                className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mb-2"
              >
                {content?.headline_1 ?? "Learn. Earn."}
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                variants={maskReveal}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                custom={0.24}
                className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold text-primary"
              >
                {content?.headline_2 ?? "Build."}
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              custom={0.4}
              className="text-text-muted text-lg mt-4 max-w-md"
            >
              {content?.description ?? "Three steps to go from curious to contributor in the Solana ecosystem."}
            </motion.p>
          </div>

          {/* Step Cards */}
          {(content?.steps ?? STEPS).map((step, i) => (
            <PathwayCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Right column: intentionally empty on desktop to reveal the KL towers */}
        <div className="hidden md:block md:w-[45%]" aria-hidden="true" />
      </div>
    </SectionWrapper>
  );
}
