import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://www.dr-meriot-chirurgien-dentiste.fr";

// Public, indexable static routes (must mirror src/App.tsx).
// Admin and dynamic blog routes are handled separately.
const STATIC_ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/parodontie", priority: "0.9", changefreq: "weekly" },
  { path: "/implantologie", priority: "0.9", changefreq: "weekly" },
  { path: "/esthetique", priority: "0.7", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/a-propos", priority: "0.8", changefreq: "monthly" },
  { path: "/tarifs", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/gingivite-marseille", priority: "0.8", changefreq: "monthly" },
  { path: "/dechaussement-dentaire-marseille", priority: "0.8", changefreq: "monthly" },
  { path: "/gencives-qui-saignent", priority: "0.8", changefreq: "monthly" },
  { path: "/mentions-legales", priority: "0.3", changefreq: "yearly" },
  { path: "/confidentialite", priority: "0.3", changefreq: "yearly" },
];

async function fetchBlogSlugs(): Promise<Array<{ slug: string; date?: string }>> {
  const projectId = process.env.VITE_SANITY_PROJECT_ID || "6a2np8jy";
  const dataset = process.env.VITE_SANITY_DATASET || "production";
  const query = encodeURIComponent(
    `*[_type == "blog_post" && defined(slug.current)]{ "slug": slug.current, date }`
  );
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = (await res.json()) as { result?: Array<{ slug: string; date?: string }> };
    return Array.isArray(json.result) ? json.result : [];
  } catch (err) {
    console.warn("[sitemap] Sanity fetch failed, skipping blog posts:", (err as Error).message);
    return [];
  }
}

function buildSitemapXml(
  entries: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }>
): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// Generates dist/sitemap.xml after the build, combining static routes
// with blog post slugs fetched live from Sanity. Runs on the client build only.
function dynamicSitemapPlugin(): Plugin {
  return {
    name: "dynamic-sitemap",
    apply: "build",
    async closeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const posts = await fetchBlogSlugs();

      const entries = [
        ...STATIC_ROUTES.map((r) => ({
          loc: `${SITE_URL}${r.path}`,
          lastmod: today,
          changefreq: r.changefreq,
          priority: r.priority,
        })),
        ...posts.map((p) => ({
          loc: `${SITE_URL}/blog/${p.slug}`,
          lastmod: p.date ? p.date.slice(0, 10) : today,
          changefreq: "monthly",
          priority: "0.6",
        })),
      ];

      const xml = buildSitemapXml(entries);
      const outDir = path.resolve(__dirname, "dist");
      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
      writeFileSync(path.join(outDir, "sitemap.xml"), xml, "utf-8");
      console.log(
        `[sitemap] Wrote ${entries.length} URLs (${posts.length} blog posts) to dist/sitemap.xml`
      );
    },
  };
}

// Polyfill browser globals for SSR/SSG builds
function ssrGlobalsPlugin(): Plugin {
  return {
    name: 'ssr-globals-polyfill',
    enforce: 'pre',
    config(_, { isSsrBuild }) {
      if (isSsrBuild) {
        // Polyfill before any module code runs
        if (typeof globalThis.localStorage === 'undefined') {
          const storage: Record<string, string> = {};
          (globalThis as any).localStorage = {
            getItem: (key: string) => storage[key] ?? null,
            setItem: (key: string, value: string) => { storage[key] = value; },
            removeItem: (key: string) => { delete storage[key]; },
            clear: () => { Object.keys(storage).forEach(k => delete storage[k]); },
            get length() { return Object.keys(storage).length; },
            key: (index: number) => Object.keys(storage)[index] ?? null,
          };
        }
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    ssrGlobalsPlugin(),
    react(),
    mode === "development" && componentTagger(),
    dynamicSitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
}));
