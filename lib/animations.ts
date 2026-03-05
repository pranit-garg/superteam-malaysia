/**
 * Centralized animation constants for Tropical Futurism.
 * Cinematic easing curves, durations, and reusable Framer Motion variants.
 */

// Tropical Futurism easing curves
export const TROPICAL_EASE = [0.76, 0, 0.24, 1] as const;
export const DRIFT_EASE = [0.22, 1, 0.36, 1] as const;
export const VINE_EASE = [0.33, 1, 0.68, 1] as const;

export const DURATION = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.7,
  slower: 0.9,
  cinematic: 1.2,
} as const;

export const STAGGER = {
  tight: 0.04,
  normal: 0.08,
  relaxed: 0.12,
  cinematic: 0.15,
} as const;

// Masked slide-up reveal
export const maskReveal = {
  hidden: { y: "110%" },
  visible: (delay: number = 0) => ({
    y: "0%",
    transition: {
      duration: DURATION.slow,
      ease: TROPICAL_EASE,
      delay,
    },
  }),
};

// Fade + translateY
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: TROPICAL_EASE,
      delay,
    },
  }),
};

// Fade in from left
export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.medium,
      ease: TROPICAL_EASE,
      delay,
    },
  }),
};

// Fade in from right
export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.medium,
      ease: TROPICAL_EASE,
      delay,
    },
  }),
};

// Fade in (no movement)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: DRIFT_EASE,
      delay,
    },
  }),
};

// Stagger container
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: 0.1,
    },
  },
};

// Clip-path reveal from bottom
export const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: DURATION.slower,
      ease: TROPICAL_EASE,
      delay,
    },
  }),
};

// Scale reveal (for lines, underlines)
export const scaleXReveal = {
  hidden: { scaleX: 0 },
  visible: (delay: number = 0) => ({
    scaleX: 1,
    transition: {
      duration: DURATION.medium,
      ease: TROPICAL_EASE,
      delay,
    },
  }),
};

// Card hover lift
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: DURATION.fast,
      ease: TROPICAL_EASE,
    },
  },
};

// Section wrapper reveal (cinematic)
export const sectionReveal = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.cinematic,
      ease: DRIFT_EASE,
    },
  },
};

// Vine growth animation (for SVG stroke-dashoffset)
export const vineGrow = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 2,
        ease: VINE_EASE,
        delay,
      },
      opacity: {
        duration: 0.3,
        delay,
      },
    },
  }),
};

// Flip card
export const flipCard = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
};
