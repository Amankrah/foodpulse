# Sanity schema map

Field-by-field cheat sheet for the `article` document type. Source of truth: [foodpulse/src/sanity/schemaTypes/documents/articleType.ts](../../../foodpulse/src/sanity/schemaTypes/documents/articleType.ts). If this file ever drifts from the schema, the schema wins — update this doc.

Field groups in Studio: **Content**, **Metadata**, **SEO**, **Recipe**.

---

## Content group

### `title` — string, required

- Max 100 characters.
- Use the published headline. See [voice-guide.md](voice-guide.md) §Style conventions for headline rules.
- Should match the SEO `metaTitle` after the `| FoodPulse` suffix is stripped — they can diverge for length, not for substance.

### `slug` — slug, required

- Max 96 characters.
- Slugify rule (from schema): lowercase, spaces → `-`, strip non-`\w-` chars, truncate to 96.
- Generated from `title` by default. Manually edit when the title is long or contains words that would weaken the slug ("the", "and", "a").
- One slug = one URL forever. Do not change after publish without setting up a redirect via the `redirect` document type.

### `excerpt` — text, required

- 100–160 characters (enforced by schema validation).
- Insight-led, no clickbait. This is what appears under the title on listing pages and is often pulled into SEO meta-description fallback.
- Lead with the finding, not the question.

### `image` — featured image, required

- Image with `hotspot: true` and a required `alt` field.
- Format: 1920×1080 cover from `[[foodpulse-illustration-design]]`.
- `alt` describes content + function. Never "image of X". Required by schema and required for accessibility/SEO.

### `showTableOfContents` — boolean

- Default `true`.
- Set `false` for short pieces (<800 words) or articles with only 1–2 H2s where a ToC adds noise.
- Auto-generated from H2/H3 headings.

### `body` — Portable Text, required

The article body. Schema-allowed block types and objects only:

| Type | When to use |
|---|---|
| `block` style `normal` | Body paragraphs. |
| `block` style `h2` | Major section headings (question-style or insight-style). |
| `block` style `h3` | Sub-section inside an H2. |
| `block` style `h4` | Rare — only inside an H3 when really needed. |
| `block` style `blockquote` | Pull quote — research finding or distinctive line. |
| `block` decorator `strong` | Sparingly — key term on first mention. |
| `block` decorator `em` | Sparingly — title of a study or publication. |
| `block` decorator `code` | Only for code-like tokens (units, claim codes). |
| `block` annotation `link` | Inline link — `href` must be a valid URL (http/https/mailto/tel; relative allowed). |
| `image` inline | Infographic. Required `alt`. Optional `caption`. |
| `callout` | `type` one of `info` \| `warning` \| `tip`; `text` string. |
| `embed` | LinkedIn / X / YouTube / Instagram / Custom HTML. See [callouts-and-embeds.md](callouts-and-embeds.md). |

Do not introduce new block types — the renderer will silently drop them.

### `sources` — array of source objects, optional but expected

Each source:

```ts
{
  title: string    // required for display
  url: string      // required; canonical (DOI) preferred
  author?: string  // optional
  year?: string    // optional
}
```

Order in citation order. Hard-gated by `[[foodpulse-citation-check]]` before publish. See [non-negotiables.md](non-negotiables.md) §2.

---

## Metadata group

### `category` — reference to `category`, required

Exactly one. Choose from the four pillars in [pillar-taxonomy.md](pillar-taxonomy.md):
- `food-and-wellbeing`
- `kitchen-and-cooking`
- `food-literacy`
- `food-systems`

The decision tree in `pillar-taxonomy.md` resolves ambiguity. Never invent a new category.

### `author` — reference to `author`, required

Usually Etornam C. Tsyawo. If a future contributor writes a piece, reference their author document; their bio + credentials surface in the article footer (E-E-A-T).

### `tags` — array of strings, optional

- 3–8 tags. Lowercase. Hyphenate multi-word tags.
- Cross-cutting themes that don't fit the single-pillar category: "microbiome", "health-canada", "fci4africa", "fortification", "label-literacy".
- Used for tag-based discovery, not for primary navigation.

