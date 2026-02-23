# Grocery Budget Planner - Development Guide

## Vision Statement

The FoodPulse Grocery Budget Planner transforms the frustrating experience of "eating healthy is too expensive" into a strategic, empowering tool. It's not just a calculator—it's a **smart budgeting system** that helps users allocate their grocery dollars toward nutrient-dense foods while minimizing waste and maximizing value.

> **Core Philosophy**: Healthy eating isn't about spending more—it's about spending smarter.

---

## The Problem We're Solving

| Common Pain Point | Our Solution |
|-------------------|--------------|
| "Healthy food is too expensive" | Show cost-per-nutrient, not just cost-per-item |
| Generic budget advice | Personalized allocation based on dietary approach |
| Food waste erodes budget | Right-sizing portions and shelf-life awareness |
| Analysis paralysis at store | Prioritized shopping list within budget |
| No visibility into spending | Category breakdown with visual insights |
| Impulse buying derails plans | Pre-commitment with calculated lists |

---

## Innovative Features

### 1. Diet-Aware Budget Allocation

If the user has completed the Diet Quiz, we pre-configure optimal budget splits:

```
YOUR BUDGET ALLOCATION (Mediterranean)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Weekly Budget: $150

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Vegetables & Fruits    ████████████████░░░░  35%   $52.50  │
│  Proteins (Fish/Poultry)████████████░░░░░░░░  25%   $37.50  │
│  Whole Grains & Legumes ██████████░░░░░░░░░░  18%   $27.00  │
│  Dairy & Eggs           ██████░░░░░░░░░░░░░░  10%   $15.00  │
│  Olive Oil & Fats       ████░░░░░░░░░░░░░░░░   7%   $10.50  │
│  Herbs & Seasonings     ███░░░░░░░░░░░░░░░░░   5%    $7.50  │
│                                                             │
└─────────────────────────────────────────────────────────────┘

📊 This allocation optimizes for Mediterranean eating patterns.
   Adjust sliders to match your household's preferences.
```

**Budget Templates by Diet:**

| Diet Approach | Proteins | Produce | Grains | Dairy | Fats | Other |
|---------------|----------|---------|--------|-------|------|-------|
| Mediterranean | 25% | 35% | 18% | 10% | 7% | 5% |
| DASH | 20% | 35% | 20% | 15% | 5% | 5% |
| Flexitarian | 15% | 40% | 20% | 12% | 8% | 5% |
| WFPB | 10% | 45% | 25% | 0% | 10% | 10% |
| Low-Carb | 40% | 30% | 5% | 12% | 10% | 3% |
| Keto | 35% | 25% | 2% | 15% | 20% | 3% |
| Balanced | 25% | 30% | 20% | 12% | 8% | 5% |

### 2. Cost-Per-Nutrient Analysis

Instead of just showing price, show **nutritional value per dollar**:

```
SMART VALUE ANALYSIS
━━━━━━━━━━━━━━━━━━━━

PROTEIN SOURCES - Cost per 30g protein:

Best Value                                    Cost/30g
───────────────────────────────────────────────────────
🥇 Dried lentils (bulk)                        $0.35
🥈 Eggs (dozen, store brand)                   $0.52
🥉 Chicken thighs (bone-in)                    $0.68
   Canned tuna                                 $0.85
   Ground turkey                               $0.95
   Greek yogurt (large tub)                    $1.10
   Salmon (frozen, wild-caught)                $1.85
   Chicken breast (boneless)                   $1.95

💡 INSIGHT: Switching from chicken breast to chicken thighs
   saves $1.27 per 30g protein with similar nutrition.
```

### 3. Household-Adjusted Planning

Account for real-world household dynamics:

```
HOUSEHOLD CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━

Adults:        [2] ▼
Children:      [1] ▼  Age: [8] years
Activity Level:
  □ Sedentary (office work, low activity)
  ☑ Moderate (some exercise, active job)
  □ Very Active (athletes, physical labor)

Special Considerations:
  ☑ Pack lunches for work/school
  □ Entertaining/guests frequently
  □ One household member has different diet

───────────────────────────────────────────────
CALCULATED NEEDS:
  Weekly calories needed:    ~42,000 kcal
  Weekly protein needed:     ~350g minimum
  Suggested weekly budget:   $140-$180
───────────────────────────────────────────────
```

### 4. Smart Substitution Engine

Suggest budget-friendly swaps without sacrificing nutrition:

```
SMART SWAPS TO STAY IN BUDGET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your list is $23.50 over budget. Here are suggested swaps:

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Current Item           →  Suggested Swap         Savings   │
│  ──────────────────────────────────────────────────────────│
│  Salmon fillet (fresh)  →  Salmon (frozen)        -$4.50   │
│  Baby spinach (bag)     →  Regular spinach bunch  -$2.00   │
│  Almond butter          →  Peanut butter          -$3.50   │
│  Organic blueberries    →  Frozen blueberries     -$3.00   │
│  Pre-cut vegetables     →  Whole vegetables       -$4.50   │
│  Brand name oats        →  Store brand oats       -$1.50   │
│  ──────────────────────────────────────────────────────────│
│                              Potential Savings:   $19.00   │
│                                                             │
│  [Apply Selected Swaps]  [Keep Original]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

⚡ QUICK TIP: Frozen fruits and vegetables often have
   equal or better nutrition than fresh (frozen at peak).
```

