import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle2, Calendar, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const defaultFAQs = [
  { question: "Qu'est-ce qu'un implant dentaire ?", answer: "Un implant dentaire est une racine artificielle en titane placée dans l'os de la mâchoire pour remplacer une dent manquante." },
  { question: "La pose d'implant dentaire est-elle douloureuse ?", answer: "L'intervention se fait sous anesthésie locale, vous ne ressentez aucune douleur pendant l'acte." },
  { question: "Combien coûte un implant dentaire à Marseille ?", answer: "Le tarif d'un implant dentaire au cabinet du Dr Meriot est à partir de 950€ pour l'implant, auquel s'ajoute la couronne." },
  { question: "Quelle est la durée de vie d'un implant dentaire ?", answer: "Avec un bon entretien, un implant dentaire peut durer toute une vie. Le taux de succès dépasse 95% à 10 ans." },
  { question: "Peut-on poser un implant si l'on manque d'os ?", answer: "Oui, une greffe osseuse peut être réalisée avant ou pendant la pose de l'implant." },
  { question: "Quel est le lien entre parodontie et implantologie ?", answer: "La santé des gencives est essentielle pour la réussite des implants." },
];

const breadcrumbItems = [
  { name: "Accueil", url: "https://dr-meriot-dentiste.fr/" },
  { name: "Implantologie", url: "https://dr-meriot-dentiste.fr/implantologie" }
];

const Implantologie = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("implantologie");

  const tel = global?.telephone ?? "09 83 43 96 21";
  const doctolibUrl = global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const faqs = page?.faq ?? defaultFAQs;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEOHead
        title={page?.seo?.title ?? "Implants Dentaires Marseille | Dr Stéphanie Meriot - Implantologie"}
        description={page?.seo?.description ?? `Pose d'implants dentaires à Marseille 4ème par le Dr Meriot. Formation IFPIO. Devis gratuit. ☎ ${tel}`}
        canonical="/implantologie"
        keywords="implant dentaire marseille, implantologie marseille, pose implant dentaire, chirurgie implantaire, implantologue marseille 4"
      />
      <FAQSchema faqs={faqs.map((f: { question: string; answer?: string; reponse?: string }) => ({ question: f.question, answer: f.reponse ?? f.answer ?? "" }))} pageUrl="https://dr-meriot-dentiste.fr/implantologie" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                  <Zap className="h-4 w-4" /><span className="text-sm font-medium">Spécialité</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {page?.intro?.titre ?? "Implantologie à Marseille"}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {page?.intro?.description ?? "Solution moderne et durable pour remplacer vos dents manquantes. Formation spécialisée à l'IFPIO Marseille."}
                </p>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Qu'est-ce qu'un implant dentaire ?</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">Un implant dentaire est une <strong>racine artificielle en titane</strong> qui est placée chirurgicalement dans l'os de la mâchoire.</p>
                <p className="text-muted-foreground leading-relaxed">Le titane est un matériau biocompatible qui s'intègre naturellement à l'os (ostéo-intégration), offrant une stabilité comparable à celle d'une dent naturelle.</p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Les avantages des implants dentaires</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Solution durable", desc: "Contrairement aux prothèses amovibles, l'implant est fixe et peut durer toute une vie avec un bon entretien." },
                  { title: "Préserve l'os de la mâchoire", desc: "L'implant stimule l'os, évitant sa résorption qui survient naturellement après la perte d'une dent." },
                  { title: "Confort et esthétique naturelle", desc: "L'implant se comporte comme une dent naturelle : aucune gêne, apparence naturelle, confort total." },
                  { title: "Pas de dommage aux dents adjacentes", desc: "Contrairement au bridge, on ne touche pas aux dents voisines pour remplacer une dent manquante." },
                ].map((a, i) => (
                  <Card key={i} className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div><h3 className="font-semibold text-lg mb-2">{a.title}</h3><p className="text-muted-foreground">{a.desc}</p></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Les étapes de la pose d'implant dentaire</h2>
              <div className="space-y-8">
                {[
                  { step: "1", title: "Consultation et bilan implantaire", desc: "Examen clinique complet, radiographies 3D pour évaluer la qualité et la quantité d'os disponible." },
                  { step: "2", title: "Préparation osseuse (si nécessaire)", desc: "Si le volume osseux est insuffisant, une greffe osseuse peut être nécessaire." },
                  { step: "3", title: "Pose de l'implant en titane", desc: "Intervention chirurgicale sous anesthésie locale (indolore). Durée : 30 min à 1h par implant." },
                  { step: "4", title: "Ostéo-intégration et cicatrisation", desc: "L'implant doit s'intégrer à l'os. Cette phase dure 3 à 6 mois." },
                  { step: "5", title: "Pose de la couronne définitive", desc: "Empreintes pour réaliser votre couronne définitive sur mesure." },
                  { step: "6", title: "Suivi et maintenance implantaire", desc: "Contrôles réguliers pour la longévité de votre implant." },
                ].map((e, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className={`p-3 ${i % 2 === 0 ? "bg-primary/10" : "bg-accent/10"} rounded-xl flex-shrink-0`}>
                      <span className={`${i % 2 === 0 ? "text-primary" : "text-accent"} font-bold text-xl`}>{e.step}</span>
                    </div>
                    <div><h3 className="text-xl font-semibold mb-3">{e.title}</h3><p className="text-muted-foreground leading-relaxed">{e.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Informations pratiques sur les implants</h2>
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { title: "Douleur et confort", desc: "L'intervention se fait sous anesthésie locale. Les suites sont bien tolérées." },
                      { title: "Tarif implant dentaire", desc: `À partir de ${page?.tarifs?.implant ?? "950€"} par implant (hors couronne). Devis détaillé lors de la consultation.` },
                      { title: "Taux de réussite des implants", desc: `Le taux de succès dépasse ${page?.tarifs?.taux_reussite ?? "95%"} à 10 ans.` },
                    ].map((info, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div><h3 className="font-semibold mb-1">{info.title}</h3><p className="text-muted-foreground text-sm">{info.desc}</p></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="bg-accent/5 rounded-2xl p-8 border border-accent/20">
                <h2 className="text-2xl font-bold mb-4">Parodontie et implantologie : un duo essentiel</h2>
                <p className="text-muted-foreground mb-4">
                  La réussite d'un implant dépend directement de la santé de vos gencives et de votre os.
                </p>
                <Link to="/parodontie" className="inline-flex items-center text-primary font-medium hover:underline">
                  En savoir plus sur la parodontie →
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Questions fréquentes sur les implants</h2>
              <div className="space-y-4">
                {faqs.map((faq: { question: string; answer?: string; reponse?: string }, i: number) => (
                  <div key={i} className="bg-card rounded-xl p-6 shadow-soft">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.reponse ?? faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Retrouvez votre sourire complet</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Prenez rendez-vous pour un bilan implantaire complet. Je vous expliquerai les options adaptées à votre situation.
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

export default Implantologie;
