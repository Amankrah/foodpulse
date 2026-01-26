import { Metadata } from 'next'
import { ProteinCalculator } from '@/components/tools/calculators/ProteinCalculator'

export const metadata: Metadata = {
  title: 'Protein Calculator - Daily Protein Needs | FoodPulse',
  description: 'Calculate your daily protein needs based on weight, activity level, and goals. Free protein calculator with personalized recommendations.',
  openGraph: {
    title: 'Free Protein Calculator | FoodPulse',
    description: 'Calculate your personalized daily protein needs',
    type: 'website',
  },
}

export default function ProteinCalculatorPage() {
  return <ProteinCalculator />
}
