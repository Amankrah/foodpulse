# FoodPulse Tools & Calculators — Complete Development Guide

## Building Interactive Nutrition Tools for Engagement & Lead Generation

**Version:** 1.0  
**Last Updated:** January 2025  
**URL:** `/tools` and `/tools/[tool-slug]`  
**Priority:** High (Engagement + Backlinks + Lead Gen)

---

# Table of Contents

1. [Strategic Purpose](#1-strategic-purpose)
2. [Tool Ideas & Specifications](#2-tool-ideas--specifications)
3. [Information Architecture](#3-information-architecture)
4. [Technical Architecture](#4-technical-architecture)
5. [SEO Strategy](#5-seo-strategy)
6. [Lead Generation Integration](#6-lead-generation-integration)
7. [Tool Implementations](#7-tool-implementations)
8. [Sanity Schema (Optional)](#8-sanity-schema-optional)
9. [Analytics & Tracking](#9-analytics--tracking)
10. [Launch Checklist](#10-launch-checklist)

---

# 1. Strategic Purpose

## 1.1 Why Build Tools?

### SEO Benefits

| Benefit | Description |
|---------|-------------|
| **Backlink magnets** | Tools get linked to more than articles |
| **Long-tail keywords** | "protein calculator," "macro calculator" |
| **Featured snippets** | Calculators can appear in Google results |
| **Low competition** | Many nutrition calculators are outdated |
| **Time on site** | Users spend more time interacting |

### User Benefits

| Benefit | Description |
|---------|-------------|
| **Practical value** | Immediate, personalized answers |
| **Engagement** | Interactive > passive reading |
| **Return visits** | Users bookmark and come back |
| **Shareability** | "Check out this calculator" |

### Business Benefits

| Benefit | Description |
|---------|-------------|
| **Lead generation** | Gate results or offer email summary |
| **Brand awareness** | Tools get shared and embedded |
| **Authority building** | Shows expertise and investment |
| **Content upgrades** | "Get our full macro guide" after calculating |

## 1.2 Tool Categories

```
CALCULATORS
├── Nutrition Calculators (macros, calories, protein)
├── Body Metrics (BMI, BMR, TDEE)
├── Hydration Calculators
└── Budget/Cost Calculators

CONVERTERS
├── Unit Converters (cups to grams, etc.)
├── Recipe Scalers
└── Measurement Converters

TRACKERS
├── Water Intake Tracker
├── Protein Tracker
└── Meal Planning Tools

QUIZZES/ASSESSMENTS
├── "What Diet Is Right For You?"
├── "How Healthy Is Your Diet?"
└── "Nutrition Knowledge Quiz"
```

## 1.3 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Tool completions | 70%+ start → finish | GA4 events |
| Time on tool | 2+ minutes | GA4 |
| Email captures | 20%+ of completions | Form tracking |
| Backlinks | 5+ per tool | Ahrefs/SEMrush |
| Social shares | Track share button clicks | GA4 events |
| Return visits | 30%+ return within month | GA4 |

---

# 2. Tool Ideas & Specifications

## 2.1 Priority 1 Tools (Build First)

### Tool 1: Daily Protein Calculator

**URL:** `/tools/protein-calculator`

**Purpose:** Calculate personalized daily protein needs based on weight, activity level, and goals.

**Inputs:**
| Field | Type | Options/Range |
|-------|------|---------------|
| Weight | Number + Unit | kg or lbs |
| Activity Level | Select | Sedentary, Light, Moderate, Active, Very Active |
| Goal | Select | Maintain, Build Muscle, Lose Weight |
| Age | Number | 18-100 |
| Gender | Select | Male, Female, Prefer not to say |

**Outputs:**
- Daily protein recommendation (grams)
- Protein per meal (assuming 3-4 meals)
- Protein per kg/lb of body weight
- Comparison to RDA

**Formula:**
```javascript
// Base: 0.8g per kg for sedentary
// Adjustments based on activity and goals
const baseProtein = weightKg * 0.8;
const activityMultipliers = {
  sedentary: 1.0,
  light: 1.1,
  moderate: 1.3,
  active: 1.5,
  veryActive: 1.7
};
const goalMultipliers = {
  maintain: 1.0,
  buildMuscle: 1.3,
  loseWeight: 1.2 // higher protein helps preserve muscle
};
const dailyProtein = baseProtein * activityMultipliers[activity] * goalMultipliers[goal];
```

**Content to Include:**
- What is protein and why it matters
- Sources of protein (animal vs plant)
- Tips for hitting protein goals
- Link to protein guide

---

### Tool 2: Macro Calculator

**URL:** `/tools/macro-calculator`

**Purpose:** Calculate personalized macronutrient breakdown (protein, carbs, fat) based on goals.

**Inputs:**
| Field | Type | Options/Range |
|-------|------|---------------|
| Weight | Number + Unit | kg or lbs |
| Height | Number + Unit | cm or ft/in |
| Age | Number | 18-100 |
| Gender | Select | Male, Female |
| Activity Level | Select | 5 levels |
| Goal | Select | Lose Weight, Maintain, Build Muscle |
| Diet Preference | Select | Balanced, Low Carb, High Protein, Keto |

**Outputs:**
- Daily calories (TDEE)
- Protein grams + calories + percentage
- Carbohydrate grams + calories + percentage
- Fat grams + calories + percentage
- Visual pie chart of macro split
- Meal breakdown suggestion

**Formulas:**
```javascript
// Step 1: Calculate BMR (Mifflin-St Jeor)
const bmrMale = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
const bmrFemale = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

// Step 2: Calculate TDEE
const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9
};
const tdee = bmr * activityMultipliers[activity];

// Step 3: Adjust for goal
const goalAdjustments = {
  lose: -500, // 500 cal deficit
  maintain: 0,
  build: 300  // 300 cal surplus
};
const targetCalories = tdee + goalAdjustments[goal];

// Step 4: Macro splits based on preference
const macroSplits = {
  balanced: { protein: 0.30, carbs: 0.40, fat: 0.30 },
  lowCarb: { protein: 0.35, carbs: 0.25, fat: 0.40 },
  highProtein: { protein: 0.40, carbs: 0.35, fat: 0.25 },
  keto: { protein: 0.25, carbs: 0.05, fat: 0.70 }
};
```

---

### Tool 3: Hydration Calculator

**URL:** `/tools/hydration-calculator`

**Purpose:** Calculate daily water intake needs.

**Inputs:**
| Field | Type | Options/Range |
|-------|------|---------------|
| Weight | Number + Unit | kg or lbs |
| Activity Level | Select | Sedentary, Light, Moderate, Active, Very Active |
| Climate | Select | Temperate, Hot/Humid, Cold |
| Pregnant/Nursing | Boolean | Yes/No |

**Outputs:**
- Daily water intake (liters and oz)
- Glasses of water (8oz glasses)
- Hourly reminder amount
- Tips for staying hydrated

**Formula:**
```javascript
// Base: 30-35ml per kg body weight
const baseWater = weightKg * 0.033; // liters
const activityMultipliers = {
  sedentary: 1.0,
  light: 1.1,
  moderate: 1.2,
  active: 1.3,
  veryActive: 1.5
};
const climateMultipliers = {
  temperate: 1.0,
  hotHumid: 1.2,
  cold: 0.95
};
let dailyWater = baseWater * activityMultipliers[activity] * climateMultipliers[climate];
if (pregnantOrNursing) dailyWater += 0.5; // Add 500ml
```

---

### Tool 4: Calorie Calculator (TDEE)

**URL:** `/tools/calorie-calculator`

**Purpose:** Calculate Total Daily Energy Expenditure and calorie needs.

**Inputs:**
| Field | Type | Options/Range |
|-------|------|---------------|
| Weight | Number + Unit | kg or lbs |
| Height | Number + Unit | cm or ft/in |
| Age | Number | 18-100 |
| Gender | Select | Male, Female |
| Activity Level | Select | 5 levels |
| Goal | Select | Lose 0.5kg/wk, Lose 0.25kg/wk, Maintain, Gain 0.25kg/wk, Gain 0.5kg/wk |

**Outputs:**
- BMR (Basal Metabolic Rate)
- TDEE (maintenance calories)
- Target calories for goal
- Weekly calorie budget
- Comparison chart

---

## 2.2 Priority 2 Tools (Build Next)

### Tool 5: BMI Calculator

**URL:** `/tools/bmi-calculator`

**Purpose:** Calculate Body Mass Index with health context.

**Inputs:** Weight, Height, Age, Gender

**Outputs:**
- BMI value
- BMI category (underweight, normal, overweight, obese)
- Healthy weight range for height
- Important disclaimer about BMI limitations

**Important:** Include prominent disclaimer that BMI is a screening tool, not a diagnostic. Doesn't account for muscle mass, bone density, etc.

---

### Tool 6: Recipe Scaler

**URL:** `/tools/recipe-scaler`

**Purpose:** Scale recipe ingredients up or down.

**Inputs:**
| Field | Type |
|-------|------|
| Original servings | Number |
| Desired servings | Number |
| Ingredients list | Text area (parse or manual entry) |

**Outputs:**
- Scaled ingredient amounts
- Helpful conversions (e.g., 0.5 cups = 8 tbsp)
- Print-friendly version

---

### Tool 7: Cooking Unit Converter

**URL:** `/tools/unit-converter`

**Purpose:** Convert between cooking measurements.

**Conversions:**
```
Volume: cups ↔ ml ↔ liters ↔ tablespoons ↔ teaspoons ↔ fluid oz
Weight: grams ↔ oz ↔ lbs ↔ kg
Temperature: °F ↔ °C
```

**Features:**
- Quick conversion buttons
- Common ingredient densities (flour, sugar, etc.)
- Printable conversion chart

---

### Tool 8: Fiber Intake Calculator

**URL:** `/tools/fiber-calculator`

**Purpose:** Calculate daily fiber needs and track intake.

**Inputs:** Age, Gender, Current fiber intake estimate

**Outputs:**
- Recommended daily fiber (25-30g typically)
- Gap analysis
- High-fiber food suggestions
- Link to fiber guide

---

## 2.3 Priority 3 Tools (Future)

| Tool | URL | Purpose |
|------|-----|---------|
| Grocery Budget Planner | `/tools/grocery-budget` | Plan weekly grocery spending |
| Meal Cost Calculator | `/tools/meal-cost` | Cost per serving of recipes |
| Caffeine Calculator | `/tools/caffeine-calculator` | Daily caffeine intake |
| Sodium Calculator | `/tools/sodium-calculator` | Track sodium intake |
| "What Diet Quiz" | `/tools/diet-quiz` | Quiz to find suitable diet |
| Nutrition Label Reader | `/tools/label-reader` | Upload/input label, get analysis |

---

# 3. Information Architecture

## 3.1 URL Structure

```
/tools                           → Tools hub page (all tools)
/tools/protein-calculator        → Individual tool
/tools/macro-calculator          → Individual tool
/tools/hydration-calculator      → Individual tool
/tools/calorie-calculator        → Individual tool
/tools/bmi-calculator            → Individual tool
/tools/recipe-scaler             → Individual tool
/tools/unit-converter            → Individual tool
```

## 3.2 Navigation

### Header
```
Resources ▼
├── Guides
├── Tools ← Add here
├── Glossary
├── FAQ
└── Newsletter
```

### Tools Hub Page Structure
```
/tools
├── Hero (title, description)
├── Featured Tool
├── Tool Categories (Calculators, Converters, etc.)
├── Tool Cards Grid
└── Newsletter CTA
```

## 3.3 Page Layout

### Tools Hub Page

```
┌─────────────────────────────────────────────────────────────┐
│                      TOOLS HUB PAGE                          │
│                         /tools                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                     HERO SECTION                        │ │
│  │                                                         │ │
│  │  [H1] Free Nutrition Tools & Calculators               │ │
│  │                                                         │ │
│  │  Interactive tools to help you make informed food      │ │
│  │  decisions. Calculate your macros, protein needs,      │ │
│  │  and more.                                             │ │
│  │                                                         │ │
│  │  [8 free tools • No signup required]                   │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  CATEGORY FILTERS                                       │ │
│  │  [All] [Calculators] [Converters] [Trackers] [Quizzes] │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ## Popular Tools                                            │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │   [ICON]     │ │   [ICON]     │ │   [ICON]     │        │
│  │              │ │              │ │              │        │
│  │   Protein    │ │   Macro      │ │   Calorie    │        │
│  │  Calculator  │ │  Calculator  │ │  Calculator  │        │
│  │              │ │              │ │              │        │
│  │  Calculate   │ │  Get your    │ │  Find your   │        │
│  │  your daily  │ │  personalized│ │  TDEE and    │        │
│  │  protein...  │ │  macro...    │ │  daily...    │        │
│  │              │ │              │ │              │        │
│  │ [Use Tool →] │ │ [Use Tool →] │ │ [Use Tool →] │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
│  ## More Tools                                               │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │  Hydration   │ │    BMI       │ │   Recipe     │        │
│  │  Calculator  │ │  Calculator  │ │   Scaler     │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                              │
│  ┌──────────────┐ ┌──────────────┐                          │
│  │    Unit      │ │   Fiber      │                          │
│  │  Converter   │ │  Calculator  │                          │
│  └──────────────┘ └──────────────┘                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Individual Tool Page

```
┌─────────────────────────────────────────────────────────────┐
│                    INDIVIDUAL TOOL PAGE                      │
│               /tools/protein-calculator                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Breadcrumb: Home > Tools > Protein Calculator              │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                      TOOL HERO                          │ │
│  │                                                         │ │
│  │  [Calculator Icon]                                      │ │
│  │                                                         │ │
│  │  [H1] Daily Protein Calculator                         │ │
│  │                                                         │ │
│  │  Calculate your personalized daily protein needs       │ │
│  │  based on your weight, activity level, and goals.      │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────┬─────────────────────────┐   │
│  │                            │                          │   │
│  │     CALCULATOR FORM        │    RESULTS PANEL         │   │
│  │                            │    (shows after calc)    │   │
│  │  Weight                    │                          │   │
│  │  [____] [kg ▼]             │   YOUR DAILY PROTEIN     │   │
│  │                            │   ┌─────────────────┐    │   │
│  │  Activity Level            │   │                 │    │   │
│  │  [Moderate ▼]              │   │    120g         │    │   │
│  │                            │   │                 │    │   │
│  │  Goal                      │   │  per day        │    │   │
│  │  [Maintain ▼]              │   └─────────────────┘    │   │
│  │                            │                          │   │
│  │  Age                       │   That's about:          │   │
│  │  [____]                    │   • 30g per meal (4x)    │   │
│  │                            │   • 1.5g per kg body wt  │   │
│  │  Gender                    │                          │   │
│  │  ○ Male ○ Female           │   ─────────────────────  │   │
│  │                            │                          │   │
│  │  [Calculate Protein →]     │   📧 Get results emailed │   │
│  │                            │   [your@email.com]       │   │
│  │                            │   [Send Results]         │   │
│  │                            │                          │   │
│  └────────────────────────────┴─────────────────────────┘   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   EDUCATIONAL CONTENT                   │ │
│  │                                                         │ │
│  │  ## Why Protein Matters                                │ │
│  │                                                         │ │
│  │  Protein is essential for building and repairing...   │ │
│  │                                                         │ │
│  │  ## How We Calculate Your Needs                        │ │
│  │                                                         │ │
│  │  Our calculator uses evidence-based formulas...       │ │
│  │                                                         │ │
│  │  ## Top Protein Sources                                │ │
│  │                                                         │ │
│  │  • Chicken breast: 31g per 100g                       │ │
│  │  • Greek yogurt: 10g per 100g                         │ │
│  │  • Lentils: 9g per 100g                               │ │
│  │                                                         │ │
│  │  [Read our Complete Protein Guide →]                   │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    RELATED TOOLS                        │ │
│  │                                                         │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐               │ │
│  │  │  Macro   │ │ Calorie  │ │ Hydration│               │ │
│  │  │  Calc    │ │   Calc   │ │   Calc   │               │ │
│  │  └──────────┘ └──────────┘ └──────────┘               │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

# 4. Technical Architecture

## 4.1 Component Structure

```
src/
├── app/
│   └── tools/
│       ├── page.tsx                    # Tools hub
│       ├── protein-calculator/
│       │   └── page.tsx                # Protein calculator
│       ├── macro-calculator/
│       │   └── page.tsx                # Macro calculator
│       ├── hydration-calculator/
│       │   └── page.tsx                # Hydration calculator
│       ├── calorie-calculator/
│       │   └── page.tsx                # TDEE calculator
│       ├── bmi-calculator/
│       │   └── page.tsx                # BMI calculator
│       ├── recipe-scaler/
│       │   └── page.tsx                # Recipe scaler
│       └── unit-converter/
│           └── page.tsx                # Unit converter
│
└── components/
    └── tools/
        ├── ToolCard.tsx                # Card for hub page
        ├── ToolHero.tsx                # Tool page hero
        ├── ToolLayout.tsx              # Shared layout wrapper
        ├── CalculatorForm.tsx          # Reusable form components
        ├── ResultsPanel.tsx            # Results display
        ├── EmailResults.tsx            # Email capture for results
        ├── ToolJsonLd.tsx              # Schema markup
        │
        ├── calculators/
        │   ├── ProteinCalculator.tsx
        │   ├── MacroCalculator.tsx
        │   ├── HydrationCalculator.tsx
        │   ├── CalorieCalculator.tsx
        │   ├── BmiCalculator.tsx
        │   └── FiberCalculator.tsx
        │
        ├── converters/
        │   ├── RecipeScaler.tsx
        │   └── UnitConverter.tsx
        │
        └── shared/
            ├── NumberInput.tsx
            ├── SelectInput.tsx
            ├── RadioGroup.tsx
            ├── UnitToggle.tsx
            └── ResultCard.tsx
```

## 4.2 Shared Components

### Number Input with Unit Toggle

```tsx
// components/tools/shared/NumberInput.tsx
'use client'

import { useState } from 'react'

interface NumberInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  unit?: string
  units?: { value: string; label: string }[]
  onUnitChange?: (unit: string) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  helpText?: string
}

export function NumberInput({
  label,
  value,
  onChange,
  unit,
  units,
  onUnitChange,
  min,
  max,
  step = 1,
  placeholder,
  helpText,
}: NumberInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
        />
        {units && units.length > 0 ? (
          <select
            value={unit}
            onChange={(e) => onUnitChange?.(e.target.value)}
            className="px-4 py-3 border border-neutral-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
          >
            {units.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        ) : unit ? (
          <span className="px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-600">
            {unit}
          </span>
        ) : null}
      </div>
      {helpText && (
        <p className="text-sm text-neutral-500">{helpText}</p>
      )}
    </div>
  )
}
```

### Select Input

```tsx
// components/tools/shared/SelectInput.tsx
'use client'

interface SelectOption {
  value: string
  label: string
  description?: string
}

interface SelectInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  helpText?: string
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  helpText,
}: SelectInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && (
        <p className="text-sm text-neutral-500">{helpText}</p>
      )}
    </div>
  )
}
```

### Result Card

```tsx
// components/tools/shared/ResultCard.tsx
interface ResultCardProps {
  label: string
  value: string | number
  unit?: string
  highlight?: boolean
  subtext?: string
}

export function ResultCard({
  label,
  value,
  unit,
  highlight = false,
  subtext,
}: ResultCardProps) {
  return (
    <div
      className={`p-4 rounded-xl ${
        highlight
          ? 'bg-green-50 border-2 border-green-200'
          : 'bg-neutral-50 border border-neutral-200'
      }`}
    >
      <p className="text-sm text-neutral-600 mb-1">{label}</p>
      <p
        className={`text-2xl font-bold ${
          highlight ? 'text-green-700' : 'text-neutral-900'
        }`}
      >
        {value}
        {unit && <span className="text-lg font-normal ml-1">{unit}</span>}
      </p>
      {subtext && (
        <p className="text-sm text-neutral-500 mt-1">{subtext}</p>
      )}
    </div>
  )
}
```

## 4.3 Tool Layout Wrapper

```tsx
// components/tools/ToolLayout.tsx
import { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ToolJsonLd } from './ToolJsonLd'

interface ToolLayoutProps {
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
  educationalContent?: ReactNode
  relatedTools?: { title: string; slug: string; icon: ReactNode }[]
}

export function ToolLayout({
  title,
  description,
  icon,
  children,
  educationalContent,
  relatedTools,
}: ToolLayoutProps) {
  return (
    <>
      <ToolJsonLd title={title} description={description} />
      
      <div className="min-h-screen bg-neutral-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-neutral-600">
              <Link href="/" className="hover:text-green-600">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/tools" className="hover:text-green-600">Tools</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-neutral-900">{title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600">
              {icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              {title}
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
            {children}
          </div>
        </div>

        {/* Educational Content */}
        {educationalContent && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8">
              {educationalContent}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools && relatedTools.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-green-300 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    {tool.icon}
                  </div>
                  <span className="font-medium text-neutral-900">
                    {tool.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
```

---

# 5. SEO Strategy

## 5.1 Keyword Targeting

### Hub Page
```
Primary: nutrition calculators, food calculators, diet tools
Secondary: free nutrition tools, macro calculator, protein calculator
```

### Individual Tool Keywords

| Tool | Primary Keywords | Monthly Volume |
|------|-----------------|----------------|
| Protein Calculator | protein calculator, daily protein calculator | 18,000 |
| Macro Calculator | macro calculator, macros calculator | 49,500 |
| Calorie Calculator | calorie calculator, TDEE calculator | 165,000 |
| BMI Calculator | bmi calculator | 1,500,000 |
| Hydration Calculator | water intake calculator | 14,800 |
| Recipe Scaler | recipe scaler, recipe converter | 2,400 |
| Unit Converter | cooking unit converter | 8,100 |

## 5.2 Meta Tags

### Hub Page
```html
<title>Free Nutrition Tools & Calculators | FoodPulse</title>
<meta name="description" content="Free nutrition calculators for protein, macros, calories, and hydration. Interactive tools to help you make better food decisions. No signup required." />
```

### Individual Tool Template
```html
<title>[Tool Name] - Free Calculator | FoodPulse</title>
<meta name="description" content="[Tool description]. Calculate your [specific result] based on [inputs]. Free, no signup required." />

Example:
<title>Protein Calculator - Daily Protein Needs | FoodPulse</title>
<meta name="description" content="Calculate your daily protein needs based on weight, activity level, and goals. Free protein calculator with personalized recommendations." />
```

## 5.3 Schema Markup

### SoftwareApplication Schema (for Calculators)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FoodPulse Protein Calculator",
  "description": "Calculate your daily protein needs based on weight, activity level, and goals.",
  "url": "https://foodpulse.co/tools/protein-calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  },
  "author": {
    "@type": "Organization",
    "name": "FoodPulse",
    "url": "https://foodpulse.co"
  }
}
```

### HowTo Schema (for step-by-step tools)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Calculate Your Daily Protein Needs",
  "description": "Use our calculator to find your personalized protein recommendation",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter your weight",
      "text": "Input your current body weight in kg or lbs"
    },
    {
      "@type": "HowToStep",
      "name": "Select activity level",
      "text": "Choose your typical activity level from sedentary to very active"
    },
    {
      "@type": "HowToStep",
      "name": "Choose your goal",
      "text": "Select whether you want to maintain, build muscle, or lose weight"
    },
    {
      "@type": "HowToStep",
      "name": "Get your results",
      "text": "View your personalized daily protein recommendation"
    }
  ]
}
```

### FAQ Schema (common questions about the tool)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much protein do I need per day?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most adults need 0.8-1.2g of protein per kg of body weight. Active individuals and those building muscle may need 1.2-2.0g per kg."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is this protein calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our calculator uses evidence-based formulas from nutrition research. Results are personalized estimates—individual needs may vary."
      }
    }
  ]
}
```

## 5.4 Internal Linking

### From Tools to Content
- Link to relevant guides (e.g., Protein Calculator → Protein Guide)
- Link to glossary terms (e.g., "macronutrients" → glossary)
- Link to related articles

### From Content to Tools
- Add tool CTAs in relevant articles
- "Calculate your exact needs with our [Protein Calculator]"
- Sidebar widgets showing relevant tools

---

# 6. Lead Generation Integration

## 6.1 Email Capture Strategy

### Option A: Gate Results Summary
Show basic results, but offer detailed breakdown via email.

```tsx
// After showing basic result
<div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
  <h3 className="font-semibold text-blue-900 mb-2">
    📧 Get Your Complete Results
  </h3>
  <p className="text-blue-700 text-sm mb-3">
    We'll email you a detailed breakdown including:
  </p>
  <ul className="text-blue-700 text-sm mb-4 space-y-1">
    <li>✓ Protein needs by meal</li>
    <li>✓ Best protein sources for your goals</li>
    <li>✓ Sample meal ideas</li>
    <li>✓ Printable summary</li>
  </ul>
  <form className="flex gap-2">
    <input
      type="email"
      placeholder="you@example.com"
      className="flex-1 px-3 py-2 border rounded-lg"
    />
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
      Send Results
    </button>
  </form>
</div>
```

### Option B: Save Results
Offer to save results for future reference.

```tsx
<div className="mt-6 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
  <h3 className="font-semibold text-neutral-900 mb-2">
    Save Your Results
  </h3>
  <p className="text-neutral-600 text-sm mb-3">
    Get your results emailed to you for future reference.
  </p>
  <form className="flex gap-2">
    <input
      type="email"
      placeholder="you@example.com"
      className="flex-1 px-3 py-2 border rounded-lg"
    />
    <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
      Email Me
    </button>
  </form>
</div>
```

### Option C: Content Upgrade
Offer related guide after tool completion.

```tsx
<div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
  <h3 className="font-semibold text-green-900 mb-2">
    📚 Want to learn more about protein?
  </h3>
  <p className="text-green-700 text-sm mb-3">
    Get our free Complete Protein Guide with 50+ high-protein recipes.
  </p>
  <form className="flex gap-2">
    <input
      type="email"
      placeholder="you@example.com"
      className="flex-1 px-3 py-2 border rounded-lg"
    />
    <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
      Get Free Guide
    </button>
  </form>
</div>
```

## 6.2 Email Results Component

```tsx
// components/tools/EmailResults.tsx
'use client'

import { useState } from 'react'
import { Mail, Check, Loader2 } from 'lucide-react'

interface EmailResultsProps {
  toolName: string
  results: Record<string, any>
  onSuccess?: () => void
}

export function EmailResults({ toolName, results, onSuccess }: EmailResultsProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/email-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          toolName,
          results,
        }),
      })

      if (!response.ok) throw new Error('Failed to send')

      setStatus('success')
      onSuccess?.()

      // Track event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tool_email_capture', {
          tool_name: toolName,
        })
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
        <Check className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-medium">Results sent!</p>
        <p className="text-green-600 text-sm">Check your inbox.</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-neutral-600" />
        <h3 className="font-medium text-neutral-900">Email Your Results</h3>
      </div>
      <p className="text-neutral-600 text-sm mb-3">
        Save your results for future reference.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:border-green-500 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Send'
          )}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
