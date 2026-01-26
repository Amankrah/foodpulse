import { Metadata } from 'next'
import { Calculator, Beef, Droplet, Scale, Activity, ArrowRightLeft, ChefHat, Wheat, ShoppingCart, DollarSign, Coffee, Sparkles, FileText, HelpCircle } from 'lucide-react'
import { ToolCard } from '@/components/tools/ToolCard'

export const metadata: Metadata = {
  title: 'Free Nutrition Tools & Calculators | FoodPulse',
  description: 'Free nutrition calculators for protein, macros, calories, and hydration. Interactive tools to help you make better food decisions. No signup required.',
  openGraph: {
    title: 'Free Nutrition Tools & Calculators | FoodPulse',
    description: 'Interactive tools to help you make informed food decisions. Calculate your macros, protein needs, and more.',
    type: 'website',
  },
}

const tools = [
  {
    title: 'Protein Calculator',
    slug: 'protein-calculator',
    description: 'Calculate your daily protein needs based on weight, activity level, and goals.',
    icon: <Beef className="w-6 h-6" />,
    category: 'Calculator',
  },
  {
    title: 'Macro Calculator',
    slug: 'macro-calculator',
    description: 'Get your personalized macronutrient breakdown for your fitness goals.',
    icon: <Calculator className="w-6 h-6" />,
    category: 'Calculator',
  },
  {
    title: 'Calorie Calculator',
    slug: 'calorie-calculator',
    description: 'Find your Total Daily Energy Expenditure (TDEE) and daily calorie needs for your goals.',
    icon: <Scale className="w-6 h-6" />,
    category: 'Calculator',
  },
  {
    title: 'Hydration Calculator',
    slug: 'hydration-calculator',
    description: 'Calculate your daily water intake needs based on activity and climate.',
    icon: <Droplet className="w-6 h-6" />,
    category: 'Calculator',
  },
  {
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    description: 'Calculate your Body Mass Index with health context and limitations.',
    icon: <Activity className="w-6 h-6" />,
    category: 'Calculator',
  },
  {
    title: 'Recipe Scaler',
    slug: 'recipe-scaler',
    description: 'Scale recipe ingredients up or down for any serving size.',
    icon: <ChefHat className="w-6 h-6" />,
    category: 'Converter',
    comingSoon: true,
  },
  {
    title: 'Unit Converter',
    slug: 'unit-converter',
    description: 'Convert between cooking measurements (cups, ml, oz, grams).',
    icon: <ArrowRightLeft className="w-6 h-6" />,
    category: 'Converter',
    comingSoon: true,
  },
  {
    title: 'Fiber Calculator',
    slug: 'fiber-calculator',
    description: 'Calculate your daily fiber needs and track intake.',
    icon: <Wheat className="w-6 h-6" />,
    category: 'Calculator',
  },
  {
    title: 'Grocery Budget Planner',
    slug: 'grocery-budget',
    description: 'Plan weekly grocery spending and save money on healthy foods.',
    icon: <ShoppingCart className="w-6 h-6" />,
    category: 'Planner',
    comingSoon: true,
  },
  {
    title: 'Meal Cost Calculator',
    slug: 'meal-cost',
    description: 'Calculate the cost per serving of your recipes.',
    icon: <DollarSign className="w-6 h-6" />,
    category: 'Calculator',
    comingSoon: true,
  },
  {
    title: 'Caffeine Calculator',
    slug: 'caffeine-calculator',
    description: 'Track your daily caffeine intake and stay within safe limits.',
    icon: <Coffee className="w-6 h-6" />,
    category: 'Calculator',
    comingSoon: true,
  },
  {
    title: 'Sodium Calculator',
    slug: 'sodium-calculator',
    description: 'Monitor your sodium intake for better heart health.',
    icon: <Droplet className="w-6 h-6" />,
    category: 'Calculator',
    comingSoon: true,
  },
  {
    title: 'What Diet Quiz',
    slug: 'diet-quiz',
    description: 'Take our quiz to find the best diet approach for your lifestyle.',
    icon: <HelpCircle className="w-6 h-6" />,
    category: 'Quiz',
    comingSoon: true,
  },
  {
    title: 'Nutrition Label Reader',
    slug: 'label-reader',
    description: 'Upload or input nutrition labels for instant analysis.',
    icon: <FileText className="w-6 h-6" />,
    category: 'Analyzer',
    comingSoon: true,
  },
]

export default function ToolsPage() {
  const availableTools = tools.filter(tool => !tool.comingSoon)
  const comingSoonTools = tools.filter(tool => tool.comingSoon)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 text-center">
          <div className="eyebrow mb-4">Interactive Tools</div>
          <h1 className="section-headline mb-4">
            Free Nutrition Tools & Calculators
          </h1>
          <p className="lead-text max-w-3xl mx-auto mb-6">
            Interactive tools to help you make informed food decisions. Calculate your macros, protein needs, and more.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-neutral-500">
            <span className="font-medium">{availableTools.length} free tools</span>
            <span>•</span>
            <span>No signup required</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section">
        <div className="container mx-auto px-4 lg:px-8">
          {availableTools.length > 0 && (
            <div className="mb-16">
              <h2 className="article-title mb-6">
                Popular Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableTools.map((tool) => (
                  <ToolCard
                    key={tool.slug}
                    title={tool.title}
                    description={tool.description}
                    slug={tool.slug}
                    icon={tool.icon}
                    category={tool.category}
                  />
                ))}
              </div>
            </div>
          )}

          {comingSoonTools.length > 0 && (
            <div>
              <h2 className="article-title mb-6">
                Coming Soon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comingSoonTools.map((tool) => (
                  <div
                    key={tool.slug}
                    className="relative p-6 bg-white rounded-xl border border-neutral-200 opacity-75"
                  >
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-brown-100 text-brown-600 text-xs font-medium rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-400 flex-shrink-0">
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        {tool.category && (
                          <span className="eyebrow !text-neutral-400 mb-1 block">
                            {tool.category}
                          </span>
                        )}
                        <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                          {tool.title}
                        </h3>
                        <p className="body-text !text-sm line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
