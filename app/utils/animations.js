/**
 * Reusable animation variants and utilities for Framer Motion
 */

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Common easing curves
export const easings = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  snappy: [0.68, -0.55, 0.265, 1.55],
  gentle: [0.16, 1, 0.3, 1],
};

// Common durations
export const durations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
};

// Fade in from bottom
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
};

// Fade in from top
export const fadeInDown = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
};

// Fade in from left
export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
};

// Fade in from right
export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion() ? 0 : 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
};

// Simple fade in
export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
};

// Scale in animation
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
};

// Stagger container for child animations
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Fast stagger for lists
export const fastStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Slow stagger for hero sections
export const slowStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Page transition variants
export const pageTransition = {
  initial: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
  exit: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : -20,
    transition: {
      duration: durations.fast,
      ease: easings.gentle,
    },
  },
};

// Hover animations
export const hoverScale = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: {
    duration: durations.fast,
    ease: easings.smooth,
  },
};

export const hoverLift = {
  y: prefersReducedMotion() ? 0 : -5,
  transition: {
    duration: durations.fast,
    ease: easings.smooth,
  },
};

// Loading skeleton shimmer
export const shimmer = {
  initial: {
    backgroundPosition: '-200% 0',
  },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: durations.verySlow,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// Button press animation
export const buttonPress = {
  scale: prefersReducedMotion() ? 1 : 0.95,
  transition: {
    duration: 0.1,
    ease: easings.smooth,
  },
};

// Card entrance animation
export const cardEntrance = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 50,
    scale: prefersReducedMotion() ? 1 : 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.slow,
      ease: easings.gentle,
    },
  },
};

// Navigation menu animation
export const menuSlide = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.smooth,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.smooth,
    },
  },
};

// Text reveal animation
export const textReveal = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.gentle,
    },
  },
};

// Utility to get reduced motion safe variants
export const getVariant = (variant) => {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: durations.fast }
      },
    };
  }
  return variant;
};