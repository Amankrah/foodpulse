'use client'

import { useState } from 'react'
import { Wheat, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react'
import { ToolLayout } from '../ToolLayout'
import { NumberInput } from '../shared/NumberInput'
import { SelectInput } from '../shared/SelectInput'
import { ResultCard } from '../shared/ResultCard'

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'light', label: 'Lightly Active' },
  { value: 'moderate', label: 'Moderately Active' },
  { value: 'active', label: 'Very Active' },
]

interface FiberResults {
  recommendedFiber: number
  currentIntake: number
  gap: number
  gapPercentage: number
  status: 'excellent' | 'good' | 'needs-improvement' | 'low'
  statusColor: string
  servingsNeeded: number
}

const highFiberFoods = [
  { name: 'Lentils (cooked)', serving: '1 cup', fiber: 15.6 },
  { name: 'Black beans (cooked)', serving: '1 cup', fiber: 15.0 },
  { name: 'Avocado', serving: '1 medium', fiber: 10.0 },
  { name: 'Raspberries', serving: '1 cup', fiber: 8.0 },
  { name: 'Pear (with skin)', serving: '1 medium', fiber: 5.5 },
  { name: 'Apple (with skin)', serving: '1 medium', fiber: 4.4 },
  { name: 'Oatmeal (cooked)', serving: '1 cup', fiber: 4.0 },
  { name: 'Broccoli (cooked)', serving: '1 cup', fiber: 5.1 },
  { name: 'Sweet potato (with skin)', serving: '1 medium', fiber: 3.8 },
  { name: 'Almonds', serving: '1 oz (23 nuts)', fiber: 3.5 },
  { name: 'Whole wheat bread', serving: '2 slices', fiber: 3.4 },
  { name: 'Chia seeds', serving: '1 tbsp', fiber: 5.0 },
]

