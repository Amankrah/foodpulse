# What Diet Quiz - Development Guide

## Vision Statement

The FoodPulse Diet Quiz is not another generic "What diet should I try?" quiz. It's a **personalized dietary pattern discovery tool** that matches users with sustainable eating approaches based on their unique lifestyle, values, health needs, and practical constraints.

> **Core Philosophy**: There is no perfect diet—only the right approach for the right person at the right time.

---

## The Problem with Existing Diet Quizzes

| Problem | Our Solution |
|---------|--------------|
| Binary results (Keto OR Mediterranean) | Hybrid recommendations combining multiple approaches |
| Focus only on weight loss | Multi-dimensional wellness goals |
| Ignore practical constraints | Factor in time, budget, cooking skills, access |
| One-time snapshot | Evolving recommendations with life changes |
| Generic advice | Personalized barrier identification & solutions |
| No follow-through | Integration with existing FoodPulse tools |

---

## Innovative Features

### 1. Multi-Dimensional Assessment Framework

Instead of linear questions, we assess users across **6 core dimensions**:

```
┌─────────────────────────────────────────────────────────────┐
│                    DIETARY DNA PROFILE                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                        GOALS                                │
│                          ▲                                  │
│                         /│\                                 │
│                        / │ \                                │
│                       /  │  \                               │
│           LIFESTYLE ─────┼───── VALUES                      │
│                       \  │  /                               │
│                        \ │ /                                │
│                         \│/                                 │
│                          ▼                                  │
│              HEALTH ────────── PRACTICAL                    │
│                          │                                  │
│                       PREFERENCES                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Dimensions Explained:**

| Dimension | What We Assess |
|-----------|----------------|
| **Goals** | Weight management, energy, athletic performance, longevity, disease prevention, mental clarity |
| **Lifestyle** | Schedule, cooking frequency, social eating, travel patterns, family dynamics |
| **Values** | Sustainability, animal welfare, local sourcing, cultural traditions, simplicity |
| **Health** | Existing conditions, restrictions, allergies, medications, family history |
| **Practical** | Budget, time availability, cooking skills, kitchen equipment, food access |
| **Preferences** | Taste profiles, texture preferences, cuisine styles, relationship with food |

### 2. Compatibility Spectrum (Not Binary Results)

Instead of "You are: Mediterranean Diet Person," we show:

```
YOUR DIETARY COMPATIBILITY PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Mediterranean          ████████████████████░░░░░  87%
Flexitarian            ███████████████████░░░░░░  82%
Whole Food Plant-Based ██████████████░░░░░░░░░░░  68%
Intermittent Fasting   ████████████████░░░░░░░░░  72%
Low-Carb               ████████░░░░░░░░░░░░░░░░░  45%
Keto                   ████░░░░░░░░░░░░░░░░░░░░░  28%

PRIMARY MATCH: Mediterranean-Flexitarian Hybrid
```

### 3. Sustainability Score (Personal Fit & Barriers)

Each recommendation includes a **Personal Fit Score** and **Predicted Barriers**—framed honestly (no fake adherence probabilities). See **Evidence-Based Modeling §6** for rationale.

- **Alignment with current habits** (gradual vs. dramatic change)
- **Social compatibility** (family, work, cultural events)
- **Economic feasibility** (budget alignment)
- **Time reality** (actual cooking time available)
- **Enjoyment potential** (preference alignment)

```
PERSONAL FIT & BARRIERS
━━━━━━━━━━━━━━━━━━━━━━━

Personal Fit Score:  ████████████████░░░░  88/100
(Based on your lifestyle, preferences, and constraints)

🔑 Predicted barriers we can help with:
   • Limited weeknight cooking time → Phase 2: quick Mediterranean meals
   • Social events with limited options → Meal prep & restaurant guide
   
Success depends on your consistency and life changes; we can’t predict exact outcomes.
```

### 4. Phased Implementation Roadmap

Not just "what to eat" but "how to get there":

```
YOUR PERSONALIZED TRANSITION ROADMAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHASE 1: Foundation (Weeks 1-2)
├── Focus: Breakfast optimization
├── Key Change: Add Mediterranean breakfast 4x/week
├── Difficulty: ●○○○○
└── Time Investment: +10 min/day

PHASE 2: Expansion (Weeks 3-4)
├── Focus: Lunch integration
├── Key Change: Meal prep Sundays
├── Difficulty: ●●○○○
└── Time Investment: +2 hours/week (batched)

PHASE 3: Integration (Weeks 5-8)
├── Focus: Full daily pattern
├── Key Change: Dinner flexibility
├── Difficulty: ●●●○○
└── Time Investment: Neutral (efficiency gained)

PHASE 4: Lifestyle (Ongoing)
├── Focus: Social & travel adaptation
├── Key Change: Intuitive eating principles
├── Difficulty: ●●○○○
└── Time Investment: None (habituated)
```

### 5. Barrier Prediction & Preemptive Solutions

The quiz identifies likely obstacles before they occur:

```
PREDICTED BARRIERS & SOLUTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  BARRIER: Limited weeknight cooking time (15-20 min)
    SOLUTION: 15-minute Mediterranean meals collection
    RESOURCE: [Link to FoodPulse article collection]

⚠️  BARRIER: Family has different dietary preferences
    SOLUTION: "Base + Build" meal strategy
    RESOURCE: [Link to family flexibility guide]

⚠️  BARRIER: Frequent work travel
    SOLUTION: Restaurant navigation guide + portable snack kit
    RESOURCE: [Link to travel eating guide]
```

### 6. Integration with FoodPulse Ecosystem

Results connect seamlessly to existing tools:

```
YOUR PERSONALIZED TOOLKIT
━━━━━━━━━━━━━━━━━━━━━━━━━

Based on your profile, we recommend:

📊 CALCULATORS
   ├── Macro Calculator → Pre-configured with Mediterranean ratios
   ├── Calorie Calculator → Set for "Moderate Loss" goal
   └── Hydration Calculator → Adjusted for activity level

📚 READING
   ├── "Mediterranean Diet for Busy Professionals" [Article]
   ├── "Flexible Dieting: The 80/20 Approach" [Article]
   └── "Meal Prep Mastery" [Guide]

🍳 RECIPES
   └── Filtered for: <30 min, Mediterranean, Family-friendly
```

---

## Quiz Architecture

### Question Flow Design

```
┌──────────────────────────────────────────────────────────────────┐
│                        QUIZ FLOW                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│  │ Welcome │───▶│ Quick   │───▶│ Core    │───▶│ Deep    │       │
│  │ Screen  │    │ Profile │    │ Journey │    │ Dive    │       │
│  └─────────┘    └─────────┘    └─────────┘    └─────────┘       │
│       │              │              │              │              │
│       │              │              │              │              │
│       ▼              ▼              ▼              ▼              │
│  • Set context   • 3 questions  • 12 questions • 5 optional     │
│  • Build trust   • Basic info   • Core assess  • Deeper insight │
│  • Est. time     • Goals snap   • All 6 dims   • Better results │
│       │              │              │              │              │
│       └──────────────┴──────────────┴──────────────┘              │
│                              │                                    │
│                              ▼                                    │
│                     ┌─────────────────┐                          │
│                     │ RESULT ENGINE   │                          │
│                     │ (Multi-layer)   │                          │
│                     └────────┬────────┘                          │
│                              │                                    │
│            ┌─────────────────┼─────────────────┐                 │
│            ▼                 ▼                 ▼                 │
│     ┌──────────┐      ┌──────────┐      ┌──────────┐            │
│     │ Primary  │      │ Support  │      │ Strategy │            │
│     │ Match    │      │ Insights │      │ Builder  │            │
│     └──────────┘      └──────────┘      └──────────┘            │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Question Categories & Examples

#### Section 1: Quick Profile (3 Questions)

**Q1: What's your primary food goal right now?** *(Single select)*
- Lose weight and keep it off
- Gain energy and feel more vibrant
- Improve specific health markers
- Eat more sustainably/ethically
- Simplify my relationship with food
- Support athletic performance
- No specific goal, just curious

**Q2: How would you describe your current eating style?** *(Single select)*
- I eat whatever's convenient
- I try to eat healthy but struggle with consistency
- I follow a loose structure but nothing specific
- I've tried various diets with mixed results
- I eat fairly well but want optimization
- I have dietary restrictions I work around

**Q3: What's your biggest food-related challenge?** *(Select up to 2)*
- Time for cooking/prep
- Knowing what to eat
- Staying consistent
- Eating out/social situations
- Budget constraints
- Family/household dynamics
- Emotional/stress eating
- Conflicting nutrition information

---

#### Section 2: Core Journey (12 Questions)

**Lifestyle Dimension:**

**Q4: What does a typical weekday look like for meals?** *(Interactive timeline selector)*
```
Morning: [Skip] [Quick grab] [Sit-down meal] [Varies]
Lunch:   [Skip] [Desk/fast]  [Proper break] [Varies]
Dinner:  [Quick] [Cook meal] [Takeout/out] [Varies]
```

**Q5: How much time can you realistically spend on food daily?** *(Slider or options)*
- Less than 30 minutes total
- 30-60 minutes total
- 1-2 hours total
- More than 2 hours (I enjoy cooking)

**Q6: Who do you typically eat with?** *(Multi-select)*
- Mostly alone
- Partner/spouse
- Children at home
- Roommates/family with different preferences
- Colleagues at work
- Varies day-to-day

---

**Values Dimension:**

**Q7: How important are these factors in your food choices?** *(Ranking or slider scale)*
- Environmental sustainability
- Animal welfare
- Supporting local producers
- Organic/minimal processing
- Cultural/traditional connection
- Convenience and simplicity

**Q8: When you imagine your ideal way of eating, it feels...** *(Single select)*
- Structured and predictable (I like rules)
- Flexible with guidelines (80/20 approach)
- Intuitive and unrestricted (mindful eating)
- Socially integrated (eating is communal)
- Optimized and measured (data-driven)

---

**Health Dimension:**

**Q9: Do any of these apply to you?** *(Multi-select with "None")*
- High blood pressure or heart concerns
- Blood sugar management/diabetes
- Digestive issues (IBS, bloating, etc.)
- Autoimmune conditions
- Joint pain or inflammation
- Hormonal imbalances
- Mental health considerations
- None of these / Prefer not to say

**Q10: Any foods you avoid or can't eat?** *(Multi-select with "None")*
- Gluten
- Dairy
- Eggs
- Soy
- Nuts/Tree nuts
- Shellfish/Fish
- Red meat
- All animal products
- None / No restrictions

---

**Practical Dimension:**

**Q11: What's your monthly food budget comfort zone?** *(Single select)*
- I need very budget-conscious options
- Moderate budget, value-focused
- Comfortable budget, quality matters
- Budget isn't a primary concern

**Q12: Kitchen and cooking reality check:** *(Multi-select)*
- I have basic equipment only
- I have a well-equipped kitchen
- I'm a beginner cook
- I'm a confident cook
- I have access to diverse grocery options
- My options are limited (food desert, small town)
- I meal prep regularly
- I've never meal prepped

---

**Preferences Dimension:**

**Q13: Food enjoyment style:** *(Slider spectrum)*
```
Eat to live ◀────────────────▶ Live to eat
Routine lover ◀────────────────▶ Variety seeker
Simple flavors ◀────────────────▶ Complex flavors
```

