import type { RouteRecord } from 'vite-react-ssg';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Tarifs from "./pages/Tarifs";
import ContactPage from "./pages/ContactPage";
import Parodontie from "./pages/Parodontie";
import Implantologie from "./pages/Implantologie";

import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import GingiviteMarseille from "./pages/GingiviteMarseille";
import DechaussementDentaire from "./pages/DechaussementDentaire";
import GencivesQuiSaignent from "./pages/GencivesQuiSaignent";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import BlogList from "./pages/admin/BlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import PageManager from "./pages/admin/PageManager";
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/lib/sanity';
import { blogPostBySlugQuery } from '@/lib/sanityQueries';

const queryClient = new QueryClient();

// Toasters use `useTheme()` and portals tied to `window`, which differ between
// the SSG-generated HTML and the first client render. Mount them only after
// hydration to avoid React hydration errors (#418/#423).
function ClientOnlyToasters() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <Toaster />
      <Sonner />
    </>
  );
}

function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ClientOnlyToasters />
        <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: 'services', element: <Services /> },
      { path: 'a-propos', element: <About /> },
      { path: 'tarifs', element: <Tarifs /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'parodontie', element: <Parodontie /> },
      { path: 'implantologie', element: <Implantologie /> },
      
      { path: 'blog', element: <Blog /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        // SSG: fetch the article from Sanity at build time so the generated
        // HTML contains the full content (~35 KiB) instead of a loading shell.
        // The data is also seeded into React Query in BlogPost.tsx.
        loader: async ({ params }) => {
          const slug = params.slug;
          if (!slug) return { post: null };
          try {
            const post = await sanityClient.fetch(blogPostBySlugQuery, { slug });
            return { post: post ?? null };
          } catch {
            return { post: null };
          }
        },
        // Enumerate dynamic slugs to pre-render. vite-react-ssg uses this to
        // know which /blog/:slug paths to generate static HTML for.
        getStaticPaths: async () => {
          const projectId =
            (import.meta as { env?: { VITE_SANITY_PROJECT_ID?: string } }).env
              ?.VITE_SANITY_PROJECT_ID || '6a2np8jy';
          const dataset =
            (import.meta as { env?: { VITE_SANITY_DATASET?: string } }).env
              ?.VITE_SANITY_DATASET || 'production';
          const query = encodeURIComponent(
            `*[_type=="blog_post" && defined(slug.current)]{"slug": slug.current}`
          );
          const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;
          try {
            const res = await fetch(url);
            if (!res.ok) return [];
            const json = (await res.json()) as { result?: Array<{ slug: string }> };
            return (json.result ?? [])
              .filter((p) => typeof p.slug === 'string' && p.slug.length > 0)
              .map((p) => `blog/${p.slug}`);
          } catch {
            return [];
          }
        },
      },
      { path: 'gingivite-marseille', element: <GingiviteMarseille /> },
      { path: 'dechaussement-dentaire-marseille', element: <DechaussementDentaire /> },
      { path: 'gencives-qui-saignent', element: <GencivesQuiSaignent /> },
      { path: 'mentions-legales', element: <MentionsLegales /> },
      { path: 'confidentialite', element: <Confidentialite /> },
      { path: 'acces-cabinet', element: <ContactPage /> },
      { path: 'admin/login', element: <Login /> },
      { path: 'admin', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: 'admin/blog', element: <ProtectedRoute><BlogList /></ProtectedRoute> },
      { path: 'admin/blog/new', element: <ProtectedRoute><BlogEditor /></ProtectedRoute> },
      { path: 'admin/blog/edit/:id', element: <ProtectedRoute><BlogEditor /></ProtectedRoute> },
      { path: 'admin/pages', element: <ProtectedRoute><PageManager /></ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
