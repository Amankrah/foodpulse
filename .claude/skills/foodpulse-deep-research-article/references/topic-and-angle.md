# Topic and angle clarification

Phase 1 of the pipeline. Turns a topic prompt into a structured brief the rest of the pipeline can execute against. Asks the user **2–3 questions only when needed** — over-asking burns the founder's time, which is exactly what this skill exists to save.

---

## What you need from the user (explicit or inferred)

| Element | What it answers | Default if not provided |
|---|---|---|
| Topic | What's the subject? | Required — won't have without prompt |
| Pillar | Food and Wellbeing / Kitchen and Cooking / Food Literacy / Food Systems | Infer from topic via the decision tree in [.claude/skills/foodpulse-house-style/references/pillar-taxonomy.md](../../foodpulse-house-style/references/pillar-taxonomy.md) |
| Angle | News-led, evergreen, regulatory, mechanistic, comparative? | Infer from topic and recency |
| Reader | Who is this for? | "Informed consumer, evidence-curious, time-constrained, values nuance" |
| Brand mode | Editorial or Scientific | Default Scientific for Food Literacy + Food and Wellbeing; Editorial for Kitchen and Cooking + Food Systems unless data-heavy |
| Target length | Short / standard / deep dive | Standard (1,500–2,500 words) |

---

## When to ask, when to skip

**Ask** when:
- Topic is genuinely ambiguous ("Write about food labels" — which kind? Canadian FOP specifically, or ingredient lists, or marketing claims?).
- Two pillars plausibly fit (e.g. "ultra-processed foods" — Food and Wellbeing if health-impact, Food Literacy if label-decoding).
- The user mentioned a specific event or news hook but didn't say whether to lead with it.

**Skip** when:
- Topic + pillar are obvious from the prompt ("Draft an article about Canada's 2026 front-of-package symbol" → Food Literacy, regulatory angle, Scientific mode — no questions needed).
- The user already gave you a structured brief.
- The user explicitly said "you decide" or "make it work."

If you must ask, cap at **3 questions** in a single block. Use the AskUserQuestion structure to keep options crisp.

---

## Recommended clarifying questions

Use only the ones the prompt didn't already answer.

### Question 1 — Pillar (when ambiguous)

> **What pillar does this fit best?**
> - Food and Wellbeing — nutrition science, dietary patterns, health impacts.
> - Kitchen and Cooking — recipes, techniques, meal prep.
> - Food Literacy — labels, claims, ingredients, consumer education.
> - Food Systems — supply chains, sustainability, policy, food environments.

### Question 2 — Angle (when topic is broad)

> **What's the lens?**
> - "What changed in 2026" — for regulation pieces.
> - "The science vs the marketing" — for food-literacy pieces.
> - "How to apply this at home" — for practical pieces.
> - Other — describe in a sentence.

### Question 3 — Length (when scope unclear)

> **How deep do you want to go?**
> - Short explainer (900–1,200 words) — quick literacy piece.
> - Standard article (1,500–2,500 words) — default; thorough but readable.
> - Deep dive (3,000+ words) — definitive resource on the topic.

---

## When NOT to ask the user (use defaults instead)

| Inferred from | Default to apply |
|---|---|
| Topic mentions Canadian regulation, FOP, Health Canada | Brand mode Scientific; Canada-first framing; load [canada-context.md](canada-context.md) |
| Topic mentions a recipe or cooking technique | Pillar Kitchen and Cooking; brand mode Editorial; `isRecipe: true` if it's an actual recipe |
| Topic mentions a study, paper, or "research shows" | Brand mode Scientific; expect ≥6 citations |
| Topic mentions a food-environment, supply-chain, or policy theme | Pillar Food Systems; brand mode Editorial unless data-heavy |
| Topic mentions a label, claim, ingredient, or "what does X mean" | Pillar Food Literacy; brand mode Scientific |
| Topic mentions a personal anecdote opportunity (founder's experience) | Allow founder POV in the hook; brand "we" elsewhere |

---

## Producing the brief

After clarification (or directly, when none was needed), fill in [assets/topic-brief-template.md](../assets/topic-brief-template.md). Specifically:

1. **Topic + working title.** Working title is a placeholder; the real title comes during Phase 5 drafting after the synthesis settles.
2. **Pillar.** Canonical slug.
3. **Brand mode.** Editorial or Scientific. Justify in one line.
4. **Reader profile.** Default unless overridden.
5. **Angle.** One sentence describing what makes this piece distinctive.
6. **Key questions.** 3 questions the article will answer — these will likely become H2 headings later.
7. **Canada-context elements.** Which load-bearing Canadian references apply (Food Guide, 2026 FOP, 15% DV, CFIA, Statistics Canada, Canadian Food Inspection Agency, bilingual considerations). See [canada-context.md](canada-context.md).
8. **Target length.**
9. **Out-of-scope.** What this article will *not* cover — keeps Phase 3 focused.

The brief becomes the contract for Phases 2–7. If something needs to change after Phase 4 synthesis, update the brief and surface the change in the verification trail.

---

## Anti-patterns

- **Asking 5 questions** when 2 would do. The founder's time is the constraint.
- **Asking about title or slug** in Phase 1. Both come later, after research surfaces the article's real shape.
- **Inventing constraints the user didn't ask for** ("Should we include a recipe?"). If the topic is a recipe, the prompt or pillar makes that clear; otherwise don't add it.
- **Skipping clarification when two genuinely different articles could result.** When pillar/angle decisions would change the article's shape materially, asking is the right move.
- **Asking about pillar when the topic perfectly matches one.** "Article about how to read the new Canadian high-in symbol" is unambiguously Food Literacy. Asking adds friction without value.

---

## When the user hands you a structured brief

If the user pastes a brief — topic + pillar + angle + length explicitly stated — accept it. Validate consistency (pillar matches topic shape) and proceed. Don't re-ask anything they already answered.

If their brief contradicts itself (e.g. pillar Food Systems but topic is a recipe), surface the contradiction and ask one targeted clarifying question.

---

## Brief-to-pipeline handoff

The completed brief feeds:
- **Phase 2** — prior-art mapping uses the pillar and topic to scan foodpulse.co.
- **Phase 3** — source gathering uses angle, target length, and key questions to scope the search.
- **Phase 4** — synthesis uses the key questions to structure the outline (each question becomes an H2 candidate).
- **Phase 5** — drafting uses brand mode, voice rules, and the angle to set tone.
- **Phase 6** — citation insertion uses Canada-context elements to confirm regulatory citations.
- **Phase 7** — citation-check verifies everything.

The brief is the pipeline's spine. Get it right.
