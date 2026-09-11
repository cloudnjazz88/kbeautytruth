export const site = {
  name: 'K-Beauty Truth',
  url: 'https://kbeautytruth.com',
  tagline: 'Honest Reviews & Real Routines from 3+ Years of Testing',
  blurb: 'Honest skincare notes, mostly Korean.',
  email: 'contact@kbeautytruth.com',
  locale: 'en-US',
  author: {
    name: 'Kay',
    skinType: 'Combination / Sensitive',
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
  { slug: 'breakouts', label: 'Breakouts', path: '/breakouts/' },
  { slug: 'routines', label: 'Routines', path: '/routines/' },
  { slug: 'beyond-k-beauty', label: 'Beyond K-Beauty', path: '/beyond-k-beauty/' },
] as const;

export const postCategories = [
  'reviews',
  'breakouts',
  'comparisons',
  'routines',
  'beyond-k-beauty',
] as const;

export type PostCategory = (typeof postCategories)[number];

export function categoryPath(category: PostCategory): string {
  return `/${category}/`;
}

export function postPath(category: PostCategory, slug: string): string {
  return `/${category}/${slug}/`;
}
