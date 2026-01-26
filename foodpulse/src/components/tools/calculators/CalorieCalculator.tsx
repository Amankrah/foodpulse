'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Scale } from 'lucide-react'
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
  { value: 'lose1', label: 'Lose 1 kg/week (aggressive deficit)' },
  { value: 'lose0.5', label: 'Lose 0.5 kg/week (moderate deficit)' },
  { value: 'lose0.25', label: 'Lose 0.25 kg/week (mild deficit)' },
  { value: 'maintain', label: 'Maintain current weight' },
  { value: 'gain0.25', label: 'Gain 0.25 kg/week (mild surplus)' },
  { value: 'gain0.5', label: 'Gain 0.5 kg/week (moderate surplus)' },
]

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

interface CalorieResults {
  bmr: number
  tdee: number
  targetCalories: number
  weeklyCalories: number
  deficit: number
  goalRate: string
  timeToGoal?: string
}

export function CalorieCalculator() {
  // Form state
  const [weight, setWeight] = useState<number>(70)
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [height, setHeight] = useState<number>(170)
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm')
  const [age, setAge] = useState<number>(30)
  const [gender, setGender] = useState('male')
  const [activity, setActivity] = useState('moderate')
  const [goal, setGoal] = useState('maintain')

  // Results state
  const [results, setResults] = useState<CalorieResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const calculateCalories = () => {
    // Convert to metric if needed
    const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight
    const heightCm = heightUnit === 'ft' ? height * 30.48 : height

    // Step 1: Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161
    }

    // Step 2: Calculate TDEE
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    }
    const tdee = Math.round(bmr * activityMultipliers[activity])

    // Step 3: Calculate target calories based on goal
    // 1 kg of fat = ~7700 calories
    const goalAdjustments: Record<string, { daily: number; label: string }> = {
      'lose1': { daily: -1100, label: '1 kg/week' },
      'lose0.5': { daily: -550, label: '0.5 kg/week' },
      'lose0.25': { daily: -275, label: '0.25 kg/week' },
      'maintain': { daily: 0, label: 'Maintain' },
      'gain0.25': { daily: 275, label: '0.25 kg/week' },
      'gain0.5': { daily: 550, label: '0.5 kg/week' },
    }

    const adjustment = goalAdjustments[goal]
    const targetCalories = Math.round(tdee + adjustment.daily)
    const weeklyCalories = targetCalories * 7

    setResults({
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      weeklyCalories,
      deficit: Math.abs(adjustment.daily),
      goalRate: adjustment.label,
    })
    setShowResults(true)
  }

  const getGoalIcon = () => {
    if (goal.includes('lose')) return <TrendingDown className="w-5 h-5" />
    if (goal.includes('gain')) return <TrendingUp className="w-5 h-5" />
    return <Minus className="w-5 h-5" />
  }

  const getGoalColor = () => {
    if (goal.includes('lose')) return 'text-blue-600'
    if (goal.includes('gain')) return 'text-orange-600'
    return 'text-neutral-600'
  }

  const relatedTools = [
    { title: 'Macro Calculator', slug: 'macro-calculator', icon: <Scale className="w-5 h-5" /> },
    { title: 'Protein Calculator', slug: 'protein-calculator', icon: <Scale className="w-5 h-5" /> },
  ]

  return (
    <ToolLayout
      title="Calorie Calculator (TDEE)"
      description="Calculate your Total Daily Energy Expenditure (TDEE) and personalized calorie needs based on your goals."
      icon={<TrendingUp className="w-8 h-8" />}
      slug="calorie-calculator"
      relatedTools={relatedTools}
      educationalContent={<CalorieEducation />}
    >
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
        {/* Form Section */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              label="Weight"
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
            <NumberInput
              label="Height"
              value={height}
              onChange={setHeight}
              unit={heightUnit}
              units={[
                { value: 'cm', label: 'cm' },
                { value: 'ft', label: 'ft' },
              ]}
              onUnitChange={(u) => setHeightUnit(u as 'cm' | 'ft')}
              min={heightUnit === 'cm' ? 100 : 3}
              max={heightUnit === 'cm' ? 250 : 8}
            />
          </div>

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

          <button
            onClick={calculateCalories}
            className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Calculate My Calories
          </button>
        </div>

        {/* Results Section */}
        <div className="p-6 md:p-8 bg-neutral-50">
          {!showResults ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500">
              <TrendingUp className="w-12 h-12 mb-4 opacity-30" />
              <p>Enter your details and click calculate to see your results</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Main Results */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Your Calorie Needs
                </h2>
                <ResultCard
                  label="Daily Calorie Target"
                  value={results.targetCalories}
                  unit="kcal"
                  highlight
                  subtext={`to ${results.goalRate}`}
                />
              </div>

              {/* BMR and TDEE */}
              <div className="grid grid-cols-2 gap-3">
                <ResultCard
                  label="BMR"
                  value={results.bmr}
                  unit="kcal"
                  subtext="at rest"
                />
                <ResultCard
                  label="TDEE"
                  value={results.tdee}
                  unit="kcal"
                  subtext="maintenance"
                />
              </div>

              {/* Goal Details */}
              {results.deficit > 0 && (
                <div className={`p-4 rounded-xl border-2 ${
                  goal.includes('lose')
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-orange-50 border-orange-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={getGoalColor()}>
                      {getGoalIcon()}
                    </span>
                    <h3 className={`font-medium ${getGoalColor()}`}>
                      {goal.includes('lose') ? 'Calorie Deficit' : 'Calorie Surplus'}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-700">
                    <strong>{results.deficit} kcal</strong> per day
                  </p>
                  <p className="text-xs text-neutral-600 mt-1">
                    {results.deficit * 7} kcal per week
                  </p>
                </div>
              )}

              {/* Weekly Budget */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">
                  Weekly Calorie Budget
                </h3>
                <p className="text-2xl font-bold text-neutral-800">
                  {results.weeklyCalories.toLocaleString()}
                  <span className="text-sm font-normal text-neutral-500 ml-1">kcal/week</span>
                </p>
                <p className="text-xs text-neutral-600 mt-2">
                  You can spread calories unevenly across the week if needed
                </p>
              </div>

              {/* Tips */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">
                  Important Tips:
                </h3>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• Track your weight weekly, not daily</li>
                  <li>• Allow 2-4 weeks before adjusting</li>
                  <li>• Don&apos;t go below 1200-1500 kcal/day</li>
                  {goal.includes('lose') && (
                    <li>• Prioritize protein to preserve muscle</li>
                  )}
                  {goal.includes('gain') && (
                    <li>• Focus on strength training for muscle gain</li>
                  )}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ToolLayout>
  )
}

function CalorieEducation() {
  return (
    <div className="prose prose-neutral max-w-none">
      <h2>Understanding Your Calorie Needs</h2>
      <p>
        Your daily calorie needs depend on your Basal Metabolic Rate (BMR) and activity level.
        Understanding these numbers helps you set realistic goals and achieve sustainable results.
      </p>

      <h3>Key Concepts</h3>

      <h4>BMR (Basal Metabolic Rate)</h4>
      <p>
        The number of calories your body burns at rest just to maintain basic functions like
        breathing, circulation, and cell production. This represents about 60-75% of your total
        daily calorie burn.
      </p>

      <h4>TDEE (Total Daily Energy Expenditure)</h4>
      <p>
        Your total calorie burn including all activities. This is your BMR multiplied by an
        activity factor. TDEE is your maintenance calories - eat this amount to maintain your
        current weight.
      </p>

      <h4>Calorie Deficit vs. Surplus</h4>
      <p>
        To lose weight, you need a calorie deficit (eat less than TDEE). To gain weight, you
        need a surplus (eat more than TDEE). Generally:
      </p>
      <ul>
        <li><strong>500-1100 kcal deficit:</strong> Lose 0.5-1 kg per week</li>
        <li><strong>0 kcal difference:</strong> Maintain current weight</li>
        <li><strong>250-550 kcal surplus:</strong> Gain 0.25-0.5 kg per week</li>
      </ul>

      <h3>How We Calculate</h3>
      <p>
        Our calculator uses the <strong>Mifflin-St Jeor equation</strong>, considered the most
        accurate formula for estimating BMR:
      </p>

      <div className="not-prose my-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <p className="text-sm font-mono text-neutral-700">
          <strong>For Men:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
        </p>
        <p className="text-sm font-mono text-neutral-700 mt-2">
          <strong>For Women:</strong> BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
        </p>
      </div>

      <p>Then we multiply BMR by your activity factor to get TDEE:</p>

      <div className="not-prose">
        <div className="grid md:grid-cols-2 gap-3 my-4">
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="font-medium text-neutral-900 text-sm">Sedentary (×1.2)</p>
            <p className="text-xs text-neutral-600">Little or no exercise</p>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="font-medium text-neutral-900 text-sm">Lightly Active (×1.375)</p>
            <p className="text-xs text-neutral-600">Exercise 1-3 days/week</p>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="font-medium text-neutral-900 text-sm">Moderately Active (×1.55)</p>
            <p className="text-xs text-neutral-600">Exercise 3-5 days/week</p>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="font-medium text-neutral-900 text-sm">Very Active (×1.725)</p>
            <p className="text-xs text-neutral-600">Exercise 6-7 days/week</p>
          </div>
        </div>
      </div>

      <h3>Setting Realistic Goals</h3>

      <h4>For Weight Loss</h4>
      <ul>
        <li><strong>0.25-0.5 kg/week:</strong> Sustainable, preserves muscle, easier to stick to</li>
        <li><strong>1 kg/week:</strong> Aggressive, requires strict adherence, risk of muscle loss</li>
      </ul>

      <h4>For Weight Gain</h4>
      <ul>
        <li><strong>0.25-0.5 kg/week:</strong> Minimizes fat gain, builds quality muscle</li>
        <li>Faster gains usually mean more fat accumulation</li>
      </ul>

      <h3>Frequently Asked Questions</h3>

      <h4>How accurate is this calculator?</h4>
      <p>
        The Mifflin-St Jeor equation is accurate for most people, but individual metabolism varies
        by ±10%. Use results as a starting point and adjust based on your actual progress over
        2-4 weeks.
      </p>

      <h4>Should I eat the same calories every day?</h4>
      <p>
        You can vary daily intake as long as your weekly total matches your goal. Some people
        prefer higher calories on training days and lower on rest days.
      </p>

      <h4>What if I&apos;m not losing/gaining weight?</h4>
      <p>
        Track consistently for 2-4 weeks. If you&apos;re not progressing, adjust calories by 10-15%
        (about 200-300 kcal) and reassess after another 2 weeks.
      </p>

      <h4>How low can I go with calories?</h4>
      <p>
        Never go below 1200 kcal/day for women or 1500 kcal/day for men without medical
        supervision. Very low calories can slow metabolism and cause muscle loss.
      </p>
    </div>
  )
}
