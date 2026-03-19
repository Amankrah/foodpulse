import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accordion } from "@/components/ui/Accordion";
import {
  Search,
  PenLine,
  RefreshCw,
  ExternalLink,
  Youtube,
  Coffee,
  Globe,
  Linkedin
} from "lucide-react";
import { SITE_URL, SOCIAL_LINKS, FOUNDER } from "@/lib/constants";

// Content Pillars Data
const contentPillars = [
  {
    title: "Food and Wellbeing",
    description: "Nutrition science, gut health, disease prevention",
    href: "/articles/food-and-wellbeing",
    icon: "🥗",
  },
  {
    title: "Kitchen and Cooking",
    description: "Meal prep, recipes, cooking techniques",
    href: "/articles/kitchen-and-cooking",
    icon: "🍳",
  },
  {
    title: "Food Literacy",
    description: "Labels, quality, informed food choices",
    href: "/articles/food-literacy",
    icon: "📚",
  },
  {
    title: "Food Systems",
    description: "Sustainability, supply chains, policy",
    href: "/articles/food-systems",
    icon: "🌾",
  },
];

// Values Data
const values = [
  {
    title: "Evidence Over Opinion",
    description: "We cite our sources. Every claim is backed by peer-reviewed research, expert consensus, or transparent reasoning. If evidence is limited, we say so.",
  },
  {
    title: "Clarity Over Complexity",
    description: "Nutrition science is complex. Our job is to make it understandable without dumbing it down. We explain the 'why' behind recommendations.",
  },
  {
    title: "Empowerment Over Prescription",
    description: "We give you information to make your own choices. We don't tell you what to eat. Your food decisions depend on your health, values, and preferences.",
  },
  {
    title: "Accessibility Over Gatekeeping",
    description: "Good food information should be free and available to everyone. All FoodPulse content is free to access, forever.",
  },
];

// Editorial Standards Data
const editorialStandards = [
  {
    title: "How We Research",
    description: "We review peer-reviewed studies, WHO/FDA/NIH guidelines, and expert consensus before writing. We distinguish between established science and emerging research.",
    icon: Search,
  },
  {
    title: "How We Write",
    description: "Content is evidence-based, accessible, and actionable. We avoid sensationalism, fad diet promotion, and making absolute claims without strong evidence.",
    icon: PenLine,
  },
  {
    title: "How We Update",
    description: "Articles are reviewed quarterly and updated when new research emerges. Updated articles display a 'Last updated' date for transparency.",
    icon: RefreshCw,
  },
];

// FAQ Data (optimized for AI/LLM citation)
const faqs = [
  {
    question: "What is FoodPulse?",
    answer: "FoodPulse is a free, evidence-based food education platform that helps consumers make informed decisions about nutrition, food systems, and healthy eating. We translate complex food science into practical, actionable knowledge.",
  },
  {
    question: "Who founded FoodPulse?",
    answer: "FoodPulse was founded by Etornam C. Tsyawo, a Food Systems Research Engineer and Doctoral Researcher at McGill University with over a decade of experience in food systems research and consumer nutrition education.",
  },
  {
    question: "Is FoodPulse free?",
    answer: "Yes. All articles, guides, and resources on FoodPulse are free to access. We believe food education should be accessible to everyone.",
  },
  {
    question: "Is the information on FoodPulse reliable?",
    answer: "Yes. FoodPulse content is evidence-based, citing peer-reviewed research and authoritative health organizations. Our editorial process includes research, fact-checking, and regular updates.",
  },
  {
    question: "What topics does FoodPulse cover?",
    answer: "FoodPulse covers four main areas: Food and Wellbeing (nutrition and health), Kitchen and Cooking (recipes, meal prep, cooking techniques), Food Literacy (labels, informed choices, consumer education), and Food Systems (supply chains, sustainability, policy).",
  },
  {
    question: "How can I contact FoodPulse?",
    answer:
      "Use our contact form to send a message. You can also connect on Kit, LinkedIn, or YouTube, or subscribe to our newsletter for monthly updates.",
  },
];

