"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeUp, DURATION, TROPICAL_EASE } from "@/lib/animations";
import { SOCIAL_LINKS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import type { Event } from "@/lib/supabase/types";

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

interface EventsSectionProps {
  events?: Event[] | null;
}

export default function EventsSection({ events }: EventsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const displayEvents = events && events.length > 0 ? events : SAMPLE_EVENTS;

  const eventsSchema = displayEvents.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.start_at,
    location: {
      "@type": "Place",
      name: event.location_name,
    },
    organizer: {
      "@type": "Organization",
      name: "Superteam Malaysia",
      url: "https://superteammy.com",
    },
    eventAttendanceMode: (event.location_name ?? "").toLowerCase().includes("online")
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
  }));

  return (
    <SectionWrapper
      id="events"
      alt
      fullBleed
      bgSlot={
        <>
          <Image
            src="/images/events-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoKAAYABUB8JYgCw7DdSZdXsAAA/ob/ZJnVg52yxsPbBQa393WRk3VtiE3gtAAA"
          />
          <div className="absolute inset-0 bg-bg-alt/60 z-[1]" />
        </>
      }
    >
      {eventsSchema.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header row: left-aligned heading + button right */}
      <div className="max-w-7xl mx-auto mb-10 flex items-end justify-between px-6" ref={ref}>
        <div>
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
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="hidden sm:block"
        >
          <Button href={SOCIAL_LINKS.luma} variant="ghost">
            View All
          </Button>
        </motion.div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg-alt to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg-alt to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 pb-4">
          {displayEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: DURATION.medium,
                ease: TROPICAL_EASE,
                delay: 0.3 + i * 0.12,
              }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="flex-shrink-0 w-[320px] md:w-[350px] snap-start bg-card border border-card-border border-t-2 border-t-primary rounded-sm p-6 flex flex-col cursor-pointer"
            >
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
                {event.location_name ?? "TBA"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile CTA + Powered by Luma */}
      <div className="mt-8 px-6 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <span className="text-xs text-text-muted flex items-center gap-1">
          Powered by <a href="https://lu.ma" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Luma</a>
        </span>
        <div className="sm:hidden">
          <Button href={SOCIAL_LINKS.luma} variant="ghost">
            View All Events
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
