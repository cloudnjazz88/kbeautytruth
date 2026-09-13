/** Pure search matching — safe to import from client scripts. */

export interface SearchDocument {
  id: string;
  title: string;
  description: string;
  productName: string;
  category: string;
  categoryLabel: string;
  url: string;
  /** Present only when the published post has an approved hero image. */
  imageUrl?: string;
  imageAlt?: string;
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

export function searchAllResultsHref(rawQuery: string): string {
  const trimmed = rawQuery.trim().replace(/\s+/g, ' ');
  if (!trimmed) return '/search/';
  return `/search/?q=${encodeURIComponent(trimmed)}`;
}
