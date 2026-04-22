import { GraduationCap, Award, Heart, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import drMeriotPortrait from "@/assets/dr-meriot-portrait.jpg";

const About = () => {
  return (
    <section className="py-20 bg-muted/30" id="a-propos">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-medium">
              <img
                src={drMeriotPortrait}
                alt="Dr Stéphanie Meriot, chirurgien-dentiste à Marseille"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
          </div>

          {/* Content */}
          <div className="animate-fade-in-up">
            <span className="text-primary font-medium text-sm uppercase tracking-wide">
              Votre praticienne
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Dr Stéphanie Meriot
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Diplômée de la Faculté d'odontologie de Marseille, je suis
              chirurgien-dentiste spécialisée en{" "}
              <Link to="/parodontie" className="text-primary font-semibold hover:underline">
                parodontie
              </Link>{" "}
              et{" "}
              <Link to="/implantologie" className="text-primary font-semibold hover:underline">
                implantologie
              </Link>
              . Mon approche repose sur l'écoute, la douceur et le respect du rythme
              de chaque patient.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ma thèse sur la <em>dentisterie à minima</em> reflète ma philosophie :
              préserver au maximum vos tissus naturels tout en vous offrant des
              soins de qualité. Chaque traitement est personnalisé et expliqué avec
              clarté.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Formations spécialisées</h4>
                  <p className="text-sm text-muted-foreground">
                    IFPIO Marseille, Académie de paro Aix-en-Provence
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Expérience internationale</h4>
                  <p className="text-sm text-muted-foreground">
                    Marseille, Paris, Genève (Suisse)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/30 rounded-lg">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Approche bienveillante</h4>
                  <p className="text-sm text-muted-foreground">
                    Prise en compte de l'anxiété dentaire
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Globe className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Multilingue</h4>
                  <p className="text-sm text-muted-foreground">
                    🇫🇷 Français · 🇬🇧 Anglais · 🇪🇸 Espagnol
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg">
              <p className="italic text-muted-foreground">
                "Je prends le temps d'expliquer chaque étape de vos soins, pour que
                vous vous sentiez en confiance et acteur de votre santé
                bucco-dentaire."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
