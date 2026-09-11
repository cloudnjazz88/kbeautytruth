# K-Beauty Truth

Honest skincare notes, mostly Korean.  
Site: https://kbeautytruth.com

Kay writes about products she bought and used. The site does not invent wear time, skin changes, or medical claims.

## Stack

- Astro, TypeScript, content collections
- Static output for Cloudflare Pages
- Markdown posts in `src/content/posts/`

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

`npm run build` refuses to ship a published post that still contains `[EXPERIENCE NEEDED]`. Draft posts are left out of the production output, homepage, sitemap, and RSS.

## Publishing a post

1. Answer the matching questions in `CONTENT-QUESTIONS.md`
2. Replace every `[EXPERIENCE NEEDED]` block in that file
3. Add a real `publishedAt` date only if you have one
4. Set `draft: false`
5. Run `npm run build`

## Notes

A previous static “K-beauty Insider” sample still sits in this folder as leftover HTML/CSS. It is not part of the Astro build. Cloudflare should publish the `dist` directory from `astro build`.
