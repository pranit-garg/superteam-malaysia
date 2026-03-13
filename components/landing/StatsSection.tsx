"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useCallback, useState } from "react";
import { DURATION, TROPICAL_EASE, DRIFT_EASE } from "@/lib/animations";
import { STATS } from "@/data/stats";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionWrapper from "@/components/ui/SectionWrapper";
import BioluminescentCanvas, {
  type BioluminescentCanvasRef,
} from "@/components/ui/BioluminescentCanvas";

export type StatData = {
  key: string;
  label: string;
  value: number;
  suffix: string;
};

interface StatsSectionProps {
  stats?: StatData[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const canvasRef = useRef<BioluminescentCanvasRef | null>(null);
  const heroNumRef = useRef<HTMLDivElement>(null);
  const [heroBurst, setHeroBurst] = useState(false);

  const data = stats ?? STATS;
  const heroStat = data[0];
  const secondaryStats = data.slice(1);

  const handleHeroComplete = useCallback(() => {
    setHeroBurst(true);
    if (heroNumRef.current && canvasRef.current) {
      const section = heroNumRef.current.closest("section");
      const sectionRect = section?.getBoundingClientRect() ?? { left: 0, top: 0 };
      const rect = heroNumRef.current.getBoundingClientRect();
      canvasRef.current.burst(
        rect.left + rect.width / 2 - sectionRect.left,
        rect.top + rect.height / 2 - sectionRect.top,
        50
      );
    }
    setTimeout(() => setHeroBurst(false), 600);
  }, []);

  const handleSecondaryComplete = useCallback(
    (el: HTMLElement | null) => {
      if (!el || !canvasRef.current) return;
      const section = el.closest("section");
      const sectionRect = section?.getBoundingClientRect() ?? { left: 0, top: 0 };
      const rect = el.getBoundingClientRect();
      canvasRef.current.burst(
        rect.left + rect.width / 2 - sectionRect.left,
        rect.top + rect.height / 2 - sectionRect.top,
        15
      );
    },
    []
  );

  return (
    <SectionWrapper
      id="stats"
      bg="forest"
      bgSlot={
        <>
          {/* Gradient mesh */}
          <div
            className="absolute inset-0 animate-[mesh-drift_12s_ease-in-out_infinite_alternate]"
            style={{
              background: [
                "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(85,35,222,0.06) 0%, transparent 100%)",
                "radial-gradient(ellipse 40% 50% at 80% 30%, rgba(85,35,222,0.10) 0%, transparent 100%)",
                "radial-gradient(ellipse 60% 30% at 50% 80%, rgba(212,162,70,0.03) 0%, transparent 100%)",
              ].join(","),
            }}
          />
          {/* Particle + shockwave canvases */}
          <BioluminescentCanvas canvasRef={canvasRef} />
        </>
      }
    >
      <div ref={ref}>
        {/* ── Hero stat ── */}
        <div className="text-center mb-16 relative">
          {/* Ghost outline */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-mono)] text-[clamp(80px,14vw,160px)] font-black pointer-events-none select-none whitespace-nowrap tracking-[0.02em]"
            style={{
              WebkitTextStroke: "1.5px rgba(85,35,222,0.09)",
              color: "transparent",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: DRIFT_EASE }}
          >
            {heroStat.value.toLocaleString()}{heroStat.suffix}
          </motion.div>

          {/* Hero number */}
          <motion.div
            ref={heroNumRef}
            className={`text-[clamp(72px,12vw,130px)] font-black text-primary leading-none font-[family-name:var(--font-mono)] tabular-nums inline-block transition-[text-shadow] duration-400 ${
              heroBurst
                ? "[text-shadow:0_0_40px_rgba(85,35,222,0.6),0_0_100px_rgba(85,35,222,0.25),0_0_160px_rgba(85,35,222,0.08)]"
                : "[text-shadow:0_0_20px_rgba(85,35,222,0.35),0_0_60px_rgba(85,35,222,0.12)]"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <AnimatedCounter
              value={heroStat.value}
              suffix={heroStat.suffix}
              stiffness={80}
              damping={12}
              onComplete={handleHeroComplete}
            />
          </motion.div>

          {/* Hero label */}
          <motion.p
            className="text-text-muted/80 text-[15px] font-medium tracking-[0.12em] uppercase mt-4"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              ease: TROPICAL_EASE,
              delay: 0.8,
            }}
          >
            {heroStat.label}
          </motion.p>
        </div>

        {/* ── Secondary stats ── */}
        <div className="flex items-stretch justify-center max-w-[900px] mx-auto">
          {secondaryStats.map((stat, i) => (
            <SecondaryStatCell
              key={stat.key}
              stat={stat}
              index={i}
              isInView={isInView}
              onComplete={handleSecondaryComplete}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ── Secondary Stat Cell ── */

function SecondaryStatCell({
  stat,
  index,
  isInView,
  onComplete,
}: {
  stat: StatData;
  index: number;
  isInView: boolean;
  onComplete: (el: HTMLElement | null) => void;
}) {
  const numRef = useRef<HTMLDivElement>(null);
  const [burst, setBurst] = useState(false);

  const handleComplete = useCallback(() => {
    setBurst(true);
    onComplete(numRef.current);
    setTimeout(() => setBurst(false), 600);
  }, [onComplete]);

  return (
    <motion.div
      className="flex-1 text-center py-6 px-5 relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATION.medium,
        ease: TROPICAL_EASE,
        delay: 1.0 + index * 0.1,
      }}
    >
      {/* Divider */}
      {index > 0 && (
        <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      )}

      {/* Hover glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-[radial-gradient(circle,rgba(85,35,222,0.08)_0%,transparent_70%)] scale-0 group-hover:scale-[2] transition-transform duration-500 pointer-events-none" />

      {/* Number */}
      <div
        ref={numRef}
        className={`text-[clamp(36px,5vw,52px)] font-bold text-primary relative inline-block font-[family-name:var(--font-mono)] tabular-nums transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_30px_rgba(85,35,222,0.45),0_0_60px_rgba(85,35,222,0.15)] ${
          burst
            ? "[text-shadow:0_0_40px_rgba(85,35,222,0.6),0_0_80px_rgba(85,35,222,0.25)]"
            : "[text-shadow:0_0_20px_rgba(85,35,222,0.25)]"
        }`}
      >
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          stiffness={100}
          damping={13}
          onComplete={handleComplete}
        />
      </div>

      {/* Label */}
      <p className="text-text-muted/60 text-[13px] font-medium tracking-[0.1em] uppercase mt-2 transition-colors duration-300 group-hover:text-text-muted/90">
        {stat.label}
      </p>
    </motion.div>
  );
}
