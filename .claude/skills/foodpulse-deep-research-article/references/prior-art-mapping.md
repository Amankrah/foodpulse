# Prior-art mapping

Phase 2 of the pipeline. Discover what FoodPulse already publishes that overlaps with the new topic. Three jobs:

1. Avoid republishing what exists — recommend refresh instead.
2. Populate the `relatedArticles` field (up to 4 unique references).
3. Identify 3–6 internal-link targets for the new article.

---

## Discovery surfaces

In order of preference.

### 1. foodpulse.co (live site, WebFetch)

The authoritative public catalogue. Surfaces:

- **Sitemap.** `https://foodpulse.co/sitemap.xml` — full URL list.
- **Pillar landing pages.**
  - `https://foodpulse.co/food-and-wellbeing/`
  - `https://foodpulse.co/kitchen-and-cooking/`
  - `https://foodpulse.co/food-literacy/`
  - `https://foodpulse.co/food-systems/`
- **Search.** If the site has search, `https://foodpulse.co/search?q=<topic>` is the fastest signal.
- **Tag pages.** When the topic's tag exists (e.g. `https://foodpulse.co/tag/ultra-processed-foods/`).

### 2. Sanity-backed article listing (future)

When a future automation skill wires up `@sanity/client` reads from [foodpulse/src/sanity/lib/](../../../foodpulse/src/sanity/lib/), this becomes the primary surface. For v1, defer to the live site.

### 3. Local content map (if maintained)

If the founder keeps a local content map (e.g. `doc/content-catalogue.md`), check it first — it's faster than crawling and often more curated. Out of scope for v1; check when present.

---

## Discovery procedure

1. **Pillar scan.** Fetch the pillar landing page for the article's primary pillar. Capture every article title + slug + published date visible.
2. **Cross-pillar tag scan.** If the topic has obvious tags (e.g. "microbiome", "health-canada", "fortification"), check the tag page.
3. **Keyword search.** If the site exposes search, run 2–3 queries derived from the topic.
4. **Spot-fetch.** For the 2–4 most promising candidates from steps 1–3, WebFetch the article itself to confirm topical overlap (titles can mislead).

Stop when no new relevant article surfaces.

---

## What to extract per article

For each related article found, record:

```yaml
- title: "Article title"
  slug: "url-slug"
  pillar: "food-and-wellbeing"
  published: "2025-XX-XX"           # if visible
  focus: "One-sentence summary of the article's specific angle"
  overlap: "high" | "adjacent" | "tangent"
```

Overlap levels:

- **high** — the new article would substantially restate this one. Recommend refresh instead.
- **adjacent** — the existing article is a neighbour worth linking. Use for `relatedArticles` and internal links.
- **tangent** — same pillar, different focus. Use sparingly for cross-pillar context.

---

## Decision rules

### Substantial overlap → recommend refresh, halt pipeline

When at least one existing article has overlap level `high`, stop and surface to the user:

> Found a substantially overlapping article: [`<existing-slug>`](<existing-url>) published `<date>`. Its angle is "`<focus>`".
>
> Options:
> 1. Refresh the existing article (re-verify citations, update for 2026 context, freshen voice). Recommended if the article is more than 6 months old and the new angle isn't materially different.
> 2. Publish as a follow-up — narrow the new article to a complementary angle (e.g. "What changed in 2026" if the existing piece is foundational). Recommended if there's clear differentiation.
> 3. Proceed anyway — only if you have a strong reason to publish a competing piece. (Not recommended; dilutes pillar authority.)
>
> How do you want to proceed?

Wait for user direction. Do not silently fork into "follow-up" mode without confirmation.

### Adjacent matches → relatedArticles + internal links

Pick up to 4 `relatedArticles` (same-pillar first, then cross-pillar). The Sanity schema enforces `max(4).unique()`.

Pick 3–6 internal-link targets for the body. These don't all need to be in `relatedArticles` — internal links are about reading paths, `relatedArticles` is about end-of-article navigation.

### No existing related content

Note in the brief: "Net-new topic for the brand. No existing FoodPulse articles cover this directly." That's fine; the article fills a gap.

---

## Internal linking discipline

From skill 1's [.claude/skills/foodpulse-house-style/references/seo-metadata.md](../../foodpulse-house-style/references/seo-metadata.md):

- 3–6 internal links per article is the sweet spot.
- Mix: 1 pillar landing page, 1–3 related articles, 1 glossary term if relevant, 1 tool/guide if relevant.
- Anchor text is descriptive, not "click here."

Surface the recommended links in the topic brief as:

```yaml
internal_links:
  - target: "/food-literacy/"
    anchor_phrase: "FoodPulse Food Literacy pillar"
  - target: "/articles/<related-slug>/"
    anchor_phrase: "the science vs the marketing of probiotics"
  - target: "/glossary/<term>/"
    anchor_phrase: "ultra-processed foods (NOVA Group 4)"
```

Phase 5 (drafting) consumes these and weaves them into the body where each anchor phrase naturally appears.

---

## Edge cases

### Article exists but is significantly outdated (>12 months, pre-2026 FOP)

This is a refresh candidate, not a republish target. Recommend refresh through the `foodpulse-citation-check` quarterly review workflow rather than authoring a new piece. The new piece would compete for the same SEO slot.

### Series article

If the existing related articles are part of a `series` (per the Sanity schema), check whether the new article belongs in the series. If yes:
- Set `series` to the existing series reference.
- Set `seriesOrder` to next-available position.
- The series-level intro page gets a small refresh for the new entry; flag this for the founder.

### Cross-pillar surprise

If the topic could legitimately fit two pillars and existing articles cover one but not the other, surface this:

> The topic "X" could sit in [pillar A] or [pillar B]. FoodPulse has existing coverage in [A]; this would be net-new in [B]. Recommended pillar: [B] for differentiation and breadth.

Don't decide unilaterally — present and let the founder pick.

---

## What NOT to do in Phase 2

- **Do not scrape competitor sites.** Prior-art mapping is FoodPulse-only.
- **Do not skip the WebFetch confirmation.** Title-only matching produces false positives.
- **Do not invent slugs.** Only use slugs you actually observed on the live site.
- **Do not recommend more than 4 `relatedArticles`.** Schema rejects >4.
- **Do not silently demote a high-overlap match to adjacent.** Surface it.

---

## Output to the brief

Append a "Prior art" section to the topic brief:

```markdown
## Prior art

**Substantial overlap found:** none / [slug + decision]
**Related articles (for `relatedArticles` field):**
1. `[slug-1]` — [title] — [one-line focus]
2. `[slug-2]` — [title] — [one-line focus]
3. ...
**Internal-link targets:**
- /[path-1]/ — anchor phrase "..."
- /[path-2]/ — anchor phrase "..."
- ...
**Net-new vs existing surface:** [brief framing of how this article extends the catalogue]
```

This feeds directly into Phase 5 (drafting fills the links) and Phase 6 (citation insertion confirms internal links resolve).
