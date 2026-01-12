import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Zap, ArrowRight } from "lucide-react";

const QuickLinks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 -mt-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary font-semibold text-base uppercase tracking-wide">
            ✨ Découvrez nos spécialités
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Accès direct à nos expertises
          </h2>
        </div>

        {/* Parodontie Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-medium border-2 border-accent/20 hover:border-accent/40 transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Icon & Title */}
              <div className="flex flex-col items-center lg:items-start lg:min-w-[200px]">
                <div className="p-5 bg-accent/10 rounded-2xl mb-4">
                  <Heart className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Parodontie
                </h3>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-xl md:text-2xl font-semibold text-accent mb-4">
                  Des gencives saines pour un sourire durable
                </h4>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Les maladies parodontales commencent souvent par une simple gingivite : 
                    <strong className="text-foreground"> gencives rouges, sensibles ou qui saignent</strong>. 
                    Bien traitée, elle disparaît rapidement.
                  </p>
                  <p>
                    Sans prise en charge, elle peut évoluer en <strong className="text-foreground">parodontite</strong>, 
                    une atteinte plus profonde pouvant entraîner un déchaussement des dents.
                  </p>
                  <p>
                    Grâce à des traitements spécialisés, il est possible de stopper la maladie 
                    et <strong className="text-foreground">préserver votre sourire</strong>.
                  </p>
                </div>
                <Link to="/parodontie" className="inline-block mt-6">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold gap-2">
                    Découvrir la parodontie
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Implantologie Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-medium border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Icon & Title */}
              <div className="flex flex-col items-center lg:items-start lg:min-w-[200px]">
                <div className="p-5 bg-primary/10 rounded-2xl mb-4">
                  <Zap className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Implantologie
                </h3>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                  Retrouvez un sourire complet et fonctionnel
                </h4>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Une dent manquante affecte votre <strong className="text-foreground">sourire, votre mastication</strong> et 
                    peut entraîner un déplacement des dents voisines.
                  </p>
                  <p>
                    L'<strong className="text-foreground">implant dentaire</strong> offre une solution fixe et durable, 
                    ancrée dans l'os comme une racine naturelle.
                  </p>
                  <p>
                    Retrouvez <strong className="text-foreground">confort et esthétique</strong> sans compromettre 
                    les dents saines adjacentes.
                  </p>
                </div>
                <Link to="/implantologie" className="inline-block mt-6">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover text-white font-semibold gap-2">
                    Découvrir l'implantologie
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
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
