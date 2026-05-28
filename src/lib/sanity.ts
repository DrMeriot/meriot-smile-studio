import { createClient } from "@sanity/client";

const baseClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "6a2np8jy",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  timeout: 3000,
});

// Are we in dev mode (Vite) or in a Node SSG/SSR build context?
// We log in dev (browser DevTools) and always in Node (build logs visible
// in Vercel/Lovable), but stay quiet in production browser bundles.
const isNode = typeof window === "undefined";
const isDev =
  (typeof import.meta !== "undefined" && (import.meta as { env?: { DEV?: boolean } }).env?.DEV) ||
  (typeof process !== "undefined" && process.env?.NODE_ENV !== "production");
const shouldLog = isNode || isDev;

function queryPreview(query: string): string {
  const cleaned = query.replace(/\s+/g, " ").trim();
  return cleaned.length > 80 ? `${cleaned.slice(0, 80)}…` : cleaned;
}

function logTag(): string {
  return isNode ? "[sanity SSG/SSR]" : "[sanity]";
}

/**
 * Hardened wrapper around the Sanity client.
 *
 * The `@sanity/client` SDK throws a raw `SyntaxError` when the upstream
 * returns a non-JSON response (e.g. a CDN HTML error page like
 * "The page could not be found"). That happens occasionally when:
 *   - the document type isn't yet defined in the Sanity studio
 *   - the dataset is mid-deployment / cache miss
 *   - the CDN edge returns an error page instead of JSON
 *
 * Without this wrapper, the SyntaxError bubbles up past the queryFn
 * try/catch in some bundler/minifier scenarios and crashes the page.
 * Here we always swallow fetch/parse errors and return `null` so that
 * components fall back to their hardcoded defaults.
 */
export const sanityClient = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetch<T = any>(
    query: string,
    params?: Record<string, unknown>,
    options?: { signal?: AbortSignal }
  ): Promise<T | null> {
    try {
      const result = await baseClient.fetch<T>(query, params ?? {}, options);
      if ((result === null || result === undefined) && shouldLog) {
        // Helps diagnose SSG builds where a published doc isn't yet
        // available, or the slug param doesn't match anything.
        console.warn(
          `${logTag()} empty result for query: ${queryPreview(query)}`,
          params ? { params } : ""
        );
      }
      return result ?? null;
    } catch (error) {
      // SyntaxError = non-JSON upstream response. Other errors = network/abort/CORS.
      // In all cases we return null and let the UI use its fallback content.
      if (shouldLog) {
        console.warn(
          `${logTag()} fetch failed for query: ${queryPreview(query)} — ${
            (error as Error)?.message
          }`,
          params ? { params } : ""
        );
      }
      return null;
    }
  },
};

const SANITY_PROJECT_ID =
  (import.meta as { env?: { VITE_SANITY_PROJECT_ID?: string } }).env
    ?.VITE_SANITY_PROJECT_ID || "6a2np8jy";
const SANITY_DATASET =
  (import.meta as { env?: { VITE_SANITY_DATASET?: string } }).env
    ?.VITE_SANITY_DATASET || "production";

/**
 * Enumerate slugs of a Sanity document type for SSG `getStaticPaths`.
 *
 * Runs at build time (Node), where the `@sanity/client` browser bundle is
 * awkward, so it hits the public query API directly. Returns route strings
 * shaped by `toPath`, or `[]` on any failure so the build never breaks.
 */
export async function getSanityStaticPaths(
  type: string,
  toPath: (slug: string) => string,
): Promise<string[]> {
  const query = encodeURIComponent(
    `*[_type=="${type}" && defined(slug.current)]{"slug": slug.current}`,
  );
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}?query=${query}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = (await res.json()) as { result?: Array<{ slug?: string }> };
    return (json.result ?? [])
      .map((r) => r.slug)
      .filter((s): s is string => typeof s === "string" && s.length > 0)
      .map(toPath);
  } catch {
    return [];
  }
}
