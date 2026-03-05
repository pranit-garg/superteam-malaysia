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
}

export default function SectionWrapper({
  children,
  id,
  className,
  alt = false,
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
      <div className="mx-auto max-w-7xl relative">{children}</div>
    </motion.section>
  );
}
