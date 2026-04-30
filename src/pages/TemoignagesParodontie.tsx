import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SEOHead from "@/components/SEOHead";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalSettings } from "@/hooks/useSanityContent";

// Témoignages anonymisés de patients pris en charge pour des soins
// parodontaux. La page est indexée mais volontairement absente de la
// navigation principale (Header / menu mobile) — l'accès se fait depuis
// la home, /parodontie et le footer.
const testimonials = [
  {
    name: "Marie D.",
    age: "58 ans",
    motif: "Parodontite — déchaussement avancé",
    rating: 5,
    text: "J'avais une parodontite avec des dents qui commençaient à bouger. Le Dr Meriot a pris le temps d'expliquer chaque étape : bilan, surfaçage en plusieurs séances, suivi tous les 3 mois. Aujourd'hui mes gencives ne saignent plus et la mobilité s'est stabilisée. Un vrai soulagement.",
    date: "2026-02-15",
  },
  {
    name: "Jean-Paul R.",
    age: "62 ans",
    motif: "Surfaçage radiculaire",
    rating: 5,
    text: "Très anxieux à l'idée du surfaçage, j'ai été agréablement surpris : tout s'est passé sans douleur sous anesthésie locale. L'écoute du Dr Meriot et son approche douce m'ont vraiment rassuré. Mes poches parodontales se sont refermées progressivement.",
    date: "2026-01-20",
  },
  {
    name: "Sophie L.",
    age: "45 ans",
    motif: "Greffe gingivale",
    rating: 5,
    text: "J'avais une récession gingivale visible sur une incisive. La greffe gingivale a été réalisée avec une grande précision. Six mois plus tard, le résultat esthétique est parfait et la dent n'est plus sensible au froid. Je recommande sans réserve.",
    date: "2025-12-08",
  },
  {
    name: "Antoine M.",
    age: "51 ans",
    motif: "Gingivite chronique",
    rating: 5,
    text: "Mes gencives saignaient depuis des années, j'avais fini par penser que c'était normal. Après un détartrage approfondi et quelques conseils précis sur le brossage, tout est rentré dans l'ordre en quelques semaines. J'aurais dû consulter plus tôt.",
    date: "2025-11-12",
  },
  {
    name: "Claire B.",
    age: "39 ans",
    motif: "Bilan parodontal préventif",
    rating: 5,
    text: "Adressée par mon dentiste traitant pour un bilan, j'ai trouvé une professionnelle pédagogue qui m'a expliqué l'état réel de mes gencives sans dramatiser. Plan de soins clair, devis transparent, cabinet conventionné Secteur 1.",
    date: "2025-10-03",
  },
  {
    name: "Henri V.",
    age: "67 ans",
    motif: "Maintenance parodontale",
    rating: 5,
    text: "Je suis le Dr Meriot depuis 3 ans en maintenance parodontale tous les 4 mois. Mes gencives sont stabilisées, je n'ai plus perdu une seule dent. Un suivi sérieux et bienveillant qui change tout.",
    date: "2025-09-22",
  },
  {
    name: "Laetitia P.",
    age: "34 ans",
    motif: "Gencives qui saignent",
    rating: 5,
    text: "Saignements quotidiens au brossage et mauvaise haleine. Une seule séance de détartrage profond + accompagnement à l'hygiène, et tout a changé. Le Dr Meriot prend vraiment le temps d'expliquer.",
    date: "2025-08-14",
  },
  {
    name: "Patrick G.",
    age: "59 ans",
    motif: "Régénération osseuse",
    rating: 5,
    text: "Cas avancé avec perte osseuse importante sur une molaire. Le Dr Meriot a proposé une régénération osseuse guidée — je redoutais l'intervention, elle s'est déroulée sereinement. Aujourd'hui la dent est conservée, ce qui m'a évité un implant.",
    date: "2025-07-05",
  },
];

const breadcrumbItems = [
  { name: "Accueil", url: "https://www.dr-meriot-chirurgien-dentiste.fr/" },
  { name: "Parodontie", url: "https://www.dr-meriot-chirurgien-dentiste.fr/parodontie" },
  { name: "Témoignages", url: "https://www.dr-meriot-chirurgien-dentiste.fr/parodontie/temoignages" },
];

const TemoignagesParodontie = () => {
  const { data: global } = useGlobalSettings();
  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Schema.org Review + AggregateRating — renforce l'E-E-A-T sur un sujet YMYL santé
  // et peut générer des étoiles dans les SERP.
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://www.dr-meriot-chirurgien-dentiste.fr/parodontie/temoignages#reviews",
    name: "Cabinet Dr Stéphanie Meriot — Parodontie Marseille",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: testimonials.length.toString(),
      reviewCount: testimonials.length.toString(),
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      datePublished: t.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: t.text,
      itemReviewed: {
        "@type": "MedicalProcedure",
        name: t.motif,
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Témoignages parodontie Marseille — Patients du Dr Meriot"
        description="Témoignages anonymisés de patients pris en charge pour des soins parodontaux (gingivite, parodontite, greffe gingivale, surfaçage) au cabinet du Dr Meriot, Marseille 4ème."
        canonical="/parodontie/temoignages"
        keywords="témoignages parodontie marseille, avis parodontologue marseille, dr meriot avis, traitement gencives avis"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Head>
        <script type="application/ld+json">{JSON.stringify(reviewsSchema)}</script>
      </Head>
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <article>
            <section className="py-20 bg-gradient-soft">
              <div className="container mx-auto px-4 max-w-4xl">
                <Link to="/parodontie" className="inline-flex items-center text-primary hover:underline mb-8">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la page Parodontie
                </Link>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                    <Quote className="h-4 w-4" />
                    <span className="text-sm font-medium">Paroles de patients</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Témoignages — Parodontie au cabinet du Dr Meriot
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                    Les patients accompagnés au cabinet pour des soins parodontaux à Marseille partagent
                    leur expérience : gingivite, parodontite, surfaçage radiculaire, greffe gingivale,
                    régénération osseuse, maintenance.
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="text-2xl font-bold">5/5</span>
                    <span className="text-muted-foreground">({testimonials.length} témoignages)</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    Témoignages anonymisés — prénom modifié, accord patient.
                  </p>
                </div>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-6">
                  {testimonials.map((t, i) => (
                    <Card key={i} className="shadow-soft hover:shadow-medium transition-all duration-300">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg flex-shrink-0">
                            {t.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{t.name} <span className="text-sm text-muted-foreground font-normal">— {t.age}</span></p>
                            <div className="flex gap-1 mt-1">
                              {[...Array(t.rating)].map((_, j) => (
                                <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                              ))}
                            </div>
                            <p className="text-xs text-primary mt-1 font-medium">Motif : {t.motif}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3 leading-relaxed">"{t.text}"</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <time dateTime={t.date}>
                            {new Date(t.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}
                          </time>
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16 bg-accent/5">
              <div className="container mx-auto px-4 text-center max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Vous aussi, prenez soin de vos gencives
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Un bilan parodontal précoce permet souvent d'éviter les traitements lourds. Le cabinet
                  est conventionné Secteur 1 et accueille de nouveaux patients sans courrier ni ordonnance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={doctolibUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2 bg-primary hover:bg-primary-hover">
                      Prendre rendez-vous sur Doctolib
                    </Button>
                  </a>
                  <Link to="/parodontie">
                    <Button size="lg" variant="outline">En savoir plus sur la parodontie</Button>
                  </Link>
                </div>
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TemoignagesParodontie;
