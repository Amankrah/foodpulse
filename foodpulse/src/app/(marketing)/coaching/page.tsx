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
    "Personalised 1:1 nutrition coaching grounded in your habits, household, health, and schedule. Evidence-informed support to think clearly about food.",
};

const approachPillars = [
  {
    title: "Understand first.",
    body: "Nothing is prescribed before your situation is genuinely understood.",
  },
  {
    title: "Your context. Always.",
    body: "Household, schedule, culture, and health status are all part of the conversation.",
  },
  {
    title: "Durable clarity.",
    body: "You will know what to do and why it fits you, so it still makes sense after coaching ends.",
  },
];

const whoFor = [
  "You are navigating a life transition that has disrupted how you eat: a move, a new job, a health diagnosis, or a growing household",
  "You eat reasonably well but still feel uncertain, conflicted, or anxious about decisions",
  "You have medical or dietary guidance and need help turning it into real meals",
  "You want to understand food, not only follow instructions you will not keep long term",
  "You manage food for others and general advice rarely fits your situation",
  "You have read widely and now want help thinking through your specific case",
];

const faqs = [
  {
    question: "Do I need coaching if I already eat fairly well?",
    answer:
      "It may still help if food choices still feel stressful or unclear. Eating well on paper and feeling clear in daily decisions are different. This work focuses on the second.",
  },
  {
    question: "Will I receive a meal plan?",
    answer:
      "No. You get understanding and agency instead. Meal plans tell you what to do. Coaching explains why, so you can decide for yourself in real situations after the work ends.",
  },
  {
    question: "Is this the same as seeing a dietitian or nutritionist?",
    answer:
      "No. FoodPulse coaching is education, context, and decision support, not clinical nutrition therapy. If you need clinical care, we say so clearly and point you to the right professionals.",
  },
  {
    question: "How do I know which offer is right for me?",
    answer:
      "If you are unsure, start with the Clarity Session. It answers that question on its own, even if you stop there. Many people gain more clarity in one hour than from months of reading alone.",
  },
  {
    question: "What if I reach out and it turns out coaching isn't the right fit?",
    answer:
      "We will say so honestly. Before any longer commitment we check fit on both sides. If it is not a match, you will hear that directly.",
  },
  {
    question: "Can I pay in instalments for the longer offers?",
    answer:
      "Ask when you reach out. Cost and cash flow are part of real life, and we can discuss options.",
  },
];

