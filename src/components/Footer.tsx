import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { useGlobalSettings } from "@/hooks/useSanityContent";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: global } = useGlobalSettings();

  const nom = global?.nom_praticien ?? "Dr Stéphanie Meriot";
  const tel = global?.phone ?? global?.telephone ?? "09 83 43 96 21";
  const telHref = `tel:${tel.replace(/\s/g, "")}`;
  const adresse = global?.adresse ?? "23 Bd de la Fédération\n13004 Marseille";
  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";

  const horaires = global?.horaires ?? [
    { jour: "Lundi", heures: "9h-12h, 14h-17h", ferme: false },
    { jour: "Mardi", heures: "9h-12h, 14h-18h", ferme: false },
    { jour: "Mercredi", heures: "Fermé", ferme: true },
    { jour: "Jeudi", heures: "9h-12h, 14h-18h", ferme: false },
    { jour: "Vendredi", heures: "9h-14h", ferme: false },
  ];

  return (
    <footer className="bg-dental-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-playfair font-semibold mb-4">{nom}</h3>
            <p className="text-dental-soft-blue text-sm mb-4">
              Chirurgien-dentiste spécialisée en parodontie et implantologie
            </p>
            <div className="flex items-start space-x-2 text-sm text-dental-soft-blue mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: adresse.replace(/\n/g, "<br />") }} />
            </div>
            <div className="flex items-center space-x-2 text-sm text-dental-soft-blue mb-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <a href={telHref} className="hover:text-white transition-colors">
                {tel}
              </a>
            </div>
            <a
              href={doctolibUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-dental-coral hover:text-white transition-colors text-sm mt-2"
            >
              <span>Prendre RDV sur Doctolib</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4">Parodontie</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/parodontie", label: "Soins des gencives" },
                { to: "/gingivite-marseille", label: "Gingivite Marseille" },
                { to: "/dechaussement-dentaire-marseille", label: "Déchaussement dentaire" },
                { to: "/gencives-qui-saignent", label: "Gencives qui saignent" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-dental-soft-blue hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Horaires
            </h3>
            <ul className="space-y-2 text-sm text-dental-soft-blue">
              {horaires.map((h: { jour: string; heures?: string; ferme?: boolean; heures_debut?: string; heures_fin?: string }) => (
                <li key={h.jour} className="flex justify-between">
                  <span>{h.jour}</span>
                  <span className={h.ferme ? "text-dental-coral" : ""}>
                    {h.ferme ? "Fermé" : h.heures || `${h.heures_debut}-${h.heures_fin}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-playfair font-semibold mb-4">Cabinet</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/implantologie", label: "Implantologie" },
                { to: "/services", label: "Tous les soins" },
                { to: "/tarifs", label: "Tarifs" },
                { to: "/blog", label: "Blog & Conseils" },
                { to: "/a-propos", label: "À propos" },
                { to: "/contact", label: "Contact" },
                { to: "/mentions-legales", label: "Mentions légales" },
                { to: "/confidentialite", label: "Confidentialité" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-dental-soft-blue hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-dental-soft-blue/70 text-xs mt-6">
              Marseille et environs (50 km)
            </p>
          </div>
        </div>

        <div className="border-t border-dental-soft-blue/20 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-dental-soft-blue">
            <p>© {currentYear} {nom} - Chirurgien-Dentiste Marseille. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
              <Link to="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
