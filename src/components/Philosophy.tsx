import { Heart, Users, Shield, MessageCircle } from "lucide-react";
import { useSanityPage, useGlobalSettings } from "@/hooks/useSanityContent";

const defaultValues = [
  { icon: Heart, title: "Écoute et bienveillance", description: "Chaque patient est unique. Je prends le temps de comprendre vos besoins et vos préoccupations pour vous proposer des soins adaptés." },
  { icon: MessageCircle, title: "Explications claires", description: "Je vous explique chaque étape de vos soins avec des mots simples, pour que vous soyez pleinement informé et rassuré." },
  { icon: Shield, title: "Dentisterie à minima", description: "Ma philosophie : préserver au maximum vos tissus naturels tout en garantissant des soins efficaces et durables." },
  { icon: Users, title: "Approche personnalisée", description: "Je respecte votre rythme et prends en compte votre anxiété éventuelle. Votre confort est ma priorité." },
];

const Philosophy = () => {
  const { data: accueil } = useSanityPage("accueil");
  const { data: global } = useGlobalSettings();
  const nom = global?.nom_praticien ?? "Dr Stéphanie Meriot";

  // Flat fields from Sanity
  const titre = accueil?.philosophieTitle ?? "Une dentisterie à l'écoute et respectueuse";
  const description = accueil?.philosophieDescription ?? "Mon approche repose sur quatre piliers fondamentaux pour vous offrir des soins de qualité dans un climat de confiance.";
  const citation = accueil?.philosophieCitation ?? "Votre sourire mérite une attention particulière. Je m'engage à vous offrir des soins de qualité dans un environnement chaleureux et rassurant.";
  const values = accueil?.philosophieValeurs ?? defaultValues;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">Ma philosophie</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            {titre}
          </h2>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {values.map((value: { icon?: typeof Heart; title?: string; titre?: string; description?: string }, index: number) => {
            const Icon = defaultValues[index]?.icon ?? Heart;
            return (
              <div key={index} className="flex gap-6 p-6 rounded-2xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 hover-lift">
                <div className="flex-shrink-0">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{value.titre ?? value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl font-medium italic text-foreground leading-relaxed">
            "{citation}"
          </blockquote>
          <p className="mt-6 text-primary font-semibold">— {nom}</p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
