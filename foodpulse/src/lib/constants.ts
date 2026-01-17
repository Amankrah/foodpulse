/**
 * Site-wide constants for FoodPulse
 * Based on foodpulse-development-guide.md
 */

// Site metadata
export const SITE_NAME = "FoodPulse";
export const SITE_DOMAIN = "foodpulse.co";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_DESCRIPTION =
  "Evidence-based food education covering nutrition science, food systems, healthy eating, and practical tips. Make smarter food choices with science-backed guidance.";

// Taglines (A/B test options)
export const TAGLINES = {
  primary: "Your Hub for All Things Food",
  alt1: "Empowering Smarter Food Choices",
  alt2: "Where Food Knowledge Meets Action",
  alt3: "The Pulse of Food Intelligence",
} as const;

// Contact information
export const CONTACT_EMAIL = "hello@foodpulse.co";
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/foodpulse",
  pinterest: "https://pinterest.com/foodpulse",
  youtube: "https://youtube.com/@foodpulse",
  twitter: "@foodpulse",
  linkedin: "https://linkedin.com/company/foodpulseco",
} as const;

// Founder information
export const FOUNDER = {
  name: "Etornam C. Tsyawo",
  title: "Food Systems Research Engineer",
  website: "https://ectsyawo.com/",
  linkedin: "https://www.linkedin.com/in/etornam-c-tsyawo/",
  buyMeACoffee: "https://foodpulse.kit.com/products/cup-of-tea",
} as const;

// Content reading settings
export const WORDS_PER_MINUTE = 200;
export const EXCERPT_LENGTH = 160;

// Pagination
export const ARTICLES_PER_PAGE = 12;
export const RELATED_ARTICLES_COUNT = 3;

// Animation settings
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Content pillars/categories
export const CONTENT_CATEGORIES = {
  foodWellbeing: {
    slug: "food-wellbeing",
    name: "Food & Wellbeing",
    description:
      "Nutrition science, dietary patterns, and health impacts. Learn how what you eat affects how you feel.",
    icon: "🥗",
    color: "green",
  },
  smartChoices: {
    slug: "smart-food-choices",
    name: "Smart Food Choices",
    description:
      "Consumer decision-making, label reading, and food quality. Navigate the grocery store with confidence.",
    icon: "🛒",
    color: "blue",
  },
  foodSystems: {
    slug: "food-system-insights",
    name: "Food System Insights",
    description:
      "Production, distribution, sustainability, and policy. See the bigger picture of where food comes from.",
    icon: "🌾",
    color: "amber",
  },
  practicalTips: {
    slug: "practical-food-tips",
    name: "Practical Food Tips",
    description:
      "Actionable guidance for daily life. Meal prep, storage, and eating well on any schedule or budget.",
    icon: "🍳",
    color: "orange",
  },
  recipes: {
    slug: "recipes",
    name: "Recipes",
    description:
      "Nutritious, delicious, accessible recipes. Taste and health working together.",
    icon: "📖",
    color: "red",
  },
} as const;

// Navigation structure
export const MAIN_NAVIGATION = [
  { href: "/", label: "Home" },
  {
    label: "Articles",
    href: "/articles",
    children: Object.values(CONTENT_CATEGORIES).map((cat) => ({
      href: `/articles/${cat.slug}`,
      label: cat.name,
      description: cat.description,
    })),
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        href: "/resources/guides",
        label: "Guides",
        description: "In-depth resources on key topics",
      },
      {
        href: "/resources/tools",
        label: "Tools",
        description: "Calculators & planners",
      },
      {
        href: "/resources/glossary",
        label: "Glossary",
        description: "Food & nutrition terms",
      },
      {
        href: "/resources/faq",
        label: "FAQ",
        description: "Common questions answered",
      },
    ],
  },
  { href: "/about", label: "About" },
  { href: "/coaching", label: "Coaching" },
] as const;

// Footer navigation
export const FOOTER_NAVIGATION = {
  explore: [
    { label: "Home", href: "/" },
    { label: "All Articles", href: "/articles" },
    { label: "Resources", href: "/resources" },
    { label: "Search", href: "/search" },
  ],
  categories: Object.values(CONTENT_CATEGORIES).map((cat) => ({
    label: cat.name,
    href: `/articles/${cat.slug}`,
  })),
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/about/our-mission" },
    { label: "Our Team", href: "/about/our-team" },
    { label: "Editorial Guidelines", href: "/about/editorial-guidelines" },
  ],
  connect: [
    { label: "Newsletter", href: "/newsletter" },
    { label: "Contact", href: "/contact" },
    { label: "Instagram", href: SOCIAL_LINKS.instagram, external: true },
    { label: "Pinterest", href: SOCIAL_LINKS.pinterest, external: true },
    { label: "YouTube", href: SOCIAL_LINKS.youtube, external: true },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Use", href: "/legal/terms-of-use" },
    { label: "Cookie Policy", href: "/legal/cookie-policy" },
  ],
} as const;

// SEO keywords
export const SEO_KEYWORDS = [
  "food systems",
  "nutrition education",
  "healthy eating",
  "food science",
  "sustainable food",
  "nutrition guide",
  "food choices",
  "consumer health",
  "food literacy",
  "nutrition facts",
] as const;

// Newsletter settings
export const NEWSLETTER_TAGS = {
  general: "general-subscribers",
  recipes: "recipe-subscribers",
  foodSystems: "food-systems-subscribers",
} as const;
