# Canada context

The Canada-first frame. Every FoodPulse article assumes a Canadian reader unless the topic is explicitly global. This file captures the load-bearing Canadian references that should appear in articles where they apply.

The compass strategy brief calls out three specifics — Canada's Food Guide, the 2026 front-of-package rules (with the 15% Daily Value trigger), and bilingual considerations. All three are expanded below, plus the broader Canadian institutional landscape.

---

## Canada's Food Guide

### What it is

Canada's Food Guide (food-guide.canada.ca) is the federal dietary guidance document, last fully revised in 2019. The 2019 revision was a structural change from the prior "four food groups" frame to a **plate-and-proportion** frame.

### Key features of the 2019 guide

- **Half the plate** vegetables and fruit.
- **Quarter of the plate** whole grain foods.
- **Quarter of the plate** protein foods, with explicit emphasis on plant-based protein (legumes, nuts, seeds, tofu, fortified soy products) alongside lean animal proteins.
- **Water as the drink of choice.**
- **Limits on highly processed foods.** Without naming NOVA, the guidance is NOVA-adjacent — it cautions against ultra-processed products high in sodium, sugar, or saturated fat.
- **Eating practices.** The guide also covers *how* to eat: cook more often, eat meals with others, be aware of food marketing, enjoy food. This is unusual for a national dietary guidance document and a brand-aligned feature for FoodPulse.

### When to cite

- Any dietary-pattern article.
- Any food-environment piece.
- Any article touching grocery shopping, meal planning, or cooking habits in a Canadian context.
- Any article about how dietary guidance has evolved (compare 2019 to 2007 four-food-groups version).

### Source object for the sources array

```yaml
- title: "Canada's Food Guide"
  url: "https://food-guide.canada.ca/en/"
  author: "Government of Canada / Health Canada"
  year: "2019"
```

When citing the underlying evidence review:

```yaml
- title: "Canada's Dietary Guidelines — for health professionals and policy makers"
  url: "https://food-guide.canada.ca/en/guidelines/"
  author: "Government of Canada / Health Canada"
  year: "2019"
```

---

## The 2026 front-of-package nutrition symbol

### What changed

Health Canada finalized the front-of-package (FOP) nutrition labelling regulations on **July 20, 2022**, with a transition period that ended **December 31, 2025**. The rules became **mandatory January 1, 2026**. The Canadian Food Inspection Agency (CFIA) enforces; there is no enforcement discretion beyond the mandatory date.

### The symbol

A **black-and-white magnifying-glass "high in" symbol** appears on the front of pre-packaged foods when a serving exceeds the threshold for one or more of:

- **Saturated fat**
- **Sugars**
- **Sodium**

### The 15% Daily Value trigger

The symbol generally appears when a serving contains **≥15% of the Daily Value** for the nutrient. The exact thresholds vary by package size, food category, and serving size — small packages (≤30g or ≤30mL) and meals (≥170g) use different rules. The 15% threshold is the most common case and the easiest reader heuristic.

Some categories are exempt or use different rules (e.g. vegetable oils, butter, plain milk, certain whole foods). The Canada Gazette final regulations document is the authoritative source for the full ruleset.

### When to cite

- Any label-literacy article.
- Any article about reading or interpreting nutrition information.
- Any article touching grocery shopping in 2026+.
- Any article comparing Canadian to other countries' labelling regimes.
- Anything about saturated fat, sugars, or sodium as a food-decision lever.

### Source objects

```yaml
- title: "Front-of-Package Nutrition Labelling — Final Regulations"
  url: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating/nutrition-labelling/front-package.html"
  author: "Health Canada"
  year: "2022"
- title: "Canada Gazette, Part II, Volume 156, Number 15 — Regulations Amending the Food and Drug Regulations (Nutrition Symbols, Other Labelling Provisions, Vitamin D and Hydrogenated Fats or Oils)"
  url: "https://canadagazette.gc.ca/rp-pr/p2/2022/2022-07-20/html/sor-dors168-eng.html"
  author: "Government of Canada"
  year: "2022"
```

### Editorial cautions

- The rule is **brand new**. Behavior-change data won't be reliably available until 2027+. Articles in 2026 should describe the rule's design, not project its effect on consumer choice (label `preliminary` if making any effect claim).
- Articles should not present the 15% threshold as universal — note the package-size and serving-size exceptions.
- Articles should clarify that the "high in" symbol is informational, not a "don't eat this" symbol. Per the brand's non-negotiable #1, we don't tell readers what to eat.

---

## Bilingual considerations

### Quebec's French-language requirements

Quebec's Loi 96 (2022) tightened French-language requirements for commercial communication and labelling in Quebec. Federal food labelling regulations require bilingual labels nationwide (English + French); Quebec's provincial rules add more requirements for marketing material visible in Quebec.

### Translation defaults

