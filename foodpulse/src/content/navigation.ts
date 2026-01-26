/**
 * Navigation structure for FoodPulse
 * Based on the site architecture from the development guide
 */

import { categories } from "./categories";
import { SOCIAL_LINKS } from "@/lib/constants";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavItem[];
}

// Primary navigation (header)
export const mainNavigation: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Articles",
    href: "/articles",
    children: Object.values(categories).map((cat) => ({
      label: cat.name,
      href: `/articles/${cat.slug}`,
      description: cat.description,
    })),
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Guides",
        href: "/resources/guides",
        description: "In-depth resources on key topics",
      },
      {
        label: "Tools",
        href: "/resources/tools",
        description: "Calculators & planners",
      },
      {
        label: "Glossary",
        href: "/resources/glossary",
        description: "Food & nutrition terms",
      },
      {
        label: "FAQ",
        href: "/resources/faq",
        description: "Common questions answered",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Coaching", href: "/coaching" },
];

// Footer navigation
export const footerNavigation = {
  explore: {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "All Articles", href: "/articles" },
      { label: "Resources", href: "/resources" },
      { label: "Search", href: "/search" },
    ],
  },
  categories: {
    title: "Categories",
    links: Object.values(categories).map((cat) => ({
      label: cat.name,
      href: `/articles/${cat.slug}`,
    })),
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Coaching", href: "/coaching" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  connect: {
    title: "Connect",
    links: [
      { label: "Newsletter", href: "/newsletter" },
      { label: "Contact", href: "/contact" },
      { label: "Instagram", href: SOCIAL_LINKS.instagram, external: true },
      { label: "Pinterest", href: SOCIAL_LINKS.pinterest, external: true },
      { label: "YouTube", href: SOCIAL_LINKS.youtube, external: true },
    ],
  },
};

// Legal navigation (bottom of footer)
export const legalNavigation: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

// Mobile navigation (hamburger menu)
export const mobileNavigation = [
  { label: "Home", href: "/" },
  {
    label: "Articles",
    children: [
      { label: "All Articles", href: "/articles" },
      ...Object.values(categories).map((cat) => ({
        label: cat.name,
        href: `/articles/${cat.slug}`,
      })),
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "All Resources", href: "/resources" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Tools", href: "/resources/tools" },
      { label: "Glossary", href: "/resources/glossary" },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Coaching", href: "/coaching" },
  { label: "Contact", href: "/contact" },
  { label: "Newsletter", href: "/newsletter" },
];

// Breadcrumb helper
export function generateBreadcrumbs(
  pathname: string
): { label: string; href: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { label: string; href: string }[] = [
    { label: "Home", href: "/" },
  ];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Format label (capitalize and replace hyphens)
    let label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Special cases
    if (segment === "articles") label = "Articles";
    if (segment === "resources") label = "Resources";
    if (segment === "about") label = "About";

    // Check if it's a category
    const category = Object.values(categories).find(
      (cat) => cat.slug === segment
    );
    if (category) {
      label = category.name;
    }

    breadcrumbs.push({ label, href: currentPath });
  }

  return breadcrumbs;
}
