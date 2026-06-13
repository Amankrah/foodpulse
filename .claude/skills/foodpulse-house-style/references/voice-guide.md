# Voice guide

The Four Voice Principles, expanded with concrete rewrites and a "tells" checklist. Source of truth: Brand Guide v1.0 (2026), Section 04. Examples below mark the brand's own lines as "lifted from Brand Guide" — those are canonical. The other before/afters are synthetic v1; replace with real article excerpts once the founder confirms three favorites.

---

## Humanizer rules — apply WHILE drafting (read first)

Every FoodPulse draft also runs through `[[foodpulse-humanizer]]` as a separate gate before publish. That skill catches AI tells after the fact. But the cheaper option is not to produce them in the first place. While drafting, hold these rules:

### Hard zero on em-dashes

**No em-dashes (`—`) or en-dashes (`–`) anywhere in published prose** — body, excerpt, FAQ answers, OG meta description, anything a reader sees. Use periods, commas, colons, parentheses, or restructure the sentence. This is non-negotiable. The humanizer pass will catch any that slip through, but it's faster to write without them.

Exempt regions where em-dashes are fine: HTML comments, illustration brief text, frontmatter TODO placeholders, the verification-trail metadata block, notes for editorial review. None of those reach the published article.

### Six tells to avoid while writing

These show up in AI-generated drafts more than in human writing. Catch them at draft time:

1. **Authority tropes.** "The honest answer is…", "The useful question is…", "At its core…", "What really matters is…". Just make the point.
2. **Section-internal announcements.** "Two honest takeaways.", "A few specific moves that work:", "Here's what you need to know.", "Let's dive in.". Start with the content.
3. **Aphorism formulas.** "It's information, not a verdict.", "X is the Y of Z.". Rewrite as a specific statement. Carve-out: the brand's actual non-negotiables ("We don't tell you what to eat. We help you make sense of food.") have this shape and are load-bearing. Leave those. Strip the lookalikes.
4. **Rule-of-three stacking.** Forced triplets like "your overall pattern, your context, and what you're swapping" when the underlying content is one idea or four. Lists of regulated nutrients ("saturated fat, sugars, and sodium") are fine because the three is given by the regulation. Stylistic triplets aren't.
5. **AI vocabulary.** `delve`, `crucial`, `pivotal`, `underscore`, `showcase`, `tapestry`, `testament`, `garner`, `interplay`, `landscape` (as metaphor), `navigate` (as metaphor), `actually` (as filler), `genuinely` (as filler), `seamlessly`, `holistic`, `robust`. Replace with simpler.
6. **Sentence-rhythm uniformity.** Three medium-long sentences in a row need a short one. The "Sentence rhythm" rule under Style Conventions below already says this. Hold it.

### Pointer to the full ruleset

Full 33-pattern detection rules and rewrites: [.claude/skills/foodpulse-humanizer/references/patterns.md](../../foodpulse-humanizer/references/patterns.md). FoodPulse-specific tells observed in our own drafts: [.claude/skills/foodpulse-humanizer/references/foodpulse-tells.md](../../foodpulse-humanizer/references/foodpulse-tells.md).

---

## Principle 1 — Informed, not academic

> "The research on seed oils is more nuanced than social media suggests, here's what the evidence shows." *(lifted from Brand Guide)*

**Means.** Lead with the real finding. Acknowledge the noise. Never simplify to the point of inaccuracy.

### Before / after

**❌ Too academic.**
> A meta-analysis of 17 RCTs (Hooper et al., 2020; n = 113,206) demonstrated a statistically significant reduction in CHD events (RR 0.81, 95% CI 0.70–0.95, p < 0.01) when SFA was substituted with PUFA, contingent on isocaloric exchange and baseline LDL-C parameters.

**✓ Informed but accessible.**
> When people swap saturated fat for unsaturated fat (the kind in olive oil, nuts, and most seed oils), heart-disease events drop. The biggest review of the trials puts the effect around 19% lower risk — meaningful, but only when the calories actually get replaced rather than added.

**❌ Too simplified to be true.**
> Seed oils are perfectly safe. Eat as much as you want.

**✓ Informed but accessible.**
> Most refined seed oils used in cooking are not the villain social media makes them out to be — and they're not a free pass either. What matters most is what you're replacing them with, and how often you're frying things at high heat for long stretches.

### "Tells" that signal academic drift

- p-values, confidence intervals, or odds ratios in body copy (move to the source caption or a callout).
- Latin abbreviations (e.g., *i.e.*, *cf.*) — use plain English.
- Three-syllable words where two-syllable words work.
- More than one clause stacked before the main verb.

---

## Principle 2 — Practical, not preachy

> "You don't need to overhaul your diet. Start with one thing you'll actually do." *(lifted from Brand Guide)*

**Means.** Respect that readers have real lives. Advice is actionable and non-judgmental.

### Before / after

**❌ Preachy.**
> If you truly care about your health, you must eliminate processed foods from your home entirely. Anything less is a half-measure.

**✓ Practical.**
> A useful starting point: pick the two or three packaged foods you eat most often, and look at what they actually contain. You don't have to clear the pantry to make better calls at the grocery store.

**❌ Preachy.**
> Skipping breakfast is one of the worst things you can do to your body.

**✓ Practical.**
> Whether breakfast helps you depends on your day, your hunger pattern, and what you'd otherwise be eating. Most evidence suggests the *quality* of what you eat in the morning matters more than the fact that you ate.

### "Tells" that signal preaching