### 5. Seasonal & Local Optimizer

Highlight what's in season for better prices and quality:

```
SEASONAL PRODUCE (February)
━━━━━━━━━━━━━━━━━━━━━━━━━━━

IN SEASON NOW - Best prices & quality:
  🥬 Cabbage, Brussels sprouts, Kale
  🍊 Citrus (oranges, grapefruit, lemons)
  🥕 Root vegetables (carrots, beets, turnips)
  🍎 Storage apples, pears

AVOID (out of season, imported, expensive):
  ❌ Tomatoes (low quality, high price)
  ❌ Berries (except frozen)
  ❌ Stone fruits
  ❌ Asparagus

💰 Estimated seasonal savings: $8-15/week by choosing
   in-season produce over out-of-season imports.
```

### 6. Waste Reduction Calculator

Budget isn't just about buying—it's about using what you buy:

```
WASTE-SMART PLANNING
━━━━━━━━━━━━━━━━━━━━

Average household wastes 30-40% of purchased food.
Let's reduce that:

YOUR PLANNED PURCHASES:
┌──────────────────────────────────────────────────────────┐
│ Item              Qty   Shelf Life   Use-By Plan        │
│ ─────────────────────────────────────────────────────────│
│ Fresh spinach     2 bags  5-7 days   Mon salad, Wed stir│
│ Chicken breast    2 lbs   2-3 days   ⚠️ Freeze half?    │
│ Bananas           1 bunch 4-5 days   ✓ Will use         │
│ Fresh herbs       1 bunch 3-5 days   ⚠️ Consider dried? │
│ Bread (artisan)   1 loaf  3-4 days   ⚠️ Freeze half?    │
│ Greek yogurt      32 oz   14 days    ✓ Will use         │
└──────────────────────────────────────────────────────────┘

⚠️ WARNING: 3 items may expire before you use them.
   Projected waste: ~$8.50

SUGGESTIONS:
• Freeze chicken portions on purchase day
• Use spinach early in the week, switch to frozen later
• Freeze half the bread immediately
```

### 7. Batch Cooking ROI

Show the financial benefit of meal prep:

```
BATCH COOKING SAVINGS
━━━━━━━━━━━━━━━━━━━━━

SCENARIO: Weekday lunches for 2 adults

Option A: Daily convenience
  Takeout/fast casual: $15/person × 2 × 5 days = $150/week

Option B: Batch prep
  Ingredients for 10 lunches: $35
  Time investment: ~2 hours Sunday

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  WEEKLY SAVINGS: $115                                       │
│  MONTHLY SAVINGS: $460                                      │
│  YEARLY SAVINGS: $5,520                                     │
│                                                             │
│  Cost per meal: $3.50 (vs $15.00)                          │
│  Time per meal: 5 min reheat (vs 20 min commute/wait)      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

🍱 BATCH-FRIENDLY RECIPES FOR YOUR DIET:
   • Mediterranean grain bowls (keeps 5 days)
   • Mason jar salads (keeps 4 days)
   • Soup/stew portions (freeze extras)
```

### 8. Progressive Budget Tiers

Help users at any budget level:

```
BUDGET TIER PLANNING
━━━━━━━━━━━━━━━━━━━━

Select your weekly grocery budget:

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ○ TIGHT ($50-75/week for 2)                               │
│    Focus: Beans, lentils, eggs, frozen veg, seasonal       │
│    Strategy: Minimal waste, maximum batch cooking           │
│                                                             │
│  ● MODERATE ($100-150/week for 2)                          │
│    Focus: Mix of proteins, fresh & frozen produce          │
│    Strategy: Strategic splurges, mostly whole foods        │
│                                                             │
│  ○ COMFORTABLE ($150-200/week for 2)                       │
│    Focus: Quality proteins, organic options, variety       │
│    Strategy: Convenience where helpful, quality emphasis   │
│                                                             │
│  ○ FLEXIBLE ($200+/week for 2)                             │
│    Focus: Premium ingredients, specialty items             │
│    Strategy: Optimize for preference and quality           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Each tier provides a complete, nutritionally adequate plan.
```

### 9. Shopping List Generator

The ultimate output—a prioritized, actionable list:

