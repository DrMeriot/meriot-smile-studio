import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Award, BookOpen, Globe, Heart, Users, Shield } from "lucide-react";
import drMeriotPhoto from "@/assets/dr-meriot-photo.png";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";

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
  const photoSrc = page?.photo || drMeriotPhoto;
  const formations = page?.formationsList ?? defaultFormations;
  const confiance = page?.confianceList ?? defaultConfiance;
  const philosophie = page?.philosophieList ?? defaultPhilosophie;
  const seoTitle = page?.seoTitle ?? `${nom} | Dentiste Parodontie Implantologie Marseille`;
  const seoDesc = page?.seoDescription ?? `${nom}, chirurgien-dentiste à Marseille 4ème. Spécialiste parodontie (IFPIO) et implantologie. Approche conservatrice et bienveillante. Trilingue.`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical="/a-propos"
        keywords="Dr Stéphanie Meriot, dentiste marseille 4, parodontiste marseille, implantologue marseille, IFPIO"
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{nom}</h1>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                    {page?.heroSubtitle ?? "Chirurgien-dentiste à Marseille 4ème, spécialisée en parodontie et implantologie."}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {page?.heroDescription ?? "Mon approche repose sur l'écoute, la douceur et le respect du rythme de chaque patient."}
                  </p>
                </div>
                <div className="relative">
                  <img src={photoSrc} alt={`${nom} - Dentiste spécialisée parodontie implantologie Marseille`} className="rounded-2xl shadow-medium w-full" />
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
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

          <section className="py-20 bg-muted/20">
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
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
