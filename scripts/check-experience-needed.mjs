import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const postsDir = path.resolve('src/content/posts');
const files = (await readdir(postsDir)).filter((name) => name.endsWith('.md'));
const failures = [];

function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

function isDraft(fm) {
  return /^draft:\s*true\s*$/m.test(fm);
}

function headingLevels(body) {
  return [...body.matchAll(/^#{1,6}\s+/gm)].map((match) => match[0].trim().length);
}

for (const file of files) {
  const full = path.join(postsDir, file);
  const text = await readFile(full, 'utf8');
  const fm = frontmatter(text);
  const body = text.replace(/^---[\s\S]*?---/, '');
  const draft = isDraft(fm);

  if (!draft && /\[EXPERIENCE NEEDED/i.test(text)) {
    failures.push(`${file}: published content still contains [EXPERIENCE NEEDED]`);
  }

  const levels = headingLevels(body);
  if (levels.includes(1)) {
    failures.push(`${file}: markdown should not include H1; the layout already provides the page title`);
  }
  for (let i = 1; i < levels.length; i += 1) {
    if (levels[i] - levels[i - 1] > 1) {
      failures.push(`${file}: heading order skips a level (${levels[i - 1]} to ${levels[i]})`);
    }
  }
}

if (failures.length) {
  console.error('Content check failed:\n' + failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}

console.log(`Content check passed (${files.length} post files). Drafts may still contain experience questions.`);
