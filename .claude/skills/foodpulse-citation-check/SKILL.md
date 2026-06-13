---
name: foodpulse-citation-check
description: FoodPulse citation integrity and fact-check gate. Use BEFORE marking any FoodPulse article, video script, newsletter, or social caption as ready to publish so every factual claim is sourced, every source verified against CrossRef and URL liveness, and every claim labeled by evidence strength. Hard publish dependency for foodpulse-deep-research-article and the brand's anti-hallucination moat.
---

# FoodPulse Citation Check

The publish gate. The `[[foodpulse-house-style]]` skill encodes *"cite everything"* as the brand's #2 non-negotiable; this skill enforces it. Every article, video script, newsletter, and social caption runs through this skill before a human sign-off. It is also the hard dependency for `[[foodpulse-deep-research-article]]` (Wave 2) — drafts that don't pass this skill don't ship.

**Why this skill exists.** Documented LLM citation hallucination rates run **14–95%** across 40 domains (GhostCite benchmark, Xu et al., 2026); only ~51% of generative-search sentences are fully supported by their cited sources (Liu et al., 2023). FoodPulse's E-E-A-T moat depends on a credentialed researcher standing behind every claim. One fabricated citation collapses the brand. The script in this skill catches the deterministic failures (dead URLs, invented DOIs, year drift); the workflow forces the agent through the semantic ones (claim/source mismatch, overstated evidence strength).

## When to use

- Before marking any FoodPulse content as ready to publish.
- When auditing an existing article during the quarterly review (`reviewedAt` stamping).
- When a cited paper is retracted or a regulation changes — re-verify the affected articles.
- When `[[foodpulse-deep-research-article]]` produces a draft (mandatory hand-off).

If the work has a factual claim, run this skill. Even short newsletter blurbs.

## The 6-phase verification workflow

Full detail in [references/verification-workflow.md](references/verification-workflow.md). At a glance:

