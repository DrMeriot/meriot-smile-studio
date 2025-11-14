import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Info, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Tarifs = () => {
  return (
    <>
      <Helmet>
        <title>
          Tarifs et remboursements - Cabinet dentaire Dr Meriot Marseille
        </title>
        <meta
          name="description"
          content="Tarifs transparents du cabinet dentaire Dr Stéphanie Meriot à Marseille. Conventionnée secteur 1, carte vitale, tiers payant. Devis détaillés gratuits."
        />
        <link rel="canonical" href="https://drstephaniemeriot.fr/tarifs" />
      </Helmet>

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
                Transparence et clarté sur nos honoraires. Conventionnée secteur
                1, je pratique les tarifs de l'Assurance Maladie pour les soins
                courants.
              </p>
            </div>
          </section>

          {/* Important Info */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <Card className="bg-primary/5 border-primary/20 shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">
                        Conventionnée Secteur 1
                      </h2>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>
                            <strong>Carte Vitale acceptée</strong> - Vous ne
                            payez que le ticket modérateur
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>
                            <strong>Tiers payant Sécurité sociale</strong> - Pas
                            d'avance de frais pour la part Assurance Maladie
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>
                            <strong>Tarifs conventionnés</strong> - Respect des
                            tarifs de l'Assurance Maladie
                          </span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>
                            <strong>Mutuelle</strong> - Complémentaire santé
                            remboursable selon votre contrat
                          </span>
                        </li>
                      </ul>
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
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Soins courants (tarifs conventionnés)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span>Consultation</span>
                        <span className="font-semibold">23€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Détartrage complet</span>
                        <span className="font-semibold">28,92€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Soin d'une carie (1 face)</span>
                        <span className="font-semibold">26,97€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Soin d'une carie (2 faces)</span>
                        <span className="font-semibold">45,38€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dévitalisation incisive</span>
                        <span className="font-semibold">33,74€</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dévitalisation molaire</span>
                        <span className="font-semibold">81,94€</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Soins spécialisés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Parodontie</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Traitement parodontal (surfaçage, chirurgie) - Devis
                          personnalisé selon la complexité
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Implantologie</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Implant dentaire + couronne - À partir de 1500€
                          (hors convention, partiellement remboursable selon
                          mutuelle)
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Esthétique</h4>
                        <p className="text-sm text-muted-foreground">
                          Blanchiment, facettes - Devis sur mesure
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8 bg-accent/5 border-accent/20 shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                      <Info className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        Devis détaillés gratuits
                      </h3>
                      <p className="text-muted-foreground">
                        Pour tous les soins complexes (implants, prothèses,
                        parodontie chirurgicale), je vous remets un{" "}
                        <strong>devis détaillé et transparent</strong> avant de
                        débuter le traitement. Vous êtes libre d'accepter ou de
                        refuser, sans engagement.
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

              <div className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Assurance Maladie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Les soins dentaires courants (consultations, soins de
                      caries, détartrage, dévitalisation) sont remboursés à{" "}
                      <strong>70% du tarif conventionné</strong> par l'Assurance
                      Maladie.
                    </p>
                    <p className="text-muted-foreground">
                      Avec le tiers payant, vous ne payez que le{" "}
                      <strong>ticket modérateur</strong> (30% restant).
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Mutuelle complémentaire</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Votre mutuelle peut rembourser tout ou partie du ticket
                      modérateur (30%), ainsi qu'une partie des soins hors
                      nomenclature (implants, esthétique) selon votre contrat.
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Important :</strong> Vérifiez votre niveau de
                      garanties avant d'entreprendre des soins prothétiques ou
                      implantaires.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>100% Santé (Réforme RAC 0)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Certaines prothèses dentaires peuvent être intégralement
                      prises en charge (reste à charge zéro) dans le cadre du
                      dispositif 100% Santé. Je vous accompagne pour identifier
                      les solutions éligibles.
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
                N'hésitez pas à me poser vos questions lors de votre
                consultation. Je vous expliquerai clairement les coûts et les
                modalités de remboursement.
              </p>
              <a
                href="https://www.doctolib.fr"
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
