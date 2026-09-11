import { getCollection, type CollectionEntry } from 'astro:content';
import { postPath, type PostCategory } from '../site';

export type Post = CollectionEntry<'posts'>;

export function getPostUrl(post: Post): string {
  return postPath(post.data.category, post.data.slug);
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort(sortPosts);
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => !post.data.draft);
}

export async function getRenderablePosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  if (import.meta.env.PROD) {
    return posts.filter((post) => !post.data.draft);
  }
  return posts;
}

export async function getPostsByCategory(category: PostCategory): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.category === category);
}

export async function getRepurchasedPosts(): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.status === 'repurchased');
}

export async function getFeaturedPost(): Promise<Post | undefined> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.data.featured) ?? posts[0];
}

export async function getRelatedPosts(post: Post): Promise<Post[]> {
  const published = await getPublishedPosts();
  const bySlug = new Map(published.map((entry) => [entry.data.slug, entry]));
  return post.data.relatedPosts
    .map((slug) => bySlug.get(slug))
    .filter((entry): entry is Post => Boolean(entry));
}

function sortPosts(a: Post, b: Post): number {
  const aTime = a.data.publishedAt?.getTime() ?? 0;
  const bTime = b.data.publishedAt?.getTime() ?? 0;
  if (aTime !== bTime) {
    return bTime - aTime;
  }
  return a.data.title.localeCompare(b.data.title);
}
