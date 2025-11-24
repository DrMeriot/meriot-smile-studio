import { Award, Globe, Heart } from "lucide-react";
import drMeriotPhoto from "@/assets/dr-meriot-photo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Practitioner = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Votre praticienne
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une approche humaine et personnalisée pour votre santé bucco-dentaire
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo with decorative elements */}
            <div className="relative">
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
                      alt="Dr Stéphanie Meriot - Chirurgien dentiste"
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
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
                  Dr Stéphanie Meriot
                </h3>
                <p className="text-xl text-muted-foreground mb-4">
                  Chirurgien-dentiste
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Spécialiste en parodontie et implantologie</h4>
                    <p className="text-sm text-muted-foreground">
                      Formation IFPIO Marseille et Académie de paro Aix-en-Provence
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-transparent hover:from-secondary/15 transition-colors">
                  <div className="p-2 bg-secondary/20 rounded-lg flex-shrink-0">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expérience internationale</h4>
                    <p className="text-sm text-muted-foreground">
                      Pratique à Marseille, Paris et Genève · Trilingue (FR, EN, ES)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-accent/5 to-transparent hover:from-accent/10 transition-colors">
                  <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                    <Heart className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Philosophie de soins</h4>
                    <p className="text-sm text-muted-foreground">
                      Approche douce et conservatrice, à l'écoute de chaque patient
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link to="/a-propos">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="gap-2 hover:bg-primary/5 transition-all"
                  >
                    Découvrir mon parcours
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Practitioner;
