# Citation verification report

**Article:** Canada's new 'high in' symbol: what it means at the grocery store
**Slug:** canadian-high-in-symbol-guide
**Reviewer (agent):** Claude Opus 4.7, 2026-06-13
**Human reviewer:** TODO — Etornam reads, signs off, then stamps `reviewedAt`
**Verdict:** `ready`

---

## Summary

| Status | Count |
|---|---|
| Verified | 9 |
| Flagged | 0 |
| Unsourced | 0 |
| No-source-needed | 5 |
| Context-only | 0 |
| **Total claims** | 14 |

### Source-hierarchy distribution

| Tier | Count |
|---|---|
| A — Primary research | 2 |
| B — Authoritative institutional | 4 |
| C — Reputable secondary | 0 |
| D — Tertiary / community | 0 |

100% Tier A or B. Target was ≥60%.

### Evidence-strength distribution

| Label | Count |
|---|---|
| `established` | 6 |
| `emerging` | 2 |
| `contested` | 0 |
| `preliminary` | 1 |

### Script (`verify-citations.mjs`) summary

```
{"total":6,"verified":6,"flagged":0,"errors":0}
```

Per-source script outcomes:

| # | Source | URL | CrossRef | Status |
|---|---|---|---|---|
| 0 | Health Canada FOP page | 200 OK | skipped (no DOI) | verified |
| 1 | Canada Gazette SOR/2022-168 | 200 OK | skipped (no DOI) | verified |
| 2 | Health Canada Sodium Intake report 2017 | 200 OK | skipped (no DOI) | verified |
| 3 | CFIA implementation plan | 200 OK | skipped (no DOI) | verified |
| 4 | Flexner et al. 2023 (Frontiers in Nutrition) | 200 OK | verified (title/author/year all match) | verified |
| 5 | Guo et al. 2024 (Nutrients) | 403 (bot-walled) | verified (title/author/year all match) | verified (advisory: `url-bot-walled`) |

Note on source 5: the publisher URL (MDPI/PubMed Central) returned 403 to the script's non-browser user agent. This is the common bot-walling pattern at major publishers. Skill 2's classification rule treats this as advisory when CrossRef metadata verifies cleanly — the DOI is the canonical existence check for peer-reviewed sources, not the publisher landing-page response.

---

## Per-claim findings

### Claim 1 — Symbol became mandatory January 1, 2026

- **Location:** § "A new mark on the front of the package", paragraph 2
- **Claim text:** "It became mandatory on January 1, 2026, after a transition period that ended at the close of 2025."
- **Source(s):** #0 (Health Canada), #1 (Canada Gazette), #3 (CFIA)
- **Source tier:** B (all three)
- **URL check:** all verified
- **CrossRef check:** n/a — no DOI
- **Support (Phase 4):** `supports` — multiple authoritative sources confirm.
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 2 — The symbol is black-and-white, magnifying-glass icon with "High in" + nutrient + "Health Canada"

- **Location:** § "What the symbol is, in plain terms", paragraph 2
- **Claim text:** "Visually it's a small black-and-white rectangle with a magnifying-glass graphic inside. Three text elements: the words 'High in' at the top, the specific nutrient(s) named in the middle, and the words 'Health Canada' at the bottom."
- **Source(s):** #0 (Health Canada)
- **Source tier:** B
- **Support:** `supports` — visual description matches Health Canada's published specification.
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 3 — 15% DV standard threshold for saturated fat, sugars, sodium

- **Location:** § "What triggers the symbol — and what doesn't?", paragraph 1
- **Claim text:** "The standard threshold is 15% DV per serving. If a serving of a pre-packaged food contains 15% or more of the daily value for saturated fat, sugars, or sodium, that nutrient triggers the symbol."
- **Source(s):** #1 (Canada Gazette SOR/2022-168), #0 (Health Canada)
- **Source tier:** B
- **Support:** `supports`
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 4 — Small-package 10% DV threshold

- **Location:** § "What triggers the symbol — and what doesn't?", small-package bullet
- **Claim text:** "Small packages — products with a reference amount of 30 g or 30 mL or less — use a lower threshold of 10% DV."
- **Source(s):** #1 (Canada Gazette SOR/2022-168)
- **Source tier:** B
- **Support:** `supports`
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 5 — Prepackaged-meal 30% DV threshold

- **Location:** § "What triggers the symbol — and what doesn't?", meal bullet
- **Claim text:** "Prepackaged main dishes — products with a reference amount of 200 g or more (170 g for main dishes intended for children aged 1 to 4) — use a higher threshold of 30% DV."
- **Source(s):** #1 (Canada Gazette SOR/2022-168)
- **Source tier:** B
- **Support:** `supports`
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 6 — Canadian average sodium intake ~2,760 mg/day vs 2,300 mg target; 58% exceed recommendations

