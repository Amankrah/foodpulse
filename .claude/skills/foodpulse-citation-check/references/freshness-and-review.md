# Freshness & review

How `reviewedAt`, `updatedAt`, and the quarterly review cadence interact with citation-check. Tied to skill 1's article schema documented at [.claude/skills/foodpulse-house-style/references/sanity-schema-map.md](../../foodpulse-house-style/references/sanity-schema-map.md).

---

## The three datetime fields

The Sanity `article` document carries three datetime fields with different jobs:

| Field | Set when | Bumped when | Purpose |
|---|---|---|---|
| `publishedAt` | First publish | Never (except correcting a wrong initial timestamp) | The article's public birth date. |
| `updatedAt` | Material content change | Each material content change | Signals the reader that the substance changed. |
| `reviewedAt` | Each citation-check pass | Each citation-check pass (even without content change) | Signals the reader that the article is still being maintained. E-E-A-T signal. |

The article footer renders "Last reviewed: <reviewedAt>", which is a direct trust signal — readers (and search engines) see that the brand checks its evidence on a cadence.

---

## Quarterly review cadence

**Default.** Every article gets a full citation-check pass once per quarter.

**The rotation.**

- Q1 — articles published in Q1 of prior years.
- Q2 — Q2 of prior years.
- Q3 — Q3 of prior years.
- Q4 — Q4 of prior years.

This spreads the load evenly. As the catalog grows, batch reviews can run as workflows (see "Wave 5 / amplification skills" in the compass brief).

**Each quarterly review:**

1. Re-run the 6-phase workflow from [verification-workflow.md](verification-workflow.md) on the article.
2. Update any sources whose URLs broke (publishers reorganize; institutional pages move).
3. Update any regulatory citations whose substance changed.
4. Verify any cited papers haven't been retracted.
5. Stamp `reviewedAt` with today's ISO datetime.
6. If the substance changed, also bump `updatedAt`.

**No-change re-review still updates `reviewedAt`.** A pure verification pass with no content change bumps only `reviewedAt`, not `updatedAt`. The reader sees "Last reviewed" advance; "Last updated" stays put.

---

## When to re-verify a single claim early (between quarterly reviews)

Some triggers can't wait.

### Trigger 1 — A cited paper is retracted

Rare but catastrophic. Most retractions are published with a notice on the journal page; CrossRef metadata also flags retracted works (the `subtype` becomes `retraction` or there's a `update-to` link).

**What to do:**

- Remove or replace the citation immediately.
- Audit other articles that cite the same paper (a future `retraction-watch.md` will track this once the catalog is large enough).
- Bump `reviewedAt` and `updatedAt` on the affected article.

### Trigger 2 — A regulation changes

Health Canada, FDA, EFSA, and CFIA rules evolve. The compass brief specifically calls out the Canadian 2026 front-of-package enforcement timeline as a high-traffic area — anything regulatory carries change risk.

**What to do:**

- Re-verify the rule against the institution's current page.
- Update the article body if the rule's substance changed.
- Bump `reviewedAt` and (if substance changed) `updatedAt`.

### Trigger 3 — A new meta-analysis supersedes the cited primary study

If the article cites a single primary study and a new systematic review or large RCT has been published that materially changes the evidence picture, re-verify and update.

**What to do:**

- Add the new source.
- Possibly re-label evidence strength (`emerging` → `established`, or vice versa).
- Audit copy phrasing against the new label.
- Bump `reviewedAt` and `updatedAt`.

### Trigger 4 — A reader or expert flags a citation issue

Treat every report seriously. Re-run the affected claim through Phases 3–5.

**What to do:**

- Verify the issue.
- Reply to the flagger with the outcome.
- If valid, update; if not, document the resolution internally (a `references/inquiries-log.md` can be created when needed).

---

## Stamp procedure

When the citation-check gate returns `ready` and any required edits have landed, stamp the document.

**Sanity Studio.**

- Set the **Last Reviewed** field (`reviewedAt`) to today's ISO datetime.
- If content changed, also set the **Updated At** field (`updatedAt`).
- Save the document.

**Programmatically** (when using `[[foodpulse-deep-research-article]]` or a future automation skill via `@sanity/client` from [foodpulse/src/sanity/lib/](../../../foodpulse/src/sanity/lib/)):

```js
await client
  .patch(articleId)
  .set({ reviewedAt: new Date().toISOString() })
  // and only if content changed:
  .set({ updatedAt: new Date().toISOString() })
  .commit();
```

The skill doesn't currently call Sanity directly — the agent (or human) stamps the document after review. Direct programmatic stamping becomes appropriate when the Wave 2 article-production skill is in steady use.

---

## What "material content change" means for `updatedAt`

**Bump `updatedAt` when:**

- A claim or statistic was added, removed, or substantively changed.
- A source was replaced because the original was wrong (not just because it moved URLs).
- The article's framing or conclusions changed.
- A new section was added or a section was removed.

**Don't bump `updatedAt` when:**

- A source URL was updated because the publisher reorganized.
- A typo was fixed.
- A pillar tag was adjusted.
- The featured image was swapped without changing the article's substance.
- The article was re-verified and nothing changed.

The distinction matters because readers and search engines treat `updatedAt` bumps as signals of *substance* change. Inflating `updatedAt` for cosmetic edits dilutes the signal.

---

## When `publishedAt` should change

Almost never. Once an article is public, its birth date is its birth date.

**The only acceptable case.** The initial `publishedAt` was set to a wrong date (e.g. accidental future-date, or scheduled-publish lost its scheduled-stamp). Correct it. Don't backdate or future-date for any other reason — readers and search engines treat birth-date manipulation as gaming.

If an article is fully rewritten such that "this is essentially a new article" feels true, publish it as a new article with a new slug and a redirect from the old slug (the schema supports redirects via the `redirect` document type per [foodpulse/src/sanity/schemaTypes/documents/redirectType.ts](../../../foodpulse/src/sanity/schemaTypes/documents/redirectType.ts)).

---

## Visibility in the article footer

The article footer should show:

- "Published: <publishedAt>" — always.
- "Last updated: <updatedAt>" — when set and different from `publishedAt`.
- "Last reviewed: <reviewedAt>" — when set.

If `updatedAt` and `reviewedAt` are the same date, show both lines — they carry different signals.

---

## Tracking the review queue

Until the catalog grows large enough to need a dedicated dashboard, the simplest mechanism is a Sanity query that lists articles where `reviewedAt < now() - 90d`. Run it at the start of each quarter; work through the list.

When the workflow becomes load-bearing, a future skill (`foodpulse-quarterly-review` or similar) can automate the list-pull, the per-article verification, and the stamp. Out of scope for v1 of this skill.
