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
      {/* Section transition edges for alt sections */}
      {alt && (
        <>
          <div className="absolute top-0 left-0 right-0 h-px bg-primary/30 z-[3]"
               style={{ boxShadow: '0 0 20px rgba(10,177,114,0.3), 0 0 60px rgba(10,177,114,0.1)' }} />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[600px] h-24 z-[1]"
               style={{ background: 'radial-gradient(ellipse, rgba(10,177,114,0.12) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/20 z-[3]"
               style={{ boxShadow: '0 0 15px rgba(10,177,114,0.2)' }} />
        </>
      )}
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
