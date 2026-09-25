<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Editorial Calendar & Insights Schedule Rules
- **Source of Truth:** Always reference [docs/EDITORIAL_CALENDAR.md](file:///Users/fredericktan/Documents/franchise_sg/docs/EDITORIAL_CALENDAR.md) for the active publishing schedule, planned queue, and article status.
- **Mandatory Schedule:**
  - **22 Sep 8am SGT:** The Collapse of True Fitness Singapore: Forensic Financial Audit & The Structural Failure of the Prepaid Gym Model
  - **29 Sep 8am SGT:** The Hidden Costs in a Commercial Lease That Sink Franchise Unit Economics
  - **6 Oct 8am SGT:** Singapore F&B Franchise Capital & Payback Audit 2026
  - **13 Oct 8am SGT:** Reinstatement Breakdown & Mall Tenancy Audit
  - **From 20 Oct:** Alert and queue next pipeline releases.
- **Strict Distinction:** Never report an article as "LIVE" unless it is committed to `origin/main` and its `publishAt` is strictly in the past. If it is scheduled with a future `publishAt` or in local draft, classify it under "Upcoming / Scheduled" or "In Review".

# Vercel ISR Remediation & Caching Status
- **Source of Truth:** Reference [docs/ISR_REMEDIATION_REPORT.md](file:///Users/fredericktan/Documents/franchise_sg/docs/ISR_REMEDIATION_REPORT.md).
- **Standing Reminder:** The 60-second ISR write amplification issue was resolved on 25 Sep 2026 (commit `975f9cc`). All directory routes (`/franchise/[slug]`, `/categories/[slug]`, `/`, `/for-sale`) are pure SSG/Static, and `/sitemap.xml` is 24h. Remind user to check Vercel Observability to verify ISR write units stay near ~0.

