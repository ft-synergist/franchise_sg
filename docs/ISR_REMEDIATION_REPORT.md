# Franchise.sg — Forensic ISR Remediation & Cache Architecture Report

**Execution Date:** 25 September 2026  
**Commit SHA:** `975f9cc` (`fix(cache): eliminate 60s ISR write amplification by shifting directory routes to pure SSG and sitemap to 24h`)  
**Status:** IMPLEMENTED & DEPLOYED TO `origin/main`

---

## 1. Problem Summary & Root Cause
- **Observed Metric:** 153,894 Vercel ISR Write Units (99.9% of team quota) with periodic ~150-write spikes on `/franchise/[slug]`.
- **Root Cause:** A 60-second cache lifetime (`export const revalidate = 60;`) across 159 pre-rendered franchise slugs, 8 category hubs, the homepage, and the `/for-sale` route. Repeated crawler traffic from search engines and AI bots (Googlebot, Bingbot, GPTBot, PerplexityBot) requesting the sitemap URLs after 60s cache expiry triggered continuous background regenerations (1 ISR write unit per page).

---

## 2. Actions Completed (Phase 1 – Phase 5)
1. **Franchise Detail Pages ([`app/franchise/[slug]/page.tsx`](file:///Users/fredericktan/Documents/franchise_sg/app/franchise/%5Bslug%5D/page.tsx)):**
   - Removed `export const revalidate = 60;`.
   - All 159 verified franchise slugs are generated as pure build-time static HTML (`● (SSG)`).
   - Dynamic parameter resolution preserved (`dynamicParams = true` fallback to Supabase query or 404).
2. **Category Pages ([`app/categories/[slug]/page.tsx`](file:///Users/fredericktan/Documents/franchise_sg/app/categories/%5Bslug%5D/page.tsx)):**
   - Removed `export const revalidate = 60;`.
   - All 8 category hubs are generated as pure build-time static HTML (`● (SSG)`).
3. **Directory Home & Resale Marketplace ([`app/page.tsx`](file:///Users/fredericktan/Documents/franchise_sg/app/page.tsx), [`app/for-sale/page.tsx`](file:///Users/fredericktan/Documents/franchise_sg/app/for-sale/page.tsx)):**
   - Removed `export const revalidate = 60;`.
   - Both pages pre-rendered as pure build-time static content (`○ (Static)`).
4. **Sitemap ([`app/sitemap.ts`](file:///Users/fredericktan/Documents/franchise_sg/app/sitemap.ts)):**
   - Increased revalidation interval from `3600` (1h) to `86400` (24h).
5. **Insights Articles ([`app/insights/page.tsx`](file:///Users/fredericktan/Documents/franchise_sg/app/insights/page.tsx), [`app/insights/[slug]/page.tsx`](file:///Users/fredericktan/Documents/franchise_sg/app/insights/%5Bslug%5D/page.tsx)):**
   - Maintained `export const revalidate = 0;` (pure SSR) for live time-gated scheduled releases without triggering ISR writes.

---

## 3. SEO / GEO & Schema Parity Verification
- **100% Structural Parity:** All 159 franchise slugs, 8 category hubs, and 182 sitemap URLs verified present in production build.
- **Zero Content / Markup Alteration:** Canonical tags, metadata, OpenGraph cards, robots directives, and JSON-LD schema graphs (`BusinessWithPhysicalSystem`, `FAQPage`, `CollectionPage`, `Article`, `WebSite`) are 100% identical byte-for-byte.

---

## 4. Post-Deployment Monitoring Action Item (Phase 6)
- **Check Vercel Observability:** Monitor ISR write metrics in Vercel to confirm writes have dropped from the ~153,894 baseline to **~0 writes**.
- **No Manual Bot Crawling:** Allow search engines and crawlers to access the edge-cached pages naturally.
