import { useEffect } from 'react';

const LocalBusinessSchema = () => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Dentist",
      "name": "Dr Stéphanie Meriot - Chirurgien-Dentiste Marseille",
      "description": "Chirurgien-dentiste spécialisée en parodontie et implantologie à Marseille 4ème. Traitement laser des maladies parodontales, pose d'implants dentaires. Conventionnée Secteur 1.",
      "url": "https://dr-meriot-dentiste.fr",
      "telephone": "+33983439621",
      "email": "cabinet@dr-meriot-dentiste.fr",
      "image": "https://dr-meriot-dentiste.fr/og-image.jpg",
      "logo": "https://dr-meriot-dentiste.fr/og-image.jpg",
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "paymentAccepted": "Cash, Credit Card, Check, Carte Vitale",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "23 Boulevard de la Fédération",
        "addressLocality": "Marseille",
        "postalCode": "13004",
        "addressRegion": "Provence-Alpes-Côte d'Azur",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.3047,
        "longitude": 5.3964
      },
      "areaServed": [
        // Marseille - Tous arrondissements
        "Marseille",
        "Marseille 1er",
        "Marseille 2ème",
        "Marseille 3ème",
        "Marseille 4ème",
        "Marseille 5ème",
        "Marseille 6ème",
        "Marseille 7ème",
        "Marseille 8ème",
        "Marseille 9ème",
        "Marseille 10ème",
        "Marseille 11ème",
        "Marseille 12ème",
        "Marseille 13ème",
        "Marseille 14ème",
        "Marseille 15ème",
        "Marseille 16ème",
        // Alentours proches
        "Allauch",
        "Plan-de-Cuques",
        "Les Pennes-Mirabeau",
        "Septèmes-les-Vallons",
        "La Penne-sur-Huveaune",
        // Pays d'Aix
        "Aix-en-Provence",
        "Gardanne",
        "Bouc-Bel-Air",
        "Cabriès",
        "Simiane-Collongue",
        "Meyreuil",
        "Fuveau",
        "Rousset",
        "Éguilles",
        "Ventabren",
        // Côte Bleue
        "Carry-le-Rouet",
        "Sausset-les-Pins",
        "Ensuès-la-Redonne",
        "Marignane",
        "Vitrolles",
        "Châteauneuf-les-Martigues",
        "Gignac-la-Nerthe",
        // Aubagne & La Ciotat
        "Aubagne",
        "Gémenos",
        "Carnoux-en-Provence",
        "La Ciotat",
        "Cassis",
        "Roquefort-la-Bédoule",
        "Ceyreste",
        // Vallée de l'Huveaune
        "Roquevaire",
        "Auriol",
        "La Destrousse",
        "Peypin",
        "La Bouilladisse",
        "Cuges-les-Pins",
        "Trets",
        "Saint-Maximin-la-Sainte-Baume",
        // Étang de Berre
        "Martigues",
        "Istres",
        "Fos-sur-Mer",
        "Port-de-Bouc",
        "Berre-l'Étang",
        "Rognac",
        "Velaux",
        "Miramas",
        "Saint-Chamas",
        "Saint-Mitre-les-Remparts",
        "Grans",
        "La Fare-les-Oliviers",
        "Coudoux",
        "Lançon-Provence",
        // Salon & environs
        "Salon-de-Provence",
        "Pélissanne",
        "Eyguières",
        "Lambesc"
      ],
      "medicalSpecialty": [
        "Periodontics",
        "Dental Implants",
        "Cosmetic Dentistry"
      ],
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "Traitement parodontal",
          "description": "Traitement des maladies parodontales par surfaçage radiculaire et laser"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Pose d'implants dentaires",
          "description": "Chirurgie implantaire pour remplacement des dents manquantes"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Traitement laser",
          "description": "Thérapie laser pour le traitement des poches parodontales"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Esthétique dentaire",
          "description": "Blanchiment, facettes et corrections esthétiques"
        }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday"],
          "opens": "09:00",
          "closes": "12:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday"],
          "opens": "14:00",
          "closes": "17:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Tuesday", "Thursday"],
          "opens": "09:00",
          "closes": "12:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Tuesday", "Thursday"],
          "opens": "14:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Friday"],
          "opens": "09:00",
          "closes": "14:00"
        }
      ],
      "sameAs": [
        "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Diplôme",
          "name": "Diplôme Universitaire de Parodontologie"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Formation",
          "name": "Formation IFPIO Implantologie"
        }
      ],
      "knowsLanguage": ["French", "English", "Spanish"],
      "isAcceptingNewPatients": true
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'local-business-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('local-business-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
};

export default LocalBusinessSchema;
