/**
 * Diet Quiz Scoring Engine
 * Implements the three-pillar scoring model (Evidence, Feasibility, Preference)
 * with safety overrides and condition-based rules.
 *
 * Based on SPEC 1 from DIET-QUIZ-DEVELOPMENT-GUIDE.md
 */

import type {
  DietId,
  DietScores,
  DietResult,
  PillarWeights,
  HealthCondition,
  UserProfile,
  ReferralDecision,
  HybridRecommendation,
  ConditionRule,
  ConditionBoost,
} from '@/types/diet-quiz'

// ========== Constants ==========

export const ALL_DIETS: DietId[] = [
  'mediterranean',
  'dash',
  'flexitarian',
  'wfpb',
  'low_carb',
  'keto',
  'intermittent_fasting',
  'anti_inflammatory',
  'intuitive_eating',
  'zone_macro',
]

// ========== Default Pillar Weights ==========

const DEFAULT_WEIGHTS: PillarWeights = {
  evidence: 0.35,
  feasibility: 0.40,
  preference: 0.25,
}

/**
 * Get context-adjusted pillar weights based on user profile
 */
export function getWeights(userProfile: Partial<UserProfile>): PillarWeights {
  // User has health conditions → evidence matters more
  if (userProfile.healthConditions && userProfile.healthConditions.length > 0) {
    return {
      evidence: 0.45,
      feasibility: 0.35,
      preference: 0.20,
    }
  }

  // User is "just curious" → feasibility and preference matter more
  if (userProfile.primaryGoal === 'just_curious') {
    return {
      evidence: 0.25,
      feasibility: 0.45,
      preference: 0.30,
    }
  }

  // User has complicated relationship with food → preference matters most
  if (userProfile.relationshipWithFood === 'complicated') {
    return {
      evidence: 0.25,
      feasibility: 0.35,
      preference: 0.40,
    }
  }

  return DEFAULT_WEIGHTS
}

// ========== Condition Rules Engine ==========

export const conditionRules: Record<HealthCondition, ConditionRule> = {
  hypertension: {
    boost: {
      mediterranean: { evidence: 3, note: 'Strong evidence for BP management' },
      dash: { evidence: 4, note: 'Designed specifically for hypertension' },
      flexitarian: { evidence: 2, note: 'Plant-forward supports heart health' },
    },
    suppress: {
      keto: {
        evidence: -2,
        safetyLevel: 'caution',
        note: 'Discuss with provider if on BP medications',
      },
    },
    referralWeight: 0.3,
  },

  heart_disease: {
    boost: {
      mediterranean: { evidence: 4, note: 'Strong evidence for heart health' },
      dash: { evidence: 3, note: 'Supports cardiovascular health' },
      wfpb: { evidence: 2, note: 'Plant-based may support heart health' },
    },
    suppress: {
      keto: {
        evidence: -2,
        safetyLevel: 'caution',
        note: 'High saturated fat may be contraindicated',
      },
    },
    forceReferral: true,
    referralWeight: 0.8,
  },

  type2_diabetes: {
    boost: {
      mediterranean: { evidence: 3, note: 'Evidence for glycemic control' },
      dash: { evidence: 2 },
      low_carb: { evidence: 2, note: 'May improve blood sugar; monitor with provider' },
    },
    suppress: {
      keto: {
        evidence: 1,
        safetyLevel: 'caution',
        note: 'Requires medical supervision; medication adjustment likely needed',
      },
    },
    requiresDisclaimer: true,
    referralWeight: 0.5,
  },

  type1_diabetes: {
    boost: {
      mediterranean: { evidence: 2 },
      dash: { evidence: 2 },
    },
    suppress: {
      keto: {
        safetyLevel: 'contraindicated',
        note: 'Not recommended for T1DM (DKA risk)',
      },
      intermittent_fasting: {
        safetyLevel: 'caution',
        note: 'Fasting patterns require careful management with T1DM',
      },
    },
    forceReferral: true,
    referralWeight: 1.0,
  },

  kidney_disease: {
    boost: {
      mediterranean: { evidence: 1, note: 'May need sodium/potassium adjustment' },
    },
    suppress: {
      keto: {
        safetyLevel: 'contraindicated',
        note: 'High protein load contraindicated in CKD',
      },
      zone_macro: {
        safetyLevel: 'caution',
        note: 'High protein may be problematic',
      },
    },
    forceReferral: true,
    referralWeight: 1.0,
  },

  digestive_issues: {
    boost: {
      mediterranean: { evidence: 1 },
      flexitarian: { evidence: 1 },
      anti_inflammatory: { evidence: 1 },
    },
    suppress: {},
    specialNote: 'Consider Low-FODMAP as temporary strategy with RD guidance',
    referralWeight: 0.4,
  },

  autoimmune: {
    boost: {
      mediterranean: { evidence: 2 },
      anti_inflammatory: { evidence: 3, note: 'Anti-inflammatory pattern may help symptoms' },
      wfpb: { evidence: 1 },
    },
    suppress: {},
    referralWeight: 0.3,
  },

  inflammation: {
    boost: {
      mediterranean: { evidence: 2 },
      anti_inflammatory: { evidence: 3 },
      wfpb: { evidence: 2 },
    },
    suppress: {},
    referralWeight: 0.2,
  },

  mental_health: {
    boost: {},
    suppress: {},
    referralWeight: 0.2,
  },

  pregnancy: {
    boost: {
      mediterranean: { evidence: 2, note: 'Balanced, nutrient-dense pattern' },
      flexitarian: { evidence: 1 },
    },
    suppress: {
      keto: {
        safetyLevel: 'contraindicated',
        note: 'Not appropriate during pregnancy',
      },
      intermittent_fasting: {
        safetyLevel: 'contraindicated',
        note: 'Fasting not recommended during pregnancy',
      },
      wfpb: {
        safetyLevel: 'caution',
        note: 'Requires careful nutrient planning; B12/iron monitoring',
      },
    },
    forceReferral: true,
    referralWeight: 1.0,
  },
}

