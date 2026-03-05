"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { vineGrow } from "@/lib/animations";

interface BotanicalOverlayProps {
  variant?: "vine-left" | "vine-right" | "canopy" | "leaf-corner";
  className?: string;
}

export default function BotanicalOverlay({
  variant = "vine-left",
  className = "",
}: BotanicalOverlayProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (variant === "vine-left") {
    return (
      <svg
        ref={ref}
        className={`absolute left-0 top-0 h-full w-16 pointer-events-none ${className}`}
        viewBox="0 0 64 800"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M32 0 C32 100, 12 150, 32 250 C52 350, 8 400, 32 500 C56 600, 16 650, 32 800"
          className="botanical-line"
          variants={vineGrow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        />
        {/* Leaf clusters */}
        <motion.path
          d="M32 200 C20 180, 8 195, 16 210 C24 225, 32 210, 32 200Z"
          className="botanical-line"
          style={{ opacity: 0.3 }}
          variants={vineGrow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.5}
        />
        <motion.path
          d="M32 450 C44 430, 56 445, 48 460 C40 475, 32 460, 32 450Z"
          className="botanical-line"
          style={{ opacity: 0.3 }}
          variants={vineGrow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
        />
      </svg>
    );
  }

  if (variant === "vine-right") {
    return (
      <svg
        ref={ref}
        className={`absolute right-0 top-0 h-full w-16 pointer-events-none ${className}`}
        viewBox="0 0 64 800"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M32 0 C32 80, 52 130, 32 230 C12 330, 56 380, 32 480 C8 580, 48 650, 32 800"
          className="botanical-line"
          variants={vineGrow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
        />
      </svg>
    );
  }

  if (variant === "canopy") {
    return (
      <svg
        ref={ref}
        className={`absolute top-0 left-0 w-full h-24 pointer-events-none ${className}`}
        viewBox="0 0 1200 96"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 48 C200 20, 400 70, 600 48 C800 26, 1000 60, 1200 48"
          className="botanical-line"
          variants={vineGrow}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
        />
      </svg>
    );
  }

  // leaf-corner
  return (
    <svg
      ref={ref}
      className={`absolute w-32 h-32 pointer-events-none ${className}`}
      viewBox="0 0 128 128"
    >
      <motion.path
        d="M0 128 C0 80, 30 40, 64 20 C80 12, 100 8, 128 0"
        className="botanical-line"
        variants={vineGrow}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0}
      />
      <motion.path
        d="M0 128 C20 90, 50 60, 90 40"
        className="botanical-line"
        style={{ opacity: 0.2 }}
        variants={vineGrow}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.3}
      />
    </svg>
  );
}
