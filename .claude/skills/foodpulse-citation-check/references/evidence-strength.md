# Evidence strength

Four labels for the underlying evidence behind a claim. Independent from source tier (a Tier A primary study can still be `preliminary` evidence; a Tier B institutional rule can support `established` evidence). The skill flags any claim where the article's copy phrasing overstates (or, more rarely, understates) the evidence label.

---

## The four labels

### `established`

**Means.** Multi-study consensus, decades of evidence, institutional alignment. Replicated across study designs, populations, or geographies.

**Source patterns that support `established`.**
- Cochrane systematic review with consistent findings.
- Multiple large RCTs converging.
- Long-standing Tier B regulatory rule based on a body of evidence (e.g. trans-fat restriction).
- A WHO / Health Canada guideline that explicitly cites consensus.

**On-brand phrasing.**
- "Studies consistently show…"
- "The evidence is clear that…"
- "Consensus is that…"
- "Health Canada and WHO agree that…"
- "Across more than X trials…"
- "Well established…"

**Off-brand phrasing for `established`.**
- "Some studies suggest…" *(understates)*
- "It's been proven that…" *("proven" implies finality science rarely claims)*
- "Everyone knows…" *(condescending)*

**Examples.**
- "Industrial trans fats raise LDL cholesterol and increase cardiovascular risk." → `established` ✓
- "Smoking causes lung cancer." → `established` ✓
- "Fibre intake supports digestive health." → `established` ✓

---

### `emerging`

**Means.** Promising but limited. Often short-duration trials, small samples, or a small number of high-quality studies pointing in one direction without full replication.

**Source patterns that support `emerging`.**
- 2–5 RCTs with consistent results but limited sample sizes.
- One large RCT plus several observational studies pointing the same way.
- A new institutional position based on a recent evidence review.

**On-brand phrasing.**
- "Emerging evidence suggests…"
- "Early research points to…"
- "Several trials have found…"
- "This is an active area of study."
- "The evidence so far indicates…"

**Off-brand phrasing for `emerging`.**
- "Studies consistently show…" *(overstates)*
- "It's now established that…" *(overstates)*
- "Maybe…" *(understates; "emerging" is a real finding, not a guess)*

**Examples.**
- "Time-restricted eating may help metabolic markers in adults with prediabetes." → `emerging` ✓
- "Higher gut microbiome diversity is associated with better immune response to certain vaccines." → `emerging` ✓
- "Polyphenol-rich diets may support cognitive aging." → `emerging` ✓

---

### `contested`

**Means.** Credible studies disagree. The field is genuinely split, or interpretation differs across experts.

**Source patterns that support `contested`.**
- Two systematic reviews with opposing conclusions.
- Major studies with conflicting effect-size estimates.
- An institutional position that diverges from the majority of recent research.
- An ongoing scientific debate visible in the literature.

**On-brand phrasing.**
- "Evidence is mixed — some studies show X, others Y."
- "Researchers disagree on…"
- "This is a contested area."
- "The debate is ongoing."
- "Different lines of evidence point in different directions."

**Off-brand phrasing for `contested`.**
- "Studies show…" *(picks a side without acknowledging the disagreement)*
- "There's no clear answer." *(too passive — name the disagreement)*
- "Some say X, but…" *(implies a winner where there isn't one)*

**Examples.**
- "Whether moderate alcohol intake has any net health benefit." → `contested` ✓
- "Whether saturated fat itself or the food matrix it's in matters more for cardiovascular risk." → `contested` ✓
- "The role of dietary cholesterol in blood cholesterol for the general population." → `contested` ✓

---

### `preliminary`

**Means.** Single study, preprint, animal model, cell culture, or correlational data. Not enough to generalize.

**Source patterns that support `preliminary`.**
- A single recent RCT, even if well-designed.
- Animal model / mouse study with no human follow-up.
- In-vitro / cell-culture finding.
- Cross-sectional observational study reporting an association.
- A preprint not yet peer-reviewed.

**On-brand phrasing.**
- "An early study found…"
- "One trial reported…"
- "In animal models…" / "In vitro…"
- "Researchers have observed an association between X and Y, but causation isn't established."
- "More research is needed before…"
- "Preliminary evidence suggests…"

**Off-brand phrasing for `preliminary`.**
- "Studies show…" *(overstates — it's one study)*
- "X causes Y." *(when the source is correlational)*
- "We now know that…" *(overstates)*
- "Eating X will give you Y." *(applies a narrow finding broadly)*

**Examples.**
- "A 2024 mouse study suggests compound X reduces gut inflammation." → `preliminary` ✓
- "One cross-sectional analysis found people who ate more leafy greens reported better mood." → `preliminary` ✓
- "An open-label trial in 25 participants reported improved sleep with magnesium supplementation." → `preliminary` ✓

---

## The phrasing audit

For each claim where Phase 4 returned `supports` or `partial`, compare the article's phrasing against the strength label.

**Decision rule.**

- If phrasing matches the label → note `phrasing-ok`. No edit needed.
- If phrasing overstates → note `phrasing-overstates`. Recommend a specific rewrite using on-brand phrasing for the correct label.
- If phrasing understates → note `phrasing-understates`. Rare but possible — flag if it weakens a finding the article relies on.

**The most common overstatement pattern in LLM drafts:**

> "Studies consistently show that intermittent fasting improves metabolic health."
> *Backed by:* one 12-week RCT in 47 adults with obesity.

The source is real. The finding is real for that population. But "Studies consistently show…" is `established` phrasing on top of `preliminary` evidence. Rewrite:

> "An early trial in 47 adults with obesity reported improved metabolic markers after 12 weeks of time-restricted eating. Larger trials are underway."

That's `preliminary` phrasing on top of `preliminary` evidence. Trust restored.

---

## Special cases

### Animal studies in articles about humans

Any time a source is an animal model and the article's framing is about humans, the phrasing must explicitly name the species and call out the translation gap.

> ✓ "In mouse models, compound X reduced gut inflammation. Human trials haven't been done yet."
> ✗ "Compound X reduces gut inflammation."

### Correlational evidence presented as causal

Cross-sectional and prospective observational studies show *associations*, not *causation*. The article must use association language.

> ✓ "Higher fibre intake is associated with lower colorectal cancer risk in large observational cohorts."
> ✗ "Eating more fibre prevents colorectal cancer."

### "More research is needed" is not a free pass

The phrase is fine. It is also a tell that the author isn't sure of the strength label. When you find it, double-check Phase 5: should the claim be `preliminary` or `emerging`? Often the article is using "more research is needed" because it senses overstatement elsewhere. Fix the overstatement and the phrase becomes accurate or unnecessary.

---

## Reporting

In the verification report ([../assets/verification-report-template.md](../assets/verification-report-template.md)), every claim's row carries its strength label and the phrasing audit result. The report's "Recommended copy edits" section lists each `phrasing-overstates` finding with a before/after rewrite. The human reviewer decides whether to apply each.
