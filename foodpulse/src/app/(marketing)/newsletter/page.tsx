"use client";

import { Section, SectionHeader } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { ConvertKitEmbed } from "@/components/newsletter/ConvertKitEmbed";

const benefits = [
  {
    icon: "📰",
    title: "Monthly deep dives",
    description:
      "Thoughtful, research-informed perspectives in your inbox—no daily noise.",
  },
  {
    icon: "🍳",
    title: "Exclusive recipes",
    description: "Subscriber-only ideas and kitchen inspiration you won&apos;t find on the site.",
  },
  {
    icon: "💡",
    title: "Quick tips",
    description: "Practical food insights you can use the same week you read them.",
  },
  {
    icon: "🎁",
    title: "Early access",
    description: "First look at guides, tools, and downloadable resources when we release them.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-[var(--color-primary)] tracking-tight mb-6">
            Get fresh insights, monthly
          </h1>
          <p className="text-xl font-light text-[var(--color-support)] leading-relaxed max-w-2xl mx-auto">
            Join readers who get evidence-based food knowledge in one focused
            email each month. No spam—unsubscribe anytime.
          </p>
        </div>
      </Section>

      {/* Newsletter Form Section — Kit embed submits directly to ConvertKit so confirmation email is sent */}
      <Section background="white" padding="lg">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-[var(--color-teal)]/20 bg-[var(--color-mint)]/40 p-1 shadow-sm">
            <Card padding="lg" className="!bg-white/95 border-0 shadow-none">
              <ConvertKitEmbed />
            </Card>
          </div>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section background="neutral" padding="lg">
        <SectionHeader
          eyebrow="What You&apos;ll Get"
          title="Why Subscribe?"
          centered
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, i) => {
            const borders = [
              "border-[var(--color-teal)]/20",
              "border-[var(--color-support)]/25",
              "border-[var(--color-sage)]/25",
              "border-[var(--color-primary)]/15",
            ];
            return (
              <div
                key={benefit.title}
                className={`rounded-2xl border bg-[var(--color-mint)] p-6 shadow-sm hover:shadow-md transition-shadow ${borders[i % borders.length]}`}
              >
                <div className="text-4xl mb-4" aria-hidden>
                  {benefit.icon}
                </div>
                <h3 className="text-[length:var(--size-subheading)] font-display font-semibold text-[var(--color-primary)] tracking-tight leading-snug mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Social Proof */}
      <Section background="white" padding="lg">
        <div className="max-w-3xl mx-auto">
          <blockquote className="brand-quote text-xl sm:text-2xl max-w-2xl mx-auto text-center sm:text-left border-l-0 sm:border-l-4">
            &quot;The only food newsletter I actually read. No fluff, just solid
            information I can use.&quot;
          </blockquote>
          <p className="brand-caption text-center sm:text-left max-w-2xl mx-auto mt-4 text-[var(--color-support)]">
            — FoodPulse reader
          </p>
        </div>
      </Section>
    </>
  );
}
