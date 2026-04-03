import { Award, Globe, Heart, GraduationCap } from "lucide-react";
import drMeriotPhoto from "@/assets/dr-meriot-photo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";

interface PractitionerContent {
  nom: string;
  description: string;
  parcours: string;
  citation: string;
}

const Practitioner = () => {
  const { data: content } = usePageContent<PractitionerContent>('accueil', 'praticien');
  return (
    <section className="pt-6 pb-20 bg-muted/30 relative overflow-hidden" id="a-propos">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo with decorative elements */}
            <div className="relative animate-fade-in">
              <div className="relative z-10">
                {/* Pastel gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 rounded-3xl transform rotate-3"></div>
                
                {/* Photo container with soft shadow */}
                <div className="relative bg-card rounded-3xl shadow-medium p-2 transform -rotate-2 hover:rotate-0 transition-all duration-500">
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* Soft overlay to harmonize with site colors */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 z-10"></div>
                    <img
                      src={drMeriotPhoto}
                      alt="Dr Stéphanie Meriot - Chirurgien-dentiste spécialiste parodontie implantologie Marseille"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* Decorative floating elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/15 rounded-full blur-3xl"></div>
              </div>
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
                chirurgien-dentiste spécialisée en <strong>parodontie</strong> et{" "}
                <strong>implantologie</strong>. Mon approche repose sur l'écoute, la
                douceur et le respect du rythme de chaque patient.
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
              <blockquote className="border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-lg mb-6">
                <p className="italic text-muted-foreground">
                  "Je prends le temps d'expliquer chaque étape de vos soins, pour que
                  vous vous sentiez en confiance et acteur de votre santé
                  bucco-dentaire."
                </p>
              </blockquote>

              <Link to="/a-propos">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="gap-2 hover:bg-primary/5 transition-all"
                >
                  Découvrir mon parcours complet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Practitioner;
