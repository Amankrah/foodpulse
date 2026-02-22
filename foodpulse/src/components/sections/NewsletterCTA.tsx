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
    <Section background="white" padding="lg">
      <div className="bg-green-700 rounded-2xl p-8 lg:p-12 text-center">
        <div className="max-w-lg mx-auto">
          {!useFallbackForm ? (
            <>
              <ConvertKitEmbed
                className="[&_.formkit-form]:!bg-white [&_.formkit-header]:!text-green-800 [&_.formkit-subheader]:!text-neutral-600 [&_.formkit-guarantee]:!text-neutral-500"
                hidePoweredBy
              />
              <p className="text-sm text-green-200 mt-3">
                Form not loading?{" "}
                <button
                  type="button"
                  onClick={() => setUseFallbackForm(true)}
                  className="underline hover:text-white transition-colors font-medium"
                >
                  Use our signup form
                </button>
              </p>
            </>
          ) : (
            <>
              {!isSuccess ? (
                <>
                  <h2 className="text-xl font-display font-bold text-white mb-2">
                    Food Decisions Simplified
                  </h2>
                  <p className="text-green-100 text-sm mb-6">
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
                      variant="accent"
                      size="lg"
                      disabled={isLoading}
                      loading={isLoading}
                    >
                      Join Today
                    </Button>
                  </form>
                  <p className="text-xs text-green-200 mt-3">
                    No worries, you can unsubscribe at any time.
                  </p>
                </>
              ) : (
                <div className="bg-white rounded-lg p-6 text-neutral-900">
                  <p className="font-semibold mb-2">You&apos;re subscribed!</p>
                  <p className="text-sm text-neutral-600 mb-4">
                    Check your inbox (and spam) for a confirmation email.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-green-700 hover:text-green-600 text-sm font-medium"
                  >
                    Subscribe another email
                  </button>
                </div>
              )}
              <p className="text-sm text-green-200 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setUseFallbackForm(false);
                    reset();
                  }}
                  className="underline hover:text-white transition-colors"
                >
                  Back to main form
                </button>
              </p>
            </>
          )}
        </div>
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
      </div>
    </Section>
  );
}
