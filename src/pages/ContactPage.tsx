import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";

const ContactPage = () => {
  return (
    <>
      <SEOHead
        title="Contact & Accès | Cabinet Dentaire Dr Meriot Marseille 4ème"
        description="Cabinet dentaire Dr Stéphanie Meriot à Marseille 4ème. 23 Bd de la Fédération, métro Chartreux. Doctolib ☎ 09 83 43 96 21. Carte Vitale, tiers payant."
        canonical="/contact"
        keywords="dentiste marseille 4 contact, cabinet dentaire marseille chartreux, dentiste marseille 13004, rendez-vous dentiste marseille"
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <section className="py-16 bg-gradient-soft">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Nous contacter
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Le cabinet est situé à Marseille 4ème, à proximité du métro
                Chartreux. Prenez rendez-vous facilement sur Doctolib ou
                contactez-nous par téléphone.
              </p>
            </div>
          </section>
          <Contact />
        </main>
        <Footer />
      </div>
    </>
    );
  };

export default ContactPage;
