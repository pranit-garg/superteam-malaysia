"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  maskReveal,
  scaleXReveal,
  pathwayCardHover,
  nodePulse,
  TROPICAL_EASE,
  DURATION,
} from "@/lib/animations";
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
      { label: "Learn Rust", href: "https://doc.rust-lang.org/book/" },
      { label: "Newsletters", href: "https://superteam.fun" },
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
      { label: "Find Jobs", href: "https://superteam.fun/earn" },
      { label: "Apply for Grants", href: "https://superteam.fun/earn" },
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
      { label: "Brand Kit", href: "#" },
    ],
  },
];

/* ─── Escalating intensity per step ─── */
const INTENSITY = [
  { border: "border-card-border", ghostOpacity: "text-primary/[0.03]", glowBg: 0.04, nodeR: 8, bottomLine: "via-primary/20" },
  { border: "border-primary/15", ghostOpacity: "text-primary/[0.05]", glowBg: 0.08, nodeR: 10, bottomLine: "via-primary/35" },
  { border: "border-primary/25", ghostOpacity: "text-primary/[0.08]", glowBg: 0.12, nodeR: 14, bottomLine: "via-primary/50" },
];

/* ─── Pulse speeds per step ─── */
const PULSE_DURATIONS = ["2s", "1.4s", "0.8s"];

/* ─── Background Gradients (bgSlot) ─── */
function BackgroundGradients() {
  return (
    <>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(10,177,114,0.03) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(10,177,114,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(10,177,114,0.12) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 dot-grid opacity-30" />
    </>
  );
}

/* ─── Vine Connector (scroll-driven SVG) ─── */
function VineConnector({ cardPositions }: { cardPositions: number[] }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div ref={containerRef} className="absolute inset-0 hidden md:block">
      <svg
        className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-24"
        viewBox="0 0 96 900"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Main vine */}
        <motion.path
          d="M48 0 C48 80, 28 140, 48 220 C68 300, 28 380, 48 460 C68 540, 28 620, 48 700 C68 780, 48 850, 48 900"
          className="botanical-line"
          style={{ pathLength, strokeWidth: 2 }}
        />
        {/* Tendrils extending toward cards */}
        <motion.path
          d="M48 220 C30 215, 15 218, 5 220"
          className="botanical-line"
          style={{ pathLength, opacity: 0.3, strokeWidth: 1 }}
        />
        <motion.path
          d="M48 460 C66 455, 81 458, 91 460"
          className="botanical-line"
          style={{ pathLength, opacity: 0.3, strokeWidth: 1 }}
        />
        <motion.path
          d="M48 700 C30 695, 15 698, 5 700"
          className="botanical-line"
          style={{ pathLength, opacity: 0.3, strokeWidth: 1 }}
        />
        {/* Node circles at card junctions */}
        {[220, 460, 700].map((cy, i) => (
          <motion.circle
            key={cy}
            cx={48}
            cy={cy}
            r={INTENSITY[i].nodeR}
            fill="rgba(10,177,114,0.2)"
            stroke="rgba(10,177,114,0.5)"
            strokeWidth={1.5}
            variants={nodePulse}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.2 + i * 0.3}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── Mobile Vine ─── */
function MobileVine() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div ref={containerRef} className="absolute left-4 top-0 bottom-0 md:hidden">
      <svg className="h-full w-8" viewBox="0 0 32 900" preserveAspectRatio="none" fill="none">
        <motion.path
          d="M16 0 C16 100, 8 180, 16 280 C24 380, 8 480, 16 580 C24 680, 16 800, 16 900"
          className="botanical-line"
          style={{ pathLength, strokeWidth: 2 }}
        />
        {[220, 460, 700].map((cy, i) => (
          <motion.circle
            key={cy}
            cx={16}
            cy={cy}
            r={INTENSITY[i].nodeR * 0.75}
            fill="rgba(10,177,114,0.2)"
            stroke="rgba(10,177,114,0.5)"
            strokeWidth={1.5}
            variants={nodePulse}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0.2 + i * 0.3}
          />
        ))}
      </svg>
    </div>
  );
}

/* ─── Pathway Card ─── */
function PathwayCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const intensity = INTENSITY[index];
  const isLeft = index % 2 === 0; // 0,2 = left, 1 = right (desktop)
  const cardVariant = isLeft ? fadeLeft : fadeRight;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-6 md:gap-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Horizontal connector from vine to card (desktop) */}
      <motion.div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px w-12 origin-${isLeft ? "right" : "left"} ${
          isLeft ? "left-[calc(50%-48px)]" : "right-[calc(50%-48px)]"
        }`}
        style={{
          background: `linear-gradient(${isLeft ? "to left" : "to right"}, rgba(10,177,114,0.4), transparent)`,
        }}
        variants={scaleXReveal}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0}
      />

      {/* Spacer for vine column (desktop) */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card */}
      <motion.div
        className={`relative md:w-1/2 ml-12 md:ml-0 bg-card/80 backdrop-blur-md border ${intensity.border} rounded-2xl p-8 group cursor-default overflow-hidden`}
        variants={cardVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.1}
        whileHover={{
          y: -12,
          borderColor: "rgba(10,177,114,0.3)",
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        style={{
          boxShadow: `0 0 ${40 + index * 20}px rgba(10,177,114,${intensity.glowBg * 0.5})`,
        }}
      >
        {/* Ghost number */}
        <motion.span
          className={`absolute -top-4 -left-2 font-[family-name:var(--font-display)] text-[8rem] font-black ${intensity.ghostOpacity} leading-none select-none pointer-events-none group-hover:text-primary/[0.08] transition-colors duration-500`}
          variants={maskReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
        >
          {step.number}
        </motion.span>

        {/* Step label pill */}
        <motion.div
          className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.3}
        >
          <span
            className="w-2 h-2 rounded-full bg-primary"
            style={{ animation: `node-ping ${PULSE_DURATIONS[index]} ease-out infinite` }}
          />
          <span className="text-primary text-xs font-semibold tracking-widest">
            {step.label}
          </span>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden mb-3">
          <motion.h3
            className="font-[family-name:var(--font-display)] font-bold text-2xl"
            variants={maskReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.35}
          >
            {step.title}
          </motion.h3>
        </div>

        {/* Description */}
        <motion.p
          className="text-text-muted text-sm leading-relaxed mb-6"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.5}
        >
          {step.description}
        </motion.p>

        {/* Links as list items */}
        <ul className="space-y-2">
          {step.links.map((link, li) => (
            <motion.li
              key={link.label}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.6 + li * 0.08}
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
          custom={0.7}
          style={{ transformOrigin: "center" }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function PathwaySection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      id="get-started"
      alt
      bgSlot={<BackgroundGradients />}
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-20">
        <div className="overflow-hidden">
          <motion.p
            variants={maskReveal}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            custom={0}
            className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
          >
            Your Path
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
            Learn. Earn.
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
            Build.
          </motion.h2>
        </div>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          custom={0.4}
          className="text-text-muted text-lg mt-4 max-w-lg mx-auto"
        >
          Three steps to go from curious to contributor in the Solana ecosystem.
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <VineConnector cardPositions={[220, 460, 700]} />
        <MobileVine />
        <div className="space-y-16 md:space-y-40">
          {STEPS.map((step, i) => (
            <PathwayCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
