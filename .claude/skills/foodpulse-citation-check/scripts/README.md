# `verify-citations.mjs`

Deterministic citation verification: URL liveness + CrossRef metadata match. Lives inside the `foodpulse-citation-check` skill, not in the Next.js project — it's skill infrastructure, not a project npm script.

Requires Node 20+ (uses native `fetch`, AbortController, top-level await). No dependencies.

---

## Usage

From the repo root:

```bash
node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs sources.json > report.json
```

From stdin:

```bash
cat sources.json | node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs --stdin > report.json
```

Help:

```bash
node .claude/skills/foodpulse-citation-check/scripts/verify-citations.mjs --help
```

The script is meant to be invoked by the skill's agent loop, not as a standalone CLI. An agent runs the workflow in `../references/verification-workflow.md`, calls this script during Phase 3, and consumes the JSON output.

---

## Input schema

A JSON array. Each element is a source object:

```ts
type SourceInput = {
  title: string;        // required — for CrossRef title comparison
  url: string;          // required — for URL liveness
  author?: string;      // optional — for CrossRef author comparison
  year?: string;        // optional — for CrossRef year comparison
  doi?: string;         // optional — if present, CrossRef lookup runs; if absent, script tries to extract from `url`
};
```

The shape matches the Sanity `article.sources` schema (`{title, url, author, year}`) with an optional `doi` field added for explicit CrossRef lookup. The skill's `references/sources-block-rules.md` documents how to populate each field correctly.

### DOI extraction

If `doi` is absent, the script tries to extract a DOI from `url` when it matches `doi.org/10.xxxx/yyyy` or `dx.doi.org/10.xxxx/yyyy`. Providing `doi` explicitly is faster and unambiguous.

---

## Output schema

A JSON object printed to stdout:

```ts
type Report = {
  summary: {
    total: number;
    verified: number;
    flagged: number;
    errors: number;
  };
  results: Array<{
    index: number;
    input: SourceInput;
    url_check: {
      status: number | null;       // HTTP status code, or null on network error
      final_url: string | null;    // URL after redirects
      ok: boolean;                  // true for 200–399
      error?: string;               // "timeout" | network error message
      retried?: boolean;            // true if 5xx triggered a retry
    };
    crossref:
      | { found: false; skipped: true }                          // no DOI provided
      | { found: false; doi: string; status?: number; error?: string }
      | {
          found: true;
          doi: string;
          match: {
            title: "ok" | "mismatch" | "unknown";
            author: "ok" | "mismatch" | "unknown";
            year: "ok" | "mismatch" | "unknown";
            title_overlap?: number;            // 0–1 word overlap ratio
            crossref_title?: string;
            crossref_first_author?: string;
            crossref_year?: number;
          };
          metadata: {
            title: string;
            container: string;                  // journal / publisher
            authors: Array<{ family: string | null; given: string | null }>;
            issued_year: number | null;
            type: string;                       // e.g. "journal-article"
            publisher: string;
          } | null;
        };
    issues: string[];               // see "Issue tags" below
    status: "verified" | "flagged";
  }>;
};
```

### Issue tags

Strings the script writes into each result's `issues` array:

