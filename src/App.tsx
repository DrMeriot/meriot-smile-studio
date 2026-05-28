import type { RouteRecord } from 'vite-react-ssg';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { Outlet } from 'react-router-dom';
import { sanityClient, getSanityStaticPaths } from '@/lib/sanity';
import { blogPostBySlugQuery } from '@/lib/sanityQueries';

const queryClient = new QueryClient();

function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
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
          const post = await sanityClient.fetch(blogPostBySlugQuery, { slug });
          return { post: post ?? null };
        },
        // Enumerate dynamic slugs to pre-render. vite-react-ssg uses this to
        // know which /blog/:slug paths to generate static HTML for.
        getStaticPaths: () =>
          getSanityStaticPaths('blog_post', (slug) => `blog/${slug}`),
      },
      { path: 'gingivite-marseille', element: <GingiviteMarseille /> },
      { path: 'dechaussement-dentaire-marseille', element: <DechaussementDentaire /> },
      { path: 'gencives-qui-saignent', element: <GencivesQuiSaignent /> },
      { path: 'mentions-legales', element: <MentionsLegales /> },
      { path: 'confidentialite', element: <Confidentialite /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
