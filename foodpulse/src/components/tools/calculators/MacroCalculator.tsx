'use client'

import { useState } from 'react'
import { Calculator, TrendingUp } from 'lucide-react'
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
  { value: 'lose', label: 'Lose Weight (500 cal deficit)' },
  { value: 'maintain', label: 'Maintain Weight' },
  { value: 'build', label: 'Build Muscle (300 cal surplus)' },
]

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

const dietPreferences = [
  { value: 'balanced', label: 'Balanced (30% Protein, 40% Carbs, 30% Fat)' },
  { value: 'lowCarb', label: 'Low Carb (35% Protein, 25% Carbs, 40% Fat)' },
  { value: 'highProtein', label: 'High Protein (40% Protein, 35% Carbs, 25% Fat)' },
  { value: 'keto', label: 'Keto (25% Protein, 5% Carbs, 70% Fat)' },
]

interface MacroResults {
  bmr: number
  tdee: number
  targetCalories: number
  protein: { grams: number; calories: number; percentage: number }
  carbs: { grams: number; calories: number; percentage: number }
  fat: { grams: number; calories: number; percentage: number }
}

export function MacroCalculator() {
  // Form state
  const [weight, setWeight] = useState<number>(70)
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [height, setHeight] = useState<number>(170)
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm')
  const [age, setAge] = useState<number>(30)
  const [gender, setGender] = useState('male')
  const [activity, setActivity] = useState('moderate')
  const [goal, setGoal] = useState('maintain')
  const [dietPreference, setDietPreference] = useState('balanced')

  // Results state
  const [results, setResults] = useState<MacroResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const calculateMacros = () => {
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

    // Step 3: Adjust for goal
    const goalAdjustments: Record<string, number> = {
      lose: -500,
      maintain: 0,
      build: 300,
    }
    const targetCalories = tdee + goalAdjustments[goal]

    // Step 4: Calculate macro splits
    const macroSplits: Record<string, { protein: number; carbs: number; fat: number }> = {
      balanced: { protein: 0.30, carbs: 0.40, fat: 0.30 },
      lowCarb: { protein: 0.35, carbs: 0.25, fat: 0.40 },
      highProtein: { protein: 0.40, carbs: 0.35, fat: 0.25 },
      keto: { protein: 0.25, carbs: 0.05, fat: 0.70 },
    }

    const split = macroSplits[dietPreference]

    // Calculate grams and calories for each macro
    const proteinCalories = targetCalories * split.protein
    const carbsCalories = targetCalories * split.carbs
    const fatCalories = targetCalories * split.fat

    const proteinGrams = Math.round(proteinCalories / 4) // 4 cal per gram
    const carbsGrams = Math.round(carbsCalories / 4) // 4 cal per gram
    const fatGrams = Math.round(fatCalories / 9) // 9 cal per gram

    setResults({
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      protein: {
        grams: proteinGrams,
        calories: Math.round(proteinCalories),
        percentage: Math.round(split.protein * 100),
      },
      carbs: {
        grams: carbsGrams,
        calories: Math.round(carbsCalories),
        percentage: Math.round(split.carbs * 100),
      },
      fat: {
        grams: fatGrams,
        calories: Math.round(fatCalories),
        percentage: Math.round(split.fat * 100),
      },
    })
    setShowResults(true)
  }

  const relatedTools = [
    { title: 'Protein Calculator', slug: 'protein-calculator', icon: <Calculator className="w-5 h-5" /> },
    { title: 'Calorie Calculator', slug: 'calorie-calculator', icon: <TrendingUp className="w-5 h-5" /> },
  ]

  return (
    <ToolLayout
      title="Macro Calculator"
      description="Calculate your personalized macronutrient breakdown (protein, carbs, fat) based on your goals and preferences."
      icon={<Calculator className="w-8 h-8" />}
      slug="macro-calculator"
      relatedTools={relatedTools}
      educationalContent={<MacroEducation />}
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

          <SelectInput
            label="Diet Preference"
            value={dietPreference}
            onChange={setDietPreference}
            options={dietPreferences}
            helpText="Choose your preferred macro split"
          />

          <button
            onClick={calculateMacros}
            className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate My Macros
          </button>
        </div>

        {/* Results Section */}
        <div className="p-6 md:p-8 bg-neutral-50">
          {!showResults ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500">
              <Calculator className="w-12 h-12 mb-4 opacity-30" />
              <p>Enter your details and click calculate to see your results</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Daily Calories */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Your Daily Targets
                </h2>
                <ResultCard
                  label="Target Daily Calories"
                  value={results.targetCalories}
                  unit="kcal"
                  highlight
                  subtext={`TDEE: ${results.tdee} kcal | BMR: ${results.bmr} kcal`}
                />
              </div>

              {/* Visual Macro Breakdown */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">
                  Macro Breakdown
                </h3>
                <div className="space-y-3">
                  {/* Protein Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-neutral-800">Protein</span>
                      <span className="text-neutral-600">{results.protein.percentage}%</span>
                    </div>
                    <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${results.protein.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">
                      {results.protein.grams}g ({results.protein.calories} kcal)
                    </p>
                  </div>

                  {/* Carbs Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-neutral-800">Carbs</span>
                      <span className="text-neutral-600">{results.carbs.percentage}%</span>
                    </div>
                    <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${results.carbs.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">
                      {results.carbs.grams}g ({results.carbs.calories} kcal)
                    </p>
                  </div>

                  {/* Fat Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-neutral-800">Fat</span>
                      <span className="text-neutral-600">{results.fat.percentage}%</span>
                    </div>
                    <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all"
                        style={{ width: `${results.fat.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">
                      {results.fat.grams}g ({results.fat.calories} kcal)
                    </p>
                  </div>
                </div>
              </div>

              {/* Macro Cards */}
              <div className="grid grid-cols-3 gap-3">
                <ResultCard
                  label="Protein"
                  value={results.protein.grams}
                  unit="g"
                />
                <ResultCard
                  label="Carbs"
                  value={results.carbs.grams}
                  unit="g"
                />
                <ResultCard
                  label="Fat"
                  value={results.fat.grams}
                  unit="g"
                />
              </div>

              {/* Tips */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">
                  Meal Planning Tips:
                </h3>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>
                    • Spread protein across 3-4 meals ({Math.round(results.protein.grams / 4)}g per meal)
                  </li>
                  <li>
                    • Track your intake with a food diary app
                  </li>
                  <li>
                    • Adjust based on how you feel and progress
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

function MacroEducation() {
  return (
    <div className="prose prose-neutral max-w-none">
      <h2>Understanding Macronutrients</h2>
      <p>
        Macronutrients (macros) are the three main nutrients your body needs in large amounts:
        protein, carbohydrates, and fats. Each plays a crucial role in your health and fitness.
      </p>

      <h3>The Three Macronutrients</h3>

      <h4>Protein (4 calories per gram)</h4>
      <p>
        Essential for building and repairing tissues, making enzymes and hormones. Aim for
        quality sources like lean meats, fish, eggs, legumes, and dairy.
      </p>

      <h4>Carbohydrates (4 calories per gram)</h4>
      <p>
        Your body&apos;s primary energy source, especially for high-intensity activity. Focus on
        complex carbs like whole grains, fruits, vegetables, and legumes.
      </p>

      <h4>Fats (9 calories per gram)</h4>
      <p>
        Necessary for hormone production, nutrient absorption, and cell health. Prioritize
        healthy fats from nuts, seeds, avocados, olive oil, and fatty fish.
      </p>

      <h3>How We Calculate Your Macros</h3>
      <p>Our calculator uses a proven three-step process:</p>
      <ol>
        <li>
          <strong>BMR (Basal Metabolic Rate):</strong> Calories burned at rest using the
          Mifflin-St Jeor equation
        </li>
        <li>
          <strong>TDEE (Total Daily Energy Expenditure):</strong> BMR multiplied by your
          activity level
        </li>
        <li>
          <strong>Macro Split:</strong> Calories distributed based on your diet preference
          and goals
        </li>
      </ol>

      <h3>Choosing Your Macro Split</h3>
      <div className="not-prose">
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-2">Balanced (30/40/30)</h4>
            <p className="text-sm text-neutral-600">
              Best for: General health, beginners, sustainable long-term eating
            </p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-2">High Protein (40/35/25)</h4>
            <p className="text-sm text-neutral-600">
              Best for: Building muscle, fat loss, athletes, high activity levels
            </p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-2">Low Carb (35/25/40)</h4>
            <p className="text-sm text-neutral-600">
              Best for: Fat loss, blood sugar control, moderate activity
            </p>
          </div>
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <h4 className="font-semibold text-neutral-900 mb-2">Keto (25/5/70)</h4>
            <p className="text-sm text-neutral-600">
              Best for: Ketogenic diet followers, specific health goals (consult doctor)
            </p>
          </div>
        </div>
      </div>

      <h3>Frequently Asked Questions</h3>

      <h4>How accurate is this calculator?</h4>
      <p>
        Our calculator provides estimates based on proven formulas. Individual needs vary
        based on genetics, metabolism, and other factors. Use results as a starting point
        and adjust based on your progress.
      </p>

      <h4>Should I hit my macros exactly every day?</h4>
      <p>
        Aim to hit your targets on average over the week. It&apos;s normal to have some variation
        day-to-day. Consistency over perfection is key.
      </p>

      <h4>What if I&apos;m not seeing results?</h4>
      <p>
        Give it 2-4 weeks before adjusting. Track consistently, and if you&apos;re not progressing
        toward your goal, adjust calories by 10-15% and reassess after another 2 weeks.
      </p>
    </div>
  )
}
