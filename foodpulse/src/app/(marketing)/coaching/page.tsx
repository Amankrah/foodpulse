import type { Metadata } from "next";
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
      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-6">
            Personalized Nutrition Coaching
          </h1>
          <p className="text-xl text-green-800 mb-8">
            Work one-on-one with a nutrition expert to achieve your health goals.
            Evidence-based guidance tailored to your unique needs and lifestyle.
          </p>
          <Button variant="accent" size="lg" href="#packages">
            View Coaching Packages
          </Button>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section background="white" padding="lg">
        <SectionHeader
          eyebrow="Why Coaching"
          title="What You'll Get"
          description="Personalized support to help you make lasting changes"
          centered
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit} padding="md">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-700" />
                </div>
                <p className="text-neutral-800 font-medium">{benefit}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Packages Section */}
      <Section id="packages" background="neutral" padding="lg">
        <SectionHeader
          eyebrow="Coaching Packages"
          title="Choose Your Path"
          description="Select the coaching package that fits your goals and timeline"
          centered
        />

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              padding="lg"
              variant={pkg.featured ? "featured" : "default"}
              className={pkg.featured ? "border-2 border-green-600" : ""}
            >
              {pkg.featured && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardTitle className="text-2xl mb-2">{pkg.name}</CardTitle>
              <div className="text-3xl font-bold text-green-700 mb-2">
                {pkg.price}
              </div>
              <p className="text-sm text-neutral-600 mb-4">{pkg.duration}</p>
              <CardDescription className="mb-6">
                {pkg.description}
              </CardDescription>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
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
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section id="contact" background="white" padding="lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-neutral-600 mb-8">
            Schedule a free 15-minute consultation to discuss your goals and see
            if coaching is right for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Book Free Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="mailto:hello@foodpulse.co?subject=Coaching Inquiry"
            >
              Email Us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
