import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Zap, Sparkles, ArrowRight } from "lucide-react";

const specialties = [
  {
    title: "Parodontie",
    description: "Soins des gencives et des tissus de soutien des dents",
    icon: Heart,
    href: "/parodontie",
    color: "text-accent",
    bgColor: "bg-accent/10",
    hoverBg: "hover:bg-accent/20",
  },
  {
    title: "Implantologie",
    description: "Remplacement durable de vos dents manquantes",
    icon: Zap,
    href: "/implantologie",
    color: "text-primary",
    bgColor: "bg-primary/10",
    hoverBg: "hover:bg-primary/20",
  },
  {
    title: "Esthétique dentaire",
    description: "Blanchiment, facettes et harmonisation du sourire",
    icon: Sparkles,
    href: "/esthetique",
    color: "text-accent",
    bgColor: "bg-accent/10",
    hoverBg: "hover:bg-accent/20",
  },
];

const QuickLinks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">
            Nos spécialités
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Des soins experts pour votre sourire
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez nos trois domaines de spécialisation pour des soins
            dentaires de haute qualité.
          </p>
        </div>

        {/* Specialties Buttons */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <Link key={index} to={specialty.href} className="group">
                <div
                  className={`${specialty.bgColor} ${specialty.hoverBg} rounded-2xl p-8 transition-all duration-300 hover-lift shadow-soft hover:shadow-medium border-2 border-transparent hover:border-primary/20 h-full flex flex-col`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-4 ${specialty.bgColor} rounded-xl ${specialty.hoverBg}`}
                    >
                      <Icon className={`h-8 w-8 ${specialty.color}`} />
                    </div>
                    <ArrowRight
                      className={`h-6 w-6 ${specialty.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`}
                    />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {specialty.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {specialty.description}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
