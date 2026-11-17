import fs from 'node:fs';
import path from 'node:path';

const APP_DIR = path.resolve(process.cwd(), 'app');

// Strict Schema.org types permitted in Franchise.sg JSON-LD blocks
const ALLOWED_SCHEMA_TYPES = new Set([
  'WebSite',
  'WebPage',
  'CollectionPage',
  'ProfilePage',
  'Organization',
  'ConsultingBusiness',
  'LocalBusiness',
  'Person',
  'Brand',
  'Product',
  'Service',
  'FinancialProduct',
  'Offer',
  'BreadcrumbList',
  'ItemList',
  'ListItem',
  'FAQPage',
  'Question',
  'Answer',
  'Article',
  'PostalAddress',
  'SearchAction',
  'EntryPoint',
]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) files.push(full);
  }
  return files;
}

const errors = [];
const files = walk(APP_DIR);

for (const file of files) {
  const rel = path.relative(process.cwd(), file);
  const content = fs.readFileSync(file, 'utf8');

  // 1. Validate every "@type" in JSON-LD blocks
  const typeRegex = /["']@type["']\s*:\s*["']([^"']+)["']/g;
  let m;
  while ((m = typeRegex.exec(content)) !== null) {
    const schemaType = m[1];
    if (!ALLOWED_SCHEMA_TYPES.has(schemaType)) {
      const line = content.slice(0, m.index).split('\n').length;
      errors.push(`[Schema Whitelist] Invalid or non-standard "@type": "${schemaType}" in ${rel}:${line}`);
    }
  }

  // 2. Ban unverified AggregateRating blocks (source of GSC Review Snippet failures)
  if (/["']aggregateRating["']\s*:|["']@type["']\s*:\s*["']AggregateRating["']/.test(content)) {
    errors.push(`[Review Snippet Guard] Forbidden "AggregateRating" found in ${rel}. Remove hardcoded/unverified ratings.`);
  }

  // 3. Enforce canonical https://www.franchise.sg host (no bare https://franchise.sg)
  const bareHostRegex = /https?:\/\/franchise\.sg\b/g;
  while ((m = bareHostRegex.exec(content)) !== null) {
    const line = content.slice(0, m.index).split('\n').length;
    errors.push(`[Canonical Host] Bare non-www URL "${m[0]}" found in ${rel}:${line}. Use https://www.franchise.sg.`);
  }
}

// 4. Verify Insights index & slug map synchronization
const slugFile = path.join(APP_DIR, 'insights/[slug]/page.tsx');
const indexFile = path.join(APP_DIR, 'insights/page.tsx');
if (fs.existsSync(slugFile) && fs.existsSync(indexFile)) {
  const slugSrc = fs.readFileSync(slugFile, 'utf8');
  const indexSrc = fs.readFileSync(indexFile, 'utf8');
  const mapStart = slugSrc.indexOf('const insightsMap');
  const mapEnd = slugSrc.indexOf('export default async function', mapStart);
  const mapBlock = slugSrc.slice(mapStart, mapEnd);
  const slugMatches = [...mapBlock.matchAll(/^\s{4}'([a-z0-9-]+)':\s*\{/gm)].map((x) => x[1]);
  for (const slug of slugMatches) {
    if (!indexSrc.includes(`'${slug}'`)) {
      errors.push(`[Insights Sync] Article slug "${slug}" exists in app/insights/[slug]/page.tsx but is missing from app/insights/page.tsx.`);
    }
  }
}

if (errors.length > 0) {
  console.error('❌ SEO & Schema Validation FAILED:\n');
  for (const err of errors) console.error(`  • ${err}`);
  process.exit(1);
}

console.log(`✅ SEO & Schema Validation PASSED (${files.length} files scanned, 0 schema/canonical/sync errors).`);
