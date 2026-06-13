# Non-negotiables

The five rules that protect FoodPulse's reason for existing. Every other guideline in this skill is negotiable in edge cases; these five are not. They are also the rules the brand's E-E-A-T signals depend on — a credentialed food-systems researcher's trust collapses the first time the brand prescribes a diet, hides a citation, or runs a clickbait headline.

---

## 1. We don't tell readers what to eat

**The rule.** FoodPulse helps readers understand food and nutrition so they can make their own decisions. We do not prescribe diets, meal plans, supplements, or specific foods.

**Why it exists.** This is the brand's founding line — see the "Start Here" doc: *"We don't tell you what to eat. We help you make sense of food and nutrition."* The founder is a food-systems doctoral researcher, not a clinical dietitian, and the brand has explicitly distinguished itself from clinical dietetics in its coaching copy. Prescriptive advice would cross a credential boundary and dilute the value proposition.

**How to apply.**
- Frame guidance as *frameworks*, *trade-offs*, and *questions to ask*, not directives.
- "Most people find that…" / "One approach is to…" / "If your context is X, you might consider Y." ✓
- "You must…" / "Avoid this food." / "Eat 5 servings of…" / "The best diet is…" ✗
- Recipes are fine; recipe articles describe how to cook a dish, not a regimen.
- Coaching CTAs are soft: invite readers to think alongside the founder, not to follow rules.

**Edge case — when the evidence is unambiguous.** Even when consensus is overwhelming (e.g. trans fats and cardiovascular disease), state the evidence, not the command. "Health Canada and the WHO restrict industrial trans fats because of consistent cardiovascular evidence" — not "stop eating trans fats."

---

## 2. Cite everything

**The rule.** Every factual claim, statistic, or study reference has a source in the article's Sources & References block. Prefer primary research (peer-reviewed journals) and authoritative institutions (WHO, Health Canada, NIH, Statistics Canada, CFIA). When evidence is limited, contested, or emerging, say so explicitly.

**Why it exists.** AI citation hallucination is the documented largest risk in YMYL content — frontier models hallucinate 14–95% of citations in independent benchmarks (GhostCite, 2026), and only ~51% of generative-search sentences are fully supported by the sources they cite (Liu et al. 2023). One fabricated citation in a food-and-health article destroys the brand's reason for existing. The Sanity schema even encodes this with a required `sources` field and a `reviewedAt` field for the quarterly review cadence.

**How to apply.**
- Every quantitative claim has a citation. ("46% of Canadian daily energy from ultra-processed foods" → Statistics Canada, Health Reports, Nov 2020.)
- Every study reference includes title, URL (to DOI or canonical source), author or institution, and year — matching the Sanity `sources` schema.
- Tertiary sources (news articles summarizing studies) are acceptable as a *starting point* only; the article must link to the primary source.
- Mark emerging evidence: "Early research suggests…", "Evidence is still developing on…", "This is contested — some studies show X, others Y."
- Hard gate: `[[foodpulse-citation-check]]` runs before publish. Do not skip.

**Never do.**
- Invent a study, author, journal, or DOI.
- Cite "research shows…" without naming the research.
- Round or rephrase a statistic in a way that changes its meaning.
- Pull a number from social media without tracing it to the primary source.

---

## 3. No fear, urgency, alarmism, or clickbait

**The rule.** Lead with the insight, never the tease. Even when the topic warrants concern (e.g. ultra-processed food intake, food fraud), frame measurably and matter-of-factly. No "shocking truths," no "what they don't want you to know," no countdown urgency.

**Why it exists.** From the Brand Guide's Voice & Content Do/Don't table: *"Don't use fear, urgency, or alarmism — even when the topic warrants concern. Don't use clickbait headline structures ('You won't believe…')."* Fear-based food content is a saturated, untrustworthy market segment; FoodPulse's defensible position is to be the calm, evidence-based voice in it.

**How to apply.**
- Headlines deliver the finding, not the cliffhanger. "Why 46% of Canadian calories now come from ultra-processed foods" ✓ — "You won't believe what's really in your food" ✗.
- Caution becomes context. "Industrial trans fats are now restricted in Canada — here's why and what changed" ✓ — "These dangerous fats are still hiding in your kitchen" ✗.
- No countdown framing in CTAs ("Only 2 spots left this month" is the *factual* version; do not manufacture scarcity).
- No "must read" / "essential" / "everything you need to know" inflations.

---

## 4. No promotion

**The rule.** FoodPulse does not promote specific products, supplements, fad diets, or quick fixes. The brand sells coaching and digital products; those are the only commercial promotions allowed, and they are soft, contextual, and non-prescriptive.

**Why it exists.** Brand Guide explicit Don't: *"Use the brand to promote specific products or supplements."* Promotion of products is the single fastest way to lose the credential-based trust the brand depends on. The coaching practice succeeds *because* the editorial layer doesn't sell.

**How to apply.**
- Generic categories are fine; specific brands are not. "A vacuum sealer can extend produce shelf life" ✓ — "Brand X's vacuum sealer is the best" ✗.
- Supplements: discuss the evidence on the *nutrient* if relevant; do not recommend a product, brand, or dosage.
- Fad-diet names (keto, carnivore, lectin-free, alkaline, "detox") may appear in *analysis* but not in *recommendation*. Frame as "what the evidence shows about X" not "here's how to start X."
- Coaching CTAs are allowed but soft: name the coaching tier, link to it, do not pressure.
- Affiliate links, sponsorships, and partnerships, if introduced later, must be disclosed inline (FTC/Health Canada style).

---

## 5. Respect context

**The rule.** Health, culture, finances, time, preferences, and household composition all matter. FoodPulse content acknowledges that the right answer depends on the reader's circumstances. One-size-fits-all advice is off-brand.

**Why it exists.** From the "Start Here" doc: *"Health, culture, finances, time, preferences and more, all these matter. We take this into consideration to ensure our advice is helpful to you."* This is the brand's positional difference vs. both "oversimplified" and "overwhelm" food platforms. It is also what the coaching practice is built around (anti-template, context-sensitive).

**How to apply.**
- Include cost and time considerations where relevant ("This works at a higher grocery budget; here's a $X version").
- Name cultural variants instead of defaulting to a Western/North American frame ("West African leafy greens like ugu and ewedu", not just "spinach and kale").
- Acknowledge access barriers (food deserts, kitchen equipment, dietary restrictions) when offering practical takeaways.
- Avoid implicit assumptions about household ("when you cook for the family" is fine if the article frames it; do not assume).
- Be explicit when a recommendation is conditional: "If you have CKD, this guidance changes — speak to your nephrology team."

**Edge case — medical conditions.** Any topic that intersects with diagnosed medical conditions (diabetes, kidney disease, IBD, pregnancy) gets a "speak to your clinician" line. Not a disclaimer dump — a specific, respectful hand-off.

---

## How these tie together at publish time

Before any article ships:

1. Read the draft front-to-back asking *"does this prescribe?"* If yes, soften to framework language.
2. Every statistic and study reference traces to a primary source in the `sources` array.
3. Headline and excerpt deliver the insight, not the tease.
4. No brand or product name appears as a recommendation.
5. The article acknowledges that context affects what the reader does with this information.

Then run `[[foodpulse-citation-check]]`. Then a human reviews. Then `reviewedAt` is stamped.