export default function CoachingPage() {
  return (
    <>
      {/* Section 1: Hero */}
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
            Personalised 1:1 coaching in your real context: habits, household,
            health, and schedule. Support to think clearly about food, from the
            inside out.
          </p>
          <Button variant="primary" size="lg" href="#how-coaching-works">
            See how coaching works ↓
          </Button>
          <p className="mt-6 text-base italic text-white/65">
            Not a diet programme. Not a meal plan. Not a one-size approach.
          </p>
        </div>
      </Section>

      {/* Section 2: Problem (no section heading) */}
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
            The noise is not going anywhere. What changes is how you relate to
            it, and who helps you filter it.
          </p>
        </div>
      </Section>

      {/* Section 3: Approach */}
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
              given, the real situation is understood: not only what you eat, but
              how your food environment works, where friction sits, what your
              body is dealing with, and what realistic change looks like for you.
            </p>
            <p>
              That takes more than a short questionnaire. It takes careful,
              systematic listening so patterns can surface, then judgment about
              what to do with them.
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

      {/* Section 4: Who this is for */}
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
            You want a meal plan to follow exactly, a fixed rules programme, or a
            quick transformation. FoodPulse coaching is not built for that. We
            would rather say so now than waste your time.
          </p>
        </div>
      </Section>

      {/* Section 5: Offers */}
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
            Each offer fits a different stage of readiness and a different need.
            There is no single correct entry point, only the one that fits where
            you are now.
          </p>

          {/* Food Clarity Session */}
          <article className="mb-8 rounded-2xl border-2 border-[var(--color-teal)]/45 bg-[color-mix(in_srgb,var(--color-mint)_32%,white)] p-6 shadow-md shadow-[var(--color-teal)]/10 ring-1 ring-[var(--color-teal)]/20 md:p-8">
            <p className="mb-1 font-semibold uppercase tracking-wide text-[var(--color-teal)]">
              Food Clarity Session
            </p>
            <p className="mb-4 font-semibold text-[var(--color-gold)]">
              <span className="text-3xl font-bold">$150</span>
              <span className="font-normal text-neutral-500">
                {" "}
                · One-time · 60 minutes
              </span>
            </p>
            <h3 className="mb-4 font-display text-xl font-bold text-[var(--color-primary)]">
              One focused hour to cut through the fog.
            </h3>
            <div className="mb-6 space-y-4 text-lg leading-relaxed text-neutral-800">
              <p>
                You bring your situation: questions, contradictions, what you
                have tried, and what is not working. Together we sort through what
                is really going on.
              </p>
              <p>
                This is not a consultation where you receive a generic list. It
                is a structured conversation that sharpens how you see your food
                situation and leaves you with direction that fits your life.
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
                "Clearer sense of what matters in your food situation and what does not",
                "Practical direction for your context, not a generic next step",
                "Better questions to guide your own decisions going forward",
                "Less of the low-level anxiety that often surrounds food choices",
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
                "You want expert thinking, not another off-the-shelf plan",
                "Everything you read seems to contradict everything else",
                "You are not ready for longer coaching but want real insight now",
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
                Book a Clarity Session: $150
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
          <article className="mb-8 rounded-2xl border-2 border-[var(--color-sage)]/55 bg-[color-mix(in_srgb,var(--color-sage)_14%,white)] p-6 shadow-md shadow-[var(--color-sage)]/10 ring-1 ring-[var(--color-support)]/25 md:p-8">
            <p className="mb-1 font-semibold uppercase tracking-wide text-[var(--color-support)]">
              Personalized Food Systems Coaching
            </p>
            <p className="mb-4 font-semibold text-[var(--color-gold)]">
              <span className="text-3xl font-bold">$520</span>
              <span className="font-normal text-neutral-500">
                {" "}
                · 3 weeks · 3 sessions + support
              </span>
            </p>
            <h3 className="mb-4 font-display text-xl font-bold text-[var(--color-primary)]">
              Focused work on one real food challenge.
            </h3>
            <div className="mb-6 space-y-4 text-lg leading-relaxed text-neutral-800">
              <p>
                This is a short, intensive container built around one clearly
                defined food challenge. We go deep on what to do and why it
                matters for your body, household, and daily life.
              </p>
              <p>
                It is not advice you could paste from a search result. It comes
                from mapping your situation and drawing on nutrition science,
                food systems, and how people actually live with food, then
                translating that for you.
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
                "A tailored approach from your situation, not a template",
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
                "You know what you want to work on: one clear food challenge or life area",
                "You're managing a specific health concern and need practical, evidence-informed help applying it to real meals",
                "Your household food system feels chaotic and you want it to actually work",
                "You want focused change without a long-term coaching commitment",
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
                Apply for Focused Coaching: $520
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
          <article className="rounded-2xl border-2 border-[var(--color-gold)]/55 bg-[color-mix(in_srgb,var(--color-gold)_14%,white)] p-6 shadow-md shadow-[var(--color-gold)]/15 ring-1 ring-[var(--color-primary)]/15 md:p-8">
            <p className="mb-1 font-semibold uppercase tracking-wide text-[var(--color-primary)]">
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
                Some food situations are not one conversation long. They layer
                health history, household complexity, transition, or years of
                advice that never quite fit you.
              </p>
              <p>
                This offer is for that depth. You get a sustained relationship
                with room to go underneath the surface. Sessions evolve as your
                situation does. Support between sessions is substantive. The
                work is collaborative, not a programme done to you.
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
                "Six 60-minute 1:1 sessions on a weekly cadence",
                "Real dialogue between sessions, not only email check-ins",
                "Adaptive sessions that evolve as your situation changes",
                "In-depth research and resources drawn for your context",
                "Thorough written notes and direction after every session",
                "Support through complexity: health changes, family needs, stress periods",
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
                "You are navigating several layered food concerns, not one simple issue",
                "You're going through a significant life or health transition that affects how you eat",
                "You want a thinking partner over time, not a programme to complete",
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
                Inquire About Mentorship: $1,100
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

      {/* Section 6: Client story */}
      <Section
        background="white"
        padding="lg"
        className="border-t border-[var(--color-gold)]/25 bg-[var(--color-primary)] text-white"
      >
        <div className="mx-auto max-w-3xl border-l-4 border-[var(--color-gold)] pl-6 md:pl-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)]">
            Client story
          </p>
          <h3 className="mb-8 font-display text-xl font-bold text-white md:text-2xl">
            Kenneth: six-week FoodPulse Mentorship
          </h3>
          <div className="space-y-4 text-[1.05rem] leading-relaxed text-[color-mix(in_srgb,white_90%,var(--color-mint))]">
            <p>
              Kenneth had recently relocated to a new country and was in the
              final stretch of his studies, navigating exams, job searching, and
              the particular exhaustion that comes with being between chapters of
              life. He was living in temporary accommodation with no kitchen
              access. He also kept a religious fasting practice, which shaped the
              rhythm of his eating.
            </p>
            <p>
              He knew he&apos;d soon transition into his own space, into a new
              job and eventually into starting a family. He didn&apos;t want to
              arrive at any of those moments without a clear foundation on
              something that profoundly affects his wellbeing: his food,
              nutrition and eating habits.
            </p>
            <p>He needed three things to work at once:</p>
            <ol className="list-decimal space-y-3 pl-6 marker:font-medium marker:text-[var(--color-gold)]">
              <li className="pl-2">
                Learning to navigate an unfamiliar food environment while
                staying connected to his original food identity.
              </li>
              <li className="pl-2">
                Building food habits that could hold up against a packed
                schedule with limited cooking access.
              </li>
              <li className="pl-2">
                Starting to think ahead in terms of what food would look like
                when he starts his family.
              </li>
            </ol>
            <p>
              Over six weeks, we worked through all three. His confidence
              navigating food in different settings including cafeterias,
              restaurants, grocery stores, and food advertising moved from
              uncertainty to what he described as very confident. His goals
              around building healthy food routines around the foods he
              currently has access to as well as his cultural foods, in his own
              assessment, were very well achieved. On food choices for his
              future family, he scored it well achieved, and noted that he would
              have welcomed even more depth there, similar to how the other
              areas were handled. That&apos;s fair, and it shaped how this work
              continues to develop.
            </p>
            <p>
              What surprised him most was the session on variety, discovering
              how he can build a more expansive, relaxed relationship with
              food.
            </p>
            <p>
              He rated the overall value of the coaching as much more than he
              expected.
            </p>
          </div>
          <blockquote className="mt-8 space-y-6 border-l-4 border-[var(--color-teal)] pl-4 text-[var(--color-mint)]">
            <p className="text-lg leading-relaxed">
              <span className="font-medium not-italic text-white/95">
                His advice to anyone considering it:{" "}
              </span>
              <span className="italic">
                &quot;Don&apos;t focus on &apos;getting information.&apos; Focus
                on the action steps you can take daily from the weekly coaching
                interactions.&quot;
              </span>
            </p>
            <p className="text-lg leading-relaxed">
              <span className="font-medium not-italic text-white/95">
                In his own words at the close:{" "}
              </span>
              <span className="italic">
                &quot;Thank you for going the extra mile for me. These things
                you have shared will stay with me.&quot;
              </span>
            </p>
          </blockquote>
          <p className="mt-8 font-semibold text-white">
            Kenneth
            <span className="mt-2 block text-sm font-normal italic text-white/55 md:mt-0 md:inline md:before:content-['_·_']">
              {" "}
              Shared with permission. Name used, identity kept private.
            </span>
          </p>
        </div>
      </Section>

      {/* Section 7: Honest framing */}
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
              If your situation requires clinical oversight, we say so and help
              you find the right professional. Honesty about what coaching can
              and cannot do is part of the work.
            </p>
            <p>
              What it is: a space to think clearly about food with someone who
              has spent nearly a decade where food science, food systems
              research, and everyday eating meet. No judgment, no extremes, and
              no pitch for an idealised version of you.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 8: About the coach */}
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
                  alt="Etornam C. Tsyawo, FoodPulse coaching"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-neutral-800 lg:col-span-3">
              <p>
                I&apos;m Etornam, a Food Systems Research Engineer and doctoral
                researcher in consumer food systems at McGill University. My
                work centres on household food environments and how people decide
                what to eat at home.
              </p>
              <p>
                My path was not linear. It began with a conversation with my
                mother about tin tomatoes and seasonal vegetables in Ghana,
                then led through chemical engineering, food science, food safety
                research, fieldwork with rural farmers, roles inside food
                companies, and research in people&apos;s kitchens on everyday food
                decisions.
              </p>
              <p>
                That breadth is what I bring to coaching. Beyond nutrition
                knowledge alone, I connect what is in a product, how it was
                made, what it does in the body, and how it fits a real week. For
                your situation, tying those layers together is the point of the
                work.
              </p>
              <p>
                I take very few coaching clients at once, on purpose. The work
                needs sustained attention, and attention has a limit.
              </p>
              <p className="text-base italic text-neutral-500">
                BSc Chemical Engineering · MSc Food Science &amp; Technology ·
                PhD (candidate) Consumer Food Systems, McGill University
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 9: FAQ */}
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

      {/* Section 10: Final CTA */}
      <Section
        id="contact"
        background="white"
        padding="none"
        className="border-t border-white/15 bg-[var(--color-teal)] pb-16 pt-16 text-white lg:pb-20 lg:pt-20"
      >
        <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
          <h2 className="mb-6 font-display text-3xl font-bold lg:text-4xl">
            Not sure where to begin?
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/90">
            The Clarity Session exists for this exact moment. One hour. One
            focused conversation. You leave with a clearer read on your food
            situation and a clearer sense of what, if anything, should come next.
          </p>

          <div className="rounded-2xl bg-[#0a2418] px-6 py-8 ring-1 ring-white/10">
            <a
              href={coachingInquiryMailto("Clarity Session", "Please include your name.")}
              className="text-xl font-bold text-white underline-offset-4 hover:underline"
            >
              Book a Clarity Session: $150
            </a>
            <p className="mt-3 text-sm leading-relaxed text-[#CCDDCC]">
              Email {CONTACT_EMAIL} · Subject: Clarity Session · Include your
              name · Response within 24 hours
            </p>
          </div>

          <p className="mt-10 text-[1.05rem] text-[var(--color-mint)]">
            Not ready to book? Send a message first.{" "}
            <a
              href={coachingSoftInquiryMailto()}
              className="font-bold text-[var(--color-gold)] underline-offset-4 hover:underline"
              title="Opens your email app with a short draft you can edit before sending"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-6 text-sm italic text-white/70">
            Coaching spaces are limited. If you&apos;re curious, sooner is
            better.
          </p>
        </div>
      </Section>
    </>
  );
}
