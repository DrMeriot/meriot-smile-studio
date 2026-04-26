import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSanityPage } from "@/hooks/useSanityContent";

const defaultSpecialties = [
  { title: "Parodontie", description: "Soins des gencives et des tissus de soutien des dents", href: "/parodontie" },
  { title: "Implantologie", description: "Remplacement durable de vos dents manquantes", href: "/implantologie" },
];

const QuickLinks = () => {
  const { data: accueil } = useSanityPage("accueil");
  // Spécialités mises en avant : Parodontie + Implantologie uniquement.
  // On ignore volontairement accueil?.specialites pour éviter qu'une entrée CMS
  // résiduelle (ex: "Esthétique dentaire") ne réapparaisse sur l'accueil.
  const items = defaultSpecialties;
  const label = accueil?.quicklinksLabel ?? "✨ Découvrez nos spécialités";
  const titre = accueil?.quicklinksTitle ?? "Accès direct à nos expertises";

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30 -mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <span className="text-primary font-semibold text-base uppercase tracking-wide">
            {label}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            {titre}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {items.map((specialty: { title?: string; titre?: string; description?: string; href?: string }, index: number) => (
            <Link
              key={index}
              to={specialty.href ?? "/services"}
              className="group block transform transition-all duration-300 hover:scale-105"
            >
              <div
                className={`bg-card rounded-3xl p-10 shadow-medium hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-4 ${
                  index === 0 ? "border-accent/30" : "border-primary/30"
                } hover:border-primary transition-all duration-300 h-full flex flex-col cursor-pointer`}
              >
                <div className="flex flex-col items-center text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {specialty.titre ?? specialty.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {specialty.description}
                  </p>
                </div>
                <Button
                  size="lg"
                  className={`w-full text-base font-semibold gap-2 mt-auto ${
                    index === 0 ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary-hover"
                  }`}
                >
                  Découvrir
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 mb-2 flex items-center justify-center">
          <div className="h-px bg-border w-32"></div>
          <div className="mx-4 text-muted-foreground text-sm">ou explorez</div>
          <div className="h-px bg-border w-32"></div>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
