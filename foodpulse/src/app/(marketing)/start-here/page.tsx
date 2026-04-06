import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Book,
  Mail,
  CheckCircle2,
  XCircle,
  Lightbulb,
  FileSearch,
  Heart,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

/** Foundational article: how to think about food (linked from steps, resources, and final CTA). */
const FOUNDATIONAL_FOOD_THINKING_ARTICLE =
  "/articles/food-and-wellbeing/eating-is-simple-yet-profound";

const foundationalArticleBlurb = {
  title: "How to think about food and nutrition",
  description:
    "A foundational piece that explains how to approach food with clarity, nuance, and confidence.",
};

export const metadata: Metadata = {
  title: `Start Here | ${SITE_NAME}`,
  description:
    "New to FoodPulse? Start here. Learn how to use our evidence-based food education platform to make confident, informed food decisions.",
  openGraph: {
    title: `Start Here | ${SITE_NAME}`,
    description:
      "New to FoodPulse? Learn how to navigate our food education resources.",
    type: "website",
  },
};

// Who FoodPulse is for
const forYouItems = [
  "Want to understand food and nutrition beyond headlines and trends",
  "Don't want rigid rules that ignore your context",
  "Want confidence in your food decisions",
  "Value evidence and practicality",
];

// Who FoodPulse is NOT for
const notForYouItems = [
  "Quick fixes or miracle foods",
  "Rigid meal plans and diet rules",
  "One-size-fits-all answers",
];

// How FoodPulse is different
const differentiators = [
  {
    title: "We prioritize clarity",
    description:
      "We focus on what matters for you, not what's loud or trending, and we make it easy to understand.",
    icon: Lightbulb,
  },
  {
    title: "We translate evidence into practical insight",
    description:
      "Research is our foundation and we build on it to make the guidance useful for you.",
    icon: FileSearch,
  },
  {
    title: "We respect context",
    description:
      "Health, culture, finances, time, preferences and more. We take this into consideration to ensure our advice is helpful to you.",
    icon: Heart,
  },
];

// How to use FoodPulse steps
const steps = [
  {
    step: 1,
    title: "Read one foundational article",
    description:
      "Start with a piece that explains how to think about food and nutrition, not what to eat. This helps everything else make more sense.",
  },
  {
    step: 2,
    title: "Use articles and resources as questions come up",
    description:
      "Browse our content library or use the search bar to look up specific topics. Find what you need, when you need it.",
  },
  {
    step: 3,
    title: "Stay connected via our monthly newsletter",
    description:
      "The newsletter is for more in-depth insights shared thoughtfully, once a month. Subscribe anytime.",
  },
];

/** Editorial — mint surfaces, brand borders & icons; CTAs = Honey Gold (Button primary) */
const startingPoints = [
  {
    title: foundationalArticleBlurb.title,
    description: foundationalArticleBlurb.description,
    cta: "Read the article",
    href: FOUNDATIONAL_FOOD_THINKING_ARTICLE,
    icon: BookOpen,
    surface: "bg-[var(--color-mint)] border-[var(--color-teal)]/20",
    iconWrap: "bg-white/90 text-[var(--color-teal)] ring-1 ring-[var(--color-teal)]/15",
  },
  {
    title: "Try a FoodPulse tool",
    description:
      "Use one of our tools to evaluate and understand your food context and choices.",
    cta: "Use a tool",
    href: "/tools",
    icon: Calculator,
    surface: "bg-[var(--color-mint)] border-[var(--color-support)]/25",
    iconWrap: "bg-white/90 text-[var(--color-support)] ring-1 ring-[var(--color-support)]/20",
  },
  {
    title: "When a term feels confusing",
    description:
      "Clear definitions and explanations of terms you might have heard. Think of it as a food dictionary.",
    cta: "Visit the glossary",
    href: "/glossary",
    icon: Book,
    surface:
      "bg-[color-mix(in_srgb,var(--color-mint)_88%,var(--color-sage)_12%)] border-[var(--color-sage)]/25",
    iconWrap: "bg-white/90 text-[var(--color-sage)] ring-1 ring-[var(--color-sage)]/25",
  },
  {
    title: "Stay connected",
    description:
      "Monthly deep dives on topics for those who want to know more and be part of a community.",
    cta: "Join for free",
    href: "/newsletter",
    icon: Mail,
    surface: "bg-[var(--color-mint)] border-[var(--color-primary)]/15",
    iconWrap: "bg-white/90 text-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/12",
  },
];

