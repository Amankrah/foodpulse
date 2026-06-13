---
name: foodpulse-humanizer
description: FoodPulse humanizer pass. Use AFTER drafting any FoodPulse article, newsletter issue, social caption, video script, or coaching page to strip AI-generated writing tells before the citation-check gate. Hard rule, zero em-dashes in final output. Also removes authority tropes, aphorism formulas, signposting, rule-of-three stacking, AI vocabulary, and chatbot artifacts. Adapted from blader/humanizer (33 patterns) with FoodPulse-specific overlay. Mandatory step in the foodpulse-deep-research-article pipeline before Phase 7.
---

# FoodPulse Humanizer

The voice-cleanup pass. Every FoodPulse content draft runs through this skill before the citation-check gate. Strips the writing patterns that mark text as AI-generated, so the finished article reads like a credentialed researcher writing for an informed Canadian reader, not like a language model showing off.

This skill is invoked as **Phase 6.5** of the `[[foodpulse-deep-research-article]]` pipeline (after inline citations are inserted in Phase 6, before the citation-check gate in Phase 7). The future repurposing skills (`[[foodpulse-article-to-youtube]]`, `[[foodpulse-newsletter]]`, `[[foodpulse-social-atomize]]`) will all invoke it too.

The ruleset is adapted from the open-source [blader/humanizer](https://github.com/blader/humanizer) skill (33 patterns based on Wikipedia's WikiProject AI Cleanup guide). Full attribution in [references/patterns.md](references/patterns.md). The FoodPulse-specific overlay (tells observed in our own drafts, brand-voice carve-outs) lives in [references/foodpulse-tells.md](references/foodpulse-tells.md).

## When to use

- After drafting + inline-citation insertion (Phases 5–6 of `[[foodpulse-deep-research-article]]`).
- Before invoking `[[foodpulse-citation-check]]`.
- On every FoodPulse content type: article, newsletter, social, video script, coaching page, even FAQ entries.
- When auditing an existing article for a quarterly refresh and the voice feels stiff.

If the work has prose anyone is going to read, run this skill.

## The hard rule

**Pattern 14, em-dashes. Final output contains zero `—` (em-dash) or `–` (en-dash) in the visible body, excerpt, FAQ answers, or any prose the reader sees.** Replace with periods, commas, colons, parentheses, or restructure the sentence. Treat this as a constraint, not a preference.

Internal-tooling regions are exempt: HTML comments (`<!-- ... -->`), illustration briefs, frontmatter TODO placeholders that get filled by another skill, verification-trail metadata, and notes for editorial review. None of these reach the published article.

## The 6 highest-frequency patterns to watch for

Full 33-pattern ruleset in [references/patterns.md](references/patterns.md). These six showed up in the live FOP-symbol draft and will show up again:

1. **Em-dashes (Pattern 14)** — hard zero in body prose.
2. **Authority tropes (Pattern 27)** — "The honest answer is…", "The useful question is…", "At its core…", "What really matters is…". Just make the point.
3. **Signposting and announcements (Pattern 28)** — "Two honest takeaways.", "A few specific moves that work:", "Let's dive into…", "Here's what you need to know.". Start with the actual content.
4. **Aphorism formulas (Pattern 32)** — "It's information, not a verdict.", "Symmetry is the language of trust.", "X is the Y of Z.". Rewrite as a specific statement.
5. **Rule-of-three stacking (Pattern 10)** — forced triplets like "your overall pattern, your context, and what you're swapping" when the underlying content is one idea or four ideas.
6. **AI vocabulary (Pattern 7)** — "delve", "crucial", "pivotal", "underscore", "showcase", "tapestry", "testament", "garner", "interplay", "landscape", "actually" (as filler), "genuinely" (as filler), "navigate" (as metaphor). Replace with simpler.

## The 4-step process

For every draft:

1. **Read and identify.** Walk the draft. Flag every instance of each pattern. Don't fix yet — get the full picture so you don't make 3 passes.
2. **Draft the rewrite.** Apply the pattern-specific rewrites in [patterns.md](references/patterns.md). Keep claims, sources, evidence-strength phrasing, and inline citations exactly as they were. The humanizer is voice, not content.
3. **Audit the rewrite.** Re-scan for residual patterns. Especially em-dashes (they sneak in during restructuring). Also check that you haven't broken any inline `[text](url)` markdown links.
4. **Produce the final output + a one-paragraph summary** of what changed, for the verification trail.

## What the humanizer does NOT touch

- **Claims and statistics.** Numerical facts, regulatory citations, study findings stay byte-identical.
- **Inline citation links.** `[the claim phrase](https://source-url)` markdown stays intact. Restructuring the sentence around it is fine; deleting the link is not.
- **`sources` array.** Untouched.
- **`faq` array claims.** Voice can change; content stays accurate.
- **Evidence-strength phrasing.** "An early modeling study projects…" stays "An early modeling study projects…" — that's evidence-calibration language from `[[foodpulse-citation-check]]` / `[[foodpulse-house-style]]`, not an AI tell.
- **Founder POV ("I") passages.** Don't strip an attributed founder anecdote even if it has stylistic em-dashes — the founder's voice is the point. Only fix the em-dashes themselves.
- **Recipe instructions** (when `isRecipe: true`). Numbered cooking steps are deliberately curt and rule-of-three-shaped. Leave them.
- **Brand voice principles.** The Four Voice Principles in [`[[foodpulse-house-style]]`/voice-guide.md](../foodpulse-house-style/references/voice-guide.md) — Informed not academic, Practical not preachy, Direct not blunt, Curious not anxious — already align with the humanizer. If a pattern in [patterns.md](references/patterns.md) ever conflicts with the brand voice principles, **the brand voice wins**. Flag the conflict in your summary so we can refine the rule.

## Voice carve-outs specific to FoodPulse

See [references/foodpulse-tells.md](references/foodpulse-tells.md) for the patterns we've actually seen in FoodPulse drafts and the FoodPulse-specific carve-outs (what to leave alone even when a generic rule would flag it).

## Output contract

The humanizer operates **in place** on a draft markdown file. After the pass:

- The draft body has zero em-dashes in published-prose regions.
- The draft body has reduced AI tells per the 33-pattern ruleset.
- Inline citations and structural elements are intact.
- A "Humanizer pass" entry is appended to the verification trail section of the draft, summarizing what was changed.
- A short report is printed to the user: pattern counts before/after, anything residual that needed judgment.

If a draft was already clean (rare on first run, more common on second iterations), the humanizer reports "0 changes; draft passes" and exits.

## How this composes with the other skills

- **Upstream:** `[[foodpulse-house-style]]` voice-guide.md tells the drafter to avoid these patterns *while writing* (prevention). This skill catches what slipped through (enforcement).
- **Downstream:** `[[foodpulse-citation-check]]` runs after this skill, on the humanized draft. The citation-check gate verifies claims and phrasing-vs-evidence on the actual final prose, not on a draft that still has stylistic tells the founder would have to clean up later.
- **In Phase 6.5 of `[[foodpulse-deep-research-article]]`:** the pipeline orchestration in [.claude/skills/foodpulse-deep-research-article/references/pipeline-orchestration.md](../foodpulse-deep-research-article/references/pipeline-orchestration.md) calls this skill between citation insertion and the citation-check gate. Don't skip the order.
- **In future Wave 4–5 skills:** the same Phase 6.5 pattern carries forward. Video scripts, newsletters, and social atomization all run through humanizer before publish.

## Attribution

The 33-pattern ruleset is adapted from [blader/humanizer](https://github.com/blader/humanizer) (MIT license), which is itself based on [Wikipedia's WikiProject AI Cleanup signs-of-AI-writing guide](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup/AI_catchphrases). Both are excellent reference works in their own right. This skill stays in sync with v2.8.0 of blader/humanizer and adds the FoodPulse-specific overlay. If blader/humanizer updates, we should pull updates in here.

## Brief at a glance

1. Read the draft.
2. Identify every instance of the 33 patterns (heaviest enforcement on Pattern 14, em-dashes).
3. Rewrite, preserving claims, citations, sources, and brand voice.
4. Append a "Humanizer pass" entry to the verification trail.
5. Hand off to `[[foodpulse-citation-check]]`.

That's it. Then the gate runs.