// ========== Relationship with Food Rules ==========

interface RelationshipRule {
  boost: Partial<Record<DietId, ConditionBoost>>
  suppress: Partial<Record<DietId, ConditionBoost>>
  forceReferral?: boolean
  referralNote?: string
  referralWeight: number
}

const relationshipWithFoodRules: Record<string, RelationshipRule> = {
  complicated: {
    boost: {
      intuitive_eating: {
        preference: 5,
        evidence: 2,
        note: 'Evidence supports non-restrictive approaches for complicated relationships with food',
      },
      mediterranean: { preference: 2, note: 'Flexible, no forbidden foods' },
      flexitarian: { preference: 2, note: 'Gentle structure without restriction' },
    },
    suppress: {
      keto: {
        safetyLevel: 'caution',
        preference: -3,
        note: 'Restrictive approaches may be harmful',
      },
      intermittent_fasting: {
        safetyLevel: 'caution',
        preference: -2,
        note: 'Time restriction may trigger patterns',
      },
      zone_macro: { preference: -2, note: 'Tracking may be counterproductive' },
    },
    forceReferral: true,
    referralNote: 'Working with a therapist or RD who specializes in eating behaviors may be helpful',
    referralWeight: 0.6,
  },
  emotional: {
    boost: {
      intuitive_eating: { preference: 3 },
      mediterranean: { preference: 1 },
    },
    suppress: {
      keto: { preference: -1 },
      zone_macro: { preference: -1 },
    },
    referralWeight: 0.3,
  },
}

// ========== Hybrid Compatibility ==========

export const hybridCompatibility: Record<DietId, DietId[]> = {
  mediterranean: ['flexitarian', 'intermittent_fasting', 'anti_inflammatory', 'dash'],
  dash: ['mediterranean', 'flexitarian'],
  flexitarian: ['mediterranean', 'low_carb', 'anti_inflammatory'],
  wfpb: ['anti_inflammatory', 'intermittent_fasting'],
  low_carb: ['flexitarian', 'intermittent_fasting'],
  keto: ['intermittent_fasting'],
  intermittent_fasting: ['mediterranean', 'flexitarian', 'low_carb', 'wfpb'],
  anti_inflammatory: ['mediterranean', 'wfpb', 'flexitarian'],
  intuitive_eating: [], // Standalone - philosophy doesn't mix
  zone_macro: ['mediterranean'],
}

