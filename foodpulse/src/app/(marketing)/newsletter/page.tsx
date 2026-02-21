"use client";

import { Section, SectionHeader } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { ConvertKitEmbed } from "@/components/newsletter/ConvertKitEmbed";

const benefits = [
  {
    icon: "📰",
    title: "Weekly Articles",
    description: "Get our best food and nutrition articles delivered every Saturday",
  },
  {
    icon: "🍳",
    title: "Exclusive Recipes",
    description: "Subscriber-only healthy recipes you won&apos;t find anywhere else",
  },
  {
    icon: "💡",
    title: "Quick Tips",
    description: "Practical food tips you can implement right away",
  },
  {
    icon: "🎁",
    title: "Free Resources",
    description: "Early access to guides, tools, and downloadable content",
  },
];

export default function NewsletterPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-6">
            Get Fresh Insights Weekly
          </h1>
          <p className="text-xl text-green-800">
            Join thousands of readers who get evidence-based food knowledge
            delivered to their inbox every Saturday. No spam, ever.
          </p>
        </div>
      </Section>

      {/* Newsletter Form Section — Kit embed submits directly to ConvertKit so confirmation email is sent */}
      <Section background="white" padding="lg">
        <div className="max-w-2xl mx-auto">
          <Card padding="lg">
            <ConvertKitEmbed />
          </Card>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section background="neutral" padding="lg">
        <SectionHeader
          eyebrow="What You&apos;ll Get"
          title="Why Subscribe?"
          centered
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit.title} padding="lg">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-neutral-600">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Social Proof */}
      <Section background="white" padding="lg">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl font-display text-neutral-800 mb-4">
            &quot;The only food newsletter I actually read. No fluff, just solid
            information I can use.&quot;
          </blockquote>
          <p className="text-neutral-600">• FoodPulse Reader</p>
        </div>
      </Section>
    </>
  );
}
