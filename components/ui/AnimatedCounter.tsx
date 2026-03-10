"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  stiffness?: number;
  damping?: number;
  onComplete?: () => void;
}

/**
 * Spring-physics counter. Overshoots the target then settles organically.
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  stiffness = 100,
  damping = 13,
  onComplete,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(`0${suffix}`);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let current = 0;
    let velocity = 0;
    let settled = false;
    let raf: number;

    function tick() {
      const displacement = current - value;
      const springForce = -stiffness * displacement;
      const dampingForce = -damping * velocity;
      const acceleration = springForce + dampingForce;

      velocity += acceleration * (1 / 60);
      current += velocity * (1 / 60);

      setDisplay(
        Math.round(Math.max(0, current)).toLocaleString() + suffix
      );

      if (
        Math.abs(velocity) > 0.1 ||
        Math.abs(current - value) > 0.5
      ) {
        raf = requestAnimationFrame(tick);
      } else if (!settled) {
        settled = true;
        setDisplay(value.toLocaleString() + suffix);
        onComplete?.();
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, suffix, stiffness, damping, onComplete]);

  return (
    <span ref={ref} className="font-[family-name:var(--font-mono)] tabular-nums">
      {display}
    </span>
  );
}
