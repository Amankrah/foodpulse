# Research method primer

FoodPulse-specific research literacy. Used in Phases 3 (gathering) and 4 (synthesis) to read nutrition studies critically, label evidence strength accurately, and handle conflicting evidence honestly.

The compass brief explicitly lists this as a required reference. Sections below match the brief's requested coverage: how to read a nutrition study, effect sizes vs relative risk, the NOVA classification and its controversy, how to handle conflicting evidence.

---

## How to read a nutrition study

Six dimensions to check on every primary source. Each can flip a `supports` finding into `partial` or `does-not-support`.

### 1. Sample size and statistical power

- **Small samples** (<100 in an RCT, <1,000 in an observational study) often can't detect modest effects reliably.
- **Power calculations** in the methods section state what effect size the study was designed to detect. If the study reports a "null" finding, check whether it was powered to find the effect at all.
- **Massive samples** (>100,000 in an observational study) can detect statistically significant effects so small they're not clinically meaningful.

**Decision rule.** A small-sample study reporting a positive effect is `preliminary` at best. A large-sample observational study reporting a tiny effect is `emerging` and the *magnitude* matters more than the *p-value*.

### 2. Study design

Hierarchy of evidence for causal claims:

1. **Systematic review / meta-analysis of RCTs** — strongest causal inference.
2. **Single RCT** — causal inference under intervention.
3. **Prospective cohort** — associations over time, controlling for confounders.
4. **Cross-sectional observational** — associations at a point in time. **No causal inference.**
5. **Case-control** — useful for rare outcomes; high bias risk.
6. **Case series / case report** — hypothesis-generating only.
7. **Expert opinion / consensus statement** — useful for guidance, not for primary claim.

**Decision rule.** Articles citing observational evidence for a causal claim ("X causes Y") almost always need their phrasing softened to associative ("X is associated with Y").

### 3. Duration

- **Short trials** (<12 weeks) often catch acute effects but miss long-term ones.
- **Medium trials** (3–12 months) good for metabolic outcomes.
- **Long trials** (>1 year) rare but necessary for hard endpoints (mortality, cardiovascular events).

**Decision rule.** A 12-week intermittent-fasting trial that shows metabolic improvement is `preliminary` for "long-term metabolic health." Don't generalize duration.

### 4. Population

The "in 240 postmenopausal women in Spain" trap. Pay attention to:

- **Age range** — adult studies don't translate to children.
- **Sex / gender distribution** — many older nutrition trials over-recruited men; findings may not generalize.
- **Ethnicity** — studies in one population may not generalize to others (e.g. lactose tolerance, alcohol metabolism).
- **Baseline health status** — findings in people with obesity may not generalize to people without.
- **Geographic/cultural setting** — Mediterranean diet trials in Spain vs Canada have different ambient food environments.

**Decision rule.** When the article frames a finding more broadly than the source population, soften the framing or flag the gap.

### 5. Outcome measure

- **Clinical outcomes** — mortality, hospitalization, disease incidence. Highest value.
- **Surrogate outcomes** — biomarkers (LDL cholesterol, HbA1c, blood pressure). Useful proxies but don't always predict clinical outcomes.
- **Self-reported outcomes** — diet questionnaires, mood scales. Useful but bias-prone.
- **Mechanism markers** — gene expression, gut-microbiome composition. Interesting but rarely actionable.

**Decision rule.** Articles citing surrogate outcomes shouldn't claim clinical benefit. "X lowers cholesterol" ≠ "X prevents heart attacks."

### 6. Conflict of interest

- **Industry funding** — disclosed by major journals. Doesn't invalidate findings but warrants closer scrutiny.
- **Author affiliations** — researchers at supplement-brand-funded institutes vs academic centers.
- **Trial registration** — registered trials (ClinicalTrials.gov, ISRCTN) less prone to outcome-switching.

**Decision rule.** A single industry-funded study is `preliminary` regardless of how positive it sounds. An industry-funded study that aligns with multiple independent studies is fine to cite at `established` strength — the corroboration matters more than the funding.

---

## Effect size vs relative risk

The single most common evidence-inflation pattern in health writing.

### The problem

"X reduces Y by 50%" sounds enormous. Often it isn't.

