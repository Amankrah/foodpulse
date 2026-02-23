/**
 * Diet Profile Data
 * Contains detailed information about each dietary approach for results display.
 */

import type { DietId, DietProfile, RoadmapPhase, PredictedBarrier } from '@/types/diet-quiz'

export const DIET_PROFILES: Record<DietId, DietProfile> = {
  mediterranean: {
    id: 'mediterranean',
    name: 'Mediterranean',
    tagline: 'The art of eating well, living well',
    description:
      'A time-tested pattern emphasizing whole grains, vegetables, fruits, legumes, nuts, olive oil, and moderate amounts of fish and poultry. It\'s more about how you eat than strict rules—meals are meant to be enjoyed, often with others.',
    keyAttributes: ['Balanced', 'Flexible', 'Social', 'Sustainable', 'Heart-healthy'],
    bestFor: [
      'General wellness',
      'Heart health',
      'Social eaters',
      'Those seeking flexibility',
      'Long-term sustainability',
    ],
    evidenceNotes:
      'Strong evidence for cardiovascular health, metabolic health, and longevity. One of the most researched dietary patterns.',
    icon: '🫒',
    color: '#059669',
  },

  dash: {
    id: 'dash',
    name: 'DASH',
    tagline: 'Designed for your heart and blood pressure',
    description:
      'Originally developed to combat high blood pressure, DASH emphasizes vegetables, fruits, whole grains, lean proteins, and low-fat dairy while limiting sodium, saturated fat, and added sugars.',
    keyAttributes: ['Structured', 'Heart-focused', 'Sodium-aware', 'Balanced', 'Research-backed'],
    bestFor: [
      'Blood pressure management',
      'Heart health',
      'Those who like clear guidelines',
      'Cardiometabolic health',
    ],
    evidenceNotes:
      'Strong evidence for blood pressure reduction and cardiovascular risk. Often combined with Mediterranean principles in clinical guidelines.',
    icon: '❤️',
    color: '#dc2626',
  },

  flexitarian: {
    id: 'flexitarian',
    name: 'Flexitarian',
    tagline: 'Plant-forward, but flexible',
    description:
      'A practical approach that emphasizes plant-based foods while still allowing occasional meat and animal products. Perfect for those who want the benefits of plant-based eating without strict rules.',
    keyAttributes: ['Adaptable', 'Plant-forward', 'Family-friendly', 'Budget-conscious', 'Gradual'],
    bestFor: [
      'Families with mixed preferences',
      'Gradual lifestyle changers',
      'Budget-conscious eaters',
      'Those seeking sustainability',
    ],
    evidenceNotes:
      'Growing evidence for health benefits similar to vegetarian diets, with better adherence due to flexibility.',
    icon: '🥗',
    color: '#16a34a',
  },

  wfpb: {
    id: 'wfpb',
    name: 'Whole Food Plant-Based',
    tagline: 'Powered by plants, naturally',
    description:
      'Focuses on minimally processed plant foods: vegetables, fruits, whole grains, legumes, nuts, and seeds. Minimizes or eliminates animal products and avoids refined foods, added oils, and sugars.',
    keyAttributes: ['Ethical', 'Health-focused', 'Whole foods', 'Structured', 'Environmental'],
    bestFor: [
      'Values-driven eaters',
      'Health optimization seekers',
      'Environmental consciousness',
      'Those with cooking time and skills',
    ],
    evidenceNotes:
      'Evidence for cardiovascular risk reduction and some metabolic benefits. Requires careful planning for nutrient adequacy (B12, iron, omega-3s).',
    icon: '🌱',
    color: '#22c55e',
  },

  low_carb: {
    id: 'low_carb',
    name: 'Low-Carb',
    tagline: 'Moderate carbs, satisfying results',
    description:
      'Reduces carbohydrate intake (typically to 50-130g per day) while emphasizing protein and healthy fats. Less restrictive than keto, making it more sustainable for many people.',
    keyAttributes: ['Satiety-focused', 'Moderate', 'Structured', 'Carb-conscious', 'Flexible protein'],
    bestFor: [
      'Blood sugar management',
      'Those who prefer clear rules',
      'Weight management',
      'People who found keto too restrictive',
    ],
    evidenceNotes:
      'Evidence for weight management and glycemic control in type 2 diabetes. Long-term evidence is mixed; individual response varies.',
    icon: '🥩',
    color: '#f59e0b',
  },

  keto: {
    id: 'keto',
    name: 'Ketogenic (Keto)',
    tagline: 'Very low carb, high fat',
    description:
      'A strict very-low-carbohydrate diet (typically under 50g/day) that shifts the body into ketosis. High in fats, moderate in protein, with most calories coming from healthy fat sources.',
    keyAttributes: ['Specialized', 'Strict', 'Very low carb', 'High fat', 'Ketosis-focused'],
    bestFor: [
      'Specific medical conditions (with supervision)',
      'Those who thrive on strict structure',
      'Short-term weight loss goals',
    ],
    evidenceNotes:
      'Some evidence for type 2 diabetes and weight loss, but requires medical supervision for safety. Multiple contraindications exist.',
    icon: '🥑',
    color: '#7c3aed',
  },

  intermittent_fasting: {
    id: 'intermittent_fasting',
    name: 'Intermittent Fasting',
    tagline: 'When you eat matters',
    description:
      'Focuses on timing rather than specific foods. Common patterns include 16:8 (16 hours fasting, 8-hour eating window) or 5:2 (regular eating 5 days, reduced calories 2 days).',
    keyAttributes: ['Time-based', 'Flexible foods', 'Simple', 'Schedule-friendly', 'No food rules'],
    bestFor: [
      'Busy professionals',
      'Those who prefer simplicity',
      'People who naturally skip breakfast',
      'Schedule-oriented individuals',
    ],
    evidenceNotes:
      'Evidence for metabolic benefits and weight management. Not suitable for everyone—contraindicated for some conditions and eating history.',
    icon: '⏰',
    color: '#0ea5e9',
  },

  anti_inflammatory: {
    id: 'anti_inflammatory',
    name: 'Anti-Inflammatory',
    tagline: 'Calm the fire within',
    description:
      'Emphasizes foods that reduce chronic inflammation: fatty fish, colorful vegetables, berries, nuts, olive oil, and whole grains. Limits processed foods, refined sugars, and inflammatory fats.',
    keyAttributes: ['Therapeutic', 'Whole foods', 'Omega-3 rich', 'Colorful', 'Research-based'],
    bestFor: [
      'Chronic pain or inflammation',
      'Autoimmune support',
      'Joint health',
      'Those seeking therapeutic benefits',
    ],
    evidenceNotes:
      'Overlaps significantly with Mediterranean pattern. Emerging evidence for inflammatory conditions; individual response varies.',
    icon: '🔥',
    color: '#f97316',
  },

  intuitive_eating: {
    id: 'intuitive_eating',
    name: 'Intuitive Eating',
    tagline: 'Make peace with food',
    description:
      'A framework (not a diet) that rejects diet mentality, honors hunger and fullness cues, and promotes a healthy relationship with food. Weight-neutral, focusing on overall well-being.',
    keyAttributes: ['Mindset-focused', 'Weight-neutral', 'Non-restrictive', 'Self-compassionate', 'Long-term'],
    bestFor: [
      'Diet fatigue',
      'Complicated relationship with food',
      'Emotional eating patterns',
      'Those seeking food freedom',
    ],
    evidenceNotes:
      'Evidence for improved psychological well-being and reduced disordered eating. Particularly valuable when restriction has been harmful.',
    icon: '🧘',
    color: '#8b5cf6',
  },

  zone_macro: {
    id: 'zone_macro',
    name: 'Zone / Balanced Macro',
    tagline: 'Precision for performance',
    description:
      'Uses specific macronutrient ratios (often 40% carbs, 30% protein, 30% fat) to optimize performance and body composition. Appeals to data-driven individuals who like tracking.',
    keyAttributes: ['Performance-focused', 'Measured', 'Optimized', 'Data-driven', 'Athletic'],
    bestFor: [
      'Athletes and active individuals',
      'Data-driven personalities',
      'Performance optimization',
      'Those who enjoy tracking',
    ],
    evidenceNotes:
      'Evidence primarily for athletic performance rather than general health outcomes. May not be suitable for those with complicated food relationships.',
    icon: '📊',
    color: '#3b82f6',
  },
}

