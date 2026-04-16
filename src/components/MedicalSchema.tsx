import { Head } from 'vite-react-ssg';

interface MedicalConditionData {
  name: string;
  alternateName?: string;
  description: string;
  symptoms?: string[];
  riskFactors?: string[];
  treatment?: string;
}

interface MedicalSchemaProps {
  pageUrl: string;
  pageName: string;
  pageDescription: string;
  conditions?: MedicalConditionData[];
}

const MedicalSchema = ({ pageUrl, pageName, pageDescription, conditions = [] }: MedicalSchemaProps) => {
  const siteUrl = "https://www.dr-meriot-chirurgien-dentiste.fr";

  const graph: Record<string, unknown>[] = [
    {
      "@type": "MedicalWebPage",
      "@id": `${siteUrl}${pageUrl}#webpage`,
      "url": `${siteUrl}${pageUrl}`,
      "name": pageName,
      "description": pageDescription,
      "about": conditions.map((c) => ({
        "@type": "MedicalCondition",
        "name": c.name,
        ...(c.alternateName && { "alternateName": c.alternateName }),
        "description": c.description,
        ...(c.symptoms?.length && {
          "signOrSymptom": c.symptoms.map((s) => ({
            "@type": "MedicalSignOrSymptom",
            "name": s,
          })),
        }),
        ...(c.riskFactors?.length && {
          "riskFactor": c.riskFactors.map((r) => ({
            "@type": "MedicalRiskFactor",
            "name": r,
          })),
        }),
        ...(c.treatment && {
          "possibleTreatment": {
            "@type": "MedicalTherapy",
            "name": c.treatment,
          },
        }),
      })),
      "author": {
        "@type": "Dentist",
        "name": "Dr Stéphanie Meriot",
        "url": `${siteUrl}/a-propos`,
      },
      "reviewedBy": {
        "@type": "Dentist",
        "name": "Dr Stéphanie Meriot",
      },
      "lastReviewed": new Date().toISOString().split("T")[0],
      "inLanguage": "fr-FR",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default MedicalSchema;
