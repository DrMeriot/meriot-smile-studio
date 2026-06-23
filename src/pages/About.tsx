import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Award, BookOpen, Globe, Heart, Users, Shield } from "lucide-react";
import equipeImg from "@/assets/equipe.jpg";
import aProposImg from "@/assets/a-propos.jpg";
import patrickImg from "@/assets/patrick.jpg";
import claireImg from "@/assets/claire.jpg";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";
import { urlFor } from "@/lib/sanityImage";

const defaultFormations = [
  { title: "Diplôme de chirurgien-dentiste", desc: "Faculté d'odontologie de Marseille" },
  { title: "Formation en Parodontologie", desc: "IFPIO - Institut de Formation en Parodontologie et Implantologie Orale - Marseille" },
  { title: "Formation complémentaire en Parodontie", desc: "Académie de paro - Aix-en-Provence" },
  { title: "Formation en Implantologie", desc: "IFPIO Marseille - Techniques de pose d'implants, régénération osseuse et prothèse sur implants" },
  { title: "Thèse de doctorat", desc: "\"Dentisterie à minima : moyens de diagnostic et approches thérapeutiques\"" },
  { title: "Expériences internationales", desc: "France (Marseille, Paris) et Suisse (Genève). 🇫🇷 Français · 🇬🇧 Anglais · 🇪🇸 Espagnol" },
];

const defaultConfiance = [
  { title: "Inscrite à l'Ordre", desc: "Chirurgien-dentiste inscrite à l'Ordre National des Chirurgiens-Dentistes." },
  { title: "Formations spécialisées", desc: "Formations approfondies à l'IFPIO Marseille et à l'Académie de paro d'Aix-en-Provence." },
  { title: "Recherche & Thèse", desc: "Thèse de doctorat sur la dentisterie conservatrice." },
  { title: "Expérience internationale", desc: "Exercice en France et en Suisse." },
];

const defaultPhilosophie = [
  { title: "Écoute et bienveillance", desc: "Je prends le temps d'écouter vos préoccupations." },
  { title: "Approche personnalisée", desc: "Chaque patient est unique. Je respecte votre rythme." },
  { title: "Explications claires", desc: "Je vous explique chaque étape avec des mots simples." },
  { title: "Dentisterie conservatrice", desc: "Je privilégie les techniques préservant vos tissus naturels." },
];

const formationIcons = [GraduationCap, Award, Award, Award, BookOpen, Globe];
const formationColors = [
  { color: "bg-primary/10", iconColor: "text-primary" },
  { color: "bg-accent/10", iconColor: "text-accent" },
  { color: "bg-primary/10", iconColor: "text-primary" },
  { color: "bg-accent/10", iconColor: "text-accent" },
  { color: "bg-secondary", iconColor: "text-primary" },
  { color: "bg-primary/10", iconColor: "text-primary" },
];

const confianceIcons = [Shield, Award, BookOpen, Globe];
const confianceColors = ["text-primary", "text-accent", "text-primary", "text-accent"];

const philosophieIcons = [Heart, Users, BookOpen, Award];
const philosophieColors = ["text-primary", "text-accent", "text-primary", "text-accent"];