export const hybridLabels: Record<string, string> = {
  'mediterranean+intermittent_fasting': 'Mediterranean with Time-Restricted Eating',
  'mediterranean+flexitarian': 'Mediterranean-Flexitarian Blend',
  'flexitarian+low_carb': 'Carb-Conscious Flexitarian',
  'wfpb+anti_inflammatory': 'Anti-Inflammatory Plant-Based',
  'mediterranean+dash': 'Heart-Healthy Mediterranean (DASH-enhanced)',
  'mediterranean+anti_inflammatory': 'Anti-Inflammatory Mediterranean',
  'flexitarian+anti_inflammatory': 'Anti-Inflammatory Flexitarian',
  'low_carb+intermittent_fasting': 'Low-Carb with Time-Restricted Eating',
}

// ========== Score Initialization ==========

export function initializeScores(): Record<DietId, DietScores> {
  const scores: Record<DietId, DietScores> = {} as Record<DietId, DietScores>

  for (const diet of ALL_DIETS) {
    scores[diet] = {
      evidence: 0,
      feasibility: 0,
      preference: 0,
      safetyLevel: 'safe',
      safetyNotes: [],
    }
  }

  return scores
}

// ========== Apply Answer Impacts ==========

export function applyAnswerImpact(
  scores: Record<DietId, DietScores>,
  impacts: {
    evidence?: Partial<Record<DietId, number>>
    feasibility?: Partial<Record<DietId, number>>
    preference?: Partial<Record<DietId, number>>
  }
): void {
  if (impacts.evidence) {
    for (const [diet, value] of Object.entries(impacts.evidence)) {
      if (scores[diet as DietId] && value !== undefined) {
        scores[diet as DietId].evidence += value
      }
    }
  }

  if (impacts.feasibility) {
    for (const [diet, value] of Object.entries(impacts.feasibility)) {
      if (scores[diet as DietId] && value !== undefined) {
        scores[diet as DietId].feasibility += value
      }
    }
  }

  if (impacts.preference) {
    for (const [diet, value] of Object.entries(impacts.preference)) {
      if (scores[diet as DietId] && value !== undefined) {
        scores[diet as DietId].preference += value
      }
    }
  }
}

// ========== Apply Condition Rules ==========

export function applyConditionRules(
  scores: Record<DietId, DietScores>,
  conditions: HealthCondition[]
): void {
  for (const condition of conditions) {
    const rule = conditionRules[condition]
    if (!rule) continue

    // Apply boosts
    for (const [diet, boost] of Object.entries(rule.boost)) {
      const dietId = diet as DietId
      if (!scores[dietId]) continue

      if (boost.evidence) scores[dietId].evidence += boost.evidence
      if (boost.feasibility) scores[dietId].feasibility += boost.feasibility
      if (boost.preference) scores[dietId].preference += boost.preference
      if (boost.note) scores[dietId].safetyNotes.push(boost.note)
    }

    // Apply suppressions
    for (const [diet, suppress] of Object.entries(rule.suppress)) {
      const dietId = diet as DietId
      if (!scores[dietId]) continue

      if (suppress.evidence) scores[dietId].evidence += suppress.evidence
      if (suppress.feasibility) scores[dietId].feasibility += suppress.feasibility
      if (suppress.preference) scores[dietId].preference += suppress.preference
      if (suppress.safetyLevel) {
        // Use the more restrictive safety level
        if (suppress.safetyLevel === 'contraindicated') {
          scores[dietId].safetyLevel = 'contraindicated'
        } else if (suppress.safetyLevel === 'caution' && scores[dietId].safetyLevel === 'safe') {
          scores[dietId].safetyLevel = 'caution'
        }
      }
      if (suppress.note) scores[dietId].safetyNotes.push(suppress.note)
    }
  }
}

// ========== Apply Relationship with Food Rules ==========

