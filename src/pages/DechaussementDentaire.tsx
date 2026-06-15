import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { useGlobalSettings, useSanityPage, useLandingPage } from "@/hooks/useSanityContent";
import { useSeedSanity } from "@/hooks/useSeedSanity";
import { portableTextComponents } from "@/lib/portableTextComponents";
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
  { question: "Le déchaussement dentaire est-il irréversible ?", answer: "La perte osseuse causée par la parodontite est irréversible, mais le traitement permet d'en stopper l'évolution. La greffe gingivale peut recouvrir les racines exposées et les techniques de régénération osseuse peuvent restaurer partiellement le tissu perdu. Fidèle à la dentisterie à minima, mon objectif est de conserver vos dents naturelles le plus longtemps possible." },
  { question: "Comment savoir si mes dents se déchaussent ?", answer: "Les signes incluent : des dents qui paraissent plus longues, des racines visibles, une sensibilité au froid et au chaud au niveau des collets, des espaces qui apparaissent entre les dents, et une mobilité dentaire. Un bilan parodontal au cabinet permet un diagnostic précis." },
  { question: "Quel spécialiste consulter pour un déchaussement dentaire à Marseille ?", answer: "Un parodontologue, chirurgien-dentiste spécialisé dans les maladies des gencives et de l'os de soutien des dents. Diplômée de la Faculté d'odontologie de Marseille et formée en parodontologie (IFPIO Marseille, Académie de paro d'Aix-en-Provence), je prends en charge le déchaussement dentaire à mon cabinet de Marseille 4e. Vous pouvez me consulter directement, sans ordonnance." },
  { question: "Combien coûte le traitement du déchaussement dentaire ?", answer: "Le coût dépend de la sévérité du déchaussement et du traitement nécessaire. Une partie des soins parodontaux n'est pas prise en charge par l'Assurance Maladie : je vous remets toujours un devis détaillé et transparent après le bilan, avant tout traitement." },
  { question: "Peut-on prévenir le déchaussement dentaire ?", answer: "Oui, une hygiène bucco-dentaire rigoureuse, l'arrêt du tabac et des visites régulières chez le dentiste permettent de prévenir le déchaussement. Un détartrage professionnel régulier élimine le tartre que le brossage ne peut pas atteindre." },
  { question: "Le déchaussement dentaire fait-il mal ?", answer: "Le déchaussement est souvent indolore dans les premiers stades, ce qui le rend sournois. La sensibilité au froid et au chaud apparaît quand les racines sont exposées. Une douleur peut survenir en cas d'infection ou d'abcès parodontal." },
  { question: "Une dent qui bouge, est-ce un déchaussement ?", answer: "Chez l'adulte, une dent qui bouge est rarement anodine : c'est souvent le signe que l'os qui la soutient a été détruit par une parodontite. Il ne faut pas attendre — plus on consulte tôt, plus il existe de solutions douces pour stabiliser la dent et éviter de la perdre. Je réalise un bilan parodontal pour évaluer précisément la mobilité." },
  { question: "La gencive repousse-t-elle après un surfaçage ou une greffe ?", answer: "Une gencive rétractée ne repousse pas spontanément. En revanche, après un surfaçage, l'inflammation régresse et la gencive se raffermit. Quand la racine est très exposée, une greffe gingivale permet de la recouvrir. Après le bilan, je vous explique ce qui est réaliste et utile dans votre situation." },
  { question: "Je fume : puis-je faire soigner mon déchaussement ?", answer: "Oui, et c'est important : le tabac multiplie par 3 à 6 le risque de déchaussement sévère. Le traitement de base (surfaçage, hygiène) reste possible, mais les greffes de gencive cicatrisent mal chez le fumeur et sont déconseillées tant que le tabac n'est pas réduit. Réduire ou arrêter, même progressivement, améliore nettement le pronostic. Je vous accompagne sans jugement, à votre rythme." },
  { question: "La ménopause peut-elle aggraver le déchaussement ?", answer: "Oui. La baisse hormonale de la ménopause fragilise les gencives et peut accélérer la récession et la perte osseuse. Un suivi parodontal régulier permet de surveiller et de protéger vos gencives pendant cette période — n'hésitez pas à consulter dès les premiers signes." },
];

