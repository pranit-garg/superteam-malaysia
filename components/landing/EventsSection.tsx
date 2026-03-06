"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeUp, DURATION, TROPICAL_EASE } from "@/lib/animations";
import { SOCIAL_LINKS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import SectionWrapper from "@/components/ui/SectionWrapper";
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
      bg="forest"
      fullBleed
      bgSlot={
        <>
          <Image
            src="/images/events-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoKAAYABUB8JYgCw7DdSZdXsAAA/ob/ZJnVg52yxsPbBQa393WRk3VtiE3gtAAA"
          />
          <div className="absolute inset-0 bg-bg/70 z-[1]" />
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
            What&apos;s <span className="text-primary">Happening</span>
          </motion.h2>
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

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
              className="flex-shrink-0 w-[320px] md:w-[350px] snap-start bg-bg/80 backdrop-blur-md border border-card-border border-t-2 border-t-primary rounded-sm p-6 flex flex-col cursor-pointer"
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
            {/* View All Events card */}
            <motion.a
              href={SOCIAL_LINKS.luma}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: DURATION.medium,
                ease: TROPICAL_EASE,
                delay: 0.3 + displayEvents.length * 0.12,
              }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="flex-shrink-0 w-[320px] md:w-[350px] snap-start bg-primary/5 backdrop-blur-md border border-primary/20 border-t-2 border-t-primary rounded-sm p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
              <span className="font-[family-name:var(--font-display)] font-bold text-primary text-lg">
                View All Events
              </span>
              <span className="text-text-muted text-sm mt-1">on Luma</span>
            </motion.a>
        </div>
      </div>

    </SectionWrapper>
  );
}
