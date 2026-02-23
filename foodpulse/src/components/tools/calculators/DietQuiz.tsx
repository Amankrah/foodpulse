'use client'

import { useState, useCallback, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, Calculator, TrendingUp } from 'lucide-react'
import { ToolLayout } from '../ToolLayout'
import {
  ProgressIndicator,
  QuestionCard,
  WelcomeScreen,
  ResultsView,
} from '../quiz'
import {
  QUIZ_QUESTIONS,
  ANSWER_IMPACTS,
  DIET_PROFILES,
  initializeScores,
  applyAnswerImpact,
  applyConditionRules,
  applyRelationshipRules,
  normalizeScores,
  generateResults,
  detectHybrid,
  calculateReferralDecision,
  getWeights,
  generateRoadmap,
  generateBarriers,
  getTimelineProfileKey,
  getFoodEnjoymentImpactKeys,
} from '@/lib/diet-quiz'
import type {
  QuizSection,
  QuizState,
  QuizResults,
  HealthCondition,
  UserProfile,
  DietId,
} from '@/types/diet-quiz'

const INITIAL_STATE: QuizState = {
  currentSection: 'welcome',
  currentQuestionIndex: 0,
  answers: {},
  userProfile: {},
  metadata: {
    startTime: Date.now(),
    completedSections: [],
    skippedOptional: false,
  },
}

