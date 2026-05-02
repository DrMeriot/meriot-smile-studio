import { Head } from 'vite-react-ssg';
import { useGlobalSettings } from '@/hooks/useSanityContent';

const LocalBusinessSchema = () => {
  const { data: global } = useGlobalSettings();

  const nom = global?.nom_praticien ?? "Dr Stéphanie Meriot";
  const tel = global?.phone ?? global?.telephone ?? "+33983439621";
  const email = global?.email ?? "cabinet@dr-meriot-chirurgien-dentiste.fr";
  const siteUrl = global?.site_url ?? "https://www.dr-meriot-chirurgien-dentiste.fr";
  const adresse = global?.adresse ?? "23 Boulevard de la Fédération, 13004 Marseille";
  const doctolibUrl = global?.doctolib ?? global?.doctolib_url ?? "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot";
  const lat = global?.geo?.lat ?? 43.3047;
  const lng = global?.geo?.lng ?? 5.3964;

  const streetAddress = adresse.split(",")[0]?.trim() ?? "23 Boulevard de la Fédération";
  const postalCity = adresse.split(",")[1]?.trim() ?? "13004 Marseille";
  const postalCode = postalCity.match(/\d{5}/)?.[0] ?? "13004";

  const dentistSchema = {
    "@type": "Dentist",
    "@id": `${siteUrl}/#dentist`,
    "name": `${nom} - Chirurgien-Dentiste Marseille`,
    "alternateName": "Dr Stéphanie Meriot - Parodontiste Marseille",
    "description": "Chirurgien-dentiste spécialisée en parodontie et implantologie à Marseille 4ème. Traitement laser des maladies parodontales, pose d'implants dentaires. Conventionnée Secteur 1.",
    "url": siteUrl,
    "telephone": tel.startsWith("+") ? tel : `+33${tel.replace(/\s/g, "").replace(/^0/, "")}`,
    "email": email,
    "image": `${siteUrl}/og-image.jpg`,
    "logo": `${siteUrl}/logo.png`,
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card, Check, Carte Vitale, Tiers payant",
    "hasMap": "https://maps.google.com/?q=23+Boulevard+de+la+Fédération+13004+Marseille",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": streetAddress,
      "addressLocality": "Marseille",
      "postalCode": postalCode,
      "addressRegion": "Provence-Alpes-Côte d'Azur",
      "addressCountry": "FR"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": lat, "longitude": lng },
    "areaServed": [
      "Marseille", "Marseille 1er", "Marseille 2ème", "Marseille 3ème", "Marseille 4ème",
      "Marseille 5ème", "Marseille 6ème", "Marseille 7ème", "Marseille 8ème", "Marseille 9ème",
      "Marseille 10ème", "Marseille 11ème", "Marseille 12ème", "Marseille 13ème", "Marseille 14ème",
      "Marseille 15ème", "Marseille 16ème",
      "Allauch", "Plan-de-Cuques", "Les Pennes-Mirabeau", "Septèmes-les-Vallons", "La Penne-sur-Huveaune",
      "Aix-en-Provence", "Gardanne", "Bouc-Bel-Air", "Cabriès", "Simiane-Collongue", "Meyreuil", "Fuveau", "Rousset", "Éguilles", "Ventabren",
      "Carry-le-Rouet", "Sausset-les-Pins", "Ensuès-la-Redonne", "Marignane", "Vitrolles", "Châteauneuf-les-Martigues", "Gignac-la-Nerthe",
      "Aubagne", "Gémenos", "Carnoux-en-Provence", "La Ciotat", "Cassis", "Roquefort-la-Bédoule", "Ceyreste",
      "Roquevaire", "Auriol", "La Destrousse", "Peypin", "La Bouilladisse", "Cuges-les-Pins", "Trets", "Saint-Maximin-la-Sainte-Baume",
      "Martigues", "Istres", "Fos-sur-Mer", "Port-de-Bouc", "Berre-l'Étang", "Rognac", "Velaux", "Miramas", "Saint-Chamas", "Saint-Mitre-les-Remparts", "Grans", "La Fare-les-Oliviers", "Coudoux", "Lançon-Provence",
      "Salon-de-Provence", "Pélissanne", "Eyguières", "Lambesc"
    ],
    "medicalSpecialty": ["Periodontics", "Dental Implants"],
    "availableService": [
      { "@type": "MedicalProcedure", "name": "Bilan parodontal complet", "description": "Examen clinique, sondage des poches, évaluation de la mobilité dentaire et radiographies pour diagnostiquer la maladie parodontale.", "procedureType": "Diagnostic" },
      { "@type": "MedicalProcedure", "name": "Détartrage et surfaçage radiculaire", "description": "Nettoyage en profondeur sous la gencive sous anesthésie locale pour traiter la parodontite et réduire les poches parodontales.", "procedureType": "Therapeutic" },
      { "@type": "MedicalProcedure", "name": "Greffe gingivale", "description": "Chirurgie muco-gingivale pour recouvrir une racine exposée ou épaissir une gencive fragilisée par la récession.", "procedureType": "Surgical" },
      { "@type": "MedicalProcedure", "name": "Régénération osseuse guidée", "description": "Technique chirurgicale visant à reconstituer l'os alvéolaire perdu autour des dents ou avant la pose d'un implant.", "procedureType": "Surgical" },
      { "@type": "MedicalProcedure", "name": "Maintenance parodontale", "description": "Suivi tous les 3 à 6 mois après traitement parodontal pour prévenir les récidives et préserver la santé des gencives.", "procedureType": "Therapeutic" },
      { "@type": "MedicalProcedure", "name": "Pose d'implants dentaires", "description": "Chirurgie implantaire pour le remplacement durable des dents manquantes.", "procedureType": "Surgical" },
      { "@type": "MedicalProcedure", "name": "Traitement laser parodontal", "description": "Thérapie laser complémentaire pour assainir les poches parodontales profondes.", "procedureType": "Therapeutic" },
    ],
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday"], "opens": "09:00", "closes": "12:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday"], "opens": "14:00", "closes": "17:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Thursday"], "opens": "09:00", "closes": "12:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Thursday"], "opens": "14:00", "closes": "18:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Friday"], "opens": "09:00", "closes": "14:00" },
    ],
    "sameAs": [doctolibUrl],
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "Diplôme", "name": "Diplôme Universitaire de Parodontologie" },
      { "@type": "EducationalOccupationalCredential", "credentialCategory": "Formation", "name": "Formation IFPIO Implantologie" },
    ],
    "knowsLanguage": ["French", "English", "Spanish"],
    "isAcceptingNewPatients": true,
  };

  const personSchema = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": nom,
    "givenName": "Stéphanie",
    "familyName": "Meriot",
    "honorificPrefix": "Dr",
    "jobTitle": "Chirurgien-dentiste spécialisée en parodontie et implantologie",
    "description": "Chirurgien-dentiste à Marseille 4ème, spécialisée dans le traitement des maladies des gencives (gingivite, parodontite, déchaussement) et la pose d'implants dentaires.",
    "image": `${siteUrl}/og-image.jpg`,
    "url": `${siteUrl}/a-propos`,
    "worksFor": { "@id": `${siteUrl}/#dentist` },
    "alumniOf": [
      { "@type": "EducationalOrganization", "name": "Faculté d'Odontologie de Marseille" },
      { "@type": "EducationalOrganization", "name": "IFPIO Marseille", "description": "Institut de Formation en Parodontologie et Implantologie Orale" },
      { "@type": "EducationalOrganization", "name": "Académie de Parodontologie d'Aix-en-Provence" }
    ],
    "medicalSpecialty": ["Periodontics", "Dentistry"],
    "knowsAbout": ["Periodontics", "Dental Implantology", "Parodontologie", "Implantologie", "Gingivite", "Parodontite", "Greffe gingivale", "Surfaçage radiculaire"],
    "knowsLanguage": [
      { "@type": "Language", "name": "French", "alternateName": "Français" },
      { "@type": "Language", "name": "English", "alternateName": "Anglais" },
      { "@type": "Language", "name": "Spanish", "alternateName": "Espagnol" }
    ],
    "sameAs": [doctolibUrl]
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "Dr Stéphanie Meriot - Dentiste Parodontiste Marseille",
    "description": "Site officiel du cabinet dentaire Dr Stéphanie Meriot, spécialiste en parodontologie à Marseille",
    "publisher": { "@id": `${siteUrl}/#dentist` },
    "inLanguage": "fr-FR"
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [dentistSchema, personSchema, websiteSchema]
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  );
};

export default LocalBusinessSchema;
