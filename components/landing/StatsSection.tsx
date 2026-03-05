"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DURATION, TROPICAL_EASE } from "@/lib/animations";
import { STATS } from "@/data/stats";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const heroStat = STATS[0]; // 500+ Members
  const secondaryStats = STATS.slice(1);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-bg"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Hero number */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: DURATION.cinematic,
            ease: TROPICAL_EASE,
          }}
        >
          <div className="text-[8rem] md:text-[10rem] font-black text-primary leading-none font-[family-name:var(--font-mono)] tabular-nums">
            <AnimatedCounter value={heroStat.value} suffix={heroStat.suffix} duration={3} />
          </div>
          <p className="text-text-muted text-lg mt-2">{heroStat.label}</p>
        </motion.div>

        {/* Secondary stats row */}
        <div className="flex items-center justify-center flex-wrap gap-0">
          {secondaryStats.map((stat, i) => (
            <motion.div
              key={stat.key}
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: DURATION.medium,
                ease: TROPICAL_EASE,
                delay: 0.8 + i * 0.15,
              }}
            >
              {i > 0 && (
                <div className="w-px h-10 bg-card-border mx-6 md:mx-10 hidden sm:block" />
              )}
              <div className="text-center px-4 py-2">
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
