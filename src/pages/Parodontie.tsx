import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle2, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";

const Parodontie = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Parodontie Marseille 4ème | Dr Stéphanie Meriot - Spécialiste Gencives"
        description="Spécialiste parodontie à Marseille 4ème. Traitement gingivite, parodontite, greffe gingivale. Formation IFPIO & Académie de paro. ☎ 09 83 43 96 21"
        canonical="/parodontie"
        keywords="parodontie marseille, parodontologie marseille, gingivite marseille, parodontite marseille, greffe gingivale, déchaussement dentaire, saignement gencives"
      />
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
                <span className="text-sm font-medium">Spécialité</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Parodontie à Marseille
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Spécialiste en parodontie, je prends soin de la santé de vos
                gencives et des tissus de soutien de vos dents. Formation
                approfondie à l'IFPIO Marseille et à l'Académie de paro
                d'Aix-en-Provence.
              </p>
            </div>
          </div>
        </section>

        {/* Qu'est-ce que la parodontie */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Qu'est-ce que la parodontie ?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                La parodontie est la spécialité dentaire qui traite les maladies
                des <strong>gencives</strong> et des{" "}
                <strong>tissus de soutien des dents</strong> (os, ligament). Ces
                tissus forment le parodonte, l'ensemble des structures qui
                ancrent vos dents dans votre mâchoire.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sans traitement, les maladies parodontales peuvent entraîner un
                déchaussement et même la perte de vos dents. Heureusement, une
                prise en charge précoce permet de stabiliser et d'améliorer votre
                santé parodontale.
              </p>
            </div>
          </div>
        </section>

        {/* Symptômes */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Symptômes à surveiller
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Gencives qui saignent
                      </h3>
                      <p className="text-muted-foreground">
                        Au brossage, lors du passage du fil dentaire, ou même
                        spontanément. C'est souvent le premier signe d'une
                        gingivite.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Gencives gonflées ou rouges
                      </h3>
                      <p className="text-muted-foreground">
                        Une inflammation visible, des gencives sensibles au
                        toucher, ou une couleur rouge foncé au lieu de rose pâle.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Mauvaise haleine persistante
                      </h3>
                      <p className="text-muted-foreground">
                        Une halitose chronique peut être causée par des bactéries
                        sous la gencive.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Déchaussement ou mobilité
                      </h3>
                      <p className="text-muted-foreground">
                        Racines apparentes, dents qui bougent, espaces entre les
                        dents qui s'élargissent.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Traitements */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Traitements parodontaux proposés
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Diagnostic parodontal complet
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Mesure des poches parodontales, évaluation de la perte
                    osseuse (radiographies), bilan global de votre santé
                    gingivale. Ce diagnostic me permet d'établir un plan de
                    traitement personnalisé.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Détartrage et surfaçage radiculaire
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nettoyage approfondi <strong>sous la gencive</strong> pour
                    éliminer le tartre et les bactéries accumulés. Ce traitement
                    non-chirurgical permet de réduire l'inflammation et de
                    stabiliser les tissus.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Chirurgie parodontale
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Si nécessaire : réduction des poches parodontales,
                    régénération tissulaire guidée, chirurgie d'accès pour
                    nettoyer en profondeur. Réalisée sous anesthésie locale dans
                    un cadre sécurisé.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Greffe gingivale
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Reconstruction des gencives rétractées pour protéger les
                    racines exposées, réduire la sensibilité et améliorer
                    l'esthétique de votre sourire.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Maintenance parodontale
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Suivi régulier personnalisé (tous les 3 à 6 mois selon votre
                    situation) pour stabiliser votre parodonte et prévenir les
                    récidives. La maintenance est la clé du succès à long terme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mon approche */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Mon approche en parodontie
            </h2>
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Formée à l'<strong>IFPIO de Marseille</strong> et à l'
                <strong>Académie de paro d'Aix-en-Provence</strong>, je vous
                accompagne avec douceur et expertise dans le traitement de vos
                maladies parodontales.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Mon objectif : <strong>préserver vos dents naturelles</strong> le
                plus longtemps possible en stabilisant votre santé gingivale. Je
                prends le temps de vous expliquer chaque étape du traitement et
                de vous donner les clés pour maintenir vos résultats.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                La parodontie demande de la rigueur et de la patience, mais les
                résultats en valent la peine : des gencives saines, des dents
                stables, et un sourire retrouvé.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prenez soin de vos gencives
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Un simple saignement peut être le signe d'un problème plus sérieux.
              N'attendez pas, consultez dès maintenant.
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

export default Parodontie;
