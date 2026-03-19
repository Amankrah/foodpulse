"use client";

import { useState } from "react";
import { Download, CheckCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailGateProps {
  guideTitle: string;
  guideSlug: string;
  downloadUrl: string;
  listId?: string;
  className?: string;
}

export function EmailGate({
  guideTitle,
  guideSlug,
  downloadUrl,
  listId,
  className,
}: EmailGateProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Submit to your email service
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: `guide-${guideSlug}`,
          listId,
          metadata: {
            guideTitle,
            guideSlug,
          },
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Subscription failed");
      }

      setIsSuccess(true);

      // Track download event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "guide_download", {
          guide_title: guideTitle,
          guide_slug: guideSlug,
          download_type: "email_gated",
        });
      }

      // Trigger download
      window.open(downloadUrl, "_blank");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-[var(--color-teal)]/25 bg-[var(--color-mint)] p-6 text-center",
          className
        )}
      >
        <CheckCircle className="w-12 h-12 text-[var(--color-teal)] mx-auto mb-4" />
        <h3 className="text-lg font-display font-semibold text-[var(--color-primary)] mb-2">
          You&apos;re all set!
        </h3>
        <p className="text-[var(--color-support)] mb-4 leading-relaxed">
          Your download should start automatically. If not, click below.
        </p>
        <a
          href={downloadUrl}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-[var(--color-gold)] text-[var(--color-primary)] hover:brightness-95"
          download
        >
          <Download className="w-4 h-4" />
          Download again
        </a>
        <p className="text-sm text-[var(--color-support)] mt-4 leading-relaxed">
          Check your inbox (and spam folder) for a confirmation email—click the link to confirm. Then you&apos;ll get our monthly updates.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-sage)]/30 bg-[color-mix(in_srgb,var(--color-mint)_55%,white)] p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white text-[var(--color-teal)] ring-2 ring-[var(--color-teal)]/15">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-display font-semibold text-[var(--color-primary)]">
            Get this guide
          </h3>
          <p className="text-sm text-[var(--color-support)]">
            Enter your email to download the PDF
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            disabled={isSubmitting}
            className={cn(
              "w-full px-4 py-3 border-2 rounded-xl",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-teal)]/25 focus:border-[var(--color-teal)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error
                ? "border-red-300 bg-red-50"
                : "border-[var(--color-sage)]/35 bg-white"
            )}
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all",
            "bg-[var(--color-gold)] text-[var(--color-primary)] hover:brightness-95",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download Guide
            </>
          )}
        </button>

        <p className="text-xs text-[var(--color-support)] text-center leading-relaxed">
          We&apos;ll also send you our monthly newsletter with food insights. Unsubscribe
          anytime.
        </p>
      </form>
    </div>
  );
}
