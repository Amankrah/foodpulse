'use client'

import { useState } from 'react'
import type { FoodCategory, SelectedItem, CategoryBudget } from '../types'
import { groceryDatabase, getItemsForDiet } from '../data/groceryDatabase'
import { CATEGORY_LABELS } from '../data/dietTemplates'
import { formatPrice } from '../utils/calculations'

interface SelectionStepProps {
  selectedItems: SelectedItem[]
  categoryBudgets: Record<FoodCategory, CategoryBudget>
  dietaryApproach: string
  onSelectedItemsChange: (items: SelectedItem[]) => void
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

function toSelectedItem(item: (typeof groceryDatabase)[0], quantity: number, isSelected: boolean): SelectedItem {
  const totalPrice = Math.round(item.pricePerUnit * quantity * 100) / 100
  return {
    ...item,
    quantity,
    totalPrice,
    isSelected,
  }
}

export function SelectionStep({
  selectedItems,
  categoryBudgets,
  dietaryApproach,
  onSelectedItemsChange,
  onBack,
  onNext,
}: SelectionStepProps) {
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('proteins')
  const itemsForDiet = getItemsForDiet(dietaryApproach)
  const itemsByCategory = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: itemsForDiet.filter((i) => i.category === cat),
  }))

  const getSelectedForItem = (itemId: string): SelectedItem | undefined =>
    selectedItems.find((s) => s.id === itemId && s.isSelected)

  const toggleItem = (item: (typeof groceryDatabase)[0], add: boolean) => {
    const rest = selectedItems.filter((s) => s.id !== item.id)
    if (add) {
      const newEntry = toSelectedItem(item, item.typicalQuantity, true)
      onSelectedItemsChange([...rest, newEntry])
    } else {
      onSelectedItemsChange(rest)
    }
  }

  const setQuantity = (itemId: string, quantity: number) => {
    const q = Math.max(0.5, Math.min(20, quantity))
    const updated = selectedItems.map((s) => {
      if (s.id !== itemId) return s
      const totalPrice = Math.round(s.pricePerUnit * q * 100) / 100
      return { ...s, quantity: q, totalPrice }
    })
    onSelectedItemsChange(updated)
  }

  const currentItems = itemsByCategory.find((x) => x.category === activeCategory)?.items ?? []
  const allocated = categoryBudgets[activeCategory]?.amount ?? 0
  const spentInCategory = selectedItems
    .filter((s) => s.category === activeCategory && s.isSelected)
    .reduce((sum, s) => sum + s.totalPrice, 0)

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-1">Build your list</h2>
        <p className="text-neutral-600 text-sm">Select items by category. Stay within your allocation or adjust later.</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-green-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      <div className="flex justify-between text-sm text-neutral-600">
        <span>
          {CATEGORY_LABELS[activeCategory]} budget: {formatPrice(allocated)}
        </span>
        <span>
          Selected in category: {formatPrice(Math.round(spentInCategory * 100) / 100)} (
          {allocated > 0 ? Math.round((spentInCategory / allocated) * 100) : 0}%)
        </span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {currentItems.length === 0 ? (
          <p className="text-neutral-500 py-4">No items in this category for your diet.</p>
        ) : (
          currentItems.map((item) => {
            const sel = getSelectedForItem(item.id)
            const isSelected = !!sel
            return (
              <div
                key={item.id}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  isSelected ? 'border-green-500 bg-green-50' : 'border-neutral-200 hover:border-green-200'
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => toggleItem(item, e.target.checked)}
                    className="rounded border-neutral-300 text-green-600 focus:ring-green-500 w-5 h-5"
                  />
                  <div className="min-w-0">
                    <span className="font-medium text-neutral-900 block truncate">{item.name}</span>
                    <span className="text-sm text-neutral-500">
                      {formatPrice(item.pricePerUnit)}/{item.unit}
                      {item.tags.length > 0 && (
                        <span className="ml-2">
                          {item.tags.includes('best_value') && ' 🏆'}
                          {item.tags.includes('budget_pick') && ' 💰'}
                        </span>
                      )}
                    </span>
                  </div>
                </label>
                {isSelected && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <input
                      type="number"
                      min={0.5}
                      max={20}
                      step={0.5}
                      value={sel?.quantity ?? item.typicalQuantity}
                      onChange={(e) => setQuantity(item.id, parseFloat(e.target.value) || 1)}
                      className="w-20 px-2 py-1 border border-neutral-300 rounded-lg text-center text-sm"
                      aria-label={`Quantity for ${item.name} in ${item.unit}`}
                    />
                    <span className="text-neutral-500 text-sm">{item.unit}</span>
                    <span className="font-medium text-green-700 w-16 text-right">
                      {formatPrice(sel?.totalPrice ?? item.pricePerUnit * item.typicalQuantity)}
                    </span>
                  </div>
                )}
              </div>
            )
          })
        )}
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
          Generate my list
        </button>
      </div>
    </div>
  )
}
