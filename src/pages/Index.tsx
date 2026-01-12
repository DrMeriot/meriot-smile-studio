import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Practitioner from "@/components/Practitioner";
import Services from "@/components/Services";
import Philosophy from "@/components/Philosophy";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import QuickLinks from "@/components/QuickLinks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const Index = () => {
  // Schema.org structured data - Dentist
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": "https://dr-meriot-dentiste.fr/#dentist",
        "name": "Cabinet Dentaire Dr Stéphanie Meriot",
        "alternateName": "Dr Stéphanie Meriot - Parodontiste Marseille",
        "description": "Cabinet dentaire spécialisé en parodontologie et implantologie à Marseille. Traitement des maladies des gencives, déchaussement dentaire et pose d'implants.",
        "image": "https://dr-meriot-dentiste.fr/og-image.jpg",
        "logo": "https://dr-meriot-dentiste.fr/logo.png",
        "url": "https://dr-meriot-dentiste.fr",
        "telephone": "+33983439621",
        "email": "contact@dr-meriot-dentiste.fr",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "23 Boulevard de la Fédération",
          "addressLocality": "Marseille",
          "addressRegion": "Provence-Alpes-Côte d'Azur",
          "postalCode": "13004",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.3117,
          "longitude": 5.3947
        },
        "hasMap": "https://maps.google.com/?q=23+Boulevard+de+la+Fédération+13004+Marseille",
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
            "dayOfWeek": "Friday",
            "opens": "09:00",
            "closes": "14:00"
          }
        ],
        "knowsAbout": [
          {
            "@type": "MedicalSpecialty",
            "name": "Periodontics",
            "alternateName": "Parodontologie"
          },
          {
            "@type": "MedicalSpecialty",
            "name": "Dental Implantology",
            "alternateName": "Implantologie"
          },
          "Traitement de la gingivite",
          "Traitement de la parodontite",
          "Déchaussement dentaire",
          "Greffe gingivale",
          "Surfaçage radiculaire"
        ],
        "medicalSpecialty": ["Periodontics", "DentalImplantology"],
        "priceRange": "€€",
        "paymentAccepted": ["Carte Vitale", "Tiers payant", "Carte bancaire", "Espèces", "Chèques"],
        "currenciesAccepted": "EUR",
        "areaServed": {
          "@type": "City",
          "name": "Marseille",
          "sameAs": "https://fr.wikipedia.org/wiki/Marseille"
        },
        "isAcceptingNewPatients": true,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "47",
          "reviewCount": "47"
        },
        "sameAs": [
          "https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://dr-meriot-dentiste.fr/#person",
        "name": "Dr Stéphanie Meriot",
        "givenName": "Stéphanie",
        "familyName": "Meriot",
        "honorificPrefix": "Dr",
        "jobTitle": "Chirurgien-dentiste spécialisée en parodontologie",
        "worksFor": {
          "@id": "https://dr-meriot-dentiste.fr/#dentist"
        },
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Faculté d'Odontologie de Marseille"
          },
          {
            "@type": "EducationalOrganization",
            "name": "IFPIO Marseille",
            "description": "Institut de Formation en Parodontologie et Implantologie Orale"
          },
          {
            "@type": "EducationalOrganization",
            "name": "Académie de Parodontologie d'Aix-en-Provence"
          }
        ],
        "knowsAbout": ["Periodontics", "Dental Implantology", "Parodontologie", "Implantologie"],
        "knowsLanguage": [
          {
            "@type": "Language",
            "name": "French",
            "alternateName": "Français"
          },
          {
            "@type": "Language",
            "name": "English",
            "alternateName": "Anglais"
          },
          {
            "@type": "Language",
            "name": "Spanish",
            "alternateName": "Espagnol"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://dr-meriot-dentiste.fr/#website",
        "url": "https://dr-meriot-dentiste.fr",
        "name": "Dr Stéphanie Meriot - Dentiste Parodontiste Marseille",
        "description": "Site officiel du cabinet dentaire Dr Stéphanie Meriot, spécialiste en parodontologie à Marseille",
        "publisher": {
          "@id": "https://dr-meriot-dentiste.fr/#dentist"
        },
        "inLanguage": "fr-FR"
      }
    ]
  };

  useEffect(() => {
    // Add structured data script
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Parodontie et Soins Dentaires à Marseille - Dr Stéphanie Meriot"
        description="Spécialiste du traitement des gencives et du déchaussement dentaire à Marseille. Le Dr Stéphanie Meriot soigne gingivite, parodontite et pose d'implants. Cabinet conventionné secteur 1."
        canonical="/"
        ogTitle="Dr Stéphanie Meriot | Experte Parodontie à Marseille"
        ogDescription="Traitement des maladies des gencives, déchaussement dentaire et implantologie. Cabinet dentaire de confiance à Marseille 4ème. Prenez RDV en ligne."
        keywords="parodontie marseille, traitement gencives, déchaussement dentaire, gingivite, parodontite, implantologie marseille, dentiste marseille 4"
      />
      <LocalBusinessSchema />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <QuickLinks />
          <Practitioner />
          <Services />
          <Philosophy />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
