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
  Instagram,
  Youtube,
  Coffee,
  Globe,
  Linkedin
} from "lucide-react";
import { SITE_URL, SOCIAL_LINKS, CONTACT_EMAIL, FOUNDER } from "@/lib/constants";

// Content Pillars Data
const contentPillars = [
  {
    title: "Food & Wellbeing",
    description: "Nutrition science, gut health, disease prevention",
    href: "/articles/food-wellbeing",
    icon: "🥗",
  },
  {
    title: "Smart Food Choices",
    description: "Labels, quality, shopping guides",
    href: "/articles/smart-food-choices",
    icon: "🛒",
  },
  {
    title: "Food System Insights",
    description: "Sustainability, supply chains, policy",
    href: "/articles/food-system-insights",
    icon: "🌾",
  },
  {
    title: "Practical Tips",
    description: "Meal prep, storage, seasonal eating",
    href: "/articles/practical-food-tips",
    icon: "🍳",
  },
  {
    title: "Recipes",
    description: "Healthy, delicious, easy meals",
    href: "/articles/recipes",
    icon: "📖",
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
    answer: "FoodPulse covers five main areas: Food & Wellbeing (nutrition and health), Smart Food Choices (labels, shopping, food quality), Food System Insights (supply chains, sustainability), Practical Food Tips (meal prep, storage), and Recipes.",
  },
  {
    question: "How can I contact FoodPulse?",
    answer: `Email us at ${CONTACT_EMAIL} or connect on LinkedIn, Instagram, or YouTube. You can also subscribe to our newsletter for monthly updates.`,
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
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-green-700 mb-6">
            About FoodPulse
          </h1>
          <p className="text-xl lg:text-2xl text-green-800 mb-6">
            Your Trusted Source for Evidence-Based Food Education
          </p>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
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

          <div className="space-y-6 text-lg text-neutral-700 text-center max-w-3xl mx-auto">
            <p>
              We believe everyone deserves access to reliable, science-based food
              information—regardless of background, education, or budget.
            </p>
            <p>
              Too often, nutrition information is buried in academic journals, hidden
              behind paywalls, or oversimplified into clickbait headlines. FoodPulse
              bridges this gap.
            </p>
            <p className="font-semibold text-green-700 text-xl">
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
          <p className="text-lg text-neutral-700 text-center max-w-3xl mx-auto">
            FoodPulse is a free, evidence-based food education platform covering
            nutrition science, food systems, healthy eating, and practical food tips.
            Founded by Food Systems Research Engineer Etornam C. Tsyawo, we provide
            reliable information that helps consumers navigate the complex world of
            food choices.
          </p>
        </div>

        {/* Content Pillars */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-neutral-800 text-center mb-8">
            What We Cover
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {contentPillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
              >
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h4 className="font-semibold text-neutral-800 mb-2 group-hover:text-green-700 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-sm text-neutral-600">{pillar.description}</p>
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
              <h3 className="text-2xl font-semibold text-neutral-800">
                Meet the Founder: Etornam C. Tsyawo
              </h3>

              <p className="text-lg text-neutral-700">
                Etornam C. Tsyawo is a Food Systems Research Engineer and Doctoral
                Researcher at SASEL Lab, McGill University. With over a decade of
                experience spanning food entrepreneurship, product development, and
                consumer nutrition education, Etornam founded FoodPulse to make
                evidence-based food knowledge accessible to everyone.
              </p>

              {/* Credentials */}
              <div>
                <h4 className="font-semibold text-neutral-800 mb-4">
                  Credentials & Experience
                </h4>
                <ul className="space-y-3">
                  {credentials.map((credential, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-neutral-700 border-l-4 border-green-600 pl-4"
                    >
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-neutral-800 mb-3">
                  Connect with Etornam
                </h4>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={FOUNDER.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-700 hover:text-green-700 transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                    <span>Website</span>
                  </a>
                  <a
                    href={FOUNDER.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-700 hover:text-green-700 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={FOUNDER.buyMeACoffee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-700 hover:text-green-700 transition-colors"
                  >
                    <Coffee className="h-5 w-5" />
                    <span>Buy Me a Coffee</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Quote */}
          <div className="mt-12 p-8 bg-green-50 rounded-xl max-w-3xl mx-auto">
            <p className="text-lg italic text-neutral-800 text-center">
              &ldquo;I started FoodPulse because I believe food knowledge shouldn&apos;t be locked behind
              academic journals or drowned in clickbait. My goal is to give you the information
              you need to make your own food choices—not to tell you what to eat.&rdquo;
            </p>
            <p className="text-center mt-4 font-semibold text-neutral-700">
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
            <Card key={standard.title} padding="lg" className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <standard.icon className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {standard.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {standard.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Additional Editorial Info */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-neutral-700 mb-4">
            <strong>Sources & Citations:</strong> We cite sources inline and include reference
            lists for in-depth articles. Primary sources (original research) are preferred over
            secondary reporting.
          </p>
          <p className="text-neutral-600">
            If you find an error, please contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-green-700 hover:text-green-600 underline">
              {CONTACT_EMAIL}
            </a>
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
            <div key={index} className="border-l-4 border-green-600 pl-6">
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                {index + 1}. {value.title}
              </h3>
              <p className="text-neutral-600">{value.description}</p>
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
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-green-700">
            Stay Updated
          </h2>
          <p className="text-xl text-neutral-700 mb-8">
            Get our latest articles and food insights delivered monthly. No spam, ever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button variant="accent" size="lg" href="/newsletter">
              Subscribe to Newsletter
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Contact Us
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-8 border-t border-neutral-200">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-green-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-green-700 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-green-700 transition-colors"
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