// ========== Default Roadmap Templates ==========

export function generateRoadmap(dietId: DietId): RoadmapPhase[] {
  const roadmaps: Partial<Record<DietId, RoadmapPhase[]>> = {
    mediterranean: [
      {
        phase: 1,
        title: 'Foundation',
        weeks: '1-2',
        focus: 'Breakfast optimization',
        keyChange: 'Add Mediterranean breakfast 4x/week',
        difficulty: 1,
        timeInvestment: '+10 min/day',
      },
      {
        phase: 2,
        title: 'Expansion',
        weeks: '3-4',
        focus: 'Lunch integration',
        keyChange: 'Meal prep Sundays, Mediterranean lunches',
        difficulty: 2,
        timeInvestment: '+2 hours/week (batched)',
      },
      {
        phase: 3,
        title: 'Integration',
        weeks: '5-8',
        focus: 'Full daily pattern',
        keyChange: 'Mediterranean dinners with family adaptations',
        difficulty: 3,
        timeInvestment: 'Neutral (efficiency gained)',
      },
      {
        phase: 4,
        title: 'Lifestyle',
        weeks: 'Ongoing',
        focus: 'Social & travel adaptation',
        keyChange: 'Intuitive Mediterranean principles',
        difficulty: 2,
        timeInvestment: 'None (habituated)',
      },
    ],

    flexitarian: [
      {
        phase: 1,
        title: 'Meatless Mondays',
        weeks: '1-2',
        focus: 'One plant-based day',
        keyChange: 'Plant-based meals one day per week',
        difficulty: 1,
        timeInvestment: '+15 min/week',
      },
      {
        phase: 2,
        title: 'Plant-Forward Lunches',
        weeks: '3-4',
        focus: 'Shift lunch habits',
        keyChange: 'Plant-based lunches 3-4x/week',
        difficulty: 2,
        timeInvestment: '+30 min/week',
      },
      {
        phase: 3,
        title: 'Dinner Flexibility',
        weeks: '5-8',
        focus: 'Family-friendly plant meals',
        keyChange: 'Base + Build dinner strategy',
        difficulty: 2,
        timeInvestment: 'Same as current',
      },
      {
        phase: 4,
        title: 'Intuitive Balance',
        weeks: 'Ongoing',
        focus: 'Natural plant-forward eating',
        keyChange: 'Meat as accent, not centerpiece',
        difficulty: 1,
        timeInvestment: 'None',
      },
    ],

    intermittent_fasting: [
      {
        phase: 1,
        title: 'Breakfast Delay',
        weeks: '1-2',
        focus: 'Delay first meal by 1-2 hours',
        keyChange: 'Coffee/tea only until 10am',
        difficulty: 1,
        timeInvestment: 'Saves time',
      },
      {
        phase: 2,
        title: '14:10 Window',
        weeks: '3-4',
        focus: '14-hour fast, 10-hour eating window',
        keyChange: 'Eating window 10am-8pm',
        difficulty: 2,
        timeInvestment: 'Neutral',
      },
      {
        phase: 3,
        title: '16:8 Window',
        weeks: '5-8',
        focus: 'Target eating window',
        keyChange: 'Eating window 12pm-8pm',
        difficulty: 2,
        timeInvestment: 'Saves time',
      },
      {
        phase: 4,
        title: 'Flexible Fasting',
        weeks: 'Ongoing',
        focus: 'Adapt to lifestyle',
        keyChange: 'Flexible timing based on schedule',
        difficulty: 1,
        timeInvestment: 'Saves time',
      },
    ],

    intuitive_eating: [
      {
        phase: 1,
        title: 'Reject Diet Mentality',
        weeks: '1-4',
        focus: 'Awareness and mindset shift',
        keyChange: 'Notice diet thoughts, let go of food rules',
        difficulty: 3,
        timeInvestment: 'Mental energy, not time',
      },
      {
        phase: 2,
        title: 'Honor Hunger & Fullness',
        weeks: '5-8',
        focus: 'Reconnect with body signals',
        keyChange: 'Eat when hungry, stop when satisfied',
        difficulty: 3,
        timeInvestment: 'Mindful moments',
      },
      {
        phase: 3,
        title: 'Make Peace with Food',
        weeks: '9-12',
        focus: 'Remove forbidden foods',
        keyChange: 'Allow all foods, remove guilt',
        difficulty: 4,
        timeInvestment: 'Processing time',
      },
      {
        phase: 4,
        title: 'Gentle Nutrition',
        weeks: 'Ongoing',
        focus: 'Integrate nutrition from self-care',
        keyChange: 'Choose nourishing foods because they feel good',
        difficulty: 2,
        timeInvestment: 'Integrated',
      },
    ],
  }

  // Return specific roadmap or generic one
  return roadmaps[dietId] || generateGenericRoadmap(dietId)
}

