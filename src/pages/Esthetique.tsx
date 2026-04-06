import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const breadcrumbItems = [
  { name: "Accueil", url: "https://dr-meriot-dentiste.fr/" },
  { name: "Esthétique dentaire", url: "https://dr-meriot-dentiste.fr/esthetique" }
];

const Esthetique = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("esthetique");

  const tel = global?.phone ?? global?.telephone ?? "09 83 43 96 21";
  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEOHead
        title={page?.seo?.title ?? "Esthétique Dentaire Marseille | Blanchiment & Facettes | Dr Meriot"}
        description={page?.seo?.description ?? `Blanchiment dentaire, facettes et composites esthétiques à Marseille 4ème. Retrouvez un sourire éclatant avec le Dr Meriot. ☎ ${tel}`}
        canonical="/esthetique"
        keywords="esthétique dentaire marseille, blanchiment dentaire marseille, facettes dentaires, composites esthétiques, sourire harmonieux"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Esthétique</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {page?.introTitle ?? "Esthétique dentaire à Marseille"}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {page?.introText ?? "Retrouvez un sourire éclatant et harmonieux grâce à des solutions esthétiques douces et personnalisées. Sublimez votre sourire en toute sérénité."}
                </p>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Un sourire qui vous ressemble</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  L'esthétique dentaire ne se limite pas à avoir des dents blanches. C'est avant tout retrouver <strong>confiance en soi</strong> et se sentir bien avec son sourire.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Mon approche est <strong>naturelle et respectueuse</strong> de vos tissus dentaires. Je privilégie toujours les techniques les moins invasives pour préserver au maximum votre émail.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Nos solutions d'esthétique dentaire</h2>
              <div className="space-y-8">
                {[
                  { title: "Blanchiment dentaire professionnel", desc: "Éclaircissement professionnel et sécurisé de vos dents pour retrouver une teinte lumineuse et naturelle.", items: ["Blanchiment ambulatoire (gouttières sur mesure à porter à domicile)", "Blanchiment au fauteuil (résultat immédiat en une séance)", "Traitement adapté à la sensibilité de vos dents"], color: "accent" },
                  { title: "Facettes dentaires en céramique", desc: "Fines coquilles en céramique collées sur la face visible des dents pour corriger leur forme, leur couleur ou leur alignement.", items: ["Correction des dents tachées, ébréchées ou mal alignées", "Résultat naturel et personnalisé selon votre visage", "Longévité exceptionnelle (10-15 ans en moyenne)"], color: "primary" },
                  { title: "Composites esthétiques", desc: "Résine composite de haute qualité pour restaurer ou embellir vos dents.", items: ["Réparation esthétique des dents ébréchées", "Fermeture des espaces entre les dents (diastèmes)", "Résultat immédiat en une seule séance"], color: "accent" },
                  { title: "Harmonisation du sourire", desc: "Analyse globale de votre sourire pour créer un sourire harmonieux et adapté à votre visage.", items: ["Étude esthétique personnalisée", "Simulation numérique du résultat (si possible)", "Plan de traitement sur mesure"], color: "primary" },
                ].map((s, i) => (
                  <Card key={i} className="shadow-soft hover-lift transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex gap-6 items-start">
                        <div className={`p-3 bg-${s.color}/10 rounded-xl flex-shrink-0`}>
                          <Sparkles className={`h-6 w-6 text-${s.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                          <ul className="space-y-2">
                            {s.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <CheckCircle2 className={`h-5 w-5 text-${s.color} flex-shrink-0 mt-0.5`} />
                                <span className="text-muted-foreground text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Une approche esthétique naturelle et respectueuse</h2>
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {page?.approche ?? "Je crois en une esthétique naturelle qui respecte votre personnalité et vos traits. Mon objectif n'est pas de créer un sourire \"parfait\" standardisé, mais de sublimer votre sourire unique."}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ma philosophie : <strong>dentisterie à minima</strong>. Je privilégie toujours les techniques les moins invasives pour préserver au maximum vos tissus dentaires naturels.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Découvrez nos autres spécialités</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link to="/parodontie" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Parodontie</h3>
                  <p className="text-muted-foreground text-sm">Des gencives saines sont la base d'un beau sourire.</p>
                </Link>
                <Link to="/implantologie" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Implantologie</h3>
                  <p className="text-muted-foreground text-sm">Remplacez vos dents manquantes par des implants dentaires durables et esthétiques.</p>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-20 bg-accent/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Osez le sourire dont vous rêvez</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Prenez rendez-vous pour une consultation esthétique. Ensemble, nous créerons le sourire qui vous correspond.
              </p>
              <a href={doctolibUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary-hover">
                  <Calendar className="h-5 w-5" />Prendre rendez-vous
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