```
YOUR WEEKLY SHOPPING LIST
━━━━━━━━━━━━━━━━━━━━━━━━━

Budget: $150 | Planned: $143.50 | Remaining: $6.50

PRIORITY 1 - Core Staples (Buy First)        Subtotal: $65.00
─────────────────────────────────────────────────────────────
☐ Chicken thighs, bone-in (3 lbs)              $8.97
☐ Eggs, large (18 ct)                          $4.29
☐ Greek yogurt, plain (32 oz)                  $5.49
☐ Olive oil, extra virgin (if running low)    $8.99
☐ Brown rice (2 lb bag)                        $3.49
☐ Dried lentils (1 lb)                         $1.89
☐ Canned tomatoes, diced (4 cans)              $4.76
☐ Onions (3 lb bag)                            $2.99
☐ Garlic (head)                                $0.69
☐ Carrots (2 lb bag)                           $2.49
... [expandable]

PRIORITY 2 - Weekly Fresh (Buy Second)        Subtotal: $48.50
─────────────────────────────────────────────────────────────
☐ Broccoli crowns (2)                          $3.98
☐ Spinach, regular bunch                       $2.49
☐ Bell peppers, multi-color (3 ct)             $4.99
☐ Lemons (4 ct bag)                            $2.99
☐ Apples, Fuji (3 lb bag)                      $4.99
☐ Bananas (bunch)                              $1.49
☐ Fresh salmon (1 lb, for Fri dinner)          $9.99
... [expandable]

PRIORITY 3 - Nice to Have (If Budget Allows)  Subtotal: $30.00
─────────────────────────────────────────────────────────────
☐ Feta cheese                                  $4.99
☐ Kalamata olives                              $5.49
☐ Fresh herbs (basil)                          $2.99
☐ Hummus                                       $3.99
☐ Dark chocolate (70%+)                        $3.49
... [expandable]

─────────────────────────────────────────────────────────────
                                    TOTAL:    $143.50
                                    BUFFER:     $6.50

[📱 Send to Phone]  [🖨️ Print List]  [📧 Email List]
```

### 10. Integration with FoodPulse Tools

Connect to the ecosystem:

```
CONNECTED TOOLS
━━━━━━━━━━━━━━━

📊 FROM YOUR CALORIE CALCULATOR:
   Daily target: 2,100 kcal
   Weekly household: ~42,000 kcal
   → Budget provides ~280 kcal per dollar spent

🥩 FROM YOUR MACRO CALCULATOR:
   Daily protein target: 140g
   Weekly household: ~980g
   → List includes 1,050g protein ($0.14/gram)

🍽️ FROM YOUR DIET QUIZ:
   Recommended: Mediterranean-Flexitarian
   → Budget allocated for olive oil, fish, legumes

🔗 SUGGESTED NEXT:
   • Meal Cost Calculator - see cost per recipe
   • Protein Calculator - optimize protein sources
```

---

## User Flow Architecture

### Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        GROCERY BUDGET PLANNER FLOW                        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ENTRY POINTS                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐          │
│  │ Direct Visit    │  │ From Diet Quiz  │  │ From Calculator │          │
│  │ (/tools/budget) │  │ (results CTA)   │  │ (related tools) │          │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘          │
│           │                    │                     │                    │
│           └────────────────────┼─────────────────────┘                    │
│                                │                                          │
│                                ▼                                          │
│  STEP 1: SETUP ────────────────────────────────────────────────          │
│  ┌────────────────────────────────────────────────────────────┐          │
│  │                                                            │          │
│  │  Household Setup                                           │          │
│  │  ├── Adults: [  ] Children: [  ] Ages: [  ]               │          │
│  │  ├── Weekly Budget: $[    ]                                │          │
│  │  ├── Dietary Approach: [Mediterranean ▼] (pre-filled?)    │          │
│  │  └── Special Needs: [ ] Lunches [ ] Guests [ ] etc.       │          │
│  │                                                            │          │
│  │  [Continue →]                                              │          │
│  │                                                            │          │
│  └────────────────────────────────────────────────────────────┘          │
│                                │                                          │
│                                ▼                                          │
│  STEP 2: ALLOCATION ───────────────────────────────────────────          │
│  ┌────────────────────────────────────────────────────────────┐          │
│  │                                                            │          │
│  │  Budget Allocation (Adjustable)                            │          │
│  │  ├── [====Proteins====] 25% ($37.50)                      │          │
│  │  ├── [======Produce=====] 35% ($52.50)                    │          │
│  │  ├── [===Grains===] 18% ($27.00)                          │          │
│  │  └── ... (sliders or pie chart)                           │          │
│  │                                                            │          │
│  │  ○ Use recommended   ● Customize                          │          │
│  │                                                            │          │
│  │  [← Back]  [Continue →]                                   │          │
│  │                                                            │          │
│  └────────────────────────────────────────────────────────────┘          │
│                                │                                          │
│                                ▼                                          │
│  STEP 3: ITEM SELECTION ───────────────────────────────────────          │
│  ┌────────────────────────────────────────────────────────────┐          │
│  │                                                            │          │
│  │  Build Your List (by category tabs)                        │          │
│  │  [Proteins] [Produce] [Grains] [Dairy] [Pantry]           │          │
│  │                                                            │          │
│  │  PROTEINS ($37.50 allocated)                              │          │
│  │  ┌─────────────────────────────────────────────────────┐  │          │
│  │  │ ☑ Chicken thighs    3 lbs   $8.97    Best Value 🏆 │  │          │
│  │  │ ☑ Eggs              18 ct   $4.29                   │  │          │
│  │  │ ☐ Salmon            1 lb    $9.99                   │  │          │
│  │  │ ☑ Lentils (dried)   1 lb    $1.89    Budget Pick 💰│  │          │
│  │  │ ☐ Ground beef       ...                             │  │          │
│  │  │ [+ Add custom item]                                 │  │          │
│  │  └─────────────────────────────────────────────────────┘  │          │
│  │  Category total: $25.14 of $37.50 (67%)                   │          │
│  │                                                            │          │
│  │  [← Back]  [Generate List →]                              │          │
│  │                                                            │          │
│  └────────────────────────────────────────────────────────────┘          │
│                                │                                          │
│                                ▼                                          │
│  STEP 4: RESULTS ──────────────────────────────────────────────          │
│  ┌────────────────────────────────────────────────────────────┐          │
│  │                                                            │          │
│  │  YOUR WEEKLY GROCERY PLAN                                  │          │
│  │                                                            │          │
│  │  [Summary Cards]  [Shopping List]  [Insights]              │          │
│  │                                                            │          │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐         │          │
│  │  │ BUDGET  │ │ PLANNED │ │ SAVINGS │ │COST/DAY │         │          │
│  │  │  $150   │ │ $143.50 │ │  $6.50  │ │ $20.50  │         │          │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘         │          │
│  │                                                            │          │
│  │  [View Swaps] [View Seasonal] [Waste Check]               │          │
│  │                                                            │          │
│  │  [📱 Send List] [🖨️ Print] [💾 Save Plan] [🔄 Start Over] │          │
│  │                                                            │          │
│  └────────────────────────────────────────────────────────────┘          │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

