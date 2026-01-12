import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PageContent {
  [key: string]: string | number | boolean | null;
}

export function usePageContent<T = PageContent>(pageName: string, sectionKey: string) {
  return useQuery({
    queryKey: ['page-content', pageName, sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_sections')
        .select('content')
        .eq('page_name', pageName)
        .eq('section_key', sectionKey)
        .maybeSingle();
      
      if (error) throw error;
      return data?.content as T | null;
    },
    staleTime: 5 * 60 * 1000, // Cache 5 minutes
  });
}

export function useAllPageSections(pageName: string) {
  return useQuery({
    queryKey: ['page-sections', pageName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_name', pageName);
      
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
