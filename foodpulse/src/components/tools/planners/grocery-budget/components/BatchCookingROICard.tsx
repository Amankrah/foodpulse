'use client'

import { useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'
import { formatPrice } from '../utils/calculations'

const BATCH_RECIPE_TIPS: Record<string, string[]> = {
  mediterranean: [
    'Mediterranean grain bowls (keeps 5 days)',
    'Mason jar salads (keeps 4 days)',
    'Soup/stew portions (freeze extras)',
    'Chickpea & veggie wraps',
  ],
  dash: [
    'Veggie & lean protein bowls (keeps 4 days)',
    'Mason jar salads with nuts',
    'Soup/stew portions (freeze extras)',
    'Oat-based meal prep jars',
  ],
  flexitarian: [
    'Grain bowls with beans or tofu (keeps 5 days)',
    'Mason jar salads (keeps 4 days)',
    'Lentil soup portions (freeze extras)',
    'Hummus & veggie wraps',
  ],
  wfpb: [
    'Whole-food grain & bean bowls (keeps 5 days)',
    'Mason jar salads (keeps 4 days)',
    'Soup/stew portions (freeze extras)',
    'Oatmeal jars with fruit',
  ],
  low_carb: [
    'Grilled protein + veggie containers (keeps 4 days)',
    'Salad jars with chicken or eggs',
    'Egg muffins (freeze extras)',
    'Cauliflower rice bowls',
  ],
  keto: [
    'Keto meal prep (protein + low-carb veg) (keeps 4 days)',
    'Salad jars with fatty protein',
    'Egg & cheese muffins (freeze extras)',
    'Fat bombs for snacks',
  ],
  intermittent_fasting: [
    'Satisfying grain or protein bowls (keeps 5 days)',
    'Mason jar salads (keeps 4 days)',
    'Soup/stew portions (freeze extras)',
  ],
  anti_inflammatory: [
    'Grain bowls with oily fish or legumes (keeps 4 days)',
    'Mason jar salads with seeds',
    'Turmeric/ginger soup portions (freeze extras)',
  ],
  intuitive_eating: [
    'Grain bowls (keeps 5 days)',
    'Mason jar salads (keeps 4 days)',
    'Soup/stew portions (freeze extras)',
  ],
  zone_macro: [
    'Zone-balanced meal prep (keeps 4 days)',
    'Mason jar salads with protein',
    'Portioned soup/stew (freeze extras)',
  ],
  balanced: [
    'Grain bowls (keeps 5 days)',
    'Mason jar salads (keeps 4 days)',
    'Soup/stew portions (freeze extras)',
  ],
}

interface BatchCookingROICardProps {
  householdAdults: number
  dietaryApproach?: string
}

export function BatchCookingROICard({ householdAdults, dietaryApproach = 'balanced' }: BatchCookingROICardProps) {
  const adults = Math.max(1, householdAdults)
  const mealsPerWeek = adults * 5

  const [takeoutPerMeal, setTakeoutPerMeal] = useState(15)
  const [batchCostWeek, setBatchCostWeek] = useState(35)
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(120)
  const reheatMinutes = 5
  const takeoutTimeMinutes = 20

  const takeoutWeekly = mealsPerWeek * takeoutPerMeal
  const savingsWeekly = Math.max(0, takeoutWeekly - batchCostWeek)
  const savingsMonthly = savingsWeekly * 4
  const savingsYearly = savingsWeekly * 52
  const costPerMealBatch = mealsPerWeek > 0 ? batchCostWeek / mealsPerWeek : 0

  const recipeTips = BATCH_RECIPE_TIPS[dietaryApproach] ?? BATCH_RECIPE_TIPS.balanced

  return (
    <div className="rounded-xl border-2 border-green-200 bg-green-50/80 p-5">
      <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
        <UtensilsCrossed className="w-5 h-5" />
        Batch cooking savings
      </h3>
      <p className="text-sm text-green-800 mb-4">
        Scenario: weekday lunches for {adults} {adults === 1 ? 'adult' : 'adults'} ({mealsPerWeek} meals/week)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label id="batch-takeout-label" className="block text-xs font-medium text-green-800 mb-1">
            Takeout/casual cost per meal ($)
          </label>
          <input
            id="batch-takeout"
            type="number"
            min={5}
            max={50}
            value={takeoutPerMeal}
            onChange={(e) => setTakeoutPerMeal(Math.max(5, Math.min(50, Number(e.target.value) || 5)))}
            className="w-full px-3 py-2 rounded-lg border border-green-300 bg-white text-neutral-900 text-sm"
            placeholder="15"
            aria-labelledby="batch-takeout-label"
          />
        </div>
        <div>
          <label id="batch-cost-label" className="block text-xs font-medium text-green-800 mb-1">
            Batch prep ingredients for week ($)
          </label>
          <input
            id="batch-cost"
            type="number"
            min={10}
            max={200}
            value={batchCostWeek}
            onChange={(e) => setBatchCostWeek(Math.max(10, Math.min(200, Number(e.target.value) || 10)))}
            className="w-full px-3 py-2 rounded-lg border border-green-300 bg-white text-neutral-900 text-sm"
            placeholder="35"
            aria-labelledby="batch-cost-label"
          />
        </div>
      </div>

      <div className="rounded-lg border border-green-300 bg-white p-4 mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Weekly savings</p>
            <p className="text-lg font-bold text-green-700">{formatPrice(savingsWeekly)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Monthly savings</p>
            <p className="text-lg font-bold text-green-700">{formatPrice(savingsMonthly)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Yearly savings</p>
            <p className="text-lg font-bold text-green-700">{formatPrice(savingsYearly)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Cost per meal</p>
            <p className="text-sm font-semibold text-neutral-800">
              {formatPrice(costPerMealBatch)} <span className="text-neutral-500">vs {formatPrice(takeoutPerMeal)}</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-3 text-center">
          Time per meal: ~{reheatMinutes} min reheat vs ~{takeoutTimeMinutes} min commute/wait. Prep once: ~{prepTimeMinutes} min.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-green-900 mb-2">Batch-friendly ideas for your diet:</p>
        <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
          {recipeTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
