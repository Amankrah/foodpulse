<!--
FOODPULSE DRAFT OUTPUT TEMPLATE — Phase 5/6/7 output

The final artifact this skill produces. Extends skill 1's article-skeleton.md with:
  - Populated frontmatter (every Sanity article field).
  - Populated body (Portable-Text-compatible markdown).
  - Populated sources array.
  - Populated FAQ array.
  - Verification trail appendix (Phase 7 history).
  - Notes for editorial review.

Written to: drafts/<slug>.md
Companion citation-check report: drafts/<slug>.citation-check.md

See also:
  .claude/skills/foodpulse-house-style/assets/article-skeleton.md
  .claude/skills/foodpulse-deep-research-article/references/pipeline-orchestration.md
-->

---
# Sanity field map (frontmatter)

# CONTENT GROUP
title: "TODO — final headline, ≤100 chars; voice rules per voice-guide.md"
slug: "TODO — lowercase-hyphenated, ≤96 chars, includes primary keyword"
excerpt: "TODO — 100–160 chars; insight-led, no clickbait"

image:
  asset: "TODO — 1920×1080 cover (illustration brief left in body for foodpulse-illustration-design)"
  alt: "TODO — ≤125 chars; content + function; never 'image of'"

showTableOfContents: true   # false for short pieces (<800 words)

# METADATA GROUP
category: "TODO — exactly one: food-and-wellbeing / kitchen-and-cooking / food-literacy / food-systems"
author: "TODO — author document reference (usually Etornam C. Tsyawo)"
tags:
  - "TODO"   # 3–8 lowercase, hyphenated tags
  - "TODO"
publishedAt: ""    # set by Etornam on first publish; agent leaves empty
updatedAt: ""      # set on material change; agent leaves empty
reviewedAt: ""     # stamped by skill 2 quarterly review after gate passes; agent leaves empty

featured: false
readingTime:       # leave empty for auto-calc
relatedArticles:
  - "TODO"   # up to 4 unique slugs from Phase 2 prior-art map
series:
seriesOrder:
isRecipe: false    # true if recipe; then populate recipeData

# SEO GROUP
seo:
  metaTitle: "TODO — ≤60 chars; primary keyword in first 40; ends with | FoodPulse"
  metaDescription: "TODO — 140–160 chars; insight-led; primary keyword in first 120"
  keywords:
    - "TODO"   # 6–10 items; mix pillar default + article specifics
    - "TODO"

ogImage:
  asset: "TODO — 1200×630 (foodpulse-illustration-design)"
  alt: "TODO"

faq:
  - question: "TODO — how a reader actually asks, 8–15 words"
    answer: "TODO — 40–120 words; self-contained; no promotional/medical-claim Qs"
  - question: "TODO"
    answer: "TODO"
  - question: "TODO"
    answer: "TODO"
  # 3–6 items total
---

<!--
Body — Portable Text-compatible markdown.
Only these block types are valid: normal paragraphs, h2/h3/h4 headings,
blockquotes, inline images, callouts (info/warning/tip), embeds.
Inline citations are standard markdown links on the claim-bearing phrase.
-->

<!-- ILLUSTRATION BRIEF: 1920×1080 cover — [describe concept; specify Editorial or Scientific mode]. Source for any data shown: [citation]. -->

## TODO — Hook (120–180 words)

TODO — reader-experience or founder-anecdote opener. If founder POV ("I"), keep it attributed and lived; never invented. Two to three short paragraphs. Pivot in the last sentence to the article's central question.

TODO — second hook paragraph.

TODO — final hook sentence that lands on the question this piece answers.

---

## TODO — Definition / framing (80–150 words)

TODO — plain-language working definition of the central concept. No jargon without a one-line explanation.

TODO — why this definition matters for what follows.

<!-- Optional info callout for a quick technical sidebar. Plain text only. -->
> ℹ️ **TODO term** — TODO short technical definition.

---

## TODO — Question-style H2 #1 (250–400 words)

TODO — opening paragraph that frames the question.

