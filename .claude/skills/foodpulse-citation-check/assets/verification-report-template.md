<!--
FOODPULSE CITATION VERIFICATION REPORT — TEMPLATE

Paste this scaffold for each draft you verify. Fill every section.
The verdict at the top must match what the per-claim findings show.
See: .claude/skills/foodpulse-citation-check/references/verification-workflow.md
-->

# Citation verification report

**Article:** TODO — article title or draft filename
**Slug:** TODO — slug if known
**Reviewer (agent):** TODO — model name + date (e.g. "Claude Opus 4.7, 2026-06-13")
**Human reviewer:** TODO — name + sign-off date when human accepts
**Verdict:** `ready` | `needs-edits` | `blocked`

---

## Summary

| Status | Count |
|---|---|
| Verified | 0 |
| Flagged | 0 |
| Unsourced | 0 |
| No-source-needed | 0 |
| Context-only | 0 |
| **Total claims** | 0 |

### Source-hierarchy distribution

| Tier | Count |
|---|---|
| A — Primary research | 0 |
| B — Authoritative institutional | 0 |
| C — Reputable secondary | 0 |
| D — Tertiary / community | 0 |

### Evidence-strength distribution

| Label | Count |
|---|---|
| `established` | 0 |
| `emerging` | 0 |
| `contested` | 0 |
| `preliminary` | 0 |

---

## Per-claim findings

For every claim extracted in Phase 1, fill one block. Order by draft section.

### Claim 1 — TODO short summary

- **Location:** § "TODO section title", paragraph X
- **Claim text:** TODO — quote the article sentence verbatim.
- **Source(s):** TODO — index into `sources` array, or "unsourced", or "no-source-needed", or "context-only".
- **Source tier:** A | B | C | D
- **URL check:** `verified` | `flagged (issue tag)` | `n/a`
- **CrossRef check:** `verified` | `flagged (issue tag)` | `n/a — no DOI`
- **Support (Phase 4):** `supports` | `partial — TODO note on the gap` | `does-not-support — TODO note`
- **Evidence strength:** `established` | `emerging` | `contested` | `preliminary`
- **Phrasing audit:** `phrasing-ok` | `phrasing-overstates — TODO suggested rewrite` | `phrasing-understates — TODO suggested rewrite`
- **Status:** `verified` | `flagged` | `unsourced` | `no-source-needed` | `context-only`

### Claim 2 — TODO short summary

(... repeat ...)

---

## Recommended copy edits

List every claim with a `phrasing-overstates`, `phrasing-understates`, or `partial` Phase 4 outcome that has a specific rewrite.

### Edit 1 — Claim N

**Before:**

> TODO — quote the original sentence.

**After:**

> TODO — proposed rewrite that matches the evidence-strength label and source support.

**Why:** TODO — one line. ("Single small RCT can't carry 'Studies consistently show…' phrasing — downgrade to `preliminary` phrasing.")

### Edit 2 — Claim N

(... repeat ...)

---

## Source-replacement recommendations

For sources where the check found `doi-not-found`, `url-dead`, or content mismatch.

### Source N — TODO short title

- **Current:** TODO — input as it appears in the sources array.
- **Issue(s):** TODO — issue tag(s) from the script report.
- **Recommendation:** TODO — find a replacement, soften the claim, or remove. See `references/sources-block-rules.md` § "What to do when a source has to be removed".
- **Replacement found:** TODO — paste the replacement source object if available.

---

## Human acknowledgments

If the verdict is `ready` and there are zero flagged/unsourced items, skip this section.

If any `flagged` or `unsourced` items remain and the human chooses to publish anyway, each must be explicitly acknowledged here:

- [ ] **Claim N — [short]:** Acknowledged by TODO (name) on TODO (date). Reason: TODO — why publish despite the flag.
- [ ] **Claim M — [short]:** Acknowledged by TODO (name) on TODO (date). Reason: TODO.

The article does not publish until every flagged item has either been fixed or has a row here.

---

## Stamp procedure

When the verdict is `ready` and edits (if any) have landed:

1. Set `reviewedAt` on the Sanity document to today's ISO datetime.
2. If content changed during this review, also set `updatedAt`.
3. Save the document.

See `references/freshness-and-review.md` for the `updatedAt` vs `reviewedAt` distinction.

---

## Notes

Anything that didn't fit a structured slot. Examples:

- Sources that resolve but felt off-brand (low-credibility journal, Tier D where Tier A would be better).
- Patterns observed across multiple flags (recurring statistic mismatch, outdated regulation).
- Suggestions for `references/source-hierarchy.md` updates (new trusted domain, newly disallowed predatory journal).
- Anything to follow up on in the next quarterly review.

---

## Verdict logic (reminder)

- **`ready`** — zero `flagged` or `unsourced` items.
- **`needs-edits`** — 1–3 flagged/unsourced items, all with clear remediations.
- **`blocked`** — 4+ flagged/unsourced items, OR any item where a source actively contradicts the claim, OR any disallowed source remains.

Verdict at the top of this report must match what's below it.
