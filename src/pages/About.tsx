import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Award, BookOpen, Globe, Heart, Users, Shield } from "lucide-react";
import drMeriotPhoto from "@/assets/dr-meriot-photo.png";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";

const About = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("about");

  const nom = global?.nom_praticien ?? "Dr Stéphanie Meriot";
  const photoSrc = page?.photo || drMeriotPhoto;

  return (
    <>
      <SEOHead
        title={`${nom} | Dentiste Parodontie Implantologie Marseille`}
        description={`${nom}, chirurgien-dentiste à Marseille 4ème. Spécialiste parodontie (IFPIO) et implantologie. Approche conservatrice et bienveillante. Trilingue.`}
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
                    Chirurgien-dentiste à Marseille 4ème, spécialisée en <strong>parodontie</strong> et <strong>implantologie</strong>.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Mon approche repose sur l'écoute, la douceur et le respect du rythme de chaque patient.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Parcours et formations</h2>
              <div className="space-y-8">
                {[
                  { icon: GraduationCap, color: "bg-primary/10", iconColor: "text-primary", title: "Diplôme de chirurgien-dentiste", desc: "Faculté d'odontologie de Marseille" },
                  { icon: Award, color: "bg-accent/10", iconColor: "text-accent", title: "Formation en Parodontologie", desc: "IFPIO - Institut de Formation en Parodontologie et Implantologie Orale - Marseille" },
                  { icon: Award, color: "bg-primary/10", iconColor: "text-primary", title: "Formation complémentaire en Parodontie", desc: "Académie de paro - Aix-en-Provence" },
                  { icon: Award, color: "bg-accent/10", iconColor: "text-accent", title: "Formation en Implantologie", desc: "IFPIO Marseille - Techniques de pose d'implants, régénération osseuse et prothèse sur implants" },
                  { icon: BookOpen, color: "bg-secondary", iconColor: "text-primary", title: "Thèse de doctorat", desc: "\"Dentisterie à minima : moyens de diagnostic et approches thérapeutiques\"" },
                  { icon: Globe, color: "bg-primary/10", iconColor: "text-primary", title: "Expériences internationales", desc: "France (Marseille, Paris) et Suisse (Genève). 🇫🇷 Français · 🇬🇧 Anglais · 🇪🇸 Espagnol" },
                ].map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <div key={i} className="flex gap-6 items-start">
                      <div className={`p-3 ${f.color} rounded-xl flex-shrink-0`}><Icon className={`h-6 w-6 ${f.iconColor}`} /></div>
                      <div><h3 className="text-xl font-semibold mb-2">{f.title}</h3><p className="text-muted-foreground">{f.desc}</p></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Pourquoi me faire confiance ?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Shield, color: "text-primary", title: "Inscrite à l'Ordre", desc: "Chirurgien-dentiste inscrite à l'Ordre National des Chirurgiens-Dentistes." },
                  { icon: Award, color: "text-accent", title: "Formations spécialisées", desc: "Formations approfondies à l'IFPIO Marseille et à l'Académie de paro d'Aix-en-Provence." },
                  { icon: BookOpen, color: "text-primary", title: "Recherche & Thèse", desc: "Thèse de doctorat sur la dentisterie conservatrice." },
                  { icon: Globe, color: "text-accent", title: "Expérience internationale", desc: "Exercice en France et en Suisse." },
                ].map((e, i) => {
                  const Icon = e.icon;
                  return (
                    <div key={i} className="p-6 bg-card rounded-xl shadow-soft">
                      <div className="flex items-center gap-3 mb-4"><Icon className={`h-6 w-6 ${e.color}`} /><h3 className="text-lg font-semibold">{e.title}</h3></div>
                      <p className="text-muted-foreground">{e.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ma philosophie de soins</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Heart, color: "text-primary", title: "Écoute et bienveillance", desc: "Je prends le temps d'écouter vos préoccupations." },
                  { icon: Users, color: "text-accent", title: "Approche personnalisée", desc: "Chaque patient est unique. Je respecte votre rythme." },
                  { icon: BookOpen, color: "text-primary", title: "Explications claires", desc: "Je vous explique chaque étape avec des mots simples." },
                  { icon: Award, color: "text-accent", title: "Dentisterie conservatrice", desc: "Je privilégie les techniques préservant vos tissus naturels." },
                ].map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <div key={i} className="p-6 bg-card rounded-xl shadow-soft">
                      <div className="flex items-center gap-3 mb-4"><Icon className={`h-6 w-6 ${p.color}`} /><h3 className="text-lg font-semibold">{p.title}</h3></div>
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
