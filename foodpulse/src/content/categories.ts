/**
 * Content categories for FoodPulse
 * Based on the 5 content pillars from the development guide
 */

export interface Category {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const categories: Record<string, Category> = {
  foodWellbeing: {
    slug: "food-wellbeing",
    name: "Food & Wellbeing",
    description:
      "Nutrition science, dietary patterns, and health impacts.",
    longDescription:
      "Explore the science of nutrition and discover how food impacts your physical and mental wellbeing. From gut health to disease prevention, we break down complex nutrition science into practical, actionable knowledge for better health.",
    icon: "🥗",
    color: "green",
    seo: {
      title: "Food & Wellbeing | Nutrition Science & Health | FoodPulse",
      description:
        "Explore nutrition science, dietary patterns, and how food affects your health. Evidence-based articles on gut health, disease prevention, and wellbeing.",
      keywords: [
        "nutrition science",
        "gut health",
        "disease prevention",
        "healthy eating",
        "food and health",
        "dietary patterns",
        "nutrition education",
      ],
    },
  },
  smartChoices: {
    slug: "smart-food-choices",
    name: "Smart Food Choices",
    description:
      "Consumer decision-making, label reading, and food quality.",
    longDescription:
      "Learn to make informed food choices at the grocery store and beyond. Understand food labels, quality markers, and what really matters when choosing what to eat. No marketing hype, just practical guidance.",
    icon: "🛒",
    color: "blue",
    seo: {
      title: "Smart Food Choices | Label Reading & Shopping Guides | FoodPulse",
      description:
        "Make informed food decisions with our guides on reading nutrition labels, understanding food quality, and smart grocery shopping.",
      keywords: [
        "food labels",
        "nutrition labels",
        "food quality",
        "grocery shopping",
        "food choices",
        "consumer guide",
        "reading labels",
      ],
    },
  },
  foodSystems: {
    slug: "food-system-insights",
    name: "Food System Insights",
    description:
      "Production, distribution, sustainability, and policy.",
    longDescription:
      "Understanding food systems helps you see the bigger picture. Learn about how food is produced, distributed, and regulated—and why it matters for your health, your community, and the planet.",
    icon: "🌾",
    color: "amber",
    seo: {
      title: "Food System Insights | Sustainability & Supply Chains | FoodPulse",
      description:
        "Explore food systems, sustainable agriculture, supply chains, and food policy. Understand where your food comes from and why it matters.",
      keywords: [
        "food systems",
        "sustainable agriculture",
        "food supply chain",
        "farm to table",
        "food policy",
        "food production",
        "sustainable food",
      ],
    },
  },
  practicalTips: {
    slug: "practical-food-tips",
    name: "Practical Food Tips",
    description:
      "Meal prep, storage, and eating well on any schedule or budget.",
    longDescription:
      "Real-world food advice for real life. From meal prep strategies to food storage tips, learn practical ways to eat better without overhauling your entire routine or budget.",
    icon: "🍳",
    color: "orange",
    seo: {
      title: "Practical Food Tips | Meal Prep & Kitchen Guides | FoodPulse",
      description:
        "Get practical food advice for meal prep, food storage, eating on a budget, and making healthy eating work with your lifestyle.",
      keywords: [
        "meal prep",
        "food storage",
        "eating on a budget",
        "practical food tips",
        "kitchen tips",
        "healthy eating tips",
        "seasonal eating",
      ],
    },
  },
  recipes: {
    slug: "recipes",
    name: "Recipes",
    description:
      "Nutritious, delicious, and accessible recipes.",
    longDescription:
      "Delicious recipes that are good for you too. Every recipe includes nutrition information and is designed to be both satisfying and nourishing. No guilt, no gimmicks—just good food.",
    icon: "📖",
    color: "red",
    seo: {
      title: "Healthy Recipes | Nutritious & Delicious Meals | FoodPulse",
      description:
        "Discover nutritious and delicious recipes backed by nutrition science. From quick meals to special diets, find recipes that nourish and satisfy.",
      keywords: [
        "healthy recipes",
        "nutritious recipes",
        "easy recipes",
        "meal ideas",
        "cooking tips",
        "nutrition recipes",
        "healthy cooking",
      ],
    },
  },
};

export const categoryList = Object.values(categories);

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categoryList.find((cat) => cat.slug === slug);
};

export const getCategoryColors = (slug: string): string => {
  const category = getCategoryBySlug(slug);
  return category?.color || "green";
};
