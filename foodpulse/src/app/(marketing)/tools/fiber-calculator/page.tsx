import { Metadata } from 'next'
import { FiberCalculator } from '@/components/tools/calculators/FiberCalculator'

export const metadata: Metadata = {
  title: 'Fiber Calculator - Daily Fiber Intake Calculator | FoodPulse',
  description: 'Calculate your daily fiber needs and track intake for better digestive health. Free fiber calculator with high-fiber food suggestions.',
  openGraph: {
    title: 'Free Fiber Calculator | FoodPulse',
    description: 'Calculate your personalized daily fiber needs and discover high-fiber foods',
    type: 'website',
  },
}

export default function FiberCalculatorPage() {
  return <FiberCalculator />
}
