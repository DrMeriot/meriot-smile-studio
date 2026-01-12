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
        keywords="dentiste marseille 4 contact, cabinet dentaire marseille chartreux, dentiste marseille 13004, rendez-vous dentiste marseille, dentiste aix-en-provence, cabinet dentaire aubagne, dentiste la ciotat, dentiste vitrolles, dentiste cassis, dentiste marignane, dentiste gardanne, dentiste martigues, dentiste istres, dentiste salon-de-provence, dentiste allauch, plan-de-cuques, les pennes-mirabeau, septèmes-les-vallons, bouc-bel-air, cabriès, simiane-collongue, meyreuil, fuveau, rousset, éguilles, ventabren, carry-le-rouet, sausset-les-pins, châteauneuf-les-martigues, gignac-la-nerthe, gémenos, carnoux, roquefort-la-bédoule, ceyreste, roquevaire, auriol, la destrousse, peypin, la bouilladisse, trets, saint-maximin, fos-sur-mer, port-de-bouc, berre-l'étang, rognac, velaux, miramas, saint-chamas, saint-mitre-les-remparts, pélissanne, lançon-provence, la fare-les-oliviers, coudoux, eyguières, lambesc, grans, PACA"
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <section className="py-16 bg-gradient-soft">
            <div className="container mx-auto px-4 text-center">
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Contact & Accès
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Le cabinet du Dr Stéphanie Mériot est situé à Marseille 4ème, à proximité du métro
                Chartreux. Nous accueillons des patients de Marseille et de toute la région PACA.
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
