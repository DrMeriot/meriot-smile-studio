import { useEffect } from "react";
import { usePageContent } from "@/hooks/usePageContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2, Calendar, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";

const Implantologie = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Implants Dentaires Marseille & PACA | Dr Stéphanie Meriot - Implantologie"
        description="Implants dentaires à Marseille et 50km : Aix-en-Provence, Aubagne, La Ciotat, Martigues, Istres, Salon-de-Provence. Formation IFPIO. ☎ 09 83 43 96 21"
        canonical="/implantologie"
        keywords="implantologie marseille, implant dentaire aix-en-provence, pose implant aubagne, implant la ciotat, chirurgie implantaire vitrolles, implantologue cassis, implants marignane, prothèse sur implant gardanne, implants dentaires martigues, implantologie istres, salon-de-provence, allauch, plan-de-cuques, les pennes-mirabeau, septèmes-les-vallons, bouc-bel-air, cabriès, simiane-collongue, meyreuil, fuveau, rousset, éguilles, ventabren, carry-le-rouet, sausset-les-pins, ensuès-la-redonne, châteauneuf-les-martigues, gignac-la-nerthe, gémenos, carnoux, roquefort-la-bédoule, ceyreste, roquevaire, auriol, la destrousse, peypin, la bouilladisse, trets, saint-maximin, fos-sur-mer, port-de-bouc, berre-l'étang, rognac, velaux, miramas, saint-chamas, saint-mitre-les-remparts, pélissanne, lançon-provence, la fare-les-oliviers, coudoux, eyguières, lambesc, grans, PACA"
      />
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
                <span className="text-sm font-medium">Spécialité</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Implantologie à Marseille
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Solution moderne et durable pour remplacer vos dents manquantes.
                Formation spécialisée à l'IFPIO Marseille pour vous offrir des
                implants de qualité et un suivi personnalisé.
              </p>
            </div>
          </div>
        </section>

        {/* Qu'est-ce qu'un implant */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Qu'est-ce qu'un implant dentaire ?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Un implant dentaire est une{" "}
                <strong>racine artificielle en titane</strong> qui est placée
                chirurgicalement dans l'os de la mâchoire. Il sert de support
                solide et durable pour une couronne, un bridge ou une prothèse
                complète.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Le titane est un matériau biocompatible qui s'intègre
                naturellement à l'os (ostéo-intégration), offrant une stabilité
                comparable à celle d'une dent naturelle. Avec un bon entretien,
                un implant peut durer toute une vie.
              </p>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Les avantages des implants dentaires
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Solution durable
                      </h3>
                      <p className="text-muted-foreground">
                        Contrairement aux prothèses amovibles, l'implant est fixe
                        et peut durer toute une vie avec un bon entretien.
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
                      <h3 className="font-semibold text-lg mb-2">
                        Préserve l'os de la mâchoire
                      </h3>
                      <p className="text-muted-foreground">
                        L'implant stimule l'os, évitant sa résorption (perte
                        osseuse) qui survient naturellement après la perte d'une
                        dent.
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
                      <h3 className="font-semibold text-lg mb-2">
                        Confort et esthétique
                      </h3>
                      <p className="text-muted-foreground">
                        L'implant se comporte comme une dent naturelle : aucune
                        gêne, apparence naturelle, confort total.
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
                      <h3 className="font-semibold text-lg mb-2">
                        Pas de dommage aux dents adjacentes
                      </h3>
                      <p className="text-muted-foreground">
                        Contrairement au bridge, on ne touche pas aux dents
                        voisines pour remplacer une dent manquante.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Les étapes */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Les étapes de la pose d'implant
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Consultation et bilan
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Examen clinique complet, radiographies 3D (scanner) pour
                    évaluer la qualité et la quantité d'os disponible. Nous
                    établissons ensemble un plan de traitement personnalisé et un
                    devis détaillé.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                  <span className="text-accent font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Préparation (si nécessaire)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Si le volume osseux est insuffisant, une greffe osseuse peut
                    être nécessaire avant ou pendant la pose d'implant. Je vous
                    explique cette étape en détail si elle s'applique à votre
                    cas.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Pose de l'implant
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Intervention chirurgicale sous anesthésie locale (indolore).
                    L'implant en titane est inséré dans l'os de la mâchoire. La
                    durée varie selon le nombre d'implants (30 min à 1h en
                    moyenne par implant).
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                  <span className="text-accent font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Période de cicatrisation
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    L'implant doit s'intégrer à l'os (ostéo-intégration). Cette
                    phase dure généralement 3 à 6 mois. Une prothèse provisoire
                    peut être mise en place pour l'esthétique et la fonction.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <span className="text-primary font-bold text-xl">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Pose de la couronne
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Une fois l'implant parfaitement intégré, je prends les
                    empreintes pour réaliser votre couronne définitive sur mesure.
                    Elle est ensuite fixée sur l'implant. Vous retrouvez une dent
                    fonctionnelle et esthétique.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                  <span className="text-accent font-bold text-xl">6</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Suivi et maintenance
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Contrôles réguliers pour vérifier la bonne santé de l'implant
                    et des tissus environnants. Une hygiène rigoureuse et des
                    visites de contrôle garantissent la longévité de votre
                    implant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Infos pratiques */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Informations pratiques
            </h2>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Douleur</h4>
                      <p className="text-muted-foreground text-sm">
                        L'intervention se fait sous anesthésie locale, vous ne
                        ressentez aucune douleur pendant l'acte. Les suites sont
                        généralement bien tolérées (léger inconfort, œdème
                        modéré) et bien contrôlées par antalgiques.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Tarif</h4>
                      <p className="text-muted-foreground text-sm">
                        À partir de 1500€ par implant + couronne (hors
                        convention). Devis détaillé et personnalisé lors de la
                        consultation. Remboursement partiel possible selon votre
                        mutuelle.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Taux de réussite</h4>
                      <p className="text-muted-foreground text-sm">
                        Avec une bonne indication et une hygiène rigoureuse, le
                        taux de succès des implants dépasse 95% à 10 ans.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Retrouvez votre sourire complet
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Les implants dentaires sont une solution fiable et durable.
              Discutons ensemble de votre projet.
            </p>
            <a
              href="https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary-hover"
              >
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

export default Implantologie;
