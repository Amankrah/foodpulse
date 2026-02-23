/**
 * Seasonal produce by month (1-12) for pricing/quality hints.
 * Based on GROCERY-BUDGET-PLANNER-DEVELOPMENT-GUIDE.md
 */

export const seasonalProduceByMonth: Record<number, { inSeason: string[]; avoid: string[] }> = {
  1: {
    inSeason: ['citrus', 'cabbage', 'kale', 'brussels_sprouts', 'root_vegetables', 'storage_apples', 'pears'],
    avoid: ['tomatoes', 'berries', 'stone_fruits', 'asparagus'],
  },
  2: {
    inSeason: ['citrus', 'cabbage', 'kale', 'brussels_sprouts', 'root_vegetables', 'storage_apples', 'lemons'],
    avoid: ['tomatoes', 'berries', 'stone_fruits', 'asparagus'],
  },
  3: {
    inSeason: ['asparagus', 'artichokes', 'leafy_greens', 'radishes', 'peas', 'rhubarb'],
    avoid: ['tomatoes', 'berries'],
  },
  4: {
    inSeason: ['asparagus', 'leafy_greens', 'radishes', 'peas', 'strawberries', 'spring_onions'],
    avoid: ['tomatoes', 'stone_fruits'],
  },
  5: {
    inSeason: ['strawberries', 'leafy_greens', 'radishes', 'peas', 'zucchini', 'cherries'],
    avoid: ['winter_squash'],
  },
  6: {
    inSeason: ['berries', 'cherries', 'zucchini', 'cucumbers', 'tomatoes', 'corn', 'stone_fruits'],
    avoid: ['storage_apples'],
  },
  7: {
    inSeason: ['berries', 'tomatoes', 'corn', 'cucumbers', 'zucchini', 'stone_fruits', 'melons'],
    avoid: ['storage_apples'],
  },
  8: {
    inSeason: ['tomatoes', 'corn', 'melons', 'berries', 'peppers', 'eggplant', 'stone_fruits'],
    avoid: ['asparagus'],
  },
  9: {
    inSeason: ['apples', 'pears', 'squash', 'peppers', 'tomatoes', 'sweet_potatoes', 'grapes'],
    avoid: ['strawberries'],
  },
  10: {
    inSeason: ['apples', 'pears', 'squash', 'pumpkin', 'sweet_potatoes', 'root_vegetables', 'kale'],
    avoid: ['berries', 'stone_fruits'],
  },
  11: {
    inSeason: ['squash', 'sweet_potatoes', 'root_vegetables', 'kale', 'brussels_sprouts', 'cranberries', 'citrus'],
    avoid: ['tomatoes', 'berries'],
  },
  12: {
    inSeason: ['citrus', 'root_vegetables', 'kale', 'brussels_sprouts', 'storage_apples', 'pears', 'cranberries'],
    avoid: ['tomatoes', 'berries', 'stone_fruits'],
  },
}

export function getSeasonalForMonth(month: number): { inSeason: string[]; avoid: string[] } {
  const m = Math.max(1, Math.min(12, month))
  return seasonalProduceByMonth[m] ?? seasonalProduceByMonth[1]
}

export function isItemSeasonal(itemNameOrTag: string, month: number): boolean {
  const { inSeason } = getSeasonalForMonth(month)
  const lower = itemNameOrTag.toLowerCase()
  return inSeason.some((s) => lower.includes(s.replace('_', ' ')) || lower.includes(s))
}