### State Management

```typescript
interface PlannerState {
  // Step tracking
  currentStep: 'setup' | 'allocation' | 'selection' | 'results';

  // Setup inputs
  household: {
    adults: number;
    children: number;
    childAges: number[];
    activityLevel: 'sedentary' | 'moderate' | 'active';
  };
  weeklyBudget: number;
  dietaryApproach: DietId | 'custom';
  specialNeeds: {
    packLunches: boolean;
    frequentGuests: boolean;
    splitDiets: boolean;
  };

  // Allocation
  categoryBudgets: Record<FoodCategory, {
    percentage: number;
    amount: number;
  }>;
  useRecommended: boolean;

  // Selection
  selectedItems: GroceryItem[];
  customItems: GroceryItem[];

  // Computed results
  results: {
    totalPlanned: number;
    remaining: number;
    categoryBreakdown: CategoryBreakdown[];
    prioritizedList: PrioritizedList;
    insights: Insight[];
    swapSuggestions: SwapSuggestion[];
    wasteWarnings: WasteWarning[];
  };
}

interface GroceryItem {
  id: string;
  name: string;
  category: FoodCategory;
  price: number;
  quantity: number;
  unit: string;
  nutrition: {
    calories: number;
    protein: number;
    // ... other macros
  };
  shelfLife: number; // days
  tags: ('best_value' | 'budget_pick' | 'seasonal' | 'organic')[];
  isSelected: boolean;
}

type FoodCategory =
  | 'proteins'
  | 'produce_vegetables'
  | 'produce_fruits'
  | 'grains'
  | 'dairy'
  | 'fats_oils'
  | 'pantry'
  | 'frozen'
  | 'beverages';
```

---

## Data Architecture

### Grocery Items Database

Since no backend exists, we'll use a curated local database:

```typescript
const groceryDatabase: GroceryItem[] = [
  // PROTEINS
  {
    id: 'chicken_thighs',
    name: 'Chicken thighs, bone-in',
    category: 'proteins',
    pricePerUnit: 2.99,
    unit: 'lb',
    typicalQuantity: 3,
    nutrition: {
      servingSize: '4 oz',
      calories: 180,
      protein: 26,
      fat: 8,
      carbs: 0
    },
    shelfLife: 2,
    freezable: true,
    tags: ['best_value'],
    dietCompatibility: ['mediterranean', 'dash', 'low_carb', 'keto', 'flexitarian']
  },
  {
    id: 'lentils_dried',
    name: 'Dried lentils',
    category: 'proteins',
    pricePerUnit: 1.89,
    unit: 'lb',
    typicalQuantity: 1,
    nutrition: {
      servingSize: '1/4 cup dry',
      calories: 170,
      protein: 12,
      fat: 0.5,
      carbs: 30,
      fiber: 8
    },
    shelfLife: 365,
    freezable: false,
    tags: ['budget_pick', 'best_value'],
    dietCompatibility: ['mediterranean', 'dash', 'wfpb', 'flexitarian']
  },
  // ... hundreds more items
];

// Seasonal availability by month
const seasonalProduce: Record<number, string[]> = {
  1: ['citrus', 'cabbage', 'kale', 'root_vegetables'],
  2: ['citrus', 'cabbage', 'kale', 'root_vegetables'],
  3: ['asparagus', 'artichokes', 'leafy_greens'],
  // ... all 12 months
};

// Regional price adjustments (future feature)
const regionMultipliers: Record<string, number> = {
  'northeast': 1.15,
  'southeast': 0.95,
  'midwest': 0.90,
  'southwest': 1.00,
  'west': 1.20,
  'northwest': 1.10
};
```

