"use client";

import { useEffect, useState, RefObject } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to detect when an element enters the viewport
 * Useful for scroll-based animations
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Don't observe if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);

        if (visible && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, threshold, rootMargin, triggerOnce, hasTriggered]);

  return isVisible;
}

/**
 * Hook to track scroll progress of the page
 */
export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollProgress;
}

/**
 * Hook to track scroll direction
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return scrollDirection;
}

/**
 * Hook to detect if user has scrolled past a certain threshold
 */
export function useScrollPast(threshold: number = 100) {
  const [hasScrolledPast, setHasScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolledPast(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return hasScrolledPast;
}
