import { useEffect } from "react";
import { usePageContent } from "@/hooks/usePageContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Info, Calendar, CreditCard, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";

const Tarifs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Tarifs Dentiste Marseille & PACA | Secteur 1 Conventionné | Dr Meriot"
        description="Tarifs transparents cabinet Dr Meriot Marseille et région PACA. Conventionnée secteur 1. Carte Vitale, tiers payant. Consultation 23€. Devis gratuits."
        canonical="/tarifs"
        keywords="tarif dentiste marseille, prix dentiste aix-en-provence, dentiste secteur 1 aubagne, carte vitale la ciotat, tiers payant vitrolles, tarif dentiste cassis, prix implant marignane, tarif parodontie gardanne, dentiste conventionné martigues, tarif dentiste istres, salon-de-provence, allauch, plan-de-cuques, les pennes-mirabeau, septèmes-les-vallons, bouc-bel-air, cabriès, simiane-collongue, meyreuil, fuveau, rousset, éguilles, ventabren, carry-le-rouet, sausset-les-pins, châteauneuf-les-martigues, gignac-la-nerthe, gémenos, carnoux, roquefort-la-bédoule, ceyreste, roquevaire, auriol, la destrousse, peypin, la bouilladisse, trets, saint-maximin, fos-sur-mer, port-de-bouc, berre-l'étang, rognac, velaux, miramas, saint-chamas, saint-mitre-les-remparts, pélissanne, lançon-provence, la fare-les-oliviers, coudoux, eyguières, lambesc, grans, PACA"
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Tarifs et remboursements
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transparence et clarté sur nos honoraires. Conventionnée secteur 1, je pratique les tarifs de l'Assurance Maladie pour les soins courants.
              </p>
            </div>
          </section>

          {/* Conventionnée Secteur 1 */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <Card className="bg-primary/5 border-primary/20 shadow-soft">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-6">
                        Conventionnée Secteur 1
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 bg-background/50 rounded-xl p-4">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold block">Carte Vitale acceptée</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-background/50 rounded-xl p-4">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold block">Tiers payant Sécurité sociale</span>
                            <span className="text-sm text-muted-foreground">Pas d'avance de frais pour la part Assurance Maladie</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-background/50 rounded-xl p-4">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold block">Tarifs conventionnés</span>
                            <span className="text-sm text-muted-foreground">Respect des tarifs de l'Assurance Maladie</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 bg-background/50 rounded-xl p-4">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold block">Mutuelle</span>
                            <span className="text-sm text-muted-foreground">Complémentaire santé remboursable selon votre contrat</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Tarifs indicatifs */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Tarifs indicatifs
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Soins courants */}
                <Card className="shadow-soft">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Soins courants (tarifs conventionnés)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg">Consultation</span>
                        <span className="text-2xl font-bold text-primary">23€</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Soins spécialisés */}
                <Card className="shadow-soft">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-accent" />
                      Soins spécialisés
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-b border-border pb-4">
                      <h4 className="font-semibold text-accent mb-1">Parodontie</h4>
                      <p className="text-sm text-muted-foreground">
                        Traitement parodontal complet : Devis personnalisé selon la complexité
                      </p>
                    </div>
                    <div className="border-b border-border pb-4">
                      <h4 className="font-semibold text-primary mb-1">Implantologie</h4>
                      <p className="text-sm text-muted-foreground">
                        Implant dentaire : <span className="font-semibold">950€</span> (partiellement remboursable selon mutuelle)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Esthétique</h4>
                      <p className="text-sm text-muted-foreground">
                        Blanchiment <span className="font-semibold">400€</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Devis gratuits */}
              <Card className="mt-8 bg-accent/5 border-accent/20 shadow-soft">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                      <Info className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Devis détaillés gratuits
                      </h3>
                      <p className="text-muted-foreground">
                        Pour tous les soins complexes (implants, prothèses, parodontie), je vous remets un devis détaillé et transparent avant de débuter le traitement. Vous êtes libre d'accepter ou de refuser, sans engagement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Remboursements */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Remboursements et prise en charge
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Assurance Maladie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Les soins dentaires courants (consultations, soins de caries, détartrage, dévitalisation) sont remboursés à 60% du tarif conventionné par l'Assurance Maladie.
                    </p>
                    <p className="text-muted-foreground">
                      Avec le tiers payant, vous ne payez que la part mutuelle (40% restant). Des facilités de paiement sont possibles dans le cadre de reste à charge importants.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>Mutuelle complémentaire</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Votre mutuelle va vous rembourser les 40% restant généralement sous une dizaine de jours, ainsi qu'une partie des soins hors nomenclature (implants, esthétique) selon votre contrat.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>100% Santé (Réforme RAC 0)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Certaines prothèses dentaires peuvent être intégralement prises en charge (reste à charge zéro) dans le cadre du dispositif 100% Santé. Je vous accompagne pour identifier les solutions éligibles.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Une question sur les tarifs ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                N'hésitez pas à me poser vos questions lors de votre consultation. Je vous expliquerai clairement les coûts et les modalités de remboursement.
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

export default Tarifs;