**Q14: Past diet experience:** *(Multi-select with "None")*
- Low-carb/Keto (worked well)
- Low-carb/Keto (didn't work)
- Vegetarian/Vegan (worked well)
- Vegetarian/Vegan (didn't work)
- Calorie counting (worked well)
- Calorie counting (didn't work)
- Intermittent fasting (worked well)
- Intermittent fasting (didn't work)
- Whole30/Paleo (worked well)
- Whole30/Paleo (didn't work)
- No significant diet experience

**Q15: What typically derails healthy eating for you?** *(Select top 2)*
- Stress and emotional triggers
- Social pressure or events
- Travel or schedule disruptions
- Boredom with food choices
- Cravings for specific foods
- All-or-nothing thinking
- Lack of planning/prep
- Cost of healthy options

---

#### Section 3: Deep Dive (5 Optional Questions)

**Q16: Energy patterns throughout the day:** *(Interactive graph)*
Users plot their typical energy levels across the day, helping identify if intermittent fasting or specific meal timing might help.

**Q17: Relationship with food reflection:** *(Thoughtful single-select)*
- Food is fuel, I don't think about it much
- I enjoy food but it doesn't control me
- I sometimes eat for emotional reasons
- I have a complicated relationship with food
- Food is one of my greatest pleasures

**Q18: Social eating frequency:** *(Single select)*
- Rarely eat with others
- 1-2 social meals per week
- 3-5 social meals per week
- Most meals are social

**Q19: Willingness to experiment:** *(Slider)*
```
Stick to familiar ◀────────────────▶ Try anything once
```

**Q20: What would make you feel successful in 3 months?** *(Open text or structured)*
- Lost specific amount of weight
- Clothes fit better
- More consistent energy
- Better lab results
- Enjoying food without guilt
- Having a sustainable routine
- Other: [free text]

---

## Evidence-Based Modeling: Scientific Foundation

To make the quiz **scientifically solid** and truly helpful, recommendations must be grounded in evidence, safety, and behavior-change science—not just preference matching. This section defines the evidence foundation, operational diet definitions, health-condition rules, contraindications, and how to communicate uncertainty.

### 1. Evidence Foundation & Scope

**What the tool is:**
- A **personalized dietary pattern discovery tool** that suggests eating approaches with an evidence base, tailored to goals, constraints, and preferences.
- **Informational and educational**—not medical or diagnostic. It does not replace clinical assessment, lab interpretation, or individualized medical nutrition therapy.

**What the tool is not:**
- A substitute for a registered dietitian (RD) or physician for medical conditions, medication interactions, or therapeutic diets.
- A guarantee of outcomes (weight, lipids, glucose). Outcomes depend on adherence, biology, and context.

**Evidence tiers we use (for transparency and future citation):**
- **Guidelines:** ADA (diabetes), AHA/ACC (cardiovascular), WHO, national dietary guidelines.
- **Systematic reviews & meta-analyses:** e.g., Mediterranean and DASH for cardiometabolic outcomes; low-carb/keto in T2DM (with caveats); plant-based for cardiovascular risk.
- **Adherence & behavior literature:** Predictors of long-term adherence (early behavioral adherence, psychosocial factors, feasibility); habit formation and staged behavior change.

**Transparent limits:**
- Evidence links **dietary patterns** to **health outcomes** in populations; individual response varies.
- **Adherence** is the main predictor of real-world success; our "sustainability" or "fit" scores should reflect feasibility and preference alignment, not fake outcome probabilities.

---

### 2. Operational Diet Definitions (Evidence-Based Criteria)

Each diet in the system should be defined in **operational terms** so that "fit" is testable and consistent. Below are concise, evidence-aligned definitions.

| Diet Approach | Operational Definition | Primary Evidence / Use |
|---------------|------------------------|-------------------------|
| **Mediterranean** | High: vegetables, fruits, whole grains, legumes, nuts, olive oil; moderate fish/poultry/dairy; low red/processed meat; optional moderate wine with meals. Pattern (not single nutrients). | Strong for CVD, metabolic health, longevity; flexible and social. |
| **DASH** | Emphasizes vegetables, fruits, whole grains, lean protein, low-fat dairy; reduced sodium; rich in potassium, magnesium, calcium. | Hypertension; cardiometabolic risk. |
| **Flexitarian** | Plant-forward, regular plant-based meals; animal products occasional, not center-of-plate. No strict thresholds. | Sustainability, gradual change, family adaptability. |
| **WFPB (Whole Food Plant-Based)** | Minimally processed plants; little or no animal products; avoids refined grains, added sugars, oils (varies). | Cardiovascular risk, ethics, some evidence for T2DM; requires more planning. |
| **Low-Carb** | Reduced total carbohydrates (e.g., &lt;26% energy or &lt;130 g/day); protein and fat variable; not necessarily high fat. | Weight, glycemic control in T2DM; evidence mixed for long-term. |
| **Keto** | Very low carb (e.g., &lt;50 g/day or &lt;10% energy), high fat, moderate protein. Ketosis as goal. | Specialized; some T2DM evidence with **medical supervision**; contraindications exist. |
| **Intermittent Fasting (IF)** | Time-restricted eating (e.g., 8-h window) or periodic fasting; no prescribed food composition. | Convenience, some metabolic benefits; **not** appropriate for everyone (see contraindications). |
| **Anti-Inflammatory** | Pattern emphasizing whole foods, omega-3s, fiber, polyphenols; limits refined carbs, processed meats, excess saturated fat. Often overlaps Mediterranean/DASH. | Chronic inflammation, joint pain, some autoimmune support (evidence emerging). |
| **Intuitive Eating** | Framework, not a "diet": reject diet mentality, honor hunger/fullness, gentle nutrition. Weight-neutral. | Diet fatigue, relationship with food, psychological well-being; evidence for improved outcomes when restriction is harmful. |
| **Zone / Balanced Macro** | Prescribed ratios (e.g., 40% carb, 30% protein, 30% fat); often used for performance. | Athletes, data-driven users; evidence for performance more than general health. |

Using these definitions, the quiz can map **user dimensions** (goals, health, lifestyle, preferences) to **evidence-based indications** and **feasibility**, rather than vague "lifestyle fit."

---

### 3. Health-Condition → Diet Mapping (Evidence-Based Rules)

Recommendations for users with **stated health conditions** should follow evidence and guidelines. This is a **rule layer** that adjusts suitability (boost or suppress) for specific diets.

**Cardiovascular / hypertension:**
- **Promote:** Mediterranean, DASH (both have strong evidence).
- **Neutral/context-dependent:** Low-carb, Flexitarian (can be compatible if food choices are heart-healthy).
- **Avoid promoting as first-line:** Keto (unless under care for specific indication); very high saturated-fat versions of low-carb.

**Type 2 diabetes / blood sugar management:**
- **Promote:** Mediterranean, DASH, low-GI patterns, carb moderation (quality and amount); Flexitarian.
- **Allow with caution (require "talk to your provider"):** Low-carb, Keto—can improve glycemic control but interact with medications and require monitoring.
- **Do not recommend without medical oversight:** Keto for users on insulin or sulfonylureas (hypoglycemia risk).

**Type 1 diabetes:**
- **Do not recommend:** Keto (elevated DKA risk in T1DM). Prefer Mediterranean, DASH, or balanced patterns with medical team.

**Kidney disease / CKD:**
- **Suppress:** Keto and very high-protein diets (safety concerns).
- **Promote with caution:** Mediterranean, DASH—individualize sodium/potassium if needed; recommend RD referral for CKD.

**Digestive (e.g., IBS, bloating):**
- **Consider:** Low-FODMAP as a **strategy** (temporary, structured), not a "diet identity"; can be combined with Mediterranean/Flexitarian principles.
- **Avoid:** Presenting restrictive diets as the only solution; emphasize RD for persistent symptoms.

**Autoimmune / inflammation:**
- **Promote:** Mediterranean, anti-inflammatory pattern; some evidence for plant-forward approaches.
- **Neutral:** WFPB if acceptable to user; avoid overclaiming "cure."

**Mental health / relationship with food:**
- **When user indicates:** "Complicated relationship with food," "eat for emotional reasons," or past restrictive diet failure → **strongly favor** Intuitive Eating, gentle structure (e.g., Mediterranean/Flexitarian without strict rules), and **avoid** promoting highly restrictive diets (Keto, very low-calorie, rigid IF).
- **Rationale:** Restriction can worsen disordered eating; Intuitive Eating has evidence for psychological and physical well-being in such contexts.

**Pregnancy / lactation / growth:**
- **Do not recommend:** Keto, aggressive fasting, or very restrictive diets unless under specialist care.
- **Recommend:** Referral to provider or RD; general guidance toward balanced, nutrient-dense patterns.

These rules should be implemented as **explicit condition → diet modifiers** in the scoring/safety layer (see below).

---

### 4. Safety & Contraindications Layer

Before showing final recommendations, the engine should apply a **safety pass**:

1. **Hard contraindications (suppress or exclude):**
   - Keto: kidney disease, T1DM, pregnancy; or flag "only with medical clearance" for T2DM on certain meds.
   - Aggressive IF: history of or current disordered eating; pregnancy; diabetes on insulin/sulfonylureas without supervision.
   - Very restrictive diets: when user signals complicated relationship with food or diet fatigue.

2. **Soft contraindications (downgrade + show disclaimer):**
   - Any diet user is on medication that could interact (e.g., diabetes meds, antihypertensives) → show: "Discuss with your doctor or dietitian before making big changes."
   - Multiple health conditions → suggest RD referral in results.

3. **Referral triggers (show prominent CTA to seek care):**
   - T1DM, CKD, pregnancy, multiple comorbidities, or "I have a complicated relationship with food" + desire for weight loss → "We recommend connecting with a registered dietitian or your healthcare provider for a plan that’s right for you."

This keeps the tool **helpful without overstepping** and protects users.

---

### 5. Scoring Model Principles (Evidence-Informed, Not Arbitrary)

Replace **arbitrary** numeric weights with a **principled** model:

**Three pillars of score:**

1. **Evidence fit (E):** For the user’s **stated goals and health conditions**, how strong is the evidence that this diet supports those outcomes?  
   - Example: Mediterranean for "heart health" or "blood pressure" → high E.  
   - Example: Keto for "weight loss" in user with no conditions → moderate E; in user with T2DM → moderate E but with safety downgrade.

2. **Feasibility (F):** Can this user **actually** follow this diet given time, budget, skills, and social context?  
   - Derived from: time for cooking, budget, kitchen/equipment, family dynamics, travel, past diet success/failure.  
   - Example: WFPB for someone with &lt;30 min/day and no cooking confidence → low F.

3. **Preference alignment (P):** Does this diet match **values and preferences** (structure vs. flexibility, plant-forward vs. omnivore, simplicity vs. optimization)?  
   - Derived from: preference sliders, values ranking, past diet experience ("worked well" / "didn’t work").

**Combined score (conceptual):**
- `Score(diet) = f(E, F, P)` with **safety overrides**: if a diet is contraindicated, its score is capped at 0 or hidden; if "refer to RD" is triggered, show that before diet rankings.
- Weights for E vs. F vs. P can be tuned (e.g., E and F weighted more for users with health conditions; P and F more for "just curious" users). Document the rationale so future iterations stay evidence-based.

**Conflict resolution:**
- **Safety overrides preference:** Never recommend a contraindicated diet regardless of user preference.
- **Feasibility and preference together:** If two diets have similar E but one has much higher F and P, rank the more feasible one higher—adherence predicts real-world success.

This replaces the current "scoringImpact" example with a **documented logic** that can be validated and updated as evidence evolves.

---

### 6. Adherence & Sustainability: Honest Framing

**Avoid:** Fake precision such as "30-Day Adherence Probability: 92%." We do not have a validated predictive model for individual adherence.

**Do:**
- **Personal Fit Score:** "This approach fits your lifestyle and preferences well (e.g., 88/100)." Frame as fit, not predicted adherence.
- **Predicted barriers:** List 2–4 likely obstacles (time, social, budget, skill) and link to solutions—this is actionable and evidence-aligned (addressing barriers improves adherence).
- **Confidence phrasing:** "Based on your answers, this approach is a strong match. Success depends on your consistency and life changes; we can’t predict exact outcomes."

**Optional (V2):** If you later integrate user feedback (e.g., "Did you try this? How did it go?"), you could build an internal adherence model and then show "Users with similar profiles often found this approach manageable" with appropriate caveats.

---

### 7. Behavior Change Theory Integration

Align the quiz and results with established behavior change theory so recommendations are **actionable** and **stage-appropriate**:

- **COM-B (Capability, Opportunity, Motivation):**  
  - **Capability:** Cooking skills, knowledge → link to simple recipes, guides.  
  - **Opportunity:** Time, budget, access → barrier prediction and solutions (meal prep, budget tips).  
  - **Motivation:** Goals and values → tie recommendation narrative to their stated "why."

- **Stages of change (readiness):**  
  - If user signals "just curious" or "I struggle with consistency," avoid overwhelming them; emphasize **Phase 1** (small steps) and one or two concrete actions.  
  - If user signals "I’m ready to make changes," offer the full roadmap and optional deep-dive.

- **Implementation intentions:** Phased roadmap can explicitly use "When [situation], I will [action]" (e.g., "When I have 15 minutes for lunch, I will choose a Mediterranean-style bowl") and link to implementation intention prompts in content.

- **Habit stacking / tiny habits:** Phase 1 should be **one small behavior** (e.g., "Add vegetables to one meal daily") rather than a full diet overhaul—evidence supports small, consistent steps for long-term adherence.

Referencing these in the **content and UX** (not necessarily in the algorithm) makes the tool more likely to support real behavior change.

---

### 8. Uncertainty & When to Refer

- **Show uncertainty where it exists:** e.g., "Evidence is strongest for Mediterranean and DASH for heart health; other patterns may work for you with your doctor’s input."
- **Referral CTA:** When complexity is high (multiple conditions, medications, pregnancy, disordered eating concern), show a clear, prominent: "For a plan tailored to your health and medications, we recommend seeing a registered dietitian or your doctor."
- **No false precision:** Avoid exact percentages for "sustainability" or "success"; use ranges or qualitative labels (e.g., "High fit," "Good fit," "Consider with support") if needed.

---

*Implementing this evidence-based layer ensures the Diet Quiz is a **trustworthy**, **safe**, and **actionable** tool that truly helps users—and stays defensible as evidence and guidelines evolve.*

---

## Scoring & Algorithm Design

### Diet Profiles in System

| Diet Approach | Key Attributes | Best For | Evidence Notes |
|---------------|----------------|----------|----------------|
| **Mediterranean** | Balanced, flexible, social, sustainable | General wellness, heart health, social eaters | Strong CVD, metabolic; see Evidence-Based Modeling §2 |
| **DASH** | Sodium-aware, potassium/magnesium/calcium rich, structured | Hypertension, cardiometabolic risk | Strong for BP; often combined with Mediterranean in guidelines |
| **Flexitarian** | Plant-forward, adaptable, practical | Gradual changers, families, budget-conscious | Sustainability, feasibility |
| **WFPB (Whole Food Plant-Based)** | Ethical, health-focused, structured | Values-driven, health optimization, experienced | Cardiovascular evidence; requires planning |
| **Low-Carb** | Satiety-focused, structured, carb moderation | Metabolic health, clear rules preference | Evidence for weight/T2DM; individualize |
| **Keto** | Specialized, strict, very low carb | Specific conditions only with medical oversight | Contraindications: CKD, T1DM, pregnancy; see §3–4 |
| **Intermittent Fasting** | Time-based, flexible foods, schedule-friendly | Busy professionals, simplicity seekers | Caution: not for disordered eating, some meds |
| **Anti-Inflammatory** | Health-targeted, therapeutic, moderate | Chronic conditions, pain management | Overlaps Mediterranean; emerging evidence |
| **Intuitive Eating** | Mindset-focused, weight-neutral, long-term | Diet fatigue, relationship with food | Evidence for psychological/physical well-being when restriction is harmful |
| **Zone/Balanced Macro** | Performance, measured, optimized | Athletes, data-driven people | Performance focus |

### Scoring Matrix Concept

Scoring should follow the **Evidence-Based Modeling** section above: combine **Evidence fit (E)**, **Feasibility (F)**, and **Preference alignment (P)** with **safety overrides**. Each answer contributes to one or more of E, F, P for each diet; then apply condition-based rules and contraindications.

**Conceptual flow:**
1. **Accumulate E, F, P** per diet from each question (goals → E; time/budget/skills → F; values/past experience → P).
2. **Apply health-condition rules:** Boost or suppress diets per evidence (e.g., hypertension → boost Mediterranean/DASH; kidney disease → suppress keto).
3. **Apply safety layer:** Zero out or hide contraindicated diets; set "refer to RD" flag when appropriate.
4. **Combine:** `Score(diet) = wE*E + wF*F + wP*P` (weights configurable; document rationale). Normalize to 0–100 for display.

```javascript
// Conceptual: answer impacts E, F, or P (not raw diet deltas)
// Weights should be evidence-informed; example structure only
const answerPillars = {
  "primary_goal_weight_loss": {
    evidence: { low_carb: +2, keto: +2, mediterranean: +1, intermittent_fasting: +1 },
    feasibility: {},
    preference: {}
  },
  "primary_goal_sustainability": {
    evidence: { wfpb: +2, mediterranean: +1, flexitarian: +2 },
    feasibility: {},
    preference: {}
  },
  "time_under_30min": {
    evidence: {},
    feasibility: { intermittent_fasting: +2, mediterranean: -1, wfpb: -2 },
    preference: {}
  },
  "health_hypertension": {
    evidence: { mediterranean: +2, dash: +2 },
    feasibility: {},
    preference: {}
  },
  "relationship_food_complicated": {
    evidence: { intuitive_eating: +2, keto: -2, restrictive_diets: -2 },
    feasibility: {},
    preference: {}
  }
  // ... all question/answer combinations mapped to E, F, P
};
// After aggregation: apply safety overrides (see Evidence-Based Modeling §4)
```

### Hybrid Recommendation Engine

After scoring, the system can suggest combinations:

```
IF mediterranean >= 80% AND intermittent_fasting >= 70%
THEN suggest "Mediterranean + Time-Restricted Eating"

IF flexitarian >= 75% AND low_carb >= 60%
THEN suggest "Carb-Conscious Flexitarian"

IF wfpb >= 85% AND user.health_conditions.includes('inflammation')
THEN suggest "Anti-Inflammatory Plant-Based"
```

---

## Results Page Design

### Above the Fold: Primary Match

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│     🌿 Your Ideal Dietary Approach                               │
│                                                                  │
│   ╔══════════════════════════════════════════════════════════╗  │
│   ║                                                          ║  │
│   ║         MEDITERRANEAN-FLEXITARIAN HYBRID                 ║  │
│   ║                                                          ║  │
│   ║    "The best of balanced eating with plant-forward       ║  │
│   ║     flexibility, perfect for your busy lifestyle"        ║  │
│   ║                                                          ║  │
│   ╚══════════════════════════════════════════════════════════╝  │
│                                                                  │
│   ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│   │ SUSTAINABILITY │  │   GOAL FIT     │  │   LIFESTYLE    │   │
│   │      94%       │  │     87%        │  │     91%        │   │
│   └────────────────┘  └────────────────┘  └────────────────┘   │
│                                                                  │
│            [ See Full Results ]  [ Get Started ]                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Section 2: Compatibility Spectrum

Visual radar chart or bar graph showing fit with all dietary approaches.

### Section 3: Why This Works for You

Personalized paragraph connecting their answers to the recommendation:

> "Based on your goal of **sustained energy** and your preference for **flexible guidelines** over strict rules, a Mediterranean-Flexitarian approach gives you structure without restriction. Your **limited weeknight cooking time** is addressed by this approach's emphasis on simple preparations and batch-friendly ingredients. The fact that you **eat with family** who have different preferences makes Flexitarian's adaptability perfect—same base meal, different protein options."

### Section 4: Your Personalized Roadmap

The phased implementation plan (see earlier section).

### Section 5: Predicted Challenges & Solutions

Barrier analysis with linked resources.

### Section 6: Your FoodPulse Toolkit

Connected calculators, articles, and resources—all pre-filtered for relevance.

### Section 7: Track Your Journey

Optional: Email signup for weekly tips specific to their diet path, or save results to account.

---

## Technical Considerations

### State Management

```
QuizState = {
  currentSection: 'quick' | 'core' | 'deep' | 'results',
  currentQuestion: number,
  answers: Record<questionId, answerValue>,
  scores: Record<dietId, number>,
  metadata: {
    startTime: timestamp,
    completedSections: string[],
    skippedOptional: boolean
  }
}
```

### Key Components Needed

| Component | Purpose |
|-----------|---------|
| `QuizContainer` | Main wrapper, state management |
| `ProgressIndicator` | Visual progress bar + section markers |
| `QuestionCard` | Individual question renderer |
| `SingleSelect` | Radio-style options |
| `MultiSelect` | Checkbox-style options |
| `SliderInput` | Spectrum/scale questions |
| `TimelineSelector` | Interactive meal timing picker |
| `RankingInput` | Drag-and-drop priority ranking |
| `ResultsView` | Full results display |
| `CompatibilityChart` | Radar/bar visualization |
| `RoadmapTimeline` | Phased plan visual |
| `BarrierCard` | Challenge + solution display |
| `ToolkitLinks` | Connected resources |

### Data Flow

```
User Input → Local State → Scoring Engine → Results Calculation → Display

Optional: Results → API → Email Service (for follow-up sequence)
Optional: Results → Local Storage (revisit results later)
```

### Performance Considerations

- All scoring happens client-side (fast, no API latency)
- Lazy load result components (not needed until end)
- Precompute scoring weights at build time
- Image optimization for result sharing

---

## Future Enhancements (V2+)

### 1. AI-Powered Personalization
- Use LLM to generate truly personalized recommendation text
- Dynamic question branching based on previous answers

### 2. Progress Tracking
- Return to quiz after 30/60/90 days
- Show how approach is working
- Adjust recommendations based on feedback

### 3. Community Insights
- "78% of people with your profile found success with Mediterranean"
- Anonymous aggregated data

### 4. Professional Connection
- High-complexity results → suggest RD consultation
- Partner with nutrition professionals

### 5. Meal Planning Integration
- Direct export to meal planning tools
- Auto-generate first week meal plan

### 6. Shareable Results
- Beautiful shareable result cards
- Social sharing with referral tracking

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Quiz Completion Rate | >75% | Completed / Started |
| Average Time to Complete | 4-7 minutes | Analytics tracking |
| Results Email Opt-in | >40% | Email captures / Completions |
| Tool Click-through | >30% | Users clicking linked tools |
| Return Visits | >15% | Users retaking quiz |
| Social Shares | >5% | Share button clicks |

---

## Development Phases

### Phase 1: Core MVP
- [ ] Quiz flow with all 15 core questions
- [ ] Basic scoring algorithm
- [ ] Primary result display
- [ ] Compatibility spectrum
- [ ] Mobile-responsive design

### Phase 2: Enhanced Results
- [ ] Personalized roadmap generator
- [ ] Barrier prediction system
- [ ] FoodPulse tool integration
- [ ] Email capture flow

### Phase 3: Polish & Optimize
- [ ] Animations and transitions
- [ ] Progress persistence (localStorage)
- [ ] Shareable results
- [ ] Analytics integration

### Phase 4: Advanced Features
- [ ] Optional deep-dive questions
- [ ] Interactive visualizations
- [ ] Result saving/account integration
- [ ] A/B testing framework

---

## Design Principles

1. **Progressive Disclosure** - Don't overwhelm; reveal complexity gradually
2. **Always Escapable** - Users can skip ahead or see early results
3. **Visually Engaging** - This is discovery, not a medical form
4. **Personalization Visible** - Show how their answers shape results
5. **Actionable Outcomes** - Every result leads to a next step
6. **Honest Caveats** - Clear that this is guidance, not prescription
7. **Mobile-First** - Majority of users will be on phones

---

## Legal & Ethical Considerations

- **Disclaimer**: Clear statement that quiz is for informational purposes, not medical advice
- **Referral Language**: Recommend consulting healthcare provider for health conditions; **prominent referral CTA** when safety/referral triggers fire (see Evidence-Based Modeling §4, §8)
- **Evidence-based claims**: Avoid overclaiming; stick to "evidence supports…" and "may help" rather than "will"; no fake adherence probabilities
- **Data Privacy**: If storing results, clear privacy policy
- **Accessibility**: WCAG 2.1 AA compliance for all interactions
- **Inclusive Language**: Avoid weight-stigmatizing or diet-culture language

---

## Competitive Differentiation

| Others Do | We Do |
|-----------|-------|
| Binary diet assignment | Compatibility spectrum |
| Generic advice | Personalized barrier analysis |
| One-time result | Phased implementation roadmap |
| Isolated tool | Integrated ecosystem |
| "You should..." | "Based on YOUR answers..." |
| Finish and forget | Ongoing journey support |

---

## Implementation Compliance Check (Current Codebase)

*Last checked against: `DietQuiz.tsx`, `scoring-engine.ts`, `questions.ts`, `diet-profiles.ts`, `ResultsView.tsx`, `WelcomeScreen.tsx`, `ProgressIndicator.tsx`, `QuestionCard.tsx`.*

### Aligned with the Guide

| Area | Status | Notes |
|------|--------|-------|
| **Vision & philosophy** | ✅ | Personalized, multi-dimensional, not binary; 6 dimensions covered in questions. |
| **Quiz flow** | ✅ | Welcome → Quick Profile (3) → Core Journey (12) → Results. Sections and progress match. |
| **Question count** | ✅ | 15 questions total (3 quick + 12 core). |
| **E/F/P scoring** | ✅ | Three-pillar model (Evidence, Feasibility, Preference) with configurable weights. |
| **Condition rules** | ✅ | Hypertension, T2DM, digestive, autoimmune, inflammation, mental_health mapped; boosts/suppresses and safety levels (caution, contraindicated) applied. |
| **Relationship with food** | ✅ | Rules for emotional/complicated; intuitive_eating boosted, keto/IF/zone suppressed when applicable. |
| **Safety layer** | ✅ | Contraindicated diets get `safetyLevel: 'contraindicated'`, zeroed in final score, and excluded from results (`isHidden`). |
| **Referral decision** | ✅ | `calculateReferralDecision()` with urgency (prominent/standard/subtle), forceReferral for serious conditions, cumulative referral weight. |
| **Personal Fit Score** | ✅ | Shown as X/100; copy says "Based on your lifestyle, preferences, and constraints" and "Success depends on consistency and life changes"—no fake adherence %. |
| **Compatibility spectrum** | ✅ | Bar chart with finalScore %; hidden (contraindicated) diets filtered out; "Best Match" and "Caution" badges. |
| **Hybrid detection** | ✅ | When top two diets are close and compatible, hybrid label shown (e.g. Mediterranean-Flexitarian Blend). |
| **Personalized insights** | ✅ | "Why this works for you" paragraph built from goals, structure, time, family. |
| **Predicted barriers** | ✅ | Generated from challenges, kitchen/cooking, companions; BarrierCard with solution and resource link. |
| **Phased roadmap** | ✅ | RoadmapTimeline with phases, focus, key change, difficulty, time investment. |
| **FoodPulse toolkit** | ✅ | Calculators and articles by diet and profile (time, budget, family); links to `/tools/*` and `/articles?tag=*`. |
| **Disclaimer** | ✅ | Welcome screen: "This quiz provides educational guidance, not medical advice…" |
| **Back/Next navigation** | ✅ | QuestionCard supports back, next, and enforces required/maxSelections. |

### Gaps and Deviations

| Gap | Severity | Detail |
|-----|----------|--------|
| **Deep Dive (5 optional questions)** | Medium | Guide specifies Q16–Q20 (energy patterns, relationship reflection, social eating frequency, willingness to experiment, 3-month success). Not implemented; only 15 questions. `QuizSection` includes `'deep'` but no questions use it. |
| **Health conditions not captured** | Medium | Scoring engine has rules for `type1_diabetes`, `kidney_disease`, `heart_disease`, `pregnancy`, but Q9 only offers: hypertension, blood_sugar (→ type2_diabetes), digestive, autoimmune, joint_pain, hormonal, mental_health. So T1DM, CKD, pregnancy, and explicit heart disease never set; their referral/contraindication logic never runs. Consider adding options or follow-ups. |
| **"Complicated" relationship with food** | Medium | `relationshipWithFood: 'complicated'` triggers strong intuitive-eating boost and keto/IF suppression, but profile only sets `'emotional'` (from challenges/derails). Guide’s Q17 "I have a complicated relationship with food" is in the optional Deep Dive. So "complicated" is never set. Consider inferring from multiple signals or adding one question. |
| **Always escapable** | Low | Guide: "Users can skip ahead or see early results." No skip-to-results or skip-optional in current UI. |
| **Q4 / Q13 input types** | Low | Guide suggests interactive timeline (Q4) and slider spectrum (Q13). Implementation uses single-select with equivalent options; acceptable simplification. |
| **Recipes in toolkit** | Low | Guide: "Recipes – Filtered for: <30 min, Mediterranean, Family-friendly." `recommendedTools` has calculators and articles only; `guides` is empty. No recipe links or filters. |
| **Personal Fit formula** | Info | Implementation: `(feasibility + preference) / 2` (evidence not included). Guide frames "fit" as lifestyle + preferences + constraints; current formula is defensible. |

### Recommended Follow-Ups

1. **Add optional Deep Dive** (or document as V2): Implement Q16–Q20 and "Skip optional" so `relationshipWithFood: 'complicated'` and finer energy/social data can be captured.
2. **Extend Q9 (health)**: Add options or follow-up for "Type 1 diabetes," "Kidney disease," "Pregnancy," and optionally "Heart disease" (or clarify that "heart concerns" maps to both hypertension and heart_disease) so safety and referral rules apply.
3. **Set "complicated" when appropriate**: Either add one explicit question ("Which best describes your relationship with food?" with "Complicated") or infer when e.g. emotional_eating + (stress_emotional or all_or_nothing) are both selected.
4. **Toolkit**: Add recipe deep-links or tags (e.g. `/recipes?tag=mediterranean&under-30min`) and populate `guides` (e.g. meal prep) when content exists.

---

## Next Steps

1. **Stakeholder Review** - Align on vision and scope
2. **Content Strategy** - Define all diet profiles and descriptions (use Evidence-Based Modeling §2)
3. **Scoring Workshop** - Finalize E/F/P weights and condition→diet rules; implement safety layer and referral triggers (Evidence-Based Modeling §3–5)
4. **Design Mockups** - UI/UX wireframes and high-fidelity designs
5. **Technical Spec** - Component architecture and state management
6. **Content Writing** - All question copy and result text
7. **Development Sprint** - Build MVP
8. **User Testing** - Validate flow and results accuracy
9. **Launch** - Deploy and monitor metrics

---

## Detailed Technical Specifications

The following sections provide implementation-ready specifications for the scoring algorithm, question mappings, diet profile content, and referral UX.

---

## SPEC 1: Scoring Algorithm Technical Specification

### Overview

The scoring engine calculates compatibility scores for each dietary approach using a three-pillar model with safety overrides. All computation happens client-side for instant results.

### Data Structures

```typescript
// Core types
type DietId =
  | 'mediterranean'
  | 'dash'
  | 'flexitarian'
  | 'wfpb'
  | 'low_carb'
  | 'keto'
  | 'intermittent_fasting'
  | 'anti_inflammatory'
  | 'intuitive_eating'
  | 'zone_macro';

type PillarType = 'evidence' | 'feasibility' | 'preference';

type HealthCondition =
  | 'hypertension'
  | 'heart_disease'
  | 'type2_diabetes'
  | 'type1_diabetes'
  | 'kidney_disease'
  | 'digestive_issues'
  | 'autoimmune'
  | 'inflammation'
  | 'mental_health'
  | 'pregnancy';

type SafetyLevel = 'safe' | 'caution' | 'contraindicated' | 'refer_rd';

// Score accumulator per diet
interface DietScores {
  evidence: number;      // Raw E score (accumulated)
  feasibility: number;   // Raw F score (accumulated)
  preference: number;    // Raw P score (accumulated)
  safetyLevel: SafetyLevel;
  safetyNotes: string[];
}

// Final computed result
interface DietResult {
  dietId: DietId;
  finalScore: number;           // 0-100, normalized
  pillarScores: {
    evidence: number;           // 0-100
    feasibility: number;        // 0-100
    preference: number;         // 0-100
  };
  safetyLevel: SafetyLevel;
  safetyNotes: string[];
  rank: number;
  isHidden: boolean;            // True if contraindicated
}

// User profile derived from answers
interface UserProfile {
  primaryGoal: string;
  healthConditions: HealthCondition[];
  timeAvailable: 'under_30' | '30_60' | '60_120' | 'over_120';
  budget: 'tight' | 'moderate' | 'comfortable' | 'unlimited';
  cookingSkill: 'beginner' | 'confident';
  structurePreference: 'strict' | 'flexible' | 'intuitive';
  pastDietSuccess: DietId[];
  pastDietFailure: DietId[];
  relationshipWithFood: 'neutral' | 'positive' | 'emotional' | 'complicated';
  // ... derived from all answers
}
```

### Scoring Pipeline

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SCORING PIPELINE                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  STAGE 1: Answer Collection                                              │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  answers: Record<questionId, answerValue>                        │   │
│  │  Example: { q1: 'weight_loss', q5: 'under_30', q9: ['hyper'] }   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  STAGE 2: Pillar Accumulation                                            │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  For each answer:                                                 │   │
│  │    Look up pillarImpacts[questionId][answerValue]                 │   │
│  │    Add to dietScores[diet].evidence/feasibility/preference        │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  STAGE 3: Condition Rules                                                │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  For each healthCondition in userProfile:                         │   │
│  │    Apply conditionRules[condition] → boost/suppress diets         │   │
│  │    Set safetyLevel and safetyNotes                                │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  STAGE 4: Safety Override                                                │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  Check contraindications matrix                                   │   │
│  │  If hard contraindication: set isHidden = true, score = 0         │   │
│  │  If soft contraindication: add disclaimer, cap score              │   │
│  │  Set global referRD flag if triggers met                          │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  STAGE 5: Score Combination & Normalization                              │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  Apply pillar weights based on user context:                      │
│  │    - Health conditions present → weight E higher                  │
│  │    - "Just curious" goal → weight F and P higher                  │
│  │  Normalize each pillar to 0-100                                   │
│  │  Combine: finalScore = (wE * E + wF * F + wP * P)                 │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  STAGE 6: Hybrid Detection                                               │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  If top 2 diets are within 10% AND compatible:                    │   │
│  │    Generate hybrid recommendation label                           │   │
│  │  Check hybridCompatibility matrix for valid combinations          │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                              │                                           │
│                              ▼                                           │
│  OUTPUT: DietResult[] sorted by finalScore (descending)                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Pillar Weight Configuration

```typescript
// Default weights (sum to 1.0)
const DEFAULT_WEIGHTS = {
  evidence: 0.35,
  feasibility: 0.40,
  preference: 0.25
};

// Context-adjusted weights
function getWeights(userProfile: UserProfile): PillarWeights {
  // User has health conditions → evidence matters more
  if (userProfile.healthConditions.length > 0) {
    return {
      evidence: 0.45,
      feasibility: 0.35,
      preference: 0.20
    };
  }

  // User is "just curious" → feasibility and preference matter more
  if (userProfile.primaryGoal === 'just_curious') {
    return {
      evidence: 0.25,
      feasibility: 0.45,
      preference: 0.30
    };
  }

  // User has complicated relationship with food → preference matters most
  if (userProfile.relationshipWithFood === 'complicated') {
    return {
      evidence: 0.25,
      feasibility: 0.35,
      preference: 0.40
    };
  }

  return DEFAULT_WEIGHTS;
}
```

### Condition Rules Engine

```typescript
const conditionRules: Record<HealthCondition, ConditionRule> = {

  hypertension: {
    boost: {
      mediterranean: { evidence: +3, note: 'Strong evidence for BP management' },
      dash: { evidence: +4, note: 'Designed specifically for hypertension' },
      flexitarian: { evidence: +2, note: 'Plant-forward supports heart health' }
    },
    suppress: {
      keto: { evidence: -2, safetyLevel: 'caution',
              note: 'Discuss with provider if on BP medications' }
    },
    referralWeight: 0.3  // Contributes to RD referral threshold
  },

  type2_diabetes: {
    boost: {
      mediterranean: { evidence: +3, note: 'Evidence for glycemic control' },
      dash: { evidence: +2 },
      low_carb: { evidence: +2, note: 'May improve blood sugar; monitor with provider' }
    },
    suppress: {
      keto: {
        evidence: +1,  // Has some evidence, but...
        safetyLevel: 'caution',
        note: 'Requires medical supervision; medication adjustment likely needed'
      }
    },
    requiresDisclaimer: true,
    referralWeight: 0.5
  },

  type1_diabetes: {
    boost: {
      mediterranean: { evidence: +2 },
      dash: { evidence: +2 }
    },
    suppress: {
      keto: {
        safetyLevel: 'contraindicated',
        note: 'Not recommended for T1DM (DKA risk)'
      },
      intermittent_fasting: {
        safetyLevel: 'caution',
        note: 'Fasting patterns require careful management with T1DM'
      }
    },
    forceReferral: true,  // Always show RD referral
    referralWeight: 1.0
  },

  kidney_disease: {
    boost: {
      mediterranean: { evidence: +1, note: 'May need sodium/potassium adjustment' }
    },
    suppress: {
      keto: { safetyLevel: 'contraindicated', note: 'High protein load contraindicated in CKD' },
      zone_macro: { safetyLevel: 'caution', note: 'High protein may be problematic' }
    },
    forceReferral: true,
    referralWeight: 1.0
  },

  digestive_issues: {
    boost: {
      mediterranean: { evidence: +1 },
      flexitarian: { evidence: +1 },
      anti_inflammatory: { evidence: +1 }
    },
    suppress: {},
    specialNote: 'Consider Low-FODMAP as temporary strategy with RD guidance',
    referralWeight: 0.4
  },

  autoimmune: {
    boost: {
      mediterranean: { evidence: +2 },
      anti_inflammatory: { evidence: +3, note: 'Anti-inflammatory pattern may help symptoms' },
      wfpb: { evidence: +1 }
    },
    suppress: {},
    referralWeight: 0.3
  },

  inflammation: {
    boost: {
      mediterranean: { evidence: +2 },
      anti_inflammatory: { evidence: +3 },
      wfpb: { evidence: +2 }
    },
    suppress: {},
    referralWeight: 0.2
  },

  mental_health: {
    // Special handling for relationship with food
    // See relationshipWithFood rules below
    boost: {},
    suppress: {},
    referralWeight: 0.2
  },

  pregnancy: {
    boost: {
      mediterranean: { evidence: +2, note: 'Balanced, nutrient-dense pattern' },
      flexitarian: { evidence: +1 }
    },
    suppress: {
      keto: { safetyLevel: 'contraindicated', note: 'Not appropriate during pregnancy' },
      intermittent_fasting: { safetyLevel: 'contraindicated', note: 'Fasting not recommended during pregnancy' },
      wfpb: { safetyLevel: 'caution', note: 'Requires careful nutrient planning; B12/iron monitoring' }
    },
    forceReferral: true,
    referralWeight: 1.0
  }
};

// Special rules for relationship with food
const relationshipWithFoodRules = {
  complicated: {
    boost: {
      intuitive_eating: {
        preference: +5,
        evidence: +2,
        note: 'Evidence supports non-restrictive approaches for complicated relationships with food'
      },
      mediterranean: { preference: +2, note: 'Flexible, no forbidden foods' },
      flexitarian: { preference: +2, note: 'Gentle structure without restriction' }
    },
    suppress: {
      keto: { safetyLevel: 'caution', preference: -3, note: 'Restrictive approaches may be harmful' },
      intermittent_fasting: { safetyLevel: 'caution', preference: -2, note: 'Time restriction may trigger patterns' },
      zone_macro: { preference: -2, note: 'Tracking may be counterproductive' }
    },
    forceReferral: true,
    referralNote: 'Working with a therapist or RD who specializes in eating behaviors may be helpful'
  },
  emotional: {
    boost: {
      intuitive_eating: { preference: +3 },
      mediterranean: { preference: +1 }
    },
    suppress: {
      keto: { preference: -1 },
      zone_macro: { preference: -1 }
    },
    referralWeight: 0.3
  }
};
```

### Normalization Functions

```typescript
// Normalize raw accumulated scores to 0-100
function normalizeScores(rawScores: Record<DietId, DietScores>): Record<DietId, DietScores> {
  const diets = Object.keys(rawScores) as DietId[];

  // Find max for each pillar across all diets
  const maxE = Math.max(...diets.map(d => rawScores[d].evidence));
  const maxF = Math.max(...diets.map(d => rawScores[d].feasibility));
  const maxP = Math.max(...diets.map(d => rawScores[d].preference));

  // Normalize each diet's scores
  return Object.fromEntries(
    diets.map(diet => [
      diet,
      {
        ...rawScores[diet],
        evidence: maxE > 0 ? (rawScores[diet].evidence / maxE) * 100 : 50,
        feasibility: maxF > 0 ? (rawScores[diet].feasibility / maxF) * 100 : 50,
        preference: maxP > 0 ? (rawScores[diet].preference / maxP) * 100 : 50
      }
    ])
  ) as Record<DietId, DietScores>;
}

// Calculate final combined score
function calculateFinalScore(
  scores: DietScores,
  weights: PillarWeights
): number {
  const weighted =
    (scores.evidence * weights.evidence) +
    (scores.feasibility * weights.feasibility) +
    (scores.preference * weights.preference);

  // Apply safety penalty
  if (scores.safetyLevel === 'caution') {
    return weighted * 0.85;  // 15% penalty
  }
  if (scores.safetyLevel === 'contraindicated') {
    return 0;  // Hidden from results
  }

  return Math.round(weighted);
}
```

### Hybrid Detection Matrix

```typescript
const hybridCompatibility: Record<DietId, DietId[]> = {
  mediterranean: ['flexitarian', 'intermittent_fasting', 'anti_inflammatory', 'dash'],
  dash: ['mediterranean', 'flexitarian'],
  flexitarian: ['mediterranean', 'low_carb', 'anti_inflammatory'],
  wfpb: ['anti_inflammatory', 'intermittent_fasting'],
  low_carb: ['flexitarian', 'intermittent_fasting'],
  keto: ['intermittent_fasting'],  // Limited compatibility
  intermittent_fasting: ['mediterranean', 'flexitarian', 'low_carb', 'wfpb'],
  anti_inflammatory: ['mediterranean', 'wfpb', 'flexitarian'],
  intuitive_eating: [],  // Standalone - philosophy doesn't mix
  zone_macro: ['mediterranean']  // Can apply macros to Med pattern
};

const hybridLabels: Record<string, string> = {
  'mediterranean+intermittent_fasting': 'Mediterranean with Time-Restricted Eating',
  'mediterranean+flexitarian': 'Mediterranean-Flexitarian Blend',
  'flexitarian+low_carb': 'Carb-Conscious Flexitarian',
  'wfpb+anti_inflammatory': 'Anti-Inflammatory Plant-Based',
  'mediterranean+dash': 'Heart-Healthy Mediterranean (DASH-enhanced)',
  'mediterranean+anti_inflammatory': 'Anti-Inflammatory Mediterranean'
};

function detectHybrid(results: DietResult[]): HybridRecommendation | null {
  if (results.length < 2) return null;

  const [first, second] = results;

  // Check if close enough for hybrid
  if (first.finalScore - second.finalScore > 10) return null;

  // Check compatibility
  const compatible = hybridCompatibility[first.dietId]?.includes(second.dietId);
  if (!compatible) return null;

  const key = `${first.dietId}+${second.dietId}`;
  const reverseKey = `${second.dietId}+${first.dietId}`;

  return {
    primaryDiet: first.dietId,
    secondaryDiet: second.dietId,
    label: hybridLabels[key] || hybridLabels[reverseKey] ||
           `${getDietName(first.dietId)} with ${getDietName(second.dietId)} elements`,
    combinedScore: Math.round((first.finalScore + second.finalScore) / 2)
  };
}
```

### Referral Threshold Calculation

```typescript
interface ReferralDecision {
  showReferral: boolean;
  urgency: 'prominent' | 'standard' | 'subtle';
  reason: string;
}

function calculateReferralDecision(userProfile: UserProfile): ReferralDecision {
  let referralScore = 0;
  const reasons: string[] = [];

  // Accumulate referral weight from conditions
  for (const condition of userProfile.healthConditions) {
    const rule = conditionRules[condition];

    if (rule.forceReferral) {
      return {
        showReferral: true,
        urgency: 'prominent',
        reason: `Your health profile (${condition}) suggests working with a healthcare provider for personalized guidance.`
      };
    }

    referralScore += rule.referralWeight;
    if (rule.referralWeight > 0.3) {
      reasons.push(condition);
    }
  }

  // Relationship with food adds weight
  if (userProfile.relationshipWithFood === 'complicated') {
    referralScore += 0.5;
    reasons.push('relationship with food');
  }

  // Multiple conditions compound
  if (userProfile.healthConditions.length >= 2) {
    referralScore += 0.3;
  }

  // Thresholds
  if (referralScore >= 0.8) {
    return {
      showReferral: true,
      urgency: 'prominent',
      reason: `Given your health considerations, we recommend consulting with a registered dietitian or your healthcare provider.`
    };
  }

  if (referralScore >= 0.5) {
    return {
      showReferral: true,
      urgency: 'standard',
      reason: `Consider discussing dietary changes with your healthcare provider, especially regarding ${reasons.join(' and ')}.`
    };
  }

  if (referralScore >= 0.2) {
    return {
      showReferral: true,
      urgency: 'subtle',
      reason: `For personalized guidance, a registered dietitian can help fine-tune this approach for you.`
    };
  }

  return {
    showReferral: false,
    urgency: 'subtle',
    reason: ''
  };
}
```

---

## SPEC 2: Question-to-Pillar Mapping

### Complete Mapping for All 20 Questions

Each question contributes to E (Evidence), F (Feasibility), and/or P (Preference) scores for each diet. Values typically range from -3 to +3.

```typescript
const questionPillarMapping: QuestionMapping = {

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: QUICK PROFILE (Q1-Q3)
  // ═══════════════════════════════════════════════════════════════════

  q1_primary_goal: {
    question: "What's your primary food goal right now?",
    impacts: {
      weight_loss: {
        evidence: {
          low_carb: +2, keto: +2, mediterranean: +1,
          intermittent_fasting: +2, dash: +1
        },
        feasibility: {},
        preference: {}
      },
      energy: {
        evidence: {
          mediterranean: +2, anti_inflammatory: +2, wfpb: +1,
          intermittent_fasting: +1
        },
        feasibility: {},
        preference: {}
      },
      health_markers: {
        evidence: {
          mediterranean: +3, dash: +3, wfpb: +2,
          anti_inflammatory: +2, flexitarian: +1
        },
        feasibility: {},
        preference: {}
      },
      sustainability_ethics: {
        evidence: {
          wfpb: +3, flexitarian: +3, mediterranean: +1
        },
        feasibility: {},
        preference: {
          wfpb: +2, flexitarian: +2
        }
      },
      simplify_relationship: {
        evidence: {
          intuitive_eating: +3
        },
        feasibility: {},
        preference: {
          intuitive_eating: +3, mediterranean: +1, flexitarian: +1
        }
      },
      athletic_performance: {
        evidence: {
          zone_macro: +3, mediterranean: +2, low_carb: +1
        },
        feasibility: {},
        preference: {
          zone_macro: +2
        }
      },
      just_curious: {
        evidence: {},
        feasibility: {
          mediterranean: +2, flexitarian: +2, intuitive_eating: +1
        },
        preference: {
          mediterranean: +1, flexitarian: +1
        }
      }
    }
  },

  q2_current_style: {
    question: "How would you describe your current eating style?",
    impacts: {
      whatever_convenient: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +2, mediterranean: -1, wfpb: -2,
          keto: -1
        },
        preference: {
          intuitive_eating: +1
        }
      },
      try_healthy_struggle: {
        evidence: {},
        feasibility: {
          flexitarian: +2, mediterranean: +1, intuitive_eating: +2
        },
        preference: {
          intuitive_eating: +1
        }
      },
      loose_structure: {
        evidence: {},
        feasibility: {
          mediterranean: +2, flexitarian: +2, anti_inflammatory: +1
        },
        preference: {}
      },
      tried_various_mixed: {
        evidence: {},
        feasibility: {
          intuitive_eating: +2, mediterranean: +1, flexitarian: +1
        },
        preference: {
          intuitive_eating: +2
        }
        // Note: Also triggers pastDietExperience follow-up
      },
      eat_well_want_optimize: {
        evidence: {},
        feasibility: {
          zone_macro: +2, mediterranean: +1, anti_inflammatory: +1
        },
        preference: {
          zone_macro: +2
        }
      },
      dietary_restrictions: {
        evidence: {},
        feasibility: {
          flexitarian: +1, mediterranean: +1
        },
        preference: {}
        // Note: Restrictions captured in Q10
      }
    }
  },

  q3_biggest_challenge: {
    question: "What's your biggest food-related challenge?",
    multiSelect: true,
    maxSelections: 2,
    impacts: {
      time: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +3, keto: +1, wfpb: -2,
          mediterranean: -1
        },
        preference: {}
      },
      knowing_what: {
        evidence: {},
        feasibility: {
          mediterranean: +1, dash: +1, keto: +1, zone_macro: +1
        },
        preference: {
          // Structured approaches help
        }
      },
      consistency: {
        evidence: {},
        feasibility: {
          intuitive_eating: +2, flexitarian: +2, mediterranean: +1
        },
        preference: {
          intuitive_eating: +2
        }
      },
      social_eating: {
        evidence: {},
        feasibility: {
          mediterranean: +2, flexitarian: +2, intuitive_eating: +2,
          keto: -2, wfpb: -1
        },
        preference: {}
      },
      budget: {
        evidence: {},
        feasibility: {
          flexitarian: +2, mediterranean: +1, dash: +1,
          keto: -1, wfpb: -1
        },
        preference: {}
      },
      family_dynamics: {
        evidence: {},
        feasibility: {
          flexitarian: +3, mediterranean: +2, intuitive_eating: +1,
          keto: -2, wfpb: -2
        },
        preference: {}
      },
      emotional_eating: {
        evidence: {
          intuitive_eating: +3
        },
        feasibility: {
          intuitive_eating: +2, keto: -2, intermittent_fasting: -1
        },
        preference: {
          intuitive_eating: +2
        }
        // Note: Triggers referral weight and relationshipWithFood flag
      },
      conflicting_info: {
        evidence: {},
        feasibility: {
          mediterranean: +2, dash: +2
          // Well-established patterns with clear guidelines
        },
        preference: {}
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - LIFESTYLE (Q4-Q6)
  // ═══════════════════════════════════════════════════════════════════

  q4_weekday_meals: {
    question: "What does a typical weekday look like for meals?",
    type: 'timeline_selector',
    impacts: {
      // Computed based on combination of morning/lunch/dinner selections
      skip_breakfast: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +3
        },
        preference: {}
      },
      quick_all_meals: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +2, keto: +1,
          wfpb: -2, mediterranean: -1
        },
        preference: {}
      },
      cook_dinner_only: {
        evidence: {},
        feasibility: {
          mediterranean: +1, flexitarian: +1
        },
        preference: {}
      },
      sit_down_breakfast: {
        evidence: {},
        feasibility: {
          mediterranean: +1, wfpb: +1
        },
        preference: {}
      },
      mostly_takeout: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +2, intuitive_eating: +1,
          wfpb: -3, keto: -1
        },
        preference: {}
      }
    }
  },

  q5_time_available: {
    question: "How much time can you realistically spend on food daily?",
    impacts: {
      under_30: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +3, low_carb: +1, keto: +1,
          wfpb: -3, mediterranean: -1, zone_macro: -1
        },
        preference: {}
      },
      '30_60': {
        evidence: {},
        feasibility: {
          flexitarian: +2, mediterranean: +1, low_carb: +1,
          wfpb: -1
        },
        preference: {}
      },
      '60_120': {
        evidence: {},
        feasibility: {
          mediterranean: +2, flexitarian: +2, wfpb: +1,
          anti_inflammatory: +1
        },
        preference: {}
      },
      over_120: {
        evidence: {},
        feasibility: {
          wfpb: +3, mediterranean: +2, anti_inflammatory: +2,
          zone_macro: +1
        },
        preference: {}
      }
    }
  },

  q6_eating_companions: {
    question: "Who do you typically eat with?",
    multiSelect: true,
    impacts: {
      mostly_alone: {
        evidence: {},
        feasibility: {
          // All diets equally feasible when eating alone
        },
        preference: {}
      },
      partner: {
        evidence: {},
        feasibility: {
          mediterranean: +1, flexitarian: +2,
          keto: -1  // Unless partner also follows
        },
        preference: {}
      },
      children: {
        evidence: {},
        feasibility: {
          flexitarian: +3, mediterranean: +2, dash: +1,
          keto: -2, wfpb: -1, intermittent_fasting: -1
        },
        preference: {}
      },
      different_preferences: {
        evidence: {},
        feasibility: {
          flexitarian: +3, mediterranean: +2,
          keto: -2, wfpb: -2
        },
        preference: {}
      },
      colleagues: {
        evidence: {},
        feasibility: {
          mediterranean: +1, flexitarian: +1, intuitive_eating: +1,
          keto: -1
        },
        preference: {}
      },
      varies: {
        evidence: {},
        feasibility: {
          flexitarian: +2, mediterranean: +1, intuitive_eating: +2
        },
        preference: {}
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - VALUES (Q7-Q8)
  // ═══════════════════════════════════════════════════════════════════

  q7_value_importance: {
    question: "How important are these factors in your food choices?",
    type: 'ranking',
    impacts: {
      // Scores based on ranking position (1st = +3, 2nd = +2, 3rd = +1)
      environmental_sustainability: {
        evidence: {},
        feasibility: {},
        preference: {
          wfpb: 'rank_multiplier',  // +3/+2/+1 based on rank
          flexitarian: 'rank_multiplier',
          mediterranean: 'rank_multiplier * 0.5'
        }
      },
      animal_welfare: {
        evidence: {},
        feasibility: {},
        preference: {
          wfpb: 'rank_multiplier',
          flexitarian: 'rank_multiplier * 0.7'
        }
      },
      local_producers: {
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: 'rank_multiplier * 0.7',
          flexitarian: 'rank_multiplier * 0.5'
        }
      },
      organic_minimal_processing: {
        evidence: {},
        feasibility: {},
        preference: {
          wfpb: 'rank_multiplier',
          anti_inflammatory: 'rank_multiplier * 0.7',
          mediterranean: 'rank_multiplier * 0.5'
        }
      },
      cultural_traditional: {
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: 'rank_multiplier',
          intuitive_eating: 'rank_multiplier * 0.5'
        }
      },
      convenience_simplicity: {
        evidence: {},
        feasibility: {},
        preference: {
          intermittent_fasting: 'rank_multiplier',
          intuitive_eating: 'rank_multiplier * 0.7'
        }
      }
    }
  },

  q8_ideal_eating_style: {
    question: "When you imagine your ideal way of eating, it feels...",
    impacts: {
      structured_predictable: {
        evidence: {},
        feasibility: {},
        preference: {
          keto: +3, zone_macro: +3, low_carb: +2, dash: +2,
          intuitive_eating: -2
        }
      },
      flexible_guidelines: {
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: +3, flexitarian: +3, anti_inflammatory: +2,
          keto: -1
        }
      },
      intuitive_unrestricted: {
        evidence: {},
        feasibility: {},
        preference: {
          intuitive_eating: +3, mediterranean: +1, flexitarian: +1,
          keto: -2, zone_macro: -2
        }
      },
      socially_integrated: {
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: +3, flexitarian: +2, intuitive_eating: +2,
          keto: -2, wfpb: -1
        }
      },
      optimized_measured: {
        evidence: {},
        feasibility: {},
        preference: {
          zone_macro: +3, low_carb: +2, keto: +1,
          intuitive_eating: -2
        }
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - HEALTH (Q9-Q10)
  // ═══════════════════════════════════════════════════════════════════

  q9_health_conditions: {
    question: "Do any of these apply to you?",
    multiSelect: true,
    // Note: This question primarily triggers the conditionRules engine
    // Direct impacts are minimal - rules engine handles the logic
    impacts: {
      hypertension: {
        // Handled by conditionRules.hypertension
        setsCondition: 'hypertension'
      },
      blood_sugar: {
        // Need to determine T1 vs T2 - follow-up question if selected
        setsCondition: 'diabetes_followup'
      },
      digestive: {
        setsCondition: 'digestive_issues'
      },
      autoimmune: {
        setsCondition: 'autoimmune'
      },
      joint_pain: {
        setsCondition: 'inflammation'
      },
      hormonal: {
        evidence: {
          mediterranean: +1, anti_inflammatory: +1
        },
        feasibility: {},
        preference: {},
        referralWeight: 0.2
      },
      mental_health: {
        setsCondition: 'mental_health'
      },
      none: {
        // No conditions - no special handling needed
      }
    }
  },

  q10_food_restrictions: {
    question: "Any foods you avoid or can't eat?",
    multiSelect: true,
    impacts: {
      gluten: {
        evidence: {},
        feasibility: {
          mediterranean: -1,  // Possible but requires adjustment
          wfpb: +0,  // Naturally works
          keto: +1   // Naturally low-grain
        },
        preference: {}
      },
      dairy: {
        evidence: {},
        feasibility: {
          wfpb: +2,  // Already dairy-free
          mediterranean: -1,  // Cheese is traditional
          keto: -1   // Often relies on dairy
        },
        preference: {}
      },
      eggs: {
        evidence: {},
        feasibility: {
          wfpb: +1,
          keto: -1,
          low_carb: -1
        },
        preference: {}
      },
      soy: {
        evidence: {},
        feasibility: {
          wfpb: -1,  // Often relies on tofu/tempeh
          keto: +1
        },
        preference: {}
      },
      nuts: {
        evidence: {},
        feasibility: {
          mediterranean: -1,
          wfpb: -1,
          keto: -1
        },
        preference: {}
      },
      shellfish_fish: {
        evidence: {},
        feasibility: {
          mediterranean: -2,  // Fish is central
          wfpb: +1
        },
        preference: {}
      },
      red_meat: {
        evidence: {},
        feasibility: {
          wfpb: +2,
          flexitarian: +2,
          keto: -1  // Often meat-heavy
        },
        preference: {}
      },
      all_animal: {
        evidence: {},
        feasibility: {
          wfpb: +3,
          mediterranean: -2,
          keto: -3,
          low_carb: -2
        },
        preference: {
          wfpb: +2
        }
      },
      none: {
        // Maximum flexibility
        evidence: {},
        feasibility: {
          // Slight boost to diets that use variety
          mediterranean: +1,
          flexitarian: +1
        },
        preference: {}
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - PRACTICAL (Q11-Q12)
  // ═══════════════════════════════════════════════════════════════════

  q11_budget: {
    question: "What's your monthly food budget comfort zone?",
    impacts: {
      tight: {
        evidence: {},
        feasibility: {
          flexitarian: +2, dash: +1, mediterranean: +1,
          keto: -2, wfpb: -1  // Can be expensive without planning
        },
        preference: {}
      },
      moderate: {
        evidence: {},
        feasibility: {
          mediterranean: +1, flexitarian: +1, dash: +1
        },
        preference: {}
      },
      comfortable: {
        evidence: {},
        feasibility: {
          mediterranean: +1, wfpb: +1, anti_inflammatory: +1
        },
        preference: {}
      },
      unlimited: {
        evidence: {},
        feasibility: {
          // All diets feasible
          wfpb: +1, keto: +1, zone_macro: +1
        },
        preference: {}
      }
    }
  },

  q12_kitchen_cooking: {
    question: "Kitchen and cooking reality check:",
    multiSelect: true,
    impacts: {
      basic_equipment: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +1,  // Less cooking needed
          wfpb: -2,  // Often needs more equipment
          keto: -1
        },
        preference: {}
      },
      well_equipped: {
        evidence: {},
        feasibility: {
          wfpb: +1, mediterranean: +1
        },
        preference: {}
      },
      beginner_cook: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +2, low_carb: +1,
          wfpb: -2, mediterranean: -1, zone_macro: -1
        },
        preference: {}
      },
      confident_cook: {
        evidence: {},
        feasibility: {
          wfpb: +2, mediterranean: +2, anti_inflammatory: +1
        },
        preference: {}
      },
      diverse_grocery: {
        evidence: {},
        feasibility: {
          mediterranean: +1, wfpb: +1, anti_inflammatory: +1
        },
        preference: {}
      },
      limited_options: {
        evidence: {},
        feasibility: {
          flexitarian: +1, intermittent_fasting: +1,
          wfpb: -2, mediterranean: -1
        },
        preference: {}
      },
      meal_prep_regular: {
        evidence: {},
        feasibility: {
          // All diets benefit from prep
          zone_macro: +1, wfpb: +1, mediterranean: +1
        },
        preference: {}
      },
      never_meal_prep: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +2, intuitive_eating: +1,
          zone_macro: -2, wfpb: -2
        },
        preference: {}
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: CORE JOURNEY - PREFERENCES (Q13-Q15)
  // ═══════════════════════════════════════════════════════════════════

  q13_food_enjoyment: {
    question: "Food enjoyment style:",
    type: 'sliders',
    // Three sliders, each 0-100
    impacts: {
      eat_to_live: {  // Low on "eat to live <-> live to eat" scale
        evidence: {},
        feasibility: {},
        preference: {
          intermittent_fasting: +2, keto: +1,
          mediterranean: -1, intuitive_eating: -1
        }
      },
      live_to_eat: {  // High on scale
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: +2, intuitive_eating: +2, flexitarian: +1,
          keto: -1, zone_macro: -1
        }
      },
      routine_lover: {  // Low on "routine <-> variety" scale
        evidence: {},
        feasibility: {},
        preference: {
          keto: +2, zone_macro: +2, intermittent_fasting: +1,
          mediterranean: -1
        }
      },
      variety_seeker: {  // High on scale
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: +2, flexitarian: +2, intuitive_eating: +1,
          keto: -1
        }
      },
      simple_flavors: {  // Low on "simple <-> complex" scale
        evidence: {},
        feasibility: {},
        preference: {
          intermittent_fasting: +1, low_carb: +1,
          mediterranean: -1
        }
      },
      complex_flavors: {  // High on scale
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: +2, anti_inflammatory: +1, wfpb: +1
        }
      }
    }
  },

  q14_past_diet: {
    question: "Past diet experience:",
    multiSelect: true,
    impacts: {
      low_carb_worked: {
        evidence: {
          low_carb: +2, keto: +1
        },
        feasibility: {
          low_carb: +2, keto: +1
        },
        preference: {
          low_carb: +2, keto: +1
        }
      },
      low_carb_didnt_work: {
        evidence: {},
        feasibility: {
          low_carb: -2, keto: -3
        },
        preference: {
          low_carb: -2, keto: -2
        }
      },
      vegetarian_worked: {
        evidence: {},
        feasibility: {
          wfpb: +2, flexitarian: +2
        },
        preference: {
          wfpb: +2, flexitarian: +2
        }
      },
      vegetarian_didnt_work: {
        evidence: {},
        feasibility: {
          wfpb: -2, flexitarian: -1
        },
        preference: {
          wfpb: -2
        }
      },
      calorie_counting_worked: {
        evidence: {},
        feasibility: {
          zone_macro: +2
        },
        preference: {
          zone_macro: +2
        }
      },
      calorie_counting_didnt_work: {
        evidence: {},
        feasibility: {
          zone_macro: -2
        },
        preference: {
          zone_macro: -2, intuitive_eating: +2
        }
      },
      if_worked: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +3
        },
        preference: {
          intermittent_fasting: +2
        }
      },
      if_didnt_work: {
        evidence: {},
        feasibility: {
          intermittent_fasting: -3
        },
        preference: {
          intermittent_fasting: -2
        }
      },
      whole30_worked: {
        evidence: {},
        feasibility: {
          anti_inflammatory: +1
        },
        preference: {
          anti_inflammatory: +1
        }
      },
      whole30_didnt_work: {
        evidence: {},
        feasibility: {},
        preference: {
          intuitive_eating: +1  // May need less restriction
        }
      },
      no_experience: {
        evidence: {},
        feasibility: {
          // Gentle introductions preferred
          mediterranean: +1, flexitarian: +1
        },
        preference: {}
      }
    }
  },

  q15_derails: {
    question: "What typically derails healthy eating for you?",
    multiSelect: true,
    maxSelections: 2,
    impacts: {
      stress_emotional: {
        evidence: {
          intuitive_eating: +2
        },
        feasibility: {
          intuitive_eating: +2, keto: -1, intermittent_fasting: -1
        },
        preference: {
          intuitive_eating: +2
        },
        setsFlag: 'emotional_eating'
      },
      social_pressure: {
        evidence: {},
        feasibility: {
          mediterranean: +2, flexitarian: +2, intuitive_eating: +1,
          keto: -2, wfpb: -2
        },
        preference: {}
      },
      travel_schedule: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +2, intuitive_eating: +1,
          wfpb: -2, zone_macro: -2
        },
        preference: {}
      },
      boredom: {
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: +2, flexitarian: +1,
          keto: -1  // Can be monotonous
        }
      },
      cravings: {
        evidence: {},
        feasibility: {
          intuitive_eating: +2, mediterranean: +1,
          keto: -1
        },
        preference: {
          intuitive_eating: +1
        }
      },
      all_or_nothing: {
        evidence: {
          intuitive_eating: +3
        },
        feasibility: {
          intuitive_eating: +2, flexitarian: +2,
          keto: -2, zone_macro: -1
        },
        preference: {
          intuitive_eating: +2
        }
      },
      lack_planning: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +1,
          wfpb: -1, mediterranean: -1
        },
        preference: {},
        barrier: 'planning'
      },
      cost: {
        evidence: {},
        feasibility: {
          flexitarian: +1, dash: +1,
          keto: -1
        },
        preference: {},
        barrier: 'budget'
      }
    }
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: DEEP DIVE OPTIONAL (Q16-Q20)
  // ═══════════════════════════════════════════════════════════════════

  q16_energy_patterns: {
    question: "Energy patterns throughout the day",
    type: 'interactive_graph',
    optional: true,
    impacts: {
      morning_crash: {
        evidence: {},
        feasibility: {
          intermittent_fasting: -1  // May worsen morning energy
        },
        preference: {}
      },
      afternoon_slump: {
        evidence: {
          low_carb: +1, intermittent_fasting: +1
        },
        feasibility: {},
        preference: {}
      },
      evening_energy: {
        evidence: {},
        feasibility: {
          intermittent_fasting: +1  // Morning fast may work well
        },
        preference: {}
      },
      steady_throughout: {
        evidence: {},
        feasibility: {},
        preference: {}
      }
    }
  },

  q17_relationship_food: {
    question: "Relationship with food reflection:",
    optional: true,
    impacts: {
      fuel: {
        evidence: {},
        feasibility: {},
        preference: {
          intermittent_fasting: +1, zone_macro: +1
        }
      },
      enjoy_not_control: {
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: +1, flexitarian: +1
        }
      },
      sometimes_emotional: {
        evidence: {},
        feasibility: {},
        preference: {
          intuitive_eating: +1
        },
        setsFlag: 'emotional_eating',
        referralWeight: 0.2
      },
      complicated: {
        evidence: {
          intuitive_eating: +3
        },
        feasibility: {
          keto: -2, intermittent_fasting: -2, zone_macro: -2
        },
        preference: {
          intuitive_eating: +3
        },
        setsCondition: 'complicated_relationship',
        forceReferral: true
      },
      greatest_pleasures: {
        evidence: {},
        feasibility: {},
        preference: {
          mediterranean: +2, intuitive_eating: +1, flexitarian: +1,
          keto: -1, zone_macro: -1
        }
      }
    }
  },

  q18_social_frequency: {
    question: "Social eating frequency:",
    optional: true,
    impacts: {
      rarely: {
        evidence: {},
        feasibility: {
          // All diets more feasible when eating alone
          keto: +1, wfpb: +1
        },
        preference: {}
      },
      '1_2_week': {
        evidence: {},
        feasibility: {},
        preference: {}
      },
      '3_5_week': {
        evidence: {},
        feasibility: {
          mediterranean: +1, flexitarian: +1,
          keto: -1, wfpb: -1
        },
        preference: {}
      },
      most_social: {
        evidence: {},
        feasibility: {
          mediterranean: +2, flexitarian: +2, intuitive_eating: +2,
          keto: -2, wfpb: -2
        },
        preference: {}
      }
    }
  },

  q19_experiment_willingness: {
    question: "Willingness to experiment:",
    type: 'slider',
    optional: true,
    impacts: {
      stick_familiar: {  // Low score (0-30)
        evidence: {},
        feasibility: {
          // Prefer familiar patterns
        },
        preference: {
          mediterranean: +1,  // Familiar to many
          intuitive_eating: +1
        }
      },
      moderate: {  // Middle score (31-70)
        evidence: {},
        feasibility: {},
        preference: {}
      },
      try_anything: {  // High score (71-100)
        evidence: {},
        feasibility: {},
        preference: {
          // Open to any approach
          wfpb: +1, keto: +1, anti_inflammatory: +1
        }
      }
    }
  },

  q20_success_definition: {
    question: "What would make you feel successful in 3 months?",
    multiSelect: true,
    optional: true,
    impacts: {
      lost_weight: {
        evidence: {
          low_carb: +1, keto: +1, intermittent_fasting: +1
        },
        feasibility: {},
        preference: {}
      },
      clothes_fit: {
        evidence: {
          low_carb: +1, intermittent_fasting: +1
        },
        feasibility: {},
        preference: {}
      },
      consistent_energy: {
        evidence: {
          mediterranean: +1, anti_inflammatory: +1, wfpb: +1
        },
        feasibility: {},
        preference: {}
      },
      better_labs: {
        evidence: {
          mediterranean: +2, dash: +2, wfpb: +1
        },
        feasibility: {},
        preference: {}
      },
      enjoy_without_guilt: {
        evidence: {
          intuitive_eating: +3
        },
        feasibility: {},
        preference: {
          intuitive_eating: +2, mediterranean: +1, flexitarian: +1
        }
      },
      sustainable_routine: {
        evidence: {},
        feasibility: {
          mediterranean: +1, flexitarian: +1
        },
        preference: {
          mediterranean: +1, flexitarian: +1
        }
      }
    }
  }
};
```

---

## SPEC 3: Diet Profile Content

### Full Descriptive Text for Each Diet Approach

Each profile includes: tagline, description, "ideal for" list, typical day example, key benefits, potential challenges, and getting started steps.

---

### Mediterranean

**Tagline**: "The world's most studied eating pattern—balanced, flexible, and built for real life."

**Description**:
The Mediterranean diet is inspired by the traditional eating patterns of countries bordering the Mediterranean Sea—particularly Greece, Italy, and Spain. It's not about strict rules but a pattern: abundant vegetables, fruits, whole grains, legumes, nuts, and olive oil as the primary fat source. Fish and poultry appear regularly; red meat is occasional. Wine in moderation is optional.

What sets Mediterranean apart is its emphasis on **eating patterns**, not isolated nutrients. Meals are often shared, prepared simply, and enjoyed without guilt. Decades of research link this pattern to reduced cardiovascular disease, better metabolic health, and longevity.

**Ideal For**:
- People seeking a flexible, evidence-backed approach
- Those with heart health or blood pressure concerns
- Social eaters who dine out or with family regularly
- Anyone wanting sustainable habits rather than a "diet"
- Food lovers who enjoy variety and flavor

**A Typical Day**:
- **Breakfast**: Greek yogurt with honey, walnuts, and berries; coffee
- **Lunch**: Large salad with chickpeas, cucumber, tomatoes, feta, olive oil, and crusty bread
- **Snack**: Hummus with raw vegetables or a handful of almonds
- **Dinner**: Grilled fish with roasted vegetables, lemon, herbs, quinoa; glass of wine (optional)

**Key Benefits**:
- Strong evidence for heart health and longevity
- Flexible—no foods are strictly forbidden
- Socially adaptable and family-friendly
- Emphasizes whole foods without extreme restriction
- Sustainable long-term

**Potential Challenges**:
- Requires some cooking and meal preparation
- Quality olive oil and fish can be pricier
- May feel unstructured for those who prefer clear rules
- Not specifically designed for rapid weight loss

**Getting Started**:
1. Make olive oil your primary cooking fat
2. Add vegetables to every meal
3. Eat fish 2-3 times per week
4. Choose whole grains over refined
5. Enjoy meals mindfully, ideally with others

---

### DASH

**Tagline**: "Originally designed for blood pressure—now recognized as one of the healthiest overall patterns."

**Description**:
DASH (Dietary Approaches to Stop Hypertension) was developed by researchers to lower blood pressure without medication. It emphasizes vegetables, fruits, whole grains, lean proteins, and low-fat dairy while limiting sodium, saturated fat, and added sugars.

Clinical trials consistently show DASH lowers blood pressure within weeks. It's now recommended by major health organizations for overall cardiovascular health—not just hypertension. DASH is more structured than Mediterranean but shares the same whole-foods foundation.

**Ideal For**:
- Anyone with high blood pressure or heart disease risk
- People who want clear nutritional targets
- Those seeking an evidence-backed, doctor-approved pattern
- Families wanting a universally healthy eating style

**A Typical Day**:
- **Breakfast**: Oatmeal with banana and walnuts; low-fat milk
- **Lunch**: Turkey and avocado wrap with whole-wheat tortilla, side salad
- **Snack**: Apple slices with peanut butter
- **Dinner**: Baked chicken breast, steamed broccoli, brown rice, side of low-fat yogurt

**Key Benefits**:
- Clinically proven to reduce blood pressure
- Clear guidelines and portion recommendations
- Emphasizes potassium, magnesium, calcium (heart-protective minerals)
- Works well alongside medication if needed
- Family-appropriate

**Potential Challenges**:
- Requires attention to sodium (reading labels)
- Low-fat dairy may not appeal to everyone
- Can feel restrictive if you're used to high-sodium foods
- Meal planning needed for best results

**Getting Started**:
1. Reduce sodium gradually (aim for <2300mg/day, ideally <1500mg)
2. Add an extra serving of vegetables at each meal
3. Choose low-fat dairy options
4. Limit processed and packaged foods
5. Track sodium for the first week to build awareness

---

### Flexitarian

**Tagline**: "Plant-forward eating without the all-or-nothing rules."

**Description**:
Flexitarian is exactly what it sounds like: flexible vegetarian. The focus is on plant-based foods—vegetables, fruits, legumes, whole grains—with animal products as occasional additions rather than the center of the plate.

There are no strict rules about how often you can eat meat or fish. Some flexitarians eat meat once a week; others a few times. The emphasis is on **shifting the balance** toward plants gradually, making it sustainable for people who aren't ready (or don't want) to go fully vegetarian.

**Ideal For**:
- People interested in plant-based eating but not full commitment
- Families with mixed dietary preferences
- Budget-conscious eaters (plants are cheaper than meat)
- Those wanting environmental benefits without strict rules
- Gradual changers who prefer small steps

**A Typical Day**:
- **Breakfast**: Avocado toast on whole grain bread with tomatoes
- **Lunch**: Black bean soup with crusty bread, side salad
- **Snack**: Mixed nuts and dried fruit
- **Dinner**: Stir-fried tofu with vegetables and rice (or grilled chicken if this is a "flex" day)

**Key Benefits**:
- Highly adaptable to any situation
- Easier for families—same base meal, different proteins
- Lower environmental impact than standard Western diet
- No foods completely off-limits
- Evidence supports plant-forward eating for health

**Potential Challenges**:
- Lack of structure may not suit everyone
- Requires some creativity with plant-based proteins
- May need to learn new cooking techniques
- Easy to default back to meat-heavy if not intentional

**Getting Started**:
1. Designate 2-3 days per week as "plant-only"
2. Learn 5 satisfying plant-based meals you enjoy
3. Use the "base + build" method: make one base dish, add proteins separately
4. Explore legumes: lentils, chickpeas, black beans
5. Gradually increase plant days as you find favorites

---

### WFPB (Whole Food Plant-Based)

**Tagline**: "Minimally processed plants as the foundation—often chosen for health, ethics, or environment."

**Description**:
Whole Food Plant-Based eating centers on vegetables, fruits, whole grains, legumes, nuts, and seeds while minimizing or eliminating animal products and processed foods. Unlike "vegan," which is defined by what you don't eat, WFPB focuses on what you do: whole, minimally processed plants.

Some WFPB followers avoid all animal products; others allow small amounts. Most avoid added oils and heavily processed foods, even if technically plant-based. The evidence links WFPB to improved cardiovascular markers, weight management, and some benefits for type 2 diabetes.

**Ideal For**:
- Values-driven eaters (ethics, environment)
- Those seeking significant dietary change for health
- People who enjoy cooking and food preparation
- Anyone with cardiovascular concerns seeking aggressive intervention
- Experienced cooks ready for a learning curve

**A Typical Day**:
- **Breakfast**: Overnight oats with chia seeds, almond milk, berries, maple syrup
- **Lunch**: Buddha bowl: quinoa, roasted vegetables, chickpeas, tahini dressing
- **Snack**: Apple with almond butter
- **Dinner**: Lentil curry with brown rice and steamed greens

**Key Benefits**:
- Strong evidence for cardiovascular health
- Aligns with ethical and environmental values
- High fiber, nutrient-dense
- Can support significant weight loss
- Often improves energy and digestion

**Potential Challenges**:
- Requires meal planning and cooking skills
- Social situations and eating out can be difficult
- Need to ensure adequate B12, iron, omega-3s
- May be more expensive depending on food choices
- Significant change from typical Western diet

**Getting Started**:
1. Stock your kitchen with whole grains, legumes, vegetables
2. Learn 5 core WFPB recipes you enjoy
3. Plan B12 supplementation (essential for all plant-based eaters)
4. Find WFPB-friendly restaurants in your area
5. Connect with community (online or local) for recipes and support

---

### Low-Carb

**Tagline**: "Reduce carbohydrates, increase satiety—without going to extremes."

**Description**:
Low-carb eating reduces total carbohydrate intake below typical Western levels (usually under 130g/day or 26% of calories) without the strict ketosis requirement of keto. Protein and fat fill the gap, with emphasis on whole foods rather than processed low-carb products.

Research shows low-carb approaches can improve blood sugar, support weight loss, and increase satiety. It's more flexible than keto—allowing more vegetables, some fruits, and moderate portions of whole grains for those who tolerate them.

**Ideal For**:
- People with blood sugar concerns or prediabetes
- Those who feel better with fewer carbs but don't want keto's strictness
- Anyone seeking clear rules without extreme restriction
- People who enjoy protein-rich meals
- Those who found keto too restrictive long-term

**A Typical Day**:
- **Breakfast**: Scrambled eggs with spinach, avocado, cheese
- **Lunch**: Grilled chicken salad with olive oil dressing, feta, olives
- **Snack**: Celery with almond butter
- **Dinner**: Salmon with asparagus and a small portion of wild rice

**Key Benefits**:
- May improve blood sugar and insulin sensitivity
- Often increases satiety and reduces snacking
- More flexible than keto
- Clear structure for those who like guidelines
- Evidence supports benefits for metabolic health

**Potential Challenges**:
- Requires carb awareness and some tracking
- May feel restrictive at first
- Social situations with carb-heavy foods
- Need to ensure adequate fiber intake
- Not ideal for intense endurance athletes

**Getting Started**:
1. Identify your current carb intake (track for a few days)
2. Set a target (100-130g/day is a common starting point)
3. Focus on eliminating refined carbs first (white bread, sugar, pastries)
4. Increase non-starchy vegetables substantially
5. Include protein and healthy fat at each meal for satiety

---

### Keto

**Tagline**: "Very low carbohydrate for metabolic shifting—effective but requires commitment and medical awareness."

**Description**:
Ketogenic eating restricts carbohydrates to under 50g/day (often 20-30g) to shift the body into ketosis, where fat becomes the primary fuel. It's high in fat (70-80% of calories), moderate in protein, and very low in carbs.

Keto has evidence for weight loss and blood sugar management in type 2 diabetes, but it requires careful attention and is not appropriate for everyone. Medical supervision is advisable, especially for those on medications.

**Ideal For**:
- People willing to commit to strict carb restriction
- Those seeking significant metabolic change
- People who have succeeded with low-carb and want to go further
- Anyone working with a healthcare provider on metabolic goals
- People who prefer clear, binary rules

**A Typical Day**:
- **Breakfast**: Eggs cooked in butter with bacon and avocado
- **Lunch**: Bunless burger patty with cheese, side salad with olive oil
- **Snack**: Macadamia nuts
- **Dinner**: Ribeye steak with buttered broccoli

**Key Benefits**:
- Can produce significant weight loss
- May dramatically improve blood sugar in T2DM
- High satiety from fat and protein
- Clear rules—foods are either "keto" or not
- Some people report improved mental clarity

**Potential Challenges**:
- Very restrictive—eliminates most fruits, grains, many vegetables
- "Keto flu" during adaptation
- Difficult in social situations
- Requires tracking and awareness
- Not safe for everyone (see contraindications)
- May be hard to maintain long-term

**Contraindications**:
- Type 1 diabetes (DKA risk)
- Kidney disease
- Pregnancy or breastfeeding
- History of disordered eating
- Certain medications (insulin, sulfonylureas) without medical supervision

**Getting Started**:
1. **Consult your healthcare provider**, especially if you have any health conditions
2. Calculate your macros (typically 70% fat, 25% protein, 5% carbs)
3. Clear your kitchen of high-carb foods
4. Plan your first week's meals in advance
5. Stay hydrated and ensure adequate electrolytes
6. Track your food intake, at least initially

---

### Intermittent Fasting

**Tagline**: "When you eat matters—simplify your schedule without changing what you eat."

**Description**:
Intermittent fasting (IF) focuses on **when** you eat rather than **what** you eat. The most common approach is time-restricted eating: eating within a window (e.g., 8 hours) and fasting the rest. Other patterns include 5:2 (normal eating 5 days, very low calories 2 days).

IF doesn't prescribe specific foods, making it combinable with other approaches. Research suggests benefits for weight management and metabolic health, though it's not a magic solution—what you eat during eating windows still matters.

**Ideal For**:
- Busy people who prefer fewer meals to plan
- Those who naturally aren't hungry in the morning
- People who want structure without food restrictions
- Anyone interested in simplifying their eating schedule
- Can combine with other dietary patterns

**A Typical Day (16:8 approach)**:
- **8am-12pm**: Fasting (water, black coffee, tea allowed)
- **12pm Lunch**: First meal—whatever your chosen eating pattern includes
- **3pm Snack**: Optional
- **7pm Dinner**: Last meal of the day
- **After 8pm**: Fasting begins

**Key Benefits**:
- Simplifies meal planning (fewer meals to think about)
- No foods are forbidden
- May improve insulin sensitivity
- Can reduce overall calorie intake naturally
- Flexible—adjust your window to your schedule

**Potential Challenges**:
- May not suit those with low blood sugar issues
- Can trigger overeating in the eating window
- Social meals may fall outside your window
- Not appropriate for everyone (see contraindications)
- May increase food preoccupation for some

**Contraindications**:
- History of or current disordered eating
- Pregnancy or breastfeeding
- Type 1 diabetes or T2DM on certain medications (without supervision)
- Underweight or nutritional deficiencies
- High-stress periods where consistent fuel matters

**Getting Started**:
1. Identify your natural eating window (when do you actually feel hungry?)
2. Start with a 12-hour overnight fast (e.g., 7pm-7am)—most people do this already
3. Gradually extend to 14, then 16 hours if comfortable
4. Stay hydrated during fasting hours
5. Focus on nutritious meals during eating window—IF isn't a pass to eat junk

---

### Anti-Inflammatory

**Tagline**: "Food as a tool for reducing systemic inflammation and supporting recovery."

**Description**:
Anti-inflammatory eating emphasizes foods that may reduce chronic inflammation while limiting those that promote it. The pattern overlaps significantly with Mediterranean: abundant vegetables, fruits, fatty fish, nuts, olive oil, whole grains, and legumes. It limits processed foods, refined sugars, and excess saturated fat.

Evidence is emerging for this pattern's benefits in chronic conditions involving inflammation—joint pain, autoimmune conditions, and general recovery. It's less a specific diet and more a set of principles.

**Ideal For**:
- People with joint pain or arthritis
- Those with autoimmune conditions (complementary to medical treatment)
- Anyone seeking to reduce chronic inflammation
- Athletes focused on recovery
- Those already following Mediterranean who want to optimize

**A Typical Day**:
- **Breakfast**: Smoothie with berries, spinach, flaxseed, turmeric, almond milk
- **Lunch**: Salmon salad with leafy greens, avocado, olive oil, walnuts
- **Snack**: Handful of mixed berries
- **Dinner**: Grilled chicken with roasted sweet potato, sautéed greens with garlic and olive oil

**Key Anti-Inflammatory Foods**:
- Fatty fish (salmon, sardines, mackerel)
- Leafy greens
- Berries
- Nuts (especially walnuts)
- Olive oil
- Turmeric and ginger
- Whole grains
- Legumes

**Foods to Limit**:
- Processed and fried foods
- Refined sugars and carbohydrates
- Excess alcohol
- Red and processed meats
- Trans fats

**Key Benefits**:
- May reduce symptoms of inflammatory conditions
- Supports overall health with whole foods
- Not restrictive—emphasizes adding good foods
- Overlaps with heart-healthy eating
- Can be adapted to various dietary preferences

**Potential Challenges**:
- Less structured than some approaches
- Requires cooking and meal preparation
- Effects may be gradual rather than dramatic
- Evidence is still emerging for specific conditions

**Getting Started**:
1. Add fatty fish 2-3 times per week
2. Include berries or leafy greens daily
3. Switch to olive oil as primary cooking fat
4. Reduce processed food intake gradually
5. Consider turmeric/ginger in cooking or smoothies

---

### Intuitive Eating

**Tagline**: "Reject diet culture. Honor your hunger. Make peace with food."

**Description**:
Intuitive Eating is a framework, not a diet. Developed by dietitians Evelyn Tribole and Elyse Resch, it rejects the diet mentality in favor of reconnecting with internal hunger and fullness cues. The 10 principles include rejecting diets, honoring hunger, making peace with food, and practicing gentle nutrition.

Research supports Intuitive Eating for improved psychological well-being, reduced binge eating, and better overall relationship with food. It's weight-neutral—the goal is well-being, not a number on the scale.

**Ideal For**:
- Anyone with a complicated relationship with food
- Those who've tried many diets with poor long-term results
- People recovering from disordered eating (with professional support)
- Those experiencing diet fatigue
- Anyone who wants freedom from food rules

**Core Principles**:
1. Reject the diet mentality
2. Honor your hunger
3. Make peace with food (no forbidden foods)
4. Challenge the food police
5. Discover the satisfaction factor
6. Feel your fullness
7. Cope with emotions with kindness
8. Respect your body
9. Movement—feel the difference
10. Honor your health with gentle nutrition

**What It Looks Like**:
There's no typical day because the point is responding to what your body needs. Meals vary based on hunger, cravings, social context, and what sounds satisfying. Over time, most intuitive eaters naturally gravitate toward balanced, nourishing foods because that's what feels good.

**Key Benefits**:
- Improved psychological well-being
- Reduced binge eating and food preoccupation
- Better body image and self-compassion
- Sustainable long-term
- No forbidden foods—reduces "last supper" eating

**Potential Challenges**:
- No structure—can feel disorienting at first
- May not lead to weight loss (weight-neutral approach)
- Requires unlearning diet culture messages
- Often benefits from professional guidance
- Not appropriate as sole treatment for clinical eating disorders

**Getting Started**:
1. Consider reading "Intuitive Eating" by Tribole & Resch
2. Practice noticing hunger and fullness without judgment
3. Give yourself unconditional permission to eat all foods
4. Notice how different foods make you feel (physically, emotionally)
5. Consider working with an RD who specializes in Intuitive Eating, especially if you have a history of disordered eating

---

### Zone / Balanced Macro

**Tagline**: "Precision nutrition for those who like data, structure, and optimization."

**Description**:
Zone and balanced macro approaches prescribe specific ratios of macronutrients—commonly 40% carbohydrate, 30% protein, 30% fat. The goal is stable blood sugar, steady energy, and optimized performance. Each meal and snack ideally hits the target ratio.

Originally developed for athletic performance, these approaches appeal to data-driven individuals who like tracking and optimization. The structure provides clear guidance, but requires attention to measuring and planning.

**Ideal For**:
- Athletes and fitness enthusiasts
- Data-driven people who like tracking
- Those who want clear, numerical targets
- People seeking performance optimization
- Anyone who thrives with structure and measurement

**A Typical Day (40/30/30)**:
- **Breakfast**: Egg white omelet with vegetables, oatmeal, berries (balanced to ratios)
- **Lunch**: Grilled chicken breast, brown rice, large salad with olive oil
- **Snack**: Greek yogurt with a few nuts
- **Dinner**: Fish, sweet potato, steamed vegetables, prepared to hit macro targets

**Key Benefits**:
- Clear structure and numerical targets
- May improve blood sugar stability
- Supports athletic performance
- Removes guesswork—you know exactly what to eat
- Can be combined with various food preferences

**Potential Challenges**:
- Requires tracking and measuring (at least initially)
- Can feel time-consuming
- May promote food preoccupation
- Not ideal for those with disordered eating history
- Social eating and restaurants are harder

**Getting Started**:
1. Calculate your calorie needs and macro targets
2. Get a food scale and tracking app
3. Plan and prep meals in advance
4. Learn the macros of your common foods
5. Track consistently for 2-3 weeks, then adjust as needed
6. Consider working with a sports dietitian for athletic goals

---

## SPEC 4: Referral UX Design

### When Referrals Trigger

The system generates referral CTAs at three urgency levels based on user answers:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    REFERRAL TRIGGER LOGIC                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PROMINENT (Must-show, above results):                                   │
│  ├── Type 1 Diabetes selected                                            │
│  ├── Kidney disease selected                                             │
│  ├── Pregnancy selected                                                  │
│  ├── "Complicated relationship with food" + weight loss goal             │
│  └── Multiple conditions (3+) selected                                   │
│                                                                          │
│  STANDARD (Shown in results, clear visibility):                          │
│  ├── Type 2 Diabetes selected                                            │
│  ├── Hypertension + considering keto/low-carb                            │
│  ├── "Complicated relationship with food" (any goal)                     │
│  ├── "Emotional eating" as primary derailing factor                      │
│  └── Two health conditions selected                                      │
│                                                                          │
│  SUBTLE (Shown in footer/resources section):                             │
│  ├── Single condition with clear dietary management                      │
│  ├── "Sometimes emotional" eating                                        │
│  └── User completed deep dive with health considerations                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Visual Design Specifications

#### Prominent Referral Banner (Above Results)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                                                                  │    │
│  │  ⚕️  PERSONALIZED GUIDANCE RECOMMENDED                          │    │
│  │                                                                  │    │
│  │  Based on your health profile, we recommend working with a      │    │
│  │  registered dietitian or your healthcare provider before        │    │
│  │  making significant dietary changes.                            │    │
│  │                                                                  │    │
│  │  Your results below are informational—a professional can        │    │
│  │  tailor recommendations to your specific situation, medications,│    │
│  │  and health history.                                            │    │
│  │                                                                  │    │
│  │  ┌─────────────────────────────────────────────────────────┐    │    │
│  │  │  🔍 Find a Registered Dietitian     →                   │    │    │
│  │  └─────────────────────────────────────────────────────────┘    │    │
│  │                                                                  │    │
│  │  [ Continue to see your results ]                               │    │
│  │                                                                  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  ─────────────────────────────────────────────────────────────────────  │
│                                                                          │
│                        YOUR RESULTS                                      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Styling**:
- Background: `bg-secondary-100` (warm/neutral, not alarming)
- Border: `border-l-4 border-primary-500`
- Icon: Medical/professional icon (not warning/danger)
- CTA button: Primary style, links to RD finder resource
- "Continue" link: Text link below, allows proceeding

#### Standard Referral Card (In Results Flow)

Appears as a card between the primary result and compatibility spectrum:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  YOUR PRIMARY MATCH: Mediterranean                                       │
│  [Result content...]                                                     │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                                                                  │    │
│  │  💬 Consider Professional Support                               │    │
│  │                                                                  │    │
│  │  Given your health considerations, discussing these changes     │    │
│  │  with a healthcare provider can help ensure the approach        │    │
│  │  works with your medications and conditions.                    │    │
│  │                                                                  │    │
│  │  A registered dietitian can also help personalize portions,     │    │
│  │  timing, and food choices for your specific needs.              │    │
│  │                                                                  │    │
│  │  [ Learn more about working with an RD ]                        │    │
│  │                                                                  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  COMPATIBILITY SPECTRUM                                                  │
│  [Spectrum content...]                                                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Styling**:
- Background: `bg-white` with subtle shadow
- Border: `border border-neutral-200`
- Icon: Conversational (speech bubble or similar)
- Less prominent than results, but clearly visible

#### Subtle Referral (In Resources Section)

Appears in the "Your Personalized Toolkit" section:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  YOUR PERSONALIZED TOOLKIT                                               │
│                                                                          │
│  📊 CALCULATORS                                                          │
│  [Calculator links...]                                                   │
│                                                                          │
│  📚 READING                                                              │
│  [Article links...]                                                      │
│                                                                          │
│  👤 PROFESSIONAL SUPPORT                                                 │
│  ├── Find a Registered Dietitian near you                               │
│  ├── Questions to ask your healthcare provider                          │
│  └── When to seek professional nutrition guidance                       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Styling**:
- Same card style as other toolkit sections
- No special highlighting
- Professional but not alarming

### Condition-Specific Referral Messages

```typescript
const referralMessages: Record<string, ReferralMessage> = {

  type1_diabetes: {
    urgency: 'prominent',
    headline: 'Medical Nutrition Therapy Recommended',
    body: `Managing Type 1 diabetes through diet requires careful coordination with your healthcare team. Carbohydrate counting, meal timing, and insulin adjustment are individualized—a registered dietitian specializing in diabetes can work with you and your endocrinologist to optimize your eating pattern safely.`,
    cta: 'Find a Certified Diabetes Educator',
    ctaUrl: '/resources/find-cde'
  },

  kidney_disease: {
    urgency: 'prominent',
    headline: 'Specialized Nutrition Guidance Needed',
    body: `Kidney disease requires careful attention to protein, sodium, potassium, and phosphorus—the specifics depend on your stage of CKD. A renal dietitian can create a plan that protects your kidney function while meeting your nutritional needs.`,
    cta: 'Find a Renal Dietitian',
    ctaUrl: '/resources/find-renal-rd'
  },

  pregnancy: {
    urgency: 'prominent',
    headline: 'Prenatal Nutrition Support',
    body: `Nutrition during pregnancy has unique requirements—adequate calories, specific nutrients (folate, iron, DHA), and foods to approach with caution. Before making dietary changes, please consult your OB/GYN or a prenatal dietitian.`,
    cta: 'Learn About Prenatal Nutrition',
    ctaUrl: '/resources/prenatal-nutrition'
  },

  complicated_relationship: {
    urgency: 'prominent',
    headline: 'Support for Your Relationship with Food',
    body: `You mentioned having a complicated relationship with food. Changing how you eat is deeply connected to how you feel—working with a therapist or dietitian who specializes in eating behaviors can help you build a healthier relationship with food while meeting your goals.`,
    cta: 'Find Specialized Support',
    ctaUrl: '/resources/eating-behavior-support'
  },

  type2_diabetes: {
    urgency: 'standard',
    headline: 'Coordinate with Your Care Team',
    body: `Dietary changes can significantly impact blood sugar and may require medication adjustments. Before starting a new eating pattern, discuss with your doctor or diabetes educator—especially if you're considering lower-carb approaches.`,
    cta: 'Learn More',
    ctaUrl: '/resources/diabetes-diet-guide'
  },

  hypertension_keto: {
    urgency: 'standard',
    headline: 'A Note About Blood Pressure',
    body: `Some dietary changes can affect blood pressure and interact with medications. Since you mentioned blood pressure concerns, check with your provider before making significant changes—they may want to monitor your levels or adjust medications.`,
    cta: 'Questions to Ask Your Doctor',
    ctaUrl: '/resources/bp-diet-questions'
  },

  emotional_eating: {
    urgency: 'standard',
    headline: 'Addressing Emotional Eating',
    body: `You mentioned that emotional triggers often derail healthy eating. This is common and nothing to be ashamed of—but restrictive diets often make it worse. Consider working with a professional who understands the emotional side of eating.`,
    cta: 'Resources for Emotional Eating',
    ctaUrl: '/resources/emotional-eating'
  },

  multiple_conditions: {
    urgency: 'standard',
    headline: 'Personalized Guidance Available',
    body: `With multiple health considerations, a one-size-fits-all approach may not be optimal. A registered dietitian can create a plan that addresses all your needs together—and coordinate with your other healthcare providers.`,
    cta: 'Find a Registered Dietitian',
    ctaUrl: '/resources/find-rd'
  },

  general: {
    urgency: 'subtle',
    headline: 'Professional Support',
    body: `For personalized guidance tailored to your specific situation, consider working with a registered dietitian. They can help fine-tune any approach and ensure it meets your individual needs.`,
    cta: 'Learn More',
    ctaUrl: '/resources/working-with-rd'
  }
};
```

### Find RD Resources Page Spec

The referral CTAs should link to a resource page that helps users actually find professionals:

```
/resources/find-rd

CONTENT:
- What is a Registered Dietitian (RD/RDN)?
- How to find one:
  - Academy of Nutrition and Dietetics finder (eatright.org)
  - Insurance coverage tips
  - Telehealth options
  - Specialty certifications to look for (CDE, CSSD, etc.)
- Questions to ask in a first consultation
- What to expect from nutrition counseling
- Cost considerations and insurance

ALSO LINK TO:
- /resources/find-cde (Certified Diabetes Educators)
- /resources/find-renal-rd (Renal Dietitians)
- /resources/eating-behavior-support (Therapists + RDs specializing in eating behaviors)
```

### Referral Analytics Events

Track to measure effectiveness:

```typescript
const referralEvents = {
  REFERRAL_SHOWN: {
    event: 'quiz_referral_shown',
    properties: ['urgency', 'trigger_condition', 'position']
  },
  REFERRAL_CTA_CLICKED: {
    event: 'quiz_referral_cta_clicked',
    properties: ['urgency', 'destination_url']
  },
  REFERRAL_DISMISSED: {
    event: 'quiz_referral_dismissed',
    properties: ['urgency']
  },
  RESULTS_VIEWED_AFTER_PROMINENT: {
    event: 'quiz_results_viewed_after_referral',
    properties: ['continued_to_results']
  }
};
```

---

*This document is a living guide. Update as decisions are made and learnings emerge.*

**Last Updated**: February 2026
**Version**: 1.2 (Added detailed specs: Scoring Algorithm, Question Mapping, Diet Profiles, Referral UX)
