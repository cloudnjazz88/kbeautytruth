import type { APIRoute } from 'astro';
import { getPublishedPosts, getRepurchasedPosts, getPostUrl } from '../lib/posts';
import { postCategories, site } from '../site';

export const prerender = true;

interface SitemapEntry {
  path: string;
  lastmod?: Date;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const repurchased = await getRepurchasedPosts();
  const publishedCategories = new Set(posts.map((post) => post.data.category));

  const entries: SitemapEntry[] = [
    { path: '/' },
    { path: '/journal/' },
    { path: '/about/' },
    { path: '/contact/' },
    { path: '/privacy/' },
    { path: '/affiliate-disclosure/' },
    { path: '/editorial-policy/' },
    ...postCategories
      .filter((category) => publishedCategories.has(category))
      .map((category) => ({ path: `/${category}/` })),
    ...(repurchased.length > 0 ? [{ path: '/repurchased/' }] : []),
    ...posts.map((post) => ({
      path: getPostUrl(post),
      lastmod: post.data.updatedAt ?? post.data.publishedAt,
    })),
  ];

  const uniqueEntries = [...new Map(entries.map((entry) => [entry.path, entry])).values()];
  const urls = uniqueEntries
    .map((entry) => {
      const location = escapeXml(new URL(entry.path, site.url).href);
      const lastmod = entry.lastmod
        ? `\n    <lastmod>${entry.lastmod.toISOString()}</lastmod>`
        : '';
      return `  <url>\n    <loc>${location}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
