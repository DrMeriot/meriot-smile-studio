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
  { question: "Pourquoi mes gencives saignent au brossage ?", answer: "Le saignement au brossage est le signe le plus fréquent de la gingivite, une inflammation causée par l'accumulation de plaque dentaire. Un détartrage professionnel et une amélioration de l'hygiène bucco-dentaire suffisent généralement à résoudre le problème." },
  { question: "Est-ce normal que les gencives saignent ?", answer: "Non, des gencives saines ne saignent pas. Le saignement gingival est toujours un signe d'inflammation qu'il faut prendre au sérieux. Même léger, il indique une réaction de la gencive à la présence de bactéries." },
  { question: "Dois-je arrêter de me brosser les dents si mes gencives saignent ?", answer: "Non, au contraire ! Le saignement indique que la zone a besoin d'être mieux nettoyée. Utilisez une brosse à dents souple et brossez doucement mais régulièrement les zones qui saignent. Le saignement devrait diminuer en quelques jours." },
  { question: "Quand faut-il consulter pour des gencives qui saignent ?", answer: "Consultez si les saignements persistent au-delà de 2 semaines malgré une bonne hygiène, s'ils s'accompagnent de douleurs, de gonflements importants, de mauvaise haleine ou si vous constatez un déchaussement des dents." },
  { question: "Les gencives qui saignent peuvent-elles entraîner la perte des dents ?", answer: "Si le saignement est le signe d'une gingivite non traitée, celle-ci peut évoluer en parodontite, qui détruit l'os de soutien des dents et peut effectivement mener à leur perte. D'où l'importance de consulter dès les premiers signes." },
  { question: "Quel spécialiste consulter pour des gencives qui saignent à Marseille ?", answer: "Un parodontologue, chirurgien-dentiste spécialisé dans les maladies des gencives. Diplômée de la Faculté d'odontologie de Marseille et formée en parodontologie (IFPIO Marseille, Académie de paro d'Aix-en-Provence), je prends en charge les saignements gingivaux à mon cabinet de Marseille 4e. Vous pouvez me consulter directement, sans ordonnance." },
  { question: "Mes gencives saignent le matin ou la nuit, est-ce grave ?", answer: "Des saignements constatés au réveil ou sur l'oreiller traduisent souvent une inflammation installée (gingivite, parfois parodontite). C'est un signe à ne pas banaliser. Rassurez-vous : pris à temps, cela se traite généralement simplement. Prenez rendez-vous pour un bilan." },
  { question: "Mes gencives saignent pendant ma grossesse, que faire ?", answer: "Les variations hormonales rendent les gencives plus sensibles : c'est fréquent et réversible. Un détartrage et un suivi doux pendant la grossesse suffisent souvent. J'accompagne les femmes enceintes en toute sécurité, à leur rythme." },
];

const defaultCauses = [
  { title: "Plaque dentaire et tartre", desc: "La cause la plus fréquente : l'accumulation de bactéries sur les dents provoque une inflammation de la gencive qui réagit en saignant." },
  { title: "Brossage inadapté", desc: "Un brossage trop vigoureux, une brosse à dents trop dure ou une technique incorrecte peuvent irriter les gencives et provoquer des saignements." },
  { title: "Tabac", desc: "Le tabac masque les saignements en réduisant la circulation sanguine, ce qui peut retarder le diagnostic d'un problème gingival." },
  { title: "Grossesse", desc: "Les changements hormonaux pendant la grossesse augmentent la sensibilité des gencives et les rendent plus sujettes aux saignements." },
  { title: "Médicaments", desc: "Certains médicaments (anticoagulants, antihypertenseurs) peuvent favoriser les saignements gingivaux." },
  { title: "Carences nutritionnelles", desc: "Un manque de vitamine C ou K peut fragiliser les gencives et augmenter les saignements." },
  { title: "Stress", desc: "Le stress affaiblit les défenses immunitaires et favorise l'inflammation des gencives." },
];

const defaultQuandConsulter = [
  "Saignements persistants depuis plus de 2 semaines",
  "Gencives très rouges, gonflées ou douloureuses",
  "Mauvaise haleine qui ne disparaît pas",
  "Impression que les dents bougent ou se déchaussent",
  "Saignements spontanés (sans brossage)",
  "Apparition de pus entre les dents et la gencive",
];

