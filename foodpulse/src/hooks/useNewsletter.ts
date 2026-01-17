"use client";

import { useState } from "react";
import { newsletter } from "@/lib/api";

interface UseNewsletterReturn {
  subscribe: (email: string, firstName?: string) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  reset: () => void;
}

/**
 * Hook to handle newsletter subscription
 */
export function useNewsletter(): UseNewsletterReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string, firstName?: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const result = await newsletter.subscribe({
        email,
        firstName,
      });

      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to subscribe. Please try again later.");
      console.error("Newsletter subscription error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  };

  return {
    subscribe,
    isLoading,
    isSuccess,
    error,
    reset,
  };
}

/**
 * Hook to handle newsletter subscription with form state
 */
export function useNewsletterForm() {
  const { subscribe, isLoading, isSuccess, error, reset } = useNewsletter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await subscribe(email, firstName);
  };

  const handleReset = () => {
    setEmail("");
    setFirstName("");
    reset();
  };

  return {
    email,
    setEmail,
    firstName,
    setFirstName,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
    reset: handleReset,
  };
}
