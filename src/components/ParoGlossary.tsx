import { BookOpen } from "lucide-react";
import { Head } from "vite-react-ssg";

// Slug ASCII pour les ancres URL (#poche-parodontale, #greffe-gingivale…).
// Permet le partage de définitions ciblées et la capture de featured snippets
// sur les requêtes "qu'est-ce que la poche parodontale" etc.
const slugify = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const glossaryTerms = [
  { term: "Alvéolyse", definition: "Destruction de l'os alvéolaire entourant la dent, signe majeur de la parodontite." },
  { term: "Biofilm buccal", definition: "Communauté bactérienne organisée (plaque dentaire) responsable de l'inflammation gingivale." },
  { term: "Biotype gingival", definition: "Caractéristique d'épaisseur de la gencive (fin ou épais) qui conditionne le risque de récession et la stratégie chirurgicale." },
  { term: "Cément", definition: "Tissu recouvrant la racine dentaire, cible du surfaçage radiculaire." },
  { term: "Déchaussement dentaire", definition: "Rétraction de la gencive exposant la racine, souvent causée par une parodontite ou un brossage agressif." },
  { term: "Dysbiose", definition: "Déséquilibre de la flore bactérienne buccale menant à la maladie parodontale." },
  { term: "Gingivite", definition: "Inflammation réversible de la gencive, premier stade de la maladie parodontale." },
  { term: "Greffe gingivale", definition: "Chirurgie visant à recouvrir une racine exposée ou épaissir la gencive fragilisée." },
  { term: "Halitose", definition: "Mauvaise haleine chronique, souvent liée à des bactéries sous-gingivales." },
  { term: "Lambeau parodontal", definition: "Décollement chirurgical contrôlé de la gencive permettant un accès direct aux racines et à l'os pour les assainir." },
  { term: "Ligament parodontal", definition: "Tissu conjonctif reliant la dent à l'os alvéolaire, assurant l'ancrage dentaire." },
  { term: "Maintenance parodontale", definition: "Suivi régulier après traitement pour prévenir les récidives de la maladie." },
  { term: "Mobilité dentaire", definition: "Mouvement anormal d'une dent dans son alvéole, signe de perte osseuse avancée." },
  { term: "Parodonte", definition: "Ensemble des tissus de soutien de la dent : gencive, os, cément et ligament." },
  { term: "Parodontite", definition: "Maladie inflammatoire détruisant les tissus de soutien de la dent, pouvant mener à sa perte." },
  { term: "Poche parodontale", definition: "Espace pathologique entre la gencive et la dent où s'accumulent les bactéries." },
  { term: "Récession gingivale", definition: "Retrait de la gencive vers la racine, exposant une partie normalement recouverte." },
  { term: "Régénération tissulaire guidée (RTG)", definition: "Technique chirurgicale favorisant la repousse de l'os et du ligament parodontal." },
  { term: "Sondage parodontal", definition: "Examen mesurant la profondeur des poches pour évaluer la sévérité de la maladie." },
  { term: "Surfaçage radiculaire", definition: "Thérapeutique non chirurgicale visant à assainir la racine dentaire sous la gencive." },
  { term: "Tartre sous-gingival", definition: "Dépôt calcifié situé sous la gencive, réservoir de bactéries pathogènes." },
];

const SITE = "https://www.dr-meriot-chirurgien-dentiste.fr";

const ParoGlossary = () => {
  // Schema.org DefinedTermSet — décrit explicitement à Google que cette section
  // est un glossaire structuré, ce qui peut alimenter les featured snippets de
  // type "définition" sur les requêtes informationnelles courtes.
  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE}/parodontie#glossaire`,
    name: "Glossaire de la parodontie",
    description:
      "Lexique des principaux termes utilisés en parodontologie pour comprendre le diagnostic et le traitement des maladies des gencives.",
    inLanguage: "fr-FR",
    hasDefinedTerm: glossaryTerms.map((t) => {
      const slug = slugify(t.term);
      return {
        "@type": "DefinedTerm",
        "@id": `${SITE}/parodontie#${slug}`,
        name: t.term,
        description: t.definition,
        inDefinedTermSet: `${SITE}/parodontie#glossaire`,
      };
    }),
  };

  return (
    <section className="py-20 bg-muted/30" id="glossaire">
      <Head>
        <script type="application/ld+json">{JSON.stringify(definedTermSetSchema)}</script>
      </Head>
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
          {glossaryTerms.map((item) => {
            const slug = slugify(item.term);
            return (
              <div
                key={item.term}
                id={slug}
                className="bg-card rounded-xl p-6 shadow-soft border border-border/50 hover:border-primary/30 transition-colors scroll-mt-24"
              >
                <dt className="font-bold text-lg text-primary mb-2">
                  <a href={`#${slug}`} className="hover:underline" aria-label={`Lien vers la définition de ${item.term}`}>
                    {item.term}
                  </a>
                </dt>
                <dd className="text-muted-foreground leading-relaxed">
                  {item.definition}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};

export default ParoGlossary;
