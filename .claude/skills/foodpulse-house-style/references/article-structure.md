# Article structure

The canonical FoodPulse article skeleton, mapped section-by-section to the Portable Text block types the Sanity schema accepts. Use this as the spine; let topic and pillar shape the details.

The Sanity body field (defined in [foodpulse/src/sanity/schemaTypes/documents/articleType.ts](../../../foodpulse/src/sanity/schemaTypes/documents/articleType.ts)) accepts:

- `block` styles: `normal`, `h2`, `h3`, `h4`, `blockquote`.
- `block` decorators: `strong`, `em`, `code`.
- `block` annotations: `link` (with `href` URL).
- Inline `image` with required `alt` and optional `caption`.
- `callout` object — `type` is `info`, `warning`, or `tip`; `text` is a string.
- `embed` object — LinkedIn / X / YouTube / Instagram / Custom HTML.

Do not invent block types. The PortableText renderer will silently drop anything else.

---

## The seven-part skeleton

```
1. Hook                  → opening block(s), `normal`
2. Definition / framing  → `normal` blocks, often a callout
3. Question H2 sections  → repeated 3–6 times
   3a. H2 question        → `h2`
   3b. Answer body        → `normal`, `blockquote`, callouts, infographics, embeds
4. Numbered takeaways    → `h2` then `normal` (numbered list)
5. Sources & References  → schema-side `sources` array
6. FAQ                   → schema-side `faq` array
7. Tags / author / related → schema-side metadata
```

Cover image (1920×1080) and 2–4 inline infographics (portrait 800×1200 or landscape 1200×1000) come from `[[foodpulse-illustration-design]]`. This skill defines where they slot in; the illustration skill produces the briefs.

---

## 1. Hook (120–180 words)

**Job.** Land the reader inside a real situation, then point them at the question the article will answer.

**Form.**
- Either a founder anecdote in first person ("When I moved from a town where fresh produce was the default to a college flooded with cheap soda…") or a reader-experience opening in second person ("You walk into a grocery store and the cereal aisle alone has 200 options.").
- Pivots in the last sentence to the article's question: "This is what 'food environment' actually means — and why it predicts diet quality better than willpower does."

**Constraints.**
- No alarmism, no clickbait open.
- If founder POV: must be a real, attributed experience. Never invent.
- Cover image precedes the hook in the article layout (schema field `image`), but you don't insert it as a body block — the schema and renderer place it above the body.

**Portable Text shape.** 1–3 `normal` blocks.

---

## 2. Definition / framing (80–150 words)

**Job.** Give the reader the working definition of the central concept in plain language. No jargon without a one-line explanation.

**Form.**
- One or two `normal` paragraphs.
- Optionally a `callout` with `type: 'info'` if a quick technical definition (e.g. the NOVA Group 4 definition) helps before the body proper.
- If the article is heavy on a single recurring term, drop a glossary internal link here using the `link` annotation.

**Portable Text shape.** 1–2 `normal` blocks; optional inline `callout`.

---

## 3. Question-style H2 sections (3–6 of them, 250–400 words each)

**Job.** Each H2 asks the question a reader actually has; the section answers it with evidence + nuance.

**Form per section.**
- `h2` block: a question. ("Why does the food environment outweigh willpower?") Or an insight-led statement that implies the question. Never click-bait.
- 2–4 `normal` paragraphs.
- Optional `h3` for sub-questions inside a section.
- Optional inline `image` (the infographic) with `alt` and `caption`.
- Optional `blockquote` for a research finding or pull quote.
- Optional `callout` — `info` for context, `tip` for a small practical move, `warning` for cautionary nuance (never alarmist).
- Cite inline where claims appear: use `link` annotations to the canonical source; the `sources` array carries the structured citation.

**Constraints.**
- Each section ends with the reader holding one new idea.
- Vary section length and pacing — three 400-word sections in a row reads heavy.
- Infographics slot inside sections, never as a header block.

**Portable Text shape.** `h2` + 2–4 `normal` + optional `h3` + optional `image` / `blockquote` / `callout` / `embed`.

---

## 4. Numbered practical takeaways (3–7 items)

**Job.** Translate the article into actions the reader can actually take.

