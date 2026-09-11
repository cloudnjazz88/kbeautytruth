import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { postCategories } from './site';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    productName: z.string().optional(),
    description: z.string(),
    slug: z.string(),
    category: z.enum(postCategories),
    publishedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    author: z.string().default('Kay'),
    featured: z.boolean().default(false),
    skinType: z.string().optional(),
    testedFor: z.string().optional(),
    status: z.enum(['using', 'repurchased', 'discontinued', 'routine', 'notes']),
    draft: z.boolean().default(true),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    relatedPosts: z.array(z.string()).default([]),
    verdict: z.string().optional(),
    repurchase: z.enum(['yes', 'no', 'undecided', 'unknown']).default('unknown'),
  }),
});

export const collections = { posts };
