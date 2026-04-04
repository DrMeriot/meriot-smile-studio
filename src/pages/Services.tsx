import { useEffect } from "react";
import { useGlobalSettings } from "@/hooks/useSanityContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Stethoscope, Heart, Zap, Shield, Sparkles, FileHeart, Calendar } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";

const servicesDetails = [
  {
    icon: Stethoscope, title: "Soins dentaires généraux", color: "text-primary", bgColor: "bg-primary/10",
    description: "Prendre soin de votre santé bucco-dentaire au quotidien avec des soins adaptés à vos besoins.",
    details: [
      { subtitle: "Consultations et examens", text: "Bilan complet de votre santé bucco-dentaire, dépistage précoce des caries et maladies des gencives." },
      { subtitle: "Détartrage", text: "Nettoyage professionnel pour éliminer la plaque et le tartre." },
      { subtitle: "Soins des caries", text: "Traitement des caries avec des matériaux esthétiques et biocompatibles." },
      { subtitle: "Dévitalisation (endodontie)", text: "Traitement des infections de la pulpe dentaire." },
    ],
  },
  {
    icon: Heart, title: "Parodontie - Spécialité", color: "text-accent", bgColor: "bg-accent/10", featured: true,
    description: "Spécialité dédiée à la santé de vos gencives. Formation à l'IFPIO Marseille et l'Académie de paro d'Aix-en-Provence.",
    details: [
      { subtitle: "Diagnostic parodontal", text: "Bilan complet : mesure des poches parodontales, évaluation de la perte osseuse." },
      { subtitle: "Traitement non-chirurgical", text: "Détartrage et surfaçage radiculaire." },
      { subtitle: "Chirurgie parodontale", text: "Réduction des poches, régénération tissulaire guidée." },
      { subtitle: "Greffe gingivale", text: "Reconstruction des gencives rétractées." },
      { subtitle: "Maintenance parodontale", text: "Suivi régulier personnalisé." },
    ],
  },
  {
    icon: Zap, title: "Implantologie - Spécialité", color: "text-primary", bgColor: "bg-primary/10", featured: true,
    description: "Solution moderne et durable pour remplacer vos dents manquantes. Formation IFPIO Marseille.",
    details: [
      { subtitle: "Consultation implantaire", text: "Examen clinique, scanner 3D, plan de traitement personnalisé." },
      { subtitle: "Pose d'implants", text: "Insertion chirurgicale d'implants en titane sous anesthésie locale." },
      { subtitle: "Régénération osseuse", text: "Greffe osseuse si nécessaire." },
      { subtitle: "Restauration prothétique", text: "Couronne, bridge ou prothèse sur implants." },
      { subtitle: "Suivi post-opératoire", text: "Contrôles réguliers pour garantir la réussite." },
    ],
  },
  {
    icon: Shield, title: "Prévention et hygiène", color: "text-secondary-foreground", bgColor: "bg-secondary",
    description: "La prévention est la clé d'une bonne santé bucco-dentaire.",
    details: [
      { subtitle: "Conseils personnalisés", text: "Techniques de brossage adaptées." },
      { subtitle: "Éducation à l'hygiène", text: "Importance du brossage et du détartrage régulier." },
      { subtitle: "Suivi régulier", text: "Contrôles périodiques pour détection précoce." },
    ],
  },
  {
    icon: Sparkles, title: "Esthétique dentaire", color: "text-accent", bgColor: "bg-accent/10",
    description: "Retrouvez un sourire éclatant grâce à des solutions esthétiques douces.",
    details: [
      { subtitle: "Blanchiment dentaire", text: "Éclaircissement professionnel des dents." },
      { subtitle: "Corrections esthétiques", text: "Facettes, composites esthétiques." },
    ],
  },
  {
    icon: FileHeart, title: "Dentisterie conservatrice", color: "text-primary", bgColor: "bg-primary/10",
    description: "Préserver au maximum vos tissus naturels. Au cœur de ma thèse universitaire.",
    details: [
      { subtitle: "Dentisterie à minima", text: "Techniques modernes pour préserver l'émail et la dentine." },
      { subtitle: "Diagnostic précoce", text: "Détection des caries au stade débutant." },
      { subtitle: "Matériaux biocompatibles", text: "Composites esthétiques et résistants, sans mercure." },
    ],
  },
];

const Services = () => {
  const { data: global } = useGlobalSettings();
  const nom = global?.nom_praticien ?? "Dr Stéphanie Meriot";
  const tel = global?.telephone ?? "09 83 43 96 21";
  const doctolibUrl = global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: servicesDetails.map((s, i) => ({
      "@type": "Service", position: i + 1, name: s.title, description: s.description,
      provider: { "@type": "Dentist", name: nom },
    })),
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <>
      <SEOHead
        title="Services Dentaires Marseille & PACA | Dr Stéphanie Meriot"
        description={`Services dentaires à Marseille : parodontie, implantologie, soins, prévention, esthétique. Secteur 1. ☎ ${tel}`}
        canonical="/services"
        keywords="services dentaires marseille, soins dentaires, parodontie, implantologie, détartrage, blanchiment"
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Nos services dentaires</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Du simple détartrage à la chirurgie implantaire, je vous propose une gamme complète de soins dentaires.
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              {servicesDetails.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className={`mb-16 ${index % 2 === 1 ? "bg-muted/30" : ""} rounded-3xl p-8`}>
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`p-4 rounded-xl ${service.bgColor}`}><Icon className={`h-8 w-8 ${service.color}`} /></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-3xl font-bold">{service.title}</h2>
                          {service.featured && <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">Spécialité</span>}
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                    <div className="space-y-4 ml-20">
                      {service.details.map((d, j) => (
                        <div key={j}><h3 className="font-semibold text-lg mb-2">{d.subtitle}</h3><p className="text-muted-foreground">{d.text}</p></div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Besoin d'un rendez-vous ?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Je serai ravie de vous accueillir dans mon cabinet.</p>
              <a href={doctolibUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary-hover"><Calendar className="h-5 w-5" />Prendre rendez-vous</Button>
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Services;
