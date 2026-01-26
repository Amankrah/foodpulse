import { Metadata } from 'next'
import { CalorieCalculator } from '@/components/tools/calculators/CalorieCalculator'

export const metadata: Metadata = {
  title: 'Calorie Calculator - TDEE Calculator | FoodPulse',
  description: 'Calculate your Total Daily Energy Expenditure (TDEE) and daily calorie needs for your goals. Free calorie calculator with BMR calculations.',
  openGraph: {
    title: 'Free TDEE & Calorie Calculator | FoodPulse',
    description: 'Calculate your personalized calorie needs based on your activity and goals',
    type: 'website',
  },
}

export default function CalorieCalculatorPage() {
  return <CalorieCalculator />
}
