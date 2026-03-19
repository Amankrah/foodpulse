import { Metadata } from 'next'
import { Calculator, Beef, Droplet, Scale, Activity, ArrowRightLeft, ChefHat, Wheat, ShoppingCart, DollarSign, Coffee, Sparkles, FileText } from 'lucide-react'
import { ToolCard } from '@/components/tools/ToolCard'
import { tools as toolsData } from '@/content/tools'

export const metadata: Metadata = {
  title: 'Free Nutrition Tools & Calculators | FoodPulse',
  description: 'Free nutrition calculators for protein, macros, calories, and hydration. Interactive tools to help you make better food decisions. No signup required.',
  openGraph: {
    title: 'Free Nutrition Tools & Calculators | FoodPulse',
    description: 'Interactive tools to help you make informed food decisions. Calculate your macros, protein needs, and more.',
    type: 'website',
  },
}

// Map slugs to icons (icons can't be stored in the shared file as they're JSX)
const toolIcons: Record<string, React.ReactNode> = {
  'protein-calculator': <Beef className="w-6 h-6" />,
  'macro-calculator': <Calculator className="w-6 h-6" />,
  'calorie-calculator': <Scale className="w-6 h-6" />,
  'hydration-calculator': <Droplet className="w-6 h-6" />,
  'bmi-calculator': <Activity className="w-6 h-6" />,
  'recipe-scaler': <ChefHat className="w-6 h-6" />,
  'unit-converter': <ArrowRightLeft className="w-6 h-6" />,
  'fiber-calculator': <Wheat className="w-6 h-6" />,
  'grocery-budget': <ShoppingCart className="w-6 h-6" />,
  'meal-cost': <DollarSign className="w-6 h-6" />,
  'caffeine-calculator': <Coffee className="w-6 h-6" />,
  'sodium-calculator': <Droplet className="w-6 h-6" />,
  'diet-quiz': <Sparkles className="w-6 h-6" />,
  'label-reader': <FileText className="w-6 h-6" />,
}

// Add icons to tools from shared data
const tools = toolsData.map(tool => ({
  ...tool,
  icon: toolIcons[tool.slug] || <Calculator className="w-6 h-6" />,
}))

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
