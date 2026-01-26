import { Metadata } from 'next'
import { BmiCalculator } from '@/components/tools/calculators/BmiCalculator'

export const metadata: Metadata = {
  title: 'BMI Calculator - Body Mass Index Calculator | FoodPulse',
  description: 'Calculate your Body Mass Index (BMI) with health context and understand its limitations. Free BMI calculator with healthy weight ranges.',
  openGraph: {
    title: 'Free BMI Calculator | FoodPulse',
    description: 'Calculate your BMI and understand what it means for your health',
    type: 'website',
  },
}

export default function BmiCalculatorPage() {
  return <BmiCalculator />
}