const defaultDiagnostic = {
  titre: "Vos dents se déchaussent : faut-il consulter ?",
  intro: "Une racine qui devient visible ou une dent qui paraît plus longue n'est pas qu'un détail esthétique : c'est souvent le signe d'une parodontite qui détruit, en silence, l'os qui soutient la dent. Plus on agit tôt, plus on préserve ce qui peut l'être. Quelques signes qui méritent l'avis d'un parodontologue :",
  signes: [
    "Une ou plusieurs dents qui paraissent plus longues",
    "Des racines visibles ou des collets sensibles au froid",
    "Des espaces qui s'élargissent entre les dents",
    "Une dent qui bouge, même légèrement",
    "Des tassements alimentaires fréquents entre les dents",
  ],
  conclusion: "La perte osseuse déjà installée ne se rattrape pas entièrement, mais on peut stopper son évolution et stabiliser vos dents — d'autant mieux qu'on intervient tôt. Fidèle à ma philosophie de dentisterie à minima, mon objectif premier est de conserver vos dents naturelles, sans geste inutile.",
};

const defaultCauses = [
  { title: "Parodontite", desc: "La cause principale du déchaussement dentaire est la parodontite, une infection bactérienne qui détruit progressivement l'os et la gencive autour des dents." },
  { title: "Brossage trop agressif", desc: "Un brossage trop vigoureux ou une brosse à dents dure peuvent provoquer une récession gingivale mécanique." },
  { title: "Tabac", desc: "Le tabac accélère la perte osseuse et masque les signes d'inflammation, retardant le diagnostic." },
  { title: "Bruxisme", desc: "Le grincement ou le serrement des dents exerce des forces excessives qui peuvent fragiliser le parodonte." },
  { title: "Génétique", desc: "Certaines personnes ont une prédisposition génétique à la perte d'attache parodontale." },
  { title: "Malocclusion", desc: "Un alignement anormal des dents peut créer des zones de surcharge favorisant le déchaussement." },
  { title: "Variations hormonales", desc: "Les bouleversements hormonaux — ménopause, mais aussi grossesse — fragilisent les gencives et peuvent favoriser leur rétraction." },
];

const defaultSymptomes = [
  "Dents qui paraissent plus longues (racines visibles)",
  "Sensibilité au froid et au chaud au niveau des collets",
  "Espaces entre les dents qui s'élargissent",
  "Mobilité des dents",
  "Tassements alimentaires fréquents entre les dents",
  "Gencives rétractées ou asymétriques",
];

const defaultTraitements = [
  { title: "Surfaçage radiculaire", desc: "Nettoyage en profondeur des racines sous la gencive pour éliminer les bactéries et le tartre, réalisé sous anesthésie locale." },
  { title: "Greffe gingivale", desc: "Technique chirurgicale qui permet de recouvrir les racines exposées en déplaçant ou en greffant du tissu gingival." },
  { title: "Régénération osseuse guidée", desc: "Technique avancée qui stimule la reformation de l'os perdu autour des dents à l'aide de biomatériaux." },
  { title: "Suivi parodontal", desc: "Visites régulières tous les 3 à 6 mois pour maintenir les résultats et prévenir toute récidive." },
];

const breadcrumbItems = [
  { name: "Accueil", url: "https://www.dr-meriot-chirurgien-dentiste.fr/" },
  { name: "Parodontie", url: "https://www.dr-meriot-chirurgien-dentiste.fr/parodontie" },
  { name: "Déchaussement dentaire", url: "https://www.dr-meriot-chirurgien-dentiste.fr/dechaussement-dentaire-marseille" },
];

