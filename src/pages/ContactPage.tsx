import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <section className="py-16 bg-gradient-soft">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Nous contacter
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Le cabinet est situé à Marseille 4ème, à proximité du métro
                Chartreux. Prenez rendez-vous facilement sur Doctolib ou
                contactez-nous par téléphone.
              </p>
            </div>
          </section>
          <Contact />
        </main>
        <Footer />
      </div>
    );
  };

export default ContactPage;
