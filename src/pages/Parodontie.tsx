import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, AlertCircle, Search, Sparkles, Scissors, UserCheck, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import ParoGlossary from "@/components/ParoGlossary";
const Parodontie = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Parodontie Marseille & PACA | Dr Stéphanie Meriot - Spécialiste Gencives"
        description="Spécialiste parodontie à Marseille et région PACA : Pays d'Aix, Aubagne, La Ciotat, Côte Bleue, Étang de Berre. Traitement gingivite et parodontite. ☎ 09 83 43 96 21"
        canonical="/parodontie"
        keywords="parodontie marseille, parodontologue aix-en-provence, gingivite aubagne, parodontite la ciotat, traitement gencives vitrolles, spécialiste parodontie cassis, parodontologie marignane, déchaussement dentaire gardanne, saignement gencives martigues, parodontologue istres, gencives salon-de-provence, parodontie allauch, plan-de-cuques, les pennes-mirabeau, septèmes-les-vallons, bouc-bel-air, cabriès, simiane-collongue, meyreuil, fuveau, rousset, éguilles, ventabren, carry-le-rouet, sausset-les-pins, ensuès-la-redonne, châteauneuf-les-martigues, gignac-la-nerthe, gémenos, carnoux, roquefort-la-bédoule, ceyreste, roquevaire, auriol, la destrousse, peypin, la bouilladisse, trets, saint-maximin, fos-sur-mer, port-de-bouc, berre-l'étang, rognac, velaux, miramas, saint-chamas, saint-mitre-les-remparts, pélissanne, lançon-provence, la fare-les-oliviers, coudoux, eyguières, lambesc, grans, PACA"
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
                  Spécialiste en parodontie, je prends soin de la santé de vos gencives et des tissus de soutien de vos dents. Formation approfondie à l'Académie de paro à Aix-en-Provence.
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
                  La parodontie est la spécialité dentaire qui traite les maladies des gencives et des tissus de soutien des dents (os, ligament). Ces tissus forment le parodonte, l'ensemble des structures qui ancrent vos dents dans votre mâchoire.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Sans traitement, les maladies parodontales peuvent entraîner un déchaussement et même la perte de vos dents. Heureusement, une prise en charge précoce permet de stabiliser et d'améliorer votre santé parodontale.
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
                          Au brossage, lors du passage du fil dentaire, ou même spontanément. C'est souvent le premier signe d'une gingivite.
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
                          Une inflammation visible, des gencives sensibles au toucher, ou une couleur rouge foncé au lieu de rose pâle.
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
                          Une halitose chronique peut être causée par des bactéries sous la gencive.
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
                          Racines apparentes, dents qui bougent, espaces entre les dents qui s'élargissent avec tassements alimentaires.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Les maladies parodontales */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Les maladies parodontales : comprendre simplement
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-center max-w-3xl mx-auto">
                Les maladies parodontales touchent les tissus qui entourent et soutiennent les dents : la gencive et l'os. Elles sont causées par l'accumulation de bactéries autour des dents. On distingue deux étapes : la gingivite et la parodontite.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Gingivite */}
                <div className="bg-accent/5 rounded-2xl p-8 border border-accent/20">
                  <h3 className="text-2xl font-bold mb-4 text-accent">
                    La gingivite : le premier signe d'alerte
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    La gingivite est une inflammation de la gencive. Elle peut se manifester par :
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      des gencives rouges, gonflées,
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      des saignements au brossage,
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      parfois une mauvaise haleine.
                    </li>
                  </ul>
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      La bonne nouvelle : la gingivite est totalement réversible. Un nettoyage professionnel et de bonnes habitudes d'hygiène suffisent généralement pour retrouver une gencive saine.
                    </p>
                  </div>
                </div>

                {/* Parodontite */}
                <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
                  <h3 className="text-2xl font-bold mb-4 text-primary">
                    La parodontite : quand l'inflammation va plus loin
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Si la gingivite n'est pas traitée, l'inflammation peut progresser vers les tissus plus profonds. On parle alors de parodontite. Cette maladie peut provoquer :
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      un déchaussement des dents,
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      leur mobilité,
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      des rétractations de la gencive,
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      des infections ou des abcès.
                    </li>
                  </ul>
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                    <p className="text-amber-800 dark:text-amber-200 font-medium">
                      La parodontite entraîne une perte de l'os qui soutient les dents. Cette perte est irréversible, mais le traitement permet de stopper l'évolution de la maladie et de préserver les dents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Traitements parodontaux */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Les traitements parodontaux : comment soigne-t-on les gencives ?
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Les maladies des gencives se soignent très bien lorsqu'elles sont prises en charge à temps. Les traitements parodontaux sont réalisés de façon douce, progressive et toujours adaptée à votre confort. L'objectif : stopper l'inflammation, préserver vos dents et retrouver une bouche saine et sereine.
                </p>
              </div>

              <div className="space-y-8">
                {/* Étape 1 */}
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                      <Search className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">1</span>
                        <h3 className="text-xl font-bold">Un diagnostic complet pour bien vous accompagner</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Avant tout traitement, nous réalisons un examen précis de vos gencives et de l'os autour des dents. Cela comprend :
                      </p>
                      <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          un examen clinique détaillé,
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          la mesure des poches parodontales,
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          l'évaluation de la mobilité des dents,
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          l'analyse de la plaque et de l'inflammation,
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          et des radiographies.
                        </li>
                      </ul>
                      <p className="text-muted-foreground mt-4 italic">
                        Ce bilan complet permet de définir un plan de soins personnalisé et sécurisé, adapté à votre situation et à votre confort.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-accent/10 rounded-xl flex-shrink-0">
                      <Sparkles className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">2</span>
                        <h3 className="text-xl font-bold">Le détartrage et l'accompagnement à l'hygiène</h3>
                      </div>
                      <p className="text-muted-foreground">
                        La première étape du traitement consiste à nettoyer la surface des dents pour enlever le tartre visible. C'est un soin simple, qui soulage souvent rapidement les gencives. Nous prenons aussi le temps de vous montrer les bons gestes d'hygiène, pour que vous puissiez maintenir des gencives saines au quotidien.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                      <ClipboardCheck className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">3</span>
                        <h3 className="text-xl font-bold">Le surfaçage radiculaire : un nettoyage en profondeur mais tout en douceur</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Lorsque l'inflammation est plus installée, un nettoyage sous la gencive est nécessaire. Le surfaçage radiculaire se fait avec des instruments précis, sous anesthésie locale pour un confort optimal. Il permet d'éliminer les bactéries et d'aider les gencives à cicatriser naturellement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Étape 4 */}
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-accent/10 rounded-xl flex-shrink-0">
                      <Scissors className="h-8 w-8 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">4</span>
                        <h3 className="text-xl font-bold">La chirurgie parodontale : uniquement si nécessaire</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Dans les cas plus avancés, une petite intervention peut être proposée. Elle permet d'atteindre des zones que le nettoyage ne suffit pas à assainir. Ces interventions sont maîtrisées, rapides et réalisées dans un cadre complètement sécurisé. L'objectif est toujours le même : stabiliser votre santé parodontale et protéger vos dents.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Étape 5 */}
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                      <UserCheck className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">5</span>
                        <h3 className="text-xl font-bold">Le suivi : vous n'êtes pas seul</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Après le traitement, des visites d'entretien sont programmées pour garder vos gencives stables dans le temps. Les rendez-vous réguliers permettent de prévenir les récidives et de vous accompagner durablement. Avec un bon suivi, la grande majorité des patients parvient à maintenir une bouche saine sans douleur ni inflammation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tarifs */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Tarifs des traitements parodontaux
              </h2>
              <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Les soins parodontaux sont personnalisés selon vos besoins. Nous vous fournissons toujours un devis clair et détaillé avant toute intervention, pour que vous sachiez exactement à quoi vous attendre.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Certaines consultations et traitements peuvent être remboursés par votre mutuelle.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800 mb-6">
                  <p className="text-blue-800 dark:text-blue-200">
                    A noter que dans le cadre de certaines Affections Longue Durée (type Diabète, Polyarthrite ou autre) les traitements de gencive peuvent être remboursés par la sécurité sociale.
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Notre équipe reste à votre disposition pour répondre à toutes vos questions et vous accompagner en toute sérénité.
                </p>
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
                  Formée à l'Académie de paro d'Aix-en-Provence, je vous accompagne avec douceur et expertise dans le traitement de vos maladies parodontales.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Mon objectif : préserver vos dents naturelles le plus longtemps possible en stabilisant votre santé gingivale. Je prends le temps de vous expliquer chaque étape du traitement et de vous donner les clés pour maintenir vos résultats.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  La parodontie demande de la rigueur et de la patience, mais les résultats en valent la peine : des gencives saines, des dents stables, et un sourire retrouvé.
                </p>
              </div>
            </div>
          </section>

          {/* Glossaire SEO */}
          <ParoGlossary />

          {/* CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prenez soin de vos gencives
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Un simple saignement peut être le signe d'un problème plus sérieux. N'attendez pas, consultez dès maintenant.
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
