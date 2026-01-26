import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | FoodPulse",
  description: "Search FoodPulse for articles, guides, tools, glossary terms, and answers about food and nutrition.",
  robots: {
    index: false, // Don't index search results pages
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
