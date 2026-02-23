/**
 * Substitution rules for budget-friendly swaps.
 * Based on GROCERY-BUDGET-PLANNER-DEVELOPMENT-GUIDE.md
 */

export interface SubstitutionAlternative {
  item: string
  savingsPercent: number
  nutritionMatch: number
}

export interface SubstitutionRule {
  original: string
  alternatives: SubstitutionAlternative[]
  rationale: string
}

export const substitutionRules: SubstitutionRule[] = [
  {
    original: 'salmon_fresh',
    alternatives: [
      { item: 'salmon_frozen', savingsPercent: 30, nutritionMatch: 0.95 },
      { item: 'sardines_canned', savingsPercent: 60, nutritionMatch: 0.85 },
      { item: 'mackerel_canned', savingsPercent: 55, nutritionMatch: 0.9 },
    ],
    rationale: 'Frozen and canned fish offer similar omega-3 benefits at lower cost.',
  },
  {
    original: 'chicken_breast',
    alternatives: [
      { item: 'chicken_thighs', savingsPercent: 40, nutritionMatch: 0.9 },
      { item: 'chicken_drumsticks', savingsPercent: 50, nutritionMatch: 0.85 },
    ],
    rationale: 'Dark meat is more affordable and many find it more flavorful.',
  },
  {
    original: 'spinach_baby_bag',
    alternatives: [
      { item: 'spinach_bunch', savingsPercent: 35, nutritionMatch: 1.0 },
      { item: 'frozen_spinach', savingsPercent: 50, nutritionMatch: 0.95 },
    ],
    rationale: 'Bunch spinach requires washing but costs less; frozen is pre-cleaned and lasts longer.',
  },
  {
    original: 'almond_butter',
    alternatives: [{ item: 'peanut_butter', savingsPercent: 44, nutritionMatch: 0.9 }],
    rationale: 'Peanut butter has similar protein and healthy fats at a lower price.',
  },
  {
    original: 'salmon_frozen',
    alternatives: [
      { item: 'sardines_canned', savingsPercent: 67, nutritionMatch: 0.85 },
      { item: 'canned_tuna', savingsPercent: 72, nutritionMatch: 0.8 },
    ],
    rationale: 'Canned fish is budget-friendly and still provides omega-3s and protein.',
  },
  {
    original: 'tomato_fresh',
    alternatives: [
      { item: 'tomatoes_canned', savingsPercent: 70, nutritionMatch: 0.9 },
      { item: 'canned_tomatoes', savingsPercent: 70, nutritionMatch: 0.9 },
    ],
    rationale: 'Canned tomatoes are cheaper year-round and work well in cooked dishes.',
  },
  {
    original: 'strawberries',
    alternatives: [
      { item: 'frozen_strawberries', savingsPercent: 30, nutritionMatch: 0.95 },
      { item: 'blueberries_frozen', savingsPercent: 20, nutritionMatch: 0.9 },
    ],
    rationale: 'Frozen berries are often equal or better nutrition (frozen at peak) and cost less.',
  },
  {
    original: 'quinoa',
    alternatives: [
      { item: 'brown_rice', savingsPercent: 42, nutritionMatch: 0.85 },
      { item: 'barley', savingsPercent: 50, nutritionMatch: 0.8 },
    ],
    rationale: 'Whole grains like brown rice and barley offer similar fiber and nutrients for less.',
  },
  {
    original: 'feta_cheese',
    alternatives: [
      { item: 'cottage_cheese', savingsPercent: 20, nutritionMatch: 0.7 },
      { item: 'cheddar_cheese', savingsPercent: 0, nutritionMatch: 0.6 },
    ],
    rationale: 'Cottage cheese is high in protein; cheddar stretches further for cooking.',
  },
  {
    original: 'bell_peppers',
    alternatives: [
      { item: 'carrots', savingsPercent: 50, nutritionMatch: 0.7 },
      { item: 'cabbage', savingsPercent: 84, nutritionMatch: 0.6 },
    ],
    rationale: 'Carrots and cabbage are budget-friendly and versatile in stir-fries and slaws.',
  },
  {
    original: 'raspberries',
    alternatives: [
      { item: 'frozen_strawberries', savingsPercent: 13, nutritionMatch: 0.9 },
      { item: 'bananas', savingsPercent: 75, nutritionMatch: 0.5 },
    ],
    rationale: 'Frozen fruit or bananas can satisfy a fruit fix for less.',
  },
]

const ruleByOriginal = new Map(substitutionRules.map((r) => [r.original, r]))

export function getSubstitutionRule(originalItemId: string): SubstitutionRule | undefined {
  return ruleByOriginal.get(originalItemId)
}