1. **Extract claims.** Walk the draft. Every statistic, regulatory rule, study reference, named-institution finding, and scientific claim is a "verifiable claim." Output a list with section anchors.
2. **Match to source.** For each claim, find the source (inline `link` annotation OR the article's `sources` array). Anything without a match is `unsourced`.
3. **Verify existence (deterministic).** Run [scripts/verify-citations.mjs](scripts/verify-citations.mjs) on the sources array. The script returns URL liveness + CrossRef metadata match.
4. **Verify support (semantic).** The agent reads each source (abstract minimum) and answers: does the source actually say what the claim says? Outcomes: `supports`, `partial`, `does-not-support`.
5. **Label evidence strength.** Per [references/evidence-strength.md](references/evidence-strength.md), every claim gets `established`, `emerging`, `contested`, or `preliminary`. Copy phrasing must match.
6. **Produce report.** Use [assets/verification-report-template.md](assets/verification-report-template.md).

## The publish gate

**Soft gate with structured overrides.** Every claim is classified as one of:

| Status | When | Effect on gate |
|---|---|---|
| `verified` | Source exists + supports claim + strength label matches phrasing. | Pass. |
| `flagged` | Source missing, dead, mismatched, doesn't support claim, or evidence-strength overstated. | Blocks publish. |
| `unsourced` | Claim has no source at all. | Blocks publish. |
| `no-source-needed` | Cooking-step instruction, brand opinion, narrative framing. | Pass. |
| `context-only` | Hypothetical, illustrative scenario, reader anecdote. | Pass. |

Publish requires **zero `flagged` or `unsourced` items**, OR a per-item human acknowledgment in the report (the human is on record that they reviewed and chose to ship anyway). Default verdict from the report: `ready` / `needs-edits` / `blocked`.

## How to run the script

The skill orchestrates a Node script for the deterministic checks. From the repo root:

```bash
node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs sources.json > report.json
```

Or via stdin:

```bash
cat sources.json | node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs --stdin > report.json
```

Input shape: an array of `{title, url, author?, year?, doi?}` objects matching the Sanity `article.sources` schema, with optional `doi`. Output shape: a JSON report with `summary` and per-source `results`. Full schemas in [scripts/README.md](scripts/README.md).

The script handles URL liveness + CrossRef metadata lookup. It does **not** check whether a source supports a claim — that's Phase 4 of the workflow, irreducibly LLM-semantic.

## Source hierarchy at a glance

Full breakdown in [references/source-hierarchy.md](references/source-hierarchy.md).

- **Tier A — Primary research.** Peer-reviewed journal articles via DOI. Preferred.
- **Tier B — Authoritative institutions.** Health Canada, WHO, NIH, CDC, EFSA, FDA, CFIA, Statistics Canada.
- **Tier C — Reputable secondary.** Major science publications, Cochrane summaries.
- **Tier D — Tertiary / community.** Wikipedia, news, social-media expert commentary. Acceptable as a *starting point* only — every Tier D citation must chain to a Tier A or B source.

**Disallowed:** promotional content, supplement brand sites, fad-diet primary sources, preprints presented as established (preprints are fine when labeled `preliminary`).

## Hallucination guardrails

Specific failure modes to look for; full detection cues in [references/hallucination-guardrails.md](references/hallucination-guardrails.md):

- Invented DOIs (plausible-format DOI strings that 404 on CrossRef).
- Year drift (real paper, year off by 1).
- Author list error (real paper, wrong first author or invented middle authors).
- Plausible-but-wrong journal (citation reads "NEJM" but paper is elsewhere).
- Social-to-primary jump (Twitter cited as if it were the study).
- Overgeneralization (narrow finding applied broadly).
- Statistic shape-shift (real number applied to the wrong measure).
- Outdated regulation (Health Canada / FDA rule changed since the article was written).

The script catches 1, 2, 3, 4 deterministically. The agent catches 5, 6, 7, 8 semantically.

## Evidence-strength labeling

Every claim gets one of four labels and copy phrasing must match. Full phrasing rules in [references/evidence-strength.md](references/evidence-strength.md).

- `established` → "Studies consistently show…", "Consensus is…", "Health Canada and WHO agree…"
- `emerging` → "Emerging evidence suggests…", "Early research points to…"
- `contested` → "Evidence is mixed — some studies show X, others Y."
- `preliminary` → "An early study found…", "One trial reported…", "More research is needed…"

The skill flags any claim where phrasing overstates the label.

## Sources block formatting

Rules for the Sanity `article.sources` array (`{title, url, author, year}`) are in [references/sources-block-rules.md](references/sources-block-rules.md). Cross-references skill 1's sanity-schema-map. Key points: citation-order, DOI URLs preferred, exact titles, first-author-plus-et-al for >3 authors, institution name for institutional sources.

## Freshness & review

Quarterly review cadence; `reviewedAt` stamping rules; when to re-verify a single claim early. Full rules in [references/freshness-and-review.md](references/freshness-and-review.md). After a successful verification pass, the agent stamps `reviewedAt` on the Sanity document with today's ISO datetime. `updatedAt` is only bumped on material content change, not on re-verification alone.

## Hand-off back to skill 1

When the gate passes:

1. Stamp `reviewedAt` per [references/freshness-and-review.md](references/freshness-and-review.md).
2. Hand the draft back to `[[foodpulse-house-style]]` for a final voice/structure pass if not already done.
3. The draft is ready for human review and publish.

When the gate blocks:

1. Surface the per-claim findings in the report.
2. Recommend specific copy edits or source replacements.
3. Loop: agent or human revises; re-run the workflow.

## The human-judgment boundary

This skill produces a structured report. It does **not** publish. Etornam C. Tsyawo reads the report, accepts or overrides each flagged item, and signs off. The gate exists to make the human review *faster and more focused*, not to replace it.

## Test fixture

A synthetic 600-word FoodPulse draft with planted issues lives at [tests/planted-citation-test.md](tests/planted-citation-test.md). Running the workflow against it must flag the invented DOI, the overstated-strength claim, and the unsourced claim — and verify the two good claims. This is the Wave 1 Skill 2 benchmark from the strategy brief.