- **Relative risk reduction (RRR).** Compares the rate in the treated group to the rate in the untreated group. Headline-friendly but scale-blind.
- **Absolute risk reduction (ARR).** The actual percentage-point difference between groups. Boring, accurate.
- **Number needed to treat (NNT).** How many people need to receive the intervention for one to benefit. Most concrete framing.

### Concrete example

An RCT finds that a dietary intervention reduces 10-year cardiovascular event rate from 4.0% to 2.0%.

- **RRR:** 50% reduction. (Sounds huge.)
- **ARR:** 2 percentage points. (Sounds modest.)
- **NNT:** 50 people need to follow the intervention for 10 years for 1 to avoid a CV event. (Sounds modest and actionable.)

All three are the same finding. The framing changes the reader's reaction.

### On-brand framing for FoodPulse

When the source reports RRR, FoodPulse articles should:

1. Always provide ARR or NNT alongside RRR.
2. Use plain-language framing: "The trial found a 50% relative reduction in cardiovascular events — about 2 fewer events per 100 people over 10 years."
3. Never quote RRR alone for low-baseline-risk outcomes; it's misleading.

### When the source doesn't report ARR/NNT

Many secondary sources strip the absolute numbers. Open the primary paper. If the abstract reports only RRR and the methods don't enable ARR calculation, flag this in the synthesis — the article can still cite the finding but should note the framing limitation.

---

## The NOVA classification

The brief calls this out specifically as a required topic.

### What NOVA actually defines

A four-group food classification developed by Brazilian researchers (Monteiro et al.):

- **Group 1 — Unprocessed or minimally processed.** Whole foods. Fresh fruit, vegetables, meat, eggs, milk, dried legumes, plain yogurt.
- **Group 2 — Processed culinary ingredients.** Oils, butter, sugar, salt, vinegar — derived from Group 1, used in cooking.
- **Group 3 — Processed foods.** Group 1 + Group 2 with minimal additional processing. Canned vegetables, cheese, fresh-baked bread, salt-cured meats.
- **Group 4 — Ultra-processed foods (UPFs).** Industrial formulations with ingredients you wouldn't keep in a home kitchen. Soft drinks, packaged snacks, instant noodles, reconstituted meat products, packaged breakfast cereals.

### Why it's load-bearing for FoodPulse

The brand's most-cited Canadian statistic — *"about 46% of total daily energy consumed by Canadians in 2015 came from ultra-processed foods"* (Statistics Canada Health Reports, 2020) — is measured using the NOVA framework. Statistics Canada uses NOVA; Health Canada has not formally adopted it but its policy guidance is NOVA-adjacent.

### The contested side

NOVA is contested in three ways:

1. **Operational ambiguity.** What counts as ultra-processed? Whole-grain industrial bread? Yogurt with added probiotics? Reasonable researchers disagree on edge cases.
2. **Conflation argument.** Critics (often food-industry-funded) argue NOVA conflates nutritionally diverse products under one label — packaged whole-grain bread and a cola both being "UPFs" doesn't capture meaningful difference.
3. **Causal vs associative.** Most UPF-health evidence is observational. Whether UPFs *cause* adverse outcomes vs being a marker for other dietary patterns is an active debate.

### Recommended FoodPulse framing for NOVA

