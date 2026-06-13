---
name: foodpulse-house-style
description: FoodPulse brand house style — voice, four-pillar taxonomy, canonical article skeleton, and editorial non-negotiables. Use BEFORE drafting, editing, repurposing, or auditing any FoodPulse article, newsletter, social caption, video script, or coaching page so output matches the brand's editorial voice and conforms to the live Sanity article schema.
---

# FoodPulse House Style

The keystone skill for every FoodPulse content task. Encodes voice, structure, taxonomy, and the brand's non-negotiables. Every other production skill (`[[foodpulse-deep-research-article]]`, `[[foodpulse-illustration-design]]`, `[[foodpulse-article-to-youtube]]`, `[[foodpulse-newsletter]]`, `[[foodpulse-social-atomize]]`) references this one. The gate before any article ships is `[[foodpulse-citation-check]]`.

## When to use

Use this skill whenever the task involves producing or evaluating FoodPulse-branded content:

- Drafting a new article, newsletter, social caption, or video script.
- Editing or rewriting existing copy.
- Auditing a draft for brand alignment.
- Repurposing one piece across channels.
- Onboarding a contributor or contractor.

If the work touches FoodPulse public-facing text, load this skill first. Do not skip even for "small" edits — voice drift compounds.

## The five non-negotiables

Full reasoning in [references/non-negotiables.md](references/non-negotiables.md). The bar to publish:

1. **We don't tell readers what to eat.** We help them make sense of food and nutrition so they can decide for themselves.
2. **Cite everything.** Prefer primary research (peer-reviewed journals, WHO, Health Canada, NIH, Statistics Canada). Say so when evidence is limited or contested.
3. **No fear, urgency, alarmism, or clickbait.** Lead with the insight, never the tease.
4. **No promotion** of specific products, supplements, fad diets, or quick fixes.
5. **Respect context.** Health, culture, finances, time, preferences, and household all matter. One-size-fits-all answers are off-brand.

## The Four Voice Principles

Full examples and "tells" checklist in [references/voice-guide.md](references/voice-guide.md). At a glance:

| Principle | Means |
|---|---|
| **Informed, not academic** | Lead with the real finding. Acknowledge the noise. Never simplify to the point of inaccuracy. |
| **Practical, not preachy** | Respect that readers have real lives. Advice is actionable and non-judgmental. |
| **Direct, not blunt** | Call out misinformation clearly, but without condescension. The reader is smart. |
| **Curious, not anxious** | Lean into nutrition science's complexity without generating fear or confusion. |

## Point of view

- **"You"** — direct address to the reader. Welcome throughout.
- **"We"** — brand voice plural. The default for editorial commentary, framing, and conclusions.
- **"I"** — the founder's first person. Allowed **only** for lived, attributed anecdotes (e.g. doctoral research experience, personal food-environment story). Never invented. The hook of a long-form article is the typical place; the rest of the article returns to "we".

Newsletter has more first-person latitude (see future `[[foodpulse-newsletter]]` skill). Glossary and tools stay neutral — no first person.

## The four content pillars

Every article maps to **exactly one** pillar. Canonical slugs come from [foodpulse/src/content/categories.ts](../../../foodpulse/src/content/categories.ts) — never invent new ones, never tag multi-pillar. Decision tree and edge cases in [references/pillar-taxonomy.md](references/pillar-taxonomy.md).

| Slug | Pillar | Scope |
|---|---|---|
| `food-and-wellbeing` | Food and Wellbeing | Nutrition science, dietary patterns, health impacts (gut health, disease prevention, mental health). |
| `kitchen-and-cooking` | Kitchen and Cooking | Recipes, techniques, meal prep, kitchen skills. Recipe articles set `isRecipe: true`. |
| `food-literacy` | Food Literacy | Labels, claims, ingredients, additives, consumer education, informed-choice frameworks. |
| `food-systems` | Food Systems | Supply chains, sustainability, agriculture, policy, food environments. |

## Brand mode (Editorial vs Scientific)

From the [Brand Guide](../../../Brand%20visual%20guide.docx%20(1).pdf) v1.0. Pick **once per page** — never mix modes within an article.

- **Editorial mode (default).** Articles, story-driven pieces, recipes, About, coaching, newsletter, social. Deep Green + Teal Green + Support Green + Honey Gold CTAs. Burnt Orange very sparingly, photography only.
- **Scientific mode.** Articles that are data-, citation-, or calculator-heavy; glossary entries; tool pages. Deep Green + Trust Blue + Cool Sage. Honey Gold CTAs unchanged. **Burnt Orange excluded entirely.**

