import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Calendar, AlertTriangle, Shield, BookOpen } from "lucide-react";
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

const ParodontiteSante = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      question: "La parodontite peut-elle vraiment affecter le cœur ?",
      answer: "Oui, de nombreuses études scientifiques (notamment celles de l'European Federation of Periodontology - EFP) ont démontré un lien entre parodontite et maladies cardiovasculaires. Les bactéries parodontales peuvent passer dans le sang et provoquer une inflammation systémique qui favorise l'athérosclérose. Traiter vos gencives à Marseille, c'est aussi protéger votre cœur."
    },
    {
      question: "Quel est le lien entre diabète et parodontite ?",
      answer: "Le lien est bidirectionnel : le diabète augmente le risque de parodontite (x3), et la parodontite non traitée déséquilibre le diabète. Les études montrent que traiter la parodontite peut améliorer le contrôle glycémique (HbA1c). Notre cabinet dentaire à Marseille prend en charge les patients diabétiques avec une attention particulière."
    },
    {
      question: "La parodontite est-elle dangereuse pendant la grossesse ?",
      answer: "Oui, la parodontite non traitée augmente le risque de naissance prématurée et de bébé de faible poids. Les hormones de grossesse peuvent aussi aggraver une gingivite existante. Nous recommandons un bilan parodontal avant ou en début de grossesse pour protéger la mère et l'enfant."
    },
    {
      question: "Comment savoir si ma parodontite affecte ma santé générale ?",
      answer: "Les marqueurs d'inflammation (CRP) sont souvent élevés chez les patients atteints de parodontite sévère. Un bilan sanguin peut révéler ces anomalies. Lors de votre consultation au cabinet de Marseille, nous évaluons votre état parodontal et discutons des implications pour votre santé générale."
    }
  ];

  return (
    <>
      <SEOHead
        title="Parodontite et Santé Générale | Diabète, Cœur | Marseille"
        description="Liens entre parodontite et santé générale : diabète, maladies cardiaques, grossesse. Études EFP. Cabinet dentaire Marseille spécialisé en parodontologie. ☎ 09 83 43 96 21"
        canonical="/parodontite-sante-generale"
        keywords="parodontite diabète, parodontite cœur, parodontite grossesse, inflammation chronique gencives, santé bucco-dentaire marseille, EFP études parodontologie"
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
                  <Activity className="h-4 w-4" />
                  <span className="text-sm font-medium">Médecine bucco-dentaire</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Parodontite et Santé Générale
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  La santé de vos gencives influence tout votre organisme. Découvrez les liens scientifiquement prouvés entre parodontite et maladies systémiques : diabète, maladies cardiovasculaires, complications de grossesse...
                </p>
                <Link to="/parodontie">
                  <Button variant="outline" className="gap-2">
                    ← Retour à la parodontie
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                La bouche, miroir de votre santé
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  La parodontite n'est pas qu'une maladie locale des gencives. C'est une <strong>maladie inflammatoire chronique</strong> qui peut avoir des répercussions sur l'ensemble de l'organisme. Les bactéries responsables de l'infection et les médiateurs de l'inflammation peuvent passer dans le sang et affecter d'autres organes.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Depuis plus de 20 ans, la recherche scientifique internationale – notamment les travaux de l'<strong>European Federation of Periodontology (EFP)</strong> – a mis en évidence des associations significatives entre la parodontite et plusieurs maladies systémiques.
                </p>
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                  <p className="text-primary font-medium">
                    <strong>Chiffre clé :</strong> Les personnes atteintes de parodontite sévère ont un risque cardiovasculaire augmenté de 25 à 50% par rapport à celles ayant des gencives saines (EFP, 2020).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Diabète */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm font-medium">Relation bidirectionnelle</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Parodontite et Diabète
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Le lien entre parodontite et diabète est l'un des mieux documentés en médecine bucco-dentaire. Il s'agit d'une <strong>relation bidirectionnelle</strong> :
                  </p>
                  <ul className="space-y-3 text-muted-foreground mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      Le diabète <strong>multiplie par 3</strong> le risque de développer une parodontite
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      La parodontite non traitée <strong>déséquilibre le diabète</strong> en augmentant la résistance à l'insuline
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">→</span>
                      Traiter la parodontite peut <strong>améliorer l'HbA1c</strong> de 0,3 à 0,4%
                    </li>
                  </ul>
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      <strong>À noter :</strong> Les traitements parodontaux sont remboursés par la Sécurité sociale pour les patients diabétiques en ALD.
                    </p>
                  </div>
                </div>
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-4">Recommandations pour les diabétiques</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        Bilan parodontal annuel systématique
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        Détartrage tous les 3-4 mois si parodontite
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        Hygiène bucco-dentaire rigoureuse
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        Coordination diabétologue / parodontiste
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        Traitement parodontal rapide si nécessaire
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Maladies cardiovasculaires */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Card className="shadow-soft order-2 md:order-1">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-4">Mécanismes impliqués</h3>
                    <ul className="space-y-4 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary font-bold text-sm">1</span>
                        </div>
                        <div>
                          <strong>Bactériémie</strong> : les bactéries parodontales passent dans le sang lors du brossage ou de la mastication
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary font-bold text-sm">2</span>
                        </div>
                        <div>
                          <strong>Inflammation systémique</strong> : élévation des marqueurs inflammatoires (CRP, IL-6)
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary font-bold text-sm">3</span>
                        </div>
                        <div>
                          <strong>Athérosclérose</strong> : formation de plaques dans les artères favorisée par l'inflammation chronique
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-medium">Études EFP 2020</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Parodontite et Maladies Cardiovasculaires
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Les études de l'European Federation of Periodontology ont démontré que la parodontite est un <strong>facteur de risque indépendant</strong> des maladies cardiovasculaires :
                  </p>
                  <ul className="space-y-3 text-muted-foreground mb-6">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      Risque d'infarctus augmenté de 25-50%
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      Risque d'AVC augmenté chez les patients avec parodontite sévère
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      Association avec l'hypertension artérielle
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    Traiter vos gencives, c'est aussi prendre soin de votre cœur.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Grossesse */}
          <section className="py-20 bg-accent/5">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-medium">Santé maternelle</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Parodontite et Grossesse
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  La grossesse modifie l'équilibre hormonal et peut aggraver une gingivite existante. Une parodontite non traitée présente des risques pour la mère et l'enfant.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-soft border-amber-200 dark:border-amber-800">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-4 text-amber-600 dark:text-amber-400">Risques associés</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        Naissance prématurée (risque x2 à x7)
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        Bébé de faible poids à la naissance
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        Risque de pré-éclampsie augmenté
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        Gingivite gravidique (inflammation hormonale)
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="shadow-soft border-green-200 dark:border-green-800">
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-xl mb-4 text-green-600 dark:text-green-400">Recommandations</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        Bilan parodontal avant ou en début de grossesse
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        Traitement parodontal possible au 2ème trimestre
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        Détartrages réguliers pendant la grossesse
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        Hygiène bucco-dentaire renforcée
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Autres liens */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Autres associations documentées
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Polyarthrite rhumatoïde</h3>
                    <p className="text-muted-foreground text-sm">
                      Mécanismes inflammatoires communs. Certaines bactéries parodontales (P. gingivalis) impliquées dans l'auto-immunité articulaire.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Maladie d'Alzheimer</h3>
                    <p className="text-muted-foreground text-sm">
                      Études récentes montrant la présence de bactéries parodontales dans le cerveau de patients atteints. Recherches en cours.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Maladies respiratoires</h3>
                    <p className="text-muted-foreground text-sm">
                      Bactéries buccales aspirées pouvant aggraver pneumopathies et BPCO, notamment chez les personnes âgées.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Questions fréquentes
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
                Nos traitements parodontaux
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
                Protégez vos gencives, protégez votre santé
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Un bilan parodontal complet permet de dépister et traiter précocement les maladies des gencives. Prenez soin de votre santé globale.
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

export default ParodontiteSante;
