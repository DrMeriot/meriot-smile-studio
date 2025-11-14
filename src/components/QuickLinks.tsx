import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Stethoscope,
  User,
  CreditCard,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  {
    title: "Nos services",
    description:
      "Découvrez tous nos soins : parodontie, implantologie, soins généraux et esthétique.",
    icon: Stethoscope,
    href: "/services",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "À propos",
    description:
      "Mon parcours, mes formations et ma philosophie de soins personnalisés.",
    icon: User,
    href: "/a-propos",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Tarifs",
    description:
      "Tarifs transparents, conventionnée secteur 1, carte vitale et tiers payant.",
    icon: CreditCard,
    href: "/tarifs",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Contact",
    description:
      "Adresse, horaires, plan d'accès et prise de rendez-vous en ligne.",
    icon: MessageCircle,
    href: "/contact",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const QuickLinks = () => {
  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">
            Navigation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Découvrez notre cabinet
          </h2>
          <p className="text-lg text-muted-foreground">
            Toutes les informations essentielles pour votre première visite et
            votre suivi.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link key={index} to={link.href} className="block group">
                <Card className="h-full hover-lift shadow-soft hover:shadow-medium transition-all duration-300 border-2 hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${link.bgColor}`}>
                        <Icon className={`h-6 w-6 ${link.color}`} />
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {link.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
