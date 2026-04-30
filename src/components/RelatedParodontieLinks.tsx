import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";

/**
 * Encart de maillage interne affiché en bas des articles blog de catégorie
 * "Parodontie". Renvoie vers la page pilier `/parodontie` et les 3 landings
 * longue traîne. Renforce le PageRank interne sur les pages prioritaires
 * (objectif SEO : développement de l'activité parodontie).
 */
const RelatedParodontieLinks = () => {
  const links = [
    { to: "/parodontie", title: "Parodontie", desc: "La page pilier sur les soins des gencives" },
    { to: "/gingivite-marseille", title: "Gingivite Marseille", desc: "Symptômes, traitement, prévention" },
    { to: "/dechaussement-dentaire-marseille", title: "Déchaussement", desc: "Causes et prise en charge" },
    { to: "/gencives-qui-saignent", title: "Gencives qui saignent", desc: "Que faire et quand consulter" },
  ];

  return (
    <section className="mt-12 bg-secondary/20 rounded-2xl p-8 border border-secondary/30">
      <div className="flex items-center gap-2 mb-5">
        <Heart className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Pour aller plus loin sur la santé des gencives</h2>
      </div>
      <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
        Le Dr Meriot, chirurgien-dentiste spécialiste des gencives à Marseille,
        vous accompagne sur l'ensemble des problématiques parodontales :
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="group flex items-start gap-3 p-3 rounded-lg hover:bg-card transition-colors"
            >
              <ArrowRight className="h-4 w-4 text-primary mt-1 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              <div>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {l.title}
                </span>
                <span className="block text-xs text-muted-foreground mt-0.5">{l.desc}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RelatedParodontieLinks;
