# Sources block rules

Formatting and ordering rules for the Sanity `article.sources` array. Cross-references the schema documented in skill 1 at [.claude/skills/foodpulse-house-style/references/sanity-schema-map.md](../../foodpulse-house-style/references/sanity-schema-map.md).

The Sanity schema (per [foodpulse/src/sanity/schemaTypes/documents/articleType.ts](../../../foodpulse/src/sanity/schemaTypes/documents/articleType.ts)) accepts source objects with this shape:

```ts
{
  title: string    // required for display
  url: string      // required
  author?: string  // optional
  year?: string    // optional
}
```

This file extends that schema with FoodPulse-specific conventions.

---

## Field-by-field rules

### `title`

- The **exact** paper or report title. No abbreviations, no rephrasing.
- For journal articles: the article title as it appears on the journal page (and as CrossRef returns it).
- For institutional reports: the report's official title ("Health Canada Front-of-Package Nutrition Labelling — Final Regulations").
- For book chapters: the chapter title, not the book title alone.
- For multi-language sources, use the source's original-language title and append an English translation if needed: "*Le système alimentaire québécois* (Quebec's Food System)".
- No trailing period.

### `url`

- For peer-reviewed articles with a DOI: use the DOI URL — `https://doi.org/10.xxxx/xxxxx`. The DOI URL is permanent and resolves to the publisher's canonical page.
- For institutional sources: the canonical institutional URL on the institution's main domain. Prefer the deepest stable URL (a specific guidance page) over a landing page.
- For news / secondary reporting: the article's direct URL.
- Never use shortened URLs (bit.ly, tinyurl).
- Never use URLs that include session IDs, tracking parameters, or auth tokens.
- If a paywalled paper has a free open-access version (publisher OA, author preprint, PMC mirror), use the DOI URL here and link to the OA version inline in the article body via the `link` annotation.

### `author`

- For papers with **1–3 authors**: list each. "Hooper, L.; Martin, N.; Jimoh, O. F."
- For papers with **4 or more authors**: first author + et al. — "Hooper, L. et al."
- For institutional sources: the institution name. "Health Canada", "Statistics Canada", "World Health Organization".
- For multi-institutional collaborations: the consortium name if it has one ("CONSORT Group"), otherwise the lead institution.
- When unknown, leave empty rather than guessing.

### `year`

- 4-digit publication year ("2024", not "24" or "Spring 2024").
- For institutional rules: the year the rule was published or last amended ("2022" for the Canadian FOP final regulations).
- For online sources that get continuously updated (Health Canada guidance pages): use the year of the most recent visible revision, not the date the article was originally posted.
- When unknown, leave empty rather than guessing.

---

## Order within the array

**Citation-order by default.** First cited in the body → first listed in the array. Numbers in inline citations ("[1]", "[2]") match the array index.

**Exception — long thematic articles.** Articles with 15+ citations across distinct themes can group sources thematically with a leading internal note in the body (e.g. an H3 "Sources by theme" callout). The schema doesn't carry the grouping — it's organizational for the reader. Within each theme, still order by citation.

**Never alphabetical.** Reader follows the body, not the surname.

---

## One source per cited finding

Don't bundle. If a section cites two studies in one sentence, the sources array has two entries — even if they share an author.

```
✗ Bundle: { title: "Two related studies on UPF and gut health", url: "...", year: "2023" }
✓ Split:  { title: "Ultra-processed food intake and gut microbiome composition", ... }
          { title: "Dietary patterns and intestinal inflammation in adults", ... }
```

The CrossRef lookup is per-citation; bundling defeats it.

---

## DOI handling

For peer-reviewed citations, the recommended *internal* shape (used by [verify-citations.mjs](../scripts/verify-citations.mjs)) extends the Sanity object with an optional `doi` field:

```json
{
  "title": "...",
  "url": "https://doi.org/10.1136/bmj-2023-077310",
  "author": "Lane, M. M. et al.",
  "year": "2024",
  "doi": "10.1136/bmj-2023-077310"
}
```

The `doi` field is for the script's CrossRef lookup. The Sanity schema doesn't store it as a separate field — when the source is saved to Sanity, embed the DOI in the URL. When running the verifier, the script extracts the DOI from the URL automatically if `doi` is absent. Providing both is fine; the script prefers the explicit `doi`.

**DOI format.** No prefix — just `10.xxxx/yyyyy`. The script handles both bare DOIs and full DOI URLs.

---

## Coverage

Every claim in the article that's not classified as `no-source-needed` or `context-only` must point to at least one source object.

**One source can support multiple claims.** A Statistics Canada Health Reports article on UPF intake can be cited for both the 46% figure and the trend over time.

**Multiple sources can support one claim.** Regulatory rules backed by a research review benefit from both the regulatory citation (Health Canada) and the underlying review.

The verification report's per-claim section traces each claim to its source(s); this tracing lives in the report, not in the Sanity document.

---

## Inline citation markers in body

The Sanity `body` Portable Text supports a `link` annotation on inline text — this is how readers click into the source. Conventions:

- Link the **claim-bearing phrase**, not the citation marker. ("Statistics Canada found [46% of Canadian daily energy](https://...) comes from ultra-processed foods.")
- Avoid bracketed numeric markers in body copy ("[1]") — they're a print convention that reads awkwardly online and creates a second-order lookup the reader must perform.
- When a paragraph cites three or more sources, consider whether the sources should appear as a `blockquote` with the citation, or whether the section needs an inline summary with sources clustered at the end.

The article footer renders the full `sources` array; readers who want every source can scan there.

---

## Stamping `reviewedAt` after verification

When this skill's gate returns `ready`, the agent stamps `reviewedAt` on the Sanity document with today's ISO datetime. See [freshness-and-review.md](freshness-and-review.md) for the cadence and the `updatedAt` rules.

---

## What to do when a source has to be removed

Sometimes a source can't be verified, can't be replaced, and the claim it supported can't stand alone.

**Options, in order of preference:**

1. **Find a replacement source.** If the claim is real, a higher-tier source likely exists. The script's CrossRef lookup helps when the title fragment is searchable.
2. **Soften the phrasing.** If the underlying evidence is weaker than originally framed, rewrite to match the actual strength label (`emerging` instead of `established`, etc.).
3. **Remove the claim.** If neither 1 nor 2 works, cut the sentence. The article is stronger without an unverifiable claim than with one.
4. **Move to a follow-up.** If the topic is important but underdetermined, note it as a future article — *"We're tracking ongoing research on X; we'll cover it when the evidence is stronger."*

Never publish a claim with a known-bad source just because the sentence reads well.