Most Food and Wellbeing and Food Literacy articles lean Scientific. Most Kitchen and Cooking and Food Systems pieces lean Editorial. Default to Editorial when unsure; promote to Scientific if the article carries ≥4 inline citations or any chart/calculator.

## Canonical article skeleton

Full Portable Text mapping and length targets in [references/article-structure.md](references/article-structure.md). The spine:

1. **Hook** — 120–180 words. A reader experience or founder anecdote tied to the topic. Establishes stakes without alarm.
2. **Definition / framing** — 80–150 words. Plain-language definition of the central concept. No jargon without a one-line explanation.
3. **Question-style H2 subheads** — 250–400 words each. Pose the reader's likely question; answer with evidence + nuance. Insert inline infographics, callouts, and pull quotes as the section warrants.
4. **Numbered practical takeaways** — 3–7 items. Actionable, non-prescriptive ("Try…" not "You must…").
5. **Sources & References** — every claim that needs evidence has a source object (title, url, author, year). Gated by `[[foodpulse-citation-check]]` before publish.
6. **FAQ** — 3–6 question/answer pairs. Each Q is something a reader actually asks; each A is 40–120 words. Powers rich snippets.
7. **Tags, author, related articles** — schema-driven metadata.

Visuals: 1 cover image (1920×1080) + 2–4 inline infographics (portrait 800×1200 or landscape 1200×1000). Briefs come from `[[foodpulse-illustration-design]]`; this skill defines where they slot in.

Optional closer: a soft coaching CTA (no hard sell, no scarcity language) when the topic supports it.

## Sanity field checklist

Every field, its validation rule, and how to fill it in [references/sanity-schema-map.md](references/sanity-schema-map.md). The publish gate:

- `title` (≤100 chars), `slug` (≤96, lowercase-hyphenated), `excerpt` (100–160 chars).
- `image` with `alt` (required — accessibility + SEO; never "image of…").
- `body` Portable Text using only the block types the schema accepts (`normal`, `h2`, `h3`, `h4`, `blockquote`; inline images with alt+caption; `callout` with type `info|warning|tip`; `embed`).
- `sources` array (title, url, author, year).
- `category` reference (exactly one of the 4 pillar slugs).
- `author` reference, `tags`, `publishedAt`.
- `seo` object (metaTitle, metaDescription, keywords) — see [references/seo-metadata.md](references/seo-metadata.md).
- `faq` items.
- `reviewedAt` stamped after each editorial review. Quarterly review cadence per brand standards.
- `isRecipe: true` + `recipeData` block when the article is a recipe.

Callout types (`info` / `warning` / `tip`) and embed types (LinkedIn, X, YouTube, Instagram, Custom HTML) — usage rules in [references/callouts-and-embeds.md](references/callouts-and-embeds.md).

## Hand-off to other skills

This skill defines the rules; downstream skills produce or check the work.

- **`[[foodpulse-citation-check]]`** — must run on every article's Sources block and any factual claim before publish. Hard gate.
- **`[[foodpulse-deep-research-article]]`** — produces drafts that conform to this skill. Calls this one for voice + structure; calls citation-check before hand-off.
- **`[[foodpulse-illustration-design]]`** — owns cover + infographic briefs. Reads `references/article-structure.md` to know where visuals slot in.
- **`[[foodpulse-article-to-youtube]]`** — adapts the skeleton to spoken-word; reuses voice principles and the citation-check gate.
- **`[[foodpulse-newsletter]]`** — assembles the monthly issue from published articles; loosens POV to first person where appropriate.
- **`[[foodpulse-social-atomize]]`** — extracts platform-native posts. Inherits the no-clickbait rule from `references/non-negotiables.md`.

## Human-judgment boundary

AI gathers, drafts, designs, packages. **Etornam C. Tsyawo owns interpretation, health framing, and final sign-off.** This boundary is not a limitation to engineer away — it is the source of trust for an evidence-based brand whose authority signals (E-E-A-T) depend on a named, credentialed researcher standing behind every claim. The skill produces draft-quality output; a human accepts it before publish.

Never publish without:
- A human reading the full draft.
- Citation-check passing.
- The `reviewedAt` date being stamped.

## Paste-in template

For a fresh article, start from [assets/article-skeleton.md](assets/article-skeleton.md) and fill in. The template carries every schema field as a TODO and stubs the skeleton sections with prompts.
