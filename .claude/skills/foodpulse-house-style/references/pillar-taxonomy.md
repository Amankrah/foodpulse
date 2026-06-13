# Pillar taxonomy

Every FoodPulse article maps to **exactly one** of four pillars. The Sanity `article` schema enforces this via the required `category` reference field — multi-pillar tagging is not possible and not desired. Slugs and SEO defaults below are the authoritative copy from [foodpulse/src/content/categories.ts](../../../foodpulse/src/content/categories.ts). Never invent a new pillar without updating that file and the Sanity Studio category collection first.

---

## The four pillars

### 1. Food and Wellbeing — `food-and-wellbeing`

**Scope.** Nutrition science, dietary patterns, and the health impacts of what we eat. The pillar that translates peer-reviewed nutrition and health research into practical understanding.

**Default brand mode.** Lean Scientific when the article carries ≥4 citations or any chart; Editorial when it leads with story or recipe-adjacent framing.

**Topics that clearly belong.**
- Gut health, microbiome, fibre and digestion.
- Cardiovascular nutrition (fats, sodium, sugars).
- Anti-inflammatory eating, polyphenols, antioxidants.
- Disease-prevention evidence (Type 2 diabetes risk, cancer prevention, bone health).
- Energy, sleep, and food.
- Mental health and food (mood, cognition, gut-brain axis).
- Hydration, micronutrients, vitamin and mineral evidence.

**Edge cases & disambiguation.**

| Topic | Pillar | Why |
|---|---|---|
| "What ultra-processed foods are doing to your gut" | Food and Wellbeing | Angle is *health impact*. |
| "How to read 'low fat' claims on yogurt" | Food Literacy | Angle is *label literacy*, not the health outcome of fat itself. |
| "What I cook for iron after pregnancy" | Food and Wellbeing | Health framing dominates even though there's a recipe. |
| "Iron-rich West African dishes for postpartum" | Kitchen and Cooking | Recipes are the lead; nutrition is the framing. |
| "Why the Mediterranean diet keeps showing up in mortality studies" | Food and Wellbeing | Health-outcome research. |

---

### 2. Kitchen and Cooking — `kitchen-and-cooking`

**Scope.** Delicious, nutritious recipes; cooking techniques; meal-prep guidance; kitchen skills.