export function DietQuiz() {
  const [state, setState] = useState<QuizState>(INITIAL_STATE)
  const [results, setResults] = useState<QuizResults | null>(null)

  // Current question
  const currentQuestion = QUIZ_QUESTIONS[state.currentQuestionIndex]

  // Calculate progress
  const totalQuestions = QUIZ_QUESTIONS.length

  // Handle starting the quiz
  const handleStart = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentSection: 'quick',
      metadata: {
        ...prev.metadata,
        startTime: Date.now(),
      },
    }))
  }, [])

  // Handle answer selection
  const handleAnswer = useCallback(
    (value: string | string[]) => {
      if (!currentQuestion) return

      setState((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: value,
        },
      }))
    },
    [currentQuestion]
  )

  // Calculate final results (defined before handleNext which uses it)
  const calculateResults = useCallback(() => {
    const scores = initializeScores()

    // Apply answer impacts for each question
    for (const [questionId, answer] of Object.entries(state.answers)) {
      let answerValues: string[] = Array.isArray(answer) ? answer : answer ? [answer] : []

      // Q4: timeline selector → map to profile key
      if (questionId === 'q4_weekday_meals' && answerValues.length === 1 && answerValues[0]?.startsWith('{')) {
        const profileKey = getTimelineProfileKey(answerValues[0])
        if (profileKey) answerValues = [profileKey]
      }
      // Q13: slider → map to one or more impact keys
      if (questionId === 'q13_food_enjoyment' && answerValues.length === 1 && /^\d+,\d+,\d+/.test(answerValues[0] ?? '')) {
        answerValues = getFoodEnjoymentImpactKeys(answerValues[0])
      }

      for (const value of answerValues) {
        const impact = ANSWER_IMPACTS[questionId]?.[value]
        if (impact) {
          applyAnswerImpact(scores, {
            evidence: impact.evidence,
            feasibility: impact.feasibility,
            preference: impact.preference,
          })
        }
      }
    }

    // Build user profile from answers
    const userProfile = buildUserProfile(state.answers)

    // Apply condition rules
    if (userProfile.healthConditions && userProfile.healthConditions.length > 0) {
      applyConditionRules(scores, userProfile.healthConditions)
    }

    // Apply relationship with food rules
    if (userProfile.relationshipWithFood) {
      applyRelationshipRules(scores, userProfile.relationshipWithFood)
    }

    // Normalize scores
    const normalizedScores = normalizeScores(scores)

    // Get weights based on user profile
    const weights = getWeights(userProfile)

    // Generate ranked results
    const allResults = generateResults(normalizedScores, weights)

    // Detect hybrid recommendation
    const hybridRecommendation = detectHybrid(allResults)

    // Get primary match
    const primaryMatch = allResults[0]

    // Calculate referral decision
    const referralDecision = calculateReferralDecision(userProfile)

    // Generate personalized insights
    const insights = generatePersonalizedInsights(userProfile, primaryMatch.dietId)

    // Generate roadmap
    const roadmap = generateRoadmap(primaryMatch.dietId)

    // Generate barriers
    const predictedBarriers = generateBarriers(
      userProfile.biggestChallenges || [],
      (state.answers.q12_kitchen_cooking as string[]) || [],
      userProfile.eatingCompanions || []
    )

    // Generate recommended tools
    const recommendedTools = generateRecommendedTools(primaryMatch.dietId, userProfile)

    // Calculate personal fit score (evidence + feasibility + preference per guide)
    const personalFitScore = Math.round(
      (primaryMatch.pillarScores.evidence +
        primaryMatch.pillarScores.feasibility +
        primaryMatch.pillarScores.preference) / 3
    )

    const quizResults: QuizResults = {
      primaryMatch,
      hybridRecommendation,
      allResults,
      personalFitScore,
      predictedBarriers,
      roadmap,
      referralDecision,
      personalizedInsights: insights,
      recommendedTools,
    }

    setResults(quizResults)
    try {
      localStorage.setItem(
        'foodpulse_diet_quiz_result',
        JSON.stringify({
          dietId: primaryMatch.dietId,
          savedAt: Date.now(),
        })
      )
    } catch {
      // ignore localStorage errors
    }
    setState((prev) => ({
      ...prev,
      currentSection: 'results',
      metadata: {
        ...prev.metadata,
        completedSections: [...prev.metadata.completedSections, 'core'],
      },
    }))
  }, [state.answers])

  // Handle navigation
  const handleNext = useCallback(() => {
    if (!currentQuestion) return

    const currentIndex = state.currentQuestionIndex
    const isLastQuestion = currentIndex >= QUIZ_QUESTIONS.length - 1

    if (isLastQuestion) {
      // Calculate results
      calculateResults()
    } else {
      // Move to next question
      const nextQuestion = QUIZ_QUESTIONS[currentIndex + 1]
      const nextSection = nextQuestion.section as QuizSection

      setState((prev) => {
        const completedSections = [...prev.metadata.completedSections]
        if (
          currentQuestion.section !== nextSection &&
          !completedSections.includes(currentQuestion.section as QuizSection)
        ) {
          completedSections.push(currentQuestion.section as QuizSection)
        }

        return {
          ...prev,
          currentQuestionIndex: currentIndex + 1,
          currentSection: nextSection,
          metadata: {
            ...prev.metadata,
            completedSections,
          },
        }
      })
    }
  }, [state.currentQuestionIndex, currentQuestion, calculateResults])

  const handleBack = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      const prevQuestion = QUIZ_QUESTIONS[state.currentQuestionIndex - 1]
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        currentSection: prevQuestion.section as QuizSection,
      }))
    }
  }, [state.currentQuestionIndex])

  // Handle retaking the quiz
  const handleRetake = useCallback(() => {
    setState(INITIAL_STATE)
    setResults(null)
  }, [])

  // Related tools for the layout
  const relatedTools = useMemo(
    () => [
      {
        title: 'Macro Calculator',
        slug: 'macro-calculator',
        icon: <Calculator className="w-5 h-5" />,
      },
      {
        title: 'Calorie Calculator',
        slug: 'calorie-calculator',
        icon: <TrendingUp className="w-5 h-5" />,
      },
    ],
    []
  )

  return (
    <ToolLayout
      title="What Diet Quiz"
      description="Discover your ideal dietary approach based on your unique lifestyle, values, health needs, and practical constraints."
      icon={<Sparkles className="w-8 h-8" />}
      slug="diet-quiz"
      relatedTools={relatedTools}
      educationalContent={state.currentSection === 'results' ? undefined : undefined}
    >
      <div className="p-6 md:p-8 min-h-[600px]">
        {/* Progress Indicator */}
        {state.currentSection !== 'welcome' && state.currentSection !== 'results' && (
          <div className="mb-8">
            <ProgressIndicator
              currentSection={state.currentSection}
              currentQuestionIndex={state.currentQuestionIndex}
              totalQuestions={totalQuestions}
              completedSections={state.metadata.completedSections}
            />
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {state.currentSection === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <WelcomeScreen onStart={handleStart} />
            </motion.div>
          )}

          {(state.currentSection === 'quick' || state.currentSection === 'core') &&
            currentQuestion && (
              <motion.div
                key={`question-${state.currentQuestionIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <QuestionCard
                  question={currentQuestion}
                  value={state.answers[currentQuestion.id] || (currentQuestion.type === 'multi_select' ? [] : '')}
                  onChange={handleAnswer}
                  onNext={handleNext}
                  onBack={handleBack}
                  isFirst={state.currentQuestionIndex === 0}
                  isLast={state.currentQuestionIndex === QUIZ_QUESTIONS.length - 1}
                  questionNumber={state.currentQuestionIndex + 1}
                  totalQuestions={totalQuestions}
                />
              </motion.div>
            )}

          {state.currentSection === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultsView results={results} onRetake={handleRetake} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  )
}

// ========== Helper Functions ==========

function buildUserProfile(answers: Record<string, string | string[]>): Partial<UserProfile> {
  const profile: Partial<UserProfile> = {
    healthConditions: [],
    pastDietSuccess: [],
    pastDietFailure: [],
    foodRestrictions: [],
    eatingCompanions: [],
    biggestChallenges: [],
  }

  // Primary goal
  profile.primaryGoal = answers.q1_primary_goal as string

  // Biggest challenges
  const challenges = answers.q3_biggest_challenge
  if (Array.isArray(challenges)) {
    profile.biggestChallenges = challenges
    // Check for emotional eating
    if (challenges.includes('emotional_eating')) {
      profile.relationshipWithFood = 'emotional'
    }
  }

  // Time available
  profile.timeAvailable = answers.q5_time_available as UserProfile['timeAvailable']

  // Eating companions
  const companions = answers.q6_eating_companions
  if (Array.isArray(companions)) {
    profile.eatingCompanions = companions
  }

  // Structure preference: map Q8 answer values to StructurePreference type
  const q8ToStructure: Record<string, UserProfile['structurePreference']> = {
    structured_predictable: 'strict',
    flexible_guidelines: 'flexible',
    intuitive_unrestricted: 'intuitive',
    socially_integrated: 'social',
    optimized_measured: 'optimized',
  }
  const q8 = answers.q8_ideal_eating_style as string
  profile.structurePreference = q8ToStructure[q8] ?? 'flexible'

  // Health conditions - now using direct condition names from Q9
  const healthConditions = answers.q9_health_conditions
  if (Array.isArray(healthConditions) && !healthConditions.includes('none')) {
    profile.healthConditions = healthConditions.map((c) => {
      // Map answer values to HealthCondition types
      const conditionMap: Record<string, HealthCondition> = {
        hypertension: 'hypertension',
        heart_disease: 'heart_disease',
        type2_diabetes: 'type2_diabetes',
        type1_diabetes: 'type1_diabetes',
        kidney_disease: 'kidney_disease',
        digestive: 'digestive_issues',
        autoimmune: 'autoimmune',
        joint_pain: 'inflammation',
        pregnancy: 'pregnancy',
        mental_health: 'mental_health',
      }
      return conditionMap[c] || c
    }) as HealthCondition[]
  }

  // Food restrictions
  const restrictions = answers.q10_food_restrictions
  if (Array.isArray(restrictions) && !restrictions.includes('none')) {
    profile.foodRestrictions = restrictions
  }

  // Budget
  profile.budget = answers.q11_budget as UserProfile['budget']

  // Cooking skills
  const kitchenAnswers = answers.q12_kitchen_cooking
  if (Array.isArray(kitchenAnswers)) {
    if (kitchenAnswers.includes('beginner_cook')) {
      profile.cookingSkill = 'beginner'
    } else if (kitchenAnswers.includes('confident_cook')) {
      profile.cookingSkill = 'confident'
    }
  }

  // Food enjoyment / relationship (from single-select or slider "n1,n2,n3")
  const foodEnjoyment = answers.q13_food_enjoyment as string
  if (typeof foodEnjoyment === 'string') {
    if (foodEnjoyment === 'eat_to_live') {
      profile.relationshipWithFood = 'neutral'
    } else if (foodEnjoyment === 'live_to_eat') {
      profile.relationshipWithFood = 'positive'
    } else if (/^\d+,\d+,\d+/.test(foodEnjoyment)) {
      const n = parseInt(foodEnjoyment.split(',')[0] ?? '50', 10)
      if (n <= 33) profile.relationshipWithFood = 'neutral'
      else if (n >= 67) profile.relationshipWithFood = 'positive'
    }
  }

  // Past diet experience
  const pastExperience = answers.q14_past_diet_experience
  if (Array.isArray(pastExperience)) {
    const dietMap: Record<string, DietId> = {
      low_carb_worked: 'low_carb',
      low_carb_didnt_work: 'low_carb',
      vegetarian_worked: 'wfpb',
      vegetarian_didnt_work: 'wfpb',
      calorie_counting_worked: 'zone_macro',
      calorie_counting_didnt_work: 'zone_macro',
      fasting_worked: 'intermittent_fasting',
      fasting_didnt_work: 'intermittent_fasting',
      whole30_worked: 'anti_inflammatory',
      whole30_didnt_work: 'anti_inflammatory',
    }

    for (const exp of pastExperience) {
      const diet = dietMap[exp]
      if (diet) {
        if (exp.includes('worked') && !exp.includes('didnt')) {
          profile.pastDietSuccess = [...(profile.pastDietSuccess || []), diet]
        } else if (exp.includes('didnt_work')) {
          profile.pastDietFailure = [...(profile.pastDietFailure || []), diet]
        }
      }
    }
  }

  // Detect "complicated" relationship with food based on multiple signals
  const derails = answers.q15_derails_eating
  let complicatedSignals = 0

  // Signal 1: Primary goal is simplifying relationship with food
  if (profile.primaryGoal === 'simplify_relationship') {
    complicatedSignals += 2
  }

  // Signal 2: Emotional eating challenge
  if (profile.biggestChallenges?.includes('emotional_eating')) {
    complicatedSignals += 1
  }

  // Signal 3: Derails include stress/emotional triggers or all-or-nothing thinking
  if (Array.isArray(derails)) {
    if (derails.includes('stress_emotional')) complicatedSignals += 1
    if (derails.includes('all_or_nothing')) complicatedSignals += 1
  }

  // Signal 4: Multiple failed diets (3+)
  if ((profile.pastDietFailure?.length || 0) >= 3) {
    complicatedSignals += 1
  }

  // Signal 5: Mental health considerations selected
  if (profile.healthConditions?.includes('mental_health')) {
    complicatedSignals += 1
  }

  // Set relationship status based on signals
  // "complicated" needs strong evidence (3+ signals) for safety
  if (complicatedSignals >= 3) {
    profile.relationshipWithFood = 'complicated'
  } else if (complicatedSignals >= 1 && profile.relationshipWithFood !== 'positive') {
    profile.relationshipWithFood = 'emotional'
  }

  return profile
}

function generatePersonalizedInsights(
  profile: Partial<UserProfile>,
  dietId: DietId
): string {
  const diet = DIET_PROFILES[dietId]
  const parts: string[] = []

  // Goal alignment
  if (profile.primaryGoal) {
    const goalText: Record<string, string> = {
      weight_loss: 'goal of sustainable weight management',
      energy: 'focus on gaining energy and feeling more vibrant',
      health_markers: 'desire to improve your health markers',
      sustainability_ethics: 'values around sustainability and ethical eating',
      simplify_relationship: 'goal of simplifying your relationship with food',
      athletic_performance: 'athletic performance goals',
      just_curious: 'curiosity about finding the right approach',
    }
    parts.push(`Based on your ${goalText[profile.primaryGoal] || 'goals'}`)
  }

  // Structure preference (typed as StructurePreference)
  if (profile.structurePreference) {
    const structureText: Record<string, string> = {
      strict: 'preference for structure and clear rules',
      flexible: 'love of flexible guidelines over strict rules',
      intuitive: 'desire for intuitive, unrestricted eating',
      social: 'emphasis on eating as a social experience',
      optimized: 'data-driven, optimization mindset',
    }
    if (structureText[profile.structurePreference]) {
      parts.push(`your ${structureText[profile.structurePreference]}`)
    }
  }

  // Time constraint
  if (profile.timeAvailable) {
    if (profile.timeAvailable === 'under_30') {
      parts.push('limited time for food preparation')
    } else if (profile.timeAvailable === 'over_120') {
      parts.push('enjoyment of cooking and food preparation')
    }
  }

  // Family considerations
  if (profile.eatingCompanions?.includes('children') || profile.eatingCompanions?.includes('different_preferences')) {
    parts.push('need to accommodate different household preferences')
  }

  // Build the sentence
  let insight = ''
  if (parts.length > 0) {
    insight = `${parts.slice(0, -1).join(', ')}${parts.length > 1 ? ', and ' : ''}${parts[parts.length - 1]}, `
  }

  insight += `the ${diet.name} approach emerges as your strongest match. ${diet.description.split('.')[0]}.`

  return insight
}

function generateRecommendedTools(
  dietId: DietId,
  profile: Partial<UserProfile>
): QuizResults['recommendedTools'] {
  const calculators: string[] = ['macro-calculator', 'calorie-calculator']

  // Add specific calculators based on diet
  if (dietId === 'mediterranean' || dietId === 'dash') {
    calculators.push('fiber-calculator')
  }
  if (dietId === 'keto' || dietId === 'low_carb') {
    calculators.push('protein-calculator')
  }
  if (dietId === 'zone_macro') {
    calculators.push('protein-calculator')
  }

  // Add hydration for all
  if (!calculators.includes('hydration-calculator')) {
    calculators.push('hydration-calculator')
  }

  // Articles based on diet and profile
  const articles: string[] = []
  articles.push(`/articles?tag=${dietId.replace('_', '-')}`)
  if (profile.biggestChallenges?.includes('time')) {
    articles.push('/articles?tag=quick-meals')
  }
  if (profile.biggestChallenges?.includes('budget')) {
    articles.push('/articles?tag=budget-friendly')
  }
  if (profile.eatingCompanions?.includes('children')) {
    articles.push('/articles?tag=family-meals')
  }

  // Guides (meal prep, etc.)
  const guides: string[] = []
  if (profile.biggestChallenges?.includes('time')) {
    guides.push('/guides/meal-prep')
  }
  guides.push(`/guides/${dietId.replace('_', '-')}-getting-started`)

  // Recipes: filtered for diet, <30 min, family-friendly per guide
  const recipes: string[] = []
  const dietTag = dietId.replace('_', '-')
  const recipeParams = new URLSearchParams()
  recipeParams.set('tag', dietTag)
  if (profile.biggestChallenges?.includes('time')) {
    recipeParams.set('time', 'under-30')
  }
  recipes.push(`/recipes?${recipeParams.toString()}`)
  if (profile.eatingCompanions?.includes('children')) {
    recipes.push('/recipes?tag=family-friendly')
  }
  if (profile.biggestChallenges?.includes('time') && !recipes.some((r) => r.includes('under-30'))) {
    recipes.push('/recipes?time=under-30')
  }

  return {
    calculators: calculators.slice(0, 4),
    articles: articles.slice(0, 3),
    guides: guides.slice(0, 3),
    recipes: [...new Set(recipes)].slice(0, 3),
  }
}