- `url-dead` — HTTP 4xx response (excluding 403; that's `url-bot-walled`).
- `url-bot-walled` — HTTP 403 response. Common at major publishers (Elsevier, Wiley, BMJ, Springer) which reject non-browser User-Agents. **Advisory only** when CrossRef verification is clean.
- `url-server-error` — HTTP 5xx after one retry.
- `url-timeout` — request didn't return within 10s.
- `url-unreachable` — DNS / network / unknown error.
- `doi-not-found` — CrossRef returned 404 for the DOI.
- `crossref-error` — CrossRef request errored or returned non-200.
- `crossref-title-mismatch` — DOI exists but the input title doesn't match CrossRef's title (word overlap below 70%).
- `crossref-author-mismatch` — DOI exists but no input-author surname matches any CrossRef author surname.
- `crossref-year-mismatch` — DOI exists but the input year doesn't match CrossRef's publication year.

### Status mapping

- Zero issues → `verified`.
- One issue that is **only** `url-bot-walled` **and** CrossRef verified all three fields cleanly → `verified` (the bot-walled URL is advisory). CrossRef metadata is the canonical existence check for DOI'd sources; publisher landing-page bot detection doesn't change that.
- Any other issue, or `url-bot-walled` without CrossRef verification → `flagged`.

---

## Exit codes

- `0` — script ran cleanly, regardless of verification outcomes. Calling code reads `summary` for the verdict.
- `1` — script failed (no input path, bad JSON, top-level error). `stderr` carries the message.

---

## Behavior details

### URL liveness check

- HTTP `GET` with browser-like User-Agent + Accept headers.
- 10s timeout via `AbortController`.
- Follows redirects (`redirect: "follow"`).
- Status 200–399 → `ok: true`.
- Status 400–499 → `ok: false`, issue `url-dead`. **No retry** — these are not transient.
- Status 500–599 → one retry. If still 5xx, issue `url-server-error`.
- Timeout → issue `url-timeout`.
- Other network errors → issue `url-unreachable`.

### CrossRef metadata lookup

- `GET https://api.crossref.org/works/<doi>`.
- 10s timeout.
- 250ms pre-request delay (CrossRef's polite-user etiquette).
- Custom User-Agent with mailto for CrossRef's "polite pool" routing.
- Title comparison: lowercase, NFKD-normalize, strip diacritics + punctuation, split into 3+ char words, compute set overlap. ≥70% overlap → `ok`. Below 70% → `mismatch`. Below this threshold, eyeball the report — paraphrased titles can still be legitimate.
- Author comparison: extract surname from input (last token, or first token before comma), compare against every CrossRef author's `family` field. Match anywhere in list → `ok`. No match → `mismatch`.
- Year comparison: exact string match against CrossRef's `issued` / `published-print` / `published-online` year.

### Concurrency

Sequential for v1 — one source at a time. With CrossRef's 250ms inter-request delay and 10s URL timeouts, a 20-source article finishes well under 30s. If throughput becomes a concern, the `verifyOne` loop can be wrapped in an async pool — but the simplicity tradeoff is preferred until proven necessary.

---

## Example

`sources.json`:

```json
[
  {
    "title": "Front-of-package nutrition symbol — final regulations",
    "url": "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/nutrition-labelling/front-package.html",
    "author": "Health Canada",
    "year": "2022"
  },
  {
    "title": "Ultra-processed food consumption and adult diet quality in Canada",
    "url": "https://doi.org/10.25318/82-003-x202001100002-eng",
    "author": "Polsky, J. Y. et al.",
    "year": "2020",
    "doi": "10.25318/82-003-x202001100002-eng"
  }
]
```

Run:

```bash
node verify-citations.mjs sources.json
```

Output (excerpt):

```json
{
  "summary": { "total": 2, "verified": 2, "flagged": 0, "errors": 0 },
  "results": [
    {
      "index": 0,
      "input": { "title": "Front-of-package...", "url": "https://www.canada.ca/...", "author": "Health Canada", "year": "2022" },
      "url_check": { "status": 200, "final_url": "https://www.canada.ca/...", "ok": true },
      "crossref": { "found": false, "skipped": true },
      "issues": [],
      "status": "verified"
    },
    {
      "index": 1,
      "input": { "title": "Ultra-processed food...", "...": "..." },
      "url_check": { "status": 200, "final_url": "https://...", "ok": true },
      "crossref": { "found": true, "doi": "10.25318/...", "match": { "title": "ok", "author": "ok", "year": "ok", "title_overlap": 0.92 }, "metadata": { "..." } },
      "issues": [],
      "status": "verified"
    }
  ]
}
```

A pre-built example input that's safe to run against is at [../assets/sources-input-example.json](../assets/sources-input-example.json). It mixes valid and deliberately-bad entries so a developer can verify the script works end-to-end.

---

## What the script does NOT do

- Verify whether a source actually *supports* a claim — that's Phase 4 of the workflow (LLM-semantic).
- Label evidence strength — Phase 5.
- Pull `sources` arrays from a Sanity document — the agent does that.
- Stamp `reviewedAt` — the agent (or human) does that after the gate passes.
- Block publish — that's the agent's decision based on the report.

It is a fast, deterministic existence-and-metadata check. One job, done well.

---

## Extending

If FoodPulse's article topics shift toward biomedical primary research at scale, add a PubMed lookup alongside CrossRef. NCBI E-utilities is the entry point; the response includes title, authors, journal, and year. Drop in a `lookupPubmed(pmid)` function mirroring `lookupCrossref(doi)` and extend the input schema with an optional `pmid` field.

If the trusted-domain allowlist in `references/source-hierarchy.md` should affect the report (e.g. flagging off-allowlist Tier B citations), add a `domain_tier` field in each result. The agent can do this in Phase 4 without script changes — but moving it into the script is fine when the list stabilizes.
