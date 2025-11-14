import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Confidentialite = () => {
  return (
    <>
      <Helmet>
        <title>Politique de confidentialité - Cabinet Dr Stéphanie Meriot</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        <main className="pt-20 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">
              Politique de confidentialité
            </h1>

            <div className="prose prose-lg max-w-none space-y-8">
              <p className="text-muted-foreground">
                Le Dr Stéphanie Meriot accorde une grande importance à la
                protection de vos données personnelles. Cette politique vous
                informe sur la collecte, l'utilisation et la protection de vos
                données conformément au Règlement Général sur la Protection des
                Données (RGPD).
              </p>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Responsable du traitement
                </h2>
                <p>
                  <strong>Dr Stéphanie Meriot</strong>
                  <br />
                  23 Boulevard de la Fédération
                  <br />
                  13004 Marseille
                  <br />
                  Téléphone : 09 83 43 96 21
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Données collectées
                </h2>
                <p>Dans le cadre de votre prise en charge médicale, nous collectons :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Données d'identification :</strong> nom, prénom, date
                    de naissance, adresse, numéro de téléphone, email
                  </li>
                  <li>
                    <strong>Données de santé :</strong> antécédents médicaux,
                    traitements en cours, examens, radiographies, soins prodigués
                  </li>
                  <li>
                    <strong>Données administratives :</strong> numéro de Sécurité
                    sociale, mutuelle, modalités de paiement
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Finalités du traitement
                </h2>
                <p>Vos données sont collectées pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Assurer votre suivi médical et la continuité des soins</li>
                  <li>
                    Établir des devis, factures et documents de remboursement
                  </li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                  <li>
                    Gérer les prises de rendez-vous (via Doctolib notamment)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Base légale du traitement
                </h2>
                <p>
                  Le traitement de vos données est fondé sur :
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Intérêt légitime :</strong> votre suivi médical et la
                    gestion du cabinet
                  </li>
                  <li>
                    <strong>Obligation légale :</strong> tenue du dossier médical,
                    facturation
                  </li>
                  <li>
                    <strong>Consentement :</strong> pour certains traitements
                    spécifiques (communication par email par exemple)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Destinataires des données
                </h2>
                <p>Vos données peuvent être transmises à :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>L'Assurance Maladie et votre mutuelle (pour remboursement)</li>
                  <li>
                    Des professionnels de santé (si nécessaire pour votre prise en
                    charge)
                  </li>
                  <li>
                    Doctolib (pour la gestion des rendez-vous, sous réserve de leur
                    propre politique de confidentialité)
                  </li>
                </ul>
                <p>
                  Aucune donnée n'est vendue ou cédée à des tiers à des fins
                  commerciales.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Durée de conservation
                </h2>
                <p>
                  Conformément à la réglementation en vigueur, vos données
                  médicales sont conservées pendant <strong>20 ans</strong> à
                  compter de votre dernière consultation.
                </p>
                <p>
                  Les données administratives (factures, devis) sont conservées
                  pendant la durée légale applicable.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
                <p>
                  Vous disposez des droits suivants concernant vos données
                  personnelles :
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Droit d'accès :</strong> obtenir une copie de vos
                    données
                  </li>
                  <li>
                    <strong>Droit de rectification :</strong> corriger des données
                    inexactes
                  </li>
                  <li>
                    <strong>Droit d'opposition :</strong> vous opposer à certains
                    traitements
                  </li>
                  <li>
                    <strong>Droit à la limitation :</strong> limiter le traitement
                    de vos données
                  </li>
                  <li>
                    <strong>Droit à l'effacement :</strong> sous réserve des
                    obligations légales de conservation
                  </li>
                </ul>
                <p>
                  Pour exercer vos droits, contactez-nous par téléphone au{" "}
                  <strong>09 83 43 96 21</strong> ou sur place au cabinet.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Sécurité des données</h2>
                <p>
                  Nous mettons en œuvre toutes les mesures techniques et
                  organisationnelles nécessaires pour garantir la sécurité et la
                  confidentialité de vos données (accès restreint, sauvegarde
                  sécurisée, chiffrement si applicable).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
                <p>
                  Ce site n'utilise pas de cookies publicitaires ou de suivi
                  intrusif. Seuls des cookies strictement nécessaires au
                  fonctionnement du site peuvent être utilisés (par exemple, pour
                  la prise de rendez-vous via Doctolib).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                <p>
                  Pour toute question concernant cette politique de
                  confidentialité ou l'exercice de vos droits, contactez-nous :
                </p>
                <p>
                  <strong>Dr Stéphanie Meriot</strong>
                  <br />
                  23 Boulevard de la Fédération, 13004 Marseille
                  <br />
                  Tél : 09 83 43 96 21
                </p>
                <p>
                  Vous disposez également du droit d'introduire une réclamation
                  auprès de la CNIL (Commission Nationale de l'Informatique et des
                  Libertés) si vous estimez que vos droits n'ont pas été respectés.
                </p>
              </section>

              <p className="text-sm text-muted-foreground mt-8">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Confidentialite;
