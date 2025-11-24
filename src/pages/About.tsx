import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Award, BookOpen, Globe, Heart, Users, Shield } from "lucide-react";
import drMeriotPhoto from "@/assets/dr-meriot-photo.png";
import SEOHead from "@/components/SEOHead";
import FloatingCTA from "@/components/FloatingCTA";

const About = () => {
  return (
    <>
      <SEOHead
        title="Dr Stéphanie Meriot | Dentiste Parodontie Implantologie Marseille"
        description="Dr Stéphanie Meriot, chirurgien-dentiste à Marseille 4ème. Spécialiste parodontie (IFPIO) et implantologie. Approche conservatrice et bienveillante. Trilingue."
        canonical="/a-propos"
        keywords="Dr Stéphanie Meriot, dentiste marseille 4, parodontiste marseille, implantologue marseille, IFPIO, dentiste trilingue marseille"
      />
      <FloatingCTA />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-soft">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Dr Stéphanie Meriot
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                    Chirurgien-dentiste à Marseille 4ème, spécialisée en{" "}
                    <strong>parodontie</strong> et <strong>implantologie</strong>.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Mon approche repose sur l'écoute, la douceur et le respect du
                    rythme de chaque patient. Je crois en une dentisterie humaine,
                    où chaque soin est personnalisé et expliqué avec clarté.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src={drMeriotPhoto}
                    alt="Dr Stéphanie Meriot - Dentiste spécialisée parodontie implantologie Marseille 4ème"
                    className="rounded-2xl shadow-medium w-full"
                  />
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full -z-10 blur-2xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Formation Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Parcours et formations
              </h2>

              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Diplôme de chirurgien-dentiste
                    </h3>
                    <p className="text-muted-foreground">
                      Faculté d'odontologie de Marseille
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Formation en Parodontologie
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      IFPIO - Institut de Formation en Parodontologie et
                      Implantologie Orale - Marseille
                    </p>
                    <p className="text-muted-foreground">
                      Formation approfondie sur le diagnostic et le traitement des
                      maladies parodontales, les techniques chirurgicales et la
                      maintenance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Formation complémentaire en Parodontie
                    </h3>
                    <p className="text-muted-foreground">
                      Académie de paro - Aix-en-Provence
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Formation en Implantologie
                    </h3>
                    <p className="text-muted-foreground">
                      IFPIO Marseille - Techniques de pose d'implants, régénération
                      osseuse et prothèse sur implants
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-secondary rounded-xl flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Thèse de doctorat
                    </h3>
                    <p className="text-muted-foreground italic mb-2">
                      "Dentisterie à minima : moyens de diagnostic et approches
                      thérapeutiques"
                    </p>
                    <p className="text-muted-foreground">
                      Ma thèse reflète ma philosophie : préserver au maximum les
                      tissus naturels des patients tout en offrant des soins
                      efficaces et durables.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Expériences internationales
                    </h3>
                    <p className="text-muted-foreground">
                      Exercice en France (Marseille, Paris) et à l'étranger (Genève,
                      Suisse)
                    </p>
                    <p className="text-muted-foreground mt-2">
                      <strong>Langues parlées :</strong> 🇫🇷 Français · 🇬🇧 Anglais ·
                      🇪🇸 Espagnol
                    </p>
                  </div>
                 </div>
               </div>
             </div>
           </section>

           {/* E-A-T Section - Expertise & Credibility */}
           <section className="py-20 bg-muted/20">
             <div className="container mx-auto px-4 max-w-4xl">
               <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                 Pourquoi me faire confiance ?
               </h2>
               
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="p-6 bg-card rounded-xl shadow-soft">
                   <div className="flex items-center gap-3 mb-4">
                     <Shield className="h-6 w-6 text-primary" />
                     <h3 className="text-lg font-semibold">Inscrite à l'Ordre</h3>
                   </div>
                   <p className="text-muted-foreground mb-2">
                     Chirurgien-dentiste inscrite à l'Ordre National des Chirurgiens-Dentistes.
                   </p>
                   <p className="text-sm text-muted-foreground">
                     Numéro RPPS : Vérifiable sur{" "}
                     <a
                       href="https://annuaire.sante.fr"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-primary hover:underline"
                     >
                       annuaire.sante.fr
                     </a>
                   </p>
                 </div>

                 <div className="p-6 bg-card rounded-xl shadow-soft">
                   <div className="flex items-center gap-3 mb-4">
                     <Award className="h-6 w-6 text-accent" />
                     <h3 className="text-lg font-semibold">
                       Formations spécialisées
                     </h3>
                   </div>
                   <p className="text-muted-foreground">
                     Formations approfondies à l'IFPIO Marseille et à l'Académie de
                     paro d'Aix-en-Provence, reconnues pour leur excellence en
                     parodontie et implantologie.
                   </p>
                 </div>

                 <div className="p-6 bg-card rounded-xl shadow-soft">
                   <div className="flex items-center gap-3 mb-4">
                     <BookOpen className="h-6 w-6 text-primary" />
                     <h3 className="text-lg font-semibold">Recherche & Thèse</h3>
                   </div>
                   <p className="text-muted-foreground">
                     Thèse de doctorat sur la dentisterie conservatrice, reflétant
                     mon engagement pour une pratique fondée sur les données
                     scientifiques.
                   </p>
                 </div>

                 <div className="p-6 bg-card rounded-xl shadow-soft">
                   <div className="flex items-center gap-3 mb-4">
                     <Globe className="h-6 w-6 text-accent" />
                     <h3 className="text-lg font-semibold">
                       Expérience internationale
                     </h3>
                   </div>
                   <p className="text-muted-foreground">
                     Exercice en France (Paris, Marseille) et à l'étranger (Genève),
                     enrichissant ma pratique et ma vision des soins.
                   </p>
                 </div>
               </div>
             </div>
           </section>

           {/* Philosophy Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Ma philosophie de soins
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-card rounded-xl shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">
                      Écoute et bienveillance
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Je prends le temps d'écouter vos préoccupations et de
                    comprendre vos attentes pour vous proposer des soins adaptés.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-xl shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-accent" />
                    <h3 className="text-lg font-semibold">Approche personnalisée</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Chaque patient est unique. Je respecte votre rythme et prends
                    en compte votre anxiété éventuelle.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-xl shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-semibold">Explications claires</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Je vous explique chaque étape avec des mots simples, pour que
                    vous soyez pleinement informé et rassuré.
                  </p>
                </div>

                <div className="p-6 bg-card rounded-xl shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-6 w-6 text-accent" />
                    <h3 className="text-lg font-semibold">
                      Dentisterie conservatrice
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Je privilégie les techniques permettant de préserver au maximum
                    vos tissus naturels.
                  </p>
                </div>
              </div>

              <blockquote className="mt-12 border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg">
                <p className="text-lg italic text-muted-foreground mb-4">
                  "Je crois en une dentisterie humaine et bienveillante, où chaque
                  patient se sent écouté, respecté et en confiance. Mon objectif
                  est de vous accompagner sur le long terme dans la préservation de
                  votre santé bucco-dentaire."
                </p>
                <p className="font-semibold text-primary">
                  — Dr Stéphanie Meriot
                </p>
              </blockquote>
            </div>
         </section>
       </main>
       <Footer />
     </div>
     </>
   );
 };

export default About;
