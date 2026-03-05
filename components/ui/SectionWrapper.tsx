"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { sectionReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  alt?: boolean;
  fullBleed?: boolean;
  bgSlot?: React.ReactNode;
}

export default function SectionWrapper({
  children,
  id,
  className,
  alt = false,
  fullBleed = false,
  bgSlot,
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={sectionReveal}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn(
        "relative py-24 md:py-32 px-6",
        alt ? "bg-bg-alt" : "bg-bg",
        className
      )}
    >
      {bgSlot && (
        <div className="absolute inset-0 overflow-hidden">
          {bgSlot}
        </div>
      )}
      {fullBleed ? (
        <div className="relative z-[1]">{children}</div>
      ) : (
        <div className="mx-auto max-w-7xl relative z-[1]">{children}</div>
      )}
    </motion.section>
  );
}
