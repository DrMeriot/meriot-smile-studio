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
];

const QuickLinks = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30 -mt-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <span className="text-primary font-semibold text-base uppercase tracking-wide">
            ✨ Découvrez nos spécialités
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Accès direct à nos expertises
          </h2>
        </div>

        {/* Specialties Cards - Plus grandes et visibles */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <Link 
                key={index} 
                to={specialty.href} 
                className="group block transform transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`bg-card rounded-3xl p-10 shadow-medium hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-4 ${
                    index === 0 ? 'border-accent/30' : index === 1 ? 'border-primary/30' : 'border-accent/30'
                  } hover:border-primary transition-all duration-300 h-full flex flex-col cursor-pointer`}
                >
                  <div className="flex flex-col items-center text-center mb-6">
                    <div
                      className={`p-5 ${specialty.bgColor} rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`h-10 w-10 ${specialty.color}`} />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {specialty.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">
                      {specialty.description}
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className={`w-full text-base font-semibold gap-2 mt-auto ${
                      index === 0 
                        ? 'bg-accent hover:bg-accent/90' 
                        : index === 1 
                        ? 'bg-primary hover:bg-primary-hover' 
                        : 'bg-accent hover:bg-accent/90'
                    }`}
                  >
                    Découvrir
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Ligne de séparation décorative */}
        <div className="mt-16 mb-8 flex items-center justify-center">
          <div className="h-px bg-border w-32"></div>
          <div className="mx-4 text-muted-foreground text-sm">ou explorez</div>
          <div className="h-px bg-border w-32"></div>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
