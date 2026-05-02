import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useSanityPage } from "@/hooks/useSanityContent";

const Testimonials = () => {
  const { data: accueil } = useSanityPage("accueil");

  const testimonials = accueil?.temoignages ?? [];
  const titre = accueil?.temoignagesTitle ?? "Ils nous font confiance";

  // Aucun témoignage réel disponible : on n'affiche pas la section
  // (pas de faux avis pour respecter la conformité YMYL santé).
  if (!testimonials.length) return null;

  return (
    <section className="py-20 bg-muted/30" id="temoignages">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="text-primary font-medium text-sm uppercase tracking-wide">Témoignages patients</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">{titre}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial: { name?: string; nom?: string; rating?: number; text?: string; texte?: string; date?: string }, index: number) => (
            <Card key={index} className="hover-lift shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {(testimonial.nom ?? testimonial.name ?? "?").charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.nom ?? testimonial.name}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating ?? 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  "{testimonial.texte ?? testimonial.text}"
                </p>
                {testimonial.date && (
                  <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