export function applyRelationshipRules(
  scores: Record<DietId, DietScores>,
  relationship: string
): void {
  const rule = relationshipWithFoodRules[relationship]
  if (!rule) return

  // Apply boosts
  for (const [diet, boost] of Object.entries(rule.boost)) {
    const dietId = diet as DietId
    if (!scores[dietId]) continue

    if (boost.evidence) scores[dietId].evidence += boost.evidence
    if (boost.feasibility) scores[dietId].feasibility += boost.feasibility
    if (boost.preference) scores[dietId].preference += boost.preference
    if (boost.note) scores[dietId].safetyNotes.push(boost.note)
  }

  // Apply suppressions
  for (const [diet, suppress] of Object.entries(rule.suppress)) {
    const dietId = diet as DietId
    if (!scores[dietId]) continue

    if (suppress.evidence) scores[dietId].evidence += suppress.evidence
    if (suppress.feasibility) scores[dietId].feasibility += suppress.feasibility
    if (suppress.preference) scores[dietId].preference += suppress.preference
    if (suppress.safetyLevel) {
      if (suppress.safetyLevel === 'contraindicated') {
        scores[dietId].safetyLevel = 'contraindicated'
      } else if (suppress.safetyLevel === 'caution' && scores[dietId].safetyLevel === 'safe') {
        scores[dietId].safetyLevel = 'caution'
      }
    }
    if (suppress.note) scores[dietId].safetyNotes.push(suppress.note)
  }
}

// ========== Normalization ==========

export function normalizeScores(
  rawScores: Record<DietId, DietScores>
): Record<DietId, DietScores> {
  const diets = Object.keys(rawScores) as DietId[]

  // Find max for each pillar across all diets
  let maxE = 0
  let maxF = 0
  let maxP = 0

  for (const diet of diets) {
    if (rawScores[diet].evidence > maxE) maxE = rawScores[diet].evidence
    if (rawScores[diet].feasibility > maxF) maxF = rawScores[diet].feasibility
    if (rawScores[diet].preference > maxP) maxP = rawScores[diet].preference
  }

  // Normalize each diet's scores to 0-100
  const normalized: Record<DietId, DietScores> = {} as Record<DietId, DietScores>

  for (const diet of diets) {
    normalized[diet] = {
      ...rawScores[diet],
      evidence: maxE > 0 ? (rawScores[diet].evidence / maxE) * 100 : 50,
      feasibility: maxF > 0 ? (rawScores[diet].feasibility / maxF) * 100 : 50,
      preference: maxP > 0 ? (rawScores[diet].preference / maxP) * 100 : 50,
    }
  }

  return normalized
}

// ========== Final Score Calculation ==========

export function calculateFinalScore(
  scores: DietScores,
  weights: PillarWeights
): number {
  const weighted =
    scores.evidence * weights.evidence +
    scores.feasibility * weights.feasibility +
    scores.preference * weights.preference

  // Apply safety penalty
  if (scores.safetyLevel === 'caution') {
    return Math.round(weighted * 0.85) // 15% penalty
  }
  if (scores.safetyLevel === 'contraindicated') {
    return 0 // Hidden from results
  }

  return Math.round(weighted)
}

// ========== Generate Results ==========

export function generateResults(
  normalizedScores: Record<DietId, DietScores>,
  weights: PillarWeights
): DietResult[] {
  const results: DietResult[] = []

  for (const diet of ALL_DIETS) {
    const scores = normalizedScores[diet]
    const finalScore = calculateFinalScore(scores, weights)
    const isHidden = scores.safetyLevel === 'contraindicated'

    results.push({
      dietId: diet,
      finalScore,
      pillarScores: {
        evidence: Math.round(scores.evidence),
        feasibility: Math.round(scores.feasibility),
        preference: Math.round(scores.preference),
      },
      safetyLevel: scores.safetyLevel,
      safetyNotes: scores.safetyNotes,
      rank: 0, // Will be set after sorting
      isHidden,
    })
  }

  // Sort by final score descending
  results.sort((a, b) => b.finalScore - a.finalScore)

  // Assign ranks
  results.forEach((result, index) => {
    result.rank = index + 1
  })

  return results
}

