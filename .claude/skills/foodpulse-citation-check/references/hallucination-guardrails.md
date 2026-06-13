# Hallucination guardrails

Specific LLM citation failure modes and how to catch each. Grounded in the documented hallucination rates from the strategy brief (GhostCite 2026: 14–95% across 40 domains; Liu et al. 2023: only ~51% of generative-search sentences fully supported by their cited sources).

Each pattern has a one-line detection cue and a one-line remediation cue. Some are caught by the script in Phase 3; others require the agent's semantic check in Phase 4.

---

## 1. Invented DOI

**Pattern.** A plausible-format DOI string (`10.xxxx/yyyy.2024.zzz.1234`) that doesn't resolve on CrossRef.

**Detection.** The script's `crossref.found: false` paired with a syntactically valid DOI.

**Remediation.** Find the real source. If the claim is real, the paper exists with a different DOI. If the claim was hallucinated alongside the DOI, remove the claim or replace it with a real citation.

**Why it happens.** LLMs produce text that *looks* like a real citation pattern, including the DOI shape. The string-shape constraints are easy to mimic; the actual registration with CrossRef is not.

---

## 2. Year drift (±1)

**Pattern.** A real paper exists at the claimed DOI, but the article cites it as 2024 when it was actually published in 2023.

**Detection.** The script's `crossref.match.year: mismatch`.

**Remediation.** Use the year CrossRef returns. Bump the citation's `year` field. If the article body says "in 2024…" change it to the correct year.

**Why it happens.** LLMs misremember years. Year is often the field with the lowest training-data signal — many papers don't surface their year prominently in the text the model trained on.

---

## 3. Author list error

**Pattern.** Real paper, real DOI, but the cited first author is wrong, or middle authors are invented, or the citation says "Smith et al." when the actual first author is Jones.

**Detection.** The script's `crossref.match.author: mismatch`.

**Remediation.** Use CrossRef's author list. For >3 authors, citation format is "First Author Lastname et al." Use the actual first author.

**Why it happens.** First-author memory is fragile for less-famous papers; for prominent papers the model has many training references and might cross-wire authors from related work.

---

## 4. Plausible-but-wrong journal

**Pattern.** Citation reads "published in *NEJM*" but the paper is actually in *American Journal of Clinical Nutrition*. Credibility inflation — readers trust NEJM more.

**Detection.** Compare CrossRef's `container-title` (journal name) against any journal name the article asserts. The script returns CrossRef metadata; the agent reads it in Phase 4.

**Remediation.** Use the actual journal name. If the article relied on the inflated journal name for rhetorical weight, rewrite that framing.

**Why it happens.** LLMs preferentially complete with high-prestige journal names because they appear more often in training data. Without a verification step, the inflation passes silently.

---

## 5. Social-to-primary jump

**Pattern.** Article cites a tweet, Instagram post, or YouTube video by a credentialed expert as if it were the primary research the expert is discussing.

**Detection.** Phase 4 — the agent reads the social post and notices it's referring to research, not presenting it. Look for "as I discuss in our paper…" or "we published this in…" in the post body.

**Remediation.** Find the underlying paper. Cite it as Tier A. Optionally keep the social post as a secondary citation when the expert's framing is itself the point.

**Why it happens.** Social posts are easily citable URLs; the underlying paper requires a step further to find. LLMs take the easier path.

---

## 6. Overgeneralization

**Pattern.** Source exists, source supports a *narrow* finding (specific population, specific conditions). Article applies the finding broadly.

**Examples.**
- Source: "In a cohort of 240 postmenopausal women in Spain." Article: "In adults."
- Source: "After 12 weeks of supplementation." Article: "Over the long term."
- Source: "In participants with prediabetes." Article: "In healthy people."

**Detection.** Phase 4 — read the source's methods, especially population, duration, and intervention specifics. Compare against the article's framing.

**Remediation.** Tighten the article's framing to match the source. If the article needs the broader claim, find a source that actually makes it.

