'use client'

import { useState } from 'react'
import { Activity, AlertCircle, TrendingUp, Scale } from 'lucide-react'
import { ToolLayout } from '../ToolLayout'
import { NumberInput } from '../shared/NumberInput'
import { SelectInput } from '../shared/SelectInput'
import { ResultCard } from '../shared/ResultCard'

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

interface BmiResults {
  bmi: number
  category: string
  categoryColor: string
  healthyWeightMin: number
  healthyWeightMax: number
  weightToLose?: number
  weightToGain?: number
  description: string
}

export function BmiCalculator() {
  // Form state
  const [weight, setWeight] = useState<number>(70)
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [height, setHeight] = useState<number>(170)
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm')
  const [age, setAge] = useState<number>(30)
  const [gender, setGender] = useState('male')

  // Results state
  const [results, setResults] = useState<BmiResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const calculateBmi = () => {
    // Convert to metric if needed
    const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight
    const heightCm = heightUnit === 'ft' ? height * 30.48 : height
    const heightM = heightCm / 100

    // Calculate BMI
    const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1))

    // Determine category
    let category = ''
    let categoryColor = ''
    let description = ''

    if (bmi < 18.5) {
      category = 'Underweight'
      categoryColor = 'text-blue-600'
      description = 'Below healthy weight range. Consider consulting a healthcare provider.'
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal Weight'
      categoryColor = 'text-green-600'
      description = 'Within healthy weight range. Maintain with balanced diet and exercise.'
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight'
      categoryColor = 'text-orange-600'
      description = 'Above healthy weight range. Consider lifestyle modifications.'
    } else {
      category = 'Obese'
      categoryColor = 'text-red-600'
      description = 'Significantly above healthy weight. Consult a healthcare provider.'
    }

    // Calculate healthy weight range (BMI 18.5-25)
    const healthyWeightMin = Math.round(18.5 * heightM * heightM)
    const healthyWeightMax = Math.round(25 * heightM * heightM)

    // Calculate weight to lose/gain to reach healthy range
    let weightToLose: number | undefined
    let weightToGain: number | undefined

    if (weightKg > healthyWeightMax) {
      weightToLose = parseFloat((weightKg - healthyWeightMax).toFixed(1))
    } else if (weightKg < healthyWeightMin) {
      weightToGain = parseFloat((healthyWeightMin - weightKg).toFixed(1))
    }

    setResults({
      bmi,
      category,
      categoryColor,
      healthyWeightMin,
      healthyWeightMax,
      weightToLose,
      weightToGain,
      description,
    })
    setShowResults(true)
  }

  const relatedTools = [
    { title: 'Calorie Calculator', slug: 'calorie-calculator', icon: <Scale className="w-5 h-5" /> },
    { title: 'Macro Calculator', slug: 'macro-calculator', icon: <Activity className="w-5 h-5" /> },
  ]

  return (
    <ToolLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) with health context and understand its limitations."
      icon={<Activity className="w-8 h-8" />}
      slug="bmi-calculator"
      relatedTools={relatedTools}
      educationalContent={<BmiEducation />}
    >
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
        {/* Form Section */}
        <div className="p-6 md:p-8 space-y-6">
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
            onClick={calculateBmi}
            className="w-full py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Activity className="w-5 h-5" />
            Calculate My BMI
          </button>
        </div>

        {/* Results Section */}
        <div className="p-6 md:p-8 bg-neutral-50">
          {!showResults ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500">
              <Activity className="w-12 h-12 mb-4 opacity-30" />
              <p>Enter your details and click calculate to see your results</p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Main Result */}
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                  Your BMI Result
                </h2>
                <ResultCard
                  label="Body Mass Index"
                  value={results.bmi}
                  unit=""
                  highlight
                  subtext={results.category}
                />
              </div>

              {/* Category Badge */}
              <div className={`p-4 rounded-xl border-2 ${
                results.category === 'Normal Weight'
                  ? 'bg-green-50 border-green-200'
                  : results.category === 'Underweight'
                  ? 'bg-blue-50 border-blue-200'
                  : results.category === 'Overweight'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-red-50 border-red-200'
              }`}>
                <h3 className={`font-semibold mb-2 ${results.categoryColor}`}>
                  {results.category}
                </h3>
                <p className="text-sm text-neutral-700">
                  {results.description}
                </p>
              </div>

              {/* BMI Scale Visual */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-3">
                  BMI Scale
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600">Underweight</span>
                    <span className="text-neutral-500">&lt; 18.5</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600">Normal Weight</span>
                    <span className="text-neutral-500">18.5 - 24.9</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-600">Overweight</span>
                    <span className="text-neutral-500">25 - 29.9</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-600">Obese</span>
                    <span className="text-neutral-500">≥ 30</span>
                  </div>
                </div>
              </div>

              {/* Healthy Weight Range */}
              <div className="p-4 bg-white rounded-xl border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">
                  Healthy Weight Range
                </h3>
                <p className="text-sm text-neutral-600 mb-3">
                  For your height, a healthy weight is:
                </p>
                <p className="text-2xl font-bold text-neutral-800">
                  {results.healthyWeightMin} - {results.healthyWeightMax}
                  <span className="text-sm font-normal text-neutral-500 ml-1">kg</span>
                </p>
                {results.weightToLose && (
                  <p className="text-sm text-orange-600 mt-2">
                    To reach healthy range: lose approximately {results.weightToLose} kg
                  </p>
                )}
                {results.weightToGain && (
                  <p className="text-sm text-blue-600 mt-2">
                    To reach healthy range: gain approximately {results.weightToGain} kg
                  </p>
                )}
              </div>

              {/* Important Disclaimer */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-900 mb-1">
                      Important Limitations
                    </h3>
                    <p className="text-sm text-amber-800">
                      BMI is a screening tool, not a diagnostic. It doesn&apos;t account for muscle mass,
                      bone density, body composition, or distribution of fat. Athletes and muscular
                      individuals may have high BMI despite being healthy. Always consult healthcare
                      professionals for personalized advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ToolLayout>
  )
}

