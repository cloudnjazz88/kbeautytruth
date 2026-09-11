import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, getPostUrl } from '../lib/posts';
import { site } from '../site';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: site.name,
    description: site.tagline,
    site: context.site ?? site.url,
    items: posts.flatMap((post) => {
      if (!post.data.publishedAt) return [];
      return [
        {
          title: post.data.title,
          description: post.data.description,
          pubDate: post.data.publishedAt,
          link: getPostUrl(post),
        },
      ];
    }),
  });
}
