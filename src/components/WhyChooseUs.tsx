import { Award, MapPin, Users, Stethoscope, GraduationCap, Euro } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: GraduationCap,
      title: "Formation spécialisée",
      description: "Formée à l'Académie de Paro (Aix-en-Provence) et à l'IFPIO Marseille. Expertise reconnue en parodontologie et implantologie."
    },
    {
      icon: Stethoscope,
      title: "Plateau technique moderne",
      description: "Radiographie numérique, scanner 3D, techniques mini-invasives pour des soins précis et confortables."
    },
    {
      icon: Euro,
      title: "Conventionnée Secteur 1",
      description: "Tarifs conventionnés pour les soins courants. Devis détaillé et transparent pour tous les traitements."
    },
    {
      icon: Users,
      title: "Équipe multilingue",
      description: "Accueil en français, anglais et espagnol pour un accompagnement adapté à chaque patient."
    },
    {
      icon: Award,
      title: "Approche douce et humaine",
      description: "Prise en charge personnalisée, écoute attentive, et suivi rigoureux pour des résultats durables."
    },
    {
      icon: MapPin,
      title: "Accessibilité Marseille & région",
      description: "Cabinet situé dans le 4ème arrondissement, facilement accessible depuis Aix-en-Provence, Aubagne, La Ciotat, Cassis et toute la région PACA."
    }
  ];

  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pourquoi nous confier vos gencives à Marseille ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Une expertise reconnue au service de votre santé bucco-dentaire
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, index) => (
            <Card key={index} className="shadow-soft hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                    <reason.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground text-sm">{reason.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Zone de chalandise explicite */}
        <div className="bg-card rounded-2xl p-8 shadow-soft border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
              <MapPin className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">
                Point de référence en parodontologie à Marseille
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Situé à <strong>Marseille 4ème</strong>, notre cabinet est le point de référence pour les patients venant d'<strong>Aubagne</strong>, <strong>Cassis</strong>, <strong>La Ciotat</strong>, <strong>Aix-en-Provence</strong>, <strong>Vitrolles</strong>, <strong>Martigues</strong> et de toute la région PACA cherchant une <strong>alternative à l'extraction dentaire</strong>. Grâce à des traitements parodontaux adaptés et une expertise en régénération osseuse, nous sauvons des dents que d'autres auraient condamnées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
