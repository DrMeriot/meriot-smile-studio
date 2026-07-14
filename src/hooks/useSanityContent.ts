import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";
import {
  globalQuery,
  accueilQuery,
  parodontieQuery,
  implantologieQuery,
  
  tarifsQuery,
  aboutQuery,
  servicesPageQuery,
  legalQuery,
  blogPostsQuery,
  blogPageQuery,
  blogPostBySlugQuery,
  contactQuery,
  confidentialiteQuery,
  gingiviteMarseilleQuery,
  dechaussementDentaireQuery,
  gencivesQuiSaignentQuery,
} from "@/lib/sanityQueries";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

/**
 * Documents are loosely typed at the Sanity fetch boundary: shapes vary per
 * page and the UI reads them as `doc?.field ?? fallback`. Callers that need
 * field-level safety pass a concrete type param (e.g. `useBlogPosts<Post>()`).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityData = Record<string, any>;

// During SSG/SSR there is no `window`. We must not fetch Sanity then,
// otherwise the server-rendered HTML differs from the first client render
// and React throws hydration errors (#418/#423).
const isBrowser = typeof window !== "undefined";

interface SanityQueryOptions {
  /**
   * When true, always re-fetch on mount and never trust cache. Used for
   * blog content that may have been published *after* the SSG build, so
   * the client must fetch fresh data even if SSG injected `null`.
   */
  alwaysFresh?: boolean;
}

function useSanityQuery<T = SanityData>(
  key: string,
  query: string,
  params?: Record<string, unknown>,
  options?: SanityQueryOptions,
) {
  const fresh = options?.alwaysFresh === true;
  return useQuery<T | null>({
    queryKey: ["sanity", key, params],
    queryFn: async (): Promise<T | null> => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const data = await sanityClient.fetch<T>(query, params, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        return data;
      } catch (error) {
        console.error("Sanity fetch failed for", key, error);
        return null;
      }
    },
    staleTime: fresh ? 0 : STALE_TIME,
    gcTime: 10 * 60 * 1000,
    retry: 0,
    placeholderData: null,
    refetchOnMount: fresh ? "always" : true,
    // Only run on the client. The first client render returns `null` (matching
    // the server HTML which used hardcoded fallbacks), then the query runs and
    // updates the UI after hydration is complete.
    enabled: isBrowser,
  });
}

const queryMap: Record<string, string> = {
  global: globalQuery,
  accueil: accueilQuery,
  parodontie: parodontieQuery,
  implantologie: implantologieQuery,
  tarifs: tarifsQuery,
  about: aboutQuery,
  services_page: servicesPageQuery,
  legal: legalQuery,
  contact: contactQuery,
  confidentialite: confidentialiteQuery,
  gingivite_marseille: gingiviteMarseilleQuery,
  dechaussement_dentaire: dechaussementDentaireQuery,
  gencives_qui_saignent: gencivesQuiSaignentQuery,
  blog_page: blogPageQuery,
};

export function useGlobalSettings<T = SanityData>() {
  return useSanityQuery<T>("global", globalQuery);
}

export function useSanityPage<T = SanityData>(type: string) {
  const query = queryMap[type];
  if (!query) {
    throw new Error(`Unknown Sanity page type: ${type}`);
  }
  return useSanityQuery<T>(type, query);
}

// Blog content is uniquely sensitive to staleness: a new post may be
// published after the SSG build, so the client must always re-fetch on
// mount even if SSG injected an empty/null payload.
export function useBlogPosts<T = SanityData>() {
  return useSanityQuery<T[]>("blogPosts", blogPostsQuery, undefined, { alwaysFresh: true });
}

export function useBlogPost<T = SanityData>(slug: string) {
  return useSanityQuery<T>(`blogPost-${slug}`, blogPostBySlugQuery, { slug }, { alwaysFresh: true });
}
