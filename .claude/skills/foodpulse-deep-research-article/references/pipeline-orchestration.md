# Pipeline orchestration

The 7-phase pipeline expanded. Each phase has explicit inputs, steps, outputs, decision gates, and load-this-reference pointers. Run sequentially; do not skip phases. Phase 7 is a hard gate.

---

## Phase 1 — Clarify

**Job.** Convert a topic prompt into a structured brief the rest of the pipeline can execute against.

**Inputs.**
- User's topic prompt (could be a single line or a paragraph).

**Steps.**
1. Read the prompt. Determine whether you can confidently answer:
   - **Topic** — what's the subject?
   - **Pillar** — Food and Wellbeing / Kitchen and Cooking / Food Literacy / Food Systems? (Use the decision tree in [.claude/skills/foodpulse-house-style/references/pillar-taxonomy.md](../../foodpulse-house-style/references/pillar-taxonomy.md).)
   - **Angle** — what specifically about the topic? News-led, evergreen, regulatory, mechanistic?
   - **Reader** — who is this for? Most FoodPulse articles target an "informed consumer, evidence-curious, time-constrained, values nuance."
2. If two or more of these are genuinely unclear, ask 2–3 questions (see [topic-and-angle.md](topic-and-angle.md)). Do **not** over-ask — a clear topic + obvious pillar means proceed directly.
3. Produce the topic brief using [assets/topic-brief-template.md](../assets/topic-brief-template.md).
4. Also assign a **brand mode**: Editorial (default) or Scientific (when ≥4 citations or any calculator/chart). Default Scientific for Food Literacy + Food and Wellbeing; default Editorial for Kitchen and Cooking + Food Systems unless data-heavy.

**Outputs.**
- A filled-in topic brief markdown (in memory, not yet on disk).

**Decision gates.**
- Brief is internally inconsistent (pillar contradicts angle, reader contradicts brand mode) → re-clarify before proceeding.
- User asks for a "quick" piece → adjust target length down (Phase 3 source target adjusts accordingly).

**Reference loads this phase.**
- [topic-and-angle.md](topic-and-angle.md)
- [.claude/skills/foodpulse-house-style/references/pillar-taxonomy.md](../../foodpulse-house-style/references/pillar-taxonomy.md)

---

## Phase 2 — Map prior art

**Job.** Discover what FoodPulse already publishes that overlaps with the topic. Feeds `relatedArticles`, surfaces overlap/refresh opportunities, identifies internal-linking targets.

**Inputs.**
- Topic brief from Phase 1.

**Steps.**
1. Scan foodpulse.co for related content using WebFetch (sitemap, pillar landing pages, search). See [prior-art-mapping.md](prior-art-mapping.md) for the surface list.
2. For each relevant existing article, capture: title, slug, pillar, publish date, summary of focus.
3. Decide if any existing article substantially overlaps the new topic. If yes, **stop the pipeline and recommend refresh** instead of new piece.
4. Pick up to 4 internal-link targets for the new article (same-pillar first, then cross-pillar).
5. Add a "Prior art" section to the topic brief.

**Outputs.**
- Updated topic brief with a Prior-art section.
- Candidate `relatedArticles` list (slugs).

**Decision gates.**
- Substantial overlap with one existing article → halt. Recommend refresh; ask the user.
- Zero overlap and zero adjacency → fine; note that this is a net-new topic for the brand.

**Reference loads this phase.**
- [prior-art-mapping.md](prior-art-mapping.md)
- [.claude/skills/foodpulse-house-style/references/seo-metadata.md](../../foodpulse-house-style/references/seo-metadata.md) (Internal linking discipline)

---

## Phase 3 — Gather sources

**Job.** Build a structured research-notes document with sources tiered, claims captured, and contested areas surfaced.

**Inputs.**
- Topic brief (with Prior-art section).

**Steps.**
1. Run the query strategy in [source-gathering-workflow.md](source-gathering-workflow.md):
   - Start with most-recent systematic / umbrella review on the topic.
   - For Canadian-specific elements, prioritize canada.ca and statcan.gc.ca.
   - For contested topics, deliberately search the opposing position.
2. For each source candidate:
   - Classify the tier (A/B/C/D) per [.claude/skills/foodpulse-citation-check/references/source-hierarchy.md](../../foodpulse-citation-check/references/source-hierarchy.md).
   - Verify the source actually exists (resolves; not paywall-only-with-no-abstract; not retracted).
   - Capture the key claims it supports, with page/section anchors where possible.
   - Note the source's evidence type (RCT, observational, expert opinion, regulatory rule).
