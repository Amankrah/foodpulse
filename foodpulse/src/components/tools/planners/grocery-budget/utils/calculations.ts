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
  Insight,
  SwapSuggestion,
  WasteWarning,
} from '../types'
import type { GroceryItem } from '../types'
import { ALL_CATEGORIES, CATEGORY_LABELS } from '../data/dietTemplates'
import { getSubstitutionRule } from '../data/substitutionRules'
import { getSeasonalForMonth } from '../data/seasonalProduce'

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

/** Short shelf-life threshold (days) for waste warnings */
const WASTE_WARNING_DAYS = 7

/** Build swap suggestions when over budget. Uses substitution rules and grocery DB. */
export function getSwapSuggestions(
  selectedItems: SelectedItem[],
  weeklyBudget: number,
  itemById: Map<string, GroceryItem>
): SwapSuggestion[] {
  const filtered = selectedItems.filter((i) => i.isSelected)
  const totalPlanned = getTotalFromSelected(filtered)
  const overBy = totalPlanned - weeklyBudget
  if (overBy <= 0) return []

  const suggestions: SwapSuggestion[] = []
  for (const sel of filtered) {
    const rule = getSubstitutionRule(sel.id)
    if (!rule) continue
    const quantity = sel.quantity
    const originalTotal = sel.totalPrice
    for (const alt of rule.alternatives) {
      const altItem = itemById.get(alt.item)
      if (!altItem) continue
      const altUnitPrice = altItem.pricePerUnit
      const altTotal = Math.round(altUnitPrice * quantity * 100) / 100
      const savings = Math.round((originalTotal - altTotal) * 100) / 100
      if (savings <= 0) continue
      suggestions.push({
        originalId: sel.id,
        originalName: sel.name,
        originalPrice: originalTotal,
        suggestedId: altItem.id,
        suggestedName: altItem.name,
        suggestedPrice: altTotal,
        savings,
        rationale: rule.rationale,
      })
    }
  }
  suggestions.sort((a, b) => b.savings - a.savings)
  return suggestions.slice(0, 8)
}

/** Build waste warnings for items with short shelf life. */
export function getWasteWarnings(selectedItems: SelectedItem[]): WasteWarning[] {
  const filtered = selectedItems.filter((i) => i.isSelected)
  const warnings: WasteWarning[] = []
  for (const item of filtered) {
    if (item.shelfLifeDays > WASTE_WARNING_DAYS) continue
    let tip: string
    if (item.freezable) {
      tip = `Freeze portions on purchase day to extend use.`
    } else if (item.shelfLifeDays <= 3) {
      tip = `Use within ${item.shelfLifeDays} days. Plan a meal early in the week.`
    } else {
      tip = `Use within ${item.shelfLifeDays} days. Store properly to maximize freshness.`
    }
    warnings.push({
      itemId: item.id,
      itemName: item.name,
      shelfLifeDays: item.shelfLifeDays,
      tip,
    })
  }
  return warnings
}

/** Build insights (budget, seasonal, waste). */
export function getInsights(
  selectedItems: SelectedItem[],
  weeklyBudget: number,
  remaining: number,
  currentMonth: number
): Insight[] {
  const filtered = selectedItems.filter((i) => i.isSelected)
  const insights: Insight[] = []
  const { inSeason, avoid } = getSeasonalForMonth(currentMonth)

  if (remaining > 5) {
    insights.push({
      type: 'budget',
      title: 'Budget optimization',
      message: `You're ${formatPrice(remaining)} under budget. Consider adding an extra bag of frozen vegetables, upgrading a staple, or stocking pantry items.`,
    })
  } else if (remaining < 0) {
    insights.push({
      type: 'budget',
      title: 'Over budget',
      message: `Your list is ${formatPrice(-remaining)} over budget. Use swap suggestions above to replace higher-cost items with similar options.`,
    })
  }

  const seasonalOnList: string[] = []
  const avoidOnList: string[] = []
  for (const item of filtered) {
    const nameLower = item.name.toLowerCase()
    if (inSeason.some((s) => nameLower.includes(s.replace('_', ' ')) || nameLower.includes(s))) {
      seasonalOnList.push(item.name)
    }
    if (avoid.some((a) => nameLower.includes(a.replace('_', ' ')) || nameLower.includes(a))) {
      avoidOnList.push(item.name)
    }
  }
  if (seasonalOnList.length > 0) {
    insights.push({
      type: 'seasonal',
      title: 'Seasonal picks',
      message: 'In season this month (best quality & price):',
      items: seasonalOnList,
    })
  }
  if (avoidOnList.length > 0) {
    insights.push({
      type: 'seasonal',
      title: 'Out of season',
      message: 'These items may be pricier or lower quality this month. Consider frozen or canned alternatives.',
      items: avoidOnList,
    })
  }

  const shortShelf = filtered.filter((i) => i.shelfLifeDays <= WASTE_WARNING_DAYS)
  if (shortShelf.length > 0) {
    insights.push({
      type: 'waste',
      title: 'Waste prevention',
      message: `${shortShelf.length} item(s) have short shelf life. Use them first or freeze if possible.`,
      items: shortShelf.map((i) => i.name),
    })
  }

  return insights
}

export function computeResults(
  selectedItems: SelectedItem[],
  categoryBudgets: Record<FoodCategory, CategoryBudget>,
  weeklyBudget: number,
  householdAdults: number = 2,
  groceryItems: GroceryItem[] = []
): PlannerResults {
  const filtered = selectedItems.filter((i) => i.isSelected)
  const totalPlanned = getTotalFromSelected(filtered)
  const remaining = Math.round((weeklyBudget - totalPlanned) * 100) / 100
  const adults = Math.max(1, householdAdults)
  const costPerDay = Math.round((totalPlanned / 7 / adults) * 100) / 100
  const categoryBreakdown = buildCategoryBreakdown(filtered, categoryBudgets)
  const prioritizedList = prioritizeList(filtered)
  prioritizedList.remaining = remaining

  const itemById = new Map(groceryItems.map((i) => [i.id, i]))
  const swapSuggestions = getSwapSuggestions(selectedItems, weeklyBudget, itemById)
  const wasteWarnings = getWasteWarnings(filtered)
  const currentMonth = typeof window !== 'undefined' ? new Date().getMonth() + 1 : 2
  const insights = getInsights(filtered, weeklyBudget, remaining, currentMonth)

  return {
    totalPlanned,
    remaining,
    costPerDay,
    categoryBreakdown,
    prioritizedList,
    insights,
    swapSuggestions,
    wasteWarnings,
  }
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n)
}