### Diet-Specific Budget Templates

```typescript
const dietBudgetTemplates: Record<DietId, BudgetAllocation> = {
  mediterranean: {
    proteins: 0.25,
    produce_vegetables: 0.25,
    produce_fruits: 0.10,
    grains: 0.15,
    dairy: 0.08,
    fats_oils: 0.08,
    pantry: 0.05,
    frozen: 0.02,
    beverages: 0.02,
    priorityItems: ['olive_oil', 'fish', 'legumes', 'whole_grains', 'nuts'],
    avoidItems: []
  },
  keto: {
    proteins: 0.35,
    produce_vegetables: 0.20,
    produce_fruits: 0.03,
    grains: 0.00,
    dairy: 0.15,
    fats_oils: 0.20,
    pantry: 0.03,
    frozen: 0.02,
    beverages: 0.02,
    priorityItems: ['eggs', 'butter', 'cheese', 'avocados', 'fatty_fish'],
    avoidItems: ['bread', 'rice', 'pasta', 'sugar', 'most_fruits']
  },
  // ... other diets
};
```

### Substitution Rules Engine

```typescript
const substitutionRules: SubstitutionRule[] = [
  {
    original: 'salmon_fresh',
    alternatives: [
      { item: 'salmon_frozen', savingsPercent: 30, nutritionMatch: 0.95 },
      { item: 'sardines_canned', savingsPercent: 60, nutritionMatch: 0.85 },
      { item: 'mackerel_canned', savingsPercent: 55, nutritionMatch: 0.90 }
    ],
    rationale: 'Frozen and canned fish offer similar omega-3 benefits at lower cost'
  },
  {
    original: 'chicken_breast',
    alternatives: [
      { item: 'chicken_thighs', savingsPercent: 40, nutritionMatch: 0.90 },
      { item: 'chicken_drumsticks', savingsPercent: 50, nutritionMatch: 0.85 }
    ],
    rationale: 'Dark meat is more affordable and many find it more flavorful'
  },
  {
    original: 'spinach_baby_bag',
    alternatives: [
      { item: 'spinach_bunch', savingsPercent: 35, nutritionMatch: 1.0 },
      { item: 'spinach_frozen', savingsPercent: 50, nutritionMatch: 0.95 }
    ],
    rationale: 'Bunch spinach requires washing but costs less; frozen is pre-cleaned and lasts longer'
  },
  // ... many more rules
];
```

---

## Results Page Design

