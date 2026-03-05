"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover, TROPICAL_EASE } from "@/lib/animations";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "gold";
}

export default function GlowCard({
  children,
  className,
  glowColor = "primary",
}: GlowCardProps) {
  const glowColors = {
    primary: "hover:shadow-[0_0_40px_rgba(20,241,149,0.12)]",
    secondary: "hover:shadow-[0_0_40px_rgba(153,69,255,0.12)]",
    gold: "hover:shadow-[0_0_40px_rgba(212,162,70,0.12)]",
  };

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      transition={{ ease: TROPICAL_EASE }}
      className={cn(
        "bg-card border border-card-border rounded-2xl p-6 transition-shadow duration-500",
        glowColors[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
