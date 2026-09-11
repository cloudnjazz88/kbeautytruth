import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kbeautytruth.com',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