- "You must", "you should", "you need to", "the only way", "always", "never".
- Implied judgment of past choices ("if you actually cared about…", "stop ignoring…").
- "Quick" / "easy" / "simple" overused — they read as condescension on nuanced topics.
- Imperatives in the headline of a non-recipe article ("Stop eating X").

---

## Principle 3 — Direct, not blunt

> "Most detox products don't do what they claim. Your liver already handles this." *(lifted from Brand Guide)*

**Means.** Call out misinformation clearly, but without condescension. The reader is smart.

### Before / after

**❌ Blunt / condescending.**
> Anyone who buys "alkaline water" has been scammed. Your blood pH doesn't work that way and you should know better.

**✓ Direct.**
> The "alkaline water" pitch — that drinking it changes your blood pH — doesn't match how the body actually works. Your kidneys and lungs hold blood pH in a tight range regardless of what you drink. The water itself is fine; the claim around it is the part to skip.

**❌ Blunt.**
> Cleanses are a scam.

**✓ Direct.**
> Most commercial "cleanses" promise something your liver and kidneys already do continuously. The short-term changes people notice usually come from eating differently for a few days, not from the cleanse itself.

### "Tells" that signal bluntness

- "Obviously", "clearly", "as everyone knows" — assume your reader doesn't.
- Sarcasm or scare quotes around lay terms.
- Naming an audience that's "wrong" instead of naming the *claim* that's wrong.
- "Just" used dismissively ("it's just marketing").

---

## Principle 4 — Curious, not anxious

> "We're still learning a lot about the gut microbiome and that's actually exciting." *(lifted from Brand Guide)*

**Means.** Lean into the complexity of nutrition science without generating fear or confusion.

### Before / after

**❌ Anxious.**
> Your gut microbiome could be destroyed by the wrong foods — and you might not even know it. The damage may be irreversible.

**✓ Curious.**
> Researchers are still mapping which foods reliably reshape the gut microbiome and how durable those changes are. What we do know: fibre variety seems to matter more than any single "superfood," and the microbiome bounces back from a lot more than we used to think.

**❌ Anxious.**
> Microplastics are everywhere in your food, and the consequences are terrifying.

**✓ Curious.**
> Microplastics have been measured in a wide range of foods and packaging. The honest answer on long-term human health is: the data is still developing. Here's what's known so far, and what researchers are watching next.

### "Tells" that signal anxiety

- "Destroyed", "ruined", "irreversible", "terrifying", "shocking".
- Questions that imply doom ("Is your gut already damaged?").
- Open-loops without resolution ("…and you won't believe what they found.").
- Worst-case framing where evidence supports a range.

---

## Style conventions

These apply across every voice principle.

**Person.**
- "You" — direct address. Use freely.
- "We" — brand plural. Default for editorial commentary.
- "I" — founder only, for lived anecdotes, always attributed (e.g. "When I moved from a town where fresh produce was the default…"). Never invented.

**Sentence rhythm.**
- Mix short and long. A 6-word sentence after two 25-word sentences resets the reader's attention.
- Average sentence length under 22 words. Cut, don't comma-chain.
- One idea per paragraph. Paragraphs cap at ~4 lines on desktop.

**Contractions.** Encouraged ("don't", "we're", "it's") — they make the brand voice warm. Exception: in a Sources & References footer, formal citation language.

**Jargon.** No jargon without a one-line definition. "Ultra-processed foods (the NOVA Group 4 category — industrial formulations with ingredients you wouldn't keep in a home kitchen)" is fine; "NOVA-4 UPFs" alone is not.

**Numbers.** Spell out one through nine; numerals from 10 up. Percentages and stats always numerals ("46%", not "forty-six percent"). Round to one decimal max unless the precision matters.

**Headings.** Question-style ("Why does food environment matter more than willpower?") or insight-style ("Food environment outweighs willpower in most studies"). Never click-bait ("The truth about willpower will shock you").

**Pull quotes.** Reserved for research findings or the founder's most distinctive lines. Format follows Brand Guide: Light Italic 18px with Honey Gold left border (UI-side; in markdown, a `blockquote` block).

**Tone by content type** (from Brand Guide §04):

| Content type | Tone | Register |
|---|---|---|
| Research article | Authoritative, measured, precise | "Studies show…" / "The evidence suggests…" / "According to…" |
| Practical tips | Warm, direct, encouraging | "Here's how to…" / "A simple rule…" / "Most people find that…" |
| Glossary | Clear, concise, neutral | Plain language; no jargon without definition. |
| Newsletter | Conversational, curious, personal | First person allowed. "This week I noticed…" / "Worth reading:" |
| Social caption | Punchy, insightful, never clickbait | Lead with the insight. Never "You won't believe…" |

---

## Quick "off-brand" smell test

If a draft contains any of these, stop and rewrite:

- Imperatives telling the reader what to eat or not eat.
- "Detox", "cleanse", "superfood", "miracle", "secret", "shocking" — unless quoting a claim being analyzed.
- "Doctors hate this", "what they don't want you to know", "the truth about X".
- A statistic without a source.
- A brand or product recommendation.
- A paragraph longer than 4 lines on desktop.
- ALL CAPS for emphasis (reserved for Section Header / nav eyebrow per Brand Guide).
- Em-dash chains that hide the verb three clauses in.

---

## When to load the citation-check skill

Voice and structure are this skill's job. The moment the draft has a factual claim, hand off to `[[foodpulse-citation-check]]` before publish. Do not try to verify citations inside the voice pass — it conflates two different judgment loops.
