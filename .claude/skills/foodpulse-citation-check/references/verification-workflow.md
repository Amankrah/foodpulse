# Verification workflow

The six-phase workflow for verifying a FoodPulse draft's citation integrity. Run end-to-end before every publish. Skip no phase — each catches a different failure mode.

---

## Phase 1 — Extract claims

**Goal.** Produce a list of every sentence in the draft that asserts a fact that needs evidence.

**What counts as a "verifiable claim":**

- Any number, percentage, or quantity ("46% of Canadian energy from UPF", "around 8 cups a day", "a 19% reduction in CHD events").
- Any statistic, even soft ones ("most Canadians", "roughly half").
- Any regulatory rule ("Health Canada's front-of-package rule became mandatory on January 1, 2026").
- Any named-study reference ("Hooper et al., 2020 found…").
- Any named-institution finding ("Statistics Canada reported…", "WHO advises…").
- Any scientific claim about cause, effect, mechanism, or association ("Fibre variety reshapes the gut microbiome").
- Any historical attribution ("The NOVA classification was developed by Brazilian researchers").

**What does NOT count:**

- Cooking-step instructions ("Add 1 tablespoon of olive oil").
- Brand opinions / framing ("We believe food decisions are personal").
- Reader hypotheticals ("Imagine you walk into a grocery store").
- The founder's lived anecdotes (those still need to be attributed; not the same as cited).
- Editorial transitions ("Here's why this matters").

**Output.** A numbered list. Each entry: claim text + draft section anchor (e.g. "§ 'Why food environment matters', paragraph 2"). Append the candidate status: `to-verify` (default) / `no-source-needed` / `context-only`.

**Common Phase 1 mistakes:**

