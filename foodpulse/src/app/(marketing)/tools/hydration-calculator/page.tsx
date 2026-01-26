import { Metadata } from 'next'
import { HydrationCalculator } from '@/components/tools/calculators/HydrationCalculator'

export const metadata: Metadata = {
  title: 'Hydration Calculator - Daily Water Intake | FoodPulse',
  description: 'Calculate your daily water intake needs based on weight, activity level, and climate. Free hydration calculator with personalized recommendations.',
  openGraph: {
    title: 'Free Hydration Calculator | FoodPulse',
    description: 'Calculate your personalized daily water intake needs',
    type: 'website',
  },
}

export default function HydrationCalculatorPage() {
  return <HydrationCalculator />
}
