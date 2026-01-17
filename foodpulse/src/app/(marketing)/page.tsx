import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Your Hub for All Things Food`,
  description:
    "Explore evidence-based food education covering nutrition science, food systems, and practical healthy eating tips. Make smarter food choices with FoodPulse.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Category Navigation */}
      <CategoryGrid />

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
