'use client'

import { useState } from 'react'
import { Calculator, Beef } from 'lucide-react'
import { ToolLayout } from '../ToolLayout'
import { NumberInput } from '../shared/NumberInput'
import { SelectInput } from '../shared/SelectInput'
import { ResultCard } from '../shared/ResultCard'

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
  { value: 'light', label: 'Lightly Active (1-3 days/week)' },
  { value: 'moderate', label: 'Moderately Active (3-5 days/week)' },
  { value: 'active', label: 'Very Active (6-7 days/week)' },
  { value: 'veryActive', label: 'Extra Active (physical job + exercise)' },
]

const goals = [
  { value: 'maintain', label: 'Maintain current weight' },
  { value: 'buildMuscle', label: 'Build muscle / gain weight' },
  { value: 'loseWeight', label: 'Lose weight / cut fat' },
]

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Prefer not to say' },
]

interface Results {
  dailyProtein: number
  proteinPerKg: number
  proteinPerMeal: number
  mealsPerDay: number
}

export function ProteinCalculator() {
  // Form state
  const [weight, setWeight] = useState<number>(70)
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [activity, setActivity] = useState('moderate')
  const [goal, setGoal] = useState('maintain')
  const [age, setAge] = useState<number>(30)
  const [gender, setGender] = useState('male')

  // Results state
  const [results, setResults] = useState<Results | null>(null)
  const [showResults, setShowResults] = useState(false)

  const calculateProtein = () => {
    // Convert to kg if needed
    const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight

    // Base protein: 0.8g per kg (RDA)
    const baseProtein = weightKg * 0.8

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.3,
      active: 1.5,
      veryActive: 1.7,
    }

    // Goal multipliers
    const goalMultipliers: Record<string, number> = {
      maintain: 1.0,
      buildMuscle: 1.4,
      loseWeight: 1.2,
    }

    const dailyProtein = Math.round(
      baseProtein * activityMultipliers[activity] * goalMultipliers[goal]
    )

    const proteinPerKg = parseFloat((dailyProtein / weightKg).toFixed(1))
    const mealsPerDay = 4
    const proteinPerMeal = Math.round(dailyProtein / mealsPerDay)

    setResults({
      dailyProtein,
      proteinPerKg,
      proteinPerMeal,
      mealsPerDay,
    })
    setShowResults(true)
  }

  const relatedTools = [
    { title: 'Macro Calculator', slug: 'macro-calculator', icon: <Calculator className="w-5 h-5" /> },
    { title: 'Calorie Calculator', slug: 'calorie-calculator', icon: <Calculator className="w-5 h-5" /> },
  ]

  return (
    <ToolLayout
      title="Daily Protein Calculator"
      description="Calculate your personalized daily protein needs based on your weight, activity level, and fitness goals."
      icon={<Beef className="w-8 h-8" />}
      slug="protein-calculator"
      relatedTools={relatedTools}
      educationalContent={<ProteinEducation />}
    >
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
        {/* Form Section */}
        <div className="p-6 md:p-8 space-y-6">
          <NumberInput
            label="Your Weight"
            value={weight}
            onChange={setWeight}
            unit={weightUnit}
            units={[
              { value: 'kg', label: 'kg' },
              { value: 'lbs', label: 'lbs' },
            ]}
            onUnitChange={(u) => setWeightUnit(u as 'kg' | 'lbs')}
            min={30}
            max={300}
          />

          <SelectInput
            label="Activity Level"
            value={activity}
            onChange={setActivity}
            options={activityLevels}
            helpText="How often do you exercise?"
          />

          <SelectInput
            label="Your Goal"
            value={goal}
            onChange={setGoal}
            options={goals}
          />

          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Age"
              value={age}
              onChange={setAge}
              min={18}
              max={100}
              unit="years"
            />
            <SelectInput
              label="Gender"
              value={gender}
              onChange={setGender}
              options={genders}
            />
          </div>

          <button
            onClick={calculateProtein}
            className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate My Protein Needs
          </button>
        </div>

        {/* Results Section */}
        <div className="p-6 md:p-8 bg-neutral-50">
          {!showResults ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500">
              <Beef className="w-12 h-12 mb-4 opacity-30" />
              <p>Enter your details and click calculate to see your results</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Your Daily Protein Needs
                </h2>
                <ResultCard
                  label="Recommended Daily Protein"
                  value={results.dailyProtein}
                  unit="g"
                  highlight
                  subtext="per day"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ResultCard
                  label="Per kg Body Weight"
                  value={results.proteinPerKg}
                  unit="g/kg"
                />
                <ResultCard
                  label="Per Meal"
                  value={results.proteinPerMeal}
                  unit="g"
                  subtext={`(${results.mealsPerDay} meals/day)`}
                />
              </div>

              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">
                  What this means:
                </h3>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>
                    • Aim for <strong>{results.proteinPerMeal}g</strong> of protein at each meal
                  </li>
                  <li>
                    • This equals about {Math.round(results.dailyProtein / 30)} palm-sized portions of meat/fish daily
                  </li>
                  <li>
                    • Or {Math.round(results.dailyProtein / 20)} cups of Greek yogurt
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ToolLayout>
  )
}

function ProteinEducation() {
  return (
    <div className="prose prose-neutral max-w-none">
      <h2>Why Protein Matters</h2>
      <p>
        Protein is essential for building and repairing tissues, making enzymes
        and hormones, and supporting immune function. Getting enough protein
        helps maintain muscle mass, supports recovery from exercise, and can
        help with weight management.
      </p>

      <h3>How We Calculate Your Needs</h3>
      <p>
        Our calculator uses evidence-based formulas from nutrition research. The
        base recommendation is 0.8g per kg of body weight (the RDA), which we
        adjust based on your activity level and goals:
      </p>
      <ul>
        <li>
          <strong>Active individuals</strong> need more protein for muscle
          repair
        </li>
        <li>
          <strong>Building muscle</strong> requires extra protein for growth
        </li>
        <li>
          <strong>Losing weight</strong> benefits from higher protein to
          preserve muscle
        </li>
      </ul>

      <h3>Top Protein Sources</h3>
      <div className="not-prose">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {[
            { food: 'Chicken breast', protein: '31g per 100g' },
            { food: 'Greek yogurt', protein: '10g per 100g' },
            { food: 'Eggs', protein: '13g per 100g' },
            { food: 'Salmon', protein: '25g per 100g' },
            { food: 'Lentils', protein: '9g per 100g' },
            { food: 'Tofu', protein: '8g per 100g' },
          ].map((item) => (
            <div
              key={item.food}
              className="p-3 bg-neutral-50 rounded-lg border border-neutral-200"
            >
              <p className="font-medium text-neutral-900">{item.food}</p>
              <p className="text-sm text-neutral-500">{item.protein}</p>
            </div>
          ))}
        </div>
      </div>

      <h3>Frequently Asked Questions</h3>
      <h4>Can I eat too much protein?</h4>
      <p>
        For most healthy adults, high protein intake is safe. However, those
        with kidney disease should consult a doctor before increasing protein
        intake significantly.
      </p>

      <h4>Is plant protein as good as animal protein?</h4>
      <p>
        Plant proteins can absolutely meet your needs. Combine different sources
        (legumes + grains) throughout the day to get all essential amino acids.
      </p>
    </div>
  )
}
