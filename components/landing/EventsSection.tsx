"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SOCIAL_LINKS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";

// Sample events (replaced by Supabase data in production)
const SAMPLE_EVENTS = [
  {
    id: "1",
    title: "Solana Developer Workshop: Building with Anchor",
    start_at: "2026-03-20T14:00:00+08:00",
    location_name: "WeWork KL Sentral",
    event_type: "Workshop",
    is_featured: true,
  },
  {
    id: "2",
    title: "Superteam MY Monthly Meetup",
    start_at: "2026-03-28T18:30:00+08:00",
    location_name: "Common Ground TTDI",
    event_type: "Meetup",
    is_featured: false,
  },
  {
    id: "3",
    title: "DeFi Deep Dive: Yield Strategies on Solana",
    start_at: "2026-04-05T15:00:00+08:00",
    location_name: "Online (Zoom)",
    event_type: "Workshop",
    is_featured: false,
  },
];

export default function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper id="events" alt>
      <div className="text-center mb-16">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          Events
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
        >
          Learn, Build, <span className="text-primary">Connect</span>
        </motion.h2>
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
      >
        {SAMPLE_EVENTS.map((event, i) => (
          <motion.div key={event.id} variants={fadeUp} custom={i * 0.05}>
            <GlowCard className="h-full flex flex-col">
              {/* Date badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-primary text-xs font-medium font-[family-name:var(--font-mono)]">
                    {formatDate(event.start_at)}
                  </span>
                </div>
                <span className="text-xs text-text-muted px-2 py-1 rounded-full border border-card-border">
                  {event.event_type}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-display)] font-bold text-lg mb-3 flex-1">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-text-muted text-sm">
                <svg
                  className="w-4 h-4 text-primary/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {event.location_name}
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <Button href={SOCIAL_LINKS.luma} variant="ghost">
          View All Events
        </Button>
      </div>
    </SectionWrapper>
  );
}
