"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <Section background="white" padding="xl">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          We're sorry, but something unexpected happened. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" onClick={reset}>
            Try Again
          </Button>
          <Button variant="outline" size="lg" href="/">
            Back to Home
          </Button>
        </div>
      </div>
    </Section>
  );
}
