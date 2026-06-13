# Source hierarchy

How FoodPulse ranks sources. The skill enforces a preference for higher tiers and flags Tier D citations that don't chain to a Tier A or B source.

---

## The four tiers

### Tier A — Primary research

Peer-reviewed journal articles with a DOI. The gold standard.

**Examples.**
- "Hooper, L. et al. *Reduction in saturated fat intake for cardiovascular disease.* Cochrane Database of Systematic Reviews, 2020. doi:10.1002/14651858.CD011737.pub3"
- "Lane, M. M. et al. *Ultra-processed food exposure and adverse health outcomes: umbrella review.* BMJ, 2024."

**Trust.** Highest. CrossRef metadata available for nearly all of these.

**When to prefer.** Always preferred when a primary peer-reviewed study exists for the claim.

**Caution.**
- Single primary studies are still `preliminary` evidence (see [evidence-strength.md](evidence-strength.md)). Tier A is about *source quality*, not *evidence strength*. They're independent axes.
- Preprints (arXiv, bioRxiv, medRxiv) are not peer-reviewed. They sit between Tier A and Tier C — usable when labeled `preliminary`, never as `established`.

### Tier B — Authoritative institutional sources

Statements from health and food-systems authorities. High trust for regulatory facts, official guidance, and population-level data.

**The trusted-domain allowlist:**

- **Canada**
  - `canada.ca` — Government of Canada, Health Canada, Canadian Food Inspection Agency (CFIA)
  - `inspection.canada.ca`, `inspection.gc.ca` — CFIA
  - `statcan.gc.ca` — Statistics Canada
  - `food-guide.canada.ca` — Canada's Food Guide
- **International**
  - `who.int` — World Health Organization
  - `fao.org` — Food and Agriculture Organization
- **United States**
  - `nih.gov`, `ods.od.nih.gov` — NIH and Office of Dietary Supplements
  - `cdc.gov` — CDC
  - `fda.gov` — FDA
  - `usda.gov`, `ars.usda.gov` — USDA
  - `nlm.nih.gov`, `ncbi.nlm.nih.gov`, `pubmed.ncbi.nlm.nih.gov` — NLM / PubMed
- **EU / UK**
  - `efsa.europa.eu` — European Food Safety Authority
  - `ec.europa.eu` — European Commission
  - `food.gov.uk` — UK Food Standards Agency
  - `nhs.uk` — NHS

**Trust.** High for facts within the institution's remit. Health Canada is authoritative on Canadian labelling rules; less so on cellular biology.

**When to prefer.** Regulatory rules, government dietary guidance, population-level statistics, food-system policy.

**Caution.**
- Institutional pages get reorganized; URLs break. Re-verify quarterly.
- Government and institutional pages can be tied to specific administrations or program eras — note the date.

### Tier C — Reputable secondary reporting

High-quality science journalism and synthesis sources.

**Examples.**
- *Scientific American*, *Nature News & Comment*, *Science News*
- *The New York Times Health*, *The Globe and Mail Health*, *CBC Health*
- *The Conversation*, *Stat News*
- Cochrane Library plain-language summaries
- *NEJM Journal Watch*

**Trust.** Moderate. Useful for context, framing, and accessible summaries of primary research.

**When to prefer.**
- Setting the stage for a more technical claim ("a recent New York Times piece highlights…").
- Explaining the policy or institutional response to a piece of research.
- Quoting a credentialed expert's framing of a contested area.

**Caution.**
- Tier C is rarely the *only* source for a numerical or scientific claim. Pair it with the primary research it summarizes.
- Watch for the science-journalism telephone game: secondary reporting often over-simplifies or shifts emphasis. Read the primary source the article cites and use it directly.

### Tier D — Tertiary / community

Wikipedia, popular news without a clear science desk, expert social-media commentary, podcasts, YouTube videos by credentialed practitioners.

**Trust.** Low for primary claims; useful for discovery, context, and "who's saying what" mapping.

**When acceptable.**
- As a *starting point* for research — Wikipedia is great for finding the primary citations on a topic.
- When citing the commentary itself, not the underlying claim ("In a 2025 X post, Dr. Y argued…").

**Never use as the only source for:**
- A numerical claim.
- A regulatory fact.
- A scientific finding.

The skill flags any claim whose only citation is Tier D.

---

## Disallowed sources

Some sources are categorically off-brand. The skill flags these without exception.

- **Promotional content.** Brand websites recommending their own products, sponsored "studies" funded by the seller of the product, supplement-brand blogs.
- **Fad-diet primary sources.** "The keto institute," "carnivore.diet," celebrity-doctor sites that monetize the position they're advocating.
- **Predatory journals.** Beall's List / Cabells Predatory Reports — flag any cited journal that appears.
- **Non-credentialed wellness blogs.** Health and nutrition advice from unverifiable practitioners.
- **Preprints presented as established.** Preprints are fine when phrased as `preliminary`. Citing a preprint with `established` phrasing is a flag.

When a draft has a Disallowed source, the gate blocks publish until it's replaced or removed.

---

## Trusted-domain allowlist behavior in the script

[verify-citations.mjs](../scripts/verify-citations.mjs) does **not** hard-block off-allowlist URLs — that's an editorial judgment, not a deterministic check. The script reports URL liveness and CrossRef metadata; the agent classifies the source's tier when producing the report.

This file is the agent's reference. When extending it (adding a new trusted government domain, adding a new disallowed predatory journal), edit this file and note the change in the article that triggered it.

---

## Mapping tiers to evidence strength

Source tier and evidence strength are **independent**.

- Tier A primary research can support `established`, `emerging`, `contested`, or `preliminary` evidence depending on study count, design, and effect-size consistency.
- Tier B institutional guidance can support `established` (long-standing rules like trans-fat restrictions) or `emerging` (new front-of-package symbol — first year of enforcement data).
- Tier C secondary reporting almost never supports `established` on its own; it's a framing source.
- Tier D should never be the sole support for any strength label above `preliminary`.

See [evidence-strength.md](evidence-strength.md) for how the strength labels combine with copy phrasing rules.

---

## When the right source is locked behind a paywall

FoodPulse cites the canonical source even when it's paywalled. The reader benefits from the citation regardless of their access.

- Use the DOI URL (`https://doi.org/10.xxxx/xxxxx`) — readers with institutional access reach the paper directly.
- If a free open-access version exists (publisher's open access, author's preprint, PMC mirror), include the open URL in the body link annotation while keeping the canonical DOI in the sources array.

---

## When the right source is in a language other than English

- Include the original-language source.
- Add a one-line English caption in the citation `title` field if the original title is non-English ("Original Spanish title: *…* — English: *…*").
- If a peer-reviewed English-language secondary source covers the same finding, add it as a co-citation.

---

## Updating this list

When you find a new trusted domain or a new disallowed source while writing or reviewing, update this file. Note the date and the article that triggered it. This file is part of the brand's living trust infrastructure.