export default function StartHerePage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-green-800 text-sm font-medium mb-6">
            New here?
          </span>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-green-900 mb-6">
            Start with clarity
          </h1>
          <p className="text-xl lg:text-2xl text-green-800 mb-6">
            Food information is everywhere. And it&apos;s often conflicting, oversimplified, or driven by trends.
          </p>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto mb-8">
            FoodPulse exists to help you understand food and nutrition clearly so you can make your own decisions with confidence.
          </p>
          <p className="text-xl font-semibold text-green-800 border-l-4 border-green-600 pl-4 max-w-xl mx-auto text-left">
            We don&apos;t tell you what to eat. We help you make sense of food and nutrition.
          </p>
        </div>
      </Section>

      {/* Who is FoodPulse for? */}
      <Section background="white" padding="lg">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* For You */}
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                FoodPulse is for you if you:
              </h2>
              <ul className="space-y-4">
                {forYouItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-neutral-600 italic border-l-4 border-green-200 pl-4">
                Food is nuanced, and we don&apos;t pretend it&apos;s not.
              </p>
            </div>

            {/* Not For You */}
            <div className="bg-neutral-50 rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                FoodPulse may not be for you if you&apos;re looking for:
              </h2>
              <ul className="space-y-4">
                {notForYouItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="h-6 w-6 text-neutral-400 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* How FoodPulse is Different */}
      <Section background="neutral" padding="lg">
        <SectionHeader
          eyebrow="Our Approach"
          title="How FoodPulse is different"
          description="Most food platforms either oversimplify nutrition or overwhelm with information. We take a different approach."
          centered
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-sm"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <item.icon className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {index + 1}. {item.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* How to Use FoodPulse */}
      <Section background="white" padding="lg">
        <SectionHeader
          eyebrow="Getting Started"
          title="How to use FoodPulse"
          description="FoodPulse is designed to support different pathways. Whether you like guidance or prefer to explore freely, it works either way."
          centered
        />

        <div className="max-w-3xl mx-auto mt-12">
          <div className="space-y-8">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                  {item.step === 1 && (
                    <div className="mt-4 rounded-xl border border-[var(--color-teal)]/20 bg-[color-mix(in_srgb,var(--color-mint)_35%,white)] p-4 text-left">
                      <Link
                        href={FOUNDATIONAL_FOOD_THINKING_ARTICLE}
                        className="font-display text-lg font-semibold text-[var(--color-primary)] hover:text-[var(--color-teal)] underline-offset-2 hover:underline"
                      >
                        {foundationalArticleBlurb.title}
                      </Link>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-support)]">
                        {foundationalArticleBlurb.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Alternative Path */}
          <div className="mt-12 p-6 bg-green-50 rounded-xl">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              Prefer to explore your own way?
            </h3>
            <p className="text-green-800">
              You don&apos;t need to follow the sequence. Explore anywhere, follow your curiosity and return whenever a food or nutrition question comes up. Use the{" "}
              <Link href="/search" className="underline hover:text-green-700">
                search feature
              </Link>{" "}
              for specific topics.
            </p>
          </div>

          <p className="mt-8 text-center text-neutral-600 italic">
            Take what&apos;s useful for you. We don&apos;t give rules or prescribe diets. We only support informed and confident food choices.
          </p>
        </div>
      </Section>

      {/* Essential Starting Points */}
      <Section background="neutral" padding="lg">
        <SectionHeader
          eyebrow="Resources"
          title="Essential starting points"
          description="These are a few good places to begin your journey."
          centered
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-12">
          {startingPoints.map((point) => (
            <div
              key={point.title}
              className={`rounded-2xl border p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow ${point.surface}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${point.iconWrap}`}
              >
                <point.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-[length:var(--size-subheading)] font-display font-semibold text-[var(--color-primary)] tracking-tight leading-snug mb-2">
                {point.title}
              </h3>
              <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)] mb-6 flex-1">
                {point.description}
              </p>
              <Button
                variant="primary"
                href={point.href}
                fullWidth
                size="md"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                {point.cta}
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* About FoodPulse */}
      <Section background="green" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-green-800 mb-6">
            FoodPulse bridges the gap between food research and everyday life. Behind the scenes, our work is grounded in research, critical thinking and respect for complexity but always ensuring clarity.
          </p>
          <p className="text-xl font-semibold text-green-900">
            We help you understand food and nutrition so you can make your own choices with confidence.
          </p>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="white" padding="lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
            Ready to continue?
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Start with this foundational piece on how to think about food and nutrition.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href={FOUNDATIONAL_FOOD_THINKING_ARTICLE}
            >
              Read the Foundational Article
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
