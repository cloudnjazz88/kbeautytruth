import { getCategoryLabel, type PostCategory } from '../site';
import { getPostUrl, getPublishedPosts, type Post } from './posts';

/** Categories included in site search results. */
export const searchableCategories = [
  'reviews',
  'ingredients',
  'trends',
  'breakouts',
  'comparisons',
] as const satisfies readonly PostCategory[];

export type SearchableCategory = (typeof searchableCategories)[number];

export interface SearchDocument {
  id: string;
  title: string;
  description: string;
  productName: string;
  category: SearchableCategory;
  categoryLabel: string;
  url: string;
}

const searchableSet = new Set<string>(searchableCategories);

export function isSearchableCategory(category: PostCategory): category is SearchableCategory {
  return searchableSet.has(category);
}

export function toSearchDocument(post: Post): SearchDocument | null {
  if (post.data.draft || !isSearchableCategory(post.data.category)) {
    return null;
  }

  return {
    id: post.data.slug,
    title: post.data.title,
    description: post.data.description,
    productName: post.data.productName ?? '',
    category: post.data.category,
    categoryLabel: getCategoryLabel(post.data.category),
    url: getPostUrl(post),
  };
}

export async function getSearchDocuments(): Promise<SearchDocument[]> {
  const posts = await getPublishedPosts();
  const byUrl = new Map<string, SearchDocument>();

  for (const post of posts) {
    const doc = toSearchDocument(post);
    if (!doc) continue;
    byUrl.set(doc.url, doc);
  }

  return [...byUrl.values()];
}

export function normalizeSearchQuery(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function matchSearchDocuments(
  documents: SearchDocument[],
  rawQuery: string,
): SearchDocument[] {
  const query = normalizeSearchQuery(rawQuery);
  if (!query) return [];

  const tokens = query.split(' ').filter(Boolean);

  return documents.filter((doc) => {
    const haystack = [doc.title, doc.description, doc.productName, doc.categoryLabel]
      .join(' ')
      .toLowerCase();
    return tokens.every((token) => haystack.includes(token));
  });
}
