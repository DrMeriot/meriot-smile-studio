import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useGlobalSettings, useSanityPage } from "@/hooks/useSanityContent";

const defaultDiplomes = [
  "Docteur en chirurgie dentaire - Faculté d'odontologie de Marseille",
  "Formation spécialisée en Parodontologie - IFPIO Marseille",
  "Formation complémentaire en Parodontologie - Académie de paro, Aix-en-Provence",
  "Formation en Implantologie - IFPIO Marseille",
];

const MentionsLegales = () => {
  const { data: global } = useGlobalSettings();
  const { data: page } = useSanityPage("legal");

  const nom = global?.nom_praticien ?? "Dr Stéphanie Meriot";
  const tel = global?.phone ?? global?.telephone ?? "09 83 43 96 21";
  const adresse = global?.adresse ?? "23 Boulevard de la Fédération, 13004 Marseille";
  const rpps = page?.rpps ?? "10100720993";
  const diplomes = page?.diplomesList ?? defaultDiplomes;
  const hebergeur = page?.hebergeur ?? "Lovable.dev";
  const seoTitle = page?.seoTitle ?? `Mentions Légales | Cabinet Dentaire ${nom} Marseille`;
  const seoDesc = page?.seoDescription ?? `Mentions légales du cabinet dentaire ${nom}. RPPS, Ordre des Chirurgiens-Dentistes, secteur 1 conventionné, Marseille 4ème.`;

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonical="/mentions-legales"
      />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">{page?.titre ?? "Mentions légales"}</h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
                <p>
                  <strong>{nom}</strong><br />
                  Chirurgien-dentiste<br />
                  {adresse.split(",").map((part: string, i: number) => (<span key={i}>{part.trim()}<br /></span>))}
                  France
                </p>
                <p>
                  <strong>Téléphone :</strong> {tel}<br />
                  <strong>RPPS :</strong> {rpps}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Autorité compétente</h2>
                <p>Ordre National des Chirurgiens-Dentistes<br />22 rue Emile Ménier<br />75116 Paris<br />Tél : 01 44 34 77 77</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Diplômes et qualifications</h2>
                <ul className="list-disc pl-6 space-y-2">
                  {diplomes.map((d: string, i: number) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Conditions d'exercice</h2>
                <p>{page?.conditionsTexte ?? `Le ${nom} exerce en secteur 1 (tarifs conventionnés). Inscrite à l'Ordre sous le numéro RPPS ${rpps}.`}</p>
                <p>Assurance responsabilité civile professionnelle conformément à l'article L.1142-2 du Code de la Santé Publique.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Règles déontologiques</h2>
                <p>
                  Soumise au Code de déontologie des chirurgiens-dentistes :{" "}
                  <a href="https://www.ordre-chirurgiens-dentistes.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ordre-chirurgiens-dentistes.fr</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Hébergement du site</h2>
                <p>Hébergé par {hebergeur} — <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">lovable.dev</a></p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
                <p>L'ensemble du contenu de ce site est la propriété exclusive du {nom}. Toute reproduction est interdite sans autorisation.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Données personnelles</h2>
                <p>Consultez notre <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>.</p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MentionsLegales;
