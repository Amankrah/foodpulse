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
  foodAndWellbeing: {
    slug: "food-and-wellbeing",
    name: "Food and Wellbeing",
    description:
      "Nutrition science, dietary patterns, and health impacts.",
    longDescription:
      "Explore the science of nutrition and discover how food impacts your physical and mental wellbeing. From gut health to disease prevention, we break down complex nutrition science into practical, actionable knowledge for better health.",
    icon: "🥗",
    color: "green",
    seo: {
      title: "Food and Wellbeing | Nutrition Science & Health | FoodPulse",
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
  kitchenAndCooking: {
    slug: "kitchen-and-cooking",
    name: "Kitchen and Cooking",
    description:
      "Delicious, nutritious recipes backed by food science. Healthy meals that don't compromise on flavor, with clear nutrition information.",
    longDescription:
      "Delicious, nutritious recipes backed by food science. Explore healthy meals that don't compromise on flavor, with clear nutrition information, practical cooking techniques, and meal prep guidance.",
    icon: "🍳",
    color: "orange",
    seo: {
      title: "Kitchen and Cooking | Recipes & Cooking Skills | FoodPulse",
      description:
        "Get practical cooking advice, recipes, meal prep tips, and kitchen techniques. From beginner basics to advanced culinary skills.",
      keywords: [
        "cooking tips",
        "meal prep",
        "recipes",
        "kitchen skills",
        "cooking techniques",
        "healthy cooking",
        "kitchen organization",
      ],
    },
  },
  foodLiteracy: {
    slug: "food-literacy",
    name: "Food Literacy",
    description:
      "Understanding food labels, making informed choices, and consumer education.",
    longDescription:
      "Build your food literacy with guides on reading labels, understanding nutrition claims, and making informed food choices. Cut through marketing hype and learn what really matters when choosing what to eat.",
    icon: "📚",
    color: "blue",
    seo: {
      title: "Food Literacy | Label Reading & Consumer Education | FoodPulse",
      description:
        "Build your food literacy with guides on reading nutrition labels, understanding food claims, and making informed food choices.",
      keywords: [
        "food labels",
        "nutrition labels",
        "food literacy",
        "consumer education",
        "food choices",
        "reading labels",
        "nutrition claims",
      ],
    },
  },
  foodSystems: {
    slug: "food-systems",
    name: "Food Systems",
    description:
      "Understand how food systems work, from farm to fork. Explore sustainable agriculture, supply chains, food policy, and the environmental impact of what we eat.",
    longDescription:
      "Understand how food systems work, from farm to fork. Learn about sustainable agriculture, supply chains, food policy, and the environmental impact of what we eat. See the bigger picture of how food is produced, distributed, and regulated.",
    icon: "🌾",
    color: "amber",
    seo: {
      title: "Food Systems | Sustainability & Supply Chains | FoodPulse",
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
};

export const categoryList = Object.values(categories);

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categoryList.find((cat) => cat.slug === slug);
};

export const getCategoryColors = (slug: string): string => {
  const category = getCategoryBySlug(slug);
  return category?.color || "green";
};