- When citing a NOVA-based statistic, name the framework: "*Per the NOVA classification, used by Statistics Canada,* about 46% of Canadian daily energy comes from ultra-processed foods (Statistics Canada Health Reports, 2020)."
- When the topic is *what* UPFs are, acknowledge the operational ambiguity.
- When the topic is *whether* UPFs harm health, lean on `emerging` to `contested` evidence-strength labeling (Lane et al., BMJ 2024 umbrella review is the strongest current Tier A source; results are consistent with harm but causation isn't settled).
- Do **not** quote a single observational study at `established` strength on UPF causation.

---

## Handling conflicting evidence

### Pattern 1 — Two meta-analyses disagree

Name both. Attribute the divergence (different inclusion criteria? different time windows? different effect sizes?). Don't pick a winner unless one is clearly methodologically superior. Label `contested`.

Example phrasing:

> Two recent meta-analyses reach different conclusions on saturated fat and cardiovascular risk. The 2020 Cochrane review of RCTs found a 17% relative reduction in cardiovascular events when saturated fat is replaced with polyunsaturated fat (Hooper et al., 2020). A 2014 prospective-cohort meta-analysis found no significant association between saturated fat intake and cardiovascular events (Chowdhury et al., 2014). The Cochrane review's RCT design makes it stronger for causal inference, but the cohort data shapes how researchers think about real-world dietary patterns.

### Pattern 2 — A landmark RCT contradicts the prior literature

Flag as `contested` and acknowledge the open question. Don't quietly upgrade the new RCT to `established` — wait for independent replication.

### Pattern 3 — Guidance is being revised

When official guidance (Canada's Food Guide, US Dietary Guidelines, WHO recommendations) is in the middle of a revision cycle, show the trajectory:

> Dietary cholesterol guidance has shifted over the past decade. The 2015 US Dietary Guidelines removed the 300mg/day cholesterol cap that had stood since 1977, after a National Academies review found insufficient evidence linking dietary cholesterol to blood cholesterol for most adults. Canada's Food Guide does not set a cholesterol limit; current Health Canada guidance emphasizes overall dietary pattern over single-nutrient targets.

### Pattern 4 — Researchers and clinicians disagree

When the lab-bench/epidemiological evidence points one way and clinical practice has caught up differently, name both and let the reader hold the tension.

### What FoodPulse doesn't do

- **Doesn't pick sides on active scientific debates** unless the credentialed founder explicitly wants to. (Skill 1's `[[foodpulse-house-style]]` non-negotiable #1: "We don't tell readers what to eat.")
- **Doesn't pretend a settled debate is contested** to seem balanced. When the evidence is overwhelming (e.g. trans fats, smoking), name the consensus.
- **Doesn't pretend a contested debate is settled** to seem authoritative. Honesty about uncertainty is a brand signal.

---

## Canadian-context research gotchas

### Canadian Community Health Survey (CCHS) cycles

Statistics Canada runs CCHS-Nutrition periodically (2004, 2015 most recent dietary cycles as of writing). Population dietary intake stats almost always trace to a specific cycle. When citing:

- Name the cycle year.
- Note that data was *collected* in the cycle year but *published* later (e.g. the 2015 data was reported in 2020 Health Reports).
- Be cautious about claiming current-year intake — the most recent data may be 5–10 years old.

### DRI vs Canadian Food Guide

The Dietary Reference Intakes (DRIs) are jointly developed by the US Institute of Medicine and Health Canada — they're nutrient-level (vitamin C, calcium, etc.). The Canadian Food Guide is food-pattern-level (plate proportions). They can give different-sounding guidance because they operate at different levels.

When citing dietary recommendations, be explicit about which framework: "Per the DRI for adults, vitamin C recommended intake is 75mg/day (women) or 90mg/day (men). Canada's Food Guide emphasizes vegetables and fruit as the source rather than supplementation."

### 2026 FOP enforcement is brand-new

The new front-of-package rules became mandatory January 1, 2026. Articles in 2026 should:

- Be cautious about claiming behavior change before 2026 data exists.
- Not project consumer response from other countries' FOP rollouts without acknowledging the transferability gap.
- Cite the regulation's design, not its effect-on-behavior, until evidence emerges.

### Indigenous foodways

When food-systems articles touch Indigenous food sovereignty, traditional foods, or food security in Indigenous communities, **cite Indigenous-authored sources where possible**, defer to Indigenous Services Canada and First Nations Health Authority where they're authoritative, and never speak for communities. This is editorial integrity, not optionality.

---

## How the primer integrates with the pipeline

- **Phase 3 (Gather sources).** Use this primer when reading each candidate source — apply the six-dimension check, classify evidence type, flag NOVA caveats.
- **Phase 4 (Synthesize).** Use the conflicting-evidence patterns to organize the outline. Apply effect-size vs RR framing rules. Apply Canadian-context gotchas.
- **Phase 5 (Draft).** Apply NOVA framing when articles cite NOVA-based statistics. Apply effect-size translation when articles cite RRR.
- **Phase 7 (Citation-check).** Skill 2's [evidence-strength.md](../../foodpulse-citation-check/references/evidence-strength.md) does the final audit; this primer is what informs your initial labels.
