---
name: foodpulse-deep-research-article
description: FoodPulse deep-research article production pipeline. Use whenever you need to draft a FoodPulse article from a topic — runs topic clarification, structured source gathering favoring peer-reviewed and Canadian institutional sources, synthesis with evidence-strength labels, drafting in the brand house style, inline citation insertion, the humanizer pass, and the citation-check gate. Produces a publish-ready draft markdown file with every Sanity article field populated. Composes foodpulse-house-style, foodpulse-humanizer, and foodpulse-citation-check; do not invoke those directly when this skill is active.
---

# FoodPulse Deep-Research Article

The writer. Entry point for the most common content task — "write a FoodPulse article about X." Composes `[[foodpulse-house-style]]` (voice + structure + non-negotiables + pillars) and `[[foodpulse-citation-check]]` (verification + the script). Outputs a publish-ready draft markdown file with every Sanity article field populated. Stops at "ready for editorial review" — Etornam reads, edits, and pushes to Sanity.

This is the highest-leverage skill in the catalogue. Per the strategy brief, it multiplies the founder's scarcest resource (deep-research time) into draft volume.

## When to use

Every prompt asking for a FoodPulse article: "draft an article about…", "write a piece on…", "I want to cover…". Also use when:

- Refreshing a quarterly-review article that needs more than a citation-check pass (substantive content update).
- Migrating an externally-drafted piece into FoodPulse house style.
- Producing the long-form base from which downstream skills (`[[foodpulse-article-to-youtube]]`, `[[foodpulse-newsletter]]`, `[[foodpulse-social-atomize]]`) will repurpose.

Do **not** also trigger `[[foodpulse-house-style]]` or `[[foodpulse-citation-check]]` separately — this skill loads what it needs from both and orchestrates them. Triggering all three causes context bloat and conflicting instructions.

## The 7-phase pipeline (with humanizer pass)

Full detail in [references/pipeline-orchestration.md](references/pipeline-orchestration.md). At a glance:

1. **Phase 1 — Clarify.** Topic + angle + pillar + reader. Ask 2–3 questions only if the prompt is genuinely underspecified. Output: a topic brief ([assets/topic-brief-template.md](assets/topic-brief-template.md)).
2. **Phase 2 — Map prior art.** What foodpulse.co already publishes that overlaps. Feeds `relatedArticles`. See [references/prior-art-mapping.md](references/prior-art-mapping.md).
3. **Phase 3 — Gather sources.** Structured search via WebSearch + WebFetch, favoring Tier A/B sources from skill 2's source hierarchy. Target 6–10 sources for a standard article. Output: research notes ([assets/research-notes-template.md](assets/research-notes-template.md)). See [references/source-gathering-workflow.md](references/source-gathering-workflow.md).
4. **Phase 4 — Synthesize.** Group findings by claim, label each major claim's evidence strength (`established` / `emerging` / `contested` / `preliminary`), surface contested areas. See [references/research-method-primer.md](references/research-method-primer.md).
5. **Phase 5 — Draft.** Convert synthesis into skill 1's canonical article skeleton, in skill 1's voice. Load [.claude/skills/foodpulse-house-style/references/article-structure.md](../foodpulse-house-style/references/article-structure.md) and [.claude/skills/foodpulse-house-style/references/voice-guide.md](../foodpulse-house-style/references/voice-guide.md). The voice-guide's humanizer rules apply at draft time.
6. **Phase 6 — Insert inline citations.** Every claim gets a `link` annotation; the `sources` array gets populated per skill 1's [sanity-schema-map.md](../foodpulse-house-style/references/sanity-schema-map.md) Sources section and skill 2's [sources-block-rules.md](../foodpulse-citation-check/references/sources-block-rules.md).
7. **Phase 6.5 — Humanizer pass.** Strip AI tells from the draft before the citation-check gate. Hard zero em-dashes in published prose. Also clears authority tropes, aphorism formulas, signposting, rule-of-three stacking, AI vocabulary. Invokes `[[foodpulse-humanizer]]`. See [.claude/skills/foodpulse-humanizer/SKILL.md](../foodpulse-humanizer/SKILL.md). Mandatory step, not optional.
8. **Phase 7 — Hand off to citation-check.** Always. Invoke `[[foodpulse-citation-check]]`, act on the report, loop up to twice. See [references/handoff-to-citation-check.md](references/handoff-to-citation-check.md). Runs on the humanized draft from Phase 6.5.

## Skill composition rules

This skill **loads** references from the other two but is the **only** skill that triggers during a drafting session.

| Need | Where it lives |
|---|---|
| Voice principles, POV, phrasing | [skill 1 / voice-guide.md](../foodpulse-house-style/references/voice-guide.md) |
| Article skeleton (hook → FAQ) | [skill 1 / article-structure.md](../foodpulse-house-style/references/article-structure.md) |
| Pillar taxonomy + slugs | [skill 1 / pillar-taxonomy.md](../foodpulse-house-style/references/pillar-taxonomy.md) |
| Sanity field-by-field rules | [skill 1 / sanity-schema-map.md](../foodpulse-house-style/references/sanity-schema-map.md) |
| Non-negotiables | [skill 1 / non-negotiables.md](../foodpulse-house-style/references/non-negotiables.md) |
| SEO conventions | [skill 1 / seo-metadata.md](../foodpulse-house-style/references/seo-metadata.md) |
| Source tiers + trusted-domain list | [skill 2 / source-hierarchy.md](../foodpulse-citation-check/references/source-hierarchy.md) |
| Evidence-strength labels + phrasing | [skill 2 / evidence-strength.md](../foodpulse-citation-check/references/evidence-strength.md) |
| Hallucination guardrails | [skill 2 / hallucination-guardrails.md](../foodpulse-citation-check/references/hallucination-guardrails.md) |
| The verification workflow + script | [skill 2 / verification-workflow.md](../foodpulse-citation-check/references/verification-workflow.md) |