export function FiberCalculator() {
  // Form state
  const [age, setAge] = useState<number>(30)
  const [gender, setGender] = useState('male')
  const [activity, setActivity] = useState('moderate')
  const [currentIntake, setCurrentIntake] = useState<number>(15)

  // Results state
  const [results, setResults] = useState<FiberResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const calculateFiber = () => {
    // Recommended fiber intake:
    // Men under 50: 38g/day
    // Men 50+: 30g/day
    // Women under 50: 25g/day
    // Women 50+: 21g/day

    let recommendedFiber: number

    if (gender === 'male') {
      recommendedFiber = age < 50 ? 38 : 30
    } else {
      recommendedFiber = age < 50 ? 25 : 21
    }

    // Adjust slightly for activity level (higher activity = slightly higher need)
    const activityMultipliers: Record<string, number> = {
      sedentary: 0.95,
      light: 1.0,
      moderate: 1.05,
      active: 1.1,
    }

    recommendedFiber = Math.round(recommendedFiber * activityMultipliers[activity])

    // Calculate gap
    const gap = Math.round(recommendedFiber - currentIntake)
    const gapPercentage = Math.round((currentIntake / recommendedFiber) * 100)

    // Determine status
    let status: 'excellent' | 'good' | 'needs-improvement' | 'low'
    let statusColor: string

    if (gapPercentage >= 90) {
      status = 'excellent'
      statusColor = 'text-green-600'
    } else if (gapPercentage >= 70) {
      status = 'good'
      statusColor = 'text-blue-600'
    } else if (gapPercentage >= 50) {
      status = 'needs-improvement'
      statusColor = 'text-orange-600'
    } else {
      status = 'low'
      statusColor = 'text-red-600'
    }

    // Calculate servings needed (assuming average 5g per serving)
    const servingsNeeded = Math.max(0, Math.ceil(gap / 5))

    setResults({
      recommendedFiber,
      currentIntake,
      gap,
      gapPercentage,
      status,
      statusColor,
      servingsNeeded,
    })
    setShowResults(true)
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'excellent':
        return "You're meeting your fiber goals! Keep it up."
      case 'good':
        return "You're doing well, but there's room for improvement."
      case 'needs-improvement':
        return "You're below recommended levels. Try adding more fiber-rich foods."
      case 'low':
        return "Your fiber intake is significantly low. Increase gradually to avoid digestive issues."
      default:
        return ''
    }
  }

  const relatedTools = [
    { title: 'Calorie Calculator', slug: 'calorie-calculator', icon: <Wheat className="w-5 h-5" /> },
    { title: 'Macro Calculator', slug: 'macro-calculator', icon: <Wheat className="w-5 h-5" /> },
  ]

  return (
    <ToolLayout
      title="Fiber Calculator"
      description="Calculate your daily fiber needs and track your intake to improve digestive health."
      icon={<Wheat className="w-8 h-8" />}
      slug="fiber-calculator"
      relatedTools={relatedTools}
      educationalContent={<FiberEducation />}
    >
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
        {/* Form Section */}
        <div className="p-6 md:p-8 space-y-6">
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
            helpText="More active people need slightly more fiber"
          />

          <NumberInput
            label="Current Daily Fiber Intake"
            value={currentIntake}
            onChange={setCurrentIntake}
            min={0}
            max={100}
            unit="grams"
            helpText="Estimate your average daily fiber intake"
            placeholder="e.g., 15"
          />

          <button
            onClick={calculateFiber}
            className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Wheat className="w-5 h-5" />
            Calculate My Fiber Needs
          </button>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Track your fiber intake for 2-3 days to get an accurate
              estimate. Check nutrition labels and use food tracking apps.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-6 md:p-8 bg-neutral-50">
          {!showResults ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500">
              <Wheat className="w-12 h-12 mb-4 opacity-30" />
              <p>Enter your details and click calculate to see your results</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Main Result */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Your Fiber Analysis
                </h2>
                <ResultCard
                  label="Recommended Daily Fiber"
                  value={results.recommendedFiber}
                  unit="g"
                  highlight
                  subtext="per day"
                />
              </div>

              {/* Current Intake */}
              <div className="grid grid-cols-2 gap-3">
                <ResultCard
                  label="Current Intake"
                  value={results.currentIntake}
                  unit="g"
                />
                <ResultCard
                  label="Progress"
                  value={results.gapPercentage}
                  unit="%"
                />
              </div>

              {/* Status */}
              <div className={`p-4 rounded-xl border-2 ${
                results.status === 'excellent'
                  ? 'bg-green-50 border-green-200'
                  : results.status === 'good'
                  ? 'bg-blue-50 border-blue-200'
                  : results.status === 'needs-improvement'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start gap-2 mb-2">
                  {results.status === 'excellent' || results.status === 'good' ? (
                    <CheckCircle2 className={`w-5 h-5 ${results.statusColor} flex-shrink-0`} />
                  ) : (
                    <AlertCircle className={`w-5 h-5 ${results.statusColor} flex-shrink-0`} />
                  )}
                  <div>
                    <h3 className={`font-semibold ${results.statusColor}`}>
                      {results.status === 'excellent' ? 'Excellent!' :
                       results.status === 'good' ? 'Good Progress' :
                       results.status === 'needs-improvement' ? 'Needs Improvement' :
                       'Low Fiber Intake'}
                    </h3>
                    <p className="text-sm text-neutral-700 mt-1">
                      {getStatusMessage(results.status)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gap Analysis */}
              {results.gap > 0 && (
                <div className="p-4 bg-white rounded-xl border border-neutral-200">
                  <h3 className="font-medium text-neutral-900 mb-2">
                    To Reach Your Goal
                  </h3>
                  <p className="text-2xl font-bold text-neutral-800 mb-2">
                    +{results.gap}
                    <span className="text-sm font-normal text-neutral-500 ml-1">grams/day</span>
                  </p>
                  <p className="text-sm text-neutral-600">
                    Add approximately <strong>{results.servingsNeeded}</strong> more servings of
                    high-fiber foods daily
                  </p>
                </div>
              )}

              {/* Quick Tips */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">
                  Quick Tips to Increase Fiber:
                </h3>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• Start your day with oatmeal or whole grain cereal</li>
                  <li>• Add beans or lentils to soups and salads</li>
                  <li>• Snack on fruits, vegetables, or nuts</li>
                  <li>• Choose whole wheat bread over white bread</li>
                  <li>• Eat fruit with the skin on (apples, pears)</li>
                  <li>• Increase fiber gradually to avoid bloating</li>
                  <li>• Drink plenty of water with high-fiber meals</li>
                </ul>
              </div>

              {/* High-Fiber Foods */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-3">
                  Top High-Fiber Foods
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {highFiberFoods.map((food) => (
                    <div
                      key={food.name}
                      className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{food.name}</p>
                        <p className="text-xs text-neutral-500">{food.serving}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">{food.fiber}g</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ToolLayout>
  )
}

function FiberEducation() {
  return (
    <div className="prose prose-neutral max-w-none">
      <h2>Why Fiber Matters</h2>
      <p>
        Dietary fiber is a type of carbohydrate that the body can&apos;t digest. While it passes through
        your digestive system relatively intact, it provides numerous health benefits including
        improved digestive health, better blood sugar control, and reduced risk of chronic diseases.
      </p>

      <h3>Types of Fiber</h3>

      <h4>Soluble Fiber</h4>
      <p>
        Dissolves in water to form a gel-like substance. It can help lower blood cholesterol and
        glucose levels.
      </p>
      <ul>
        <li><strong>Sources:</strong> Oats, beans, apples, citrus fruits, carrots, barley</li>
        <li><strong>Benefits:</strong> Lowers cholesterol, stabilizes blood sugar, feeds beneficial gut bacteria</li>
      </ul>

      <h4>Insoluble Fiber</h4>
      <p>
        Doesn&apos;t dissolve in water. It helps food move through your digestive system and adds bulk
        to stool.
      </p>
      <ul>
        <li><strong>Sources:</strong> Whole wheat flour, wheat bran, nuts, beans, vegetables</li>
        <li><strong>Benefits:</strong> Promotes regular bowel movements, prevents constipation</li>
      </ul>

      <h3>Recommended Daily Fiber Intake</h3>
      <div className="not-prose">
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Men</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Under 50: <strong>38g/day</strong></li>
              <li>• 50 and older: <strong>30g/day</strong></li>
            </ul>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
            <h4 className="font-semibold text-pink-900 mb-2">Women</h4>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• Under 50: <strong>25g/day</strong></li>
              <li>• 50 and older: <strong>21g/day</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <h3>Health Benefits of Fiber</h3>

      <h4>Digestive Health</h4>
      <ul>
        <li>Prevents constipation by adding bulk to stool</li>
        <li>Reduces risk of hemorrhoids and diverticular disease</li>
        <li>May lower risk of colorectal cancer</li>
        <li>Feeds beneficial gut bacteria (prebiotic effect)</li>
      </ul>

      <h4>Heart Health</h4>
      <ul>
        <li>Lowers LDL (bad) cholesterol levels</li>
        <li>Reduces blood pressure</li>
        <li>Decreases inflammation</li>
        <li>May reduce risk of heart disease and stroke</li>
      </ul>

      <h4>Blood Sugar Control</h4>
      <ul>
        <li>Slows absorption of sugar</li>
        <li>Helps improve blood sugar levels</li>
        <li>Reduces risk of type 2 diabetes</li>
        <li>Beneficial for people with diabetes</li>
      </ul>

      <h4>Weight Management</h4>
      <ul>
        <li>Increases feelings of fullness</li>
        <li>Helps control appetite</li>
        <li>High-fiber foods are often lower in calories</li>
        <li>May help with weight loss and maintenance</li>
      </ul>

      <h3>Best High-Fiber Foods</h3>

      <h4>Legumes (Highest Fiber)</h4>
      <ul>
        <li>Lentils: 15.6g per cup</li>
        <li>Black beans: 15g per cup</li>
        <li>Lima beans: 13.2g per cup</li>
        <li>Chickpeas: 12.5g per cup</li>
      </ul>

      <h4>Whole Grains</h4>
      <ul>
        <li>Bran cereal: 5-10g per serving</li>
        <li>Quinoa: 5.2g per cup</li>
        <li>Oatmeal: 4g per cup</li>
        <li>Brown rice: 3.5g per cup</li>
      </ul>

      <h4>Fruits</h4>
      <ul>
        <li>Raspberries: 8g per cup</li>
        <li>Pear: 5.5g per medium fruit</li>
        <li>Apple with skin: 4.4g per medium fruit</li>
        <li>Banana: 3.1g per medium fruit</li>
      </ul>

      <h4>Vegetables</h4>
      <ul>
        <li>Artichoke: 10g per medium</li>
        <li>Green peas: 9g per cup</li>
        <li>Broccoli: 5g per cup</li>
        <li>Brussels sprouts: 4g per cup</li>
      </ul>

      <h4>Nuts and Seeds</h4>
      <ul>
        <li>Chia seeds: 10g per 2 tbsp</li>
        <li>Almonds: 3.5g per oz (23 nuts)</li>
        <li>Flaxseeds: 2.8g per tbsp</li>
        <li>Pistachios: 2.9g per oz</li>
      </ul>

      <h3>Tips for Increasing Fiber Intake</h3>

      <h4>Start Your Day with Fiber</h4>
      <ul>
        <li>Choose high-fiber breakfast cereals (5g+ per serving)</li>
        <li>Add berries or sliced banana to cereal or oatmeal</li>
        <li>Make overnight oats with chia seeds</li>
        <li>Choose whole grain toast over white bread</li>
      </ul>

      <h4>Smart Substitutions</h4>
      <ul>
        <li>White bread → Whole wheat bread</li>
        <li>White rice → Brown rice or quinoa</li>
        <li>Regular pasta → Whole wheat or legume pasta</li>
        <li>Potato chips → Popcorn or vegetables with hummus</li>
      </ul>

      <h4>Add Fiber Boosters</h4>
      <ul>
        <li>Sprinkle ground flaxseed or chia seeds on yogurt</li>
        <li>Add beans to soups, salads, and casseroles</li>
        <li>Toss vegetables into pasta dishes and omelets</li>
        <li>Keep the skin on fruits and vegetables when safe</li>
      </ul>

      <h3>Important Considerations</h3>

      <h4>Increase Fiber Gradually</h4>
      <p>
        Adding too much fiber too quickly can cause bloating, gas, and abdominal discomfort.
        Increase your intake gradually over several weeks to allow your digestive system to adjust.
      </p>

      <h4>Drink Plenty of Water</h4>
      <p>
        Fiber works best when it absorbs water, making stools soft and bulky. Aim for at least
        8 glasses of water daily, more if you&apos;re very active or increasing fiber intake.
      </p>

      <h4>Balance Both Types</h4>
      <p>
        Try to get both soluble and insoluble fiber from a variety of foods. Most plant foods
        contain both types in different proportions.
      </p>

      <h3>Frequently Asked Questions</h3>

      <h4>Can I get too much fiber?</h4>
      <p>
        Yes, excessive fiber (over 70g/day) can cause problems like bloating, gas, and nutrient
        absorption issues. Stick to recommended amounts and increase gradually.
      </p>

      <h4>Should I take fiber supplements?</h4>
      <p>
        Whole foods are best as they provide other nutrients too. However, supplements like
        psyllium husk can help if you struggle to get enough fiber from food. Consult your doctor
        first.
      </p>

      <h4>Why do I feel bloated when I eat more fiber?</h4>
      <p>
        This is normal if you increase fiber too quickly. Your gut bacteria need time to adjust.
        Increase fiber gradually, drink more water, and the symptoms should improve.
      </p>

      <h4>Do I need to count fiber if I&apos;m counting carbs?</h4>
      <p>
        Fiber is a carbohydrate, but many people subtract fiber from total carbs to get &quot;net carbs&quot;
        since fiber isn&apos;t digested. This is especially common in low-carb diets.
      </p>

      <h4>Is fiber important for weight loss?</h4>
      <p>
        Yes! High-fiber foods are more filling, helping you eat less overall. Fiber also slows
        digestion, keeping you satisfied longer and stabilizing blood sugar levels.
      </p>
    </div>
  )
}
