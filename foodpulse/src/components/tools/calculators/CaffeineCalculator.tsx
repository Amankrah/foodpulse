'use client'

import { useState } from 'react'
import { Coffee, AlertTriangle, Clock } from 'lucide-react'
import { ToolLayout } from '../ToolLayout'
import { NumberInput } from '../shared/NumberInput'
import { SelectInput } from '../shared/SelectInput'
import { ResultCard } from '../shared/ResultCard'

const genders = [
  { value: 'adult', label: 'Adult (18+)' },
  { value: 'pregnant', label: 'Pregnant' },
  { value: 'adolescent', label: 'Adolescent (12-17)' },
]

// Caffeine content database (mg per standard serving)
const caffeineSourcesDatabase = [
  // Coffee
  { name: 'Coffee (brewed, 8oz)', category: 'Coffee', caffeine: 95, serving: '8 oz cup' },
  { name: 'Espresso (1 shot)', category: 'Coffee', caffeine: 64, serving: '1 oz shot' },
  { name: 'Cold Brew (12oz)', category: 'Coffee', caffeine: 200, serving: '12 oz' },
  { name: 'Instant Coffee (8oz)', category: 'Coffee', caffeine: 62, serving: '8 oz cup' },
  { name: 'Decaf Coffee (8oz)', category: 'Coffee', caffeine: 2, serving: '8 oz cup' },

  // Tea
  { name: 'Black Tea (8oz)', category: 'Tea', caffeine: 47, serving: '8 oz cup' },
  { name: 'Green Tea (8oz)', category: 'Tea', caffeine: 28, serving: '8 oz cup' },
  { name: 'White Tea (8oz)', category: 'Tea', caffeine: 15, serving: '8 oz cup' },
  { name: 'Oolong Tea (8oz)', category: 'Tea', caffeine: 38, serving: '8 oz cup' },
  { name: 'Matcha (1 tsp)', category: 'Tea', caffeine: 70, serving: '1 tsp powder' },

  // Soda
  { name: 'Coca-Cola (12oz)', category: 'Soda', caffeine: 34, serving: '12 oz can' },
  { name: 'Pepsi (12oz)', category: 'Soda', caffeine: 38, serving: '12 oz can' },
  { name: 'Mountain Dew (12oz)', category: 'Soda', caffeine: 54, serving: '12 oz can' },
  { name: 'Dr Pepper (12oz)', category: 'Soda', caffeine: 41, serving: '12 oz can' },

  // Energy Drinks
  { name: 'Red Bull (8.4oz)', category: 'Energy Drink', caffeine: 80, serving: '8.4 oz can' },
  { name: 'Monster Energy (16oz)', category: 'Energy Drink', caffeine: 160, serving: '16 oz can' },
  { name: '5-Hour Energy', category: 'Energy Drink', caffeine: 200, serving: '2 oz bottle' },
  { name: 'Bang Energy (16oz)', category: 'Energy Drink', caffeine: 300, serving: '16 oz can' },

  // Chocolate
  { name: 'Dark Chocolate (1oz)', category: 'Food', caffeine: 23, serving: '1 oz' },
  { name: 'Milk Chocolate (1oz)', category: 'Food', caffeine: 6, serving: '1 oz' },
  { name: 'Hot Chocolate (8oz)', category: 'Food', caffeine: 5, serving: '8 oz cup' },

  // Supplements
  { name: 'Caffeine Pill (200mg)', category: 'Supplement', caffeine: 200, serving: '1 pill' },
  { name: 'Pre-Workout (serving)', category: 'Supplement', caffeine: 150, serving: '1 scoop' },
]

interface CaffeineItem {
  source: string
  amount: number
  caffeine: number
  time: string
}

interface CaffeineResults {
  totalCaffeine: number
  safeLimit: number
  percentOfLimit: number
  status: 'safe' | 'moderate' | 'high' | 'excessive'
  statusColor: string
  peakTime: string
  halfLifeHours: number
  estimatedClearanceTime: string
  recommendations: string[]
}

