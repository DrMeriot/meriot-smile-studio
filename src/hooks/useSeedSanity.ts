import { useQueryClient } from "@tanstack/react-query";

/**
 * Seeds Sanity data fetched at build time (via a route `loader` in App.tsx)
 * into the React Query cache BEFORE the page's `useSanityPage` hook reads it.
 *
 * Why: the singleton hooks run with `enabled: isBrowser` (see useSanityContent.ts),
 * so they never fetch during SSG. Without seeding, the server-rendered HTML would
 * fall back to the hardcoded JSX. By seeding the loader payload under the same
 * query key the hook uses, the SSG HTML carries the Sanity (golden) content, and
 * the first client render matches it (no hydration mismatch). The JSX fallback
 * then only shows when the loader returned `null` (Sanity empty/unreachable).
 *
 * Mirrors the blog pattern in BlogPost.tsx (l.119-126).
 *
 * Key shape must match useSanityQuery: ["sanity", type, params] with params
 * undefined for singletons → ["sanity", type, undefined].
 */
export function useSeedSanity(type: string, doc: unknown): void {
  const queryClient = useQueryClient();
  if (doc != null) {
    const key = ["sanity", type, undefined];
    if (queryClient.getQueryData(key) === undefined) {
      queryClient.setQueryData(key, doc);
    }
  }
}
