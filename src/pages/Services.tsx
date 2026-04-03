import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Heart,
  Zap,
  Shield,
  Sparkles,
  FileHeart,
  Calendar,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";

const servicesDetails = [
  {
    icon: Stethoscope,
    title: "Soins dentaires généraux",
    color: "text-primary",
    bgColor: "bg-primary/10",
    description:
      "Prendre soin de votre santé bucco-dentaire au quotidien avec des soins adaptés à vos besoins.",
    details: [
      {
        subtitle: "Consultations et examens",
        text: "Bilan complet de votre santé bucco-dentaire, dépistage précoce des caries et maladies des gencives.",
      },
      {
        subtitle: "Détartrage",
        text: "Nettoyage professionnel pour éliminer la plaque et le tartre, prévenir les maladies gingivales.",
      },
      {
        subtitle: "Soins des caries",
        text: "Traitement des caries avec des matériaux esthétiques et biocompatibles (composites).",
      },
      {
        subtitle: "Dévitalisation (endodontie)",
        text: "Traitement des infections de la pulpe dentaire pour sauver votre dent naturelle.",
      },
    ],
  },
  {
    icon: Heart,
    title: "Parodontie - Spécialité",
    color: "text-accent",
    bgColor: "bg-accent/10",
    featured: true,
    description:
      "Spécialité dédiée à la santé de vos gencives et des tissus de soutien de vos dents. Formation approfondie à l'IFPIO Marseille et à l'Académie de paro d'Aix-en-Provence.",
    details: [
      {
        subtitle: "Diagnostic parodontal",
        text: "Bilan complet : mesure des poches parodontales, évaluation de la perte osseuse, dépistage précoce.",
      },
      {
        subtitle: "Traitement non-chirurgical",
        text: "Détartrage et surfaçage radiculaire (nettoyage en profondeur sous la gencive) pour éliminer les bactéries.",
      },
      {
        subtitle: "Chirurgie parodontale",
        text: "Interventions chirurgicales si nécessaire : réduction des poches, régénération tissulaire guidée.",
      },
      {
        subtitle: "Greffe gingivale",
        text: "Reconstruction des gencives rétractées pour protéger les racines exposées et améliorer l'esthétique.",
      },
      {
        subtitle: "Maintenance parodontale",
        text: "Suivi régulier personnalisé pour stabiliser votre parodonte et prévenir les récidives.",
      },
    ],
  },
  {
    icon: Zap,
    title: "Implantologie - Spécialité",
    color: "text-primary",
    bgColor: "bg-primary/10",
    featured: true,
    description:
      "Solution moderne et durable pour remplacer vos dents manquantes. Formation spécialisée à l'IFPIO Marseille.",
    details: [
      {
        subtitle: "Consultation implantaire",
        text: "Examen clinique et radiologique (scanner 3D), plan de traitement personnalisé, devis détaillé.",
      },
      {
        subtitle: "Pose d'implants",
        text: "Insertion chirurgicale d'implants en titane biocompatible dans l'os de la mâchoire. Intervention sous anesthésie locale.",
      },
      {
        subtitle: "Régénération osseuse",
        text: "Si nécessaire, greffe osseuse pour reconstruire le volume osseux et permettre la pose d'implants.",
      },
      {
        subtitle: "Restauration prothétique",
        text: "Couronne, bridge ou prothèse sur implants pour retrouver esthétique et fonction masticatoire.",
      },
      {
        subtitle: "Suivi post-opératoire",
        text: "Accompagnement attentif pendant la cicatrisation, contrôles réguliers pour garantir la réussite à long terme.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Prévention et hygiène",
    color: "text-secondary-foreground",
    bgColor: "bg-secondary",
    description:
      "La prévention est la clé d'une bonne santé bucco-dentaire. Des gestes simples pour préserver votre sourire.",
    details: [
      {
        subtitle: "Conseils personnalisés",
        text: "Techniques de brossage adaptées, choix des bons outils (brosse, fil dentaire, brossettes).",
      },
      {
        subtitle: "Éducation à l'hygiène",
        text: "Explication de l'importance du brossage, du détartrage régulier, et des habitudes alimentaires.",
      },
      {
        subtitle: "Suivi régulier",
        text: "Contrôles périodiques pour détecter et traiter les problèmes avant qu'ils ne s'aggravent.",
      },
    ],
  },
  {
    icon: Sparkles,
    title: "Esthétique dentaire",
    color: "text-accent",
    bgColor: "bg-accent/10",
    description:
      "Retrouvez un sourire éclatant et harmonieux grâce à des solutions esthétiques douces.",
    details: [
      {
        subtitle: "Blanchiment dentaire",
        text: "Éclaircissement professionnel des dents pour retrouver une teinte lumineuse et naturelle.",
      },
      {
        subtitle: "Corrections esthétiques",
        text: "Facettes, composites esthétiques pour corriger les imperfections (dents tachées, ébréchées, mal alignées).",
      },
    ],
  },
  {
    icon: FileHeart,
    title: "Dentisterie conservatrice",
    color: "text-primary",
    bgColor: "bg-primary/10",
    description:
      "Ma philosophie de soin : préserver au maximum vos tissus naturels. Cette approche est au cœur de ma thèse universitaire.",
    details: [
      {
        subtitle: "Dentisterie à minima",
        text: "Techniques modernes permettant de traiter les caries en préservant un maximum d'émail et de dentine.",
      },
      {
        subtitle: "Diagnostic précoce",
        text: "Détection des caries au stade débutant pour des interventions moins invasives.",
      },
      {
        subtitle: "Matériaux biocompatibles",
        text: "Utilisation de composites esthétiques et résistants, sans mercure.",
      },
    ],
  },
];

const Services = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: servicesDetails.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      provider: {
        "@type": "Dentist",
        name: "Dr Stéphanie Meriot",
      },
    })),
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Services Dentaires Marseille & PACA | Dr Stéphanie Meriot"
        description="Services dentaires à Marseille et région PACA : parodontie, implantologie, soins dentaires, prévention, esthétique. Cabinet conventionné secteur 1. ☎ 09 83 43 96 21"
        canonical="/services"
        keywords="services dentaires marseille, soins dentaires, parodontie, implantologie, détartrage, blanchiment dentaire, dentisterie conservatrice"
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Nos services dentaires
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Du simple détartrage à la chirurgie implantaire, je vous propose une
                gamme complète de soins dentaires adaptés à vos besoins.
              </p>
            </div>
          </section>

          {/* Services Details */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              {servicesDetails.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className={`mb-16 ${index % 2 === 1 ? "bg-muted/30" : ""} rounded-3xl p-8`}
                  >
                    <div className="flex items-start gap-6 mb-6">
                      <div className={`p-4 rounded-xl ${service.bgColor}`}>
                        <Icon className={`h-8 w-8 ${service.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-3xl font-bold">{service.title}</h2>
                          {service.featured && (
                            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                              Spécialité
                            </span>
                          )}
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 ml-20">
                      {service.details.map((detail, detailIndex) => (
                        <div key={detailIndex}>
                          <h3 className="font-semibold text-lg mb-2">
                            {detail.subtitle}
                          </h3>
                          <p className="text-muted-foreground">{detail.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Besoin d'un rendez-vous ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Prenez rendez-vous facilement sur Doctolib ou contactez-nous par
                téléphone. Je serai ravie de vous accueillir dans mon cabinet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="gap-2 bg-primary hover:bg-primary-hover"
                  >
                    <Calendar className="h-5 w-5" />
                    Prendre rendez-vous
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Services;
