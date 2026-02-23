/**
 * Diet Quiz Library
 * Central export point for all diet quiz utilities.
 */

// Scoring Engine
export {
  ALL_DIETS,
  getWeights,
  conditionRules,
  hybridCompatibility,
  hybridLabels,
  initializeScores,
  applyAnswerImpact,
  applyConditionRules,
  applyRelationshipRules,
  normalizeScores,
  calculateFinalScore,
  generateResults,
  detectHybrid,
  calculateReferralDecision,
  getDietDisplayName,
} from './scoring-engine'

// Questions
export {
  QUIZ_QUESTIONS,
  ANSWER_IMPACTS,
  getQuestionsBySection,
  getQuestionById,
  getAnswerImpacts,
  getTotalQuestions,
  getSectionQuestionCount,
  getTimelineProfileKey,
  getFoodEnjoymentImpactKeys,
} from './questions'

// Diet Profiles
export {
  DIET_PROFILES,
  generateRoadmap,
  BARRIER_TEMPLATES,
  generateBarriers,
} from './diet-profiles'
