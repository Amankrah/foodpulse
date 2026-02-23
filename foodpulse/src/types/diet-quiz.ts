/**
 * Diet Quiz Type Definitions
 * Based on the Evidence-Based Modeling framework from DIET-QUIZ-DEVELOPMENT-GUIDE.md
 */

// ========== Core Diet Types ==========

export type DietId =
  | 'mediterranean'
  | 'dash'
  | 'flexitarian'
  | 'wfpb'
  | 'low_carb'
  | 'keto'
  | 'intermittent_fasting'
  | 'anti_inflammatory'
  | 'intuitive_eating'
  | 'zone_macro';

export type PillarType = 'evidence' | 'feasibility' | 'preference';

export type HealthCondition =
  | 'hypertension'
  | 'heart_disease'
  | 'type2_diabetes'
  | 'type1_diabetes'
  | 'kidney_disease'
  | 'digestive_issues'
  | 'autoimmune'
  | 'inflammation'
  | 'mental_health'
  | 'pregnancy';

export type SafetyLevel = 'safe' | 'caution' | 'contraindicated' | 'refer_rd';

// ========== Scoring Types ==========

export interface PillarScores {
  evidence: number;
  feasibility: number;
  preference: number;
}

export interface DietScores extends PillarScores {
  safetyLevel: SafetyLevel;
  safetyNotes: string[];
}

export interface DietResult {
  dietId: DietId;
  finalScore: number;
  pillarScores: PillarScores;
  safetyLevel: SafetyLevel;
  safetyNotes: string[];
  rank: number;
  isHidden: boolean;
}

export interface PillarWeights {
  evidence: number;
  feasibility: number;
  preference: number;
}

// ========== Question Types ==========

export type QuestionType =
  | 'single_select'
  | 'multi_select'
  | 'slider'
  | 'ranking'
  | 'timeline_selector';

export interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface TimelineSlot {
  id: string;
  label: string;
  options: QuestionOption[];
}

export interface SliderSpectrum {
  id: string;
  leftLabel: string;
  rightLabel: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: QuestionOption[];
  helpText?: string;
  section: 'quick' | 'core' | 'deep';
  dimension?: 'goals' | 'lifestyle' | 'values' | 'health' | 'practical' | 'preferences';
  maxSelections?: number; // For multi_select
  required?: boolean;
  /** For type 'timeline_selector': slots for morning/lunch/dinner etc. */
  timelineSlots?: TimelineSlot[];
  /** For type 'slider': spectrum rows (e.g. eat-to-live ↔ live-to-eat). */
  sliderSpectrums?: SliderSpectrum[];
}

// ========== Answer Impact Types ==========

export interface PillarImpact {
  evidence?: Partial<Record<DietId, number>>;
  feasibility?: Partial<Record<DietId, number>>;
  preference?: Partial<Record<DietId, number>>;
}

export interface AnswerImpact extends PillarImpact {
  setsCondition?: HealthCondition | 'diabetes_followup';
  referralWeight?: number;
}

export interface QuestionImpacts {
  [answerValue: string]: AnswerImpact;
}

// ========== User Profile Types ==========

export type TimeAvailable = 'under_30' | '30_60' | '60_120' | 'over_120';
export type BudgetLevel = 'tight' | 'moderate' | 'comfortable' | 'unlimited';
export type CookingSkill = 'beginner' | 'confident';
export type StructurePreference = 'strict' | 'flexible' | 'intuitive' | 'social' | 'optimized';
export type RelationshipWithFood = 'neutral' | 'positive' | 'emotional' | 'complicated';

export interface UserProfile {
  primaryGoal: string;
  healthConditions: HealthCondition[];
  timeAvailable: TimeAvailable;
  budget: BudgetLevel;
  cookingSkill: CookingSkill;
  structurePreference: StructurePreference;
  pastDietSuccess: DietId[];
  pastDietFailure: DietId[];
  relationshipWithFood: RelationshipWithFood;
  foodRestrictions: string[];
  eatingCompanions: string[];
  biggestChallenges: string[];
}

// ========== Condition Rules Types ==========

export interface ConditionBoost {
  evidence?: number;
  feasibility?: number;
  preference?: number;
  note?: string;
  safetyLevel?: SafetyLevel;
}

export interface ConditionRule {
  boost: Partial<Record<DietId, ConditionBoost>>;
  suppress: Partial<Record<DietId, ConditionBoost>>;
  requiresDisclaimer?: boolean;
  forceReferral?: boolean;
  referralWeight: number;
  specialNote?: string;
}

// ========== Referral Types ==========

export type ReferralUrgency = 'prominent' | 'standard' | 'subtle';

export interface ReferralDecision {
  showReferral: boolean;
  urgency: ReferralUrgency;
  reason: string;
}

// ========== Hybrid Recommendation Types ==========

export interface HybridRecommendation {
  primaryDiet: DietId;
  secondaryDiet: DietId;
  label: string;
  combinedScore: number;
}

// ========== Quiz State Types ==========

export type QuizSection = 'welcome' | 'quick' | 'core' | 'deep' | 'results';

export interface QuizState {
  currentSection: QuizSection;
  currentQuestionIndex: number;
  answers: Record<string, string | string[]>;
  userProfile: Partial<UserProfile>;
  metadata: {
    startTime: number;
    completedSections: QuizSection[];
    skippedOptional: boolean;
  };
}

// ========== Results Types ==========

export interface DietProfile {
  id: DietId;
  name: string;
  tagline: string;
  description: string;
  keyAttributes: string[];
  bestFor: string[];
  evidenceNotes: string;
  icon: string;
  color: string;
}

export interface PredictedBarrier {
  barrier: string;
  solution: string;
  resourceLink?: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  weeks: string;
  focus: string;
  keyChange: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  timeInvestment: string;
}

export interface QuizResults {
  primaryMatch: DietResult;
  hybridRecommendation: HybridRecommendation | null;
  allResults: DietResult[];
  personalFitScore: number;
  predictedBarriers: PredictedBarrier[];
  roadmap: RoadmapPhase[];
  referralDecision: ReferralDecision;
  personalizedInsights: string;
  recommendedTools: {
    calculators: string[];
    articles: string[];
    guides: string[];
    recipes: string[];
  };
}

// ========== Component Props Types ==========

export interface ProgressIndicatorProps {
  currentSection: QuizSection;
  currentQuestionIndex: number;
  totalQuestions: number;
  completedSections: QuizSection[];
}

export interface QuestionCardProps {
  question: QuizQuestion;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export interface ResultsViewProps {
  results: QuizResults;
  onRetake: () => void;
  onSaveResults?: () => void;
}

export interface CompatibilityChartProps {
  results: DietResult[];
  maxToShow?: number;
}

export interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
}

export interface BarrierCardProps {
  barrier: PredictedBarrier;
}
