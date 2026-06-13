# Source-gathering workflow

Phase 3 of the pipeline. Build a structured research-notes document. Source taxonomy and trusted-domain allowlist live in skill 2's [.claude/skills/foodpulse-citation-check/references/source-hierarchy.md](../../foodpulse-citation-check/references/source-hierarchy.md); this file is the **workflow** for *gathering*, not the *taxonomy*.

---

## Tool requirements

- **WebSearch** — for query fan-out.
- **WebFetch** — for reading candidate sources.

If either is missing, the skill produces a degraded draft (per SKILL.md). Continue, but flag the limitation.

---

## Query strategy

### Step 1 — Anchor with the most-recent systematic review or umbrella review

The single highest-value first query for any evidence-based article. A 2023–2026 systematic review:

- Condenses decades of primary research into one citable Tier A source.
- Surfaces the contested areas you'll need to honor in Phase 4.
- Often cites the canonical primary studies you'll want as additional sources.

Search formula: `<topic> systematic review` OR `<topic> umbrella review` OR `<topic> meta-analysis 2024 2025 2026`.

If a recent Cochrane review exists, prefer it.

### Step 2 — Layer in Canadian institutional sources

For any topic that touches:
- Regulation → search canada.ca + inspection.canada.ca.
- Population dietary intake → search statcan.gc.ca + Statistics Canada Health Reports.
- Dietary guidance → search food-guide.canada.ca + canada.ca/health-canada.

These are Tier B sources from skill 2's hierarchy. Always cite them when the topic warrants.

### Step 3 — Find the contested side (when applicable)

For topics with active scientific debate (e.g. saturated fat, NOVA classification, intermittent fasting, dietary cholesterol), deliberately search the **opposing** position:

- Search formula: `<topic> critique` OR `<topic> controversy` OR `<topic> contested`.

Phase 4 (synthesis) needs sources for both sides to honour `contested` evidence-strength labeling.

### Step 4 — Pull primary research for narrow claims

When a claim is specific ("Polyphenols in olive oil reduce X by Y%"), find the primary RCT or cohort study. CrossRef and PubMed are the right surfaces; WebFetch them when needed.

### Step 5 — Stop searching

Stop when:
- Target source counts hit (see below).
- The next source surfaces no new claims (saturation).
- Contested areas have at least one source per side.

---

## Target source counts

| Article length | Min sources | Target | Max useful |
|---|---|---|---|
| Short explainer (900–1,200 words) | 4 | 4–6 | 7 |
| Standard article (1,500–2,500 words) | 6 | 6–10 | 12 |
| Deep dive (3,000+ words) | 8 | 10–15 | 18 |

Going beyond max-useful dilutes the article and wastes Phase 7 verification time. Better to drop a marginal source than carry it.

---

## Source-tier targets

- **≥60% Tier A or B** is the floor. Aim for 75%+ on standard articles.
- **Tier C** acceptable in moderation (≤30%) for framing/secondary context.
- **Tier D** acceptable as a starting point only. Every Tier D citation in the final draft must chain to a Tier A/B source. If a Tier D source surfaces a claim and no Tier A/B source corroborates, drop the claim — don't ship it.

If your search returns Tier C/D-heavy results, search harder for Tier A/B before proceeding. The default symptom of weak Phase 3 is publishing a draft where the citation-check skill flags evidence-strength mismatches.

---

## What to record per source

Use [assets/research-notes-template.md](../assets/research-notes-template.md). For each source:

