"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { ConvertKitEmbed } from "@/components/newsletter/ConvertKitEmbed";
import { useNewsletterForm } from "@/hooks/useNewsletter";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";

export function NewsletterCTA() {
  const [useFallbackForm, setUseFallbackForm] = useState(false);
  const {
    email,
    setEmail,
    firstName,
    setFirstName,
    handleSubmit,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useNewsletterForm();

  return (
    <Section
      background="white"
      padding="lg"
      className="border-t border-[var(--color-sage)]/15"
    >
      <div className="rounded-2xl border border-[var(--color-teal)]/30 bg-[var(--color-primary)] p-8 text-center shadow-lg lg:p-12">
        <div className="mx-auto max-w-lg">
          {!useFallbackForm ? (
            <>
              <ConvertKitEmbed
                className="[&_.formkit-form]:!rounded-xl [&_.formkit-form]:!border [&_.formkit-form]:!border-[var(--color-teal)]/25 [&_.formkit-form]:!bg-white [&_.formkit-header]:!text-[var(--color-primary)] [&_.formkit-subheader]:!text-neutral-600 [&_.formkit-guarantee]:!text-neutral-500"
                hidePoweredBy
              />
              <p className="mt-3 text-sm text-[var(--color-mint)]/90">
                Form not loading?{" "}
                <button
                  type="button"
                  onClick={() => setUseFallbackForm(true)}
                  className="font-medium text-[var(--color-gold)] underline decoration-[var(--color-gold)]/50 underline-offset-2 transition-colors hover:text-white"
                >
                  Use our signup form
                </button>
              </p>
            </>
          ) : (
            <>
              {!isSuccess ? (
                <>
                  <h2 className="mb-2 font-display text-xl font-bold text-white">
                    Food Decisions Simplified
                  </h2>
                  <p className="mb-6 text-sm text-white/90">
                    Monthly updates with honest conversations and practical
                    insights for your everyday food decisions.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 text-left"
                  >
                    <Input
                      type="text"
                      placeholder="Your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={isLoading}
                      className="bg-white"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      icon={<Mail className="h-5 w-5" />}
                      iconPosition="left"
                      className="bg-white"
                      error={error || undefined}
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isLoading}
                      loading={isLoading}
                    >
                      Join Today
                    </Button>
                  </form>
                  <p className="mt-3 text-xs text-[var(--color-mint)]/85">
                    No worries, you can unsubscribe at any time.
                  </p>
                </>
              ) : (
                <div className="rounded-lg bg-white p-6 text-neutral-900">
                  <p className="mb-2 font-semibold">You&apos;re subscribed!</p>
                  <p className="mb-4 text-sm text-neutral-600">
                    Check your inbox (and spam) for a confirmation email.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-sm font-medium text-[var(--color-teal)] hover:text-[var(--color-primary)]"
                  >
                    Subscribe another email
                  </button>
                </div>
              )}
              <p className="mt-3 text-sm text-[var(--color-mint)]/90">
                <button
                  type="button"
                  onClick={() => {
                    setUseFallbackForm(false);
                    reset();
                  }}
                  className="text-[var(--color-gold)] underline decoration-[var(--color-gold)]/50 underline-offset-2 transition-colors hover:text-white"
                >
                  Back to main form
                </button>
              </p>
            </>
          )}
        </div>
        <p className="mt-4 text-sm text-white/85">
          Unsubscribe anytime.{" "}
          <a
            href="/privacy"
            className="font-medium text-[var(--color-gold)] underline decoration-[var(--color-gold)]/50 underline-offset-2 transition-colors hover:text-white"
          >
            Read our privacy policy
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