### `publishedAt` — datetime, required

Set on first publish. Defaults to `new Date().toISOString()` in the Studio. Do not back-date or future-date except for intentional scheduled publishes.

### `updatedAt` — datetime, optional

Bump on any material revision (new evidence, corrected statistic, restructured sections). Skip for typo fixes.

### `reviewedAt` — datetime, optional

Stamped during each quarterly review even when no content changed. Powers the "Last reviewed" line in the article footer — a direct E-E-A-T signal.

### `featured` — boolean

- Default `false`.
- Founder's call only. Promotes the article to homepage placement.

### `readingTime` — number (minutes), optional

Leave empty for auto-calculation. Override when the article's structure (e.g. heavy infographic content) makes the auto estimate misleading.

### `relatedArticles` — array of references, optional

- Max 4. Unique (no duplicates).
- Pick within-pillar first; reach across pillars only for genuinely connected reads.
- These appear at the bottom of the article and feed internal-link signal.

### `series` — reference to `series`, optional

Set when the article is part of a deep-dive series (e.g. a 4-part food-environment series). The `series` document carries the series-level intro and ordering.

### `seriesOrder` — number, hidden unless `series` is set

Position in the series, 1-indexed.

### `isRecipe` — boolean

- Default `false`.
- Set `true` for recipe articles. Surfaces the Recipe group fields and requires `recipeData` to be filled (schema-validated).

---

## SEO group

### `seo` — object (type `seo`)

Per `seoType` in [foodpulse/src/sanity/schemaTypes/objects/seoType.ts](../../../foodpulse/src/sanity/schemaTypes/objects/seoType.ts). Typical fields:

- `metaTitle` — ≤60 chars. See [seo-metadata.md](seo-metadata.md) for the pattern.
- `metaDescription` — ≤160 chars. Insight-led; not a copy-paste of `excerpt` unless the excerpt happens to be perfect.
- `keywords` — start from the pillar default in `categories.ts`; refine for the topic.

### `ogImage` — image, optional

- 1200×630.
- Falls back to the featured `image` if not set.
- Set explicitly when the article needs a different framing for social shares (e.g. with the headline burnt in).

### `faq` — array of `faqItem`, optional

3–6 items. Each:

```ts
{
  question: string  // 8–15 words, conversational
  answer: text      // 40–120 words
}
```

Powers FAQ rich snippets in Google Search.

---

## Recipe group (only when `isRecipe: true`)

### `recipeData` — object (type `recipeData`)

Per `recipeDataType` in [foodpulse/src/sanity/schemaTypes/objects/recipeDataType.ts](../../../foodpulse/src/sanity/schemaTypes/objects/recipeDataType.ts). Schema validation enforces this field is present whenever `isRecipe` is `true`.

Fill rules for the recipe data block are out of scope for this skill — see the recipe-card audit doc at [doc/recipecard-audit-guide.md](../../../doc/recipecard-audit-guide.md). The non-recipe skeleton in [article-structure.md](article-structure.md) still applies to the editorial wrapper around the recipe.

---

## Validation at a glance

Pre-publish checklist (matches schema validation):

- [ ] `title` ≤100 chars.
- [ ] `slug` ≤96 chars, lowercase-hyphenated.
- [ ] `excerpt` 100–160 chars.
- [ ] `image` set with non-empty `alt`.
- [ ] `body` non-empty Portable Text using only schema-allowed types.
- [ ] `category` set to exactly one of the 4 pillar slugs.
- [ ] `author` set.
- [ ] `publishedAt` set.
- [ ] `sources` populated and passed through `[[foodpulse-citation-check]]`.
- [ ] `seo.metaTitle` ≤60 chars.
- [ ] `seo.metaDescription` ≤160 chars.
- [ ] `faq` 3–6 items if FAQ is included.
- [ ] `relatedArticles` ≤4 unique.
- [ ] If `isRecipe: true`, `recipeData` is non-empty.
- [ ] If `series`, `seriesOrder` is set.

The Sanity Studio enforces the hard constraints (chars, required, max). The soft constraints (excerpt insight-led, sources verified, tags low-noise) are this skill's job.
