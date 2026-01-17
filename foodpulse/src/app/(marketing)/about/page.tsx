import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About ${SITE_NAME} | Our Mission to Democratize Food Knowledge`,
  description:
    "Learn about FoodPulse's mission to provide evidence-based food education. Meet our team and discover why we're passionate about food literacy.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-6">
            About FoodPulse
          </h1>
          <p className="text-xl text-green-800">
            Empowering smarter food choices through evidence-based education
          </p>
        </div>
      </Section>

      {/* Mission Section */}
      <Section background="white" padding="lg">
        <SectionHeader
          eyebrow="Our Mission"
          title="Food Knowledge Should Be Free and Accessible"
        />

        <div className="max-w-4xl mx-auto space-y-6 text-lg text-neutral-700">
          <p>
            We exist to bridge the gap between food science and everyday
            consumers. Too often, nutrition information is buried in academic
            journals, hidden behind paywalls, or oversimplified into clickbait.
          </p>
          <p>
            FoodPulse translates complex food science into practical, actionable
            knowledge that helps you make better decisions about what you
            eat—without the hype, fads, or fear-mongering.
          </p>
        </div>

        {/* Key Mission Points */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Educate
            </h3>
            <p className="text-neutral-600">
              Make food science accessible and understandable for everyone
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Inform
            </h3>
            <p className="text-neutral-600">
              Provide evidence-based information, not trendy opinions
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Empower
            </h3>
            <p className="text-neutral-600">
              Give readers the tools to make their own informed choices
            </p>
          </div>
        </div>
      </Section>

      {/* Our Values */}
      <Section background="neutral" padding="lg">
        <SectionHeader
          eyebrow="What We Stand For"
          title="Our Guiding Principles"
          centered
        />

        <div className="max-w-3xl mx-auto space-y-8">
          {[
            {
              title: "Evidence Over Opinion",
              description:
                "We cite our sources. Every claim is backed by peer-reviewed research, expert consensus, or transparent reasoning.",
            },
            {
              title: "Clarity Over Complexity",
              description:
                "Nutrition science is complex. Our job is to make it understandable without dumbing it down.",
            },
            {
              title: "Empowerment Over Prescription",
              description:
                "We give you information to make your own choices. We don't tell you what to eat.",
            },
            {
              title: "Nuance Over Headlines",
              description:
                "Food and nutrition rarely have simple answers. We embrace the complexity.",
            },
            {
              title: "Accessibility Over Gatekeeping",
              description:
                "Good food information should be free and available to everyone, regardless of background or education.",
            },
          ].map((value, index) => (
            <div key={index} className="border-l-4 border-green-600 pl-6">
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                {index + 1}. {value.title}
              </h3>
              <p className="text-neutral-600">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section background="green" padding="lg">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">
            Want to Get in Touch?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Have questions, feedback, or ideas? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" href="/contact">
              Contact Us
            </Button>
            <Button variant="outline" size="lg" href="mailto:hello@foodpulse.co">
              Email: hello@foodpulse.co
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
