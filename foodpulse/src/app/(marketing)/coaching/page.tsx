import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Check } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Nutrition Coaching | ${SITE_NAME}`,
  description:
    "Personalized nutrition coaching to help you achieve your health goals. Evidence-based guidance tailored to your needs.",
};

const benefits = [
  "Personalized nutrition guidance",
  "Evidence-based approach",
  "One-on-one support",
  "Flexible scheduling",
  "Goal-oriented planning",
  "Long-term habit building",
];

const packages = [
  {
    name: "Discovery Session",
    price: "$75",
    duration: "60 minutes",
    description: "Perfect for getting started and exploring if coaching is right for you.",
    features: [
      "Comprehensive nutrition assessment",
      "Goal setting and planning",
      "Personalized recommendations",
      "Follow-up resources",
    ],
  },
  {
    name: "Monthly Coaching",
    price: "$250",
    duration: "4 sessions",
    description: "Ongoing support to build lasting healthy eating habits.",
    features: [
      "4 one-hour coaching sessions",
      "Email support between sessions",
      "Meal planning guidance",
      "Progress tracking",
      "Resource library access",
    ],
    featured: true,
  },
  {
    name: "3-Month Program",
    price: "$650",
    duration: "12 sessions",
    description: "Comprehensive transformation with deep support and accountability.",
    features: [
      "12 coaching sessions",
      "Unlimited email support",
      "Custom meal plans",
      "Recipe recommendations",
      "Shopping guides",
      "Priority scheduling",
    ],
  },
];

export default function CoachingPage() {
  return (
    <>
      <Section
        background="green"
        padding="lg"
        className="border-b border-[var(--color-teal)]/15"
      >
        <div className="max-w-3xl">
          <nav
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-support)]"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="underline-offset-2 transition-colors hover:text-[var(--color-teal)] hover:underline"
            >
              Home
            </Link>
            <span className="text-[var(--color-sage)]" aria-hidden>
              /
            </span>
            <span className="font-medium text-[var(--color-primary)]">
              Coaching
            </span>
          </nav>

          <p className="eyebrow mb-3">One-on-one</p>
          <h1 className="mb-4 font-display text-4xl font-extrabold tracking-tight text-[var(--color-primary)] lg:text-5xl">
            Personalized nutrition coaching
          </h1>
          <p className="mb-8 text-xl font-light leading-relaxed text-[var(--color-support)]">
            Work one-on-one with a nutrition expert to reach your goals—with
            evidence-based guidance tailored to your life.
          </p>
          <Button variant="primary" size="lg" href="#packages">
            View coaching packages
          </Button>
        </div>
      </Section>

      <Section
        background="white"
        padding="lg"
        className="border-t border-[var(--color-sage)]/15"
      >
        <SectionHeader
          eyebrow="Why coaching"
          title="What you'll get"
          description="Personalized support to help you make lasting changes"
          centered
        />

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card
              key={benefit}
              padding="md"
              className="border border-[var(--color-teal)]/15 bg-[color-mix(in_srgb,var(--color-mint)_28%,white)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/90 text-[var(--color-teal)] ring-1 ring-[var(--color-teal)]/20">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <p className="font-medium text-neutral-800">{benefit}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="packages"
        background="neutral"
        padding="lg"
        className="border-t border-[var(--color-sage)]/10 bg-[color-mix(in_srgb,var(--color-mint)_12%,var(--neutral-50))]"
      >
        <SectionHeader
          eyebrow="Coaching packages"
          title="Choose your path"
          description="Select the package that fits your goals and timeline"
          centered
        />

        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              padding="lg"
              variant={pkg.featured ? "featured" : "default"}
              className={
                pkg.featured
                  ? "relative border-2 border-[var(--color-teal)]/40 shadow-md ring-1 ring-[var(--color-gold)]/25"
                  : "border border-[var(--color-sage)]/20"
              }
            >
              {pkg.featured && (
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-[var(--color-gold)] px-3 py-1 text-sm font-semibold text-[var(--color-primary)]">
                    Most popular
                  </span>
                </div>
              )}

              <CardTitle className="mb-2 text-2xl text-[var(--color-primary)]">
                {pkg.name}
              </CardTitle>
              <div className="mb-2 text-3xl font-bold text-[var(--color-primary)]">
                {pkg.price}
              </div>
              <p className="mb-4 text-sm text-neutral-600">{pkg.duration}</p>
              <CardDescription className="mb-6">{pkg.description}</CardDescription>

              <ul className="mb-6 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-teal)]"
                      strokeWidth={2.25}
                    />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={pkg.featured ? "primary" : "outline"}
                size="lg"
                href="#contact"
                fullWidth
              >
                Get started
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="contact"
        background="white"
        padding="lg"
        className="border-t border-[var(--color-sage)]/15"
      >
        <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--color-teal)]/20 bg-[color-mix(in_srgb,var(--color-mint)_30%,white)] px-6 py-10 text-center lg:px-12 lg:py-12">
          <h2 className="mb-4 font-display text-3xl font-bold text-[var(--color-primary)] lg:text-4xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-xl text-neutral-600">
            Book a free 15-minute consultation to talk through your goals and
            see if coaching is a good fit—no pressure.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg" href="/contact">
              Book free consultation
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Send a message
            </Button>
          </div>
          <p className="mt-6 text-sm text-[var(--color-support)]">
            Prefer to keep it brief? Use the contact form and mention{" "}
            <span className="font-medium text-[var(--color-primary)]">
              coaching
            </span>{" "}
            in your message.
          </p>
        </div>
      </Section>
    </>
  );
}
