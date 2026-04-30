
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Practitioner from "@/components/Practitioner";
import Services from "@/components/Services";
import Philosophy from "@/components/Philosophy";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import QuickLinks from "@/components/QuickLinks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Dr Meriot — Spécialiste des gencives à Marseille | Parodontie"
        description="Dr Stéphanie Meriot, chirurgien-dentiste spécialiste des gencives à Marseille 4ème. Traitement gingivite, parodontite, déchaussement, implants. Conventionnée Secteur 1. Prise de RDV en ligne."
        canonical="/"
        ogTitle="Dr Stéphanie Meriot | Spécialiste des gencives — Marseille"
        ogDescription="Chirurgien-dentiste spécialiste des gencives à Marseille 4ème : parodontie, traitement de la parodontite et implantologie. Cabinet conventionné Secteur 1."
        keywords="spécialiste gencives marseille, parodontie marseille, parodontologue marseille, traitement parodontite, gingivite, déchaussement dentaire, implantologie marseille, dentiste marseille 4"
      />
      <LocalBusinessSchema />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <QuickLinks />
          <Practitioner />
          <Services />
          <Philosophy />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
