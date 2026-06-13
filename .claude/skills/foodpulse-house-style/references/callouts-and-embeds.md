# Callouts & embeds

Two object types inside the article body Portable Text: `callout` (inline highlighted boxes) and `embed` (third-party content). Both are defined in the Sanity schema and rendered by [foodpulse/src/components/PortableTextComponents.tsx](../../../foodpulse/src/components/PortableTextComponents.tsx). Use them sparingly — they punctuate, they don't carry the article.

---

## Callouts

The Sanity `article` body includes an inline `callout` object with two fields:

```ts
{
  type: 'info' | 'warning' | 'tip'  // dropdown in Studio
  text: string                       // plain text body
}
```

Three types, three jobs.

### `info` — context, framing, definition

Use to drop a background fact, a definition, or a note about scope without breaking flow.

**Good uses.**
- A working definition of a term that's recurring in the article.
- A "what's a meta-analysis?" sidebar inside a research-heavy section.
- A note that the article focuses on Canadian context where regulations differ from other countries.

**Examples.**

> ℹ️ **NOVA Group 4 (ultra-processed foods)** — industrial formulations with ingredients you wouldn't keep in a home kitchen. The classification was developed by Brazilian researchers and is now used in Canada's national dietary intake reports.

> ℹ️ This article focuses on Canada's 2026 front-of-package rules. The US, EU, and UK use different symbols and thresholds — we'll cover those in a follow-up.

**Don't use for** practical takeaways (those go in the numbered list at the end) or warnings (use `warning` for those).

### `warning` — cautionary nuance, never alarmist

Use to flag a real limitation, contraindication, or "this guidance changes if X" condition. **Not** for shock value. Tone is calm and specific.

**Good uses.**
- "If you have CKD, the potassium guidance in this article changes."
- "These studies were conducted on adults — pediatric evidence is more limited."
- "Health Canada's enforcement of the new rules began January 1, 2026 — older packages on shelves may not yet show the symbol."

**Examples.**

> ⚠️ **If you have a diagnosed kidney condition,** the potassium guidance below changes. Work with your nephrology team rather than applying this general framework directly.

> ⚠️ The trial populations here were adults aged 25–65. Findings may not generalize to children, adolescents, or older adults.

**Don't use for** fear ("This common food might be destroying your gut") or to manufacture urgency. See [non-negotiables.md](non-negotiables.md) §3.

### `tip` — small, specific, actionable suggestion

Use for a single practical move the reader can make right now. Not a takeaway (those go at the end of the article) — a *moment*-of-reading nudge.

**Good uses.**
- "When comparing two packaged foods, look at the per-100g column, not per-serving — serving sizes aren't standardized."
- "If you're cooking with leafy greens, add the fat (oil, nuts, avocado) at the same time — fat-soluble vitamins absorb much better with it."

**Examples.**

> 💡 **Compare per-100g, not per-serving.** Serving sizes on Canadian labels are not standardized across brands. The per-100g column lets you compare two products on equal footing.

> 💡 **Add fat with leafy greens.** Vitamins A, D, E, and K need fat to absorb. A drizzle of olive oil or a few nuts with your salad does real work.

**Don't use for** product recommendations or for advice that's part of a multi-step process (write that as a numbered takeaway instead).

### Callout discipline

- **0–3 per article.** More than 3 reads cluttered and they stop punctuating.
- **One type per callout.** Don't mix info + warning intent in one box.
- **Plain text only** — the schema's `text` field is a string, not Portable Text. No inline links, no markdown. Put the link in surrounding body copy instead.
- **No callouts in the hook or definition section** — they punctuate later sections.
- **No callouts in recipe articles' step list** — the recipe data block handles that structure.

### Mode awareness

The Brand Guide reserves Burnt Orange for Editorial mode. Callouts render with brand colors that match the article's mode — the *content* of the callout doesn't change between modes, but a Scientific-mode article should avoid using `tip` callouts for chatty asides; keep them measured.

### What this article body cannot do (intentionally)

The **guide** template (a separate document type — `guideType`) supports a richer callout set with `title` and an extra `example` type. Articles don't. Don't try to render an `example`-typed callout in an article — the schema rejects it. If a piece needs a worked example with a heading, write it as an H3 + body paragraphs.

---

## Embeds

The Sanity `embed` object accepts five types via a dropdown:

| Value | Source | When to use |
|---|---|---|
| `linkedin` | LinkedIn post | Cite the founder's own post or another expert's analysis. |
| `twitter` | X / Twitter post | Sparingly — content is ephemeral. Better for time-stamped scientist commentary than for evergreen claims. |
| `youtube` | YouTube video | Demos, walk-throughs, interviews. As FoodPulse's own YouTube channel grows, embed FoodPulse videos in related articles. |
| `instagram` | Instagram post | Rare — only when an embedded carousel adds something a still image cannot. |
| `custom` | Raw HTML | Charts, calculators, interactive data viz. The `url` field is hidden for `custom`; only `embedCode` is filled. |

Each embed has:

```ts
{
  embedType: 'linkedin' | 'twitter' | 'youtube' | 'instagram' | 'custom'  // required
  url?: string         // required except for custom
  embedCode: string    // required — paste the platform's embed snippet
  caption?: string     // optional — appears below the embed
}
```

### Embed discipline

- **0–2 per article.** More dilutes the article's authority — readers came for FoodPulse's analysis, not a wall of social posts.
- **Caption explicitly.** Use the `caption` field to set context — what is this embed, who is the source, why is it here. Captions also feed accessibility tooling.
- **Verify the source.** An embedded tweet from a credentialed researcher is fine; an embedded tweet from anonymous "wellness" accounts is off-brand. The embed inherits the brand's authority signal.
- **Future-proofing.** Embeds can break (post deleted, platform API change). For evergreen articles, prefer screenshots with citation over live embeds. For time-stamped commentary, live embeds are fine.
- **Custom HTML.** When using `custom`, the article is almost certainly in Scientific mode (charts, calculators). Make sure the embedded markup is responsive and accessible — alt text on `<img>`, ARIA labels on interactive elements, no inline scripts that would fail CSP.

### Mode considerations

- **Editorial mode:** social embeds (LinkedIn, X, YouTube) when narratively useful. Custom HTML rare.
- **Scientific mode:** custom HTML charts and calculators feature; social embeds rare. If embedding a researcher's tweet, the citation should also appear in the structured `sources` array — the embed is the visual context, not the primary citation.

### What not to embed

- Sponsored content or affiliate widgets.
- Anything that requires a third-party login wall.
- Anything from a source you wouldn't cite in the `sources` array. The embed and the citation should be coherent.

---

## Combining callouts and embeds

Both can live inside the same H2 section, but never adjacent.

```
[h2] "What does the research show?"
[normal] Two paragraphs of analysis…
[callout info] Definition of the key term.
[normal] One paragraph of interpretation…
[embed youtube] FoodPulse video walking through the analysis (when one exists).
[normal] One paragraph of takeaway language.
```

A callout immediately followed by an embed reads as two interruptions back-to-back. Put body copy between them.
