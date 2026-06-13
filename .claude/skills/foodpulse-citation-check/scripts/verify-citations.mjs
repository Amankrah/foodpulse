#!/usr/bin/env node
// FoodPulse Citation Check — verify-citations.mjs
// Deterministic citation verification: URL liveness + CrossRef metadata match.
// Reads a JSON array of source objects from a file path or stdin.
// Writes a JSON verification report to stdout.
//
// See ../SKILL.md and ./README.md for usage.

import { readFile } from "node:fs/promises";
import process from "node:process";

const HELP = `
Usage:
  node verify-citations.mjs <sources.json>
  node verify-citations.mjs --stdin
  node verify-citations.mjs --help

Input: JSON array of source objects with shape:
  { title: string, url: string, author?: string, year?: string, doi?: string }

Output: JSON report to stdout with a summary and per-source results.

Exit codes:
  0  Script ran cleanly (verification outcomes are in the JSON).
  1  Script failed (bad input, total network failure, etc.).
`;

const UA = "FoodPulse-CitationCheck/1.0 (+mailto:hello@foodpulse.co)";
const URL_TIMEOUT_MS = 10000;
const CROSSREF_TIMEOUT_MS = 10000;
const CROSSREF_DELAY_MS = 250;

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  process.stdout.write(HELP);
  process.exit(args.length === 0 ? 1 : 0);
}