TODO — evidence paragraph. [The claim-bearing phrase](https://canonical-source-url) is linked inline; the structured citation appears in the sources block below.

<!-- ILLUSTRATION BRIEF: landscape 1200×1000 — [describe infographic; cite source]. -->

TODO — interpretation paragraph. What does this mean for the reader?

> TODO — optional pull quote: a research finding or distinctive line worth visual emphasis.

---

## TODO — Question-style H2 #2 (250–400 words)

TODO — opening paragraph.

TODO — evidence paragraph with [inline citation](https://canonical-source-url).

### TODO — Sub-question (optional H3)

TODO — sub-section body.

<!-- Tip callout for a small actionable nudge. Plain text only. -->
> 💡 **TODO short label.** TODO — 1–2 sentence specific actionable nudge.

---

## TODO — Question-style H2 #3 (250–400 words)

TODO — opening paragraph.

TODO — body with inline citations.

<!-- Warning callout for calm, specific caveat. Never alarmist. -->
> ⚠️ **TODO short label.** TODO — calm, specific caveat (e.g. "If you have a diagnosed kidney condition, the potassium guidance here changes — work with your nephrology team rather than applying this general framework directly.").

---

<!-- Add more H2 sections as the topic warrants. Vary section length. -->

---

## TODO — Practical takeaways (or topic-specific variant)

1. TODO — first takeaway. 1–3 sentences. Actionable, non-prescriptive ("Try…" / "A useful starting point is…" — never "You must…").
2. TODO — second takeaway.
3. TODO — third takeaway.
   <!-- 3–7 items total. Below 3 reads thin; above 7 reads list-icle. -->

---

## TODO — Optional soft coaching CTA

(Use **only** when the topic naturally lands in coaching territory — decision frameworks, food literacy, food-environment design. No urgency, no scarcity. Maximum 1 CTA per article.)

If you want to work through this with your own household and context, the [Food Clarity Session](/coaching) is a one-hour 1:1 — bring the questions on your mind and we'll think through them together.

---

## Sources & References

(Schema field: `sources`. Order matches inline-citation order in the body above.)

```yaml
sources:
  - title: "TODO — exact title"
    url: "TODO — DOI URL preferred"
    author: "TODO — first author + et al. OR institution"
    year: "TODO — YYYY"
  - title: "TODO"
    url: "TODO"
    author: "TODO"
    year: "TODO"
  # One source object per cited study/report. Don't bundle.
```

---

## Verification trail (Phase 6.5 + Phase 7 history)

(Carries the humanizer pass + citation-check loop summary so the founder can see what the skill caught and fixed.)

### Humanizer pass (Phase 6.5)

- **Patterns flagged:** TODO — count by pattern number from the [33-pattern ruleset](../.claude/skills/foodpulse-humanizer/references/patterns.md). For example: "Pattern 14 (em-dashes): 18 instances. Pattern 27 (authority tropes): 2 instances. Pattern 32 (aphorism formulas): 1 instance."
- **Em-dash count, body, before / after:** TODO / 0. (Hard rule: zero in published prose.)
- **Notable rewrites:** TODO — short list of judgment calls (e.g. "Rewrote 'The honest answer is…' as 'It is neither.' in the hook."). Brand non-negotiable carve-outs noted.
- **Inline citations preserved:** TODO — yes / no (Phase 6.5 must not break Phase 6's link annotations).
- **Pass complete:** TODO — ISO datetime.

### Citation-check gate (Phase 7)

- **Initial verdict:** ready / needs-edits / blocked
- **Loops completed:** 0 / 1 / 2
- **Loop 1 fixes:** TODO — list each claim edited and source replaced.
- **Loop 2 fixes (if applicable):** TODO.
- **Final verdict:** ready / needs-edits / blocked
- **Citation-check report path:** `drafts/<slug>.citation-check.md`
- **Script summary (from verify-citations.mjs):** total: TODO / verified: TODO / flagged: TODO.

If `final verdict ≠ ready`, this file should have been written as `drafts/<slug>.partial.md` instead. The `.md` (not `.partial.md`) filename is reserved for ready-to-review drafts.

---

# Notes for editorial review

(Places Etornam should look first. Keep tight — 3–5 bullet points max.)

- **TODO** — e.g. "The hook uses a founder anecdote framed around your doctoral research; confirm the framing matches what you'd say in your own voice."
- **TODO** — e.g. "The contested section on saturated fat names both sides per [evidence-strength.md](../../foodpulse-citation-check/references/evidence-strength.md) `contested` phrasing; confirm you're comfortable with this framing."
- **TODO** — e.g. "Internal link to /food-literacy/ assumes the pillar landing page is live; check before publish."
- **TODO** — e.g. "Soft coaching CTA appears at the end; remove if not topical."
- **TODO** — e.g. "FAQ item #2 makes an institutional claim about CFIA enforcement — worth re-verifying against the canada.ca page when the article is closer to publish in case the page has been updated."

---

# Out-of-band metadata (not part of the published article)

- **Pipeline run:** TODO short identifier matching the topic brief and research notes.
- **Phases completed:** 1 / 2 / 3 / 4 / 5 / 6 / 7.
- **Tools used:** WebSearch, WebFetch, verify-citations.mjs [, deep-research delegation if applicable].
- **Topic brief path:** TODO.
- **Research notes path:** TODO.
- **Skill version:** foodpulse-deep-research-article v1.
- **Composed skills:** foodpulse-house-style v1, foodpulse-citation-check v1.

This block is for the founder's records; strip before pasting into Sanity Studio.
