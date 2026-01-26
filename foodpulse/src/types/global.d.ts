/**
 * Global type declarations for FoodPulse
 */

// Google Analytics gtag function
interface Window {
  gtag?: (
    command: 'config' | 'event' | 'set',
    targetId: string,
    config?: Record<string, unknown>
  ) => void;
}

// Extend global types as needed
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export {};
