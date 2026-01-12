import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle2, Calendar, Clock, Shield, AlertTriangle } from "lucide-react";
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

const MaintenanceParodontale = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "À quelle fréquence dois-je faire ma maintenance parodontale ?",
      answer: "La fréquence dépend de la sévérité de votre parodontite initiale et de votre capacité à maintenir une bonne hygiène. En général, nous recommandons une visite tous les 3 à 6 mois. Notre cabinet dentaire à Marseille adapte ce rythme à votre situation personnelle."
    },
    {
      question: "Quel est le prix d'une séance de maintenance parodontale à Marseille ?",
      answer: "Le tarif d'une séance de maintenance parodontale varie selon les soins nécessaires. Comptez entre 80€ et 150€ selon la complexité. Certaines mutuelles remboursent ces séances de prévention. Un devis vous est fourni lors de votre visite au cabinet."
    },
    {
      question: "La maintenance parodontale est-elle vraiment nécessaire ?",
      answer: "Oui, la maintenance est essentielle pour maintenir les résultats du traitement initial. Sans suivi régulier, la parodontite récidive dans 80% des cas. Les études montrent que les patients suivis régulièrement conservent leurs dents beaucoup plus longtemps que ceux qui ne font pas de maintenance."
    },
    {
      question: "Que se passe-t-il si j'arrête la maintenance parodontale ?",
      answer: "Sans maintenance, les bactéries se réinstallent progressivement et l'inflammation reprend. La parodontite peut récidiver en quelques mois à quelques années, avec reprise de la destruction osseuse. Il est donc crucial de maintenir un suivi régulier au cabinet de Marseille."
    }
  ];

  return (
    <>
      <SEOHead
        title="Maintenance Parodontale de Soutien Marseille | Dr Stéphanie Meriot"
        description="Maintenance parodontale à Marseille. Suivi régulier après traitement parodontal. Prévention des récidives, détartrage professionnel. ☎ 09 83 43 96 21"
        canonical="/maintenance-parodontale"
        keywords="maintenance parodontale marseille, suivi parodontal, prévention récidive parodontite, détartrage professionnel marseille, thérapie parodontale de soutien"
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
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-sm font-medium">Suivi à long terme</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Maintenance Parodontale de Soutien
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  La maintenance parodontale est la clé du succès à long terme. Un suivi régulier permet de stabiliser votre santé gingivale et de prévenir les récidives. Gardez vos dents pour la vie.
                </p>
                <Link to="/parodontie">
                  <Button variant="outline" className="gap-2">
                    ← Retour à la parodontie
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Pourquoi la maintenance */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Pourquoi la maintenance est-elle essentielle ?
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  La parodontite est une maladie chronique. Même après un traitement réussi, les bactéries responsables de l'infection restent présentes dans votre bouche. Sans <strong>maintenance parodontale régulière</strong>, elles peuvent recoloniser les poches et provoquer une récidive.
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="h-6 w-6 text-amber-600" />
                      <h3 className="font-bold text-lg text-amber-800 dark:text-amber-200">Sans maintenance</h3>
                    </div>
                    <ul className="space-y-2 text-amber-700 dark:text-amber-300 text-sm">
                      <li>• 80% de récidive en 5 ans</li>
                      <li>• Perte osseuse progressive</li>
                      <li>• Mobilité dentaire croissante</li>
                      <li>• Risque élevé de perte dentaire</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-6 w-6 text-green-600" />
                      <h3 className="font-bold text-lg text-green-800 dark:text-green-200">Avec maintenance</h3>
                    </div>
                    <ul className="space-y-2 text-green-700 dark:text-green-300 text-sm">
                      <li>• Stabilité des résultats</li>
                      <li>• Détection précoce des récidives</li>
                      <li>• Conservation des dents</li>
                      <li>• Santé buccale optimale</li>
                    </ul>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  La maintenance parodontale n'est pas un simple détartrage. C'est un <strong>acte médical complet</strong> qui comprend un examen clinique, un nettoyage professionnel et un renforcement de la motivation à l'hygiène.
                </p>
              </div>
            </div>
          </section>

          {/* Déroulement */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Déroulement d'une séance de maintenance
              </h2>
              <div className="space-y-6">
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Entretien et mise à jour médicale</h3>
                        <p className="text-muted-foreground">
                          Nous faisons le point sur votre état de santé général, vos traitements en cours, et votre quotidien bucco-dentaire. Avez-vous remarqué des saignements ? Des sensibilités ?
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                        <span className="text-accent font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Examen clinique complet</h3>
                        <p className="text-muted-foreground">
                          Sondage des poches parodontales, évaluation de la mobilité dentaire, vérification de l'inflammation. Nous comparons avec les données précédentes pour suivre l'évolution.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Nettoyage professionnel</h3>
                        <p className="text-muted-foreground">
                          Détartrage supra et sous-gingival, polissage des surfaces dentaires, débridement des poches si nécessaire. Nous éliminons la plaque et le tartre que vous ne pouvez pas atteindre seul.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                        <span className="text-accent font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Éducation thérapeutique</h3>
                        <p className="text-muted-foreground">
                          Nous révisons avec vous les techniques de brossage, l'utilisation des brossettes inter-dentaires, et adaptons vos outils d'hygiène si besoin. La motivation est clé !
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                        <span className="text-primary font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Programmation du prochain rendez-vous</h3>
                        <p className="text-muted-foreground">
                          En fonction de vos résultats et de votre risque individuel, nous définissons ensemble la fréquence optimale de vos visites de maintenance.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Fréquence */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Quelle fréquence pour votre maintenance ?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-soft border-primary/20">
                  <CardContent className="pt-6 text-center">
                    <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Tous les 3 mois</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Parodontite sévère ou mal contrôlée, diabète, fumeurs, risque élevé de récidive
                    </p>
                    <div className="bg-primary/10 rounded-lg p-2">
                      <span className="text-primary text-sm font-medium">4 visites / an</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft border-accent/20">
                  <CardContent className="pt-6 text-center">
                    <Clock className="h-10 w-10 text-accent mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Tous les 4-6 mois</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Parodontite modérée stabilisée, bonne hygiène, compliance satisfaisante
                    </p>
                    <div className="bg-accent/10 rounded-lg p-2">
                      <span className="text-accent text-sm font-medium">2-3 visites / an</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">Tous les 6-12 mois</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Parodontite légère traitée, excellente hygiène, faible risque de récidive
                    </p>
                    <div className="bg-muted rounded-lg p-2">
                      <span className="text-muted-foreground text-sm font-medium">1-2 visites / an</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-8 bg-blue-50 dark:bg-blue-950/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-200 text-center">
                  <strong>Important :</strong> La fréquence est personnalisée et peut évoluer dans le temps. Nous réévaluons régulièrement vos besoins en fonction de votre réponse au traitement.
                </p>
              </div>
            </div>
          </section>

          {/* Bénéfices */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Les bénéfices prouvés de la maintenance
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Conservation des dents</h3>
                    <p className="text-muted-foreground text-sm">
                      Les études montrent que les patients en maintenance perdent 10x moins de dents
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Stabilité osseuse</h3>
                    <p className="text-muted-foreground text-sm">
                      Arrêt de la perte osseuse et stabilisation du support dentaire
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Détection précoce</h3>
                    <p className="text-muted-foreground text-sm">
                      Toute récidive est détectée et traitée avant qu'elle ne s'aggrave
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Économies à long terme</h3>
                    <p className="text-muted-foreground text-sm">
                      Moins de traitements lourds et coûteux grâce à la prévention
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Questions fréquentes sur la maintenance parodontale
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
                <Link to="/greffe-gingivale" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow text-center">
                  <h3 className="font-semibold mb-2">Greffe gingivale</h3>
                  <p className="text-sm text-muted-foreground">Recouvrir les récessions</p>
                </Link>
                <Link to="/parodontite-sante-generale" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-lg transition-shadow text-center">
                  <h3 className="font-semibold mb-2">Parodontite et santé</h3>
                  <p className="text-sm text-muted-foreground">Liens diabète, cœur</p>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Maintenez vos résultats parodontaux
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                La maintenance parodontale est l'investissement le plus rentable pour garder vos dents toute votre vie. Prenez rendez-vous pour votre prochaine visite.
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

export default MaintenanceParodontale;
