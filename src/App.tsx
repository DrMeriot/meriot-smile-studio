import type { RouteRecord } from 'vite-react-ssg';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Tarifs from "./pages/Tarifs";
import ContactPage from "./pages/ContactPage";
import Parodontie from "./pages/Parodontie";
import Implantologie from "./pages/Implantologie";
import Esthetique from "./pages/Esthetique";
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
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ClientOnlyToasters />
          <Outlet />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
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
      { path: 'esthetique', element: <Esthetique /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
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
