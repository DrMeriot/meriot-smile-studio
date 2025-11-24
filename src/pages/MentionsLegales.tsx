import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const MentionsLegales = () => {
  return (
    <>
      <SEOHead
        title="Mentions Légales | Cabinet Dentaire Dr Stéphanie Meriot Marseille"
        description="Mentions légales du cabinet dentaire Dr Stéphanie Meriot. RPPS, Ordre des Chirurgiens-Dentistes, secteur 1 conventionné, Marseille 4ème."
        canonical="/mentions-legales"
      />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Mentions légales</h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Éditeur du site
                </h2>
                <p>
                  <strong>Dr Stéphanie Meriot</strong>
                  <br />
                  Chirurgien-dentiste
                  <br />
                  23 Boulevard de la Fédération
                  <br />
                  13004 Marseille
                  <br />
                  France
                </p>
                <p>
                  <strong>Téléphone :</strong> 09 83 43 96 21
                  <br />
                  <strong>RPPS :</strong> 10100720993
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Autorité compétente
                </h2>
                <p>
                  Ordre National des Chirurgiens-Dentistes
                  <br />
                  22 rue Emile Ménier
                  <br />
                  75116 Paris
                  <br />
                  Tél : 01 44 34 77 77
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Diplômes et qualifications
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Docteur en chirurgie dentaire - Faculté d'odontologie de
                    Marseille
                  </li>
                  <li>
                    Formation spécialisée en Parodontologie - IFPIO Marseille
                  </li>
                  <li>
                    Formation complémentaire en Parodontologie - Académie de
                    paro, Aix-en-Provence
                  </li>
                  <li>Formation en Implantologie - IFPIO Marseille</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Conditions d'exercice
                </h2>
                <p>
                  Le Dr Stéphanie Meriot exerce en secteur 1 (tarifs
                  conventionnés).
                  <br />
                  Elle est inscrite à l'Ordre National des Chirurgiens-Dentistes
                  sous le numéro RPPS 10100720993.
                </p>
                <p>
                  Assurance responsabilité civile professionnelle : Conformément
                  à l'article L.1142-2 du Code de la Santé Publique, le
                  praticien dispose d'une assurance responsabilité civile
                  professionnelle.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Règles déontologiques
                </h2>
                <p>
                  Le Dr Stéphanie Meriot est soumise au Code de déontologie des
                  chirurgiens-dentistes, consultable sur le site du Conseil
                  National de l'Ordre des Chirurgiens-Dentistes :{" "}
                  <a
                    href="https://www.ordre-chirurgiens-dentistes.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.ordre-chirurgiens-dentistes.fr
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Hébergement du site
                </h2>
                <p>
                  Ce site est hébergé par Lovable.dev
                  <br />
                  Pour plus d'informations, consultez{" "}
                  <a
                    href="https://lovable.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    lovable.dev
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Propriété intellectuelle
                </h2>
                <p>
                  L'ensemble du contenu de ce site (textes, images, logos) est
                  la propriété exclusive du Dr Stéphanie Meriot, sauf mention
                  contraire. Toute reproduction, même partielle, est interdite
                  sans autorisation préalable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Données personnelles
                </h2>
                <p>
                  Pour toute information concernant le traitement de vos données
                  personnelles, consultez notre{" "}
                  <a
                    href="/confidentialite"
                    className="text-primary hover:underline"
                  >
                    Politique de confidentialité
                  </a>
                  .
                </p>
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