### Above the Fold: Summary Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  🛒  YOUR WEEKLY GROCERY PLAN                                           │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│
│  │    BUDGET    │  │   PLANNED    │  │   SAVINGS    │  │  COST/DAY    ││
│  │              │  │              │  │              │  │              ││
│  │    $150      │  │   $143.50    │  │    $6.50     │  │   $20.50     ││
│  │              │  │              │  │   buffer     │  │  per person  ││
│  │   weekly     │  │   95.7%      │  │   4.3%       │  │              ││
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘│
│                                                                          │
│  ═══════════════════════════════════════════════════════════════════════│
│                                                                          │
│  BUDGET BREAKDOWN BY CATEGORY                                            │
│                                                                          │
│  Proteins        ████████████████████████████░░  $35.50 / $37.50 (95%)  │
│  Vegetables      █████████████████████████░░░░░  $48.00 / $52.50 (91%)  │
│  Fruits          ████████████░░░░░░░░░░░░░░░░░░  $12.50 / $15.00 (83%)  │
│  Grains          ██████████████████████████████  $27.00 / $27.00 (100%) │
│  Dairy           ██████████████████░░░░░░░░░░░░  $13.00 / $15.00 (87%)  │
│  Fats/Oils       █████████████████░░░░░░░░░░░░░   $7.50 / $10.50 (71%)  │
│                                                                          │
│  [ 📋 View Full List ]  [ 🔄 Swap Suggestions ]  [ 📊 Nutrition Check ] │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Section 2: Prioritized Shopping List

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  PRIORITIZED SHOPPING LIST                              Sort: [Default ▼]│
│                                                                          │
│  🔴 PRIORITY 1: Essentials (Buy First)                     Total: $65.00│
│  ─────────────────────────────────────────────────────────────────────── │
│  │ ☐ │ Chicken thighs (3 lbs)      │ Proteins   │ $8.97  │ 🏆 Value   │ │
│  │ ☐ │ Eggs, large (18 ct)         │ Proteins   │ $4.29  │            │ │
│  │ ☐ │ Olive oil, extra virgin     │ Fats       │ $8.99  │ Med staple │ │
│  │ ☐ │ Brown rice (2 lbs)          │ Grains     │ $3.49  │            │ │
│  │ ☐ │ Dried lentils (1 lb)        │ Proteins   │ $1.89  │ 💰 Budget  │ │
│  │ ☐ │ Onions (3 lb bag)           │ Vegetables │ $2.99  │            │ │
│  │ ☐ │ Garlic (2 heads)            │ Vegetables │ $1.29  │            │ │
│  └───┴─────────────────────────────┴────────────┴────────┴────────────┘ │
│                                                                          │
│  🟡 PRIORITY 2: Weekly Fresh                               Total: $48.50│
│  ─────────────────────────────────────────────────────────────────────── │
│  │ ☐ │ Broccoli crowns (2)         │ Vegetables │ $3.98  │ 🌱 Seasonal│ │
│  │ ☐ │ Spinach, bunch              │ Vegetables │ $2.49  │            │ │
│  │ ☐ │ Greek yogurt (32 oz)        │ Dairy      │ $5.49  │            │ │
│  │ ☐ │ Lemons (4 ct)               │ Fruits     │ $2.99  │ 🌱 Seasonal│ │
│  │ ☐ │ Salmon fillet (1 lb)        │ Proteins   │ $9.99  │ 🐟 Omega-3 │ │
│  └───┴─────────────────────────────┴────────────┴────────┴────────────┘ │
│                                                                          │
│  🟢 PRIORITY 3: Nice to Have (If Budget Allows)            Total: $30.00│
│  ─────────────────────────────────────────────────────────────────────── │
│  │ ☐ │ Feta cheese                 │ Dairy      │ $4.99  │ Med staple │ │
│  │ ☐ │ Fresh basil                 │ Herbs      │ $2.99  │ ⚠️ Use fast│ │
│  │ ☐ │ Kalamata olives             │ Pantry     │ $5.49  │            │ │
│  └───┴─────────────────────────────┴────────────┴────────┴────────────┘ │
│                                                                          │
│  [ ✓ Select All ]  [ Export to App ]  [ Print ]  [ Email ]              │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Section 3: Smart Insights Panel

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  💡 INSIGHTS & TIPS                                                     │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ 💰 BUDGET OPTIMIZATION                                              │ │
│  │                                                                     │ │
│  │ You're $6.50 under budget! Consider:                               │ │
│  │ • Add an extra bag of frozen vegetables (+$2.50)                   │ │
│  │ • Upgrade to organic eggs this week (+$2.00)                       │ │
│  │ • Stock up on pantry staples while prices are good                 │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ 🌱 SEASONAL PICKS                                                   │ │
│  │                                                                     │ │
│  │ In season this month (best quality & price):                       │ │
│  │ ✓ Citrus fruits - oranges, lemons on your list                    │ │
│  │ ✓ Cabbage - consider adding for budget-friendly fiber             │ │
│  │ ✓ Root vegetables - great for roasting, long shelf life           │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ ⚠️ WASTE PREVENTION                                                 │ │
│  │                                                                     │ │
│  │ Fresh basil has a short shelf life (3-5 days).                     │ │
│  │ Tip: Store with stems in water like a bouquet, or freeze in        │ │
│  │ olive oil ice cubes for longer storage.                            │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ 📊 NUTRITION CHECK                                                  │ │
│  │                                                                     │ │
│  │ Your weekly plan provides:                                          │ │
│  │ ├── Protein: 1,050g (150g/day) ✓ Meets target                     │ │
│  │ ├── Fiber: 175g (25g/day) ✓ Excellent                             │ │
│  │ ├── Omega-3: Good (salmon + olive oil)                            │ │
│  │ └── Vitamin C: High (citrus, broccoli)                            │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Components Needed

| Component | Purpose | Reuses |
|-----------|---------|--------|
| `BudgetPlannerContainer` | Main wizard container, step management | New |
| `SetupStep` | Household & budget configuration | NumberInput, SelectInput |
| `AllocationStep` | Category budget allocation with sliders | New (custom sliders) |
| `SelectionStep` | Item selection by category | New |
| `ResultsStep` | Final plan display | ResultCard |
| `BudgetBar` | Visual progress bar for category budgets | New |
| `GroceryItemCard` | Selectable item with price/nutrition | New |
| `CategoryTabs` | Tab navigation for food categories | New |
| `PrioritizedList` | Sortable, exportable shopping list | New |
| `SwapSuggestionCard` | Substitution recommendation | New |
| `InsightCard` | Tips and warnings display | Card (existing) |
| `SeasonalBadge` | In-season indicator | New |
| `WasteWarning` | Shelf-life alert | New |

### File Structure

