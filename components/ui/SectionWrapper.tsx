"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { sectionReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

const BG_COLORS = {
  forest: "bg-bg",
  deep: "bg-bg",
  warm: "bg-bg",
} as const;

const BG_HEX = {
  forest: "#0d1a12",
  deep: "#0d1a12",
  warm: "#0d1a12",
} as const;

type BgVariant = keyof typeof BG_COLORS;

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  alt?: boolean;
  bg?: BgVariant;
  fullBleed?: boolean;
  bgSlot?: React.ReactNode;
}

export default function SectionWrapper({
  children,
  id,
  className,
  alt = false,
  bg,
  fullBleed = false,
  bgSlot,
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // alt is a legacy alias for "deep"
  const resolvedBg: BgVariant = bg ?? (alt ? "deep" : "forest");
  const hex = BG_HEX[resolvedBg];

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={sectionReveal}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "relative py-24 md:py-32 px-6",
        BG_COLORS[resolvedBg],
        className
      )}
    >
      {/* Soft gradient transition zones for bgSlot content */}
      <div
        className="absolute top-0 left-0 right-0 h-24 z-[3] pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, ${hex}, transparent)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-[3] pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${hex}, transparent)`,
        }}
      />
      {bgSlot && (
        <div className="absolute inset-0 overflow-hidden">
          {bgSlot}
        </div>
      )}
      {fullBleed ? (
        <div className="relative z-[2]">{children}</div>
      ) : (
        <div className="mx-auto max-w-7xl relative z-[2]">{children}</div>
      )}
    </motion.section>
  );
}