- Missing soft statistics ("around 30%" is a claim).
- Treating an inline interpretation as a separate claim (the interpretation rides on the source's claim — verify once).
- Counting recipe steps as claims (they aren't).
- Counting the article's own framing language as a claim ("This is what most readers find" is brand opinion, not a citable fact).

---

## Phase 2 — Match to source

**Goal.** For each `to-verify` claim, identify the source that backs it up.

**Where to look (in order):**

1. **Inline `link` annotation** on the claim sentence in the Portable Text. If present, that's the source.
2. **The article's `sources` array.** If a claim's topic matches a source object, link them by position or by name.
3. **A footer-style citation marker** in the body ("(Hooper et al., 2020)") that traces back to the sources array.

**Statuses after Phase 2:**

- `sourced` — claim has at least one source object.
- `unsourced` — no source matches. Will block publish unless overridden.

**Edge cases:**

- Multiple claims sharing one source: fine. Mark each `sourced`, point to the same source object.
- One claim with multiple sources (meta-analyses, regulatory + research dual cite): fine. Mark each source separately in Phase 3 onward.
- Claim that paraphrases an institutional consensus without naming a specific source: ask whether the institutional source (Canada's Food Guide, WHO) should be added to the sources array. Often yes.

---

## Phase 3 — Verify existence (deterministic)

**Goal.** Confirm each source URL resolves and each DOI returns matching CrossRef metadata.

**Action.** Run the script:

```bash
node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs sources.json > url-and-doi-report.json
```

**Inputs the script needs:**

- An array of source objects: `{title, url, author?, year?, doi?}`.
- DOI is optional — when present, CrossRef lookup runs and compares title/author/year. When absent, only URL liveness runs.

**Outputs the script returns (per source):**

- `url_check.status` — HTTP status code (200–599).
- `url_check.ok` — `true` for 200–399, `false` otherwise.
- `crossref.found` — DOI resolved on CrossRef or not.
- `crossref.match.{title,author,year}` — `ok` / `mismatch` / `unknown`.
- `issues` — array of short tags: `url-dead`, `url-redirect-warning`, `doi-not-found`, `crossref-title-mismatch`, `crossref-year-mismatch`, `crossref-author-mismatch`.

**Reading the report:**

- All `issues` empty → existence check passes for this source.
- Any issue → forward to Phase 4 with the issue tag in mind. Some issues (like `url-redirect-warning`) are informational; others (`url-dead`, `doi-not-found`) usually require a fix.

**Don't over-interpret URL fails.** Some publisher URLs return 403 or require JS to render. The script does its best with browser-like headers; a 403 from a known publisher domain (Elsevier, Wiley, Cambridge UP) is more "access-walled" than "dead." The DOI lookup is the more reliable existence check; URL liveness is supplementary.

---

## Phase 4 — Verify support (semantic)

**Goal.** Confirm the source actually says what the article claims it says. This is the irreducibly LLM step.

**Per claim:**

1. Read the source. Abstract minimum. Full text when accessible.
2. Compare the claim's specific assertion against what the source actually says.
3. Pick one outcome:
   - `supports` — the source clearly says what the claim says.
   - `partial` — the source supports a related claim but not the specific framing. Note the gap.
   - `does-not-support` — the source doesn't say this. Investigate; the source is likely wrong or the claim is overstated.

**Specific patterns to watch:**

- **Overgeneralization.** Source says "in this cohort of 200 postmenopausal women"; claim says "in adults".
- **Effect-size inflation.** Source reports a 19% relative-risk reduction; claim says "cut risk in half".
- **Animal-to-human jump.** Source is a mouse model; claim implies human relevance.
- **Mechanism vs outcome.** Source proves a mechanism in vitro; claim asserts a clinical outcome.
- **Correlation as cause.** Source reports an association; claim implies causation.
- **Statistic shape-shift.** Source: "46% of energy from UPF by daily caloric share". Claim: "Canadians eat 46% ultra-processed food by weight." Wrong measure.

**When the source is paywalled.** Read the abstract + any open methods. If the abstract doesn't contain enough detail to verify the specific claim, mark `partial` with a note: "Abstract doesn't confirm specific figure; needs full-text check."

**When the source is in a language you don't read.** Don't guess. Mark `partial` with a translation note. Often the abstract is available in English; if not, flag for human review.

---

## Phase 5 — Label evidence strength

**Goal.** Tag each `supports` / `partial` claim with the strength of its underlying evidence and verify the article's copy phrasing matches.

**Four labels** (full phrasing rules in [evidence-strength.md](evidence-strength.md)):

- `established` — multi-study consensus, institutional alignment.
- `emerging` — promising but limited, often short trials or small samples.
- `contested` — credible studies disagree.
- `preliminary` — single study, preprint, animal model, or correlational only.

**Phrasing audit.** For each claim, compare the article's actual phrasing against the label.

- ✓ Match — note `phrasing-ok`.
- ✗ Overstated — note `phrasing-overstates`. Recommend a copy edit.
- ✗ Understated — note `phrasing-understates` (rarer but possible — flag if it weakens a well-established finding).

**Examples of overstated phrasing.**

- Single small RCT cited with "Studies consistently show…" → should be "One small trial found…" or "Early evidence suggests…"
- Animal study cited with "X reduces inflammation in humans" → should be "X reduced inflammation in animal models; human data is limited."
- Cross-sectional correlation cited with "X causes Y" → should be "X is associated with Y; causation isn't established."

---

## Phase 6 — Produce report

**Goal.** Hand a human reviewer a structured, scannable verdict.

**Template.** Use [../assets/verification-report-template.md](../assets/verification-report-template.md) verbatim. The template carries:

- Summary table (total claims, verified, flagged, unsourced, no-source-needed, context-only).
- Per-claim findings ordered by draft section.
- Source-hierarchy distribution (Tier A / B / C / D counts).
- Evidence-strength distribution (established / emerging / contested / preliminary counts).
- Recommended copy edits with specific before/after suggestions.
- Publish gate verdict: `ready` / `needs-edits` / `blocked`.
- Per-item human-acknowledgment slots for `flagged` and `unsourced` items.

**Verdict logic.**

- `ready` — zero `flagged` or `unsourced` items.
- `needs-edits` — 1–3 `flagged` or `unsourced` items, all with clear remediations.
- `blocked` — 4+ flagged/unsourced items, OR any item where the source actively contradicts the claim.

**Where the report goes.** Save next to the draft (e.g. `draft-foo.md` + `draft-foo.citation-check.md`). The human acknowledges items inline in the saved report and re-runs the workflow if they revise the draft.

---

## Phase summary

| Phase | Job | Deterministic? | Output |
|---|---|---|---|
| 1 | Extract claims | Mostly mechanical | Numbered claim list |
| 2 | Match to source | Mechanical | Sourced / unsourced per claim |
| 3 | Verify existence | Yes (script) | URL + CrossRef report per source |
| 4 | Verify support | No (LLM) | supports / partial / does-not-support per claim |
| 5 | Label strength | No (LLM) | established / emerging / contested / preliminary + phrasing audit |
| 6 | Produce report | Mechanical | Human-readable verification report |

Run all six in order. Phase 4 is where most LLM citation failures get caught; Phase 5 is where evidence inflation gets caught. Don't skip either.