const DechaussementDentaire = () => {
  const loaderData = useLoaderData() as { doc: unknown } | undefined;
  useSeedSanity("dechaussement_dentaire", loaderData?.doc);

  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("dechaussement_dentaire");
  const { data: landing } = useLandingPage<{ body?: unknown[] }>("dechaussement-dentaire-marseille");

  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const faqs = page?.faqList ?? defaultFAQs;
  const causes = page?.causesList ?? defaultCauses;
  const symptomes = page?.symptomesList ?? defaultSymptomes;
  const traitements = page?.traitementsList ?? defaultTraitements;
  const diagTitre = page?.diagnosticTitre ?? defaultDiagnostic.titre;
  const diagIntro = page?.diagnosticIntro ?? defaultDiagnostic.intro;
  const diagSignes = page?.diagnosticSignes ?? defaultDiagnostic.signes;
  const diagConclusion = page?.diagnosticConclusion ?? defaultDiagnostic.conclusion;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEOHead
        title={page?.seoTitle ?? "Déchaussement dentaire à Marseille — Dr Meriot, parodontologue"}
        description={page?.seoDescription ?? "Traitement du déchaussement dentaire à Marseille. Dents qui se déchaussent, racines exposées ? Le Dr Meriot, spécialiste parodontie, traite la récession gingivale."}
        canonical="/dechaussement-dentaire-marseille"
        keywords="déchaussement dentaire marseille, récession gingivale, dents qui se déchaussent, greffe gingivale marseille, racines exposées, traitement déchaussement"
      />
      <FAQSchema faqs={faqs.map((f: { question: string; answer: string }) => ({ question: f.question, answer: f.answer }))} pageUrl="https://www.dr-meriot-chirurgien-dentiste.fr/dechaussement-dentaire-marseille" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <MedicalSchema
        pageUrl="/dechaussement-dentaire-marseille"
        pageName={page?.seoTitle ?? "Déchaussement dentaire : traitement à Marseille"}
        pageDescription={page?.seoDescription ?? "Traitement du déchaussement dentaire à Marseille par le Dr Meriot."}
        conditions={[{
          name: "Récession gingivale",
          alternateName: "Déchaussement dentaire",
          description: "Rétraction progressive de la gencive exposant la racine des dents, souvent causée par une parodontite ou un brossage trop agressif.",
          symptoms: ["Racines dentaires exposées", "Sensibilité au froid", "Dents qui paraissent plus longues", "Mobilité dentaire"],
          riskFactors: ["Parodontite", "Brossage agressif", "Tabac", "Bruxisme", "Génétique"],
          treatment: "Surfaçage radiculaire, greffe gingivale et régénération osseuse guidée",
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
                    <span className="text-sm font-medium">Soins parodontaux</span>
                  </div>
                  <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    {page?.heroTitle ?? "Déchaussement dentaire à Marseille"}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {page?.heroSubtitle ?? "Vos dents paraissent plus longues ? Vos racines sont visibles ? Le déchaussement dentaire (récession gingivale) est souvent le signe d'une parodontite. Spécialiste en parodontie à Marseille, je pose le diagnostic et, fidèle à la dentisterie à minima, je privilégie les soins les plus doux pour stabiliser et conserver vos dents."}
                  </p>
                </div>
              </div>
            </section>

            {/* Auto-diagnostic — faut-il consulter ? */}
            <section className="py-16 bg-accent/5" aria-labelledby="diagnostic-title">
              <div className="container mx-auto px-4 max-w-3xl">
                <div className="bg-card rounded-2xl p-8 shadow-soft border border-accent/20">
                  <h2 id="diagnostic-title" className="text-2xl md:text-3xl font-bold mb-4 flex items-start gap-3">
                    <AlertCircle className="h-7 w-7 text-accent flex-shrink-0 mt-1" />
                    <span>{diagTitre}</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">{diagIntro}</p>
                  <ul className="space-y-3 mb-6">
                    {diagSignes.map((s: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-accent mt-1 flex-shrink-0">•</span>
                        <span className="text-muted-foreground">{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">{diagConclusion}</p>
                  <a href={doctolibUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2 bg-primary hover:bg-primary-hover">
                      <Calendar className="h-5 w-5" />
                      Prendre rendez-vous
                    </Button>
                  </a>
                </div>
              </div>
            </section>

            {/* Définition */}
            <section className="py-20" aria-labelledby="definition-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="definition-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.definitionTitre ?? "Qu'est-ce que le déchaussement dentaire ?"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {page?.definitionTexte1 ?? "Le déchaussement dentaire, ou récession gingivale, désigne la rétraction progressive de la gencive qui entoure les dents. Ce phénomène expose la racine dentaire, normalement protégée par la gencive, et peut entraîner une sensibilité accrue, des problèmes esthétiques et, dans les cas avancés, une mobilité des dents."}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {page?.definitionTexte2 ?? "Le déchaussement dentaire peut toucher une seule dent ou plusieurs. Il évolue souvent lentement et sans douleur, ce qui le rend difficile à détecter sans un examen professionnel. C'est pourquoi un bilan parodontal régulier est essentiel pour le dépister à temps."}
                </p>
              </div>
            </section>

            {/* PortableText body (optionnel, depuis Sanity landing_page) */}
            {Array.isArray(landing?.body) && landing!.body!.length > 0 && (
              <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl prose prose-lg">
                  <PortableText value={landing!.body as never} components={portableTextComponents} />
                </div>
              </section>
            )}

            {/* Causes */}
            <section className="py-20 bg-muted/30" aria-labelledby="causes-title">
              <div className="container mx-auto px-4 max-w-5xl">
                <h2 id="causes-title" className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  {page?.causesTitre ?? "Les causes du déchaussement dentaire"}
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
                  {page?.symptomesTitre ?? "Les signes du déchaussement dentaire"}
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

            {/* Traitements */}
            <section className="py-20 bg-muted/30" aria-labelledby="traitement-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="traitement-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.traitementTitre ?? "Comment traiter le déchaussement dentaire ?"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {page?.traitementTexte ?? "Le traitement du déchaussement dentaire dépend de sa cause et de sa sévérité. Je commence toujours par stabiliser la maladie avec les gestes les moins invasifs, et je ne propose une chirurgie reconstructrice que lorsqu'elle apporte un réel bénéfice. Fidèle à la dentisterie à minima, mon objectif reste de conserver vos dents naturelles."}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {traitements.map((t: { title: string; desc: string }, i: number) => (
                    <div key={i} className="bg-card rounded-xl p-6 shadow-soft">
                      <h3 className="font-semibold text-lg mb-2">{t.title}</h3>
                      <p className="text-muted-foreground">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="py-20" aria-labelledby="faq-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="faq-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.faqTitre ?? "Questions fréquentes sur le déchaussement dentaire"}
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
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-center">En savoir plus</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Link to="/parodontie" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">Parodontologue à Marseille</h3>
                    <p className="text-muted-foreground text-sm">Mon expertise des maladies parodontales : diagnostic, traitement et suivi.</p>
                  </Link>
                  <Link to="/gingivite-marseille" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">Gingivite</h3>
                    <p className="text-muted-foreground text-sm">Tout savoir sur la gingivite : causes, symptômes et traitement à Marseille.</p>
                  </Link>
                  <Link to="/blog/dent-qui-bouge-adulte-que-faire" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">Dent qui bouge chez l'adulte</h3>
                    <p className="text-muted-foreground text-sm">Que faire face à une dent mobile ? Causes, urgences et solutions expliquées par le Dr Meriot.</p>
                  </Link>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-accent/5">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{page?.ctaTitre ?? "Vos dents se déchaussent ?"}</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {page?.ctaTexte ?? "Plus le diagnostic est précoce, plus les solutions sont simples et efficaces. Je réalise un bilan parodontal complet pour évaluer votre situation et vous proposer le traitement le plus doux et le plus adapté."}
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

export default DechaussementDentaire;
