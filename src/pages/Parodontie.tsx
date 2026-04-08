import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, AlertCircle, Search, Sparkles, Scissors, UserCheck, ClipboardCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import ParoGlossary from "@/components/ParoGlossary";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const defaultFAQs = [
  { question: "Qu'est-ce que la parodontie ?", answer: "La parodontie est la spécialité dentaire qui traite les maladies des gencives et des tissus de soutien des dents (os alvéolaire, ligament parodontal). Elle prend en charge la gingivite, la parodontite et le déchaussement dentaire." },
  { question: "Comment savoir si j'ai une maladie des gencives ?", answer: "Les signes d'alerte incluent : gencives qui saignent au brossage, gencives rouges ou gonflées, mauvaise haleine persistante, déchaussement ou mobilité des dents, sensibilité au niveau des collets. Consultez rapidement si vous observez ces symptômes." },
  { question: "Le traitement parodontal fait-il mal ?", answer: "Les traitements parodontaux sont réalisés sous anesthésie locale pour garantir votre confort. Le surfaçage radiculaire est indolore pendant l'intervention. Une légère sensibilité peut persister quelques jours après, facilement soulagée par des antalgiques." },
  { question: "Combien coûte un traitement parodontal à Marseille ?", answer: "Le coût varie selon la sévérité de la maladie. Le Dr Meriot est conventionnée secteur 1, garantissant des tarifs maîtrisés. Un devis détaillé vous est remis après le bilan parodontal initial. Une partie des soins est prise en charge par l'Assurance Maladie." },
  { question: "La parodontite est-elle réversible ?", answer: "La gingivite est totalement réversible avec un traitement adapté. La parodontite entraîne une perte osseuse irréversible, mais le traitement permet de stopper l'évolution de la maladie, de préserver les dents et de retrouver des gencives saines." },
  { question: "Quels sont les facteurs de risque de la parodontite ?", answer: "Les principaux facteurs sont : le tabac (risque multiplié par 3), le diabète mal équilibré, le stress, certains médicaments, la génétique, et une hygiène bucco-dentaire insuffisante. Un suivi régulier permet de prévenir et dépister précocement." },
];

const defaultSymptomes = [
  { title: "Gencives qui saignent", desc: "Au brossage, lors du passage du fil dentaire, ou même spontanément. C'est souvent le premier signe d'une gingivite." },
  { title: "Gencives gonflées ou rouges", desc: "Une inflammation visible, des gencives sensibles au toucher, ou une couleur rouge foncé au lieu de rose pâle." },
  { title: "Mauvaise haleine persistante", desc: "Une halitose chronique peut être causée par des bactéries sous la gencive." },
  { title: "Déchaussement ou mobilité", desc: "Racines apparentes, dents qui bougent, espaces entre les dents qui s'élargissent avec tassements alimentaires." },
];

const defaultGingiviteItems = [
  "des gencives rouges, gonflées,",
  "des saignements au brossage,",
  "parfois une mauvaise haleine.",
];

const defaultParodontiteItems = [
  "un déchaussement des dents,",
  "leur mobilité,",
  "des rétractations de la gencive,",
  "des infections ou des abcès.",
];

const defaultTraitements = [
  { icon: "Search", step: "1", title: "Un diagnostic complet pour bien vous accompagner", desc: "Avant tout traitement, nous réalisons un examen précis de vos gencives et de l'os autour des dents. Cela comprend :", items: ["un examen clinique détaillé,", "la mesure des poches parodontales,", "l'évaluation de la mobilité des dents,", "l'analyse de la plaque et de l'inflammation,", "et des radiographies."], note: "Ce bilan complet permet de définir un plan de soins personnalisé et sécurisé, adapté à votre situation et à votre confort." },
  { icon: "Sparkles", step: "2", title: "Le détartrage et l'accompagnement à l'hygiène", desc: "La première étape du traitement consiste à éliminer la plaque dentaire et le tartre, et à vous accompagner dans l'amélioration de votre hygiène bucco-dentaire au quotidien.", items: ["Détartrage professionnel complet", "Conseils personnalisés de brossage", "Choix des outils adaptés (brossettes, fil dentaire)"], note: null },
  { icon: "Scissors", step: "3", title: "Le surfaçage radiculaire : un nettoyage en profondeur", desc: "Si nécessaire, nous réalisons un surfaçage radiculaire sous anesthésie locale. Ce soin consiste à nettoyer en profondeur sous la gencive pour éliminer les bactéries et le tartre qui se sont accumulés sur les racines des dents.", items: ["Indolore (sous anesthésie locale)", "Réalisé en 2 à 4 séances selon les cas", "Permet de réduire les poches parodontales"], note: null },
  { icon: "UserCheck", step: "4", title: "La chirurgie parodontale (si nécessaire)", desc: "Dans les cas les plus avancés, une chirurgie parodontale peut être proposée pour accéder directement aux racines et à l'os.", items: ["Réduction chirurgicale des poches profondes", "Greffe gingivale pour recouvrir les racines exposées", "Régénération osseuse guidée"], note: null },
  { icon: "ClipboardCheck", step: "5", title: "Le suivi parodontal : la clé du succès à long terme", desc: "Le traitement parodontal ne s'arrête pas après les soins. Un suivi régulier est essentiel.", items: ["Détartrages professionnels tous les 3 à 6 mois", "Contrôle de l'état des gencives", "Ajustement des conseils d'hygiène"], note: null },
];

