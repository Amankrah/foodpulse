import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 * Combines class names and handles Tailwind conflicts intelligently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function calculateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate slug from string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if code is running on server
 */
export const isServer = typeof window === "undefined";

/**
 * Check if code is running on client
 */
export const isClient = typeof window !== "undefined";

/**
 * Safe localStorage wrapper with error handling
 */
export const storage = {
  get: (key: string): string | null => {
    if (isServer) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): void => {
    if (isServer) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail
    }
  },
  remove: (key: string): void => {
    if (isServer) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail
    }
  },
};

/**
 * Generate excerpt from content
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 160
): string {
  // Strip HTML tags
  const stripped = content.replace(/<[^>]*>/g, "");
  return truncate(stripped, maxLength);
}