const About = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("about");

  const nom = global?.nom_praticien ?? "Dr Stéphanie Meriot";

  // Photos : éditables via le Studio (urlFor), sinon image du dossier Photos en secours
  const equipePhoto = page?.equipePhoto ? urlFor(page.equipePhoto).width(1600).url() : equipeImg;
  const meriotPhoto = page?.meriotPhoto ? urlFor(page.meriotPhoto).width(1100).url() : aProposImg;
  const mateoPhoto = page?.mateoPhoto ? urlFor(page.mateoPhoto).width(1100).url() : patrickImg;
  const clairePhoto = page?.clairePhoto ? urlFor(page.clairePhoto).width(1100).url() : claireImg;

  // Textes éditables (valeurs par défaut remplaçables depuis le Studio)
  const equipeDescription = page?.equipeDescription ?? "Le cabinet réunit deux chirurgiens-dentistes et une équipe attentive, au service de votre santé bucco-dentaire à Marseille 4ème, dans une approche douce, à l'écoute et conservatrice.";
  const mateoNom = page?.mateoNom ?? "Dr Patrick Mateo";
  const mateoDescription = page?.mateoDescription ?? "Chirurgien-dentiste au sein du cabinet, le Dr Patrick Mateo met son expertise et son écoute au service de chaque patient.";
  const claireNom = page?.claireNom ?? "Claire";
  const claireDescription = page?.claireDescription ?? "Claire accueille et accompagne les patients tout au long de leur parcours de soins, avec attention et bienveillance.";

  const formations = page?.formationsList ?? defaultFormations;
  const confiance = page?.confianceList ?? defaultConfiance;
  const philosophie = page?.philosophieList ?? defaultPhilosophie;
  const seoTitle = page?.seoTitle ?? `${nom}, parodontologue à Marseille 4e`;
  const seoDesc = page?.seoDescription ?? `${nom}, parodontologue à Marseille 4e formée à l'IFPIO. Soin des gencives en douceur, approche conservatrice. Parcours, expertise et rendez-vous.`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical="/a-propos"
        keywords="Dr Stéphanie Meriot, Dr Patrick Mateo, dentiste marseille 4, parodontiste marseille, implantologue marseille, IFPIO, équipe cabinet dentaire"
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* ===== Section Équipe ===== */}
          <section id="equipe" className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center">Notre équipe</h2>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img src={equipePhoto} alt="L'équipe du cabinet dentaire du Dr Stéphanie Meriot à Marseille 4ème" className="rounded-2xl shadow-medium w-full" />
                  <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
                </div>
                <div>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{equipeDescription}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Section Dr Stéphanie Meriot ===== */}
          <section id="dr-meriot" className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">Votre praticienne</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{nom}</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                    {page?.heroSubtitle ?? "Chirurgien-dentiste à Marseille 4ème, spécialisée en parodontie et implantologie."}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {page?.heroDescription ?? "Mon approche repose sur l'écoute, la douceur et le respect du rythme de chaque patient."}
                  </p>
                </div>
                <div className="relative">
                  <img src={meriotPhoto} alt={`${nom} - Dentiste spécialisée parodontie implantologie Marseille`} className="rounded-2xl shadow-medium w-full" />
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{page?.formationsTitre ?? "Parcours et formations"}</h2>
              <div className="space-y-8">
                {formations.map((f: { title: string; desc: string }, i: number) => {
                  const Icon = formationIcons[i] ?? GraduationCap;
                  const c = formationColors[i] ?? formationColors[0];
                  return (
                    <div key={i} className="flex gap-6 items-start">
                      <div className={`p-3 ${c.color} rounded-xl flex-shrink-0`}><Icon className={`h-6 w-6 ${c.iconColor}`} /></div>
                      <div><h3 className="text-xl font-semibold mb-2">{f.title}</h3><p className="text-muted-foreground">{f.desc}</p></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{page?.confianceTitre ?? "Pourquoi me faire confiance ?"}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {confiance.map((e: { title: string; desc: string }, i: number) => {
                  const Icon = confianceIcons[i] ?? Shield;
                  const color = confianceColors[i] ?? "text-primary";
                  return (
                    <div key={i} className="p-6 bg-card rounded-xl shadow-soft">
                      <div className="flex items-center gap-3 mb-4"><Icon className={`h-6 w-6 ${color}`} /><h3 className="text-lg font-semibold">{e.title}</h3></div>
                      <p className="text-muted-foreground">{e.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{page?.philosophieTitre ?? "Ma philosophie de soins"}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {philosophie.map((p: { title: string; desc: string }, i: number) => {
                  const Icon = philosophieIcons[i] ?? Heart;
                  const color = philosophieColors[i] ?? "text-primary";
                  return (
                    <div key={i} className="p-6 bg-card rounded-xl shadow-soft">
                      <div className="flex items-center gap-3 mb-4"><Icon className={`h-6 w-6 ${color}`} /><h3 className="text-lg font-semibold">{p.title}</h3></div>
                      <p className="text-muted-foreground">{p.desc}</p>
                    </div>
                  );
                })}
              </div>
              <blockquote className="mt-12 border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg">
                <p className="text-lg italic text-muted-foreground mb-4">
                  "{page?.citation ?? "Je crois en une dentisterie humaine et bienveillante, où chaque patient se sent écouté, respecté et en confiance."}"
                </p>
                <p className="font-semibold text-primary">— {nom}</p>
              </blockquote>
            </div>
          </section>

          {/* ===== Section Dr Patrick Mateo ===== */}
          <section id="dr-mateo" className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div className="relative order-1">
                  <img src={mateoPhoto} alt={`${mateoNom} - Chirurgien-dentiste au cabinet à Marseille 4ème`} className="rounded-2xl shadow-medium w-full" />
                  <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/10 rounded-full -z-10 blur-2xl"></div>
                </div>
                <div className="order-2">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">Deuxième praticien</p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">{mateoNom}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{mateoDescription}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Section Claire (assistante) ===== */}
          <section id="claire" className="py-20 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div className="order-2 lg:order-1">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-3">Assistante dentaire</p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">{claireNom}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{claireDescription}</p>
                </div>
                <div className="relative order-1 lg:order-2">
                  <img src={clairePhoto} alt={`${claireNom} - Assistante dentaire au cabinet à Marseille 4ème`} className="rounded-2xl shadow-medium w-full" />
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
