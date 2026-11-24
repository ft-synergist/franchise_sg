import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'data', 'gsc');
const MASTER_CSV = path.join(OUT_DIR, 'master_daily_scores.csv');
const ARCHIVE_DIR = path.join(ROOT, '_archive', 'gsc_raw');
const INBOX_DIR = path.join(OUT_DIR, 'inbox');

const shouldArchive = process.argv.includes('--archive');

function parseCsv(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const vals = line.split(',').map((v) => v.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = vals[i] ?? '';
    });
    return obj;
  });
}

// 1. Load existing master CSV if present
const daily = new Map();
function getRow(date) {
  if (!daily.has(date)) {
    daily.set(date, {
      Date: date,
      Clicks: '',
      Impressions: '',
      CTR: '',
      Avg_Position: '',
      Indexed_Pages: '',
      Not_Indexed_Pages: '',
      Invalid_Review_Snippets: '',
    });
  }
  return daily.get(date);
}

if (fs.existsSync(MASTER_CSV)) {
  for (const r of parseCsv(MASTER_CSV)) {
    if (!r.Date) continue;
    daily.set(r.Date, { ...getRow(r.Date), ...r });
  }
}

// 2. Discover GSC export folders in ROOT and data/gsc/inbox
const scanDirs = [ROOT, ...(fs.existsSync(INBOX_DIR) ? [INBOX_DIR] : [])];
const candidates = [];

for (const dir of scanDirs) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = entry.name;
    const full = path.join(dir, name);
    if (entry.isDirectory() && name.startsWith('franchise.sg-')) {
      candidates.push({ name, full, isDir: true });
    } else if (entry.isFile() && name.startsWith('franchise.sg-') && name.endsWith('.zip')) {
      candidates.push({ name, full, isDir: false });
    }
  }
}

// Sort chronologically by date embedded in folder name so newer exports finalize overlapping dates
candidates.sort((a, b) => a.name.localeCompare(b.name));

let perfFolders = 0;
let covFolders = 0;
let revFolders = 0;
let skippedFiltered = 0;

for (const item of candidates) {
  if (!item.isDir) continue;
  const chartPath = path.join(item.full, 'Chart.csv');
  if (!fs.existsSync(chartPath)) continue;

  // Skip query/page-filtered Performance exports so they don't overwrite full-site daily totals
  const filtersPath = path.join(item.full, 'Filters.csv');
  if (fs.existsSync(filtersPath)) {
    const filtersTxt = fs.readFileSync(filtersPath, 'utf8');
    if (/^(Query|Page),/m.test(filtersTxt)) {
      skippedFiltered++;
      continue;
    }
  }

  const rows = parseCsv(chartPath);
  if (rows.length === 0) continue;
  const first = rows[0];

  if ('Clicks' in first && 'Impressions' in first && 'Position' in first) {
    perfFolders++;
    for (const r of rows) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(r.Date)) continue;
      const rec = getRow(r.Date);
      rec.Clicks = r.Clicks;
      rec.Impressions = r.Impressions;
      rec.CTR = r.CTR;
      rec.Avg_Position = r.Position;
    }
  } else if ('Indexed' in first && 'Not indexed' in first) {
    covFolders++;
    for (const r of rows) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(r.Date)) continue;
      const rec = getRow(r.Date);
      if (r.Indexed !== '') rec.Indexed_Pages = r.Indexed;
      if (r['Not indexed'] !== '') rec.Not_Indexed_Pages = r['Not indexed'];
    }
  } else if ('Affected items' in first || 'Invalid' in first) {
    revFolders++;
    for (const r of rows) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(r.Date)) continue;
      const rec = getRow(r.Date);
      const val = r['Affected items'] ?? r.Invalid ?? '';
      if (val !== '') rec.Invalid_Review_Snippets = val;
    }
  }
}

// 3. Write sorted master CSV
fs.mkdirSync(OUT_DIR, { recursive: true });
const sortedDates = [...daily.keys()].sort();
const header = 'Date,Clicks,Impressions,CTR,Avg_Position,Indexed_Pages,Not_Indexed_Pages,Invalid_Review_Snippets';
const lines = [
  header,
  ...sortedDates.map((d) => {
    const r = daily.get(d);
    return [
      r.Date,
      r.Clicks,
      r.Impressions,
      r.CTR,
      r.Avg_Position,
      r.Indexed_Pages,
      r.Not_Indexed_Pages,
      r.Invalid_Review_Snippets,
    ].join(',');
  }),
];
fs.writeFileSync(MASTER_CSV, lines.join('\n') + '\n', 'utf8');

// 4. Optional archive move
let archivedCount = 0;
if (shouldArchive && candidates.length > 0) {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  for (const item of candidates) {
    const dest = path.join(ARCHIVE_DIR, item.name);
    if (!fs.existsSync(dest)) {
      fs.renameSync(item.full, dest);
      archivedCount++;
    }
  }
}

console.log(`✅ Master GSC CSV updated: ${path.relative(ROOT, MASTER_CSV)}`);
console.log(`   Date range: ${sortedDates[0] || 'N/A'} → ${sortedDates[sortedDates.length - 1] || 'N/A'} (${sortedDates.length} daily rows)`);
console.log(`   Sources merged: ${perfFolders} Performance | ${covFolders} Coverage | ${revFolders} Review Snippets (${skippedFiltered} filtered exports skipped)`);
if (shouldArchive) {
  console.log(`   Archived: ${archivedCount} raw GSC folders/zips moved to _archive/gsc_raw/`);
}
