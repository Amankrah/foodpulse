import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import { Check } from "lucide-react";
import {
  coachingInquiryMailto,
  coachingSoftInquiryMailto,
} from "@/lib/coaching-email";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Coaching | ${SITE_NAME}`,
  description:
    "Personalised 1:1 coaching that enters your world — your habits, your constraints, your household, your health — and helps you think clearly from the inside out.",
};

const approachPillars = [
  {
    title: "Understand first.",
    body: "Nothing is prescribed before your situation is genuinely understood.",
  },
  {
    title: "Your context. Always.",
    body: "Household, schedule, culture, health status — all part of the conversation.",
  },
  {
    title: "Durable clarity.",
    body: "You won't just know what to do. You'll understand why — so it holds beyond the coaching.",
  },
];

const whoFor = [
  "You're navigating a life transition that's thrown your food habits off — a new country, a new job, a health diagnosis, a growing household",
  "You eat reasonably well but still feel uncertain, conflicted, or anxious about decisions",
  "You've been given medical or dietary guidance you genuinely don't know how to apply to real meals",
  "You want to understand food — not just follow instructions you'll eventually abandon",
  "You're managing food for more than yourself and the usual advice simply doesn't account for that",
  "You've read and researched enough. What you need now is someone to help you think through your specific situation",
];

const faqs = [
  {
    question: "Do I need coaching if I already eat fairly well?",
    answer:
      "Possibly yes — if you still feel uncertain, conflicted, or anxious about food decisions. Eating well and thinking clearly about food are different things. This coaching is for the second.",
  },
  {
    question: "Will I receive a meal plan?",
    answer:
      "No. You'll receive something more durable: understanding and agency. Meal plans tell you what to do. Coaching helps you understand why — so you can decide for yourself, in any situation, long after the coaching ends.",
  },
  {
    question: "Is this the same as seeing a dietitian or nutritionist?",
    answer:
      "No. FoodPulse coaching is education, context, and decision support — not clinical nutrition therapy. If your situation requires clinical management, that will be communicated clearly, and you'll be directed appropriately.",
  },
  {
    question: "How do I know which offer is right for me?",
    answer:
      "If you're not sure, start with the Clarity Session. It exists precisely to answer that question — and it stands on its own even if you don't continue. Many people find one focused hour clarifies more than months of reading.",
  },
  {
    question: "What if I reach out and it turns out coaching isn't the right fit?",
    answer:
      "Then that will be said honestly. Before any longer commitment, there's always an exchange first — to make sure this makes sense for both of us. If it doesn't, you'll know.",
  },
  {
    question: "Can I pay in instalments for the longer offers?",
    answer:
      "Reach out and we can discuss. Practical constraints are part of real life — that conversation is always open.",
  },
];

export default function CoachingPage() {
  return (
    <>
      {/* Section 1 — Hero */}
      <Section
        background="white"
        padding="lg"
        className="border-b border-[var(--color-teal)]/20 bg-[var(--color-primary)] text-white"
      >
        <div className="max-w-3xl">
          <nav
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/75"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="underline-offset-2 transition-colors hover:text-[var(--color-gold)] hover:underline"
            >
              Home
            </Link>
            <span className="text-white/50" aria-hidden>
              /
            </span>
            <span className="font-medium text-white">Coaching</span>
          </nav>

          <h1 className="mb-6 font-display text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
            You&apos;ve read enough about food.
            <br />
            Now let&apos;s make sense of it.
          </h1>
          <p className="mb-8 text-xl font-light leading-relaxed text-white/90">
            Personalised 1:1 coaching that enters your world — your habits,
            your constraints, your household, your health — and helps you think
            clearly from the inside out.
          </p>
          <Button variant="primary" size="lg" href="#how-coaching-works">
            See how coaching works ↓
          </Button>
          <p className="mt-6 text-base italic text-white/65">
            Not a diet programme. Not a meal plan. Not a one-size approach.
          </p>
        </div>
      </Section>

      {/* Section 2 — The problem (no visible section header) */}
      <Section background="white" padding="lg" className="border-t border-[var(--color-sage)]/15">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-neutral-800">
          <p>Most food confusion doesn&apos;t come from a lack of information.</p>
          <p>It comes from information that was never built for your life.</p>
          <p>
            You&apos;ve read the articles. You&apos;ve followed the advice. And
            somewhere between what you know and what you actually do at 7pm on a
            Tuesday, something gets lost. Not because you lack discipline. But
            because the advice was written for someone else&apos;s kitchen,
            someone else&apos;s schedule, someone else&apos;s body.
          </p>
          <p>
            The noise isn&apos;t going anywhere. What changes is how you relate
            to it — and who you have in your corner to help you filter it.
          </p>
        </div>
      </Section>

      {/* Section 3 — The approach */}
      <Section
        id="how-coaching-works"
        background="white"
        padding="lg"
        className="border-t border-[var(--color-sage)]/10 bg-[color-mix(in_srgb,var(--color-mint)_18%,white)]"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 font-display text-3xl font-bold text-[var(--color-primary)] lg:text-4xl">
            Food decisions are never just about food.
          </h2>
          <div className="mb-12 space-y-6 text-lg leading-relaxed text-neutral-800">
            <p>
              They happen inside a household with competing preferences. Around
              a health condition that doesn&apos;t fit any template. Across a
              week shaped by energy, stress, budget, and culture. In a new city
              where everything you knew how to buy and cook is suddenly
              unfamiliar.
            </p>
            <p>
              FoodPulse coaching works at that level. Before any direction is
              given, the real situation is understood — not just what you eat,
              but how your food environment actually works, where the friction
              is, what your body is dealing with, and what realistic change
              looks like for you specifically.
            </p>
            <p>
              This takes more than asking a few questions. It takes the kind of
              careful, systematic listening that lets patterns surface — and then
              the expertise to know what to do with them.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {approachPillars.map((pillar) => (
              <Card
                key={pillar.title}
                padding="md"
                className="border border-[var(--color-teal)]/12 bg-[#F0F6F3]"
              >
                <CardTitle className="mb-3 text-lg text-[var(--color-primary)]">
                  {pillar.title}
                </CardTitle>
                <p className="text-[0.95rem] leading-relaxed text-neutral-800">
                  {pillar.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Section 4 — Who this is for */}
      <Section background="white" padding="lg" className="border-t border-[var(--color-sage)]/15">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-3xl font-bold text-[var(--color-primary)] lg:text-4xl">
            This coaching is for you if…
          </h2>
          <ul className="mb-12 space-y-4">
            {whoFor.map((item) => (
              <li key={item} className="flex gap-3 text-lg leading-relaxed text-neutral-800">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-mint)_40%,white)] text-[var(--color-teal)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mb-4 font-display text-xl font-bold text-neutral-900">
            And this is not for you if…{" "}
          </h3>
          <p className="text-lg leading-relaxed text-neutral-800">
            You want a meal plan to follow to the letter, a structured programme
            with fixed rules, or a quick transformation. FoodPulse coaching
            isn&apos;t that — and we&apos;d rather be honest about it now than
            waste your time.
          </p>
        </div>
      </Section>

      {/* Section 5 — The offers */}
      <Section
        id="packages"
        background="neutral"
        padding="lg"
        className="border-t border-[var(--color-sage)]/10 bg-[color-mix(in_srgb,var(--color-mint)_10%,var(--neutral-50))]"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-display text-3xl font-bold text-[var(--color-primary)] lg:text-4xl">
            Three ways to work together.
          </h2>
          <p className="mb-14 text-lg leading-relaxed text-neutral-800">
            Each is designed for a different stage of readiness and a different
            kind of need. There&apos;s no right entry point — there&apos;s only
            the one that fits where you are.
          </p>

          {/* Food Clarity Session */}
          <article className="mb-16 border-b border-[var(--color-sage)]/20 pb-16">
            <p className="mb-2 font-semibold uppercase tracking-wide text-[var(--color-teal)]">
              Food Clarity Session{" "}
              <span className="font-normal text-neutral-500">·</span>{" "}
              <span className="text-[var(--color-gold)]">$150</span>{" "}
              <span className="font-normal text-neutral-500">
                · One-time · 60 minutes
              </span>
            </p>
            <h3 className="mb-4 font-display text-xl font-bold text-[var(--color-primary)]">
              One focused hour to cut through the fog.
            </h3>
            <div className="mb-6 space-y-4 text-lg leading-relaxed text-neutral-800">
              <p>
                You bring your situation — your questions, your contradictions,
                what you&apos;ve tried, what&apos;s not working. Together, we
                work through what&apos;s actually going on.
              </p>
              <p>
                This isn&apos;t a consultation where you get handed a list of
                recommendations. It&apos;s a structured conversation that helps
                you see your food situation more clearly — and leaves you with a
                direction that makes sense for your specific life.
              </p>
              <p>
                Many people find this session alone is enough. Others use it as
                the beginning of deeper work. Either way, it stands completely
                on its own.
              </p>
            </div>

            <p className="mb-3 font-semibold text-[var(--color-teal)]">
              What&apos;s included
            </p>
            <ul className="mb-6 space-y-2 text-neutral-800">
              {[
                "Clearer understanding of your food situation — what matters and what doesn't",
                "Practical direction tailored to your context — not a generic next step",
                "Better questions to guide your own decisions going forward",
                "Relief from the low-level anxiety that often surrounds food choices",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--color-teal)]"
                    strokeWidth={2.25}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <p className="mb-3 font-semibold text-[var(--color-teal)]">
              Right for you if
            </p>
            <ul className="mb-8 space-y-2 text-neutral-800">
              {[
                `"I don't even know where to start"`,
                "You want expert thinking — not another plan",
                "Everything you read seems to contradict everything else",
                "You're not ready to commit to longer coaching but want real insight now",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--color-teal)]"
                    strokeWidth={2.25}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-[var(--color-primary)] px-6 py-8 text-center">
              <a
                href={coachingInquiryMailto("Food Clarity Session")}
                className="text-xl font-bold text-white underline-offset-4 hover:underline"
              >
                Book a Clarity Session — $150
              </a>
              <p className="mt-3 text-sm leading-relaxed text-[#CCDDCC]">
                Email {CONTACT_EMAIL} · Mention &quot;Food Clarity Session&quot;
                in your message · Response within 24 hours
              </p>
            </div>
            <p className="mt-4 text-sm italic text-neutral-500">
              No upsell. No follow-up pressure. This session is complete in
              itself.
            </p>
          </article>

          {/* Personalized Food Systems Coaching */}
          <article className="mb-16 border-b border-[var(--color-sage)]/20 pb-16">
            <p className="mb-2 font-semibold uppercase tracking-wide text-[var(--color-teal)]">
              Personalized Food Systems Coaching{" "}
              <span className="font-normal text-neutral-500">·</span>{" "}
              <span className="text-[var(--color-gold)]">$520</span>{" "}
              <span className="font-normal text-neutral-500">
                · 3 weeks · 3 sessions + support
              </span>
            </p>
            <h3 className="mb-4 font-display text-xl font-bold text-[var(--color-primary)]">
              Focused work on one real food challenge.
            </h3>
            <div className="mb-6 space-y-4 text-lg leading-relaxed text-neutral-800">
              <p>
                This is a short, intensive coaching container built around a
                single, clearly defined food challenge. We go deep — not just
                on what to do, but on why it matters for your body, your
                household, and your daily reality.
              </p>
              <p>
                This isn&apos;t advice you could have Googled. It&apos;s the
                result of carefully mapping your situation and drawing from
                research across nutrition science, food systems, and how people
                actually live with food — then translating all of that
                specifically for you.
              </p>
            </div>

            <p className="mb-3 font-semibold text-[var(--color-teal)]">
              What&apos;s included
            </p>
            <ul className="mb-6 space-y-2 text-neutral-800">
              {[
                "3 x 60-minute 1:1 sessions over 3 weeks",
                "Written direction notes and key resources after each session",
                "Email support between sessions",
                "A tailored approach built from your specific situation — not a template",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--color-teal)]"
                    strokeWidth={2.25}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <p className="mb-3 font-semibold text-[var(--color-teal)]">
              Right for you if
            </p>
            <ul className="mb-8 space-y-2 text-neutral-800">
              {[
                "You know what you want to work on — one clear food challenge or area of life",
                "You're managing a specific health concern and need practical, evidence-informed help applying it to real meals",
                "Your household food system feels chaotic and you want it to actually work",
                "You want focused, meaningful change — without a long-term coaching commitment",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--color-teal)]"
                    strokeWidth={2.25}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-[var(--color-primary)] px-6 py-8 text-center">
              <a
                href={coachingInquiryMailto("Personalized Food Systems Coaching")}
                className="text-xl font-bold text-white underline-offset-4 hover:underline"
              >
                Apply for Focused Coaching — $520
              </a>
              <p className="mt-3 text-sm leading-relaxed text-[#CCDDCC]">
                Email {CONTACT_EMAIL} · Mention &quot;Personalized Food Systems
                Coaching&quot; in your message · Response within 24 hours
              </p>
            </div>
            <p className="mt-4 text-sm italic text-neutral-500">
              We&apos;ll exchange a few emails first to confirm this is the
              right fit before any commitment.
            </p>
          </article>

          {/* Ongoing FoodPulse Mentorship */}
          <article className="mb-4 rounded-2xl border-2 border-[var(--color-gold)]/35 bg-white p-6 shadow-md ring-1 ring-[var(--color-teal)]/10 md:p-8">
            <p className="mb-1 font-semibold uppercase tracking-wide text-[var(--color-teal)]">
              Ongoing FoodPulse Mentorship
            </p>
            <p className="mb-4 text-sm font-semibold tracking-wide text-[var(--color-gold)]">
              PREMIUM · 2 SPACES AVAILABLE AT ANY TIME
            </p>
            <p className="mb-4 font-semibold text-[var(--color-gold)]">
              <span className="text-3xl font-bold">$1,100</span>{" "}
              <span className="font-normal text-neutral-500">
                · 6 weeks · Weekly sessions + ongoing support
              </span>
            </p>
            <h3 className="mb-4 font-display text-xl font-bold text-[var(--color-primary)]">
              A thinking partnership for the long game.
            </h3>
            <div className="mb-6 space-y-4 text-lg leading-relaxed text-neutral-800">
              <p>
                Some food situations aren&apos;t one-conversation problems.
                They&apos;re layered — shaped by health history, household
                complexity, a life in transition, or the kind of accumulated
                confusion that built up over years of receiving information that
                never quite fit.
              </p>
              <p>
                This is the offer for that. A sustained coaching relationship
                that has the time and depth to actually get underneath things.
                Sessions evolve as your situation does. The support between them
                is real, not perfunctory. And the work is genuinely
                collaborative — not a programme being delivered to you.
              </p>
              <p>
                This offer is intentionally limited. There are only two
                mentorship spaces available at any time. This isn&apos;t a
                marketing device. It&apos;s what makes the depth of this work
                possible.
              </p>
            </div>

            <p className="mb-3 font-semibold text-[var(--color-teal)]">
              What&apos;s included
            </p>
            <ul className="mb-6 space-y-2 text-neutral-800">
              {[
                "6 x 60-minute 1:1 sessions — weekly cadence",
                "Real dialogue between sessions — not just email check-ins",
                "Adaptive sessions that evolve as your situation changes",
                "In-depth research and resources drawn specifically for your context",
                "Thorough written notes and direction after every session",
                "Support through complexity — health changes, family needs, periods of stress",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--color-teal)]"
                    strokeWidth={2.25}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <p className="mb-3 font-semibold text-[var(--color-teal)]">
              Right for you if
            </p>
            <ul className="mb-8 space-y-2 text-neutral-800">
              {[
                "You're navigating multiple, layered food concerns — not just one clear thing",
                "You're going through a significant life or health transition that affects how you eat",
                "You want a thinking partner over time — not a programme to complete",
                "Shorter approaches have helped but haven't gone deep enough",
              ].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--color-teal)]"
                    strokeWidth={2.25}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-[var(--color-primary)] px-6 py-8 text-center">
              <a
                href={coachingInquiryMailto("Mentorship")}
                className="text-xl font-bold text-white underline-offset-4 hover:underline"
              >
                Inquire About Mentorship — $1,100
              </a>
              <p className="mt-3 text-sm leading-relaxed text-[#CCDDCC]">
                Email {CONTACT_EMAIL} · Mention &quot;Mentorship&quot; and your
                name · Response within 24 hours
              </p>
            </div>
            <p className="mt-4 text-sm italic text-neutral-500">
              A conversation will happen before any commitment is made on
              either side. With only two spaces available, fit matters as much
              as interest.
            </p>
          </article>
        </div>
      </Section>

      {/* Section 6 — Client story */}
      <Section background="white" padding="lg" className="border-t border-[var(--color-sage)]/15">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-[var(--color-teal)]/15 border-t-4 border-t-[var(--color-teal)] bg-[#F0F6F3] px-6 py-8 md:px-10 md:py-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-teal)]">
              Client story
            </p>
            <h3 className="mb-6 font-display text-lg font-bold text-[var(--color-primary)]">
              Kenneth — 6-Week FoodPulse Mentorship
            </h3>
            <div className="space-y-4 text-[1.05rem] leading-relaxed text-neutral-800">
              <p>
                Kenneth had recently relocated to a new country. He was managing a
                demanding work schedule and living in temporary accommodation
                without access to a kitchen — but he knew a transition into his
                own space was coming. He wanted to be ready.
              </p>
              <p>
                Three things needed to work at once: navigating an unfamiliar
                food environment in a new country, building practical,
                time-respecting food habits around a packed schedule, and
                thinking ahead to when he starts a family.
              </p>
              <p>
                Over six weeks, all three were worked through — the new food
                environment, the daily habits, the future planning. On the family
                piece, Kenneth reflected that he wished there had been more
                depth, similar to the other areas. That was honest and fair — and
                something taken seriously. Overall, he rated the experience 4 out
                of 5 and highly recommends FoodPulse coaching.
              </p>
            </div>
            <blockquote className="mt-6 border-l-4 border-[var(--color-teal)]/40 pl-4 italic text-[var(--color-teal)]">
              &quot;[Direct quote — coming soon]&quot;
            </blockquote>
            <p className="mt-6 font-semibold text-[var(--color-primary)]">
              — Kenneth
              <span className="mt-2 block text-sm font-normal italic text-neutral-500 md:mt-0 md:inline md:before:content-['_·_']">
                {" "}
                Shared with permission. Name used, identity kept private.
              </span>
            </p>
          </div>
        </div>
      </Section>

      {/* Section 7 — Honest framing */}
      <Section
        background="white"
        padding="lg"
        className="border-t border-[var(--color-sage)]/10 bg-[color-mix(in_srgb,var(--color-mint)_12%,white)]"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-3xl font-bold text-[var(--color-primary)] lg:text-4xl">
            Let&apos;s be clear about what this is.
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-neutral-800">
            <p>
              FoodPulse coaching is education, context, and decision support. It
              is not clinical nutrition therapy, not medical treatment, and not
              a replacement for a registered dietitian or your doctor.
            </p>
            <p>
              If your situation requires clinical oversight, that will be said
              directly — and you&apos;ll be pointed toward the right
              professional. Honesty about what coaching can and can&apos;t do is
              part of the work.
            </p>
            <p>
              What it is: a space to think clearly about food with someone who
              has spent nearly a decade at the intersection of food science,
              food systems research, and how people actually live with food —
              without judgment, without extremes, without selling you an ideal
              version of yourself.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 8 — About the coach */}
      <Section background="white" padding="lg" className="border-t border-[var(--color-sage)]/15">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 font-display text-3xl font-bold text-[var(--color-primary)] lg:text-4xl">
            Who you&apos;re working with.
          </h2>
          <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-14">
            <div className="lg:col-span-2">
              <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl shadow-lg lg:mx-0">
                <Image
                  src="/images/etornam-tsyawo.jpg"
                  alt="Etornam — FoodPulse coaching"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-800 lg:col-span-3">
              <p>
                I&apos;m Etornam — a Food Systems Research Engineer currently
                pursuing doctoral research in consumer food systems at McGill
                University, where my work centres on household food environments
                and how people actually make decisions about food in their homes.
              </p>
              <p>
                My path into this wasn&apos;t linear. It started with a
                conversation with my mother about tin tomatoes and seasonal
                vegetables in Ghana — and it took me through chemical
                engineering, food science, food safety research, years working
                alongside rural farmers, time inside food companies, and
                eventually into people&apos;s kitchens studying how food
                decisions really happen at the everyday level.
              </p>
              <p>
                That breadth is what I bring to coaching. It&apos;s not just
                nutrition knowledge — it&apos;s an understanding of food at
                every layer, from what&apos;s in a product to how it was produced
                to what it does in your body to how it fits into your actual
                week. Connecting those layers, for your specific situation, is
                what this work is.
              </p>
              <p>
                I take very few coaching clients at once. That&apos;s deliberate.
                This kind of work requires real attention — and real attention
                has limits.
              </p>
              <p className="text-base italic text-neutral-500">
                BSc Chemical Engineering · MSc Food Science &amp; Technology ·
                PhD (candidate) Consumer Food Systems, McGill University
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 9 — FAQ */}
      <Section
        background="neutral"
        padding="lg"
        className="border-t border-[var(--color-sage)]/10 bg-[color-mix(in_srgb,var(--color-mint)_8%,var(--neutral-50))]"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-[var(--color-primary)] lg:text-4xl">
            A few honest questions.
          </h2>
          <Accordion items={faqs} allowMultiple />
        </div>
      </Section>

      {/* Section 10 — Final CTA */}
      <Section
        id="contact"
        background="white"
        padding="lg"
        className="border-t border-[var(--color-teal)]/20 bg-[var(--color-primary)] text-white"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 font-display text-3xl font-bold text-white lg:text-4xl">
            Not sure where to begin?
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/90">
            The Clarity Session exists for exactly this. One hour. One focused
            conversation. You leave knowing more about your food situation than
            when you arrived — and with a clear sense of what, if anything,
            comes next.
          </p>

          <div className="rounded-2xl bg-[#0a2418] px-6 py-8 ring-1 ring-white/10">
            <a
              href={coachingInquiryMailto("Clarity Session", "Please include your name.")}
              className="text-xl font-bold text-white underline-offset-4 hover:underline"
            >
              Book a Clarity Session — $150
            </a>
            <p className="mt-3 text-sm leading-relaxed text-[#CCDDCC]">
              Email {CONTACT_EMAIL} · Subject: Clarity Session · Include your
              name · Response within 24 hours
            </p>
          </div>

          <p className="mt-10 text-[1.05rem] text-[var(--color-teal)]">
            Not ready to book? Send a message first →{" "}
            <a
              href={coachingSoftInquiryMailto()}
              className="font-bold text-[var(--color-gold)] underline-offset-4 hover:underline"
              title="Opens your email app with a short draft you can edit before sending"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-6 text-sm italic text-white/60">
            Coaching spaces are limited. If you&apos;re curious, sooner is
            better.
          </p>
        </div>
      </Section>
    </>
  );
}
