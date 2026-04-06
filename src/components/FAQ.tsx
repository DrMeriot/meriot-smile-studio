import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSanityPage } from "@/hooks/useSanityContent";

const defaultFaqs = [
  { question: "Le cabinet accepte-t-il la carte vitale ?", answer: "Oui, le cabinet est conventionné secteur 1 et accepte la carte vitale ainsi que le tiers payant pour la part Sécurité sociale. Vous n'avancez donc pas les frais correspondant à la part remboursée par l'Assurance Maladie." },
  { question: "Comment prendre rendez-vous ?", answer: "Vous pouvez prendre rendez-vous facilement sur Doctolib 24h/24, ou nous appeler directement au 09 83 43 96 21 pendant nos horaires d'ouverture." },
  { question: "Le cabinet est-il accessible aux personnes à mobilité réduite ?", answer: "Oui, le cabinet se trouve au rez-de-chaussée avec une entrée accessible PMR. L'accès est donc facilité pour les personnes en fauteuil roulant ou avec des difficultés de mobilité." },
  { question: "Quelles langues sont parlées au cabinet ?", answer: "Le Dr Meriot parle français, anglais et espagnol. Vous pouvez donc consulter dans la langue avec laquelle vous êtes le plus à l'aise." },
  { question: "La parodontie, qu'est-ce que c'est ?", answer: "La parodontie est la spécialité qui traite les maladies des gencives et des tissus de soutien des dents (parodonte). Elle permet de soigner les gingivites, parodontites, et de prévenir le déchaussement dentaire. Le Dr Meriot est spécialisée en parodontie grâce à ses formations à l'IFPIO de Marseille et à l'Académie de paro d'Aix-en-Provence." },
  { question: "Qu'est-ce qu'un implant dentaire ?", answer: "Un implant dentaire est une racine artificielle en titane qui est placée dans l'os de la mâchoire pour remplacer une dent manquante. Il sert de support à une couronne dentaire et permet de retrouver une fonction masticatoire optimale de façon durable." },
  { question: "J'ai peur du dentiste, comment cela se passe ?", answer: "L'anxiété dentaire est très courante et nous la prenons en compte. Le Dr Meriot adopte une approche douce et bienveillante : elle prend le temps d'expliquer chaque étape, respecte votre rythme et s'assure de votre confort tout au long des soins. N'hésitez pas à exprimer vos craintes lors de la consultation." },
  { question: "Combien coûte une consultation ?", answer: "Une consultation de base coûte 23€ (tarif conventionné secteur 1). Les autres actes varient selon les soins nécessaires. Nous vous informons toujours du coût avant de débuter un traitement, et établissons un devis détaillé pour les soins plus complexes." },
  { question: "Le cabinet pratique-t-il la dentisterie conservatrice ?", answer: "Oui, c'est même une philosophie centrale du Dr Meriot. Sa thèse porte sur la dentisterie à minima, ce qui signifie qu'elle privilégie les techniques permettant de conserver au maximum vos tissus naturels (émail, dentine) tout en assurant des soins efficaces et durables." },
];

const FAQ = () => {
  const { data: accueil } = useSanityPage("accueil");

  // Flat fields from Sanity
  const faqs = accueil?.faq ?? defaultFaqs;
  const titre = accueil?.faqTitle ?? "Vos questions, nos réponses";

  return (
    <section className="py-20" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">Questions fréquentes</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            {titre}
          </h2>
          <p className="text-lg text-muted-foreground">
            Vous avez des interrogations ? Consultez notre FAQ ou contactez-nous directement.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq: { question: string; answer?: string; reponse?: string }, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 shadow-soft hover:shadow-medium transition-shadow"
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-4">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                  {faq.reponse ?? faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
