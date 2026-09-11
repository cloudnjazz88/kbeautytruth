# Production deployment: Cloudflare Pages

The production canonical origin is `https://kbeautytruth.com`. Do not change it to the temporary
`pages.dev` address.

## Cloudflare Pages build settings

- Repository: `cloudnjazz88/kbeautytruth`
- Production branch: `main`
- Framework preset: Astro (or None with the same commands below)
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root

No Worker runtime or bindings are required; this Astro project builds to static files.

## Custom domains

1. In Cloudflare Pages, open the project and choose **Custom domains**.
2. Add `kbeautytruth.com` as the primary custom domain and complete the DNS prompt.
3. Add `www.kbeautytruth.com` as a second custom domain.
4. Create one permanent redirect so `https://www.kbeautytruth.com/*` resolves to
   `https://kbeautytruth.com/$1` without changing the path.
5. Create one permanent redirect from the project's exact `pages.dev` hostname to the same
   canonical apex domain after the custom domain is active.
6. Confirm that Cloudflare has issued an active SSL certificate for both custom hostnames.

Do not add a guessed CNAME target manually. Use the exact target Cloudflare displays for this Pages
project. If the domain's DNS zone is already on Cloudflare, the Pages custom-domain flow normally
creates the required record.

## Google Search Console

1. Add a **Domain property** for `kbeautytruth.com` (enter the domain only, without `https://`).
2. Copy the TXT verification record Google provides.
3. Add that TXT record in Cloudflare DNS without modifying its value.
4. Complete verification in Search Console after DNS propagation.
5. Submit `https://kbeautytruth.com/sitemap.xml`.

No Google verification value is stored in this repository. Google AdSense and advertising scripts
remain disabled.

## Pre-deployment checks

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

After deployment, verify:

- `https://kbeautytruth.com/`
- `https://kbeautytruth.com/robots.txt`
- `https://kbeautytruth.com/sitemap.xml`
- page source contains an apex-domain canonical and matching `og:url`
- HTTPS has no certificate warning
- `www` and `pages.dev` permanently redirect to the apex hostname while preserving paths
