import { Button } from "@/components/ui/button";
import { Calendar, Phone, CheckCircle2 } from "lucide-react";
import drMeriotPhoto from "@/assets/dr-meriot-photo.png";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";

const Hero = () => {
  const { data: global } = useGlobalSettings();
  const { data: accueil } = useSanityPage("accueil");

  const hero = accueil?.hero;
  const tel = global?.telephone ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const doctolibUrl = global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";

  const titre = hero?.titre ?? "Votre sourire entre de bonnes mains";
  const sousTitre = hero?.sous_titre ?? "Spécialiste en parodontie et implantologie à Marseille 4ème — Traitement des gencives et pose d'implants";
  const description = hero?.description ?? "Une approche humaine et personnalisée pour prendre soin de votre santé bucco-dentaire. Le Dr Stéphanie Meriot vous accueille dans son cabinet avec douceur et expertise.";
  const heroPhoto = hero?.photo ? hero.photo : drMeriotPhoto;
  const badge = hero?.badge ?? "Conventionnée Secteur 1 • Carte Vitale";
  const feature1 = hero?.feature_1 ?? "Métro Chartreux (M1)";
  const feature2 = hero?.feature_2 ?? "⭐⭐⭐⭐⭐ 5/5 étoiles";
  const feature3 = hero?.feature_3 ?? "🇫🇷 🇬🇧 🇪🇸 Trilingue";

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-background via-background to-primary/5"></div>

      <div className="absolute inset-y-0 right-0 w-1/2 -z-10 hidden lg:block overflow-hidden">
        <img
          src={heroPhoto}
          alt="Dr Stéphanie Meriot - Chirurgien-dentiste Marseille 4ème - Parodontie Implantologie"
          className="w-full h-full object-cover object-[center_12%] lg:translate-y-10 lg:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-2xl animate-fade-in-up lg:pr-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">{badge}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {titre.includes("de bonnes mains") ? (
              <>
                {titre.split("de bonnes mains")[0]}
                <span className="text-primary">de bonnes mains</span>
              </>
            ) : (
              titre
            )}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">{sousTitre}</p>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">{description}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href={doctolibUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary-hover text-lg px-8 py-6">
                <Calendar className="h-5 w-5" />
                Prendre rendez-vous
              </Button>
            </a>
            <a href={telHref}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-lg px-8 py-6">
                <Phone className="h-5 w-5" />
                {tel}
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            {[feature1, feature2, feature3].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