**Default brand mode.** Editorial. Almost never Scientific (recipes don't carry citation density).

**Recipe articles set `isRecipe: true` in the schema** and populate `recipeData`. Non-recipe pieces in this pillar (technique pieces, meal-prep frameworks) leave `isRecipe: false`.

**Topics that clearly belong.**
- Recipes (single-dish or recipe collections).
- Cooking techniques (braising, fermentation, sheet-pan method).
- Meal prep frameworks, batch cooking, freezer strategy.
- Kitchen-equipment guides (categorical, not brand-promotional — see [non-negotiables.md](non-negotiables.md) §4).
- Pantry organization, food storage, leftover strategy.
- Knife skills, mise en place, base techniques.

**Edge cases & disambiguation.**

| Topic | Pillar | Why |
|---|---|---|
| "Roasted okra with cumin" | Kitchen and Cooking | A recipe. |
| "Why okra is nutritionally interesting" | Food and Wellbeing | Nutrition-science framing. |
| "How to read the cooking instructions on a label" | Food Literacy | Label literacy, not cooking technique. |
| "Cooking with seasonal Quebec produce" | Kitchen and Cooking | Cooking-led; brushing on local food systems is incidental. |
| "How Quebec's local food economy shapes what's in season" | Food Systems | Food-system framing dominates. |

---

### 3. Food Literacy — `food-literacy`

**Scope.** Understanding food labels, claims, and ingredients. Building consumer literacy so readers can read packaging, marketing, and ingredient lists with confidence.

**Default brand mode.** Frequently Scientific (label rules, NOVA classification, regulatory references). Editorial when it leads with story.

**Topics that clearly belong.**
- Front-of-package labeling (the new Canadian 2026 "high in" symbol, US-style labels, EU comparators).
- Nutrition Facts table mechanics, %DV interpretation.
- Marketing claims ("natural", "all-natural", "no added sugar", "low fat", "high in protein").
- Ingredient list literacy, additives, food colors, preservatives.
- Organic, regenerative, fair-trade certifications — what they mean and what they don't.
- The NOVA classification debate and ultra-processed-food categorization (when angle is *how to identify*, not *what it does to you*).
- "Decoding [X claim]" articles.

**Edge cases & disambiguation.**

| Topic | Pillar | Why |
|---|---|---|
| "What 'no added sugar' actually means on a label" | Food Literacy | Label decoding. |
| "Added sugar and metabolic health" | Food and Wellbeing | Health-outcome research. |
| "Reading the new Canadian front-of-package symbol" | Food Literacy | Regulatory + label literacy. |
| "Why Health Canada introduced front-of-package warnings" | Food Systems | Policy framing dominates. |
| "Is organic actually better for you?" | Food Literacy | The lens is "what does the label mean," not "is organic farming sustainable." |

---

### 4. Food Systems — `food-systems`

**Scope.** How food moves from farm to fork. Supply chains, sustainable agriculture, policy, food environments, and the structural conditions that shape what we eat.

**Default brand mode.** Often Editorial (story-led food-environment pieces) but Scientific for any policy or data-heavy article.

**Topics that clearly belong.**
- Food environments (the founder's research area — high authority for FoodPulse).
- Agricultural systems, regenerative and sustainable farming, food fortification.
- Supply chains, food waste, distribution.
- Food policy (Health Canada front-of-package rules, US FDA, WHO guidance — when framed as policy, not as a label task).
- Climate impact of food production.
- Food justice, access, and equity.
- Food security and fortification programmes (FCI4Africa-adjacent territory — founder authority).

**Edge cases & disambiguation.**

| Topic | Pillar | Why |
|---|---|---|
| "How food environments shape diet quality" | Food Systems | Founder authority area; system-level. |
| "What I cook because of where I grew up" | Kitchen and Cooking | Personal cooking framing. |
| "Why Canadian ultra-processed food intake is around 46%" | Food Systems | Population-level / system-level data. |
| "What ultra-processed foods do to your gut" | Food and Wellbeing | Health-impact framing. |
| "How fortification works in West African staple foods" | Food Systems | Founder doctoral research area; system-level. |

---

## Classification decision tree

Use this when a topic could plausibly sit in two pillars.

1. **What is the article's lens?**
   - *Recipe or technique* → Kitchen and Cooking. Stop.
   - *How to read or interpret packaging / ingredients / claims* → Food Literacy. Stop.
   - *Population-level, supply-chain, policy, farm, environment* → Food Systems. Stop.
   - *Personal-health outcome of eating X* → Food and Wellbeing. Stop.

2. **If still ambiguous, ask "what would the reader Google?"** Whichever phrasing matches their intent picks the pillar.

3. **If still ambiguous, ask "which pillar's expert reads this?"**
   - A dietitian-curious reader → Food and Wellbeing.
   - A grocery-shopping reader → Food Literacy.
   - A home cook → Kitchen and Cooking.
   - A policy-curious or food-systems reader → Food Systems.

---

## Why not multi-tag

The Sanity schema's `category` field is a single reference (`type: 'reference', to: [{type: 'category'}]`), not an array. Multi-pillar tagging is technically impossible and editorially undesirable — it muddies SEO clustering, breaks pillar landing pages, and dilutes topic authority. Pick the dominant lens. The article's tags array exists for cross-cutting themes ("microbiome", "Health Canada", "FCI4Africa") — that's where breadth goes.

---

## SEO defaults inherited from `categories.ts`

Each pillar carries default SEO keywords in [categories.ts](../../../foodpulse/src/content/categories.ts). Use those as the *starting* keyword set for any article in the pillar, then refine for the specific topic. Examples:

- Food and Wellbeing: `nutrition science`, `gut health`, `disease prevention`, `healthy eating`, `food and health`, `dietary patterns`, `nutrition education`.
- Kitchen and Cooking: `cooking tips`, `meal prep`, `recipes`, `kitchen skills`, `cooking techniques`, `healthy cooking`, `kitchen organization`.
- Food Literacy: `food labels`, `nutrition labels`, `food literacy`, `consumer education`, `food choices`, `reading labels`, `nutrition claims`.
- Food Systems: `food systems`, `sustainable agriculture`, `food supply chain`, `farm to table`, `food policy`, `food production`, `sustainable food`.

See [seo-metadata.md](seo-metadata.md) for how these turn into `seo.keywords` on the Sanity article.