```
/src/components/tools/planners/
├── grocery-budget/
│   ├── GroceryBudgetPlanner.tsx       # Main container
│   ├── steps/
│   │   ├── SetupStep.tsx              # Step 1
│   │   ├── AllocationStep.tsx         # Step 2
│   │   ├── SelectionStep.tsx          # Step 3
│   │   └── ResultsStep.tsx            # Step 4
│   ├── components/
│   │   ├── BudgetBar.tsx
│   │   ├── GroceryItemCard.tsx
│   │   ├── CategoryTabs.tsx
│   │   ├── PrioritizedList.tsx
│   │   ├── SwapSuggestionCard.tsx
│   │   ├── InsightCard.tsx
│   │   └── WasteWarning.tsx
│   ├── data/
│   │   ├── groceryDatabase.ts         # Item database
│   │   ├── dietTemplates.ts           # Budget templates by diet
│   │   ├── substitutionRules.ts       # Swap logic
│   │   ├── seasonalProduce.ts         # Monthly seasonality
│   │   └── nutritionTargets.ts        # RDA/targets
│   ├── utils/
│   │   ├── calculations.ts            # Budget math
│   │   ├── sorting.ts                 # List prioritization
│   │   └── export.ts                  # Print/email/app export
│   └── types.ts                       # TypeScript interfaces

/src/app/(marketing)/tools/grocery-budget/
└── page.tsx                           # Route page
```

---

## Technical Considerations

### Export Functionality

```typescript
// Print-friendly CSS
const printStyles = `
  @media print {
    .no-print { display: none; }
    .grocery-list { font-size: 12pt; }
    .checkbox { width: 16px; height: 16px; border: 1px solid black; }
  }
`;

// Email format
function generateEmailContent(list: ShoppingList): string {
  return `
    Your FoodPulse Grocery List
    Budget: ${formatPrice(list.budget)}
    Total: ${formatPrice(list.total)}

    ESSENTIALS:
    ${list.priority1.map(item => `☐ ${item.name} - ${formatPrice(item.price)}`).join('\n')}

    WEEKLY FRESH:
    ${list.priority2.map(item => `☐ ${item.name} - ${formatPrice(item.price)}`).join('\n')}

    ...
  `;
}

// Mobile app deep links (future)
const appDeepLinks = {
  anylist: 'anylist://import?items=...',
  ourgroceries: 'ourgroceries://add?items=...',
  reminders: 'x-apple-reminderkit://...'
};
```

### Local Storage Persistence

```typescript
// Save plan for later
function savePlan(state: PlannerState): void {
  localStorage.setItem('foodpulse_grocery_plan', JSON.stringify({
    ...state,
    savedAt: new Date().toISOString()
  }));
}

// Load previous plan
function loadPlan(): PlannerState | null {
  const saved = localStorage.getItem('foodpulse_grocery_plan');
  if (!saved) return null;

  const parsed = JSON.parse(saved);
  // Check if plan is from this week
  const savedDate = new Date(parsed.savedAt);
  const daysSince = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSince > 7) {
    // Offer to start fresh or load old plan
    return { ...parsed, isStale: true };
  }

  return parsed;
}
```

### Price Data Strategy

For MVP, use static representative prices:

```typescript
// Prices are estimates based on US national averages
// Users can adjust quantities, not individual prices (MVP)
// Future: Allow price customization or API integration

const PRICE_DISCLAIMER = `
  Prices shown are estimates based on US national averages.
  Actual prices vary by store and region. Use this tool for
  planning and proportional allocation—verify prices at your store.
`;

// Future enhancement: Price APIs
// - Kroger API (requires partnership)
// - Instacart API (requires partnership)
// - USDA Food Prices dataset (periodic updates)
// - User-submitted price crowdsourcing
```

---

## Integration Points

### From Diet Quiz

```typescript
// If user completed Diet Quiz, pre-populate:
function initFromDietQuiz(quizResults: QuizResults): Partial<PlannerState> {
  return {
    dietaryApproach: quizResults.primaryMatch,
    categoryBudgets: dietBudgetTemplates[quizResults.primaryMatch],
    // Filter grocery database by diet compatibility
    availableItems: groceryDatabase.filter(item =>
      item.dietCompatibility.includes(quizResults.primaryMatch)
    )
  };
}
```

### From Calculators

```typescript
// Link from Calorie/Macro Calculator
function initFromCalculator(calcResults: CalculatorResults): Partial<PlannerState> {
  return {
    household: {
      ...defaultHousehold,
      // Estimate household size from calorie needs
      estimatedSize: Math.round(calcResults.dailyCalories / 2000)
    },
    nutritionTargets: {
      weeklyCalories: calcResults.dailyCalories * 7,
      weeklyProtein: calcResults.protein * 7
    }
  };
}
```

### Related Tools Links