- FoodPulse articles ship **English-first** by default.
- Articles with strong Quebec/French-Canadian-specific content (Quebec Food Guide adaptations, Quebec agricultural policy, etc.) are candidates for French translation.
- When a topic is Quebec-specific or French-Canadian-specific, **search French-language sources** at canada.ca/fr, statcan.gc.ca/fr, and Quebec institutional sites (mapaq.gouv.qc.ca, msss.gouv.qc.ca).
- Don't auto-translate without review — a future `[[foodpulse-translate-fr]]` skill will handle this with appropriate care.

### When to flag a French-translation candidate

Note in the topic brief if any of:
- Topic substantially affects Quebec audiences.
- Topic references a Quebec-specific institution, regulation, or program.
- The article cites French-language primary sources alongside English.

---

## Other Canadian institutions worth keeping front-of-mind

### Canadian Food Inspection Agency (CFIA)

- Federal enforcement arm for food labelling and food safety regulations.
- Enforces the 2026 FOP rules.
- inspection.canada.ca / inspection.gc.ca.
- Cite when the topic touches enforcement, recalls, or labelling compliance.

### Statistics Canada Health Reports

- The canonical source for Canadian dietary intake statistics.
- statcan.gc.ca/en/about/relevant/health.
- Health Reports articles are peer-reviewed and Tier B.
- Cite for any population-level dietary claim about Canadians.
- The Canadian Community Health Survey (CCHS) Nutrition cycles (2004, 2015 most recent as of writing) underlie most published statistics. Cite the cycle.

### Public Health Agency of Canada (PHAC)

- canada.ca/en/public-health.
- Cite for chronic disease prevalence, public health context, food safety incident reporting.

### Dietitians of Canada

- Professional body for Canadian dietitians.
- dietitians.ca.
- Cite for professional-practice context. Note that FoodPulse content explicitly distinguishes itself from clinical dietetics — DofC is a useful reference for how clinical practice frames a topic, not a directive for what to recommend.

### Indigenous food sovereignty programs

- Indigenous Services Canada food security programs.
- First Nations Health Authority (FNHA) for BC.
- Nutrition North Canada for northern food access.
- **Cite respectfully; never speak for communities.** When food-systems articles touch Indigenous foodways, cite Indigenous-authored sources where possible.

### Agriculture and Agri-Food Canada (AAFC)

- agriculture.canada.ca.
- Cite for agricultural policy, food production statistics, supply chain context.

---

## Canadian context per pillar

How often each Canadian reference shows up by pillar:

| Pillar | Almost always cite | Sometimes cite | Rarely cite |
|---|---|---|---|
| Food and Wellbeing | Canada's Food Guide, Statistics Canada Health Reports | DRIs, PHAC, Dietitians of Canada | Indigenous food sovereignty |
| Kitchen and Cooking | Canada's Food Guide (plate proportions) | CFIA (food safety), AAFC (seasonal produce) | Statistics Canada |
| Food Literacy | 2026 FOP rules, CFIA, Health Canada label rules | Canada's Food Guide, Statistics Canada Health Reports | Indigenous |
| Food Systems | AAFC, Statistics Canada, Indigenous programs | Canada's Food Guide, PHAC | Dietitians of Canada |

---

## Distinct-from-US gotchas

FoodPulse articles are written for a Canadian reader. Avoid US-default framing:

- **"FDA" is US.** Canada is **Health Canada** + **CFIA**.
- **"USDA Food Pyramid / MyPlate" is US.** Canada uses **Canada's Food Guide** (plate-and-proportion, not pyramid).
- **"Daily Value" exists in both countries** but Canadian Nutrition Facts table DVs are set by Health Canada and can differ from US DVs.
- **"Nutrition Facts Label"** is the US name. Canadian is **Nutrition Facts table**.
- **"%DV" calculations** can match across the border for many nutrients but check before equating.
- **"Imperial vs metric"** — Canadian packages are metric (grams, mL); imperial is rare. US default is imperial.
- **"Front-of-package symbols"** are NEW in Canada (2026). The US has voluntary FOP schemes (e.g. Facts Up Front) but no mandatory black-and-white "high in" symbol equivalent yet.

When an article uses US-sourced research, this is fine — but the framing and recommendations should land back in Canadian context.

---

## When to use this file in the pipeline

- **Phase 1 (Clarify).** When the topic suggests regulatory or population-level Canadian framing, set brand mode Scientific and flag relevant Canada-context elements in the brief.
- **Phase 3 (Gather sources).** Prioritize the trusted Canadian institutional URLs above when the topic warrants.
- **Phase 4 (Synthesize).** Apply Canada-specific framing — name CFIA where US articles say FDA, name Canada's Food Guide where US articles say MyPlate, cite Statistics Canada Health Reports where US articles cite NHANES.
- **Phase 5 (Draft).** Use the Canadian terms throughout the body.
- **Phase 7 (Citation-check).** Skill 2's [source-hierarchy.md](../../foodpulse-citation-check/references/source-hierarchy.md) trusted-domain allowlist already includes the Canadian Tier B domains; this file's references should resolve cleanly through that check.
