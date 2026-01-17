import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/layout/Section";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import Link from "next/link";
import { BookOpen, Calculator, List, HelpCircle } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Resources | ${SITE_NAME}`,
  description:
    "Free food and nutrition resources including guides, tools, glossary, and FAQ. Everything you need to make smarter food choices.",
};

const resources = [
  {
    icon: BookOpen,
    title: "Guides",
    description:
      "In-depth downloadable guides on key food and nutrition topics. From meal planning to understanding food labels.",
    href: "/resources/guides",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Calculator,
    title: "Tools",
    description:
      "Interactive calculators and planners to help with meal prep, nutrition tracking, and food budgeting.",
    href: "/resources/tools",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: List,
    title: "Glossary",
    description:
      "Comprehensive food and nutrition terms dictionary. Understand the jargon and make informed decisions.",
    href: "/resources/glossary",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description:
      "Answers to frequently asked questions about nutrition, food systems, and healthy eating.",
    href: "/resources/faq",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="green" padding="lg">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-green-900 mb-6">
            Food & Nutrition Resources
          </h1>
          <p className="text-xl text-green-800">
            Free tools, guides, and information to support your food journey.
            Everything you need to make informed decisions about what you eat.
          </p>
        </div>
      </Section>

      {/* Resource Categories */}
      <Section background="white" padding="lg">
        <SectionHeader
          title="What are you looking for?"
          description="Browse our collection of free resources"
          centered
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Link key={resource.href} href={resource.href} className="group">
                <Card padding="lg" hover>
                  <div
                    className={`w-16 h-16 ${resource.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`h-8 w-8 ${resource.color}`} />
                  </div>
                  <CardTitle className="mb-3">{resource.title}</CardTitle>
                  <CardDescription className="mb-4">
                    {resource.description}
                  </CardDescription>
                  <div className="text-green-600 font-medium flex items-center gap-2">
                    Explore {resource.title}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Coming Soon Section */}
      <Section background="neutral" padding="lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            More Resources Coming Soon
          </h2>
          <p className="text-lg text-neutral-600 mb-6">
            We're constantly adding new guides, tools, and resources to help you
            make better food choices. Subscribe to our newsletter to be notified
            when new resources are available.
          </p>
          <Link
            href="/newsletter"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-600 font-semibold"
          >
            Subscribe to Newsletter →
          </Link>
        </div>
      </Section>
    </>
  );
}