3. Stop when:
   - Target source counts hit (6–10 for standard article).
   - Next source surfaces no new claims.
   - Contested areas have at least one source per side.

**Outputs.**
- Filled-in research notes ([assets/research-notes-template.md](../assets/research-notes-template.md)).

**Decision gates.**
- Fewer than 4 usable sources with no Tier A or B among them → **stop pipeline**. The evidence base is too thin. Surface the gap to the user.
- More than 70% Tier C/D sources → search harder for Tier A/B before proceeding.
- Contested area without sources for both sides → search the opposing position before synthesizing.

**Reference loads this phase.**
- [source-gathering-workflow.md](source-gathering-workflow.md)
- [.claude/skills/foodpulse-citation-check/references/source-hierarchy.md](../../foodpulse-citation-check/references/source-hierarchy.md)
- [research-method-primer.md](research-method-primer.md) (how to read each source)

---

## Phase 4 — Synthesize

**Job.** Reorganize research notes from per-source into per-claim. Label each major claim's evidence strength. Surface contested areas.

**Inputs.**
- Research notes.

**Steps.**
1. List every distinct claim the article will make.
2. For each claim:
   - Match to source(s) — one claim can have multiple sources.
   - Label evidence strength: `established` / `emerging` / `contested` / `preliminary`. Use [.claude/skills/foodpulse-citation-check/references/evidence-strength.md](../../foodpulse-citation-check/references/evidence-strength.md).
   - Decide on draft-section placement (hook, definition, H2 #1, H2 #2, takeaway #N, FAQ).
3. Identify contested areas — claims where credible sources disagree. Plan how the article will honor the disagreement (per the on-brand `contested` phrasing).
4. Identify Canadian-context elements that need explicit mention (Food Guide, 2026 FOP, 15% DV, Statistics Canada data — see [canada-context.md](canada-context.md)).
5. Produce an outline that maps every claim to a section + evidence-strength label.

**Outputs.**
- Article outline with per-claim source(s) + evidence-strength labels.

**Decision gates.**
- Outline has any major claim with no source → return to Phase 3 to find one, OR drop the claim.
- Outline overstates evidence (`established` phrasing on `preliminary` evidence) → relabel and adjust outline language.
- Outline has no specifically-Canadian framing where the topic warrants it → revise.

**Reference loads this phase.**
- [research-method-primer.md](research-method-primer.md)
- [canada-context.md](canada-context.md)
- [.claude/skills/foodpulse-citation-check/references/evidence-strength.md](../../foodpulse-citation-check/references/evidence-strength.md)
- [.claude/skills/foodpulse-house-style/references/article-structure.md](../../foodpulse-house-style/references/article-structure.md) (skeleton mapping)

---

## Phase 5 — Draft

**Job.** Convert the outline into a full draft body in FoodPulse house style, mapped to the canonical article skeleton.

**Inputs.**
- Article outline with per-claim labels.

**Steps.**
1. Load [.claude/skills/foodpulse-house-style/references/article-structure.md](../../foodpulse-house-style/references/article-structure.md) — the canonical 7-part skeleton.
2. Load [.claude/skills/foodpulse-house-style/references/voice-guide.md](../../foodpulse-house-style/references/voice-guide.md) — the Four Voice Principles + "tells" checklist.
3. Load [.claude/skills/foodpulse-house-style/references/non-negotiables.md](../../foodpulse-house-style/references/non-negotiables.md) — the five hard rules.
4. Write the body section-by-section:
   - **Hook** (120–180 words) — reader-experience or founder-anecdote opener. Founder POV only when attributed and lived. Pivot in the last sentence to the article's central question.
   - **Definition** (80–150 words) — plain-language framing of the central concept.
   - **Question-style H2 sections** (3–6 of them, 250–400 words each) — each section answers one of the brief's key questions, with evidence + nuance.
   - **Numbered takeaways** (3–7 items) — actionable, non-prescriptive ("Try…" not "You must…").
   - **Sources & References block** (placeholder; populated in Phase 6).
   - **FAQ** (3–6 items) — questions a reader would still type into Google after reading.
5. Insert illustration markers where infographics should slot in:
   ```
   <!-- ILLUSTRATION BRIEF: landscape 1200×1000 — bar chart of Canadian UPF share 2004 vs 2015 (Statistics Canada, Nov 2020). Scientific mode palette. -->
   ```
   `[[foodpulse-illustration-design]]` (Wave 3) will consume these.
6. Apply phrasing rules per evidence-strength label. **Never** use `established` phrasing on `preliminary` evidence.
7. Enforce the POV rule: brand "we" by default, founder "I" only for attributed lived anecdotes, reader "you" for direct address.
8. Self-audit against the "tells" checklist in voice-guide.md — strip any drift phrases.

**Outputs.**
- Full draft body (markdown).
- Filled-in frontmatter (every Sanity field except `sources` and `faq` which are populated in Phase 6).

**Decision gates.**
- Hook reads as alarmist, founder-anecdote is invented, or phrasing overstates evidence → return to that section and rewrite.
- Section lengths drift outside target ranges → rebalance.

**Reference loads this phase.**
- [.claude/skills/foodpulse-house-style/references/article-structure.md](../../foodpulse-house-style/references/article-structure.md)
- [.claude/skills/foodpulse-house-style/references/voice-guide.md](../../foodpulse-house-style/references/voice-guide.md)
- [.claude/skills/foodpulse-house-style/references/non-negotiables.md](../../foodpulse-house-style/references/non-negotiables.md)
- [.claude/skills/foodpulse-house-style/references/sanity-schema-map.md](../../foodpulse-house-style/references/sanity-schema-map.md)
- [.claude/skills/foodpulse-house-style/references/callouts-and-embeds.md](../../foodpulse-house-style/references/callouts-and-embeds.md) (for inline callouts)
- [.claude/skills/foodpulse-house-style/references/seo-metadata.md](../../foodpulse-house-style/references/seo-metadata.md) (for title / meta / slug / alt text)

---

## Phase 6 — Insert inline citations

**Job.** Wire every claim to its source. Both inline (`link` annotation) and structured (`sources` array).

**Inputs.**
- Draft body + outline.

**Steps.**
1. For every claim sentence in the draft, insert an inline link to the canonical source. Format: standard markdown link on the claim-bearing phrase, not on a citation marker.
2. Build the structured `sources` array following [.claude/skills/foodpulse-citation-check/references/sources-block-rules.md](../../foodpulse-citation-check/references/sources-block-rules.md):
   - One object per source: `{title, url, author, year, doi?}`.
   - DOI URL (`https://doi.org/10.xxxx/xxxxx`) for peer-reviewed papers.
   - Canonical institutional URL for Tier B sources.
   - First-author + et al. for >3 authors.
   - 4-digit year.
   - Order by citation order.
3. Populate the FAQ (3–6 items) — questions distinct from H2 question headings.
4. Final pass: every numerical/regulatory/scientific claim has at least one source.

**Outputs.**
- Draft body with inline `link` annotations.
- Populated `sources` array.
- Populated `faq` array.

**Decision gates.**
- Any claim without an inline link → trace it; either add the link from an existing source or mark `unsourced` and address in Phase 7.
- Sources array shape doesn't match the schema → fix before Phase 7 (the verification script will reject malformed input).

**Reference loads this phase.**
- [.claude/skills/foodpulse-citation-check/references/sources-block-rules.md](../../foodpulse-citation-check/references/sources-block-rules.md)
- [.claude/skills/foodpulse-house-style/references/sanity-schema-map.md](../../foodpulse-house-style/references/sanity-schema-map.md) (Sources field)

---

## Phase 6.5 — Humanizer pass

**Job.** Strip AI-generated writing tells from the draft before the citation-check gate sees it. Hard rule: zero em-dashes in published prose. Also clears authority tropes, aphorism formulas, signposting, rule-of-three stacking, AI vocabulary, and chatbot artifacts.

**Inputs.**
- Draft body with inline citations (output of Phase 6).
- Populated `sources` array (untouched by this phase).
- Populated `faq` array (humanizer may rewrite answer phrasing; questions stay).

**Steps.**
1. Load `[[foodpulse-humanizer]]`. The skill at [.claude/skills/foodpulse-humanizer/SKILL.md](../../foodpulse-humanizer/SKILL.md) carries the 33-pattern ruleset and FoodPulse-specific carve-outs.
2. Run the 4-step humanizer process: scan, categorize, rewrite, re-scan.
3. Verify no inline `[text](url)` markdown link was broken during restructuring.
4. Append a "Humanizer pass" entry to the draft's verification trail summarizing what was changed (pattern counts before/after, any judgment calls).

**Outputs.**
- Humanized draft body (same Sanity field shape, cleaner prose).
- Updated verification trail.

**Decision gates.**
- Pre-existing draft already clean (rare on first pass, common on second iterations) → report "0 changes" and proceed to Phase 7.
- Humanizer would conflict with a brand non-negotiable (Pattern 32 vs the "We don't tell you what to eat" line) → leave the brand line; document the carve-out in the verification trail; proceed.
- Humanizer would conflict with evidence-strength phrasing per `[[foodpulse-citation-check]]` → leave the evidence-strength phrasing; humanizer doesn't override citation-check; proceed.

**Why this phase sits at 6.5, not 5.5 or 7.5.**
- Before Phase 6 (citation insertion), the body still has placeholder phrasing that gets refined when sources are linked inline. Humanizing too early creates rework.
- After Phase 7 (citation-check gate), the citation-check would have verified phrasing that humanizer then changes. The gate verdict could be invalidated.
- 6.5 means: citations are in, then voice gets cleaned, then the gate runs on the actual final prose.

**Reference loads this phase.**
- [.claude/skills/foodpulse-humanizer/SKILL.md](../../foodpulse-humanizer/SKILL.md)
- [.claude/skills/foodpulse-humanizer/references/patterns.md](../../foodpulse-humanizer/references/patterns.md)
- [.claude/skills/foodpulse-humanizer/references/foodpulse-tells.md](../../foodpulse-humanizer/references/foodpulse-tells.md)

---

## Phase 7 — Hand off to citation-check (hard gate)

**Job.** Run the verification gate. Loop if needed. Do not exit without a verdict.

**Inputs.**
- Full draft body.
- Populated `sources` array.

**Steps.**
1. Serialize the sources array to a JSON file (e.g. `tmp/<slug>-sources.json`).
2. Run the deterministic script:
   ```
   node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs tmp/<slug>-sources.json > tmp/<slug>-citation-report.json
   ```
3. Run the semantic phases (4 and 5 of the citation-check workflow) on the draft:
   - For each claim, confirm the cited source actually supports it.
   - Audit phrasing against evidence-strength labels.
4. Produce the verification report using [.claude/skills/foodpulse-citation-check/assets/verification-report-template.md](../../foodpulse-citation-check/assets/verification-report-template.md).
5. Read the verdict:
   - `ready` → write the final draft to disk; emit the citation-check report alongside.
   - `needs-edits` → apply each recommended fix (copy edit, source replacement, evidence-strength relabel). Re-run from Step 3 of this phase. Maximum **2 loops**.
   - `blocked` → write a "stopped" report; ask the user for guidance; do not ship.

**Outputs.**
- Final draft markdown file at `drafts/<slug>.md` (or path the user specified).
- Citation-check report markdown at `drafts/<slug>.citation-check.md`.
- A one-paragraph summary printed to the user.

**Decision gates.**
- After 2 loops still not `ready` → escalate to user. Do not loop indefinitely.
- After 1 loop, fewer flagged items but still some that can't be resolved → emit `needs-edits` verdict and surface to user.

**Reference loads this phase.**
- [handoff-to-citation-check.md](handoff-to-citation-check.md)
- [.claude/skills/foodpulse-citation-check/references/verification-workflow.md](../../foodpulse-citation-check/references/verification-workflow.md)
- [.claude/skills/foodpulse-citation-check/assets/verification-report-template.md](../../foodpulse-citation-check/assets/verification-report-template.md)

---

## State machine summary

```
[topic prompt]
    ↓
Phase 1 (Clarify) → topic brief
    ↓
Phase 2 (Map prior art) → updated brief + relatedArticles
    │   (if substantial overlap → STOP, recommend refresh)
    ↓
Phase 3 (Gather sources) → research notes
    │   (if <4 sources or no Tier A/B → STOP, surface evidence gap)
    ↓
Phase 4 (Synthesize) → outline with claim-level labels
    │   (if outline overstates or has unsourced claims → loop to Phase 3)
    ↓
Phase 5 (Draft) → draft body + frontmatter
    ↓
Phase 6 (Inline citations) → draft body with links + sources array + faq
    ↓
Phase 7 (Citation-check gate)
    ├─ ready → write draft + report → END
    ├─ needs-edits (loop 1) → apply fixes → re-run Phase 7
    ├─ needs-edits (loop 2) → apply fixes → re-run Phase 7
    └─ blocked OR still needs-edits after loop 2 → escalate to user
```

---

## What gets written to disk

| Path | What | When |
|---|---|---|
| `drafts/<slug>.md` | Final draft | Phase 7 verdict `ready` |
| `drafts/<slug>.citation-check.md` | Verification report | Phase 7, always |
| `tmp/<slug>-sources.json` | Sources JSON for the script | Phase 7, ephemeral |
| `tmp/<slug>-citation-report.json` | Script output | Phase 7, ephemeral |

The `tmp/` files are scratch — can be cleaned up after a successful run, kept for debugging during loops. The `drafts/` files are what the founder consumes.

The skill never writes to Sanity. Never stamps `reviewedAt`. Never marks an article as published. That's the human's job.
