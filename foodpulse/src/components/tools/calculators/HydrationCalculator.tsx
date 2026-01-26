'use client'

import { useState } from 'react'
import { Droplet, Sun, Snowflake, Wind } from 'lucide-react'
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

const climates = [
  { value: 'temperate', label: 'Temperate (moderate climate)' },
  { value: 'hotHumid', label: 'Hot/Humid (tropical, desert)' },
  { value: 'cold', label: 'Cold (winter, cold climate)' },
]

const pregnancyOptions = [
  { value: 'none', label: 'Not applicable' },
  { value: 'pregnant', label: 'Pregnant' },
  { value: 'nursing', label: 'Nursing/Breastfeeding' },
]

interface HydrationResults {
  dailyWaterLiters: number
  dailyWaterOz: number
  glassesPerDay: number
  hourlyIntake: number
  bottlesPerDay: number
}

export function HydrationCalculator() {
  // Form state
  const [weight, setWeight] = useState<number>(70)
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [activity, setActivity] = useState('moderate')
  const [climate, setClimate] = useState('temperate')
  const [pregnancy, setPregnancy] = useState('none')

  // Results state
  const [results, setResults] = useState<HydrationResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const calculateHydration = () => {
    // Convert to kg if needed
    const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight

    // Base calculation: 30-35ml per kg body weight (we'll use 33ml as baseline)
    const baseWater = weightKg * 0.033 // liters

    // Activity multipliers
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.2,
      active: 1.3,
      veryActive: 1.5,
    }

    // Climate multipliers
    const climateMultipliers: Record<string, number> = {
      temperate: 1.0,
      hotHumid: 1.2,
      cold: 0.95,
    }

    // Calculate total
    let dailyWaterLiters = baseWater * activityMultipliers[activity] * climateMultipliers[climate]

    // Add extra for pregnancy/nursing
    if (pregnancy === 'pregnant') {
      dailyWaterLiters += 0.3 // Add 300ml
    } else if (pregnancy === 'nursing') {
      dailyWaterLiters += 0.7 // Add 700ml
    }

    // Round to 1 decimal place
    dailyWaterLiters = Math.round(dailyWaterLiters * 10) / 10

    // Convert to oz (1 liter = 33.814 oz)
    const dailyWaterOz = Math.round(dailyWaterLiters * 33.814)

    // Calculate glasses (8oz glasses)
    const glassesPerDay = Math.round(dailyWaterOz / 8)

    // Calculate hourly intake (awake 16 hours)
    const hourlyIntake = Math.round((dailyWaterLiters / 16) * 1000) // ml per hour

    // Calculate bottles (500ml bottles)
    const bottlesPerDay = Math.round(dailyWaterLiters * 2)

    setResults({
      dailyWaterLiters,
      dailyWaterOz,
      glassesPerDay,
      hourlyIntake,
      bottlesPerDay,
    })
    setShowResults(true)
  }

  const getClimateIcon = () => {
    if (climate === 'hotHumid') return <Sun className="w-5 h-5 text-orange-500" />
    if (climate === 'cold') return <Snowflake className="w-5 h-5 text-blue-500" />
    return <Wind className="w-5 h-5 text-neutral-500" />
  }

  const relatedTools = [
    { title: 'Calorie Calculator', slug: 'calorie-calculator', icon: <Droplet className="w-5 h-5" /> },
    { title: 'Protein Calculator', slug: 'protein-calculator', icon: <Droplet className="w-5 h-5" /> },
  ]

  return (
    <ToolLayout
      title="Hydration Calculator"
      description="Calculate your daily water intake needs based on your weight, activity level, and climate."
      icon={<Droplet className="w-8 h-8" />}
      slug="hydration-calculator"
      relatedTools={relatedTools}
      educationalContent={<HydrationEducation />}
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
            helpText="More active = more water needed"
          />

          <SelectInput
            label="Climate/Environment"
            value={climate}
            onChange={setClimate}
            options={climates}
            helpText="Hot climates increase water needs"
          />

          <SelectInput
            label="Pregnancy/Nursing Status"
            value={pregnancy}
            onChange={setPregnancy}
            options={pregnancyOptions}
          />

          <button
            onClick={calculateHydration}
            className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Droplet className="w-5 h-5" />
            Calculate My Water Needs
          </button>
        </div>

        {/* Results Section */}
        <div className="p-6 md:p-8 bg-neutral-50">
          {!showResults ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500">
              <Droplet className="w-12 h-12 mb-4 opacity-30" />
              <p>Enter your details and click calculate to see your results</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Main Result */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Your Daily Water Intake
                </h2>
                <ResultCard
                  label="Daily Water Goal"
                  value={results.dailyWaterLiters}
                  unit="L"
                  highlight
                  subtext={`${results.dailyWaterOz} fl oz`}
                />
              </div>

              {/* Visual Water Tracker */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  Easy Ways to Track
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-800">8oz Glasses</span>
                    <span className="text-lg font-bold text-blue-900">{results.glassesPerDay}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-800">500ml Bottles</span>
                    <span className="text-lg font-bold text-blue-900">{results.bottlesPerDay}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-800">Per Hour (awake)</span>
                    <span className="text-lg font-bold text-blue-900">{results.hourlyIntake}ml</span>
                  </div>
                </div>
              </div>

              {/* Climate Impact */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <div className="flex items-center gap-2 mb-2">
                  {getClimateIcon()}
                  <h3 className="font-medium text-neutral-900">
                    Climate Adjustment
                  </h3>
                </div>
                <p className="text-sm text-neutral-600">
                  {climate === 'hotHumid' && 'Hot climates increase water needs by ~20% due to sweating'}
                  {climate === 'temperate' && 'Moderate climate with standard water requirements'}
                  {climate === 'cold' && 'Cold climates slightly reduce thirst but hydration still important'}
                </p>
              </div>

              {/* Pregnancy/Nursing Info */}
              {pregnancy !== 'none' && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="font-medium text-green-900 mb-2">
                    {pregnancy === 'pregnant' ? 'Pregnancy' : 'Nursing'} Bonus
                  </h3>
                  <p className="text-sm text-green-700">
                    {pregnancy === 'pregnant'
                      ? 'Added 300ml for pregnancy hydration needs'
                      : 'Added 700ml for breastfeeding hydration needs'}
                  </p>
                </div>
              )}

              {/* Tips */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">
                  Hydration Tips:
                </h3>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li>• Drink before you feel thirsty</li>
                  <li>• Check urine color (pale yellow is good)</li>
                  <li>• Increase intake during exercise</li>
                  <li>• Water-rich foods count too (fruits, veggies)</li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ToolLayout>
  )
}

function HydrationEducation() {
  return (
    <div className="prose prose-neutral max-w-none">
      <h2>Why Hydration Matters</h2>
      <p>
        Water is essential for nearly every bodily function, from regulating body temperature
        to transporting nutrients and removing waste. Proper hydration improves energy,
        cognitive function, physical performance, and overall health.
      </p>

      <h3>How Much Water Do You Need?</h3>
      <p>
        Individual water needs vary based on several factors:
      </p>
      <ul>
        <li><strong>Body weight:</strong> Larger bodies need more water</li>
        <li><strong>Activity level:</strong> Exercise increases water loss through sweat</li>
        <li><strong>Climate:</strong> Heat and humidity increase sweat loss</li>
        <li><strong>Health status:</strong> Illness, pregnancy, and nursing increase needs</li>
        <li><strong>Diet:</strong> High-protein or high-sodium diets require more water</li>
      </ul>

      <h3>Our Calculation Method</h3>
      <p>
        We use a body-weight-based formula recommended by nutrition experts:
      </p>
      <div className="not-prose my-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <p className="text-sm font-mono text-neutral-700">
          Base Water = Body Weight (kg) × 33ml per kg
        </p>
        <p className="text-sm text-neutral-600 mt-2">
          Then adjusted for activity level, climate, and special conditions
        </p>
      </div>

      <h3>Signs of Good Hydration</h3>
      <div className="not-prose">
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Well Hydrated</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Pale yellow urine</li>
              <li>• Urinating every 2-4 hours</li>
              <li>• Good energy levels</li>
              <li>• Moist lips and mouth</li>
            </ul>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Dehydrated</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Dark yellow/amber urine</li>
              <li>• Dry mouth and lips</li>
              <li>• Headache or fatigue</li>
              <li>• Dizziness or confusion</li>
            </ul>
          </div>
        </div>
      </div>

      <h3>What Counts as Water?</h3>
      <p>
        While plain water is best, other fluids and foods contribute to hydration:
      </p>
      <ul>
        <li><strong>100% hydrating:</strong> Water, sparkling water, herbal tea</li>
        <li><strong>~90% hydrating:</strong> Regular tea, coffee (moderate amounts)</li>
        <li><strong>Water-rich foods:</strong> Watermelon, cucumber, oranges, lettuce (85-95% water)</li>
        <li><strong>Limited benefit:</strong> Sugary drinks, alcohol (actually increase water needs)</li>
      </ul>

      <h3>Special Considerations</h3>

      <h4>During Exercise</h4>
      <p>
        Add 400-800ml (12-24 oz) of water for every hour of moderate exercise. For intense
        exercise or hot conditions, increase further and consider electrolyte replacement.
      </p>

      <h4>Pregnancy & Nursing</h4>
      <p>
        Pregnant women need an extra 300ml per day, while breastfeeding mothers need an
        additional 700ml to support milk production and prevent dehydration.
      </p>

      <h4>Hot Weather</h4>
      <p>
        In hot or humid conditions, you may need 20-30% more water than usual due to
        increased sweating. Monitor urine color and increase intake as needed.
      </p>

      <h3>Frequently Asked Questions</h3>

      <h4>Can you drink too much water?</h4>
      <p>
        Yes, though it&apos;s rare. Overhydration (hyponatremia) can occur if you drink excessive
        amounts very quickly, diluting blood sodium levels. Stick to recommended amounts
        and spread intake throughout the day.
      </p>

      <h4>Does coffee dehydrate you?</h4>
      <p>
        No. While caffeine has a mild diuretic effect, the water in coffee more than
        compensates. Regular coffee drinkers develop tolerance to caffeine&apos;s diuretic effects.
      </p>

      <h4>What if I don&apos;t like plain water?</h4>
      <p>
        Try infusing water with fruit, herbs, or cucumber. Herbal teas, sparkling water, and
        water-rich foods like soups and fruits are excellent alternatives.
      </p>

      <h4>Should I drink 8 glasses a day?</h4>
      <p>
        The &quot;8×8 rule&quot; (eight 8-oz glasses) is a good general guideline but doesn&apos;t account
        for individual needs. Use our calculator for a personalized recommendation based on
        your specific factors.
      </p>
    </div>
  )
}
