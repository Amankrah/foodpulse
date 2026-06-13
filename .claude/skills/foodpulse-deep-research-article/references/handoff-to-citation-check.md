# Hand-off to citation-check

Phase 7 of the pipeline. The hard publish gate. Always runs at the end of Phase 6. Never skipped.

This file documents how this skill invokes `[[foodpulse-citation-check]]` (the verification skill) and what to do with each verdict. The verification workflow itself lives in [.claude/skills/foodpulse-citation-check/references/verification-workflow.md](../../foodpulse-citation-check/references/verification-workflow.md); this file is the **caller-side contract**.

---

## When this phase runs

After Phase 6 has:

- Inserted inline `link` annotations on every claim.
- Populated the structured `sources` array (matching skill 2's input schema).
- Populated the `faq` array.

Never run this phase against a draft that's still missing structured sources. The skill 2 script will reject malformed input, and the agent semantic check has nothing to chew on.

---

## Inputs to pass

1. **Sources JSON.** The article's `sources` array, serialized to a temporary file. Path convention: `tmp/<slug>-sources.json`. Schema per skill 2's [scripts/README.md](../../foodpulse-citation-check/scripts/README.md):

   ```json
   [
     {"title": "...", "url": "...", "author": "...", "year": "...", "doi": "..."}
   ]
   ```

2. **Draft body.** The full markdown of the article (or its in-memory equivalent). Needed for the semantic phases (claim/source support check + evidence-strength phrasing audit).

3. **Outline + per-claim labels** (carried from Phase 4). The skill 2 semantic check is faster when each claim already has its evidence-strength label declared; the audit becomes a phrasing-vs-label comparison rather than a full re-labelling pass.

---

## Step-by-step invocation

### Step 1 — Run the deterministic script

```bash
node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs tmp/<slug>-sources.json > tmp/<slug>-citation-report.json
```

This produces the URL liveness + CrossRef metadata report. Read the JSON.

### Step 2 — Run the semantic verification (agent)

For each claim in the draft body, do the workflow's Phases 4 and 5 from [verification-workflow.md](../../foodpulse-citation-check/references/verification-workflow.md):

- Phase 4 — Verify support. Read the source. Does it actually say what the claim says? Outcomes: `supports`, `partial`, `does-not-support`.
- Phase 5 — Label evidence strength. Compare the claim's phrasing in the draft against its evidence-strength label. Outcomes: `phrasing-ok`, `phrasing-overstates`, `phrasing-understates`.

The agent's outputs combine with the script's JSON to produce the per-claim verdicts.

### Step 3 — Produce the verification report

Use skill 2's report template at [.claude/skills/foodpulse-citation-check/assets/verification-report-template.md](../../foodpulse-citation-check/assets/verification-report-template.md). Fill every section. Write the report to `drafts/<slug>.citation-check.md`.

### Step 4 — Read the verdict

The report's top-line verdict is one of:

- **`ready`** — zero `flagged` or `unsourced` items. Proceed to Step 5a.
- **`needs-edits`** — 1–3 flagged/unsourced items, all with clear remediations. Proceed to Step 5b (the loop).
- **`blocked`** — 4+ flagged/unsourced items, OR a source actively contradicts a claim, OR a disallowed source remains. Proceed to Step 5c.

### Step 5a — Verdict `ready`: ship

1. Write the final draft to `drafts/<slug>.md`.
2. Confirm the citation-check report is at `drafts/<slug>.citation-check.md`.
3. Emit the summary to the user (see "Final summary to user" below).
4. **Done.** Exit Phase 7. The skill's job is complete.

### Step 5b — Verdict `needs-edits`: loop

1. Read each `phrasing-overstates`, `partial`, `does-not-support`, `unsourced`, or `url-dead` finding.
2. For each:
   - Apply the recommended copy edit (relabel + rewrite phrasing).
   - Replace a flagged source with a better source if found.
   - If the claim can't be saved with a different source and can't be softened to match available evidence, **remove it** (per skill 1's [non-negotiables.md](../../foodpulse-house-style/references/non-negotiables.md) §2).
3. **Re-run Phase 7 from Step 1.**
4. Track the loop count.

**Maximum 2 loops.** After the second loop, if the verdict is still not `ready`:

- Apply whatever fixes you can.
- Emit a `needs-edits` final report with the remaining issues clearly flagged.
- Surface to the user (Step 5c logic applies).

### Step 5c — Verdict `blocked` (or `needs-edits` after 2 loops): escalate

1. Do not write a "final" draft to `drafts/<slug>.md`.
2. Write the partial draft + report to `drafts/<slug>.partial.md` and `drafts/<slug>.citation-check.md`.
3. Emit a "stopped" summary to the user (see below).
4. Wait for user direction.

---

## Looping logic

The loop limit is a hard safety property — without it, an agent can grind in circles on irreducibly weak evidence.

**On each loop iteration:**

1. Record what was fixed (which claims were edited, which sources replaced).
2. Re-run Steps 1–4.
3. If the loop count hits 2 and verdict is still not `ready`, exit to Step 5c.

**Add a "verification trail" appendix** to the final draft. It carries:

- Loop count (1 or 2, or `0` if first-run passed).
- Per-loop summary: what was flagged and what was fixed.
- Any remaining acknowledged-but-unresolved items (with rationale).

This gives the founder a fast read on what the skill caught and what they should look at first.

---

## Final summary to the user

After Phase 7 completes (success or escalation), print a one-paragraph summary to the user:

**On `ready`:**

> ✅ Draft ready for editorial review.
>
> **Path:** `drafts/<slug>.md`
> **Report:** `drafts/<slug>.citation-check.md`
> **Pillar:** [Food and Wellbeing / Kitchen and Cooking / Food Literacy / Food Systems]
> **Word count:** [N words]
> **Sources:** [count] total — [N] Tier A, [N] Tier B, [N] Tier C ([N] of these verified via CrossRef metadata)
> **Evidence strength:** [N] established, [N] emerging, [N] contested, [N] preliminary
> **Loops:** [0 / 1 / 2]
> **For editorial review:** [1–3 specific places the founder should look first — e.g. "the contested section on saturated fat, the framing of the 2026 FOP enforcement timeline, the choice of opening anecdote"]

**On `needs-edits` after loop cap or `blocked`:**

> ⚠️ Draft stopped — needs human guidance.
>
> **Partial draft:** `drafts/<slug>.partial.md`
> **Report:** `drafts/<slug>.citation-check.md`
> **Verdict:** [needs-edits / blocked]
> **Remaining issues:**
> - [Issue 1 — what's wrong, what's needed]
> - [Issue 2 — ...]
> **Recommended next step:** [either "review the partial and tell me how to proceed", or "the topic's evidence base is too thin; consider narrowing the angle", or specific user input needed]

---

## Hand-off back to skill 1's house style (optional, only when needed)

If during the loop the agent realizes the draft has voice/structure issues (e.g. multiple paragraphs slipped into preachy phrasing, the hook reads alarmist), do a brief voice pass:

1. Reload skill 1's [voice-guide.md](../../foodpulse-house-style/references/voice-guide.md).
2. Apply the "tells" checklist; rewrite drift phrases.
3. Continue with Phase 7 Step 3.

This is rare — Phase 5 should have caught voice issues. But the citation-check loop sometimes surfaces phrasing problems the drafting pass missed.

---

## What this phase does NOT do

- Does not stamp `reviewedAt` on a Sanity document. The skill emits markdown; the founder stamps the Sanity document after editorial review.
- Does not publish. Ever.
- Does not declare an article "publish-ready" without the gate verdict `ready`.
- Does not skip the script. Even when CrossRef has nothing to look up (no DOIs in the sources), URL liveness still matters.
- Does not modify skill 2's reference files or scripts.

---

## Hand-off path summary

```
[Phase 6 output: draft body + sources array + faq]
    ↓
[serialize sources to tmp/<slug>-sources.json]
    ↓
[run verify-citations.mjs] → tmp/<slug>-citation-report.json
    ↓
[run semantic Phase 4 + 5 (agent)]
    ↓
[produce verification report using skill 2 template]
    ↓
[read verdict]
    ├─ ready → write drafts/<slug>.md + drafts/<slug>.citation-check.md → emit ✅ summary → DONE
    ├─ needs-edits, loop < 2 → apply fixes → re-run from script
    └─ blocked OR (needs-edits, loop = 2) → write partial + report → emit ⚠️ summary → wait for user
```

The hard rule: **never ship a draft to `drafts/<slug>.md` without verdict `ready`.** Partial drafts go to `drafts/<slug>.partial.md` so the file extension makes the status obvious.
