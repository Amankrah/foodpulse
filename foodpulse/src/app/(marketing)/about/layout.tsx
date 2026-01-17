import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

// SEO Metadata - Optimized for search and AI citation
export const metadata: Metadata = {
  title: `About ${SITE_NAME} | Evidence-Based Food & Nutrition Education`,
  description: "FoodPulse provides evidence-based food education and nutrition insights. Founded by Food Systems Research Engineer Etornam C. Tsyawo. Free, reliable, actionable content.",
  keywords: [
    "food education",
    "nutrition education platform",
    "food systems expert",
    "evidence-based nutrition",
    "food literacy",
    "Etornam Tsyawo",
    "McGill University food research",
    "consumer nutrition",
    "food science education"
  ],
  authors: [{ name: "Etornam C. Tsyawo" }],
  openGraph: {
    title: `About ${SITE_NAME} | Evidence-Based Food & Nutrition Education`,
    description: "Learn about FoodPulse's mission to democratize food knowledge. Founded by Food Systems Research Engineer Etornam C. Tsyawo.",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: "About FoodPulse - Evidence-Based Food Education",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${SITE_NAME} | Evidence-Based Food & Nutrition Education`,
    description: "FoodPulse provides evidence-based food education. Founded by Food Systems Researcher Etornam Tsyawo from McGill University.",
    images: [`${SITE_URL}/og-about.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
