"use client";

import Link from "next/link";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { ConvertKitEmbed } from "@/components/newsletter/ConvertKitEmbed";

const issuePoints = [
  {
    title: "It starts with something real",
    body:
      "A food situation, a question someone asked, something that came up in everyday life. The topic is always grounded before any evidence is brought in. It's a conversation.",
  },
  {
    title: "Research earns its place",
    body:
      "When evidence is relevant, it comes in to support the thinking. If something is debated or uncertain, that is part of the explanation.",
  },
  {
    title: "You can write back",
    body:
      "Replies come directly to us. Your questions get real responses. If something in an issue sparks a thought or a question, send it.",
  },
] as const;

const testimonials = [
  {
    initials: "S",
    quote:
      "I signed up for the FoodPulse newsletter a couple of weeks ago and it changed the way I viewed healthy eating for the better. Myths I used to believe, that eating healthy was expensive, that it had to be organic, that non-carb foods were not filling, started falling away. Reading the newsletters helped me change my thinking, which in turn helped me start making better food choices. I have learned that when I eat healthy, I stay in a good mood, which helps improve my productivity. I look forward to another year with FoodPulse.",
    name: "Stephanie",
    linkedInHref: "https://www.linkedin.com/in/stephanie-ofosu-yeboah-0038b4196/",
    descriptor: "Working parent · United Kingdom",
  },
  {
    initials: "V",
    quote:
      "Etornam speaks in a simple manner and relates to daily life situations. As a health advocate myself, I have been inspired by this authentic style and sharing. The newsletters are fun to read, informative, educational, and interesting, with action steps you can take and implement.",
    name: "Venita",
    linkedInHref: "https://www.linkedin.com/in/venita-lalit-kumar-b36aa0189/",
    descriptor: "Health advocate · Malaysia",
  },
  {
    initials: "R",
    quote:
      "Most nutrition newsletters try to sell you on a product or service. FoodPulse provides insightful, practical information without trying to sell me. There is zero bias on food trends. I am just given suggestions on how I can eat healthier across a variety of foods. After reading FoodPulse I have been making more mindful choices about what I eat. If you are looking for a non-biased approach to incorporating a variety of food in your life, FoodPulse should be on your reading list.",
    name: "Rene Vega",
    linkedInHref: "https://www.linkedin.com/in/vegacrene/",
    descriptor: "Fitness enthusiast · United States",
  },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easeOut },
};