const defaultConseils = [
  { title: "Brosse à dents souple", desc: "Utilisez une brosse à dents souple et changez-la tous les 3 mois. Brossez-vous les dents 2 fois par jour pendant 2 minutes." },
  { title: "Fil dentaire ou brossettes", desc: "Nettoyez les espaces interdentaires une fois par jour avec du fil dentaire ou des brossettes adaptées à la taille de vos espaces." },
  { title: "Technique de brossage", desc: "Brossez du rose vers le blanc (de la gencive vers la dent) avec des mouvements doux et roulés, sans appuyer trop fort." },
  { title: "Détartrage régulier", desc: "Faites réaliser un détartrage professionnel au moins une fois par an, ou tous les 6 mois si vous êtes sujet aux problèmes de gencives." },
];

const defaultDiagnostic = {
  titre: "Vos gencives saignent : faut-il consulter ?",
  intro: "Un saignement isolé et passager n'a rien d'alarmant. Mais s'il se répète ou s'accompagne d'autres signes, il peut révéler une maladie des gencives — qui se soigne d'autant plus simplement qu'elle est prise tôt. Quelques signes qui méritent l'avis d'un parodontologue :",
  signes: [
    "Saignements répétés ou persistants (plus de 2 semaines)",
    "Gencives rouges, gonflées ou douloureuses",
    "Mauvaise haleine persistante",
    "Déchaussement, ou dents qui bougent ou paraissent plus longues",
    "Saignements spontanés, sans brossage",
  ],
  conclusion: "Bonne nouvelle : prise tôt, l'inflammation des gencives se traite simplement — un détartrage et de bons gestes d'hygiène suffisent souvent. Fidèle à ma philosophie de dentisterie à minima, je vous accompagne à votre rythme pour préserver au maximum vos tissus naturels, sans sur-traitement.",
};

const breadcrumbItems = [
  { name: "Accueil", url: "https://www.dr-meriot-chirurgien-dentiste.fr/" },
  { name: "Parodontie", url: "https://www.dr-meriot-chirurgien-dentiste.fr/parodontie" },
  { name: "Gencives qui saignent", url: "https://www.dr-meriot-chirurgien-dentiste.fr/gencives-qui-saignent" },
];