const breadcrumbItems = [
  { name: "Accueil", url: "https://dr-meriot-dentiste.fr/" },
  { name: "Parodontie", url: "https://dr-meriot-dentiste.fr/parodontie" }
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search, Sparkles, Scissors, UserCheck, ClipboardCheck,
};

const Parodontie = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("parodontie");

  const tel = global?.phone ?? global?.telephone ?? "09 83 43 96 21";
  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const faqs = page?.faqList ?? defaultFAQs;
  const symptomes = page?.symptomesList ?? defaultSymptomes;
  const gingiviteItems = page?.gingiviteItems ?? defaultGingiviteItems;
  const parodontiteItems = page?.parodontiteItems ?? defaultParodontiteItems;
  const traitements = page?.traitementsList ?? defaultTraitements;
  const seoTitle = page?.seoTitle ?? "Parodontie Marseille & PACA | Dr Stéphanie Meriot - Spécialiste Gencives";
  const seoDesc = page?.seoDescription ?? `Spécialiste parodontie à Marseille et région PACA : Pays d'Aix, Aubagne, La Ciotat, Côte Bleue, Étang de Berre. Traitement gingivite et parodontite. ☎ ${tel}`;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical="/parodontie"
        keywords="parodontie marseille, parodontologue marseille, gingivite traitement, parodontite soins, déchaussement dentaire, saignement gencives, surfaçage radiculaire, greffe gingivale"
      />
      <FAQSchema faqs={faqs.map((f: { question: string; answer?: string; reponse?: string }) => ({ question: f.question, answer: f.reponse ?? f.answer ?? "" }))} pageUrl="https://dr-meriot-dentiste.fr/parodontie" />
      <BreadcrumbSchema items={breadcrumbItems} />
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
                  {page?.heroTitle ?? "Parodontie à Marseille"}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {page?.heroSubtitle ?? "Spécialiste en parodontie, je prends soin de la santé de vos gencives et des tissus de soutien de vos dents. Formation approfondie à l'Académie de paro à Aix-en-Provence."}
                </p>
              </div>
            </div>
          </section>

          {/* Qu'est-ce que la parodontie */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{page?.definitionTitre ?? "Qu'est-ce que la parodontie ?"}</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {page?.definitionTexte1 ?? "La parodontie est la spécialité dentaire qui traite les maladies des gencives et des tissus de soutien des dents (os, ligament). Ces tissus forment le parodonte, l'ensemble des structures qui ancrent vos dents dans votre mâchoire."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {page?.definitionTexte2 ?? "Sans traitement, les maladies parodontales peuvent entraîner un déchaussement et même la perte de vos dents. Heureusement, une prise en charge précoce permet de stabiliser et d'améliorer votre santé parodontale."}
                </p>
              </div>
            </div>
          </section>

          {/* Symptômes */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{page?.symptomesTitre ?? "Symptômes à surveiller"}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {symptomes.map((s: { title: string; desc: string }, i: number) => (
                  <Card key={i} className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                          <p className="text-muted-foreground">{s.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Les maladies parodontales */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{page?.maladiesTitre ?? "Les maladies parodontales : comprendre simplement"}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12 text-center max-w-3xl mx-auto">
                {page?.maladiesIntro ?? "Les maladies parodontales touchent les tissus qui entourent et soutiennent les dents : la gencive et l'os. Elles sont causées par l'accumulation de bactéries autour des dents. On distingue deux étapes : la gingivite et la parodontite."}
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-accent/5 rounded-2xl p-8 border border-accent/20">
                  <h3 className="text-2xl font-bold mb-4 text-accent">{page?.gingiviteTitre ?? "La gingivite : le premier signe d'alerte"}</h3>
                  <p className="text-muted-foreground mb-4">{page?.gingiviteTexte ?? "La gingivite est une inflammation de la gencive. Elle peut se manifester par :"}</p>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    {gingiviteItems.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-accent mt-1">•</span>{item}</li>
                    ))}
                  </ul>
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      {page?.gingiviteNote ?? "La bonne nouvelle : la gingivite est totalement réversible. Un nettoyage professionnel et de bonnes habitudes d'hygiène suffisent généralement pour retrouver une gencive saine."}
                    </p>
                  </div>
                </div>
                <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
                  <h3 className="text-2xl font-bold mb-4 text-primary">{page?.parodontiteTitre ?? "La parodontite : quand l'inflammation va plus loin"}</h3>
                  <p className="text-muted-foreground mb-4">{page?.parodontiteTexte ?? "Si la gingivite n'est pas traitée, l'inflammation peut progresser vers les tissus plus profonds. On parle alors de parodontite. Cette maladie peut provoquer :"}</p>
                  <ul className="space-y-2 text-muted-foreground mb-6">
                    {parodontiteItems.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2"><span className="text-primary mt-1">•</span>{item}</li>
                    ))}
                  </ul>
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                    <p className="text-amber-800 dark:text-amber-200 font-medium">
                      {page?.parodontiteNote ?? "La parodontite entraîne une perte de l'os qui soutient les dents. Cette perte est irréversible, mais le traitement permet de stopper l'évolution de la maladie et de préserver les dents."}
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
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{page?.traitementsTitre ?? "Les traitements parodontaux : comment soigne-t-on les gencives ?"}</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {page?.traitementsIntro ?? "Les maladies des gencives se soignent très bien lorsqu'elles sont prises en charge à temps. Les traitements parodontaux sont réalisés de façon douce, progressive et toujours adaptée à votre confort. L'objectif : stopper l'inflammation, préserver vos dents et retrouver une bouche saine et sereine."}
                </p>
              </div>

              <div className="space-y-8">
                {traitements.map((step: { icon?: string; step: string; title: string; desc: string; items: string[]; note: string | null }, i: number) => {
                  const iconNames = ["Search", "Sparkles", "Scissors", "UserCheck", "ClipboardCheck"];
                  const colors = [
                    { color: "bg-primary/10", iconColor: "text-primary", badgeBg: "bg-primary" },
                    { color: "bg-accent/10", iconColor: "text-accent", badgeBg: "bg-accent" },
                    { color: "bg-primary/10", iconColor: "text-primary", badgeBg: "bg-primary" },
                    { color: "bg-accent/10", iconColor: "text-accent", badgeBg: "bg-accent" },
                    { color: "bg-primary/10", iconColor: "text-primary", badgeBg: "bg-primary" },
                  ];
                  const iconName = step.icon ?? iconNames[i] ?? "Search";
                  const Icon = iconMap[iconName] ?? Search;
                  const c = colors[i] ?? colors[0];
                  return (
                    <div key={i} className="bg-card rounded-2xl p-8 shadow-soft">
                      <div className="flex items-start gap-6">
                        <div className={`p-4 ${c.color} rounded-xl flex-shrink-0`}>
                          <Icon className={`h-8 w-8 ${c.iconColor}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`${c.badgeBg} text-white text-sm font-bold px-3 py-1 rounded-full`}>{step.step}</span>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-4">{step.desc}</p>
                          <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                            {step.items.map((item: string, j: number) => (
                              <li key={j} className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 ${c.iconColor === "text-primary" ? "bg-primary" : "bg-accent"} rounded-full`}></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                          {step.note && <p className="text-muted-foreground mt-4 italic">{step.note}</p>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{page?.faqTitre ?? "Questions fréquentes sur la parodontie"}</h2>
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

          {/* Glossaire */}
          <ParoGlossary />

          {/* Cross-links */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-center">{page?.crosslinksTitre ?? "Découvrez nos autres spécialités"}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link to="/implantologie" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Implantologie</h3>
                  <p className="text-muted-foreground text-sm">Remplacez vos dents manquantes par des implants dentaires durables et esthétiques.</p>
                </Link>
                <Link to="/esthetique" className="bg-card rounded-xl p-6 shadow-soft hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Esthétique dentaire</h3>
                  <p className="text-muted-foreground text-sm">Retrouvez un sourire éclatant grâce à nos solutions esthétiques personnalisées.</p>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-accent/5">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{page?.ctaTitre ?? "Prenez soin de vos gencives"}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {page?.ctaTexte ?? "N'attendez pas que les symptômes s'aggravent. Plus le diagnostic est précoce, plus le traitement est simple et efficace."}
              </p>
              <a href={doctolibUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary-hover">
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
