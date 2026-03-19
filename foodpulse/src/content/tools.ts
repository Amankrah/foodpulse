/**
 * Tools configuration for FoodPulse
 * Add new tools here - the count will auto-update on the homepage
 */

export interface Tool {
  title: string;
  slug: string;
  description: string;
  category: 'Calculator' | 'Converter' | 'Planner' | 'Quiz' | 'Analyzer';
  comingSoon?: boolean;
}

export const tools: Tool[] = [
  {
    title: 'Protein Calculator',
    slug: 'protein-calculator',
    description: 'Calculate your daily protein needs based on weight, activity level, and goals.',
    category: 'Calculator',
  },
  {
    title: 'Macro Calculator',
    slug: 'macro-calculator',
    description: 'Get your personalized macronutrient breakdown for your fitness goals.',
    category: 'Calculator',
  },
  {
    title: 'Calorie Calculator',
    slug: 'calorie-calculator',
    description: 'Find your Total Daily Energy Expenditure (TDEE) and daily calorie needs for your goals.',
    category: 'Calculator',
  },
  {
    title: 'Hydration Calculator',
    slug: 'hydration-calculator',
    description: 'Calculate your daily water intake needs based on activity and climate.',
    category: 'Calculator',
  },
  {
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    description: 'Calculate your Body Mass Index with health context and limitations.',
    category: 'Calculator',
  },
  {
    title: 'Recipe Scaler',
    slug: 'recipe-scaler',
    description: 'Scale recipe ingredients up or down for any serving size.',
    category: 'Converter',
    comingSoon: true,
  },
  {
    title: 'Unit Converter',
    slug: 'unit-converter',
    description: 'Convert between cooking measurements (cups, ml, oz, grams).',
    category: 'Converter',
    comingSoon: true,
  },
  {
    title: 'Fiber Calculator',
    slug: 'fiber-calculator',
    description: 'Calculate your daily fiber needs and track intake.',
    category: 'Calculator',
  },
  {
    title: 'Grocery Budget Planner',
    slug: 'grocery-budget',
    description: 'Plan weekly grocery spending and save money on healthy foods.',
    category: 'Planner',
  },
  {
    title: 'Meal Cost Calculator',
    slug: 'meal-cost',
    description: 'Calculate the cost per serving of your recipes.',
    category: 'Calculator',
    comingSoon: true,
  },
  {
    title: 'Caffeine Calculator',
    slug: 'caffeine-calculator',
    description: 'Track your daily caffeine intake and stay within safe limits.',
    category: 'Calculator',
  },
  {
    title: 'Sodium Calculator',
    slug: 'sodium-calculator',
    description: 'Monitor your sodium intake for better heart health.',
    category: 'Calculator',
    comingSoon: true,
  },
  {
    title: 'What Diet Quiz',
    slug: 'diet-quiz',
    description: 'Discover your ideal dietary approach based on your unique lifestyle, values, and health needs.',
    category: 'Quiz',
  },
  {
    title: 'Nutrition Label Reader',
    slug: 'label-reader',
    description: 'Upload or input nutrition labels for instant analysis.',
    category: 'Analyzer',
    comingSoon: true,
  },
];

// Helper functions
export const getAvailableTools = () => tools.filter(tool => !tool.comingSoon);
export const getComingSoonTools = () => tools.filter(tool => tool.comingSoon);
export const getToolCount = () => getAvailableTools().length;