```yaml
- source:
    title: "Exact title (no abbreviation)"
    url: "Canonical URL (DOI preferred for journals)"
    doi: "10.xxxx/yyyy"           # if applicable
    author: "First author + et al. OR institution name"
    year: "YYYY"
  tier: "A" | "B" | "C" | "D"
  evidence_type: "RCT" | "systematic review" | "umbrella review" | "cohort" | "cross-sectional" | "regulatory rule" | "institutional guidance" | "secondary reporting" | "other"
  key_claims:
    - claim: "Specific claim this source supports"
      page_or_section: "p. 12" | "Methods §2.3" | "Figure 1"
      evidence_strength: "established" | "emerging" | "contested" | "preliminary"
      caveats: "Population/duration/scope limits, if any"
  notes: "Anything else worth carrying forward — context, conflict of interest, methodology concerns"
```

Each captured `claim` becomes a candidate for the article's outline in Phase 4.

---

## Specific search formulas worth knowing

### For Canadian-context articles

- `site:canada.ca <topic>` — Government of Canada pages.
- `site:statcan.gc.ca <topic>` — Statistics Canada.
- `site:inspection.canada.ca <topic>` — CFIA.
- `Statistics Canada Health Reports <topic>` — population dietary intake data.

### For peer-reviewed primary research

- `<topic> randomized controlled trial` — RCT-focused.
- `<topic> cohort study` — observational, large-n.
- `<topic> Cochrane review` — systematic review benchmark.
- `<topic> meta-analysis` — quantitative synthesis.

### For evidence-strength labeling

- `<topic> consensus statement` — for `established`.
- `<topic> emerging evidence` — for `emerging`.
- `<topic> contested` OR `<topic> critique` — for `contested`.
- `<topic> preliminary` OR `<topic> pilot study` — for `preliminary`.

### For Canada's 2026 FOP rules specifically

- `Health Canada front-of-package nutrition symbol`
- `CFIA front-of-package enforcement 2026`
- `Canada Gazette nutrition labelling 2022 final regulations`

### For Canada's Food Guide

- `Canada Food Guide 2019 revision`
- `Canadian dietary patterns Statistics Canada`

---

## Anti-patterns

- **Sourcing from search-result summaries instead of opening the source.** WebSearch snippets are not citations. Open the source; verify the claim it actually makes.
- **Treating a press release as primary research.** A press release announcing a paper is Tier C at best. Cite the paper directly.
- **Citing a tweet thread that summarizes a paper.** Cite the paper.
- **Letting a single Tier A source carry too much weight.** A single landmark study is `preliminary`-strength even if it's well-designed. Pair with at least one corroborating source or label `preliminary`.
- **Skipping the contested-side search.** Articles that pick one side of an active debate without acknowledging the other ship as overstated.
- **Treating absence of evidence as evidence of absence.** "No studies found on X" doesn't mean X is debunked — it means the topic isn't well-studied. Label `preliminary` or `emerging`, don't take a strong position.

---

## When to delegate to the generic `deep-research` skill

If the topic is:
- Politically contested with stakeholders on multiple sides.
- Backed by a literature too large to scan in a single agent context (e.g. saturated fat, dietary patterns at population level, the full UPF debate).
- Time-sensitive in a way that requires multiple parallel searches.

…then Phase 3 can delegate to the host's generic `deep-research` skill. The generic skill fans out searches in parallel, fetches sources, adversarially verifies claims, and synthesizes a cited report. Take that report as your Phase 3 output and resume FoodPulse-specific framing at Phase 4.

If the host doesn't have `deep-research` available, do the inline workflow described in this file.

---

## Stop conditions (in order)

1. Target source count hit and Phase 4 has enough material to outline the article.
2. Next 2 searches return no new sources or claims (saturation).
3. Tier targets met (≥60% A/B).
4. Contested areas have sources for both sides.

When all 4 conditions are met, hand off to Phase 4 (synthesize).

If you can't satisfy condition 3 or 4 after extended search, that's a signal the topic's evidence base is thin. Surface this to the user before drafting:

> The evidence base for this topic is limited — I found [N] sources but only [M] are Tier A or B. The article will need to lean heavily on `preliminary` and `emerging` phrasing, or you may want to narrow the angle to a better-evidenced sub-topic. How would you like to proceed?
