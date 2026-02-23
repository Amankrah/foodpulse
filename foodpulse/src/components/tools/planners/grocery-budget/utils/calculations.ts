/**
 * Budget and allocation calculations.
 */

import type {
  BudgetAllocation,
  CategoryBudget,
  FoodCategory,
  SelectedItem,
  CategoryBreakdown,
  PrioritizedList,
  PlannerResults,
} from '../types'
import { ALL_CATEGORIES, CATEGORY_LABELS } from '../data/dietTemplates'

export function allocationToCategoryBudgets(
  allocation: BudgetAllocation,
  weeklyBudget: number
): Record<FoodCategory, CategoryBudget> {
  const result = {} as Record<FoodCategory, CategoryBudget>
  for (const cat of ALL_CATEGORIES) {
    const pct = allocation[cat as keyof BudgetAllocation] ?? 0
    result[cat] = {
      percentage: pct * 100,
      amount: Math.round(weeklyBudget * pct * 100) / 100,
    }
  }
  return result
}

export function getTotalFromSelected(items: SelectedItem[]): number {
  return Math.round(items.reduce((sum, i) => sum + (i.totalPrice || 0), 0) * 100) / 100
}

export function getSpentByCategory(items: SelectedItem[]): Record<FoodCategory, number> {
  const spent: Record<string, number> = {}
  for (const cat of ALL_CATEGORIES) {
    spent[cat] = 0
  }
  for (const item of items) {
    if (!spent[item.category]) spent[item.category] = 0
    spent[item.category] += item.totalPrice || 0
  }
  return spent as Record<FoodCategory, number>
}

export function buildCategoryBreakdown(
  selectedItems: SelectedItem[],
  categoryBudgets: Record<FoodCategory, CategoryBudget>
): CategoryBreakdown[] {
  const spent = getSpentByCategory(selectedItems)
  return ALL_CATEGORIES.map((cat) => {
    const budget = categoryBudgets[cat]
    const amount = spent[cat] ?? 0
    const allocated = budget?.amount ?? 0
    const percentageUsed = allocated > 0 ? Math.round((amount / allocated) * 100) : 0
    return {
      category: cat,
      label: CATEGORY_LABELS[cat] ?? cat,
      allocated,
      spent: Math.round(amount * 100) / 100,
      percentageUsed,
      items: selectedItems.filter((i) => i.category === cat),
    }
  })
}

/**
 * Prioritize list: staples first, then fresh, then nice-to-have (by shelf life and category).
 */
export function prioritizeList(items: SelectedItem[]): PrioritizedList {
  const totalPlanned = getTotalFromSelected(items)
  const priority1: SelectedItem[] = []
  const priority2: SelectedItem[] = []
  const priority3: SelectedItem[] = []

  const stapleCategories: FoodCategory[] = ['proteins', 'grains', 'fats_oils', 'pantry', 'dairy']
  const freshCategories: FoodCategory[] = ['produce_vegetables', 'produce_fruits']
  const optionalCategories: FoodCategory[] = ['frozen', 'beverages']

  for (const item of items) {
    if (!item.isSelected) continue
    if (stapleCategories.includes(item.category)) {
      if (item.shelfLifeDays >= 7 || item.tags.includes('best_value') || item.tags.includes('budget_pick')) {
        priority1.push(item)
      } else {
        priority2.push(item)
      }
    } else if (freshCategories.includes(item.category)) {
      priority2.push(item)
    } else {
      priority3.push(item)
    }
  }

  // Sort P1 by price (essentials first), P2 by shelf life (use soon first), P3 by price
  priority1.sort((a, b) => a.totalPrice - b.totalPrice)
  priority2.sort((a, b) => a.shelfLifeDays - b.shelfLifeDays)
  priority3.sort((a, b) => b.totalPrice - a.totalPrice)

  return {
    priority1,
    priority2,
    priority3,
    totalPlanned,
    remaining: 0, // caller sets from budget - totalPlanned
  }
}

export function computeResults(
  selectedItems: SelectedItem[],
  categoryBudgets: Record<FoodCategory, CategoryBudget>,
  weeklyBudget: number,
  householdAdults: number = 2
): PlannerResults {
  const filtered = selectedItems.filter((i) => i.isSelected)
  const totalPlanned = getTotalFromSelected(filtered)
  const remaining = Math.round((weeklyBudget - totalPlanned) * 100) / 100
  const adults = Math.max(1, householdAdults)
  const costPerDay = Math.round((totalPlanned / 7 / adults) * 100) / 100
  const categoryBreakdown = buildCategoryBreakdown(filtered, categoryBudgets)
  const prioritizedList = prioritizeList(filtered)
  prioritizedList.remaining = remaining
  return {
    totalPlanned,
    remaining,
    costPerDay,
    categoryBreakdown,
    prioritizedList,
  }
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n)
}
