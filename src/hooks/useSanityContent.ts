import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";
import {
  globalQuery,
  accueilQuery,
  parodontieQuery,
  implantologieQuery,
  esthetiqueQuery,
  tarifsQuery,
  aboutQuery,
  servicesPageQuery,
  legalQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
} from "@/lib/sanityQueries";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useSanityQuery<T = any>(key: string, query: string, params?: Record<string, unknown>) {
  return useQuery<T | null>({
    queryKey: ["sanity", key, params],
    queryFn: async (): Promise<T | null> => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const data = await sanityClient.fetch<T>(query, params, { signal: controller.signal });
        clearTimeout(timeoutId);
        console.log("SANITY FETCH result for", key, ":", data);
        return data;
      } catch (error) {
        console.error("Sanity fetch failed for", key, error);
        return null;
      }
    },
    staleTime: STALE_TIME,
    gcTime: 10 * 60 * 1000,
    retry: 0,
    initialData: null,
  });
}

const queryMap: Record<string, string> = {
  global: globalQuery,
  accueil: accueilQuery,
  parodontie: parodontieQuery,
  implantologie: implantologieQuery,
  esthetique: esthetiqueQuery,
  tarifs: tarifsQuery,
  about: aboutQuery,
  services_page: servicesPageQuery,
  legal: legalQuery,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGlobalSettings<T = any>() {
  return useSanityQuery<T>("global", globalQuery);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSanityPage<T = any>(type: string) {
  const query = queryMap[type];
  if (!query) {
    throw new Error(`Unknown Sanity page type: ${type}`);
  }
  return useSanityQuery<T>(type, query);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useBlogPosts<T = any>() {
  return useSanityQuery<T[]>("blogPosts", blogPostsQuery);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useBlogPost<T = any>(slug: string) {
  return useSanityQuery<T>(`blogPost-${slug}`, blogPostBySlugQuery, { slug });
}
