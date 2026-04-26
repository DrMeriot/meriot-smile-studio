import { useEffect } from "react";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Info, Calendar, CreditCard, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";

const defaultSecteurItems = ["Carte Vitale acceptée", "Tiers payant Sécurité sociale", "Tarifs conventionnés", "Mutuelle"];

const defaultRemboursements = [
  { icon: "Shield", color: "bg-primary/10", iconColor: "text-primary", title: "Assurance Maladie", desc: "Soins courants remboursés à 60% du tarif conventionné. Tiers payant pour la part SS." },
  { icon: "Heart", color: "bg-accent/10", iconColor: "text-accent", title: "Mutuelle complémentaire", desc: "Remboursement des 40% restant + soins hors nomenclature selon contrat." },
  { icon: "CheckCircle2", color: "bg-green-100 dark:bg-green-900/30", iconColor: "text-green-600 dark:text-green-400", title: "100% Santé (RAC 0)", desc: "Certaines prothèses intégralement prises en charge." },
];

const iconMapTarifs: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Heart, CheckCircle2,
};

const Tarifs = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("tarifs");

  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const consultation = page?.consultation ?? "23€";
  const implant = page?.implant ?? "950€";
  const blanchiment = page?.blanchiment ?? "400€";
  const secteurItems = page?.secteurItems ?? defaultSecteurItems;
  const remboursements = page?.remboursementsList ?? defaultRemboursements;
  const seoTitle = page?.seoTitle ?? "Tarifs Dentiste Marseille & PACA | Secteur 1 Conventionné | Dr Meriot";
  const seoDesc = page?.seoDescription ?? "Tarifs transparents cabinet Dr Meriot Marseille. Conventionnée secteur 1. Carte Vitale, tiers payant. Consultation 23€. Devis gratuits.";

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical="/tarifs"
        keywords="tarif dentiste marseille, dentiste secteur 1, prix implant dentaire, tarif parodontie, carte vitale, tiers payant"
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {page?.heroTitle ?? "Tarifs et remboursements"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {page?.heroSubtitle ?? "Transparence et clarté sur nos honoraires. Conventionnée secteur 1, je pratique les tarifs de l'Assurance Maladie pour les soins courants."}
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <Card className="bg-primary/5 border-primary/20 shadow-soft">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0"><Shield className="h-8 w-8 text-primary" /></div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-6">{page?.secteurTitre ?? "Conventionnée Secteur 1"}</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {secteurItems.map((label: string, i: number) => (
                          <div key={i} className="flex items-start gap-3 bg-background/50 rounded-xl p-4">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="font-semibold">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{page?.tarifsTitre ?? "Tarifs indicatifs"}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader className="pb-4"><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" />Soins courants</CardTitle></CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg">Consultation</span>
                        <span className="text-2xl font-bold text-primary">{consultation}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardHeader className="pb-4"><CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-accent" />Soins spécialisés</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-b border-border pb-4">
                      <h4 className="font-semibold text-accent mb-1">Parodontie</h4>
                      <p className="text-sm text-muted-foreground">{page?.parodontieInfo ?? "Devis personnalisé selon la complexité"}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Implantologie</h4>
                      <p className="text-sm text-muted-foreground">Implant dentaire : <span className="font-semibold">{implant}</span></p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8 bg-accent/5 border-accent/20 shadow-soft">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0"><Info className="h-6 w-6 text-accent" /></div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{page?.devisTitre ?? "Devis détaillés gratuits"}</h3>
                      <p className="text-muted-foreground">{page?.devisTexte ?? "Pour tous les soins complexes, je vous remets un devis détaillé et transparent avant de débuter le traitement."}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{page?.remboursementsTitre ?? "Remboursements et prise en charge"}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {remboursements.map((r: { icon?: string; color?: string; iconColor?: string; title: string; desc: string }, i: number) => {
                  const defaultColors = [
                    { color: "bg-primary/10", iconColor: "text-primary" },
                    { color: "bg-accent/10", iconColor: "text-accent" },
                    { color: "bg-green-100 dark:bg-green-900/30", iconColor: "text-green-600 dark:text-green-400" },
                  ];
                  const iconName = r.icon ?? ["Shield", "Heart", "CheckCircle2"][i] ?? "Shield";
                  const Icon = iconMapTarifs[iconName] ?? Shield;
                  const c = defaultColors[i] ?? defaultColors[0];
                  const color = r.color ?? c.color;
                  const iconColor = r.iconColor ?? c.iconColor;
                  return (
                    <Card key={i} className="shadow-soft">
                      <CardHeader>
                        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${iconColor}`} />
                        </div>
                        <CardTitle>{r.title}</CardTitle>
                      </CardHeader>
                      <CardContent><p className="text-muted-foreground">{r.desc}</p></CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{page?.ctaTitre ?? "Une question sur les tarifs ?"}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{page?.ctaTexte ?? "N'hésitez pas à me poser vos questions lors de votre consultation."}</p>
              <a href={doctolibUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary-hover"><Calendar className="h-5 w-5" />Prendre rendez-vous</Button>
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
