import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle2, Calendar, Shield, Sparkles, Info } from "lucide-react";
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

const GreffeGingivale = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "Quel est le prix d'une greffe de gencive à Marseille ?",
      answer: "Le tarif d'une greffe gingivale varie selon la technique utilisée et le nombre de dents à traiter. Comptez entre 400€ et 1200€ par zone. Notre cabinet dentaire à Marseille vous fournit un devis personnalisé après examen. Certaines mutuelles remboursent une partie de ces soins de chirurgie plastique parodontale."
    },
    {
      question: "La greffe de gencive est-elle douloureuse ?",
      answer: "L'intervention se déroule sous anesthésie locale, vous ne ressentez donc aucune douleur pendant l'acte. Les suites opératoires sont généralement bien tolérées : un léger inconfort au niveau du palais (site de prélèvement) pendant quelques jours. Notre expertise parodontale à Marseille garantit un traitement le plus confortable possible."
    },
    {
      question: "Combien de temps dure la cicatrisation après une greffe ?",
      answer: "La cicatrisation initiale prend environ 2 à 3 semaines. Le résultat définitif est visible après 3 à 6 mois, le temps que la greffe s'intègre parfaitement. Pendant cette période, des visites de contrôle sont programmées au cabinet pour suivre l'évolution."
    },
    {
      question: "Peut-on traiter plusieurs dents en même temps ?",
      answer: "Oui, il est possible de traiter plusieurs récessions lors de la même intervention. Cela dépend de l'étendue des récessions et de la quantité de tissu disponible au palais. Lors de votre consultation au cabinet de Marseille, nous établissons un plan de traitement adapté à votre situation."
    }
  ];

  return (
    <>
      <SEOHead
        title="Greffe de Gencive Marseille | Chirurgie Plastique Parodontale"
        description="Greffe gingivale à Marseille. Traitement des récessions, recouvrement radiculaire. Techniques modernes et mini-invasives. ☎ 09 83 43 96 21. Dr Meriot"
        canonical="/greffe-gingivale"
        keywords="greffe gencive marseille, greffe gingivale marseille, récession gingivale, déchaussement dentaire traitement, chirurgie plastique parodontale aix-en-provence"
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
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-medium">Chirurgie plastique parodontale</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Greffe de Gencive à Marseille
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  La greffe gingivale permet de recouvrir les racines exposées et de renforcer les gencives fragilisées. Une solution durable pour retrouver un sourire esthétique et protéger vos dents.
                </p>
                <Link to="/parodontie">
                  <Button variant="outline" className="gap-2">
                    ← Retour à la parodontie
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Comprendre la récession */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Qu'est-ce qu'une récession gingivale ?
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  La récession gingivale, communément appelée "déchaussement", correspond à un <strong>retrait de la gencive</strong> qui expose progressivement la racine de la dent. Ce phénomène touche environ 50% de la population adulte.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Les causes sont multiples :
                </p>
                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <strong>Brossage traumatique</strong> : brosse trop dure, technique agressive
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <strong>Maladie parodontale</strong> : gingivite ou parodontite non traitée
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <strong>Gencive fine constitutionnelle</strong> : prédisposition génétique
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <strong>Malposition dentaire</strong> : dent en dehors de l'arcade
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <strong>Traitement orthodontique</strong> : déplacement dentaire hors de l'os
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Sans traitement, la récession continue de progresser, augmentant la sensibilité dentaire et le risque de carie radiculaire.
                </p>
              </div>
            </div>
          </section>

          {/* Symptômes */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Signes qui doivent vous alerter
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🦷</span>
                    </div>
                    <h3 className="font-semibold mb-2">Dents plus longues</h3>
                    <p className="text-muted-foreground text-sm">Les dents semblent s'allonger avec le temps</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">❄️</span>
                    </div>
                    <h3 className="font-semibold mb-2">Sensibilité au froid</h3>
                    <p className="text-muted-foreground text-sm">Douleur vive au contact du froid ou du chaud</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <h3 className="font-semibold mb-2">Racine visible</h3>
                    <p className="text-muted-foreground text-sm">Partie jaune de la racine apparente</p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📐</span>
                    </div>
                    <h3 className="font-semibold mb-2">Espaces triangulaires</h3>
                    <p className="text-muted-foreground text-sm">"Trous noirs" entre les dents</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Techniques de greffe */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Les techniques de greffe gingivale
              </h2>
              <div className="space-y-8">
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-3">Greffe épithélio-conjonctive</h3>
                        <p className="text-muted-foreground mb-4">
                          Un greffon complet (épithélium + conjonctif) est prélevé au palais et transplanté au niveau de la récession. Cette technique est idéale pour :
                        </p>
                        <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Renforcer une gencive fine
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Augmenter la gencive attachée
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Protéger autour des implants
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Prévenir les récessions futures
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                        <Sparkles className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-3">Greffe de conjonctif enfoui</h3>
                        <p className="text-muted-foreground mb-4">
                          Seul le tissu conjonctif est prélevé au palais et placé sous la gencive existante. Cette technique moderne offre :
                        </p>
                        <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            Un recouvrement radiculaire optimal
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            Un résultat esthétique naturel
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            Moins de douleur au palais
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-accent" />
                            Une cicatrisation plus rapide
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-3">Lambeau déplacé (tunnel)</h3>
                        <p className="text-muted-foreground mb-4">
                          Technique mini-invasive qui déplace la gencive existante vers la racine exposée, souvent combinée avec une greffe de conjonctif :
                        </p>
                        <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Pas d'incisions verticales visibles
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Traitement de plusieurs dents
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Récupération rapide
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Résultat esthétique excellent
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Résultats */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Résultats attendus
              </h2>
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-primary">Bénéfices immédiats</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        Recouvrement des racines exposées (80-100% selon les cas)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        Diminution ou disparition de la sensibilité
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        Amélioration esthétique du sourire
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 text-accent">Bénéfices à long terme</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        Protection durable des racines dentaires
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        Prévention des caries radiculaires
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        Stabilité des résultats dans le temps
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800 dark:text-green-200">
                      <strong>Taux de succès :</strong> Les greffes gingivales présentent un taux de succès supérieur à 90% lorsqu'elles sont réalisées par un praticien expérimenté et suivies d'une maintenance appropriée.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Questions fréquentes sur la greffe gingivale
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
                <Link to="/regeneration-osseuse" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow text-center">
                  <h3 className="font-semibold mb-2">Régénération osseuse</h3>
                  <p className="text-sm text-muted-foreground">Reconstruire l'os perdu</p>
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
                Retrouvez un sourire harmonieux
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                La greffe gingivale peut transformer votre sourire et protéger vos dents. Prenez rendez-vous pour un bilan personnalisé.
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

export default GreffeGingivale;
