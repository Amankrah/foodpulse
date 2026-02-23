'use client'

import { motion } from 'framer-motion'
import {
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Calculator,
  BookOpen,
  ExternalLink,
  UtensilsCrossed,
  BookMarked,
  ShoppingCart,
} from 'lucide-react'
import Link from 'next/link'
import type { QuizResults, DietResult, RoadmapPhase, PredictedBarrier } from '@/types/diet-quiz'
import { DIET_PROFILES } from '@/lib/diet-quiz/diet-profiles'
import { getDietDisplayName } from '@/lib/diet-quiz/scoring-engine'

interface ResultsViewProps {
  results: QuizResults
  onRetake: () => void
}

export function ResultsView({ results, onRetake }: ResultsViewProps) {
  const primaryDiet = DIET_PROFILES[results.primaryMatch.dietId]
  const visibleResults = results.allResults.filter((r) => !r.isHidden).slice(0, 6)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      {/* Primary Match Hero */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="text-6xl mb-4"
        >
          {primaryDiet.icon}
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          Your Ideal Dietary Approach
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-block px-6 py-3 bg-green-100 rounded-full"
        >
          <span className="text-2xl font-bold text-green-700">
            {results.hybridRecommendation
              ? results.hybridRecommendation.label
              : primaryDiet.name}
          </span>
        </motion.div>
        <p className="text-lg text-neutral-600 mt-4 max-w-xl mx-auto">
          {primaryDiet.tagline}
        </p>
      </div>

      {/* Referral Banner if needed */}
      {results.referralDecision.showReferral && (
        <ReferralBanner
          urgency={results.referralDecision.urgency}
          reason={results.referralDecision.reason}
        />
      )}

      {/* Personal Fit Score */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">
            Personal Fit Score
          </h2>
          <div className="text-3xl font-bold text-green-600">
            {results.personalFitScore}
            <span className="text-lg text-neutral-400">/100</span>
          </div>
        </div>
        <div className="h-4 bg-neutral-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${results.personalFitScore}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
          />
        </div>
        <p className="text-sm text-neutral-500 mt-2">
          Based on your lifestyle, preferences, and constraints. Success depends
          on consistency and life changes.
        </p>
      </div>

      {/* Compatibility Spectrum */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">
          Your Dietary Compatibility Profile
        </h2>
        <CompatibilityChart results={visibleResults} />
      </div>

      {/* Why This Works For You */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">
          Why {primaryDiet.name} Works for You
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-4">
          {results.personalizedInsights}
        </p>
        <div className="flex flex-wrap gap-2">
          {primaryDiet.keyAttributes.map((attr) => (
            <span
              key={attr}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
            >
              {attr}
            </span>
          ))}
        </div>
      </div>

      {/* Predicted Barriers */}
      {results.predictedBarriers.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Predicted Barriers & Solutions
          </h2>
          <div className="space-y-4">
            {results.predictedBarriers.map((barrier, index) => (
              <BarrierCard key={index} barrier={barrier} />
            ))}
          </div>
        </div>
      )}

      {/* Implementation Roadmap */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">
          Your Personalized Roadmap
        </h2>
        <RoadmapTimeline phases={results.roadmap} />
      </div>

      {/* Recommended Tools */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">
          Your FoodPulse Toolkit
        </h2>
        <p className="text-neutral-600 mb-4">
          Based on your profile, these tools will help you get started:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Calculators */}
          <div className="p-4 bg-neutral-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-neutral-900">Calculators</h3>
            </div>
            <div className="space-y-2">
              {results.recommendedTools.calculators.map((tool) => (
                <Link
                  key={tool}
                  href={`/tools/${tool}`}
                  className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-green-50 transition-colors group"
                >
                  <span className="text-neutral-700 group-hover:text-green-700">
                    {formatToolName(tool)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-green-600" />
                </Link>
              ))}
            </div>
          </div>

          {/* Reading */}
          <div className="p-4 bg-neutral-50 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-neutral-900">Recommended Reading</h3>
            </div>
            <div className="space-y-2">
              {results.recommendedTools.articles.slice(0, 3).map((article, i) => (
                <Link
                  key={i}
                  href={article}
                  className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-green-50 transition-colors group"
                >
                  <span className="text-neutral-700 group-hover:text-green-700 text-sm">
                    {formatArticleTitle(article)}
                  </span>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-green-600" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recipes */}
          {results.recommendedTools.recipes?.length > 0 && (
            <div className="p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <UtensilsCrossed className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-neutral-900">Recipes</h3>
              </div>
              <div className="space-y-2">
                {results.recommendedTools.recipes.map((recipe, i) => (
                  <Link
                    key={i}
                    href={recipe}
                    className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <span className="text-neutral-700 group-hover:text-green-700 text-sm">
                      {formatRecipeTitle(recipe)}
                    </span>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-green-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Guides */}
          {results.recommendedTools.guides?.length > 0 && (
            <div className="p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <BookMarked className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-neutral-900">Guides</h3>
              </div>
              <div className="space-y-2">
                {results.recommendedTools.guides.map((guide, i) => (
                  <Link
                    key={i}
                    href={guide}
                    className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-green-50 transition-colors group"
                  >
                    <span className="text-neutral-700 group-hover:text-green-700 text-sm">
                      {formatGuideTitle(guide)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-green-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Grocery Budget Planner CTA */}
        <Link
          href={`/tools/grocery-budget?diet=${encodeURIComponent(results.primaryMatch.dietId)}`}
          className="mt-6 flex items-center gap-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 hover:border-green-300 transition-colors group"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-green-700" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-green-900 group-hover:text-green-800">
              Plan your grocery budget
            </h3>
            <p className="text-sm text-green-700 mt-0.5">
              Get a weekly shopping list and budget allocation tailored to {primaryDiet.name}. We&apos;ll pre-fill your diet and suggest swaps to save.
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-green-600 flex-shrink-0" />
        </Link>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRetake}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-neutral-300 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Retake Quiz
        </button>
        <Link
          href="/tools"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
        >
          Explore All Tools
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  )
}

// ========== Sub-components ==========

function ReferralBanner({
  urgency,
  reason,
}: {
  urgency: 'prominent' | 'standard' | 'subtle'
  reason: string
}) {
  const bgColor =
    urgency === 'prominent'
      ? 'bg-amber-50 border-amber-200'
      : urgency === 'standard'
        ? 'bg-blue-50 border-blue-200'
        : 'bg-neutral-50 border-neutral-200'

  const iconColor =
    urgency === 'prominent'
      ? 'text-amber-600'
      : urgency === 'standard'
        ? 'text-blue-600'
        : 'text-neutral-600'

  return (
    <div className={`rounded-xl border p-4 mb-8 ${bgColor}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className={`w-5 h-5 mt-0.5 ${iconColor}`} />
        <div>
          <h3 className="font-semibold text-neutral-900 mb-1">
            Professional Guidance Recommended
          </h3>
          <p className="text-neutral-600 text-sm">{reason}</p>
        </div>
      </div>
    </div>
  )
}

function CompatibilityChart({ results }: { results: DietResult[] }) {
  return (
    <div className="space-y-4">
      {results.map((result, index) => {
        const diet = DIET_PROFILES[result.dietId]
        const isFirst = index === 0

        return (
          <motion.div
            key={result.dietId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{diet.icon}</span>
                <span
                  className={`font-medium ${
                    isFirst ? 'text-green-700' : 'text-neutral-700'
                  }`}
                >
                  {getDietDisplayName(result.dietId)}
                </span>
                {isFirst && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Best Match
                  </span>
                )}
                {result.safetyLevel === 'caution' && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    Caution
                  </span>
                )}
              </div>
              <span
                className={`font-semibold ${
                  isFirst ? 'text-green-600' : 'text-neutral-600'
                }`}
              >
                {result.finalScore}%
              </span>
            </div>
            <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.finalScore}%` }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className={`h-full rounded-full ${
                  isFirst
                    ? 'bg-gradient-to-r from-green-400 to-green-600'
                    : result.safetyLevel === 'caution'
                      ? 'bg-amber-400'
                      : 'bg-neutral-400'
                }`}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function BarrierCard({ barrier }: { barrier: PredictedBarrier }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-neutral-900 mb-1">{barrier.barrier}</h4>
        <p className="text-sm text-neutral-600 mb-2">{barrier.solution}</p>
        {barrier.resourceLink && (
          <Link
            href={barrier.resourceLink}
            className="text-sm text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1"
          >
            Learn more
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  )
}

function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-200" />

      <div className="space-y-6">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="relative pl-12"
          >
            {/* Phase dot */}
            <div className="absolute left-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {phase.phase}
            </div>

            <div className="bg-neutral-50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-neutral-900">
                    Phase {phase.phase}: {phase.title}
                  </h4>
                  <p className="text-sm text-neutral-500">
                    Weeks {phase.weeks} | {phase.focus}
                  </p>
                </div>
                <DifficultyDots difficulty={phase.difficulty} />
              </div>
              <p className="text-neutral-600 text-sm mb-2">{phase.keyChange}</p>
              <p className="text-xs text-neutral-500">
                Time investment: {phase.timeInvestment}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DifficultyDots({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex gap-1" title={`Difficulty: ${difficulty}/5`}>
      {[1, 2, 3, 4, 5].map((level) => (
        <div
          key={level}
          className={`w-2 h-2 rounded-full ${
            level <= difficulty ? 'bg-green-500' : 'bg-neutral-200'
          }`}
        />
      ))}
    </div>
  )
}

// ========== Helpers ==========

function formatToolName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatArticleTitle(path: string): string {
  const slug = path.split('/').pop() || path
  return slug
    .replace(/[?&].*/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatRecipeTitle(path: string): string {
  const url = path.replace(/^\?/, '')
  const params = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '')
  const parts: string[] = []
  const tag = params.get('tag')
  const time = params.get('time')
  if (tag) parts.push(tag.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
  if (time === 'under-30') parts.push('Under 30 min')
  return parts.length ? parts.join(' · ') : 'Recipes'
}

function formatGuideTitle(path: string): string {
  const slug = path.split('/').filter(Boolean).pop() || path
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