- **Location:** § "Why these three nutrients — and why now?", paragraph 1
- **Claim text:** "average Canadian intake sits around 2,760 mg per day, against a recommended daily limit of 2,300 mg. Roughly 58 percent of Canadians aged one and older — and over 90 percent of males aged 14 to 30 — exceed those targets."
- **Source(s):** #2 (Health Canada Sodium Intake of Canadians in 2017)
- **Source tier:** B
- **Support:** `supports` — figures match the cited Health Canada report.
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 7 — Bakery products, mixed dishes, processed meats account for half of Canadian sodium intake

- **Location:** § "Why these three nutrients — and why now?", paragraph 1
- **Claim text:** "bakery products, mixed dishes, processed meats, cheeses, soups, sauces, and condiments together account for about half of it"
- **Source(s):** #2 (Health Canada Sodium Intake)
- **Source tier:** B
- **Support:** `supports`
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 8 — Final regulations published July 20, 2022 in Canada Gazette as SOR/2022-168

- **Location:** § "Why these three nutrients — and why now?", paragraph 2
- **Claim text:** "Health Canada published the final amendments to the Food and Drug Regulations in the Canada Gazette, Part II, on July 20, 2022, as SOR/2022-168."
- **Source(s):** #1 (Canada Gazette)
- **Source tier:** B
- **Support:** `supports` — direct reference to the cited document.
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 9 — No enforcement discretion after January 1, 2026

- **Location:** § "Why these three nutrients — and why now?", paragraph 2
- **Claim text:** "the Canadian Food Inspection Agency has stated there is no enforcement discretion"
- **Source(s):** #3 (CFIA implementation plan)
- **Source tier:** B
- **Support:** `supports` — explicit CFIA statement on the cited page.
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 10 — Old-label products can be sold through

- **Location:** § "Why these three nutrients — and why now?", paragraph 3
- **Claim text:** "Pre-existing packaging — products imported, manufactured, or packaged at retail before January 1, 2026 — is allowed to be sold through."
- **Source(s):** #3 (CFIA implementation plan)
- **Source tier:** B
- **Support:** `supports`
- **Evidence strength:** `established`
- **Phrasing audit:** `phrasing-ok`
- **Status:** `verified`

### Claim 11 — Flexner et al. projection: 73–259 mg/day sodium reduction, 2–7 g/day sugar reduction, smaller sat-fat effect

- **Location:** § "Does this kind of label actually change behaviour?", paragraph 2
- **Claim text:** "average daily sodium intake could drop by 73 to 259 milligrams, total sugars by 2 to 7 grams, with smaller effects on saturated fat"
- **Source(s):** #4 (Flexner et al. 2023)
- **Source tier:** A
- **URL check:** verified
- **CrossRef check:** title, author, year all match
- **Support:** `supports` — figures from the paper's substitution scenarios.
- **Evidence strength:** `preliminary` (single modeling study, conservative estimates)
- **Phrasing audit:** `phrasing-ok` — uses "An early modeling study projects…", "modeled four substitution scenarios", "These are meaningful numbers but read them with care", "estimates come from a single modeling study". Matches `preliminary` evidence-strength conventions in skill 2 / evidence-strength.md.
- **Status:** `verified`

### Claim 12 — Flexner modeling projects 2,148–7,047 NCD deaths averted

- **Location:** § "Does this kind of label actually change behaviour?", paragraph 2
- **Claim text:** "The associated public-health modeling estimated that 2,148 to 7,047 deaths from non-communicable diseases could be averted over the medium term, primarily from cardiovascular causes."
- **Source(s):** #4 (Flexner et al. 2023)
- **Source tier:** A
- **Support:** `supports`
- **Evidence strength:** `preliminary`
- **Phrasing audit:** `phrasing-ok` — uses "estimated that", "could be averted", "over the medium term". Conditional language matches the modeling-projection context.
- **Status:** `verified`

### Claim 13 — Industry reformulation excluded from Flexner estimate; could amplify the effect

- **Location:** § "Does this kind of label actually change behaviour?", paragraph 2
- **Claim text:** "The authors note their projection is deliberately conservative: it does not include any benefit from food manufacturers reformulating products to drop just under the threshold — historically one of the larger effects of mandatory front-of-package labelling in other countries."
- **Source(s):** #4 (Flexner et al. — explicit limitation in paper)
- **Source tier:** A
- **Support:** `supports` — author-stated limitation.
- **Evidence strength:** `emerging` (reformulation effect documented in other regimes but transferability is the open question)
- **Phrasing audit:** `phrasing-ok` — "historically one of the larger effects" is calibrated; doesn't overstate.
- **Status:** `verified`

