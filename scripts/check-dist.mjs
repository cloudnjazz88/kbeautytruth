import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const forbidden = [
  /\[EXPERIENCE NEEDED/i,
  /\blorem ipsum\b/i,
  /\bcoming soon\b/i,
  /\baggregateRating\b/i,
  /\bTODO\b/,
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const files = await walk(distDir);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const failures = [];

for (const file of htmlFiles) {
  const text = await readFile(file, 'utf8');
  const rel = path.relative(distDir, file);
  for (const pattern of forbidden) {
    if (pattern.test(text)) {
      failures.push(`${rel}: contains ${pattern}`);
    }
  }

  const hrefs = [...text.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('https://fonts.') ||
      href.startsWith('https://schema.org')
    ) {
      continue;
    }
    if (href.startsWith('http') && !href.startsWith('https://kbeautytruth.com')) {
      continue;
    }

    const url = href.startsWith('https://kbeautytruth.com')
      ? href.replace('https://kbeautytruth.com', '')
      : href;
    if (!url.startsWith('/')) continue;

    const clean = url.split('#')[0].split('?')[0];
    const target = clean.endsWith('/')
      ? path.join(distDir, clean, 'index.html')
      : path.join(distDir, clean);
    const xmlTarget = path.join(distDir, clean.replace(/^\//, ''));

    const exists = await Promise.all([
      stat(target).then(() => true).catch(() => false),
      stat(xmlTarget).then(() => true).catch(() => false),
    ]);
    if (!exists[0] && !exists[1]) {
      failures.push(`${rel}: broken internal link ${href}`);
    }
  }
}

if (failures.length) {
  console.error('Dist check failed:\n' + failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log(`Dist check passed (${htmlFiles.length} HTML files).`);
