export const site = {
  name: 'K-Beauty Truth',
  url: 'https://kbeautytruth.com',
  tagline: 'Honest Reviews & Real Routines from 3+ Years of Testing',
  blurb: 'Honest skincare notes, mostly Korean.',
  email: 'contact@kbeautytruth.com',
  locale: 'en-US',
  author: {
    name: 'Kay',
    skinType: 'Dry / Somewhat Sensitive',
    goals: 'Anti-aging / Barrier Support',
    shopping: 'Amazon / Olive Young',
    experience: '3+ Years With K-Beauty',
  },
  features: {
    adsense: false,
    analytics: false,
    emailSubscribe: false,
    affiliateNetwork: false,
  },
} as const;

export const categories = [
  { slug: 'reviews', label: 'Reviews', path: '/reviews/' },
  { slug: 'repurchased', label: 'Repurchased', path: '/repurchased/' },
  { slug: 'breakouts', label: "What Didn't Work", path: '/breakouts/' },
  { slug: 'routines', label: 'Routines', path: '/routines/' },
  { slug: 'ingredients', label: 'Ingredients', path: '/ingredients/' },
  { slug: 'trends', label: 'Trends', path: '/trends/' },
  { slug: 'beyond-k-beauty', label: 'Beyond K-Beauty', path: '/beyond-k-beauty/' },
] as const;

export const postCategories = [
  'reviews',
  'breakouts',
  'comparisons',
  'routines',
  'ingredients',
  'trends',
  'beyond-k-beauty',
] as const;

export type PostCategory = (typeof postCategories)[number];

export const categoryLabels: Record<PostCategory, string> = {
  reviews: 'Reviews',
  breakouts: "What Didn't Work",
  comparisons: 'Comparisons',
  routines: 'Routines',
  ingredients: 'Ingredients',
  trends: 'Trends',
  'beyond-k-beauty': 'Beyond K-Beauty',
};

export function getCategoryLabel(category: PostCategory): string {
  return categoryLabels[category];
}

export function categoryPath(category: PostCategory): string {
  return `/${category}/`;
}

export function postPath(category: PostCategory, slug: string): string {
  return `/${category}/${slug}/`;
}
