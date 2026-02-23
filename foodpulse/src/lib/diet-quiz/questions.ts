/**
 * Diet Quiz Questions Data
 * Contains all quiz questions organized by section with pillar impact mappings.
 *
 * Based on SPEC 2 from DIET-QUIZ-DEVELOPMENT-GUIDE.md
 */

import type { QuizQuestion, AnswerImpact } from '@/types/diet-quiz'

// ========== Question Definitions ==========

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: QUICK PROFILE (Q1-Q3)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'q1_primary_goal',
    question: "What's your primary food goal right now?",
    type: 'single_select',
    section: 'quick',
    dimension: 'goals',
    required: true,
    options: [
      { value: 'weight_loss', label: 'Lose weight and keep it off' },
      { value: 'energy', label: 'Gain energy and feel more vibrant' },
      { value: 'health_markers', label: 'Improve specific health markers' },
      { value: 'sustainability_ethics', label: 'Eat more sustainably/ethically' },
      { value: 'simplify_relationship', label: 'Simplify my relationship with food' },
      { value: 'athletic_performance', label: 'Support athletic performance' },
      { value: 'just_curious', label: 'No specific goal, just curious' },
    ],
  },

  {
    id: 'q2_current_style',
    question: 'How would you describe your current eating style?',
    type: 'single_select',
    section: 'quick',
    dimension: 'lifestyle',
    required: true,
    options: [
      { value: 'whatever_convenient', label: "I eat whatever's convenient" },
      { value: 'try_healthy_struggle', label: 'I try to eat healthy but struggle with consistency' },
      { value: 'loose_structure', label: 'I follow a loose structure but nothing specific' },
      { value: 'tried_various_mixed', label: "I've tried various diets with mixed results" },
      { value: 'eat_well_want_optimize', label: 'I eat fairly well but want optimization' },
      { value: 'dietary_restrictions', label: 'I have dietary restrictions I work around' },
    ],
  },

  {
    id: 'q3_biggest_challenge',
    question: "What's your biggest food-related challenge?",
    type: 'multi_select',
    section: 'quick',
    dimension: 'practical',
    required: true,
    maxSelections: 2,
    helpText: 'Select up to 2',
    options: [
      { value: 'time', label: 'Time for cooking/prep' },
      { value: 'knowing_what', label: 'Knowing what to eat' },
      { value: 'consistency', label: 'Staying consistent' },
      { value: 'social_eating', label: 'Eating out/social situations' },
      { value: 'budget', label: 'Budget constraints' },
      { value: 'family_dynamics', label: 'Family/household dynamics' },
      { value: 'emotional_eating', label: 'Emotional/stress eating' },
      { value: 'conflicting_info', label: 'Conflicting nutrition information' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - LIFESTYLE (Q4-Q6)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'q4_weekday_meals',
    question: 'What does a typical weekday look like for meals?',
    type: 'timeline_selector',
    section: 'core',
    dimension: 'lifestyle',
    required: true,
    helpText: 'Select one option for each meal',
    options: [],
    timelineSlots: [
      {
        id: 'morning',
        label: 'Morning',
        options: [
          { value: 'skip', label: 'Skip' },
          { value: 'quick_grab', label: 'Quick grab' },
          { value: 'sit_down', label: 'Sit-down meal' },
          { value: 'varies', label: 'Varies' },
        ],
      },
      {
        id: 'lunch',
        label: 'Lunch',
        options: [
          { value: 'skip', label: 'Skip' },
          { value: 'desk_fast', label: 'Desk/fast' },
          { value: 'proper_break', label: 'Proper break' },
          { value: 'varies', label: 'Varies' },
        ],
      },
      {
        id: 'dinner',
        label: 'Dinner',
        options: [
          { value: 'quick', label: 'Quick' },
          { value: 'cook_meal', label: 'Cook meal' },
          { value: 'takeout_out', label: 'Takeout/out' },
          { value: 'varies', label: 'Varies' },
        ],
      },
    ],
  },

  {
    id: 'q5_time_available',
    question: 'How much time can you realistically spend on food daily?',
    type: 'single_select',
    section: 'core',
    dimension: 'practical',
    required: true,
    helpText: 'Including shopping, prep, cooking, and cleanup',
    options: [
      { value: 'under_30', label: 'Less than 30 minutes total' },
      { value: '30_60', label: '30-60 minutes total' },
      { value: '60_120', label: '1-2 hours total' },
      { value: 'over_120', label: 'More than 2 hours (I enjoy cooking)' },
    ],
  },

  {
    id: 'q6_eating_companions',
    question: 'Who do you typically eat with?',
    type: 'multi_select',
    section: 'core',
    dimension: 'lifestyle',
    required: true,
    helpText: 'Select all that apply',
    options: [
      { value: 'mostly_alone', label: 'Mostly alone' },
      { value: 'partner', label: 'Partner/spouse' },
      { value: 'children', label: 'Children at home' },
      { value: 'different_preferences', label: 'Roommates/family with different preferences' },
      { value: 'colleagues', label: 'Colleagues at work' },
      { value: 'varies', label: 'Varies day-to-day' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - VALUES (Q7-Q8)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'q7_value_importance',
    question: 'Which of these matters MOST to you in food choices?',
    type: 'single_select',
    section: 'core',
    dimension: 'values',
    required: true,
    helpText: 'Pick your top priority',
    options: [
      { value: 'environmental_sustainability', label: 'Environmental sustainability' },
      { value: 'animal_welfare', label: 'Animal welfare' },
      { value: 'local_producers', label: 'Supporting local producers' },
      { value: 'organic_minimal_processing', label: 'Organic/minimal processing' },
      { value: 'cultural_traditional', label: 'Cultural/traditional connection' },
      { value: 'convenience_simplicity', label: 'Convenience and simplicity' },
    ],
  },

  {
    id: 'q8_ideal_eating_style',
    question: 'When you imagine your ideal way of eating, it feels...',
    type: 'single_select',
    section: 'core',
    dimension: 'preferences',
    required: true,
    options: [
      { value: 'structured_predictable', label: 'Structured and predictable (I like rules)' },
      { value: 'flexible_guidelines', label: 'Flexible with guidelines (80/20 approach)' },
      { value: 'intuitive_unrestricted', label: 'Intuitive and unrestricted (mindful eating)' },
      { value: 'socially_integrated', label: 'Socially integrated (eating is communal)' },
      { value: 'optimized_measured', label: 'Optimized and measured (data-driven)' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - HEALTH (Q9-Q10)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'q9_health_conditions',
    question: 'Do any of these apply to you?',
    type: 'multi_select',
    section: 'core',
    dimension: 'health',
    required: true,
    helpText: 'Select all that apply, or "None" - this helps us provide safe recommendations',
    options: [
      { value: 'hypertension', label: 'High blood pressure' },
      { value: 'heart_disease', label: 'Heart disease or cardiovascular concerns' },
      { value: 'type2_diabetes', label: 'Type 2 diabetes or prediabetes' },
      { value: 'type1_diabetes', label: 'Type 1 diabetes' },
      { value: 'kidney_disease', label: 'Kidney disease or reduced kidney function' },
      { value: 'digestive', label: 'Digestive issues (IBS, bloating, etc.)' },
      { value: 'autoimmune', label: 'Autoimmune conditions' },
      { value: 'joint_pain', label: 'Joint pain or chronic inflammation' },
      { value: 'pregnancy', label: 'Currently pregnant or breastfeeding' },
      { value: 'mental_health', label: 'Mental health considerations' },
      { value: 'none', label: 'None of these / Prefer not to say' },
    ],
  },

  {
    id: 'q10_food_restrictions',
    question: "Any foods you avoid or can't eat?",
    type: 'multi_select',
    section: 'core',
    dimension: 'health',
    required: true,
    helpText: 'Select all that apply',
    options: [
      { value: 'gluten', label: 'Gluten' },
      { value: 'dairy', label: 'Dairy' },
      { value: 'eggs', label: 'Eggs' },
      { value: 'soy', label: 'Soy' },
      { value: 'nuts', label: 'Nuts/Tree nuts' },
      { value: 'shellfish_fish', label: 'Shellfish/Fish' },
      { value: 'red_meat', label: 'Red meat' },
      { value: 'all_animal', label: 'All animal products' },
      { value: 'none', label: 'None / No restrictions' },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - PRACTICAL (Q11-Q12)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'q11_budget',
    question: "What's your monthly food budget comfort zone?",
    type: 'single_select',
    section: 'core',
    dimension: 'practical',
    required: true,
    options: [
      { value: 'tight', label: 'I need very budget-conscious options' },
      { value: 'moderate', label: 'Moderate budget, value-focused' },
      { value: 'comfortable', label: 'Comfortable budget, quality matters' },
      { value: 'unlimited', label: "Budget isn't a primary concern" },
    ],
  },

  {
    id: 'q12_kitchen_cooking',
    question: 'Kitchen and cooking reality check:',
    type: 'multi_select',
    section: 'core',
    dimension: 'practical',
    required: true,
    helpText: 'Select all that apply',
    options: [
      { value: 'basic_equipment', label: 'I have basic equipment only' },
      { value: 'well_equipped', label: 'I have a well-equipped kitchen' },
      { value: 'beginner_cook', label: "I'm a beginner cook" },
      { value: 'confident_cook', label: "I'm a confident cook" },
      { value: 'diverse_grocery', label: 'I have access to diverse grocery options' },
      { value: 'limited_access', label: 'My options are limited (food desert, small town)' },
      { value: 'meal_prep_regular', label: 'I meal prep regularly' },
      { value: 'never_meal_prep', label: "I've never meal prepped" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - PREFERENCES (Q13-Q15)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 'q13_food_enjoyment',
    question: 'Food enjoyment style',
    type: 'slider',
    section: 'core',
    dimension: 'preferences',
    required: true,
    helpText: 'Slide to show where you fall on each spectrum',
    options: [],
    sliderSpectrums: [
      { id: 'eat_live', leftLabel: 'Eat to live', rightLabel: 'Live to eat' },
      { id: 'routine_variety', leftLabel: 'Routine lover', rightLabel: 'Variety seeker' },
      { id: 'simple_complex', leftLabel: 'Simple flavors', rightLabel: 'Complex flavors' },
    ],
  },

  {
    id: 'q14_past_diet_experience',
    question: 'Past diet experience:',
    type: 'multi_select',
    section: 'core',
    dimension: 'preferences',
    required: true,
    helpText: 'Select all that apply',
    options: [
      { value: 'low_carb_worked', label: 'Low-carb/Keto (worked well)' },
      { value: 'low_carb_didnt_work', label: "Low-carb/Keto (didn't work)" },
      { value: 'vegetarian_worked', label: 'Vegetarian/Vegan (worked well)' },
      { value: 'vegetarian_didnt_work', label: "Vegetarian/Vegan (didn't work)" },
      { value: 'calorie_counting_worked', label: 'Calorie counting (worked well)' },
      { value: 'calorie_counting_didnt_work', label: "Calorie counting (didn't work)" },
      { value: 'fasting_worked', label: 'Intermittent fasting (worked well)' },
      { value: 'fasting_didnt_work', label: "Intermittent fasting (didn't work)" },
      { value: 'whole30_worked', label: 'Whole30/Paleo (worked well)' },
      { value: 'whole30_didnt_work', label: "Whole30/Paleo (didn't work)" },
      { value: 'no_experience', label: 'No significant diet experience' },
    ],
  },

  {
    id: 'q15_derails_eating',
    question: 'What typically derails healthy eating for you?',
    type: 'multi_select',
    section: 'core',
    dimension: 'preferences',
    required: true,
    maxSelections: 2,
    helpText: 'Select your top 2',
    options: [
      { value: 'stress_emotional', label: 'Stress and emotional triggers' },
      { value: 'social_pressure', label: 'Social pressure or events' },
      { value: 'travel_disruptions', label: 'Travel or schedule disruptions' },
      { value: 'boredom', label: 'Boredom with food choices' },
      { value: 'cravings', label: 'Cravings for specific foods' },
      { value: 'all_or_nothing', label: 'All-or-nothing thinking' },
      { value: 'lack_planning', label: 'Lack of planning/prep' },
      { value: 'cost', label: 'Cost of healthy options' },
    ],
  },
]

// ========== Answer Impact Mappings ==========

export const ANSWER_IMPACTS: Record<string, Record<string, AnswerImpact>> = {
  // Q1: Primary Goal
  q1_primary_goal: {
    weight_loss: {
      evidence: {
        low_carb: 2,
        keto: 2,
        mediterranean: 1,
        intermittent_fasting: 2,
        dash: 1,
      },
    },
    energy: {
      evidence: {
        mediterranean: 2,
        anti_inflammatory: 2,
        wfpb: 1,
        intermittent_fasting: 1,
      },
    },
    health_markers: {
      evidence: {
        mediterranean: 3,
        dash: 3,
        wfpb: 2,
        anti_inflammatory: 2,
        flexitarian: 1,
      },
    },
    sustainability_ethics: {
      evidence: {
        wfpb: 3,
        flexitarian: 3,
        mediterranean: 1,
      },
      preference: {
        wfpb: 2,
        flexitarian: 2,
      },
    },
    simplify_relationship: {
      evidence: {
        intuitive_eating: 3,
      },
      preference: {
        intuitive_eating: 3,
        mediterranean: 1,
        flexitarian: 1,
      },
    },
    athletic_performance: {
      evidence: {
        zone_macro: 3,
        mediterranean: 2,
        low_carb: 1,
      },
      preference: {
        zone_macro: 2,
      },
    },
    just_curious: {
      feasibility: {
        mediterranean: 2,
        flexitarian: 2,
        intuitive_eating: 1,
      },
      preference: {
        mediterranean: 1,
        flexitarian: 1,
      },
    },
  },

  // Q2: Current Style
  q2_current_style: {
    whatever_convenient: {
      feasibility: {
        intermittent_fasting: 2,
        mediterranean: -1,
        wfpb: -2,
        keto: -1,
      },
      preference: {
        intuitive_eating: 1,
      },
    },
    try_healthy_struggle: {
      feasibility: {
        flexitarian: 2,
        mediterranean: 1,
        intuitive_eating: 2,
      },
      preference: {
        intuitive_eating: 1,
      },
    },
    loose_structure: {
      feasibility: {
        mediterranean: 2,
        flexitarian: 2,
        anti_inflammatory: 1,
      },
    },
    tried_various_mixed: {
      feasibility: {
        intuitive_eating: 2,
        mediterranean: 1,
        flexitarian: 1,
      },
      preference: {
        intuitive_eating: 2,
      },
    },
    eat_well_want_optimize: {
      feasibility: {
        zone_macro: 2,
        mediterranean: 1,
        anti_inflammatory: 1,
      },
      preference: {
        zone_macro: 2,
      },
    },
    dietary_restrictions: {
      feasibility: {
        flexitarian: 1,
        mediterranean: 1,
      },
    },
  },

  // Q3: Biggest Challenge
  q3_biggest_challenge: {
    time: {
      feasibility: {
        intermittent_fasting: 3,
        keto: 1,
        wfpb: -2,
        mediterranean: -1,
      },
    },
    knowing_what: {
      feasibility: {
        mediterranean: 1,
        dash: 1,
        keto: 1,
        zone_macro: 1,
      },
    },
    consistency: {
      feasibility: {
        intuitive_eating: 2,
        flexitarian: 2,
        mediterranean: 1,
      },
      preference: {
        intuitive_eating: 2,
      },
    },
    social_eating: {
      feasibility: {
        mediterranean: 2,
        flexitarian: 2,
        intuitive_eating: 2,
        keto: -2,
        wfpb: -1,
      },
    },
    budget: {
      feasibility: {
        flexitarian: 2,
        mediterranean: 1,
        dash: 1,
        keto: -1,
        wfpb: -1,
      },
    },
    family_dynamics: {
      feasibility: {
        flexitarian: 3,
        mediterranean: 2,
        intuitive_eating: 1,
        keto: -2,
        wfpb: -2,
      },
    },
    emotional_eating: {
      evidence: {
        intuitive_eating: 3,
      },
      feasibility: {
        intuitive_eating: 2,
        keto: -2,
        intermittent_fasting: -1,
      },
      preference: {
        intuitive_eating: 2,
      },
    },
    conflicting_info: {
      feasibility: {
        mediterranean: 2,
        dash: 2,
      },
    },
  },

  // Q4: Weekday Meals
  q4_weekday_meals: {
    skip_breakfast_quick_meals: {
      feasibility: {
        intermittent_fasting: 3,
        keto: 1,
        wfpb: -2,
        mediterranean: -1,
      },
    },
    quick_all_meals: {
      feasibility: {
        intermittent_fasting: 2,
        keto: 1,
        wfpb: -2,
        mediterranean: -1,
      },
    },
    cook_dinner_only: {
      feasibility: {
        mediterranean: 1,
        flexitarian: 1,
      },
    },
    sit_down_breakfast_varies: {
      feasibility: {
        mediterranean: 1,
        wfpb: 1,
      },
    },
    mostly_takeout: {
      feasibility: {
        intermittent_fasting: 2,
        intuitive_eating: 1,
        wfpb: -3,
        keto: -1,
      },
    },
    meal_prep_structured: {
      feasibility: {
        mediterranean: 2,
        wfpb: 2,
        zone_macro: 2,
        keto: 1,
      },
    },
  },

  // Q5: Time Available
  q5_time_available: {
    under_30: {
      feasibility: {
        intermittent_fasting: 3,
        low_carb: 1,
        keto: 1,
        wfpb: -3,
        mediterranean: -1,
        zone_macro: -1,
      },
    },
    '30_60': {
      feasibility: {
        flexitarian: 2,
        mediterranean: 1,
        low_carb: 1,
        wfpb: -1,
      },
    },
    '60_120': {
      feasibility: {
        mediterranean: 2,
        flexitarian: 2,
        wfpb: 1,
        anti_inflammatory: 1,
      },
    },
    over_120: {
      feasibility: {
        wfpb: 3,
        mediterranean: 2,
        anti_inflammatory: 2,
        zone_macro: 1,
      },
    },
  },

  // Q6: Eating Companions
  q6_eating_companions: {
    mostly_alone: {
      // All diets equally feasible when eating alone
    },
    partner: {
      feasibility: {
        mediterranean: 1,
        flexitarian: 2,
        keto: -1,
      },
    },
    children: {
      feasibility: {
        flexitarian: 3,
        mediterranean: 2,
        dash: 1,
        keto: -2,
        wfpb: -1,
        intermittent_fasting: -1,
      },
    },
    different_preferences: {
      feasibility: {
        flexitarian: 3,
        mediterranean: 2,
        keto: -2,
        wfpb: -2,
      },
    },
    colleagues: {
      feasibility: {
        mediterranean: 1,
        flexitarian: 1,
        intuitive_eating: 1,
        keto: -1,
      },
    },
    varies: {
      feasibility: {
        flexitarian: 2,
        mediterranean: 1,
        intuitive_eating: 2,
      },
    },
  },

  // Q7: Value Importance
  q7_value_importance: {
    environmental_sustainability: {
      preference: {
        wfpb: 3,
        flexitarian: 3,
        mediterranean: 1,
      },
    },
    animal_welfare: {
      preference: {
        wfpb: 3,
        flexitarian: 2,
      },
    },
    local_producers: {
      preference: {
        mediterranean: 2,
        flexitarian: 1,
      },
    },
    organic_minimal_processing: {
      preference: {
        wfpb: 3,
        anti_inflammatory: 2,
        mediterranean: 1,
      },
    },
    cultural_traditional: {
      preference: {
        mediterranean: 3,
        intuitive_eating: 1,
      },
    },
    convenience_simplicity: {
      preference: {
        intermittent_fasting: 3,
        intuitive_eating: 2,
      },
    },
  },

  // Q8: Ideal Eating Style
  q8_ideal_eating_style: {
    structured_predictable: {
      preference: {
        keto: 3,
        zone_macro: 3,
        low_carb: 2,
        dash: 2,
        intuitive_eating: -2,
      },
    },
    flexible_guidelines: {
      preference: {
        mediterranean: 3,
        flexitarian: 3,
        anti_inflammatory: 2,
        keto: -1,
      },
    },
    intuitive_unrestricted: {
      preference: {
        intuitive_eating: 3,
        mediterranean: 1,
        flexitarian: 1,
        keto: -2,
        zone_macro: -2,
      },
    },
    socially_integrated: {
      preference: {
        mediterranean: 3,
        flexitarian: 2,
        intuitive_eating: 2,
        keto: -2,
        wfpb: -1,
      },
    },
    optimized_measured: {
      preference: {
        zone_macro: 3,
        low_carb: 2,
        keto: 1,
        intuitive_eating: -2,
      },
    },
  },

  // Q9: Health Conditions (primarily handled by condition rules via setsCondition)
  q9_health_conditions: {
    hypertension: {
      setsCondition: 'hypertension',
    },
    heart_disease: {
      setsCondition: 'heart_disease',
    },
    type2_diabetes: {
      setsCondition: 'type2_diabetes',
    },
    type1_diabetes: {
      setsCondition: 'type1_diabetes',
    },
    kidney_disease: {
      setsCondition: 'kidney_disease',
    },
    digestive: {
      setsCondition: 'digestive_issues',
    },
    autoimmune: {
      setsCondition: 'autoimmune',
    },
    joint_pain: {
      setsCondition: 'inflammation',
      evidence: {
        anti_inflammatory: 2,
        mediterranean: 1,
      },
    },
    pregnancy: {
      setsCondition: 'pregnancy',
    },
    mental_health: {
      setsCondition: 'mental_health',
    },
    none: {
      // No impacts
    },
  },

  // Q10: Food Restrictions
  q10_food_restrictions: {
    gluten: {
      feasibility: {
        mediterranean: -1,
        wfpb: 0,
        keto: 1,
      },
    },
    dairy: {
      feasibility: {
        wfpb: 2,
        mediterranean: -1,
        keto: -1,
      },
    },
    eggs: {
      feasibility: {
        wfpb: 1,
        keto: -1,
        low_carb: -1,
      },
    },
    soy: {
      feasibility: {
        wfpb: -1,
        keto: 1,
      },
    },
    nuts: {
      feasibility: {
        mediterranean: -1,
        wfpb: -1,
        keto: -1,
      },
    },
    shellfish_fish: {
      feasibility: {
        mediterranean: -2,
        wfpb: 1,
      },
    },
    red_meat: {
      feasibility: {
        wfpb: 2,
        flexitarian: 2,
        keto: -1,
      },
    },
    all_animal: {
      feasibility: {
        wfpb: 3,
        mediterranean: -2,
        keto: -3,
        low_carb: -2,
        zone_macro: -1,
      },
    },
    none: {
      // No impacts
    },
  },

  // Q11: Budget
  q11_budget: {
    tight: {
      feasibility: {
        flexitarian: 2,
        mediterranean: 1,
        keto: -2,
        wfpb: -1,
      },
    },
    moderate: {
      feasibility: {
        flexitarian: 1,
        mediterranean: 1,
      },
    },
    comfortable: {
      feasibility: {
        mediterranean: 1,
        wfpb: 1,
        anti_inflammatory: 1,
      },
    },
    unlimited: {
      feasibility: {
        wfpb: 1,
        anti_inflammatory: 1,
        keto: 1,
      },
    },
  },

  // Q12: Kitchen and Cooking
  q12_kitchen_cooking: {
    basic_equipment: {
      feasibility: {
        intermittent_fasting: 1,
        wfpb: -1,
        zone_macro: -1,
      },
    },
    well_equipped: {
      feasibility: {
        mediterranean: 1,
        wfpb: 1,
        anti_inflammatory: 1,
      },
    },
    beginner_cook: {
      feasibility: {
        intermittent_fasting: 2,
        flexitarian: 1,
        wfpb: -2,
        keto: -1,
      },
    },
    confident_cook: {
      feasibility: {
        mediterranean: 2,
        wfpb: 2,
        anti_inflammatory: 1,
        keto: 1,
      },
    },
    diverse_grocery: {
      feasibility: {
        mediterranean: 1,
        wfpb: 1,
        anti_inflammatory: 1,
      },
    },
    limited_access: {
      feasibility: {
        mediterranean: -1,
        wfpb: -2,
        flexitarian: 1,
      },
    },
    meal_prep_regular: {
      feasibility: {
        mediterranean: 2,
        wfpb: 2,
        zone_macro: 2,
        keto: 1,
      },
    },
    never_meal_prep: {
      feasibility: {
        intermittent_fasting: 2,
        intuitive_eating: 1,
        wfpb: -1,
      },
    },
  },

  // Q13: Food Enjoyment
  q13_food_enjoyment: {
    eat_to_live: {
      preference: {
        intermittent_fasting: 2,
        zone_macro: 1,
        mediterranean: -1,
      },
    },
    balanced_enjoyer: {
      preference: {
        mediterranean: 2,
        flexitarian: 2,
        intuitive_eating: 1,
      },
    },
    live_to_eat: {
      preference: {
        mediterranean: 3,
        intuitive_eating: 2,
        keto: -1,
      },
    },
    routine_lover: {
      preference: {
        keto: 2,
        zone_macro: 2,
        low_carb: 1,
        intermittent_fasting: 1,
      },
    },
    variety_seeker: {
      preference: {
        mediterranean: 2,
        flexitarian: 2,
        keto: -2,
      },
    },
  },

  // Q14: Past Diet Experience
  q14_past_diet_experience: {
    low_carb_worked: {
      evidence: {
        low_carb: 2,
        keto: 1,
      },
      preference: {
        low_carb: 2,
        keto: 1,
      },
    },
    low_carb_didnt_work: {
      preference: {
        low_carb: -2,
        keto: -2,
      },
    },
    vegetarian_worked: {
      evidence: {
        wfpb: 2,
        flexitarian: 1,
      },
      preference: {
        wfpb: 2,
        flexitarian: 2,
      },
    },
    vegetarian_didnt_work: {
      preference: {
        wfpb: -2,
        flexitarian: -1,
      },
    },
    calorie_counting_worked: {
      evidence: {
        zone_macro: 2,
      },
      preference: {
        zone_macro: 2,
      },
    },
    calorie_counting_didnt_work: {
      preference: {
        zone_macro: -2,
        intuitive_eating: 2,
      },
    },
    fasting_worked: {
      evidence: {
        intermittent_fasting: 2,
      },
      preference: {
        intermittent_fasting: 3,
      },
    },
    fasting_didnt_work: {
      preference: {
        intermittent_fasting: -3,
      },
    },
    whole30_worked: {
      evidence: {
        anti_inflammatory: 1,
        wfpb: 1,
      },
      preference: {
        anti_inflammatory: 2,
      },
    },
    whole30_didnt_work: {
      preference: {
        anti_inflammatory: -1,
      },
    },
    no_experience: {
      feasibility: {
        mediterranean: 1,
        flexitarian: 1,
      },
    },
  },

  // Q15: What Derails Eating
  q15_derails_eating: {
    stress_emotional: {
      evidence: {
        intuitive_eating: 2,
      },
      preference: {
        intuitive_eating: 2,
        keto: -1,
      },
    },
    social_pressure: {
      feasibility: {
        mediterranean: 2,
        flexitarian: 2,
        keto: -2,
        wfpb: -1,
      },
    },
    travel_disruptions: {
      feasibility: {
        intermittent_fasting: 2,
        mediterranean: 1,
        keto: -1,
        wfpb: -2,
      },
    },
    boredom: {
      preference: {
        mediterranean: 2,
        flexitarian: 1,
        keto: -1,
      },
    },
    cravings: {
      preference: {
        intuitive_eating: 2,
        keto: -1,
      },
    },
    all_or_nothing: {
      preference: {
        intuitive_eating: 3,
        flexitarian: 2,
        keto: -2,
        zone_macro: -1,
      },
    },
    lack_planning: {
      feasibility: {
        intermittent_fasting: 2,
        keto: -1,
        wfpb: -2,
      },
    },
    cost: {
      feasibility: {
        flexitarian: 2,
        mediterranean: 1,
        keto: -1,
        wfpb: -1,
      },
    },
  },
}

// ========== Helper Functions ==========

export function getQuestionsBySection(section: 'quick' | 'core' | 'deep'): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((q) => q.section === section)
}

export function getQuestionById(id: string): QuizQuestion | undefined {
  return QUIZ_QUESTIONS.find((q) => q.id === id)
}

export function getAnswerImpacts(questionId: string, answerValue: string): AnswerImpact | undefined {
  return ANSWER_IMPACTS[questionId]?.[answerValue]
}

export function getTotalQuestions(): number {
  return QUIZ_QUESTIONS.length
}

export function getSectionQuestionCount(section: 'quick' | 'core' | 'deep'): number {
  return QUIZ_QUESTIONS.filter((q) => q.section === section).length
}

/** Map timeline selector value (JSON) to existing q4 profile key for scoring */
export function getTimelineProfileKey(timelineValue: string): string | null {
  try {
    const o = JSON.parse(timelineValue) as { morning?: string; lunch?: string; dinner?: string }
    const m = o.morning ?? 'varies'
    const l = o.lunch ?? 'varies'
    const d = o.dinner ?? 'varies'
    if (m === 'skip' && (l === 'skip' || l === 'desk_fast') && (d === 'quick' || d === 'varies'))
      return 'skip_breakfast_quick_meals'
    if (m === 'skip' && l !== 'proper_break' && d !== 'cook_meal') return 'skip_breakfast_quick_meals'
    if ((m === 'quick_grab' || m === 'skip') && l !== 'proper_break' && d !== 'cook_meal')
      return 'quick_all_meals'
    if (d === 'takeout_out' && l !== 'proper_break') return 'mostly_takeout'
    if (d === 'cook_meal' && (l === 'proper_break' || m === 'sit_down')) return 'meal_prep_structured'
    if (d === 'cook_meal') return 'cook_dinner_only'
    if (m === 'sit_down') return 'sit_down_breakfast_varies'
    if (d === 'takeout_out') return 'mostly_takeout'
    return 'quick_all_meals'
  } catch {
    return null
  }
}

/** Map slider value "n1,n2,n3" (0-100) to q13 impact keys for scoring */
export function getFoodEnjoymentImpactKeys(sliderValue: string): string[] {
  const parts = sliderValue.split(',').map((s) => parseInt(s.trim(), 10))
  if (parts.length < 2 || parts.some((n) => isNaN(n) || n < 0 || n > 100)) return ['balanced_enjoyer']
  const [eatLive, routineVariety] = parts
  const keys: string[] = []
  if (eatLive <= 33) keys.push('eat_to_live')
  else if (eatLive >= 67) keys.push('live_to_eat')
  else keys.push('balanced_enjoyer')
  if (routineVariety <= 25) keys.push('routine_lover')
  else if (routineVariety >= 75) keys.push('variety_seeker')
  return keys
}
