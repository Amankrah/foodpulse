"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if user prefers reduced motion
 * Respects the prefers-reduced-motion media query
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation duration based on user preference
 * Returns 0 if user prefers reduced motion, otherwise returns the specified duration
 */
export function useAnimationDuration(duration: number = 300): number {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? 0 : duration;
}

/**
 * Get animation config for Framer Motion that respects reduced motion preference
 */
export function useMotionConfig() {
  const prefersReducedMotion = useReducedMotion();

  return {
    initial: prefersReducedMotion ? {} : undefined,
    animate: prefersReducedMotion ? {} : undefined,
    exit: prefersReducedMotion ? {} : undefined,
    transition: prefersReducedMotion ? { duration: 0 } : undefined,
  };
}
