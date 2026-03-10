"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeUp, DURATION } from "@/lib/animations";
import type { InActionContent } from "@/lib/types/page-content";
import SectionWrapper from "@/components/ui/SectionWrapper";

const IN_ACTION_IMAGES = [
  { src: "/images/in-action/photo-2.jpg", alt: "Superteam Malaysia community event" },
  { src: "/images/in-action/photo-3.jpg", alt: "Bounty Hunter workshop session" },
  { src: "/images/in-action/photo-4.jpg", alt: "Superteam MY meetup activities" },
  { src: "/images/in-action/photo-5.jpg", alt: "Solana Network School Outpost talk" },
  { src: "/images/in-action/photo-6.jpg", alt: "Community builders brainstorming" },
  { src: "/images/in-action/photo-7.jpg", alt: "Superteam Malaysia event" },
  { src: "/images/in-action/photo-8.jpg", alt: "Builder showcase presentation" },
];

export default function InActionSection({ content }: { content?: InActionContent | null }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const images = content?.images ?? IN_ACTION_IMAGES;
  const doubledImages = [...images, ...images];

  return (
    <SectionWrapper id="in-action" bg="forest" fullBleed>
      <div ref={ref} className="max-w-7xl mx-auto px-6 mb-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
        >
          {content?.eyebrow ?? "In Action"}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
        >
          {content?.headline ?? "Superteam Malaysia "}
          <span className="text-primary">{content?.headline_accent ?? "In Action"}</span>
        </motion.h2>
      </div>

      <motion.div
        className="overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: DURATION.slow, delay: 0.2 }}
      >
        <div className="group relative">
          <div
            className="flex gap-4 w-max group-hover:[animation-play-state:paused]"
            style={{ animation: "marquee 45s linear infinite" }}
          >
            {doubledImages.map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[300px] md:w-[400px] rounded-xl overflow-hidden border border-card-border hover:border-primary/30 transition-all duration-300"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={267}
                  className="w-full h-[200px] md:h-[267px] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
