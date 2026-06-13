<!--
FOODPULSE ARTICLE SKELETON

Paste-in template for a new FoodPulse article. Fill the frontmatter and the
prompted sections. Every TODO maps to a Sanity field in the `article` document
type. See: .claude/skills/foodpulse-house-style/references/sanity-schema-map.md

Before publish:
  1. Voice + structure pass against foodpulse-house-style.
  2. Run [[foodpulse-citation-check]] on the Sources block.
  3. Human review.
  4. Stamp `reviewedAt`.
-->

---
# Sanity field map (frontmatter — copy into Studio)

title: "TODO — on-page headline, ≤100 chars, voice rules in voice-guide.md"
slug: "TODO — lowercase-hyphenated, ≤96 chars, includes primary keyword"
excerpt: "TODO — 100–160 chars. Insight-led, no clickbait. This is what appears on listing pages."

# Featured image (Sanity field: image)
image:
  asset: "TODO — upload via Sanity Studio (1920×1080 cover from [[foodpulse-illustration-design]])"
  alt: "TODO — describe content + function, never 'image of', ≤125 chars"

showTableOfContents: true   # set false for short pieces (<800 words)

# Metadata
category: "TODO — exactly one of: food-and-wellbeing | kitchen-and-cooking | food-literacy | food-systems"
author: "TODO — author reference (usually Etornam C. Tsyawo)"
tags:
  - "TODO"
  - "TODO"
  # 3–8 lowercase, hyphenated tags
publishedAt: "TODO — ISO datetime, set on first publish"
updatedAt: ""               # bump on material revision
reviewedAt: ""              # stamped at each quarterly review
featured: false             # founder's call only
readingTime:                # leave empty for auto-calc
relatedArticles:
  - "TODO — up to 4 unique article references"
series:                     # set if part of a series
seriesOrder:                # 1-indexed, hidden unless series is set
isRecipe: false             # set true to surface recipeData fields

# SEO
seo:
  metaTitle: "TODO — ≤60 chars, primary keyword in first 40, ends with | FoodPulse"
  metaDescription: "TODO — ≤160 chars, insight-led, primary keyword in first 120"
  keywords:
    - "TODO"   # start from categories.ts pillar default, add 2–4 article-specific
    - "TODO"

ogImage:
  asset: "TODO — 1200×630 from [[foodpulse-illustration-design]]"
  alt: "TODO"

faq:
  - question: "TODO — how a reader actually asks, 8–15 words"
    answer: "TODO — 40–120 words, self-contained, no promotional or medical-claim Qs"
  - question: "TODO"
    answer: "TODO"
  - question: "TODO"
    answer: "TODO"
  # 3–6 items total
---

<!-- BODY (Portable Text — only these block types: normal, h2, h3, h4, blockquote; callout; embed; inline image) -->

<!-- ============================================================
     1. HOOK — 120–180 words
     Form: founder anecdote in first person (always attributed) OR
     reader-experience opening in second person. Pivot in the last
     sentence to the article's central question.
     Constraints: no alarmism, no clickbait, no invented anecdote.
     ============================================================ -->