export function CaffeineCalculator() {
  // Form state
  const [population, setPopulation] = useState('adult')
  const [sensitivity, setSensitivity] = useState('normal')
  const [caffeineItems, setCaffeineItems] = useState<CaffeineItem[]>([])
  const [selectedSource, setSelectedSource] = useState(caffeineSourcesDatabase[0].name)
  const [customAmount, setCustomAmount] = useState<number>(1)
  const [consumptionTime, setConsumptionTime] = useState('08:00')

  // Results state
  const [results, setResults] = useState<CaffeineResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const addCaffeineItem = () => {
    const source = caffeineSourcesDatabase.find(s => s.name === selectedSource)
    if (!source) return

    const newItem: CaffeineItem = {
      source: source.name,
      amount: customAmount,
      caffeine: source.caffeine * customAmount,
      time: consumptionTime,
    }

    setCaffeineItems([...caffeineItems, newItem])
  }

  const removeItem = (index: number) => {
    setCaffeineItems(caffeineItems.filter((_, i) => i !== index))
  }

  const calculateCaffeine = () => {
    // Total caffeine intake
    const totalCaffeine = caffeineItems.reduce((sum, item) => sum + item.caffeine, 0)

    // Safe limits based on population (FDA and health guidelines)
    let safeLimit: number
    let halfLifeHours: number

    if (population === 'adult') {
      safeLimit = 400 // mg/day for healthy adults (FDA)
      halfLifeHours = sensitivity === 'high' ? 7 : sensitivity === 'low' ? 3 : 5
    } else if (population === 'pregnant') {
      safeLimit = 200 // mg/day for pregnant women (ACOG)
      halfLifeHours = 10 // Pregnancy increases half-life
    } else {
      safeLimit = 100 // mg/day for adolescents (AAP)
      halfLifeHours = 5
    }

    // Calculate percentage of safe limit
    const percentOfLimit = Math.round((totalCaffeine / safeLimit) * 100)

    // Determine status
    let status: 'safe' | 'moderate' | 'high' | 'excessive'
    let statusColor: string

    if (percentOfLimit <= 50) {
      status = 'safe'
      statusColor = 'text-green-600'
    } else if (percentOfLimit <= 80) {
      status = 'moderate'
      statusColor = 'text-blue-600'
    } else if (percentOfLimit <= 100) {
      status = 'high'
      statusColor = 'text-orange-600'
    } else {
      status = 'excessive'
      statusColor = 'text-red-600'
    }

    // Peak time: caffeine peaks in bloodstream 30-60 minutes after consumption
    const peakTime = '30-60 minutes'

    // Clearance time: 5-6 half-lives for 97% clearance
    const clearanceHours = Math.round(halfLifeHours * 5.5)
    const estimatedClearanceTime = `${clearanceHours} hours`

    // Generate recommendations
    const recommendations: string[] = []

    if (status === 'excessive') {
      recommendations.push('⚠️ Your caffeine intake exceeds safe limits')
      recommendations.push('Consider reducing your caffeine consumption')
      recommendations.push('Watch for symptoms: anxiety, rapid heartbeat, insomnia')
    } else if (status === 'high') {
      recommendations.push('You\'re approaching the safe daily limit')
      recommendations.push('Avoid additional caffeine today')
    } else if (status === 'moderate') {
      recommendations.push('Your intake is moderate but approaching limits')
      recommendations.push('Space out caffeine consumption throughout the day')
    } else {
      recommendations.push('Your caffeine intake is within safe limits')
      recommendations.push('Continue monitoring your consumption')
    }

    // General recommendations
    recommendations.push('Avoid caffeine 6+ hours before bedtime')
    recommendations.push('Stay hydrated - drink water with caffeinated beverages')

    if (population === 'pregnant') {
      recommendations.push('Consult your healthcare provider about caffeine intake')
    }

    setResults({
      totalCaffeine,
      safeLimit,
      percentOfLimit,
      status,
      statusColor,
      peakTime,
      halfLifeHours,
      estimatedClearanceTime,
      recommendations,
    })
    setShowResults(true)
  }

  const relatedTools = [
    { title: 'Hydration Calculator', slug: 'hydration-calculator', icon: <Coffee className="w-5 h-5" /> },
    { title: 'Calorie Calculator', slug: 'calorie-calculator', icon: <Coffee className="w-5 h-5" /> },
  ]

  const groupedSources = caffeineSourcesDatabase.reduce((acc, source) => {
    if (!acc[source.category]) {
      acc[source.category] = []
    }
    acc[source.category].push(source)
    return acc
  }, {} as Record<string, typeof caffeineSourcesDatabase>)

  return (
    <ToolLayout
      title="Caffeine Calculator"
      description="Track your daily caffeine intake and stay within safe limits for optimal health and sleep."
      icon={<Coffee className="w-8 h-8" />}
      slug="caffeine-calculator"
      relatedTools={relatedTools}
      educationalContent={<CaffeineEducation />}
    >
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
        {/* Form Section */}
        <div className="p-6 md:p-8 space-y-6">
          <SelectInput
            label="Population Group"
            value={population}
            onChange={setPopulation}
            options={genders}
            helpText="Different groups have different safe limits"
          />

          <SelectInput
            label="Caffeine Sensitivity"
            value={sensitivity}
            onChange={setSensitivity}
            options={[
              { value: 'low', label: 'Low (metabolize quickly)' },
              { value: 'normal', label: 'Normal' },
              { value: 'high', label: 'High (sensitive to caffeine)' },
            ]}
            helpText="Affects how long caffeine stays in your system"
          />

          <div className="border-t pt-6">
            <h3 className="font-medium text-neutral-900 mb-4">Add Caffeine Sources</h3>

            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="caffeine-source-select"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Caffeine Source
                </label>
                <select
                  id="caffeine-source-select"
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
                >
                  {Object.entries(groupedSources).map(([category, sources]) => (
                    <optgroup key={category} label={category}>
                      {sources.map((source) => (
                        <option key={source.name} value={source.name}>
                          {source.name} ({source.caffeine}mg)
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <NumberInput
                  label="Amount"
                  value={customAmount}
                  onChange={setCustomAmount}
                  min={0.5}
                  max={10}
                  step={0.5}
                  unit="servings"
                />
                <div>
                  <label 
                    htmlFor="consumption-time-input"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Time Consumed
                  </label>
                  <input
                    id="consumption-time-input"
                    type="time"
                    value={consumptionTime}
                    onChange={(e) => setConsumptionTime(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={addCaffeineItem}
                className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add Item
              </button>
            </div>
          </div>

          {/* Added Items List */}
          {caffeineItems.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="font-medium text-neutral-900 mb-3">Your Caffeine Today</h3>
              <div className="space-y-2">
                {caffeineItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{item.source}</p>
                      <p className="text-xs text-neutral-500">
                        {item.amount}× at {item.time} • {item.caffeine}mg
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={calculateCaffeine}
            disabled={caffeineItems.length === 0}
            className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Coffee className="w-5 h-5" />
            Calculate My Caffeine Intake
          </button>
        </div>

        {/* Results Section */}
        <div className="p-6 md:p-8 bg-neutral-50">
          {!showResults ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500">
              <Coffee className="w-12 h-12 mb-4 opacity-30" />
              <p>Add caffeine sources and click calculate to see your results</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Main Result */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Your Caffeine Intake
                </h2>
                <ResultCard
                  label="Total Caffeine Today"
                  value={results.totalCaffeine}
                  unit="mg"
                  highlight
                  subtext={`${results.percentOfLimit}% of safe limit`}
                />
              </div>

              {/* Status */}
              <div className={`p-4 rounded-xl border-2 ${
                results.status === 'safe'
                  ? 'bg-green-50 border-green-200'
                  : results.status === 'moderate'
                  ? 'bg-blue-50 border-blue-200'
                  : results.status === 'high'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-start gap-2">
                  {results.status === 'excessive' || results.status === 'high' ? (
                    <AlertTriangle className={`w-5 h-5 ${results.statusColor} flex-shrink-0 mt-0.5`} />
                  ) : (
                    <Coffee className={`w-5 h-5 ${results.statusColor} flex-shrink-0 mt-0.5`} />
                  )}
                  <div>
                    <h3 className={`font-semibold ${results.statusColor}`}>
                      {results.status === 'safe' ? 'Safe Level' :
                       results.status === 'moderate' ? 'Moderate Level' :
                       results.status === 'high' ? 'High Level' :
                       'Excessive Level'}
                    </h3>
                    <p className="text-sm text-neutral-700 mt-1">
                      Safe daily limit: {results.safeLimit}mg
                    </p>
                  </div>
                </div>
              </div>

              {/* Caffeine Metabolism */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Caffeine Metabolism
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Peak Effect:</span>
                    <span className="font-medium text-neutral-900">{results.peakTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Half-Life:</span>
                    <span className="font-medium text-neutral-900">{results.halfLifeHours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">~97% Cleared:</span>
                    <span className="font-medium text-neutral-900">{results.estimatedClearanceTime}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-neutral-900">Daily Limit Progress</span>
                  <span className={`font-bold ${results.statusColor}`}>
                    {results.percentOfLimit}%
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      results.status === 'safe' ? 'bg-green-500' :
                      results.status === 'moderate' ? 'bg-blue-500' :
                      results.status === 'high' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(results.percentOfLimit, 100)}%` }}
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">
                  Recommendations:
                </h3>
                <ul className="text-sm text-neutral-600 space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ToolLayout>
  )
}

function CaffeineEducation() {
  return (
    <div className="prose prose-neutral max-w-none">
      <h2>Understanding Caffeine</h2>
      <p>
        Caffeine is the world&apos;s most widely consumed psychoactive substance. It&apos;s a natural
        stimulant found in coffee, tea, chocolate, and many other foods and beverages. Understanding
        your caffeine intake helps you optimize energy while avoiding negative side effects.
      </p>

      <h3>How Caffeine Works</h3>
      <p>
        Caffeine works by blocking adenosine receptors in the brain. Adenosine is a neurotransmitter
        that promotes sleep and relaxation. By blocking these receptors, caffeine increases alertness
        and reduces fatigue.
      </p>

      <h4>Caffeine Metabolism</h4>
      <ul>
        <li><strong>Absorption:</strong> Caffeine is rapidly absorbed, reaching peak blood levels in 30-60 minutes</li>
        <li><strong>Half-life:</strong> Average 5 hours in healthy adults (varies by individual)</li>
        <li><strong>Clearance:</strong> Takes 5-6 half-lives for ~97% clearance (typically 24-30 hours)</li>
        <li><strong>Metabolism:</strong> Primarily metabolized by the liver (CYP1A2 enzyme)</li>
      </ul>

      <h3>Safe Caffeine Limits</h3>
      <div className="not-prose">
        <div className="grid md:grid-cols-3 gap-4 my-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Healthy Adults</h4>
            <p className="text-2xl font-bold text-green-700 mb-1">400mg</p>
            <p className="text-sm text-green-600">per day</p>
            <p className="text-xs text-green-700 mt-2">~4 cups of coffee (FDA guideline)</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
            <h4 className="font-semibold text-pink-900 mb-2">Pregnant Women</h4>
            <p className="text-2xl font-bold text-pink-700 mb-1">200mg</p>
            <p className="text-sm text-pink-600">per day</p>
            <p className="text-xs text-pink-700 mt-2">~2 cups of coffee (ACOG guideline)</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Adolescents</h4>
            <p className="text-2xl font-bold text-blue-700 mb-1">100mg</p>
            <p className="text-sm text-blue-600">per day</p>
            <p className="text-xs text-blue-700 mt-2">~1 cup of coffee (AAP guideline)</p>
          </div>
        </div>
      </div>

      <h3>Caffeine Content in Common Sources</h3>

      <h4>Coffee (highest caffeine)</h4>
      <ul>
        <li>Brewed coffee (8oz): 95mg</li>
        <li>Cold brew (12oz): 200mg</li>
        <li>Espresso (1 shot): 64mg</li>
        <li>Instant coffee (8oz): 62mg</li>
        <li>Decaf coffee (8oz): 2-5mg</li>
      </ul>

      <h4>Tea</h4>
      <ul>
        <li>Black tea (8oz): 47mg</li>
        <li>Oolong tea (8oz): 38mg</li>
        <li>Green tea (8oz): 28mg</li>
        <li>White tea (8oz): 15mg</li>
        <li>Matcha (1 tsp): 70mg</li>
      </ul>

      <h4>Energy Drinks</h4>
      <ul>
        <li>Red Bull (8.4oz): 80mg</li>
        <li>Monster (16oz): 160mg</li>
        <li>5-Hour Energy: 200mg</li>
        <li>Bang Energy (16oz): 300mg</li>
      </ul>

      <h4>Soda</h4>
      <ul>
        <li>Mountain Dew (12oz): 54mg</li>
        <li>Pepsi (12oz): 38mg</li>
        <li>Coca-Cola (12oz): 34mg</li>
        <li>Dr Pepper (12oz): 41mg</li>
      </ul>

      <h4>Chocolate & Other</h4>
      <ul>
        <li>Dark chocolate (1oz): 23mg</li>
        <li>Milk chocolate (1oz): 6mg</li>
        <li>Hot chocolate (8oz): 5mg</li>
        <li>Caffeine pills: 100-200mg</li>
        <li>Pre-workout supplements: 150-300mg</li>
      </ul>

      <h3>Benefits of Caffeine</h3>

      <h4>Cognitive Benefits</h4>
      <ul>
        <li>Improved alertness and attention</li>
        <li>Enhanced memory consolidation</li>
        <li>Faster reaction times</li>
        <li>Better mood and reduced fatigue</li>
      </ul>

      <h4>Physical Performance</h4>
      <ul>
        <li>Increased endurance (3-4% improvement)</li>
        <li>Enhanced fat oxidation during exercise</li>
        <li>Reduced perceived exertion</li>
        <li>Improved muscle contraction</li>
      </ul>

      <h4>Health Benefits</h4>
      <ul>
        <li>Reduced risk of type 2 diabetes</li>
        <li>Lower risk of Parkinson&apos;s disease</li>
        <li>Reduced risk of Alzheimer&apos;s disease</li>
        <li>Liver protection (reduced cirrhosis risk)</li>
        <li>Lower risk of certain cancers</li>
      </ul>

      <h3>Side Effects & Risks</h3>

      <h4>Common Side Effects (excessive intake)</h4>
      <ul>
        <li>Anxiety and jitteriness</li>
        <li>Insomnia and poor sleep quality</li>
        <li>Digestive issues (stomach upset, acid reflux)</li>
        <li>Increased heart rate</li>
        <li>Headaches (especially during withdrawal)</li>
        <li>Frequent urination</li>
        <li>Muscle tremors</li>
      </ul>

      <h4>Serious Risks (very high doses)</h4>
      <ul>
        <li>Rapid or abnormal heart rhythm</li>
        <li>Seizures (doses over 1,200mg)</li>
        <li>Extreme anxiety or panic attacks</li>
        <li>Dependency and withdrawal symptoms</li>
      </ul>

      <h3>Factors Affecting Caffeine Metabolism</h3>

      <h4>Slower Metabolism (longer half-life)</h4>
      <ul>
        <li><strong>Pregnancy:</strong> Half-life increases to ~10 hours</li>
        <li><strong>Oral contraceptives:</strong> Can double caffeine half-life</li>
        <li><strong>Liver disease:</strong> Reduced metabolism</li>
        <li><strong>Certain medications:</strong> Fluvoxamine, quinolones increase half-life</li>
      </ul>

      <h4>Faster Metabolism (shorter half-life)</h4>
      <ul>
        <li><strong>Smoking:</strong> Increases metabolism rate</li>
        <li><strong>Genetic factors:</strong> CYP1A2 fast metabolizers</li>
        <li><strong>Regular consumption:</strong> Develops some tolerance</li>
      </ul>

      <h3>Best Practices for Caffeine Use</h3>

      <h4>Timing</h4>
      <ul>
        <li>Consume caffeine 30-60 minutes before peak performance needed</li>
        <li>Avoid caffeine 6+ hours before bedtime</li>
        <li>Don&apos;t consume on an empty stomach if sensitive</li>
        <li>Space out doses throughout the day rather than large single doses</li>
      </ul>

      <h4>Cycling</h4>
      <ul>
        <li>Consider periodic breaks to reset tolerance</li>
        <li>Gradually reduce intake to avoid withdrawal</li>
        <li>Weekend breaks can help maintain sensitivity</li>
      </ul>

      <h4>Hydration</h4>
      <ul>
        <li>Drink water alongside caffeinated beverages</li>
        <li>Caffeine has mild diuretic effect (in non-regular users)</li>
        <li>Stay hydrated, especially with exercise</li>
      </ul>

      <h3>Caffeine Sensitivity</h3>
      <p>
        People vary widely in their sensitivity to caffeine due to genetic factors affecting metabolism
        and adenosine receptor sensitivity.
      </p>

      <h4>High Sensitivity</h4>
      <ul>
        <li>Feel effects from small amounts (50-100mg)</li>
        <li>Effects last longer (7+ hours)</li>
        <li>More prone to anxiety and sleep disruption</li>
        <li>Should limit to 200mg or less per day</li>
      </ul>

      <h4>Low Sensitivity</h4>
      <ul>
        <li>Need more caffeine for effects (300mg+)</li>
        <li>Metabolize quickly (3-4 hour half-life)</li>
        <li>Can consume caffeine later in day</li>
        <li>Still should respect 400mg daily limit</li>
      </ul>

      <h3>Frequently Asked Questions</h3>

      <h4>Can I overdose on caffeine?</h4>
      <p>
        Yes, though it&apos;s rare with beverages. Lethal dose is estimated at 10-14 grams (about 100 cups
        of coffee). However, doses over 1,200mg can cause serious side effects. Energy drinks and
        caffeine pills pose higher risk due to concentrated doses.
      </p>

      <h4>Is caffeine addictive?</h4>
      <p>
        Caffeine can cause physical dependence with regular use. Withdrawal symptoms (headaches,
        fatigue, irritability) typically appear 12-24 hours after last dose and peak at 20-51 hours.
        However, caffeine is not considered addictive in the same way as drugs of abuse.
      </p>

      <h4>Does caffeine dehydrate you?</h4>
      <p>
        Caffeine has a mild diuretic effect in non-regular users, but the fluid in caffeinated
        beverages more than compensates. Regular caffeine users develop tolerance to the diuretic
        effect. Coffee and tea count toward daily hydration needs.
      </p>

      <h4>Should I avoid caffeine during pregnancy?</h4>
      <p>
        ACOG recommends limiting caffeine to 200mg/day during pregnancy. High caffeine intake has
        been associated with increased risk of miscarriage and low birth weight. Always consult your
        healthcare provider.
      </p>

      <h4>Can children have caffeine?</h4>
      <p>
        The American Academy of Pediatrics discourages caffeine for children under 12 and recommends
        no more than 100mg/day for adolescents. Caffeine can affect sleep, mood, and development in
        children.
      </p>

      <h4>Why do I crash after caffeine wears off?</h4>
      <p>
        Adenosine builds up while caffeine blocks receptors. When caffeine wears off, accumulated
        adenosine binds all at once, causing sudden fatigue. To minimize crashes, use smaller doses
        spread throughout the day and maintain consistent sleep patterns.
      </p>
    </div>
  )
}
