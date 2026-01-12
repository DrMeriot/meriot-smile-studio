import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    <footer className="bg-dental-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Cabinet Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-playfair font-semibold mb-4">
              Dr Stéphanie Meriot
            </h3>
            <p className="text-dental-soft-blue text-sm mb-4">
              Chirurgien-Dentiste spécialisée en parodontie et implantologie
            </p>
            <div className="flex items-start space-x-2 text-sm text-dental-soft-blue mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>23 Bd de la Fédération<br />13004 Marseille</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-dental-soft-blue mb-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <a href="tel:0983439621" className="hover:text-white transition-colors">
                09 83 43 96 21
              </a>
            </div>
            <a
              href="https://www.doctolib.fr/chirurgien-dentiste/marseille/stephanie-meriot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-dental-coral hover:text-white transition-colors text-sm mt-2"
            >
              <span>Prendre RDV sur Doctolib</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Horaires
            </h3>
            <ul className="space-y-2 text-sm text-dental-soft-blue">
              <li className="flex justify-between">
                <span>Lundi</span>
                <span>9h - 19h</span>
              </li>
              <li className="flex justify-between">
                <span>Mardi</span>
                <span>9h - 19h</span>
              </li>
              <li className="flex justify-between">
                <span>Mercredi</span>
                <span>9h - 19h</span>
              </li>
              <li className="flex justify-between">
                <span>Jeudi</span>
                <span>9h - 19h</span>
              </li>
              <li className="flex justify-between">
                <span>Vendredi</span>
                <span>9h - 17h</span>
              </li>
            </ul>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4">
              Liens Rapides
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/parodontie" className="text-dental-soft-blue hover:text-white transition-colors">
                  Parodontie
                </Link>
              </li>
              <li>
                <Link to="/implantologie" className="text-dental-soft-blue hover:text-white transition-colors">
                  Implantologie
                </Link>
              </li>
              <li>
                <Link to="/esthetique" className="text-dental-soft-blue hover:text-white transition-colors">
                  Esthétique dentaire
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-dental-soft-blue hover:text-white transition-colors">
                  Tous les soins
                </Link>
              </li>
              <li>
                <Link to="/tarifs" className="text-dental-soft-blue hover:text-white transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-dental-soft-blue hover:text-white transition-colors">
                  Blog & Conseils
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-dental-soft-blue hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Zone d'intervention - 2 colonnes sur grand écran */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-playfair font-semibold mb-4">
              Zone d'intervention (50km)
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              {Object.entries(zoneIntervention).map(([secteur, villes]) => (
                <div key={secteur}>
                  <p className="text-white font-medium mb-1">{secteur}</p>
                  <p className="text-dental-soft-blue leading-relaxed">
                    {villes.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-dental-soft-blue/20 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-dental-soft-blue">
            <p>
              © {currentYear} Dr Stéphanie Meriot - Chirurgien-Dentiste Marseille. Tous droits réservés.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
