# SEO & metadata conventions

How to fill the SEO-relevant fields on a FoodPulse article so the piece ranks, surfaces well in social shares, and lights up rich snippets. Tied directly to the schema fields documented in [sanity-schema-map.md](sanity-schema-map.md).

---

## Title patterns

Two distinct title fields per article:

- `title` — the on-page H1 / article headline. Voice rules apply (see [voice-guide.md](voice-guide.md)).
- `seo.metaTitle` — the `<title>` tag and Google SERP headline. SEO rules apply.

### `seo.metaTitle` pattern

```
<Primary keyword phrase> | <Optional modifier> | FoodPulse
```

- Max 60 characters total (Google truncates around 60).
- Primary keyword in the first 40 characters.
- "FoodPulse" suffix is non-negotiable — brand recognition compounds.
- Optional modifier examples: a year ("2026"), a region ("Canada"), a benefit ("Evidence-Based Guide").

Examples:

- ✓ `Reading Nutrition Labels: Canadian Guide | FoodPulse` (51 chars)
- ✓ `Front-of-Package Symbols Explained | FoodPulse` (46 chars)
- ✓ `Ultra-Processed Foods and Your Gut | FoodPulse` (46 chars)
- ✗ `The Ultimate Comprehensive Guide to Reading Nutrition Labels in 2026 | FoodPulse` (80 chars — truncated)
- ✗ `Everything You Need to Know About UPFs | FoodPulse` (clickbait inflation)

### `title` (on-page) vs `metaTitle` (SEO)

They can diverge in *length* and *order* but not in *substance*. The on-page title can be longer or more editorial; the metaTitle is more keyword-tight.

| `title` (on-page) | `seo.metaTitle` |
|---|---|
| "Why your food environment outweighs willpower" | "Food Environment and Diet Quality \| FoodPulse" |
| "What the new 'high in' symbol means at the grocery store" | "Canadian Front-of-Package Symbol Guide \| FoodPulse" |

---

## Meta description

`seo.metaDescription` is the SERP snippet under the title and a default for social shares.

- Max 160 characters (schema-enforced).
- 140–160 chars is the sweet spot — fills the SERP space.
- Lead with the *finding* / *insight*, not a question.
- Include the primary keyword in the first 120 chars.
- Active voice. No "Discover…" / "Learn how…" openings.
- Often distinct from `excerpt`, even though both fields are 100–160 chars — `excerpt` is for listing pages and reads more editorially; meta-description is for SERPs and reads more declaratively.

Examples (155-char range):

> ✓ "Canada's new front-of-package 'high in' symbol flags foods over 15% daily value for saturated fat, sugars, or sodium. Here's how to read it." (140 chars)

> ✗ "Discover everything you need to know about Canada's new food labels in our comprehensive guide!" (clickbait, no information density)

If `seo.metaDescription` is empty, the renderer should fall back to `excerpt` — but always set it explicitly. The 60 seconds it takes saves a meaningful chunk of organic CTR.

---

## Slug rules

From the schema slugify function:

```js
input
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .slice(0, 96)
```

Conventions on top of the rule:

- Strip stop words ("the", "and", "a", "an", "to", "of") unless they change meaning.
- 3–6 words is the readable sweet spot.
- Include the primary keyword.
- Slugs are permanent. Changing one without a redirect breaks every external link and citation.

Examples:

| `title` | Good slug |
|---|---|
| Why your food environment outweighs willpower | `food-environment-and-diet-quality` |
| What the new "high in" symbol means at the grocery store | `canadian-high-in-symbol-guide` |
| Ultra-processed foods and the Canadian diet | `ultra-processed-foods-canadian-diet` |
| Roasted okra with cumin (recipe) | `roasted-okra-with-cumin` |

---

## Alt text conventions

Every image (`image.alt`, inline `image.alt` blocks, `ogImage.alt`) needs alt text. The schema enforces it for the cover image; the skill enforces it everywhere.

Rules:

