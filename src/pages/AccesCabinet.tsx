import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { MapPin, Phone, Car, Train, Clock, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const AccesCabinet = () => {
  const zoneIntervention = {
    "Marseille": ["Tous arrondissements (13001-13016)"],
    "Alentours proches": ["Allauch", "Plan-de-Cuques", "Les Pennes-Mirabeau", "Septèmes-les-Vallons", "La Penne-sur-Huveaune"],
    "Pays d'Aix": ["Aix-en-Provence", "Gardanne", "Bouc-Bel-Air", "Cabriès", "Simiane-Collongue", "Meyreuil", "Fuveau", "Rousset", "Éguilles", "Ventabren"],
    "Côte Bleue": ["Carry-le-Rouet", "Sausset-les-Pins", "Ensuès-la-Redonne", "Marignane", "Vitrolles", "Châteauneuf-les-Martigues", "Gignac-la-Nerthe"],
    "Aubagne & La Ciotat": ["Aubagne", "Gémenos", "Carnoux", "La Ciotat", "Cassis", "Roquefort-la-Bédoule", "Ceyreste"],
    "Vallée de l'Huveaune": ["Roquevaire", "Auriol", "La Destrousse", "Peypin", "La Bouilladisse", "Cuges-les-Pins", "Trets", "Saint-Maximin"],
    "Étang de Berre": ["Martigues", "Istres", "Fos-sur-Mer", "Port-de-Bouc", "Berre-l'Étang", "Rognac", "Velaux", "Miramas", "Saint-Chamas", "Saint-Mitre-les-Remparts", "Grans"],
    "Salon & environs": ["Salon-de-Provence", "Pélissanne", "Lançon-Provence", "La Fare-les-Oliviers", "Coudoux", "Eyguières", "Lambesc"]
  };

  return (
    <>
      <Helmet>
        <title>Accès Cabinet Dentaire Marseille | Dr Stéphanie Mériot - Parodontiste</title>
        <meta 
          name="description" 
          content="Cabinet dentaire Dr Stéphanie Mériot à Marseille. Accès facile depuis Aix-en-Provence, Aubagne, Martigues et environs (50km). Parking et transports à proximité." 
        />
        <meta name="keywords" content="cabinet dentaire marseille, dentiste aix-en-provence, parodontiste aubagne, implantologue martigues, accès cabinet" />
        <link rel="canonical" href="https://dr-meriot-dentiste.fr/acces-cabinet" />
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-dental-light-blue to-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-dental-navy text-center mb-6">
              Accès au Cabinet
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Retrouvez toutes les informations pratiques pour vous rendre au cabinet du Dr Stéphanie Mériot, 
              spécialiste en parodontie et implantologie à Marseille.
            </p>
          </div>
        </section>

        {/* Adresse et infos pratiques */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Adresse */}
              <div className="bg-dental-light-blue/30 rounded-2xl p-8">
                <h2 className="text-2xl font-playfair font-semibold text-dental-navy mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-dental-coral" />
                  Adresse du Cabinet
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-medium text-dental-navy">Dr Stéphanie Mériot</p>
                    <p className="text-muted-foreground">Chirurgien-Dentiste</p>
                  </div>
                  <div>
                    <p className="text-dental-navy font-medium">23 Boulevard de la Fédération</p>
                    <p className="text-dental-navy">13004 Marseille</p>
                  </div>
                  <div className="flex items-center gap-2 text-dental-navy">
                    <Phone className="w-4 h-4 text-dental-coral" />
                    <a href="tel:0983439621" className="hover:text-dental-coral transition-colors">
                      09 83 43 96 21
                    </a>
                  </div>
                  <a
                    href="https://maps.google.com/?q=23+Boulevard+de+la+Fédération+13004+Marseille"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-dental-coral hover:underline mt-2"
                  >
                    Ouvrir dans Google Maps
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-dental-light-blue/30 rounded-2xl p-8">
                <h2 className="text-2xl font-playfair font-semibold text-dental-navy mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-dental-coral" />
                  Horaires d'ouverture
                </h2>
                <ul className="space-y-3">
                  <li className="flex justify-between text-dental-navy">
                    <span>Lundi</span>
                    <span>9h-12h, 14h-17h</span>
                  </li>
                  <li className="flex justify-between text-dental-navy">
                    <span>Mardi</span>
                    <span>9h-12h, 14h-18h</span>
                  </li>
                  <li className="flex justify-between text-dental-navy">
                    <span>Mercredi</span>
                    <span className="text-dental-coral font-medium">Fermé</span>
                  </li>
                  <li className="flex justify-between text-dental-navy">
                    <span>Jeudi</span>
                    <span>9h-12h, 14h-18h</span>
                  </li>
                  <li className="flex justify-between text-dental-navy">
                    <span>Vendredi</span>
                    <span>9h-14h</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Transports */}
            <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-dental-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-dental-coral" />
                </div>
                <div>
                  <h3 className="font-semibold text-dental-navy mb-2">En voiture</h3>
                  <p className="text-muted-foreground text-sm">
                    Parking gratuit à proximité. Accès facile depuis l'autoroute A7 et A50. 
                    Le cabinet est situé à 10 minutes du centre-ville de Marseille.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-dental-coral/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Train className="w-6 h-6 text-dental-coral" />
                </div>
                <div>
                  <h3 className="font-semibold text-dental-navy mb-2">En transports en commun</h3>
                  <p className="text-muted-foreground text-sm">
                    Métro ligne 2 - Station "La Blancarde" à 10 min à pied. 
                    Plusieurs lignes de bus desservent le Boulevard de la Fédération.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Zone d'intervention */}
        <section className="py-16 bg-dental-light-blue/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-dental-navy mb-4">
                Zone d'intervention
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Le cabinet du Dr Stéphanie Mériot accueille des patients de Marseille et de toute la région, 
                dans un rayon de 50 km. Nous intervenons notamment dans les villes suivantes :
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {Object.entries(zoneIntervention).map(([secteur, villes]) => (
                <div key={secteur} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-dental-navy mb-3 pb-2 border-b border-dental-light-blue">
                    {secteur}
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {villes.map((ville) => (
                      <li key={ville}>{ville}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-dental-navy">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">
              Prendre rendez-vous
            </h2>
            <p className="text-dental-soft-blue mb-8 max-w-xl mx-auto">
              Prenez rendez-vous en ligne via Doctolib ou contactez-nous par téléphone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-dental-coral hover:bg-dental-coral/90 text-white"
              >
                <a
                  href="https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Réserver sur Doctolib
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <a href="tel:0983439621">
                  <Phone className="w-4 h-4 mr-2" />
                  09 83 43 96 21
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AccesCabinet;
