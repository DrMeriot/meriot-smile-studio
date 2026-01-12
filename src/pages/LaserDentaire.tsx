import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2, Calendar, Shield, Clock, Sparkles } from "lucide-react";
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

const LaserDentaire = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "Le traitement laser des gencives est-il douloureux ?",
      answer: "Non, le traitement laser est généralement indolore. L'action du laser est ciblée et précise, ce qui minimise les traumatismes tissulaires. Une anesthésie locale légère peut être utilisée pour un confort optimal. Les patients de notre cabinet dentaire à Marseille témoignent d'un traitement beaucoup plus confortable que les méthodes traditionnelles."
    },
    {
      question: "Est-ce que le traitement laser est remboursé ?",
      answer: "Le traitement laser n'est pas directement remboursé par la Sécurité sociale. Cependant, certaines mutuelles prennent en charge une partie des frais. Notre cabinet dentaire à Marseille vous fournit un devis détaillé pour votre demande de prise en charge. Dans le cadre de certaines ALD, des remboursements sont possibles."
    },
    {
      question: "Combien de séances de laser sont nécessaires ?",
      answer: "Le nombre de séances dépend de la sévérité de la maladie parodontale. En général, 1 à 4 séances espacées de quelques semaines suffisent. Lors de votre consultation au cabinet à Marseille ou Aix-en-Provence, nous établissons un plan de traitement personnalisé avec le nombre exact de séances."
    },
    {
      question: "Quels sont les avantages du laser par rapport au surfaçage classique ?",
      answer: "Le laser offre plusieurs avantages : action bactéricide immédiate, biostimulation de la cicatrisation, moins de saignements, moins de douleurs post-opératoires, et une récupération plus rapide. C'est une technique de pointe que nous proposons à nos patients de Marseille, Aubagne et de toute la région PACA."
    }
  ];

  return (
    <>
      <SEOHead
        title="Traitement Laser des Gencives Marseille | Dr Stéphanie Meriot"
        description="Traitement laser parodontal à Marseille. Décontamination bactérienne, biostimulation tissulaire. Technique indolore et efficace. Patients d'Aix-en-Provence, Aubagne bienvenus. ☎ 09 83 43 96 21"
        canonical="/laser-dentaire"
        keywords="laser dentaire marseille, laser gencives marseille, traitement laser parodontite, décontamination laser, laser parodontal aix-en-provence"
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
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">Technologie de pointe</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Traitement Laser des Gencives à Marseille
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  Le laser parodontal représente une avancée majeure dans le traitement des maladies des gencives. Action bactéricide ciblée, biostimulation tissulaire et confort optimal pour nos patients de Marseille et de toute la région PACA.
                </p>
                <Link to="/parodontie">
                  <Button variant="outline" className="gap-2">
                    ← Retour à la parodontie
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Qu'est-ce que le laser parodontal */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Qu'est-ce que le traitement laser parodontal ?
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Le traitement laser des gencives utilise une lumière concentrée de haute énergie pour éliminer les bactéries responsables de la parodontite et de la gingivite. Cette technologie permet une <strong>décontamination profonde des poches parodontales</strong> sans les inconvénients des techniques mécaniques traditionnelles.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Le laser agit à plusieurs niveaux : il détruit sélectivement les bactéries pathogènes, stimule la régénération des tissus (biostimulation), et favorise la cicatrisation. Cette action combinée permet d'obtenir des résultats durables avec un confort de traitement incomparable.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Au cabinet dentaire de Marseille, nous utilisons le laser en complément du surfaçage radiculaire pour une efficacité maximale. Cette approche combinée est particulièrement recommandée pour les parodontites modérées à sévères.
                </p>
              </div>
            </div>
          </section>

          {/* Avantages du laser */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Les avantages du traitement laser
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Action bactéricide puissante</h3>
                        <p className="text-muted-foreground">
                          Le laser élimine jusqu'à 99% des bactéries pathogènes dans les poches parodontales, là où les instruments mécaniques ne peuvent pas atteindre.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Biostimulation tissulaire</h3>
                        <p className="text-muted-foreground">
                          Le laser stimule les cellules et accélère la cicatrisation naturelle des tissus gingivaux, favorisant une guérison plus rapide.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Traitement indolore</h3>
                        <p className="text-muted-foreground">
                          L'action ciblée du laser minimise les traumatismes tissulaires. Les patients ressentent peu ou pas de douleur pendant et après le traitement.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Récupération rapide</h3>
                        <p className="text-muted-foreground">
                          Moins de saignements, moins d'œdème post-opératoire. Reprise des activités normales dès le lendemain dans la plupart des cas.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Précision maximale</h3>
                        <p className="text-muted-foreground">
                          Le laser cible uniquement les tissus malades et les bactéries, préservant intégralement les tissus sains environnants.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Résultats durables</h3>
                        <p className="text-muted-foreground">
                          L'élimination en profondeur des bactéries et la stimulation de la cicatrisation permettent d'obtenir des résultats stables dans le temps.
                        </p>
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
                Pour qui est indiqué le traitement laser ?
              </h2>
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Le traitement laser parodontal est particulièrement recommandé pour :
                </p>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Les <strong>parodontites modérées à sévères</strong> avec poches profondes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Les patients présentant une <strong>gingivite récidivante</strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Les cas où le <strong>surfaçage classique</strong> n'a pas donné de résultats suffisants
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Les patients recherchant un <strong>traitement moins invasif</strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    La <strong>maintenance parodontale</strong> après un traitement initial
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Lors de votre consultation au cabinet à Marseille, nous évaluons si le traitement laser est adapté à votre situation et vous proposons un plan de soins personnalisé.
                </p>
              </div>
            </div>
          </section>

          {/* Déroulement */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Déroulement du traitement laser
              </h2>
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">1</span>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Bilan parodontal complet</h3>
                      <p className="text-muted-foreground">
                        Examen clinique, sondage des poches, radiographies. Nous établissons un diagnostic précis et un plan de traitement adapté.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">2</span>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Surfaçage radiculaire</h3>
                      <p className="text-muted-foreground">
                        Nettoyage mécanique des racines sous anesthésie locale pour éliminer le tartre sous-gingival.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">3</span>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Application du laser</h3>
                      <p className="text-muted-foreground">
                        Le laser est introduit dans chaque poche parodontale pour décontaminer en profondeur et stimuler la cicatrisation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">4</span>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Suivi et maintenance</h3>
                      <p className="text-muted-foreground">
                        Contrôle de cicatrisation à 6-8 semaines, puis visites d'entretien régulières pour maintenir les résultats dans le temps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Questions fréquentes sur le laser parodontal
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
                <Link to="/regeneration-osseuse" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow text-center">
                  <h3 className="font-semibold mb-2">Régénération osseuse</h3>
                  <p className="text-sm text-muted-foreground">Reconstruire l'os perdu</p>
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
                Découvrez le traitement laser parodontal
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Prenez rendez-vous pour un bilan parodontal et découvrez si le traitement laser est adapté à votre situation.
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

export default LaserDentaire;
