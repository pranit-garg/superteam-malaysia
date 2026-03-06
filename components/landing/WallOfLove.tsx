"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/lib/animations";
import { TESTIMONIALS, ROW_1_INDICES, ROW_2_INDICES, getHandle } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BotanicalOverlay from "@/components/ui/BotanicalOverlay";

/* ─── Size-based widths ─── */
const SIZE_WIDTHS: Record<Testimonial["size"], string> = {
  compact: "w-[280px] md:w-[300px]",
  standard: "w-[320px] md:w-[360px]",
  featured: "w-[380px] md:w-[440px]",
};

/* ─── Background ─── */
function WallBackground() {
  return (
    <>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(10,177,114,0.04) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(10,177,114,0.03) 0%, transparent 70%)" }}
      />
    </>
  );
}

/* ─── External link icon (appears on hover) ─── */
function ExternalLinkIcon() {
  return (
    <svg
      className="absolute top-4 right-4 w-4 h-4 text-primary opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </svg>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const isTweet = testimonial.is_tweet;
  const isFeatured = testimonial.size === "featured";
  const tweetUrl = isTweet
    ? `https://x.com/${getHandle(testimonial)}/status/${testimonial.tweet_id}`
    : undefined;

  const cardContent = (
    <div className={`flex-1 flex flex-col bg-gradient-to-br from-primary/20 via-card-border to-primary/10 rounded-2xl p-px group-hover/card:from-primary/40 group-hover/card:via-primary/20 group-hover/card:to-primary/20 transition-all duration-500`}>
      <div className="bg-bg/90 backdrop-blur-sm rounded-2xl p-6 flex-1 flex flex-col group-hover/card:-translate-y-1.5 transition-transform duration-500 ease-out relative overflow-hidden">
        {/* External link icon for tweets */}
        {isTweet && <ExternalLinkIcon />}

        {/* Featured decorative quote */}
        {isFeatured && (
          <svg
            className="absolute top-4 right-4 w-16 h-16 text-primary/[0.07]"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        )}

        {/* Tweet badge with actual handle */}
        {isTweet && (
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-text-muted/50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="text-xs text-primary/60 font-medium">{testimonial.author_title}</span>
          </div>
        )}

        {/* Quote content */}
        <p className={`text-text leading-relaxed mb-4 flex-1 ${isFeatured ? "text-base" : "text-sm"}`}>
          {isTweet ? (
            testimonial.content
          ) : (
            <>
              <span className="text-primary/40">&ldquo;</span>
              {testimonial.content}
              <span className="text-primary/40">&rdquo;</span>
            </>
          )}
        </p>

        {/* Author row */}
        <div className="flex items-center gap-3">
          {testimonial.avatar_url ? (
            <img
              src={testimonial.avatar_url}
              alt={testimonial.author_name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border-2 border-transparent group-hover/card:border-primary/50 transition-colors duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_8px_rgba(10,177,114,0.15)]">
              <span className="text-primary text-xs font-bold">
                {testimonial.author_name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">{testimonial.author_name}</p>
            <p className="text-xs text-text-muted">{testimonial.author_title}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isTweet) {
    return (
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${SIZE_WIDTHS[testimonial.size]} flex-shrink-0 group/card flex flex-col`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className={`${SIZE_WIDTHS[testimonial.size]} flex-shrink-0 group/card flex flex-col`}>
      {cardContent}
    </div>
  );
}

/* ─── Marquee Row ─── */
function MarqueeRow({
  indices,
  direction = "left",
  duration = "30s",
}: {
  indices: number[];
  direction?: "left" | "right";
  duration?: string;
}) {
  const items = indices.map((i) => TESTIMONIALS[i]);
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="group relative overflow-hidden">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-bg-deep to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-bg-deep to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-stretch gap-5 w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `${direction === "left" ? "marquee" : "marquee-reverse"} ${duration} linear infinite`,
        }}
      >
        {repeated.map((t, i) => (
          <TestimonialCard key={`${direction}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function WallOfLove() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <SectionWrapper fullBleed bg="deep" bgSlot={<WallBackground />}>
      {/* Botanical canopy overlay */}
      <BotanicalOverlay variant="canopy" className="opacity-30" />

      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 text-center mb-12">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          custom={0}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          Community
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
        >
          Voices from the{" "}
          <span className="text-primary">Community</span>
        </motion.h2>
      </div>

      {/* Dual-row marquee */}
      <div className="space-y-5">
        <MarqueeRow indices={ROW_1_INDICES} direction="left" duration="30s" />
        <MarqueeRow indices={ROW_2_INDICES} direction="right" duration="38s" />
      </div>
    </SectionWrapper>
  );
}