```typescript
const relatedTools = [
  {
    title: 'Calorie Calculator',
    slug: 'calorie-calculator',
    icon: <TrendingUp />,
    description: 'Calculate your calorie needs'
  },
  {
    title: 'Macro Calculator',
    slug: 'macro-calculator',
    icon: <Scale />,
    description: 'Balance your macronutrients'
  },
  {
    title: 'Meal Cost Calculator',
    slug: 'meal-cost',
    icon: <DollarSign />,
    description: 'Cost per serving of recipes',
    comingSoon: true
  },
  {
    title: 'Diet Quiz',
    slug: 'diet-quiz',
    icon: <HelpCircle />,
    description: 'Find your ideal eating approach'
  }
];
```

---

## Educational Content

### Included in Tool

```typescript
const educationalContent = {
  sections: [
    {
      title: 'How to Use This Planner',
      content: `
        1. Start by setting your weekly budget and household size
        2. Choose or customize your budget allocation by food category
        3. Select items from our curated list (filtered for your diet)
        4. Review your prioritized shopping list and insights
        5. Export or print your list to take shopping
      `
    },
    {
      title: 'Budget Allocation Tips',
      content: `
        - **Proteins**: Often the biggest expense; consider plant-based options
        - **Produce**: Buy seasonal for best prices and quality
        - **Grains & Legumes**: Dry goods stretch your dollar furthest
        - **Fats & Oils**: Quality matters; invest in good olive oil
      `
    },
    {
      title: 'Common Budget Mistakes',
      content: `
        - Buying pre-cut or pre-washed produce (3-5x markup)
        - Ignoring frozen options (often cheaper, equally nutritious)
        - Shopping without a list (impulse buys add 20-40%)
        - Buying more fresh produce than you can use (waste)
      `
    },
    {
      title: 'Healthy Eating on Any Budget',
      content: `
        - Eggs, beans, and lentils provide cheap, quality protein
        - Frozen vegetables are nutritionally equivalent to fresh
        - Whole grains like oats and brown rice are very affordable
        - Seasonal produce is both cheaper and more nutritious
      `
    }
  ]
};
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Planner Completion Rate | >65% | Complete Step 4 / Started |
| Export/Print Rate | >40% | Exported / Completed |
| Return Usage | >25% | Return visits within 4 weeks |
| Diet Quiz → Planner Flow | >15% | Quiz completers who use planner |
| Average Session Duration | 5-10 min | Analytics |
| Items Selected per Plan | >15 | Average items in completed plans |

---

## Development Phases

### Phase 1: Core MVP
- [ ] Step wizard flow (Setup → Allocation → Selection → Results)
- [ ] Static grocery database (~100 items)
- [ ] Basic budget allocation (fixed categories)
- [ ] Simple shopping list output
- [ ] Print functionality

### Phase 2: Smart Features
- [ ] Diet Quiz integration
- [ ] Smart substitution suggestions
- [ ] Seasonal produce indicators
- [ ] Waste warnings (shelf life)
- [ ] Calculator integrations

### Phase 3: Polish
- [ ] Custom item entry
- [ ] Multiple list export formats
- [ ] Local storage persistence
- [ ] Nutrition summary
- [ ] Progress bars and visual feedback

### Phase 4: Advanced
- [ ] Batch cooking ROI calculator
- [ ] Price customization
- [ ] Regional price adjustments
- [ ] Meal planning integration
- [ ] Mobile app deep link exports

---

## Design Principles

1. **Practical Over Perfect** - Real-world prices, realistic portions
2. **Progress Over Precision** - Approximate budgets help; exact ones paralyze
3. **Actionable Output** - End with a list you can actually use
4. **Non-Judgmental** - All budgets are valid; optimize within constraints
5. **Education Embedded** - Learn while planning
6. **Mobile-Friendly** - Lists are used in stores on phones
7. **Quick to Complete** - 5 minutes to a usable plan

---

## Competitive Differentiation

| Others | FoodPulse Grocery Budget Planner |
|--------|----------------------------------|
| Generic budget percentages | Diet-aware allocation (Mediterranean vs. Keto) |
| Just price tracking | Cost-per-nutrient analysis |
| Static recommendations | Smart substitutions in real-time |
| Isolated tool | Connected to calculators and quiz |
| One-size-fits-all | Household and activity adjusted |
| Focus on restriction | Focus on optimization and value |
| Complex meal planning | Simple prioritized shopping list |

---

## Future Enhancements (V2+)

### Price Intelligence
- User price submissions (crowdsourced)
- Store-specific pricing (partnerships)
- Sale/coupon integration
- Price trend tracking

### Meal Planning Bridge
- "Plan meals, auto-generate groceries"
- Recipe integration
- Leftover optimization

### Social Features
- Share budget tips
- Community substitution suggestions
- Household sharing (multiple users)

### Advanced Analytics
- Month-over-month spending trends
- Category shift analysis
- Nutritional improvement tracking

---

*This document is a living guide. Update as decisions are made and learnings emerge.*

**Last Updated**: February 2026
**Version**: 1.0 (Concept Phase)
