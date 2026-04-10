

# Add pre-rendering for SEO indexing

## Approach

Use `vite-plugin-prerender` with its built-in Puppeteer renderer. After `vite build` produces `dist/`, the plugin launches a headless browser, navigates to each route, waits for React to render (including Sanity data fetches), and saves the resulting HTML. This means `<title>`, `<meta>` tags from react-helmet-async, and all visible text content will be baked into the static HTML files.

No changes to React components or routing needed — the plugin works post-build on the existing SPA output.

## Files to modify

### 1. `package.json`
- Add `vite-plugin-prerender` as a devDependency

### 2. `vite.config.ts`
- Import and configure `vitePrerender` plugin
- Set `staticDir` to `dist/`
- List all 11 routes to pre-render
- Use `PuppeteerRenderer` with `renderAfterTime: 3000` (wait for Sanity fetches to complete)
- Add `postProcess` hook to strip `<script>` `data-` attributes or clean up if needed

```ts
import vitePrerender from 'vite-plugin-prerender';
const Renderer = vitePrerender.PuppeteerRenderer;

// In plugins array (production only):
mode === 'production' && vitePrerender({
  staticDir: path.join(__dirname, 'dist'),
  routes: [
    '/', '/parodontie', '/implantologie', '/esthetique',
    '/services', '/tarifs', '/a-propos', '/contact',
    '/blog', '/mentions-legales', '/confidentialite'
  ],
  renderer: new Renderer({
    renderAfterTime: 3000,
    headless: true,
  }),
})
```

### 3. `vercel.json`
- Update rewrites to serve pre-rendered HTML files first, then fall back to SPA routing for dynamic routes (like `/blog/:slug` and admin)

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
No change needed here — Vercel automatically serves static files from `dist/` before applying rewrites, so `dist/parodontie/index.html` will be served for `/parodontie` without any rewrite rule change.

## Output structure

After build, `dist/` will contain:
```
dist/
  index.html              ← pre-rendered /
  parodontie/index.html   ← pre-rendered /parodontie
  implantologie/index.html
  esthetique/index.html
  services/index.html
  tarifs/index.html
  a-propos/index.html
  contact/index.html
  blog/index.html
  mentions-legales/index.html
  confidentialite/index.html
  assets/                 ← JS/CSS bundles
```

Each HTML file will contain full rendered content with correct `<title>` and `<meta name="description">` from react-helmet-async, plus all Sanity-fetched text visible in the markup.

## Notes

- The plugin only runs during `vite build` in production mode — no impact on dev server
- Sanity content is fetched by the headless browser during pre-rendering, so it appears in the HTML
- Blog post individual pages (`/blog/:slug`) are NOT pre-rendered (dynamic routes) — they remain SPA-rendered
- Admin routes are excluded from pre-rendering

