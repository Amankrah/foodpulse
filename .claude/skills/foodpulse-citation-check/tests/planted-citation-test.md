<!--
PLANTED CITATION TEST FIXTURE

A synthetic FoodPulse draft with intentional citation problems. Running the
6-phase workflow against this draft must:

  ✓ Flag the invented DOI (claim 3)               → issue: doi-not-found
  ✓ Flag the overstated-strength phrasing (claim 4) → issue: phrasing-overstates
  ✓ Flag the unsourced numerical claim (claim 5)   → issue: unsourced
  ✓ Verify the two real claims (1 and 2)

This is the Wave 1 Skill 2 benchmark from the compass strategy brief:
"the citation skill correctly flags at least one deliberately planted bad
citation in a test draft."

If any required flag is missed, the skill needs work before it ships.
-->

---
title: "Ultra-processed foods on the Canadian plate — what the evidence shows"
slug: "ultra-processed-foods-canadian-plate-test-fixture"
excerpt: "Ultra-processed foods account for nearly half of daily energy intake in Canada. Here's what that means for diet quality and where the evidence is and isn't settled."
category: "food-and-wellbeing"
author: "Etornam C. Tsyawo"
publishedAt: "2026-06-13T12:00:00Z"
tags: ["ultra-processed-foods", "nova", "canadian-diet", "health-canada"]
---

# Ultra-processed foods on the Canadian plate

## What the data shows

**[CLAIM 1 — should verify]** Statistics Canada reports that nearly half — around 46% — of daily energy consumed by Canadian adults comes from ultra-processed foods, based on the 2015 Canadian Community Health Survey. The trend has been roughly stable over the past decade, edging down from 48% in 2004.

[Source: Polsky et al., Statistics Canada Health Reports, 2020 — see source #1 below.]

## What the regulation says

**[CLAIM 2 — should verify]** Canada's front-of-package nutrition symbol — the black-and-white magnifying-glass "high in" mark — became mandatory on January 1, 2026, following a transition period that ended December 31, 2025. The symbol is triggered when a serving exceeds 15% of the daily value for saturated fat, sugars, or sodium.

[Source: Health Canada Front-of-Package final regulations, 2022 — see source #2 below.]

## Where the picture gets more nuanced

**[CLAIM 3 — INVENTED DOI; should be flagged]** A 2024 cohort study published in the *Canadian Journal of Nutrition Sciences* found that adults who replaced 10% of their ultra-processed food intake with whole foods saw measurable improvements in metabolic markers after six months.

[Source: Hallucinated et al., 2024 — see source #3 below. This entry is planted; the DOI doesn't exist.]

**[CLAIM 4 — OVERSTATED STRENGTH; should be flagged]** Studies consistently show that intermittent fasting improves long-term metabolic health in adults across age groups.

[Source: A single 12-week open-label trial in 47 adults with obesity. The phrasing "Studies consistently show…" is `established`-level language sitting on top of `preliminary` evidence. The skill must flag this as `phrasing-overstates` regardless of whether the underlying source verifies.]

## What we don't yet know

**[CLAIM 5 — UNSOURCED; should be flagged]** Around 30% of Canadians regularly skip breakfast, and this group tends to consume more ultra-processed snacks later in the day.

[No source provided. The skill must flag this claim as `unsourced` because no citation backs the 30% figure.]

---

## Sources & references

1. Polsky, J. Y.; Moubarac, J.-C.; Garriguet, D. *Consumption of ultra-processed foods in Canada.* Statistics Canada Health Reports, 2020. https://www150.statcan.gc.ca/n1/pub/82-003-x/2020011/article/00001-eng.htm
2. Health Canada. *Front-of-Package Nutrition Labelling — Final Regulations.* 2022. https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/nutrition-labelling/front-package.html
3. Hallucinated, A.; Fictional, B. *Replacement of ultra-processed foods and metabolic markers in Canadian adults.* Canadian Journal of Nutrition Sciences, 2024. https://doi.org/10.1234/foodpulse.2026.fake.99999

## Expected workflow output

When the agent runs the 6-phase workflow on this fixture, the resulting report must show:

- **Summary:** 5 claims extracted. 2 verified. 3 flagged. 0 unsourced overrides.
- **Per-claim findings:**
  - Claim 1: `verified` (URL ok; no DOI). Tier B. Strength `established`. Phrasing ok.
  - Claim 2: `verified` (URL ok; no DOI). Tier B. Strength `established`. Phrasing ok.
  - Claim 3: `flagged` — issue `doi-not-found`. Tier A claimed but not verifiable. Recommend: replace source or remove claim.
  - Claim 4: `flagged` — issue `phrasing-overstates`. Recommend rewrite: "An early trial in 47 adults with obesity reported improved metabolic markers after 12 weeks of time-restricted eating. Larger trials are underway."
  - Claim 5: `flagged` — issue `unsourced`. Recommend: source the 30% figure or remove the statistic.
- **Verdict:** `needs-edits` (3 flagged items, all with clear remediations).

Running this fixture is how we close out the Wave 1 Skill 2 benchmark. If the report comes out different, the skill needs adjustment before it ships.

### How to run the deterministic phase against this fixture's sources

Extract the three source entries above into a JSON array (matching the input schema in [../scripts/README.md](../scripts/README.md)) and run:

```bash
node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs path/to/extracted-sources.json
```

The script must return `verified` for sources 1 and 2 (assuming network + Statistics Canada / canada.ca availability) and `flagged` for source 3 (`doi-not-found`). The full 6-phase workflow then handles claims 4 (phrasing) and 5 (unsourced) — neither of which is a script-detectable issue.
