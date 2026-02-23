'use client'

import type { FoodCategory, CategoryBudget } from '../types'
import { CATEGORY_LABELS, dietBudgetTemplates } from '../data/dietTemplates'
import { allocationToCategoryBudgets } from '../utils/calculations'

interface AllocationStepProps {
  categoryBudgets: Record<FoodCategory, CategoryBudget>
  weeklyBudget: number
  dietaryApproach: string
  useRecommended: boolean
  onCategoryBudgetsChange: (b: Record<FoodCategory, CategoryBudget>) => void
  onUseRecommendedChange: (use: boolean) => void
  onBack: () => void
  onNext: () => void
}

const CATEGORY_ORDER: FoodCategory[] = [
  'proteins',
  'produce_vegetables',
  'produce_fruits',
  'grains',
  'dairy',
  'fats_oils',
  'pantry',
  'frozen',
  'beverages',
]

export function AllocationStep({
  categoryBudgets,
  weeklyBudget,
  dietaryApproach,
  useRecommended,
  onCategoryBudgetsChange,
  onUseRecommendedChange,
  onBack,
  onNext,
}: AllocationStepProps) {
  const applyRecommended = () => {
    const template = dietBudgetTemplates[dietaryApproach] ?? dietBudgetTemplates.balanced
    onCategoryBudgetsChange(allocationToCategoryBudgets(template, weeklyBudget))
    onUseRecommendedChange(true)
  }

  const setPercentage = (cat: FoodCategory, pct: number) => {
    const newPct = Math.max(0, Math.min(100, pct))
    const current = { ...categoryBudgets }
    const othersSum = CATEGORY_ORDER.filter((c) => c !== cat).reduce((s, c) => s + current[c].percentage, 0)
    const remaining = 100 - newPct
    current[cat] = {
      percentage: newPct,
      amount: Math.round(weeklyBudget * (newPct / 100) * 100) / 100,
    }
    if (othersSum > 0 && remaining >= 0) {
      for (const c of CATEGORY_ORDER) {
        if (c !== cat) {
          const normalized = (current[c].percentage / othersSum) * remaining
          current[c] = {
            percentage: Math.round(normalized * 10) / 10,
            amount: Math.round(weeklyBudget * (normalized / 100) * 100) / 100,
          }
        }
      }
    }
    onCategoryBudgetsChange(current)
    onUseRecommendedChange(false)
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-1">Budget allocation</h2>
        <p className="text-neutral-600 text-sm">
          Allocate your weekly budget by category. Based on your dietary approach ({dietaryApproach.replace(/_/g, ' ')}).
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={applyRecommended}
          className="px-4 py-2 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 transition-colors text-sm font-medium"
        >
          Use recommended allocation
        </button>
        {!useRecommended && (
          <span className="text-sm text-neutral-500">You’re customizing. Click above to reset to recommended.</span>
        )}
      </div>

      <div className="space-y-6">
        {CATEGORY_ORDER.map((cat) => {
          const cb = categoryBudgets[cat]
          const pct = cb?.percentage ?? 0
          const amount = cb?.amount ?? 0
          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-neutral-800">{CATEGORY_LABELS[cat] ?? cat}</span>
                <span className="text-neutral-600">
                  {pct.toFixed(1)}% · ${amount.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={pct}
                onChange={(e) => setPercentage(cat, parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-neutral-200 accent-green-600"
                aria-label={`${CATEGORY_LABELS[cat]} allocation`}
              />
            </div>
          )
        })}
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
        >
          Continue to item selection
        </button>
      </div>
    </div>
  )
}