function BmiEducation() {
  return (
    <div className="prose prose-neutral max-w-none">
      <h2>Understanding Body Mass Index (BMI)</h2>
      <p>
        BMI is a simple calculation using height and weight to estimate body fat. It&apos;s a useful
        screening tool for identifying potential weight-related health risks, but it has significant
        limitations.
      </p>

      <h3>How BMI is Calculated</h3>
      <p>
        BMI is calculated by dividing weight in kilograms by height in meters squared:
      </p>
      <div className="not-prose my-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <p className="text-sm font-mono text-neutral-700">
          BMI = weight (kg) / [height (m)]²
        </p>
        <p className="text-sm text-neutral-600 mt-2">
          Example: 70 kg ÷ (1.75 m)² = 22.9
        </p>
      </div>

      <h3>BMI Categories</h3>
      <div className="not-prose">
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Underweight (BMI &lt; 18.5)</h4>
            <p className="text-sm text-blue-700">
              May indicate malnutrition, eating disorders, or other health issues. Consult a
              healthcare provider if you&apos;re significantly underweight.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Normal Weight (BMI 18.5-24.9)</h4>
            <p className="text-sm text-green-700">
              Generally associated with the lowest health risks. Maintain through balanced
              nutrition and regular physical activity.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-2">Overweight (BMI 25-29.9)</h4>
            <p className="text-sm text-orange-700">
              May increase risk of health conditions. Consider lifestyle modifications including
              diet and exercise improvements.
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-900 mb-2">Obese (BMI ≥ 30)</h4>
            <p className="text-sm text-red-700">
              Associated with increased health risks. Consult healthcare providers for personalized
              weight management strategies.
            </p>
          </div>
        </div>
      </div>

      <h3>Limitations of BMI</h3>
      <p>
        BMI has several important limitations that you should be aware of:
      </p>
      <ul>
        <li><strong>Doesn&apos;t measure body composition:</strong> BMI can&apos;t distinguish between muscle and fat. A muscular athlete may have a high BMI despite low body fat.</li>
        <li><strong>Doesn&apos;t account for fat distribution:</strong> Where fat is stored (belly vs. hips) affects health risks, but BMI doesn&apos;t consider this.</li>
        <li><strong>Age and gender factors:</strong> Older adults naturally have more body fat, and women typically have more body fat than men at the same BMI.</li>
        <li><strong>Ethnic differences:</strong> Health risks associated with BMI can vary across ethnic groups. Some populations have higher health risks at lower BMIs.</li>
        <li><strong>Bone density variations:</strong> People with denser bones may have higher BMI without excess fat.</li>
      </ul>

      <h3>Better Alternatives to BMI</h3>
      <p>
        Consider these additional or alternative measurements:
      </p>
      <ul>
        <li><strong>Waist circumference:</strong> Measures abdominal fat, a key indicator of health risk</li>
        <li><strong>Waist-to-hip ratio:</strong> Compares waist and hip measurements</li>
        <li><strong>Body fat percentage:</strong> Directly measures fat vs. lean mass</li>
        <li><strong>Waist-to-height ratio:</strong> Your waist should be less than half your height</li>
        <li><strong>Body composition analysis:</strong> Uses technology to measure fat, muscle, bone, and water</li>
      </ul>

      <h3>Health Risks Associated with Weight</h3>

      <h4>Risks of Being Underweight</h4>
      <ul>
        <li>Weakened immune system</li>
        <li>Osteoporosis and bone fractures</li>
        <li>Malnutrition and vitamin deficiencies</li>
        <li>Anemia and fatigue</li>
        <li>Fertility issues</li>
      </ul>

      <h4>Risks of Being Overweight or Obese</h4>
      <ul>
        <li>Type 2 diabetes</li>
        <li>Heart disease and stroke</li>
        <li>High blood pressure</li>
        <li>Certain cancers</li>
        <li>Sleep apnea</li>
        <li>Osteoarthritis</li>
        <li>Fatty liver disease</li>
      </ul>

      <h3>What to Do with Your BMI Result</h3>

      <h4>If You&apos;re Outside the Healthy Range</h4>
      <p>
        Remember that BMI is just one indicator. If your BMI is outside the healthy range:
      </p>
      <ol>
        <li>Don&apos;t panic—BMI is a screening tool, not a diagnosis</li>
        <li>Consider other factors like fitness level, body composition, and how you feel</li>
        <li>Consult healthcare professionals for personalized assessment</li>
        <li>Focus on sustainable lifestyle changes rather than quick fixes</li>
        <li>Consider additional measurements like waist circumference</li>
      </ol>

      <h4>If You&apos;re in the Healthy Range</h4>
      <p>
        A healthy BMI is great, but remember to:
      </p>
      <ul>
        <li>Maintain balanced nutrition</li>
        <li>Stay physically active</li>
        <li>Monitor other health indicators</li>
        <li>Keep up regular health checkups</li>
      </ul>

      <h3>Frequently Asked Questions</h3>

      <h4>Is BMI accurate for everyone?</h4>
      <p>
        No. BMI is least accurate for athletes, bodybuilders, pregnant women, older adults, and
        certain ethnic groups. It&apos;s a population-level tool that may not reflect individual health.
      </p>

      <h4>Can I have a high BMI and still be healthy?</h4>
      <p>
        Yes. If you&apos;re very muscular, physically fit, have good blood pressure and cholesterol,
        and feel healthy, a high BMI may not be a concern. Discuss with your doctor.
      </p>

      <h4>What BMI should I aim for?</h4>
      <p>
        Generally, 18.5-24.9 is considered healthy, but your optimal range depends on many factors.
        Focus on overall health markers rather than achieving a specific number.
      </p>

      <h4>How quickly can I change my BMI safely?</h4>
      <p>
        Safe weight loss is typically 0.5-1 kg per week. Rapid weight changes can be unhealthy.
        Focus on gradual, sustainable lifestyle changes rather than crash diets.
      </p>

      <h4>Should children use BMI calculators?</h4>
      <p>
        Children and teenagers need age and sex-specific BMI percentiles, not adult BMI
        categories. Consult pediatric growth charts and healthcare providers for children.
      </p>

      <h3>Next Steps</h3>
      <p>
        Use our other calculators to get a complete picture of your nutritional needs:
      </p>
      <ul>
        <li><strong>Calorie Calculator:</strong> Find your daily calorie needs for your goals</li>
        <li><strong>Macro Calculator:</strong> Get personalized macronutrient recommendations</li>
        <li><strong>Protein Calculator:</strong> Calculate your optimal protein intake</li>
      </ul>
    </div>
  )
}
