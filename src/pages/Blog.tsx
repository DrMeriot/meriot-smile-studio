import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import SEOHead from "@/components/SEOHead";
import { blogPosts } from "@/data/blogData";
import { Calendar, Tag } from "lucide-react";

const Blog = () => {
  return (
    <>
      <SEOHead
        title="Blog Dentaire | Conseils Parodontie & Implantologie - Dr Meriot Marseille"
        description="Articles et conseils d'experts sur la parodontie, l'implantologie et les soins dentaires par le Dr Stéphanie Meriot, dentiste spécialisée à Marseille."
        canonical="/blog"
        keywords="blog dentaire, conseils parodontie, implants dentaires, santé bucco-dentaire, marseille"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <FloatingCTA />
        
        <main className="container mx-auto px-4 py-16 mt-20">
          {/* Hero Section */}
          <section className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog & Conseils Dentaires
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez nos articles sur la parodontie, l'implantologie et la santé bucco-dentaire. 
              Des conseils d'experts par le Dr Stéphanie Meriot.
            </p>
          </section>

          {/* Articles Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogPosts.map((post, index) => (
              <article 
                key={post.slug}
                className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Category Badge */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{post.category}</span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-card-foreground mb-3 hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  {/* Read More Link */}
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Lire l'article
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </section>

          {/* CTA Section */}
          <section className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Une Question sur Votre Santé Dentaire ?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Le Dr Stéphanie Meriot est à votre écoute pour répondre à toutes vos questions
              et vous proposer des soins adaptés à vos besoins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.doctolib.fr/dentiste/marseille/stephanie-meriot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Prendre RDV en Ligne
              </a>
              <a
                href="tel:0983439621"
                className="inline-flex items-center justify-center px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Appeler le 09 83 43 96 21
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
