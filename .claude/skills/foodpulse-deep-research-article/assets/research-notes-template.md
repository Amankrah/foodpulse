<!--
FOODPULSE RESEARCH NOTES — Phase 3 output

Paste this scaffold and add a section per source. One source per block. The
synthesis phase (Phase 4) reorganizes these notes by *claim*, not by source.

See: .claude/skills/foodpulse-deep-research-article/references/source-gathering-workflow.md
-->

# Research notes — TODO topic name

**Topic brief:** [link to or quote the brief's working title + angle]
**Pipeline run:** TODO short identifier
**Date gathered:** TODO YYYY-MM-DD
**Tools used:** WebSearch, WebFetch [, deep-research delegation if used]

---

## Source inventory

Quick summary before the per-source detail.

| # | Title (short) | Tier | Evidence type | Year |
|---|---|---|---|---|
| 1 | TODO | A/B/C/D | RCT / systematic review / regulatory rule / etc. | YYYY |
| 2 | TODO | | | |
| 3 | TODO | | | |
| ... | | | | |

**Counts:** Total: TODO. Tier A: TODO. Tier B: TODO. Tier C: TODO. Tier D: TODO. (Aim: ≥60% A+B.)

---

## Source 1 — TODO short title

### Source object (for Phase 6 sources array)

```yaml
title: "Exact title — no abbreviation"
url: "https://canonical-url-here"
doi: "10.xxxx/yyyy"            # if applicable; remove if no DOI
author: "First author + et al." # or institution name
year: "YYYY"
```

### Tier

- **Tier:** A / B / C / D
- **Rationale:** TODO — one line explaining tier (e.g. "peer-reviewed systematic review in Cochrane Library → Tier A"; "Health Canada regulatory page → Tier B").

### Evidence type

TODO — one of: RCT / systematic review / umbrella review / meta-analysis / prospective cohort / cross-sectional / case-control / case series / regulatory rule / institutional guidance / secondary reporting / other.

### Key claims this source supports

For each claim:

1. **Claim:** TODO — the specific assertion this source supports.
   - **Page or section:** TODO — e.g. "p. 12, Table 2" / "Methods §2.3" / "Abstract" / "Figure 1".
   - **Evidence strength (preliminary read):** established / emerging / contested / preliminary.
   - **Caveats:** TODO — population, duration, scope limits. (e.g. "240 postmenopausal women aged 55–70, 12-week intervention").
   - **Effect size detail (if numerical):** TODO — RR / ARR / NNT / absolute number, with the reporting type clear.

2. **Claim:** TODO — second claim, if applicable.
   - **Page or section:** TODO
   - **Evidence strength:** ...
   - **Caveats:** ...
   - **Effect size detail:** ...

### Notes

- **Conflict of interest:** TODO — any industry funding disclosed.
- **Quality concerns:** TODO — e.g. small sample, short duration, surrogate outcome, unregistered trial.
- **Canadian context:** TODO — if Canada-relevant, note how.
- **NOVA-related:** TODO — if the source uses or critiques NOVA, note position.
- **Other:** TODO — anything Phase 4 should carry forward.

---

## Source 2 — TODO short title

(Repeat the per-source block.)

---

## Contested areas surfaced

If any topic area has sources on multiple sides of an active scientific debate, list them here. Phase 4 uses this to plan `contested` evidence-strength labeling.

### Contested area 1 — TODO description

- **Side A:** TODO — claim + supporting source(s).
- **Side B:** TODO — claim + supporting source(s).
- **Why contested:** TODO — methodological difference / population difference / interpretation difference.
- **FoodPulse framing approach:** Name both, attribute the divergence, label `contested`. See [.claude/skills/foodpulse-citation-check/references/evidence-strength.md](../../foodpulse-citation-check/references/evidence-strength.md) for on-brand `contested` phrasing.

---

## Canada-specific elements captured

Map each "Canada-context elements" checkbox from the topic brief to specific sources.

- **Canada's Food Guide:** TODO — source(s) + key claim.
- **2026 FOP rule:** TODO — source(s) + the 15% DV trigger explicit.
- **Statistics Canada Health Reports:** TODO — source(s) + CCHS cycle year.
- **Health Canada regulation:** TODO — source(s).
- **Other:** TODO.

---

## Gaps and stop reasons

Document what you searched for that didn't yield results — Phase 4 may need to know.

- **Topics searched without finding adequate sources:** TODO — list and brief description.
- **Tier A/B targets not met:** TODO — yes / no; if yes, what tier mix did you end up with?
- **Saturated (no new claims surfaced in last 2 searches):** TODO — yes / no.
- **Stop reason:** TODO — "target count hit", "saturation", "evidence-base thin (surfaced to user)", "contested areas covered both sides".

---

## Handoff to Phase 4

Phase 4 should now:

1. List every distinct claim from all sources.
2. Cluster claims by topic / by article section.
3. Assign per-claim evidence-strength labels (verify against the preliminary reads above).
4. Identify which contested areas need explicit dual-source treatment.
5. Map claims to article skeleton sections (hook / definition / H2 #1 / H2 #2 / takeaway / FAQ).

The synthesis output replaces this per-source organization with a per-claim outline — that's the artifact Phase 5 drafts from.
