"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, TROPICAL_EASE, DURATION } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";

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

export default function PathwaySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      id="get-started"
      alt
    >
      <div ref={ref}>
        {/* Header */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          Your Path
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mb-16"
        >
          Learn. Earn.{" "}
          <span className="text-primary">Build.</span>
        </motion.h2>

        {/* 3-column pathway */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {/* Connecting dotted line between columns (desktop only) */}
          <div
            className="hidden md:block absolute top-10 left-0 right-0 h-px z-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(10,177,114,0.3) 0px, rgba(10,177,114,0.3) 4px, transparent 4px, transparent 12px)",
            }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: DURATION.medium,
                ease: TROPICAL_EASE,
                delay: 0.2 + i * 0.15,
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.25, ease: TROPICAL_EASE },
              }}
              className="relative pl-6 md:px-6 z-[1] group cursor-default"
            >
              {/* Gradient left accent: primary to transparent, top to bottom */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{
                  background:
                    "linear-gradient(to bottom, #0AB172, transparent)",
                }}
              />

              {/* Hover border glow (left edge intensifies) */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to bottom, #0AB172, #9945FF 60%, transparent)",
                  boxShadow: "0 0 8px rgba(10,177,114,0.4)",
                }}
              />

              {/* Step number + label */}
              <div className="relative flex items-baseline gap-3 mb-4">
                {/* Radial glow behind the number */}
                <div
                  className="absolute -left-3 -top-3 w-16 h-16 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(10,177,114,0.12) 0%, transparent 70%)",
                  }}
                />
                <span className="relative font-[family-name:var(--font-mono)] text-4xl font-bold text-primary/20 leading-none group-hover:text-primary/40 transition-colors duration-300">
                  {step.number}
                </span>
                <span className="relative text-primary text-xs font-semibold tracking-widest">
                  {step.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-[family-name:var(--font-display)] font-bold text-xl mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-text-muted text-sm leading-relaxed mb-5">
                {step.description}
              </p>

              {/* Link pills */}
              <div className="flex flex-wrap gap-2">
                {step.links.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-card-border bg-card text-xs text-text-muted hover:text-primary hover:border-primary/30 transition-colors"
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(10,177,114,0.4)",
                      boxShadow: "0 0 12px rgba(10,177,114,0.1)",
                      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {link.label}
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
