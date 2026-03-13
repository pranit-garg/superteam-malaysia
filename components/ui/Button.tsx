"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { TROPICAL_EASE, DURATION } from "@/lib/animations";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
}

const hoverEffects = {
  primary: {
    scale: 1.03,
    boxShadow: "0 0 25px rgba(85,35,222,0.35), 0 0 50px rgba(85,35,222,0.15)",
  },
  secondary: {
    scale: 1.03,
    boxShadow: "0 0 25px rgba(10,177,114,0.35), 0 0 50px rgba(10,177,114,0.15)",
  },
  ghost: {
    scale: 1.01,
    boxShadow: "0 0 20px rgba(85,35,222,0.12)",
  },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  ...props
}: ButtonProps) {
  const base =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 glow-primary",
    secondary: "bg-secondary text-white hover:bg-secondary/90 glow-secondary",
    ghost: "bg-transparent border border-white/10 text-text hover:border-primary/50 hover:bg-primary/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  const motionProps = {
    whileHover: {
      ...hoverEffects[variant],
      transition: { duration: DURATION.fast, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
    whileTap: { scale: 0.98 },
  } as const;

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        {...motionProps}
      >
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...(props as any)}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
