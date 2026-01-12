import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Dr Stéphanie Meriot
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Chirurgien-dentiste à Marseille 4ème, spécialisée en parodontie et
              implantologie. Une approche douce et personnalisée pour votre santé
              bucco-dentaire.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                Secteur 1
              </span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                ⭐ 5/5
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <a
                  href="https://maps.google.com/?q=23+Boulevard+de+la+Fédération+13004+Marseille"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  23 Boulevard de la Fédération
                  <br />
                  13004 Marseille
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:0983439621"
                  className="hover:text-primary transition-colors"
                >
                  09 83 43 96 21
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <a
                  href="https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Prendre RDV sur Doctolib
                </a>
              </div>
            </div>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lundi</span>
                <span>09h-12h, 14h-17h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mardi</span>
                <span>09h-12h, 14h-18h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mercredi</span>
                <span className="text-destructive">Fermé</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jeudi</span>
                <span>09h-12h, 14h-18h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vendredi</span>
                <span>09h-14h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sam-Dim</span>
                <span className="text-destructive">Fermé</span>
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <nav className="space-y-2 text-sm">
              <Link
                to="/services"
                className="block hover:text-primary transition-colors"
              >
                Nos services
              </Link>
              <Link
                to="/a-propos"
                className="block hover:text-primary transition-colors"
              >
                À propos
              </Link>
              <Link
                to="/tarifs"
                className="block hover:text-primary transition-colors"
              >
                Tarifs
              </Link>
              <Link
                to="/contact"
                className="block hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/mentions-legales"
                className="block hover:text-primary transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                to="/confidentialite"
                className="block hover:text-primary transition-colors"
              >
                Confidentialité
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>RPPS:</strong> 10100720993 | <strong>Langues:</strong> 🇫🇷
            Français · 🇬🇧 Anglais · 🇪🇸 Espagnol
          </p>
          <p>
            © {new Date().getFullYear()} Dr Stéphanie Meriot - Cabinet Dentaire
            Marseille. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
