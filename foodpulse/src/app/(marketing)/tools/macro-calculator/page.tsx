import { Metadata } from 'next'
import { MacroCalculator } from '@/components/tools/calculators/MacroCalculator'

export const metadata: Metadata = {
  title: 'Macro Calculator - Macronutrient Calculator | FoodPulse',
  description: 'Calculate your personalized macronutrient breakdown (protein, carbs, fat) based on your goals. Free macro calculator with TDEE and BMR calculations.',
  openGraph: {
    title: 'Free Macro Calculator | FoodPulse',
    description: 'Get your personalized macro breakdown for your fitness goals',
    type: 'website',
  },
}

export default function MacroCalculatorPage() {
  return <MacroCalculator />
}