async function readInput() {
  if (args.includes("--stdin")) {
    return await readStdin();
  }
  const path = args.find((a) => !a.startsWith("--"));
  if (!path) {
    throw new Error("No input path provided. Use --stdin or pass a JSON file path.");
  }
  return await readFile(path, "utf8");
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function extractDoi(source) {
  if (source.doi) return normalizeDoi(source.doi);
  if (typeof source.url !== "string") return null;
  // Match a DOI inside a URL like https://doi.org/10.xxxx/yyyy or https://dx.doi.org/10.xxxx/yyyy
  const m = source.url.match(/(?:doi\.org\/|dx\.doi\.org\/|doi:\s*)(10\.\d{4,9}\/[^\s?#]+)/i);
  if (m) return normalizeDoi(m[1]);
  return null;
}

function normalizeDoi(doi) {
  return String(doi)
    .trim()
    .replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "")
    .replace(/^doi:\s*/i, "");
}

function normalizeTitleForCompare(t) {
  return String(t || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{Letter}\p{Number}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleWordOverlap(a, b) {
  const aw = new Set(normalizeTitleForCompare(a).split(" ").filter((w) => w.length > 2));
  const bw = new Set(normalizeTitleForCompare(b).split(" ").filter((w) => w.length > 2));
  if (aw.size === 0 || bw.size === 0) return 0;
  let shared = 0;
  for (const w of aw) if (bw.has(w)) shared++;
  return shared / Math.max(aw.size, bw.size);
}

function lastNameOf(name) {
  if (!name) return "";
  const cleaned = String(name).replace(/et al\.?/i, "").trim();
  const parts = cleaned.split(/[\s,;]+/).filter(Boolean);
  if (parts.length === 0) return "";
  // If comma format ("Hooper, L."), the first part is the last name.
  if (cleaned.includes(",")) return parts[0].toLowerCase();
  // Otherwise last token is typically the surname.
  return parts[parts.length - 1].toLowerCase();
}

async function fetchWithTimeout(url, options, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function checkUrl(url) {
  if (!url || typeof url !== "string") {
    return { status: null, final_url: null, ok: false, error: "missing-url" };
  }
  const headers = {
    "User-Agent": UA,
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
  };
  const attempt = async () => {
    try {
      const res = await fetchWithTimeout(url, { method: "GET", headers, redirect: "follow" }, URL_TIMEOUT_MS);
      return {
        status: res.status,
        final_url: res.url,
        ok: res.status >= 200 && res.status < 400,
      };
    } catch (err) {
      return { status: null, final_url: null, ok: false, error: err.name === "AbortError" ? "timeout" : err.message };
    }
  };
  const first = await attempt();
  if (first.status && first.status >= 500) {
    // retry once on 5xx
    const second = await attempt();
    return { ...second, retried: true };
  }
  return first;
}

async function lookupCrossref(doi) {
  if (!doi) return { found: false, skipped: true };
  const apiUrl = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;
  try {
    const res = await fetchWithTimeout(
      apiUrl,
      { headers: { "User-Agent": UA, Accept: "application/json" } },
      CROSSREF_TIMEOUT_MS,
    );
    if (res.status === 404) return { found: false, status: 404 };
    if (!res.ok) {
      return { found: false, status: res.status, error: `crossref-http-${res.status}` };
    }
    const body = await res.json();
    return { found: true, metadata: body.message };
  } catch (err) {
    return {
      found: false,
      error: err.name === "AbortError" ? "timeout" : err.message,
    };
  }
}

function compareMetadata(input, metadata) {
  const result = { title: "unknown", author: "unknown", year: "unknown" };
  if (!metadata) return result;

  // Title — fuzzy word overlap. CrossRef returns title as array.
  const crossrefTitle = Array.isArray(metadata.title) ? metadata.title[0] : metadata.title;
  if (crossrefTitle) {
    if (!input.title) {
      result.title = "unknown";
    } else {
      const overlap = titleWordOverlap(input.title, crossrefTitle);
      result.title = overlap >= 0.7 ? "ok" : "mismatch";
      result.title_overlap = Number(overlap.toFixed(2));
      result.crossref_title = crossrefTitle;
    }
  }

  // Author — match the input's first listed surname against any CrossRef author surname.
  const crossrefAuthors = Array.isArray(metadata.author) ? metadata.author : [];
  if (input.author && crossrefAuthors.length > 0) {
    const inputLast = lastNameOf(input.author);
    const crossrefLasts = crossrefAuthors
      .map((a) => (a.family || "").toLowerCase())
      .filter(Boolean);
    if (inputLast && crossrefLasts.length > 0) {
      result.author = crossrefLasts.includes(inputLast) ? "ok" : "mismatch";
      result.crossref_first_author = crossrefLasts[0];
    }
  } else if (!input.author) {
    result.author = "unknown";
  }

  // Year — exact match against CrossRef's issued/published-print/published-online.
  const crossrefYear = extractCrossrefYear(metadata);
  if (input.year && crossrefYear) {
    result.year = String(input.year).trim() === String(crossrefYear) ? "ok" : "mismatch";
    result.crossref_year = crossrefYear;
  }

  return result;
}

function extractCrossrefYear(metadata) {
  const candidates = [
    metadata?.issued?.["date-parts"]?.[0]?.[0],
    metadata?.["published-print"]?.["date-parts"]?.[0]?.[0],
    metadata?.["published-online"]?.["date-parts"]?.[0]?.[0],
    metadata?.created?.["date-parts"]?.[0]?.[0],
  ];
  for (const y of candidates) {
    if (typeof y === "number" && y > 1500 && y < 2100) return y;
  }
  return null;
}

function summarizeIssues(urlCheck, crossref, hasDoi) {
  const issues = [];
  if (!urlCheck.ok) {
    if (urlCheck.error === "timeout") issues.push("url-timeout");
    else if (urlCheck.status === 403) issues.push("url-bot-walled");
    else if (urlCheck.status && urlCheck.status >= 400 && urlCheck.status < 500) issues.push("url-dead");
    else if (urlCheck.status && urlCheck.status >= 500) issues.push("url-server-error");
    else issues.push("url-unreachable");
  }
  if (hasDoi) {
    if (!crossref.found && crossref.status === 404) issues.push("doi-not-found");
    else if (!crossref.found && crossref.error) issues.push("crossref-error");
    else if (crossref.match?.title === "mismatch") issues.push("crossref-title-mismatch");
    else if (crossref.match?.author === "mismatch") issues.push("crossref-author-mismatch");
    else if (crossref.match?.year === "mismatch") issues.push("crossref-year-mismatch");
  }
  return issues;
}

// CrossRef metadata is the canonical truth for DOI'd sources. When CrossRef
// verifies cleanly, a publisher URL 403 (bot-walling, common at Elsevier,
// Wiley, BMJ, etc.) is informational, not a publishing blocker.
function classify(issues, crossref) {
  if (issues.length === 0) return "verified";
  const crossrefFullyOk =
    crossref?.found === true &&
    crossref?.match?.title === "ok" &&
    crossref?.match?.author === "ok" &&
    crossref?.match?.year === "ok";
  const onlyAdvisoryIssue =
    issues.length === 1 && issues[0] === "url-bot-walled";
  if (crossrefFullyOk && onlyAdvisoryIssue) return "verified";
  return "flagged";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function verifyOne(source, i) {
  const doi = extractDoi(source);
  const urlCheck = await checkUrl(source.url);
  let crossref = { found: false, skipped: true };
  if (doi) {
    await sleep(CROSSREF_DELAY_MS);
    const lookup = await lookupCrossref(doi);
    if (lookup.found) {
      const match = compareMetadata(source, lookup.metadata);
      crossref = {
        found: true,
        doi,
        match,
        // Trim heavy metadata; keep what's useful for the agent.
        metadata: lookup.metadata
          ? {
              title: Array.isArray(lookup.metadata.title) ? lookup.metadata.title[0] : lookup.metadata.title,
              container: Array.isArray(lookup.metadata["container-title"])
                ? lookup.metadata["container-title"][0]
                : lookup.metadata["container-title"],
              authors: (lookup.metadata.author || []).slice(0, 6).map((a) => ({
                family: a.family || null,
                given: a.given || null,
              })),
              issued_year: extractCrossrefYear(lookup.metadata),
              type: lookup.metadata.type,
              publisher: lookup.metadata.publisher,
            }
          : null,
      };
    } else {
      crossref = { found: false, doi, status: lookup.status, error: lookup.error };
    }
  }
  const issues = summarizeIssues(urlCheck, crossref, !!doi);
  return {
    index: i,
    input: source,
    url_check: urlCheck,
    crossref,
    issues,
    status: classify(issues, crossref),
  };
}

async function main() {
  let raw;
  try {
    raw = await readInput();
  } catch (err) {
    process.stderr.write(`Failed to read input: ${err.message}\n`);
    process.exit(1);
  }
  let sources;
  try {
    sources = JSON.parse(raw);
  } catch (err) {
    process.stderr.write(`Input is not valid JSON: ${err.message}\n`);
    process.exit(1);
  }
  if (!Array.isArray(sources)) {
    process.stderr.write("Input must be a JSON array of source objects.\n");
    process.exit(1);
  }

  const results = [];
  for (let i = 0; i < sources.length; i++) {
    results.push(await verifyOne(sources[i], i));
  }

  const summary = {
    total: results.length,
    verified: results.filter((r) => r.status === "verified").length,
    flagged: results.filter((r) => r.status === "flagged").length,
    errors: 0,
  };

  process.stdout.write(JSON.stringify({ summary, results }, null, 2) + "\n");
  process.exit(0);
}

main().catch((err) => {
  process.stderr.write(`Unhandled error: ${err.stack || err.message}\n`);
  process.exit(1);
});