const GencivesQuiSaignent = () => {
  const loaderData = useLoaderData() as { doc: unknown } | undefined;
  useSeedSanity("gencives_qui_saignent", loaderData?.doc);

  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("gencives_qui_saignent");
  const { data: landing } = useLandingPage<{ body?: unknown[] }>("gencives-qui-saignent");

  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const faqs = page?.faqList ?? defaultFAQs;
  const causes = page?.causesList ?? defaultCauses;
  const quandConsulter = page?.quandConsulterList ?? defaultQuandConsulter;
  const conseils = page?.conseilsList ?? defaultConseils;
  const diagTitre = page?.diagnosticTitre ?? defaultDiagnostic.titre;
  const diagIntro = page?.diagnosticIntro ?? defaultDiagnostic.intro;
  const diagSignes = page?.diagnosticSignes ?? defaultDiagnostic.signes;
  const diagConclusion = page?.diagnosticConclusion ?? defaultDiagnostic.conclusion;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEOHead
        title={page?.seoTitle ?? "Gencives qui saignent : causes et traitement | Dr Meriot Marseille"}
        description={page?.seoDescription ?? "Vos gencives saignent au brossage ? Découvrez les causes du saignement gingival et les solutions. Dr Meriot, spécialiste parodontie à Marseille."}
        canonical="/gencives-qui-saignent"
        keywords="gencives qui saignent, saignement gencives causes, gencives qui saignent brossage, traitement saignement gencives, gencives inflammées, dentiste gencives marseille"
      />
      <FAQSchema faqs={faqs.map((f: { question: string; answer: string }) => ({ question: f.question, answer: f.answer }))} pageUrl="https://www.dr-meriot-chirurgien-dentiste.fr/gencives-qui-saignent" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <MedicalSchema
        pageUrl="/gencives-qui-saignent"
        pageName={page?.seoTitle ?? "Gencives qui saignent : causes et traitement"}
        pageDescription={page?.seoDescription ?? "Causes et traitement des saignements de gencives par le Dr Meriot à Marseille."}
        conditions={[{
          name: "Saignement gingival",
          alternateName: "Gencives qui saignent",
          description: "Saignement des gencives lors du brossage ou spontané, souvent signe d'une gingivite ou d'une parodontite.",
          symptoms: ["Saignement au brossage", "Gencives rouges", "Gencives gonflées", "Mauvaise haleine"],
          riskFactors: ["Plaque dentaire", "Brossage agressif", "Tabac", "Grossesse", "Médicaments anticoagulants"],
          treatment: "Détartrage professionnel, surfaçage radiculaire et conseils d'hygiène",
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
                    {page?.heroTitle ?? "Gencives qui saignent : que faire ?"}
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {page?.heroSubtitle ?? "Vos gencives saignent au brossage ? Ce n'est pas normal — mais c'est souvent réversible quand on agit tôt. Spécialiste en parodontie à Marseille, j'identifie la cause et, fidèle à la dentisterie à minima, je privilégie les soins les plus doux pour préserver vos tissus naturels et vos dents."}
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
                  {page?.definitionTitre ?? "Pourquoi les gencives saignent-elles ?"}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {page?.definitionTexte1 ?? "Les gencives saines sont roses, fermes et ne saignent pas. Quand elles saignent, c'est le signe que quelque chose ne va pas. Le plus souvent, le saignement est causé par une accumulation de plaque dentaire qui provoque une inflammation de la gencive : c'est la gingivite."}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {page?.definitionTexte2 ?? "Le saignement gingival est le premier signal d'alarme que votre corps vous envoie. Si vous l'ignorez, l'inflammation peut progresser vers les tissus plus profonds (os, ligament) et devenir une parodontite, avec un risque de déchaussement et de perte des dents."}
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
                  {page?.causesTitre ?? "Les causes du saignement des gencives"}
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

            {/* Quand consulter */}
            <section className="py-20" aria-labelledby="quand-consulter-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="quand-consulter-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.quandConsulterTitre ?? "Quand consulter un dentiste ?"}
                </h2>
                <ul className="space-y-4">
                  {quandConsulter.map((s: string, i: number) => (
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
                  {page?.traitementTitre ?? "Comment traiter les saignements de gencives ?"}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {page?.traitementTexte ?? "Le traitement commence toujours par un diagnostic précis : j'examine vos gencives, je mesure les poches parodontales si nécessaire et j'identifie la cause du saignement. Le traitement de base — un détartrage complet et des conseils d'hygiène personnalisés — suffit le plus souvent. Si une parodontite est présente, un surfaçage radiculaire peut compléter les soins pour nettoyer en profondeur sous la gencive. Fidèle à la dentisterie à minima, j'adopte une approche douce et progressive : je commence par le geste le moins invasif et je vous explique chaque étape avec clarté, pour préserver vos dents naturelles."}
                  </p>
                </div>
              </div>
            </section>

            {/* Conseils */}
            <section className="py-20" aria-labelledby="conseils-title">
              <div className="container mx-auto px-4 max-w-5xl">
                <h2 id="conseils-title" className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  {page?.conseilsTitre ?? "Mes conseils pour des gencives saines"}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {conseils.map((c: { title: string; desc: string }, i: number) => (
                    <div key={i} className="bg-card rounded-xl p-6 shadow-soft">
                      <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
                      <p className="text-muted-foreground">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-muted/30" aria-labelledby="faq-title">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 id="faq-title" className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {page?.faqTitre ?? "Questions fréquentes sur les saignements de gencives"}
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
                <div className="grid md:grid-cols-3 gap-6">
                  <Link to="/parodontie" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">Parodontologue à Marseille</h3>
                    <p className="text-muted-foreground text-sm">Mon expertise des maladies des gencives : diagnostic, traitement et suivi.</p>
                  </Link>
                  <Link to="/gingivite-marseille" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">Gingivite</h3>
                    <p className="text-muted-foreground text-sm">Tout savoir sur la gingivite : causes, symptômes et traitement à Marseille.</p>
                  </Link>
                  <Link to="/dechaussement-dentaire-marseille" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-lg mb-2">Déchaussement dentaire</h3>
                    <p className="text-muted-foreground text-sm">Dents qui se déchaussent : causes, traitement et prévention à Marseille.</p>
                  </Link>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-accent/5">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{page?.ctaTitre ?? "Vos gencives saignent ?"}</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {page?.ctaTexte ?? "Le saignement des gencives n'est pas à banaliser, mais il se traite d'autant plus simplement qu'on agit tôt. Prenons le temps d'un bilan : je vous propose la solution la plus douce pour préserver vos gencives et vos dents."}
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

export default GencivesQuiSaignent;