### Claim 14 — Guo et al. systematic review: warning labels show mixed results; Nutri-Score most effective among types studied

- **Location:** § "Does this kind of label actually change behaviour?", paragraph 3
- **Claim text:** "Across studies of younger consumers, graded indicators — especially Nutri-Score — performed best for purchase intention and food choice. Warning labels showed inconsistent results, sometimes effective and sometimes not."
- **Source(s):** #5 (Guo et al. 2024)
- **Source tier:** A
- **URL check:** 403 bot-walled (publisher); CrossRef verified
- **CrossRef check:** title, author, year all match
- **Support:** `supports` — direct paraphrase of the review's findings.
- **Evidence strength:** `emerging` to `contested` (mixed-effect finding; review notes limitations)
- **Phrasing audit:** `phrasing-ok` — uses "performed best", "showed inconsistent results, sometimes effective and sometimes not", "most studies were conducted in virtual shopping environments rather than real-world stores, and didn't specifically address Canada's 'high in' design." Matches `contested` / `emerging` conventions.
- **Status:** `verified`

---

## Claims marked `no-source-needed`

These are brand-voice / framing / reader-experience sentences that don't require citation per [.claude/skills/foodpulse-citation-check/references/verification-workflow.md](../.claude/skills/foodpulse-citation-check/references/verification-workflow.md) Phase 1 ("What does NOT count").

- **Opening grocery-aisle scene** (hook paragraph 1) — reader-experience framing, not a claim about the world.
- **"The honest answer is that it is neither. It's information."** (hook paragraph 3) — brand framing / editorial position.
- **"The symbol is most informative when you read it alongside the serving size on the back."** (callout) — practical interpretation; tied to the regulatory facts above.
- **All five numbered takeaways** — practical-tip framing using "Try…" / "Use it for…" conventions. Each ties back to a verified claim.
- **Soft coaching CTA** — brand opinion / service description.

---

## Recommended copy edits

**None.** All claims passed phrasing audit. No `phrasing-overstates` findings.

---

## Source-replacement recommendations

**None.** All 6 sources verified by the script. The bot-walled MDPI URL (source 5) is advisory only — CrossRef cleanly verified the title, author, and year. No source needs replacement.

---

## Human acknowledgments

Verdict is `ready` with zero flagged or unsourced items. No human acknowledgments required.

---

## Stamp procedure

When Etornam has reviewed the draft and signed off:

1. Stamp `reviewedAt` on the eventual Sanity document with the sign-off datetime.
2. Set `updatedAt` to the same value (this is the article's first publish — material content "change" applies).
3. Set `publishedAt` to the publish moment.
4. Save the Sanity document.

This skill does not perform the stamp — Etornam does, after editorial review and publication.

---

## Notes

- **The bot-walled MDPI URL** (source 5) is the second confirmed instance of skill 2's `url-bot-walled` classification logic operating as designed in the wild. The Wiley publisher URL in the original demo did the same thing in skill 2's own end-to-end test. This pattern is now well-validated.
- **Source 0** (Health Canada FOP page) was bot-walled during Phase 3 WebFetch (HTTP 403) but the verify-citations.mjs script's UA succeeded in fetching (200). The difference: WebFetch uses a strict-ish UA; the script's UA is `FoodPulse-CitationCheck/1.0 (+mailto:hello@foodpulse.co)`. Same URL, different gatekeeper response. Worth knowing.
- **One source path mismatch surfaced during synthesis:** my Phase 3 search returned the URL `https://www.canada.ca/en/health-canada/services/food-nutrition/nutrition-labelling/front-package.html` for the current Health Canada FOP page, whereas skill 2's earlier end-to-end test used `https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/nutrition-labelling/front-package.html` (with "healthy-eating" in the path). The earlier path 404'd in skill 2's test — confirming that Health Canada has reorganized this URL since the path I used in the earlier example fixture. The example sources file at `.claude/skills/foodpulse-citation-check/assets/sources-input-example.json` is now slightly stale and could be refreshed with the current URL.

---

## Verdict logic check

- ✓ Zero `flagged` items.
- ✓ Zero `unsourced` items.
- ✓ Zero `does-not-support` items.
- ✓ Zero `phrasing-overstates` items.
- ✓ Zero disallowed sources.
- ✓ 100% Tier A or B coverage (4 Tier B + 2 Tier A; target was ≥60%).

**Verdict: `ready`. Loop count: 0. Draft proceeds to editorial review.**