- **Describe content + function.** What the image shows + why it's there.
- **Never start with "image of" or "picture of"** — screen readers already announce it's an image.
- **Concrete over vague.** "Hand holding a Canadian food package with the new black-and-white 'high in sugars' symbol" — not "food packaging".
- **Include data when relevant.** For data viz: "Bar chart showing Canadian ultra-processed food intake at 46% of daily calories in 2015, down from 48% in 2004 (Statistics Canada)" — alt text doubles as a source citation for screen-reader users.
- **Length.** 50–125 characters is the sweet spot. Above 200 chars, move detail into the `caption` field.
- **Decorative images.** Rare in articles. If used, leave alt as a single space; do not invent decoration alt text.

---

## OG image (`ogImage`)

- 1200×630 (standard Open Graph / Twitter Card spec).
- Optional — falls back to the featured `image` (1920×1080) if not set, which crops awkwardly. Always set explicitly for articles that will be promoted.
- Best practice: headline burnt into the image in Montserrat ExtraBold, plus the FoodPulse mark in a corner. Brand Guide colors apply (Editorial mode green/gold for editorial articles; Scientific mode green/blue for data-heavy articles).
- `ogImage.alt` — same alt-text conventions as above.

The illustration skill (`[[foodpulse-illustration-design]]`) produces the OG image alongside the cover.

---

## Keywords

`seo.keywords` is a starting set, not a stuffing target.

**Process.**

1. Start from the pillar default in [foodpulse/src/content/categories.ts](../../../foodpulse/src/content/categories.ts).
2. Add 2–4 article-specific keywords (the primary phrase + close variants + the long-tail).
3. Trim to 6–10 total.

Examples:

**Article:** "Reading the new Canadian front-of-package symbol"
**Pillar default (Food Literacy):** `food labels`, `nutrition labels`, `food literacy`, `consumer education`, `food choices`, `reading labels`, `nutrition claims`.
**Add:** `Canadian front-of-package labels`, `high in sugars symbol`, `Health Canada labelling rules`, `2026 food labelling`.
**Final:** `food labels`, `Canadian front-of-package labels`, `high in sugars symbol`, `Health Canada labelling rules`, `2026 food labelling`, `nutrition labels`, `consumer education`.

---

## FAQ items and rich snippets

The `faq` array powers FAQ rich snippets via FAQPage structured data. To stay eligible:

- 3–6 items is the safe range.
- Questions are how a reader actually asks ("What does 'high in' mean on a Canadian food label?"), not how a marketer phrases them.
- Answers are 40–120 words, factual, and self-contained.
- Avoid promotional questions ("Where do I buy…?") and medical-claim questions ("Will eating X cure Y?").
- Do not duplicate H2 question headings — pick distinct questions the reader still has *after* reading the article.

---

## Internal linking discipline

Not a schema field, but it affects SEO. From inside the body:

- 3–6 internal links per article is the sweet spot.
- Link to: 1 pillar landing page, 1–3 related articles (these often overlap with `relatedArticles`), 1 glossary term if relevant, 1 tool/guide if relevant.
- Anchor text is descriptive, not "click here". Match the target page's primary keyword where possible.
- Don't over-link the same target — once per article unless there's strong contextual reason.

---

## Reviewed-at and freshness

`reviewedAt` is an SEO and trust signal in addition to its E-E-A-T role.

- Stamp every quarterly review even when content didn't change.
- Render in the article footer as "Last reviewed: <date>".
- For evidence-based content, reviewed recency matters as much as published recency. Don't let it slip past 6 months without a check.

---

## Quick pre-publish SEO checklist

- [ ] `seo.metaTitle` ≤60 chars, includes primary keyword, ends with `| FoodPulse`.
- [ ] `seo.metaDescription` 140–160 chars, insight-led, primary keyword in first 120 chars.
- [ ] `slug` lowercase, hyphenated, ≤96 chars, includes primary keyword.
- [ ] `image.alt` describes content + function, ≤125 chars.
- [ ] `ogImage` set explicitly (don't rely on fallback).
- [ ] `ogImage.alt` set.
- [ ] `seo.keywords` 6–10 items, mixes pillar defaults + article specifics.
- [ ] `faq` 3–6 items, distinct from H2 questions.
- [ ] 3–6 internal links in the body.
- [ ] `reviewedAt` will be stamped by the next quarterly review.