function generateGenericRoadmap(dietId: DietId): RoadmapPhase[] {
  const dietName = DIET_PROFILES[dietId].name

  return [
    {
      phase: 1,
      title: 'Foundation',
      weeks: '1-2',
      focus: 'Learn the basics',
      keyChange: `Start with ${dietName} breakfast 3x/week`,
      difficulty: 1,
      timeInvestment: '+15 min/day',
    },
    {
      phase: 2,
      title: 'Expansion',
      weeks: '3-4',
      focus: 'Expand to more meals',
      keyChange: `${dietName} approach for lunch`,
      difficulty: 2,
      timeInvestment: '+30 min/day',
    },
    {
      phase: 3,
      title: 'Full Integration',
      weeks: '5-8',
      focus: 'Complete daily pattern',
      keyChange: `Most meals follow ${dietName} principles`,
      difficulty: 3,
      timeInvestment: 'Neutral (efficiency gained)',
    },
    {
      phase: 4,
      title: 'Lifestyle',
      weeks: 'Ongoing',
      focus: 'Sustainable habits',
      keyChange: 'Intuitive application of principles',
      difficulty: 2,
      timeInvestment: 'None (habituated)',
    },
  ]
}

// ========== Barrier Templates ==========

export const BARRIER_TEMPLATES: Record<string, PredictedBarrier[]> = {
  time: [
    {
      barrier: 'Limited weeknight cooking time',
      solution: '15-minute Mediterranean meals collection',
      resourceLink: '/articles?tag=quick-meals',
    },
  ],
  social_eating: [
    {
      barrier: 'Social events with limited options',
      solution: 'Restaurant navigation guide + party strategies',
      resourceLink: '/guides/eating-out',
    },
  ],
  family_dynamics: [
    {
      barrier: 'Family has different dietary preferences',
      solution: '"Base + Build" meal strategy',
      resourceLink: '/guides/family-meals',
    },
  ],
  budget: [
    {
      barrier: 'Healthy eating on a budget',
      solution: 'Budget-friendly meal planning guide',
      resourceLink: '/guides/budget-eating',
    },
  ],
  emotional_eating: [
    {
      barrier: 'Emotional eating patterns',
      solution: 'Mindful eating practices and alternatives',
      resourceLink: '/articles?tag=mindful-eating',
    },
  ],
  travel_disruptions: [
    {
      barrier: 'Frequent work travel',
      solution: 'Travel eating guide + portable snack kit',
      resourceLink: '/guides/travel-eating',
    },
  ],
  consistency: [
    {
      barrier: 'Maintaining consistency over time',
      solution: 'Habit stacking strategies + weekly planning',
      resourceLink: '/articles?tag=habit-building',
    },
  ],
  beginner_cook: [
    {
      barrier: 'Limited cooking skills',
      solution: 'Beginner-friendly recipe collection',
      resourceLink: '/articles?tag=cooking-basics',
    },
  ],
}

export function generateBarriers(
  challenges: string[],
  cookingSkills: string[],
  companions: string[]
): PredictedBarrier[] {
  const barriers: PredictedBarrier[] = []

  // Add barriers based on challenges
  for (const challenge of challenges) {
    if (BARRIER_TEMPLATES[challenge]) {
      barriers.push(...BARRIER_TEMPLATES[challenge])
    }
  }

  // Add cooking skill barrier if beginner
  if (cookingSkills.includes('beginner_cook')) {
    barriers.push(...(BARRIER_TEMPLATES.beginner_cook || []))
  }

  // Add family barrier if children or different preferences
  if (
    companions.includes('children') ||
    companions.includes('different_preferences')
  ) {
    if (!barriers.some((b) => b.barrier.includes('Family'))) {
      barriers.push(...(BARRIER_TEMPLATES.family_dynamics || []))
    }
  }

  // Limit to top 4 barriers
  return barriers.slice(0, 4)
}