// ========== Hybrid Detection ==========

export function detectHybrid(results: DietResult[]): HybridRecommendation | null {
  // Filter out hidden results
  const visibleResults = results.filter((r) => !r.isHidden)
  if (visibleResults.length < 2) return null

  const [first, second] = visibleResults

  // Check if close enough for hybrid (within 10 points)
  if (first.finalScore - second.finalScore > 10) return null

  // Check compatibility
  const compatible = hybridCompatibility[first.dietId]?.includes(second.dietId)
  if (!compatible) return null

  const key = `${first.dietId}+${second.dietId}`
  const reverseKey = `${second.dietId}+${first.dietId}`

  return {
    primaryDiet: first.dietId,
    secondaryDiet: second.dietId,
    label:
      hybridLabels[key] ||
      hybridLabels[reverseKey] ||
      `${getDietDisplayName(first.dietId)} with ${getDietDisplayName(second.dietId)} elements`,
    combinedScore: Math.round((first.finalScore + second.finalScore) / 2),
  }
}

// ========== Referral Decision ==========

export function calculateReferralDecision(
  userProfile: Partial<UserProfile>
): ReferralDecision {
  let referralScore = 0
  const reasons: string[] = []

  // Accumulate referral weight from conditions
  const conditions = userProfile.healthConditions || []
  for (const condition of conditions) {
    const rule = conditionRules[condition]
    if (!rule) continue

    if (rule.forceReferral) {
      return {
        showReferral: true,
        urgency: 'prominent',
        reason: `Your health profile (${formatCondition(condition)}) suggests working with a healthcare provider for personalized guidance.`,
      }
    }

    referralScore += rule.referralWeight
    if (rule.referralWeight > 0.3) {
      reasons.push(formatCondition(condition))
    }
  }

  // Relationship with food adds weight
  if (userProfile.relationshipWithFood === 'complicated') {
    referralScore += 0.5
    reasons.push('relationship with food')
  }

  // Multiple conditions compound
  if (conditions.length >= 2) {
    referralScore += 0.3
  }

  // Thresholds
  if (referralScore >= 0.8) {
    return {
      showReferral: true,
      urgency: 'prominent',
      reason: 'Given your health considerations, we recommend consulting with a registered dietitian or your healthcare provider.',
    }
  }

  if (referralScore >= 0.5) {
    return {
      showReferral: true,
      urgency: 'standard',
      reason: `Consider discussing dietary changes with your healthcare provider, especially regarding ${reasons.join(' and ')}.`,
    }
  }

  if (referralScore >= 0.2) {
    return {
      showReferral: true,
      urgency: 'subtle',
      reason: 'For personalized guidance, a registered dietitian can help fine-tune this approach for you.',
    }
  }

  return {
    showReferral: false,
    urgency: 'subtle',
    reason: '',
  }
}

// ========== Helper Functions ==========

export function getDietDisplayName(dietId: DietId): string {
  const names: Record<DietId, string> = {
    mediterranean: 'Mediterranean',
    dash: 'DASH',
    flexitarian: 'Flexitarian',
    wfpb: 'Whole Food Plant-Based',
    low_carb: 'Low-Carb',
    keto: 'Keto',
    intermittent_fasting: 'Intermittent Fasting',
    anti_inflammatory: 'Anti-Inflammatory',
    intuitive_eating: 'Intuitive Eating',
    zone_macro: 'Zone/Balanced Macro',
  }
  return names[dietId] || dietId
}

function formatCondition(condition: HealthCondition): string {
  const names: Record<HealthCondition, string> = {
    hypertension: 'high blood pressure',
    heart_disease: 'heart disease',
    type2_diabetes: 'type 2 diabetes',
    type1_diabetes: 'type 1 diabetes',
    kidney_disease: 'kidney disease',
    digestive_issues: 'digestive issues',
    autoimmune: 'autoimmune conditions',
    inflammation: 'chronic inflammation',
    mental_health: 'mental health considerations',
    pregnancy: 'pregnancy',
  }
  return names[condition] || condition
}
