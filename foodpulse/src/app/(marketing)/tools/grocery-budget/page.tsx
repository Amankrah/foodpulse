import { Metadata } from 'next'
import { GroceryBudgetPlanner } from '@/components/tools/planners/grocery-budget/GroceryBudgetPlanner'

export const metadata: Metadata = {
  title: 'Grocery Budget Planner | FoodPulse',
  description:
    'Plan your weekly grocery spending with diet-aware allocation and a prioritized shopping list. Spend smarter on healthy food.',
  openGraph: {
    title: 'Grocery Budget Planner | FoodPulse',
    description: 'Allocate your budget by category, build a list, and print. Diet-aware and household-adjusted.',
    type: 'website',
  },
}

export default function GroceryBudgetPage() {
  return <GroceryBudgetPlanner />
}