```

---

# 7. Tool Implementations

## 7.1 Protein Calculator (Complete Example)

```tsx
// app/tools/protein-calculator/page.tsx
import { Metadata } from 'next'
import { ProteinCalculator } from '@/components/tools/calculators/ProteinCalculator'

export const metadata: Metadata = {
  title: 'Protein Calculator - Daily Protein Needs | FoodPulse',
  description: 'Calculate your daily protein needs based on weight, activity level, and goals. Free protein calculator with personalized recommendations.',
  openGraph: {
    title: 'Free Protein Calculator | FoodPulse',
    description: 'Calculate your personalized daily protein needs',
    type: 'website',
  },
}

export default function ProteinCalculatorPage() {
  return <ProteinCalculator />
}
```

```tsx
// components/tools/calculators/ProteinCalculator.tsx
'use client'

import { useState } from 'react'
import { Calculator, Beef, Dumbbell, Scale } from 'lucide-react'
import { ToolLayout } from '../ToolLayout'
import { NumberInput } from '../shared/NumberInput'
import { SelectInput } from '../shared/SelectInput'
import { ResultCard } from '../shared/ResultCard'
import { EmailResults } from '../EmailResults'

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

    // Track calculation
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_calculation', {
        tool_name: 'protein_calculator',
        activity_level: activity,
        goal: goal,
      })
    }
  }

  const relatedTools = [
    { title: 'Macro Calculator', slug: 'macro-calculator', icon: <Calculator className="w-5 h-5" /> },
    { title: 'Calorie Calculator', slug: 'calorie-calculator', icon: <Scale className="w-5 h-5" /> },
    { title: 'Hydration Calculator', slug: 'hydration-calculator', icon: <Dumbbell className="w-5 h-5" /> },
  ]

  return (
    <ToolLayout
      title="Daily Protein Calculator"
      description="Calculate your personalized daily protein needs based on your weight, activity level, and fitness goals."
      icon={<Beef className="w-8 h-8" />}
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

              <EmailResults
                toolName="Protein Calculator"
                results={results}
              />

              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h3 className="font-medium text-green-900 mb-2">
                  📚 Want to learn more?
                </h3>
                <p className="text-green-700 text-sm mb-3">
                  Check out our complete guide to protein with food lists and meal ideas.
                </p>
                <a
                  href="/guides/protein-guide"
                  className="text-green-600 font-medium text-sm hover:underline"
                >
                  Read the Protein Guide →
                </a>
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
```

## 7.2 Macro Calculator (Key Differences)

The macro calculator is similar but with additional complexity:

```tsx
// Key differences for MacroCalculator
interface MacroResults {
  calories: number
  bmr: number
  tdee: number
  protein: { grams: number; calories: number; percentage: number }
  carbs: { grams: number; calories: number; percentage: number }
  fat: { grams: number; calories: number; percentage: number }
}

// Includes visual pie chart
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function MacroChart({ protein, carbs, fat }: MacroResults) {
  const data = [
    { name: 'Protein', value: protein.percentage, color: '#22c55e' },
    { name: 'Carbs', value: carbs.percentage, color: '#3b82f6' },
    { name: 'Fat', value: fat.percentage, color: '#f59e0b' },
  ]

  return (
    <div className="h-48">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
```

## 7.3 Unit Converter (Different UI Pattern)

```tsx
// components/tools/converters/UnitConverter.tsx
'use client'

import { useState } from 'react'
import { ArrowRightLeft } from 'lucide-react'

const conversions = {
  volume: {
    name: 'Volume',
    units: [
      { id: 'cups', label: 'Cups', toMl: 236.588 },
      { id: 'ml', label: 'Milliliters', toMl: 1 },
      { id: 'liters', label: 'Liters', toMl: 1000 },
      { id: 'tbsp', label: 'Tablespoons', toMl: 14.787 },
      { id: 'tsp', label: 'Teaspoons', toMl: 4.929 },
      { id: 'floz', label: 'Fluid Ounces', toMl: 29.574 },
    ],
  },
  weight: {
    name: 'Weight',
    units: [
      { id: 'g', label: 'Grams', toG: 1 },
      { id: 'kg', label: 'Kilograms', toG: 1000 },
      { id: 'oz', label: 'Ounces', toG: 28.3495 },
      { id: 'lbs', label: 'Pounds', toG: 453.592 },
    ],
  },
  temperature: {
    name: 'Temperature',
    units: [
      { id: 'f', label: '°F' },
      { id: 'c', label: '°C' },
    ],
  },
}

export function UnitConverter() {
  const [category, setCategory] = useState<'volume' | 'weight' | 'temperature'>('volume')
  const [fromUnit, setFromUnit] = useState('cups')
  const [toUnit, setToUnit] = useState('ml')
  const [fromValue, setFromValue] = useState<number>(1)
  const [toValue, setToValue] = useState<number>(236.588)

  const convert = (value: number, from: string, to: string) => {
    if (category === 'temperature') {
      if (from === 'f' && to === 'c') return (value - 32) * 5/9
      if (from === 'c' && to === 'f') return value * 9/5 + 32
      return value
    }

    const units = conversions[category].units
    const fromDef = units.find(u => u.id === from)
    const toDef = units.find(u => u.id === to)
    
    if (!fromDef || !toDef) return value

    const baseKey = category === 'volume' ? 'toMl' : 'toG'
    const baseValue = value * (fromDef as any)[baseKey]
    return baseValue / (toDef as any)[baseKey]
  }

  const handleFromChange = (value: number) => {
    setFromValue(value)
    setToValue(parseFloat(convert(value, fromUnit, toUnit).toFixed(3)))
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <div className="p-6">
      {/* Category Tabs */}
      <div className="flex gap-2 mb-6">
        {Object.entries(conversions).map(([key, { name }]) => (
          <button
            key={key}
            onClick={() => {
              setCategory(key as any)
              setFromUnit(conversions[key as keyof typeof conversions].units[0].id)
              setToUnit(conversions[key as keyof typeof conversions].units[1].id)
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              category === key
                ? 'bg-green-600 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Converter */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <input
            type="number"
            value={fromValue}
            onChange={(e) => handleFromChange(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 text-2xl font-medium border rounded-lg"
          />
          <select
            value={fromUnit}
            onChange={(e) => {
              setFromUnit(e.target.value)
              handleFromChange(fromValue)
            }}
            className="w-full mt-2 px-4 py-2 border rounded-lg"
          >
            {conversions[category].units.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSwap}
          className="p-3 bg-neutral-100 rounded-full hover:bg-neutral-200"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <input
            type="number"
            value={toValue}
            readOnly
            className="w-full px-4 py-3 text-2xl font-medium border rounded-lg bg-neutral-50"
          />
          <select
            value={toUnit}
            onChange={(e) => {
              setToUnit(e.target.value)
              setToValue(parseFloat(convert(fromValue, fromUnit, e.target.value).toFixed(3)))
            }}
            className="w-full mt-2 px-4 py-2 border rounded-lg"
          >
            {conversions[category].units.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Conversions */}
      <div className="mt-8">
        <h3 className="font-medium text-neutral-900 mb-3">Common Conversions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { from: '1 cup', to: '236.6 ml' },
            { from: '1 tbsp', to: '14.8 ml' },
            { from: '1 oz', to: '28.3 g' },
            { from: '1 lb', to: '453.6 g' },
          ].map((c) => (
            <div key={c.from} className="p-3 bg-neutral-50 rounded-lg text-center">
              <p className="font-medium text-neutral-900">{c.from}</p>
              <p className="text-sm text-neutral-500">= {c.to}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

# 8. Sanity Schema (Optional)

If you want to manage tool content (educational sections, FAQs) via CMS:

```typescript
// src/sanity/schemaTypes/documents/toolType.ts
import {defineField, defineType} from 'sanity'

export const toolType = defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Calculator', value: 'calculator' },
          { title: 'Converter', value: 'converter' },
          { title: 'Tracker', value: 'tracker' },
          { title: 'Quiz', value: 'quiz' },
        ],
      },
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "calculator", "scale")',
    }),
    defineField({
      name: 'educationalContent',
      title: 'Educational Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            { name: 'question', type: 'string', title: 'Question' },
            { name: 'answer', type: 'text', title: 'Answer' },
          ],
        },
      ],
    }),
    defineField({
      name: 'relatedGuides',
      title: 'Related Guides',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'guide' }] }],
    }),
    defineField({
      name: 'relatedTools',
      title: 'Related Tools',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tool' }] }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
      ],
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
```

---

# 9. Analytics & Tracking

## 9.1 Events to Track

```typescript
// Track tool page view
gtag('event', 'page_view', {
  page_title: 'Protein Calculator',
  page_location: '/tools/protein-calculator',
  content_group: 'tools',
})

// Track calculation
gtag('event', 'tool_calculation', {
  tool_name: 'protein_calculator',
  activity_level: 'moderate',
  goal: 'build_muscle',
})

// Track email capture
gtag('event', 'tool_email_capture', {
  tool_name: 'protein_calculator',
})

// Track share
gtag('event', 'share', {
  method: 'twitter',
  content_type: 'tool',
  item_id: 'protein_calculator',
})

// Track guide link click
gtag('event', 'click', {
  link_type: 'related_guide',
  tool_name: 'protein_calculator',
  guide_name: 'protein_guide',
})
```

## 9.2 Analytics Helper

```typescript
// lib/analytics.ts
export const trackToolEvent = (
  eventName: string,
  toolName: string,
  additionalParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      tool_name: toolName,
      ...additionalParams,
    })
  }
}

// Usage
trackToolEvent('tool_calculation', 'protein_calculator', {
  activity_level: 'moderate',
  goal: 'build_muscle',
})
```

---

# 10. Launch Checklist

## 10.1 Pre-Launch: Development

- [ ] Build tool hub page
- [ ] Build first calculator (Protein Calculator)
- [ ] Build second calculator (Macro Calculator)
- [ ] Build third calculator (Calorie/TDEE Calculator)
- [ ] Implement shared components (inputs, results)
- [ ] Implement email results component
- [ ] Add schema markup to all tool pages
- [ ] Mobile responsive testing
- [ ] Cross-browser testing

## 10.2 Pre-Launch: Content

- [ ] Write educational content for each tool
- [ ] Add FAQ sections
- [ ] Create related content links
- [ ] Write SEO meta descriptions
- [ ] Add disclaimers where needed (BMI, medical)

## 10.3 Pre-Launch: SEO

- [ ] Configure meta tags for hub and tool pages
- [ ] Add Open Graph images
- [ ] Implement SoftwareApplication schema
- [ ] Add FAQ schema
- [ ] Add to sitemap
- [ ] Add to main navigation

## 10.4 Launch Day

- [ ] Deploy all tools
- [ ] Test all calculations
- [ ] Test email capture
- [ ] Submit sitemap to Search Console
- [ ] Announce on newsletter
- [ ] Share on social media

## 10.5 Post-Launch (Week 1)

- [ ] Monitor for calculation errors
- [ ] Check email capture rates
- [ ] Review analytics
- [ ] Gather user feedback
- [ ] Fix any bugs

## 10.6 Ongoing

### Weekly
- [ ] Monitor tool usage analytics
- [ ] Track email captures
- [ ] Check for errors/feedback

### Monthly
- [ ] Add 1-2 new tools
- [ ] Update formulas if needed
- [ ] Improve based on feedback

### Quarterly
- [ ] Review SEO performance
- [ ] Check backlink growth
- [ ] Consider new tool ideas
- [ ] Update educational content

---

# Summary

## Quick Reference

```
Hub URL: /tools
Tool URLs: /tools/[tool-slug]

Tool Categories:
├── Calculators (protein, macros, calories, BMI, hydration, fiber)
├── Converters (unit converter, recipe scaler)
├── Trackers (future)
└── Quizzes (future)

Priority Build Order:
1. Protein Calculator
2. Macro Calculator
3. Calorie/TDEE Calculator
4. Hydration Calculator
5. BMI Calculator
6. Unit Converter
7. Recipe Scaler
8. Fiber Calculator
```

## Key Success Factors

1. **Make calculations accurate** — Use evidence-based formulas
2. **Add educational value** — Not just a calculator, teach users
3. **Capture emails** — Offer to email results
4. **Link to content** — Drive users to guides and articles
5. **Track everything** — Understand what users do

## Expected Outcomes

| Timeframe | Expected Result |
|-----------|-----------------|
| Month 1 | 3 core calculators live |
| Month 3 | 6+ tools, 500+ monthly users |
| Month 6 | 8+ tools, backlinks growing |
| Year 1 | Full tool suite, significant traffic |

---

**Document Version:** 1.0  
**Created:** January 2025  
**For:** FoodPulse Development Team
