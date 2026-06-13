# The 33-pattern humanizer ruleset

Adapted from [blader/humanizer](https://github.com/blader/humanizer) v2.8.0 (MIT). Original source based on [Wikipedia's WikiProject AI Cleanup signs-of-AI-writing guide](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup/AI_catchphrases). FoodPulse-specific examples and carve-outs added where they help.

Patterns are grouped by category. Each pattern has: what to look for, a generic before/after, and (when relevant) a FoodPulse-specific note. Read the full set once. After that, you can scan by category.

---

## Style patterns (these are usually the loudest)

### Pattern 14 — Em-dashes (hard rule)

**Look for:** `—` (em-dash) or `–` (en-dash) anywhere in published prose.

**Replace with:** a period, comma, colon, parentheses, or restructure the sentence so the punctuation isn't needed.

**Before:** "The symbol is the most visible change to Canadian food packaging in a decade — it's also the part of the package most likely to be misread."

**After:** "The symbol is the most visible change to Canadian food packaging in a decade. It's also the part of the package most likely to be misread."

**FoodPulse note:** This is the **hard zero rule**. No em-dashes in body prose, excerpt, FAQ answers, OG meta description, anything readers see. Exempt regions: HTML comments, illustration brief text, frontmatter TODO placeholders, verification-trail metadata, notes for editorial review. None of those reach the published article.

### Pattern 15 — Overuse of boldface

**Look for:** mechanical bolding of acronyms, definitions, or every key phrase.

**Replace with:** sparingly. Bold a key term on first mention. Don't bold every noun.

### Pattern 16 — Inline-header vertical lists

**Look for:** lists where each item starts with a bolded label followed by a colon, then the content.

**Replace with:** flowing prose, or a clean list with prose-form items.

**FoodPulse carve-out:** numbered practical-takeaway lists in articles legitimately use this structure (e.g. **"Use it for direct comparisons."** then the body). Leave those. Strip elsewhere.

### Pattern 17 — Title Case in Headings

**Look for:** Capitalizing Every Main Word In A Heading.

**Replace with:** sentence case ("Capitalizing every main word in a heading"). Exception: proper nouns and acronyms.

### Pattern 18 — Emojis

**Look for:** decorative emojis in headings or bullets.

**Replace with:** remove the emoji; integrate the content into prose.

**FoodPulse carve-out:** callout emojis (ℹ️, ⚠️, 💡) at the start of info/warning/tip callouts in articles are functional, not decorative. They map to the `callout.type` field in the Sanity schema. Leave them.

### Pattern 19 — Curly quotation marks

**Look for:** "…" (curly) when the system should produce "…" (straight).

**Replace with:** straight quotes. Markdown editors typically auto-convert; just don't fight it.

---

## Communication patterns (chatbot artifacts)

### Pattern 20 — Chatbot artifacts

**Look for:** "I hope this helps", "Let me know if…", "Would you like me to…", "Feel free to…".

**Replace with:** remove entirely. These belong in conversations, not in content.

### Pattern 21 — Knowledge-cutoff disclaimers

**Look for:** "as of my last update", "while specific details are limited", "I don't have information on…".

**Replace with:** state what's known with a source, or omit the section. Don't dress a guess up as fact.

### Pattern 22 — Sycophantic tone

**Look for:** "Great question!", "You're absolutely right.", "What an interesting topic!"

**Replace with:** state the point directly without compliments.

---

## Authority and trope patterns

### Pattern 27 — Persuasive authority tropes

**Look for:** "The real question is…", "At its core…", "What really matters is…", "The honest answer is…", "The useful question is…".

**Replace with:** just state the point.

**Before:** "The honest answer is that it is neither. It's information."

**After:** "It is neither. It's information."

**FoodPulse note:** I saw this one twice in the FOP-symbol draft. Watch for it especially in hook paragraphs.

### Pattern 28 — Signposting and announcements

**Look for:** "Let's dive in", "Here's what you need to know", "Two honest takeaways", "A few specific moves that work:", "First, let's…", "To summarize…".

**Replace with:** start with the actual content. If you have three takeaways, present three takeaways without announcing them.

**Before:** "Two honest takeaways. First, the Canadian-specific projection suggests modest but real benefits. Second, whether it will shift behaviour at that scale is an open question."

**After:** "So the Canadian-specific projection suggests modest but real benefits. Whether it will shift behaviour at that scale is an open question."

### Pattern 33 — Conversational rhetorical openers

**Look for:** "Look,", "Here's the thing,", "Honestly?", "Truthfully," as standalone openers.

**Replace with:** delete the opener. State the point.

---

## Aphorism and depth-faking patterns

### Pattern 32 — Aphorism formulas

**Look for:** "X is the Y of Z" structures and "X, not Y" tagline-style sentences that sound profound but obscure meaning.

**Replace with:** a specific statement of what you actually mean.

**Before:** "It's information, not a verdict."

**After:** "It tells you a single fact." Or rewrite the surrounding sentences so the contrast comes out of content, not a tagline.

**FoodPulse carve-out:** the brand's own non-negotiables ("We don't tell you what to eat. We help you make sense of food and nutrition.") have this shape. They're load-bearing brand positioning. Leave them. Strip the AI-generated lookalikes.

### Pattern 3 — Superficial -ing analyses

**Look for:** present participles tacked on to add fake depth: "highlighting…", "symbolizing…", "cultivating…", "reflecting a broader…".

**Replace with:** the specific thing.

**Before:** "symbolizing connection to the land"

**After:** "colors reference local bluebonnets and the Gulf coast"

### Pattern 1 — Undue emphasis on significance

**Look for:** "stands as", "testament", "pivotal", "underscores", "marking a moment", "marks an evolution".

**Replace with:** the specific fact.

### Pattern 2 — Undue emphasis on notability

**Look for:** "received widespread media coverage", "from independent outlets", "active social media presence".

**Replace with:** the specific source and detail.

---

## Vocabulary patterns

### Pattern 7 — Overused AI vocabulary

**Look for:** `actually`, `crucial`, `delve`, `enhance`, `garner`, `interplay`, `landscape` (as metaphor), `navigate` (as metaphor), `pivotal`, `showcase`, `tapestry`, `testament`, `underscore`, `genuinely`, `truly`, `incredibly`, `seamlessly`, `holistic`, `robust`.

**Replace with:** simpler equivalents or delete.

**Before:** "the evidence is the most interesting and the most genuinely uncertain"

**After:** "the evidence gets interesting. And uncertain."

**FoodPulse note:** "actually" as an intensifier ("does this actually change behaviour?") is fine in a question; "actually" as filler ("this is actually a real effect") should go.

### Pattern 4 — Promotional language

**Look for:** "vibrant", "stunning", "nestled", "breathtaking", "rich (cultural heritage)", "renowned for", "boasting".

**Replace with:** specific facts.

### Pattern 11 — Elegant variation

**Look for:** cycling synonyms for the same thing ("the protagonist", "the main character", "the central figure", "the hero" — all in one paragraph).

**Replace with:** a single consistent term.

### Pattern 26 — Hyphenated word pairs

**Look for:** "high-quality" in predicate position (e.g. "the report is high-quality").

**Replace with:** drop the hyphen in predicate position ("the report is high quality"). Keep the hyphen in attributive position ("a high-quality report").

---

## Sentence-structure patterns

### Pattern 8 — Copula avoidance

**Look for:** "serves as", "boasts", "features", "represents" — used instead of plain "is".

**Replace with:** "is" or "are".

**Before:** "The building serves as the city's main library."

**After:** "The building is the city's main library."

### Pattern 9 — Negative parallelisms

**Look for:** "not only X but also Y", "it's not just X; it's Y", "not merely…but…".

**Replace with:** a single positive statement.

**Before:** "It's not just about the beat; it's part of the song's aggression."

**After:** "The heavy beat adds to the song's aggression."

### Pattern 10 — Rule of three overuse

**Look for:** forced triplets where the underlying content is one idea, two ideas, or four-plus ideas, but the writing forces three.

**Replace with:** the actual count. Two ideas? Use two. Five? Use five.

**Before:** "talks about innovation, inspiration, and industry insights"

**After:** "talks and panels, plus networking time"

**FoodPulse carve-out:** the Four Voice Principles (Informed not academic, Practical not preachy, Direct not blunt, Curious not anxious) and the Four Pillars (Food and Wellbeing, Kitchen and Cooking, Food Literacy, Food Systems) genuinely have four items each. Lists of regulated nutrients ("saturated fat, sugars, and sodium") have three because that's what the rule covers. Leave structural lists alone. Strip forced-three stylistic triplets.

### Pattern 12 — False ranges

**Look for:** "from X to Y" where the endpoints aren't truly comparable.

**Replace with:** a specific list or rewrite.

**Before:** "covers everything from the singularity to the cosmic web"

**After:** "covers the Big Bang, star formation, and dark matter"

### Pattern 13 — Passive voice (hiding the actor)

**Look for:** "No configuration is needed", "It was decided that…", "It is recommended that…".

**Replace with:** active voice with the actor named.

**Before:** "No configuration is needed."

**After:** "You don't need a configuration file."

**FoodPulse carve-out:** passive voice for unknown or unimportant actors ("the symbol was introduced in 2022") is fine. Strip only when it hides a known actor that matters.

### Pattern 31 — Manufactured punchlines

**Look for:** stacked short declarative fragments for artificial drama, e.g. "It changed. Everything changed. The whole field changed."

**Replace with:** one short sentence for emphasis. Don't run them in series.

---

## Content patterns

### Pattern 5 — Vague attributions

**Look for:** "Experts argue", "Industry reports", "Observers cite", "Many believe", "Studies have shown".

**Replace with:** named, dated, sourced attribution.

**Before:** "Experts believe it plays a crucial role."

**After:** "According to a 2019 Chinese Academy survey, it plays a load-bearing role in [specific outcome]."

**FoodPulse note:** the citation-check gate catches the most egregious vague attributions. The humanizer catches the surviving ones.

### Pattern 6 — Outline-like challenges sections

**Look for:** "Despite its X, the Y faces challenges typical of Z" formulaic structures.

**Replace with:** specific challenges with specific causes.

### Pattern 30 — Diff-anchored writing

**Look for:** "X was added to replace Y", "previously did Z but now does W". Writing that narrates the change rather than describing the current state.

**Replace with:** describe the thing as it is now. Save change-narration for changelogs.

---

## Filler and hedging

### Pattern 23 — Filler phrases

| Before | After |
|---|---|
| "in order to" | "to" |
| "due to the fact that" | "because" |
| "at this point in time" | "now" |
| "the system has the ability to" | "the system can" |
| "for the purpose of" | "for" / "to" |
| "in the event that" | "if" |
| "with regard to" | "about" / "for" |

### Pattern 24 — Excessive hedging

**Look for:** "could potentially possibly be argued", "may perhaps suggest", "might possibly indicate".

**Replace with:** "may suggest" or "indicates", depending on actual evidence strength. Use the evidence-strength rules in [`[[foodpulse-citation-check]]`/evidence-strength.md](../foodpulse-citation-check/references/evidence-strength.md) to calibrate.

### Pattern 25 — Generic positive conclusions

**Look for:** "exciting times ahead", "an interesting future", "much to look forward to".

**Replace with:** specific facts about what's actually next, or cut the section.

### Pattern 29 — Fragmented headers

**Look for:** a heading followed by a one-line paragraph that restates the heading.

**Replace with:** delete the restating paragraph. Move into substantive content immediately.

---

## False positives to skip

Don't flag these. They aren't AI tells:

- **Perfect grammar and consistent style.** Humans write cleanly too.
- **Mixed registers** (casual + formal in the same piece). Often deliberate.
- **Bland prose without specific tells.** Not every dry sentence is AI-generated.
- **Formal vocabulary** in formal contexts.
- **A single em-dash, however, or curly quote** in a sentence — wait actually we do strip em-dashes (Pattern 14 is hard zero). The rest of the "single" qualifier still holds for `however`, curly quotes, etc.
- **Correct, clean formatting.** Markdown done right isn't a tell.
- **Unsourced claims.** That's a citation-check finding, not a humanizer finding.

## Signs of genuine human writing (let these be)

- **Specific, hard-to-fabricate details** (a named relative, a specific Toronto grocery, a remembered conversation).
- **Mixed feelings and unresolved tension** (the writer not knowing the answer).
- **Dated or era-specific references and slang.**
- **First-person editorial choices** (when attributed and real — see the founder POV carve-out).
- **Varied sentence length** with deliberate short sentences for rhythm.
- **Genuine asides and self-corrections** ("…actually, that's not quite right. What I mean is…").
- **Content predating November 30, 2022.** Anything pre-ChatGPT is, by definition, not AI-generated.

---

## The 4-step process applied per pattern

1. **Scan** for instances of all 33 patterns. Don't fix yet.
2. **Categorize.** Group instances by pattern number. This makes the rewrite mechanical.
3. **Rewrite** instance by instance, applying the pattern-specific replacement. Preserve inline citations, sources, evidence-strength phrasing.
4. **Re-scan** for em-dashes (Pattern 14, hard zero). They sneak in during restructuring.

Then hand off to `[[foodpulse-citation-check]]`.

---

## Crediting

Pattern names, categories, and the underlying detection logic come from [blader/humanizer](https://github.com/blader/humanizer) v2.8.0. The FoodPulse-specific examples and carve-outs are observed in our own drafts.
