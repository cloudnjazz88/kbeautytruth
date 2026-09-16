/**
 * Edge worker for K-Beauty Truth static assets.
 * Forces HTTP → HTTPS before assets are served so Search Console
 * does not treat http:// variants as separate indexable URLs.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
