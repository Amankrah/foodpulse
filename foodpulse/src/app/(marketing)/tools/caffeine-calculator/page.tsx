import { Metadata } from 'next'
import { CaffeineCalculator } from '@/components/tools/calculators/CaffeineCalculator'

export const metadata: Metadata = {
  title: 'Caffeine Calculator - Track Daily Caffeine Intake | FoodPulse',
  description: 'Track your daily caffeine intake and stay within safe limits. Free caffeine calculator with metabolism tracking and safety guidelines.',
  openGraph: {
    title: 'Free Caffeine Calculator | FoodPulse',
    description: 'Monitor your caffeine consumption from coffee, tea, energy drinks and more',
    type: 'website',
  },
}

export default function CaffeineCalculatorPage() {
  return <CaffeineCalculator />
}
