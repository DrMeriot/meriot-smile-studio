import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marie D.",
    rating: 5,
    text: "Professionnelle, douce et à l'écoute. Le Dr Meriot prend le temps d'expliquer et de rassurer. Je recommande vivement !",
    date: "Il y a 2 mois",
  },
  {
    name: "Jean-Paul R.",
    rating: 5,
    text: "Enfin un cabinet où on se sent en confiance. Explications claires avant chaque soin. Mes gencives vont beaucoup mieux.",
    date: "Il y a 1 mois",
  },
  {
    name: "Sophie L.",
    rating: 5,
    text: "Excellente parodontiste. J'avais très peur du dentiste, mais le Dr Meriot a su me mettre à l'aise. Cabinet moderne et accueillant.",
    date: "Il y a 3 semaines",
  },
  {
    name: "Antoine M.",
    rating: 5,
    text: "Très satisfait de ma pose d'implant. Le Dr Meriot est compétente et rassurante. Le résultat est parfait !",
    date: "Il y a 1 semaine",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30" id="temoignages">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">
            Témoignages patients
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Ils nous font confiance
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-accent text-accent"
                />
              ))}
            </div>
            <span className="text-2xl font-bold">5/5</span>
            <span className="text-muted-foreground">({testimonials.length} avis)</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="hover-lift shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-xs text-muted-foreground">{testimonial.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
