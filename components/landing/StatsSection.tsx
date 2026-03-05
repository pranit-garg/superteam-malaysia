"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { STATS } from "@/data/stats";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-bg"
    >
      {/* Parallax background glow */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[200px]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-primary text-sm font-medium tracking-wider uppercase mb-3"
          >
            Our Impact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold"
          >
            Growing <span className="text-primary">Together</span>
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              variants={fadeUp}
              custom={i * 0.05}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
