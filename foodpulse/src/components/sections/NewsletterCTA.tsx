"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useNewsletterForm } from "@/hooks/useNewsletter";

export function NewsletterCTA() {
  const {
    email,
    setEmail,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useNewsletterForm();

  return (
    <Section background="white" padding="lg">
      <div className="bg-green-700 rounded-2xl p-8 lg:p-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
          Get Fresh Insights Weekly
        </h2>

        <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
          Join thousands of readers who get our best articles, recipes, and food
          tips delivered every Saturday. No spam, ever.
        </p>

        {!isSuccess ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md mx-auto"
          >
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                icon={<Mail className="h-5 w-5" />}
                iconPosition="left"
                className="bg-white"
                error={error || undefined}
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              disabled={isLoading}
              loading={isLoading}
            >
              Subscribe
            </Button>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-6">
              <div className="text-green-700 mb-2">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                You're subscribed!
              </h3>
              <p className="text-neutral-600 mb-4">
                Check your email to confirm your subscription.
              </p>
              <button
                onClick={reset}
                className="text-green-700 hover:text-green-600 font-medium"
              >
                Subscribe another email →
              </button>
            </div>
          </div>
        )}

        {!isSuccess && (
          <p className="text-sm text-green-100 mt-4">
            Unsubscribe anytime.{" "}
            <a
              href="/legal/privacy-policy"
              className="underline hover:text-white transition-colors"
            >
              Read our privacy policy
            </a>
            .
          </p>
        )}
      </div>
    </Section>
  );
}