**Form.**
- `h2` block: "Practical takeaways" or a topic-specific variation ("How to apply this at your own grocery shop").
- A numbered list, rendered as `normal` blocks where each starts with a number. (Portable Text doesn't have a dedicated numbered-list type; the renderer treats `1.` / `2.` prefixed `normal` blocks as items.)
- Each item: 1–3 sentences. Actionable. Non-prescriptive.

**Constraints.**
- 3–7 items. Fewer than 3 reads thin; more than 7 reads like a list-icle.
- Voice: "Try…" / "If you…" / "A useful starting point is…" — not "You must…" / "Always…".
- No item promotes a specific product or brand.

**Portable Text shape.** `h2` + 3–7 `normal` blocks.

---

## 5. Sources & References

**Job.** Make every factual claim traceable.

**Lives in the schema-side `sources` array**, not in the body. Each source is an object:

```ts
{
  title: string   // e.g. "Front-of-package symbol — final regulations"
  url: string     // canonical link (DOI for journals)
  author?: string // institution or author
  year?: string   // publication year
}
```

The article renderer surfaces these as a "Sources & References" block at the end of the body. Order them in the order they're referenced inline, or grouped by topic for long articles.

**Gate.** `[[foodpulse-citation-check]]` runs on this array before publish. See [non-negotiables.md](non-negotiables.md) §2.

---

## 6. FAQ (3–6 items)

**Job.** Capture the questions a reader will type into Google after reading. Powers FAQ rich snippets in search.

**Lives in the schema-side `faq` array** (`type: faqItem`). Each item has a `question` string and an `answer` text.

**Form per item.**
- Question: phrased the way a reader would actually type it. 8–15 words.
- Answer: 40–120 words. Direct, evidence-grounded, no fluff.

**Constraints.**
- 3–6 items. Fewer than 3 doesn't justify the rich-snippet markup; more than 6 dilutes.
- No promotional questions ("Where can I buy the best X?").
- No medical-claim questions ("Will this cure X?") — see non-negotiables.

---

## 7. Schema-side metadata

These fields are not body content; they live as separate Sanity fields and are filled at publish time.

- `tags` — 3–8 lowercase tags, cross-cutting themes.
- `author` — reference to the author document (usually Etornam).
- `relatedArticles` — up to 4 unique references; pick within-pillar first, then cross-pillar for breadth.
- `publishedAt` — set on first publish.
- `updatedAt` — bump on any material revision.
- `reviewedAt` — stamped every quarterly review (E-E-A-T).
- `featured` — only on the founder's call; affects homepage placement.
- `readingTime` — leave empty for auto-calc, or set explicitly.
- `series` / `seriesOrder` — when the article is part of a multi-part deep dive.

See [sanity-schema-map.md](sanity-schema-map.md) for the full field-by-field reference.

---

## Visual slotting

From the compass strategy brief and the Brand Guide, the typical visual stack on an article is:

| Position | Visual | Format | Source |
|---|---|---|---|
| Top (schema `image` field) | Cover | 1920×1080 | `[[foodpulse-illustration-design]]` |
| Inside H2 section #1 or #2 | Concept illustration or data viz | Landscape 1200×1000 | `[[foodpulse-illustration-design]]` |
| Inside a later H2 section | Comparison table or infographic | Portrait 800×1200 or landscape 1200×1000 | `[[foodpulse-illustration-design]]` |
| Optional, inside a citation-heavy section | Data chart | Landscape 1200×1000 | `[[foodpulse-illustration-design]]` |

Drop an HTML-comment marker in the body where a visual will go:

```
<!-- ILLUSTRATION BRIEF: landscape 1200×1000 — bar chart of Canadian UPF share 2004 vs 2015 (Statistics Canada, Nov 2020). Trust Blue + Cool Sage (Scientific mode). -->
```

`[[foodpulse-illustration-design]]` reads these markers and produces briefs.

---

## Optional closer — soft coaching CTA

When the article topic naturally lands in coaching territory (decision frameworks, food literacy, food-environment design), end with a soft CTA. Maximum one CTA per article. Pattern:

> If you want to work through this with your own household and context, the Food Clarity Session is a one-hour 1:1 — bring the questions on your mind and we'll think through them together. *(link)*

No urgency, no scarcity (other than the *factual* "two spaces" mentorship cap if specifically referencing that tier).

---

## Length targets at a glance

| Section | Word count | Block count |
|---|---|---|
| Hook | 120–180 | 1–3 `normal` |
| Definition | 80–150 | 1–2 `normal` (+ optional callout) |
| Each H2 section | 250–400 | `h2` + 2–4 `normal` + visuals/callouts |
| Numbered takeaways | 150–350 total | `h2` + 3–7 `normal` |
| FAQ | 200–600 total | schema-side, 3–6 items |
| **Whole article body** | **1,500–2,500** | **typical for a deep dive** |

Deeper investigative pieces can run to 3,500 words; quick literacy explainers can land at 900. Below 700 words, ask whether the piece belongs as a glossary entry or a guide instead.

---

## What this skeleton is not

- It is **not** a recipe template. Recipe articles set `isRecipe: true` and populate `recipeData` — the recipe data block carries ingredients, steps, yield, and nutrition. The skeleton above still applies to the editorial wrapper around the recipe (hook, framing, technique notes), but the structured recipe data lives in its own field.
- It is **not** a glossary entry. Glossary terms have their own document type and stay neutral / brief.
- It is **not** a guide. Guides use a richer template with `example` callouts and a different schema. This skeleton is for articles.
