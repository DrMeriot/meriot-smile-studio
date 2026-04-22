
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
        title="Parodontie et Soins Dentaires à Marseille - Dr Stéphanie Meriot"
        description="Spécialiste du traitement des gencives et du déchaussement dentaire à Marseille. Le Dr Stéphanie Meriot soigne gingivite, parodontite et pose d'implants. Cabinet conventionné secteur 1."
        canonical="/"
        ogTitle="Dr Stéphanie Meriot | Experte Parodontie à Marseille"
        ogDescription="Traitement des maladies des gencives, déchaussement dentaire et implantologie. Cabinet dentaire de confiance à Marseille 4ème. Prenez RDV en ligne."
        keywords="parodontie marseille, traitement gencives, déchaussement dentaire, gingivite, parodontite, implantologie marseille, dentiste marseille 4"
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
