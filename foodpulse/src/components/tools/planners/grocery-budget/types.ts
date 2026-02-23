/**
 * Grocery Budget Planner - Type Definitions
 * Based on GROCERY-BUDGET-PLANNER-DEVELOPMENT-GUIDE.md
 */

export type PlannerStep = 'setup' | 'allocation' | 'selection' | 'results'

export type FoodCategory =
  | 'proteins'
  | 'produce_vegetables'
  | 'produce_fruits'
  | 'grains'
  | 'dairy'
  | 'fats_oils'
  | 'pantry'
  | 'frozen'
  | 'beverages'

export type ActivityLevel = 'sedentary' | 'moderate' | 'active'

export type BudgetTier = 'tight' | 'moderate' | 'comfortable' | 'flexible'

export interface HouseholdConfig {
  adults: number
  children: number
  childAges: number[]
  activityLevel: ActivityLevel
}

export interface SpecialNeeds {
  packLunches: boolean
  frequentGuests: boolean
  splitDiets: boolean
}

export interface CategoryBudget {
  percentage: number
  amount: number
}

export interface GroceryItem {
  id: string
  name: string
  category: FoodCategory
  pricePerUnit: number
  unit: string
  typicalQuantity: number
  nutrition: {
    servingSize: string
    calories: number
    protein: number
    fat: number
    carbs: number
    fiber?: number
  }
  shelfLifeDays: number
  freezable: boolean
  tags: ('best_value' | 'budget_pick' | 'seasonal' | 'organic')[]
  dietCompatibility: string[]
}

export interface SelectedItem extends GroceryItem {
  quantity: number
  totalPrice: number
  isSelected: boolean
}

export interface BudgetAllocation {
  proteins: number
  produce_vegetables: number
  produce_fruits: number
  grains: number
  dairy: number
  fats_oils: number
  pantry: number
  frozen: number
  beverages: number
}

export interface PlannerState {
  currentStep: PlannerStep
  household: HouseholdConfig
  weeklyBudget: number
  budgetTier: BudgetTier
  dietaryApproach: string
  specialNeeds: SpecialNeeds
  categoryBudgets: Record<FoodCategory, CategoryBudget>
  useRecommendedAllocation: boolean
  selectedItems: SelectedItem[]
  customItems: SelectedItem[]
}

export interface CategoryBreakdown {
  category: FoodCategory
  label: string
  allocated: number
  spent: number
  percentageUsed: number
  items: SelectedItem[]
}

export interface PrioritizedList {
  priority1: SelectedItem[]
  priority2: SelectedItem[]
  priority3: SelectedItem[]
  totalPlanned: number
  remaining: number
}

export interface PlannerResults {
  totalPlanned: number
  remaining: number
  costPerDay: number
  categoryBreakdown: CategoryBreakdown[]
  prioritizedList: PrioritizedList
}
