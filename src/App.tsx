import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import LaserDentaire from "./pages/LaserDentaire";
import RegenerationOsseuse from "./pages/RegenerationOsseuse";
import GreffeGingivale from "./pages/GreffeGingivale";
import ParodontiteSante from "./pages/ParodontiteSante";
import MaintenanceParodontale from "./pages/MaintenanceParodontale";
import Esthetique from "./pages/Esthetique";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import BlogList from "./pages/admin/BlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import PageManager from "./pages/admin/PageManager";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/parodontie" element={<Parodontie />} />
            <Route path="/laser-dentaire" element={<LaserDentaire />} />
            <Route path="/regeneration-osseuse" element={<RegenerationOsseuse />} />
            <Route path="/greffe-gingivale" element={<GreffeGingivale />} />
            <Route path="/parodontite-sante-generale" element={<ParodontiteSante />} />
            <Route path="/maintenance-parodontale" element={<MaintenanceParodontale />} />
            <Route path="/implantologie" element={<Implantologie />} />
            <Route path="/esthetique" element={<Esthetique />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
            <Route path="/admin/blog/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/pages" element={<ProtectedRoute><PageManager /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
