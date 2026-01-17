"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/constants";

/**
 * Hook to check if a media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
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
  }, [query]);

  return matches;
}

/**
 * Hook to check if viewport is mobile size
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`);
}

/**
 * Hook to check if viewport is tablet size
 */
export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  );
}

/**
 * Hook to check if viewport is desktop size
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
}

/**
 * Hook to get current breakpoint
 */
export function useBreakpoint(): keyof typeof BREAKPOINTS | "xs" {
  const is2xl = useMediaQuery(`(min-width: ${BREAKPOINTS["2xl"]}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);

  if (is2xl) return "2xl";
  if (isXl) return "xl";
  if (isLg) return "lg";
  if (isMd) return "md";
  if (isSm) return "sm";
  return "xs";
}

/**
 * Hook to check viewport width
 */
export function useViewportWidth(): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

/**
 * Hook to check viewport height
 */
export function useViewportHeight(): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    // Set initial height
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
}
