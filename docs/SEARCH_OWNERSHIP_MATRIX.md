# Franchise.sg — Search Architecture & Ownership Matrix

**Status:** 🟢 UPDATED WITH OCTOBER 2026 FULL-MONTH TELEMETRY (`2026-10-01` to `2026-10-31`) & 03 NOV REMEDIATIONS  
**Baseline Dataset:** GSC Full-Month October 2026 (`franchise.sg-Performance-on-Search-2026-11-03/`) compared against 28-Day Baseline v1 (`2026-08-23` to `2026-09-19`)  
**Methodological Standard:** Zero Claimed Precision. Aggregated 1D `Queries.csv` and `Pages.csv` data establish search demand and overall property performance, but do not prove exact query $\rightarrow$ landing page pairings. All page mappings below represent candidate/inferred targets to be validated with genuine Query × Page exports.

---

## 🚦 Strategic Governance Status Ledger

| Area | Status | Governance Protocol |
| :--- | :---: | :--- |
| **GSC Baseline Ledger** | 🟢 **Locked (v1 & v2)** | Grounded in immutable CSV exports ([docs/GSC_BASELINE_DASHBOARD.md](file:///Users/fredericktan/Documents/franchise_sg/docs/GSC_BASELINE_DASHBOARD.md)), now including Full-Month October 2026 (`169` clicks, `4,808` impressions, `3.51%` CTR, `8.52` weighted avg pos). |
| **October Trajectory & Progression** | 🟢 **Locked** | Demonstrates +31.0% MoM click growth (129 $\rightarrow$ 169) and +109 bps CTR expansion (2.42% $\rightarrow$ 3.51%), with H2 October accelerating to 5.94 clicks/day (+20.5% over H1). |
| **SSR Internal Crawl Equity Bridge** | 🟢 **Deployed (`a2d7811`)** | Fixed `FranchiseGridEngine` initial SSR state so all 159 `<a href="/franchise/[slug]">` links render in initial static HTML, and surfaced all 12 `/insights/[slug]` reports on `/`. |
| **Low-Cost Top-5 CTR Optimization** | 🟢 **Deployed (`48744d5`)** | Updated homepage `<title>`, meta description, and `#low-cost-franchises-singapore` rich comparison table (S$8K–S$100K) to convert Top-4 rankings on `low cost franchise singapore` (#2.56) and `cheap franchise singapore` (#3.62). |
| **Search Ownership** | 🟡 **Awaiting Evidence** | Page associations remain candidate/inferred hypotheses awaiting Query × Page GSC export. |
| **Host / Canonical** | 🟢 **Consolidating** | Non-`www` `/franchise/primadeli` impressions declined to 7 (Pos 15.57) while `www` grew +52.6% to 119 impressions (5 clicks, Pos 6.45). |
| **New Pages** | 🟢 **Selective / Calendar-Gated** | Deployed 27 Oct F&B Capital Audit (`singapore-fb-franchise-capital-payback-audit-2026`) and 03 Nov Reinstatement Audit (`reinstatement-breakdown-mall-tenancy-audit-singapore`) in commit `38a1ac6`. |
| **Mass AI Content** | 🔴 **Strictly Prohibited** | Not warranted by evidence; brand reputation and indexing integrity depend on forensic, human-verified data. |

---

## 🏛️ Authoritative Evidence & Decision Hierarchy

To prevent speculative page creation, all SEO engineering decisions must strictly traverse this six-tier evidence hierarchy:

```
Raw GSC Telemetry
       ↓
Query × Page Evidence (Authoritative Layer)
       ↓
Search Ownership Matrix
       ↓
Page / IA Decisions (Gated by Decision Logic)
       ↓
Content / Technical Implementation
       ↓
Post-Change Measurement
```

### 🌲 Page / IA Decision Tree Logic
Before any page is modified or created, the system must answer:
> **"Which existing URL, if any, is already receiving impressions for this query?"**

* 🟢 **If the correct page already ranks:** $\rightarrow$ **Strengthen it** (metadata, internal links, content depth, snippet optimization).
* 🔄 **If the wrong page ranks:** $\rightarrow$ **Reposition** (adjust internal anchor texts, contextual links, and canonical tags to transfer search intent cleanly).
* ⚔️ **If multiple pages rank:** $\rightarrow$ **Investigate cannibalization** (unify internal linking and differentiate topical scope).
* ➕ **If no suitable page ranks:** $\rightarrow$ **Consider a new page** (only if backed by verified demand, clear investor utility, and editorial standards).
* 🚫 **If the query has negligible demand:** $\rightarrow$ **Do NOT create a page solely for SEO**.

---

## 🗺️ Search Ownership Matrix (Candidate & Inferred Ledger — Updated with Oct 2026 Full-Month Telemetry)

| Query Cluster | Actual GSC Query | v1 28d Imp | v1 28dPos | **Oct Imp** | **Oct Clk** | **Oct Pos** | Trajectory | Candidate / Inferred Page | Intended Page | Strategic Action & Status |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :--- | :--- | :--- |
| **Marketplace Discovery** | `franchise singapore` | 156 | 6.8 | **249** | **19** | **4.22** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Protected (`48744d5`):** Prefix preserved; clicks grew 5 $\rightarrow$ 19 (7.63% CTR). |
| **Marketplace Discovery** | `franchise business in singapore` | 139 | 11.8 | **146** | **7** | **5.96** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Strengthened:** Advanced +5.84 pos into Page 1 Mid; clicks rose 4 $\rightarrow$ 7. |
| **Marketplace Discovery** | `singapore franchise` | 61 | 13.0 | **76** | **5** | **3.92** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Protected:** Locked in Top 4 (6.58% CTR). |
| **Marketplace Discovery** | `franchise in singapore` | 65 | 9.7 | **66** | **3** | **4.05** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Strengthened:** Advanced +5.65 pos into Top 4. |
| **Marketplace Discovery** | `franchise sg` | 20 | 4.8 | **13** | **3** | **1.62** | 🟢 Locked #1–2 | Homepage (`/`) | Master Directory (`/`) | **Protected:** Brand ownership locked (23.08% CTR). |
| **Marketplace Discovery** | `franchise business singapore` | — | — | **22** | **2** | **3.09** | 🟢 Breakout Top 3 | Homepage (`/`) | Master Directory (`/`) | **Protected:** High-converting commercial variant (9.09% CTR). |
| **Marketplace Discovery** | `franchise singapore 2026` | — | — | **20** | **1** | **2.90** | 🟢 Locked Top 3 | Homepage (`/`) | Master Directory (`/`) | **Protected:** Year-qualified head query in Top 3. |
| **Marketplace Discovery** | `franchises in singapore` | 20 | 6.3 | **17** | **1** | **4.18** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Protected:** First click recorded in Oct at Pos 4.18. |
| **Marketplace Discovery** | `franchising in singapore` | 18 | 12.9 | **16** | **1** | **4.50** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Strengthened:** Jumped +8.4 pos into Top 5. |
| **Marketplace Discovery** | `franchise` | 198 | 11.3 | **472** | **2** | **7.67** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Monitor:** Highest-impression query on property; firmly on Page 1. |
| **Commercial Opportunities** | `franchise opportunities singapore` | 39 | 8.9 | **64** | **4** | **6.12** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Strengthened:** Up +2.78 pos, doubled clicks (2 $\rightarrow$ 4). |
| **Commercial Opportunities** | `franchise opportunities in singapore` | 62 | 14.0 | **54** | **4** | **7.09** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Strengthened:** Up +6.91 pos vs v1 baseline (7.41% CTR). |
| **Commercial Opportunities** | `singapore franchise opportunities` | 21 | 8.3 | **35** | **3** | **3.57** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Protected:** Surged into Top 4 (8.57% CTR). |
| **Commercial Opportunities** | `best franchise in singapore` | 23 | 11.2 | **27** | **1** | **6.11** | 🟢 Advancing | Food Guide / `/` | Food Guide (`/insights/how-to-determine-...`) | **Strengthened:** Entered Page 1 (#6.11) and converted first click. |
| **Low-Capital Tier** | `cheap franchise singapore` | 35 | 14.6 | **42** | **0** | **3.62** | 🟢 Top 4 Surge | Homepage (`/`) | Low-Cost Matrix (`/#low-cost-franchises-singapore`) | **Remediated (`48744d5`):** Added `<S$50K` to `<title>`, `S$8K–S$50K` to meta description & 12-brand table. |
| **Low-Capital Tier** | `low cost franchise singapore` | 27 | 9.8 | **32** | **1** | **2.56** | 🟢 Top 3 Surge | Homepage (`/`) | Low-Cost Matrix (`/#low-cost-franchises-singapore`) | **Remediated (`48744d5`):** Surged +7.24 pos to #2.56; snippet & table now explicitly match query. |
| **Low-Capital Tier** | `cheapest franchise in singapore` | — | — | **20** | **1** | **5.75** | 🟢 Page 1 Mid | Homepage (`/`) | Low-Cost Matrix (`/#low-cost-franchises-singapore`) | **Remediated (`48744d5`):** Supported by S$8K–S$50K comparison table & FAQ schema. |
| **Low-Capital Tier** | `cheapest franchise in singapore under 10k` | — | — | **7** | **0** | **9.29** | 🟢 Page 1 Entry | Homepage (`/`) | Beyond Borders CRM (`/franchise/beyond-borders-crm`) | **Remediated (`48744d5`):** Highlighted S$8,000 entry point in low-cost table & FAQ schema. |
| **Financial & Diligence** | `how to start a franchise in singapore` | 29 | 13.8 | **48** | **0** | **10.00** | 🟢 Page 1 Border | Homepage / Guide | 27 Oct F&B Capital Audit / Setup Guide | **Strengthened (`38a1ac6`):** Reached #10.0; supported by new 27 Oct Capital & Payback Audit. |
| **Financial & Diligence** | `franchise fee singapore` | 34 | 14.8 | **32** | **0** | **8.31** | 🟢 Advancing | Homepage (`/`) | 27 Oct F&B Capital Audit (`/insights/singapore-fb-...`) | **Deployed (`38a1ac6` & `a2d7811`):** Dedicated "Fee Illusion vs Capex" audit now live & linked on `/`. |
| **Financial & Diligence** | `business franchise in singapore` | 38 | 19.1 | **36** | **0** | **6.36** | 🟢 Advancing | Homepage (`/`) | Master Directory (`/`) | **Strengthened:** Advanced +12.74 pos into Page 1 Mid (#6.36). |
| **Financial & Diligence** | `franchise lease negotiation singapore` | — | — | **8** | **0** | **12.50** | 🟢 Page 2 Top | Lease Articles | Commercial Lease Guides (`/insights/hidden-costs-...`) | **Deployed (`38a1ac6`):** Supported by 20 Oct Hidden Lease Costs & 03 Nov Reinstatement Audit; 17 Nov Fit-Out Guide queued. |
| **Due Diligence & Risk** | `vending machine scam singapore` | — | — | **28** | **2** | **7.46** | 🟢 Page 1 | Vending Analysis | Vending Analysis (`/insights/vending-machine-...`) | **Protected:** High-intent scam due diligence driver (7.14% CTR). |
| **Due Diligence & Risk** | `vending machine scam` | 58 | 6.8 | **23** | **2** | **7.04** | 🟡 Persistent | Vending Analysis | Vending Analysis (`/insights/vending-machine-...`) | **Protected:** 8.70% CTR on Page 1. |
| **Due Diligence & Risk** | `vending machine franchise singapore` | 51 | 18.6 | **39** | **0** | **14.38** | 🟢 Advancing | Vending Analysis | Vending Analysis (`/insights/vending-machine-...`) | **Strengthened (`a2d7811`):** Direct homepage link added; iJooz S$25K listed in low-cost table. |
| **Brand Research** | `mr coconut franchise cost singapore` | 6 | 3.5 | **13** | **1** | **6.15** | 🟢 Converting | Homepage / Audit | Mr Coconut Profile & Sep 1 / Oct 27 F&B Audits | **Strengthened (`a2d7811`):** Both F&B audits and SSR brand links now surfaced directly on `/`. |
| **Brand Research** | `old chang kee franchise cost` | 3 | 9.3 | **13** | **0** | **10.62** | 🟡 Page 1/2 Border | Homepage / Audit | Old Chang Kee Profile & F&B Audits | **Strengthened (`a2d7811`):** Surfaced SSR brand link & F&B audits on `/` to restore Page 1 position. |
| **Brand Research** | `primadéli singapore` / `primadeli` | — | — | **119*** | **5*** | **6.45*** | 🟢 #1 Brand Page | `/franchise/primadeli` | PrimaDeli Profile (`/franchise/primadeli`) | **Protected:** Page-level impressions up +52.6% (78 $\rightarrow$ 119), clicks up 3 $\rightarrow$ 5. |
| **Brand Research** | `kiso franchise` | — | — | **21** | **0** | **8.10** | 🟢 Breakout | Directory | Brand Profile | **Monitor:** 21 impressions at Pos 8.10 in Oct. |

---

## 🔍 Strategic Architectural Findings

1. **Marketplace Discovery & Homepage Candidate Role:**
   * The current aggregate GSC exports suggest that the homepage is the principal candidate page for Head Discovery queries; query-page-level GSC data should be used to verify ownership and assess cannibalisation.
2. **Brand / Entity Research Opportunity:**
   * Google is surfacing Franchise.sg in Top 1–3 positions for high-intent brand cost queries (`stuff'd franchise fee` at 2.7, `mr coconut franchise cost` at 1.0, `chatramue franchise cost` at 1.0, `family mart franchise singapore` at 3.0).
   * Developing comprehensive, verified brand profiles creates an opportunity to capture this high-intent search demand without competing against head directory pages.
3. **Editorial Roadmap Integration ([docs/EDITORIAL_CALENDAR.md](file:///Users/fredericktan/Documents/franchise_sg/docs/EDITORIAL_CALENDAR.md)):**
   * The scheduled 06 Oct 2026 release (*Singapore F&B Franchise Capital & Payback Audit 2026*) is intended to provide a dedicated destination for franchise fee, capital and payback-related queries currently surfacing against the homepage. Post-publication GSC telemetry will measure whether Google transfers those queries to the new guide.

---

## 📋 Data-Rich Brand Profile Standard (`/franchise/[slug]`)

To maintain our institutional intelligence positioning, brand profiles must not be thin SEO templates. Every profile must be constructed as a verified intelligence disclosure incorporating:

1. **Brand Overview & Entity Identity:** Corporate origin, parent entity, Singapore operating history.
2. **Singapore Availability & Market Status:** Active franchising status in Singapore.
3. **Franchise Operating Model:** Turnkey, semi-absentee, owner-operator, or master franchise format.
4. **Initial Capital Investment:** Total estimated upfront outlay range.
5. **Franchise Fee Breakdown:** Initial licensing/franchise entry fee.
6. **Estimated Setup & Fit-Out Cost:** Renovation, equipment, and opening inventory.
7. **Ongoing Royalty & Marketing Fees:** Monthly percentage or fixed royalty and marketing contributions.
8. **Contract Term & Renewal Terms:** Initial tenure duration and renewal clauses.
9. **Existing Singapore Outlet Footprint:** Verified operating locations count.
10. **Target Market & Demographic:** Primary customer segment and mall/suburban zoning suitability.
11. **Financial Figure Sources:** Strict citation of disclosure documents, ACRA filings, or official brand statements.
12. **Verification Status:** Explicit verification badge (e.g. *Verified Official*, *Public Disclosure Audit*).
13. **Date Verified:** Timestamp of primary data verification.
14. **Last Updated:** Content freshness timestamp.
15. **Investor Diligence Questions:** Critical questions a prospective franchisee should evaluate before signing.
16. **Application Route & Related Opportunities:** Official enquiry route and comparable franchise sector options.

---

## 🛠️ Immediate Next Technical Tasks

### 1. Obtain Genuine Query × Page GSC Data (Milestone Focus: Measurement)
* **Objective:** Ingest the multidimensional dataset (`Query` + `Landing Page` + `Impressions` + `Clicks` + `Position`) for the 28-day baseline period.
* **Analysis to Execute Upon Ingestion:**
  1. Identify true page ownership per commercial query.
  2. Pinpoint cannibalisation (where multiple URLs split impressions/clicks for identical intent).
  3. Flag misaligned ranking URLs (where unintended pages capture commercial queries).
  4. Isolate genuine content whitespace where no suitable page ranks.
* **Extraction Methods:**
  - Per-page filtered GSC exports from Search Console UI.
  - GSC Search Analytics API batch extraction for `dimensions: ['query', 'page']`.
  - BigQuery Bulk Data Export tables.

### 2. Host & Canonical Consistency Inspection
* Verify HTTP/HTTPS 301 redirect chains across non-www and www variants.
* Verify `<link rel="canonical">` across all active routes.
* Inspect Google's declared and selected canonical via GSC URL Inspection before considering any robots.txt adjustments.
