import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Train, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePageContent } from "@/hooks/usePageContent";

interface HorairesContent {
  lundi: string;
  mardi: string;
  mercredi: string;
  jeudi: string;
  vendredi: string;
  samedi_dimanche: string;
  telephone: string;
  adresse: string;
}

const Contact = () => {
  const { data: horaires } = usePageContent<HorairesContent>('accueil', 'horaires');
  return (
    <section className="py-20 bg-muted/30" id="contact">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">
            Nous contacter
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Prenez rendez-vous facilement
          </h2>
          <p className="text-lg text-muted-foreground">
            Situé à Marseille 4ème, près du métro Chartreux, notre cabinet est
            facilement accessible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Info Cards */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Adresse</h3>
                    <p className="text-muted-foreground mb-3">
                      {(horaires?.adresse ?? "23 Boulevard de la Fédération, 13004 Marseille").split(",").map((part, i) => (
                        <span key={i}>{part.trim()}{i === 0 && <br />}</span>
                      ))}
                    </p>
                    <a
                      href="https://maps.google.com/?q=23+Boulevard+de+la+Fédération+13004+Marseille"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        Voir sur Google Maps
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Téléphone</h3>
                    <p className="text-muted-foreground mb-3">{horaires?.telephone ?? "09 83 43 96 21"}</p>
                    <a href="tel:0983439621">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Appeler le cabinet
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-3">Horaires</h3>
                    <div className="space-y-2 text-sm">
                      {[
                        { jour: "Lundi", val: horaires?.lundi ?? "09h-12h, 14h-17h" },
                        { jour: "Mardi", val: horaires?.mardi ?? "09h-12h, 14h-18h" },
                        { jour: "Mercredi", val: horaires?.mercredi ?? "Fermé" },
                        { jour: "Jeudi", val: horaires?.jeudi ?? "09h-12h, 14h-18h" },
                        { jour: "Vendredi", val: horaires?.vendredi ?? "09h-14h" },
                        { jour: "Sam-Dim", val: horaires?.samedi_dimanche ?? "Fermé" },
                      ].map(({ jour, val }) => (
                        <div key={jour} className="flex justify-between">
                          <span className="text-muted-foreground">{jour}</span>
                          <span className={val === "Fermé" ? "text-destructive" : ""}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <Train className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Accès</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Métro : Chartreux (ligne M1)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        Bus : Saint Just Ivaldi (42T)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                        Parking public à proximité
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Entrée accessible PMR
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="h-[600px] rounded-2xl overflow-hidden shadow-medium">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.8!2d5.3947!3d43.3117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0c2e5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2s23%20Boulevard%20de%20la%20F%C3%A9d%C3%A9ration%2C%2013004%20Marseille!5e0!3m2!1sfr!2sfr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation du cabinet Dr Stéphanie Meriot"
            ></iframe>
          </div>
        </div>

        {/* Zone d'intervention */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Zone d'intervention
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Le cabinet accueille des patients de Marseille et de toute la région, 
              dans un rayon de 50 km.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { secteur: "Marseille", villes: ["Tous arrondissements (13001-13016)"] },
              { secteur: "Alentours proches", villes: ["Allauch", "Plan-de-Cuques", "Les Pennes-Mirabeau", "Septèmes-les-Vallons", "La Penne-sur-Huveaune"] },
              { secteur: "Pays d'Aix", villes: ["Aix-en-Provence", "Gardanne", "Bouc-Bel-Air", "Cabriès", "Simiane-Collongue", "Meyreuil", "Fuveau", "Rousset"] },
              { secteur: "Côte Bleue", villes: ["Carry-le-Rouet", "Sausset-les-Pins", "Marignane", "Vitrolles", "Châteauneuf-les-Martigues", "Gignac-la-Nerthe"] },
              { secteur: "Aubagne & La Ciotat", villes: ["Aubagne", "Gémenos", "Carnoux", "La Ciotat", "Cassis", "Roquefort-la-Bédoule", "Ceyreste"] },
              { secteur: "Vallée de l'Huveaune", villes: ["Roquevaire", "Auriol", "La Destrousse", "Peypin", "La Bouilladisse", "Trets"] },
              { secteur: "Étang de Berre", villes: ["Martigues", "Istres", "Fos-sur-Mer", "Port-de-Bouc", "Berre-l'Étang", "Rognac", "Velaux", "Miramas"] },
              { secteur: "Salon & environs", villes: ["Salon-de-Provence", "Pélissanne", "Lançon-Provence", "La Fare-les-Oliviers", "Lambesc"] }
            ].map(({ secteur, villes }) => (
              <div key={secteur} className="bg-card rounded-xl p-5 shadow-soft">
                <h4 className="font-semibold mb-3 pb-2 border-b">
                  {secteur}
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {villes.map((ville) => (
                    <li key={ville}>{ville}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <a
            href="https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary-hover text-lg px-8 py-6">
              <Calendar className="h-5 w-5" />
              Prendre rendez-vous sur Doctolib
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