[normal] TODO — Open with a lived moment (yours or the reader's) that
makes the topic concrete. 2–3 sentences. No statistics yet.

[normal] TODO — Land the reader inside the situation. 2–3 sentences.

[normal] TODO — End with the question this article answers, framed as
an insight, not a tease.


<!-- ============================================================
     2. DEFINITION / FRAMING — 80–150 words
     Plain-language working definition of the central concept.
     Optionally a callout (info type) for a quick technical sidebar.
     ============================================================ -->

[normal] TODO — Define the central term. 2–3 sentences.

[normal] TODO — Why this definition matters for what follows. 1–2 sentences.

<!-- Optional sidebar definition — use sparingly -->
[callout type=info text="TODO — quick technical definition or note about scope, plain text only"]


<!-- ============================================================
     3. QUESTION H2 SECTIONS — 3–6 of them, 250–400 words each
     Each H2 asks the reader's likely question and answers with
     evidence + nuance. Insert visuals, callouts, pull quotes inside.
     ============================================================ -->

[h2] TODO — First reader question, posed as a question or insight statement

[normal] TODO — Opening paragraph that frames the question.

[normal] TODO — Evidence paragraph. Inline source link via the `link`
annotation; structured citation goes in the Sources block below.

<!-- ILLUSTRATION BRIEF: landscape 1200×1000 — describe what the
     infographic shows, source, and brand mode (Editorial or
     Scientific). [[foodpulse-illustration-design]] picks this up. -->
[image alt="TODO — describe content + function" caption="TODO — source attribution"]

[normal] TODO — Interpretation paragraph. What does this mean for the reader?

<!-- Optional pull quote -->
[blockquote] TODO — research finding or distinctive line worth visual emphasis


[h2] TODO — Second reader question

[normal] TODO

[normal] TODO

<!-- Optional sub-section -->
[h3] TODO — sub-question

[normal] TODO

<!-- Optional practical tip mid-flow -->
[callout type=tip text="TODO — specific actionable nudge, 1–2 sentences"]


[h2] TODO — Third reader question

[normal] TODO

[normal] TODO

<!-- Optional cautionary nuance -->
[callout type=warning text="TODO — calm, specific caveat. Never alarmist."]

[normal] TODO


<!-- Add 1–3 more H2 sections as the topic warrants. Vary length;
     don't run six 400-word sections back to back. -->


<!-- ============================================================
     4. NUMBERED PRACTICAL TAKEAWAYS — 3–7 items
     Actionable, non-prescriptive. "Try…" / "If you…" not "You must…".
     ============================================================ -->

[h2] TODO — "Practical takeaways" or topic-specific variant

[normal] 1. TODO — first takeaway, 1–3 sentences, actionable, non-prescriptive.

[normal] 2. TODO — second takeaway.

[normal] 3. TODO — third takeaway.

<!-- 3–7 items total. Below 3 reads thin; above 7 reads list-icle. -->


<!-- ============================================================
     5. SOURCES & REFERENCES (schema-side `sources` array)
     Every factual claim has a source object. Order in citation order.
     Hard-gated by [[foodpulse-citation-check]] before publish.
     ============================================================ -->

sources:
  - title: "TODO — exact title of source"
    url: "TODO — DOI or canonical URL"
    author: "TODO — institution or author"
    year: "TODO — YYYY"
  - title: "TODO"
    url: "TODO"
    author: "TODO"
    year: "TODO"
  # Add one entry per cited claim.


<!-- ============================================================
     6. FAQ — schema-side `faq` array, already stubbed in frontmatter
     Pick 3–6 distinct-from-H2 questions a reader would still type
     into Google after reading.
     ============================================================ -->


<!-- ============================================================
     7. OPTIONAL SOFT COACHING CTA — max 1 per article
     Use only when the topic naturally lands in coaching territory
     (decision frameworks, food literacy, food-environment design).
     No urgency, no scarcity.
     ============================================================ -->

[normal] TODO (optional) — If you want to work through this with your
own household and context, the Food Clarity Session is a one-hour 1:1 —
bring the questions on your mind and we'll think through them together.
[link href="/coaching"]Learn more[/link]


<!-- ============================================================
     PRE-PUBLISH CHECKLIST
     - [ ] Voice pass — Four Voice Principles, POV rules
     - [ ] Structure pass — skeleton sections present, lengths within range
     - [ ] Non-negotiables clean — no prescription, no clickbait, no promotion
     - [ ] Sanity field validation — title ≤100, excerpt 100–160, slug ≤96
     - [ ] Alt text on every image, ≤125 chars
     - [ ] seo.metaTitle ≤60, seo.metaDescription ≤160
     - [ ] 3–8 tags, ≤4 relatedArticles
     - [ ] Sources array populated and verified ([[foodpulse-citation-check]])
     - [ ] FAQ 3–6 items, distinct from H2 questions
     - [ ] Human review complete
     - [ ] reviewedAt stamped
     ============================================================ -->
