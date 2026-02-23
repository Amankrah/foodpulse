import { Metadata } from 'next'
import { DietQuiz } from '@/components/tools/calculators/DietQuiz'

export const metadata: Metadata = {
  title: 'What Diet Quiz - Find Your Perfect Diet | FoodPulse',
  description:
    'Discover your ideal dietary approach with our personalized diet quiz. Based on your lifestyle, values, health needs, and practical constraints - not just generic recommendations.',
  openGraph: {
    title: 'What Diet Quiz - Find Your Perfect Diet | FoodPulse',
    description:
      'Take our evidence-based quiz to find the dietary approach that truly fits your life. Get personalized recommendations with implementation roadmaps.',
    type: 'website',
  },
  keywords: [
    'diet quiz',
    'what diet should I follow',
    'best diet for me',
    'personalized diet',
    'mediterranean diet',
    'flexitarian',
    'intermittent fasting',
    'keto',
    'low carb',
    'diet recommendation',
  ],
}

export default function DietQuizPage() {
  return <DietQuiz />
}