// Founder credentials
const credentials = [
  "Doctoral Researcher, SASEL Lab, McGill University",
  "10+ years in food systems research and education",
  "Experience in food entrepreneurship and product development",
  "Research focus: consumer food behavior, food processing, nutrition optimization",
];

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO and AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "FoodPulse",
              "description": "Evidence-based food education platform",
              "url": SITE_URL,
              "founder": {
                "@type": "Person",
                "name": "Etornam C. Tsyawo",
                "jobTitle": "Food Systems Research Engineer",
                "affiliation": {
                  "@type": "Organization",
                  "name": "McGill University",
                  "department": "SASEL Lab"
                }
              }
            }
          }),
        }}
      />

      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold text-[var(--color-primary)] tracking-tight mb-6">
            About FoodPulse
          </h1>
          <p className="text-xl lg:text-2xl font-light text-[var(--color-support)] mb-6 leading-relaxed">
            Your trusted source for evidence-based food education
          </p>
          <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)] max-w-2xl mx-auto">
            FoodPulse is where food science meets everyday life. We translate complex
            nutrition research into practical, actionable knowledge—helping you make
            smarter food choices without the hype, fads, or fear-mongering.
          </p>
        </div>
      </Section>

      {/* Mission Section */}
      <Section background="white" padding="lg">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Our Mission"
            title="Democratizing Food Knowledge"
            centered
          />

          <div className="space-y-6 text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)] text-center max-w-3xl mx-auto">
            <p>
              We believe everyone deserves access to reliable, science-based food
              information—regardless of background, education, or budget.
            </p>
            <p>
              Too often, nutrition information is buried in academic journals, hidden
              behind paywalls, or oversimplified into clickbait headlines. FoodPulse
              bridges this gap.
            </p>
            <p className="font-semibold text-[var(--color-primary)] text-[length:var(--size-subheading)]">
              Our goal is simple: Help you understand food better so you can make
              informed decisions that support your health, your values, and your life.
            </p>
          </div>
        </div>
      </Section>

      {/* What is FoodPulse Section - AI Citation Optimized */}
      <Section background="neutral" padding="lg">
        <div className="max-w-4xl mx-auto mb-12">
          <SectionHeader
            eyebrow="Overview"
            title="What is FoodPulse?"
            centered
          />

          {/* AI-citable definition paragraph */}
          <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)] text-center max-w-3xl mx-auto">
            FoodPulse is a free, evidence-based food education platform covering
            nutrition science, food systems, healthy eating, and practical food tips.
            Founded by Food Systems Research Engineer Etornam C. Tsyawo, we provide
            reliable information that helps consumers navigate the complex world of
            food choices.
          </p>
        </div>

        {/* Content Pillars */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-display font-semibold text-[var(--color-primary)] text-center mb-8">
            What we cover
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentPillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group rounded-2xl border border-[var(--color-teal)]/20 bg-[var(--color-mint)] p-6 shadow-sm hover:shadow-md hover:border-[var(--color-teal)]/35 transition-all text-center"
              >
                <div className="text-4xl mb-4" aria-hidden>
                  {pillar.icon}
                </div>
                <h4 className="font-display font-semibold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-teal)] transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-sm leading-relaxed text-[var(--color-support)]">
                  {pillar.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Founder Section - E-E-A-T Optimized */}
      <Section background="white" padding="lg">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="The Founder"
            title="Who is Behind FoodPulse?"
            centered
          />

          <div className="grid lg:grid-cols-5 gap-12 items-start mt-12">
            {/* Photo */}
            <div className="lg:col-span-2">
              <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/etornam-tsyawo.jpg"
                  alt="Etornam C. Tsyawo - Food Systems Research Engineer and Founder of FoodPulse"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-2xl font-display font-semibold text-[var(--color-primary)]">
                Meet the founder: Etornam C. Tsyawo
              </h3>

              <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)]">
                Etornam C. Tsyawo is a Food Systems Research Engineer and Doctoral
                Researcher at SASEL Lab, McGill University. With over a decade of
                experience spanning food entrepreneurship, product development, and
                consumer nutrition education, Etornam founded FoodPulse to make
                evidence-based food knowledge accessible to everyone.
              </p>

              {/* Credentials */}
              <div>
                <h4 className="font-semibold text-[var(--color-primary)] mb-4">
                  Credentials & experience
                </h4>
                <ul className="space-y-3">
                  {credentials.map((credential, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-[var(--color-support)] border-l-4 border-[var(--color-teal)] pl-4 leading-relaxed"
                    >
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-[var(--color-primary)] mb-3">
                  Connect with Etornam
                </h4>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={FOUNDER.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[var(--color-support)] hover:text-[var(--color-teal)] transition-colors"
                  >
                    <Globe className="h-5 w-5 shrink-0" />
                    <span>Website</span>
                  </a>
                  <a
                    href={FOUNDER.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[var(--color-support)] hover:text-[var(--color-teal)] transition-colors"
                  >
                    <Linkedin className="h-5 w-5 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={FOUNDER.buyMeACoffee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[var(--color-support)] hover:text-[var(--color-teal)] transition-colors"
                  >
                    <Coffee className="h-5 w-5 shrink-0" />
                    <span>Buy Me a Coffee</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Quote */}
          <div className="mt-12 p-8 rounded-2xl border border-[var(--color-gold)]/35 bg-[var(--color-mint)] max-w-3xl mx-auto">
            <p className="brand-quote !border-l-0 pl-0 text-center text-[length:var(--size-quote)] max-w-none">
              &ldquo;I started FoodPulse because I believe food knowledge shouldn&apos;t be locked behind
              academic journals or drowned in clickbait. My goal is to give you the information
              you need to make your own food choices—not to tell you what to eat.&rdquo;
            </p>
            <p className="text-center mt-4 font-semibold text-[var(--color-support)]">
              — Etornam C. Tsyawo
            </p>
          </div>
        </div>
      </Section>

      {/* Editorial Standards Section */}
      <Section background="green" padding="lg">
        <SectionHeader
          eyebrow="Our Process"
          title="Our Editorial Standards"
          centered
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {editorialStandards.map((standard) => (
            <Card key={standard.title} padding="lg" className="text-center border border-white/20 bg-white/95">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-white/90 text-[var(--color-teal)] ring-2 ring-[var(--color-teal)]/15">
                <standard.icon className="h-8 w-8" aria-hidden />
              </div>
              <h3 className="text-xl font-display font-semibold text-[var(--color-primary)] mb-4">
                {standard.title}
              </h3>
              <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)]">
                {standard.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Additional Editorial Info */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-[var(--color-support)] mb-4 leading-relaxed">
            <strong className="text-[var(--color-primary)]">Sources & citations:</strong> We cite
            sources inline and include reference lists for in-depth articles. Primary sources
            (original research) are preferred over secondary reporting.
          </p>
          <p className="text-[length:var(--size-body)] text-[var(--color-support)] leading-relaxed">
            If you find an error, please{" "}
            <Link href="/contact" className="font-semibold text-[var(--color-teal)] hover:text-[var(--color-primary)] underline underline-offset-2">
              reach out via our contact form
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* Values Section */}
      <Section background="white" padding="lg">
        <SectionHeader
          eyebrow="What We Stand For"
          title="Our Values"
          centered
        />

        <div className="max-w-3xl mx-auto space-y-8 mt-12">
          {values.map((value, index) => (
            <div key={index} className="border-l-4 border-[var(--color-teal)] pl-6">
              <h3 className="text-xl font-display font-semibold text-[var(--color-primary)] mb-2">
                {index + 1}. {value.title}
              </h3>
              <p className="text-[length:var(--size-body)] leading-relaxed text-[var(--color-support)]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ Section - AI/Voice Search Optimized */}
      <Section background="neutral" padding="lg">
        <SectionHeader
          eyebrow="Questions"
          title="Frequently Asked Questions"
          centered
        />

        <div className="max-w-3xl mx-auto mt-12">
          <Accordion items={faqs} allowMultiple defaultOpenIndex={0} />
        </div>
      </Section>

      {/* Newsletter CTA Section */}
      <Section background="white" padding="lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-[var(--color-primary)]">
            Stay updated
          </h2>
          <p className="text-xl font-light text-[var(--color-support)] mb-8 leading-relaxed">
            Get our latest articles and food insights delivered monthly. No spam, ever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button variant="primary" size="lg" href="/newsletter">
              Subscribe to newsletter
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Contact us
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-8 border-t border-[var(--color-support)]/15">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-support)] hover:text-[var(--color-teal)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={SOCIAL_LINKS.kit}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-support)] hover:text-[var(--color-teal)] transition-colors"
              aria-label="FoodPulse on Kit"
            >
              <ExternalLink className="h-6 w-6" />
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-support)] hover:text-[var(--color-teal)] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
