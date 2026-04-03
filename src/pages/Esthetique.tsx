import { useEffect } from "react";
import { usePageContent } from "@/hooks/usePageContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";

interface IntroContent { titre: string; description: string; }

const Esthetique = () => {
  const { data: intro } = usePageContent<IntroContent>('esthetique', 'intro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Esthétique Dentaire Marseille & PACA | Blanchiment & Facettes | Dr Meriot"
        description="Esthétique dentaire à Marseille et région PACA : Aix, Aubagne, La Ciotat, Martigues, Salon. Blanchiment, facettes, composites. ☎ 09 83 43 96 21"
        canonical="/esthetique"
        keywords="esthétique dentaire marseille, blanchiment aix-en-provence, facettes aubagne, sourire la ciotat, dentiste esthétique vitrolles, blanchiment cassis, facettes marignane, sourire parfait gardanne, esthétique martigues, blanchiment istres, salon-de-provence, allauch, plan-de-cuques, les pennes-mirabeau, septèmes-les-vallons, bouc-bel-air, cabriès, simiane-collongue, meyreuil, fuveau, rousset, éguilles, ventabren, carry-le-rouet, sausset-les-pins, ensuès-la-redonne, châteauneuf-les-martigues, gignac-la-nerthe, gémenos, carnoux, roquefort-la-bédoule, ceyreste, roquevaire, auriol, la destrousse, peypin, la bouilladisse, trets, saint-maximin, fos-sur-mer, port-de-bouc, berre-l'étang, rognac, velaux, miramas, saint-chamas, saint-mitre-les-remparts, pélissanne, lançon-provence, la fare-les-oliviers, coudoux, eyguières, lambesc, grans, PACA"
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
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Esthétique</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Esthétique dentaire à Marseille
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Retrouvez un sourire éclatant et harmonieux grâce à des solutions
                esthétiques douces et personnalisées. Sublimez votre sourire en
                toute sérénité.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Un sourire qui vous ressemble
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                L'esthétique dentaire ne se limite pas à avoir des dents
                blanches. C'est avant tout retrouver{" "}
                <strong>confiance en soi</strong> et se sentir bien avec son
                sourire. Que vous souhaitiez corriger des imperfections, éclaircir
                vos dents ou harmoniser votre sourire, je vous accompagne avec
                douceur et expertise.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mon approche est <strong>naturelle et respectueuse</strong> de vos
                tissus dentaires. Je privilégie toujours les techniques les moins
                invasives pour préserver au maximum votre émail.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Nos solutions esthétiques
            </h2>

            <div className="space-y-8">
              <Card className="shadow-soft hover-lift transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">
                        Blanchiment dentaire
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Éclaircissement professionnel et sécurisé de vos dents
                        pour retrouver une teinte lumineuse et naturelle. Le
                        blanchiment au fauteuil permet un résultat visible dès la
                        première séance.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Blanchiment ambulatoire (gouttières sur mesure à
                            porter à domicile)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Blanchiment au fauteuil (résultat immédiat en une
                            séance)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Traitement adapté à la sensibilité de vos dents
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft hover-lift transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">
                        Facettes dentaires
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Fines coquilles en céramique collées sur la face visible
                        des dents pour corriger leur forme, leur couleur ou leur
                        alignement. Solution esthétique et durable pour un sourire
                        harmonieux.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Correction des dents tachées, ébréchées ou mal
                            alignées
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Résultat naturel et personnalisé selon votre visage
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Longévité exceptionnelle (10-15 ans en moyenne)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft hover-lift transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">
                        Composites esthétiques
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Résine composite de haute qualité pour restaurer ou
                        embellir vos dents (correction de forme, fermeture
                        d'espaces, réparation d'éclats). Traitement rapide et peu
                        invasif.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Réparation esthétique des dents ébréchées
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Fermeture des espaces entre les dents
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Résultat immédiat en une seule séance
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft hover-lift transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-3">
                        Harmonisation du sourire
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Analyse globale de votre sourire (forme des dents,
                        proportions, alignement, couleur) pour créer un sourire
                        harmonieux et adapté à votre visage. Approche sur mesure
                        combinant plusieurs techniques.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Étude esthétique personnalisée
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Simulation numérique du résultat (si possible)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            Plan de traitement sur mesure
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mon approche */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Une esthétique naturelle et respectueuse
            </h2>
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Je crois en une esthétique <strong>naturelle</strong> qui respecte
                votre personnalité et vos traits. Mon objectif n'est pas de créer
                un sourire "parfait" standardisé, mais de sublimer{" "}
                <strong>votre sourire unique</strong>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Chaque traitement esthétique est précédé d'une consultation
                approfondie où nous discutons ensemble de vos attentes, de vos
                préoccupations et des solutions adaptées. Je vous montre les
                possibilités et vous explique chaque étape en toute transparence.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ma philosophie : <strong>dentisterie à minima</strong>. Je
                privilégie toujours les techniques les moins invasives pour
                préserver au maximum vos tissus dentaires naturels.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Osez le sourire dont vous rêvez
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Prenez rendez-vous pour une consultation esthétique. Ensemble, nous
              créerons le sourire qui vous correspond.
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

export default Esthetique;