**Why it happens.** LLMs strip the qualifying details when summarizing. Without verification, the over-broad version reads cleaner and slips through.

---

## 7. Statistic shape-shift

**Pattern.** Real number, wrong measure. "46% of Canadian daily energy from ultra-processed foods" reads as "Canadians eat 46% ultra-processed food by weight." Same number, different — and incorrect — meaning.

**Detection.** Phase 4 — check what the source actually measured. *Per cent of energy*, *per cent of grams*, *per cent of food items*, *per cent of meals* — these are different statistics.

**Remediation.** Restate the measure correctly. "46% of total daily caloric intake comes from ultra-processed foods (Statistics Canada, 2020 — measured as energy share)."

**Why it happens.** LLMs preserve numbers more reliably than units. Numbers feel like the substance; measures feel like the framing. Without verification, the framing slips.

---

## 8. Outdated regulation

**Pattern.** Article cites a Health Canada, FDA, EFSA, or CFIA rule. The rule has since been updated, replaced, or rescinded.

**Detection.** Phase 4 — check the citation date. Anything regulatory should be paired with a "last verified" check against the current institutional page.

**Remediation.** Find the current rule. Update the citation. Update the article body if the rule's substance changed (e.g. transition periods ended, thresholds shifted).

**Why it happens.** LLM training data has a cutoff. Regulations evolve. Without verification, the article asserts yesterday's rules as current.

**Specific watch.** Canada's 2026 front-of-package symbol enforcement timeline. US FDA Nutrition Facts updates. EFSA thresholds. WHO sugar/sodium recommendations. All have changed in the past several years.

---

## 9. The composite citation

**Pattern.** Citation merges details from two different real papers — the title from one, the authors from another, the year from a third. Each piece sounds right; the combination doesn't exist.

**Detection.** The script's CrossRef lookup catches it if any individual field mismatches. Multi-field mismatch in one citation is a strong signal.

**Remediation.** Pull each cited finding back to its actual source. Usually two or three separate citations replace the composite.

**Why it happens.** When the LLM "knows" several papers on a topic, fragments can interleave during generation.

---

## 10. The phantom institution

**Pattern.** Citation attributes a finding to "Stanford researchers" or "the Mayo Clinic" when the work was done elsewhere — or wasn't done at all.

**Detection.** Phase 4 — check the source's actual author affiliations.

**Remediation.** Use the real institutional affiliation. If the citation was institutional alone (no DOI), find the underlying study or remove the claim.

**Why it happens.** Institution names are short and high-recall in training data. They get pasted in even when the underlying source doesn't support the attribution.

---

## Detection checklist

When reviewing any source object, ask in order:

1. Does the URL resolve? (Script — Phase 3.)
2. If DOI is present, does it resolve on CrossRef? (Script — Phase 3.)
3. Do title / author / year match what CrossRef returns? (Script — Phase 3.)
4. Does the article's journal-name claim match CrossRef's `container-title`? (Agent — Phase 4.)
5. Does the source's *actual content* support the claim, with the same scope (population, duration, intervention)? (Agent — Phase 4.)
6. Are the numbers and their measures the same in source and article? (Agent — Phase 4.)
7. If regulatory, is the rule still current? (Agent — Phase 4.)
8. Does the article cite a social post when it should cite the underlying paper? (Agent — Phase 4.)

A negative on any check is a flag. Multi-flag citations are removed-and-replaced, not edited.

---

## Why the script catches some and the agent catches others

The script is deterministic but myopic — it sees the metadata. The agent is judgment-based but slow — it reads the source.

| Failure mode | Catcher |
|---|---|
| Invented DOI | Script |
| Year drift | Script |
| Author list error | Script |
| Plausible-but-wrong journal | Script (metadata) + Agent (confirmation) |
| Social-to-primary jump | Agent |
| Overgeneralization | Agent |
| Statistic shape-shift | Agent |
| Outdated regulation | Agent |
| Composite citation | Script (partial) + Agent |
| Phantom institution | Agent |

Run both. Each catches what the other misses.
