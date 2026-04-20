import { createClient } from "@sanity/client";

const baseClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "6a2np8jy",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  timeout: 3000,
});

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
      return result ?? null;
    } catch (error) {
      // SyntaxError = non-JSON upstream response. Other errors = network/abort/CORS.
      // In all cases we return null and let the UI use its fallback content.
      if (typeof console !== "undefined") {
        console.warn("[sanity] fetch failed, using fallback:", (error as Error)?.message);
      }
      return null;
    }
  },
};
