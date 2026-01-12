import { Button } from "@/components/ui/button";
import { Calendar, Phone, CheckCircle2 } from "lucide-react";
import drMeriotPhoto from "@/assets/dr-meriot-photo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={drMeriotPhoto}
          alt="Dr Stéphanie Meriot - Chirurgien-dentiste Marseille 4ème - Parodontie Implantologie"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-2xl animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">
              Conventionnée Secteur 1 • Carte Vitale
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Votre sourire entre{" "}
            <span className="text-primary">de bonnes mains</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Cabinet dentaire à Marseille 4ème - Soins généraux, Parodontie,
            Implantologie
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            Une approche humaine et personnalisée pour prendre soin de votre santé
            bucco-dentaire. Le Dr Stéphanie Meriot vous accueille dans son cabinet
            avec douceur et expertise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary-hover text-lg px-8 py-6"
              >
                <Calendar className="h-5 w-5" />
                Prendre rendez-vous
              </Button>
            </a>
            <a href="tel:0983439621">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2 text-lg px-8 py-6"
              >
                <Phone className="h-5 w-5" />
                09 83 43 96 21
              </Button>
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Métro Chartreux (M1)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <span>⭐⭐⭐⭐⭐ 5/5 étoiles</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <span>🇫🇷 🇬🇧 🇪🇸 Trilingue</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
