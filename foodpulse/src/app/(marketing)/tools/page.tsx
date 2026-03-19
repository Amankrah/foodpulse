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
    <div className="min-h-screen bg-[color-mix(in_srgb,var(--color-trust-blue)_3.5%,var(--neutral-50))]">
      {/* Hero — scientific mode: cool sage / trust blue accents */}
      <section className="bg-white border-b border-[var(--color-sage)]/25">
        <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 text-center">
          <div className="eyebrow mb-4">Interactive tools</div>
          <h1 className="section-headline mb-4 max-w-4xl mx-auto">
            Free nutrition tools & calculators
          </h1>
          <p className="lead-text max-w-3xl mx-auto mb-6 text-[var(--color-support)]">
            Evidence-friendly calculators to support your food decisions—macros, protein, hydration, and more.
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-[var(--color-support)]">
            <span className="font-semibold text-[var(--color-primary)]">{availableTools.length} free tools</span>
            <span className="text-[var(--color-sage)]" aria-hidden>
              •
            </span>
            <span>No signup required</span>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {availableTools.length > 0 && (
            <div className="mb-16">
              <h2 className="text-[length:var(--size-heading)] font-display font-bold text-[var(--color-primary)] tracking-tight mb-2">
                Popular tools
              </h2>
              <p className="text-[length:var(--size-body)] text-[var(--color-support)] mb-8 max-w-2xl">
                Open any tool to work through numbers step by step—clear labels, no hype.
              </p>
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
              <h2 className="text-[length:var(--size-heading)] font-display font-bold text-[var(--color-primary)] tracking-tight mb-2">
                Coming soon
              </h2>
              <p className="text-[length:var(--size-body)] text-[var(--color-support)] mb-8 max-w-2xl">
                We&apos;re building more diet-aware planners and label helpers—check back or subscribe for updates.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comingSoonTools.map((tool) => (
                  <div
                    key={tool.slug}
                    className="relative p-6 rounded-2xl border border-[var(--color-sage)]/25 bg-[color-mix(in_srgb,var(--color-mint)_70%,white)] opacity-90"
                  >
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[color-mix(in_srgb,var(--color-trust-blue)_12%,white)] text-[var(--color-trust-blue)] border border-[var(--color-trust-blue)]/20">
                        Coming soon
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[color-mix(in_srgb,var(--color-sage)_18%,white)] text-[var(--color-sage)]">
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0 pr-16">
                        {tool.category && (
                          <span className="eyebrow mb-1 block opacity-80">
                            {tool.category}
                          </span>
                        )}
                        <h3 className="text-[length:var(--size-subheading)] font-display font-semibold text-[var(--color-primary)] tracking-tight leading-snug mb-2">
                          {tool.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--color-support)] line-clamp-2">
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