const headerStagger = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const headerItem = {
  initial: { opacity: 0, x: -12 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
};

function TestimonialCard({
  initials,
  quote,
  name,
  linkedInHref,
  descriptor,
}: (typeof testimonials)[number]) {
  return (
    <motion.article
      className="group relative h-full overflow-hidden rounded-2xl border border-[var(--color-teal)]/15 border-t-4 border-t-[var(--color-teal)] bg-[#f0f6f3] p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-8"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: easeOut }}
      whileHover={{ y: -3 }}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--color-gold)]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <p
        className="pointer-events-none mb-4 font-display text-5xl font-bold leading-none text-[var(--color-gold)]/25"
        aria-hidden
      >
        &ldquo;
      </p>
      <div className="relative mb-5 flex justify-center sm:justify-start">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-teal)]/25 to-[var(--color-mint)] text-base font-semibold text-[var(--color-primary)] ring-2 ring-[var(--color-gold)]/35 ring-offset-2 ring-offset-[#f0f6f3]"
          aria-hidden
        >
          {initials}
        </div>
      </div>
      <blockquote className="relative mb-5 text-[length:var(--size-body)] italic leading-relaxed text-[var(--color-support)]">
        &quot;{quote}&quot;
      </blockquote>
      <div className="text-sm text-neutral-600">
        <Link
          href={linkedInHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-semibold text-[#0a66c2] underline-offset-2 transition-colors hover:text-[var(--color-trust-blue)] hover:underline"
        >
          {name}
          <Linkedin className="h-4 w-4 shrink-0" aria-hidden />
          <span className="sr-only">
            {" "}
            (opens LinkedIn profile in a new tab)
          </span>
        </Link>
        <p className="mt-2 text-neutral-500">{descriptor}</p>
      </div>
    </motion.article>
  );
}

export function NewsletterLive() {
  const [first, second, third] = testimonials;

  return (
    <>
      <Section
        background="white"
        padding="lg"
        className="relative overflow-hidden border-b border-[var(--color-teal)]/10 bg-[color-mix(in_srgb,white_88%,var(--color-mint))]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.65]"
          aria-hidden
        >
          <div className="absolute -left-20 top-[-10%] h-[min(100%,28rem)] w-[min(100%,28rem)] rounded-full bg-[var(--color-gold)]/[0.18] blur-3xl" />
          <div className="absolute -right-24 bottom-[-20%] h-[min(100%,32rem)] w-[min(100%,32rem)] rounded-full bg-[var(--color-teal)]/[0.14] blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] max-w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-mint)]/60 blur-3xl" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(242,183,5,0.04)_45%,transparent_70%)]"
          aria-hidden
        />

        <div className="relative z-[1] mx-auto max-w-3xl text-center">
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-teal)]"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.02 }}
          >
            Monthly · FoodPulse
          </motion.p>
          <motion.div
            className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
            aria-hidden
          />
          <motion.h1
            className="font-display text-4xl font-extrabold tracking-tight text-[var(--color-primary)] lg:text-[2.75rem] lg:leading-[1.12]"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            <span className="block">One honest conversation about food.</span>
            <span className="mt-2 block bg-gradient-to-r from-[var(--color-teal)] via-[var(--color-support)] to-[var(--color-teal)] bg-clip-text text-transparent">
              Every month.
            </span>
          </motion.h1>
          <motion.div
            className="mx-auto mt-6 max-w-2xl space-y-5 text-lg font-light leading-relaxed text-[var(--color-support)]"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.18 }}
          >
            <p>
              Each issue of the FoodPulse Newsletter discusses one food situation
              that shows up in everyday food life and works through it with daily
              experiences, context and evidence.
            </p>
            <p className="inline-flex flex-col items-center gap-2 sm:inline-block sm:gap-0">
              <span className="rounded-full border border-[var(--color-teal)]/20 bg-white/70 px-4 py-2 text-base font-medium text-[var(--color-primary)] shadow-sm backdrop-blur-sm sm:inline-block">
                There are only{" "}
                <span className="font-semibold text-[var(--color-teal)]">12</span>{" "}
                issues a year.
              </span>
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-10 w-full max-w-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.28 }}
          >
            <div className="relative rounded-2xl p-[1px] shadow-[0_20px_50px_-12px_rgba(0,51,23,0.18)]">
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-teal)]/45 via-[var(--color-gold)]/35 to-[var(--color-mint)] opacity-90"
                aria-hidden
              />
              <div className="relative rounded-[0.95rem] bg-white/95 p-1 backdrop-blur-sm">
                <ConvertKitEmbed
                  minimal
                  hidePoweredBy
                  submitLabel="Send me the next issue"
                  guaranteeText="You can unsubscribe anytime."
                  className="[&_.formkit-form]:!max-w-none [&_.formkit-form]:!border-[var(--color-teal)]/25 [&_.formkit-form]:!shadow-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section
        background="white"
        padding="lg"
        className="relative overflow-hidden"
      >
        <div
          className="pointer-events-none absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 translate-x-1/3 rounded-full border border-[var(--color-sage)]/20 bg-[var(--color-mint)]/30 blur-2xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            variants={headerStagger}
          >
            <motion.p
              variants={headerItem}
              className="mb-1 font-semibold uppercase tracking-wide text-[var(--color-teal)]"
            >
              The newsletter
            </motion.p>
            <motion.h2
              variants={headerItem}
              className="font-display text-3xl font-bold text-[var(--color-primary)] lg:text-4xl"
            >
              What each issue is like
            </motion.h2>
          </motion.div>

          <div className="relative mt-12 border-l-2 border-[var(--color-gold)]/35 pl-8 md:pl-10">
            {issuePoints.map((item, i) => (
              <motion.div
                key={item.title}
                className={`relative ${i < issuePoints.length - 1 ? "pb-12" : ""}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  ease: easeOut,
                  delay: i * 0.1,
                }}
              >
                <span
                  className="absolute -left-[calc(0.5rem+2px)] top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--color-gold)] shadow-[0_0_0_4px_white]"
                  aria-hidden
                />
                <h3 className="font-display text-xl font-semibold text-[#1a3d2b]">
                  {item.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-neutral-700">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        background="neutral"
        padding="lg"
        className="relative overflow-hidden border-t border-[var(--color-sage)]/15 bg-gradient-to-b from-neutral-50 to-[color-mix(in_srgb,var(--color-mint)_35%,white)]"
      >
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[var(--color-teal)]/[0.07] blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl">
          <p className="mb-1 text-center font-semibold uppercase tracking-wide text-[var(--color-teal)] md:text-left">
            Readers say
          </p>
          <h2 className="text-center font-display text-3xl font-bold text-[var(--color-primary)] md:text-left lg:text-4xl">
            What subscribers notice
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
            <TestimonialCard {...first} />
            <TestimonialCard {...second} />
            <div className="md:col-span-2 md:flex md:justify-center">
              <div className="w-full md:max-w-xl">
                <TestimonialCard {...third} />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
