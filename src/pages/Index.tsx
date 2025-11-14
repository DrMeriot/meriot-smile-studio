import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Philosophy from "@/components/Philosophy";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import QuickLinks from "@/components/QuickLinks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  // Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": "https://drstephaniemeriot.fr/#dentist",
        name: "Dr Stéphanie Meriot",
        image: "https://drstephaniemeriot.fr/images/dr-meriot.jpg",
        telephone: "+33983439621",
        address: {
          "@type": "PostalAddress",
          streetAddress: "23 Boulevard de la Fédération",
          addressLocality: "Marseille",
          postalCode: "13004",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.3117,
          longitude: 5.3947,
        },
        url: "https://drstephaniemeriot.fr",
        priceRange: "€",
        paymentAccepted: "Carte Vitale, Tiers payant, CB",
        currenciesAccepted: "EUR",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Thursday"],
            opens: "09:00",
            closes: "12:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Thursday"],
            opens: "14:00",
            closes: "17:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Friday",
            opens: "09:00",
            closes: "14:00",
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          bestRating: "5",
          ratingCount: "47",
        },
        medicalSpecialty: ["Parodontie", "Implantologie", "Soins dentaires généraux"],
      },
      {
        "@type": "Person",
        "@id": "https://drstephaniemeriot.fr/#person",
        name: "Stéphanie Meriot",
        jobTitle: "Chirurgien-dentiste",
        worksFor: {
          "@id": "https://drstephaniemeriot.fr/#dentist",
        },
        alumniOf: "Faculté d'odontologie de Marseille",
        knowsLanguage: ["Français", "Anglais", "Espagnol"],
      },
      {
        "@type": "MedicalBusiness",
        name: "Cabinet Dentaire Dr Stéphanie Meriot",
        description:
          "Cabinet dentaire à Marseille 4ème spécialisé en parodontie et implantologie. Conventionné secteur 1.",
        hasMap: "https://maps.google.com/?q=23+Boulevard+de+la+Fédération+13004+Marseille",
        isAcceptingNewPatients: true,
      },
    ],
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

      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Philosophy />
          <Testimonials />
          <FAQ />
          <QuickLinks />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
