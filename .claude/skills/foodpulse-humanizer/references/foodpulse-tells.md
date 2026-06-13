# FoodPulse-specific tells

The 33 generic humanizer patterns in [patterns.md](patterns.md) catch most things. This file captures the patterns that show up **specifically** in FoodPulse drafts, plus the carve-outs that protect the brand voice from over-correction. Add to this file every time you catch a new FoodPulse-specific pattern in a draft.

The hierarchy when generic rules conflict with FoodPulse voice: **FoodPulse brand voice wins**. The Four Voice Principles in [.claude/skills/foodpulse-house-style/references/voice-guide.md](../../foodpulse-house-style/references/voice-guide.md) are the non-negotiables.

---

## Observed in FoodPulse drafts

### 1. The "It's X, not Y" aphorism — the strongest FoodPulse-shaped tell

The brand's own "We don't tell you what to eat. We help you make sense of food and nutrition." (Start Here doc) **legitimately** uses this construction — it's the brand's positioning. AI-generated drafts overuse the structure to mimic it.

**Real brand line, leave alone:** "We don't tell you what to eat. We help you make sense of food."

**Generated lookalike, strip:** "It's information, not a verdict." / "It's a tool, not a rule." / "It's a starting point, not an answer." / "It's a signal, not a sentence." Any of these on a per-article basis. They feel profound for half a sentence and obscure the actual point.

**How to rewrite:** state the specific point. "The label flags one nutrient. The food has many." instead of "It's information about one nutrient, not a verdict on the food."

### 2. The "honest answer" / "useful question" trope

These showed up twice in the FOP-symbol draft. The pattern:

> "The honest answer is [X]."
> "The useful question is [Y]."

Both signal authority that isn't backed by anything in the surrounding text. Cut the trope; lead with X or Y directly.

**Before:** "The honest answer is that it is neither. It's information."
**After:** "It is neither. It's information."

### 3. The numbered-takeaway announcement

**Before:** "Two honest takeaways. First, X. Second, Y."
**After:** "X. Y." Or integrate both into the surrounding prose. Numbered-takeaways sections legitimately use numbered lists — but the section heading is "Practical takeaways", not "Here are two takeaways".

### 4. The "What this means" connector

**Before:** "What this means for you is that…"
**After:** "For you, that means…" or just state the implication directly.

This phrase chains together findings and reader-action sections in a way that feels mechanical after the second use.

### 5. The "in 2026" timestamp filler

When the article is *about* something in 2026, naming the year matters. When it's not, "in 2026" is filler that signals "I am a language model producing seasonal content."

**Strip when:** the topic isn't year-specific.
**Keep when:** the topic is year-specific (e.g. the FOP rule is 2026-specific because that's when enforcement began).

### 6. The Canadian-defensive parenthetical

**Before:** "Statistics Canada (Canada's national statistical agency) reports…"
**After:** "Statistics Canada reports…"

FoodPulse readers are Canadian by default. We don't need to define Canadian institutions to them.

**Carve-out:** when an article is explicitly aimed at a non-Canadian audience (e.g. food-systems articles citing Canadian data for an international comparison), the parenthetical is fine.

---

## FoodPulse carve-outs (do NOT strip these)

These look like AI tells under generic patterns. They're not. Leave them.

### Carve-out 1 — The Four Voice Principles structure

The Four Voice Principles ("Informed, not academic" / "Practical, not preachy" / "Direct, not blunt" / "Curious, not anxious") have the "X, not Y" shape of Pattern 32 aphorisms. They are brand load-bearing. Same for the Four Pillars (Food and Wellbeing, Kitchen and Cooking, Food Literacy, Food Systems) and the five non-negotiables from [.claude/skills/foodpulse-house-style/references/non-negotiables.md](../../foodpulse-house-style/references/non-negotiables.md). Never strip these even if they're quoted in an article.

### Carve-out 2 — Lists of regulated nutrients

"Saturated fat, sugars, and sodium" looks like a rule-of-three (Pattern 10) but it's the actual scope of the Canadian FOP regulation. Same for "fat, protein, carbohydrates" and other regulated-categorically-three lists. The three is given by the regulation, not by stylistic choice.

### Carve-out 3 — Recipe step lists

`isRecipe: true` articles have step lists that are deliberately curt ("Add 1 tbsp olive oil. Heat for 2 minutes. Season."). That's a recipe convention, not Pattern 31 (manufactured punchlines). Leave the step structure intact.

### Carve-out 4 — Founder POV anecdotes

The brand allows founder "I" in attributed lived anecdotes (per [.claude/skills/foodpulse-house-style/references/voice-guide.md](../../foodpulse-house-style/references/voice-guide.md) Point of View section). If a founder-POV passage has em-dashes, strip the em-dashes per Pattern 14. Don't strip the "I" or the personal voice.

### Carve-out 5 — Evidence-strength language

Words and phrases governed by [.claude/skills/foodpulse-citation-check/references/evidence-strength.md](../../foodpulse-citation-check/references/evidence-strength.md):

- "An early study found…" / "One trial reported…" — `preliminary`
- "Emerging evidence suggests…" / "Early research points to…" — `emerging`
- "Evidence is mixed…" / "Researchers disagree on…" — `contested`
- "Studies consistently show…" / "Consensus is that…" — `established`

These are calibration, not AI tells. The humanizer does not change them. If a phrase like "Studies consistently show…" *is* on top of weak evidence, that's a citation-check finding (Phase 7 of `[[foodpulse-deep-research-article]]`), not a humanizer finding.

### Carve-out 6 — Callouts

`info` / `warning` / `tip` callouts in articles use ℹ️ / ⚠️ / 💡 emoji and short bolded labels per [.claude/skills/foodpulse-house-style/references/callouts-and-embeds.md](../../foodpulse-house-style/references/callouts-and-embeds.md). These look like Pattern 18 (emojis) + Pattern 16 (inline-header lists). They aren't. Leave them.

### Carve-out 7 — The "Sources & References" section heading

This is a Sanity-schema-aligned section. Same for "Practical takeaways", "FAQ", and other named sections from [.claude/skills/foodpulse-house-style/references/article-structure.md](../../foodpulse-house-style/references/article-structure.md). Don't restructure them.

---

## When you find a new tell

If a future draft surfaces a pattern not covered here:

1. Add it under "Observed in FoodPulse drafts" with a before/after and a one-line note on how to spot it.
2. If it conflicts with a generic rule in [patterns.md](patterns.md), add a carve-out below.
3. Note the draft it appeared in.

This file is part of the brand's living voice infrastructure.

---

## Heuristics for fast scanning

When scanning a FoodPulse draft, check in this order. Each catches different categories.

1. **Em-dash count.** Hard zero in body prose. Run `grep -c '—'` mentally as you read.
2. **"It's X, not Y" sentences.** Are any of them brand non-negotiables? If not, rewrite.
3. **"The honest answer" / "the useful question" / "the real question" openers.** Strip.
4. **Section-internal announcements** ("Two takeaways…", "A few moves…", "Three things to know…"). Lead with the content.
5. **Adjective stacks** in praise ("vibrant, rich, dynamic"). Make specific.
6. **Sentence rhythm.** Three medium-long sentences in a row need at least one short one. The voice-guide already enforces this; check that drafting actually did.
7. **Inline citation links.** Verify all `[text](url)` markdown survived restructuring. Phase 7 will catch missing ones, but it's faster to catch them here.

If the draft passes all seven, the humanizer pass is done.
