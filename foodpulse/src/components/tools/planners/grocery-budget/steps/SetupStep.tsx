'use client'

import { useMemo } from 'react'
import { NumberInput } from '@/components/tools/shared/NumberInput'
import { SelectInput } from '@/components/tools/shared/SelectInput'
import type { HouseholdConfig, SpecialNeeds, BudgetTier } from '../types'
import { dietBudgetTemplates } from '../data/dietTemplates'

const DEFAULT_CHILD_AGE = 8
const MIN_CHILD_AGE = 0
const MAX_CHILD_AGE = 18

interface SetupStepProps {
  household: HouseholdConfig
  weeklyBudget: number
  budgetTier: BudgetTier
  dietaryApproach: string
  specialNeeds: SpecialNeeds
  onHouseholdChange: (h: HouseholdConfig) => void
  onWeeklyBudgetChange: (n: number) => void
  onBudgetTierChange: (t: BudgetTier) => void
  onDietaryChange: (d: string) => void
  onSpecialNeedsChange: (s: SpecialNeeds) => void
  onNext: () => void
}

const budgetTierOptions: { value: BudgetTier; label: string; range: string }[] = [
  { value: 'tight', label: 'Tight', range: '$50–75/week for 2' },
  { value: 'moderate', label: 'Moderate', range: '$100–150/week for 2' },
  { value: 'comfortable', label: 'Comfortable', range: '$150–200/week for 2' },
  { value: 'flexible', label: 'Flexible', range: '$200+/week for 2' },
]

const dietOptions = Object.keys(dietBudgetTemplates).map((id) => ({
  value: id,
  label: id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
}))

export function SetupStep({
  household,
  weeklyBudget,
  budgetTier,
  dietaryApproach,
  specialNeeds,
  onHouseholdChange,
  onWeeklyBudgetChange,
  onBudgetTierChange,
  onDietaryChange,
  onSpecialNeedsChange,
  onNext,
}: SetupStepProps) {
  const setBudgetFromTier = (t: BudgetTier) => {
    onBudgetTierChange(t)
    const defaults: Record<BudgetTier, number> = {
      tight: 65,
      moderate: 125,
      comfortable: 175,
      flexible: 225,
    }
    onWeeklyBudgetChange(defaults[t])
  }

  const handleChildrenChange = (n: number) => {
    const count = Math.max(0, Math.min(10, Math.round(n)))
    const prevAges = household.childAges
    const newAges =
      count >= prevAges.length
        ? [...prevAges, ...Array(count - prevAges.length).fill(DEFAULT_CHILD_AGE)]
        : prevAges.slice(0, count)
    onHouseholdChange({ ...household, children: count, childAges: newAges })
  }

  const handleChildAgeChange = (index: number, age: number) => {
    const clamped = Math.max(MIN_CHILD_AGE, Math.min(MAX_CHILD_AGE, Math.round(age)))
    const newAges = [...household.childAges]
    newAges[index] = clamped
    onHouseholdChange({ ...household, childAges: newAges })
  }

  const childAgesPadded = useMemo(() => {
    const ages = household.childAges
    const count = household.children
    if (count <= 0) return []
    const padded = [...ages]
    while (padded.length < count) padded.push(DEFAULT_CHILD_AGE)
    return padded.slice(0, count)
  }, [household.children, household.childAges])

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-1">Household setup</h2>
        <p className="text-neutral-600 text-sm">We use this to suggest a budget and portion sizes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <NumberInput
          label="Adults"
          value={household.adults}
          onChange={(n) => onHouseholdChange({ ...household, adults: Math.max(0, Math.min(10, Math.round(n))) })}
          min={1}
          max={10}
        />
        <NumberInput
          label="Children"
          value={household.children}
          onChange={handleChildrenChange}
          min={0}
          max={10}
        />
      </div>

      {household.children > 0 && (
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Children&apos;s ages (years)</h3>
          <p className="text-neutral-500 text-sm mb-3">Used to estimate portion sizes and suggested budget.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {childAgesPadded.map((age, index) => (
              <NumberInput
                key={index}
                label={`Child ${index + 1}`}
                value={age}
                onChange={(n) => handleChildAgeChange(index, n)}
                min={MIN_CHILD_AGE}
                max={MAX_CHILD_AGE}
              />
            ))}
          </div>
        </div>
      )}

      <SelectInput
        label="Activity level"
        value={household.activityLevel}
        onChange={(v) => onHouseholdChange({ ...household, activityLevel: v as HouseholdConfig['activityLevel'] })}
        options={[
          { value: 'sedentary', label: 'Sedentary (office work, low activity)' },
          { value: 'moderate', label: 'Moderate (some exercise, active job)' },
          { value: 'active', label: 'Very active (athletes, physical labor)' },
        ]}
      />

      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-3">Weekly grocery budget</h3>
        <div className="space-y-3">
          {budgetTierOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                budgetTier === opt.value ? 'border-green-500 bg-green-50' : 'border-neutral-200 hover:border-green-200'
              }`}
            >
              <input
                type="radio"
                name="budgetTier"
                value={opt.value}
                checked={budgetTier === opt.value}
                onChange={() => setBudgetFromTier(opt.value)}
                className="text-green-600 focus:ring-green-500"
              />
              <div>
                <span className="font-medium text-neutral-900">{opt.label}</span>
                <span className="text-neutral-500 text-sm ml-2">({opt.range})</span>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-4">
          <NumberInput
            label="Or enter exact weekly budget ($)"
            value={weeklyBudget}
            onChange={onWeeklyBudgetChange}
            min={20}
            max={500}
            step={5}
          />
        </div>
      </div>

      <SelectInput
        label="Dietary approach"
        value={dietaryApproach}
        onChange={onDietaryChange}
        options={dietOptions}
        helpText="Affects recommended allocation (e.g. Mediterranean vs Keto). Match your Diet Quiz result if you took it."
      />

      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-3">Special considerations</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={specialNeeds.packLunches}
              onChange={(e) => onSpecialNeedsChange({ ...specialNeeds, packLunches: e.target.checked })}
              className="rounded border-neutral-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-neutral-700">Pack lunches for work/school</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={specialNeeds.frequentGuests}
              onChange={(e) => onSpecialNeedsChange({ ...specialNeeds, frequentGuests: e.target.checked })}
              className="rounded border-neutral-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-neutral-700">Entertaining or guests frequently</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={specialNeeds.splitDiets}
              onChange={(e) => onSpecialNeedsChange({ ...specialNeeds, splitDiets: e.target.checked })}
              className="rounded border-neutral-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-neutral-700">One household member has a different diet</span>
          </label>
        </div>
      </div>

      <p className="text-xs text-neutral-500">
        Prices shown in the planner are estimates based on US national averages. Actual prices vary by store and
        region.
      </p>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
        >
          Continue to allocation
        </button>
      </div>
    </div>
  )
}
