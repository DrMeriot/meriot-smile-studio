import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Bone, CheckCircle2, Calendar, Shield, Clock, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import FAQSchema from "@/components/FAQSchema";
import WhyChooseUs from "@/components/WhyChooseUs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const RegenerationOsseuse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "Quel est le prix d'une régénération osseuse à Marseille ?",
      answer: "Le coût d'une régénération osseuse parodontale varie selon l'étendue de la perte osseuse et la technique utilisée. Comptez entre 500€ et 1500€ selon la complexité. Notre cabinet dentaire à Marseille vous fournit un devis détaillé après le bilan. Une partie peut être prise en charge par votre mutuelle."
    },
    {
      question: "La régénération osseuse est-elle douloureuse ?",
      answer: "L'intervention se déroule sous anesthésie locale, vous ne ressentez donc aucune douleur pendant l'acte. Les suites opératoires sont généralement bien tolérées avec un léger œdème et un inconfort modéré, bien contrôlés par les antalgiques prescrits. Notre expertise parodontale à Marseille et Aix-en-Provence garantit un traitement le plus confortable possible."
    },
    {
      question: "Combien de temps faut-il pour régénérer l'os ?",
      answer: "La régénération osseuse est un processus biologique qui prend du temps. En général, comptez 6 à 9 mois pour une intégration complète du greffon. Des contrôles radiographiques réguliers permettent de suivre l'évolution. Pendant cette période, des visites de maintenance sont programmées au cabinet de Marseille."
    },
    {
      question: "La régénération osseuse permet-elle d'éviter l'extraction ?",
      answer: "Oui, dans de nombreux cas, la régénération osseuse permet de sauver des dents condamnées par la parodontite. En reconstruisant l'os de soutien, nous pouvons stabiliser des dents mobiles et éviter l'extraction. C'est une alternative que nous proposons à nos patients de Marseille, Aubagne et de toute la région PACA."
    }
  ];

  return (
    <>
      <SEOHead
        title="Régénération Osseuse Parodontale Marseille | Dr Stéphanie Meriot"
        description="Régénération osseuse et greffes osseuses à Marseille. Reconstruction de l'os perdu par la parodontite. Biomatériaux, membranes. Formation IFPIO. ☎ 09 83 43 96 21"
        canonical="/regeneration-osseuse"
        keywords="régénération osseuse marseille, greffe osseuse dentaire, reconstruction osseuse parodontale, perte osseuse gencive, biomatériaux dentaires aix-en-provence"
      />
      <FAQSchema faqs={faqs} />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                  <Bone className="h-4 w-4" />
                  <span className="text-sm font-medium">Chirurgie parodontale</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Régénération Osseuse Parodontale à Marseille
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  La parodontite détruit l'os qui soutient vos dents. Grâce aux techniques de régénération osseuse, nous pouvons reconstruire cet os perdu et sauver des dents que d'autres auraient condamnées à l'extraction.
                </p>
                <Link to="/parodontie">
                  <Button variant="outline" className="gap-2">
                    ← Retour à la parodontie
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Comprendre la perte osseuse */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Comprendre la perte osseuse parodontale
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  La parodontite est une maladie inflammatoire qui, au-delà des gencives, attaque l'os alvéolaire – l'os qui entoure et soutient les racines de vos dents. Cette <strong>destruction osseuse progressive</strong> est irréversible sans intervention : l'os ne repousse pas spontanément.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  La perte osseuse se manifeste par :
                </p>
                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    Des dents qui deviennent mobiles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    Un déchaussement visible (racines apparentes)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    Des espaces qui se créent entre les dents
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    Une sensibilité au chaud et au froid
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Heureusement, les techniques modernes de régénération osseuse permettent aujourd'hui de reconstruire une partie de cet os perdu et de stabiliser les dents concernées.
                </p>
              </div>
            </div>
          </section>

          {/* Techniques de régénération */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Les techniques de régénération osseuse
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-4 text-primary">Greffes osseuses</h3>
                    <p className="text-muted-foreground mb-4">
                      Le comblement osseux consiste à placer un matériau de greffe dans le défaut osseux. Ce matériau peut être :
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Os autogène</strong> : prélevé sur le patient (le gold standard)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Allogreffe</strong> : os humain traité (banque d'os)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Xénogreffe</strong> : os d'origine bovine ou porcine purifié</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span><strong>Biomatériaux synthétiques</strong> : céramiques biocompatibles</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-4 text-accent">Régénération tissulaire guidée (RTG)</h3>
                    <p className="text-muted-foreground mb-4">
                      Cette technique utilise une membrane (résorbable ou non) pour créer un espace protégé où l'os peut se régénérer :
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>La membrane empêche l'envahissement par les tissus mous</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Elle permet aux cellules osseuses de coloniser le défaut</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Souvent combinée avec un matériau de comblement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Résultats prouvés par de nombreuses études (EFP)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-soft md:col-span-2">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-4 text-primary">Protéines dérivées de la matrice amélaire (Emdogain®)</h3>
                    <p className="text-muted-foreground mb-4">
                      L'Emdogain® est un gel contenant des protéines naturelles qui stimulent la régénération des tissus parodontaux. Appliqué sur les racines nettoyées, il favorise :
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">La formation de nouveau cément</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">La régénération du ligament</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">La reconstruction osseuse</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Indications */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Quand envisager une régénération osseuse ?
              </h2>
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  La régénération osseuse parodontale est indiquée dans plusieurs situations :
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Défauts osseux verticaux (poches osseuses profondes)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Dents mobiles que l'on souhaite conserver</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Lésions inter-radiculaires (furcations)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Préparation avant pose d'implants</span>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-800 dark:text-blue-200">
                      <strong>Important :</strong> La régénération osseuse n'est possible qu'après stabilisation de la maladie parodontale. Le surfaçage radiculaire doit être réalisé en premier pour éliminer l'infection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Résultats attendus */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Résultats attendus
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-soft text-center">
                  <CardContent className="pt-6">
                    <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Temps de cicatrisation</h3>
                    <p className="text-muted-foreground">6 à 9 mois pour une intégration complète du greffon osseux</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft text-center">
                  <CardContent className="pt-6">
                    <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Taux de succès</h3>
                    <p className="text-muted-foreground">70-90% de gain osseux selon le type de défaut et la technique utilisée</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft text-center">
                  <CardContent className="pt-6">
                    <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Durabilité</h3>
                    <p className="text-muted-foreground">Résultats stables dans le temps avec une maintenance parodontale régulière</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Questions fréquentes sur la régénération osseuse
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* WhyChooseUs */}
          <WhyChooseUs />

          {/* Liens silo */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Nos autres traitements parodontaux
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/laser-dentaire" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow text-center">
                  <h3 className="font-semibold mb-2">Traitement laser</h3>
                  <p className="text-sm text-muted-foreground">Décontamination des poches</p>
                </Link>
                <Link to="/greffe-gingivale" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow text-center">
                  <h3 className="font-semibold mb-2">Greffe gingivale</h3>
                  <p className="text-sm text-muted-foreground">Recouvrir les récessions</p>
                </Link>
                <Link to="/parodontite-sante-generale" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow text-center">
                  <h3 className="font-semibold mb-2">Parodontite et santé</h3>
                  <p className="text-sm text-muted-foreground">Liens avec le diabète, cœur</p>
                </Link>
                <Link to="/maintenance-parodontale" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow text-center">
                  <h3 className="font-semibold mb-2">Maintenance</h3>
                  <p className="text-sm text-muted-foreground">Suivi régulier</p>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Sauvez vos dents grâce à la régénération osseuse
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Prenez rendez-vous pour un bilan parodontal et découvrez si la régénération osseuse peut sauver vos dents.
              </p>
              <a
                href="https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary-hover">
                  <Calendar className="h-5 w-5" />
                  Prendre rendez-vous
                </Button>
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RegenerationOsseuse;
