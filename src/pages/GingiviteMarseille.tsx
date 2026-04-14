import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, AlertCircle, Heart } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import MedicalSchema from "@/components/MedicalSchema";

const defaultFAQs = [
  { question: "La gingivite est-elle grave ?", answer: "La gingivite est une inflammation réversible des gencives. Sans traitement, elle peut évoluer en parodontite, une maladie plus grave qui entraîne la perte de l'os de soutien des dents. C'est pourquoi il est important de la traiter dès les premiers signes." },
  { question: "Comment soigner une gingivite à Marseille ?", answer: "Le traitement commence par un détartrage professionnel au cabinet, suivi de conseils d'hygiène personnalisés. Le Dr Meriot réalise un bilan complet de vos gencives et adapte le traitement à votre situation. Prenez rendez-vous pour un diagnostic." },
  { question: "Combien de temps dure le traitement d'une gingivite ?", answer: "Avec un traitement adapté et une bonne hygiène bucco-dentaire, la gingivite peut guérir en 2 à 3 semaines. Un suivi régulier est recommandé pour prévenir les récidives." },
  { question: "Quels sont les premiers signes de la gingivite ?", answer: "Les premiers signes sont des gencives qui saignent au brossage, des gencives rouges ou gonflées, et parfois une mauvaise haleine. Si vous observez ces symptômes, consultez rapidement." },
  { question: "La gingivite peut-elle revenir après traitement ?", answer: "Oui, sans une hygiène bucco-dentaire rigoureuse et des visites régulières chez le dentiste, la gingivite peut récidiver. Un suivi parodontal tous les 3 à 6 mois est recommandé." },
];

const defaultCauses = [
  { title: "Plaque dentaire", desc: "L'accumulation de bactéries sur les dents et le long de la gencive est la cause principale de la gingivite." },
  { title: "Tartre", desc: "La plaque non éliminée se calcifie en tartre, impossible à retirer par le brossage seul." },
  { title: "Tabac", desc: "Le tabac réduit la circulation sanguine dans les gencives et masque les signes d'inflammation." },
  { title: "Changements hormonaux", desc: "Grossesse, puberté et ménopause peuvent favoriser l'inflammation des gencives." },
  { title: "Diabète", desc: "Un diabète mal équilibré augmente le risque d'infections gingivales." },
  { title: "Stress", desc: "Le stress affaiblit le système immunitaire et favorise l'inflammation." },
];

const defaultSymptomes = [
  "Gencives rouges et gonflées",
  "Saignements au brossage ou au passage du fil dentaire",
  "Mauvaise haleine persistante (halitose)",
  "Gencives sensibles au toucher",
  "Gencives qui se rétractent légèrement",
];

const breadcrumbItems = [
  { name: "Accueil", url: "https://www.dr-meriot-chirurgien-dentiste.fr/" },
  { name: "Parodontie", url: "https://www.dr-meriot-chirurgien-dentiste.fr/parodontie" },
  { name: "Gingivite Marseille", url: "https://www.dr-meriot-chirurgien-dentiste.fr/gingivite-marseille" },
];

