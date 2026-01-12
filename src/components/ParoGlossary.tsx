import { BookOpen } from "lucide-react";

const glossaryTerms = [
  {
    term: "Alvéolyse",
    definition: "Destruction de l'os alvéolaire entourant la dent, signe majeur de la parodontite."
  },
  {
    term: "Biofilm buccal",
    definition: "Communauté bactérienne organisée (plaque dentaire) responsable de l'inflammation gingivale."
  },
  {
    term: "Cément",
    definition: "Tissu recouvrant la racine dentaire, cible du surfaçage radiculaire."
  },
  {
    term: "Dysbiose",
    definition: "Déséquilibre de la flore bactérienne buccale menant à la maladie parodontale."
  },
  {
    term: "Poche parodontale",
    definition: "Espace pathologique entre la gencive et la dent où s'accumulent les bactéries."
  },
  {
    term: "Surfaçage radiculaire",
    definition: "Thérapeutique non chirurgicale visant à assainir la racine dentaire."
  }
];

const ParoGlossary = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium">Lexique</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Glossaire de la Parodontie
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprendre les termes clés utilisés en parodontologie pour mieux appréhender votre traitement.
          </p>
        </div>

        <dl className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {glossaryTerms.map((item) => (
            <div
              key={item.term}
              className="bg-card rounded-xl p-6 shadow-soft border border-border/50 hover:border-primary/30 transition-colors"
            >
              <dt className="font-bold text-lg text-primary mb-2">
                {item.term}
              </dt>
              <dd className="text-muted-foreground leading-relaxed">
                {item.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default ParoGlossary;