Do not restate any of these — point and load.

## Tool requirements

This skill assumes the agent has:

- **WebSearch** — for structured source discovery in Phase 3.
- **WebFetch** — for reading sources, scanning foodpulse.co for prior art, and fetching CrossRef/PubMed metadata via web when needed.
- **Bash** — to run skill 2's verification script in Phase 7 (`node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs`).
- **Write** — to emit the draft markdown file and the citation-check report.

If WebSearch or WebFetch is missing, the skill produces a **degraded draft** and marks it explicitly:

> **DRAFT QUALITY WARNING:** This draft was authored without WebSearch/WebFetch. Source surface is limited to training-data recall. Treat as preliminary; widen Phase 3 manually before editorial review.

The skill does not refuse to run — but it makes the limitation impossible to miss.

## Optional acceleration via generic `deep-research`

If the host agent has the generic `deep-research` skill available and the topic is politically contested, policy-heavy, or backed by a large literature, Phase 3 can delegate the fan-out search to that skill. Take its report, then resume here at Phase 4 (Synthesize). The FoodPulse-specific framing — Canadian context, brand voice, citation-check gate — still runs through this skill. Use this when the topic warrants it; default is the inline workflow in [source-gathering-workflow.md](references/source-gathering-workflow.md).

## Canada-first defaults

Every article assumes:

- Canadian reader by default.
- Canadian regulation (Health Canada, CFIA, Statistics Canada) over US/EU equivalents.
- Canadian dietary intake data (Canadian Community Health Survey, Statistics Canada Health Reports) for population claims.
- Canada's 2026 front-of-package rule, the 15% DV trigger, and Canada's Food Guide as load-bearing references for any label or dietary-pattern article.

Bilingual (English/French) considerations flagged where relevant; drafts ship English-first. French translation is deferred to a future `[[foodpulse-translate-fr]]` skill. See [references/canada-context.md](references/canada-context.md).

## Output contract

Default output path: `drafts/<slug>.md` at the repo root. Override by passing an explicit path.

The output file is a single markdown document that extends skill 1's [article-skeleton.md](../foodpulse-house-style/assets/article-skeleton.md) with every TODO filled. Specifically:

- Populated frontmatter (every Sanity article field — title, slug, excerpt, image alt, category slug, author, tags, publishedAt, SEO, FAQ).
- Populated body using Portable-Text-compatible markdown (headings, paragraphs, blockquotes, inline images, callouts, embed placeholders, inline `link` annotations as standard markdown links).
- Populated `sources` array.
- Populated `faq` array.
- A "Verification trail" appendix listing what the citation-check skill flagged and how each was resolved.
- A "Notes for editorial review" section flagging places the founder should look first.

Alongside the draft, write the citation-check report to `<draft-path>.citation-check.md` so the human reviewer can read it next to the draft.

The skill **does not push to Sanity**. Etornam reads, edits, and pushes manually. A future automation skill can change this; for v1, the human gate is the safety property.

## Human-judgment boundary

AI gathers, drafts, designs, packages. **Etornam C. Tsyawo owns interpretation, health framing, and final sign-off.** This boundary is not a limitation to engineer away — it is the E-E-A-T moat that lets a one-person, evidence-based food-education brand operate.

The skill stops at "ready for editorial review." Specifically:

- Do not stamp `reviewedAt` or `updatedAt` — the human does that after sign-off.
- Do not declare an article "publish-ready" without the citation-check gate verdict.
- Do not invent sources, statistics, or quotes. If a claim can't be sourced at Tier A or B, soften the claim (per skill 2's [evidence-strength.md](../foodpulse-citation-check/references/evidence-strength.md)) or remove it.

When in doubt, surface the doubt to the human in the "Notes for editorial review" section.

## Failure modes

The skill stops and asks the user when:

- The topic substantially overlaps an existing FoodPulse article — recommend refresh, not new piece.
- Phase 3 returns fewer than 4 sources, with no Tier A or B among them — the evidence base is too thin to write an evidence-based article.
- Phase 4 surfaces an irreducible contested area where FoodPulse has no defensible position — ask the founder for guidance.
- Phase 7 returns `blocked` after two loops — escalate; do not ship.

In each case, the skill writes a "stopped" report explaining what was found and what would be needed to proceed.

## Brief at a glance

1. Read the user's topic prompt.
2. If underspecified, ask 2–3 clarifying questions; otherwise produce the brief.
3. Run Phases 2–7 sequentially. Load reference files as needed.
4. Emit `drafts/<slug>.md` + `drafts/<slug>.citation-check.md`.
5. Print a one-paragraph summary to the user: pillar, source count, evidence-strength distribution, anything flagged for human review.

That's it. Then a human takes over.