const GingiviteMarseille = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("gingivite_marseille");

  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const faqs = page?.faqList ?? defaultFAQs;
  const causes = page?.causesList ?? defaultCauses;
  const symptomes = page?.symptomesList ?? defaultSymptomes;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEOHead
        title={page?.seoTitle ?? "Gingivite Marseille | Traitement gencives inflammées — Dr Meriot"}
        description={page?.seoDescription ?? "Traitement de la gingivite à Marseille. Gencives qui saignent, rouges, gonflées ? Le Dr Meriot, spécialiste parodontie, soigne vos gencives. Consultation rapide."}
        canonical="/gingivite-marseille"
        keywords="gingivite marseille, traitement gingivite, gencives inflammées marseille, gencives qui saignent, inflammation gencives, dentiste gencives marseille"
      />
      <FAQSchema faqs={faqs.map((f: { question: string; answer: string }) => ({ question: f.question, answer: f.answer }))} pageUrl="https://www.dr-meriot-chirurgien-dentiste.fr/gingivite-marseille" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <MedicalSchema
        pageUrl="/gingivite-marseille"
        pageName={page?.seoTitle ?? "Gingivite : traitement à Marseille"}
        pageDescription={page?.seoDescription ?? "Traitement de la gingivite à Marseille par le Dr Meriot, spécialiste en parodontie."}
        conditions={[{
          name: "Gingivite",
          alternateName: "Inflammation des gencives",
          description: "Inflammation réversible des gencives causée par l'accumulation de plaque dentaire.",
          symptoms: ["Saignement des gencives", "Gencives rouges", "Gencives gonflées", "Mauvaise haleine"],
          riskFactors: ["Plaque dentaire", "Tabac", "Diabète", "Stress", "Changements hormonaux"],
          treatment: "Détartrage professionnel et surfaçage radiculaire",
        }]}
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <article>
            {/* Hero */}
            <section className="py-20 bg-gradient-soft" aria-labelledby="hero-title">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-medium">Santé des gencives</span>
                  </div>
                  <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    {page?.heroTitle ?? "Traitement de la gingivite à Marseille"}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {page?.heroSubtitle ?? "Vos gencives saignent, sont rouges ou gonflées ? La gingivite est une inflammation fréquente et réversible. Au cabinet du Dr Meriot, nous diagnostiquons et traitons la gingivite pour préserver la santé de vos gencives."}
                  </p>
                </div>
              </div>
            </section>

            {/* Définition */}
            <section className="py-20" aria-labelledby="definition-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="definition-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.definitionTitre ?? "Qu'est-ce que la gingivite ?"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {page?.definitionTexte1 ?? "La gingivite est une inflammation de la gencive, le plus souvent causée par l'accumulation de plaque dentaire à la base des dents. C'est la forme la plus courante des maladies parodontales et elle touche une grande partie de la population à un moment ou un autre de sa vie."}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {page?.definitionTexte2 ?? "Contrairement à la parodontite, la gingivite ne touche que la gencive superficielle et n'endommage pas l'os. C'est pourquoi elle est totalement réversible avec un traitement adapté. Cependant, sans prise en charge, elle peut évoluer vers une parodontite, maladie plus grave qui entraîne la perte de l'os de soutien des dents."}
                </p>
              </div>
            </section>

            {/* Causes */}
            <section className="py-20 bg-muted/30" aria-labelledby="causes-title">
              <div className="container mx-auto px-4 max-w-5xl">
                <h2 id="causes-title" className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  {page?.causesTitre ?? "Les causes de la gingivite"}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {causes.map((c: { title: string; desc: string }, i: number) => (
                    <div key={i} className="bg-card rounded-xl p-6 shadow-soft">
                      <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                      <p className="text-muted-foreground">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Symptômes */}
            <section className="py-20" aria-labelledby="symptomes-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="symptomes-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.symptomesTitre ?? "Reconnaître les symptômes de la gingivite"}
                </h2>
                <ul className="space-y-4">
                  {symptomes.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-lg">
                      <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Traitement */}
            <section className="py-20 bg-muted/30" aria-labelledby="traitement-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="traitement-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.traitementTitre ?? "Comment traiter la gingivite au cabinet ?"}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {page?.traitementTexte ?? "Le traitement de la gingivite repose sur un détartrage professionnel complet réalisé au cabinet, associé à des conseils d'hygiène bucco-dentaire personnalisés. Le Dr Meriot évalue l'état de vos gencives et adapte le plan de soin à votre situation. Dans la plupart des cas, une seule séance de détartrage et l'adoption d'une bonne routine de brossage suffisent à retrouver des gencives saines en quelques semaines. Un suivi régulier est recommandé pour prévenir toute récidive."}
                  </p>
                </div>
              </div>
            </section>

            {/* Prévention */}
            <section className="py-20" aria-labelledby="prevention-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="prevention-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.preventionTitre ?? "Prévenir la gingivite au quotidien"}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {page?.preventionTexte ?? "La prévention de la gingivite passe par une hygiène bucco-dentaire rigoureuse : brossage deux fois par jour avec une brosse à dents souple, utilisation quotidienne du fil dentaire ou de brossettes interdentaires, et visites régulières chez votre dentiste. Arrêter le tabac, équilibrer un diabète éventuel et gérer le stress contribuent également à préserver la santé de vos gencives."}
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-muted/30" aria-labelledby="faq-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="faq-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.faqTitre ?? "Questions fréquentes sur la gingivite"}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq: { question: string; answer: string }, i: number) => (
                    <details key={i} className="bg-card rounded-xl shadow-soft group">
                      <summary className="font-semibold text-lg p-6 cursor-pointer list-none flex items-center justify-between">
                        {faq.question}
                        <span className="text-muted-foreground transition-transform group-open:rotate-45 text-xl">+</span>
                      </summary>
                      <p className="text-muted-foreground px-6 pb-6">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* Liens internes */}
            <section className="py-12">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center">En savoir plus</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Link to="/parodontie" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">Parodontie</h3>
                    <p className="text-muted-foreground text-sm">Découvrez notre expertise en parodontie : diagnostic, traitements et suivi.</p>
                  </Link>
                  <Link to="/gencives-qui-saignent" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">Gencives qui saignent</h3>
                    <p className="text-muted-foreground text-sm">Que faire quand vos gencives saignent ? Causes, solutions et quand consulter.</p>
                  </Link>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-accent/5">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{page?.ctaTitre ?? "Vos gencives sont inflammées ?"}</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {page?.ctaTexte ?? "N'attendez pas que la gingivite évolue. Un diagnostic rapide et un traitement adapté permettent de retrouver des gencives saines en quelques semaines."}
                </p>
                <a href={doctolibUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary-hover">
                    <Calendar className="h-5 w-5" />
                    Prendre rendez-vous
                  </Button>
                </a>
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GingiviteMarseille;
