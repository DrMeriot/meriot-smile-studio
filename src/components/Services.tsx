import { Link } from "react-router-dom";
import {
  Stethoscope,
  Shield,
  FileHeart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import paroLogo from "@/assets/paro-logo.png";
import implantoLogo from "@/assets/implanto-logo.png";

type ServiceItem = {
  icon?: React.ComponentType<{ className?: string }>;
  image?: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  featured?: boolean;
  href: string;
  linkLabel?: string;
};

const services: ServiceItem[] = [
  {
    icon: Stethoscope,
    title: "Soins dentaires généraux",
    description:
      "Consultations, détartrage, soins des caries, dévitalisation. Prise en charge complète de votre santé bucco-dentaire.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    href: "/services",
  },
  {
    image: paroLogo,
    title: "Parodontie - Spécialité",
    description:
      "Traitement des maladies des gencives, détartrage approfondi, chirurgie parodontale, greffe gingivale. Découvrez aussi nos pages dédiées à la gingivite et au déchaussement dentaire.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    featured: true,
    href: "/parodontie",
    linkLabel: "Découvrir la parodontie",
  },
  {
    image: implantoLogo,
    title: "Implantologie - Spécialité",
    description:
      "Pose d'implants dentaires, régénération osseuse, restauration complète. Solution durable pour remplacer vos dents manquantes.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    featured: true,
    href: "/implantologie",
    linkLabel: "Découvrir l'implantologie",
  },
  {
    icon: Shield,
    title: "Prévention et hygiène",
    description:
      "Conseils personnalisés, suivi régulier, techniques de brossage adaptées. Prévenir vaut mieux que guérir.",
    color: "text-secondary-foreground",
    bgColor: "bg-secondary",
    href: "/gencives-qui-saignent",
    linkLabel: "Gencives qui saignent ?",
  },
  {
    icon: FileHeart,
    title: "Dentisterie conservatrice",
    description:
      "Approche minimale invasive selon ma thèse. Préservation maximale de vos tissus naturels.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    href: "/services",
  },
];

const Services = () => {
  return (
    <section className="py-20" id="services">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">
            Nos prestations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Des soins adaptés à vos besoins
          </h2>
          <p className="text-lg text-muted-foreground">
            Du simple détartrage à la pose d'implants, je vous accompagne avec
            expertise et bienveillance dans tous vos soins dentaires.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className={`hover-lift shadow-soft hover:shadow-medium transition-all duration-300 ${
                  service.featured ? "border-primary/50" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${service.bgColor}`}>
                      {service.image ? (
                        <img src={service.image} alt={service.title} className="h-6 w-6 object-contain" />
                      ) : Icon ? (
                        <Icon className={`h-6 w-6 ${service.color}`} />
                      ) : null}
                    </div>
                    {service.featured && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Spécialité
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Link
                    to={service.href}
                    className="text-primary hover:text-primary-hover font-medium text-sm inline-flex items-center gap-1 transition-colors"
                  >
                    {service.linkLabel ?? "En savoir plus"}
                    <span>→</span>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
