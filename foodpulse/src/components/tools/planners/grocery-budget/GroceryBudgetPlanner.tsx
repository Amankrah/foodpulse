'use client'

import { useState, useCallback, useMemo } from 'react'
import { ShoppingCart, Calculator, Scale, Sparkles } from 'lucide-react'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { AnimatePresence, motion } from 'framer-motion'
import type { PlannerStep, PlannerState, SelectedItem } from './types'
import { dietBudgetTemplates } from './data/dietTemplates'
import { allocationToCategoryBudgets } from './utils/calculations'
import { computeResults } from './utils/calculations'
import { SetupStep } from './steps/SetupStep'
import { AllocationStep } from './steps/AllocationStep'
import { SelectionStep } from './steps/SelectionStep'
import { ResultsStep } from './steps/ResultsStep'

const STEPS: PlannerStep[] = ['setup', 'allocation', 'selection', 'results']

function getInitialState(): PlannerState {
  const weeklyBudget = 125
  const allocation = dietBudgetTemplates.balanced
  const categoryBudgets = allocationToCategoryBudgets(allocation, weeklyBudget)
  return {
    currentStep: 'setup',
    household: {
      adults: 2,
      children: 0,
      childAges: [],
      activityLevel: 'moderate',
    },
    weeklyBudget,
    budgetTier: 'moderate',
    dietaryApproach: 'balanced',
    specialNeeds: {
      packLunches: false,
      frequentGuests: false,
      splitDiets: false,
    },
    categoryBudgets,
    useRecommendedAllocation: true,
    selectedItems: [],
    customItems: [],
  }
}

export function GroceryBudgetPlanner() {
  const [state, setState] = useState<PlannerState>(getInitialState)

  const goTo = useCallback((step: PlannerStep) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }, [])

  const handleSetupNext = useCallback(() => {
    setState((prev) => {
      const template = dietBudgetTemplates[prev.dietaryApproach] ?? dietBudgetTemplates.balanced
      const categoryBudgets = allocationToCategoryBudgets(template, prev.weeklyBudget)
      return { ...prev, categoryBudgets, useRecommendedAllocation: true, currentStep: 'allocation' }
    })
  }, [])

  const handleAllocationNext = useCallback(() => {
    goTo('selection')
  }, [goTo])

  const handleSelectionNext = useCallback(() => {
    goTo('results')
  }, [goTo])

  const results = useMemo(() => {
    const selected = state.selectedItems.filter((i) => i.isSelected)
    return computeResults(
      selected,
      state.categoryBudgets,
      state.weeklyBudget,
      state.household.adults || 1
    )
  }, [state.selectedItems, state.categoryBudgets, state.weeklyBudget, state.household.adults])

  const relatedTools = [
    { title: 'Calorie Calculator', slug: 'calorie-calculator', icon: <Calculator className="w-5 h-5" /> },
    { title: 'Macro Calculator', slug: 'macro-calculator', icon: <Scale className="w-5 h-5" /> },
    { title: 'What Diet Quiz', slug: 'diet-quiz', icon: <Sparkles className="w-5 h-5" /> },
  ]

  return (
    <ToolLayout
      title="Grocery Budget Planner"
      description="Plan your weekly grocery spending with diet-aware allocation, smart categories, and a prioritized shopping list. Spend smarter on healthy food."
      icon={<ShoppingCart className="w-8 h-8" />}
      slug="grocery-budget"
      relatedTools={relatedTools}
    >
      <div className="min-h-[600px]">
        {/* Step indicator */}
        <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {STEPS.map((step, i) => {
              const idx = STEPS.indexOf(state.currentStep)
              const isActive = state.currentStep === step
              const isPast = i < idx
              return (
                <div key={step} className="flex items-center gap-2">
                  {i > 0 && <div className={`w-6 h-0.5 ${isPast ? 'bg-green-500' : 'bg-neutral-200'}`} />}
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      isActive ? 'bg-green-600 text-white' : isPast ? 'bg-green-100 text-green-700' : 'text-neutral-500'
                    }`}
                  >
                    {i + 1}. {step === 'setup' ? 'Setup' : step === 'allocation' ? 'Allocation' : step === 'selection' ? 'Items' : 'Results'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {state.currentStep === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SetupStep
                household={state.household}
                weeklyBudget={state.weeklyBudget}
                budgetTier={state.budgetTier}
                dietaryApproach={state.dietaryApproach}
                specialNeeds={state.specialNeeds}
                onHouseholdChange={(h) => setState((prev) => ({ ...prev, household: h }))}
                onWeeklyBudgetChange={(n) => setState((prev) => ({ ...prev, weeklyBudget: n }))}
                onBudgetTierChange={(t) => setState((prev) => ({ ...prev, budgetTier: t }))}
                onDietaryChange={(d) => setState((prev) => ({ ...prev, dietaryApproach: d }))}
                onSpecialNeedsChange={(s) => setState((prev) => ({ ...prev, specialNeeds: s }))}
                onNext={handleSetupNext}
              />
            </motion.div>
          )}

          {state.currentStep === 'allocation' && (
            <motion.div
              key="allocation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <AllocationStep
                categoryBudgets={state.categoryBudgets}
                weeklyBudget={state.weeklyBudget}
                dietaryApproach={state.dietaryApproach}
                useRecommended={state.useRecommendedAllocation}
                onCategoryBudgetsChange={(b) => setState((prev) => ({ ...prev, categoryBudgets: b }))}
                onUseRecommendedChange={(u) => setState((prev) => ({ ...prev, useRecommendedAllocation: u }))}
                onBack={() => goTo('setup')}
                onNext={handleAllocationNext}
              />
            </motion.div>
          )}

          {state.currentStep === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SelectionStep
                selectedItems={state.selectedItems}
                categoryBudgets={state.categoryBudgets}
                dietaryApproach={state.dietaryApproach}
                onSelectedItemsChange={(items) => setState((prev) => ({ ...prev, selectedItems: items }))}
                onBack={() => goTo('allocation')}
                onNext={handleSelectionNext}
              />
            </motion.div>
          )}

          {state.currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ResultsStep
                results={results}
                weeklyBudget={state.weeklyBudget}
                householdAdults={state.household.adults || 1}
                onStartOver={() => setState(getInitialState())}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolLayout>
  )
}
