import { getCategoryLabel, type PostCategory } from '../site';
import { getPostUrl, getPublishedPosts, type Post } from './posts';
import {
  matchSearchDocuments,
  normalizeSearchQuery,
  searchAllResultsHref,
  type SearchDocument,
} from './search-match';

export type { SearchDocument };
export {
  matchSearchDocuments,
  normalizeSearchQuery,
  searchAllResultsHref,
};

/** Categories included in site search results. */
export const searchableCategories = [
  'reviews',
  'ingredients',
  'trends',
  'breakouts',
  'comparisons',
] as const satisfies readonly PostCategory[];

export type SearchableCategory = (typeof searchableCategories)[number];

const searchableSet = new Set<string>(searchableCategories);

export function isSearchableCategory(category: PostCategory): category is SearchableCategory {
  return searchableSet.has(category);
}

export function toSearchDocument(post: Post): SearchDocument | null {
  if (post.data.draft || !isSearchableCategory(post.data.category)) {
    return null;
  }

  const doc: SearchDocument = {
    id: post.data.slug,
    title: post.data.title,
    description: post.data.description,
    productName: post.data.productName ?? '',
    category: post.data.category,
    categoryLabel: getCategoryLabel(post.data.category),
    url: getPostUrl(post),
  };

  if (post.data.heroImage) {
    doc.imageUrl = post.data.heroImage;
    doc.imageAlt = post.data.heroImageAlt || post.data.productName || post.data.title;
  }

  return doc;
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
